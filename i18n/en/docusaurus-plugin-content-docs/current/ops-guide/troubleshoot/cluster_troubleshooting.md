---
title: Rainbond cluster problem diagnosis
description: Mainly introduces the problems of Rainbond cluster and their troubleshooting ideas
weight: 2000
---

This article is suitable for troubleshooting Rainbond cluster problems, which are problems with the running of some Rainbond clusters, not the problems of users deploying their own services.According to different scenarios, we divide Rainbond cluster problems into two categories：

- [console issues](#控制台问题).Even when using Rainbond, some warnings pop up from the upper right corner, or some unexpected displays.We will use the exhaustive method to enumerate the solutions to such problems.

- [cluster side issues](#集群端问题排查).Rainbond is deployed and run in the user's Kubernetes cluster in the form of Pods. If there is a problem with these Pods in the `rbd-system` namespace, we will give specific ideas and ways to solve the problem.The essence of cluster-side problems is the problems that may occur when Pods are running in a Kubernetes cluster.

### console problem

:::info
When operating in the console page, a warning prompt box pops up in the upper right corner, or other unexpected display situations, refer to the following to troubleshoot the problem.
:::

#### Troubleshoot ideas

The console page is provided by the `rbd-app-ui` service. When there is a problem, check its log first, and troubleshoot the problem according to the log.

console log address：

- For allinone type consoles,：enters the rainbond-allinone container, and the console log is located at `/app/logs/goodrain.log`

- Based on Helm installation and deployment, enter `rbd-app-ui` pods under `rbd-system` namespace, and the console log is located at `/app/logs/goodrain.log`

- For the case of migrating[console](/docs/installation/install-with-ui/console-recover)to the cluster, enter the web terminal of the console component, and the console log is located at `/app/logs/goodrain.log`

#### common problem

:::warning When the following words appear in the upper right corner warning：

- Cluster side exception
- Service deserted :::

This type of problem indicates that there is a problem with the console itself. According to [troubleshooting ideas](#排查思路) query and analyze `goodrain.log` log files to solve the problem.

:::warning When the following words appear in the upper right corner warning：

- Data center operation failure, please try again later :::

This type of problem means that there is a problem with the interface interaction between the console and the cluster. Open the browser debugging page, re-trigger the problem, and view the return of the problem interface.After obtaining the detailed information, submit an issue and interact with the official to obtain a solution.

### Cluster-side troubleshooting

:::info
When it is clearly found that the Rainbond Pod running in the Kubernetes cluster is in an abnormal state, refer to the following to troubleshoot the problem.
:::

#### Troubleshoot ideas

The Rainbond cluster should be running in a healthy Kubernetes cluster, so you should first make sure that all nodes in the Kubernetes cluster are healthy.If the confirmation is correct, further check the Pod status under the `rbd-system` namespace, and then solve the problem according to the status.

#### Steps

Before troubleshooting components, first confirm that your cluster is at fault with the Rainbond components and not with Kubernetes itself.

- When the cluster fails, the first thing to do is to check whether the nodes in the cluster are in the ready state：

```bash
$ kubectl get nodes
NAME STATUS ROLES AGE VERSION
192.168.2.146 Ready master 4d2h v1.17.2
```

- For the node in question, view the details on the node and event：

```bash
kubectl describe node <node name>
```

After confirming that the Kubernetes cluster status is healthy, you can start to check the status of each Pod in the Rainbond cluster.

- View the status of all components of Rainbond, all components of Rainbond are located in the `rbd-system` namespace

```bash
$ kubectl get pods -n rbd-system

NAME READY STATUS RESTARTS AGE
mysql-operator-7c858d698d-g6xvt 1/1 Running 0 3d2h
nfs-provisioner-0 1/1 Running 0 4d2h
rainbond-operator-0 2/2 Running 0 3d23h
rbd-api-7db9df75bc-dbjn4 1/1 Running 1 4d2h
rbd-app-ui-75c5f47d87-p5spp 1/1 Running 0 3d5h
rbd-app-ui-migrations-6crbs 0/1 Completed 0 4d2h
rbd-chaos-nrlpl 1/1 Running 0 3d22h
rbd-db-0 2/2 Running 0 4d2h
rbd-etcd-0 1/1 Running 0 4d2h
rbd-eventlog-8bd8b988-ntt6p 1/1 Running 0 4d2h
rbd-gateway-4z9x8 1/1 Running 0 4d2h
rbd-hub-5c4b478d5b-j7zrf 1/1 Running 0 4d2h
rbd-monitor-0 1/1 Running 0 4d2h
rbd-mq-57b4fc595b-ljsbf 1/1 Running 0 4d2h
rbd-node-tpxjj 1/1 Running 0 4d2h
rbd-repo-0 1/1 Running 0 4d2h
rbd-webcli-5755745bbb-kmg5t 1/1 Running 0 4d2h
rbd-worker-68c6c97ddb-p68tx 1/1 Running 3 4d2h
```

- If there is a Pod state that is not Running, you need to check the Pod log. You can basically locate the problem itself through the Pod log.

Example：

View component logs

```bash
kubectl logs -f  <pod name>  -n rbd-system
```

#### Common Pod Abnormal Status

- Pending

This state usually means that the Pod has not been scheduled to a Node. You can view the current Pod event by running the following command, and then judge why it is not scheduled.

```bash
kubectl describe pod <pod name>-n rbd-system
```

View the contents of the Events field to analyze the cause.

- Waiting or ContainerCreating

This state usually means that the Pod is in the waiting state or the creation state. If it is in this state for a long time, use the following command to view the events of the current Pod.

```bash
 kubectl describe pod <pod name>  -n rbd-system
```

View the contents of the Events field to analyze the cause.

- imagePullBackOff

This state usually means that the mirror pull failed. Use the following command to see what mirror failed to pull, and then check locally whether there is the mirror.

```bash
kubectl describe pod <pod name>  -n rbd-system
```

Check the contents of the Events field to see the image name.

Check whether the mirror exists locally

```bash
docker images | grep <image name>
```

- CrashLoopBackOff

The CrashLoopBackOff status indicates that the container has been started, but exited abnormally; in general, it is a problem with the application itself, and you should check the log of the container first.

```bash
kubectl logs --previous <pod name> -n rbd-system
```

- Evicted

The eviction state is more common when the Pod is expelled due to insufficient resources. Generally, it is due to insufficient system memory or disk resources. You can check the resource usage of the docker data directory with `df -Th` If the percentage is greater than 85%, it is necessary to promptly Clean up resources, especially some large files and docker images.

Use the following command to clear pod：whose status is Evicted

```bash
kubectl get pods | grep Evicted | awk '{print $1}' | xargs kubectl delete pod
```

- FailedMount

If the volume fails to be mounted, it is necessary to check whether the specified file system client is installed on all host nodes.For example, by default, Rainbond will install nfs as the cluster shared storage by itself, you may see the following error in Events：`Unable to attach or mount volumes: unmount volmes=[grdata access region-api-ssl rainbond-operator-token -xxxx]: timed out waiting for the condition`.This is usually because the host does not have nfs client packages such as `nfs-client` or `nfs-common` installed.

#### Common cluster-side issues

### my question is not covered

If, after reading this document, you are still at a loss as to how to make your cluster work, you can：

Go to [GitHub](https://github.com/goodrain/rainbond/issues) to check if there are related issues, if not, submit issues

Go to [Community](https://t.goodrain.com/) to search for your question and find answers to similar questions

Get [official](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), we will contact you as soon as possible
