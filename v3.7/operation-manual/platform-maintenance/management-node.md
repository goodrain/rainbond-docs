---
title: 管理节点服务及维护方式
summary: 管理节点服务，管理节点维护方式
toc: true
---

本文介绍了 [平台组件说明](../component-description.html) 中所列举出的管理节点服务的维护方式。

## 一、新的改动

- 相较之前版本的Rainbond，v3.7版本更新了组件服务的维护方式。将所有的服务、组件托管于 **systemd** 。
- 配置文件集中管理。

## 二、Rainbond组件维护

###2.1 组件列表

| 序号 | 服务名称 | 备注|
| -- | --------------------------- |--|
| 1    | rbd-db   |Rainbond 数据库|
| 2 | rbd-hub |镜像仓库组件|
| 3 | rbd-lb |负载均衡组件|
| 4 | rbd-app-ui |UI控制台|
| 5 | rbd-chaos |应用构建组件|
| 6 | rbd-repo |仓库管理工具|
| 7 | rbd-worker |应用生命周期控制组件|
| 8 | rbd-entrance |负载均衡控制器|
| 9 | rbd-api |集群api组件|
| 10 | rbd-dns |集群域名解析服务|
| 11 | rbd-eventlog |负责推送应用日志|
| 12 | rbd-webcli |提供容器命令行界面|
| 13 | rbd-mq |集群消息队列|
| 14 | rbd-monitor |监控|

###2.2 指定组件维护方式

运维人员可以使用 systemd 所提供的命令，来维护Rainbond的每一个组件。

- 当你想要 **开始、关闭、查看状态、重新启动** ：

```bash
systemctl start | stop | status | restart [rbd-*]
```

- 当你想要 **获取配置**

```bash
systemctl cat [rbd-*]
```

### 2.3 统一维护Rainbond组件

Rainbond提供了[命令行工具](../cli.html)，统一维护平台的组件。

- 当你想要 **开始、关闭** 所有Rainbond组件：

```bash
grclis start | stop
```

- 查看所有组件运行情况：

```bash
grctl cluster
```



## 三、其它通过systemd管理的服务

除了Rainbond自身各组件，平台还依赖于其它一些服务：docker、kubernetes、etcd、node、calico。运维人员可以通过 **systemctl** 命令对这些服务进行管理；这些服务本身也提供了运维手册。

| 服务名称   | 运维手册                                                     |
| ---------- | ------------------------------------------------------------ |
| docker     | [Docker官方文档](https://docs.docker.com/)                   |
| kubernetes | [Kubernetes官方文档](https://kubernetes.io/cn/docs/)         |
| etcd       | [ETCD官方文档](https://coreos.com/etcd/docs/latest/)         |
| calico     | [Calico官方文档](https://docs.projectcalico.org/v3.1/introduction/) |



### 3.1 Docker 维护

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



### 3.2 Kubernetes 维护

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



### 3.3 Node 维护

- **启动、停止、查看状态、重启** node 服务

```bash
systemctl start | stop | status | restart node
```



### 3.4 Etcd 维护

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



### 3.5 Calico 维护

- **启动、停止、查看状态、重启** calico 服务

```bash
systemctl start | stop | status | restart calico
```

- 获取集群信息及健康状态

```bash
calicoctl node status
```



## 四、配置文件获取

Rainbond v3.7 将所有服务与组件的配置文件集中在一个文件中进行统一管理。

- 配置文件路径： `/opt/rainbond/conf/master.yaml`
