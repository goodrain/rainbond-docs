---
title: 重新指定Gateway节点
weight: 5001
---

> rbd-gateway 是好雨科技自研的高性能分布式集群网关，部署在Rainbond 平台上的服务组件可以通过该网关对外暴露域名或者 IP:Port 形式的服务地址，支持 Http协议以及 Tcp 协议。Rainbond 集群在初次安装部署之时，会要求指定将网关节点 （rbd-gateway 部署节点）部署到集群中的某些节点上。那么在集群搭建完成之后，如何重新指定网关节点，切换网关后，又该做哪些操作呢？



### 场景说明

`rbd-gateway` 网关服务通过 `Kubernetes DaemonSet` 控制器，以守护进程的方式部署于 Rainbond 集群中。它具有分布式的特性，可以部署在集群中的任意一个或一批节点上，部署了 `rbd-gateway` 网关服务的节点，称之为网关节点。

Rainbond集群部署之初，会要求指定集群中的某些节点为网关节点。在集群搭建完成之后，如果需要重新规划，希望重新指定网关节点，也是可以的。

### 重新指定网关节点

- 首先，需要保证新网关节点没有监听 `80、443、6060、7070、8443、10254、18080、18081` 端口，避免端口冲突。
- 其次，确保 `rainbond-operator` 使用最新的镜像：

```bash
kubectl edit statefulsets.apps rainbond-operator -n rbd-system
```

确认 `spec.template.spec.containers.image` 字段中  `rainbond-operator` 使用 `v1.1.1` 版本（当前最新版本）镜像，如果低于这个版本，那么就修改它。

```yaml
image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator:v1.1.1
```

- 最后，修改 Rainbond 自定义资源 `rbdcomponents.rainbond.io` 中的 `rbd-gateway` :

```bash
kubectl edit rbdcomponents.rainbond.io -n rbd-system rbd-gateway
```

修改调度亲和性段落的描述：

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - 172.24.206.41 # 这个列表声明 rbd-gateway 会调度到哪些节点上
            - 172.24.206.40 
```

上述调度亲和性的描述中，`values` 指定的是 node 的名字，通过 `kubectl get node` 命令获取

```bash
[root@iZhp38me3xgju205i5udfnZ ~]# kubectl get node
NAME            STATUS   ROLES    AGE   VERSION
172.24.206.41   Ready    master   38d   v1.16.2
```



### 修改流量入口的地址

上一节给出了如何指定调度网关服务（rbd-gateway） 的方法，那么在 `rbd-gateway` 服务迁移到了指定的新节点之后，还需要做什么呢？根据不同的场景，要做的并不一样。

- 第一种场景：网关外层没有负载均衡。
  这种场景下， `rbd-gateway` 服务所在的服务器，就是平台上运行中应用的访问入口。外部访问流量，就通过这个服务器的 IP 流入。那么，就需要修改：

1. 应用绑定域名的解析地址。从域名解析服务供应商处变更域名的解析地址即可。
2. 应用开启对外 TCP 协议之后，暴露 <网关 IP>:<端口>时，这个 IP 也应该被更改。

操作方式是，登陆 Rainbond 所使用的数据库，默认为 `rbd-db` 组件 。更新 `console.region_info` 表内容：

```bash
update console.region_info set wsurl='ws://<新网关IP>:6060',tcpdomain='<新网关IP>';
```



- 第二种场景：网关外层具有负载均衡。比如在 ACK 阿里云环境中，如果是部署了多个网关节点，外部用阿里的 SLB 服务进行了统一负载均衡。那么在 `rbd-gateway` 服务迁移到了指定的新节点之后，只需要将 SLB 负载均衡中的后端实例修改，去掉旧网关IP，加入新网关IP即可。



### 对于其他组件

Rainbond 所有组件都通过 `rbdcomponents.rainbond.io` 这种自定义资源类型来维护、配置，也就是说，你可以通过这种方式，指定任意一个 Rainbond 组件调度到某个或者某一类节点上去。

比如 Rainbond 集群安装之初，也会要求指定构建服务运行节点，也就是部署了 `rbd-chaos` 服务的节点。也是可以通过本文中的方式来重新指定的。