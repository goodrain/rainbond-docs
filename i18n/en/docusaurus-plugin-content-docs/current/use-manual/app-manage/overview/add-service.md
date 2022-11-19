---
title: add components
description: Explain how to easily add components to the application documentation
---

## Add service component description

An application consists of one or more service components, and the application is generally created during the process of creating the

In the subsequent application assembly process, adding components directly to the application will be the most convenient way.Adding service components is divided into two categories

- Add built-in components

The process of adding components is exactly the same as the [component creation process](/docs/use-manual/component-create/creation-process) , and also supports three approaches based on source code, Docker image and cloud market application.The only difference is that there is no way to create multiple services based on DockerCompose.

- Add third-party components

Add [third-party components](/docs/use-manual/component-create/thirdparty-service/thirdparty-create) Conveniently add services running outside the rainbond cluster, and also support adding static components and dynamic components.



## handle dependencies

The added components generally need to be depended on by their component services or depend on other components. You only need to enter the [editing mode](/docs/use-manual/app-manage/overview/app-topology/#编辑模式) of the [topology diagram](/docs/use-manual/app-manage/overview/app-topology) , and the service can be directly connected in one direction to quickly establish a dependency relationship.

For why you need to establish dependencies, see Document [Inter-Component Communication](/docs/micro-service/service-mesh/regist_and_discover)



## Enable extranet access

If the added component needs to be accessed by the external network, there are several ways after the addition is successful. The common way is to establish a connection between the external network cloud model and the component through the editing mode of the topology map; the second is to use the component Add the management interface.
