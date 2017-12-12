---
dtitle: rbd-webcli
summary: 云帮应用终端，浏览器操作容器
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

云帮应用的终端，浏览器界面能直接进入到应用的终端。

## 组件信息

| 类型   | 属性                  |
| :--- | :------------------ |
| 镜像名  | rainbond/rbd-webcli |
| 容器名  | rbd-webcli          |
| 环境变量 | PORT=7171           |
| 开放端口 | 7171                |

##持久化目录

| 宿主机              | 容器内              |
| :--------------- | :--------------- |
| /usr/bin/kubectl | /usr/bin/kubectl |
| /root/.kube      | /root/.kube      |

## 维护命令

```bash
##启动rbd-webcli：
dc-compose up -d rbd-webcli
##停止|重启rbd-webcli:
dc-compose stop|restart rbd-webcli

##查看日志：
dc-compose logs rbd-webcli
```

