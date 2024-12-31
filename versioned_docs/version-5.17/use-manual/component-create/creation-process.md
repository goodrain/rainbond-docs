---
title: 组件创建流程说明
description: 本文介绍Rainbond创建组件的主要过程
---

本篇文档介绍在 Rainbond 中创建组件的基础流程。

## 前提条件

1. 已完成团队的规划和创建。
2. 集群资源充足。

组件的创建目前有两个入口，分别是*团队视图/创建组件入口* 和 _应用视图/添加组件入口_ ，创建流程一致。

## 从源码开始创建组件

下面将会以 Java 源码创建组件为例, 介绍在 Rainbond 上用源码创建组件流程。

1. 提供组件名称和所属应用，最关键的是提供构建源信息，源码构建即提供代码仓库地址，授权等信息。

2. 等待 Rainbond 对源代码进行检测，这个过程 Rainbond 将根据代码源信息获取源代码并进行语言类型、语言规范等检测，并从 [Rainbondfile](./language-support/rainbondfile) 文件中读取组件属性。

3. 如果检测结果通过即会根据检测回的组件属性创建组件，如果不通过用户需要根据提示更改相关信息。

4. 检测完成后用户可以选择构建启动或进行高级设置，设置更多组件属性。若选择构建启动 Rainbond 将再次获取源代码根据代码检测的语言类型进行源码构建。请注意，源码类型只会在源码检测中读取，因此后续的开发过程如果更改了语言类型，需要触发重新代码检测。

5. 组件构建完成后即可通过端口绑定的默认域名进行访问。

源码地址: https://github.com/goodrain/java-maven-demo.git

<img src="https://static.goodrain.com/images/docs/5.2/user-manual/app-creation/creation-process/Sourcecodeconstruction.png" title="基于源代码创建组件页面"/>

<b>各类语言的详细参考文档如下</b>：

[Java 语言参考](./language-support/java/java-maven)  
[PHP 语言参考](./language-support/php)  
[Python 语言参考](./language-support/python)  
[NodeJS 语言参考](./language-support/nodejs)  
[.Net 语言参考](./language-support/netcore)  
[Html 语言参考](./language-support/html)  
[定义 Dockerfile 的任意源代码参考](./language-support/dockefile)  

### Git 和 Svn 的使用

在创建组件时，根据代码仓库的类型选择 Git 或 SVN, 并正确填写该应用的代码仓库地址以及要使用的代码`分支`或 `tag`. Git 的默认分支是 `master`, SVN 的默认 tag 是 `trunk`。

svn checkout 代码时的默认参数包括：

```
--username --password --non-interactive --trust-server-cert
```

git 获取代码时支持账号认证、Key 认证和 Oauth2.0 认证。

- 账号密码连接代码仓库

如果需要用账号密码连接代码仓库, 则点击填写仓库账号密码, 正确填写你的登陆用户名及密码即可.

<img src="https://static.goodrain.com/images/docs/5.2/user-manual/app-creation/creation-process/Password%20construction.png" title="填写代码仓库授权信息和版本选择示意图"/>

- SSH 连接代码仓库

如果需要用 SSH 秘钥连接代码仓库, 则点击下方的配置授权 Key, 会为你生成一段秘钥, 然后把这段秘钥添加到你代码仓库的部署秘钥中.

<img src="https://static.goodrain.com/images/docs/5.0/user-manual/app-creation/ssh_login.jpg" title="使用SSH KEY作为授权方式"/>

## 从 Docker 镜像创建

下面将会以 Nginx 的官方镜像为例, 介绍并演示在 Rainbond 上用 Docker 镜像创建组件的过程。
与源码创建流程一样，不同的是提供的构建源信息和类型不同，流程如下：

1. 提供组件名称和所属应用，最关键的是提供构建源信息，镜像构建即提供镜像名称和授权信息。

