---
title: 'helm installation troubleshooting guide'
weight: 202
description: 'troubleshot'
---

#### helm installation troubleshooting guide

If you have problems installing Rainbond via helm, then you can troubleshoot according to the current documentation.

#### problem performance

The time to install rainbond through helm is controlled at about 8 minutes. If the actual installation time exceeds this time, you can start to consider actively observing the installation process.

When the installation is not successful for a long time and there is no obvious error, viewing the pod status will generally be stuck.

```
$ kubectl get po -n rbd-system

NAME READY STATUS RESTARTS AGE
nfs-provisioner-0 1/1 Running 0 2m14s
rainbond-operator-5f9598747-w88rc 1/1 Running 0 2m33s
rbd-etcd-0 0/1 Pending 0 113s
rbd-hub-64777d89d8-rvs45 1/1 Running 0 108s
rbd-node-7gsgl 0/1 Running 0 113s
```

#### Troubleshoot ideas

By installing rainbond through helm, the entire installation process can be subdivided into several tasks. After knowing the entire installation process, problems will also be carried out around the execution of these tasks.

1. helm install will first perform basic environment detection. If the environment does not meet the requirements, the installation process will automatically exit and report an error.
2. Then install the rainbond controller, which is the rainbond-operator.
3. After the controller is successfully started, the components of rainbond will be installed step by step under the control of the operator.
4. The installation of rainbond components is usually order dependent. When the pod starts, it will connect to the database first, or check whether the storage is ready, so when a single component is not Running, you can first check rbd-etcd , nfs-provisioner , rbd- db and other pod logs.
5. Finally, by accessing the `IP:7070` address prompted by the command line interface, accessing the console proves that the installation is successful

#### Environmental detection stage

If the following error is returned after executing the `helm install` command, it means that the environment detection failed：

```bash
Error: failed pre-install: job failed: BackoffLimitExceeded
```

Query the log by the following command, you can know the cause of the problem：

```bash
kubectl logs -f -l name=env-checker -n rbd-system

# Possible outputs are as follows：
INFO Nfs client ready on node node1
INFO 192.168.2.180:80 ready
INFO 192.168.2.180:443 ready
INFO 192.168 .2.180:6060 ready
INFO 192.168.2.180:7070 ready
INFO 192.168.2.180:8443 ready
ERROR Nfs client must be installed
node node2! Install this package on all hosts.
INFO For CentOS: yum install -y nfs-utils; For Ubuntu: apt install -y nfs-common
```

The red ERROR part indicates the problematic node and the corresponding reason, and the environment can be processed according to the description.

#### start component stage

First of all, during the installation process, you can use the following command to check the status of the component pod to judge whether it is normal.

````
kubectl get po -n rbd-system
````

1. When the pod status is Pending, or running for a long time but has not reached READY, you can run the following command to view the detailed information of the pod.

```
kubectl describe po pod_name -n rbd-system
```

2. When you cannot determine the cause by viewing the pod details, you can also troubleshoot by viewing the operator log.

```
kubectl logs -f rainbond-operator -n rbd-system
```

#### common problem

- level=error msg="create etcd.v3 client failed, try time is 10, dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host
> Taking this error report as an example, it can be seen that the host IP was not found when the domain name was resolved, because the etcd pod was in the pending state, that is, there was a problem before it was started, and it was not registered in the coredns of the K8S cluster, usually through Query the detailed information of the pod and the information of the K8S cluster for troubleshooting.

#### Startup successful Pod status

```
root@helm:~# kubectl get po -n rbd-system

NAME READY STATUS RESTARTS AGE
dashboard-metrics-scraper-7db45b8bb4-zrrf7 1/1 Running 0 5h44m
kubernetes-dashboard-fbd4fb949-l6jzg 1/1 Running 0 5h44m
nfs-provisioner-0 1/1 Running 0 5h46m
rainbond-operator-8676899b76-87cbv 1/1 Running 0 5h46m
rbd-api-64d86d5b84-nhzfr 1/1 Running 0 5h43m
rbd-app-ui-5cd9f457fc-6cst6 1/1 Running 0 5h40m
rbd-app-ui-migrations--1-rwd2q 0/1 Completed 0 5h43m
rbd-chaos-v7sbb 1/1 Running 0 5h43m
rbd-db-0 2/2 Running 0 5h44m
rbd-etcd-0 1/1 Running 0 5h45m
rbd-eventlog-0 1/1 Running 0 5h43m
rbd-gateway-mvxdh 1/1 Running 0 5h45m
rbd-hub-64777d89d8-k4ld4 1/1 Running 0 5h45m
rbd-monitor-0 1/1 Running 0 5h44m
rbd-mq-c95cf9857-br9sq 1/1 Running 0 5h44m
rbd-node-s8tfx 1/1 Running 0 5h45m
rbd-resource-proxy-67879f484-fhztx 1/1 Running 0 5h44m
rbd-webcli-6d64c66cb7-vhz44 1/1 Running 0 5h44m
rbd-worker-8485f9ff56-hnnwt 1/1 Running 0 5h43m
```

When some of the above pods are not in the Running state, they need to be checked according to their current state.The abnormal state may contain：Pending , CrashLoopBackOff , Evicted , ImagePullBackOff , etc.

- Pending
> When the component is in the pending state, it means that it has not entered the normal startup process. It may be that the task before startup is blocked, so it is always in the pending state.To understand why pod startup is blocked, take rbd-etcd-0 as an example, you can execute the command`kubectl describe pod rbd-etcd-0 -n rbd-system` to observe the time details for further troubleshooting.

- CrashLoopBackOff
> The CrashLoopBackOff state means that the current pod can be started normally, but the container inside it exits by itself, which is usually due to a problem with the internal service.To understand why the pod (taking rbd-etcd-0 as an example) fails to start, run the command `kubectl logs -f rbd-etcd-0 -n rbd-system` , observe the log output, and use the business log to determine the cause of the problem .

- Evicted
> The Evicted state means that the current pod has been expelled by the scheduling system. The reasons for triggering the eviction may include high disk occupancy of the root partition, high disk occupancy of the data partition when the container is running, etc. According to experience, the above reasons are the most common and require disk space Clean up removes the eviction state.You can determine the status of the current node by executing the command `kubectl describe node` and observing the output of the `Conditions` paragraphs in the return.

- ImagePullBackOff
> The ImagePullBackOff status means that the pod image download failed to exit, usually because the image is too large or caused by network checking. Take rbd-etcd-0 as an example, you can execute the command`kubectl describe pod rbd-etcd-0 -n rbd-system` Observe the time details for further investigation.



#### problem report

The current installation troubleshooting document may not be able to guide you to complete the troubleshooting of installation problems. Welcome to Rainbond's official repository https://github.com/goodrain/rainbond/issues to search for other people's problem experience, or submit your own installation If there is a problem, an engineer will follow up to solve the problem.