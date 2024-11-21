---
title: Rainbond docking Istio principle explanation and code implementation analysis
description: For users, the results to be achieved in a test environment are fast and boxed.However, in production environments there may be another demand for melting, delayed infusion
slug: istioSource
image: https://static.goodrain.com/wechat/istio/istio.jpeg
---

<!--truncate-->

现有的 ServiceMesh 框架有很多，如 Istio、linkerd等。对于用户而言，在测试环境下，需要达到的效果是快、开箱即用。但在生产环境下，可能又有熔断、延时注入等需求。那么单一的 ServiceMesh 框架无法同时满足用户不同的需求。

In previous Rainbond versions, Rainbond supported a variety of different application governance modes. As an application-level plug-in, it implemented the switching of Istio governance modes.

本文将对Rainbond 实现Istio治理模式进行原理解析。

## Fundamental

### Dynamic Admission Control

首先我们需要了解一个知识，Istio 是如何实现自动注入的。First of all, we need to understand a knowledge, how Istio achieves automatic injection.In fact, different ServiceMesh frameworks such as Istio and linkerd use a very important function in Kubernetes called Dynamic Admission Control, also called：Initializer.

这个功能会在 API 对象创建之后会被立刻调用到。在 API 对象被正式处理前，完成一些初始化的准备工作。This function will be called immediately after the API object is created.Before the API object is formally processed, some initialization preparations are done.So after deploying the Istio control plane, when you submit the Yaml file of the API object, it will be captured by the Istio admission controller and complete some PATCH operations, such as adding the corresponding Sidecar container field.Finally, the API object after the PATCH is handed over to Kubernetes for processing.Next, we will introduce the injection mechanism of the ServiceMesh framework in detail.最终将这个 PATCH 过后的 API 对象交给 Kubernetes 处理。接下来就详细介绍下 ServiceMesh 框架的注入机制。

### How to inject automatically

用户需要先在集群中部署 Istio 的控制平面。它会包含一个用来为 Pod 自动注入 Envoy 容器的 Initializer。
首先， Istio 会将 Envoy 容器本身的定义，以 ConfigMap 的方式保存在 Kubernetes 当中。当 Initializer 的控制器，通过 Admission-Webhooks 监听到符合规则【此处指对应的 Annoations】的 API 对象被创建后，读取对应的 ConfigMap 获取到 Envoy 容器的配置。并将相关的字段，自动添加到用户提交的 Pod 的 API 对象里。详见下图和说明。

