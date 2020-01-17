---
Title: "Jenkins与Rainbond对接部署应用"
Hidden: true
Description: "Rainbond对接Jenkins基于Git仓库与镜像构建的服务进行自动CI、CD实践"
Weight: 22001
---

### 概述

如果您现在已经有了自己的CI工作流程，并且想在云帮中持续部署您的应用，那么本文将引导您将自己的应用部署到云帮并设置持续部署。考虑到Jenkins是目前主流的持续集成工具，并且它在源码测试和Pipline方面已经做得非常成熟，所以我们提供了针对Jenkins的集成方案。一般情况下，我们的源码在经Jenkins的构建和集成后，产出的应用可能是源码格式或镜像。
Rainbond支持[应用持续部署](/docs/user-manual/app-service-manage/auto-deploy/)，下面我们来分别说明一下jenkins与rainbond对接如何把源码和镜像格式应用部署到云帮。

### 构建自己的持续部署流程

在云帮的应用市场中有丰富的应用可以安装使用，您可以使用这些应用构建自己的工作流。我们使用GitLab或GitHub开源代码仓库，Jenkins集成工具与Rainbond对接实现CI、CD。

### 源码

我们以Spring Boot demo为例，https://github.com/ITboy6/spring-boot-mysql-demo  对接的点是jenkins进行代码检测（可使用Sonar插件来实现），构建完之后把打包好的jar包和所需文件放在target目录下，rainbond构建时只需要拉target一个目录，进行源码自动部署。

#### 1. Jenkins配置

* Jenkins安装所需插件：系统管理 --> 插件管理 --> 安装需要用到的相关插件

* Jenkins配置测试工程: 新建任务

![ym1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_1.png)

![ym2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_2.png)

![ym3](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_3.png)

![ym4](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_4.png)

![ym5](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_5.png)

这一步是把所需文件及打包好的jar包都放到target目录下，并push到代码仓库。使用API触发rainbond自动构建。

#### 2.Rainbond配置

* 需要有一个创建好的源码应用

* 如何使用API触发自动构建

通过开启API自动构建返回的url，POST方法调用API，携带秘钥即可触发API自动构建，秘钥可以自定义设置。

![ym6](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_6.png)

![ym7](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/ym_7.png)

API使用：

```
curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

在Jenkins构建流程中添加即可

### 镜像

* Jenkins构建完成后，会产出镜像并且会push到DockerHub

* 在云帮中创建一个镜像格式应用

* 在云帮中生成触发镜像仓库的Webhook，将该webhook添加到DockerHub中，使DockerHuab每次更新镜像完成后调用该API

![rainbond1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_1.png)

![rainbond2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_2.png)
