---
title: Service Mesh 治理模式
description: Rainbond 应用治理模式介绍
keywords:
- Service Mesh 治理模式切换
- Istio 治理模式
---

## 治理模式切换

Rainbond 自 V5.3 版本开始，加入了应用治理模式切换功能。应用治理模式主要指组件间通信模式的治理，目前支持内置 ServiceMesh 模式和 Kubernetes 原生 Service 模式。

- **内置 ServiceMesh 模式（默认）**
  
内置ServiceMesh模式需要用户显式的配置组件间的依赖关系，平台会在下游组件中自动注入 sidecar 容器组成 ServiceMesh 微服务架构，业务间通信地址统一为localhost（127.0.0.1）模式。作为 Rainbond 中默认的应用治理模式，通过 sidecar 实现了服务组件间 A/B 测试、智能路由、限流、熔断等治理功能。了解更多请参考 [服务间通信](../regist_and_discover)。
- **Kubernetes 原生 Service 模式**

该模式组件间使用 Kubernetes Service 名称域名进行通信，用户需要配置每个组件端口注册的 Service 名称，治理能力有限。

- **Istio 治理模式**

Rainbond 将 Istio 作为插件方式引入 Rainbond 应用治理模式体系，组件间的治理均由 Istio 提供。

### 切换的影响

对于用户而言，切换到不同的应用治理模式，最需要注意的，是组件之间相互访问方式的变化。新增的 Kubernetes 原生 Service 模式，意味着用户可以使用原生 Kubernetes 中的 Service name 的方式访问对应的服务组件了。

### 如何切换

应用治理模式切换的入口，位于应用拓扑图视图中。在 **治理模式** 处，即可在两种应用治理模式之间进行切换。

![切换治理模式](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-1.png)

如果从内置 ServiceMesh 模式切换到 Kubernetes 原生 Service 模式，那么需要用户定义当前应用下，所有开启对内服务的端口的 **内部域名**。

![定义内部域名](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-2.png)

**内部域名** 即作为该端口全局可解析访问的地址。

**简单讲，在这里定义的域名，在整个集群中，会被解析为 Service 的 CLUSTER-IP 地址。**

```bash
$ kubectl get service -A
NAMESPACE                          NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)
9dcf3ab241c445afad7a9a90b1b7c9a7   gr12238e-80-dbeb            ClusterIP   10.43.234.35    <none>        80/TCP
```

### 通信变量的改动

如果你不了解何为通信变量，请先阅读 [通信变量注入](../connection_env)。

对比于默认的内置 ServiceMesh 模式，Kubernetes 原生 Service 模式中依然存在通信变量。不一样的是，通信变量的值，不再是固定为 127.0.0.1 这一本地回环地址，而是变为了上文提及的内部域名。这一改动，是为了方便使用通信变量来确定依赖关系的用户，在不改动配置的情况下，依然可以正常的使用通信变量完成组件间的调用。

```bash
# 示例中 APP2 组件的 80 端口，其通信变量变成了如下的形式
NGINX_HOST=gr12238e-80-dbeb
NGINX_PORT=80
```

### 依赖关系的改动

即使 Kubernetes 原生 Service 模式不再需要依赖关系提供 sidecar 插件来实现组件之间的通信，但是依赖关系依然有其存在的价值。

- 依赖关系呈现的应用拓扑图非常直观好看。

- 依赖关系可以用来传递通信变量，方便用户在不改动配置的情况下，可以正常的使用通信变量完成组件间的调用。

### 切换至 istio 治理模式

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```