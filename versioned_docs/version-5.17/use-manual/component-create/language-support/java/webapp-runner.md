---
title: webapp-runner使用指南
description: how-to-use-rainbond
---

webapp-runner 可以在任何安装有 JRE 环境的系统中利用 Tomcat 将应用程序启动。使用 webapp-runner 不需要安装 Tomcat。它只是一个 jar 文件可以用`java`命令运行和配置。Rainbond 运行 War 包、或 Maven 打包成 War 包的项目都默认使用 webapp-runner。

### 版本说明

> Webapp Runner 是基于 Tomcat server 的。默认 Rainbond 支持的版本如下:

| web 服务支持    | web 服务版本                     | 自定义 Procfile 中 jar 文件名 |
| :-------------- | :------------------------------- | :---------------------------- |
| tomcat7         | webapp-runner-7.0.91.0.jar       | webapp-runner.jar             |
| tomcat8         | webapp-runner-8.0.52.0.jar       | webapp-runner.jar             |
| tomcat85 (默认) | webapp-runner-8.5.38.0.jar       | webapp-runner.jar             |
| tomcat9         | webapp-runner-9.0.16.0.jar       | webapp-runner.jar             |
| jetty7          | jetty-runner-7.5.4.v20111024.jar | jetty-runner.jar              |
| jetty9          | jetty-runner-9.4.0.v20161208.jar | jetty-runner.jar              |

### 高级特性配置

目前 Rainbond 提供的 Webapp-runner 都支持 session 管理.

#### session 管理

```bash
# Procfile
$ java -jar ./webapp-runner.jar --session-store memcache target/<appname>.war
```

然后确保有三个环境变量可供配置 `MEMCACHE_SERVERS`, `MEMCACHE_USERNAME`, `MEMCACHE_PASSWORD`

或者

```bash
# Procfile
java -jar ./webapp-runner.jar --session-store redis target/<appname>.war
```

然后确保 Redis 环境变量可用于配置：REDIS_URL

#### 设置访问路径

```bash
# Procfile
java -jar ./webapp-runner.jar --path /phone target/<appname>.war
```

#### 更多参数配置

```
$ java -jar webapp-runner.jar --help
The specified path "src/main/webapp" does not exist.
Usage: <main class> [options]
  Options:
    --access-log
      Enables AccessLogValue to STDOUT
      Default: false
    --access-log-pattern
       If --access-log is enabled, sets the logging pattern
       Default: common
    --basic-auth-pw
       Password to be used with basic auth. Defaults to BASIC_AUTH_PW env
       variable.
    --basic-auth-user
       Username to be used with basic auth. Defaults to BASIC_AUTH_USER env
       variable.
    --bind-on-init
       Controls when the socket used by the connector is bound. By default it is
       bound when the connector is initiated and unbound when the connector is
       destroyed., default value: true
       Default: true
    --compressable-mime-types
       Comma delimited list of mime types that will be compressed when using
       GZIP compression.
       Default: text/html,text/xml,text/plain,text/css,application/json,application/xml,text/javascript,application/javascript
    --context-xml
       The path to the context xml to use.
    --enable-basic-auth
       Secure the app with basic auth. Use with --basic-auth-user and
       --basic-auth-pw or --tomcat-users-location
       Default: false
    --enable-client-auth
       Specify -Djavax.net.ssl.keyStore and -Djavax.net.ssl.keyStorePassword in
       JAVA_OPTS
       Default: false
    --enable-compression
       Enable GZIP compression on responses
       Default: false
    --enable-naming
       Enables JNDI naming
       Default: false
    --enable-ssl
       Specify -Djavax.net.ssl.keyStore, -Djavax.net.ssl.keyStorePassword,
       -Djavax.net.ssl.trustStore and -Djavax.net.ssl.trustStorePassword in JAVA_OPTS. Note: should not be
       used if a reverse proxy is terminating SSL for you (such as on Heroku)
       Default: false
    --expand-war-file
       Expand the war file and set it as source
       Default: true
    --expanded-dir-name
       The name of the directory the WAR file will be expanded into.
       Default: expanded
    --help

       Default: false
    --max-threads
       Set the maximum number of worker threads
       Default: 0
    --path
       The context path
       Default: <empty string>
    --port
       The port that the server will accept http requests on.
       Default: 8080
    --proxy-base-url
       Set proxy URL if tomcat is running behind reverse proxy
       Default: <empty string>
    --scanBootstrapClassPath
       Set jar scanner scan bootstrap classpath.
       Default: false
    --session-store
      Session store to use (valid options are 'memcache' or 'redis')
    --session-store-ignore-pattern
      Request pattern to not track sessions for. Valid only with memcache
      session store. (default is '.*\.(png|gif|jpg|css|js)$'. Has no effect
      for 'redis')
      Default: .*\.(png|gif|jpg|css|js)$
    --session-store-locking-mode
      Session locking mode for use with memcache session store. (default is
      all. Has no effect for 'redis')
      Default: all
    --session-store-operation-timeout
      Operation timeout for the memcache session store. (default is 5000ms)
      Default: 5000
    --session-store-pool-size
      Pool size of the session store connections (default is 10. Has no effect
      for 'memcache')
      Default: 10
    --session-timeout
      The number of minutes of inactivity before a user's session is timed
      out.
    --shutdown-override
      Overrides the default behavior and casues Tomcat to ignore lifecycle
      failure events rather than shutting down when they occur.
      Default: false
    --temp-directory
      Define the temp directory, default value: ./target/tomcat.PORT
    --tomcat-users-location
      Location of the tomcat-users.xml file. (relative to the location of the
      webapp-runner jar file)
    --uri-encoding
      Set the URI encoding to be used for the Connector.
    --use-body-encoding-for-uri
      Set if the entity body encoding should be used for the URI.
      Default: false
    -A
      Allows setting HTTP connector attributes. For example: -Acompression=on
      Syntax: -Akey=value
      Default: {}
```

关于设置设置 HTTP 连接属性,如 `-Acompression=on`,可以参考 [Apache Attributes](https://tomcat.apache.org/tomcat-8.5-doc/config/http.html)
