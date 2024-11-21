---
title: Automatic upgrade of database structure in Rainbond
description: Rainbond of this product has been committed to interfacing the entire process of enterprise delivery, an indispensable part of which is the continuous upgrading and iterating of the enterprise's applications
slug: MysqlSchema
image: https://static.goodrain.com/wechat/schema/schema.png
---

:::info [Rainbond](https://www.rainbond.com) is a product that has been committed to opening up the entire process of enterprise application delivery. An indispensable part of this process is the continuous upgrading and iteration of enterprise applications.The unique ability of Rainbond is to package enterprise application systems including multiple service components, and perform one-click installation, upgrade and rollback operations.The above only solves the versioning problem of the application itself.To fully automate the upgrade iteration process of enterprise applications, it is also necessary to automatically handle the version control of the database table structure (Schema).After continuous exploration, Rainbond first integrated the ability of database schema version management in the cloud native era with the industry-leading [Liquibase](https://www.liquibase.com/) in the field of source code construction. :::Rainbond unique ability is to package enterprise applications that include multiple service components, and perform one-click installation, upgrade, and roller operations.The above content only solves version control problems of the application itself.The upgrade iterations process for enterprise applications needs to be able to process version control automatically from the database table structure (Schema) in order to be fully automated.As a result of ongoing exploration, Rainbond first integrated the capability of cloud era database schema version management with industry leading [Liquibase](https://www.liquibase.com/) in the source construction field.

<!--truncate-->

## Schema version management challenges

The database table structure (Schema) defines the name of the data table (Table), as well as the names, attributes and other information of the data column (Column) contained in each data table.It describes the framework owned by a database, and the data recorded in the database needs to follow the definition in the Schema.它描述了一个数据库所拥有的框架，记录在数据库中的数据都需要遵循 Schema 里的定义。

Different from the upgrade of the application itself, the problem of schema version management is essentially an upgrade of persistent data. This feature is accompanied by two questions：

- 持久化数据如何升级：云原生时代的交付，已经无法跳脱出容器化、平台化的特征。各大云原生平台在进行软件交付过程中，都不会轻易将持久化数据纳入版本控制体系中去。原因很简单，每个交付环境中的数据都是不同的，升级过程中很难抉择持久化数据的统一版本管理方案。
- 哪些持久化数据需要升级：既然难以抉择持久化数据的统一版本管理方案，那么退而求其次，是否可以优先选择必要的持久化数据进行版本管理。缩小范围之后，就突出了数据库表结构这一特殊持久化数据类型。Which persistent data needs to be upgraded：Since it is difficult to choose a unified version management solution for persistent data, the next best thing is to choose the necessary persistent data for version management.After narrowing the scope, the special persistent data type of the database table structure is highlighted.The necessity of its version management is obvious. The application itself has been upgraded from the V1 version to the V2 version, so the corresponding database table structure also needs to add necessary new tables and new columns.

These two questions lead to the main theme of this article：1. In the field of enterprise software delivery,**How to reasonably handle the version control of the database table structure (Schema) in the process of each upgrade?**\*\*

In the traditional software delivery field, there are two mainstream solutions for：version management0

- 人工处理：这是最基础的 Schema 版本管理方式。Manual processing：This is the most basic Schema version management method.On-site delivery personnel not only need to handle the application upgrade process, but also directly operate the database to complete the schema upgrade.This method is the most direct, but processes that cannot be automated have some common problems：inefficiency and error-prone.这种方法最直接，但是无法自动化处理的流程都具有一些通病：低效、易错。
- 代码处理：这是一种进阶的方式。通过在应用程序内部引入第三方库，来进行 Schema 的版本管理。这一操作已经可以免除交付现场的人工处理流程，交付人员只需要将应用程序进行更新，程序本身会连接到数据库，对 Schema 作出自动化的变更。这种方式的自动化程度已经可以满足要求，但是也具有引入第三方库的通病：技术成本提升、侵入性、与语言或框架绑定。

## Solutions in the cloud-native era

云原生时代，应用程序的使用者、交付者都希望通过所选用的平台来赋能自己的应用程序。In the cloud-native era, both application users and deliverers hope to empower their applications through the platform they choose.In the field discussed in this article, this expectation can be specifically described as：With the help of platform capabilities, the Schema version management capability is given to the application in a non-intrusive way, so that when the application performs a one-key upgrade, the Schema is also automatically upgraded.

Rainbond 作为一款云原生应用管理平台，也在不断探索为应用赋能之道。在 Schema 版本管理领域，实现了在源码构建过程中集成 Schema 版本管理的能力。应用本身不需要改动任何代码，仅仅需要将两种类型的文件放进代码根目录下的指定目录下即可。这两种文件分别是：定义了数据库实例连接地址的配置文件，升级 Schema 所使用的 Sql 脚本文件。

## About source code building

源码构建功能，本身就是一种 Rainbond 对应用的赋能。云原生时代，应用都在向容器化的方向迈进。容器化的过程中看似无法免除 Dockerfile 的编写，实则不然。源码构建功能可以直接对接源代码，将其编译成为可运行的容器镜像。整个过程不需要开发人员的介入，提供代码仓库地址即可，极大的降低了开发人员的技术负担。

在源码构建的流程中，以无侵入的方式集成了很多能力。比如通过纳入 Pinpoint-agent 的方式集成 APM 能力。再比如通过纳入 jmx-exporter 的方式集成自定义业务监控能力。今天重点描述的，是通过纳入 Liquibase 的方式，集成 Schema 版本控制能力。

## About Liquibase

Liquibase is a CI/CD tool dedicated to version control of database table structures.Since 2006, the Liquibase team has been working on making database change management easier, especially in the field of agile software development.This tool is open sourced under the Apache 2.0 protocol.从 2006 年开始，Liquibase 团队一直致力于让数据库变更管理更简单，尤其是在敏捷软件开发领域。这一工具基于 Apache 2.0 协议开源。

After a long period of iteration, Liquibase has become very mature and reliable. Through various file formats including sql, yaml, xml, and json, developers can quickly define a database table structure change file that conforms to the Liquibase style. This kind of file is called for changelog.Based on the definitions in the changelog, Liquibase can easily upgrade and rollback between multiple change operation versions.基于 changelog 中的定义，Liquibase 可以非常方便的在多个变更操作版本之间升级与回滚。

Liquibase provides a variety of ways for developers to interact, including a common command line operation mode, and source code construction integrates Liquibase's Schema version management capabilities through the command line.

## Schema versioning capability for code definitions

Rainbond 源码构建推崇代码定义各种能力。Rainbond source code builds honor code to define various capabilities.For the Schema version control capability, it is also defined by the specified files in the code repository, which we can briefly call Schema As Code. The practice of this code definition capability requires that each CI work be assigned a code repository address. Start, like Git.For each database instance, the database table structure version is defined by specifying the configuration file and changelog in the directory.By default, it refers to the `Schema`directory under the code root.对于每一个数据库实例来说，通过指定目录下的配置文件和 changelog 来定义数据库表结构版本。默认情况下，是指代码根目录下的 `Schema`目录。

The following is an example of the code structure, and Rainbond officially provides a complete code example **[java-maven-demo](https://gitee.com/rainbond/java-maven-demo)**:

```bash
.
├── Procfile
├── README.md
├── Schema
│ ├── changelog.sql # Define database table structure
│ └── mysql.properties # Define database instance connection information
├── pom .xml
└── src
```

`The <code>mysql.properties` and `changlog.sql`files in the Schema directory define how schema versioning is performed.

`mysql.properties` defines the connection method of the database instance, and the referenced `changelog` file address.

```bash
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?createDatabaseIfNotExist=true&characterEncoding=utf8
username=${MYSQL_USER}
password=${MYSQL_PASSWORD}
changeLogFile=changelog.sql
```

The minimal definition term includes：

- Driver：specifies the jdbc driver to be used. The driver integrated in the source code construction supports common types of databases such as mysql, mariadb, mssql, mongo, postgresql, and sqlite.
- url：defines the database connection address, which can be used to pre-create a database instance through the standard writing of jdbc.
- username&password：defines the login credentials for the database instance.
- changeLogFile：defines the path to the table structure change file for this database instance.

During the source code construction process, all `properties` files in the `Schema` directory will be traversed and identified, and the Schema version control process of each database instance will be processed at startup.Through the combination of configuration files, it can work well in the following common scenarios.通过配置文件的组合，在以下各种常见场景中都可以很好的工作。

- single database instance
- Multiple database instances of the same type, such as applications connecting multiple mysql at the same time
- Multiple database instances of different types, such as applications connected to mysql and mongo at the same time
- Multiple database instances in the same database, such as applications using multiple database instances in the same mysql at the same time

## Best practices for changlog

`changelog` file is the key to managing Schema.Here is an example：以下是一个示例：

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
address1 varchar(50) ,
address2 varchar(50),
city varchar(30)
);
-- rollback drop table company;
```

It is recommended to use a `changelog` file of type sql to define the schema version, as this is the best developer's habit.

`The changlog` file defines some behavior through comments.Common as follows：常见如下：

```
# Define the format of the changelog file, this is the beginning of each changelog file
-- liquibase formatted sql 
# Define the change set, followed by the developer's name and the serial number of the change set, this serial number is very important, it is recommended to use Ordered numbers to define
-- changeset guox.goodrain:1
# Define the rollback operation, each changeset should define the corresponding rollback operation, which makes it possible to quickly roll back to the specified version when there is a problem with the change changeset
-- rollback drop table staff;
```

Liquibase officially proposes a series of best practices, some of which should be the default behavior of developers.

- Each changeset contains only one change, and by refining the changed version of the database table structure, this prevents failed autocommit statements from leaving the database in an unexpected state.
- The ID of the changeset, select an ordered and unique array, or a developer-friendly name.
- Make the version always rollbackable, and set a reasonable rollback action for each changeset.

For the writing of  `mysql.properties` and `changlog.sql` files, please refer to [liquibase document](https://docs.liquibase.com/) for more features, these features can be inherited by source code builds.

## Schema life cycle process

### 1. Build Process

When executing the normal source code construction process, it will automatically identify the `Schema` directory under the code root directory, and prepare the basic environment required for Schema version management, including jre and Liquibase toolkits.

The build log will have the following prompt：

![](https://static.goodrain.com/wechat/database-Schema/one.png)

### 2. Start the process

After the construction process is completed, the service component will automatically enter the startup process, and the Rainbond platform will automatically upgrade each database instance according to the configuration file defined in the code.

During processing, the related record：will be printed at the header position in the log of the service component.

![](https://static.goodrain.com/wechat/database-Schema/two.png)

The above figure demonstrates the upgrade operation of the table structure for multiple database instances in the same mysql database.This is also equivalent to an initialization operation for an empty library instance.对于空的库实例而言，这也相当于一次初始化的操作。

In the example, Rainbond initializes the table structure to two database instances (named `Initialize` `anotherdb`respectively) in the same mysql database to which the application is connected, and creates tables`company` ,`person` respectively and `another_company` ,`another_person`.After logging in to the web terminal of the database component, you can verify：在数据库组件的 Web终端登录后，可以验证：

![](https://static.goodrain.com/wechat/database-Schema/there.png)

### 3. Publish to Component Repository

Rainbond's unique publishing mechanism can unify the publishing of business components and database components as an application template.Convenient one-click installation and delivery in different environments.Applications delivered through application templates still have the capability of schema version control.For a freshly installed application template, its database will also be initialized to the above state.Here, we call the published application the source application, and the application installed from the application template the delivered application.方便在不同的环境中一键安装交付。通过应用模版交付的应用，依然具有 Schema 版本控制的能力。全新安装的应用模版，其数据库也会被初始化为上述状态。在这里，我们称发布的应用为源应用，由应用模版安装而来的应用为已交付应用。

![](https://static.goodrain.com/wechat/database-Schema/four.png)

### 4. Code update

When developers continue to iterate the business system, the Schema is also changed. Assume that the new version of the business system requires `Initialize`  to add a new table `staff`, and add a new column `country to the existing <code>person` table.Then the developer should add the following content to the corresponding `changelog.sql` file, and submit it together with the new business code to ensure that the business code and Schema are consistent.那么开发人员应该为对应的 `changelog.sql` 文件新增以下内容，并和新的业务代码一并提交，保证业务代码和 Schema 保持一致。

```sql
-- changeset other.goodrain:3
alter table person add column country varchar(2);
create table staff (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar (50),
city varchar(30)
);
-- rollback drop table staff;
-- rollback alter table person drop column country;
```

Click Build at the source application, and Rainbond will pull the latest code and update the Schema while updating the business application.

Nothing has changed during the build process, but during startup Rainbond gives two different treatments for the updated `Initialize` and the `anotherdb` library instances that remain intact：

![](https://static.goodrain.com/wechat/database-Schema/five.png)

### 5. Upgrading based on application templates

源应用有了新的版本，已交付应用也应随之有变更。首先，应用模版需要有一个更新的版本，重复发布流程，定义更高的版本号即可。已交付应用可以根据 Rainbond 的提示，一键升级到更新后的版本。

![](https://static.goodrain.com/wechat/database-Schema/six.png)

### 6. Verification

Log in to the database component of the delivered application to view the corresponding schema changes.

![](https://static.goodrain.com/wechat/database-Schema/seven.png)

### 7. Rollback

The rollback operation of database table structure is a very serious problem.Based on the principle that the database table structure only increases and does not decrease, the schema that has already taken effect will not be changed with the one-click rollback of the delivered application.If the rollback must be performed, the operation and maintenance personnel need to log in to the Web terminal of the business component to perform manual operations.本着数据库表结构只增不减的原则，已经生效的 Schema 不会随着已交付应用的一键回滚而有任何变动。如果一定要进行回滚，则需要运维人员登录业务组件的 Web终端手动操作。

需要注意的是回滚的顺序：数据库表结构应该先于应用程序回滚。It should be noted that the order of rollback：database table structure should be rolled back before the application.This is because once the application rollback is completed, the changlog file itself is also rolled back to the previous version, and the database table structure cannot be rolled back.

Execute the following command to roll back the database table structure according to the specified configuration file. The rollback range is one changeset.

```bash
cd Schema/
liquibase rollbackCount 1 --defaults-file=mysql.properties
```

In view of the fact that once the rolled-back business component is restarted or updated, the schema will be re-upgraded after comparing the changelog file, so after performing the rollback operation, be sure to add the environment variable `ALLOW_SCHEMA_UPDATE=false` to disable the schema version management control function until the new Version application template upgrade.

## common problem

1. How to reasonably define the connection address and credentials of all database instances in the `*.properties` configuration file?

> Use environment variables to replace the data road instance connection address and credential information in the  `*.properties` configuration file. For the definition method, see the example in the article.During the construction of Rainbond source code, all environment variables in the running environment will be picked up and the target configuration file will be rendered, so the naming of the environment variables is not important, just make sure that the defined environment variables will be generated in the final delivery environment.Whether environment variables come from custom environment configuration or Rainbond's unique connection information mechanism.Rainbond 源码构建过程中，会拾取运行环境中的所有环境变量，对目标配置文件进行渲染，所以对于环境变量的命名并不重要，只需要保证定义的环境变量会在最终交付环境中生成即可。无论环境变量来自于自定义的环境配置还是 Rainbond 独有的连接信息机制。

2. Failed to perform rollback operation?

> 回滚如何操作，定义在 changlog 文件中。How to rollback is defined in the changlog file.Be sure to ensure that each changeset has a corresponding rollback strategy to ensure that each rollback will get the correct result.

3. Error：`!! Failed to check the database status. Check /app/Schema/xxx.properties.log`

> Every time a schema change is executed, it will be checked first, including the connectivity of the database instance address and the executable of the changelog file.If the check fails, no operation will be performed on the database, but the result of the check will be recorded in the log file. You can log in to the Web terminal to view the contents of the log file in the prompt.如果检查不通过，则不会对数据库作出任何操作，但是检查的结果会记录在日志文件中，可以登录 Web 终端，查看提示中的日志文件内容。

4. How can old users get the Schema version control function?

> This function is separated from the Rainbond version, so old users can get this ability by updating the source code to build related components.Execute the following set of commands to：执行以下一组命令即可：
>
> ```bash
> # The following commands are executed on any node in the Rainbond cluster; if you use the dind-allinone version, you should execute
> in the rainbond-allinone container hubpassword=$(kubectl get rainbondcluster -o yaml -n rbd-system | grep password | awk '{print $2}')
> docker login --username=admin --password=${hubpassword} goodrain.me
> images=(builder runner)
> for image in ${images[@]}
>   do
>     docker pull registry.cn-hangzhou.aliyuncs. com/goodrain/${image}:v5.5.0-release
>     docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/${image}:v5.5.0-release goodrain.me/${image}
>     docker push goodrain.me/${image}
>   done
> ```

## References Link

**Liquibase**  https://www.liquibase.com

**java-maven-demo**  https://gitee.com/rainbond/java-maven-demo
