---
title: Rainbond docking Istio principle explanation and code implementation analysis
description: Rainbond docking Istio principle explanation and code implementation analysis
slug: istioSource
---

:::info There are many existing ServiceMesh frameworks, such as Istio, linkerd, etc.For users, in the test environment, the effect that needs to be achieved is fast and out-of-the-box.However, in the production environment, there may be requirements such as fusing and delay injection.Then a single ServiceMesh framework cannot meet the different needs of users at the same time.

In previous Rainbond versions, Rainbond supported a variety of different application governance modes. As an application-level plug-in, it implemented the switching of Istio governance modes.

This article will analyze the principle of Rainbond's implementation of the Istio governance model. :::

<!--truncate-->


## Fundamental
### Dynamic Admission Control
First of all, we need to understand a knowledge, how Istio achieves automatic injection.In fact, different ServiceMesh frameworks such as Istio and linkerd use a very important function in Kubernetes called Dynamic Admission Control, also called：Initializer.

This function will be called immediately after the API object is created.Before the API object is formally processed, some initialization preparations are done.So after deploying the Istio control plane, when you submit the Yaml file of the API object, it will be captured by the Istio admission controller and complete some PATCH operations, such as adding the corresponding Sidecar container field.Finally, the API object after the PATCH is handed over to Kubernetes for processing.Next, we will introduce the injection mechanism of the ServiceMesh framework in detail.

### How to inject automatically
Users need to deploy the Istio control plane in the cluster first.It will contain an Initializer to automatically inject Envoy containers for Pods. First, Istio will save the definition of the Envoy container itself in Kubernetes as a ConfigMap.When the controller of the Initializer monitors the creation of an API object that conforms to the rules [here refers to the corresponding Annoations] through Admission-Webhooks, it reads the corresponding ConfigMap to obtain the configuration of the Envoy container.And the related fields are automatically added to the API object of the Pod submitted by the user.See the diagram and description below for details.