2. Rainbond 将根据提供的镜像信息获取镜像，Rainbond 能够获取到指定的镜像是创建成功的基础。目前 Rainbond 对于镜像的检测规范较为灵活，因此务必注意通过检测的镜像不一定能够正常的运行，比如上文提到的 Rainbond 不能运行的镜像类型。Rainbond 获取镜像成功会解析镜像的元数据获取创建组件所需的属性信息。

   > 如果希望可以批量添加环境变量，最好将其定义到镜像元数据中（即 Dockerfile 中定义）。Rainbond 识别时将自动从其中识别获取。

3. 应用检测通过后即可创建组件。

4. 构建完成后即可访问组件。

<img src="https://static.goodrain.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerconstruction.png" title="基于Docker镜像创建组件示意图"/>

由 Docker 镜像创建的组件就完成了。如果从私有镜像仓库的镜像创建组件，需要注意下述几类问题：

- 私有仓库 Https 配置完善，可以直接拉取镜像。
- 如果私有仓库使用自签证书，Rainbond Chaos 组件所在节点需要配置私有仓库信任，参考运维文档。
- 如果镜像仓库是私有的，请提供正确的账号密码信息。

### 示例部署带启动命令的镜像

- 通过 docker run 命令方式部署: `docker run -p 8490:8490 goodrain.me/test -s "ws://192.168.1.1:8490"`

<img src="https://static.goodrain.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerrun.png" title="通过DockerRun命令提供更多参数示意图"/>

- 通过指定镜像方式:
  - 镜像地址: `goodrain.me/test` 并构建
  - 应用构建源处修改启动命令为 `-s "ws://192.168.1.1:8490"`

`goodrain.me/test`请替换为自己镜像

<img src="https://static.goodrain.com/images/docs/5.2/user-manual/app-creation/creation-process/modify.png" title="镜像启动命令后期更改示意图"/>

## 从应用市场安装

Rainbond 提出了一种应用模型 Rainbond Application Model（RAM），这是标准的 Rainbond 应用规范。基于该模型以及 Rainbond 的应用市场机制，最终实现了一键安装/升级。高度自动化的交付体验，提升了企业应用交付效率，降低交付成本。

Rainbond 提供的应用市场分为两类: 

**1. 本地组件库**

:::info

本地组件库是 Rainbond 自带的应用市场，你在这个企业下发布的所有应用模版都可以保存在此。企业内部的其他用户可以通过从本地组件库安装应用模版来快速复制这个应用。发布到本地组件库可以参考: [制作可复用的应用模版](../get-start/release-to-market)。

:::

**2. 开源应用商店**

:::info

开源应用商店是由好雨科技官方支持的应用市场，所有 Rainbond 都可以对接该市场，并一键安装上面的应用。

:::

本地组件库与云应用市场的区别主要在于: 你在本地组件库中发布的应用，只能在部署的这套 Rainbond 环境中流转。而发布到云应用市场的应用，可以在多套 Rainbond 环境中一键安装。

### 从开源应用商店安装应用

当你部署完 Rainbond 时，点击左侧的应用市场按钮，选择开源应用商店，你将会看到如下页面。

<img src="https://static.goodrain.com/docs/5.6/use-manual/component-create/appstore.jpg" title="云端应用市场授权示意图"/>

获取授权后，你将可以点击应用右侧的安装，如下图所示:

<img src="https://static.goodrain.com/docs/5.6/use-manual/component-create/install-app.png" title="云端应用市场安装示意图"/>

选择你要安装到的团队和应用，将会跳转到应用下，你可以看到应用拓扑图，它将会自动启动。接下来你就可以访问应用了

<img src="https://static.goodrain.com/docs/5.6/use-manual/component-create/install-app-topological.png" title="云端应用市场安装应用拓扑图"/>

### 从本地组件库安装应用

当你部署完成 Rainbond 后，你可以参考[制作可复用的应用模版](../get-start/release-to-market)，制作出属于你的应用。此处，我们已制作出 WordPress 应用，与从云应用市场安装相同，点击右侧安装，一键安装完成后。你就可以访问到你自己的应用了。

<img src="https://static.goodrain.com/docs/5.6/use-manual/component-create/install-app-local.png" title="本地组件库安装应用示意图"/>

从本地组件库安装将是应用交付的关键流程，本地组件库的应用支持一键安装和持续升级。
