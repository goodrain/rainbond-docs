---
title: 对接外部CI工具
summary: 以Jenkins为例，将传统应用部署到云帮
toc: false
asciicast: true
---

<div id="toc"></div>

# 对接外部CI工具

## 场景
对于一个传统应用，完整的CI过程会包括：设计、编码、打包、测试、Release，已有的CI产品中已经在源码测试和Pipline方面做得非常成熟，例如Jenkins、Gitlab等，本文就以Jenkins为例，介绍传统应用怎样部署在云帮平台上并实现持续部署。

一般情况下，我们的源码在经Jenkins的构建和集成后，产出的应用不外乎以下几种格式：
1. 可执行文件，这是最常见的格式，比如：Jar包、War包、二进制文件。
1. 镜像，比如以Docker为代表的镜像格式。
1. 源码，有时候Jenkins完成的工作可能是集成、测试或是打包等工作，最后的产出还是源码。

这三种格式都可以部署到云帮平台，下面我们对这三种格式分别说明。

## 镜像
云帮支持直接从镜像部署应用，请参考文档：[通过docker镜像创建应用](http://www.rainbond.com/docs/stable/user-manual/create-an-app.html#2-1-docker)。

## 源码
云帮支持直接从源码部署应用，请参考文档：[通过源码创建应用](http://www.rainbond.com/docs/stable/user-manual/create-an-app.html#part-28c173cde44e6408)。

## 可执行文件
相信这是我们最常用的打包方式了，我们以Java应用为例，通常运行一个Java应用需要依赖一些外部资源，比如：Java运行时、应用配置文件、依赖包或是Tomcat这样的服务，这时我们推荐您将应用打包为Docker镜像，因为这种方式可以将您的Java应用和所有依赖的资源全部打包在一起。

### 准备
假设现在有一个名为`web-app.war`的Java应用，它依赖java7、Tomcat和一个配置文件`/etc/web-app.conf`，下面我们来编写一个[Dockerfile](https://docs.docker.com/engine/reference/builder/)以便生成镜像。

### 创建项目
创建一个项目，该项目包含应用包`web-app.war`、配置文件`default.conf`和镜像源码文件`Dockerfile`：
```
tree .
.
└── web-app.war
├── default.conf
└── Dockerfile
```

### 编写Dockerfile
Dockerfile的内容如下：
```
FROM tomcat:7.0.88-jre7

COPY web-app.war /usr/local/tomcat/webapps/
COPY default.conf /etc/web-app.conf

CMD ["catalina.sh", "run"]
```
说明：
`FROM`指基础镜像，`tomcat:7.0.88-jre7`是一个已存在的镜像，它包含了Java7和Tomcat7.0.88，可以在[Docker官方仓库](https://hub.docker.com/_/tomcat/)中找到它。
`COPY`指命的作用是将指定文件复制到tomcat镜像中。
`CMD`指要执行的命令，`catalina.sh`是tomcat镜像中的一个启动脚本。
关于Dockerfile的更多信息请看Docker[官方文档](https://docs.docker.com/engine/reference/builder/)。

### 上传代码
将该目项上传到代码仓库，如Github、Gitlab等。

### 部署到云帮
然后就可以通过源码方式在云帮上创建应用，请参考文档：[通过Dockerfile源码创建应用](http://www.rainbond.com/docs/stable/user-manual/create-an-app.html#1-2-dockerfile)，云帮会自动识别项目中的Dockerfile来构建镜像。

## 持续部署
目前云帮已经支持了基于源码创建的自动部署，基于镜像创建的应用将在未来的版本中支持。

要使用自动部署功能，请先为应用[开启自动部署功能](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/basic-operation/manage/ci-cd.md)，当您再次上传代码到仓库中时，云帮将自动拉取代码并重新构建应用。
