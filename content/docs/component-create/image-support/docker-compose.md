---
title: "DockerCompose支持规范"
hidden: false
description: "本章节将带你认识Rainbond基于DockerCompose配置创建多个组件的支持规范"
weight: 3200
aliases:
  - /docs/user-manual/app-creation/image-support/docker-compose/
---

### 支持原理

DockerCompose是Docker生态中的一个子项目，它提出了定义多个容器组件守护启动参数或构建方式的一种规范，它主要应用于单机容器化环境场景，类似于容器环境下的systemd。使用DockerCompose定义的多组件组件从通信方式、依赖关系上限制了只能单机部署，这与Kubernetes对组件的处理方式有一定区别。如何让DockerCompose定义的所有组件能够运行于Kubernetes集群中，这就是Rainbond提供的基于DockerCompose创建组件提供的功能。

用户提供可以正常运行的DockerCompose定义文件，Rainbond将解析此文件并分别读取内部的所有组件的关键配置，包括：组件名称、镜像名称及仓库地址、环境变量、依赖关系（启动顺序）、持久化存储、组件端口。基于这些属性创建Rainbond组件抽象，再通过Rainbond的组件抽象模型的管理运行机制部署于底层的Kubernetes集群。从而实现DockerCompose到Kubernetes的转化。

其中较为关键的是依赖关系、DockerCompose中组件之间建立依赖关系使用的是Docker的同网络空间原理，结合Docker默认的DNS组件对依赖组件别名进行域名解析从而实现组件间通信。这种模式在Kubernetes场景中无法直接实现，但是基于Rainbond的默认ServiceMesh机制，就实现了一直的效果，Rainbond dns组件将解析组件别名到`127.0.0.1`, 组件通过别名访问其他组件时，实际就是访问组件本地的代理，本地的ServiceMesh Sidecar容器完成组件动态发现和负载均衡。 从效果上看与单机运行的DockerCompose是一致的，但是实际上整个应用已经是在集群环境下分布式运行，每一个组件都可以运行多个实例。

### 创建方式及注意事项

在团队视图下通过`创建-->基于镜像创建组件-->选择DockerCompose`即可进入DockerCompose创建流程。由于DockerCompose创建出一个完整应用（包含N个组件），因此创建时必须创建并指定一个新的应用。

有以下几点注意事项

1. 如果DockerCompose配置中设置有需要读取环境变量的信息，请先手动完成更改。Rainbond不支持动态基于环境变量渲染DockerCompose配置。
2. 确保yaml格式的DockerCompose配置正常，否则无法通过检测。
3. 检测过程中Rainbond将通过镜像信息解析镜像仓库地址并发生验证镜像是否存在请求，只有通过所有验证检测才会通过。在5.1.3以前版本中，验证方式是直接pull镜像，因此检测过程时间比较长。
4. 5.1.3及以后版本中Rainbond只会从DockerCompose配置中读取属性，不再从镜像从解析属性。尽量将有用的属性信息（环境变量、端口、存储）显式配置。

#### 镜像仓库账号密码设置

* 整体设置

在DockerCompose表单设置中可以添加镜像仓库账号密码，此设置将在此DockerCompose中的所有镜像生效，如果个别镜像不需要账号密码或账号不同，请使用分别设置方式。

* 分别设置

分别设置是指在DockerCompose配置中为每个组件增加特殊的环境变量来定义当前组件镜像的镜像仓库账号密码。设置方式是：

`HUB_USER` 设置账号

`HUB_PASSWORD`设置密码

> 注意：当两种方式同时存在时，分别设置的优先级高于整体设置。

