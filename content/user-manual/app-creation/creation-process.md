---
title: 服务创建流程
description: Rainbond服务创建流程
toc: true
weight: 3102
---

本节内容就上文提到的三种创建方式在Rainbond平台上如何操作提供指南。

## 1. 从源码创建

下面将会以 HTML 源码创建服务为例, 介绍并演示在 Rainbond 上用源码创建服务.

### 1.1 HTML 源码创建服务

> 源码地址: https://github.com/goodrain/static-demo.git

Step 1: 点击 **创建应用** -> **从源码创建**

Step 2: 输入 **应用名称, 服务组件名称, 仓库地址, 代码分支**等信息. 确认信息后, 点击 **新建应用**.

Step 3: 应用检测通过后, 点击 **构建应用**.

Step 4: 构建完成后, 点击 **访问**, 验证应用是否创建成功.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/HTML%E6%BA%90%E7%A0%81%E5%88%9B%E5%BB%BA.gif" width="100%" />

这样, 一个由HTML源码创建的应用就完成了.

### 1.2 其他语言源码创建服务

- <a href="../language-support/java/" target="_blank">Java源码创建服务</a>
- <a href="../language-support/php/" target="_blank">PHP源码创建服务</a>
- <a href="../language-support/python/" target="_blank">Python源码创建服务</a>
- <a href="../language-support/nodejs/" target="_blank">Node.js源码创建服务</a>
- <a href="../language-support/golang/" target="_blank">Golang源码创建服务</a>
- <a href="../language-support/netcore/" target="_blank">.Net源码创建服务</a>
- <a href="../language-support/html/" target="_blank">Html静态源码创建服务</a>
- <a href="../language-support/dockerfile/" target="_blank">Dockerfile源码创建服务</a>

### 1.3 Git 和 SVN 的使用
在创建应用时，根据代码仓库的类型选择 Git 或 SVN, 并正确填写该应用的代码仓库地址以及要使用的代码`分支`或 `tag`. Git的默认分支是 `master`, SVN 的默认 tag 是 `trunk`.

#### 1.3.1 账号密码连接代码仓库

如果需要用账号密码连接代码仓库, 则点击填写仓库账号密码, 正确填写你的登陆用户名及密码即可.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/password_login.jpg" width="100%" />

#### 1.3.2 SSH 连接代码仓库

如果需要用 SSH 秘钥连接代码仓库, 则点击下方的配置授权 Key, 会为你生成一段秘钥, 然后把这段秘钥添加到你代码仓库的部署秘钥中.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/ssh_login.jpg" width="100%" />

## 2. 从 Docker 镜像创建

下面将会以 Nginx 的官方镜像为例, 介绍并演示在 Rainbond 上用 Docker 镜像创建应用.

Step 1: 点击 **创建应用** -> **从 Docker 镜像创建**

Step 2: 输入 **应用名称, 服务组件名称, 镜像地址**等信息. 确认信息后, 点击 **新建应用**.

Step 3: 应用检测通过后, 点击 **构建应用**.

Step 4: 构建完成后, 点击 **访问**,  验证应用是否创建成功.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/%E9%95%9C%E5%83%8F%E5%88%9B%E5%BB%BA.gif" width="100%" />

这样, 一个由 Docker 镜像创建的服务就完成了。如果从私有镜像仓库的镜像创建服务，需要注意下述几类问题：

1. 私有仓库Https配置完善，可以直接拉取镜像。
2. 如果私有仓库使用自签证书，Rainbond管理节点需要配置私有仓库信任，参考运维文档。
3. 如果镜像仓库是私有的，请提供正确的账号密码信息。

## 3. 从应用市场安装

下面将会以应用市场上的2048为例, 介绍并演示在 Rainbond , 从应用市场安装应用.

Step 1: 点击 **创建应用** -> **从应用市场安装**

Step 2: 找到2048这个应用, 点击**安装**

Step 3: 安装完成后, 点击 **访问**,  验证应用是否创建成功.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/%E5%BA%94%E7%94%A8%E5%B8%82%E5%9C%BA%E5%AE%89%E8%A3%85.gif" width="100%" />

这样, 一个从应用市场安装的应用就完成了。从应用市场安装将是应用交付的关键流程，应用市场的应用支持一键安装和持续升级。