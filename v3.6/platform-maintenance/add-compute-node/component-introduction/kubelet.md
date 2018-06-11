---
title: kubelet
summary: 资源监控，等待
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

等待Master端分发任务，可以监控和汇报应用资源使用情况。	

##组件信息

| 类型     | 属性                                       |
| :----- | :--------------------------------------- |
| 开机自启   | 是                                        |
| 安装包    | gr-kubelet                               |
| 启动文件   | /usr/lib/systemd/system/kubelet.service  |
| 环境变量脚本 | /etc/goodrain/envs/kubelet.sh            |
| 启动脚本   | /usr/share/gr-kubernetes/scripts/start-kubelet.sh |

##维护命令
```bash
##启动|停止|重启etcd-proxy：
systemctl start|stop|restart kubelet
##查看日志：
journalctl -fu kubelet
```