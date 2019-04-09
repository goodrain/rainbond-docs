---
title: rbd-gateway组件说明
description: "rbd-gateway组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-gateway的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-gateway`获取rbd-gateway的systemd配置文件  
> rbd-gateway服务是通过镜像运行  

rbd-gateway默认配置文件`/opt/rainbond/conf/master.yaml`

