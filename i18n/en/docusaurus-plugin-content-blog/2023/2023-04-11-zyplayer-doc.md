---
title: 在 Rainbond 上使用在线知识库系统zyplayer-doc
description: zyplayer-doc 是一款适合企业和个人使用的WIKI知识库管理工具，提供在线化的知识库管理功能，专为私有化部署而设计，最大程度上保证企业或个人的数据安全
slug: zyplayer-doc
image: https://static.goodrain.com/wechat/zyplayer-doc/zyplayer-doc.png
---

[zyplayer-doc](http://doc.zyplayer.com/doc-wiki#/integrate/zyplayer-doc) 是一款适合企业和个人使用的WIKI知识库管理工具，提供在线化的知识库管理功能，专为私有化部署而设计，最大程度上保证企业或个人的数据安全，可以完全以内网的方式来部署使用它。

当然也可以将其作为企业产品的说明文档来使用，支持一键将整个空间的内容开放到互联网，并提供有不同风格的开放文档页样式可供选择，省去您为了产品的说明文档而去定制开发一个系统的成本。

本文将介绍通过 Rainbond 部署在线知识库系统 zyplayer-doc 的两种方式，使用 Rainbond 开源应用商店一键部署和通过源代码部署。

## 部署 zyplayer-doc

### 安装 Rainbond

[Rainbond](https://www.rainbond.com/) 是一个云原生应用管理平台，使用简单，不需要懂容器、Kubernetes和底层复杂技术，支持管理多个Kubernetes集群，和管理企业应用全生命周期。主要功能包括应用开发环境、应用市场、微服务架构、应用交付、应用运维、应用级多云管理等。

可通过一条命令快速安装 Rainbond。

```bash
curl -o install.sh https://get.rainbond.com && bash ./install.sh
```

### 通过应用商店部署 zyplayer-doc

`zyplayer-doc` 已经发布到 Rainbond 开源应用商店，用户可通过开源应用商店一键安装 `zyplayer-doc`。

在 Rainbond 的 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `zyplayer-doc` 并安装。

![](https://static.goodrain.com/wechat/zyplayer-doc/1.png)

部署完成后拓扑图如下。

![](https://static.goodrain.com/wechat/zyplayer-doc/2.png)

可通过 Rainbond 默认提供的域名访问 `zyplayer-doc`，访问需要加后缀 `/zyplayer-doc/`，如：`http://xxx.cn/zyplayer-doc/`，默认用户密码 **zyplayer/123456**。

![](https://static.goodrain.com/wechat/zyplayer-doc/3.png)

### 通过源码部署 zyplayer-doc

zyplayer-doc 是由 Java 编写的 SpringBoot 项目，Rainbond 对于 Java 项目可以通过识别项目的 pom.xml 文件来进行模块的打包以及构建和部署，实现一键式体验。

#### 部署 MySQL

zyplayer-doc 需要使用 MySQL 服务，可以通过 Rainbond 开源应用商店快速部署 MySQL。

在 Rainbond 的 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `mysql` 并安装，可选择安装 `5.7` 或 `8.0` 版本。

![](https://static.goodrain.com/wechat/zyplayer-doc/4.png)

#### 源码部署 zyplayer-doc

修改 `zyplayer-doc-manage/src/main/resources/application.yml`配置文件，连接信息可在 MySQL 组件中的依赖信息查看。

```yaml
zyplayer:
  doc:
    manage:
      datasource:
        driverClassName: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&autoReconnect=true&useSSL=false
        username: ${MYSQL_USER}
        password: ${MYSQL_PASSWORD}
```

进入到团队/应用内，选择通过源码创建组件。

- 组件名称、组件英文名称均自定义即可。
- 仓库地址：https://gitee.com/dromara/zyplayer-doc
- 代码分支：master

![](https://static.goodrain.com/wechat/zyplayer-doc/5.png)

然后 Rainbond 会检测出来为多模块项目，选择 `zyplayer-doc-manage` 并进行构建，其他模块都是依赖项，是不可运行的。

![](https://static.goodrain.com/wechat/zyplayer-doc/6.png)

#### 编排服务

在应用内 -> 切换到编排模式，将 zyplayer 组件依赖至 MySQL 组件，这样 MySQL 组件会将自身的环境变量注入到 zyplayer 中，zyplayer 组件就可以通过配置文件中的环境变量连接到 MySQL 数据库。

![](https://static.goodrain.com/wechat/zyplayer-doc/7.png)

然后更新 zyplayer 组件即可。

最后通过 Rainbond 默认提供的域名访问 `zyplayer-doc`，访问需要加后缀 `/zyplayer-doc/`，如：`http://xxx.cn/zyplayer-doc/`，默认用户密码 **zyplayer/123456**。
