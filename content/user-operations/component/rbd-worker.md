---
title: rbd-worker组件说明
description: "rbd-worker组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-worker的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-worker`获取rbd-worker的systemd配置文件  
> rbd-worker服务是通过镜像运行  

rbd-worker默认配置文件`/opt/rainbond/conf/master.yaml`

### 常用参数说明

```
--node-name=<当前节点Node的UUID>
```
