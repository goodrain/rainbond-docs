---
title: 监控报警部署
draft: false
weight: 1402
description: Rainbond平台监控报警配置说明
---


### 概述

Rainbond 监控报警系统基于 Alertmanager 服务， Alertmanager 主要用于接收 Prometheus 发送的告警信息，支持丰富的告警通知渠道，而且很容易做到告警信息进行去重，降噪，分组等，是一款前卫的告警通知系统。


本文档适合意图对 Rainbond 节点或 Rainbond 组件进行监控的用户阅读，讲述如何在 Rainbond部署监控报警系统。

目前支持的报警方式：钉钉报警 及 邮件报警。

集群监控报警项说明参见 [集群监控报警项说明](/docs/user-operations/monitor/monitor-alter-items/)

### 前提条件

1. 使用钉钉报警的用户需要拥有钉钉机器人 Webhook 地址，通过 Webhook 接收报警信息，获取方式参阅 [官方文档](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq)；
2. 使用邮件报警的用户需要拥有 发送邮箱及接收邮箱 账户信息；
3. 应用市场中已存在 监控报警服务 应用模版，在线安装的用户可以通过应用市场进行安装，离线用户可以通过下载 [监控报警服务](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/appmarket/%E7%9B%91%E6%8E%A7%E6%8A%A5%E8%AD%A6%E6%9C%8D%E5%8A%A1-5.2.1.zip) 离线包 [导入](/docs/enterprise-manager/enterprise/appcenter/add-app/#应用导入)。

### 操作步骤

通过应用市场一键安装的方式，可以将 Alertmanager，DingTalk，一并部署到你的 Rainbond 环境中。

**安装部署**

- **安装报警服务**

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/appmarketinstall.jpg"  width="100%">}}

- **运行效果**

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitoring-alarm.jpg"  width="100%">}}

- **在集群中修改 Prometheus配置**

首先查看Alertmanager的对外端口

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/altermanagerport.jpg"  width="100%">}}

在集群中修改monitor的配置，修改连接 alertmanager 的地址，添加如下参数，参数值为上面的 Alertmanager 对外端口。

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

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitorconf.jpg"  width="100%">}}

删除资源后将会自动重启生效

```bash
kubectl delete statefulsets.apps rbd-monitor -n rbd-system
```
- **配置报警方式**

   - 邮件报警
   
   需要修改 Alertmanager 配置文件，在 环境配置-->配置文件配置 中点击编辑
   
   {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/manager.jpg"  width="100%">}}
   
   以下是模板文件，修改完成之后覆盖原配置文件更新组件即可。
   
```bash
global:
 resolve_timeout: 5m
 # 邮箱smtp服务器代理
 smtp_smarthost: 'smtp.163.com:25'
 # 发送邮箱名称
 smtp_from: 'XXXXXX@163.com' 
 # 邮箱名称
 smtp_auth_username: 'XXXXX@163.com'
 # 邮箱密码或授权码
 smtp_auth_password: 'XXXXXXXX'
 smtp_require_tls: false
route:
 group_by: ['alertname']
 group_wait: 20s
 group_interval: 5m
 repeat_interval: 5m
 receiver: 'webhook'
receivers:
- name: 'webhook'
  email_configs:
   # 接收警报的email配置
  - to: 'XXXXX@163.com'
   # 接收邮件的标题
    headers: { Subject: "[WARN] Rainbond报警邮件" }
```

到此完成邮件报警的部署。

   - 钉钉报警

  
1.获取钉钉 Webhook 地址时的安全设置建议设置如下：
  
   {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/dingding.jpg"  width="70%">}}
     
2.获取到钉钉 Webhook 地址后手动修改 DingTalk 组件的 Webhook 地址

在 DingTalk 组件页面-->环境配置 中修改 `WEBHOOK_ADDRESS` 变量值，修改完成之后更新即可生效。

   {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/setaddress.jpg"  width="100%">}}

 
到此完成钉钉报警的部署。 


