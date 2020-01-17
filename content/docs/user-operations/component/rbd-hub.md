---
title: rbd-hub组件说明
description: "rbd-hub组件参数说明"
hidden: true
---

> rbd-hub基于registry镜像

### 守护运行方式
 
> node会生成rbd-hub的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-hub`获取rbd-hub的systemd配置文件  
> rbd-hub服务是通过镜像运行  

rbd-hub默认配置文件`/opt/rainbond/conf/base.yaml`

