---
title: 集群问题排查
weight: 30005
Description: "集群问题排查、诊断、解决"
hidden: false
pre: "<b>6.3 </b>"
---

<div id="toc"></div>


### 集群状况确认

执行命令：

```bash 
grctl cluster
``` 

[详细了解grctl](../user-operations/tools/grctl/)

```bash 
              	Used/Total       	Use of
CPU            	30/48            	63%
Memory         	133056/193288    	68%
DistributedDisk	1461Gb/10485760Gb	0.01%
+-------------------------+-----------------------+-----------------------------------------------+
| Service                 | HealthyQuantity/Total | Message                                       |
+-------------------------+-----------------------+-----------------------------------------------+
| ClusterStatus           | available             |                                               |
| rbd-monitor             | 1/1                   |                                               |
| rbd-repo                | 1/1                   |                                               |
| rbd-webcli              | 1/1                   |                                               |
| calico                  | 4/4                   |                                               |
| rbd-app-ui              | 1/1                   |                                               |
| Ready                   | 4/4                   |                                               |
| rbd-dns                 | 4/4                   |                                               |
| storage                 | 4/4                   |                                               |
| kubelet                 | 3/3                   |                                               |
| rbd-eventlog            | 1/1                   |                                               |
| rbd-hub                 | 1/1                   |                                               |
| rbd-java-buildpack      | 1/1                   |                                               |
| etcd                    | 1/1                   |                                               |
| etcd-proxy              | 3/3                   |                                               |
| rbd-mq                  | 1/1                   |                                               |
| r6d-dingding            | 1/1                   |                                               |
| rbd-grafana             | 1/1                   |                                               |
| kube-apiserver          | 1/1                   |                                               |
| rbd-api                 | 1/1                   |                                               |
| rbd-db                  | 1/1                   |                                               |
| rbd-gateway             | 1/1                   |                                               |
| NodeUp                  | 4/4                   |                                               |
| docker                  | 4/4                   |                                               |
| r6d-alertmanager        | 1/1                   |                                               |
| rbd-chaos               | 1/1                   |                                               |
| rbd-worker              | 1/1                   |                                               |
| KubeNodeReady           | 3/3                   |                                               |
| local-dns               | 4/4                   |                                               |
| kube-controller-manager | 1/1                   |                                               |
| kube-scheduler          | 1/1                   |                                               |
+-------------------------+-----------------------+-----------------------------------------------+

+--------------------------------------+-------------+-----------+---------------+----------------+
| Uid                                  | IP          | HostName  | NodeRole      | Status         |
+--------------------------------------+-------------+-----------+---------------+----------------+
| 959eba4b-6bbe-4ad5-ba0f-ecfad17d378d | 10.10.10.10 | manage01  | manage,gateway| running        |
+--------------------------------------+-------------+-----------+---------------+----------------+
| b4e3a2dd-ccef-410b-93a8-95d19a18b282 | 10.10.20.10 | compute01 | compute       | running        |
| 4756d361-afbc-4283-b60e-1bfdcd8e4b5e | 10.10.20.11 | compute02 | compute       | running        |
| e96f51b7-5c12-4b48-a126-8a91e9df5165 | 10.10.20.12 | compute03 | compute       | running        |
+--------------------------------------+-------------+-----------+---------------+----------------+
```



集群正常的表现：
所有服务的Message框为空；
所有节点的Status为绿色的 running；
集群中至少同时存在 manage、gateway、compute角色各一个。




