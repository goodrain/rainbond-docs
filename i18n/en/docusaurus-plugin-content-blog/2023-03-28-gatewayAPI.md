---
title: Rainbond的 Gateway API 插件制作实践
description: Gateway API 作为新一代的流量管理标准，对原有 Ingress 的扩展不规范、移植性差等问题做出了改进。本篇文章将以 Envoy Gateway 为例介绍如何制作并发布 Gateway API 插件
slug: gatewayapi
image: https://static.goodrain.com/wechat/gateway-plugin/gatewayapi.png
---

Gateway API 作为新一代的流量管理标准，对原有 Ingress 的扩展不规范、移植性差等问题做出了改进。从兼容K8s生态和优化网关体验出发，Rainbond 支持以插件的形式扩展平台网关能力，目前已经有多家社区提供了 Gateway API 的实现，将其制作成平台插件后，一键部署后即可在平台中使用拓展网关能力。我们可以制作不同的网关实现插件来应对不同的场景和需求，同时可以将自己制作的插件发布到应用商店供大家使用。

本篇文章将以 Envoy Gateway 为例详细介绍如何制作并发布你的 Kubernetes Gateway API 插件。最后发布到开源应用商店的 Gateway API 插件将可以被其他用户使用，同时积极参与贡献也有机会获得由我们提供的小礼品。

## 前提条件

- Rainbond 版本大于 v5.13

- Rainbond 已经对接过开源应用商店并拥有推送权限

## Rainbond 与 Gateway API 集成机制

在 Rainbond 中，之前仅支持内置网关，应用定义好路由规则后，外部流量即可直接访问到对应应用。而 Gateway API 是以插件和能力扩展的形式与平台进行结合的。在平台中，只有安装了 Gateway API 自定义资源以及至少有一个网关实现后，才可以扩展平台网关能力。

如下图所示，如果 `App 4`、`App 5`等应用想要使用支持 Gateway API 的网关实现，那么首先需要定义 Gateway API 的相关资源，而这类资源是由 `Gateway API 基础资源插件`提供的，它主要包含了 Gateway API 资源类型的定义以及相关的 WebHook 资源。同时它在平台上暴露了 GatewayClass 和 Gateway 类型的资源，在平台能力扩展中可以看到。这样用户可以自定义网关行为和配置。

因此我们只需要制作一个网关插件，即可读取 Gateway 类型的资源并生成对应的配置，向外提供网关能力。目前 Gateway API 已有多种实现，如 Envoy、Nginx、Istio 等。这里我们选择 Envoy 作为网关，这样外部流量进入 Envoy后，即可根据对应的路由策略到达 `App 4` 等应用上。

