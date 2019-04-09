---
title: rbd-db组件说明
description: "rbd-db组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-db的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-db`获取rbd-db的systemd配置文件  
> rbd-db服务是通过镜像运行  

rbd-db默认配置文件`/opt/rainbond/conf/db.yaml`

