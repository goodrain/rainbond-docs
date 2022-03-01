---
title: calico组件说明
description: "calico组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成calico的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat calico`获取calico的systemd配置文件  
> calico服务是通过镜像运行  

calico默认配置文件`/opt/rainbond/conf/network.yaml`

### 常用参数说明

```
-e IP=<当前节点IP>
-e CALICO_IPV4POOL_CIDR=<POD CIDR>
-e NODENAME=<当前节点Node的UUID>
```

### 健康检查

`/opt/rainbond/health/network.sh` 检查容器是否运行