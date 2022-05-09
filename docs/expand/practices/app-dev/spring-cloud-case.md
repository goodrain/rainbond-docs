---
title: 'Spring Cloud 微服务部署在 Rainbond 的案例'
description: '一个部署在Rainbond的真实Spring Cloud案例'
---

### 示例项目详情

本文档以[Pig 快速开发框架](https://gitee.com/log4j/pig)为例，演示如何在 Rainbond 上部署一套完整的 Spring Cloud 项目。

Pig Microservice Architecture V2.1.0：

- 基于 Spring Cloud Finchley 、Spring Security OAuth2 的 RBAC 权限管理系统
- 基于数据驱动视图的理念封装 Element-ui，即使没有 vue 的使用经验也能快速上手
- 提供对常见容器化支持 Docker、Kubernetes、Rancher2 支持
- 提供 lambda 、stream api 、webflux 的生产实践

模块说明：

```bash
pig
├── pig-ui -- 前端工程[80]
├── pig-auth -- 授权服务提供[3000]
└── pig-common -- 系统公共模块
     ├── pig-common-core -- 公共工具类核心包
     ├── pig-common-log -- 日志服务
     └── pig-common-security -- 安全工具类
├── pig-config -- 配置中心[8888]
├── pig-eureka -- 服务注册与发现[8761]
├── pig-gateway -- Spring Cloud Gateway网关[9999]
└── pig-upms -- 通用用户权限管理模块
     └── pigx-upms-api -- 通用用户权限管理系统公共api模块
     └── pigx-upms-biz -- 通用用户权限管理系统业务处理模块[4000]
└── pigx-visual  -- 图形化模块
     ├── pigx-monitor -- Spring Boot Admin监控 [5001]
     └── pigx-codegen -- 图形化代码生成[5003]
     └── pigx-zipkin -- 微服务链路跟踪[5002]
```

上述的模块，可以分为类库与服务两类，读者可以对比自己的 Spring Cloud 项目：

- 构建后产生 jar 包，用来实现各种功能的类的集合，即是类库，如 Pig 中的`pig-common`模块
- 构建后产生 jar 包或者 war 包，通过 `java -jar` 或者 tomcat 等方式启动，开放某个端口提供服务的，即是服务，如 Pig 中的`pig-eureka`模块

> 只需要将服务模块在 Rainbond 中构建出来即可。

经过梳理，该项目需要构建的服务组件包括：

| 启动顺序 | 服务组件名称 | 运行端口 |             组件功能             |
| :------: | :----------: | :------: | :------------------------------: |
|    1     |  pig-eureka  |   8761   | spring cloud 服务发现注册与发现  |
|    2     |  pig-config  |   8888   |      spring cloud 配置中心       |
|    3     | pig-gateway  |   9999   |     spring cloud 微服务网关      |
|    4     |   pig-auth   |   3000   |           授权服务提供           |
|    5     | pig-upms-biz |   4000   | 通用用户权限管理系统业务处理模块 |
|    6     | pig-monitor  |   5001   |      Spring Boot Admin 监控      |
|    7     | pig-codegen  |   5003   |          图形化代码生成          |
|    8     |  pig-zipkin  |   5002   |          微服务链路跟踪          |
|    9     |    pig-ui    |    80    |       前端项目（vue 项目）       |

部署环境说明：

部署 pig，需要以下环境支持：

| 中间件或环境要求 | 版本要求 |       备注       |
| :--------------: | :------: | :--------------: |
|       JDK        |   1.8    |   强制要求版本   |
|      MySQL       |   5.7+   |   强制要求版本   |
|      Redis       |  3.2 +   |   强制要求版本   |
|       node       |  8.0 +   | 用于运行前端项目 |
|       npm        |  6.0 +   | 用于构建前端项目 |

项目链接：

- [项目地址](https://gitee.com/log4j/pig)
- [部署文档](https://pig4cloud.com/#/doc/pig)

### 模块构建

新建应用，并命名为 `spring-cloud`

获取项目克隆/下载地址： https://gitee.com/log4j/pig.git

#### Java 多模块部署 Pig 项目

参考[JAVA 多模块源码构建](/docs/use-manual/component-create/language-support/java/java-multi-module-build)

#### 分步部署 Pig 项目

以[pig-eureka](https://gitee.com/log4j/pig/tree/master/pig-eureka)为例，演示从源码开始构建流程：

- 为 `spring-cloud` 添加服务组件 —— 从源码开始 —— 自定义仓库：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-case/spring-cloud-case-1.png" width="100%" />

点击 新建服务，Rainbond 会自动拉取代码，并根据代码根目录下的 `pom.xml` 自动将代码语言识别为 `Java-maven`。取消 `并构建启动` 选项：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/micro/spring-cloud/spring-cloud-case/spring-cloud-case-2.png" width="100%" />

- 点击 创建，进入服务组件未部署的页面。编辑 端口 选项卡，开放 `pig-eureka` 自身端口 `8761`：

`pig-eureka` 需要被其它微服务组件访问以进行注册，所以打开对内服务，以便之后创建依赖关系。该组件也提供 web 页面，显示微服务组件的注册情况与健康情况，所以打开对外服务，以便外部访问。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-case/spring-cloud-case-3.png" width="100%" />

- 编辑 构建源 选项卡，指定 `pig-eureka` 构建参数：

由于 Pig 本身是一个多模块的项目，所以需要指定当前服务组件构建的模块。指定的方式是在 `构建运行环境设置` 中的 `Maven构建全局参数：clean dependency:list install -pl pig-eureka -am`

上述的参数指定了普通的子模块构建方式，对于另一种子模块中的子模块，比如 `pig-codegen` 模块，参数指定的方式为： `clean dependency:list install -pl pig-visual/pig-codegen -am`

在 v5.1+版本的 Rainbond 中，可以指定当前服务组件的启动命令。指定的方式是在 `构建运行环境设置` 中的 `启动命令：web: java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/pig-eureka/target/*.jar` ，命令格式与 `Procfile` 一致。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/micro/spring-cloud/spring-cloud-case/spring-cloud-case-4.png" width="100%" />

- 编辑 依赖 选项卡，指定当前服务组件依赖其它服务组件：

各个服务组件之间的依赖关系，可以在创建时指定。所有的 spring cloud 微服务组件都需要依赖 `pig-eureka`，以 `pig-gateway`为例，应添加依赖关系如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-case/spring-cloud-case-5.png" width="100%" />

- 所有的设置完成后，即可点击 构建 ，构建完成后，服务组件将自动运行起来。

- 将所有服务组件依次部署完成。

### 部署 Mysql

Pig 微服务项目需要部署 Mysql 5.7+ 作为数据源。并在代码仓库中提供了数据库初始化脚本： https://gitee.com/log4j/pig/blob/master/db/pig.sql

为了能够在数据库启动时即加载初始化脚本，制作了一份 `Dockerfile`:

https://github.com/dazuimao1990/pri-percona-mysql.git

```bash
FROM percona:5.7.23-stretch
LABEL creater="barnett"
ENV MYSQL_VERSION=5.7.23
ENV TZ=Asia/Shanghai
ADD docker-entrypoint.sh /run/docker-entrypoint.sh
ADD ./run/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD ./run/mysqld.cnf /etc/mysql/percona-server.conf.d/mysqld.cnf
RUN fetchDeps=' \
		ca-certificates \
		wget \
	'; \
	sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list; \
	apt-get update; \
	apt-get install -y --no-install-recommends $fetchDeps; \
	rm -rf /var/lib/apt/lists/*; \
    wget -O /usr/local/bin/env2file -q https://github.com/barnettZQG/env2file/releases/download/v0.1/env2file-linux; \
    chmod +x /run/docker-entrypoint.sh && chmod +x /usr/local/bin/env2file; \
    apt-get purge -y --auto-remove $fetchDeps
EXPOSE 3306
VOLUME ["/var/lib/mysql", "/var/log/mysql"]
# 将代码仓库中 sql 目录下的脚本放到对应的初始化目录下
COPY sql/*.sql /docker-entrypoint-initdb.d/
# change ENTRYPOINT exec some custom command
ENTRYPOINT [ "/run/docker-entrypoint.sh" ]
CMD [ "mysqld" ]
```

- 为 `spring-cloud` 添加服务组件 —— 从源码开始 —— 自定义仓库：

将服务组件命名为 `pig-db`，并指定代码分支 `pig`。

在代码仓库地址 url 的最后添加 `?dir=5.7` 可以让 Rainbond 将构建目录指定为代码仓库根目录下的 `5.7` 文件夹。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/micro/spring-cloud/spring-cloud-case/spring-cloud-case-6.png" width="100%" /> 

为了让数据库正常工作,并且可以被其它依赖的本数据库的应用获取连接信息，需要设置若干环境变量：

|    环境变量名称     |  环境变量值   | 设置位置 |
| :-----------------: | :-----------: | :------: |
|     MYSQL_USER      |     root      | 连接信息 |
|     MYSQL_HOST      |   127.0.0.1   | 连接信息 |
|     MYSQL_PORT      |     3306      | 连接信息 |
| MYSQL_ROOT_PASSWORD | mysqlpassword | 连接信息 |
|   MYSQL_DATABASE    |      pig      | 连接信息 |

通过修改 `pig-config` 中的配置文件，来定义多个微服务组件连接数据库的配置：

```bash
pig/pig-config/src/main/resources/config/pigx-auth-dev.yml
pig/pig-config/src/main/resources/config/pigx-upms-dev.yml
pig/pig-config/src/main/resources/config/pigx-codegen-dev.yml
pig/pig-config/src/main/resources/config/pigx-zipkin-dev.yml.yml
```

修改示例如下：

```bash
# 数据源
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.jdbc.Driver
    username: ${MYSQL_USER}
    password: ${MYSQL_ROOT_PASSWORD}
    url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai
```

### 部署 Redis

通过 Rainbond 应用市场，可以直接安装 Redis 4.0.13。

该版本 Redis 默认提供连接信息：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/micro/spring-cloud/spring-cloud-case/spring-cloud-case-7.png" width="100%" />

通过修改 `pig-config` 中的 `pig/pig-config/src/main/resources/config/application-dev.yml` 来定义所有服务组件连接 Redis 的配置：

修改示例如下：

```bash
# Spring 相关
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
```

### 部署 pig-ui

`pig-ui` 是一个由 nodejs 语言编写的 vue 项目，作为整个系统的前端静态页面。Rainbond 目前已经支持源码构建 `nodejs前端` 项目，参考文档：[NodeJS 前端语言](/docs/use-manual/component-create/language-support/nodejs-static)

为了便于改造项目，所以将项目 fork 了一份进行修改，代码地址：https://gitee.com/dazuimao1990/pig-ui

参照 Rainbond 代码支持规范，在代码根目录下添加了识别文件： `nodestatic.json`

```bash
{"path":"dist"}
```

并在代码仓库中添加了 nginx 配置文件: `www/web.conf` 用于处理代理转发：

```bash
server {
    listen       80;
    root   /app/www;

    location ~* ^/(code|auth|admin|gen) {
        proxy_pass http://127.0.0.1:9999;
        proxy_connect_timeout 15s;
        proxy_send_timeout 15s;
        proxy_read_timeout 15s;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

利用这份代码进行源码构建，即可完成 `pig-ui` 服务组件的部署。

### 依赖与端口梳理

| 服务组件名称 |          依赖           | 端口对内服务 | 端口对外服务 |
| :----------: | :---------------------: | :----------: | :----------: |
|    pig-ui    |       pig-gateway       |     off      |      on      |
| pig-gateway  |    pig-eureka Redis     |      on      |     off      |
| pig-monitor  |    pig-eureka Redis     |     off      |     off      |
|  pig-config  |       pig-eureka        |     off      |     off      |
| pig-upms-biz | pig-eureka pig-db Redis |     off      |     off      |
|  pig-zipkin  | pig-eureka pig-db Redis |     off      |      on      |
|   pig-auth   |    pig-eureka Redis     |     off      |     off      |
| pig-codegen  | pig-eureka pig-db Redis |     off      |     off      |

### 最终成果

完成部署后，拓扑图如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-case/spring-cloud-case-8.png" width="100%" />

登陆效果：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/micro/spring-cloud/spring-cloud-case/spring-cloud-case-9.png" width="100%" />

```bash
登陆账户密码：
admin
123456
```
