---
Title: "Jenkins与Rainbond对接部署镜像应用"
Hidden: true
Description: "Rainbond对接Jenkins基于Git仓库与镜像构建的服务进行自动CI、CD实践"
Weight: 22001
---

### 概述

如果您现在已经有了自己的CI工作流程，并且想在云帮中持续部署您的应用，那么本文将引导您将自己的应用部署到云帮并设置持续部署。考虑到Jenkins是目前主流的持续集成工具，并且它在源码测试和Pipline方面已经做得非常成熟，所以我们提供了针对Jenkins的集成方案。一般情况下，我们的源码在经Jenkins的构建和集成后，产出的应用可能是源码格式或镜像。
Rainbond支持[应用持续部署](https://www.rainbond.com/docs/user-manual/app-service-manage/auto-deploy/)，下面我们来说明一下jenkins与rainbond对接如何把镜像格式应用部署到云帮。

### 构建自己的持续部署流程

在云帮的应用市场中有丰富的应用可以安装使用，您可以使用这些应用构建自己的工作流。我们使用GitLab开源代码仓库，Jenkins集成工具与Rainbond对接实现CI、CD。

### 配置操作方式：

#### 1.安装应用

* GitLab可直接从应用市场中安装，应用市场中提供的是v11.8.2版本
[//]: ![gitlab](./install_gitlab.png)
![gitlab](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/install_gitlab.png)

* Jenkins我们使用DockerRun命令安装官方提供的最新版
```
docker run -p 8080:8080 -p 50000:50000 \
	   -v /your/home:/var/jenkins_home jenkins/jenkins
```

#### 2.配置GitLab

* 创建一个包含Dockerfile文件的项目并push到GitLab

* 生成一个Personal Access Tokens

![gitlab1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_1.png)

![gitlab2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_2.png)

 
#### 3.配置Jenkins

* 安装所需插件：系统管理 --> 插件管理 --> 安装gitlab及docker相关插件

![jenkins0](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_0.png)

* 添加api token：首页 --> 凭据 --> 添加凭据

![jenkins1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_1.png)

* 配置GitLab：系统管理 --> 系统设置

![jenkins2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_2.png)

* 创建jenkins测试工程：新建任务

![jenkins3](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_3.png)

![jenkins4](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_4.png)

![jenkins5](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_5.png)

![jenkins6](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/jenkins_6.png)

##### 点击保存

* 在GitLab中添加jenkins生成的webhook

![gitlab3](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_3.png)

![gitlab4](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_4.png)

* 测试连接是否生效

![gitlab5](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_5.png)

测试成功，返回200。到此，触发器配置成功，开发一旦有提交代码，Jenkins就会自动构建

![gitlab6](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_6.png)


> PS 遇到的问题：gitLab上添加webhook保存，报错Requests to localhost are not allowed
解决方案：需要使用管理员帐号登录，进入Admin area，在Admin area中，在settings标签下面，找到Network里的OutBound Request，勾选上Allow requests to the local network from hooks and services ，保存更改即可解决问题

![gitlab7](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/gitlab_7.png)


### 4.docker制作镜像配置

* Jenkins是在容器里运行，因为运行jenkins的容器里没有docker，所以我们需要调远程主机的docker API，我们来调Rainbond管理节点上的docker，具体操作如下：

```
vim /usr/lib/systemd/system/docker.service
```
![docker1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/docker_1.png)

> PS 端口号只要不跟系统冲突，任意端口都行，我们这里使用2375；修改完后执行以下两条命令使配置生效：

```
systemctl daemon-reload
systemctl restart docker
```

* Jenkins里配置Docker：

![docker2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/docker_2.png)

* 构建镜像配置

![docker3](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/docker_3.png)

![docker4](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/docker_4.png)

#### 5.配置DockerHub和Rainbond

* 在云帮中创建一个镜像格式应用

* 在云帮中生成触发镜像部署的API，将该API添加到DockerHub中，使DockerHuab每次更新镜像完成后调用该API

![rainbond1](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_1.png)

![rainbond2](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/devops/JenkinsandRainbond/rainbond_2.png)

