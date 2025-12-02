---
title: 修改80/443默认端口
descrition: 该章节文档适用于运维人员了解如何修改安装时所需的默认端口。
keywords:
- Rainbond 修改安装时默认的端口
- 修改 Rainbond 80 443 8443 6060 端口
---

在 Rainbond 安装过程中, 需要使用到 80、443、8443、6060 端口, 如果这些端口已经被占用, 可以修改安装时所需的默认端口。

* **80、443:** 是 Rainbond 网关(APISIX)的默认端口, 用于外部访问。
* **8443:** 是 Rainbond 的 API 端口, 用于控制台与集群端通信。
* **6060:** 是 Rainbond 的 Websocket 端口, 用于组件的 Web 终端命令行以及实时推送日志等。

:::warning 注意
1. 使用 Helm 安装 Rainbond 支持安装是修改默认端口
2. 主机安装方式不支持安装时修改默认端口，安装后可进行修改。
:::

## 安装前修改默认端口

### 前提

* 使用 [Helm 安装 Rainbond](../../installation/install-with-helm/)。
* 了解 Kubernetes 基本操作。

### 步骤 1: 克隆 Chart 仓库

在使用 Helm 安装 Rainbond 之前, 需要先获取 Chart 仓库并修改 APISIX 网关配置。

```bash
git clone https://github.com/goodrain/rainbond-chart.git
cd rainbond-chart
```

### 步骤 2: 修改 APISIX 网关配置

编辑 `templates/apisix-gw-config.yaml` 文件, 找到以下配置项并修改端口:

```yaml title="templates/apisix-gw-config.yaml"
...
apisix:
  proxy_mode: "http&stream"
  ssl:
    enable: true
    listen:
      - port: 9443          # 修改 HTTPS 端口, 默认为 443
  node_listen:
    - 8080                  # 修改 HTTP 端口, 默认为 80
  stream_proxy:
    tcp:
      - addr: 7443          # 修改 API 端口, 默认为 8443
      - addr: 6066          # 修改 Websocket 端口, 默认为 6060
      - addr: 7071          # 修改 Console 端口, 默认为 7070
```

### 步骤 3: 执行安装

请阅读[基于 Kubernetes 安装](../../installation/install-with-helm/)以及[Chart 安装选项](../../installation/install-with-helm/vaules-config), 根据需要创建 `values.yaml` 文件, 然后执行以下命令使用本地 Chart 目录进行安装:

```bash
helm install rainbond ./rainbond-chart \
  -f values.yaml \
  --create-namespace \
  --namespace rbd-system
```

## 安装后修改端口

如果需要在安装完成后修改端口配置, 请按照以下方式操作:

1. 编辑网关配置 ConfigMap:

```yaml title="kubectl edit configmap apisix-gw-config.yaml -n rbd-system"
apisix:
  proxy_mode: "http&stream"
  ssl:
    enable: true
    listen:
      - port: 9443          # 修改 HTTPS 端口, 默认为 443
  node_listen:
    - 8080                  # 修改 HTTP 端口, 默认为 80
  stream_proxy:
    tcp:
      - addr: 7443          # 修改 API 端口, 默认为 8443
      - addr: 6066          # 修改 Websocket 端口, 默认为 6060
      - addr: 7071          # 修改 Console 端口, 默认为 7070
```

2. 重启网关 Pod 使配置生效:

```bash
kubectl delete pod -l name=rbd-gateway -n rbd-system
```

## 修改端口后续配置

### 步骤1: 修改内置镜像仓库配置

:::tip
建议使用外部镜像仓库, 可跳过此步骤。配置方法参考 [Chart 安装选项](../../installation/install-with-helm/vaules-config)。
:::

默认内置镜像仓库的访问地址为 `goodrain.me`, 由 APISIX 网关代理访问。修改网关 HTTPS 端口后, 需要同步修改镜像仓库访问配置。


#### 修改 Containerd 配置

如您是自行搭建的集群, 请参考以下步骤修改 Containerd 配置:

```bash title="vim /etc/containerd/config.toml"
[plugins."io.containerd.grpc.v1.cri".registry.configs]
  [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me:9443"]
    [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me:9443".auth]
      username = "admin"
      password = "admin1234"
    [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me:9443".tls]
      insecure_skip_verify = true
```

如您是通过主机安装方式安装的 Rainbond, 请参考以下步骤修改 Containerd 配置:

```bash title="vim /etc/rancher/rke2/registries.yaml"
mirrors:
  "goodrain.me:9443":
    endpoint:
      - "https://goodrain.me:9443"
configs:
  "goodrain.me:9443":
    auth:
      username: "admin"
      password: "admin1234"
    tls:
      insecure_skip_verify: true
```

```bash
# 重启 Containerd 服务使配置生效
systemctl restart containerd
# 或者 RKE2 服务
systemctl restart rke2-server / rke2-agent
```

#### 更新 RainbondCluster 配置

修改镜像仓库域名:

```bash title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub:
    domain: goodrain.me:9443
```

重启 rainbond-operator Pod 使配置生效:

```bash
kubectl delete pod -n rbd-system -l name=rainbond-operator
```

### 步骤二: 修改 rbd-app-ui 访问端口

如果修改了 rbd-app-ui 默认(7070)访问端口,  需要同步修改控制台路由规则:

```bash title="kubectl edit apisixroute -n rbd-system rbd-app-ui"
...
spec:
  stream:
  - backend:
      ...
    match:
      ingressPort: 7071 # 修改为新的访问端口,  默认7070
    ...
```

### 步骤三: 修改 Websocket 端口

如果修改了 Websocket（默认6060），则需要通过浏览器 `http://192.168.1.1:7071` (默认7070) 登录控制台，进入 **平台管理 -> 集群 -> 编辑**，修改 `WebSocket 通信地址` 中的端口为新的端口。

同时还需要修改路由规则:

```bash title="kubectl edit apisixroute -n rbd-system rbd-api-websocket"
spec:
  stream:
  - backend:
      ...
    match:
      ingressPort: 6066 # 修改为新的访问端口,  默认6060
    ...
```

### 步骤四：修改源码构建软件包下载地址

如果您修改了默认的`80`端口，这会对源码构建时下载 JDK 等软件包造成影响，请按照以下方式修改：

```yaml title="kubectl edit rbdcomponent rbd-chaos -n rbd-system"
...
spec:
  env:
  - name: LANG_GOODRAIN_ME
    value: "http://lang.goodrain.me:8080"
  ...
```

## 常见问题

### Q: 修改端口后镜像推拉失败?

**A:** 参考 [修改内置镜像仓库配置](#步骤1-修改内置镜像仓库配置) 章节, 确保:
1. Containerd 配置文件中镜像仓库地址正确:`/etc/containerd/config.toml`
2. RainbondCluster 中 `imageHub.domain` 配置正确
3. 所有节点都已更新配置并重启 Containerd 服务