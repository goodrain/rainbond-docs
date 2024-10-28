---
title: Rainbond 对接 Istio 原理讲解和代码实现分析
description: 对于用户而言，在测试环境下，需要达到的效果是快、开箱即用。但在生产环境下，可能又有熔断、延时注入等需求
slug: istioSource
image: https://static.goodrain.com/wechat/istio/istio.jpeg
---

<!--truncate-->

现有的 ServiceMesh 框架有很多，如 Istio、linkerd等。对于用户而言，在测试环境下，需要达到的效果是快、开箱即用。但在生产环境下，可能又有熔断、延时注入等需求。那么单一的 ServiceMesh 框架无法同时满足用户不同的需求。

在之前的 Rainbond 版本中，Rainbond 支持了多种不同的应用治理模式，作为应用级的插件，实现了Istio 治理模式的切换。

本文将对Rainbond 实现Istio治理模式进行原理解析。

## 基本原理
###  动态准入控制
首先我们需要了解一个知识，Istio 是如何实现自动注入的。实际上，Istio、linkerd 等不同的 ServiceMesh 框架都使用到了 Kubernetes 中的一个非常重要的功能，叫作 Dynamic Admission Control，也叫作：Initializer。

这个功能会在 API 对象创建之后会被立刻调用到。在 API 对象被正式处理前，完成一些初始化的准备工作。所以在部署了 Istio 控制平面以后，当你提交了 API 对象的 Yaml 文件，会被 Istio 的准入控制器捕获，完成一些 PATCH 操作，比如加上对应的 Sidecar 容器字段。最终将这个 PATCH 过后的 API 对象交给 Kubernetes 处理。接下来就详细介绍下 ServiceMesh 框架的注入机制。

### 如何自动注入
用户需要先在集群中部署 Istio 的控制平面。它会包含一个用来为 Pod 自动注入 Envoy 容器的 Initializer。
首先， Istio 会将 Envoy 容器本身的定义，以 ConfigMap 的方式保存在 Kubernetes 当中。当 Initializer 的控制器，通过 Admission-Webhooks 监听到符合规则【此处指对应的 Annoations】的 API 对象被创建后，读取对应的 ConfigMap 获取到 Envoy 容器的配置。并将相关的字段，自动添加到用户提交的 Pod 的 API 对象里。详见下图和说明。

