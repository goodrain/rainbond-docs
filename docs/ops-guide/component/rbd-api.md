---
title: rbd-api
description: "rbd-api组件参数说明"
---

## rbd-api组件说明

rainbond区域中心API服务，提供底层服务接口

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明


```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  args:
  - --api-addr          # api服务器侦听地址（默认为“127.0.0.1:8888”）
  - --enable-feature    # 支持的特殊功能列表
  - --log-level         # 日志级别（默认“info”）
  - --mysql             # mysql数据库连接信息
  - --etcd              # etcd服务器或代理地址
  - --api-ssl-enable    # 是否启用websocket SSL
  - --api-addr-ssl      # api服务器侦听地址（默认为“0.0.0.0:8443”）
  - --api-ssl-certfile  # websocket和文件服务器ssl证书文件
  - --api-ssl-keyfile   # websocket和文件服务器ssl密钥文件
  - --client-ca-file    # api ssl ca文件
  image: rbd-api:v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 2 # 副本
  resources: {} # 资源限制
  volumeMounts:
  - mountPath: /etc/goodrain/goodrain.com/
    name: region-ws-ssl
  volumes:
  - name: region-ws-ssl
    secret:
      defaultMode: 420
      secretName: region-ws-ssl
```