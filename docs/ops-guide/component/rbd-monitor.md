---
title: rbd-monitor组件说明
description: "rbd-monitor组件参数说明"
---


### 守护运行方式
 
> node会生成rbd-monitor的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-monitor`获取rbd-monitor的systemd配置文件  
> rbd-monitor服务是通过镜像运行  

rbd-monitor默认配置文件`/opt/rainbond/conf/master.yaml`

### 常用参数说明

```
--alertmanager-address AlertManager地址
--cadvisor-listen-port kubelet cadvisor监听端口
--config.file Prometheus 配置文件路径
--rules-config.file Prometheus alerting rules文件路径
--storage.tsdb.retention 数据保留时间，默认7天
```

