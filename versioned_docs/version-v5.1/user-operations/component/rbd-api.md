---
title: rbd-api组件说明
description: "rbd-api组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-api的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-api`获取rbd-api的systemd配置文件  
> rbd-api服务是通过镜像运行  

rbd-api默认配置文件`/opt/rainbond/conf/master.yaml`

