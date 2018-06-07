---
title: 云帮最小集群高可用方案
summary: 介绍一种符合第二级高可用的云帮架构
toc: false
---
<div id="toc"></div>

##高可用分级

我们以用户应用不受影响为标准，将云帮的高可用分为三个等级：

- **第一级**： 随机计算节点宕机，用户的应用不受影响，或只受到一小段时间的影响。
- **第二级**： 管理节点全部宕机，用户的应用不受影响。
- **第三级**： 云帮平台个组件自身实现高可用。

##云帮高可用架构图
<img src="https://static.goodrain.com/images/docs/3.6/platform-maintenance/ha-deploy/Rainbond-Ha-Topology.png" width="100%"/>

## 云帮高可用现状

- **当前等级**： 我们在经过了一系列测试之后，认识到云帮平台的高可用目前可以达到 **第二级** 即管理节点全部宕机，用户的应用不受影响。
- **限制短板**： 目前，由于rbd-db组件不支持高可用部署，云帮平台自身没有实现高可用。
- **未来发展**： 在下个版本，我们将使用分布式数据库代替传统数据库，解决其高可用问题。届时，将重新测试评估云帮高可用等级。

## 设计初衷

为了了解云帮平台更精确的高可用特性；以更实际、也更利于理解的方式让用户了解云帮平台的高可用。我们设计了此方案，用最少的节点，部署出符合 **第二级** 高可用等级的云帮平台。

## 技术指标

- 部署环境

| 序号 | rainbond role | IP   | 存储 | 云帮组件 | 其他服务       |
| ---- | ------------- | ---- | ---- | -------- | -------------- |
| 1    | manage01      |      |      |          | k8s.etcd.      |
| 2    | compute01     |      | GFS  | rbd-lb   | kubelet.docker |
| 3    | compute02     |      | GFS  | rbd-lb   | kubelet.docker |

- 高可用组件介绍
  - GFS：是一个可扩展的[分布式文件系统](https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)，用于大型的、分布式的、对大量数据进行访问的应用。它运行于廉价的普通硬件上，并提供容错功能。它可以给大量的用户提供总体性能较高的服务。通过在计算节点挂载GFS分布式存储，实现存储方面的高可用。
  - rbd-lb：是云帮自研发的组件之一，用于实现外部访问应用的负载均衡，通过将它运行在管理节点以外，可以实现管理节点宕机情况下，外部依然可以访问应用。

## 设计架构图

<img src="https://static.goodrain.com/images/docs/3.6/platform-maintenance/ha-deploy/minimal-arch.png" width="100%"/>

##部署流程

- 安装单节点云帮平台
  - 详情参见： https://www.rainbond.com/docs/stable/getting-started/install.html

- 安装双节点GFS
  - 详情参见： https://www.rainbond.com/docs/stable/platform-maintenance/distributed-storage/GlusterFS/install.html

- 将管理节点的存储切换为GFS
  - 切换存储
```bash
#将管理节点的/grdata目录备份
cp  /grdata /grdata-old
#挂载gfs
mount -t glusterfs compute01:gv0 /grdata
#将原始的/grdata内容写入gfs
cp /grdata-old /grdata
```

- 将GFS节点扩容为计算节点
  - 详情参见： https://www.rainbond.com/docs/stable/platform-maintenance/add-compute-node/install-command.html

- 修改 docker-compose.yaml 文件
  - 将管理节点的docker-compose.yaml复制到计算节点
```bash
#在manage01执行
scp /opt/rainbond/docker-compose.yaml compute01:/opt/rainbond/
scp /opt/rainbond/docker-compose.yaml compute02:/opt/rainbond/
```
  - 编辑上述文件，只保留rbd-lb部分
```bash
#在compute01执行
vi /opt/rainbond/docker-compose.yaml
#编辑后如下：
version: '2.1'
services:
  rbd-lb:
    image: rainbond/rbd-lb:3.5
    container_name: rbd-lb
    environment:
      DEFAULT_PORT: 80
      HTTP_SUFFIX_URL: abc.org
    volumes:
    - /opt/rainbond/etc/rbd-lb/dynamics:/usr/local/openresty/nginx/conf/dynamics
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
#启动rbd-lb组件
dc-compose up -d
```

- 注释manage01节点/opt/rainbond/docker-compose.yaml文件中的rbd-lb部分

```bash
#在manage01执行
vi /opt/rainbond/docker-compose.yaml
#注释rbd-lb
#rbd-lb:
#   image: rainbond/rbd-lb:3.5
#    container_name: rbd-lb
#    environment:
#      DEFAULT_PORT: 80
#      HTTP_SUFFIX_URL: abc.org
#    volumes:
#    - /opt/rainbond/etc/rbd-lb/dynamics:/usr/local/openresty/nginx/conf/dynamics
#   logging:
#      driver: json-file
#      options:
#        max-size: 50m
#       max-file: '3'
#    network_mode: host
#    restart: always

#启动rainbond
dc-compose up -d 
```



## 部署FAQ

Q：扩展计算节点后如何上线？

A： 

```bash
#通过下面的命令获取计算节点的uuid
grctl node list 
#上线计算节点
grctl node up <uuid@compute>
```



Q：切换存储为GFS，应该怎么做？

A：

```bash
#将管理节点的/grdata目录备份
cp  /grdata /grdata-old
#挂载gfs
mount -t glusterfs compute01:gv0 /grdata
#将原始的/grdata内容写入gfs
cp /grdata-old /grdata
```



Q：prometheus无法启动怎么办？

A：

```bash
#更改目录权限
chmod 777 /grdata/services/promethes
#启动
dc-compose up -d
```



Q：新建应用无法拉取镜像怎么办？

A：

```bash
#重新生成仓库相关文件
mv /grdata/services/artifactory-manage01 /grdata/services/artifactory-manage01-old
dc-compose up -d 
```



## 验证

经验证，该架构是可以满足 **第二级** 高可用特性的最小架构。
