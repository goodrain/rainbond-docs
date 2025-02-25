---
title: 干货分享｜使用 Istio 实现灰度发布
description: Kubernetes 作为基础平台，提供了强大的容器编排能力。但是在其上部署业务和服务治理上，仍然会面对一些复杂性和局限性，在服务治理上，已经有许多成熟的 ServiceMesh 框架用于扩充其能力
slug: istiograyscale
image: https://static.goodrain.com/wechat/istio/istio.jpeg
---

Kubernetes 作为基础平台，提供了强大的容器编排能力。但是在其上部署业务和服务治理上，仍然会面对一些复杂性和局限性。在服务治理上，已经有许多成熟的 ServiceMesh 框架用于扩充其能力，如 Istio、Linkerd、Dapr 等。本文将主要介绍如何使用 Istio 扩充 Kubernetes 灰度发布的能力。

而在部署上，则会利用开源项目 [Rainbond](https://github.com/goodrain/rainbond) 作为基础平台来进行实践。Rainbond 是一个云原生应用管理平台，它使用**以应用为中心**的设计模式。基于这一设计模式抽象出了标准化的应用模型。从使用的体验上不需要学习和编写YAML，即可实现业务应用的全生命周期管理。因此使用它简化业务的部署和管理。同时 Rainbond 支持 ServiceMesh 框架的替换，使我们可以按需选择与业务最匹配的 ServiceMesh 框架进行服务治理。

<!--truncate-->

## Kubernetes 中如何实现灰度发布

当你在 Kubernetes 集群中部署业务时，可以利用 Kubernetes 原生提供的[灰度发布](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#canary-deployments)的方式去上线业务。这种方式是通过在旧版本和新版本的服务之间，定义一个差异化的 Label，根据不同版本之间的公共 Label 负载流量到后端 Pod，最终实现根据 Pod 的副本数控制流量的百分比。

如下图所示：用户定义了两个 Deployment 对象，其中旧版本名为 frontend-stable，有3个副本。新版本为 frontend-canary，有1个副本。此时定义了一个 Service 对象，使用它们之间公共的 Label 进行选择。这就使得用户访问 frontend 这个 Service 时，能以 3:1 的比例同时访问到两个版本。并且还可以通过调整副本数持续控制流量比例，最终达到完整上线。

![k8s-canary.png](https://static.goodrain.com/wechat/istio-canary-publish/k8s-canary.png)

Kubernetes 默认的实现方式在简单的部署场景下很有效，但是在一些复杂场景中，仍然会有较大的局限，如：

1. 业务配置自动伸缩后，会直接影响灰度发布的流量比例

2. 低百分比的流量控制占用资源高，如 1 % 的流量到达新版本，则至少需要 100 个副本

3. 精确的流量分发控制，使访问到新版本中的用户一直是同一批，而不是某个用户访问时随机切换

## Istio 灰度发布简述

由于 Kubernetes 提供的灰度发布方式的局限性，在一些复杂场景下，我们就需要使用 Istio 来实现更精细的灰度发布策略。在使用 Istio 进行灰度发布时，我们需要了解两个重要概念：

1. [Virtual services](https://istio.io/latest/docs/concepts/traffic-management/#virtual-services): 虚拟服务定义了请求到服务的路径。可以包含一组路由规则，使匹配到对应规则的请求能到达指定目标。

2. [Destination rules](https://istio.io/latest/docs/concepts/traffic-management/#destination-rules): 目标规则可以管理到达该目标的流量，如对服务后端所对应的实例池进行分组，再结合 Virtual services 定义的路由规则，最终将流量转发到正确的实例上。

如下图所示，以 istio 官网提供的 Bookinfo 示例程序为例，给出了 virtual services 和 destination rules 的主要定义。其中 virtual services 主要分为两块，主机名和路由规则。主机名是客户端向服务发送请求时使用的一个或多个地址。当请求到达 virtual services 时，则会根据其定义的路由规则匹配。图中就定义了邮箱以 gmail.com 结尾的用户流量只会到达 v3 版本的实例上。而其他用户则以 1:9 的比例分别访问到 v1 和 v2 版本的服务。这种方式实现了精确的流量分发控制。

当用户流量来到 reviews.demo.svc.cluster.local 这个 Service 上时，可以看到 destination rules 的规则定义中根据 version 这个 label 定义了不同的实例集，实现了流量比例与副本数的解耦。不管 reviews-v1 有多少实例。始终只有 10% 的流量到达 destination rules 的 v1 子集中。这就解决了业务副本数与流量比例的冲突问题，也使得资源使用更加合理。

![istio-canary.png](https://static.goodrain.com/wechat/istio-canary-publish/istio-canary.png)

## Istio 灰度发布在 Rainbond 上的实践

基于以上理解，我们接下来以 BookInfo 为例来体验 Istio 的灰度发布。

### 1. 准备工作：

在开始之前，我们需要提前安装好所需要的环境。

1) 安装 Rainbond

参考 [Rainbond 官方文档](https://www.rainbond.com/docs/quick-start/quick-install/) 快速安装，安装完成后可以通过对接 Helm 商店一键安装 Istio 以及相应组件。

2. 安装 Istio 以及 Kiali

登录到 Rainbond 控制台后，先创建一个团队，团队英文名对应 Kubernetes 中的命名空间，Istio 默认安装的命名空间为 `istio-system` ，因此团队英文名填写`istio-system`，名称可以填写为 `istio项目`。接下来对接 Helm 商店，通过 `应用市场 -> 点击➕号 -> Helm 商店` 对接。商店名称随意填写，地址填写 `https://openchart.goodrain.com/goodrain/rainbond`。商店对接完成后，我们即可点击安装 istio、kiali 等应用。详细可参考 [Istio 安装](https://www.rainbond.com/docs/use-manual/app-manage/overview/model/deploy-istio/)。

### 2. 部署 BookInfo 应用

在部署 BookInfo 之前，我们需要在 Rainbond 中创建一个团队和应用，并将应用的治理模式切换为 `Istio 治理模式`。在 Rainbond 中应用治理模式切换是指可以无侵入地变更应用下组件间通信治理模式。

如下图所示，一个完整应用会包含多个微服务模块，而 ServiceMesh 框架则是对所有业务容器注入 Proxy，根据注入Proxy的差异可以支持多种类型的 ServiceMesh 实现，比如：Istio、Linkerd、Dapr，应用可以按需开启 ServiceMesh 能力，或更换实现框架。为了让 BookInfo 这个应用使用到 Istio 的治理能力，所以需要切换到 `Istio 治理模式`。

![service-mesh.png](https://static.goodrain.com/wechat/istio-canary-publish/service-mesh.png)

1. 准备镜像

[BookInfo](https://istio.io/latest/docs/examples/bookinfo/) 这个应用程序由 6 个微服务组成，它们之间的依赖如下图所示。其中 Productpage 这个服务提供了访问页面，从 Details 这个服务中获得书籍详细信息。从 Reviews 服务中获得书籍评价。其中 Reviews-v2 和 Reviews-v3 会从 Ratings 这个服务中获得书籍的评级信息。这六个微服务的镜像如下：

```bash
docker.io/istio/examples-bookinfo-productpage-v1:1.17.0
docker.io/istio/examples-bookinfo-details-v1:1.17.0
docker.io/istio/examples-bookinfo-reviews-v1:1.17.0
docker.io/istio/examples-bookinfo-reviews-v2:1.17.0
docker.io/istio/examples-bookinfo-reviews-v3:1.17.0
docker.io/istio/examples-bookinfo-ratings-v1:1.17.0
```

![bookinfo.png](https://static.goodrain.com/wechat/istio-canary-publish/bookinfo.png)

2. 部署组件

我们在应用下，选择`添加组件 -> 指定镜像 -> 填写镜像地址 -> 新建组件 -> 确认创建`，即可依次创建出这 5 个微服务对应的组件。

3. 生成可用的 Service

刚刚我们仅完成了所有服务的部署，还未定义这些微服务的访问策略。以 Productpage 为例，我们通过点击拓扑图中 Productpage 这个组件，即可进入这个服务的管理页面。找到 `端口 -> 添加端口 -> 端口号填写9080 -> 打开对外服务 -> 点击生成的路由`，即可访问成功。 此时会发现 Productpage 这个组件的页面还无法拉取到书籍评价信息。这是由于它默认使用 details 和 reviews 这两个 Service 名称连接到它依赖的组件。此时我们部署的 Reviews-v1 等组件还没有正确的 Service 名称。因此还是进入组件管理页面，`组件端口 -> 添加端口 -> 端口号填写9080 -> 修改使用别名 -> 内部域名填写为 reviews-v1 -> 打开对内服务`。details、reviews-v2、ratings 等组件都是如此，填写其对应的 Service 名称后，打开对内服务即可。

最后在应用的 K8s 资源下，我们还需要创建一个如下的 Service，用来在 Reviews 的三个版本之间负载流量。

```bash
apiVersion: v1
kind: Service
metadata:
  labels:
    app: reviews
    service: reviews
  name: reviews
spec:
  ports:
  - name: http
    port: 9080
    protocol: TCP
    targetPort: 9080
  selector:
    component: reviews # 需要在 Reviews 三个版本中，均添加 Kubernetes 属性，设置上该 Label，才能正确生效
  sessionAffinity: None
  type: ClusterIP
```

4. 编排依赖关系

完成以上操作后，访问 Productpage 应用，可以看到书籍评论能正确在三个版本中切换了。此时，可以在应用视图下，切换到编排模式，根据上述 BookInfo 应用的架构图进行连线，实现拓扑图的编排。如下图所示，这样编排的好处是后期可以将这个应用整体发布出去，其他用户直接安装下来即可得到一样的拓扑关系，再也不用担心找不到各个服务依赖的组件。

![topological.png](https://static.goodrain.com/wechat/istio-canary-publish/topological.png)

### 3. 灰度发布

在完成以上部署操作后，我们得到了一个完整的 BookInfo 程序，但此时还未定义 Istio 相关配置，所以还需要通过 Kiali 去定义流量规则。实现灰度发布。

1. 配置路由规则

访问 Kiali 管理页面，即可看到该应用。在左侧边栏选择 Services，找到 reviews 这个 Service，点击进入，右上角 Actions 选择 Traffic Shifting，即可看到如下配置：拖动滑块选择流量比例。下图中 30% 的流量将会访问到 reviews-v1 上，70% 的流量访问到 reviews-v2上。点击创建后，即可看见页面左下角，Kiali 自动为你生成了 virtual services 和 destination rules 资源。你可以点击进去根据自己需求再次编辑。

![kiali.png](https://static.goodrain.com/wechat/istio-canary-publish/kiali.png)

2. 验证路由规则是否生效

找到最开始部署的组件 Productpage，进入组件管理页面，点击右上角访问入口，可以看到书籍详情和评级，反复刷新页面，可以看到不带星级的评价信息(reviews-v1)与黑色星级评价信息(reviews-v2)出现的比例大概是 3:7。红色星级评价信息(reviews-v3)从未出现。

3. 验证组件扩容对流量的影响

找到部署的组件 reviews-v1 ，进入`组件管理页面 -> 伸缩 -> 实例数量设置为4`，此时再次访问 Productpage 页面，反复刷新页面，可以看到 reviews-v1  扩容后，访问到 reviews-v1 与 reviews-v2 的比例仍为 3:7，组件实例数的多少对流量分发策略没有影响。

