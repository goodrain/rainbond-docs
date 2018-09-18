---
title: ServiceMesh微服务架构电商案例动手实践
summary: 自己动手，以电子商城项目为例，部署一个完整的 ServiceMesh 微服务架构
toc: true
asciicast: true
---

## 前言

可能你听说Rainbond原生支持ServiceMesh微服务架构，首先你可能有下面三个问题：

* [什么是ServiceMesh微服务架构](http://t.goodrain.com/t/servicemesh/451)
* [Rainbond如何支持ServiceMesh架构](https://www.rainbond.com/docs/stable/microservice/service-mesh/overview.html)
* [Rainbond ServiceMesh 架构与Istio的关系](https://www.rainbond.com/docs/stable/microservice/service-mesh/overview.html)

这里我假设你已经了解了上诉三个话题，那我们来到本文的重点，既然ServiceMesh架构这么简单易用，我们要如何才能把我们的业务系统部署到Rainbond，基于Rainbond提供的架构支持实现完整的微服务呢？本文我们通过部署一个电子商城业务系统的方式详细解读Rainbond ServiceMesh架构的实际使用。跟着本文的实践，让你掌握将你的已有业务系统借助平台转化为微服务集群架构的能力。

<div id="doc"></div>

## 一、案例简介

[sockshop](https://github.com/microservices-demo/microservices-demo) 是一个面向用户的网上销售袜子的商城，具备用户管理、商品管理、购物车、订单流程、地址管理等完善的电商解决方案，是一个典型的微服务架构案例。主要由`Spring boot`,`Golang`,`Nodejs`等多种语言开发。使用`MySQL`和`MongoDB`等多种数据库。其原方案是单机环境下部署，缺乏服务治理能力和分布式能力。

借助 Rainbond 开箱即用的 ServiceMesh 架构，对原代码不做任何侵入。将其转化成为具有`服务注册与发现`、`分布式跟踪` 、`A/B测试`、`灰度发布`、`限流` 、`熔断`、 `性能分析`、`高可用`、`日志分析`等能力的高可靠性电商业务系统。

### 1.1 部署后的拓扑图总览

<center>
<img src="https://static.goodrain.com/images/docs/3.7/microservice/service-mesh/sockshop.gif" style="border:1px solid #eee;width:85%">
</center>



### 1.2 商城架构图

<center>
<img src="https://static.goodrain.com/images/article/sockshop/Architecture.png" style="border:1px solid #eee;width:80%">
</center>
在这个用例中，Front-end是一个前端项目，通过Http Restful协议请求后端多个微服务。Order订单服务处理订单业务中涉及到使用消息队列异步处理。

更多信息

- [源码地址](https://github.com/microservices-demo)
- [weavesocksdemo 样例](https://cloud.weave.works/demo)

## 二、商城在Rainbond的部署流程

本文以 Rainbond(V3.7.0)为基础平台部署微服务架构商城用例，如果你还没有安装Rainbond，请参阅 [Rainbond部署文档](https://www.rainbond.com/docs/stable/getting-started/before-installation.html)

### 2.1 服务组件的创建与部署

首先，我们需要将此例中的所有服务组件依次部署到平台，通常我们按照逻辑上的依赖关系来依次进行创建，每个服务组件如何创建你可以通过查阅[创建第一个应用](https://www.rainbond.com/docs/stable/user-manual/create-an-app.html) 或者 [关于Rainbond，你一定关心的事](http://t.goodrain.com/t/rainbond/453/2) 两篇文章，这里就不再啰嗦。我们希望你可以使用源码分别去部署每个服务组件。

为了简化创建过程，这里我们在 Rainbond 平台使用`DockerCompose配置文件`的创建方式批量的创建出 sockshop 里的所有服务。

- **docker-compose 创建**

<center>
<img src="https://static.goodrain.com/images/article/sockshop/docker-compose-create.png" style="border:1px solid #eee;width:80%">
</center>
- **docker-compose 源码: [下载](/docs/attachments/yaml/sockshop.yaml)**

> 需要注意的是检测和创建过程由于获取大量镜像需要一定时间，请耐心等候完成！通过识别DockerCompose文件创建的服务组件都是基于镜像构建的，无法直接通过源码进行部署。
>
> Rainbond除了提供了基于DockerCompose创建应用的基础上还有更多的创建方式，体验从源码到云端的流程等，参考文档：[创建一个应用](https://www.goodrain.com/docs/stable/user-manual/create-an-app.html)

服务识别完成后，您需要对各个服务进行一些**高级设置**，以便服务组件能够正常工作。例如服务注册、服务发现和部署属性等。

| 应用名称     | 开放端口                         | 最小内存（单位：M） | 部署属性   | 说明                           |
| ------------ | -------------------------------- | ------------------- | ---------- | ------------------------------ |
| edge-router  | 80 `内外均开` 8080 `内外均开`    | 128                 | 无状态     | 路由，用于做负载均衡           |
| front-end    | 8079 `对内` 9001 `对内`          | 512                 | 无状态     | 前后端分离的前端部分，用于展示 |
| orders       | 8848 `对内`                      | 1024                | 无状态     | 订单服务                       |
| orders-db    | 27017 `对内`                     | 512                 | 有状态服务 | 订单数据库                     |
| shipping     | 8080 `对内`                      | 1024                | 无状态服务 |                                |
| catalogue    | 80 `对内`                        | 128                 | 无状态服务 | 商品分类服务                   |
| catalogue-db | 3306 `对内`                      | 512                 | 有状态服务 | 商品分类数据库                 |
| carts        | 80 `对内`                        | 1024                | 无状态服务 | 订单服务                       |
| payment      | 80 `对内`                        | 128                 | 无状态服务 | 支付服务                       |
| carts-db     | 27017 `对内`                     | 512                 | 有状态服务 | 订单服务数据库                 |
| user         | 80 `对内`                        | 512                 | 无状态服务 | 用户服务                       |
| user-db      | 27017 `对内`                     | 512                 | 有状态服务 | 用户服务数据库                 |
| rabbitmq     | 4369 5671  5672 25672 `全部对内` | 1024                | 有状态服务 | 消息队列                       |
| queue-master | 无                               | 1024                | 无状态服务 | 消息处理服务                   |
| zipkin       | 9410 `对内` 9411 `内外均开`      | 1024                | 无状态服务 | 分布式跟踪服务                 |

> 请注意，这里必须确定对每个服务组件的服务注册信息和资源分配信息设置正确。

### 2.2 服务注册

在 RainBond 平台，您可以通过在服务的端tab页打开端口服务属性来进行服务的注册。关于服务注册的详细文档可参考[RainBond 平台服务注册](regist.html) 。根据上诉表格中的每个服务端口属性设置来进行调整，服务的端口是与程序本身监听的端口一一对应的，我们一般推荐一个服务一个端口。在对你自己的服务进行部署的时候，你需要考虑哪些服务是对内部提供服务的，哪些服务是对外网提供服务的，分别进行控制。

### 2.3 服务发现

商城项目通过内部域名来进行服务调用。在完成服务的注册后，调用服务需要发现被调用服务，如何实现呢？在 RainBond 平台，您可以通过服务依赖来实现（详情参考文档[服务发现](discover.html)）。各服务依赖的详情可参考上图`商城在RainBond平台的概览`

> 如果使用上面的 docker-compose 文件创建应用，无需手动添加依赖，在创建应用时系统已根据 docker-compose 文件内容自动配置了服务发现

这个服务发现和服务注册都是平台完成，用户代码无需更改。服务直接的请求（Http）只需要按照指定域名单机的形式进行调用即可。

### 2.4 服务部署属性调整

每个服务的部署属性需要严格按照服务组件的特性选择，部署类型创建后不可更改。在进行部署类型选择时：如何是数据库类服务、集群类服务、需要使用DNS服务发现的服务等必须采用又状态服务类型。其他服务采用无状态服务类型。应用的内存需要根据应用需求分配即可，一般Java类的应用内存占用较大。

调整完以上信息后就可以正式构建应用了，等候应用多有组件构建完成即可在拓扑图中呈现上文看到的`部署后的拓扑图总览`图示。

完成了应用的基础部署之后，接下来我们将对服务的治理进行配置：

### 2.5 服务网络治理(Mesh)

在商城案例中，`front-end`为`nodejs`项目。该服务会调用其他 5 个服务来获取数据。如图:

<center>
<img src="https://static.goodrain.com/images/article/sockshop/front-end-invoke.png" style="border:1px solid #eee;max-width:80%" >
</center>
`front-end`在调用其他服务时，会使用域名+端口的调用方式（该项目所有调用均为此方式）
如 `front-end` 调用 `orders` 时，内部访问地址为 `http://orders/xxx`.

RainBond 平台在服务进行调用时，会默认将`顶级域名`解析到`127.0.0.1` 如果调用的服务对应的端口都不冲突没有任何问题，而在此案例中，`front-end`调用的其他 5 个服务的端口均为 80。因此这里需要第一个治理功能：端口复用。

在不安装 7 层网络治理插件的情况下，平台默认使用 4 层网络治理插件，无法提供端口复用的机制。因此，我们为服务`front-end` `orders` 分别安装网络治理插件。

#### 2.5.1 安装网络治理插件

在`我的插件`中选择`服务网络治理插件`进行安装, Rainbond中当前版本默认提供性能分析和服务网络治理两个插件。

用户可以自己根据插件规范制作应用插件，或者使用社区其他用户分享的应用插件来扩展应用治理功能。

<center>
<img src="https://static.goodrain.com/images/article/sockshop/net-plugin-install.png" style="border:1px solid #eee;width:85%" >
</center>
**特别注意**

> 工作在 7 层的 Mesh 插件默认会占用 80 端口，因此需要安装此插件的服务本身不能占用 80 端口。我们推荐服务尽量监听非 80 端口。插件内存使用量需要根据流量大小调节。

#### 2.5.2 应用组件开通插件

我们需要为`front-end` 和 `orders` 分别开通网络治理插件，在应用详情页面选择`插件`标签，然后开通指定的插件

<center>
<img src="https://static.goodrain.com/images/article/sockshop/service-plugin-install.png" style="border:1px solid #eee;width:85%" >
</center>

> Rainbond默认提供的服务网络治理插件是基于[Envoy](https://github.com/envoyproxy/envoy)制作，Rainbond ServiceMesh架构为Envoy提供了标准的运行支持。安装插件后需重启应用生效。
>
> 后续版本中我们会默认引入Istio-proxy制作网络治理插件，提供更多的安全控制治理功能。

#### 2.5.3 网络治理插件配置

配置域名路由，实现端口复用。为了`front-end`服务能根据代码已有的域名调用选择对应的服务提供方，我们需要根据其调用的域名来进行配置。将应用进行依赖后，`服务网络治理插件`能够自动识别出其依赖的应用。您只需在插件的配置的域名项中进行域名配置即可。如下图：

<img src="https://static.goodrain.com/images/article/sockshop/plugin-config.png" style="border:1px solid #eee;max-width:100%" >
>

详细配置

<img src="https://static.goodrain.com/images/article/sockshop/plugin-config-detail.gif" style="border:1px solid #eee;max-width:100%" >

更多插件相关的配置后进行保存并重启相关应用即可。此处暂时先只用到基于域名的路由配置，关于网络治理插件的更对详情可参考 [服务路由，灰度发布，A/B 测试
](abtest-backup-app.html)

### 2.6 服务性能分析

微服务是一个分布式的架构模式，它一直以来都会有一些自身的问题。当一个应用的运行状态出现异常时，对于我们的运维和开发人员来说，即时发现应用的状态异常并解决是非常有必要的。其次是应用是否正常提供服务，应用提供服务的状况又是怎样？我们可以通过监控手段对服务进行衡量，或者做一个数据支撑。服务目前是怎样的性能状况，以及出了问题我们要怎么去发现它。

这些都可能是服务所面对的问题。出现这些问题后，监控就是一个比较常用、有效率的一个手段。总的来说，监控主要解决的是感知系统的状况。

我们 Rainbond 平台为你提供了业务级服务与性能监控，可以简单直观的了解服务当前的状态和信息。

> 目前仅支持 HTTP 与 mysql 协议的应用，后续我们会继续提供其他协议的支持

- 安装插件

<center>
<img src="https://static.goodrain.com/images/article/sockshop/perform-plugin.png" style="border:1px solid #eee;width:80%" />
</center>

- 应用安装插件

  同上应用网络治理插件安装

- 安装完成效果图

  安装完成性能分析插件，可以在安装该插件的应用概览页面查看应用的`平均响应时间`和`吞吐率`。如图所示

<center>
<img src="https://static.goodrain.com/images/article/sockshop/service-perform-anly.png" style="border:1px solid #eee;width:80%" />
</center>

除此以外，您也可以在该组应用的组概览中看到应用的访问情况，如图

<center>
<img src="https://static.goodrain.com/images/article/sockshop/group-anly.png" style="border:1px solid #eee;width:85%" />
</center>

- 案例上的性能测试工具服务（制造流量）

  sockshop 商城案例自带性能测试的服务，但是与该项目不是持续运行，而是运行一次后程序便会退出。在这里，我们根据源码进行了一点小的修改。主要是将程序变为不退出运行。源码[地址](https://github.com/rilweic/load-test.git)

  您可以通过源码方式来创建项目。如图

<img src="https://static.goodrain.com/images/article/sockshop/source-code-create.png" style="border:1px solid #eee;max-width:100%" />

  创建完成后，您需要在 sockshop 商城创建一个账号为`user`,密码为`password` 的用户，负载测试需要使用该用户名来和密码进行模拟请求。

## 三、微服务分布式跟踪

### 3.1 zipkin 简介

随着业务越来越复杂，系统也随之进行各种拆分，特别是随着微服务架构和容器技术的兴起，看似简单的一个应用，后台可能有几十个甚至几百个服务在支撑；一个前端的请求可能需要多次的服务调用最后才能完成；当请求变慢或者不可用时，我们无法得知是哪个后台服务引起的，这时就需要解决如何快速定位服务故障点，Zipkin 分布式跟踪系统就能很好的解决这样的问题。

[Zipkin 分布式跟踪系统](https://zipkin.io/)；它可以帮助收集时间数据，解决在 microservice 架构下的延迟问题；它管理这些数据的收集和查找；Zipkin 的设计是基于谷歌的 Google Dapper 论文。
每个应用程序向 Zipkin 报告定时数据，Zipkin UI 呈现了一个依赖图表来展示多少跟踪请求经过了每个应用程序；如果想解决延迟问题，可以过滤或者排序所有的跟踪请求，并且可以查看每个跟踪请求占总跟踪时间的百分比。

- zipkin 架构

<center>
 <img src="https://static.goodrain.com/images/article/sockshop/zipkin-frame.png" style="border:1px solid #eee;width:85%" >
 </center>

装配了 zipkin 跟踪器的服务可以将服务的每次调用（可以是 http 或者 rpc 或数据库调用等）延时通过`Transport`（目前有 4 总共发送方式，`http,kafka,scribe,rabbitmq`）发送给`zipkin`服务。

zipkin 主要包含 4 个模块

**collector** 接收或收集各应用传输的数据。
**storage** 存储接受或收集过来的数据，当前支持 Memory，MySQL，Cassandra，ElasticSearch 等，默认存储在内存中。
**API（Query）** 负责查询 Storage 中存储的数据，提供简单的 JSON API 获取数据，主要提供给 web UI 使用
**Web** 提供简单的 web 界面

- zipkin 服务追踪流程

<center>
<img src="https://static.goodrain.com/images/article/sockshop/process.png" style="border:1px solid #eee;width:85%" >
</center>

从上图可以简单概括为一次请求调用，zipkin 会在请求中加入跟踪的头部信息和相应的注释，并记录调用的时间并将数据返回给 zipkin 的收集器 collector。

### 3.2 zipkin 安装

在 Rinbond 平台，您可以直接通过 docker run 方式运行 zipkin.

<img src="https://static.goodrain.com/images/article/sockshop/docker-run-zipkin.png" style="border:1px solid #eee;width:100%" />

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

关于创建 zipkin 相关的表的SQL文件：[下载](/docs/attachments/sql/zipkin.sql)

在终端或Mysql客户端执行上诉Sql创建表和初始化数据。

在 zipkin 服务中添加环境变量 `STORAGE_TYPE` 为 `mysql`,此变量标志 zipkin 使用的存储方式。可选择值为 `mysql`,`elasticsearch`、`cassandra`

将 zipkin 与 mysql 建立依赖关系后，zipkin 服务便安装完成。

> zipkin 内部会默认调用环境变量 `MYSQL_USER`（用户名）,`MYSQL_PASS`（密码）,`MYSQL_HOST`（连接地址）,`MYSQL_PORT`（端口）。刚好与 RainBond 平台默认设置的变量一致，所以无需做任何修改。

> 其他服务如果连接的变量与 RainBond 平台默认提供的不一致，您可以在应用的设置也添加相应的环境变量来达到访问的目的。

### 3.3 sock-shop 中的 zipkin 案例

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

## 四、基础部署完成

到此，你应该可以看到如上文看到的完整的业务拓扑图了，商城案例也可以正常工作了。虽然这只是一个 Demo 用例，但其与实际的电商系统只是缺乏一些业务逻辑了。你是否可以将其业务完善用于你们的实际需求呢？

## 五、进阶

### 5.1 服务伸缩

![服务伸缩](https://grstatic.oss-cn-shanghai.aliyuncs.com/images%2Fdocs%2Fcommon%2Fshensuo.png)

为了能够支持更大的流量和并发，服务可以采用水平伸缩或垂直伸缩的方式进行扩容，首先我们必须明确几个问题

**什么服务能够水平伸缩：**

1. 不基于内存的Session实现的大部分无状态服务。
2. 应用层实现了数据同步的集群类服务（Etcd、TiDB、Cassandra等）。
3. 从同一个主服务同步数据的从服务（比如Mysql的从节点服务）。

**什么时候需要伸缩：**

1. 单实例内存使用超过80%时推荐进行扩容。
2. 业务性能监控吞吐率异常下降或相应实际异常变大时进行扩容。

**选择水平伸缩还是垂直伸缩：**

1. 并发量大时推荐水平伸缩。
2. 无法进行水平伸缩时采用垂直伸缩。
3. 需要高可用保证时采用水平伸缩。
4. 单机性能瓶颈时采用水平伸缩。

### 5.2 灰度发布或A/B测试

当你将完整的业务系统上线运行以后，优雅对对服务进行持续升级而不影响业务至关重要。一般情况下Rainbond提供的默认滚动升级策略已经可以保证多节点的服务不中断升级，并且自动完成无需人工参与。对于一些更为重要的服务我们需要可控的进行灰度发布或A/B测试我们应该如何进行呢？

在基础部署环节中我们已经了解到ServiceMesh架构中服务直接调用是可控的，这就为我们进行灰度发布奠定基础。我们过去进行灰度发布时免不了需要运维的同事配合进行流量管理。在Rainbond平台上可以直接可视化的控制流量。

例如我们需要对服务`orders`进行灰度发布，我们需要关注它的调用端`front-end`服务。

1. 创建新服务orders-v2
2. `front-end`依赖服务orders-v2
3. 配置网络治理插件，将orders-v2的访问域名设置与旧版orders服务一致，同时设置10%流量到新服务。
4. 重复进行第3步，直到流量100%切换到orders-v2
5. 关闭或删除旧版orders服务

当前的不足，恢复发布缺乏全局的控制，人工参与过多。后续的版本我们将灰度发布和A/B测试流程话控制。全局一致性控制保证。

### 服务持续继承构建
 TODO
### 服务备份
 TODO







