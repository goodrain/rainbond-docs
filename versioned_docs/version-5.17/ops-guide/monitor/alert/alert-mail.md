---
title: 邮件告警
draft: false
weight: 1673
description: Rainbond邮件报警配置说明
---


### 概述

本文主要介绍如何配置Alertmanager发送消息到邮件报警。

集群监控报警部署请参见 [集群监控报警部署](../monitor-alert-deploy/)

### 前提条件

* 使用邮件报警的用户需要拥有 发送邮箱及接收邮箱 账户信息；

### 操作步骤

1.需要修改 Alertmanager 配置文件，在 环境配置-->配置文件配置 中点击编辑

<img src="https://static.goodrain.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg"  width="100%" />

2.以下是模板文件，修改完成之后覆盖原配置文件更新组件即可。

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


