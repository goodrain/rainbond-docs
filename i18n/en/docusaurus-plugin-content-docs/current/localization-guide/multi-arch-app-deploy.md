---
title: Select architecture deployment components
---

# Specify schema

When a compute node in the Rainbond cluster that does not fit into the CPU architecture, when a new component is created, a service component can be deployed by selecting the method.Optional architecture information from Rainbond query in real time.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)

## Isomal source build

Rainbond [源码构建](/docs/use-manual/component-create/language-support/) capability, has now been extended to `arm64` available scenarios.When building service components, users simply provide source repository addresses, then select `arm64` architecture. Rainbond will automatically configure the appropriate build, run environment and run it to the corresponding compute node.

## Isomable Package Builds

For Java type of business, its Jar/War Package itself does not relate to the CPU architecture, it is sufficient to provide an appropriate operating environment.For this reason, Rainbond [上传软件包功能](/docs/use-manual/component-create/package-support/jar-war) also supports the configuration of the selected architectural deployment.

## Isomal mirrors build

When the container mirror is used to provide version `arm64/v8`, the user chooses the `arm64` architecture.Rainbond can pull the mirror of the corresponding version and deploy it to the corresponding computing node.

## Marketplace

The open source store provided by Rainbond by default is now on the available application templates under the `arm64` architecture for user's one-click installation.Of course, users can also publish their own application templates when the `arm64` service is deployed.

# Modify schema

Service component architecture information is recorded on the **build source** page of the component. When users want to change the service component to another structure, they can use \*\*change it at **build source**.Reselect the architecture **OK\*\*\*\*Build** will be done again.
