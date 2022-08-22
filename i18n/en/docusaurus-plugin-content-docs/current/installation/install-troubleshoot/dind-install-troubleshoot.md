---
title: 'Troubleshooting Guide for Single-Server Experience Version Installation'
weight: 201
description: 'troubleshot'
---

If there is a problem installing the stand-alone version of Rainbond, you can troubleshoot the problem according to the current documentation.

## problem performance

The installation time of the stand-alone version of Rainbond is controlled at about 8 minutes. If the actual installation time exceeds this time, you can start to consider actively observing the installation process.

Different from the normal container log output, when the installation of the single-machine experience version of Rainbond is not completed normally, the terminal output will be in the following state for a long time:：

```
Loading data, expected 3 minutes, time depends on disk performance...
Starting Rainbond, expected 5 minutes...
```

## Troubleshoot ideas

The single-machine experience version of Rainbond will run all the services and components required for running in a container called rainbond-allinone in the form of a container or POD, which uses a technology called dind (Docker In Docker), all the Troubleshooting will be done in the rainbond-allinone container environment.

Throughout the installation process, some tasks are performed in the following order：

1. Start the supervisord process manager
2. Start the dockerd service in the container
3. Start the k3s service in the container
4. Start Rainbond components

The entire investigation process will also focus on the implementation of these tasks.

Before starting the investigation, start a new terminal and execute the following command to enter the rainbond-allinone container environment：

```bash
docker exec -ti rainbond-allinone bash
```

## Start supervisord stage

supervisord is a concise and robust process manager, through which the stand-alone version of Rainbond manages all services in a unified manner.

Supervisord is not prone to errors. If no obvious error level log output is found in the terminal output during the previous `docker run ...` startup process, it means that it is working normally and the current troubleshooting step can be skipped.

## Start the dockerd stage

The rainbond-allinone container will start a dockerd service running as a background process, which will then start and manage a series of containers.

Execute the following command in a terminal to determine if dockerd started normally.

```bash
docker info
```

If the details of the current dockerd service are returned correctly, it means that the dockerd service is running normally and the current troubleshooting steps can be skipped.

If the following information is returned, it means that dockerd failed to start, and in-depth investigation is carried out according to the dockerd log.

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

### dockerd logs

The startup log of the dockerd service is located in file `/app/logs/dind.log` Query the log content and pay attention to the error level log output.Some possible scenarios and solutions are listed below.

### dockerd FAQ list

In log `/app/logs/dind.log` , the following error level log output may be found.

- failed to start daemon: Error initializing network controller: error obtaining controller instance: failed to create NAT chain DOCKER: iptables failed: iptables -t nat -N DOCKER: iptables v1.6.0: can't initialize iptables table `nat': Table does not exist (do you need to insmod?)

:::info The operation of dockerd depends on the iptables kernel module, which may not be loaded on some operating systems (perhaps using nftables).Try executing `modprobe ip_tables` on the host to load this module. :::

- failed to start daemon: pid file found, ensure docker is not running or delete /var/run/docker.pid

:::info
This situation means that the container failed to shut down properly last time. After manually deleting the /var/run/docker.pid file, restart the rainbond-allinone container.
:::info


## Start the k3s stage

The rainbond-allinone container will start a k3s service running as a background process as an orchestration tool inside the container.

Enter the following command in the terminal to determine if k3s starts normally.

```bash
kubectl get node
```

If the current k3s node list is returned and it is in the Ready state, it means that k3s is working normally and the current troubleshooting step can be skipped.

```
NAME STATUS ROLES AGE VERSION
node Ready control-plane,master 14m v1.22.3+k3s1
```

If it does not return normally, it means that k3s failed to start, and in-depth investigation is carried out according to the k3s log.

### k3s log

The startup log of the k3s service is located in file `/app/logs/k3s.log` Query the log content and pay attention to the error level log output.Some possible scenarios and solutions are listed below.

### k3s FAQ list

In log `/app/logs/k3s.log` , the following error level log output may be found.

(time=\"2022-03-07T09:52:49+08:00\" level=fatal msg=\"unable to select an IP from default routes.\"\ntime=\"2022-03-07T09:52 :53+08:00\" level=fatal msg=\"unable to select an IP from default routes.\""})

:::info
This problem is generally that there is no default route (to the Internet), so Kubernetes can't determine which IP to use, to solve this problem set a default route, or use a non-no driver, by configuring the k3s startup parameters may help you solve the problem --extra-config=apiserver.advertise-address=127.0.0.1
:::

- unable to create proxier: unable to create ipv4 proxier: can't set sysctl net/ipv4/conf/all/route_localnet to 1: open /proc/sys/net/ipv4/conf/all/route_localnet: read-only file system

:::info Confirm that you omit parameters `--privileged` or `-v ~/rainbonddata:/app/data`in your `docker run ...` startup command.If you customize the data persistence directory of k3s, you should also add the corresponding persistent mount path setting. :::

- Failed to create cgroup" err="cannot enter cgroupv2 \"/sys/fs/cgroup/kubepods\" with domain controllers -- it is in an invalid state

