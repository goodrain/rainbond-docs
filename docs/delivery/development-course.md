---
title: 交付技术发展历程
---

## 传统应用交付

传统的应用交付是直接交付二进制的可执行文件或软件包：

- **二进制的可执行文件：** java 的Jar，Linux 的可执行文件，windows的exe等。
- **软件包：** CentOS 使用 RPM 包，Debian 使用 DEB 包，Java Web 使用 WAR 包。

安装他们都需要先安装依赖的环境和基础软件，YUM 和DEB 有自己的管理依赖的软件源，但离线环境用不了，如果客户的操作系统不同，还需要另外想办法解决，运行这类服务为了解决启动和自动重启的问题，还需要通过 systemd 或 supervisor 的方式来管理。如果交付单体架构的应用传统应用交付方式还能胜任，但如果是复杂的微服务架构，传统应用交付方式将难以胜任。

在传统应用交付过程中，管理这些运行环境和操作系统差异是一个痛点，容器的出现解决了这个问题。

## 当前云原生技术应用交付

云原生应用交付主要使用的容器和 Kubernetes 相关技术。

### Docker 镜像交付

Docker 将业务和依赖的库一起打包成 Docker 镜像，在这个镜像中包含所有环境和应用，这样就可以达成一处打包、到处使用，我们可以将该镜像在任何支持 Docker 的操作系统上运行。Docker 的特性的确解决了很多开发、交付以及其他许多问题，因此 Docker 容器概念迅速的被普及。

在微服务架构场景，需要多个服务或应用一起交付，服务之间有依赖，还有复杂的配置，Docker-Compose解决了这个问题。

### Docker-Compose应用交付

docker-compose 将多个服务或应用使用 YAML 的方式管理，可以利用docker-compose命令安装部署和管理，对于一个微服务架构的应用，利用docker-compose命令就可以在任何操作系统实现一键安装和运行，当然前提是需要安装好Docker 和 docker-compose。

对于单机场景docker-compose可以适用，当应用需要高可用或多节点分布式部署，docker-compose就不能胜任，Kubernetes的出现解决了容器的高可用和分布式调度问题。

### Kubernetes YAML应用交付

在 Kubernetes 中部署业务我们需要定义 Deployment Statefulset Service 等资源类型，通过调整副本的方式 Kubernetes 会自动调度到多个节点实现业务高可用，在交付时我们只需要将这些 YAML 资源和 Image 导出，在客户的 Kubernetes 环境中部署并交付给客户。这种交付方式需要客户环境有Kubernetes或在客户环境安装Kubernetes。

当我们将Kubernetes YAML交付很多客户的时候，就需要参数配置、版本管理和简单的安装和升级，Helm在Kubernetes YAML的基础上解决了上述问题。

### Helm 应用交付

Helm 是 Kubernetes 资源的包管理器，它可以将一组资源定义成 Helm Chart 模版，提供了基于 Helm Chart 模块的安装和升级，安装时可以配置不同的参数。Helm 同样也是在 Kubernetes 交付中大多数人选择的工具。

Helm最大的问题是需要开发者学习容器和Kubernetes整个技术栈，而且客户环境必须要有Kubernetes，学习和使用的门槛太高。抽象的应用模型是一个解决方案。

## 面向未来的云原生应用模型交付

应用模型强调以应用为中心的理念，让开发者专注在业务本身，在应用级抽象和包装底层复杂的技术，应用模型跟底层基础设施完全解耦，根据对接和交付的基础设施不同，自动转换和适配，真正实现一次开发，处处自动化部署。

### 基于OAM的KubeVela应用交付

OAM（Open Application Model） 是一个描述应用的标准规范。有了这个规范，应用描述就可以彻底与基础设施部署和管理应用的细节分开。通过将应用定义与集群的运维能力分离，可以让应用开发者更专注于应用本身，而不是”应用部署在哪“这样的运维细节。KubeVela基于OAM实现了应用跨云、跨环境持续交付。当前KubeVela对离线场景的应用交付支持较弱。


### 基于RAM的Rainbond应用交付

Rainbond 是一个云原生应用多云管理平台，Rainbond 遵循以应用为中心的核心理念，统一封装容器、Kubernetes 等复杂技术，将 Kubernetes 资源统一抽象成 RAM（Rainbond Application Model）应用模型，使用户能非常简单的使用 Kubernetes，降低用户使用的门槛，使用户专注于应用开发、应用交付和应用运维。

在对于离线交付场景，Rainbond基于RAM可以导出三种离线交付包：

- **Rainbond应用模版包**，其中包含了复杂微服务架构交付的所有要素，支持升级和回滚，但要求客户环境安装Kubernetes和Rainbond；
- **非容器的软件包**，非容器包按照传统应用交付方式打包，但易用性更好，包中包含了环境依赖，并采用静态编译，适合大多数操作系统，使用 Systemd 管理；
- **Docker-Compose离线包**，支持在标准Docker Compose 环境一键启动和管理；


## 综合对比

|                | 交付门槛 | 微服务支持 | 多节点调度 ｜ 自动化运维 | 离线迭代效率 | 客户环境支持    |
| -------------- | -------- | :--------- | :----------------------- | :----------- | :-------------- |
| 传统交付       | 高       | 不支持     | 不支持                   | 低           | 服务器          |
| Docker镜像     | 中       | 不支持     | 不支持                   | 高           | 容器/K8s        |
| Docker Compose | 中       | 支持       | 不支持                   | 中           | 容器            |
| K8s Yaml       | 中       | 支持       | 支持                     | 中           | K8s             |
| Helm Chart     | 中       | 支持       | 支持                     | 中           | K8s             |
| KubeVela       | 中       | 支持       | 支持                     | 中           | K8s             |
| Rainbond       | 低       | 支持       | 支持                     | 高           | K8s/容器/服务器 |



- **应用交付门槛**，传统方式交付门槛最高；Docker、Docker-Compose、Kubernetes Yaml、Helm 和 KubeVela交付的门槛中等，因为需要学习会容器和Kubernetes相关技术；Rainbond使用最简单，不需要学习容器和Kubernetes。
- **微服务支持**，除传统应用交付和Docker镜像，其他方式都支持微服务编排和打包交付。
- **多节点调度和自动化运维**，Kubernetes Yaml、Helm、KubeVela和Rainbond支持Kubernetes的多节点调度。
- **离线迭代效率**，传统方式交付效率最低；Docker镜像有版本，而且一个命令就可以导出一个离线包，所以迭代效率高；Docker-Compose、Kubernetes Yaml、Helm 和 KubeVela需要手工逐个打出镜像离线包，复杂架构效率不高，而且手工容易出错；Rainbond支持自动化导出一个离线包，导入离线环境，可以一键升级和回滚，迭代效率很高。
- **客户环境支持**，不同客户有不同的运行环境，交付的包需要根据客户环境选择，传统应用交付方式适合老的一些基础设施，操作系统版本老，没办法安装运行容器；客户环境没有Kubernetes，也不允许安装Kubernetes，可以选择Docker镜像和Docker-Compose；Kubernetes Yaml、Helm、KubeVela和Rainbond支持有Kubernetes的环境。

## 总结

对于单体架构的应用，使用docker 镜像交付，既解决了之前的私有交付环境问题，使用和维护也比较简单，还能部署到Kubernetes环境中。

对于微服务架构场景，推荐使用Rainbond，Rainbond通过应用模型的支撑，将许多微服务模块的镜像、配置、依赖关系等统一打成一个离线包，交付时一键导入即可交付，而且根据用客户环境的差异，还能导出不同格式的离线包。
