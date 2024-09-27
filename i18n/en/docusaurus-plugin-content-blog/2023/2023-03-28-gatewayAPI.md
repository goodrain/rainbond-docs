---
title: Gateway API plugin production practice in Rainbod
description: As a new generation of flow management standards, the Gateway API has improved issues such as the irregularities in the extension of the original Progress and the poor transplantation nature.This article will use Envoy Gateway as an example of how to make and publish Gateway API plugins
slug: gatewayapi
image: https://static.goodrain.com/wechat/gateway-plugin/gatewayapi.png
---

As a new generation of flow management standards, the Gateway API has improved issues such as the irregularities in the extension of the original Progress and the poor transplantation nature.From a gateway experience compatible with K8 ecology and optimization, Rainbond supports the extension of platform gateway capabilities in the form of plugins, several communities now provide Gateway API implementation and make it available as platform plugins to use the outreach gateway capacity in the platform.We can create different gateway implementations to respond to different scenarios and needs, while we can post our own plugins to the App Store for use.

This article will detail how to make and publish your Kubernetes Gateway API plugin with Envoy Gateway.The Gateway API plugin that will be released to the Open Source Store will be used by other users while actively participating in the contribution will also have the opportunity to get a small gift from us.

## Prerequisite

- Rainbond version greater than v5.13

- Rainbond already has access to open source stores and has push permissions

## Rainbond and Gateway API integration mechanisms

In Rainbond, only the built-in gateway, using defined routing rules, external traffic can be accessed directly to the corresponding app.The Gateway API is combined with the platform in the form of plugins and capacity extensions.In the platform, the Gateway API custom resources are installed and at least one gateway is implemented to expand the platform gateway.

As shown in the graph below, if apps like `App 4`, `App 5` are to be implemented using gateways that support the Gateway API, then first need to define the resources associated with the Gateway API, which are provided by the `Gateway API Base Resource Plugins`, which mainly contains definitions of Gateway API resource types and associated WebHook resources.It also exposes resources of GatewayClass and Gateway types on the platform, which can be seen in the platform capacity extension.This allows users to customize gateway behavior and configuration.

So we only need to create a gateway plugin to read Gateway type resources and generate corresponding configurations to provide gateway capability.Currently there are multiple implementations of the Gateway API, such as Envoy, Nginx, Istio, etc.Here we choose Envoy as a gateway, so that the external traffic can reach the app like `App 4` on the basis of the corresponding routing policy.

