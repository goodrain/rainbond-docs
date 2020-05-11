---
title: Tomcat配置Redis实现Session共享
description: how-to-use-rainbond
hidden: true
---

为了使您的应用承受更多的并发，提高应用稳定性，您需要在适当情况下进行扩容。每个节点下的Tomcat只存储来访问自己的请求时产生的session，为了解决扩容后session持久化的问题，我们提供 **Java的War包项目使用Tomcat配置Redis实现Session共享** 解决方案，将您session储存在redis中来保证您应用程序稳定性。

如果你使用Rainbond源码部署Java项目，您可以通过如下两种方式实现 **配置redis实现session共享**:

### 使用Webapp-Runner或Jetty-Runner

Rainbond使用 [webapp-Runner]() 内嵌的 tomcat 或 [jetty-Runner]() 内嵌的 jetty 实现服务器功能。在您不创建其他服务器情况下即可轻松将应用部署在Rainbond。通过以下步骤可实现 **配置redis实现session共享**。

1. 配置[Procfile](../../etc/procfile/)：将如下命令添加到您的Procfile中，并源码根目录下添加Procfile。

   ```
   web: java -jar ./webapp-runner.jar --port $PORT --session-store redis ./*.war
   ```
   - 指定了监听端口，通过获取环境变量 $PORT,此变量Rainbond根据平台设置的服务端口进行自动注入
   - 指定session存储`--session-store redis`

3. 从应用市场安装Redis服务，并设置当前服务依赖创建的Redis服务，参考文档 [依赖服务](/docs/user-manual/app-service-manage/service-rely/#服务如何连接依赖服务)

4. 应用配置redis：将`REDIS_URL`新增至应用环境变量中，值为 `redis://:${REDIS_PASS}@127.0.0.1:6379`。

5. 重启应用以适配

### 使用docker镜像

Rainbond提供使用定制 tomcat 容器来启动应用的方法。通过以下步骤可实现 **配置redis实现session共享**。

1. 创建Dockerfile，写入如下内容：

   - 使用源码

   

   ```dockerfile
   FROM goodrainapps/tomcat:7.0.82-jre7-alpine
   RUN rm /usr/local/tomcat/webapps/ROOT
   COPY <dir_name> /usr/local/tomcat/webapps/ROOT			#<dir_name>为源码目录名称
   EXPOSE 8080
   ```
   - 使用war包

   

   ```dockerfile
   FROM goodrainapps/tomcat:7.0.82-jre7-alpine
   RUN rm /usr/local/tomcat/webapps/ROOT
   COPY <filename>.war /usr/local/tomcat/webapps/ROOT.war
   EXPOSE 8080
   ```

2. 确认源码的`<dir_name>`或`<filename>.war`存在，并且与Dockerfile文件存在同一目录，以此目录为根目录开始创建组件
3. 安装Redis服务并建立依赖关系，参考文档 [依赖服务](/docs/user-manual/app-service-manage/service-rely/#服务如何连接依赖服务)
4. 应用配置redis：配置变量`REDIS_URL`到应用环境变量中，值为 `127.0.0.1:6379`；配置变量`REDIS_SESSION`到应用环境变量中，值为`true`。
5. 重启应用以适配