:::info
In earlier versions of rainbond-allinone, cgroupv2 was not yet supported.And cgroupv2 was used in Docker Desktop versions higher than 4.2.0, which caused the conflict.So please downgrade Docker Desktop to version 4.2.0 and below.Or use the latest version of the single-player version of Rainbond.
:::

- level=info msg="Set sysctl 'net/netfilter/nf_conntrack_max' to 196608
- level=error msg="Failed to set sysctl: open /proc/sys/net/netfilter/nf_conntrack_max: permission denied

:::info When encountering the above problems, you can modify the corresponding parameter in the host to the same value in the log. In the Linux operating system, execute `sysctl -w net/netfilter/nf_conntrack_max=196608` ; If the above operation does not To solve the problem, or if you encounter this problem in non-linux OS, you can add environment variable `-e K3S_ARGS="--kube-proxy-arg=conntrack-max-per- in <code>docker run ...` startup command core=0"
:::

- /usr/lib/libbz2.so.1.0.8: no space left on device

:::info The disk space in the host is insufficient, increase the disk space or delete unnecessary files to free up space; for Docker Desktop users, you can refer to [Disk utilization](https://docs.docker.com/desktop/mac/space/) to learn how to change the disk space limit. :::


## Start the Rainbond stage

The rainbond-allinone container starts a series of pods under the rbd-system namespace. These pods provide various functional support for Rainbond.Execute the following commands in a terminal command line to get information about these pods.

```bash
kubectl get pod -n rbd-system
```

By observing the running status of the pod, the expected running status is n/n Running

```bash
NAME READY STATUS RESTARTS AGE
rbd-etcd-0 1/1 Running 0 2d22h
rainbond-operator-5f785ff5f6-2dvq6 1/1 Running 0 2d22h
rbd-gateway-4ss6z 1/1 Running 0 2d22h
rbd-hub-64777d89d8- vvjn5 1/1 Running 0 2d22h
rbd-node-bsmnj 1/1 Running 0 2d22h
rbd-webcli-8c6849dc6-8lx98 1/1 Running 0 2d22h
rbd-mq-5fcfb64d86-w8bjl 1/1 Running 0 2d22h
rbd- monitor-0 1/1 Running 0 2d22h
kubernetes-dashboard-fbd4fb949-5lf88 1/1 Running 0 2d22h
dashboard-metrics-scraper-7db45b8bb4-mqbpm 1/1 Running 0 2d22h
rbd-resource-proxy-8654b98bc9-4rvnq 1 /1 Running 0 2d22h
rbd-db-0 2/2 Running 0 2d22h
rbd-chaos-xn6zr 1/1 Running 0 2d22h
rbd-worker-8664fb5d9-zcfw4 1/1 Running 0 2d22h
rbd-eventlog-0 1 /1 Running 0 2d22h
rbd-api-6f6c565856-bq9bp 1/1 Running 0 2d22h
```

When some of the above pods are not in the Running state, they need to be checked according to their current state.The abnormal state may include：Pending, CrashLoopBackOff, Evicted, etc.

- Pending

:::info Pending state means that the current pod has not been able to enter the startup process normally, and the pod may be blocked by tasks that need to be executed before startup, so it is in the pending (Pending) state.To understand why the startup of a pod (taking rbd-etcd-0 as an example) is blocked, execute the command `kubectl describe pod rbd-etcd-0 -n rbd-system` and observe the output of the last events section to determine the current events of the pod .And follow the prompts to investigate further. :::

- CrashLoopBackOff

:::info CrashLoopBackOff status means that the current pod can be started normally, but the container inside it exits by itself, which is usually due to a problem with the internal service.To understand why the pod (taking rbd-etcd-0 as an example) fails to start, run the command `kubectl logs -f rbd-etcd-0 -n rbd-system` , observe the log output, and use the business log to determine the cause of the problem . :::

- Evicted

:::info Evicted status means that the current pod has been expelled by the scheduling system. The reasons for triggering the eviction may include high disk occupancy of the root partition, high disk occupancy of the data partition when the container is running, etc. According to experience, the above reasons are the most common , a disk space cleanup is required to remove the eviction state.You can determine the status of the current node by executing the command `kubectl describe node` and observing the output of the `Conditions` paragraphs in the return. :::
### FAQ when starting Rainbond
Viewing pod details may encounter the following problems
- {"type":"Warning","reason":"FailedScheduling","message":"0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/disk-pressure: }, that the pod didn't tolerate.","from":"","age":"0s"}]}]}

:::info
or more errors can be analyzed through several points. The first：is to confirm whether the current node has enabled scheduling. Generally, the master node is not allowed to schedule, so this error will appear. The second：docker and the basic environment do not You can also get this "tainted" type of message when enough resources are allocated. For example, in Docker Desktop for Mac, allocate more memory/cpu/swap in preferences, and other resources, it might solve your problem.
:::
## problem report

The current installation troubleshooting document may not be able to guide you to complete the troubleshooting of installation problems. Welcome to Rainbond's official repository https://github.com/goodrain/rainbond/issues to search for other people's problem experience, or submit your own installation If there is a problem, an engineer will follow up to solve the problem.
