---
title: Modify the default port required for installation
descrition: This chapter is intended for operation and maintenance personnel to learn how to change the default port required for installation.
keywords:
  - Rainbond 修改安装时默认的端口
  - 修改 Rainbond 80 443 8443 6060 端口
---

在 Rainbond 安装过程中，需要使用到 80、443、8443、6060 端口，如果这些端口已经被占用，可以修改安装时所需的默认端口。

- **80、443:** 是 Rainbond 网关的默认端口，用于外部访问。
- **8443:** 是 Rainbond 的 API 端口，用于与控制台与集群端通信。
- **6060:** 是 Rainbond 的 Websocket 端口，用于组件的 Web 终端命令行以及实时推送日志等。

## 前提

- 使用 [Helm 安装 Rainbond](/docs/installation/install-with-helm/)。

## 操作步骤

在使用 Helm 安装之前创建 `values.yaml` 文件，添加如下内容:

```yaml title="values.yaml"
operator:
  env:
  - name: GATEWAY_HTTP_PORT
    value: "8080"
  - name: GATEWAY_HTTPS_PORT
    value: "9443"
  - name: API_PORT
    value: "7443"
  - name: API_WS_PORT
    value: "6066"
Cluster:
  enableEnvCheck: false
Component:
  rbd_gateway:
    args:
    - --service-http-port 8080
    - --service-https-port 9443
  rbd_api:
    args:
    - --api-addr-ssl=0.0.0.0:7443
    - --ws-addr=0.0.0.0:6066
```

参数解释:

- **operator.env** 环境变量解释
  - GATEWAY_HTTP_PORT：定义 Operator 检测网关 HTTP 端口。
  - GATEWAY_HTTPS_PORT：定义 Operator 检测网关 HTTPS 端口。
  - API_PORT：定义 Operator 创建 API 的 Service 和 Ingress 端口。
  - API_WS_PORT：定义 Operator 创建 API Websocket 的 Service 和 Ingress 端口。
- **enableEnvCheck** 用于关闭环境检查，默认会检测 80、443、8443、6060 端口是否被占用，如果被占用则会安装失败。如果设置为 `false`，则不会检测端口占用。
- **--service-http-port** 用于修改 Rainbond 网关的 HTTP 端口。
- **--service-https-port** 用于修改 Rainbond 网关的 HTTPS 端口。
- **--api-addr-ssl** 用于修改 Rainbond 的 API 端口。
- **--ws-addr** 用于修改 Rainbond 的 Websocket 端口。

更多 Helm 安装参数请参考 [Chart 安装选项](/docs/installation/install-with-helm/vaules-config)。

参考 [基于 Kubernetes 安装](/docs/installation/install-with-helm/install-from-kubernetes)。

安装时需要使用 `-f values.yaml` 参数指定配置文件。

### 修改私有镜像配置

:::tip
建议指定外部镜像仓库，下述操作就可跳过，可参考 [Chart 安装选项](/docs/installation/install-with-helm/vaules-config)配置外部镜像仓库。
:::

当执行完安装之后，会看到如下几个 `POD`:

```bash
$ kubectl get pod -n rbd-system
NAME                                 READY   STATUS    RESTARTS   AGE
nfs-provisioner-0                    1/1     Running   0          16m
rainbond-operator-587d56c78c-vs5ng   1/1     Running   0          16m
rbd-etcd-0                           1/1     Running   0          15m
rbd-gateway-mgqhh                    1/1     Running   0          15m
rbd-hub-8d47f589d-kbsgd              1/1     Running   0          15m
rbd-node-jw74s                       1/1     Running   0          15m
```

此时安装状态处于不正常的，需要修改默认的 `goodrain.me` Docker 证书目录以及 `rainbondcluster` 的镜像仓库访问地址为正确的才能继续安装。

- 修改 Docker 证书目录

```bash
mv /etc/docker/certs.d/goodrain.me /etc/docker/certs.d/goodrain.me:9443
```

- 修改镜像仓库地址

```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub:
    domain: goodrain.me:9443
```

:::tip
等待安装完成访问 Rainbond 控制台，参考 [安装进度查询](/docs/installation/install-with-helm/install-from-kubernetes)。
:::
