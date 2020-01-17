---
title: rbd-webcli组件说明
description: "rbd-webcli组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-webcli的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-webcli`获取rbd-webcli的systemd配置文件  
> rbd-webcli服务是通过镜像运行  

rbd-webcli默认配置文件`/opt/rainbond/conf/master.yaml`