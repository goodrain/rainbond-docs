---
title: 组件介绍
summary: 计算节点组件概览
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

##计算节点组件 



| 组件                                       | 功能                                       |
| ---------------------------------------- | :--------------------------------------- |
| [**docker**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/docker.html) | 用户容器化应用的管理引擎，运行着用户的应用，可以控制用户应用开关，查看应用状态等。 |
| [**rainbond-node**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/rainbond-node.html) | 运行在宿主机的守护进程（daemon service）。它会等待acp-node（Master）分发任务，负责节点服务的安装、监控与管理，当某个组件宕掉不工作的时候，acp-node会尝试修复它，并同时发送此消息给后端。 |
| [**rbd-proxy**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/rbd-proxy.html) | 云帮镜像仓库的反向代理，提高用户请求镜像的。                   |
| [**calico-node**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/calico-node.html) | 基于calico的网络服务，实现应用之间的网络通信。               |
| [**etcd-proxy**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/etcd-proxy.html) | etcd-proxy是计算节点组件etcd的集群的反向代理，将客户请求转发给活动的etcd集群，从而减轻etcd集群的压力。 |
| [**kubelet**](/docs/stable/platform-maintenance/add-compute-node/component-introduction/kubelet.html) | 等待Master端分发任务，可以监控和汇报应用资源使用情况。           |