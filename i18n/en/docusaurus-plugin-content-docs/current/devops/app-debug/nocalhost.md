---
title: Debug app with Nocalhost
description: This article explains how to debug applications on Rainbond using Nocalhost
keywords:
  - Debug app with Nocalhost
  - Rainbond DevOps
---

Previous articles have described how to develop the basic development process through [Nocalhost rapid development of micro-services on Rainbond](https://mp.weixin.qq.com/s/kC9P7fvMtJvK7_TM2LbTw).

This document will follow up the above and use the [Nocalhost Development Profile](https://nocalhost.dev/docs/config/config-overview-en/) to achieve the following：

- One key to run and remote Debug
- Persistence configuration
- Development Container Resource Limit
- Port Forward

**What is Development Configuration?**

The development configuration is made around the `development mode`, such as which mirrors to enter `development mode`, whether you need to turn on persistent to save the content of the development container, which files are synced to the development container, how to debug one button, how to run the services inside the container, etc. Having configured the correct and appropriate development configuration, you can use Nocalhost `Development Mode`.

## Deploy Rainbond + SpringCloud

Then proceed to the Pig-auth module of the Java Maven service with SpringCloud Pig as an example above.

Project Gitee address：https://gitee.com/zhangbigqi/pig

### Deployment of Rainbond

The installation of Rainbond is not detailed here, see [基于Linux安装Rainbond](https://www.rainbond.com/docs/installation/installation-with-ui/host-install-with-ui).

### Deploy SpringCloud

We searched `Spring Cloud Pig` for a version of `3.5.0` in the Open Source App Store after we approached the Open Source Store inside Rainbon.

The English name of the app component from the App Store is an auto-generated string, which requires us to set up the English name of the component (Deemployment Name), which is clearly clearly defined as the component when connecting to the cluster through Nocalhost

![](https://static.goodrain.com/wechat/noocalhost2/1.png)

## Nocalhost Must

1. Install the Nocalhost JetBrains Plugins plugin, see the documentation [Installing Nocalhost JetBrains Plugins](https://noocalhost.dev/docs/installation/).

2. For K8s Kubeconconfig, see the document [get Kubeconfig file](https://www.rainbond.com/docs/ops-guide/tools/kubectl).

3. In the `pig` namespace, find the work load `pig-auth` right click and select `Dev Config` (developing)

![](https://static.goodrain.com/wechat/noocalhost2/2.png)

4. Copy the following configuration files to `Dev Config`.

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

### One key

1. Right click to load `pig-auth`.
2. Select Remote Run.
3. Nocalhost will automatically enter DevMode and perform Remote Runs.

![](https://static.goodrain.com/wechat/noocalhost2/3-1.gif)

### One key Debug

1. Right click to load `pig-auth`.
2. Select Remote Debug.
3. Nocalhost will automatically enter DevMode and perform Remote Debug.
4. Break a breakpoint in the code, launch a request to enter IDE Debug mode.

![](https://static.goodrain.com/wechat/noocalhost2/4-1.gif)

### Persistence configuration

Most of the files that we want to perpetuate while developing, are `dependency` logs, which also caches Java dependencies in this article.

`rainbondvolumerwx` is the default store class provided by Rainbond and will automatically create PVC under the current namespace, following：

```yaml
StorageClass: rainbondvoluerwx					
persentVolumeDirs:
  - path: /root/.m2/repository
    capacity: 10Gi
```

![](https://static.goodrain.com/wechat/noocalhost2/5.png)

### Container Resource Limit

Limit the resources of the container to maximise the use of the server's resources. You can modify： with the following development configuration.

```yaml
Resources:
  limits:
    memory: 4096Mi
    cpu: "2"
  requests:
    memory: 2048Mi
    cpu: "1"
```

### Port Forward

转发容器端口到本地，可以通过以下开发配置修改：

```yaml
portForward:
  - 3999:3000 # Forwarded Container 3000 ports to local port 3999
```

## Last

It is true that Nocalhost can also debug multiple microservices at the same time, just modify the Deemployment Name and Containers Name in the configuration file and the micro-service submodules.

Nocalhost is not mentioned in some development configurations, such as：development environment variables, `pattern` `gitignore` and Nocalhost support multiple languages, Java is only one of which small partners can explore themselves.

Nocalhost + Rainbond makes development and deployment more efficient and easier.