![](https://static.foodrain.com/wechat/gateway-plugin/3.png)

## Steps to create custom gateway plugins

![](https://static.foodrain.com/wechat/gateway-plugin/4.png)

The full process of implementing the Gateway API plugin, as shown in the graph above, is divided mainly into five steps： below.

1. The Gateway API base resource：currently consists mainly of a series of custom resources (CRD) that need to be deployed before the cluster can identify the type of resource when using its capabilities in the cluster.
2. Select the Gateway API gateway to implement：at present the Gateway API is already known to provide services to the community [下游实现](https://gateway-api.sigs.k8s.io/implementations/), all of which are freely available for external service delivery.
3. Platform deployment gateways and testing：need to convert gateway implementation into platform resources for deployment tests.Only then can one click be posted to the Open Source App Store for others to use.
4. Make and publish plugin：defines the metadata associated with the plugin and post it to the Open Source App Store.
5. Completing plugin information and listing：complete plugins will allow users to better use the plugin.

These steps are described in detail below.

### Deployment of Gateway API base resources

Before creating a downstream gateway implementation plugin, we need to install resources such as CRD and controller on the Gateway API, which the platform has packaged into the plugin app and placed them on the open source store.We only need to install and install the **Platform Admin->App Marketplace - >Open Source Store - >Search GatewayAPI-Base** so we need to build a new team with the English name set to `gateway-system` namespace at the time of installation. It is better to create a single app, the name of the app's name is known and can be managed at a later stage.

### Select Gateway API Gateway implementation

k8s [Gateway API Implementation List](https://gateway-api.sigs.k8s.io/implementations/) have multiple implementations and can be selected here. Since k8s Gateway API is now supported by HttpRoute to Beta version, we need to select HTTPRoute resources to support downstream implementation of beta versions, such as [Istio](https://gateway-api.sigs.k8s.io/implementations/#istio),[Cilium](https://gateway-api.sigs.k8s.io/implementations/#clian),[Kong](https://gateway-api.sigs.sigs.k8s.io/implementations/#kong).Since [Envoy Gateway](https://gateway.envoyproxy.io/v0.3.0/) is supported in Beta version, we use it as a gateway plugin this time.

### Deploy and test on Rainbond

When selected for implementation, you can see how to install the implementation in the network of implemented.Canada, for example, the network of envoy gives the following：

```YAML
kubectl appl-f https://github.com/envoyproxy/gateway/releases/download/v0.3.0/install.yaml
kubtl apple-f https://raw.githubusercontent.com/envoyproxy/gateway/v0.3.0/examples/kubernetes/http-group.yaml
```

- **install.yaml** This YAML file stores the base resources needed for our plugin.
- **http-routing.yaml** This YAML file needs to be processed. Only GatewayClass and Gateway resources required for our plugins are retained. HttpRoute resources need not be retained and will be generated automatically after the platform defines gateway policy.

Once the orchestrated resource YAML will be created in the K8s Resource Management Service for the application view, at：**Application View ---> k8s resource ---> Add**.

![](https://static.foodrain.com/wechat/gateway-plugin/1.png)

⚠️：if there are resources such as RoleBinding that need to identify namespaces, you need to make sure that the namespace of the logo is consistent with that of the currently uploaded team, so as not to cause problems such as lack of permission, as follows:：

```YAML
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
...
subjects:
- kind: ServiceAccount
  name: certgen
  namespace: envoy-gateway-system
```

Once the upload is created, we will also need to process Gateway resources in **Platform Management Views->Extension->Capacity**, mark the gate's service name or prefix and then get and display your domain name parse address when creating the HTTP policy.

```YAML
labels:
    service-name: envoy-envoy-gateway-system-envoy
```

NodePort is an IP extracted from a nodeInternal, default to NodeExternalIP if NodeExternalIP exists.

LoadBalancerIP fetches IP from ExternalIPs on Service Resources and does not display if it does not exist.

After completing the above actions, we will need to conduct tests and check mainly the following items.

1. Checks if all groups are running properly, and if all status is running.
2. Check if k8s resources in app are created successfully.
3. When all resources are in normal state, reference is made to the Gateway API gateway to use documentation for a test to see if they are workable.

### Make and publish plugins

If you want to post this gateway as a platform gateway plugin, you will also need to prepare the RBDDPlugins resource that will be applied to the plugin, and define the resource before you can see it and manage it in \`Platform Manager -> Plugins'.Example：

```YAML
apiVersion: rainbond. o/v1alpha1
kind: RBDPlugin
metadata:
  name: RBDPlugin Resource Name
spec:
  alias: Plugin Alias
  author: Plugin Producer
  description: Plugin Intro
  icon: Plugin Icon
  version: Plugin Version
```

Once this resource is defined, we can publish it to the Open Source Store by clicking on the `Post` button on the left, selecting `Publish to the Cloud App Store`.

### Finish the plugin information and list it

Plugins or apps posted to the Open Source Store. We need[登录开源应用商店](https://hub.grapps.cn/marketplace) to edit its information before it can be viewed and used by other users.Reference can be made to [how to share plugins or apply to Rainbond App Store](https://mp.weixin.qq.com/s/CipIBFLYSEQUUKMzO8dVtg).

Click on the upper right corner of the console after logging in, select[管理应用](https://hub.grapps.cn/manage/general/myapp).This should be a time to see the recently released Envoy plugin.Tap the app name to enter the details page, and edit the app's name, logo, details at this time.

We need to add a suite to apply the basic information when it is completed before it can be loaded.The role of the package here is primarily to manage the version of the application.The versions of different packages installed by users are also different.

The basic information and package will be completed and ready for upload.Only listed apps can be viewed and used by other users.Go back to the admin app page and select the list to go.

## Final Effect

We can see the gateway plugin we have produced in the Open Source App Store. As shown in the graph below, the rest of the user can also be deployed in Rainbond using the documentation available from the Gateway API.

![](https://static.foodrain.com/wechat/gateway-plugin/2.png)
