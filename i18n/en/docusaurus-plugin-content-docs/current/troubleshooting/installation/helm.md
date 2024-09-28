---
title: Kubernetes based installation
weight: 202
description: troubleshot
---

If there is a problem when installing with helm on Kubernetes, you can troubleshoot the problem according to the current documentation.

## Frequently asked Questions List

### Installation Error: failed pre-install: job failed: BackoffLimitExceeded

If the basic environment check fails, run the following command to query logs to find out the cause of the problem and rectify the environment according to the description.

```bash
kubectl logs -f -l name=env-checker -n rbd-system
```

<details>
<summary>Output is as follows</summary>

```bash
INFO Nfs client ready on node node1
INFO 192.168.2.180:80 ready
INFO 192.168.2.180:443 ready
INFO 192.168.2.180:6060 ready
INFO 192.168.2.180:7070 ready
INFO 192.168.2.180:8443 ready
ERROR Nfs client must been installed on node node2!
ERROR Nfs 客户端在节点 node2 中没有被检测到, 请确定是否已在所有宿主机安装该软件包.
INFO For CentOS: yum install -y nfs-utils; For Ubuntu: apt install -y nfs-common
```

</details>

### There are only a few Pods, all in Running state, but they are inaccessible

There are about four or five Pods Running in the rbd-system namespace, all in running state, but they cannot be accessed.

1. Check whether the Pod of the RDD-gateway exists. If no, run the following command to check whether the node affinity of the RDD-gateway meets the requirements of the current node. If no, the gateway node is incorrectly configured or there is no corresponding label on the cluster node.不满足，则说明你的网关节点配置有误或集群节点上无对应的标签。

```bash
kubectl get ds rbd-gateway -n rbd-system -oyaml
```

2. If there are rbd-gateway Pods and all Pods are running properly, check the status.conditions field of the user-defined resource rainbondcluster to check the error information, and troubleshoot according to the error.

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -oyaml
```

### All Pods are running properly and the gatewayIngressIPs are specified, but the platform still cannot be accessed

通常出现在多节点集群中，当你只指定了 gatewayIngressIPs，而没有指定网关节点时，Rainbond 会自动选择节点作为网关节点。Typically found in multi-node clusters, when you specify only gatewayIngressIPs, but no gateway node, Rainbond automatically selects the node as the gateway node. The gatewayIngressIPs you specify should be able to route traffic to Rainbond's automatically selected gateway node. Otherwise, the platform cannot be accessed. You can view the gateway nodes automatically selected by Rainbond with the following command.否则将无法访问平台。你可以通过以下命令查看 Rainbond 自动选择的网关节点。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -oyaml
```

To view the nodesForGateway field, you need to route gatewayIngressIPs to the node corresponding to the nodesForGateway field. Alternatively, manually specify the gateway node address in values.yaml at installation time.或者在安装时手动在 values.yaml 中指定网关节点地址。

### The Pod is in Pending, CrashLoopBackOff, Evicted, ImagePullBackOff, and other states

#### Pending

When the Pod is in the Pending state, it means that it is not entering the normal startup process, possibly because the task before the startup is blocked. To understand why pod startup is blocked, using rbd-etcd-0 as an example, you can run the command 'kubectl describe pod rbd-etcd-0 -n rbd-system' to observe event details for further troubleshooting.要了解pod启动为何会受到阻塞，以 rbd-etcd-0 为例，可以执行命令 `kubectl describe pod rbd-etcd-0 -n rbd-system` 观察事件详情，来进一步进行排查。

#### CrashLoopBackOff

The CrashLoopBackOff status means that the Pod starts normally, but the container inside it exits on its own, usually because of an internal service problem. To understand why Pods (using rbd-etcd-0 as an example) fail to start, run the command 'kubectl logs -f rbd-etcd-0 -n rbd-system', observe the log output, and use the service log to determine the cause of the problem.要了解 Pod (以 rbd-etcd-0 为例)的启动为何失败，可以执行命令 `kubectl logs -f rbd-etcd-0 -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。

#### Evicted

The Evicted status indicates that the current Pod is expelled from the scheduling system. The expulsion may be triggered by high disk usage in the root partition or high disk usage in the data partition when the container is running. Based on experience, the above causes are most common. You can determine the current state of the node by executing the command 'kubectl describe node' and observing the output of the 'Conditions' section in the return.可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。

#### ImagePullBackOff

The ImagePullBackOff status means that Pod image download fails to exit, usually because the image is too large or caused by network check. Take RFD-ETCD-0 as an example. You can run the 'kubectl describe pod rbd-etcd-0 -n rbd-system' command to view event details for further troubleshooting.

### Some Pods have been unable to run, an error has been reported create etcd.v3 client failed, try time is 10,dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host

Taking the error as an example, it can be seen that the host IP was not found during domain name resolution, because the Pod etcd was in Pending state, that is, there was a problem before startup, and it was not registered in the coreDNS of the K8S cluster, usually by querying Pod details. Information about the K8S cluster.
