---
title: Gateway API usage documentation
description: Extend multiple Gateway implementations using the Gateway API
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Gateway API is a new resource type introduced in Kubernetes 1.19 with the goal of creating a high-performance, scalable, role-oriented service network model.Compared to the original Progress API, the Gateway API has more flexible, normative, extensible, etc. and addresses the issue of inprogress API irregularities, transplantation deficiencies, etc.From optimizing gateway, decoupling user business with platform connections and compatibility with the K8s ecology, version v5.13.0 supports the Kubernetes Gateway API, where the gateway capacity as a plugin is deployed independently, integrating its features perfectly with the platform.Users can choose to use the default gateway or outreach gateway, depending on their own needs and scenarios.

This article will be implemented using the gateway provided by envoy as an example of how to add and use outreach gateway capabilities in the platform.

## Prerequisite

1. Platform version at least v5.13.0
2. Open source store to connect.

## Deployment process

Combine k8s Gateway API for role-oriented features, the platform also classifies gateway resources as follows：

![gateway-api](https://static.goodrain.com/wechat/gateway-api/gateway-api101.png)

### Platform administrator action：

##### Install k8s Gateway API basic resources and downstream gateway implementation

k8s Gateway API consists of a set of resources such as CRD and controllers. A set of gateway type API objects need to be installed on the platform before installing gateways downstream.

The platform provides the `k8s-gateway-base` application plugin, which contains all the resources of the k8s Gateway API. The plugin can be installed to the platform by means of the `Platform Manage View --> Marketplace ---> Open Source Store ---> Search k8s-gateway-base`. Because the `k8s-gateway-base` plugin has limited resources in namespace, it must be installed in any random app under a team named `gateway-system`. It is best to create an app individually, the name of the app is known and managed over time.

The `k8s-gateway-base` plugin is installed on the basis of the `k8s-gateway-base` app before it can be implemented downstream gateway, for example the envoy Gateway API, the `Admin View ---> Marketplace ---> Open Source Store ---> Search gateway-envoy` and the `gateway-envoy` plugin have the same namespace limitations, so it is necessary to install them in an arbitrary app in the team named `envoy-gateway-system`, it is best to create an app individually, the name of the app is known and managed in the next period.

##### View and check plugins

In the extension-plugin under the platform view, you can see the plugin information contained in the two sets of apps installed.When the plugin status is shown as running, all preparatory work is done and platform users can use the outreach gateway.

### Platform user action：

When the platform administrator deploys the gateway, the platform user can see the extension gateway column in the \`App View ---> Gateware.A few examples are given below, based on a few common scenarios, to help platform users learn quickly about their outreach capacity to use the platform.

A set of IP plus ports will appear below when a small knowledge：adds a routing strategy with a gateway type. The purpose is to show that NodePort is an IP extracted from a nodeExternalIP, default to NodeExternalIP, if NodeExternalIP exists and does not appear if it does not exist.

#### Request Header Match

Routing requests to different backend services is achieved by adding two different sets of routing rules and configuring different requests header for each set of rules.

1. Preparing two different versions of nginx to deploy to the platform and open the internal service.

   ```
   registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.16
   registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.17
   ```

2. Create HTTP policy in App View ---> Gateway --> Outreach Gateway and add two routing rules, fill out different request header and backend services respectively.

![gateway-api102](https://static.goodrain.com/wechat/gateway-api/gateway-api102.png)

3. Select different versions of Nginx from Header matching when creation is complete.

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" --header "version: 1.16" "http://rainbond.example.com:30196"
-----
<h1>Welcome to nginx1.16!</h1>
```

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" --header "version: 1.17" "http://rainbond.example.com:30196"
-----
<h1>Welcome to nginx1.17!</h1>
```

#### Traffic Split

Request control and management of more fine particle levels by adding two sets of backend routes in a set of routing rules and configuring different weights.

1. Preparing two different versions of nginx to deploy to the platform and open the internal service.

```
registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.16
registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.17
```

1. Create HTTP policy in App View ---> Gateway ---> Extension Gateway, add two backend routes, internal domain names select two versions of nginx, assign different traffic in the weight column.

![gateway-api103](https://static.goodrain.com/wechat/gateway-api/gateway-api103.png)

3. Split traffic to two different versions of Nginx once created.

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" "http://rainbond.example.com:30196"
-----
<h1>Welcome to nginx1.16!</h1>
<h1>Welcome to nginx1.17!</h1>
```

#### Request Redirect

Route requests to other addresses by configuring advanced rules for routing, selecting requests to redirect.

1. Create HTTP policy in the extension gateway, without adding backend routes, select request redirection in advanced rules.

![gateway-api104](https://static.goodrain.com/wechat/gateway-api/gateway-api104.png)

2. Redirect requests to 100 degrees when creation is complete.

```
curl -L --resolve rainbon.example.com:30196:172.31.98.243 --header "Host: rainbon.example.com" "http://rainbon.example.com:30196"
-----
.
100 degrees
...
```

#### HTTPS Route

Select HTTPS type by configuring routing listeners to perform encrypted transfer of data, protect user data from theft or manipulation.There is a need to ensure that the selected gateway type has already been configured and can be used by the corresponding listener if the contact platform administrator is not configured yet.

##### Administrator configuration HTTPS certificate

If you need to configure using HTTPS strategy, you need to configure gateway certificate manually and configure the following steps

1. Generate certificate rainbond.example.com

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/O=example Inc.CN=example.com' -keyout example.com. ey - out example.com.crt
openssl req - out rainbond.example.com.csr -newkey rsa:2048-nodes -keyout rainbod. xample.com.key -subj "CN=rainbond.example.com/O=some organization"
openssl x509 -req -sha256 -days 365 -CA example.com.crt -CAkey example.com.key -set_serial 0 - in rainbond.example.com.csr -out rainbond.example.com.crt
```

2. Create Certificate

Configure certificate location in team view ---> Gateway --> Certificate Management, note which gateways to implement configuration certificates, and create a certificate in its gateway. Here I choose the gateway implementation is envoy, so I need to configure the certificate in the envoy's team.

- rainbond.example.com.crt is filled to public key certificates

- rainbond.example.com.key content filled to private key

![gateway-api105](https://static.goodrain.com/wechat/gateway-api/gateway-api105.png)

3. Configure Certificates

The creation of the certificate will eject a dialog with yaml, which will select the immediate configuration that will jump to the extension of the platform's admin view, select the gateway resources that should be implemented in the competency column, and paste the copy yaml in the corresponding location.Once the modification has been completed, you can listen to items when you create an HTML policy.

Note：that if 443 ports are occupied please modify the port manually.

![gateway-api106](https://static.goodrain.com/wechat/gateway-api/gateway-api106.png)

##### Platform user usage

1. Create access policy in the extension gateway, listener items to select certificate for platform administrator configuration.

![gateway-api107](https://static.goodrain.com/wechat/gateway-api/gateway-api107.png)

2. Access by https once you have created it.

```
curl -v -k -H Host:rainbond.example.com --resolve "rainbond.example.com:30008:172.31.98.243" https://rainbond.example.com:30008
----------
<h1>Welcome to nginx1.16!</h1>
```

#### Extension：Gateway HTTP Field Introduction

\*\*Gateway type：\*\*Select the implementation of the k8s gateway. If multiple k8s gateways are installed in the platform, this can be selected, and the HTTP policy you create will be handled by the implementation you choose.

When you select a gateway type, a set of NodePort： IPs will appear below : Port is the proxy address of your HTTP policy. The IP will display extranet IP if your node has an extranet IP.If your service resource exists an extranet IP will be displayed as LoadBalancerIP under NodePort.

**Listening to：** matches the listener, after configuring HTTPS certificate, you can select https here if the current domain name is intended only for HTTPS access.

**Domain：** you want to configure a domain

**Routing rules：** can configure a collection of rules.⚠️：, because multiple sets of rules are stored here, has priority. Match success directly to the corresponding backend or redirect to the corresponding route.

![gateway-api108](https://static.goodrain.com/wechat/gateway-api/gateway-api.png)

- **Condition matching：** contains the basic matching rule where the relationship is or will move down when there are more than one condition match.

  - **Path：** match URL path

    Finish：requires complete matching path, including case size and all characters

    Prefix：requires URL path to start with the path to match, but does not require follow-up characters to match completely.

    Correct：uses regular expressions to match URL paths.Match success if URL path matches regular expression.

  - **Header：** match URL request header

    Finish：requires full match of HTTP headers, including case sizes and all characters

    Correct：uses regular expressions to match the value of HTTP header.Match success if HTTP header values match regular expressions.

- **Advanced rule：** contains both request header processing and routing redirect.

  - **Processing request header：** can reprocess your request

    Overwrite：to overwrite old request header

    Add：if no request is specified

    Delete：delete the specified header

  - **Request redirect：** to the specified route

    Protocol used for routing to redirect：

    domain name：redirected to domain

    Port：is typically 80,https 443

    Status code：301 or 302

- \*\*Backend routing：\*\*HTTP policy.

  - **Type：** Backend Type

    Service Agent to Service

    HTTPRoute proxy to HTTPRoute

  - **Weight：** as a percentage of the backend route.