执行 `grctl cluster` 没有正常反馈上述集群状态信息，请参见 [grctl cluster反馈异常](#其他报错排查)



### 节点状态问题排查

#### 异常状态及处理

节点状态只有在体现为绿色的 `running` 时为正常，出现其他状态时，参见下表：

| 节点状态                               | 原因                                   | 处理方式                                                     |
| -------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| running(unhealth)                               | 节点有服务处于异常                     | grctl node get <该节点UID>                                   |
| running(unschedulable)                 | 节点正常，但处于不可调度状态           | grctl node uncordon <该节点UID>                              |
| running(unschedulable,unhealth)        | 节点有服务处于异常，并处于不可调度状态 | grctl node get <该节点UID><br />处理问题<br />grctl node uncordon <该节点UID> |
| offline                                | 节点未上线，或者node服务异常                             | grctl node up <该节点UID> <br />检查节点 node 服务状态                                   |
| unknown                                | 节点状态未知                           | 检查该节点与管理节点时间同步<br />检查节点 node 服务状态                             |
| install_failed(unschedulable,unhealth) | 节点安装失败                           | 参见[安装问题排查](./install-problem/)           |
| not_installed                              | 节点未安装                             | grctl node install <该节点UID>                               |

### 服务异常处理

#### 问题定位

Rainbond为集群中每一个节点上运行的每一个与集群相关的服务，都配置了健康检查。其结果会在 `grctl cluster` 命令的返回中有显示。



如果Rainbond检测到某个节点上有服务处于异常状态，会在异常服务所对应的 Message 列表中显示详细信息，格式为 `HostName:详细错误信息` ；同时，对应的节点 Status 中出现 unhealth 字样。



```bash 
| rbd-api |  0/1 | manage01:Get http://127.0.0.1:8443: dial tcp 127.0.0.1:8443: connect: connection refused/ |
```

```bash
+--------------------------------------+-------------+-----------+----------+-------------------+
| Uid                                  | IP          | HostName  | NodeRole | Status            |
+--------------------------------------+-------------+-----------+----------+-------------------+
| 959eba4b-6bbe-4ad5-ba0f-ecfad17d378d | 10.10.10.10 | manage01  | manage   | running(unhealth) |
+--------------------------------------+-------------+-----------+----------+-------------------+
```

上述信息表明：manage01节点上，名为 `rbd-api` 的服务处于异常状态。详细信息说明manage01节点连接本地 8443 端口失败，而 8443 端口正是 `rbd-api` 服务监听端口。


需要注意的是，这里连接失败的端口号，未必一定是报错服务的端口号，也可能是该服务所依赖的其他服务


查询该服务运行状态

```bash
systemctl status rbd-api
```
返回
```bash 
● rbd-api.service - rbd-api
   Loaded: loaded (/etc/systemd/system/rbd-api.service; enabled; vendor preset: enabled)
   Active: inactive (dead) since Tue 2019-08-06 17:17:02 CST; 13s ago
  Process: 24249 ExecStop=/bin/bash -c docker stop rbd-api (code=exited, status=0/SUCCESS)
 Main PID: 8491 (code=killed, signal=TERM)
```
发现该服务处于 `inactive (dead)` 状态。至此，问题定位完成。



Rainbond所有服务监听端口参见 [服务组件端口说明](../user-operations/op-guide/component-description/#3-2-服务组件端口说明)，通过报错端口，可以快速定位异常发生位置




### 基于服务日志排查问题



Rainbond 自带的 node 服务会自动维护所有服务失败重启。如果问题持续存在，说明服务遇到了无法通过重启能够解决的问题。



Rainbond组件日志全部托管于 `journal` ，日志查询方式： `journalctl -fu <服务名称>`

比如：

```bash
journalctl -fu rbd-api
```

查询日志后，引起错误的原因将会有所提示，下面是一些日志中可能出现的关键字：

#### Unable to find image

```bash
Error response from daemon: No such container: rbd-api
Started rbd-grafana.
Unable to find image 'goodrain.me/rbd-api:v5.1.5-release' locally
docker: Error response from daemon: manifest for goodrain.me/rbd-api:v5.1.5-release not found.
```

该报错表征本地不存在指定的镜像。

- 解决方案：
    - 检查配置文件，是否写错了镜像地址
    - 确认其他节点（多数情况下是首个管理节点）是否存在该镜像，如果有，执行 `docker push goodrain.me/rbd-api:v5.1.5-release`
    - 获取Rainbond指定版本镜像包来抽取对应镜像。[v5.1.5版本对应镜像离线包](../upgrade/5.1.4-5.1.5/#下载-5-1-5-更新包)

#### error: dial tcp xx.xx.xx.xx:3306: connect: connection refused

```bash
Started rbd-api.
error: dial tcp 192.168.195.1:3306: connect: connection refused
main process exited, code=exited, status=1/FAILURE
```

该报错显示 `rbd-db` 服务，或者用户对接的外部数据库连接失败。

- 解决方案：
    - `systemctl status rbd-db` 检查数据库服务是否正常/检查自定义对接的外部数据库运行是否正常
    - 检查当前服务配置文件，连接mysql的地址、用户名、密码
    - 检查到当前数据库的网络是否有限制


Rainbond 中的服务存在相互依赖的关系。这导致有的服务启动失败，其根本原因是其他组件没有正常提供服务。参见[组件间相互依赖关系](./concrete-operations/service-depend/)




#### The contailer name "XXXX" is already in use by container " ···· "

```bash
/usr/bin/docker: Error response from daemon: Conflict. The container name "/etcd-proxy" is already use by container "d2cb3ce793ef764ae0525ccc". You have to remove (or rename) that container to be able to reuse that name.
See '/usr/bin/docker run --help'
etcd-proxy.service: main process exited, code=exited, status=125/n/a
```

该报错意为已存在同名容器，并且这个容器没有被自动清理。这一般体现出docker服务没有能够正常的工作。

- 解决方案：
    - 尝试手动清理同名容器 `docker rm -f etcd-proxy`
    - 手动清理失败，考虑重启docker服务。[docker服务重启策略](./concrete-operations/how-to-restart/#docker服务重启策略)

### 其他报错排查

#### grctl cluster反馈异常

在执行 `grctl cluster` 后，返回以下信息：

```bash
The current cluster api server is not working properly.
You can query the service log for troubleshooting.
Exec Command: journalctl -fu rbd-api
```

或者

```bash
The current cluster node manager is not working properly.
You can query the service log for troubleshooting.
Exec Command: journalctl -fu node
``` 

grctl cluster 命令的执行，依赖于 node 、 rbd-api 两个服务。无论哪个出了问题，都无法正常返回。

- 解决方案：
    - 根据返回的提示，确定问题由上述二服务重的哪一个引起的
    - 根据提示查询日志， `journalctl -fu node/rbd-api`
    - 根据日志提示，先解决 `node/rbd-api` 的问题。参见 [基于服务日志排查问题](#基于服务日志排查问题)


#### storage服务报错

storage服务如有报错，一般情况是文件挂载出了问题，应按照如下步骤操作：

- 报错节点执行 `mount | grep grdata` 观察是否返回正确的挂载路径（挂载路径参考 `/etc/fstab`）
- 如果发现没有挂载，则手动挂载  ` mount -a`
    - 挂载依然失败，根据报错检查系统环境
    - 挂载成功，则重启所有对存储有依赖的服务 rbd-app-ui rbd-hub rbd-api rbd-gateway rbd-worker

#### 我的集群服务器需要重启怎么办

参见 [集群服务器重启策略](./concrete-operations/how-to-restart/#集群服务器重启策略)

#### 集群节点状态为Unknow怎么办
节点状态为“unknow”说明是此节点超过1分钟未上报状态的主节点，造成此问题的原因可能有：
* 此节点node服务运行故障已退出或此节点已关机。
* 此节点的时间与管理节点不一致，集群节点间的时间相差不应该大于30秒，最好设置时间同步服务。

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

- 移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

- 前往[社区](https://t.goodrain.com/) 阅读前缀名为【运维问题】的帖子，寻找相似问题的答案
