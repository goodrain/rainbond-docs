---
title: 计算节点服务及维护方式
summary: 计算节点服务，计算节点维护方式
toc: true
---


本文介绍了 [平台组件说明](../component-description.html) 中所列举出的计算节点服务的维护方式。

##一、 Docker 维护

- 详情参见：[Docker 维护](management-node.html#2-1-docker)

##二、 kubelet 维护

- [官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)
- 相关配置文件

| 文件             | 说明                                   |
| :--------------- | :------------------------------------- |
|/etc/systemd/system/kubelet.service|kubelet的systemd服务文件|
| /opt/rainbond/scripts/start-kubelet.sh | systemd服务文件调用的启动脚本 |
| /opt/rainbond/envs/kubelet.sh | systemd服务文件调用的环境脚本 |

- **启动、停止、查看状态、重启** kubelet 服务

```bash
systemctl start | stop | status | restart kubelet
```

##三、 Node 维护

- 详情参见：[Node 维护](management-node.html#2-3-node)

##四、 Etcd-proxy

- 相关配置文件

| 文件         | 说明                                     |
| ------------ | ---------------------------------------- |
|/etc/systemd/system/etcd-proxy.service|etcd-proxy的systemd服务文件|
| /opt/rainbond/scripts/start-etcdproxy.sh | systemd服务文件调用的启动脚本 |

- **启动、停止、查看状态、重启** etcd-proxy 服务

```bash
systemctl start | stop | status | restart etcd-proxy
```



##五、 Calico 维护

- 详情参见：[Calico 维护](management-node.html#2-5-calico)