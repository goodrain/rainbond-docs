---
title: Automatically upgrade database structure in Rainbod
description: Rainbond of this product has been committed to interfacing the entire process of enterprise delivery, an indispensable part of which is the continuous upgrading and iterating of the enterprise's applications
slug: MysqlSchema
image: https://static.goodrain.com/wechat/schema/schema.png
---

[Rainbond](https://www.rainbond.com) The product has been working on the entire process of enterprise app delivery, an indispensable part of which is the continuous upgrading and iteration of enterprise applications.Rainbond unique ability is to package enterprise applications that include multiple service components, and perform one-click installation, upgrade, and roller operations.The above content only solves version control problems of the application itself.The upgrade iterations process for enterprise applications needs to be able to process version control automatically from the database table structure (Schema) in order to be fully automated.As a result of ongoing exploration, Rainbond first integrated the capability of cloud era database schema version management with industry leading [Liquibase](https://www.liquibase.com/) in the source construction field.

## Schema version management puzzle

The database table structure (Schema) defines the name of the data table (Table), as well as the names and attributes of the data column (Column) contained in each table.It describes the framework that a database has in place, and all data recorded in the database need to follow the schema definition.

Differentiated from the application itself, schema version management problem, essentially an upgrade of persistent data, with two questions：

- How to upgrade：cloud delivery for persistent data is no longer able to escape containerized and platform features.None of the major cloud native platforms can easily integrate persistent data into version control systems in the software delivery process.The reasons are simple, with data different in each delivery environment, and it is difficult to choose a harmonized version management scheme for persistent data during upgrading.
- Which persistent data need to be upgraded to：, since it is difficult to choose a unified version management scheme for persistent data, then back to back and second, will it be possible to select the required persistent data for version management.The narrower scope highlights the special persistent data type of database table structure.The need for version management is obvious, and the application itself has been upgraded from version V1 to version V2, so the corresponding database table structure also requires the addition of the necessary new tables and columns.

These two questions give rise to the subject：of this paper in the enterprise level software delivery area,**How can it be reasonable to process version control of the database table structure (Schema) during each update?**

Two mainstream solutions for schema version management in the area of traditional software delivery,：

- Manual handling of：is the most basic schema version management.On-site delivers require not only the application upgrade process, but also the database directly and the schema upgrade.This method is the most straightforward, but the process that cannot be automated has some ineffectual and wrong pathology：.
- Code handling：is a way forward.Modema version management by introducing a third-party library inside the application.This operation already dispenses with the manual processing process from the delivery site, and the handlers only need to update the application, the application itself will be connected to the database and automate changes to the Schema.The degree of automation of this approach has already met the requirements, but it also has technology cost escalation, intrusiveness, and bound to language or frameworks that introduce disease：into third-party libraries.

## Ancient Ancient Ideas

In the cloudy age, the users of the application and the delivers all want to empower their applications through the platform selected.In the fields explored in this paper, this expectation can be described as：, with platform capability, grants version management capabilities to the app in a non-intrusive way, so that the app can automatically upgrade when one click upgrade.

Rainbond is also constantly exploring ways of empowering applications as a cloud native application management platform.In the schema version management arena, the ability to integrate schema version management in the source code build.The app itself does not require changing any code. Only two types of files need to be placed in the specified directory under the root of the code.The two files are：, which defines the profile of the database instance connection address and upgrades the Sql script file used by Schema.

## About source build

The source build function is itself an ability of Rainbond to the app.In the cloud of origin, applications are moving in the direction of containerization.It does not seem possible to leave Dockerfile writing during the containerization process.The source build function enables direct interface of the source code and compiles it into a runnable container mirror.The process does not require the involvement of developers and provides a code warehouse address, which greatly reduces the technical burden on developers.

Many capabilities are integrated in a no-intrusive manner in the source build process.For example, integrate APM capabilities by incorporating Pinpoint-agent.For example, integrate custom control capabilities by incorporating jmx-exporter.Today's focus is on integrating schema version control capabilities by including Liquibase

## About Liquibase

Liquibase is a CI/CD tool dedicated to database table structure version control.Starting in 2006, the Liquibase team has been working to make database change management simpler, especially in the area of agile software development.This tool is based on the open source of the Apache 2.0 protocol.

After a long iteration, Liquibase has become highly mature and reliable, using a variety of file formats including sql, yaml, xml, json and others, the developer can quickly define a database table change file that meets the Liquibase style, which is called changelog.Based on the definition in changelog, Liquibbase can be easily upgraded and rolled back between multiple changes operators.

Liquibase provides a variety of ways for developers to interact, including a common command-line operating mode, source build integration of the schema version management capability of Liquibase by command line.

## Schema version control capability defined by code

Rainbond source build upholds the ability to define code.The schema version control capability is also defined by the specified file in the repository and we can simply call Schema As Code, the practice of this code definition capability requires that every CI work begins with a code repository address such as Git.For each database instance the database table structure version is defined by specifying the configuration files and changelog in the directory.By default, refers to the `Schema` directory in the root of the code.

Below is an example of a code structure, and Rainbond official also provides a complete code example **[java-maven-demo](https://gitee.com/rainbond/java-maven-demo)**:

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

The `mysql.properties` and `changlog.sql` files in the `Schema` directory define how to control version of the Schema.

`mysql.properties` defines how the database instance is connected, as well as the referenced `changeog` file address.

```bash
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?createDatabaseIfNotExist=true&characterEncoding=utf8
username=${MYSQL_USER}
password=${MYSQL_PASSWORD}
changeLogFile=changelog.sql
```

Simplified definitions include：

- driver：specifies the jdbc drive used, source build supports common types of databases of mysql, mariadb, mssql, mongo, postprogresql, sqlite, etc.
- The url：defines the database connection address, which can be pre-created by the standard writing of jdbc.
- Username &password：defines login credentials for database instances.
- ChangeLogFile：defines the path to change the file structure of this database instance table.

During the source build, all `properties` files in the `Schema` directory will be identified and the schema version control process will be processed for each database instance at startup.Through a portfolio of configurations, good work can be done in the following common scenarios.

- Single Database Instances
- Multiple database instances of the same type, such as the app connecting multiple mysql
- Multiple examples of different types of database, such as the app connected to mysql, mono
- Multiple database instances in the same database, such as applications using multiple library instances in the same mysql

## Changlog Best Practices

The `changelog` file is the key to managing the Schema.Below is an example：

```sql
-- liquibase formed sql
-- changeset guox. odrain:1
create table person (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback drop table persons;
-- changeset guox. odrain:2
create table company (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback droptable company;
```

Using the sql type `changelog` file to define schema version is recommended because it is most consistent with developer's habits.

The `changelog` file defines some behavior by annotation.Common following：

```
# 定义 changelog 文件的格式，这是每一个 changelog 文件的开头项
-- liquibase formatted sql 
# 定义变更集，后面跟随的，是开发人员姓名，以及变更集的序号，这个序号很重要，建议使用有序数字来定义
-- changeset guox.goodrain:1
# 定义回滚操作，每一个变更集都应该定义与之对应的回滚操作，这使得在变更出现问题时，快速回滚到指定版本的变更集
-- rollback drop table staff;
```

Liquibase officially presented a series of best practices, some of which should be the tacit behaviour of developers.

- Each changeset contains only one change, by fine-tuning a version of the database table structure, which prevents a failed automatic submission statement from placing the database in an unexpected state.
- Changeet ID, select an orderly and unique column or a friendly name for the developer.
- Make versions always rollback, set a reasonable rollback for each changeet.

For writing of `mysql.properties` and `changlog.sql` files, please refer to [liquibase document](https://docs.liquibase.com/) which can be inherited by the source build.

## Schema Life Cycle Process

### 1. Build process

When performing the normal source build process, the `Schema` directory under the root of the code will be automatically identified, and the basic environments required for schema version management, including jre and Liquibase toolkits.

Building logs will have the following tip：

![](https://static.goodrain.com/wechat/database-Schema/one.png)

### 2. Start process

Once the build process has been completed, the service component will automatically enter the startup process, and the Rainbond platform will automatically upgrade for each database instance based on the defined configuration file in the code.

When processed, the head position in the service component log will print the relevant record：

![](https://static.goodrain.com/wechat/database-Schema/two.png)

The graph above shows an upgrade to the table structure for multiple library instances in the same mysql database.For empty library examples, this would also amount to an initialization operation.

For example, Rainbond initialized the table structure by creating tables `company`, `person` and `another_company` and `another_company` and `another_person`.Verify： after the Web Terminal login for the database component

![](https://static.goodrain.com/wechat/database-Schema/there.png)

### 3. Publish to Component Library

Rainbond unique publishing mechanisms allow the business and database components to be published uniformly as an application template.Install delivery in a different environment.An app that delivers a template still has the capability to control the schema version.A completely newly installed app template will also be initialized into the above state.Here we call the published app a source app, and the app is installed from the template to the delivered app.

![](https://static.goodrain.com/wechat/database-Schema/our.png)

### Update of code

Schema also changes when developers continue to iterate business systems, assuming that a new version of the business system requires the `Initialize` to add a new `staff` to the existing `person` table.The developer should then add the following to the corresponding `changeog.sql` file and submit it together with the new business code, making sure that the business code and schema are consistent.

```sql
-- Changeet others. odrain:3
alter table person ad column country varchar(2);
create table staff (
id int primary key,
name varchar(50) not null,
address1 varchar(50),
address2 varchar(50),
city varchar(30)
);
-- rollback drop table staff;
-- rollback alone table person dropping column;
```

Upgrades Schema while the source app builds and Rainbond pulls the latest code to update the business application.

No changes during construction, but during startup, for updated `Initialize` and for saved `anotherdb` libraries, Rainbond gave two different treatment：

![](https://static.goodrain.com/wechat/database-Schema/five.png)

### Upgrades based on application templates

A new version of the source app is available and the delivered app should change accordingly.First, the app template needs a more recent version. Duplicate the release process and define a higher version number.Delivered apps can upgrade to the updated version based on Rainbond prompt.

![](https://static.goodrain.com/wechat/database-Schema/six.png)

### 6. Validation

Log in to the database component of the app to see the corresponding schema changes.

![](https://static.goodrain.com/wechat/database-Schema/seven.png)

### Roll Back

The rollback of the database table structure is a very serious issue.In line with the principle that the table structure will only be added, the schema already in effect will not change with the one-click rollback of the delivered application.If you are bound to roll back, you need to log in to the Web Terminal of the Business Component manually.

Note that the rollback order：database table structure should be rolled back before the application.This is due to the fact that once the application rolls back, the changelog file itself rolled back to the previous version, it is no longer possible to roll back the database table structure.

Execute the following commands to roll back the database table structure, based on the specified configuration file, in 1 changeet.

```bash
cd Schema/
liquibase rollbackCount 1 --defaults-file=mysql.properties
```

Since once the rolled business component has been restarted or updated, the match changelog file will be upgraded and the Schema will be reupgraded, so after the rollback operation you must add the environment variable `ALLOW_SCHEMA_UPDATE=false` to disable version management controls until the new version of the application template is upgraded.

## FAQ

1. How to define the connection address and credentials of all database instances that are reasonable in the `*.properties` profile?

> Use the environment variable instead of the `*.properties` config file to connect to the address and the credentials information, see the example in the text.Rainbond source build allows all environmental variables in the operating environment to be picked up and the target configuration file to be rendered, so the name of the environmental variable is not important but only to ensure that the defined environmental variable is generated in the final delivery environment.Regardless of whether the environment variable comes from the customized environment configuration or Rainbond unique connection information mechanisms.

2. Failed to perform rollbackup?

> How to roll back, defined in changelog file.Be sure to ensure that every changeset has a corresponding rollback strategy in order to ensure the right results for each roll.

3. Error reporting：`!! Failed to check the database status. Check /app/Schema/xxx.properties.log`

> Each time a schema change is implemented, checks are carried out, including the connectivity of database instance addresses, the enforceability of changelog files.If the check is not passed, no action will be made to the database, but the results of the check will be recorded in the log file. You will be able to login to the Web Terminal and see the content of the log file in the reminder.

4. How do older users get schema version control?

> This feature is detached from Rainbond version, so older users can access this ability by updating the source build related components.Execute the following set of commands sufficient to：
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

**Liquibase** https://www.liquibase.com

**java-maven-demo** https://gite.com/rainbond/java-maven-demo
