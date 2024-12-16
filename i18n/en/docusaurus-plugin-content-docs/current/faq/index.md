---
title: 常见问题
description: 问题排查
---

## 重置管理员密码

如是快速安装则需要执行 `docker exec -it rainbond bash` 进入容器内执行如下命令。

```bash
kubectl get pod -l name=rbd-app-ui -n rbd-system
kubectl exec -it rbd-app-ui-xxxxx-xxx -n rbd-system bash

执行以下命令即可修改指定用户密码。
python manage.py change_password --username=用户名 --password=新密码
```

## 获取默认镜像仓库 rbd-hub 密码

```bash title="kubectl get rainbondcluster -n rbd-system -o yaml|grep -A 3 imageHub"
imageHub:
  domain: goodrain.me
  password: 2118317a
  username: admin
```

## 扩容网关节点/构建节点

扩容**网关节点/构建节点**是指添加已有的 K8s 节点作为 Rainbond 的网关节点或构建节点。

编辑 `rainbondcluster` CRD 资源，修改 `nodesForGateway/nodesForChaos` 字段，增加网关/构建节点信息。

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  nodesForGateway:
  - name: node-1 #节点名称
    externalIP: 192.168.1.1 #节点外部IP
    internalIP: 192.168.1.1 #节点内部IP
  nodesForChaos:
  - name: node-1 #节点名称
```

重启 `rainbond-operator` Pod 使配置生效。

```bash
kubectl delete pod -n rbd-system -l name=rainbond-operator
```

## 修改已安装 Rainbond 组件镜像地址

`rbd-api、rbd-worker` 等等这些服务的控制器，例如 `Deployment、StatefulSet` 等都是由 `rainbond-operator` 控制，所以直接修改这些控制器的镜像地址是无法生效的。需要修改 `rbdcomponent` CRD 资源。

```yaml title="kubectl edit rbdcomponent -n rbd-system rbd-api"
spec:
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-api:<version>-release
```

可通过 `kubectl get rbdcomponent -n rbd-system` 查看所有组件。

## BuildKit 源码构建配置

默认采用 [BuildKit](https://github.com/moby/buildkit) 作为源码构建镜像打包工具。

BuildKit 配置文件名称默认为 `goodrain-me`，如在安装时指定了镜像仓库名称，则配置文件名称为镜像仓库名称，如 `registry-cn-hangzhou-aliyuncs-com`。

### DockerHub 镜像加速

Dockerfile 源码构建引用 DockerHub 镜像获取超时，修改 BuildKit 配置镜像加速。

```yaml title="kubectl edit cm goodrain-me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."goodrain.me"]
      http = false
      insecure = true
+   [registry."docker.io"]
+     mirrors = ["docker.rainbond.cc"]
kind: ConfigMap
metadata:
  name: goodrain.me
  namespace: rbd-system
```

### 源码构建报错 x509: certificate signed by unknown authority

安装时对接了私有仓库是 HTTP 协议，源码构建时拉取镜像报错 `x509: certificate signed by unknown authority`，需修改 BuildKit 配置文件。

```yaml title="kubectl edit cm goodrain-me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."goodrain.me"]
      http = false
      insecure = true
+   [registry."xxx.xxx.xxx.xxx:5000"]
+     http = true
+     insecure = true
kind: ConfigMap
metadata:
  name: goodrain.me
  namespace: rbd-system
```

## 存储清理

## 启动无法获取镜像 x509: certificate signed by unknown authority

通常是因为 Containerd 的配置不正确导致的。

1. 修改配置文件 `/etc/containerd/config.toml`

```bash
[plugins."io.containerd.grpc.v1.cri".registry.configs]
  [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me"]
    [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me".tls]
       insecure_skip_verify = true
```

2. 添加 Containerd 配置文件 `/etc/containerd/certs.d/goodrain.me/hosts.toml`

```bash
[host."https://goodrain.me"]
  capabilities = ["pull", "resolve","push"]
  skip_verify = true
```

## Web 终端无法使用

Web 终端无法使用，通常是因为 `WebSocket` 地址配置错误导致的。你可以在 `平台管理 -> 集群 -> 编辑集群` 修改 `WebSocket` 地址。

## 默认镜像仓库切换外部镜像仓库

如果在安装集群时采用了默认的 `rbd-hub` 镜像仓库，此时想切换到外部镜像仓库，可以通过以下命令进行切换：

1. 编辑 rainbondcluster 资源，修改 imageHub 字段。

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub: # 修改此字段
    domain: 172.31.112.97:5000
    namespace: rainbond
    password: admin
    username: admin
```

2. 删除 rbd-hub CRD资源。

```bash
kubectl delete rbdcomponent rbd-hub -n rbd-system 
```

3. 重启 `rainbond-operator、rbd-chaos` 组件。

```bash
kubectl delete pod -l name=rainbond-operator -n rbd-system
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## 快速安装添加更多 TCP 端口

快速安装的 Rainbond 默认使用 Docker 启动，并默认映射了 `30000～30010` 10个 TCP 端口供应用测试使用。如果你需要更多的 TCP 端口，通过脚本中打印的命令，删除容器重新启动并添加 `-p` 映射新的端口。
