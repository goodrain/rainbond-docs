---
title: Inter-service communication, the use of port aliases
weight: 4008
---

Today, I will introduce a little trick of Rainbond - port alias.

Port alias, as the name suggests, is to define an alias for the component port.

## Port alias settings

When entering the`port management page`, click`to use the alias`, you can set the alias of the port, as shown in the following figure：

![Port Alias Settings](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/port-alias/%E8%AE%BE%E7%BD%AE%E7%AB%AF%E5%8F%A3%E5%88%AB%E5%90%8D.png)

## The role of port aliases

After the port alias is defined, Rainbond will generate two external environment variables for the alias:：`port alias _HOST` and `port alias _PORT`.For example, if the port alias is MYSQL, the corresponding environment variables are `MYSQL_HOST` and `MYSQL_HOST`.

![Port alias external environment variable](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/practice/port-alias/%E7%AB%AF%E5%8F%A3%E5%88%AB%E5%90%8D%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.png)

I don't know if you have found it. These two environment variables are actually the access mode of the port. Access mode =`port alias _HOST`:`port alias _PORT`. For example, the alias of port：is MYSQL, and the corresponding access method is `MYSQL_HOST:MYSQL_PORT`, that is, `127.0.0.1:3306`.

Another important point is that no matter how the governance mode of the application to which the component belongs, the`port alias _HOST` can be perceived.

That is to say, as long as the component that needs to access the port depends on the component, it is easy to know its access method; no matter how the governance mode of the application changes, the access method will change accordingly, and it will always remain correct.

## Spring components connect to MySQL

For further explanation, let's take `Spring component to connect MySQL` as an example to see how Spring can easily obtain MySQL access.

Students familiar with Spring may know that the configuration file can be like this：

```yaml
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:localhost}/db_example
spring.datasource.username=springuser
spring.datasource.password=ThePassword
```

Maybe some students are not familiar with Spring, but it doesn't matter.We just need to know that Spring will use environment variables to render the variables in the configuration file.

As long as the Spring component depends on the MySQL component, Rainbond will inject the external environment variables of the MySQL component into the Spring component.

In other words, after Spring components depend on MySQL, they will automatically get environment variables `MYSQL_HOST` and `MYSQL_HOST`.If MYSQL_HOST=`127.0.0.1`, `MYSQL_PORT`=3306, after rendering by Spring, the link address of the database becomes `spring.datasource.url=jdbc:mysql://127.0.0.1:3306/db_example`, so that the MySQL component can be accessed correctly.

## Summarize

`Port alias` is a very convenient function in the communication between Rainbond components. By setting an alias for a port, you can easily get the access method of the port.