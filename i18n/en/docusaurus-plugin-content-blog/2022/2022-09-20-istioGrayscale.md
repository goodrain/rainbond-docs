---
title: Dry Freight sharing|Use Istio to achieve gray release
description: As the base platform, Kubernetes provides a strong capacity to organize containers.However, there are still some complexities and constraints to its deployment over operations and governance of services, where many mature ServiceMesh frameworks have been used to expand its capacity
slug: istiograyscale
image: https://static.goodrain.com/wechat/istio/istio.jpeg
---

As the base platform, Kubernetes provides a strong capacity to organize containers.However, there are still some complexities and constraints to its deployment over operations and governance of services.In the area of service governance, there are already many mature ServiceMesh frameworks for expanding their capacity, such as Istio, Linkerd, Dapr, etc.This paper will focus on how to use the ability of Istio to extend the Kubernetes grayscales.

On deployment, the Open Source Project [Rainbond](https://github.com/goodrain/rainbond) will be used as a base platform.Rainbond is a cloud native application management platform that uses **Application**.Standardized application models are abstract based on this design mode.The full life cycle management of business applications can be achieved without learning and writing YAML from the experience used.It is therefore used to simplify the deployment and management of operations.While Rainbond supports the replacement of ServiceMesh framework, we can choose the best matching ServiceMesh framework for service governance as needed.

## How to achieve gray release in Kubernetes

When you deploy a business in a Kubernetes cluster, you can use[灰度发布](https://kubernetes.io/docs/concepts/cluster-administration/manage-employment/#canary-employments).This method is by defining a different label between old and new versions of the service, based on the public label load traffic between different versions to the backend Pod, which ultimately controls the percentage of traffic based on the number of copies of the Pod.

如下图所示：用户定义了两个 Deployment 对象，其中旧版本名为 frontend-stable，有3个副本。New version is frontend-canary, with 1 copy.A Service object is defined at this time, using a public label between them for selection.This allows users to access the frontend service to both versions at 3:1 ratio.It is also possible to achieve full online access by adjusting the number of copies to a continuous control of the flow ratio.

![k8s-canary.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/k8s-canary.png)

Kubernetes default implementation is effective in simple deployment scenarios, but in some complex scenarios there are still significant limitations, such as：

1. Prop of gray released directly after the operation configuration is automatically scaled

2. Low percentage of traffic control is high in resource use, if 1% of traffic reaches a new version, at least 100 copies are required

3. Accurate traffic distribution controls that keep users accessing new versions in the same batch, not randomly switched when a user visits

## Summary description of Istio Gray Release

Because of the limitations of the gray dissemination method provided by Kubernetes, in some complex scenarios we need to use Istio to achieve a more sophisticated gray dissemination strategy.When using Istio for grayscale, we need to know two important concepts：

1. [Virtual services] (https://istio.io/latest/docs/concepts/trafficking-management/#virtual-services): The virtual service defines the path to the service.This may include a set of routing rules that allow requests matching to the corresponding rules to reach the specified target.

2. [Destination rules](https://istio.io/latest/docs/concepts/trafficking-management/#destination-rules): Target rules can manage traffic reaching that goal, such as grouping the pool corresponding to the service backend, integrating routing rules as defined in the Virtual Service and eventually forwarding traffic to the correct instance.

As shown in the graph below, the primary definitions of virtual services and destination rules are given for example bookinfo programs provided by the istio official network.Where virtual services are divided mainly into two blocks, hostname and routing rules.The hostname is one or more addresses that the client uses when sending a request to the service.When a request reaches virtual services, it will be matched according to its defined routing rules.The graph defines the user's traffic at the end of the email with gmail.com to reach the instance of v3.Other users access v1 and v2 services in a scale of 1:9 respectively.This approach implements accurate traffic distribution controls.

When user traffic is on the Reviews.demo.svc.cluster.local , it can be seen that a different instance set is defined according to the version label in the rule definition of destination rules and coupled traffic ratio with the number of copies.How many instances can be found with reviews-v1.Always only 10% of traffic reaches subconcentration of v1 of destination rules.This has resolved conflicts over the ratio of operational copies to flows and has led to a more rational use of resources.

![istio-canary.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/istio-canary.png)

## Istio Gray Release Practice on Rainbond

With this understanding, we will now experience Istio's gray release with BookInfo for example.

### 1. Preparation：

Before we start, we need to install the required environment ahead of time.

1. Install Rainbond

Refer to [Rainbond official documents] (https://www.rainbond.com/docs/quick-start/quick-install/) to install Istio and its components on top of the Helm store when installed.

2. Install Istio and Kiali

Sign in to the Rainbond console, create a team with the English name to the namespace in Kubernetes, Istio will install the default namespace `istio-system`, so the team will fill in the `istio-system`, which can be named `istio` project.Then click the Helm shop, pairing via `Marketplace -> Click:Plus:-> Helm Store`.The store name is filled out, and the address is `https://openchart.foodrain.com/goodrain/rainbond`.Once the store pairs are completed, we can click on the installation of istio, kiali and more.See for more information [Istio Installation] (https://www.rainbond.com/docs/use-manual/app-manage/overview/model/de-employ-istio/).

### Deployment of the BookInfo app

Before deploying BookInfo we need to create a team and app in Rainbond and switch the applied governance mode to `Istio Governance Mode`.Applying governance mode switching in Rainbond means allowing non-intrusive changes to the interoperable communication mode

As shown in the graph below, a full app will contain multiple microservice modules, while ServiceMesh framework is a Proxy injection into all business containers. Depending on the differences injected into Proxy, many types of ServiceMesh implementation can be supported, such as：Istio, Linkerd, Dapr, apps can turn on ServiceMesh capabilities as they need or change the implementation framework.To allow BookInfo app to use Istio's ability to govern, switch to `Istio Governance Mode`.

![service-mesh.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/service-mesh.png)

1. Preparing mirrors

[BookInfo](https://istio.io/ latest/docs/examples/bookinfo/) This application consists of 6 microservices and their dependency is shown in the graph below.This service provides access pages to get book details from the Details service.Get book reviews from Reviews Services.Among them, Reviews-v2 and Reviews-v3 get book rating information from the Ratings service.The following image for these six microservices is：

```bash
docker.io/istio/examples-bookinfo-productpage-v1:1.17.0
docker.io/istio/examples-bookinfo-details-v1:1.17.0
docker.io/istio/examples-bookinfo-reviews-v1:1.17.0
docker.io/istio/examples-bookinfo-reviews-v2:1.17.0
docker.io/istio/examples-bookinfo-reviews-v3:1.17.0
docker.io/istio/examples-bookinfo-ratings-v1:1.17.0
```

![bookinfo.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/bookinfo.png)

2. Deploy Component

Under the app, we can create components that correspond to these 5 microservices sequentially by selecting `Add--> Specify image -> Fill Mirror Addresses -> New Component -> Confirm Creation`.

3. Generate Available Service

We have just completed the deployment of all our services and have not defined the access strategy for these microservices.Using the product page as an example, we can go to the management page of this service by clicking on the product page in the picture.Access to `port -> Add port -> Port number Fill 9800 -> Open External Service -> Click on the generated route`. The pages of this component will not be able to pull to book evaluation information at this time.This is because by default it uses the two service names of details and reviews to connect to the components on which it depends.At this point, we are deploying components such as Reviews-v1 that do not have the correct service name.Also enter the component management page, `component port -> Add port -> Port write 9800 -> Change Use Alias -> Internal Domain Fill to Reviews-v1 -> Open Inner Service`.This is the case for details, reviews-v2, ratios, and so on to open the internal service once the corresponding service name is filled.

Finally, under the applied K8s resources, we also need to create a Service that will be used to load traffic between three versions of the Reviews.

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
  - name: HTML
    port: 9080
    protocol: TCP
    targetPort: 9080
  selector:
    component: reviews # required in three versions, Add Kubernetes properties, set this label to perform correctly
  sessionAffairity: None
  type: ClusterIP
```

4. Sort dependencies

After completing the above actions, visit the product page application. You can see book reviews switching correctly in three versions.At this time, you can switch to the layout mode, the schema of your BookInfo app.As shown in the chart below, the advantage of this arrangement is that the app can be released as a whole at a later stage, that other users can be given the same patch relationships directly down and that no longer fear that the components on which the services depend will not be found.

![topological.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/topical.png)

### Grayscale release

After completing the above deployment we get a full BookInfo program, but no Istio configuration is defined at this time, so you need to use Kiali to define traffic rules.Realization of grayscale publishing.

1. Configure Routing Rules

Visit the Kiali management page to see the app.Select Services on the left sidebar, find this Service, click on enter, right top actions select Traffic Shifting, see the following configuration：drag the slider to select the traffic ratio.30% of traffic in the graph below will be accessed to reviews-v1, 70% of traffic to reviews-v2.Click to see the bottom left corner of the page, and Kiali automatically generates virtual services and destinations rules resources for you.You can click on it to edit it again according to your needs.

![kiali.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/istio-canary-publish/kiali.png)

2. Verify that routing rules take effect

Find the most deployed component Productpage, enter the component management page, click on the upper right corner to access the entry, see book details and ratings, refresh pages, and see the proportion of unstar evaluation information (reviews-v1) and black star evaluation information (reviews-v2).Red Star evaluation information (reviews-v3) never appeared.

3. Validate component extension impact on traffic

Reviews-v1, enter the `Component Management Page -> Stack -> Number of Instances set to 4`, visit the Productpage again at this time, refresh the page, see reviews-v1 and reviews-v2 as the ratio remains 3:7, and the number of component instances has no impact on the traffic distribution strategy.
