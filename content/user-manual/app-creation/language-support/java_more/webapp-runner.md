---
title: Webapp Runner
description: how-to-use-rainbond
hidden: true
---

Webapp Runner可以在任何安装有JRE环境的系统中利用Tomcat将应用程序启动。使用Webapp Runner不需要安装Tomcat。它只是一个jar文件可以用`java`命令运行和配置。

> Webapp Runner 是基于 Tomcat server的，因此 7.0.57.2 版本的 Webapp Runner 使用的是 7.0.57 版本的Tomcat

#### Webapp Runner 是如何工作的

在本地或云帮使用Webapp Runner启动应用程序时的命令类似如下格式：

```Bash
$ java -jar webapp-runner.jar application.war
deploying app from: /Users/zhouyq/dev/gitrepos/java-webapp-runner/target/webappRunnerSample.war
Feb 14, 2015 5:21:44 PM org.apache.coyote.AbstractProtocol init
INFO: Initializing ProtocolHandler ["http-bio-8080"]
Feb 14, 2015 5:21:44 PM org.apache.catalina.core.StandardService startInternal
INFO: Starting service Tomcat
Feb 14, 2015 5:21:44 PM org.apache.catalina.core.StandardEngine startInternal
INFO: Starting Servlet Engine: Apache Tomcat/7.0.57
Feb 14, 2015 5:21:44 PM org.apache.catalina.startup.ContextConfig webConfig
INFO: No global web.xml found
Feb 14, 2015 5:21:44 PM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["http-bio-8080"]
```

Webapp Runner 会利用给定的war文件启动一个Tomcat实例。它会使用Tomcat提供的内嵌API来把程序跑起来，与[Jetty Runner](https://webtide.com/)提供的选项有些类似。 Webapp Runner 是 [开源](https://github.com/jsimone/webapp-runner) 软件，你可以随时查阅项目源码。

#### webapp-runner参数说明

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

#### 创建应用程序

```bash
$ mvn archetype:generate -DarchetypeArtifactId=maven-archetype-webapp
...
[INFO] Generating project in Interactive mode
Define value for property 'groupId': : com.example
Define value for property 'artifactId': : helloworld
```

(你可以使用任意的 groupId 或 artifactId)。执行完上面的命令后，`helloworld`目录会生成一个完整的Java web 应用。

#### 配置Maven下载Webapp Runner(可选)

通过构建配置文件`pom.xml`可以下载Webapp Runner，通过这种方式可以自动解决依赖关系，提高程序的灵活性与可移植性。在这里我们使用 Maven 因此需要使用依赖插件`maven-dependency-plugin`来下载jar包。将如下的配置添加到你的`pom.xml`文件中：

```xml
<build>
    ...
    <plugins>
        ...
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <version>2.3</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals><goal>copy</goal></goals>
                    <configuration>
                        <artifactItems>
                            <artifactItem>
                                <groupId>com.github.jsimone</groupId>
                                <artifactId>webapp-runner</artifactId>
                                <version>7.0.57.2</version>
                                <destFileName>webapp-runner.jar</destFileName>
                            </artifactItem>
                        </artifactItems>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

#### 运行程序

先运行如下简单的命令构建应用程序：

```Bash
$ mvn clean package
```

然后通过java命令运行起来：

```bash
$ java -jar target/dependency/webapp-runner.jar target/*.war
```

就这么简单，你的应用程序已经运行并监听8080端口

{{% notice note %}}

如果你需要在启动应用之前展开WAR文件，需要在启动命令的 target/*.war选项之前添加 --expand-war

{{% /notice %}}