---
title: Operation troubleshooting
description: This topic describes how to troubleshoot Rainbond components
keywords:
  - Troubleshooting the operation of components in the process of using Rainbond
---

## runtime problems

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/en-run.png)

When the operation log of the service component indicates that the build is successful, it enters the stage of running the service component. We expect all component instances to show a green `Running` status, but many abnormal situations may occur, which need to be checked step by step according to the guidelines. At this stage, it is necessary to understand the concepts of each stage in [Component Lifecycle](/docs/use-manual/component-manage/overview/service-properties). The subsequent troubleshooting process is also based on the different states of the components.我们期待所有的组件实例都呈现绿色的 `运行中` 状态，然而也可能发生很多的异常情形，需要根据指引一步步排查。在这个阶段，了解 [组件生命周期](/docs/use-manual/component-manage/overview/service-properties) 中各个阶段的概念是十分必要的。后续的排查过程，也是基于组件不同的状态入手。

## common problem

### Components have no running log information

Component logs are pushed through WebSocket. If there is no log information, go to **Platform Management -> Cluster -> Edit** to check whether the `WebSocket` communication address is correct. If the cluster is provided by a public cloud vendor, the address here is internal network IP, then you cannot establish a WebSocket with the cluster locally, and you cannot display logs. Change this to the IP you can connect to locally.将此处修改为你本地能连接上的 IP 即可。

### Troubleshoot runtime issues based on exception status

#### 调度中

The component instance is always in the <font color="#ffa940"> scheduling </font> state

处于 <font color="#ffa940"> 调度中  </font> 状态的实例，体现为橙黄色的方块。说明集群中已经没有足够的资源来运行这个实例。具体的资源项短缺详情，可以点击橙黄色的方块，打开实例详情页面后在 `说明` 处了解到。例如：

```css
Instance Status: Scheduling
Reason: Unschedulable
Explanation: 0/1 nodes are available: 1 node(s) had desk pressure
```

根据 `说明` 可以了解到，当前集群中共有 1 个宿主机节点，但是处于不可用状态，原因是该节点存在磁盘压力。根据原因对节点进行磁盘扩容或空间清理后，该问题会自动解除。常见的资源短缺类型还包括：CPU 不足、内存不足。

#### waiting to start

The component instance has been in the <font color="#ffa940"> waiting to start </font> state

The Rainbond platform determines the startup order based on dependencies between components. If a service component is in the <font color="#ffa940"> waiting to start </font> state for a long time, it means that some of the components it depends on failed to start normally. Switch to the application topology view to sort out the dependencies among components to ensure that the components they depend on are in a normal operating state.Instances in the <font color="#ffa940"> Scheduling </font> state are represented by orange squares. It means that there are not enough resources in the cluster to run this instance. For details about the shortage of specific resource items, you can click the orange square to open the instance details page and learn about it in `Description`. For example:切换至应用拓扑视图梳理组件间依赖关系，确保其依赖的组件都处于正常的运行状态。

#### Abnormal operation

The component instance has been in the state of <font color="red"> running abnormally </font>

运行异常状态意味着该实例遭遇了无法正常运行的情况。An unhealthy state means that the instance encountered a condition that prevented it from functioning properly. Click the red square, you can find prompts on the instance details page, focus on the status of the container in the instance, and continue to troubleshoot the problem based on the different status. The following are common problem states:以下是常见的几种问题状态：

##### ImagePullBackOff

This status indicates that the image of the current container cannot be pulled. Pull down to the `Events` list to get more detailed information. Make sure that the corresponding image can be pulled. If you find that the image that cannot be pulled starts with `goodrain.me`, you can try to build this component to solve the problem.确保对应的镜像可以被拉取，如果发现无法拉取的镜像以 `goodrain.me` 开头，则可以尝试构建该组件解决问题。

##### Etcd 无法启动 pkg/netutil: could not resolve host rbd-etcd:2380

该状态 有可能是`kube-system`命名空间下的`coredns`无法启动，详情查看

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

如果看到`coredns`没有成功运行，可能是镜像无法拉取，可尝试更改镜像

```bash
kubectl edit po coredns-79d84b4865-n6n2x -nkube-system
```

可将 spec.containers.image字段改为`rancher/mirrored-coredns-coredns:1.9.0`

```yaml
spec:
  containers:
    image: rancher/mirrored-coredns-coredns:1.9.0
```

之后该pod会自动重启，稍等片刻再次执行查看pod的命令，查看服务是否恢复正常。

`coredns-autoscaler`也可能出现此问题，可将镜像改为`rancher/mirrored-cluster-proportional-autoscaler:1.8.5`

##### Failed to pull image xxx, denied: You may not login yet

可以构建成功，但是无法滚动更新，这种情况通常是该命名空间下没有`rbd-hub-credential`或者`rbd-hub-credentials`密钥内容不对。
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

从其他命名空间导出yaml。（可自行创建新团队，有了新的命名空间，并且该命名空间下存在`rbd-hub-credentials`）

```bash
kubectl get secret rbd-hub-credentials -o yaml > rbd-hub-credentials.yaml -n <namespace>
```

然后，修改上述yaml的`metadata.namespace`字段，替换成您出问题的命名空间即可。
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

This status indicates that the current container itself failed to start, or is encountering a runtime error. Switch to the `log` page to view the business log output, and solve the problem symptomatically.切换至 `日志` 页面查看业务日志输出，对症解决问题即可。

##### OOMkilled

According to `Description`, we can know that there is a total of 1 host node in the current cluster, but it is in an unavailable state because the node has disk pressure. After expanding the disk capacity or clearing the space of the node according to the reason, the problem will be solved automatically. Common resource shortage types also include: insufficient CPU, insufficient memory.业务容器的内存配置入口位于 `伸缩` 页面。This status indicates that the memory allocated for the container is too small, or there is a memory leak problem in the service itself. The memory configuration entry of the business container is located on the `Scaling` page. The memory configuration entry for the plugin container is located on the `Plugins` page.

### Third-party components are not ready

Follow the steps below for third-party components:

1. Open the internal port of the third-party component
2. Set third-party component health detection
3. Start/update third-party components

It cannot be used normally until the status of the third-party component is `ready`.

If the status of the third-party component is `ready`, but cannot be accessed internally or externally, please troubleshoot by the following steps:

1. Check whether the endpoint created by the third-party component is correct

```bash
kubectl get ep -n <namespace>
```

2. Check whether the service created by the third-party component is correct, and check whether it can be accessed through the curl command

```bash
kubectl get svc -n <namespace>
```

3. Check whether the ingress created by the third-party component is correct

```bash
kubectl get ing -n <namespace>
```
