---
title: 'DockerCompose支持规范'
description: '本章节将带你认识Rainbond基于DockerCompose配置创建多个组件的支持规范'
---

### 支持原理

DockerCompose 是 Docker 生态中的一个子项目，它提出了定义多个容器组件守护启动参数或构建方式的一种规范，它主要应用于单机容器化环境场景，类似于容器环境下的 systemd。使用 DockerCompose 定义的多组件组件从通信方式、依赖关系上限制了只能单机部署，这与 Kubernetes 对组件的处理方式有一定区别。如何让 DockerCompose 定义的所有组件能够运行于 Kubernetes 集群中，这就是 Rainbond 提供的基于 DockerCompose 创建组件提供的功能。

用户提供可以正常运行的 DockerCompose 定义文件，Rainbond 将解析此文件并分别读取内部的所有组件的关键配置，包括：组件名称、镜像名称及仓库地址、环境变量、依赖关系（启动顺序）、持久化存储、组件端口。基于这些属性创建 Rainbond 组件抽象，再通过 Rainbond 的组件抽象模型的管理运行机制部署于底层的 Kubernetes 集群。从而实现 DockerCompose 到 Kubernetes 的转化。

其中较为关键的是依赖关系、DockerCompose 中组件之间建立依赖关系使用的是 Docker 的同网络空间原理，结合 Docker 默认的 DNS 组件对依赖组件别名进行域名解析从而实现组件间通信。这种模式在 Kubernetes 场景中无法直接实现，但是基于 Rainbond 的默认 ServiceMesh 机制，就实现了一直的效果，Rainbond dns 组件将解析组件别名到`127.0.0.1`, 组件通过别名访问其他组件时，实际就是访问组件本地的代理，本地的 ServiceMesh Sidecar 容器完成组件动态发现和负载均衡。 从效果上看与单机运行的 DockerCompose 是一致的，但是实际上整个应用已经是在集群环境下分布式运行，每一个组件都可以运行多个实例。

### 创建方式及注意事项

在团队视图下通过`创建-->基于镜像创建组件-->选择DockerCompose`即可进入 DockerCompose 创建流程。由于 DockerCompose 创建出一个完整应用（包含 N 个组件），因此创建时必须创建并指定一个新的应用。

有以下几点注意事项

1. 如果 DockerCompose 配置中设置有需要读取环境变量的信息，请先手动完成更改。Rainbond 不支持动态基于环境变量渲染 DockerCompose 配置。
2. 确保 yaml 格式的 DockerCompose 配置正常，否则无法通过检测。
3. 检测过程中 Rainbond 将通过镜像信息解析镜像仓库地址并发生验证镜像是否存在请求，只有通过所有验证检测才会通过。在 5.1.3 以前版本中，验证方式是直接 pull 镜像，因此检测过程时间比较长。
4. 5.1.3 及以后版本中 Rainbond 只会从 DockerCompose 配置中读取属性，不再从镜像从解析属性。尽量将有用的属性信息（环境变量、端口、存储）显式配置。

#### 镜像仓库账号密码设置

- 整体设置

在 DockerCompose 表单设置中可以添加镜像仓库账号密码，此设置将在此 DockerCompose 中的所有镜像生效，如果个别镜像不需要账号密码或账号不同，请使用分别设置方式。

- 分别设置

分别设置是指在 DockerCompose 配置中为每个组件增加特殊的环境变量来定义当前组件镜像的镜像仓库账号密码。设置方式是：

`HUB_USER` 设置账号

`HUB_PASSWORD`设置密码

> 注意：当两种方式同时存在时，分别设置的优先级高于整体设置。
