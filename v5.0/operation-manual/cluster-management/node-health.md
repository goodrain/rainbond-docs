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
| 管理节点, 计算节点 | docker | HTTP |
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



## 三、常见的异常错误处理方式

| 节点类型 | 异常原因 | 处理方式 |
| -------- | -------- | -------- |
|          |          |          |
|          |          |          |
|          |          |          |

## 四、自定义检查项目

