---
title: 组件创建流程
description: Rainbond组件创建流程指南
toc: true
weight: 3102
---

本节内容就上文提到的三种创建方式在Rainbond平台上如何操作提供指南。

#### 从源码创建

下面将会以Java源码创建组件为例, 介绍在Rainbond上用源码创建组件流程。

> 源码地址: https://github.com/goodrain/java-maven-demo.git

组件的创建目前有两个入口，分别是左部导航的创建应用入口和应用管理的添加组件入口，创建流程一致。

* Step 1: 提供组件名称和所属应用，最关键的是提供构建源信息，源码构建即提供代码仓库地址，授权等信息。

* Step 2: 等待Rainbond对源代码进行检测，这个过程Rainbond将根据代码源信息获取源代码并进行语言类型、语言规范等检测，并从[rainbondfile](/user-manual/app-creation/language-support/etc/rainbondfile/)文件中读取组件属性。

* Step 3: 如果检测结果通过即会根据检测回的组件属性创建组件，如果不通过用户需要根据提示更改相关信息。

* Step 4: 检测完成后用户可以选择构建启动或进行高级设置，设置更多组件属性。若选择构建启动Rainbond将再次获取源代码根据代码检测的语言类型进行源码构建。请注意，源码类型只会在源码检测中读取，因此后续的开发过程如果更改了语言类型，需要触发重新代码检测。
* Step 5: 组件构建完成后即可通过端口绑定的默认域名进行访问。后续的管理维护流程参阅 [组件管理文档](/user-manual/app-service-manage/)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/HTML%E6%BA%90%E7%A0%81%E5%88%9B%E5%BB%BA.gif" width="100%" />


##### 其他语言源码支持参阅下述文档

- <a href="../language-support/java/" target="_blank">Java源码创建组件</a>
- <a href="../language-support/php/" target="_blank">PHP源码创建组件</a>
- <a href="../language-support/python/" target="_blank">Python源码创建组件</a>
- <a href="../language-support/nodejs/" target="_blank">Node.js源码创建组件</a>
- <a href="../language-support/golang/" target="_blank">Golang源码创建组件</a>
- <a href="../language-support/netcore/" target="_blank">.Net源码创建组件</a>
- <a href="../language-support/html/" target="_blank">Html静态源码创建组件</a>
- <a href="../language-support/dockerfile/" target="_blank">Dockerfile源码创建组件</a>

##### Git 和 SVN 的使用
在创建组件时，根据代码仓库的类型选择 Git 或 SVN, 并正确填写该应用的代码仓库地址以及要使用的代码`分支`或 `tag`. Git的默认分支是 `master`, SVN 的默认 tag 是 `trunk`.

* 账号密码连接代码仓库

如果需要用账号密码连接代码仓库, 则点击填写仓库账号密码, 正确填写你的登陆用户名及密码即可.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/password_login.jpg" width="100%" />

* SSH 连接代码仓库

如果需要用 SSH 秘钥连接代码仓库, 则点击下方的配置授权 Key, 会为你生成一段秘钥, 然后把这段秘钥添加到你代码仓库的部署秘钥中.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/ssh_login.jpg" width="100%" />

#### 从Docker镜像创建

下面将会以Nginx的官方镜像为例, 介绍并演示在Rainbond上用Docker镜像创建组件的过程。
与源码创建流程一样，不同的是提供的构建源信息和类型不同，流程如下：

* Step 1: 提供组件名称和所属应用，最关键的是提供构建源信息，镜像构建即提供镜像名称和授权信息。

* Step 2: Rainbond将根据提供的镜像信息获取镜像，Rainbond能够获取到指定的镜像是创建成功的基础。目前Rainbond对于镜像的检测规范较为灵活，因此务必注意通过检测的镜像不一定能够正常的运行，比如上文提到的Rainbond不能运行的镜像类型。Rainbond获取镜像成功会解析镜像的元数据获取创建组件所需的属性信息。

* Step 3: 应用检测通过后即可创建组件。

* Step 4: 构建完成后即可访问组件。后续的管理维护流程参阅 [组件管理文档](/user-manual/app-service-manage/)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/%E9%95%9C%E5%83%8F%E5%88%9B%E5%BB%BA.gif" width="100%" />

这样, 一个由 Docker 镜像创建的组件就完成了。如果从私有镜像仓库的镜像创建组件，需要注意下述几类问题：

1. 私有仓库Https配置完善，可以直接拉取镜像。
2. 如果私有仓库使用自签证书，Rainbond管理节点需要配置私有仓库信任，参考运维文档。
3. 如果镜像仓库是私有的，请提供正确的账号密码信息。

##### 示例部署带启动命令的镜像应用

* 通过docker run命令方式部署:  `docker run -p 8490:8490 goodrain.me/test -s "ws://192.168.1.1:8490"`
* 通过指定镜像方式:
    * 镜像地址: `goodrain.me/test` 并构建
    * 应用构建源处修改启动命令为 `-s "ws://192.168.1.1:8490"`

{{% notice info %}}
`goodrain.me/test`请替换为自己镜像
{{% /notice %}}

#### 从应用市场安装

从应用市场安装过程非常简单，只需要提供需要安装到的应用即可。
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/%E5%BA%94%E7%94%A8%E5%B8%82%E5%9C%BA%E5%AE%89%E8%A3%85.gif" width="100%" />

这样, 一个从应用市场安装的应用就完成了。从应用市场安装将是应用交付的关键流程，应用市场的应用支持一键安装和持续升级。