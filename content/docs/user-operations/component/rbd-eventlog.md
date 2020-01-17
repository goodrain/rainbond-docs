---
title: rbd-eventlog组件说明
description: "rbd-eventlog组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-eventlog的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-eventlog`获取rbd-eventlog的systemd配置文件  
> rbd-eventlog服务是通过镜像运行  

rbd-eventlog默认配置文件`/opt/rainbond/conf/master.yaml`


### 环境变量

```
DOCKER_LOG_SAVE_DAY: 日志保留时间(默认7天)
```