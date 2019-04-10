---
title: docker组件说明
description: "docker组件参数说明"
hidden: true
---


### 守护运行方式

默认使用官方的安装方式部署docker.

### 常用参数说明

默认配置文件: `/etc/docker/daemon.json`

```json
{
  "insecure-registries": ["goodrain.me"],
  "bip": "172.30.42.1/16",
  "userland-proxy": false,
  "storage-driver": "overlay2",
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "20m",
    "max-file": "2"
    }
}
```

具体参数请参见[docker官方文档](https://docs.docker.com/engine/reference/commandline/dockerd/)


