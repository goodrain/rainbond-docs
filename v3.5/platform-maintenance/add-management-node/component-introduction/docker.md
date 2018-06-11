---
title: docker
summary: 容器，管理引擎，运行，停止，开启容器
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

docker是云帮容器的管理引擎，运行云帮的基础组建的容器化应用，可以控制云帮内容器的开关，查看容器状态等。

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



