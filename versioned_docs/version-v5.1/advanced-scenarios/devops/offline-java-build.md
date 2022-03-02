---
title: "离线环境下的Java源码构建"
Description: "Rainbond离线环境下的Java源码构建的基础环境搭建"
---

### 概述

在交付了很多企业级用户后，我们发现很多用户的环境都是离线的。我们一直在探索离线环境下实现源码构建的方案，以期让这些企业用户可以也可以体验到Rainbond源码构建功能带来的便捷。

那么，在离线环境下，实现源码构建会有哪些难点呢？其实这个问题的答案就是整套源码构建流程中有那些点对于互联网有依赖：

\-  代码仓库：源码构建过程的起点是一个可用的代码仓库，离线环境下我们不可以使用 Github、Gitee 等基于互联网的代码仓库。Gitlab、Gogs 等私有代码仓库成为了最佳选择。有些用户已经拥有了自己的私有代码仓库，这种情况下，保证Rainbond管理节点所在的服务器可以正常访问到该代码仓库即可；而对于还没有搭建自己的私有代码仓库的用户而言，如何快速搭建一个Gitlab或者Gogs就是离线源码构建需要攻克的第一关。

\-  构建私服：构建私服是指在源码构建过程中，获取依赖包的仓库，常见的有 Nexus、Artifactory 等。有些用户已经拥有了自己的私有构建私服用以管理自己的依赖包，这种情况下，我们提供方案让 Rainbond 可以直接对接私服；而对于还没有搭建自己的构建私服的用户而言，Rainbond自带的 rbd-repo 组件可以作为本地仓库使用。

\-  应用运行时：应用运行时是指服务运行所依赖的环境，比如对于Java应用而言，运行时就是环境中安装的 Jdk。对于用户而言，离线环境如何配置好应用运行时是离线源码构建最大的挑战。

在明确了上述难点后，接下来的文章，会以Java应用构建为例，指引用户一步步攻克这些难关，最终达成离线源码构建的目标。

### 离线部署代码仓库

在离线环境下，推荐使用平台的应用离线导入功能，快速导入 Gitlab 应用并安装使用。

需要事先获取离线资源：[Gitlab应用包](http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/offline/resource/GitLab-9.2.5.zip)  [Gogs应用包](http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/offline/resource/gogs-0.9.141.zip)

\- 访问Rainbond应用管理平台，并导入离线应用包

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/load-app.gif" width="100%" />

>  Gogs离线导入方式和Gitlab一致。

至此，我们已经拥有了一个私有化的代码仓库。可以通过它来托管代码，并可以通过它实现[自动构建](../../user-manual/app-service-manage/auto-deploy/)。

### 离线对接/部署构建私服

Java源码基于Maven构建过程中，会根据 `pom.xml` 文件解析依赖关系，并前往指定的构建私服拉取依赖包。而在Rainbond中，安装了默认的源码构建包仓库 `rbd-repo` ，这个组件既可以作为已有私服的代理，也可以用来搭建本地私服，来应对不同用户的需求。

\- [已有私服的对接](./connection-maven-repository/)

\- [搭建本地仓库，并导入jar包](./connection-maven-repository/#使用云帮内置的maven仓库)

### 离线配置应用运行时

本节提供一个在应用中离线安装运行时（Jdk）的方案，这个方案会运行起一个私服仓库服务，这个私服仓库可以负责安装java运行所需要的Jdk环境。

- 有网环境下载离线资源镜像

```bash
docker pull rainbond/buildpack:java-v5.1.5
docker save rainbond/buildpack:java-v5.1.5 > rainbond-buildpack-java-v5.1.5.tgz
```

- 导入镜像

将保存下来的镜像压缩文件放到首个管理节点上，然后导入镜像：

```bash
docker load -i rainbond-buildpack-java-v5.1.5.tgz
docker tag rainbond/buildpack:java-v5.1.5 goodrain.me/buildpack:java-v5.1.5
docker push goodrain.me/buildpack:java-v5.1.5
```

- 运行私服仓库服务

编辑配置文件，将该服务运行起来。

```bash
vi /opt/rainbond/conf/base.yaml
```

在最下面一行添加如下段落

```bash
- name: rbd-java-buildpack
  endpoints:
  - name: BUILDPACK_ENDPOINTS
    protocol:
    port: 2017
  health:
    name: rbd-java-buildpack
    model: http
    address: 127.0.0.1:2017/lang/
    max_errors_num: 3
    time_interval: 30
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-java-buildpack
  start: >-
    docker run --name rbd-java-buildpack
    --network host
    -i goodrain.me/buildpack:java-v5.1.5
  stop: docker stop rbd-java-buildpack
  restart_policy: always
```

启动服务

```bash
node service update
```

验证服务是否运行

```bash
grctl cluster
```

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/java-build-pack.png" width="100%" />

- 对接rbd-repo并修改远程仓库

> 所有节点rbd-repo都需要调整


修改远程仓库 `pkg_lang` 对应URL为 `http://<首个管理节点IP>:2017/lang/`

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/docking-rbd-repo.gif" width="100%" />

至此，离线环境下的Java源码构建环境就配置完成了。