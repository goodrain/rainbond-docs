---
title: Rainbond Band Istio Doctrine and Code Implementation Analysis
description: For users, the results to be achieved in a test environment are fast and boxed.However, in production environments there may be another demand for melting, delayed infusion
slug: istioSource
image: https://static.goodrain.com/wechat/istio/istio.jpeg
---

There are many existing ServiceMesh frameworks such as Istio, linkerd, etc.For users, the results to be achieved in a test environment are fast and boxed.However, in the production environment, there may be another demand for melting and delayed infusion.So a single ServiceMesh framework cannot meet user needs at the same time.

In the previous Rainbond version, Rainbond supported a wide range of different application governance models as a plugin to implement the Istio governance model.

This paper will provide an understanding of Rainbond achieving the Istio governance model.

## Fundamentals

### Dynamic Access Control

First, we need to know how Istio is automatically injected.In fact, different ServicesMesh frameworks like Istio, linkerd and others use a very important feature in Kubernetes and call Dynamic Admissions Control, as well as：Initializer.

This feature will be called immediately after the API object is created.Complete some initial preparation before the API objects are formally processed.So when an Istio control plane is deployed, when you submit a Yaml file for an API object, it will be captured by Istio's access controller, and some PATCH actions, such as adding the corresponding Sidecar container fields.Finally turn this PATCH API object to Kubernetes for processing.A detailed description of the injection mechanism for the ServiceMesh framework will follow.

### How to Inject Automatically

Users need to first deploy Istio control plane in the cluster.It will contain an Initializer to automatically inject an Envoy container for Pod
First, Istio will define the Envoy container itself and save it in Kubernetes as ConfigMap.Reads configuration to Envoy containers when the Initializer's controllers are watched via Admission-Webhooks to listen to the appropriate API object that meets the rules [referred to here as the corresponding Annoations' API object is created.and add related fields to the API object submitted by the user.Details are provided in the graph and description below.

