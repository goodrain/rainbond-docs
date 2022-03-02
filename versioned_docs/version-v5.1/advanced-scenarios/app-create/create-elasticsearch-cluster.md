---
title: "部署ElasticSearch集群应用"
Description: "基于Rainbond部署ElasticSearch集群应用"
hidden: true
---

<div id="toc"></div>

### 概述

本文档讲述基于Rainbond搭建Elasticsearch集群的原理、思路、及具体方式。官方提供的Elaseicsearch集群版应用已经在应用市场上线，Rainbond用户可以直接一键拉取安装。
不同大版本的ES集群机制不尽相同，本文中使用的Elasticsearch版本为 v6.2.3。

### Elasticsearch简介及集群原理

#### Elasticsearch简介

Elasticsearch是一个高度可扩展的开源全文搜索和分析引擎。它允许您快速，近实时地存储，搜索和分析大量数据。它通常用作底层引擎/技术，为具有复杂搜索功能和要求的应用程序提供支持。

引导阅读：

- [官网地址](https://www.elastic.co/cn/) 
- [官方文档](https://www.elastic.co/guide/index.html)

#### 集群原理

Elasticsearch使用名为“Zen Discovery”的自定义发现实现进行节点到节点的群集和主选举。

基于此，有两个必要的选项需要被设置：



- `discovery.zen.ping.unicast.hosts` 

该选项指定了可以加入集群的seeds地址。可选的配置格式有如下三种：
```bash
- 192.168.1.10:9300 直接使用IP:PORT 格式，多个节点使用 , 隔开。
- 192.168.1.10 指定IP地址，其端口由 `transport.profiles.default.port` 指定，如无设置，则由 `transport.tcp.port` 指定。 多个节点使用 , 隔开。
- seeds.mydomain.com 指定可解析的域名，如该域名对应了多个IP，则逐一尝试。
```

- `discovery.zen.minimum_master_nodes`

该选项告知所有符合主节点特质的节点，集群中必须可见的最大主节点数量。用于防止集群脑裂导致数据丢失。合理的设置数量为：

`（master_eligible_nodes / 2）+ 1`

引导阅读：

- [集群原理](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/discovery-settings.html)

### Rainbond制作 Elasticsearch的思路

我们希望达成的效果，是在同一个Elasticsearch应用中，扩展出多个实例。多个实例一旦扩展完成，自动组成集群。需要注意的是：容器环境下运行的Elasticsearch实例，其IP是可能发生变化的。

根据上文描述的 Elasticsearch 集群原理。我们需要至少满足下面两个条件中的一个：
- 可以动态获取当前应用下所有实例的IP地址
- 可以动态获取当前应用下所有实例的可解析的域名
并在实例启动前将信息写入配置文件。

经过对比，两种条件中，第一个更容易达成。

在Rainbond环境里，有状态应用中，各实例的IP可以通过dns解析的方式获取：

```bash
sh-4.2# env | grep SERVICE_NAME
SERVICE_NAME=gr4f7bd5
sh-4.2# nslookup ${SERVICE_NAME}
Server:         10.10.20.12
Address:        10.10.20.12#53

Name:   gr4f7bd5.157b2015f1c74b219f38849f7857d382.svc.cluster.local
Address: 192.168.119.163
Name:   gr4f7bd5.157b2015f1c74b219f38849f7857d382.svc.cluster.local
Address: 192.168.171.182
Name:   gr4f7bd5.157b2015f1c74b219f38849f7857d382.svc.cluster.local
Address: 192.168.9.155
```

值得注意的是，该命令获取的结果是动态的。

即使最开始只部署了一个实例，后续进行扩容，第二个实例的启动过程中执行上述命令，也会获得当前两个实例的IP地址。

既然可以动态获取所有实例的IP地址，那么基于Rainbond制作可动态扩展的Es集群应用，就可以使用下面的方式进行。

### 实际制作过程与代码解析

[示例仓库地址](https://github.com/goodrain-apps/docker-elasticsearch-cluster)

用户可以直接fork上述仓库，即可获得集群版ES应用源码。

> 请仔细阅读代码中的注释。


#### Dockerfile

```dockerfile
# 基础镜像指定为ES官方镜像 6.2.3 版本
FROM elastic/elasticsearch:6.2.3
MAINTAINER dazuimao1990 <guox@goodrain.com>
# 基于CentOS安装 nslookup 命令
RUN yum makecache fast && \
    yum install bind-utils -y && \
    yum clean all && \
    rm -rf /var/cache/yum
# 将源码中的启动脚本拷贝入镜像
COPY docker-entrypoint.sh /
# 将源码中的基础配置文件拷贝入镜像
COPY elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
# 开启端口
EXPOSE 9200 9300
# 持久化数据挂载
VOLUME ["/usr/share/elasticsearch/data"]
# 启动命令
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/usr/local/bin/docker-entrypoint.sh","eswrapper"]
```


Dockerfile中的要注意的点：

1. nslookup命令的安装方式，不同的发行版不尽相同。如Ubuntu/Debain系为 `apt-get install dnsutils`

2. docker-entrypoint.sh 需要可执行权限。本实例中没有执行赋权操作的原因是，文件在上传前已经在本地完成了赋权。


#### docker-entrypoint.sh

```bash
#!/bin/bash
[[ $DEBUG ]] && set -x 
# 修改配置文件，通过环境变量设置特定项
sed -i -e "s/POD_IP/${POD_IP:-'0.0.0.0'}/g" \
       -e "s/HOSTNAME/${HOSTNAME}.${HOSTNAME%-*}.${TENANT_ID}.svc.cluster.local./g" /usr/share/elasticsearch/config/elasticsearch.yml

sleep 10
# 动态获取当前实例数量，用来判断是否开启集群配置
CURRENT_POD_NUM=$(nslookup ${SERVICE_NAME} | grep Address | sed '1d' | awk '{print $2}' | wc -l)
[[ $DEBUG ]] && echo $(nslookup ${SERVICE_NAME})> ./logfile
# 如果当前应用中实例数量大于1，则开启加入集群的配置
if [[ $CURRENT_POD_NUM -gt 1 ]];then
    sed -i '$a\discovery.zen.ping.unicast.hosts' /usr/share/elasticsearch/config/elasticsearch.yml
    # 获取当前所有实例的IP地址
    ip=$(nslookup ${SERVICE_NAME} | grep Address | sed '1d' | awk '{print $2}')
    # 根据ES配置文件格式，进行格式化处理
    ips=$(echo $ip | tr ' ' ',')
    [[ $DEBUG ]] && echo ${ip} >> ./logfile
    # 将所有IP写入配置文件
    sed -i "s/discovery.zen.ping.unicast.hosts*/discovery.zen.ping.unicast.hosts: [${ips}]/g" /usr/share/elasticsearch/config/elasticsearch.yml
fi
    
[[ $PAUSE ]] && sleep $PAUSE
# 执行ES指定的启动脚本
exec $@
```

### 总结

使用DNS解析来动态获取当前应用所有实例的IP地址，是一种搭建集群的最佳实践。文中的案例代表了大部分需要在配置文件中显式声明集群所有节点连接地址的应用。用户可以根据这个案例自行制作适合自己的该类型的集群应用。