![](https://static.goodrain.com/wechat/initializer-istio/Process.png)

上图为提交yaml文件到Kubernetes集群后，集群所做的处理，大概分为以下几步：
1. Yaml 文件提交到 APIServer，APIServer 会过滤这个请求，并完成一些前置性的工作，比如授权、超时处理、审计等。

2. APIServer 会找到该 Pod 对应的类型定义，如果存在，则会将这个 Pod 转换为对象。

3. 接下来进行 Admission 操作，Admission 操作是在创建之后会被立刻调用到的一组代码，它可以完成一些初始化操作，比如在对象创建前加上某些 Labels，但是由于它本身是被编译到 APIServer 中的，所以用户修改后，需要重新编译并重启 APIServer。幸运的是：Kubernetes 提供了一种“热插拔”式的 Admission 机制，即 Initializer。

4. 目前 istio、linkerd 等项目均实现了 Initializer 机制，也就是说，当提交的 Yaml 文件包含其指定的Annoations 字段时，那么它们部署的准入控制器则会捕获到对应的 API 对象，在这个阶段为 Pod 进行初始化操作，即添加上 Sidecar 容器的相关配置。

5. 接下来会进行 Validation，验证 API 对象的字段是否合法。

6. 验证完毕后，会将对应的信息保存到etcd中，一次API对象的创建就此完成。

## 扩展应用治理模式
  在了解了现有的 ServiceMesh 框架的注入机制后，我们就可以基于此开发 Rainbond 的应用级插件，用于扩展应用的治理能力。我们知道由于现有的 ServiceMesh 框架大多采用了标准的 Initializer 实现。所以我们只需要完成以下两步即可。

1. 部署对应 ServiceMesh 框架的 Initializer 控制器，通常情况下意味着部署它们的控制平面，此处基于 Rainbond 已有的对接 helm 商店的功能，可以方便的进行部署。

2. 实现基于应用的数据平面的注入。

### Istio治理模式的开发
   接下来以 Istio 治理模式的开发为例，详细介绍如何自行扩展应用的治理能力。

### 前端展示支持 Istio 应用治理模式：
Rainbond 主要分为两层，即业务层和数据中心层，具体可参考 Rainbond 技术架构 。

rainbond-ui 为业务层的前端项目，首先需要支持 Istio 治理模式，由于 Rainbond 是以应用为中心的应用管理平台，所以 Istio 治理模式也是针对应用来说的。

如下图所示：在应用页面，可以切换治理模式。我们需要在这里增加 Istio 治理模式。

![](https://static.goodrain.com/wechat/initializer-istio/istio-ui.png)



### 治理模式有效性校验

Initializer 的机制决定了，需要有一个准入控制器，去处理符合条件的 API 对象。通常情况下准入控制器包含在对应 ServiceMesh 框架的控制平面中。

所以我们在切换治理模式时，需要去校验集群中是否已经部署过对应 ServiceMesh 框架的控制平面，这一步应该在切换时进行校验。如果未部署对应的控制平面，则不具有对应的治理能力。也就不能切换。

根据 Rainbond 技术架构 ，我们可以知道，rainbond-console 属于业务层的后端。它需要与数据中心端进行通信，才能获取集群的状态。因此在 rainbond-console 和 rainbond 这两个项目中，都需要对治理模式的有效性进行校验。

#### rainbond-console 对治理模式有效性的校验

参考如下代码，类 `GovernanceModeEnum` 定义了支持的治理模式。首先我们需要在治理模式这里增加 `ISTIO_SERVICE_MESH`，用于在业务层判断治理模式是否有效。当此处校验通过后，我们需要请求数据中心端的接口，检测此种治理模式是否已安装了对应的控制平面。

`/console/enum/app.py`

```python
class GovernanceModeEnum(AutoNumber):
    BUILD_IN_SERVICE_MESH = ()
    KUBERNETES_NATIVE_SERVICE = ()
    ISTIO_SERVICE_MESH = ()

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
    
    @classmethod
    def names(cls):
        return [key.name for key in cls]
```
#### rainbond 对治理模式有效性的校验

在接收到来自业务端的校验请求时，我们需要检测在该集群是否已部署了对应的 ServiceMesh 框架的控制平面。参考如下代码，由于部署 Istio 控制平面后，在每个命名空间下都可以查看到 `istio-ca-root-cert`这个 ConfigMap，所以我们这里使用该 ConfigMap 作为判断 Istio 控制平面部署的依据。
当确认 Istio 控制平面已安装后，我们返回给业务端结果。最终完成切换。

`/api/handler/app_governance_mode/adaptor/istio.go`

```go
func (i *istioServiceMeshMode) IsInstalledControlPlane() bool {
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        cmName := os.Getenv("ISTIO_CM")
        if cmName == "" {
                cmName = "istio-ca-root-cert"
        }
        _, err := i.kubeClient.CoreV1().ConfigMaps("default").Get(ctx, cmName, metav1.GetOptions{})
        if err != nil {
                return false
        }
        return true
}
```


#### 实现基于应用的数据平面的注入

仅仅完成治理模式的切换还不够，我们需要让 Istio 的控制平面为指定的应用注入 Sidecar，即数据平面。Rainbond 自身通过 Worker 组件将 Rainbond-Application Model 进行实例化转化为 Kubernetes 资源模型。控制应用的生命周期。

因此，我们需要在 Worker 组件转化资源时，自动为用户完成对应用的注入。参考 Istio 注入策略。我们可以发现 Istio 依赖于 Label `"sidecar.istio.io/inject": "true"` 完成注入。而在 Rainbond的代码中，我们可以看到如下代码。这是将 Rainbond 的应用模型转化为 Deployment 的部分代码。在这里，我们为 Deployment 添加了对应的 injectLabels。

有了这些初始化操作。当 API 对象被创建出来时，便会被 Istio 的准入控制器处理，完成数据平面的注入。

`/worker/appm/conversion/service.go`

```go
func initBaseDeployment(as *v1.AppService, service *dbmodel.TenantServices) {
   as.ServiceType = v1.TypeDeployment
   ... ...
   injectLabels := getInjectLabels(as)
   deployment.Labels = as.GetCommonLabels(
      deployment.Labels,
      map[string]string{
         "name":    service.ServiceAlias,
         "version": service.DeployVersion,
      },
      injectLabels)
   ... ...
   as.SetDeployment(deployment)
}

func getInjectLabels(as *v1.AppService) map[string]string {
   mode, err := governance_mode.NewAppGoveranceModeHandler(as.GovernanceMode, nil)
   if err != nil {
      logrus.Warningf("getInjectLabels failed: %v", err)
      return nil
   }
   injectLabels := mode.GetInjectLabels()
   return injectLabels
}
```
对于不同的应用治理模式，我们可以参考 应用治理模式扩展 的代码。实现如下接口，便可以完成应用下治理模式的切换和注入。

其中`IsInstalledControlPlane`这个接口的实现在前面已经体现。它主要用于判断控制平面是否已完成安装，可以正常使用。而 `GetInjectLabels`则主要用于 Worker 组件转化应用模型为 Kubernetes 资源时，添加上指定的 Labels，以便被部署的准入控制器处理。

`/api/handler/app_governance_mode/adaptor/app_governance_mode.go`

```go
type AppGoveranceModeHandler interface {
        IsInstalledControlPlane() bool
        GetInjectLabels() map[string]string
}
```
## 总结
本文我们主要介绍了应用治理模式的注入机制和开发，用户可以通过查阅需要注入的 ServiceMesh 插件官方文档，通过以上两步完成应用下治理模式的切换。使应用获得不同的治理能力。



## Reference Link

* [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#initializers)

* [Rainbond-UI 实现 Istio Commit](https://github.com/goodrain/rainbond-ui/commit/2830fc585df12f1cc4443f7e73a63daf8254742e)

* [Rainbond-Console 实现 Istio Commit](https://github.com/goodrain/rainbond-console/commit/dd09c1f05519fa08f013a889260180f05c22f58a)

* Rainbond 实现 Istio Commit：
  * [Istio.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/istio.go#L23) 
  * [service.go](https://github.com/goodrain/rainbond/blob/cf00c0d5ebe0f455ab8f5d49139616df0f7c1f9f/worker/appm/conversion/service.go#L207)
  * [app_governance_mode.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/app_governance_mode.go#L10)

* [Rainbond 技术架构](https://www.rainbond.com/docs/architecture/architecture?channel=cnblog)

* [Istio 注入策略](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy)

