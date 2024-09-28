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
kubtl logs -f -l name=env-checker-n rbd-system
```

<details>
<summary>Output is as follows</summary>

```bash
INFO Nfs client already on node 1
INFO 192.168.2.180:80 already
INFO 192.168.2. 80: 443 already
INFO 192.168.2.180:6060 ready
INFO 192.168.2.180:7070 already
INFO 192.168.2. 80:844ady
ERROR Nfs client must be installed on node2!
ERROR Nfs client not detected in node2, please make sure that the package is installed on all hosts.
INFO For CentOS: yum install -y nfs-utils; For Ubuntu: apt install -y nfs-common
```

</details>

### There are only a few Pods, all in Running state, but they are inaccessible

There are about four or five Pods Running in the rbd-system namespace, all in running state, but they cannot be accessed.

1. Check whether the Pod of the RDD-gateway exists. If no, run the following command to check whether the node affinity of the RDD-gateway meets the requirements of the current node. If no, the gateway node is incorrectly configured or there is no corresponding label on the cluster node.Not satisfied, indicates that your gateway node is misconfigured or that there are no tags on cluster nodes.

```bash
kubectl get goods rbd-gateway — n rbd-system -yaml
```

2. If there are rbd-gateway Pods and all Pods are running properly, check the status.conditions field of the user-defined resource rainbondcluster to check the error information, and troubleshoot according to the error.

```bash
kubectl get rainbond cluster - n rbd-system -yaml
```

### All Pods are running properly and the gatewayIngressIPs are specified, but the platform still cannot be accessed

Usually appear in multiple nodes clusters. When you only specify gatewayInressIPs, without a gatewayInressIP, Rainbond will automatically select a node as a gateway.Typically found in multi-node clusters, when you specify only gatewayIngressIPs, but no gateway node, Rainbond automatically selects the node as the gateway node. The gatewayIngressIPs you specify should be able to route traffic to Rainbond's automatically selected gateway node. Otherwise, the platform cannot be accessed. You can view the gateway nodes automatically selected by Rainbond with the following command.Otherwise, you will not be able to access the platform.You can view Rainbond automatically selected gateway node by using the following commands.

```bash
kubectl get rainbond cluster - n rbd-system -yaml
```

To view the nodesForGateway field, you need to route gatewayIngressIPs to the node corresponding to the nodesForGateway field. Alternatively, manually specify the gateway node address in values.yaml at installation time.Or manually specify a gateway node address in values.yaml when installed.

### The Pod is in Pending, CrashLoopBackOff, Evicted, ImagePullBackOff, and other states

#### Pending

When the Pod is in the Pending state, it means that it is not entering the normal startup process, possibly because the task before the startup is blocked. To understand why pod startup is blocked, using rbd-etcd-0 as an example, you can run the command 'kubectl describe pod rbd-etcd-0 -n rbd-system' to observe event details for further troubleshooting.For example, `kubectl descripte rbd-etcd-etcd-0 can be executed for `kubectl descriptive rbd-etcd-0 -n rbd-system\` observation event details for further sorting.

#### CrashLoopBackOff

The CrashLoopBackOff status means that the Pod starts normally, but the container inside it exits on its own, usually because of an internal service problem. To understand why Pods (using rbd-etcd-0 as an example) fail to start, run the command 'kubectl logs -f rbd-etcd-0 -n rbd-system', observe the log output, and use the service log to determine the cause of the problem.To understand why Pod (using rbd-etcd-0 as example), you can execute the command `kubectl logs---f rbd-etcd-0 -n rbd-system`, observe the output of the log, and use the business log to determine the cause of the problem.

#### Evicted

The Evicted status indicates that the current Pod is expelled from the scheduling system. The expulsion may be triggered by high disk usage in the root partition or high disk usage in the data partition when the container is running. Based on experience, the above causes are most common. You can determine the current state of the node by executing the command 'kubectl describe node' and observing the output of the 'Conditions' section in the return.The status of the current node can be determined by executing the command `kubectl descripbe node`, observing the returned `Conditions` paragraph output.

#### ImagePullBackOff

The ImagePullBackOff status means that Pod image download fails to exit, usually because the image is too large or caused by network check. Take RFD-ETCD-0 as an example. You can run the 'kubectl describe pod rbd-etcd-0 -n rbd-system' command to view event details for further troubleshooting.

### Some Pods have been unable to run, an error has been reported create etcd.v3 client failed, try time is 10,dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host

Taking the error as an example, it can be seen that the host IP was not found during domain name resolution, because the Pod etcd was in Pending state, that is, there was a problem before startup, and it was not registered in the coreDNS of the K8S cluster, usually by querying Pod details. Information about the K8S cluster.
