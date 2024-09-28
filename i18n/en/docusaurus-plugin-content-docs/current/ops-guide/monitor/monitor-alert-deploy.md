---
title: Monitor alarm service deployment
description: Rainbond monitoring alarm service deployment description
---

### General description

Rainbond Alert is based on the Alertmanager service, which is mainly used to receive warning messages from Prometheus, supports a rich alarm notification channel and is easy to use warning information for weight, noise reduction, clustering and so on.

This document is suitable for users who intend to monitor Rainbond nodes or Rainbond components and describes how to deploy MCS alert systems.

See [集群监控报警项说明](/monitor-alert-items) for group monitoring alert entries

### Action step

You can deploy Alertmanager, WeChat, DingTalk to your Rainbond environment by applying the one-click installation method.

**Installation of deployments**

- **Install Alarm Service**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/appmarketinstall.jpg"  width="100%" />

- **Running effects**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/monitoring-alarm.jpg"  width="100%" />

- **Modify Prometheus configuration in cluster**

1. First see Alertmanager's external port

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/altermanagerport.jpg"  width="100%" />

2.modifies Alertmanager's environment variables, modifies the variable value of WEB_EXTERNAL_URLs to Alertmanager above in the environment configuration > environment variable.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/deploy-env.png"  width="100%" />

3. Modify the monitor's configuration in the cluster, modify the address connected to alertmanager, add the following parameters, value being Alertmanager external port above.

```bash
$ kubtl edit rbdcomponents.rainbond.io rbd-monitor - n rbd-system
spec:
  args:
  - --alertmanager-address=39.99.54.241:10000
  env:
  - name: REGION_NAME
    value: Rainbond
```

Argument Explanation：

`--alertmanager-address `：rbd-monitor to send messages to alertmanager;

`REGION_NAME`：  Custom cluster name to differentiate multiple clusters while pushing messages to a pegged group.

The following

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitorconf.jpg"  width="100%" />

Removing resources will automatically restart and take effect

```bash
kubtl delete statefulsets.apps rbd-monitor -n rbd-system
```

This will complete the monitoring alert service.
