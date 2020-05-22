---
Title: 'Jenkins与Rainbond对接部署应用'
Hidden: true
Description: 'Rainbond对接Jenkins基于Git仓库与镜像构建的服务进行自动CI、CD实践'
Weight: 22001
---

### 概述

如果您现在已经有了自己的 CI 工作流程，并且想在云帮中持续部署您的应用，那么本文将引导您将自己的应用部署到云帮并设置持续部署。考虑到 Jenkins 是目前主流的持续集成工具，并且它在源码测试和 Pipline 方面已经做得非常成熟，所以我们提供了针对 Jenkins 的集成方案。一般情况下，我们的源码在经 Jenkins 的构建和集成后，产出的应用可能是源码格式或镜像。
Rainbond 支持[应用持续部署](/docs/user-manual/component-op/auto-deploy/)，下面我们来分别说明一下 jenkins 与 rainbond 对接如何把源码和镜像格式应用部署到云帮。

### 构建自己的持续部署流程

在云帮的应用市场中有丰富的应用可以安装使用，您可以使用这些应用构建自己的工作流。我们使用 GitLab 或 GitHub 开源代码仓库，Jenkins 集成工具与 Rainbond 对接实现 CI、CD。

### 源码

我们以[Spring Boot demo](https://github.com/goodrain-apps/spring-boot-mysql-demo.git)为例，对接的点是 jenkins 进行代码检测（可使用 Sonar 插件来实现），构建完之后把打包好的 jar 包和所需文件放在 target 目录下，rainbond 构建时只需要拉 target 一个目录，进行源码自动部署。

#### 1. Jenkins 配置

- Jenkins 安装所需插件：系统管理 --> 插件管理 --> 安装需要用到的相关插件

- Jenkins 配置测试工程: 新建任务

![ym1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_1.png)

![ym2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_2.png)

![ym3](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_3.png)

![ym4](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_4.png)

![ym5](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_5.png)

这一步是把所需文件及打包好的 jar 包都放到 target 目录下，并 push 到代码仓库。使用 API 触发 rainbond 自动构建。

#### 2.Rainbond 配置

- 需要有一个创建好的源码应用

- 如何使用 API 触发自动构建

通过开启 API 自动构建返回的 url，POST 方法调用 API，携带秘钥即可触发 API 自动构建，秘钥可以自定义设置。

![ym6](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_6.png)

![ym7](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_7.png)

API 使用：

```
curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

在 Jenkins 构建流程中添加即可

### 镜像

- Jenkins 构建完成后，会产出镜像并且会 push 到 DockerHub

- 在云帮中创建一个镜像格式应用

- 在云帮中生成触发镜像仓库的 Webhook，将该 webhook 添加到 DockerHub 中，使 DockerHuab 每次更新镜像完成后调用该 API

![rainbond1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_1.png)

![rainbond2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_2.png)
