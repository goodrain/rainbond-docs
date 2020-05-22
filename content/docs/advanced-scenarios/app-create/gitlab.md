---
Title: 快速部署Gitlab源码管理服务
Description: '基于Rainbond快速部署生产可用的源代码管理服务'
Hidden: true
Key: 'rainbond 应用部署 gitlab 开始部署'
---

### Gitlab 简介

GitLab 是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的 Git 项目仓库，可通过 Web 界面进行访问公开的或者私人项目。它拥有与 Github 类似的功能，能够浏览源代码，管理缺陷和注释。同时 Gitlab 集成了一系列的 CI 功能。不得不说，Gitlab 在企业中是的使用率非常高。

Rainbond 非常推荐用户使用 Git 代码仓库管理代码，从而获取更好的源代码管理和自动化 CI 体验。话不多说，接下来我们用 10 分钟的时间完成 Gitlab 服务在 Rainbond 的完整部署。

### 准备工作

- 准备一个可用的域名（如果你可以准备），比如 git.example.com
- 准备域名对应的证书（如果你可以准备）
- Rainbond 平台已安装完成，参考文档 [平台安装](/docs/quick-start/rainbond_install/)
- Rainbond 平台处在能够连接互联网的环境下。

### 部署步骤

本教程我们将采用基于已制作完成的 Docker 镜像安装的方式部署 Gitlab；部署完成后在 Rainbond 的运行效果如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/app-create/gitlab/gitlib.png" width="80%">

在 Rainbond 部署一个开源的项目，基于 Docker 镜像的方式是最快，最简单的方式，特别是一些根据云原生的建议制作的镜像在 Rainbond 运行兼容性和体验都非常优越。

我们今天部署的 Gitlab 组件包括 Postgresql 组件、Redis 组件和 Gitlab-Server 组件，它们的网络依赖关系如上图你看到一样，我们根据依赖关系从小到上依次部署。

首先创建应用 `GItlab`然后从应用管理页面开始添加组件：

我们采用基于 DockerRun 命令的方式创建组件，参考文档 [组件创建方式](/docs/user-manual/component-create/creation-process/) ,

