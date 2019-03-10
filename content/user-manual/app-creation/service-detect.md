---
title: 服务构建源检测
description: Rainbond服务构建源的检测方式和标准文档
toc: true
---

通过程序源码、Dockerfile源码或Docker镜像创建应用时，平台会进行自动检测，看是否符合平台创建应用的标准。本文会针对各种类型的应用来说明平台自动检查的方法及标准。


## 一、通过程序源代码创建应用

不同开发语言的源代码，其检查标准是不一样的，以下列出了平台支持的源代码构建语言的检测标准：

- [Java源码检测标准](language-support/java.html#part-db8881a8c8748f64)
- [PHP源码检测标准](language-support/php.html#part-db8881a8c8748f64)
- [Ruby源码检测标准](language-support/ruby.html#part-db8881a8c8748f64)
- [Python源码检测标准](language-support/python.html#part-db8881a8c8748f64)
- [Golang源码检测标准](language-support/golang.html#part-db8881a8c8748f64)
- [Node.JS源码检查标准](language-support/nodejs.html#part-db8881a8c8748f64)
- [HTML静态源码检查标准](language-support/html.html)
- [Node.js前端项目检测标准](language-support/nodejs2html.html)

{{% notice info %}}

- 目前rainbond不支持多种语言混合部署的应用，也就是说一个通过源代码创建的应用只能使用一种开发语言。

{{% /notice %}}

## 二、通过Dockerfile源码创建应用

当通过Dockerfile创建应用时，平台还是通过将Dockerfile和相关的文件放到代码仓库中的方式来创建应用，构建程序会检查代码仓库的根目录中是否包含Dockerfile，如果包含该文件，就会调用 `docker build` 命令构建镜像。

{{% notice info %}}

- 当代码仓库中同时包含开发语言源码标识文件（如：java的pom.xml）和Dockerfile文件时，平台优先识别为Dockerfile方式构建应用，Dockerfile检测的优先级最高。
{{% /notice %}}

## 三、通过Docker镜像创建应用

当通过Docker镜像、Docker run或Docker compose的方式创建应用时，平台构建程序会拉取完整的镜像，并进行解析。当无法拉取镜像（网络问题、镜像不存在、仓库需要认证）时会提示如下信息：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/app-detect-docker.png" width="80%" />

这时，你需要检查填写的Docker镜像的地址或者docker run命令是否正确，如果是需要登录的镜像仓库，请先在所有管理节点通过`Docker login` 命令登录私有仓库。