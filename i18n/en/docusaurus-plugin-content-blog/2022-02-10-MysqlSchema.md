---
title: Automatic upgrade of database structure in Rainbond
description: Automatic upgrade of database structure in Rainbond
slug: MysqlSchema
---

:::info [Rainbond](https://www.rainbond.com) is a product that has been committed to opening up the entire process of enterprise application delivery. An indispensable part of this process is the continuous upgrading and iteration of enterprise applications.The unique ability of Rainbond is to package enterprise application systems including multiple service components, and perform one-click installation, upgrade and rollback operations.The above only solves the versioning problem of the application itself.To fully automate the upgrade iteration process of enterprise applications, it is also necessary to automatically handle the version control of the database table structure (Schema).After continuous exploration, Rainbond first integrated the ability of database schema version management in the cloud native era with the industry-leading [Liquibase](https://www.liquibase.com/) in the field of source code construction. :::

<!--truncate-->


## Schema version management challenges

The database table structure (Schema) defines the name of the data table (Table), as well as the names, attributes and other information of the data column (Column) contained in each data table.It describes the framework owned by a database, and the data recorded in the database needs to follow the definition in the Schema.

Different from the upgrade of the application itself, the problem of schema version management is essentially an upgrade of persistent data. This feature is accompanied by two questions：

- How to upgrade persistent data delivery in the cloud-native era can：longer escape the characteristics of containerization and platformization.In the process of software delivery, major cloud native platforms will not easily incorporate persistent data into the version control system.The reason is simple, the data in each delivery environment is different, and it is difficult to choose a unified version management solution for persistent data during the upgrade process.
- Which persistent data needs to be upgraded：Since it is difficult to choose a unified version management solution for persistent data, the next best thing is to choose the necessary persistent data for version management.After narrowing the scope, the special persistent data type of the database table structure is highlighted.The necessity of its version management is obvious. The application itself has been upgraded from the V1 version to the V2 version, so the corresponding database table structure also needs to add necessary new tables and new columns.

These two questions lead to the main theme of this article：1. In the field of enterprise software delivery,**How to reasonably handle the version control of the database table structure (Schema) in the process of each upgrade?**

In the traditional software delivery field, there are two mainstream solutions for：version management0

- Manual processing：This is the most basic Schema version management method.On-site delivery personnel not only need to handle the application upgrade process, but also directly operate the database to complete the schema upgrade.This method is the most direct, but processes that cannot be automated have some common problems：inefficiency and error-prone.
- The code handles：which is an advanced way.Schema version management is carried out by introducing third-party libraries into the application.This operation has already eliminated the manual processing process on the delivery site. The delivery personnel only need to update the application, and the program itself will connect to the database to make automated changes to the schema.The degree of automation of this method can already meet the requirements, but it also has the common problems of introducing third-party libraries:：technical cost increase, intrusiveness, and language or framework binding.



## Solutions in the cloud-native era

In the cloud-native era, both application users and deliverers hope to empower their applications through the platform they choose.In the field discussed in this article, this expectation can be specifically described as：With the help of platform capabilities, the Schema version management capability is given to the application in a non-intrusive way, so that when the application performs a one-key upgrade, the Schema is also automatically upgraded.

As a cloud-native application management platform, Rainbond is also constantly exploring ways to empower applications.In the field of schema version management, the ability to integrate schema version management in the source code construction process is realized.The application itself does not need to change any code, just put the two types of files into the specified directory under the code root directory.These two files are the configuration file that：the connection address of the database instance, and the Sql script file used to upgrade the schema.



## About source code building

The source code building function itself is a kind of enabling of Rainbond to the application.In the cloud-native era, applications are moving towards containerization.In the process of containerization, it seems that the writing of Dockerfile cannot be avoided, but it is not.The source code building function can directly connect the source code and compile it into a runnable container image.The whole process does not require the intervention of developers, just provide the code warehouse address, which greatly reduces the technical burden of developers.

In the source code construction process, many capabilities are integrated in a non-invasive way.For example, integrating APM capabilities by incorporating Pinpoint-agent.Another example is the integration of custom business monitoring capabilities by incorporating jmx-exporter.Today's focus is on integrating Schema version control capabilities by incorporating Liquibase.



## About Liquibase

Liquibase is a CI/CD tool dedicated to version control of database table structures.Since 2006, the Liquibase team has been working on making database change management easier, especially in the field of agile software development.This tool is open sourced under the Apache 2.0 protocol.

After a long period of iteration, Liquibase has become very mature and reliable. Through various file formats including sql, yaml, xml, and json, developers can quickly define a database table structure change file that conforms to the Liquibase style. This kind of file is called for changelog.Based on the definitions in the changelog, Liquibase can easily upgrade and rollback between multiple change operation versions.

Liquibase provides a variety of ways for developers to interact, including a common command line operation mode, and source code construction integrates Liquibase's Schema version management capabilities through the command line.



## Schema versioning capability for code definitions

Rainbond source code builds honor code to define various capabilities.For the Schema version control capability, it is also defined by the specified files in the code repository, which we can briefly call Schema As Code. The practice of this code definition capability requires that each CI work be assigned a code repository address. Start, like Git.For each database instance, the database table structure version is defined by specifying the configuration file and changelog in the directory.By default, it refers to the `Schema`directory under the code root.

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

During the source code construction process, all `properties` files in the `Schema` directory will be traversed and identified, and the Schema version control process of each database instance will be processed at startup.Through the combination of configuration files, it can work well in the following common scenarios.

- single database instance
- Multiple database instances of the same type, such as applications connecting multiple mysql at the same time
- Multiple database instances of different types, such as applications connected to mysql and mongo at the same time
- Multiple database instances in the same database, such as applications using multiple database instances in the same mysql at the same time



## Best practices for changlog

`changelog` file is the key to managing Schema.Here is an example：

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

`The changlog` file defines some behavior through comments.Common as follows：

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

The above figure demonstrates the upgrade operation of the table structure for multiple database instances in the same mysql database.This is also equivalent to an initialization operation for an empty library instance.

In the example, Rainbond initializes the table structure to two database instances (named `Initialize` `anotherdb`respectively) in the same mysql database to which the application is connected, and creates tables`company` ,`person` respectively and `another_company` ,`another_person`.After logging in to the web terminal of the database component, you can verify：

![](https://static.goodrain.com/wechat/database-Schema/there.png)

### 3. Publish to Component Repository

Rainbond's unique publishing mechanism can unify the publishing of business components and database components as an application template.Convenient one-click installation and delivery in different environments.Applications delivered through application templates still have the capability of schema version control.For a freshly installed application template, its database will also be initialized to the above state.Here, we call the published application the source application, and the application installed from the application template the delivered application.

![](https://static.goodrain.com/wechat/database-Schema/four.png)

### 4. Code update

When developers continue to iterate the business system, the Schema is also changed. Assume that the new version of the business system requires `Initialize`  to add a new table `staff`, and add a new column `country to the existing <code>person` table.Then the developer should add the following content to the corresponding `changelog.sql` file, and submit it together with the new business code to ensure that the business code and Schema are consistent.

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

With a new version of the source application, the delivered application should change accordingly.First, the application template needs to have an updated version, repeat the release process, and define a higher version number.The delivered application can be upgraded to the updated version with one click according to Rainbond's prompt.

![](https://static.goodrain.com/wechat/database-Schema/six.png)

### 6. Verification

Log in to the database component of the delivered application to view the corresponding schema changes.

![](https://static.goodrain.com/wechat/database-Schema/seven.png)

### 7. Rollback

The rollback operation of database table structure is a very serious problem.Based on the principle that the database table structure only increases and does not decrease, the schema that has already taken effect will not be changed with the one-click rollback of the delivered application.If the rollback must be performed, the operation and maintenance personnel need to log in to the Web terminal of the business component to perform manual operations.

It should be noted that the order of rollback：database table structure should be rolled back before the application.This is because once the application rollback is completed, the changlog file itself is also rolled back to the previous version, and the database table structure cannot be rolled back.

Execute the following command to roll back the database table structure according to the specified configuration file. The rollback range is one changeset.

```bash
cd Schema/
liquibase rollbackCount 1 --defaults-file=mysql.properties
```

In view of the fact that once the rolled-back business component is restarted or updated, the schema will be re-upgraded after comparing the changelog file, so after performing the rollback operation, be sure to add the environment variable `ALLOW_SCHEMA_UPDATE=false` to disable the schema version management control function until the new Version application template upgrade.



## common problem

1. How to reasonably define the connection address and credentials of all database instances in the `*.properties` configuration file?

> Use environment variables to replace the data road instance connection address and credential information in the  `*.properties` configuration file. For the definition method, see the example in the article.During the construction of Rainbond source code, all environment variables in the running environment will be picked up and the target configuration file will be rendered, so the naming of the environment variables is not important, just make sure that the defined environment variables will be generated in the final delivery environment.Whether environment variables come from custom environment configuration or Rainbond's unique connection information mechanism.

2. Failed to perform rollback operation?

> How to rollback is defined in the changlog file.Be sure to ensure that each changeset has a corresponding rollback strategy to ensure that each rollback will get the correct result.

3. Error：`!! Failed to check the database status. Check /app/Schema/xxx.properties.log`

> Every time a schema change is executed, it will be checked first, including the connectivity of the database instance address and the executable of the changelog file.If the check fails, no operation will be performed on the database, but the result of the check will be recorded in the log file. You can log in to the Web terminal to view the contents of the log file in the prompt.

4. How can old users get the Schema version control function?

> This function is separated from the Rainbond version, so old users can get this ability by updating the source code to build related components.Execute the following set of commands to：
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
