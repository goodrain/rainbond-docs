---
title: kubernetes
summary: kubernetes，apiserver，controller-manager，schedule
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

Kubernetes是Google团队发起并维护的基于Docker的开源容器集群管理系统，云帮即是通过Kubernetes来管理自己的容器集群的。Kubernetes中运行在管理节点的有三个组件：kube-apiserver、kube-controller-manager、kube-scheduler，下面来分别说明这三个组件的信息。

##kube-apiserver

- 概述

  主要提供了云帮内应用服务的增、删、改、查以及监控的功能，是云帮集群内各个模块数据交互通信的枢纽，提供了应用集群管理的API入口。

- 组件信息

| 类型   | 位置                                       |
| :--- | :--------------------------------------- |
| 开机自启 | 是                                        |
| 安装包  | gr-kube-apiserver                        |
| 启动文件 | /usr/lib/systemd/system/kube-apiserver.service |
| 启动脚本 | /usr/share/gr-kubernetes/scripts/start-kube-	apiserver.sh |

- 维护命令

```bash
##启动|停止|重启kube-apiserver：
systemctl start|stop|restart kube-apiserver
##查看日志：
journalctl -fu kube-apiserver
```

##kube-controller-manager

- 概述

  是云帮集群内部的管理控制中心，负责云帮集群的应用的垂直，水平伸缩(资源调度)的管理。当某个用户的应用意外宕机，controller manager会及时发现故障并自动修复，确保集群始终处于预期的工作状态。

- 组件信息

| 类型   | 位置                                       |
| :--- | :--------------------------------------- |
| 开机自启 | 是                                        |
| 安装包  | gr-kube-controller-manager               |
| 启动文件 | /usr/lib/systemd/system/kube-controller-manager.service |
| 启动脚本 | /usr/share/gr-kubernetes/scripts/start-kube-controller-manager.sh |

- 维护命令

```bash
##启动|停止|重启kube-controller-manager：
systemctl start|stop|restart kube-controller-manager
##查看日志：
journalctl -fu kube-controller-manager
```

##kube-scheduler

- 概述

kube-schedule组件主要功能是负责调度应用，当用户在云帮上创建一个应用，kube-schedule会把这个应用调度到好雨后端的一台合适的服务器上来执行创建操作。

- 组建信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 开机自启 | 是                                        |
| 安装包  | gr-kube-scheduler                        |
| 启动文件 | /usr/lib/systemd/system/kube-scheduler.service |
| 启动脚本 | /usr/share/gr-kubernetes/scripts/start-kube-scheduler.sh |

- 维护命令

```bash
##启动|停止|重启kube-scheduler：
systemctl start|stop|restart kube-scheduler
##查看日志：
journalctl -fu kube-scheduler
```