![](https://static.goodrain.com/wechat/initializer-istio/Process.png)

The above picture shows the processing done by the cluster after submitting the yaml file to the Kubernetes cluster, which is roughly divided into the following steps：
1. The Yaml file is submitted to the APIServer, and the APIServer will filter the request and complete some preliminary work, such as authorization, timeout processing, and auditing.

2. APIServer will find the type definition corresponding to the Pod, and if it exists, it will convert the Pod to an object.

3. Next, the Admission operation is performed. The Admission operation is a set of codes that will be called immediately after creation. It can complete some initialization operations, such as adding some Labels before the object is created, but since it is compiled into APIServer , so users need to recompile and restart APIServer after modification.Fortunately,：provides a "hot-plug" type of Admission mechanism, the Initializer.

4. At present, projects such as istio and linkerd have implemented the Initializer mechanism, that is to say, when the submitted Yaml file contains its specified Annoations field, the admission controller they deploy will capture the corresponding API object. The Pod performs the initialization operation, that is, adds the relevant configuration of the Sidecar container.

5. Next, Validation will be performed to verify whether the fields of the API object are legal.

6. After the verification is completed, the corresponding information will be saved in etcd, and the creation of an API object is completed.

## Extended Application Governance Model
  After understanding the injection mechanism of the existing ServiceMesh framework, we can develop Rainbond's application-level plug-ins based on this to extend the application's governance capabilities.We know that most of the existing ServiceMesh frameworks use the standard Initializer implementation.So we only need to complete the following two steps.

1. Deploying the Initializer controllers corresponding to the ServiceMesh framework usually means deploying their control planes. Here, based on Rainbond's existing function of docking with the helm store, it can be easily deployed.

2. Implement application-based data plane injection.

### Development of the Istio governance model
   Next, take the development of the Istio governance model as an example to introduce in detail how to expand the governance capabilities of the application.

### Front-end display supports Istio application governance mode：
Rainbond is mainly divided into two layers, namely the business layer and the data center layer. For details, please refer to the Rainbond technical architecture.

rainbond-ui is the front-end project of the business layer. First, it needs to support the Istio governance model. Since Rainbond is an application-centric application management platform, the Istio governance model is also for applications.

As shown in the figure below：On the application page, you can switch the governance mode.We need to add the Istio governance model here.

![](https://static.goodrain.com/wechat/initializer-istio/istio-ui.png)



### Governance Model Validity Verification

The mechanism of Initializer determines that there needs to be an admission controller to process eligible API objects.Usually the admission controller is included in the control plane of the corresponding ServiceMesh framework.

Therefore, when we switch the governance mode, we need to verify whether the control plane corresponding to the ServiceMesh framework has been deployed in the cluster. This step should be verified during the switch.If the corresponding control plane is not deployed, it does not have the corresponding governance capability.It cannot be switched.

According to the Rainbond technical architecture, we can know that the rainbond-console belongs to the backend of the business layer.It needs to communicate with the data center side to get the status of the cluster.Therefore, in both rainbond-console and rainbond projects, the validity of the governance model needs to be verified.

#### rainbond-console checks the validity of the governance mode

Referring to the following code, class `GovernanceModeEnum` defines the supported governance modes.First, we need to add `ISTIO_SERVICE_MESH`to the governance model to judge whether the governance model is valid at the business layer.When the verification here is passed, we need to request the interface of the data center to check whether the corresponding control plane has been installed in this governance mode.

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

When receiving the verification request from the business side, we need to check whether the control plane of the corresponding ServiceMesh framework has been deployed in the cluster.Referring to the following code, after deploying the Istio control plane, the ConfigMap `istio-ca-root-cert`can be viewed in each namespace, so we use this ConfigMap as the basis for judging the deployment of the Istio control plane. After confirming that the Istio control plane is installed, we return the result to the business side.Finally complete the switch.

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

It is not enough to just switch the governance mode, we need to let the Istio control plane inject the sidecar, the data plane, for the specified application.Rainbond itself instantiates the Rainbond-Application Model into a Kubernetes resource model through the Worker component.Control the life cycle of the application.

Therefore, we need to automatically complete the injection of the application for the user when the Worker component converts resources.See Istio injection strategy.We can find that Istio relies on Label `"sidecar.istio.io/inject": "true"` to complete the injection.In Rainbond's code, we can see the following code.This is part of the code that converts Rainbond's application model into a Deployment.Here, we add corresponding injectLabels for Deployment.

With these initialization operations.When the API object is created, it will be processed by Istio's admission controller to complete the data plane injection.

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
For different application governance modes, we can refer to the code extended by the application governance mode.By implementing the following interface, you can complete the switching and injection of the governance mode under the application.

Among them, the implementation of the interface`IsInstalledControlPlane`has been reflected in the front.It is mainly used to judge whether the control plane has been installed and can be used normally.`GetInjectLabels`is mainly used to add the specified Labels when the Worker component converts the application model into a Kubernetes resource so that it can be processed by the deployed admission controller.

`/api/handler/app_governance_mode/adaptor/app_governance_mode.go`

```go
type AppGoveranceModeHandler interface {
        IsInstalledControlPlane() bool
        GetInjectLabels() map[string]string
}
```
## Summarize
In this article, we mainly introduce the injection mechanism and development of the application governance mode. Users can complete the switching of the governance mode under the application through the above two steps by referring to the official documentation of the ServiceMesh plug-in that needs to be injected.Enables applications to gain different governance capabilities.



## Reference Link

* [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#initializers)

* [Rainbond-UI implements Istio Commit](https://github.com/goodrain/rainbond-ui/commit/2830fc585df12f1cc4443f7e73a63daf8254742e)

* [Rainbond-Console implements Istio Commit](https://github.com/goodrain/rainbond-console/commit/dd09c1f05519fa08f013a889260180f05c22f58a)

* Rainbond implements Istio Commit：
  * [Istio.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/istio.go#L23)
  * [service.go](https://github.com/goodrain/rainbond/blob/cf00c0d5ebe0f455ab8f5d49139616df0f7c1f9f/worker/appm/conversion/service.go#L207)
  * [app_governance_mode.go](https://github.com/goodrain/rainbond/blob/4f62d79a5858d1161e6ad719848bfddeb33aeb83/api/handler/app_governance_mode/adaptor/app_governance_mode.go#L10)

* [Rainbond Technical Architecture](https://www.rainbond.com/docs/architecture/architecture?channel=cnblog)

* [Istio injection strategy](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy)

