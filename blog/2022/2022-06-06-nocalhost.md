---
title: 使用 Nocalhost 开发 Rainbond 上的微服务应用
description: Nocalhost 是一款开源的基于 IDE 的云原生应用开发工具
slug: nocalhost
image: https://static.goodrain.com/wechat/nocalhost/nocalhost.png
---


本文将介绍如何使用 Nocalhost 快速开发 Rainbond 上的微服务应用的开发流程以及实践操作步骤。

Nocalhost 可以直接在 Kubernetes 中开发应用，Rainbond 可以快速部署微服务项目，无需编写Yaml，Nocalhost 结合 Rainbond 加速我们的微服务开发效率。

<!--truncate-->

## 一. 简介

**[Nocalhost](https://nocalhost.dev "Nocalhost") 是一款开源的基于 IDE 的云原生应用开发工具：**

- 直接在 Kubernetes 集群中构建、测试和调试应用程序
- 提供易于使用的 IDE 插件（支持 VS Code 和 JetBrains），即使在 Kubernetes 集群中进行开发和调试，Nocalhost 也能保持和本地开发一样的开发体验
- 使用即时文件同步进行开发： 即时将您的代码更改同步到远端容器，而无需重建镜像或重新启动容器。

**[Rainbond](https://www.rainbond.com/docs "Rainbond") 是一款云原生应用管理平台：**

* 使用简单，不需要懂容器、Kubernetes和底层复杂技术，支持管理多个Kubernetes集群，和管理企业应用全生命周期。主要功能包括应用开发环境、应用市场、微服务架构、应用交付、应用运维、应用级多云管理等。

## 二. 本地 + Rainbond 开发微服务

以前我们在本地 + Rainbond 开发微服务时，要开发的模块我们运行在本地，其他模块运行在 Rainbond 上，我们通过 Rainbond 的网关与本地进行通信、联调。

![](https://static.goodrain.com/wechat/nocalhost/19.png)

这样会遇到一些问题：

* 多人协作开发联调困难
* 本地环境差异化
* 无法通过注册中心(Nacos)调用其他微服务
* 远程Debug较难
* 受限于本地资源

## 三. 使用 Nocalhost + Rainbond 开发微服务

现在我们通过 Nocalhost + Rainbond 开发微服务时，所有服务都运行在 Rainbond 上，当要开发时本地 Vscode 直连到 Rainbond 组件中，并与本地代码实时同步到 Rainbond 组件中。多人开发联调时，可通过 Rainbond 内置的 Service Mesh 进行服务之间联调。

![](https://static.goodrain.com/wechat/nocalhost/18.png)

**使用 Nocalhost 开发，可以解决本地开发时遇到的问题：**

* 多人联调开发更便捷
* 服务都运行在 Rainbond 上，不再受限于本地
* 与生产环境更接近
* 远程Debug
* 通过注册中心(Nacos)调用其他微服务组件

## 四. 实践操作步骤

Nocalhost 目前支持两种开发模式：

*  Repliace DevMode 
*  Duplicate DevMode 

本篇将主要介绍 Replace DevMode，当进入 Replace DevMode 时，Nocalhost 会对 组件 执行以下操作:

1. 将副本数缩减为 1


2. 替换容器的镜像为开发镜像
3. 增加一个 sidecar 容器。 


4. 转发一个本地端口到文件同步服务器。
5. 启动本地文件同步客户端。 
6. 打开远程终端。

### 4.1 安装 Nocalhost 插件

Nocalhost 支持 `VScode` `JetBrains `，这里我们主要介绍 [VScode 插件安装](https://nocalhost.dev/docs/installation "VScode 插件安装")参考官网文档。

1. 打开 VScode，点击左侧的 `Extension` 按钮 ![img](https://nocalhost.dev/zh-CN/img/icons/vs-code-icon.jpg) 图标
2. 在搜索框中输入 `Nocalhost` 选择 `Nocalhost 插件`，并点击 **Install** 按钮

![](https://static.goodrain.com/wechat/nocalhost/3.png)

### 4.2 安装 Rainbond

我们选择 [基于主机安装 Rainbond](https://www.rainbond.com/docs/installation/install-with-ui/host-install-with-ui "基于主机安装 Rainbond") 

### 4.3 Nocalhost 对接 Rainbond 集群

1. 获取 `kubeconfig` 文件，进入 Rainbond 集群视图 -> 点击节点配置 -> kubeconfig

![](https://static.goodrain.com/wechat/nocalhost/4.png)

2. 我们将 `kubeconfig` 文件复制到本地并保存为 `yaml` 文件。
3. 打开 Vscode，点击按钮 <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />，打开 Nocalhost 插件，选择 Connect to Cluster，选择我们 `kubeconfig` 文件的路径，点击 Add Cluster，添加集群。

4. 添加完成后，如下图：

<img src="https://static.goodrain.com/wechat/nocalhost/6.png" width="30%" />

### 4.4 在 Rainbond 上部署 Spring Cloud 微服务

1. 这里选择从开源应用商店安装 Spring Cloud Pig 微服务组件，在应用商店中搜索 Pig 进行安装。

2. 部署完成后，效果如下：

![](https://static.goodrain.com/wechat/nocalhost/8.png)

### 4.5 进入 Nocalhost 开发模式

上面我们已经在本地 Vscode 中对接好了集群，并且也已经在 Rainbond 中安装了 Spring Cloud Pig 微服务，那么接下来我们在本地 Vscode 中选择其中一个组件进行开发，这里为了效果更明显，选择开发 `pig-ui` 组件。

[Spring Cloud Pig 后端](https://gitee.com/zhangbigqi/pig "Spring Cloud Pig 后端")

[Spring Cloud Pig 前端](https://gitee.com/zhangbigqi/pig-ui "Spring Cloud Pig 前端")

#### 4.5.1 克隆 Pig-ui 代码到本地

```shell
git clone https://gitee.com/zhangbigqi/pig-ui
```

#### 4.5.2 启动本地开发

打开 Vscode，点击按钮 <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />，找到我们的 Pig-ui 组件，由于该应用是从开源应用商店中安装，Deployment名称是自动生成的字符串，我们需要在组件中查询下。

![](https://static.goodrain.com/wechat/nocalhost/9.png)

<img src="https://static.goodrain.com/wechat/nocalhost/10.png" width="30%" />

我们点击旁边的🔨进入开发模式，

1. 提示选择容器，我们选择 `gred5f1c` 这个容器，剩下那个容器是 Rainbond 的 Mesh 容器，用于内部通信，不可替换
2. 提示指定源代码目录，选择我们刚刚克隆下来的代码目录。
3. 等待片刻后，会默认打开远端容器的终端界面并且容器内的文件会与本地实时同步，如下：

![](https://static.goodrain.com/wechat/nocalhost/11.png)

#### 4.5.3 启动项目

1. 安装项目依赖，执行 

	 ```shell
	npm install
   ```

2. 运行项目

    ```shell
    npm run dev
    ```

启动后效果如下，容器内端口为 80

![](https://static.goodrain.com/wechat/nocalhost/13.png)

3. 开启端口转发，点击按钮 <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />，找到我们的 Deployment，右键选择 Port Forward，Add Port Forward，输入 `38000:80` 将容器的80端口转发到本地的38000端口。

<img src="https://static.goodrain.com/wechat/nocalhost/14.png" width="30%" />

4. 通过 `http://localhost:38000` 可以访问到页面，并且也可以正常登录。

![](https://static.goodrain.com/wechat/nocalhost/15.png)

#### 4.5.4 修改代码查看效果

上面已经演示了如果通过本地访问到远端容器内的服务，接下来我们修改代码看下效果。

修改 `src/page/wel.vue`，新增一段代码，保存。可以发现，当我们保存的时候，终端中就自动重启了，与本地开发效果一致。

文件的修改会实时同步到容器中。

![](https://static.goodrain.com/wechat/nocalhost/16.png)

刷新页面`http://localhost:38000`，可以看到修改的内容已生效。

![](https://static.goodrain.com/wechat/nocalhost/17.png)



## 写在最后

通过以上的实践步骤，我们已经可以通过 Nocalhost 开发 Rainbond 上的微服务应用，摆脱本地开发，进入云原生快速开发，提升我们的开发效率。

本文仅介绍了基本的开发，还可以为项目配置 [Nocalhost开发配置](https://nocalhost.dev/docs/config/config-overview-en "Nocalhost开发配置") 等等，小伙伴们可以自行探索。


