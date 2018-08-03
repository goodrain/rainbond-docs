---
title: calico-node
summary: calico-node,calico_node
toc: true
asciicast: true
---


##简述

基于calico的网络服务，实现应用之间的网络通信。

##组件信息

| 类型     | 属性                                       |
| :----- | :--------------------------------------- |
| 开机自启   | 是                                        |
| 安装包    | gr-calico                                |
| 启动文件   | /usr/lib/systemd/system/calico-node.service |
| 环境变量脚本 | /etc/goodrain/envs/etcd-proxy.sh         |
| 启动脚本   | /usr/share/gr-calico/scripts/start-calico.sh |

##维护命令
```bash
##启动|停止|重启etcd-proxy：
systemctl start|stop|restart etcd-proxy
##查看日志：
journalctl -fu etcd-proxy
```