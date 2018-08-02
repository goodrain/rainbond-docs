---
title: 管理节点服务及维护方式
summary: 管理节点服务，管理节点维护方式
toc: false
---

<div id="toc"></div>

本文介绍了 [平台组件说明](../component-description.html) 中所列举出的管理节点服务的维护方式。

## 一、通过docker-compose管理的服务

rainbond平台的组件均通过docker-compose 编排服务，以容器化的形式启动。运维人员可以使用⼀组基于dc-compose的简单命令对它们进行管理。 

- 当你想要查看它们的信息: 

```bash
dc-compose ps
```

- 当你想要 **开始、关闭** ：

```bash
dc-compose start | stop [rbd-*]
```

[rbd-*]代指rainbond的组件名称，如不加，则操作全部组件。

- 组件关闭后，执行以下命令，清除已退出的容器 ：

```bash
cclear
```

- docker-compose.yaml文件变更后，需要重启 ：

```bash
dc-compose up -d 
```

需要指出的是，最新版本的docker-compose.yaml文件，已经被拆解后存放于/opt/rainbond/compose目录下。

- 查看指定组件的日志 ：

```bash
dc-compose logs -f rbd-*
```



## 二、通过systemd管理的服务

除了rainbond自身各组件，平台还依赖于其它一些服务：docker、kubernetes、etcd、node、calico。运维人员可以通过 **systemctl** 命令对这些服务进行管理；这些服务本身也提供了运维手册。

| 服务名称   | 运维手册                                                     |
| ---------- | ------------------------------------------------------------ |
| docker     | [Docker官方文档](https://docs.docker.com/)                   |
| kubernetes | [Kubernetes官方文档](https://kubernetes.io/cn/docs/)         |
| etcd       | [ETCD官方文档](https://coreos.com/etcd/docs/latest/)         |
| calico     | [Calico官方文档](https://docs.projectcalico.org/v3.1/introduction/) |



### 2.1 Docker 维护

- 相关配置文件

|     文件     |             说明            |
| :---------- | :-------------------------- |
|/usr/lib/systemd/system/docker.service|docker的systemd服务文件|
| /opt/rainbond/envs/docker.sh | systemd服务文件调用的环境文件 |

- **启动、停止、查看状态、重启** docker 服务

```bash
systemctl start | stop | status | restart docker
```

- 查看当前宿主机中的容器

```bash
docker ps -a 
```

  此命令可简化为 **dps** 。

- 查看当前可用的镜像

```bash
docker images
```

- **拉取/推送** 镜像

```bash
docker pull | push <registry>/<image>:<tag>  
```

  此命令将拉取或推送<registry>仓库中名为<image>，标签为 <tag>的镜像。 

- 利用镜像运行一个容器

```bash
docker run -ti <registry>/<image>:<tag> [CMD]
```

此命令可以利用指定的镜像运行起⼀个容器，[CMD]选项不是必须的，如不加此选项，容器将自动运⾏镜像中规定好的命令。

- 停止一个容器

```bash
docker stop <Container ID>
```

- 删除容器

```bash
docker rm <Container ID>
```

- 查看容器详细信息

```bash
docker inspect <Container ID>
```

- 在宿主机与容器之间拷贝文件

```bash
docker cp <source_path> <dest_path>
```

容器中路径的格式为 <Container ID>:/path 

- 进入容器shell环境：

```bash
docker exec -ti <Container ID> bash
```

此命令可以简化为:

```bash
 din <Container ID>
```

值得注意的是，当容器不支持bash命令的时候，应该将 **bash** 更改为 **sh**



### 2.2 Kubernetes 维护

- 相关配置文件


|                文件               |                          说明                          |
| :--------------------------------- | :---------------------------------------------------- |
|/etc/systemd/system/kube-apiserver.service | kube-apiserver的systemd服务文件|
| /opt/rainbond/scripts/start-kube-apiserver.sh | kube-apiserver的systemd服务文件调用的启动脚本 |
|/etc/systemd/system/kube-controller-manager.service|kube-controller-manager的systemd服务文件|
| /opt/rainbond/scripts/start-kube-controller-manager.sh | kube-controller-manager的systemd服务文件调用的启动脚本 |
|/etc/systemd/system/kube-scheduler.service|kube-scheduler的systemd服务文件|
| /opt/rainbond/scripts/start-kube-scheduler.sh |     kube-scheduler的systemd服务文件调用的启动脚本     |
|       /opt/rainbond/envs/kube-apiserver.sh       |          kube-apiserver的systemd服务文件调用的环境脚本          |
| /opt/rainbond/etc/kubernetes |              其它配置文件目录              |


- **启动、停止、查看状态、重启** kubernetes 服务（以kube-apiserver为例）

```bash
systemctl start | stop | status | restart kube-apiserver
```

- 获取命名空间（租户ID）

```bash
kubectl get ns
```

- 获取当前集群节点信息

```bash
kubectl get node 
```

- 获取pod信息

```bash
kubectl get pods -n <namespace>
```

- 获取pod的详细信息

```bash
kubectl describe pod <POD ID> -n <namespace>
```

- 禁止向某个节点调度容器

```bash
kubectl cordon <nodeID>
```

- 驱离某个节点上的容器

```bash
kubectl drain <nodeID>
```

- 为某个节点解除不可调度的状态

```bash
kubectl uncordon <nodeID>
```



### 2.3 Node 维护

- 相关配置文件

|       文件       |                功能                |
| :-------------- | :--------------------------------- |
|/etc/systemd/system/node.service|node的systemd服务文件|
|   /opt/rainbond/scripts/start-node.sh   | systemd服务文件调用的启动脚本 |
| /opt/rainbond/etc/rbd-node |  其它配置文件目录 |

- **启动、停止、查看状态、重启** node 服务

```bash
systemctl start | stop | status | restart node
```



### 2.4 Etcd 维护

- 相关配置文件

|     文件    |                说明                |
| :----------- | :--------------------------------- |
|/etc/systemd/system/etcd.service|etcd的systemd服务文件|
| /opt/rainbond/scripts/start-etcd.sh | systemd服务文件调用的启动脚本 |
| /opt/rainbond/envs/etcd.sh | systemd服务文件调用的环境脚本 |

- **启动、停止、查看状态、重启** etcd 服务

```bash
systemctl start | stop | status | restart etcd
```

- 获取集群信息

```bash
etcdctl member list
```

- 健康检查

```bash
etcdctl cluster-health
```



### 2.5 Calico 维护

- 相关配置文件

|文件       |说明                  |
| :------------- | :-----------------------------------|
|/etc/systemd/system/calico.service|calico的systemd服务文件|
|/opt/rainbond/scripts/start-calico.sh   |systemd服务文件调用的启动脚本 |
|/opt/rainbond/envs/calico.sh |systemd服务文件调用的环境脚本      |

- **启动、停止、查看状态、重启** calico 服务

```bash
systemctl start | stop | status | restart calico
```

- 获取集群信息及健康状态

```bash
calicoctl node status
```



