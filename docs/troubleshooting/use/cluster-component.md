---
title: 集群组件异常排查
description: 介绍 Rainbond 集群组件出现的问题及其排查思路
keywords: 
- Rainbond 集群组件异常排查
---

本文介绍 Rainbond 集群组件出现的问题及其排查思路。

## 排查思路

如果出现此类问题，你可以根据以下排查思路进行排查。

### rbd-api 服务异常

rbd-api 日志报错：

```bash
websocketproxy: Error when copying from client to backend: websocket: close 1006 (abnormal closure): unexpected EOF
```

出现这种问题，可能有两种情况：

1. `rbd-api` 连不上 `rbd-eventlog` 或 `rbd-node` 服务，此时需要检查 `POD` 之间的网络是否正常。
2. `rbd-eventlog` 或 `rbd-node` 的 POD IP 发生变化，而 `rbd-api` 未更新，此时需要重启 `rbd-api` 服务。

### rbd-monitor 服务异常

rbd-monitor 一直处于 0/1 状态，该状态下，Rainbond 的应用视图将无法正常展示，因为无法获取到对应的应用指标数据。

通常，这种情况下，需要检查 `rbd-monitor` 的日志，查看是否有报错信息。

```bash
kubectl logs -fl name=rbd-monitor -n rbd-system
```

可以通过以下方式解决：

:::info
删除 `rbd-monitor` 的 `PVC` 可能会导致历史指标丢失。
:::

```
kubectl delete pvc data-rbd-monitor-0 -n rbd-system
ctrl c 结束
kubectl delete sts rbd-monitor -n rbd-system
kubectl delete pod -l release=rainbond-operator -n rbd-system
```

直至 `rbd-monitor` 服务重新创建并正常启动即可。