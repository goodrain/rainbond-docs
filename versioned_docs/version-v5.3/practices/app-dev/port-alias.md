---
title: 服务间通信,端口别名的使用
weight: 4008
---

今天给大家介绍一下 Rainbond 的一个小技巧——端口别名。

端口别名，顾名思义，是给组件端口定义一个别名。

## 端口别名的设置

当进入到`端口管理页面`，点击`使用别名`，即可设置端口的别名，如下图所示：

![端口别名设置](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/port-alias/%E8%AE%BE%E7%BD%AE%E7%AB%AF%E5%8F%A3%E5%88%AB%E5%90%8D.png)

## 端口别名的作用

定义好端口别名后，Rainbond 会为该别名生成两个对外环境变量：`端口别名_HOST` 和 `端口别名_PORT`。比如，端口别名是 MYSQL，则对应的环境变量就是 `MYSQL_HOST` 和 `MYSQL_HOST`。

![端口别名对外环境变量](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/port-alias/%E7%AB%AF%E5%8F%A3%E5%88%AB%E5%90%8D%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.png)

不知道大家发现没有，这两个环境变量，其实就是该端口的访问方式，访问方式=`端口别名_HOST`:`端口别名_PORT`。
比如：端口别名是 MYSQL，对应的访问方式就是 `MYSQL_HOST:MYSQL_PORT`，即 `127.0.0.1:3306`。

还有一个很重要的点就是，不管组件所属应用的治理模式怎么变，`端口别名_HOST` 都可以感知到。

也就是说，只要需要访问该端口的组件依赖上该组件，则可以很方便地知道其访问方式；不管应用的治理模式怎么变化，这个访问的方式会作出相应的变化，一直保持是正确的。

## Spring 组件连接 MySQL

为了做更进一步的说明，我们以 `Spring 组件连接 MySQL` 为例，看看 Spring 是如何方便地获取 MySQL 的访问方式。

熟悉 Spring 的同学可能知道，其配置文件可以是这样子的：

```yaml
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:localhost}/db_example
spring.datasource.username=springuser
spring.datasource.password=ThePassword
```

可能有些同学不熟悉 Spring，不过没有关系。我们只需要知道，Spring 会用环境变量去渲染配置文件里的变量。

只要 Spring 组件依赖了 MySQL 组件，Rainbond 则会把 MySQL 组件的对外环境变量注入到 Spring 组件里。

换句话说，Spring 组件依赖了 MySQL 之后，就会自动地得到环境变量 `MYSQL_HOST` 和 `MYSQL_HOST`。如果 MYSQL_HOST=`127.0.0.1`, `MYSQL_PORT`=3306, 经 Spring 渲染后，数据库的链接地址则变成了 `spring.datasource.url=jdbc:mysql://127.0.0。1:3306/db_example`，从而可以正确的访问 MySQL 组件。

## 总结

`端口别名` 是 Rainbond 组件间的通信里的一个非常方便的功能，通过为端口设置别名，可以很方便地获取到该端口的访问方式。