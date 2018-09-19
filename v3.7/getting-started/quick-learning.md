---
title: 快速上手
summary: 云帮简介
toc: true
toc_not_nested: true
asciicast: true
---
<div id="toc"></div>

## 简介

当你读到这篇文章的时候，相信你已经在自己的努力下成功安装了Rainbond平台。新鲜劲儿会持续一会，直到你发现除了在平台上点点点，好像也没有什么别的事情可以做了。事实果然如此么？当然不是，我们很懂你想要什么，你想要 **把自己的业务搬上Rainbond！** 

Rainbond作为无服务器PaaS平台，它的终极目标就是帮助企业将原有的业务搬上容器云，实现传统架构难以达成的效果，比如业务的快速扩张与复制。什么？你还没有将你的业务容器化？别担心，经过调查，我们的大多数用户在使用Rainbond之前，都使用了传统架构。在这方面，好雨科技的工程师们拥有很丰富的经验。只要你有源码，我们就帮你跨过容器化--“跑步进入共产主义”。

但这种直接把“一盘大餐”放在大家面前的方式并不好。我们希望更多的人知道Rainbond、了解Rainbnod、使用Rainbond，那么学会将源码转化为应用，运行起来就是必学的一课。**授人以鱼，不如授人以渔** ，这篇文章的主旨，就是教会你如何通过业务的源码部署一个应用，并通过伸缩、分享等操作，体会到Rainbond为你提供的灵活性，便捷性，让你看到Rainbond即将为你带来的商业价值。

**JAVA** 作为一门十分流行的计算机编程语言，自1995年面世以来，热度就居高不下。像阿里巴巴这样的大厂，产品大量的使用了java代码。由java衍生出来的 spring boot、spring cloud更是用户满天下。虽说真实的生产环境肯定会有更多的语言选择，甚至可以多种语言混合开发，但JAVA语言大规模的使用率，决定了本文将会以一个由JAVA语言开发的 spring boot 结合 mysql的主流示例应用入手，从头到尾讲解一番，带你玩转Rainbond。

话不多说，先给出源码地址：https://github.com/goodrain-apps/spring-boot-mysql-demo.git

## 1、团队、用户与角色

首次登陆Rainbond，需要跟随引导注册用户、新建团队以及选择数据中心。当这一切就绪之后，就来到了Rainbond平台的操作界面。

> 有关Rainbond对于团队、用户、角色这三个概念的描述与管理，以及对于用户权限的划分，请参见[团队管理](/docs/v3.6/basic-operation/manage-your-team.html)。



## 2、构建数据库

