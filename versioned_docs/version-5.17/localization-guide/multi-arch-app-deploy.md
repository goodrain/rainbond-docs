---
title: 选择架构部署组件
---

# 指定架构

当 Rainbond 集群中具有不同 CPU 架构的计算节点时，新建组件时，即可通过选择的方式，指定架构来部署服务组件。可选择的架构信息来自 Rainbond 实时查询。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)

## 异构源码构建

Rainbond 自带的 [源码构建](/docs/use-manual/component-create/language-support/) 能力，现在已经拓展到 `arm64` 可用的场景中。使用者在构建服务组件时，只需提供源代码仓库地址，再选择 `arm64` 架构，Rainbond 将自动配置合适的构建环境、运行环境，将其运行到对应的计算节点中去。

## 异构软件包构建

对于 Java 类型的业务而言，其 Jar/War 包本身与 CPU 架构无关，进行要提供合适的运行环境即可。鉴于此，Rainbond [上传软件包功能](/docs/use-manual/component-create/package-support/jar-war) 也支持选择架构部署的配置。

## 异构镜像构建

当使用的容器镜像提供 `arm64/v8` 版本时，使用者选择 `arm64` 架构。Rainbond 就可以拉取对应版本的镜像并将其部署到对应的计算节点中去。

## 应用市场

Rainbond 默认提供的开源应用商店目前已经上架 `arm64` 架构下可用的应用模板供使用者一键安装使用。当然，使用者也可以在部署了 `arm64` 服务组件后，自行发布属于自己的应用模板。


# 修改架构

服务组件的架构信息记录在组件的 **构建源** 页面中，当使用者希望将服务组件变更到其他架构下运行时，可以在 **构建源** 处点击 **更改**。重新选择架构后 **确定**。再进行一次 **构建** 操作即可。