---
title: rbd-mq组件说明
description: "rbd-mq组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-mq的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-mq`获取rbd-mq的systemd配置文件  
> rbd-mq服务是通过镜像运行  

rbd-mq默认配置文件`/opt/rainbond/conf/master.yaml`
