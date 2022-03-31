---
title: 在Rainbond中实现数据库结构自动化升级
description: 在Rainbond中实现数据库结构自动化升级
slug: MysqlSchema
# authors: QiZhang
---

:::info
[Rainbond](https://www.rainbond.com) 这款产品一直致力于打通企业应用交付的全流程，这个流程中不可或缺的一环是企业应用的不断升级、迭代。Rainbond 特有的能力，是可以将囊括多个服务组件的企业应用系统进行打包，并执行一键安装、升级以及回滚的操作。上述的内容仅仅解决了应用程序本身的版本控制问题。企业应用的升级迭代流程想要完全实现自动化，还需要能够自动处理数据库表结构（Schema）的版本控制。经过不断的探索，Rainbond 首先在源码构建领域借助业界领先的 [Liquibase](https://www.liquibase.com/) 集成了云原生时代的数据库 Schema 版本管理的能力。
:::

<!--truncate-->


## Schema版本管理难题

数据库表结构（Schema）定义了数据表（Table）的名字，以及每一个数据表中所包含的数据列（Column）的名字、属性等信息。它描述了一个数据库所拥有的框架，记录在数据库中的数据都需要遵循 Schema 里的定义。

区别于应用程序自身的升级，Schema 版本管理问题，本质上是一种持久化数据的升级，这一特征伴随着两个疑问：

- 持久化数据如何升级：云原生时代的交付，已经无法跳脱出容器化、平台化的特征。各大云原生平台在进行软件交付过程中，都不会轻易将持久化数据纳入版本控制体系中去。原因很简单，每个交付环境中的数据都是不同的，升级过程中很难抉择持久化数据的统一版本管理方案。
- 哪些持久化数据需要升级：既然难以抉择持久化数据的统一版本管理方案，那么退而求其次，是否可以优先选择必要的持久化数据进行版本管理。缩小范围之后，就突出了数据库表结构这一特殊持久化数据类型。其版本管理的必要性是显而易见的，应用程序本身从V1版本升级到了V2版本，那么对应的数据库表结构也需要增加必要的新表、新列。

这两个疑问引出了本文的主旨：在企业级软件交付领域，**如何合理的在每次升级的过程中处理数据库表结构（Schema）的版本控制？**

传统软件交付领域，在 Schema 版本管理方面有两种主流的解决方案：

- 人工处理：这是最基础的 Schema 版本管理方式。现场交付人员不仅需要处理应用程序的升级流程，也直接操作数据库，完成 Schema 的升级。这种方法最直接，但是无法自动化处理的流程都具有一些通病：低效、易错。
- 代码处理：这是一种进阶的方式。通过在应用程序内部引入第三方库，来进行 Schema 的版本管理。这一操作已经可以免除交付现场的人工处理流程，交付人员只需要将应用程序进行更新，程序本身会连接到数据库，对 Schema 作出自动化的变更。这种方式的自动化程度已经可以满足要求，但是也具有引入第三方库的通病：技术成本提升、侵入性、与语言或框架绑定。



## 云原生时代的解决思路

云原生时代，应用程序的使用者、交付者都希望通过所选用的平台来赋能自己的应用程序。在本文探讨的领域中，这种期待可以具体的描述为：借助平台能力，以无侵入的方式，将 Schema 版本管理能力赋予应用，使得应用在进行一键升级时， Schema 也自动完成升级。

Rainbond 作为一款云原生应用管理平台，也在不断探索为应用赋能之道。在 Schema 版本管理领域，实现了在源码构建过程中集成 Schema 版本管理的能力。应用本身不需要改动任何代码，仅仅需要将两种类型的文件放进代码根目录下的指定目录下即可。这两种文件分别是：定义了数据库实例连接地址的配置文件，升级 Schema 所使用的 Sql 脚本文件。



## 关于源码构建

源码构建功能，本身就是一种 Rainbond 对应用的赋能。云原生时代，应用都在向容器化的方向迈进。容器化的过程中看似无法免除 Dockerfile 的编写，实则不然。源码构建功能可以直接对接源代码，将其编译成为可运行的容器镜像。整个过程不需要开发人员的介入，提供代码仓库地址即可，极大的降低了开发人员的技术负担。

在源码构建的流程中，以无侵入的方式集成了很多能力。比如通过纳入 Pinpoint-agent 的方式集成 APM 能力。再比如通过纳入 jmx-exporter 的方式集成自定义业务监控能力。今天重点描述的，是通过纳入 Liquibase 的方式，集成 Schema 版本控制能力。



## 关于Liquibase

Liquibase 是一款专门用于数据库表结构版本控制的 CI/CD 工具。从 2006 年开始，Liquibase 团队一直致力于让数据库变更管理更简单，尤其是在敏捷软件开发领域。这一工具基于 Apache 2.0 协议开源。

经过长期的迭代，Liquibase 已经非常成熟可靠，通过 sql、yaml、xml、json 在内的多种文件格式，开发人员可以快速的定义出符合 Liquibase 风格的数据库表结构变更文件，这种文件被称之为 changelog。基于 changelog 中的定义，Liquibase 可以非常方便的在多个变更操作版本之间升级与回滚。

Liquibase 提供多种方式供开发人员交互，包括一种通用的命令行操作模式，源码构建通过命令行形式集成 Liquibase 的 Schema 版本管理能力。



## 代码定义的Schema版本控制能力

Rainbond 源码构建推崇代码定义各种能力。对于 Schema 版本控制能力而言，也是通过代码仓库中的指定文件来定义的，我们可以简要的称之为 Schema As Code，这种代码定义能力的实践，要求每一次 CI 工作都由一个代码仓库地址开始，比如 Git。对于每一个数据库实例来说，通过指定目录下的配置文件和 changelog 来定义数据库表结构版本。默认情况下，是指代码根目录下的 `Schema`目录。

下面是一个代码结构示例，Rainbond 官方同时提供了一份完整的代码示例 **[java-maven-demo](https://gitee.com/rainbond/java-maven-demo)** :

```bash
.
├── Procfile
├── README.md
├── Schema
│   ├── changelog.sql       # 定义数据库表结构
│   └── mysql.properties    # 定义数据库实例连接信息
├── pom.xml
└── src
```

`Schema` 目录下的 `mysql.properties` 和 `changlog.sql`文件定义了如何进行 Schema 版本控制。

`mysql.properties` 定义了数据库实例的连接方式，以及所引用的 `changelog` 文件地址。

```bash
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?createDatabaseIfNotExist=true&characterEncoding=utf8
username=${MYSQL_USER}
password=${MYSQL_PASSWORD}
changeLogFile=changelog.sql
```

最简化定义项包括：

- driver：指定使用的 jdbc 驱动，源码构建中集成的驱动支持mysql、mariadb、mssql、mongo、postgresql、sqlite等常见类型数据库。
- url：定义数据库连接地址，可以通过 jdbc 的标准写法来预创数据库实例。
- username&password：定义数据库实例的登录凭据。
- changeLogFile：定义该数据库实例表结构变更文件的路径。

源码构建过程中，会遍历识别 `Schema` 目录下的所有 `properties` 文件，并在启动时处理每一个数据库实例的 Schema 版本控制流程。通过配置文件的组合，在以下各种常见场景中都可以很好的工作。

- 单个数据库实例
- 多个相同类型数据库实例，比如应用同时连接了多个 mysql
- 多个不同类型数据库实例，比如应用同时连接了mysql、mongo
- 同个数据库中的多个数据库实例，比如应用同时使用同个 mysql 中的多个库实例



## changlog 的最佳实践

`changelog` 文件，是管理 Schema 的关键所在。以下是一个示例：

```sql
-- liquibase formatted sql
-- changeset guox.goodrain:1
create table person (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback drop table person;
-- changeset guox.goodrain:2
create table company (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback drop table company;
```

推荐使用 sql 类型的 `changelog` 文件来定义 Schema 版本，因为这最符合开发人员的习惯。

`changlog` 文件通过注释来定义一些行为。常见如下：

```
# 定义 changelog 文件的格式，这是每一个 changelog 文件的开头项
-- liquibase formatted sql 
# 定义变更集，后面跟随的，是开发人员姓名，以及变更集的序号，这个序号很重要，建议使用有序数字来定义
-- changeset guox.goodrain:1
# 定义回滚操作，每一个变更集都应该定义与之对应的回滚操作，这使得在变更出现问题时，快速回滚到指定版本的变更集
-- rollback drop table staff;
```

Liquibase 官方提出了一系列的最佳实践，有一些最佳实践应该作为开发人员的默认行为。

- 每个变更集仅包含一个变更，通过细化数据库表结构的变更版本，这可以防止失败的自动提交语句使数据库处于意外状态。
- changeset 的 ID，选择有序且独一无二的数列，或者对开发者友好的名字。
- 让版本永远可回滚，为每一个 changeset 设置合理的回滚操作。

有关于  `mysql.properties` 和 `changlog.sql` 文件的写法，更多的特性请参考 [liquibase 文档](https://docs.liquibase.com/) ，这些特性都可以被源码构建所继承。



## Schema生命周期流程

### 1. 构建流程

执行正常的源码构建流程时，会自动识别代码根目录下的 `Schema` 目录，准备 Schema 版本管理所需要的基础环境，包括 jre 和 Liquibase 工具包。

构建日志会有以下提示：

![](https://static.goodrain.com/wechat/database-Schema/one.png)

### 2. 启动流程

完成构建流程后，服务组件会自动进入启动过程中， Rainbond 平台会根据代码中定义好的配置文件，针对每一个数据库实例，进行自动升级处理。

处理过程中，在服务组件的日志中的头部位置，会打印相关的记录：

![](https://static.goodrain.com/wechat/database-Schema/two.png)

上图中演示了针对同一个 mysql 数据库中的多个库实例进行表结构的升级操作。对于空的库实例而言，这也相当于一次初始化的操作。

在示例中，Rainbond 分别向应用所连接的同个 mysql 数据库中的两个库实例（分别名为 `Initialize` `anotherdb`）进行了表结构初始化操作，分别创建了表`company` 、`person` 以及 `another_company` 、`another_person`。在数据库组件的 Web终端登录后，可以验证：

![](https://static.goodrain.com/wechat/database-Schema/there.png)

### 3. 发布到组件库

Rainbond 特有的发布机制，可以将业务组件和数据库组件统一发布为一个应用模版。方便在不同的环境中一键安装交付。通过应用模版交付的应用，依然具有 Schema 版本控制的能力。全新安装的应用模版，其数据库也会被初始化为上述状态。在这里，我们称发布的应用为源应用，由应用模版安装而来的应用为已交付应用。

![](https://static.goodrain.com/wechat/database-Schema/four.png)

### 4. 代码更新

当开发人员持续迭代业务系统的时候，Schema 也随之改动，假定新版本的业务系统，要求 `Initialize`  新增表 `staff`，并为已有的 `person` 表添加一个新的列 `country`。那么开发人员应该为对应的 `changelog.sql` 文件新增以下内容，并和新的业务代码一并提交，保证业务代码和 Schema 保持一致。

```sql
-- changeset other.goodrain:3
alter table person add column country varchar(2);
create table staff (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback drop table staff;
-- rollback alter table person drop column country;
```

在源应用处点击构建，Rainbond 会拉取最新的代码，更新业务应用的同时，为 Schema 进行升级。

构建过程中没有任何变化，但是在启动过程中，针对更新的 `Initialize` 和保持原状的 `anotherdb` 库实例，Rainbond 给出两种不同的处理：

![](https://static.goodrain.com/wechat/database-Schema/five.png)

### 5. 基于应用模版的升级

源应用有了新的版本，已交付应用也应随之有变更。首先，应用模版需要有一个更新的版本，重复发布流程，定义更高的版本号即可。已交付应用可以根据 Rainbond 的提示，一键升级到更新后的版本。

![](https://static.goodrain.com/wechat/database-Schema/six.png)

### 6. 验证

登录已交付应用的数据库组件中，可以查看对应的 Schema 变化。

![](https://static.goodrain.com/wechat/database-Schema/seven.png)

### 7. 回滚

数据库表结构的回滚操作是一个很严肃的问题。本着数据库表结构只增不减的原则，已经生效的 Schema 不会随着已交付应用的一键回滚而有任何变动。如果一定要进行回滚，则需要运维人员登录业务组件的 Web终端手动操作。

需要注意的是回滚的顺序：数据库表结构应该先于应用程序回滚。这是由于一旦应用程序回滚完成， changlog 文件本身也回滚到了上个版本，无法再进行数据库表结构的回滚。

执行以下命令，可以根据指定的配置文件，对数据库表结构进行回滚操作，回滚幅度以 1 个 changeset 为单位。

```bash
cd Schema/
liquibase rollbackCount 1 --defaults-file=mysql.properties
```

鉴于回滚后的业务组件一旦重启或更新，就会比对 changelog 文件后重新升级 Schema，所以在执行回滚操作后，务必添加环境变量 `ALLOW_SCHEMA_UPDATE=false` 来禁用 Schema 版本管理控制功能，直到新版本应用模版的升级。



## 常见问题

1. 如何在 `*.properties` 配置文件中合理的定义所有数据库实例的连接地址和凭据？

> 使用环境变量来代替  `*.properties` 配置文件中的数据路实例连接地址和凭据信息，定义方式详见文中的示例。Rainbond 源码构建过程中，会拾取运行环境中的所有环境变量，对目标配置文件进行渲染，所以对于环境变量的命名并不重要，只需要保证定义的环境变量会在最终交付环境中生成即可。无论环境变量来自于自定义的环境配置还是 Rainbond 独有的连接信息机制。

2. 执行回滚操作失败？

> 回滚如何操作，定义在 changlog 文件中。务必保证每一个 changeset 都有对应的回滚策略，方可保证每次回滚都得到正确的结果。

3. 执行 Schema 升级的过程中报错：`!! Failed to check the database status. Check /app/Schema/xxx.properties.log`

> 每一次执行 Schema 变更的过程中，都会先进行检查，包括数据库实例地址的连通性、changelog 文件的可执行性。如果检查不通过，则不会对数据库作出任何操作，但是检查的结果会记录在日志文件中，可以登录 Web 终端，查看提示中的日志文件内容。

4. 老用户如何获取 Schema 版本控制功能？

> 这一功能和 Rainbond 的版本脱离，所以老用户可以通过更新源码构建相关组件来获取这一能力。执行以下一组命令即可：
>
> ```bash
> # 以下命令在 Rainbond 集群内任意节点执行；如果你使用 dind-allinone 版本，则应该在 rainbond-allinone 容器中执行
> hubpassword=$(kubectl get rainbondcluster -o yaml -n rbd-system | grep password | awk '{print $2}')
> docker login --username=admin --password=${hubpassword} goodrain.me
> images=(builder runner)
> for image in ${images[@]}
>   do
>     docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/${image}:v5.5.0-release
>     docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/${image}:v5.5.0-release goodrain.me/${image}
>     docker push goodrain.me/${image}
>   done
> ```



## References Link

**Liquibase**  https://www.liquibase.com

**java-maven-demo**  https://gitee.com/rainbond/java-maven-demo
