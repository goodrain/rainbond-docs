---
title: Monitor alarm service deployment
description: Rainbond monitoring alarm service deployment description
---

### 概述

Rainbond 监控报警系统基于 Alertmanager 服务， Alertmanager 主要用于接收 Prometheus 发送的告警信息，支持丰富的告警通知渠道，而且很容易做到告警信息进行去重，降噪，分组等，是一款前卫的告警通知系统。

本文档适合意图对 Rainbond 节点或 Rainbond 组件进行监控的用户阅读，讲述如何在 Rainbond部署监控报警系统。

集群监控报警项说明参见 [集群监控报警项说明](./monitor-alert-items)

### 操作步骤

通过应用市场一键安装的方式，可以将 Alertmanager，WeChat，DingTalk，一并部署到你的 Rainbond 环境中。

**安装部署**

- **安装报警服务**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/appmarketinstall.jpg"  width="100%" />

- **运行效果**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/monitoring-alarm.jpg"  width="100%" />

- **在集群中修改 Prometheus配置**

1.首先查看Alertmanager的对外端口

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/altermanagerport.jpg"  width="100%" />

2.修改 Alertmanager 的环境变量，在 环境配置 > 环境变量中修改 WEB_EXTERNAL_URL 的变量值为上面的 Alertmanager 对外端口。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/deploy/deploy-env.png"  width="100%" />

3.在集群中修改monitor的配置，修改连接 alertmanager 的地址，添加如下参数，参数值为上面的 Alertmanager 对外端口。

```bash
$ kubectl edit rbdcomponents.rainbond.io rbd-monitor -n rbd-system
spec:
  args:
  - --alertmanager-address=39.99.54.241:10000
  env:
  - name: REGION_NAME
    value: Rainbond
```

参数解释：

`--alertmanager-address `：rbd-monitor 向 alertmanager 推送消息的地址；

`REGION_NAME`：  自定义集群名字，用以区分多集群同时向一个钉钉群推送消息时分辩不同集群。

如下

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitorconf.jpg"  width="100%" />

删除资源后将会自动重启生效

```bash
kubectl delete statefulsets.apps rbd-monitor -n rbd-system
```

到此完成监控报警服务部署。
