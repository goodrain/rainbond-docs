---
title: 对接Jenkins
summary: 以Jenkins为例，将传统应用部署到云帮
toc: true
asciicast: true
---

## 概述

如果您现在已经有了自己的CI工作流程，并且想在云帮中持续部署您的应用，那么本文将引导您将自己的应用部署到云帮并设置持续部署。考虑到Jenkins是目前主流的持续集成工具，并且它在源码测试和Pipline方面已经做得非常成熟，所以我提供了针对Jenkins的集成方案。

一般情况下，我们的源码在经Jenkins的构建和集成后，产出的应用不外乎以下几种格式：

- 可执行文件，这是最常见的格式，比如：Jar包、War包、二进制文件。
- 镜像，比如以Docker为代表的镜像格式。
- 源码，有时候Jenkins完成的工作可能是集成、测试或是打包等工作，最后的产出还是源码。

下面我们分别说明这三种格式如何部署到云帮。

## 镜像
云帮支持直接从镜像部署应用，请参考文档：[通过docker镜像创建应用](http://www.rainbond.com/docs/stable/user-manual/create-an-app.html#2-1-docker)。目前从镜像部署的应用不支持自动部暑功能，我们计划在以后的版本中支持。

## 源码
云帮支持直接从源码部署应用，请参考文档：[通过源码创建应用](http://www.rainbond.com/docs/stable/user-manual/create-an-app.html#part-28c173cde44e6408)，从源码部署的应用支持自动部署功能，开启此功能后，当您提交了新的代码后，云帮会自动下载代码并重新部署应用，有关自动部署的更多信息请参考[开启自动部署功能](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/basic-operation/manage/ci-cd.md)。

## 可执行文件
相信这是我们最常用的打包方式了，我们以Java应用为例，通常运行一个Java应用需要依赖一些外部资源，比如：Java运行时、应用配置文件、依赖包或是Tomcat这样的服务，这时我们推荐使用Dockerfile来定义应用的运行方式和运行环境，请参[MySQL应用](https://github.com/goodrain-apps/mysql/tree/master/5.7)，定义好以后就可以通过源码的方式来部署应用，并且可以支持自定部署，有关自动部署的更多信息请参考[开启自动部署功能](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/basic-operation/manage/ci-cd.md)。

## 构建自己的持续部署流程
在云帮的应用市场中有丰富的应用可以安装使用，您可以使用这些应用构建自己的工作流。

1. 在云帮中安装Gitlab和Jenkins
1. 创建一个项目并上传到Gitlab
1. 创建一个包含Dockerfile的项目用来定义应用的运行环境（建议与上一步骤中的项目合并为一个项目），并1. 上传到Gitlab，然后在云帮中通过源码的方式部署该应用。
1. 在Jenkins中生成一个触发构建的API，将该API添加到Gitlab中，使Gitlab每次收到push的代码后调此API。
1. 在云帮中生成触发部署的API，将该API添加到Jenkins中，使Jenkins每次构建完成后调用该API。

