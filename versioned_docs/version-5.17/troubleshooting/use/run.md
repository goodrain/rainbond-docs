---
title: 运行问题排查
description: 介绍在使用 Rainbond 过程中的组件的运行问题排查
keywords:
- 在使用 Rainbond 过程中的组件的运行问题排查
---

## 运行时的问题

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/run.png)

当服务组件操作日志中提示构建成功时，就进入了服务组件运行的阶段。我们期待所有的组件实例都呈现绿色的 `运行中` 状态，然而也可能发生很多的异常情形，需要根据指引一步步排查。在这个阶段，了解 [组件生命周期](../../use-manual/component-manage/overview/service-properties) 中各个阶段的概念是十分必要的。后续的排查过程，也是基于组件不同的状态入手。

## 常见问题

### 组件无运行日志信息

组件的日志通过 WebSocket 进行推送，如果无日志信息，在 **平台管理 -> 集群 -> 编辑**，查看 `WebSocket` 通信地址是否正确，如果集群是公有云厂商提供的，此处地址是内网 IP，那么你本地无法与集群建立 WebSocket，就无法展示日志。将此处修改为你本地能连接上的 IP 即可。

### 根据异常状态排查运行时问题

#### 调度中

组件实例一直处于 <font color="#ffa940"> 调度中  </font> 状态

处于 <font color="#ffa940"> 调度中  </font> 状态的实例，体现为橙黄色的方块。说明集群中已经没有足够的资源来运行这个实例。具体的资源项短缺详情，可以点击橙黄色的方块，打开实例详情页面后在 `说明` 处了解到。例如：

```css
实例状态：调度中
原因：   Unschedulable
说明：   0/1 nodes are available: 1 node(s) had desk pressure
```

根据 `说明` 可以了解到，当前集群中共有 1 个宿主机节点，但是处于不可用状态，原因是该节点存在磁盘压力。根据原因对节点进行磁盘扩容或空间清理后，该问题会自动解除。常见的资源短缺类型还包括：CPU 不足、内存不足。

#### 等待启动

组件实例一直处于 <font color="#ffa940"> 等待启动  </font> 状态

Rainbond 平台根据组件之间的依赖关系确定启动顺序。如果服务组件长时间处于 <font color="#ffa940"> 等待启动  </font> 状态，则说明其依赖的某些组件未能正常启动。切换至应用拓扑视图梳理组件间依赖关系，确保其依赖的组件都处于正常的运行状态。

#### 运行异常

组件实例一直处于 <font color="red"> 运行异常  </font> 状态

运行异常状态意味着该实例遭遇了无法正常运行的情况。点击红色的方块，可以在实例详情页面找到提示，重点关注实例中的容器的状态，通过状态的不同，来继续排查问题。以下是常见的几种问题状态：

##### ImagePullBackOff

该状态说明当前容器的镜像无法被拉取，下拉至 `事件` 列表处，可以得到更为详细的信息。确保对应的镜像可以被拉取，如果发现无法拉取的镜像以 `goodrain.me` 开头，则可以尝试构建该组件解决问题。

##### Etcd 无法启动 pkg/netutil: could not resolve host rbd-etcd:2380

该状态 有可能是```kube-system```命名空间下的```coredns```无法启动，详情查看
```bash
kubectl get po -nkube-system
```
出现如下列表
```bash
NAME                                  READY   STATUS      RESTARTS        AGE
coredns-79d84b4865-n6n2x              0/1     ImagePullBackOff     1 (5h36m ago)   20h
coredns-autoscaler-b7fd846f5-p5627    1/1     Running     1 (5h36m ago)   20h
kube-flannel-jxmt6                    2/2     Running     2 (5h36m ago)   20h
rke-coredns-addon-deploy-job-q5nps    0/1     Completed   0               20h
rke-network-plugin-deploy-job-bcrsg   0/1     Completed   0  
```

如果看到```coredns```没有成功运行，可能是镜像无法拉取，可尝试更改镜像
```bash
kubectl edit po coredns-79d84b4865-n6n2x -nkube-system
```
可将 spec.containers.image字段改为```rancher/mirrored-coredns-coredns:1.9.0```
```yaml
spec:
  containers:
    image: rancher/mirrored-coredns-coredns:1.9.0
```
之后该pod会自动重启，稍等片刻再次执行查看pod的命令，查看服务是否恢复正常。

```coredns-autoscaler```也可能出现此问题，可将镜像改为```rancher/mirrored-cluster-proportional-autoscaler:1.8.5```


##### Failed to pull image xxx, denied: You may not login yet
可以构建成功，但是无法滚动更新，这种情况通常是该命名空间下没有```rbd-hub-credential```或者```rbd-hub-credentials```密钥内容不对。
可以通过命令查看是否存在该密钥
```bash
kubectl get secret -n <namespace>
```
1. 如果没有该密钥，可以尝试新建yaml后修改关键字段或者从其他命名空间导出yaml文件后修改
```yaml
apiVersion: v1
data:
  .dockerconfigjson: xxx # 认证字段，根据情况修改，如果从新命名空间导出的yaml则不需要修改此字段
kind: Secret
metadata:
  name: rbd-hub-credentials
  namespace: xxx # 命名空间，根据情况修改，一定要修改
type: kubernetes.io/dockerconfigjson
```
从其他命名空间导出yaml。（可自行创建新团队，有了新的命名空间，并且该命名空间下存在```rbd-hub-credentials```）
```bash
kubectl get secret rbd-hub-credentials -o yaml > rbd-hub-credentials.yaml -n <namespace>
```
然后，修改上述yaml的```metadata.namespace```字段，替换成您出问题的命名空间即可。
其次，创建新组件。
```bash
kubectl apply -f rbd-hub-credentials.yaml -n <namespace>
```
最后检查是否运行成功。

2. 如果存在该密钥，则可查看该组密钥的配置是否正确
```bash
kubectl get secret rbd-hub-credentials -n <namespace> -o jsonpath='{.data.\.dockerconfigjson}' | base64 --decode
```
如果认证信息不对，则可尝试删除该密钥
```bash
kubectl delete secret rbd-hub-credentials -n <namespace>
```
删除后根据上述步骤重新建立即可。

##### CrashLoopBackup

该状态说明当前容器本身启动失败，或正在遭遇运行错误。切换至 `日志` 页面查看业务日志输出，对症解决问题即可。

##### OOMkilled

该状态说明为容器分配的内存太小，或业务本身存在内存泄漏问题。业务容器的内存配置入口位于 `伸缩` 页面。插件容器的内存配置入口位于 `插件` 页面。

### 第三方组件未就绪

请按照以下步骤操作第三方组件：

1. 打开第三方组件对内端口
2. 设置第三方组件健康检测
3. 启动/更新第三方组件

直至第三方组件状态为 `就绪`，才能正常使用。

如果第三方组件状态为 `就绪`, 但是无法对内或对外访问，请通过以下步骤排查：

1. 检查第三方组件创建的 endpoint 是否正确
  ```bash
  kubectl get ep -n <namespace>
  ```
2. 检查第三方组件创建的 service 是否正确，并通过 curl 命令检查是否能够访问
  ```bash
  kubectl get svc -n <namespace>
  ```
3. 检查第三方组件创建的 ingress 是否正确
  ```bash
  kubectl get ing -n <namespace>
  ```
