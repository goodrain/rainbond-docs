---
title: 计算节点服务及维护方式
summary: 计算节点服务，计算节点维护方式
toc: true
---

本文介绍了 [平台组件说明](../component-description.html) 中所列举出的计算节点服务的维护方式。

## 一、 Docker 维护

- 详情参见：[Docker 维护](management-node.html#3-1-docker)

## 二、 kubelet 维护

- [官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)
- 相关配置文件

`/opt/rainbond/conf/worker.yaml`

- **启动、停止、查看状态、重启** kubelet 服务

```bash
systemctl start | stop | status | restart kubelet
```

## 三、 Node 维护

- 详情参见：[Node 维护](management-node.html#3-3-node)

## 四、 Etcd-proxy

- 相关配置文件

`/opt/rainbond/conf/worker.yaml`

- **启动、停止、查看状态、重启** etcd-proxy 服务

```bash
systemctl start | stop | status | restart etcd-proxy
```

## 五、 Calico 维护

- 详情参见：[Calico 维护](management-node.html#3-5-calico)
