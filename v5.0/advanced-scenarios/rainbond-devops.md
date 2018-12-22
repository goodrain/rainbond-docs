---
title: 基于Rainbond做DevOps
summary: 基于Rainbond做DevOps
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、 概述

`Rainbond`是可以作为一套DevOps工具来使用的。

对于多数场景而言，DevOps意味着一套可靠的CI/CD流程，以及与代码业务相关的一整套运维工具链。

`Rainbond`对于CI/CD有着自己一套独特的实现机制，归结起来，就是一键 `构建` ，简单易用。

对于与DevOps相关的一系列工具软件，`Rainbond`则将其均视作应用、插件来处理。

## 二、 CI/CD

CI/CD（持续集成/持续部署），是要求在程序员不断提交更新代码后，平台实现拉取代码、构建、部署实现的全流程。这个过程越简单、越自动化，则视为CI/CD程度越高。

- CI： CI过程的实现，要借助于具备版本控制功能的代码仓库软件（如GitLab）。`Rainbond`除了可以直接[对接用户环境中已存在的代码仓库](/docs/dev/best-practice/ci-cd/connection-git-server.html)，也可以从应用市场一键安装 [GitLab](https://about.gitlab.com/) [Gogs](https://gogs.io/) 两款开源代码仓库。
- CD：在程序员提交更新代码后，通过平台提供的 [构建](/docs/dev/user-manual/app-manage/service-manage/basic-operation.html#1-1) 功能，可以实现拉取最新源代码，通过[rbd-chaos](http://localhost:4000/docs/dev/user-manual/architecture/architecture.html#chaos-ci)调用[builder](https://github.com/goodrain/builder)进行构建，上线服务。这个过程可以在配置了[自动部署](/docs/dev/user-manual/app-manage/service-manage/other-set.html#1-2)后更加简化。

## 三、工具链

- 代码检测

`Rainbond` 支持由应用市场安装代码检测应用 [SonarQube](/docs/dev/best-practice/apps/sonarqube.html)。

- APM

对于Java语言编写的程序，`Rainbond` 支持由应用市场安装APM工具 [PinPoint](http://localhost:4000/docs/dev/best-practice/apps/pinpoint.html)。

- 日志对接

`Rainbond`支持日志对接插件 [ELK-Beats](/docs/dev/microservice/service-mesh/service-log.html)。

- 应用实时性能分析。

`Rainbond` 支持对应用的流量进行实时性能分析与监控。

- [对接Maven仓库](/docs/dev/best-practice/ci-cd/connection-maven-repository.html)
