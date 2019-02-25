---
title: 节点健康检查说明与故障排查
summary: 本文讲述Rainbond节点健康健康机制和检查项目以及常见问题排查
toc: true

---

<div id="toc"></div>

## 一、节点健康检查机制

所有类型节点将由Node服务进行不间断的健康检查。节点是否健康取决于节点的物理状态、资源状态和服务状态等综合因素。Rainbond支持通过HTTP协议、TCP、UDP协议、SHELL命令三种策略定义检查项目。

若某项检查项目标识为不健康状态，当前节点将被标识为不健康状态。

对于不健康的节点Rainbond提供两级自动处理机制：

* 检测到异常的服务一段时间依然未恢复（取决于配置的时间段）将自动重启服务。
* 若计算节点被标注为不健康，节点控制器将会自动将其禁止应用调度直到节点恢复健康。

## 二、 默认的节点检查项目

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

## 三、确定节点状态是否健康

```
# 在管理节点执行如下命令,观察节点状态，如果节点处于unhealth,说明节点不健康
grctl node list
# 查看不健康节点哪些服务异常
grctl node get <unhealth节点的UID>
```

## 三、常见的异常错误处理方式

### 3.1 存储健康检测不通过

大部分情况下，存储健康检测不通过主要是存储同步有问题。
* 确定异常节点是否挂载了/grdata  
* 确定存储是否同步  
* 手动执行`/opt/rainbond/health/storage.sh`,看退出码是否为0  
* 确定GlusterFS存储安装正确，且所有节点上存储服务可用

### 3.2 Rainbond组件异常

可以通过系统工具来查看服务状态,如

```
systemctl status rbd-worker
journalctl -fu rbd-worker
```

Rainbond自己的组件如果有异常可以来排除是否是etcd服务或者rbd-db服务异常，然后手动重启相关服务 `systemctl restart <相关服务>`

### 3.3 repo组件异常

大部分情况下请确定主机名是否能反解ip即 主机名能否ping通。

## 四、自定义检查项目

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
