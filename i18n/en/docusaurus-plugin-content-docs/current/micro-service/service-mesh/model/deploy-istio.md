---
title: Istio network governance model
description: Using the Istio network governance model in Rainbond
---

In Rainbond, users can set different modes of governance for different applications, that is, they can use a switching of their governance models to manage them on demand, with the advantage that users can not be bound by a ServiceMesh framework and be quick to find a service Mesh framework that is best suited to their current operations.

In the current version of Rainbond, Istio exists in the "Plugins" mode. When users need to use the Istio governance mode, Istio control plane is not installed, Istio will be prompted to install the corresponding control plane.The control plane of Istio is therefore required to be deployed before it is used, and the control plane needs to be installed only once in a cluster, which provides a unified upper lift entry that will be used to manage work under the Istio governance model, complete configuration and so on.In conjunction with existing helm installation in Rainbond, we can easily install the corresponding components.

## Deploy an Istio control plane

### Preparatory work

- Create team

In Rainbond v5.5.0, we supported the user namespace when creating a team. Since the namespace installed by helm is istio-system we need to create teams first to reduce user configurations.The English name of the team corresponds to the naming space of the team in the cluster, as shown in the graph below.Enter `istio-system` here.

![image-20211212203716453](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-202112203716453.png)

- Interface Shop

Rainbod supports direct deployment of the app based on helm, so it will then connect to the official helm warehouse, then Istio based on the Helm shop, on the App Market page, click on the Add Store, select helm store and enter the relevant information.

Shop address：https://openchart.foodrain.com/goodrain/rainbond

![image-20211212203208140](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-202112203208140.png)

### Install Istio control plane

The version of Istio, currently provided by the official Helm store in Rainbond, is `1.11.4`, and according to [Istio官方文档](https://istio.io/ latest/docs/releases/supported-releases/), the required versions of the Kubernetes cluster are：1.19, 1.20, 1.21, 1.22, which are fulfilled if your cluster is deployed according to official Rainbond documents.

- Install base app

Select the `base` app in the helm store to deploy and create a team that has been created prior to selection. The app primarily deploys Istio's related cluster and CRD resources.

![image-20211212204419466](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-202112204419466.png)

Click **OK** to enter the base app interface. No configuration needs to be modified. Click the **Install button** button below the page until the **Deployed**.

![image-20211212204419466](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/base.png)

- Install istio-discovery

Like the above base app, select the right team to install the `istio-discovery` app. With these two applications, you can have Istio based governance capabilities.

- Install prometheus

In Istio, components routinely capture data by exposing HTTP interfaces (exporters).So once the Istio control plane installation has been completed, Prometheus needs to be deployed in the istio-system namespace to configure default data sources for the Istio components in Prometheus.

Like the above base app, select the right team to install the `Prometheus` app.

- Install kiali

Istio provides us with a unified visualization interface Kiali to view related services and configurations that can display service patches in visualization interfaces and configure services.

Like the above base app, select the right team to install the kiali-operator app.

The installation process will automatically create the Service, which will expose the kiali access port in the form of a third party component of the Rainbod platform.Figure： below

![image-20211212212924071](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-202112212924071.png)

| Configuration Item            | Value        |
| ----------------------------- | ------------ |
| Component name                | Custom       |
| Component English Name        | Custom       |
| Component registration method | Kubernetes   |
| Namespace                     | istio-system |
| Service                       | kiali        |

Add a port to the port interface, then open **External Service** with the generated gateway strategy

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-employ-istio/port.jpg)

Auth token is required when kiali is logged in. Use the following command to get token：

```
kubtl description secret $(kubtl get secret -n istio-system | grep kii-token | awk '{print $1}') -n istio-system
```

No kubectl command referred to[命令行工具](/docs/ops-guide/tools/#kubectl) for installation.

Get the token login to the kiali visualizer interface to complete the Istio control plane deployment.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/dashboard.jpg)

### Use Istio Network Governance Mode

**1. Switch governance mode**

We use SpringBoot Background Management System[若依](https://gitee.com/y_project/RuoYi) as an example. As shown in the graph below, users can first install a `follow SpringBoot` app, version 3.6.0, switch from Governance Mode to Istio Governance.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/network.jpg)

When switching to Istio governance mode, users will be required to manually set an internal domain name, and the internal domain name will be the service name of the component in the Kubernetes cluster, unique under the same team.Here we're changing to more readable internal domain names.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/model.png)

\*\*2. Modify profile \*\*

Once this step is completed, we also need to go to `ruoyi-ui` to mount a new configuration file.This is mainly because by default, the backend service address of `ruoyi-ui` in the `web.conf` configuration file is 127.0.0.0.1, which is available when previously used in Rainbond Built ServiceMesh mode.

However, when using Istio governance mode, the component communicates via internal domain and therefore needs to change the proxy address by mounting the configuration file. The `ruoyi-ui` configuration can be accessed to the container by `WebTerminal` at the top right, copying the contents of the `/app/nginx/conf.d/web.conf`Save the proxy address after modification, as shown in the graph below.Previously, we set up an internal domain named `ruoyi-admin`, so instead of `ruoyi-admin`.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-employ-istio/conf.jpg)

**3. Restart application**

After completing these two steps, we need to reboot the entire application.After launching the app, enter the component page to view and see that each component has a similar Sidecar container. This is the data plane of Istio. After the app switches to Istio, all components under the app will automatically inject the corresponding Sidecar container, without user extra settings.

As a result, the application has been included in the Istio governance range, and users can expand by reference to [Istio官方文档](https://istio.io/latest/docs/setup/getting-started/#dashboard) if they need more configuration of the application.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/dataplane.png)

**4. Service Observability Expansions**

Access the kiali visualizer interface, and in the Applications, select the namespace in which we have previously created, click in to see the following traffic routes.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-employ-istio/overview.png)

Also see traffic requests within the app in the Grapph column.More configuration and related features refer to [Kiali官方文档](https://kiali.io/docs/installation/quick-start/).

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/de-istio/display.png)