![](https://static.goodrain.com/wechat/gateway-plugin/3.png)

## 制作自定义网关插件的步骤

![](https://static.goodrain.com/wechat/gateway-plugin/4.png)

实现 Gateway API 插件的完整流程如上图所示，主要分为以下五步：

1. 部署 Gateway API 基础资源：目前 Gateway API 主要由一系列自定义资源(CRD)组成，在集群中使用其能力时，需要先部署这些基础资源，才能使集群识别该类型的资源。
2. 选择 Gateway API 网关实现：目前 Gateway API 已有多家 [下游实现](https://gateway-api.sigs.k8s.io/implementations/)，这些网关实现都可以自由选择，提供对外服务的能力。
3. 平台部署网关并测试：需要将网关实现转化为平台资源进行部署测试。只有这样最后才可以一键发布到开源应用商店供他人使用。
4. 制作和发布插件：定义插件相关元数据，并发布到开源应用商店。
5. 完善插件信息并上架：完善插件的介绍后，可以让用户更好的使用该插件。

下面将会针对这几个步骤详细说明。

### 部署 Gateway API 基础资源

在制作下游网关实现插件之前，我们需要安装 Gateway API 基础的 CRD 和控制器等资源，平台已经将这些资源打包成插件应用上架到开源应用商店。我们只需要在 **平台管理->应⽤市场->开源应⽤商店->搜索 GatewayAPI-Base** 并进行安装即可，由于 Gateway API 中 RBAC 相关资源对命名空间有依赖，所以我们需要在安装时，新建一个团队，团队英文名设置为 `gateway-system`，这样将会将其安装至 `gateway-system` 命名空间下，最好单独创建⼀个应⽤，应⽤的名称⻅名知意，便于后期管理。

### 选择 Gateway API 网关实现

k8s [Gateway API 实现列表](https://gateway-api.sigs.k8s.io/implementations/)中有多个实现，制作的话可以去这里挑选，由于目前 k8s Gateway API 目前 HttpRoute 已支持到 Beta 版本，所以我们需要挑选  HTTPRoute 资源支持到 beta 版本的下游实现，如 [Istio](https://gateway-api.sigs.k8s.io/implementations/#istio) 、[Cilium](https://gateway-api.sigs.k8s.io/implementations/#cilium) 、[Kong](https://gateway-api.sigs.k8s.io/implementations/#kong)  等。由于 [Envoy Gateway](https://gateway.envoyproxy.io/v0.3.0/) 已支持到 Beta 版本，所以我们本次使用其作为网关插件的扩展。

### 在Rainbond上部署并测试

挑选好实现后，你可以在实现的官网中看到如何安装实现，拿 envoy 为例，envoy 官网给出了两组 Yaml 如下：

```YAML
kubectl apply -f https://github.com/envoyproxy/gateway/releases/download/v0.3.0/install.yaml
kubectl apply -f https://raw.githubusercontent.com/envoyproxy/gateway/v0.3.0/examples/kubernetes/http-routing.yaml
```

- **install.yaml** 此 YAML 文件中存放的便是我们插件所需的基础资源。
- **http-routing.yaml** 这个 YAML 文件我们需要进行处理，只保留我们插件所需的 GatewayClass 资源和 Gateway 资源，HttpRoute 资源不需要保留，在平台定义网关策略后将会自动生成。

将整理好的资源 YAML 后，在应用视图的 k8s 资源管理处创建，功能位置：**应用视图 ---> k8s 资源 ---> 添加**。

![](https://static.goodrain.com/wechat/gateway-plugin/1.png)

⚠️注意：如果有RoleBinding 等需要标识命名空间的资源，则需要确保标识的命名空间和当前上传的团队所对应的命名空间是否一致，以免造成权限不足等问题，示例如下：

```YAML
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
...
subjects:
- kind: ServiceAccount
  name: certgen
  namespace: envoy-gateway-system
```

上传创建完成后，我们还需要在 **平台管理视图->扩展->能力** 中处理一下 Gateway 资源，将网关的 Service 名称或前缀标记出来，后续在创建 HTTP 策略的时候便可获取并展示你的域名解析地址。

```YAML
labels:
    service-name: envoy-envoy-gateway-system-envoy
```

NodePort 是从节点上获取的 IP ，默认为 NodeInternalIP ，如果存在 NodeExternalIP 则优先使用 NodeExternalIP 。

LoadBalancerIP 是从 Service 资源上的 ExternalIPs 获取IP，如果不存在则不展示。

完成以上操作后，我们需要进行测试，主要检查以下几项。

1. 检查组件是否都运行正常，状态是否都为运行中。
2. 检查应用下的 k8s 资源是否都创建成功。
3. 当所有资源的状态都正常后，参考 Gateway API 网关使用文档进行使用测试，查看是否可以正常使用。

### 制作和发布插件

如果想将该网关实现作为平台网关插件进行发布，那么还需要准备标志应用为插件的 RBDPlugin 资源，定义好该资源后，才可以在`平台管理->插件`中查看到该插件并进行管理。示例如下：

```YAML
apiVersion: rainbond.io/v1alpha1
kind: RBDPlugin
metadata:
  name: RBDPlugin 资源名称
spec:
  alias: 插件别名
  author: 插件制作人
  description: 插件简介
  icon: 插件图标
  version: 插件版本
```

定义好该资源后，我们可以进行发布了，在应用拓扑图页面，点击左侧`发布`按钮，选择`发布到云应用商店`，即可将其发布到开源应用商店。

### 完善插件信息并上架

发布到开源应用商店的插件或应用，我们需要[登录开源应用商店](https://hub.grapps.cn/marketplace)编辑其信息并上架后，该应用才可被其他用户查看和使用。可以参考[如何分享插件或应用到 Rainbond 应用商店](https://mp.weixin.qq.com/s/CIpIBFLYSEQUUKMzO8dVtg)。

登录完成后点击右上角控制台，选择[管理应用](https://hub.grapps.cn/manage/general/myapp)。这时候应该可以看到刚刚发布的 Envoy 插件。点击应用名称进入详情页面，此时需要编辑应用的名称、Logo、详细信息。

当应用基础信息补充完成后，我们需要为其添加一个套餐，才可以上架。套餐在这里的作用主要是将应用的版本管理起来。用户使用不同的套餐安装的版本也不同。

在补充完应用的基本信息和套餐后，就可以准备上架了。只有上架的应用才可以被其他用户浏览和使用。回到管理应用的页面，选择上架即可。

## 最终效果

我们可以在开源应用商店查看到我们制作的网关插件，如下图所示，其余用户也可以在 Rainbond 中一键部署使用，具体使用可以参考 Gateway API 使用文档。

![](https://static.goodrain.com/wechat/gateway-plugin/2.png)
