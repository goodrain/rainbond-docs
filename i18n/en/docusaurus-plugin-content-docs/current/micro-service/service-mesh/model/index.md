---
title: Service Mesh governance mode
description: This section describes the Rainbond application governance mode
keywords:
  - Service Mesh Governance Mode Switch
  - Istio governance model
---

## Governance Mode Switch

Rainbond started with version V5.3 and added the application mode switching.The application governance mode mainly refers to the governance of the inter-component communication mode and currently supports the built-in ServiceMesh mode and the Kubernetes Native Service mode.

- **Built-in ServiceMesh mode (default)**

The built-in ServiceMesh mode requires an explicit dependency between the user's configuration components, the platform automatically injects the sidecar container into the downstream component into the ServiceMesh microservice architecture, and the interbusiness communication address is harmonized into the localhost(127.0.0.0.1).As the default application governance mode in Rainbond you perform the governance functions of service component A/B testing, smart routing, limited flow, smelting, etc. via sidecar.For more please refer to [服务间通信](../regist_and_discover).

- **Kubernetes Native Service mode**

Use the Kubernetes Service Name domain for communication between this mode components, users need to configure the Service Name for each component port to register, and have limited governance.

- **Istio Governance Mode**

Rainbond introduced Istio as a plugin to the Rainbond application mode system, where governance is provided by Istio.

### Toggle impact

For users, switching to different modes of application governance requires the most attention and changes in how components access each other.The new Kubernetes Native Service mode means users can access the corresponding service components using the service name in the native Kubernetes.

### How to Switch

The entrance to the app governance mode switching, is located in the App Topic view.Switch between the two applications in **Governance Mode**

![切换治理模式](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-1.png)

If switched from built-in ServiceMesh mode to the native Service mode of Kubernetes, the user needs to define the **internal domain name** of all ports that open the internal service.

![定义内部域名](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-2.png)

**Internal Domain** is the global parse address for this port.

**Simply put, the domain name defined here, will be parsed as the service CLUSTEER-IP address throughout the cluster.**

```bash
$ kubectl get service -A
NAMESPACE NAME TYPE CLUSTEER-IP EXTERNAL-IP PORT(S)
9dcf3ab241c445afada9a90b1b7c9a7 gr12238e-80-dbeb ClusterIP 10.43.234.35    <none>        80/TCP
```

### Variation of communication variables

If you don't know what is a communication variable, please read [通信变量注入](../connection_env).

By comparison with the default built-in ServiceMesh mode, a communication variable still exists in Kubernetes Native Service mode.By contrast, the value of the communication variable is no longer fixed as 127.0.0.1 as a local ring address, but rather as an internal domain name referred to above.This change is intended to facilitate the use of communication variables to determine the users of the dependence, and the communication variables can still be used normally to complete calls between components without changing the configuration.

```bash
# The port of the APP2 component in the example and its communication variable becomes the following form
NGINX_HOST=gr12238e-80-dbeb
NGINX_PORT=80
```

### Changes in dependencies

Dependencies still have a value even if Kubernetes original service mode no longer needs to rely on relationships to provide residecar plugins to achieve communication between components.

- The app topography presented by the dependency relationship is very straightforward.

- Dependencies can be used to pass the communication variable so that users can normally use the communication variable to complete the calls between components without changing the configuration.

### Switch to istio governance mode

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
