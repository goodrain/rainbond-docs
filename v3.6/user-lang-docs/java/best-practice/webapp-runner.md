---
title: Webapp Runner
summary: how-to-use-rainbond
toc: false
---
<div id="toc"></div>

Webapp Runner可以在任何安装有JRE环境的系统中利用Tomcat将应用程序启动。使用Webapp Runner不需要安装Tomcat。它只是一个jar文件可以用`java`命令运行和配置。

这篇文档将会教您如何构建应用程序，并通过Wepapp Runner启动，最终部署到云帮。

您可以按照下面的每一步从头开始构建一个应用程序，或者直接跳到最后浏览文章源码。

## Webapp Runner 是如何工作的

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

## 创建应用程序

```bash
$ mvn archetype:generate -DarchetypeArtifactId=maven-archetype-webapp
...
[INFO] Generating project in Interactive mode
Define value for property 'groupId': : com.example
Define value for property 'artifactId': : helloworld
```

(你可以使用任意的 groupId 或 artifactId)。执行完上面的命令后，`helloworld`目录会生成一个完整的Java web 应用。

##配置Maven下载Webapp Runner

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

Webapp Runner 是基于 Tomcat server的，因此 7.0.57.2 版本的 Webapp Runner 使用的是 7.0.57 版本的Tomcat。Tomcat 8 Beta测试版本对应 8.0.18.0-M1 版本的 Webapp Runner.

##运行程序

先运行如下简单的命令构建应用程序：

```Bash
$ mvn clean package
```

然后通过java命令运行起来：

```bash
$ java -jar target/dependency/webapp-runner.jar target/*.war
```

就这么简单，你的应用程序已经运行并监听8080端口

{{site.data.alerts.callout_success}}

如果你需要在启动应用之前展开WAR文件，需要在启动命令的 target/*.war选项之前添加 --expand-war

{{site.data.alerts.end}}