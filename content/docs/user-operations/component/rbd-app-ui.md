---
title: rbd-app-ui组件说明
description: "rbd-app-ui组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-app-ui的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-app-ui`获取rbd-app-ui的systemd配置文件  
> rbd-app-ui服务是通过镜像运行  

rbd-app-ui默认配置文件`/opt/rainbond/conf/ui.yaml`

### 常用参数说明

日志文件在`/opt/rainbond/logs/rbd-app-ui`