这个示例需要一个mysql来支持它，我们先搭建一个mysql。[通过应用市场部署应用](/docs/stable/user-manual/create-an-app.html#part-20711a7043c59485)是基于Rainbond应用市场的一种创建方式，在应用市场里，好雨科技官方已经提供了多个版本的mysql应用，可以在用户同步市场之后，直接安装。

> 安装时记得新建一个[应用组](/docs/stable/user-manual/app-manage/app-group.html)，在后文中的分享应用的过程中，这将十分必要。

- **安装mysql**：

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/delpoy-mysql.gif" width="100%"/>


- **端口对内服务**：

  在`mysql`控制台界面，选择端口选项卡，配置对内服务开放。这实际上体现了Rainbond内部的 **服务注册** 机制。这一系列操作将使得`mysql`可以被平台内其他的应用所依赖。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/service-inside.png" width="100%"/>

细心的人会发现，`mysql`应用所提供的访问地址是`127.0.0.1:3306`这个本地地址，并没有指明自身实际的IP，这样的连接方式如何能够让对方访问到自己呢？答案会在源码构建完成后的 **服务依赖** 部分揭晓。

> 深入了解请参见[服务注册](/docs/v3.6/microservice/service-mesh/regist.html)



##3、源码构建

Rainbond在执行源码构建的时候，源码需要遵循一定的规范。就本文使用的JAVA示例代码而言，需要遵循[JAVA代码规范](https://www.rainbond.com/docs/stable/user-manual/language-support/java.html)。细心的人会发现，Rainbond所需要遵循的规范与传统代码形式基本没有冲突，大多数的源码仅需要做出很小的改动，甚至不需要改动即可被Rainbond接纳。

> Rainbond还支持这些语言：[Dockerfile](/docs/stable/user-manual/language-support/dockerfile.html)、[PHP](/docs/stable/user-manual/language-support/php.html)、[Python](/docs/stable/user-manual/language-support/python.html)、[Node.Js](/docs/stable/user-manual/language-support/nodejs.html)、[Ruby](/docs/stable/user-manual/language-support/ruby.html)、[Golang](/docs/stable/user-manual/language-support/golang.html)、[Html](/docs/stable/user-manual/language-support/html.html)、[.NetCore](/docs/stable/user-manual/language-support/netcore.html) 

- **构建spring boot**

除了填写 `应用名称、` `应用组、` `GIT地址、` `代码分支` 四项基本信息外，在 `高级设置` 过程中，分别操作了 `端口对外服务、` `服务依赖、` `确认部署属性、` `分配内存` 。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/delpoy-demo.gif" width="100%"/>

- **端口对外服务**：

区别于`mysql`应用端口对内服务，对外服务开放了应用对外部访问的入口。基于http协议开放的对外服务端口，将提供一个基于域名的访问方式，而基于其它协议开放的对外服务端口，提供的则是`IP:PORT` 的访问方式。当你的应用需要被平台以外的用户或服务访问，请在这里配置。

- **服务依赖**：

在高级设置的过程中，选择添加依赖，可以发现已经注册了服务的`mysql`应用，这实际体现了Rainbond内部的 **服务发现** 机制。服务注册与发现机制结合起来，可以实现平台上各应用相互关联，对于当前示例而言，就是实现了`spring boot` 关联 `mysql` 数据库服务。 

回答之前的疑问，`spring boot`如何通过`127.0.0.1:3306`来访问`mysql`呢？是因为Rainbond在内部实现了一层代理机制，这一层机制可以让 `spring boot` 通过自身代理连接到`mysql`的实际IP。了解 docker 的用户一定知道，每更新一次容器，IP都会重新分配一次。代理机制使得这种动态IP对用户透明，无论IP如何变化，`spring boot` 需要访问的只是自身的代理，剩下的事情，代理会自动完成。

> 深入了解请参见[服务发现](/docs/v3.6/microservice/service-mesh/discover.html) 

 - **确认部署属性**：

Rainbond针对有状态、无状态的服务，部署使用的资源并不一样。我们为初级使用者提供了基于服务类型的划分指导——无状态服务（包括WEB类、API类）有状态服务（包括DB类、集群类、消息中间件类、数据类）。

> 想要深入了解二者的区别，请参见[ReplicationController](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/)与 [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)。

- **设置内存**：

部署过程中设置的内存，是分配给应用后端每个实例的最大内存，该内存数值由应用本身决定。如果分配的太小，会引起应用启动失败。如果希望得知应用运行时使用真实内存的大小，可以在 **伸缩** 选项卡中查看。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/mem-set.png" width="100%"/>

- **设置连接信息**：

  在添加依赖这个过程中，我们还需要关注一些特殊的配置，我们需要保证在依赖关系确立后，`spring boot` 可以正确的获得 ` mysql` 的连接信息。这就涉及到了Rainbond中，环境变量的设置方法。

  如果你仔细的研究了示例源码，会发现其中有一些技巧——**环境变量**的引入。在配置一些参数的时候，比如jdbc的连接信息，我们可以将其设置为环境变量，这种操作十分明智。在我们更换了数据库的连接信息之后，不再需要更改源码，只需要更换环境变量，即可实现连接信息的**动态配置**。

> 进一步了解Rainbond对环境变量的支持，请参见[高级环境变量配置](/docs/v3.7/user-manual/app-manage/app-env.html)

- 代码示例：

  [spring-boot-mysql-demo](https://github.com/goodrain-apps/spring-boot-mysql-demo)/[src](https://github.com/goodrain-apps/spring-boot-mysql-demo/tree/master/src)/[main](https://github.com/goodrain-apps/spring-boot-mysql-demo/tree/master/src/main)/[resources](https://github.com/goodrain-apps/spring-boot-mysql-demo/tree/master/src/main/resources)/**application.properties**

```bash
# Database Config
# Un-comment these lines to connect to a database. When commented out, you automatically get an in-memory-database.
#spring.jpa.hibernate.ddl-auto=update

spring.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/demo?createDatabaseIfNotExist=true
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASS}
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.maxActive=10
spring.datasource.maxIdle=5
spring.datasource.minIdle=2
spring.datasource.initialSize=5
spring.datasource.removeAbandoned=true
```
看过了这段示例代码，你一定在想，如何能够动态的注入这些环境变量呢？在Rainbond平台上，这并不困难，Rainbond大量使用环境变量来配置应用，甚至可以将A应用的环境变量，注入到B应用中。乍听起来，这句话让人有些摸不到头脑。那么我接下来的讲解会让你对Rainbond平台上环境变量的使用更加了然。

> 代码的写法还有一些更高级的技巧——环境变量搭配默认值，形如 `${MYSQL_PORT:-3306}`  ,在环境变量`${MYSQL_PORT}`不存在时，将使用3306作为默认值使用。

首先让我们关注示例中 `mysql` 应用的一处配置：

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/link-info.png" width="100%"/>


可以看到，在应用连接信息这一栏中，可以添加一些环境变量。这些环境变量的值规定了`mysql`的连接信息。当`spring boot` 这个应用依赖于 `mysql` 应用时，`mysql`应用会将这些环境变量注入到 `spring boot` 应用的环境中，`spring boot`就可以读取`mysql`的连接信息。当我们希望给`spring boot`更换一个数据库的时候，只需要将当前依赖关系取消，重新依赖于另一个数据库，环境变量将自动更新为新数据库的连接信息。

- **自定义环境变量**：

设想一种场景：`spring boot` 所需要的 `mysql` 并没有部署在Rainbond平台上，而是以一种传统的方式部署在与Rainbond同一网络环境下的某台服务器上。要如何使 `spring boot` 正确访问到 `mysql` 呢？答案依然是环境变量。Rainbond除了提供通过依赖将变量注入的方式之外，还提供了应用设置自身环境变量的功能。假定 `mysql` 服务器提供的访问连接信息为：

| 变量名     | 变量值      |
| :--------: | :---------: |
| MYSQL_HOST | 192.168.1.2 |
| MYSQL_PORT | 33061 |
| MYSQL_USER | root        |
| MYSQL_PASS | 123456      |

那么我们可以为` spring boot` 做如下设置：

点击 `设置` ，在 `自定义环境变量` 处填写：

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/env-set.png" width="100%"/>


重启应用后，这些环境变量将被注入到 `spring boot` ，供其调取使用。

这种以环境变量动态的更改应用配置的方式，被Rainbond发挥的淋漓尽致。一个应用所有的配置信息，都可以使用环境变量来配置。


> 应用部署完毕后，有很多功能可以尝试操作一下。
>
> 请参考[应用管理](/docs/stable/user-manual/app-manage/app-ctl.html)来深入了解下Rainbond如何管理应用。

> 以下链接可以帮助作为读者的你解决很多实际问题：
>
> 这次构建没有成功？别着急，你可以了解下[常见问题排查](/docs/stable/user-manual/trouble-shooting/build-app-issue.html)。
>
> 如果你觉得，平台默认生成的访问域名太难记，那么请[自定义应用域名](/docs/stable/user-manual/custom-app-domain.html)。
>
> 如果你的源码来自于私有的git仓库，Rainbond提供了[对接私有Git仓库 ](/docs/stable/best-practice/ci-cd/connection-git-server.html)的功能。
>
> 很多企业内部搭建了自有的maven仓库，Rainbond提供了[对接MAVEN仓库](/docs/stable/best-practice/ci-cd/connection-maven-repository.html)的功能。
>
> 而针对已经拥有Jenkins这种CI工具的用户，Rainbond提供了[对接Jenkins](/docs/stable/best-practice/ci-cd/connection-jenkins.html)的功能。



## 4、分享应用

现在，我们已经拥有了一个部署完成、正在运行的JAVA示例，这可以象征性的认为是一套基于普通JAVA源码的业务已经被搬上了Rainbond。但这就够了么？这款PaaS平台给你带来的只有这么多么？相信我，把业务搬上Rainbond仅仅是个开始。在这一节，让我教你如何将业务变成一个可以快速部署出来的应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/app-share.gif" width="100%"/>


在分享这个过程中，除了输入 `应用名` 等描述信息之外，需要关注如下几点：

- **分享范围**：

  分享范围影响了应用分享完成后的可见性，**团队、** **公司、** **好雨公有云市** 分别对应了 同一团队可见、同一数据中心可见以及全云市可见（需要审核）。

- **应用配置信息**：

  应用配置信息中，配置了应用分享完成后，各个组件需要继承的关键属性，包括连接信息、伸缩规则。

经过一番操作，之前部署好的JAVA示例应用就被分享到了当前团队的应用市场中。**我们十分期待用户将应用分享到好雨公有云市中去** 。接下来，就可以从应用市场一件部署整个应用了。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/app-install.gif" width="100%"/>


示例应用只包含了两个组件，这样的操作或许并不能体现出足够的优越性，

请设想一个场景：用户的系统是一套由20个应用组合而成的微服务架构。那么这套架构如何快速复制与部署就会是一个很严肃的问题。如果用户使用了Rainbond来部署这一套微服务架构，那么 **分享应用** 功能会使得快速复制与部署不再是个问题。如何统一管理这20个应用，实现对微服务架构的网络治理，也是一个值得深入探讨的话题，这将在另一篇文章中详细阐述。

## 结语

回想下我们的题目 **《关于Rainbond，你一定关心的事》，** 这篇文章从头到尾解决了一个问题：原有业务如何通过源码部署到Rainbond，并且快速的复制出来。 我相信这是绝大多数初次接触Rainbond的人都会关心的事情。然而Rainbond能做的事情远远不止于此，我们希望通过一系列的文章让读者了解Rainbond面向不同方向的功能。本文是这系列文章的第一篇。

写这篇文章的目的，是希望读到它的人能够迅速上手Rainbond，并将自己的业务迁移上去，甚至对于一些企业级用户，完全可以凭借这篇文章完成一个初级的POC测试。为了使它通俗易懂，全篇使用了比较日常化的语言，并结合了大量的动图，尽量以实操的方式帮助读者真正的将Rainbond玩起来，玩得转。如果你还有更好的方式，请随时联系我们，不管是微信群、QQ群、还是我们的社区、Github，Rainbond始终等候你的到来。
