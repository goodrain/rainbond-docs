---
title: Istio Network Governance Model
description: Using the Istio Network Governance Model in Rainbond
---


In Rainbond, users can set different governance modes for different applications, that is, users can manage applications on demand by switching the governance mode of the application. The advantage of this is that users can not be bound by a certain ServiceMesh framework. , and can quickly trial and error, can quickly find the most suitable ServiceMesh framework for the current business.

In the current version of Rainbond, Istio exists in the "plug-in" mode. When the user needs to use the Istio governance mode, if the Istio control plane is not installed, a prompt will be prompted to install the corresponding control plane.Therefore, the Istio control plane needs to be deployed before use. The control plane only needs to be installed once in a cluster. It provides a unified upper-level operation and maintenance entry, which will be used to manage services working in the Istio governance mode, complete configuration distribution, etc. Function.Combined with Rainbond's existing helm installation method, we can easily install the corresponding components.

## Deploy the Istio control plane

### Preparation

- Create a team

In Rainbond v5.5.0, we support users to specify a namespace when creating a team. Since the default helm installation namespace is istio-system, in order to reduce user configuration, we first need to create a corresponding team.As shown in the figure below, the English name of the team corresponds to the namespace of the team in the cluster.Fill in `istio-system` here.

![image-20211212203716453](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212203716453.png)

- Docking store

Rainbond supports direct deployment of applications based on helm, so the next step is to connect to the official Rainbond helm warehouse, and then deploy Istio based on the Helm store. On the application market page, click Add store, select the helm store, and enter the relevant information to complete the connection.

Store Address：https://openchart.goodrain.com/goodrain/rainbond

![image-20211212203208140](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212203208140.png)



### Install the Istio control plane

Currently, the Istio version provided by Rainbond's official Helm store is`1.11.4`According to [Istio official documentation](https://istio.io/latest/docs/releases/supported-releases/), the required Kubernetes cluster version for this version is：1.19, 1.20, 1.21, 1.22. If your cluster is based on Rainbond official documentation Deployments already meet the version requirements.

- Install the base app

Select the`base`application in the helm store to deploy, and select the previously created team. This application mainly deploys Istio-related cluster resources and CRD resources.

![image-20211212204419466](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212204419466.png)

Click**to confirm**and then enter the base application interface. There is no need to modify the configuration. Just click the**Install**button at the bottom of the page. When the**Deployed**button appears at the top of the page, the installation is complete.

![image-20211212204419466](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/base.png)



- Install istio-discovery

Like the above base applications, choose the right team and install the `istio-discovery`application. With these two applications, you can have the basic governance capabilities of Istio.

- install prometheus

In Istio, each component allows Prometheus to periodically capture data by exposing the HTTP interface (using the way of Exporters).Therefore, after the Istio control plane is installed, Prometheus needs to be deployed in the istio-system namespace, and the data source of each relevant indicator of the Istio component is configured in Prometheus by default.

As with the base app above, select the correct team and install the `Prometheus`app.


- install kiali

Istio provides a unified visual interface Kiali for us to view related services and configurations, which can display service topology relationships and configure services in the visual interface.

As with the base application above, select the correct team and install the kiali-operator application.


The installation process will automatically create a Service, and the access port of kiali can be exposed in the form of a third-party component of the Rainbond platform.as shown below：

![image-20211212212924071](https://ghproxy.com/https://raw.githubusercontent.com/yangkaa/images/main/works/image-20211212212924071.png)

| configuration item            | value        |
| ----------------------------- | ------------ |
| component name                | customize    |
| Component English name        | customize    |
| Component registration method | Kubernetes   |
| Namespace                     | istio-system |
| Service                       | kiali        |


Add an access port in the port interface, after adding, open**external service**and use the generated gateway policy to access

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/port.jpg)


kiali requires an authentication token when logging in, use the following command to get token：

```
kubectl describe secret $(kubectl get secret -n istio-system | grep kiali-token | awk '{print $1}') -n istio-system
```

If there is no kubectl command, please refer to[Command Line Tools](/docs/ops-guide/tools/#kubectl)document to install.

Obtain the token and log in to the kiali visualization interface. At this point, the deployment of the Istio control plane is completed.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/dashboard.jpg)



### Using the Istio network governance model

**1. Switch governance mode**

Let's take the SpringBoot background management system[Ruoyi](https://gitee.com/y_project/RuoYi)as an example, as shown in the figure below, users can first install a`Ruoyi SpringBoot`application from the open source application store, select the version 3.6.0, click the governance mode switch, and select the Istio governance mode.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/network.jpg)

After clicking to switch to the Istio governance mode, the user needs to manually set the internal domain name. The internal domain name here will be the service name of the component in the Kubernetes cluster, which is unique under the same team.Here we modify it to a more readable internal domain name.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/model.png)

**2. Modify the configuration file**

After this step is completed, we also need to go to `ruoyi-ui` to mount a new configuration file.This is mainly because by default, the backend service address in the nginx configuration file `web.conf`  of`ruoyi-ui` is 127.0.0.1, which was available when Rainbond's built-in ServiceMesh mode was used.

However, when the Istio governance mode is used, the components communicate through the internal domain name, so the corresponding proxy address needs to be modified by mounting the configuration file. The configuration file of`ruoyi-ui` can be accessed through the `Web terminal` on the upper right to access the container , copy the contents of the file `/app/nginx/conf.d/web.conf`.After modifying the proxy address, save it, as shown in the following figure.Earlier we set the internal domain name of the console to `ruoyi-admin`, so replace it with `ruoyi-admin`here.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/conf.jpg)

**3. Restart the app**

After completing the above two steps, we need to restart the entire application.After starting the application, go to the component page to view, you can see that each component has a similar sidecar container, which is the data plane of Istio. After the application is switched to the Istio governance mode, all components under the application will be automatically injected into the corresponding The Sidecar container does not require additional user setup.

So far, the application has been included in the scope of Istio governance. If users need more configuration of the application, they can refer to [Istio official document](https://istio.io/latest/docs/setup/getting-started/#dashboard) for expansion.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/dataplane.png)

**4. Service observability expansion**

Access the kiali visualization interface, in the Applications column, select the namespace where the application is located, you can see the application we created before, click to enter, you can see the following traffic route.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/overview.png)

In the Graph column, you can also see the corresponding in-app traffic requests.For more configuration and related functions, please refer to [Kiali official documentation](https://kiali.io/docs/installation/quick-start/).

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/user-manual/app-manage/deploy-istio/display.png)

