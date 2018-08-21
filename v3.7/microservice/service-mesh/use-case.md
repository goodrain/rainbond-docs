---
title: 电子商城ServiceMesh微服务架构案例
summary: 电子商城ServiceMesh微服务架构案例
toc: true
toc_not_nested: true
asciicast: true
---

## 基于 ServiceMesh 微服务架构的电商案例实践

<div id="toc"></div>

### 简介

`sockshop`是一个面向用户的网上销售袜子的商城，具备用户管理、商品管理、购物车、订单流程、地址管理等完善的电商解决方案，是一个典型的微服务架构案例。主要由`spring boot`,`golang`,`nodejs`等多种语言开发。使用`mysql`和`mongoDB`等多种数据库。其原方案是单机环境下部署，缺乏服务治理能力和分布式能力。

借助 Rainbond 开箱即用的 ServiceMesh 架构，对原代码不做任何侵入。将其转化成为具有`服务注册*发现`、`分布式跟踪` 、`A/B测试`、`灰度发布`、`限流` 、`熔断`、 `性能分析`、`高可用`、`日志分析`等能力的高可靠性电商业务系统。

- 商城在 Rainbond 平台的部署效果总览

<img src="https://static.goodrain.com/images/article/sockshop/gr-archi.png" style="border:1px solid #eee;width:80%">

- 商城首页预览图

<img src="https://static.goodrain.com/images/article/sockshop/sockshop-frontend.png" style="border:1px solid #eee;width:80%">

- 商城架构图

<img src="https://static.goodrain.com/images/article/sockshop/Architecture.png" style="border:1px solid #eee;width:80%">

更多信息

