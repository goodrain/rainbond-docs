---
title: rbd-api
description: "rbd-api component parameter description"
---

## rbd-api component description

rainbond regional center API service, providing the underlying service interface

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description


```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  args:
  - --api-addr # api server listening address (default "127.0.0.1:8888")
  - --enable-feature # list of supported special features
  - --log-level # Log level (default "info")
  - --mysql # mysql database connection information
  - --etcd # etcd server or proxy address
  - --api-ssl-enable # whether to enable websocket SSL
  - --api-addr -ssl # api server listening address (default is "0.0.0.0:8443")
  - --api-ssl-certfile # websocket and file server ssl certificate file
  - --api-ssl-keyfile # websocket and file server ssl key file
  - --client-ca-file # api ssl ca file
  image: rbd-api:v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 2 # replicas
  resources: {} # Resource Limits
  volumeMounts:
  - mountPath: /etc/goodrain/goodrain.com/
    name: region-ws-ssl
  volumes:
  - name: region-ws-ssl
    secret:
      defaultMode: 420
      secretName: region- ws-ssl
```