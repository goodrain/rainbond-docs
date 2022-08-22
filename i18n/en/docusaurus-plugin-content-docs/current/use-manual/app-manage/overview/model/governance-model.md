---
title: Application governance mode switch
description: Switch between Rainbond built-in ServiceMesh mode and Kubernetes native service mode
---

### Governance Mode Switch

Since the V5.3 version of Rainbond, the application management mode switching function has been added.The application governance mode mainly refers to the governance of the communication mode between components. Currently, it supports the built-in ServiceMesh mode and the Kubernetes native Service mode.

- Built-in ServiceMesh mode (default)

The built-in ServiceMesh mode requires dependencies between configuration components displayed by the user. The platform will automatically inject sidecar containers into downstream components to form a ServiceMesh microservice architecture. The communication addresses between services are unified in the localhost (127.0.0.1) mode.As the default application governance mode in Rainbond, governance functions such as A/B testing, intelligent routing, current limiting, and fusing between service components are implemented through sidecar.For more information, please refer to [Inter-service communication](/docs/use-manual/component-manage/component-connection/regist_and_discover), [Component A/B testing based on Rainbond](/docs/expand/practices/app-dev/ab_testing)

- Kubernetes native service mode

In this mode, the Kubernetes service name and domain name are used for communication between components. Users need to configure the service name registered by each component port, and the governance capability is limited.


### The effect of switching

For users, when switching to different application governance modes, the most important thing to pay attention to is the change in the way components access each other.The newly added Kubernetes native Service mode means that users can access the corresponding service components by using the Service name in native Kubernetes.

### How to switch

The entry for switching the application governance mode is located in the application topology view.At **governance mode** , you can switch between the two application governance modes.

![Switch governance mode](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-1.png)

If you switch from the built-in ServiceMesh mode to the Kubernetes native Service mode, you need to define the **internal domain name**of all ports that open inbound services under the current application.

![Define internal domain names](https://static.goodrain.com/docs/5.3/user-manual/governance-model/governance-model-2.png)

**The internal domain name** is the globally accessible address of the port.

**Simply put, the domain name defined here will be resolved to the CLUSTER-IP address of the Service in the entire cluster.**

```bash
$ kubectl get service -A
NAMESPACE NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S)
9dcf3ab241c445afad7a9a90b1b7c9a7 gr12238e-80-dbeb ClusterIP 10.43.234.35    <none>        80/TCP
```

### Changes to Communication Variables

If you don't understand what a communication variable is, please read [Communication Variable Injection](/docs/use-manual/component-manage/component-connection/connection_env).

Compared with the default built-in ServiceMesh mode, there are still communication variables in the Kubernetes native Service mode.The difference is that the value of the communication variable is no longer fixed to the local loopback address of 127.0.0.1, but becomes the internal domain name mentioned above.This change is for the convenience of users who use communication variables to determine dependencies. Without changing the configuration, they can still use communication variables to complete calls between components normally.

```bash
# The 80 port of the APP2 component in the example, its communication variable becomes the following form
NGINX_HOST=gr12238e-80-dbeb
NGINX_PORT=80
```

### Dependency changes

Even though the Kubernetes native Service pattern no longer requires dependencies to provide sidecar plugins to communicate between components, dependencies still have their value.

- The application topology diagram presented by dependencies is very intuitive and beautiful.

- Dependencies can be used to pass communication variables, so that users can normally use communication variables to complete calls between components without changing the configuration.

### Switch to istio governance mode

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```