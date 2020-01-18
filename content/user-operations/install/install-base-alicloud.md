---
title: "阿里云高可用部署"
weight: 1004
description: "此方式适用于使用阿里云服务资源，此教程将使用阿里云 ECS+NAS+专有网络(弹性IP)等资源指导你部署高可用Rainbond集群"
hidden: true
---

#### 部署说明

本教程将完全基于阿里云环境部署一套高可用的Rainbond平台，主要使用阿里云ECS、NAS、SLB、RDS四类资源。在此之前建议你阅读[Rainbond高可用安装说明文档](/user-operations/install/install-base-ha/)，然后跟随本文档教程的步骤安装一个具有3管理+2网关+2计算的最小高可用Rainbond平台。

{{% notice note %}}

该文档适用于Rainbond 5.1.6及以后版本。

{{% /notice %}}

#### 资源准备

##### ECS虚拟机资源准备

注意磁盘等做好提前格式化和生产配置

| 用途     | 数量 | 操作系统     | 参数配置                                                     |
| -------- | ---- | ------------ | ------------------------------------------------------------ |
| 管理节点 | 3    | Ubuntu 16.04 | 8核/16GB<br />/var/lib/docker 挂载磁盘 200G+<br />/opt/rainbond 挂载磁盘 50G+<br />/cache 挂载磁盘 100G+ |
| 计算节点 | 2+   | Ubuntu 16.04 | 16核/64GB<br />/var/lib/docker 独立挂载磁盘 200G+            |
| 网关节点 | 2    | Ubuntu 16.04 | 4核/8GB                                                      |

创建的专有网络：

![image-20190810171455934](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810171455934.png)

安装组配置：

![image-20190810172102648](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810172102648.png)

创建的ECS（这里只作为演示，资源选择最小化）

![image-20190810173208530](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810173208530.png)

注意：

> ECS我们将外网弹性IP绑定到了第一个节点，将第一个节点接入互联网，其他节点通过配置转发到第一个节点接入互联网。你也可以选择创建NAT网关，将弹性IP绑定到NAT网关上，然后配置ECS通过NAT网关访问互联网，本教程为在线安装Rainbond，因此要求所有ECS必须具备请求公网的能力。

