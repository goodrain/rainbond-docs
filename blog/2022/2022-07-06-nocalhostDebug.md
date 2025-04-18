---
title: 微服务远程Debug，Nocalhost + Rainbond微服务开发第二弹
description: Nocalhost 是一款开源的基于 IDE 的云原生应用开发工具，本文将介绍如何使用 Nocalhost 快速开发 Rainbond 上的微服务应用的开发流程以及实践操作步骤
slug: nocalhostdebug
image: https://static.goodrain.com/wechat/nocalhost2/nocalhost.png
---

介绍如何使用 Nocalhost Debug 部署在 Rainbond 上的微服务

之前的文章中我们介绍了如何通过 [Nocalhost 快速开发 Rainbond 上的微服务](https://mp.weixin.qq.com/s/kC9P7fvMtJvKK7_TM2LbTw)，介绍了基本的开发流程。

本文将续接上文继续介绍，使用 [Nocalhost 开发配置文件](https://nocalhost.dev/docs/config/config-overview-en/) 实现以下内容：

* 一键 Run 和 远程Debug
* 持久化配置
* 开发容器资源限制
* 端口转发

**什么是开发配置？**

开发配置是围绕 `开发模式` 来进行的，例如使用什么镜像来进入 `开发模式`，是否需要开启持久化来保存开发容器的内容，将哪些文件同步到开发容器中，如何一键调试、一键运行容器内的服务等。 配置了正确且合适的开发配置后，可以在使用 Nocalhost `开发模式` 时更加得心应手。

<!--truncate-->

## 部署 Rainbond + SpringCloud

接下来继续以上文中的 SpringCloud Pig 为例，调试 Java Maven 服务的 Pig-auth 模块。

项目 Gitee 地址：https://gitee.com/zhangbigqi/pig

### 部署 Rainbond

这里就不详细介绍 Rainbond 的安装，请参阅 [基于Linux安装Rainbond](https://www.rainbond.com/docs/installation/install-with-ui/host-install-with-ui)。

### 部署 SpringCloud

我们在 Rainbond 内对接了开源应用商店后，在开源应用商店内搜索 `Spring Cloud Pig` 安装 `3.5.0 `版本。

来自应用商店安装应用组件的英文名称是自动生成的字符串，需要我们设置一下组件的英文名称（Deployment Name），通过 Nocalhost 连接到集群时可以很直观的分清楚 Deployment 对应的组件。

![](https://static.goodrain.com/wechat/nocalhost2/1.png)



## Nocalhost 对接 Rainbond

1. 安装 Nocalhost JetBrains Plugin 插件，请参阅文档 [安装Nocalhost JetBrains Plugin 插件](https://nocalhost.dev/docs/installation/)。
2. 获取 K8s Kubeconfig，请参阅文档 [获取 Kubeconfig 文件](https://www.rainbond.com/docs/ops-guide/tools/kubectl)。

3. 在 `pig` 命名空间下，找到工作负载 `pig-auth` 右击并选择 `Dev Config` （开发配置）

![](https://static.goodrain.com/wechat/nocalhost2/2.png)

4. 将以下配置文件复制到 `Dev Config` 中。

```yaml
# Deployment Name
name: pig-auth
serviceType: deployment
containers:
	# Deployment 主容器名称
  - name: auth
    dev:
    	# 开发镜像，该镜像包含了 Java Maven 环境
      image: registry.cn-hangzhou.aliyuncs.com/zqqq/maven:3.8.6-openjdk-8
      # 默认终端为 bash
      shell: bash
      # Rainbond 提供的 StorageClass Name
      storageClass: rainbondvolumerwx
      # 配置开发容器资源
      resources:
        limits:
          memory: 4096Mi
          cpu: "2"
        requests:
          memory: 2048Mi
          cpu: "1"
      persistentVolumeDirs:
      	# Maven 依赖包缓存路径，配合 storageClass 一起食用
        - path: /root/.m2/repository
          capacity: 10Gi
      command:
        # 一键启动命令，安装依赖包和启动 pig-auth 子模块
        run:
          - mvn
          - install
          - '&&'
          - mvn
          - spring-boot:run
          - -pl
          # 指定子模块启动
          - pig-auth
        # 一键 Debug 命令，安装依赖包和 Debug pig-auth 子模块
        debug:
          - mvn
          - install
          - '&&'
          - mvn
          - spring-boot:run
          - -pl
          # 指定子模块启动
          - pig-auth
          # Java Debug 命令
          - -Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005
      debug:
        # 远程端口，对应Debug命令中的 address=5005
        remoteDebugPort: 5005
        # 选择 Java 语言
        language: java
      # 热加载
      hotReload: true
      # 文件同步
      sync:
        type: send
        mode: gitIgnore
        deleteProtection: true
      # 端口转发，转发容器内的3000端口到本地3999
      portForward:
        - 3999:3000
```

### 一键 Run

1. 右击工作负载 `pig-auth` 。
2. 选择 Remote Run。
3. Nocalhost 会自动进入 DevMode 并执行 Remote Run。

![](https://static.goodrain.com/wechat/nocalhost2/3-1.gif)



### 一键 Debug

1. 右击工作负载 `pig-auth` 。
2. 选择 Remote Debug。
3. Nocalhost 会自动进入 DevMode 并执行 Remote Debug。
4. 在代码中打上断点，发起请求，进入 IDE Debug 模式。

![](https://static.goodrain.com/wechat/nocalhost2/4-1.gif)

### 持久化配置

在开发时，我们希望持久化的文件大多数都是 `依赖包` `日志`，本篇文章中也是缓存了 Java 的依赖包。

`rainbondvolumerwx` 是 Rainbond 默认提供的存储类，填写以下配置后会在当前命名空间下自动创建 PVC，如下：

```yaml
storageClass: rainbondvolumerwx					
persistentVolumeDirs:
  - path: /root/.m2/repository
    capacity: 10Gi
```

![](https://static.goodrain.com/wechat/nocalhost2/5.png)

### 容器资源限制

限制开发容器的资源，限额能让服务器的资源利用最大化，可以通过以下开发配置修改：

```yaml
resources:
  limits:
    memory: 4096Mi
    cpu: "2"
  requests:
    memory: 2048Mi
    cpu: "1"
```

### 端口转发

转发容器端口到本地，可以通过以下开发配置修改：

```yaml
portForward:
  - 3999:3000 		# 转发容器 3000 端口到本地 3999 端口
```

## 最后

当然 Nocalhost 可以同时调试多个微服务，同样的方式只需修改配置文件中的 Deployment Name 和 Containers Name 以及微服务的子模块。

Nocalhost 还有一些开发配置文中没讲到的，比如：开发环境变量、文件同步的两种模式 `pattern` `gitignore` 等等，并且 Nocalhost 支持多种语言，Java 只是其中一种，小伙伴们可以自行探索。

Nocalhost + Rainbond 让开发、部署更加高效、便捷。

