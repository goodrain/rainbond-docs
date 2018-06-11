---
title: etcd
summary: 数据库，键值，云帮基础组件数据
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

etcd是一个存储键值的数据库，通过选主和心跳检测机制实现自身服务的高可用和负载均衡。其存储了云帮基础组件的数据信息。

##组件信息

| 类型     | 属性                                   |
| :----- | :----------------------------------- |
| 开机自启   | 是                                    |
| 安装包    | gr-etcd                              |
| 启动文件   | /usr/lib/systemd/system/etcd.service |
| 环境变量脚本 | /etc/goodrain/envs/etcd.sh           |
| 启动脚本   | /usr/share/gr-etcd/scripts/start.sh  |

##维护命令

```bash
##启动|停止|重启etcd：
systemctl start|stop|restart etcd
##查看日志：
journalctl -fu etcd
```

