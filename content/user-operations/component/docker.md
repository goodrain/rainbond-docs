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


### 配置docker信任私有镜像仓库

如果你的私有镜像仓库未配置https或者自签发https证书需要配置docker信任.

* 1. 未配置https或者自签发证书(不被浏览器信任的),则需要配置docker`insecure-registries`值,需要完需要重启docker

```bash
"insecure-registries": ["goodrain.me","hub.test.com"],
```

* 2. 自签发证书，且docker不需要重启

需要将自签发域名的证书拷贝到如下路径 `/etc/docker/certs.d/<私有镜像仓库域名>/`

示例goodrain.me

```bash
root@compute-node-99:/etc/docker/certs.d/goodrain.me# ls
server.crt
```


