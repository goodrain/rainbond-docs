---
title: rbd-api组件说明
description: "rbd-api组件参数说明"
hidden: true
---

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明


```shell
    - --api-addr          api服务器侦听地址（默认为“127.0.0.1:8888”）
    - --enable-feature    支持的特殊功能列表
    - --log-level         日志级别（默认“info”）
    - --mysql             mysql数据库连接信息
    - --etcd              etcd服务器或代理地址
    - --api-ssl-enable    是否启用websocket SSL
    - --api-addr-ssl      api服务器侦听地址（默认为“0.0.0.0:8443”）
    - --api-ssl-certfile  websocket和文件服务器ssl证书文件
    - --api-ssl-keyfile   websocket和文件服务器ssl密钥文件
    - --client-ca-file    api ssl ca文件
```