此次部署的 Gitlab 镜像由社区提供，是目前使用最广的镜像。源码参考 [docker-gitlab](https://github.com/sameersbn/docker-gitlab#data-store)

### 部署 Postgresql 组件

添加组件，基于以下 DockerRun 命令，Rainbond 将从下面的命令中获取镜像名称和持久化存储目录。

```bash
docker run --name gitlab-postgresql -d \
    --volume /srv/docker/gitlab/postgresql:/var/lib/postgresql \
    sameersbn/postgresql:10
```

组件构建源识别完成后，通常的过程是直接创建并启动，但是我们这里还需要**设置组件的运行类型为有状态组件**，并且还需要设置一下连接信息。因此我们需要选择创建不启动。方式如下：

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/app-create/gitlab/quxiaoqidong.png" style="border:1px solid #eee;width:90%"/></center>

**强调一下，取消图中红色框框中的单选框，这一步非常重要**

取消后点击创建直接跳转到组件管理页面，我们做以下几步设置：

**1.更改端口别名，设置连接信息**

进入组件端口管理页面，服务已默认添加了 5432 端口，更改端口协议为`TCP`, 打开端口的对内服务按钮，同时单击`使用别名`后方的端口别名信息，在弹出窗中设置端口别名为 `DB`。确认后将自动生成`DB_HOST`和`DB_POST`两个连接信息，最终效果如下图。

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/app-create/gitlab/duankoushezhi.png" style="border:1px solid #eee;width:90%"/></center>

在组件`依赖`页面可以查询连接信息, 点击`组件连接信息`-->`添加变量`，继续添加以下连接信息：

| 变量名       | 值                  | 说明                       |
| ------------ | ------------------- | -------------------------- |
| DB_EXTENSION | pg_trgm             |                            |
| DB_NAME      | gitlabhq_production | 数据库名称                 |
| DB_PASS      | password            | 密码，你自己可以随便定义值 |
| DB_USER      | gitlab              | 连接数据库用户名           |

添加这些连接信息有两个作用：

- Postgresql 将读取这些变量自动创建用户和数据库
- Postgresql 服务被 Gitlab-Server 依赖后将注入到 Gitlab-Server 环境中，Gitlab-Server 将根据这些变量信息连接数据库。

更多信息参考文档 [组件端口管理](/docs/user-manual/component-op/service-port-domain/) [组件连接信息管理](/docs/user-manual/component-connection/connection_env/)

**2.更改组件部署类型**

由于 Postgresql 属于数据库类，我们需要将组件部署类型设置为有状态组件，进入组件`其他设置`页面，在`基础信息`信息中将`组件部署类型`切换为有状态组件。

**3.创建组件**

设置完成，点击构建开始构建并启动组件，这时候我们可以开始下一个组件的部署了。

### 部署 Redis 组件

部署 Redis 组件的过程与 Postgresql 一致，唯一的不同是不需要添加过多的连接信息。

1. 基于下述 DockerRun 命令添加组件

```bash
docker run --name gitlab-redis -d \
    --volume /srv/docker/gitlab/redis:/var/lib/redis \
    sameersbn/redis:4.0.9-1
```

2. 完成检查后设置`创建不启动`，进入组件管理页面
3. 设置 6379 端口别名为`REDIS`,并开启端口对内服务；完成后在组件依赖页面可以查看到`REDIS_HOST`和`REDIS_PORT`两个连接信息变量，此变量将被注入到 Gitlab 组件中。
4. 更改组件的部署类型为`有状态组件`。
5. 创建组件，现在可以进入下一个环节了。

### 部署 Gitlab-Server 组件

1. 使用下述的 DockerRun 命令创建组件，选择`创建不启动`。

```bash
docker run --name gitlab -d \
    --publish 10022:22 --publish 10080:80 \
    -e GITLAB_PORT=80 \
    -e GITLAB_HOST=git.example.com \
    -e GITLAB_SSH_PORT=10022 \
    -e GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alpha-numeric-string \
    -e GITLAB_SECRETS_SECRET_KEY_BASE=long-and-random-alpha-numeric-string \
    -e GITLAB_SECRETS_OTP_KEY_BASE=long-and-random-alpha-numeric-string \
    --volume /srv/docker/gitlab/gitlab:/home/git/data \
    sameersbn/gitlab:11.8.2
```

这里需要说明的是其中的几个变量信息：

| 变量            | 值              | 说明                                                                             |
| --------------- | --------------- | -------------------------------------------------------------------------------- |
| GITLAB_PORT     | 80              |                                                                                  |
| GITLAB_HOST     | git.example.com | 之前准备的域名，如果没有准备后续设置 Rainbond 默认分配的域名即可（创建后可更改） |
| GITLAB_SSH_PORT | 20222           | Gitlab server 22 端口开启外网访问后分配的端口（创建后可更改）                    |
| GITLAB_SSH_HOST | 10.10.10.10     | Gitlab server 22 端口开启外网访问后的 IP（创建后可更改）                         |

2. 创建组件后依赖上面建立的两个组件，直接进入拓扑图编辑模式，将 Gitlab Server 与 redis 和 postgresql 组件连线即可，参考文档 [建立组件依赖](/docs/user-manual/component-connection/regist_and_discover/)
3. 构建组件，等待组件启动完成。

> 注意，Gitlab 组件第一次启动过程比较缓慢，等待组件启动完成。

### 配置网关访问策略

gitlab 组件提供 80 端口的 HTTP 访问和 22 端口的 SSH 代码访问，分别为其添加访问策略。

- 80 端口，配置 HTTP 访问策略，使用预先准备的域名比如(git.example.com)，这与 GITLAB_HOST 配置的必须一致。绑定域名对应的证书。

- 添加完成后进入访问策略列表，选择刚刚添加的策略，进入参数配置，将`上传限制`调整为 10000 Mb,基本就是不限制了。

- 为 22 端口添加 TCP 策略，生成的 IP 和端口需要与 GITLAB_SSH_HOST GITLAB_SSH_PORT 两个变量一致。

到此，Gitlab 组件部署完成，你可以直接访问组件了。第一次进入时将设置 root 账号的密码。

### FAQ

- 安装完成，访问返回 Gitlab 的 502 页面

> 这个时候 Gitlab 正在进行初始化和启动过程，内部的某些进程还未启动完成。这个时候只需要等待组件启动完成即可，第一次启动大概 5-10 分钟。

- 上述过程还是有点复杂，能不能直接一键部署。

> 那当然是可以的，我已将 Gitlab 组件分享到 Rainbond 公有应用市场，供给 Rainbond 用户一键安装，应用市场搜索`Gitlab` 选择版本`v11.8.2`，同步后直接安装即可；需要注意的是，安装完成后需要根据你的网关访问策略重新配置 Gitlab 的`GITLAB_HOST`、`GITLAB_SSH_HOST`等信息。

暂无其他答疑，如有疑问，请到[社区](https://t.goodrain.com/)留言。