![](https://static.goodrain.com/wechat/initializer-istio/Process.png)

The processing done by the cluster after submitting the yaml file to the Kubernetes cluster is probably divided into the following steps：

1. The Yaml file is submitted to APIServer, APIServer filters this request and performs some front-loading tasks such as authorization, timeout processing, audits, etc.

2. APIServer will find the type definition for this Pod and convert this Pod to an object if it exists.

3. Next, the admission operation is a set of code that will be called upon immediately after creation and can complete some initialization actions, such as adding some Labels before object creation, but because it itself is compiled into an APIServer, the user needs to re-compile and restart APIServer.Fortunately,：Kubernetes provides a "hot plume" admissions mechanism, i.e. Initializer.

4. At present, the Initializer mechanism has been implemented for projects such as istio, linkerd, i.e. when the Yaml file submitted contains its designated Annoations field, their deployed access controllers will capture the corresponding API objects at this stage of initialization for Pod by adding the relevant configuration of the Sidecar container.

5. This will be done later to validate the API object's field.

6. Once verified, the corresponding information will be saved to etcd and the creation of an API object will be completed.

## Extend App Governance Mode

Having learned about the infusions of the existing ServiceMesh framework, we can build the application plugin for Rainbond to expand your ability to govern.We know that most of the existing ServiceMesh framework uses standard Initializer implementation.So we need only complete the following two steps.

1. The deployment of Initializer controllers to the ServiceMesh framework usually means the deployment of their control plane, which can be easily deployable based on the functionality of Rainbond already available at helm store.

2. Implement the injection of application-based data planes.

### Development of the Istio governance model

The development of the Istio governance model will be followed by a detailed description of how the governance capacity of the application can be expanded on its own.

### Frontend Display Support for Istio Application Mode：

Rainbond is mainly divided into two layers, namely, the operational and data centre levels, with specific reference to Rainbond technical architecture.

rainbond-ui is a front-end project at the business level that first needs to support the Istio governance model, and the Istio governance model is also applied because Rainbond is an application-centred application management platform.

The following graph shows：on the app page to switch the governance mode.We need to add the Istio governance model here.

![](https://static.goodrain.com/wechat/initializer-istio/istio-ui.png)

### Validation of Governance Mode

The Initializer's mechanism determines that an access controller is required to handle eligible API objects.Usually access controllers are included in the control plane at the ServiceMesh framework.

So when we switch to governance patterns, we need to check whether the cluster has already deployed the control plane of ServiceMesh framework. This step should be checked when switching.If the corresponding level of control is not deployed, there is no corresponding governance capability.Nor can it be changed.

Based on Rainbond technical architecture, we can know that rainbond-console belongs to the backend of the business layer.It needs to communicate with the data center in order to get the status of the cluster.Therefore, the effectiveness of governance models needs to be checked in both the rainbond-console and rainbond projects.

#### rainbond-console validation of governance models

The `GovernanceModeEnum` class defines the supported governance mode with the following code.First, we need to add `ISTION_SERVICE_MESH` here in the governance model to judge the effectiveness of the governance model at the operational level.When this check is passed, we need to request the interface at the data center to check if this governance mode is installed with the corresponding control plane.

`/console/enum/app.py`

```python
Class GovernanceModeEnum (AutoNumber):
    BUILD_IN_SERVICE_MESH = A)
    KUBERNETES_NATIVE_SERVICE = ()
    ISTIO_SERVICE_MESH = (

    @classmethod
    def choices(cls):
        return [(key. alue, key. ame) for key in cls]
    
    @class method
    def names (cls):
        return [key. The same for key in cls]
```

#### rainbond validation of governance models

When receiving a verification request from the business side, we need to test if the control plane of the ServiceMesh framework has been deployed in the cluster.With reference to the following code, since `istio-ca-root-cert` is visible in every namespace after deploying the Istio control plane, we use this ConfigMap here as the basis for determining the control planar deployment.
When it is confirmed that Istio control plane is installed, we return to the business end results.Finally toggle finished.

`/api/handler/app_governance_mode/adaptor/istio.go`

```go
func (i *istioServiceMeshMode) IsInstalledControlPlane() boolool uma $6
        ctx, cancel:= context. ithTimeout(context.Background(), 5*time.Second)
        defer cancer()
        cmName := os. etenv("ISTIO_CM")
        if cmName == "" LO
                cmName = "istio-ca-root-cert"
        }
        _, err := i. ubeClient.CoreV1(). ConfigMaps("default"). Get(Ctx, cmName, metav1. etOptions{})
        if err! nil {
                return false
        }
        return true
}
```

#### Implement the application-based data planar injection

It is not enough to switch to the governance mode alone. We need to make Istio control plane injected Sidecar for the specified application.Rainbond itself instantiated Rainbond-Application Model through the Worker component into a Kubernetes resource model.Control the life cycle of the app.

We therefore need to automatically complete the app injection for users when the workker component converts resources.Reference Istio Injection Strategy.We can find Istio relies on Label\`"sidecar.istio.io/inject": "true" to complete injection.And in Rainbond, we can see the following code.This is to convert Rainbond application models into part of the Deployment.Here we've added the injectLabels to the Deployment.

There are these initialization actions.When an API object is created, it is processed by Istio's access controller, which completes data planar injection.

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

For different modes of application governance, we can refer to the code of the application mode extension.Perform the following interfaces to complete the switching and injection of the application mode of governance.

The implementation of the `IsInstanledControlPlane` interface is already reflected above.It is primarily used to determine whether the control plane has been installed and is ready for normal use.The `GetInjectLabels` is mainly used when the Worker component converts the application model to a Kubernetes resource, adding the specified Labels for processing by the deployed access controller.

`/api/handler/app_governance_mode/adaptor/app_governance_mode.go`

```go
Type Apps GoveranceModeHandler interface LO
        IsInstallation ControlPlane() ol
        GetInjectLabels() map[string]string
}
```

## Summary

This paper focuses on the infusion mechanisms and development of the application governance model, which allows users to switch from the application mode by accessing the official documentation of the ServiceMesh plugin for infusion.Bring applications to different governance capabilities.

## Reference Link

- [Dynamic Admissions Control](https://kubernetes.io/docs/reference/access-author-authorz/extensible-admission-controllers/#initializers)

- [Rainbond-UI implementation of Istio Community](https://github.com/goodrain/rainbond-ui/committ/2830fc585df12f1cc443f7e73a63daf8254742e)

- (https://github.com/goodrain/rainbond-console/commit/dd009c1f05519fa0813a889260180f22f58a)

- Rainbond implementation of Istio Commit：
  - [Istio.go](https://github.com/goodrain/rainbon/blob/4f62d79a58d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/istio.go#L23)
  - [service.go](https://github.com/goodrain/rainbon/blob/cf00c0d5ebe0f45ab8f5d49139616df0f7c1f9f/worker/appm/conversion/service.go#L207)
  - [app_governance_mode.go](https://github.com/goodrain/rainbon/blob/4f62d79a58d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode.go#L10)

- [Rainbond Technical Architecture](https://www.rainbond.com/docs/archive/archive?channel=cnblog)

- [Istio Injection Strategy](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy)
