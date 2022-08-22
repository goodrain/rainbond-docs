---
title: Monitoring and Alarming Service Deployment
draft: false
weight: 1402
description: Rainbond Monitoring and Alarm Service Deployment Instructions
---


### Overview

The Rainbond monitoring and alarm system is based on the Alertmanager service. Alertmanager is mainly used to receive the alarm information sent by Prometheus. It supports a wealth of alarm notification channels, and it is easy to deduplicate, reduce noise, and group the alarm information. It is an avant-garde alarm notification system.


This document is suitable for users who intend to monitor Rainbond nodes or Rainbond components. It describes how to deploy a monitoring and alarm system in Rainbond.

For the description of cluster monitoring alarm items, see [Cluster Monitoring Alarm Item Description](./monitor-alert-items)

### Preconditions

* There is already a monitoring and alarm service application template in the application market. Users who install online can install it through the application market, and offline users can download [monitoring and alarm service](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/appmarket/%E7%9B%91%E6%8E%A7%E6%8A%A5%E8%AD%A6%E6%9C%8D%E5%8A%A1-5.2.2.zip) offline package [and import](/docs/use-manual/enterprise-manage/appcenter/add-app).

### Steps

Through the one-click installation of the application market, Alertmanager, WeChat, and DingTalk can be deployed to your Rainbond environment.

 **Install and deploy**

- **Install the alarm service**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/appmarketinstall.jpg"  width="100%" />

- **running result**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/monitoring-alarm.jpg"  width="100%" />

- **Modify the Prometheus configuration in the cluster**

1. First check the external port of Alertmanager

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/altermanagerport.jpg"  width="100%" />

2. Modify the environment variable of Alertmanager, and modify the variable value of WEB_EXTERNAL_URL in the environment variable of environment configuration > to the above external port of Alertmanager.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/deploy-env.png"  width="100%" />

3. Modify the configuration of the monitor in the cluster, modify the address connected to the alertmanager, and add the following parameters. The parameter value is the external port of the Alertmanager above.

```bash
$ kubectl edit rbdcomponents.rainbond.io rbd-monitor -n rbd-system
spec:
  args:
  - --alertmanager-address=39.99.54.241:10000
  env:
  - name: REGION_NAME
    value: Rainbond
```

Parameter explanation：

`--alertmanager-address`：rbd-monitor The address to push messages to alertmanager;

`REGION_NAME`：  Customize the cluster name to distinguish different clusters when multiple clusters push messages to one DingTalk group at the same time.


as follows

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitorconf.jpg"  width="100%" />

After deleting the resource, it will automatically restart to take effect

```bash
kubectl delete statefulsets.apps rbd-monitor -n rbd-system
```
This completes the monitoring and alarm service deployment.