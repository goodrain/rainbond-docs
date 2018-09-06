---
title: Java源码创建示例
summary: 云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web app程序，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！
toc: true
---

<div class="filters filters-big clearfix">
    <a href="java.html"><button class="filter-button"><strong>构建手册</strong></button></a>
    <a href="java-demo.html"><button class="filter-button current">例子</button></a>
</div>

<div id="toc"></div>

## 项目结构
本文以开源项目[若依](https://gitee.com/rainbond/RuoYi)为例，详细说明通过java源码在云帮中构建应用的过程。

```
RuoYi/
├── pom.xml
├── sql
│   ├── quartz.sql
│   └── ry_20180808.sql
└── src
    └── main
```

* 该项目使用maven作为包管理工具，在项目的根目录下有一个`pom.xml`文件，因此会被云帮识别为maven项目并使用maven来构建应用。

* 运行时配置文件`Procfile`和编译配置文件`system.properties`都不存在，所以会被云帮自动生成。

* `pom.xml`中指定了`<java.version>1.8</java.version>`字段，所以会被用`java1.8`和`maven3.3.9`来编译。

## 开始构建

### 1.准备数据库
因为若依项目使用MySQL作为后端存储，所以我们需要先创建一个MySQL数据库，这在云帮上是轻而易举的，只需在云帮的云市中搜索`MySQL 5.7.20`并安装它。

依若项目附带了两个`*.sql`文件（见[sql目录](https://gitee.com/rainbond/RuoYi/tree/master/sql)），里面是若依运行所依赖的一些数据，我们需要将这两个`*.sql`导入到数据库中，另外还需要修改数据库的登录密码，以便让若依连接：

1. 进入MySQL的端口管理页面，打开3306端口的对外开放按钮，并得到一个对外访问地址，例：`47.92.168.60:20002`。
1. 使用MySQL客户端登录数据库（初始root密码可在MySQL应用的依赖管理页面中找到），修改root密码为"password"，因为若依默认使用该密码连接数据库（见配置文件：[application-druid.yml](https://gitee.com/rainbond/RuoYi/tree/master/src/main/resources)）:
    ```
    mysql -u root -h <对外地址> -P <对外端口> -p
    grant all privileges on *.* to 'root'@'%' identified by 'password' with grant option;
    grant all privileges on *.* to 'root'@'localhost' identified by 'password' with grant option;
    flush privileges;
    ```
1. 将项目中[sql目录](https://gitee.com/rainbond/RuoYi/tree/master/sql)下的两个sql文件导入MySQL中：
    ```
    mysql -u root -h 47.92.168.60 -P 20002 -p -e "create database ry;"
    mysql -u root -h 47.92.168.60 -P 20002 -p ry < /opt/test/RuoYi/sql/quartz.sql
    mysql -u root -h 47.92.168.60 -P 20002 -p ry < /opt/test/RuoYi/sql/ry_20180808.sql
    ```

### 2.部署java项目

1. 进入云帮控制台页面，选择从**自定义源码**创建应用，给应用起一个好听的名字。
1. 在**仓库地址**那一栏添入项目的代码仓库地址：`https://gitee.com/y_project/RuoYi.git`，点击**新建应用**，等待应用检测完成。
1. 点击**高级设置**，为应用添加一个存储（该步骤不可省略，否则会因为目录不存在而启动失败，见项目配置文件：[logback.xml](https://gitee.com/rainbond/RuoYi/tree/master/src/main/resources)）：
    ```
    名称：log
    目录：/home/logs/ruoyi
    类型：共享存储
    ```
1. 为应用添加一个依赖，然后选择刚才创建创的MySQL应用，最后点击**确认构建**，等待构建完成。

应用构建成功后点击访问按钮即可使用若依应用，默认用户名/密码：`admin/admin123`。

