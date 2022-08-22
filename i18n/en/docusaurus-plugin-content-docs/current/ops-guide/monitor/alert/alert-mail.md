---
title: Email alarm
draft: false
weight: 1673
description: Rainbond Email Alarm Configuration Instructions
---


### Overview

This article mainly introduces how to configure Alertmanager to send messages to email alerts.

For details about cluster monitoring and alarm deployment, see [Monitoring and Alarm Deployment](../monitor-alert-deploy/)

### Preconditions

* Users who use email alarms need to have sending and receiving email account information;

### Steps

1. Need to modify the Alertmanager configuration file, click Edit in Environment Configuration -->Configuration File Configuration

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg"  width="100%" />

2. The following is the template file. After the modification is completed, the original configuration file can be overwritten to update the component.

```bash
global:
 resolve_timeout: 5m
 # Email smtp server proxy
 smtp_smarthost: 'smtp.163.com:25'
 # Send email name
 smtp_from: 'XXXXXX@163.com' 
 # Email name
 smtp_auth_username: 'XXXXX@163 .com'
 # Email password or authorization code
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
   # Email configuration for receiving alerts
  - to: 'XXXXX@163.com'
   # Header for receiving email
    headers: { Subject: "[WARN] Rainbond alert email" }
```

This completes the deployment of email alerts.


