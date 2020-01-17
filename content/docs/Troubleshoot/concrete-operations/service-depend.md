---
title: Rainbond服务组件依赖关系
weight: 30009
Description: "描述Rainbond组件间相互依赖"
hidden: true
---

### 依赖关系

| 组件名称                | 依赖其他组件                                  |
| ----------------------- | --------------------------------------------- |
| rbd-api                 | docker、rbd-db、etcd                          |
| rbd-app-ui              | docker、rbd-db                                |
| rbd-chaos               | docker、rbd-db、etcd                          |
| rbd-worker              | docker、rbd-db、etcd、kube-apiserver          |
| rbd-eventlog            | docker、rbd-db、etcd、kube-apiserver、storage |
| rbd-montior             | docker、etcd                                  |
| rbd-repo                | docker、rbd-gateway                           |
| rbd-hub                 | docker、rbd-gateway、storage                  |
| rbd-webcli              | docker、etcd、                                |
| rbd-gateway             | docker、etcd、storage                         |
| rbd-mq                  | docker、etcd                                  |
| calico                  | docker、etcd                                  |
| kubelet                 | docker、etcd、calico                          |
| kube-apiserver          | etcd                                          |
| kube-controller-manager | kube-apiserver                                |
| kube-scheduler          | kube-apiserver                                |
| etcd                    | docker                                        |
| node                    | etcd                                          |

### 能用来做什么

{{% notice note %}}

这些依赖关系，在排查集群某个服务报错时，显得非常重要。

{{% /notice %}}

举例说明：

当 rbd-api 服务报错并无法通过重启启动时，需要优先查看 docker、rbd-db、etcd 三个组件是否正常。只有在依赖组件全部正常工作的时候，rbd-api的问题排查才有意义。

