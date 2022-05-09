---
title: 部署自动初始化Schema的数据库
weight: 4006
---

我们使用容器的方式部署数据库组件，特别是企业有大量的项目开发业务的，部署的开发、测试数据库组件较多时。经常会遇到以下问题：

1. 业务需要使用数据库，但部署完数据库后，需要在数据库中执行创建schema的操作或者一些初始化数据的创建。
2. 开发测试多套部署环境，需要多次重复1的步骤。
3. 项目比较多，时间久了项目需要的数据库Schema不清楚。
4. 项目交付时数据库Schema管理混乱。

现在如果是使用Go等语言研发的业务系统，都具备了ORM层自动初始化和更新Schema的能力，如果是这样本文对你无用。但目前大多数其他开发语言的业务都不具备这种能力。

如果我们把数据库也作为一个业务中的一个服务模块来管理的话，我们希望服务启动后即可直接完成Schema的初始化，直接提供数据服务能力。

那么在Rainbond中如何达成这样的效果呢？



Schema初始化在传统模式中一般有两种方案：

- 在数据库启动后手动导入；人工通过客户端操作，没有自动化程度可言；
- 在业务服务启动时连接数据库进行初始化，依赖业务服务端的能力。

可以看出，这两种方式都存在各自的弊端，那么有没有方式能够让数据库启动时自动初始化指定的数据呢？答案是 有！

我们以MySQL为例， 官方对于 Docker 有着良好的支持，首先来看 Dockerhub上 [Mysql官方镜像](https://registry.hub.docker.com/_/mysql) 的一段描述:

![description](https://static.goodrain.com/docs/practice/Initdb/description.jpg)

在数据库容器首次启动时，将创建一个指定名称的新数据库，并使用提供的环境变量对其进行初始化。 此外，它将执行在 `/docker-entrypoint-initdb.d` 中找到的扩展名为 `.sh`，`.sql` 和 `.sql.gz` 的文件。 文件将按字母顺序执行。 默认情况下，SQL文件将导入到`MYSQL_DATABASE` 变量指定的数据库中。因此我们只需要在Mysql镜像工作机制的基础上维护好数据库初始化所需要的SQL即可。上文我们说到把数据库也作为一个独立的服务模块，我们也可以通过代码把Sql等脚步管理起来，划分版本分支。

Rainbond 支持多种组件创建方式，在这里我们采用 从源码创建组件 的方式，编写 Dockerfile 并上传至支持 `Git/Svn` 协议的客户端，即可在平台直接进行构建；这种方式 透明、可复用、并且能够进行自动化构建。

目录结构

```bash
./
└── Dockerfile
    └── config
        ├── my.cnf
        ├── conf.d
             ├── docker.cnf
    └── sql
        ├── init_database
    └── README.md
```

Dockerfile文件

```bash
#基础镜像
FROM mysql:latest
MAINTAINER Aaron <Aaron_ops@163.com>

#把sql文件拷贝到/docker-entrypoint-initdb.d/目录下，以便启动时自动执行这个sql
COPY ./sql/*.sql /docker-entrypoint-initdb.d
#拷贝mysql配置文件
COPY ./config/ /etc/mysql/
#Mysql密码
ENV MYSQL_ROOT_PASSWORD rainbond
#数据持久化目录
VOLUME [ "/var/lib/mysql" ]
#端口
EXPOSE 3306
```

项目地址：https://github.com/Aaron-23/Initialize-db

使用该项目在平台进行构建，Rainbond 将会自动检测 Dockerfile 中定义的环境变量，存储，端口等信息，对这些配置项进行自动化配置，在 Dockerfile 构建完毕后自动启动数据库。

需要注意的是 MySQL 属于有状态服务，所以在构建前需将组件类型修改为有状态单实例，关于组件状态请参考 [组件部署类型](/docs/practices/app-dev/statefulset/)。

![advancedsettings](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/Initdb/advancedsettings.png)

![status](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/Initdb/status.png)

启动完成，进入运行中状态

![Overview](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/Initdb/Overview.jpg)

通过 Web终端 进入数据库查看相关数据已经完成初始化

![db](https://static.goodrain.com/docs/practice/Initdb/db.jpg)

通过这种方式进行数据库初始化，不需要修改程序代码，无需借助外部工具，通过平台的能力快速部署数据库并完成初始化，在后续使用过程中可以通过性能分析，资源监控，实例伸缩等功能完成服务运行时的全生命周期管理，提升开发效率，增强业务稳定性。

另外我们还可以将此组件发布到 Rainbond 内部组件库中，后续开发、测试和交付过程可以直接一键安装此组件即可获得数据初始完成的数据库服务。

以上 MySQL数据库 仅为参考示例，MongoDB，PostgreSQL等数据库均支持同类型数据初始化方式。