- [源码地址](https://github.com/microservices-demo)
- [weavesocksdemo 样例](https://cloud.weave.works/demo)

## 商城 Rainbond 部署流程

本文以 Rainbond(V3.7.0)为基础平台部署微服务架构商城用例。

### 服务创建

为了简化创建过程，在 Rainbond 平台使用`DockerCompose配置文件`的创建方式可以很轻松的批量创建出 sockshop 里的所有服务。

**docker-compose 创建**

<img src="https://static.goodrain.com/images/article/sockshop/docker-compose-create.png" style="border:1px solid #eee;width:80%">

> 需要注意的是检测和创建过程由于获取大量镜像需要一定时间，请耐心等候完成！

**docker-compose 源码**

```
version: '2'

services:
  front-end:
    image: weaveworksdemos/front-end:0.3.12
    hostname: front-end
    restart: always
    cap_drop:
      - all
    ports:
      - "8079:8079"
      - "9001:9001"
    depends_on:
      - catalogue
      - carts
      - payment
      - user
      - orders
  edge-router:
    image: weaveworksdemos/edge-router:0.1.1
    ports:
      - '80:80'
      - '8080:8080'
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    tmpfs:
      - /var/run:rw,noexec,nosuid
    hostname: edge-router
    restart: always
    depends_on:
      - front-end
  catalogue:
    image: weaveworksdemos/catalogue:0.3.5
    hostname: catalogue
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    depends_on:
      - catalogue-db
      - zipkin
  catalogue-db:
    image: rilweic/catalog-db
    hostname: catalogue-db
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_ALLOW_EMPTY_PASSWORD=true
      - MYSQL_DATABASE=socksdb
  carts:
    image: weaveworksdemos/carts:0.4.8
    hostname: carts
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp:rw,noexec,nosuid
    environment:
      - JAVA_OPTS=-Xms64m -Xmx128m -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom -Dspring.zipkin.enabled=false
    ports:
      - "80:80"
    depends_on:
      - carts-db
      - zipkin
  carts-db:
    image: mongo:3.4
    hostname: carts-db
    restart: always
    cap_drop:
      - all
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    tmpfs:
      - /tmp:rw,noexec,nosuid
  orders:
    image: rilweic/orders
    hostname: orders
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp:rw,noexec,nosuid
    environment:
      - JAVA_OPTS=-Xms64m -Xmx128m -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom -Dspring.zipkin.enabled=false
    ports:
      - "8848:8848"
    depends_on:
      - orders-db
      - zipkin
      - shipping
      - carts
      - payment
      - user
  orders-db:
    image: mongo:3.4
    hostname: orders-db
    restart: always
    cap_drop:
      - all
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    tmpfs:
      - /tmp:rw,noexec,nosuid
  shipping:
    image: rainbond/shipping:0.4.8
    hostname: shipping
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp:rw,noexec,nosuid
    environment:
      - JAVA_OPTS=-Xms64m -Xmx128m -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom -Dspring.zipkin.enabled=false
    ports:
      - "8080:8080"
    depends_on:
      - rabbitmq
      - zipkin
  queue-master:
    image: weaveworksdemos/queue-master:0.3.1
    hostname: queue-master
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    tmpfs:
      - /tmp:rw,noexec,nosuid
    depends_on:
      - rabbitmq
  rabbitmq:
    image: rabbitmq:3.6.8
    hostname: rabbitmq
    restart: always
    cap_drop:
      - all
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
  payment:
    image: weaveworksdemos/payment:0.4.3
    hostname: payment
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    depends_on:
      - zipkin
  user:
    image: weaveworksdemos/user:0.4.4
    hostname: user
    restart: always
    cap_drop:
      - all
    cap_add:
      - NET_BIND_SERVICE
    environment:
      - MONGO_HOST=user-db:27017
    depends_on:
      - user-db
      - zipkin
  user-db:
    image: weaveworksdemos/user-db:0.4.0
    hostname: user-db
    restart: always
    cap_drop:
      - all
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    tmpfs:
      - /tmp:rw,noexec,nosuid
  zipkin:
    image: openzipkin/zipkin
    hostname: zipkin
    restart: always
    cap_drop:
      - all
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    tmpfs:
      - /tmp:rw,noexec,nosuid
    environment:
      - reschedule=on-node-failure
    ports:
      - "9411:9411"
```

服务创建完成后需要对批量创建的服务进行注册和对部署内存的调整，根据服务之间的调用关系，我们需要分析出哪些服务是作为内部服务供给其它服务调用，哪个服务是对用户提供访问的。根据上文的架构图我们做以下操作：

### 服务注册

服务创建后，您需要对各个服务进行注册以便服务之间进行相互调用。
在 RainBond 平台，您可以通过在服务的端口页打开端口来进行服务的注册。关于服务注册的详细文档可参考[RainBond 平台服务注册](https://www.rainbond.com/docs/stable/microservice/service-mesh/regist.html)

各服务对应的端口和部署内存大小如下：

| 应用名称     | 开放端口                          | 最小内存（单位：M） | 说明                           |
| ------------ | --------------------------------- | ------------------- | ------------------------------ |
| edge-router  | 80 `内外均开` 8080 `内外均开`     | 128                 | 路由，用于做负载均衡           |
| front-end    | 8079 `对内` 9001 `对内`           | 512                 | 前后端分离的前端部分，用于展示 |
| orders       | 8848 `对内`                       | 1024                | 订单服务                       |
| orders-db    | 27017 `对内`                      | 512                 | （有状态服务）订单数据库       |
| shipping     | 8080 `对内`                       | 1024                | 消息传输服务                   |
| catalogue    | 80 `对内`                         | 128                 | 商品分类服务                   |
| catalogue-db | 3306 `对内`                       | 512                 | （有状态服务）商品分类数据库   |
| carts        | 80 `对内`                         | 1024                | 订单服务                       |
| payment      | 80 `对内`                         | 128                 | 支付服务                       |
| carts-db     | 27017 `对内`                      | 512                 | （有状态服务）订单数据库       |
| user         | 80 `对内`                         | 512                 | 用户服务                       |
| user-db      | 27017 `对内`                      | 512                 | （有状态服务）用户数据库       |
| rabbitmq     | 4369 5671  5672 25672 `全部对内`  | 1024                | （有状态服务）                 |
| queue-master | 无                                | 1024                | 消息队列服务                   |
| zipkin       | 9410 `对内` 9411 `内外均开`       | 1024                | 分布式跟踪服务                 |

### 服务发现

商城项目通过内部域名来进行服务调用。在完成服务的注册后，调用服务需要发现被调用服务，如何实现呢？在 RainBond 平台，您可以通过服务依赖来实现（详情参考文档[服务发现](https://www.rainbond.com/docs/stable/microservice/service-mesh/discover.html)）。各服务依赖的详情可参考上图`商城在RainBond平台的概览`

> 如果使用上面的 docker-compose 文件创建应用，无需手动添加依赖，在创建应用时系统已根据 docker-compose 文件内容自动配置了服务发现

### 服务 Mesh 治理

在商城案例中，`front-end`为`nodejs`项目。该服务会调用其他 5 个服务来获取数据。如图:

<img src="https://static.goodrain.com/images/article/sockshop/front-end-invoke.png" style="border:1px solid #eee;max-width:80%" >

`front-end`在调用其他服务时，会使用域名+端口的调用方式（该项目所有调用均为此方式）
如 `front-end` 调用 `orders` 时，内部访问地址为 `http://orders/xxx`.

RainBond 平台在服务进行调用时，会默认将`顶级域名`解析到`127.0.0.1` 如果调用的服务对应的端口都不冲突没有任何问题，而在此案例中，`front-end`调用的其他 5 个服务的端口均为 80。因此这里需要第一个治理功能：端口复用。

在不安装 7 层网络治理插件的情况下，平台默认使用 4 层网络治理插件，无法提供端口复用的机制。因此，我们为服务`front-end` `orders` 分别安装网络治理插件。

#### 安装网络治理插件

在`我的插件`中选择`服务网络治理插件`进行安装。

<img src="https://static.goodrain.com/images/article/sockshop/net-plugin-install.png" style="border:1px solid #eee;width:80%" >

> 注意: 网络治理插件会默认使用 80 端口，因此使用该插件的应用不能为监听 80 端口的应用

#### 应用安装插件

在应用详情页面选择`插件`标签，然后开通指定的插件

<img src="https://static.goodrain.com/images/article/sockshop/service-plugin-install.png" style="border:1px solid #eee;width:80%" >

> 安装插件后需重启应用生效

#### Mesh 插件配置

配置域名路由，实现端口复用。为了`front-end`服务能根据代码已有的域名调用选择对应的服务提供方，我们需要根据其调用的域名来进行配置。将应用进行依赖后，`服务网络治理插件`能够自动识别出其依赖的应用。您只需在插件的配置的域名项中进行域名配置即可。如图

<img src="https://static.goodrain.com/images/article/sockshop/plugin-config.png" style="border:1px solid #eee;max-width:100%" >

详细配置

<img src="https://static.goodrain.com/images/article/sockshop/plugin-config-detail.gif" style="border:1px solid #eee;max-width:100%" >

更新插件相关的配置后进行保存并重启相关应用即可。

- **特别注意**

  > 工作在 7 层的 Mesh 插件默认会占用 80 端口，因此需要安装此插件的服务本身不能占用 80 端口。因此我们推荐服务尽量监听非 80 端口。

关于网络治理插件的更对详情可参考 [服务路由，灰度发布，A/B 测试
](https://www.rainbond.com/docs/stable/microservice/service-mesh/abtest-backup-app.html)

### 服务性能分析

微服务是一个分布式的架构模式，它一直以来都会有一些自身的问题。当一个应用的运行状态出现异常时，对于我们的运维和开发人员来说，即时发现应用的状态异常并解决是非常有必要的。其次是应用是否正常提供服务，应用提供服务的状况又是怎样？我们可以通过监控手段对服务进行衡量，或者做一个数据支撑。服务目前是怎样的性能状况，以及出了问题我们要怎么去发现它。

这些都可能是服务所面对的问题。出现这些问题后，监控就是一个比较常用、有效率的一个手段。总的来说，监控主要解决的是感知系统的状况。

我们 Rainbond 平台为你提供了服务监控与性能监控，可以简单直观的了解服务当前的状态和信息。

> 目前仅支持 HTTP 与 mysql 协议的应用，后续我们会继续提供其他协议的支持

- 安装插件

    <img src="https://static.goodrain.com/images/article/sockshop/perform-plugin.png" style="border:1px solid #eee;width:80%" >

- 应用安装插件

  同上应用网络治理插件安装

- 安装完成效果图

  安装完成性能分析插件，可以在安装该插件的应用概览页面查看应用的`平均响应时间`和`吞吐率`。如图所示

    <img src="https://static.goodrain.com/images/article/sockshop/service-perform-anly.png" style="border:1px solid #eee;width:80%" >

  除此以外，您也可以在该组应用的组概览中看到应用的访问情况，如图

    <img src="https://static.goodrain.com/images/article/sockshop/group-anly.png" style="border:1px solid #eee;width:80%" >

- 案例上的性能测试工具服务

  sockshop 商城案例自带性能测试的服务，但是与该项目不是持续运行，而是运行一次后程序便会退出。在这里，我们根据源码进行了一点小的修改。主要是将程序变为不退出运行。源码[地址](https://github.com/rilweic/load-test.git)

  您可以通过源码方式来创建项目。如图

    <img src="https://static.goodrain.com/images/article/sockshop/source-code-create.png" style="border:1px solid #eee;max-width:100%" >

  创建完成后，您需要在 sockshop 商城创建一个账号为`user`,密码为`password`的用户，负载测试需要使用该用户名来和密码进行模拟请求。

### 微服务分布式跟踪

#### zipkin 简介

随着业务越来越复杂，系统也随之进行各种拆分，特别是随着微服务架构和容器技术的兴起，看似简单的一个应用，后台可能有几十个甚至几百个服务在支撑；一个前端的请求可能需要多次的服务调用最后才能完成；当请求变慢或者不可用时，我们无法得知是哪个后台服务引起的，这时就需要解决如何快速定位服务故障点，Zipkin 分布式跟踪系统就能很好的解决这样的问题。

[Zipkin 分布式跟踪系统](https://zipkin.io/)；它可以帮助收集时间数据，解决在 microservice 架构下的延迟问题；它管理这些数据的收集和查找；Zipkin 的设计是基于谷歌的 Google Dapper 论文。
每个应用程序向 Zipkin 报告定时数据，Zipkin UI 呈现了一个依赖图表来展示多少跟踪请求经过了每个应用程序；如果想解决延迟问题，可以过滤或者排序所有的跟踪请求，并且可以查看每个跟踪请求占总跟踪时间的百分比。

- zipkin 架构

 <img src="https://static.goodrain.com/images/article/sockshop/zipkin-frame.png" style="border:1px solid #eee;width:80%" >

装配了 zipkin 跟踪器的服务可以将服务的每次调用（可以是 http 或者 rpc 或数据库调用等）延时通过`Transport`（目前有 4 总共发送方式，`http,kafka,scribe,rabbitmq`）发送给`zipkin`服务。

zipkin 主要包含 4 个模块

**collector** 接收或收集各应用传输的数据。
**storage** 存储接受或收集过来的数据，当前支持 Memory，MySQL，Cassandra，ElasticSearch 等，默认存储在内存中。
**API（Query）** 负责查询 Storage 中存储的数据，提供简单的 JSON API 获取数据，主要提供给 web UI 使用
**Web** 提供简单的 web 界面

- zipkin 服务追踪流程

<img src="https://static.goodrain.com/images/article/sockshop/process.png" style="border:1px solid #eee;width:80%" >

从上图可以简单概括为一次请求调用，zipkin 会在请求中加入跟踪的头部信息和相应的注释，并记录调用的时间并将数据返回给 zipkin 的收集器 collector。

#### zipkin 安装

在 Rinbond 平台，您可以直接通过 docker run 方式运行 zipkin.

<img src="https://static.goodrain.com/images/article/sockshop/docker-run-zipkin.png" style="border:1px solid #eee;width:80%" >

> 注意开启对外访问端口和调整应用内存大小

此时创建的 zipkin 的数据存在于内存中，服务关闭或重启数据都会丢失。因此在生产环境中，我们需要将数据存入存储。

zipkin 支持 MySQL，Cassandra，ElasticSearch 三种存储。我们以 Mysql 为例说明。目前 zipkin 至此的 mysql 版本为 5.6 和 5.7 版本。

在 RainBond 平台应用市场创建版本为 5.7 的 mysql 应用，如图。

<img src="https://static.goodrain.com/images/article/sockshop/install-mysql.png" style="border:1px solid #eee;max-width:100%" >

创建完成 mysql 以后，我们需要进行数据库的初始化操作，zipkin 需要使用到 zipkin 数据和相应的表结构，需要我们自行创建。

在应用的详情页面，我们可以选择`管理容器`进入到容器进行操作，如图。

<img src="https://static.goodrain.com/images/article/sockshop/zipkin-mysql-init.png" style="border:1px solid #eee;max-width:100%" >

进入容器后，使用命令登录 mysql 命令行。

```
mysql -uusername -ppassword
```

**mysql 的用户和密码可以在应用的依赖里看到**
如图

<img src="https://static.goodrain.com/images/article/sockshop/service-dep.png" style="border:1px solid #eee;max-width:100%" >

进入 mysql 命令行后，创建数据库 zipkin

```
CREATE DATABASE zipkin ;
```

创建 zipkin 相关的表

```
CREATE TABLE IF NOT EXISTS zipkin_spans (
  `trace_id_high` BIGINT NOT NULL DEFAULT 0 COMMENT 'If non zero, this means the trace uses 128 bit traceIds instead of 64 bit',
  `trace_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `parent_id` BIGINT,
  `debug` BIT(1),
  `start_ts` BIGINT COMMENT 'Span.timestamp(): epoch micros used for endTs query and to implement TTL',
  `duration` BIGINT COMMENT 'Span.duration(): micros used for minDuration and maxDuration query'
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;

ALTER TABLE zipkin_spans ADD UNIQUE KEY(`trace_id_high`, `trace_id`, `id`) COMMENT 'ignore insert on duplicate';
ALTER TABLE zipkin_spans ADD INDEX(`trace_id_high`, `trace_id`, `id`) COMMENT 'for joining with zipkin_annotations';
ALTER TABLE zipkin_spans ADD INDEX(`trace_id_high`, `trace_id`) COMMENT 'for getTracesByIds';
ALTER TABLE zipkin_spans ADD INDEX(`name`) COMMENT 'for getTraces and getSpanNames';
ALTER TABLE zipkin_spans ADD INDEX(`start_ts`) COMMENT 'for getTraces ordering and range';

CREATE TABLE IF NOT EXISTS zipkin_annotations (
  `trace_id_high` BIGINT NOT NULL DEFAULT 0 COMMENT 'If non zero, this means the trace uses 128 bit traceIds instead of 64 bit',
  `trace_id` BIGINT NOT NULL COMMENT 'coincides with zipkin_spans.trace_id',
  `span_id` BIGINT NOT NULL COMMENT 'coincides with zipkin_spans.id',
  `a_key` VARCHAR(255) NOT NULL COMMENT 'BinaryAnnotation.key or Annotation.value if type == -1',
  `a_value` BLOB COMMENT 'BinaryAnnotation.value(), which must be smaller than 64KB',
  `a_type` INT NOT NULL COMMENT 'BinaryAnnotation.type() or -1 if Annotation',
  `a_timestamp` BIGINT COMMENT 'Used to implement TTL; Annotation.timestamp or zipkin_spans.timestamp',
  `endpoint_ipv4` INT COMMENT 'Null when Binary/Annotation.endpoint is null',
  `endpoint_ipv6` BINARY(16) COMMENT 'Null when Binary/Annotation.endpoint is null, or no IPv6 address',
  `endpoint_port` SMALLINT COMMENT 'Null when Binary/Annotation.endpoint is null',
  `endpoint_service_name` VARCHAR(255) COMMENT 'Null when Binary/Annotation.endpoint is null'
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;

ALTER TABLE zipkin_annotations ADD UNIQUE KEY(`trace_id_high`, `trace_id`, `span_id`, `a_key`, `a_timestamp`) COMMENT 'Ignore insert on duplicate';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id_high`, `trace_id`, `span_id`) COMMENT 'for joining with zipkin_spans';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id_high`, `trace_id`) COMMENT 'for getTraces/ByIds';
ALTER TABLE zipkin_annotations ADD INDEX(`endpoint_service_name`) COMMENT 'for getTraces and getServiceNames';
ALTER TABLE zipkin_annotations ADD INDEX(`a_type`) COMMENT 'for getTraces';
ALTER TABLE zipkin_annotations ADD INDEX(`a_key`) COMMENT 'for getTraces';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id`, `span_id`, `a_key`) COMMENT 'for dependencies job';

CREATE TABLE IF NOT EXISTS zipkin_dependencies (
  `day` DATE NOT NULL,
  `parent` VARCHAR(255) NOT NULL,
  `child` VARCHAR(255) NOT NULL,
  `call_count` BIGINT,
  `error_count` BIGINT
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;

ALTER TABLE zipkin_dependencies ADD UNIQUE KEY(`day`, `parent`, `child`);
```

在 zipkin 服务中添加环境变量 `STORAGE_TYPE` 为 `mysql`,此变量标志 zipkin 使用的存储方式。可选择值为 `mysql`,`elasticsearch`、`cassandra`

将 zipkin 与 mysql 建立依赖关系后，zipkin 服务便安装完成。

> zipkin 内部会默认调用环境变量 `MYSQL_USER`（用户名）,`MYSQL_PASS`（密码）,`MYSQL_HOST`（连接地址）,`MYSQL_PORT`（端口）。刚好与 RainBond 平台默认设置的变量一致，所以无需做任何修改。

> 其他服务如果连接的变量与 RainBond 平台默认提供的不一致，您可以在应用的设置也添加相应的环境变量来达到访问的目的。

#### sock-shop 中的 zipkin 案例

sockshop 案例集成了`zipkin`做分布式跟踪。集成的组件为 `users`、`carts`、`orders`、`payment`、`catalogue`、`shipping`。

其中 `carts`、`orders`、`shipping`为**spring-boot**项目，只需在设置中将环境变量`JAVA_OPTS`的`-Dspring.zipkin.enabled`改为`true`即可。

如图

<img src="https://static.goodrain.com/images/article/sockshop/env-update.png" style="border:1px solid #eee;max-width:100%" >

`payment`、`catalogue`、`users`为`golang`项目，项目已在内部集成了 zipkin 组件，我们需要添加环境变量`ZIPKIN`为`http://zipkin:9411/api/v1/spans` 来明确服务调用 zipkin 的地址。

如图

<img src="https://static.goodrain.com/images/article/sockshop/zipkin-link.png" style="border:1px solid #eee;max-width:100%" >

设置完成后，可以做直接访问 zipkin 应用对外提供的访问地址。访问详情如图

<img src="https://static.goodrain.com/images/article/sockshop/zipkin-detail.png" style="border:1px solid #eee;max-width:100%" >

您可以在该图中查看各个服务调用的延时详情。

### 基础部署完成

到此，你应该可以看到如上文看到的完整的业务拓扑图了，商城案例也可以正常工作了。虽然这只是一个 Demo 用例，但其与实际的电商系统只是缺乏一些业务逻辑了。你是否可以将其业务完善用于你们的实际需求呢？

下面我们开始进阶完成每一个服务的`水平伸缩` `持续集成与部署` `数据备份` `灰度发布`

TODO

####
