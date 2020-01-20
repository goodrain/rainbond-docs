---
title: rbd-repo组件说明
description: "rbd-repo组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-repo的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-repo`获取rbd-repo的systemd配置文件  
> rbd-repo服务是通过镜像运行  

rbd-repo默认配置文件`/opt/rainbond/conf/base.yaml`

{{% notice info %}}
Java程序,推荐配置2核4G起,启动时比较占资源
