---
title: Rainbond组件运维
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1304
description: 节点组件配置说明及组件健康检查说明
hidden: true
---

目前Rainbond绝大多数组件都是由node维护，即由node生成服务的配置文件并启动。目前所有关于rainbond服务(除node外)的配置文件目录：`/opt/rainbond/conf`

### 服务配置说明

|配置文件|节点类型|具体组件|说明|
|--------|------------|------------|------------|
|base.yaml|管理节点*|rbd-repo,rbd-hub|基础服务组件
|db.yaml|管理节点|rbd-db|数据库组件
|dns.yaml|管理节点*/计算节点*|rbd-dns|dns组件
|etcd.yaml|管理节点*|etcd|etcd组件
|etcd-proxy.yaml|计算节点*|etcd-proxy|etcd-proxy组件
|health.yaml|管理节点*/计算节点*||系统健康检查组件，如存储等
|k8s-master.yaml|管理节点*|kube-controller-manager,kube-scheduler,kube-apiserver|k8s master组件
|k8s-worker.yaml|计算节点*/复用的管理节点(仅第一个管理节点)|kubelet|k8s worker组件
|master.yaml|管理节点*||Rainbond管理节点组件
|network.yaml|管理节点*/计算节点*|calico/flannel|网络组件
|only_health.yaml|管理节点*/计算节点*||docker/nfs server health检查组件
|ui.yaml|管理节点*|rbd-app-ui|控制台组件

### 调整服务配置

需要调整组件配置，只需修改组件对应的`/opt/rainbond/conf/`目录下的yaml文件即可。修改完成后只需执行`node service update`动态更新服务配置。

```bash
# 停某服务
node service stop <服务名>
# 更新并启动某服务
node service update <服务名>
# 更新并启动所有服务配置
node service update
```

### 服务日志查看

默认所有服务组件都可以使用`journalctl`或`systemctl`命令来查看服务日志或者服务状态。  
另外除`node`和`kubelet`服务外，其他服务还可以使用`docker logs`命令来查看服务日志。

{{% notice note %}}
rbd-app-ui的日志默认是写到文件，可以在`/opt/rainbond/logs`目录下看到相关日志信息。
{{% /notice %}}


### 节点健康检查机制

所有类型节点将由Node服务进行不间断的健康检查。节点是否健康取决于节点的物理状态、资源状态和服务状态等综合因素。Rainbond支持通过HTTP协议、TCP、UDP协议、SHELL命令三种策略定义检查项目。

若某项检查项目标识为不健康状态，当前节点将被标识为不健康状态。

对于不健康的节点Rainbond提供两级自动处理机制：

* 检测到异常的服务一段时间依然未恢复（取决于配置的时间段）将自动重启服务。
* 若计算节点被标注为不健康，节点控制器将会自动将其禁止应用调度直到节点恢复健康。

### 默认的节点检查项目

| 节点类型 | 检查项目 | 检查方式 |
| -------- | -------- | -------- |
| 管理节点 |     rbd-registry     |     HTTP     |
| 管理节点 |     rbd-repo     |     HTTP     |
| 管理节点 |     rbd-db     |     TCP     |
| 管理节点, 计算节点 | rbd-dns | TCP |
| 管理节点 | etcd | TCP |
| 计算节点 | etcd-proxy | TCP |
| 管理节点, 计算节点 | docker | CMD |
| 管理节点, 计算节点 | storage | CMD |
| 管理节点, 计算节点 | local-dns | CMD |
| 管理节点 | kube-apiserver | HTTP |
| 管理节点 | kube-scheduler | TCP |
| 管理节点 | kube-controller-manager | TCP |
| 管理节点, 计算节点 | kubelet | TCP |
| 管理节点 | rbd-gateway | HTTP |
| 管理节点 | rbd-api | HTTP |
| 管理节点 | rbd-chaos | HTTP |
| 管理节点 | rbd-mq | HTTP |
| 管理节点 | rbd-webcli | HTTP |
| 管理节点 | rbd-worker | HTTP |
| 管理节点 | rbd-monitor | HTTP |
| 管理节点 | rbd-eventlog | HTTP |
| 管理节点, 计算节点 | calico | CMD |
| 管理节点 | rbd-app-ui | HTTP |

### 确定节点状态是否健康

```
# 在管理节点执行如下命令,观察节点状态，如果节点处于unhealth,说明节点不健康
grctl node list
# 查看不健康节点哪些服务异常
grctl node get <unhealth节点的UID>
```

### 常见的异常错误处理方式

##### grctl cluster 或 grctl node list 报 500错误

此错误一般是由于node组件或api组件运行异常导致，查询node组件日志查询原因。
```
# 查询node组件日志
journalctl -fu node 

# 查询api组件日志
journalctl -fu rbd-api
```
查询日志若不能自己解决问题，请到Rainbond社区发帖咨询。

#### 存储健康检测不通过

大部分情况下，存储健康检测不通过主要是存储同步有问题。

* 确定异常节点是否挂载了/grdata  
* 确定存储是否同步  
* 手动执行`/opt/rainbond/health/storage.sh`,看退出码是否为0  
* 确定GlusterFS存储安装正确，且所有节点上存储服务可用

#### Rainbond组件异常

可以通过系统工具来查看服务状态,如

```
systemctl status rbd-worker
journalctl -fu rbd-worker
```

Rainbond自己的组件如果有异常可以来排除是否是etcd服务或者rbd-db服务异常，然后手动重启相关服务 `systemctl restart <相关服务>`

#### repo组件异常

大部分情况下请确定主机名是否能反解ip即 主机名能否ping通。

#### 自定义检查项目

默认情况下，所有服务配置文件都在`/opt/rainbond/conf/`目录下

示例自定义检查项

主要配置就是health部分检查项,其他地方默认即可

目前检测方式有3种

1. cmd 使用脚本或者命令行
2. tcp 使用ip:port模式
3. http 使用http协议检测

```yaml
version: '2.1'
services:
- name: docker
  health:
    name: docker
    model: cmd
    address: /opt/rainbond/health/check_docker.sh
    max_errors_num: 5
    time_interval: 10
  after:
    - network.target
  requires:
    - network.target
  only_health_check: true
  start: none
  restart_policy: always
  restart_sec: 10
```
