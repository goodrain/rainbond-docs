---
Title: 快速部署Gitlab源码管理服务
Description: "基于Rainbond快速部署生产可用的源代码管理服务"
Hidden: true
Key: "rainbond 应用部署 gitlab 开始部署"
---

### Gitlab简介

GitLab是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的Git项目仓库，可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源代码，管理缺陷和注释。同时Gitlab集成了一系列的CI功能。不得不说，Gitlab在企业中是的使用率非常高。

Rainbond非常推荐用户使用Git代码仓库管理代码，从而获取更好的源代码管理和自动化CI体验。话不多说，接下来我们用10分钟的时间完成Gitlab服务在Rainbond的完整部署。

### 准备工作

* 准备一个可用的域名（如果你可以准备），比如 git.example.com
* 准备域名对应的证书（如果你可以准备）
* Rainbond平台已安装完成，参考文档[Rainbond快速安装](<https://www.rainbond.com/docs/user-operations/install/online_install/>)
* Rainbond平台处在能够连接互联网的环境下。

### 部署步骤

本教程我们将采用基于已制作完成的Docker镜像安装的方式部署Gitlab。部署完成后在Rainbond的运行效果如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/gitlab.png" width="80%">

 

> 我们在Rainbond部署一个开源的项目，基于Docker镜像的方式是最快，最简单的方式，特别是一些根据云原生的建议制作的镜像在Rainbond运行兼容性和体验都非常优越。

我们今天部署的Gitlab服务包括Postgresql组件、Redis组件和Gitlab-Server组件，它们的网络依赖关系如上图你看到一样，我们根据依赖关系从小到上依次部署。

首先创建应用 GItlab然后从应用管理页面开始添加服务组件：

我们采用基于DockerRun命令的方式创建服务，参考文档 [基于镜像创建服务]([https://www.rainbond.com/docs/user-manual/app-creation/service_create/#从docker镜像创建](https://www.rainbond.com/docs/user-manual/app-creation/service_create/#%E4%BB%8Edocker%E9%95%9C%E5%83%8F%E5%88%9B%E5%BB%BA)) ,

此次部署的Gitlab镜像由社区提供，是目前使用最广的镜像。源码参考 [docker-gitlab](<https://github.com/sameersbn/docker-gitlab#data-store>)

#### 部署Postgresql组件

添加服务组件，基于以下DockerRun命令，Rainbond将从下面的命令中获取镜像名称和持久化存储目录。

```
docker run --name gitlab-postgresql -d \
    --volume /srv/docker/gitlab/postgresql:/var/lib/postgresql \
    sameersbn/postgresql:10
```

服务构建源识别完成后，通常的过程是直接创建并启动，但是我们这里还需要设置服务的运行类型为有状态服务，并且还需要设置一下连接信息。因此我们需要选择创建不启动。方式如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/quxiaoqidong.png" width="50%"/>

{{% notice note %}}

强调一下，取消图中红色框框中的单选框，这一步非常重要

{{%  /notice %}}

确认后页面直接跳转到服务管理页面，我们做以下几步设置：

1. <b>更改端口别名，设置连接信息</b>

进入服务端口管理页面，服务已默认添加了5432端口，更改端口协议为TCP,  打开端口的对内服务按钮，同时单击"使用别名"后方的端口别名信息，在弹出窗中设置端口别名为 "DB"。确认后将自动生成DB_HOST和DB_POST两个连接信息，在服务"依赖"页面可以查询连接信息, 同时我们继续添加以下连接信息：

| 变量名       | 值                  | 说明                       |
| ------------ | ------------------- | -------------------------- |
| DB_EXTENSION | pg_trgm             |                            |
| DB_NAME      | gitlabhq_production | 数据库名称                 |
| DB_PASS      | password            | 密码，你自己可以随便定义值 |
| DB_USER      | gitlab              | 连接数据库用户名           |

添加这些连接信息有两个作用：

* Postgresql将读取这些变量自动创建用户和数据库
* Postgresql服务被Gitlab-Server依赖后将注入到Gitlab-Server环境中，Gitlab-Server将根据这些变量信息连接数据库。

更多信息参考文档  [服务端口管理](<https://www.rainbond.com/docs/user-manual/app-service-manage/service-port-domain/>) [服务连接信息管理](<https://www.rainbond.com/docs/user-manual/app-service-manage/service-rely/>)

2. <b>更改服务部署类型</b>

由于Postgresql属于数据库类，我们需要将服务部署类型设置为有状态服务，进入服务"其他设置"页面，在"基础信息"信息中将服务的部署类型切换为有状态服务。

3. <b>创建服务</b>

设置完成，点击构建开始构建并启动服务，这时候我们可以开始下一个组件的部署了。

#### 部署Redis组件

部署Redis组件的过程与Postgresql一致，唯一的不同是不需要添加过多的连接信息。

1. 基于下述DockerRun命令添加服务

```
docker run --name gitlab-redis -d \
    --volume /srv/docker/gitlab/redis:/var/lib/redis \
    sameersbn/redis:4.0.9-1
```

2. 完成检查后设置创建不启动，进入服务管理页面
3. 设置6379端口别名为REDIS,并开启端口对内服务。完成后在服务依赖页面可以查看到REDIS_HOST和REDIS_PORT两个连接信息变量，此变量将被注入到Gitlab服务中。
4. 更改服务的部署类型为有状态服务。
5. 创建服务，现在可以进入下一个环节了。

#### 部署Gitlab-Server组件

1. 使用下述的DockerRun命令创建组件，选择创建不启动。

```
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

| 变量            | 值              | 说明                                                         |
| --------------- | --------------- | ------------------------------------------------------------ |
| GITLAB_PORT     | 80              |                                                              |
| GITLAB_HOST     | git.example.com | 之前准备的域名，如果没有准备后续设置Rainbond默认分配的域名即可（创建后可更改） |
| GITLAB_SSH_PORT | 20222           | Gitlab server 22端口开启外网访问后分配的端口（创建后可更改） |
| GITLAB_SSH_HOST | 10.10.10.10     | Gitlab server 22端口开启外网访问后的IP（创建后可更改）       |

2. 创建服务后依赖上面建立的两个服务。直接进入拓扑图编辑模式，将Gitlab Server与redis和postgresql服务连线即可。参考文档 [建立服务依赖](<https://www.rainbond.com/docs/user-manual/app-service-manage/service-rely/#%E6%9C%8D%E5%8A%A1%E5%A6%82%E4%BD%95%E8%BF%9E%E6%8E%A5%E4%BE%9D%E8%B5%96%E6%9C%8D%E5%8A%A1>)
3. 构建服务，等待服务启动完成。

> 注意，Gitlab服务第一次启动过程比较缓慢，等待服务启动完成。

#### 配置网关访问策略

gitlab服务提供80端口的HTTP访问和22端口的SSH代码访问，分别为其添加访问策略。

* 80端口，配置HTTP访问策略，使用预先准备的域名比如(git.example.com)，这与GITLAB_HOST配置的必须一致。绑定域名对应的证书。

* 添加完成后进入访问策略列表，选择刚刚添加的策略，进入参数配置，将"上传限制"调整为10000 Mb,基本就是不限制了。

  参考文档 [添加HTTP访问策略]()

* 为22端口添加TCP策略，生成的IP和端口需要与GITLAB_SSH_HOST GITLAB_SSH_PORT 两个变量一致。



到此，Gitlab服务部署完成，你可以直接访问服务了。第一次进入时将设置root账号的密码。



### FAQ

* 安装完成，访问返回Gitlab的502页面

> 这个时候Gitlab正在进行初始化和启动过程，内部的某些进程还未启动完成。这个时候只需要等待服务启动完成即可，第一次启动大概5-10分钟。

* 上述过程还是有点复杂，能不能直接一键部署。

> 那当然是可以的，我已将Gitlab服务分享到Rainbond公有应用市场，供给Rainbond用户一键安装，应用市场搜索"Gitlab代码仓库服务" 选择版本v11.8.2，同步后直接安装即可。需要注意的是，安装完成后需要根据你的网关访问策略重新配置Gitlab的GITLAB_HOST、GITLAB_SSH_HOST等信息。

暂无其他答疑，如你有疑问，请留言。



