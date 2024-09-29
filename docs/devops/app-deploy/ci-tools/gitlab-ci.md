---
title: GitLab CI 使用
description: 在 Rainbond 中使用 GitLab CI 部署应用
keywords:
- GitLab CI
- GitLab Runner
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=987870125&page=10" />

用过 GitLab 的同学肯定也对 GitLab CI/CD 不陌生，GitLab CI/CD 是一个内置在 GitLab 中的工具，它可以帮助我们在每次代码推送时运行一系列脚本来构建、测试和验证代码的更改以及部署。

Rainbond 本身默认集成了 CI/CD 的整套流程，用户只需提供源代码，后续构建、运行完全交给 Rainbond 处理，整个过程是由 Rainbond 定义的，无需用户干预。这样有利也有弊，利就是简化用户的操作和无需学习 CI/CD 相关知识；弊是用户无法在 CI/CD 过程中自定义，比如想集成代码检测或运行个脚本，这在 Rainbond 的源码构建流程中是不可自定义的。

本文给大家讲述如何使用 GitLab CI/CD 构建、测试、部署 Spring Boot 应用，将产物运行在 Rainbond 上。



## GitLab CI 介绍

使用 GitLab CI 需要在仓库根目录下创建 `.gitlab-ci.yml` 文件。在这个文件中，你可以定义需要运行的编译、测试、部署脚本。

在添加了 `.gitlab-ci.yml` 文件后，当推送代码时，GitLab Runner 自动执行你定义的 Pipeline，并在 GitLab CI 页面上展示 CI 过程以及结果。

GitLab CI 的基本流程如下：

1. 开发人员推送代码
2. 触发 GitLab CI 启动
3. runner 执行预定义脚本

![](https://static.goodrain.com/wechat/gitlabci/1.png)

## GitLab CI/CD 快速开始

### 部署 GitLab 和 Runner

通过开源应用商店一键部署 GitLab 和 Runner ，新增 -> 基于应用商店创建组件 -> 在开源应用商店中搜索 `GitLab` 依次安装 GitLab 和 Runner 到指定应用中。

![](https://static.goodrain.com/wechat/gitlabci/2.png)

### 在 Rainbond 上配置 Runner

在 Rainbond v5.8 版本之前，Rainbond 对 Runner 类型的组件支持的并不是很好。因为 Runner 若以容器的形式去运行的话，本身它需要去挂载宿主机的docker.sock 文件，使它可以调度宿主机的 docker 环境，创建容器执行任务。在 Rainbond v5.8 版本中，支持修改组件的 YAML，就可以自定义 Volumes 并挂载本地的 docker.sock。

在通过应用商店安装了 Runner 之后，可以在 Runner 组件内 -> 其他设置中看到 Kubernetes 属性，Rainbond 的应用模型已兼容了 Kubernetes 属性。

**注册 Runner 到 GitLab ：**

1. 进入编排模式，将 runner 连接到 GitLab 并更新 runner 组件。(如提示 GitLab 未开启对内端口，则选择 80 端口)

2. 首先访问 GitLab，Menu -> Admin -> Overview -> Runners -> Register an instance runner -> 复制 Registration token。

3. 进入 runner 组件内，点击右上角 web 终端进入，执行以下命令进行注册，`<token>` 换成上一步复制的 Registration token。

```shell
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://127.0.0.1" \
  --registration-token "NxNuoRXuzYy3GnFbkhtK" \
  --description "docker-runner" \
  --tag-list "newdocker" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-privileged="true" \
  --access-level="not_protected"
```

**参数说明**

| Parameter            | Value            | Describe                 |
| -------------------- | ---------------- | ------------------------ |
| --executor           | docker           | 执行器类型为docker。     |
| --url                | http://127.0.0.1 | GitLab addr              |
| --registration-token | `<token>`         | GitLab token             |
| --tag-list           | newdocker        | 定义runner的标签/名字    |
| --locked             | false            | runner为启用状态         |
| --run-untagged       | true             | 运行没有指定标签的Job    |
| --docker-volumes     | file_path        | 挂载文件到runner中       |
| --docker-privileged  | true             | runner运行模式：特权模式 |

4. 注册完成后就可以在 GitLab 页面中看到 online 的 runner

![](https://static.goodrain.com/wechat/gitlabci/3.png)



### GitLab CI/CD To Rainbond

![](https://static.goodrain.com/wechat/gitlabci/4.png)

整个流程可以分为：

1. 开发人员提交代码到GitLab仓库。
2. 触发GitLab 流水线创建，Runner 执行 `.gitlab-ci.yml` 定义的 stages。
3. 将制作好的镜像推送到已有的镜像仓库，供后续的Deploy流程使用。
4. 通过Rainbond自定义API的方法，触发平台组件的自动构建，进入Deploy阶段。

### 实践步骤

**前提：**

* 已有 Rainbond 环境
* 准备镜像仓库，本文使用的DockerHub
* 本文所使用到代码项目为 [Java-Maven-Demo](https://gitee.com/rainbond/java-maven-demo)

**1.在Rainbond上有已经基于镜像部署好的组件**

**2.将示例代码导入到 GitLab中。**

**3.编写 .gitlab-ci.yml 文件：**

在项目根目录下创建 `.gitlab-ci.yml` 内容如下:

```yaml
# 定义 job 的执行顺序
stages:
  - test
  - package
  - push
# 定义基础镜像
image: maven:3.6.3-jdk-8
job-test:
  stage: test
  tags: 
    - newdocker
  script:
    - echo "===============开始执行代码测试任务==============="
    - mvn test
job-package:
  stage: package
  tags: 
    - newdocker
  script:
    - echo "===============开始执行打包任务==============="
    - ls
    - mvn clean package
    - cp Dockerfile target/Dockerfile
  cache:
    key: devops
    paths:
      - target/ 
job-push:
  stage: push
  image: docker:dind
  cache:
    key: devops
    paths:
      - target/
  tags:
    - newdocker
  script:
    - docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
    - docker build -t ${IMAGE_DOMAIN}/java-maven:latest .
    - docker push ${IMAGE_DOMAIN}/java-maven:latest
  after_script:  
    - curl -d '{"secret_key":"${RAINBOND_SECRET}"}' -H "Content-type:application/json" -X POST http://${RAINBOND_IP}:7070/console/custom/deploy/3321861bcadf0789af71898f23e8e740
```

`after_script` 是在推送镜像完成后执行，通过 Rainbond API 构建组件，Rainbond 会获取最新镜像构建运行。\<RAINBOND_SECRET> 可在组件 -> 构建源 -> 自动构建中看到。详情可参阅文档 [配置组件自动构建部署](/docs/devops/continuous-deploy/auto-build)

**4.提交代码测试自动构建**，

修改代码并提交，提交后可在项目的 CI/CD -> Jobs 可以看到正在执行的以及执行完成的任务详情。

![](https://static.goodrain.com/wechat/gitlabci/5.png)

**5.查看 Rainbond 组件构建**

可以在组件的操作记录中看到自动构建信息。

![](https://static.goodrain.com/wechat/gitlabci/6.png)

