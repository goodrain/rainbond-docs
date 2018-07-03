---
title: 计算节点服务及维护方式
summary: 计算节点服务，计算节点维护方式
toc: false
---

<div id="toc"></div>

本文介绍了 [平台组件说明](../component-description.html) 中所列举出的计算节点服务的维护方式。

##一、 Docker 维护

- 详情参见：[Docker 维护](management-node.html#2-1-docker)

##二、 kubelet 维护

- kubelet 启动参数脚本：/opt/rainbond/scripts/start-kubelet.sh

- kubelet 环境配置脚本：/opt/rainbond/envs/kubelet.sh

- [官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)

##三、 Node 维护

- 详情参见：[Node 维护](management-node.html#2-3-node)

##四、 Etcd-proxy

- etcd-proxy 启动参数脚本：/opt/rainbond/scripts/start-etcdproxy.sh

##五、 Calico 维护

- 详情参见：[Calico 维护](management-node.html#2-5-calico)