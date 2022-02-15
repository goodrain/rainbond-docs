---
title: 'helm 安装问题排查指南'
weight: 204
description: 'troubleshot'
---


通过helm安装 Rainbond 时如果出现问题，那么你可以根据当前的文档进行问题排查。

#### 问题表现

通过helm安装rainbond的时间控制在8分钟左右，如果安装的实际时长远超这个时间，那么你可以开始考虑主动观测安装进程。

当长时间没有安装成功，且没有明显报错，查看pod状态一般会处于卡住状态

```
$ kubectl get po -n rbd-system

NAME                                READY   STATUS    RESTARTS   AGE
nfs-provisioner-0                   1/1     Running   0          2m14s
rainbond-operator-5f9598747-w88rc   1/1     Running   0          2m33s
rbd-etcd-0                          0/1     Pending   0          113s
rbd-hub-64777d89d8-rvs45            1/1     Running   0          108s
rbd-node-7gsgl                      0/1     Running   0          113s
```

#### 排查思路

通过helm安装rainbond，整个的安装过程可以细化分为几个任务：

1. helm install 会首先安装rain bond控制器，也就是rainbond-operator。
2. 控制器启动成功以后，rainbond的组件会在operator的控制下，进行逐步安装。

整个排查的过程，也将围绕这些任务的执行情况进行开展。

#### 启动组件阶段

首先在安装的过程中，可以通过以下命令查看组件pod的状态，来进行判断是否正常。

````
kubectl get po -n rbd-system
````

1. pod状态为Pending，或者长时间Running但是并没有达到READY时，可以通过以下命令查看pod的详细信息。

```
kubectl describe po pod_name -n rbd-system
```

2. 当通过查看pod详细信息，但是无法确定原因时，也可通过查看operator日志进行排错。

```
kubectl logs -f rainbond-operator -n rbd-system
```

#### 常见问题

- Readiness probe failed: Get "http://172.31.112.135:6100/v2/ping": dial tcp 172.31.112.135:6100: connect: connection refused
  - 这个问题一般是，因为网络不通造成的，可以通过查看values.yaml 文件，确定所有必填项IP地址是否填写正确。
- level=error msg="create etcd.v3 client failed, try time is 10,dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host
  - 通常是因为无法连接主机，可以通过查看values.yaml 文件，确定所有必填项IP地址是否填写正确。
- rbd-app-ui Pod 出现 ImagePullBackOff。
  - 这个时候通常是因为网络原因，造成的镜像下载失败。

#### 启动成功的Pod状态

```
root@helm:~# kubectl get po -n rbd-system

NAME                                         READY   STATUS      RESTARTS   AGE
dashboard-metrics-scraper-7db45b8bb4-zrrf7   1/1     Running     0          5h44m
kubernetes-dashboard-fbd4fb949-l6jzg         1/1     Running     0          5h44m
nfs-provisioner-0                            1/1     Running     0          5h46m
rainbond-operator-8676899b76-87cbv           1/1     Running     0          5h46m
rbd-api-64d86d5b84-nhzfr                     1/1     Running     0          5h43m
rbd-app-ui-5cd9f457fc-6cst6                  1/1     Running     0          5h40m
rbd-app-ui-migrations--1-rwd2q               0/1     Completed   0          5h43m
rbd-chaos-v7sbb                              1/1     Running     0          5h43m
rbd-db-0                                     2/2     Running     0          5h44m
rbd-etcd-0                                   1/1     Running     0          5h45m
rbd-eventlog-0                               1/1     Running     0          5h43m
rbd-gateway-mvxdh                            1/1     Running     0          5h45m
rbd-hub-64777d89d8-k4ld4                     1/1     Running     0          5h45m
rbd-monitor-0                                1/1     Running     0          5h44m
rbd-mq-c95cf9857-br9sq                       1/1     Running     0          5h44m
rbd-node-s8tfx                               1/1     Running     0          5h45m
rbd-resource-proxy-67879f484-fhztx           1/1     Running     0          5h44m
rbd-webcli-6d64c66cb7-vhz44                  1/1     Running     0          5h44m
rbd-worker-8485f9ff56-hnnwt                  1/1     Running     0          5h43m
```

当以上的某些 pod 并非处于 Running 状态时，就需要根据其当前状态进行排查。异常的状态可能包含：Pending 、CrashLoopBackOff 、Evicted 等.

#### 问题报告

当前的安装问题排查文档也许并没有能够指引你完成安装问题的故障排除，欢迎到 Rainbond 的官方仓库 https://github.com/goodrain/rainbond/issues 搜索其他人的问题经历，或者提交自己的安装问题，会有工程师跟进问题的解决。

<details class="details-reset details-overlay details-overlay-dark" id="jumpto-line-details-dialog" style="box-sizing: border-box; display: block;"><summary data-hotkey="l" aria-label="Jump to line" role="button" style="box-sizing: border-box; display: list-item; cursor: pointer; list-style: none;"></summary></details>

