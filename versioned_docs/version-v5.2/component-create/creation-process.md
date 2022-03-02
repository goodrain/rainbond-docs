---
title: 组件创建流程说明
description: 本文介绍Rainbond创建组件的主要过程
weight: 3102
aliases:
- /docs/user-manual/component-create/creation-process/
---

本篇文档介绍在 Rainbond 中创建组件的基础流程。

### 前提条件

1. 已完成团队的规划和创建。
2. 集群资源充足。

组件的创建目前有两个入口，分别是*团队视图/创建组件入口* 和 _应用视图/添加组件入口_ ，创建流程一致。

### 从源码开始创建组件

下面将会以 Java 源码创建组件为例, 介绍在 Rainbond 上用源码创建组件流程。

1. 提供组件名称和所属应用，最关键的是提供构建源信息，源码构建即提供代码仓库地址，授权等信息。

2. 等待 Rainbond 对源代码进行检测，这个过程 Rainbond 将根据代码源信息获取源代码并进行语言类型、语言规范等检测，并从 [Rainbondfile](./language-support/rainbondfile) 文件中读取组件属性。

3. 如果检测结果通过即会根据检测回的组件属性创建组件，如果不通过用户需要根据提示更改相关信息。

4. 检测完成后用户可以选择构建启动或进行高级设置，设置更多组件属性。若选择构建启动 Rainbond 将再次获取源代码根据代码检测的语言类型进行源码构建。请注意，源码类型只会在源码检测中读取，因此后续的开发过程如果更改了语言类型，需要触发重新代码检测。

5. 组件构建完成后即可通过端口绑定的默认域名进行访问。后续的管理维护流程参阅 [组件开发](../user-manual/component-dev/build_and_version/) [组件运维](../user-manual/component-op/basic-operation)

源码地址: https://github.com/goodrain/java-maven-demo.git

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/Sourcecodeconstruction.png" title="基于源代码创建组件页面" />

<b>各类语言的详细参考文档如下</b>：

[Java 语言参考](../component-create/language-support/java/java-maven)  
[PHP 语言参考](../component-create/language-support/php)  
[Python 语言参考](../component-create/language-support/python)  
[NodeJS 语言参考](../component-create/language-support/nodejs.md)  
[.Net 语言参考](../component-create/language-support/netcore)  
[Html 语言参考](../component-create/language-support/html)  
[定义 Dockerfile 的任意源代码参考](../component-create/language-support/dockerfile) 

#### Git 和 Svn 的使用

在创建组件时，根据代码仓库的类型选择 Git 或 SVN, 并正确填写该应用的代码仓库地址以及要使用的代码`分支`或 `tag`. Git 的默认分支是 `master`, SVN 的默认 tag 是 `trunk`。

svn checkout 代码时的默认参数包括：

```
--username --password --non-interactive --trust-server-cert
```

git 获取代码时支持账号认证、Key 认证和 Oauth2.0 认证。

- 账号密码连接代码仓库

如果需要用账号密码连接代码仓库, 则点击填写仓库账号密码, 正确填写你的登陆用户名及密码即可.

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/Password%20construction.png" title="填写代码仓库授权信息和版本选择示意图" />

- SSH 连接代码仓库

如果需要用 SSH 秘钥连接代码仓库, 则点击下方的配置授权 Key, 会为你生成一段秘钥, 然后把这段秘钥添加到你代码仓库的部署秘钥中.

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/ssh_login.jpg" title="使用SSH KEY作为授权方式" />

### 从 Docker 镜像创建

下面将会以 Nginx 的官方镜像为例, 介绍并演示在 Rainbond 上用 Docker 镜像创建组件的过程。
与源码创建流程一样，不同的是提供的构建源信息和类型不同，流程如下：

1. 提供组件名称和所属应用，最关键的是提供构建源信息，镜像构建即提供镜像名称和授权信息。

2. Rainbond 将根据提供的镜像信息获取镜像，Rainbond 能够获取到指定的镜像是创建成功的基础。目前 Rainbond 对于镜像的检测规范较为灵活，因此务必注意通过检测的镜像不一定能够正常的运行，比如上文提到的 Rainbond 不能运行的镜像类型。Rainbond 获取镜像成功会解析镜像的元数据获取创建组件所需的属性信息。

   > 如果希望可以批量添加环境变量，最好将其定义到镜像元数据中（即 Dockerfile 中定义）。Rainbond 识别时将自动从其中识别获取。

3. 应用检测通过后即可创建组件。

4. 构建完成后即可访问组件。后续的管理维护流程参阅 后续的管理维护流程参阅 [组件开发](../user-manual/component-dev/build_and_version/) [组件运维](../user-manual/component-op/basic-operation/)

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerconstruction.png" title="基于Docker镜像创建组件示意图" />

由 Docker 镜像创建的组件就完成了。如果从私有镜像仓库的镜像创建组件，需要注意下述几类问题：

- 私有仓库 Https 配置完善，可以直接拉取镜像。
- 如果私有仓库使用自签证书，Rainbond Chaos 组件所在节点需要配置私有仓库信任，参考运维文档。
- 如果镜像仓库是私有的，请提供正确的账号密码信息。

#### 示例部署带启动命令的镜像

- 通过 docker run 命令方式部署: `docker run -p 8490:8490 goodrain.me/test -s "ws://192.168.1.1:8490"`

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerrun.png" title="通过DockerRun命令提供更多参数示意图" />

- 通过指定镜像方式:
  - 镜像地址: `goodrain.me/test` 并构建
  - 应用构建源处修改启动命令为 `-s "ws://192.168.1.1:8490"`

`goodrain.me/test`请替换为自己镜像

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/modify.png" title="镜像启动命令后期更改示意图" />

### 从共享库安装

共享库中的应用模版（模型）是标准的 Rainbond 应用规范，从共享库安装过程只需要一键操作，找到要安装的应用，直接点击安装，选择需要安装到的应用即可。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/gongxiangku.png" title="从云端应用市场安装应用示意图" />

这样, 一个共享库安装的应用就完成了，从共享库安装将是应用交付的关键流程，共享库的应用支持一键安装和持续升级。
