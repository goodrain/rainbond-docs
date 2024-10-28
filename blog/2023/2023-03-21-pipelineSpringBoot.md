---
title: 使用流水线插件实现持续集成、持续部署
description: 流水线插件是基于 Rainbond 插件体系扩展实现，对 Rainbond 现有构建体系的扩展，本文将介绍使用流水线插件部署 RuoYi SpringBoot 项目，并实现提交代码后自动构建、自动部署
slug: pipelinespringboot
image: https://static.goodrain.com/wechat/pipeline-springboot/ci-cd.png
---

[流水线插件](https://www.rainbond.com/docs/devops/pipeline/) 是基于 Rainbond **插件体系** 扩展实现，通过插件化的方式，可以实现对 Rainbond 构建体系的扩展。该插件由社区合作伙伴 **拓维信息** 参与开发并贡献，底层是基于 GitLab CI/CD 实现。

流水线构建与 Rainbond 源码构建的区别是：

* Rainbond 源码构建：使用简单，固定的构建模式，用户只需提供源代码，但不是很灵活。
* 流水线构建：自定义构建步骤，使用更加灵活。

本文将介绍使用流水线插件部署 RuoYi SpringBoot 项目，并实现提交代码后自动构建、自动部署。

<!--truncate-->

## 安装 GitLab 和 Runner

流水线插件是基于 GitLab 实现，所以需要依赖 GitLab 和 GitLab Runner，如果已有则可跳过此步。

通过 Rainbond 开源应用商店部署 GitLab 和 Runner，进入到 **平台管理 -> 应用市场 -> 开源应用商店** 中分别搜索 `GitLab` 和 `GitLab-runner`，选择版本进行安装，分别安装到同一个应用内。

![](https://static.goodrain.com/wechat/pipeline-springboot/1.png)

部署完成后，访问 GitLab 默认的域名进行用户注册。然后关闭 GitLab 默认的 AutoDevOps：`Admin -> Settings -> CI/CD -> Continuous Integration and Deployment` 取消勾选 `Default to Auto DevOps pipeline for all projects`。

![](https://static.goodrain.com/wechat/pipeline-springboot/2.png)

### 注册 Runner

GitLab 和 Runner 都部署完成后，需要将 Runner 注册到 GitLab 中。

进组 Runner **组件内 -> Web 终端**，执行以下命令进行注册：

* `<URL>` 为 GitLab 访问地址
* `<TOKEN>` 在 GitLab 的 `Admin -> Runners` 获取 `Registration token`
* `<TAG>` 自定义 Runner 的标签。

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "<URL>" \
  --registration-token "<TOKEN>" \
  --description "docker-runner" \
  --tag-list "<TAG>" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

注册完成后，可以在`Admin -> Runners` 页面中看到如下图，`Status` 为 `online` 则正常。

![](https://static.goodrain.com/wechat/pipeline-springboot/3.png)

## 安装流水线插件

通过 Rainbond 开源应用商店部署 Pipeline 应用插件，进入到 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `Pipeline`，选择对应的版本进行部署。

![](https://static.goodrain.com/wechat/pipeline-springboot/4.png)

安装完成后，需要修改 Pipeline-Backend 服务的配置，进入到 **Pipeline 应用内 -> Pipeline-Backend组件内**，修改以下环境变量：

* RAINBOND_URL：Rainbond 控制台访问地址，例如：`http://192.168.3.33:7070`。

- RAINBOND_TOKEN：Rainbond 控制台的 Token，可以在 **右上角用户 -> 个人中心 -> 访问令牌** 中获取。

修改完成后，更新或重启 Backend 组件生效。

![](https://static.goodrain.com/wechat/pipeline-springboot/5.png)

进入到 **Pipeline 应用内 -> k8s 资源 -> 编辑 rainbond-pipeline**，修改 `pipeline` 资源中的 `access_urls` 配置，修改为 `Pipeline-UI` 组件的对外访问地址，如下:

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RBDPlugin
metadata:
  labels:
    plugin.rainbond.io/name: pipeline
  name: pipeline
spec:
  access_urls:
  - https://custom.com
  alias: Pipeline
  author: Talkweb
  description: 该应用插件是基于 GitLab CI/CD 实现，扩展 Rainbond 已有的构建体系。
  icon: https://static.goodrain.com/icon/pipeline.png
  version: 1.0.0
```

修改完成后，就可以在每个团队视图中看到 `流水线` 按钮选项了。

## 部署 RuoYi 项目

将 Gitee 中的 [RuoYi](https://gitee.com/y_project/RuoYi.git) 项目 Fork 到私有的 GitLab 中。

修改项目配置文件中的 `mysql` 连接地址：

```yaml
# ruoyi-admin/src/main/resources/application-druid.yml
......
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:mysql://${MYSQL_HOST}:3306/ry?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: root
```

### 部署 MySQL

通过 Rainbond 开源应用商店部署 MySQL 即可。部署之后打开 MySQL 对外服务端口，通过本地工具连接到数据库并创建 `ry` 数据库和初始化 sql 目录下的 `quartz.sql` 和 `ry_20230223.sql`。

### 部署 RuoYi SpringBoot

进入到 **团队视图 -> 流水线**。

#### 1.创建流水线

进入流水线管理，选择 Java Maven 单模块的模版创建。

![](https://static.goodrain.com/wechat/pipeline-springboot/6.png)

如果没有 SonarQube 代码扫描步骤可以删除，修改 **编译构建物** 步骤：

* 制品目录：ruoyi-admin/target/*.jar

修改 **构建镜像** 步骤：

* 脚本命令：

```bash
cp ruoyi-admin/target/*.jar app.jar
docker login -u ${REPOSITORY_USERNAME} -p ${REPOSITORY_PASSWORD} ${REPOSITORY_URL}
docker build -t  ${REPOSITORY_URL}/${ORG}/${MODULE}:${DEVOPS_VERSION} .
docker push ${REPOSITORY_URL}/${ORG}/${MODULE}:${DEVOPS_VERSION}
```

在流水线的变量内，指定 Docker 相关的环境变量用于打包镜像和推送镜像：

* REPOSITORY_URL：镜像仓库地址，如：registry.cn-hangzhou.aliyuncs.com
* ORG：镜像仓库组织，例如：goodrain
* REPOSITORY_USERNAME：镜像仓库用户名
* REPOSITORY_PASSWORD：镜像仓库密码

#### 2.创建应用服务

* 服务编码：唯一的
* 服务名称：自定义
* 流水线：选择流水线模版
* 仓库配置：填写仓库地址，如：http://gitlab.test.com/root/ruoyi.git
* 认证配置：可选用户密码或Token

![](https://static.goodrain.com/wechat/pipeline-springboot/7.png)

创建应用服务后，可在 GitLab 仓库内看到多了两个文件 `Dockerfile` 和 `.gitlab-ci.yml` ，这是由流水线插件服务自动生成并提交到仓库内。

#### 3.构建服务

进入 **代码管理**，应用服务选择 `ruoyi`，点击 `构建` 按钮开始构建。可以在持续集成页面看到构建状态以及步骤，点击步骤可跳转至 GitLab 详情页。

![](https://static.goodrain.com/wechat/pipeline-springboot/8.png)

#### 4. 部署后端服务

等待构建完成后，即可在镜像仓库中看到构建的镜像版本，接下来就可以通过该版本进行部署，可选择部署到当前团队下的哪个应用内。

![](https://static.goodrain.com/wechat/pipeline-springboot/9.png)

部署完成后，可在部署历史页面看到部署历史，点击部署详情跳转到 Rainbond 组件内。

![](https://static.goodrain.com/wechat/pipeline-springboot/10.png)

### 编辑依赖关系

接下来进入到应用内，切换到编排模式将 `ruoyi` 服务依赖至 MySQL 服务，并更新 ruoyi 组件。

![](https://static.goodrain.com/wechat/pipeline-springboot/11.png)

进入到 ruoyi 组件内 -> 端口，添加 80 端口并打开对外服务，即可通过默认的域名访问到 ruoyi UI。

![](https://static.goodrain.com/wechat/pipeline-springboot/12.png)

### 配置自动构建和自动部署

编辑已经创建的应用服务，打开自动构建和自动部署按钮，下次提交代码时将会自动触发整个流程。

![](https://static.goodrain.com/wechat/pipeline-springboot/13.png)

## 最后

通过流水线插件可以更灵活的扩展构建过程，比如增加代码扫描、构建成功后的消息通知等等。流水线插件也会持续迭代，欢迎大家安装使用！