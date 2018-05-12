---
title: docker
summary: docker
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

用户容器化应用的管理引擎，运行着用户的应用，可以控制用户应用开关，查看应用状态等。

##组件信息

| 类型     | 属性                                     |
| :----- | :------------------------------------- |
| 开机自启   | 是                                      |
| 安装包    | gr-docker-engine                       |
| 启动文件   | /usr/lib/systemd/system/docker.service |
| 环境变量脚本 | /etc/goodrain/envs/docker.sh           |


##维护命令

```bash
##启动|停止|重启docker：
systemctl start|stop|restart docker
##查看日志：
journalctl -fu docker
```