---
title: etcd/etcd-proxy组件说明
description: "etcd&etcd-proxy组件参数说明"
hidden: true
---


### 守护运行方式

> 第一次是通过默认systemd配置文件启动，在node启动完成后由node接管  
> node会重新生成etcd的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat etcd`获取etcd的systemd配置文件  
> etcd/etcd-proxy服务是通过镜像运行  


etcd默认配置文件`/opt/rainbond/conf/etcd.yaml` (管理节点)
etcd-proxy默认配置文件 `/opt/rainbond/conf/etcd-proxy.yaml` (计算节点)

### 常用参数说明

具体参数请参见[etcd官方文档](https://github.com/etcd-io/etcd)