![](https://static.goodrain.com/wechat/initializer-istio/Process.png)

The above picture shows the processing done by the cluster after submitting the yaml file to the Kubernetes cluster, which is roughly divided into the following steps：

1. The Yaml file is submitted to the APIServer, and the APIServer will filter the request and complete some preliminary work, such as authorization, timeout processing, and auditing.

2. APIServer will find the type definition corresponding to the Pod, and if it exists, it will convert the Pod to an object.

3. Next, the Admission operation is performed. The Admission operation is a set of codes that will be called immediately after creation. It can complete some initialization operations, such as adding some Labels before the object is created, but since it is compiled into APIServer , so users need to recompile and restart APIServer after modification.Fortunately,：provides a "hot-plug" type of Admission mechanism, the Initializer.幸运的是：Kubernetes 提供了一种“热插拔”式的 Admission 机制，即 Initializer。

4. At present, projects such as istio and linkerd have implemented the Initializer mechanism, that is to say, when the submitted Yaml file contains its specified Annoations field, the admission controller they deploy will capture the corresponding API object. The Pod performs the initialization operation, that is, adds the relevant configuration of the Sidecar container.

5. Next, Validation will be performed to verify whether the fields of the API object are legal.

6. After the verification is completed, the corresponding information will be saved in etcd, and the creation of an API object is completed.

## Extended Application Governance Model

After understanding the injection mechanism of the existing ServiceMesh framework, we can develop Rainbond's application-level plug-ins based on this to extend the application's governance capabilities.We know that most of the existing ServiceMesh frameworks use the standard Initializer implementation.So we only need to complete the following two steps.我们知道由于现有的 ServiceMesh 框架大多采用了标准的 Initializer 实现。所以我们只需要完成以下两步即可。

1. Deploying the Initializer controllers corresponding to the ServiceMesh framework usually means deploying their control planes. Here, based on Rainbond's existing function of docking with the helm store, it can be easily deployed.

2. Implement application-based data plane injection.

### Development of the Istio governance model

Next, take the development of the Istio governance model as an example to introduce in detail how to expand the governance capabilities of the application.

### Front-end display supports Istio application governance mode：

Rainbond is mainly divided into two layers, namely the business layer and the data center layer. For details, please refer to the Rainbond technical architecture.

rainbond-ui is the front-end project of the business layer. First, it needs to support the Istio governance model. Since Rainbond is an application-centric application management platform, the Istio governance model is also for applications.

如下图所示：在应用页面，可以切换治理模式。我们需要在这里增加 Istio 治理模式。

![](https://static.goodrain.com/wechat/initializer-istio/istio-ui.png)

### Governance Model Validity Verification

Initializer 的机制决定了，需要有一个准入控制器，去处理符合条件的 API 对象。通常情况下准入控制器包含在对应 ServiceMesh 框架的控制平面中。

Therefore, when we switch the governance mode, we need to verify whether the control plane corresponding to the ServiceMesh framework has been deployed in the cluster. This step should be verified during the switch.If the corresponding control plane is not deployed, it does not have the corresponding governance capability.It cannot be switched.如果未部署对应的控制平面，则不具有对应的治理能力。也就不能切换。

According to the Rainbond technical architecture, we can know that the rainbond-console belongs to the backend of the business layer.It needs to communicate with the data center side to get the status of the cluster.Therefore, in both rainbond-console and rainbond projects, the validity of the governance model needs to be verified.它需要与数据中心端进行通信，才能获取集群的状态。因此在 rainbond-console 和 rainbond 这两个项目中，都需要对治理模式的有效性进行校验。

#### rainbond-console checks the validity of the governance mode

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

    @ classmethod
    def names(cls):
        return [key.name for key in cls]
```

#### Rainbond checks the validity of the governance mode

When receiving the verification request from the business side, we need to check whether the control plane of the corresponding ServiceMesh framework has been deployed in the cluster.Referring to the following code, after deploying the Istio control plane, the ConfigMap `istio-ca-root-cert`can be viewed in each namespace, so we use this ConfigMap as the basis for judging the deployment of the Istio control plane. After confirming that the Istio control plane is installed, we return the result to the business side.Finally complete the switch.参考如下代码，由于部署 Istio 控制平面后，在每个命名空间下都可以查看到 `istio-ca-root-cert`这个 ConfigMap，所以我们这里使用该 ConfigMap 作为判断 Istio 控制平面部署的依据。
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
        _, err := i.kubeClient.CoreV1().ConfigMaps("default").Get(ctx, cmName, metav1 .GetOptions{})
        if err != nil {
                return false
        }
        return true
}
```

#### Implement application-based data plane injection

仅仅完成治理模式的切换还不够，我们需要让 Istio 的控制平面为指定的应用注入 Sidecar，即数据平面。It is not enough to just switch the governance mode, we need to let the Istio control plane inject the sidecar, the data plane, for the specified application.Rainbond itself instantiates the Rainbond-Application Model into a Kubernetes resource model through the Worker component.Control the life cycle of the application.控制应用的生命周期。

因此，我们需要在 Worker 组件转化资源时，自动为用户完成对应用的注入。参考 Istio 注入策略。我们可以发现 Istio 依赖于 Label `"sidecar.istio.io/inject": "true"` 完成注入。而在 Rainbond的代码中，我们可以看到如下代码。这是将 Rainbond 的应用模型转化为 Deployment 的部分代码。在这里，我们为 Deployment 添加了对应的 injectLabels。

有了这些初始化操作。With these initialization operations.When the API object is created, it will be processed by Istio's admission controller to complete the data plane injection.

`/worker/appm/conversion/service.go`

```go
func initBaseDeployment(as *v1.AppService, service *dbmodel.TenantServices) {
   as.ServiceType = v1.TypeDeployment
   ... ...
   injectLabels := getInjectLabels(as)
   deployment.Labels = as.GetCommonLabels(
      deployment .Labels,
      map[string]string{
         "name": service.ServiceAlias,
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

For different application governance modes, we can refer to the code extended by the application governance mode.By implementing the following interface, you can complete the switching and injection of the governance mode under the application.实现如下接口，便可以完成应用下治理模式的切换和注入。

其中`IsInstalledControlPlane`这个接口的实现在前面已经体现。它主要用于判断控制平面是否已完成安装，可以正常使用。Among them, the implementation of the interface`IsInstalledControlPlane`has been reflected in the front.It is mainly used to judge whether the control plane has been installed and can be used normally.`GetInjectLabels`is mainly used to add the specified Labels when the Worker component converts the application model into a Kubernetes resource so that it can be processed by the deployed admission controller.

`/api/handler/app_governance_mode/adaptor/app_governance_mode.go`

```go
type AppGoveranceModeHandler interface {
        IsInstalledControlPlane() bool
        GetInjectLabels() map[string]string
}
```

## Summarize

In this article, we mainly introduce the injection mechanism and development of the application governance mode. Users can complete the switching of the governance mode under the application through the above two steps by referring to the official documentation of the ServiceMesh plug-in that needs to be injected.Enables applications to gain different governance capabilities.使应用获得不同的治理能力。

## Reference Link

- [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#initializers)

- [Rainbond-UI implements Istio Commit](https://github.com/goodrain/rainbond-ui/commit/2830fc585df12f1cc4443f7e73a63daf8254742e)

- [Rainbond-Console implements Istio Commit](https://github.com/goodrain/rainbond-console/commit/dd09c1f05519fa08f013a889260180f05c22f58a)

- Rainbond implements Istio Commit：
  - [Istio.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/istio.go#L23)
  - [service.go](https://github.com/goodrain/rainbond/blob/cf00c0d5ebe0f455ab8f5d49139616df0f7c1f9f/worker/appm/conversion/service.go#L207)
  - [app_governance_mode.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/app_governance_mode.go#L10)

- [Rainbond Technical Architecture](https://www.rainbond.com/docs/architecture/architecture?channel=cnblog)

- [Istio injection strategy](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy)
