---
title: Troubleshooting Cluster components
description: This section describes Rainbond cluster component faults and troubleshooting methods
keywords:
  - Rainbond Troubleshooting Cluster Component Abnormalities
---

This article introduces the problems and troubleshooting ideas of Rainbond cluster components.

## Troubleshoot ideas

If such problems occur, you can troubleshoot according to the following troubleshooting ideas.

### rbd-api service exception

The rbd-api log reports an error:

```bash
websocketproxy: Error when copying from client to backend: websocket: close 1006 (abnormal closure): unexpected EOF
```

There are two possible situations where this problem occurs:

1. `rbd-api` cannot connect to `rbd-eventlog` or `rbd-node` services. At this time, you need to check whether the network between `POD` is normal.
2. The POD IP of `rbd-eventlog` or `rbd-node` has changed, but `rbd-api` has not been updated. In this case, the `rbd-api` service needs to be restarted.

### rbd-monitor service exception

rbd-monitor is always in 0/1 state. In this state, the application view of Rainbond will not be displayed normally, because the corresponding application indicator data cannot be obtained.

Usually, in this case, you need to check the `rbd-monitor` log to see if there is any error message.

```bash
kubectl logs -fl name=rbd-monitor -n rbd-system
```

It can be solved by:

:::info
Removing `PVC` for `rbd-monitor` may result in loss of historical metrics.
:::

```
kubectl delete pvc data-rbd-monitor-0 -n rbd-system
ctrl c end
kubectl delete sts rbd-monitor -n rbd-system
kubectl delete pod -l release=rainbond-operator -n rbd-system
```

Until the `rbd-monitor` service is recreated and started normally.
