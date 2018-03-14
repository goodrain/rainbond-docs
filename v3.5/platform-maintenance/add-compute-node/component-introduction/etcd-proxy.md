---
title: etcd-proxy
summary: 
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

etcd-proxy是计算节点组件etcd的集群的反向代理，将客户请求转发给活动的etcd集群，从而减轻etcd集群的压力。

##组件信息

|类型|属性|
|:---|:---|
|开机自启|是|
|安装包|gr-etcd-proxy|
|启动文件|/usr/lib/systemd/system/etcd-proxy.service|
|环境变量脚本|/etc/goodrain/envs/etcd-proxy.sh|
|启动脚本|/usr/share/gr-etcd/scripts/start-proxy.sh|

##维护命令
```bash
##启动|停止|重启etcd-proxy：
systemctl start|stop|restart etcd-proxy
##查看日志：
journalctl -fu etcd-proxy
```