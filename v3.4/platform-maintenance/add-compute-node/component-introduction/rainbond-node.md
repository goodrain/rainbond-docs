---
title: rainbond-node
summary: 服务安装，守护进程
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

运行在宿主机的守护进程（daemon service）。它会等待rbd-node（Master）分发任务，负责节点服务的安装、监控与管理，当某个组件宕掉不工作的时候，rbd-node会尝试修复它，并同时发送此消息给后端。

##组件信息

| 类型     | 说明                                       |
| :----- | :--------------------------------------- |
| 开机自启   | 是                                        |
| 安装包    | gr-rainbond-node                         |
| 启动文件   | /usr/lib/systemd/system/rbd-node.service |
| 环境变量脚本 | /etc/goodrain/envs/rbd-node.sh           |
| 启动脚本   | /usr/share/gr-rbd-node/scripts/start-node.sh |

##维护命令

```bash
##启动|停止|重启etcd：
systemctl start|stop|restart rbd-node
##查看日志：
journalctl -fu rbd-node
```