> 参考文档 [如何通过EIP实现VPC下的SNAT](https://t.goodrain.com/t/topic/1297)

> 需要注意的是iptables的设置注意持久化，机器重启后依然生效。

##### 分布式文件存储NAS准备

NAS购买时注意选择与ECS在同一个可用区，NAS默认选择 `SSD性能型`即可。

![image-20190810174302771](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810174302771.png)

创建NAS文件系统，并选择上文创建的专有网络创建挂载点，获取到下述挂载信息备用。

```shell
sudo mount -t nfs -o vers=3,nolock,proto=tcp,noresvport 9232f49391-nxt27.cn-zhangjiakou.nas.aliyuncs.com:/ /mnt
```

##### 负载均衡SLB

我们需要针对Rainbond数据中心管理入口API，应用网关的80/443端口或其他自定义的TCP端口进行外部负载均衡。

| SLB IP/端口              | 后端ECS端口                                              |                           |
| ------------------------ | -------------------------------------------------------- | ------------------------- |
| 106.15.131.130:443(TCP)  | 192.168.10.99:443/192.168.10.96:443                      | HTTPS应用访问             |
| 106.15.131.130:80(TCP)   | 192.168.10.99:80/192.168.10.96:80                        | HTTP应用访问              |
| 106.15.131.130:8443(TCP) | 192.168.10.99:8443/192.168.10.98:8443/192.168.10.97:8443 | 数据中心API负载均衡       |
| 106.15.131.130:6060(TCP) | 192.168.10.99:6060/192.168.10.98:6060/192.168.10.97:6060 | 数据中心Websocket负载均衡 |
| 106.15.131.130:6443(TCP) | 192.168.10.99:6443/192.168.10.98:6443/192.168.10.97:6443 | 数据中心Gateway负载均衡 |

##### RDS准备

购买RDS Mysql 5.6版本数据库，Rainbond应用控制台和数据中心都会使用到Mysql数据库，可以使用一个或分离创建，这里采用同一个数据库，如图为创建的RDS实例：
![image-20190810175753014](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810175753014.png)

开通完成后创建账号/密码，设置连接白名单。

#### 开始部署流程

##### 初始化第一个节点

SSH进入192.168.10.99 ECS服务器，执行下面的初始化命令：

```shell
# 下载Rainbond安装包
wget https://pkg.rainbond.com/releases/common/v5.1/grctl && chmod +x ./grctl

# 执行初始化命令
./grctl init \
--eip=47.92.55.148 \
--iip=192.168.10.99 \
--vip=106.15.131.130 \
--role=manage,gateway  \
--network=calico \
--install-type=online \
--storage=nas \
--storage-args="9232f49391-nxt27.cn-zhangjiakou.nas.aliyuncs.com:/ /grdata nfs vers=3,nolock,proto=tcp,noresvport" \
--enable-exdb \
--exdb-type=mysql \
--exdb-host=rm-8vbxc1qjs02t37to3.mysql.zhangbei.rds.aliyuncs.com \
--exdb-port=3306 \
--exdb-user=rainbond_console \
--exdb-passwd=*****
```

特别注意：复制命令时--storage-args不要有换行。
你需要根据你创建的资源实际情况更改上述命令，需要修改的命令参数说明：

* eip   节点外网IP地址
* iip   节点内网IP地址
* vip   创建的SLB IP地址
* storage-args   NAS创建完成获取到的挂载点参数
* exdb开头的参数则是创建的RDS数据库的相关连接信息。

执行后等待安装完成，预计20分钟左右。如果遇到安装故障，请参考 [安装问题排除文档](/troubleshoot/install-problem/) 解决。

> 注意，安装完成后可以调整SSH server的配置。

执行成功结束后执行下述命令查看集群状态，一切正常后即可进入下述流程。

```shell
grctl cluster
```

![image-20190810204152325](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810204152325.png)

##### 扩容其他两个管理节点

在刚刚初始化完成的节点执行下述命令扩容管理节点。

安装管理节点192.168.10.98：

```shell
grctl node add --iip 192.168.10.98 --role manage --root-pass=***** --install
```

安装管理节点192.168.10.97：

```shell
grctl node add --iip 192.168.10.97 --role manage --root-pass=***** --install
```

##### 扩容一个网关节点

在刚刚初始化完成的节点执行下述命令扩容网关节点。

安装网关节点192.168.10.96:

```shell
grctl node add --iip 192.168.10.96 --role gateway --root-pass=***** --install
```

##### 扩容两个计算节点

在刚刚初始化完成的节点执行下述命令扩容网关节点。

安装网关节点192.168.10.95:

```shell
grctl node add --iip 192.168.10.95 --role compute --root-pass=***** --install
```

安装网关节点192.168.10.94:

```shell
grctl node add --iip 192.168.10.94 --role compute --root-pass=***** --install
```

> 注意，计算节点默认安装成功后是处于offline(离线状态)的，我们需要根据需要执行grctl node up <node_id>命令上线计算节点。这里我们执行下述命令：

```shell
grctl node up 477ff71d-d9db-4f00-8764-60f0b299a656
grctl node up 2481e7cf-8047-48fb-92a0-d7e51c0f64c4
```

##### 应用控制台高可用

rbd-app-ui服务（应用控制台Web服务）默认只在第一个管理节点安装。对于控制台组件的高可用，我们推荐将其以应用的形式运行在平台上。利用平台对无状态服务可以动态伸缩的特性，来保证其高可用性。

详细请参阅 [应用控制台高可用部署](/user-operations/component/app-ui/)

##### 手动调整

安装到这里，还有一些配置需要手动调整，参考 [手动调整过程](/user-operations/install/install-base-ha/#七-手动调整过程)

#### 完成

至此，你已经完成了Rainbond高可用部署，开始部署你的业务应用吧。

![image-20190810212228945](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/image-20190810212228945.png)

下一步参考文档：

[平台使用参考文档](/user-manual/) 

[进阶使用参考文档](/advanced-scenarios/)

[故障诊断参考文档](/troubleshoot/)

