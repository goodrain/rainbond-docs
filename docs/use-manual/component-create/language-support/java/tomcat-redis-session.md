---
title: Tomcat配置Redis实现Session共享
description: how-to-use-rainbond
---

为了使您的应用承受更多的并发，提高应用稳定性，您需要在适当情况下进行扩容。每个节点下的 Tomcat 只存储来访问自己的请求时产生的 session，为了解决扩容后 session 持久化的问题，我们提供 **Java 的 War 包项目使用 Tomcat 配置 Redis 实现 Session 共享** 解决方案，将您 session 储存在 redis 中来保证您应用程序稳定性。

如果你使用 Rainbond 源码部署 Java 项目，您可以通过如下两种方式实现 **配置 redis 实现 session 共享**:

### 使用 Webapp-Runner 或 Jetty-Runner

Rainbond 使用 [webapp-Runner](./webapp-runner) 内嵌的 tomcat 或 jetty-Runner 内嵌的 jetty 实现服务器功能。在您不创建其他服务器情况下即可轻松将应用部署在 Rainbond。通过以下步骤可实现 **配置 redis 实现 session 共享**。

1. 配置 [Procfile](../procfile)：将如下命令添加到您的 Procfile 中，并源码根目录下添加 Procfile。

   ```
   web: java -jar ./webapp-runner.jar --port $PORT --session-store redis ./*.war
   ```

   - 指定了监听端口，通过获取环境变量 \$PORT,此变量 Rainbond 根据平台设置的服务端口进行自动注入
   - 指定 session 存储`--session-store redis`

2. 从应用市场安装 Redis 服务，并设置当前服务依赖创建的 Redis 服务，参考文档 [组件间通信](/docs/use-manual/component-manage/component-connection/regist_and_discover)

3. 应用配置 redis：将`REDIS_URL`新增至应用环境变量中，值为 `redis://:${REDIS_PASS}@127.0.0.1:6379`。

4. 重启应用以适配

### 使用 docker 镜像

Rainbond 提供使用定制 tomcat 容器来启动应用的方法。通过以下步骤可实现 **配置 redis 实现 session 共享**。

1. 创建 Dockerfile，写入如下内容：

   - 使用源码

```dockerfile
FROM goodrainapps/tomcat:7.0.82-jre7-alpine
RUN rm /usr/local/tomcat/webapps/ROOT
COPY <dir_name> /usr/local/tomcat/webapps/ROOT			#<dir_name>为源码目录名称
EXPOSE 8080
```

- 使用 war 包

```dockerfile
FROM goodrainapps/tomcat:7.0.82-jre7-alpine
RUN rm /usr/local/tomcat/webapps/ROOT
COPY <filename>.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
```

2. 确认源码的`<dir_name>`或`<filename>.war`存在，并且与 Dockerfile 文件存在同一目录，以此目录为根目录开始创建组件
3. 安装 Redis 服务并建立依赖关系，参考文档 [组件间通信](/docs/use-manual/component-manage/component-connection/regist_and_discover)
4. 应用配置 redis：配置变量`REDIS_URL`到应用环境变量中，值为 `127.0.0.1:6379`；配置变量`REDIS_SESSION`到应用环境变量中，值为`true`。
5. 重启应用以适配
