---
title: Jetty-Runner
summary: how-to-use-rainbond
toc: false
---
<div id="toc"></div>

##Jetty 和 Jetty Runner 是什么

Jetty 是一个轻量级的 Java 应用程序 server。为应用程序的启动提供了一系列灵活的特性。其中一个比较灵活的特性就是可以使用嵌入式的Jetty，在 java-hello 代码中可以看到这种使用方式。另外一个好的特性就是 Jetty Runner本身就是一个jar文件。Jetty的每一次发布版本都会包含一个 Jetty Runner jar 文件。这个jar文件可以通过java命令配合war文件直接运行。例如下面的示例：

```
$ java -jar jetty-runner.jar application.war
```

Jetty Runner 会启动一个Jetty实例将war运行起来。

##创建应用程序

```Bash
$ mvn archetype:generate -DarchetypeArtifactId=maven-archetype-webapp
...
[INFO] Generating project in Interactive mode
Define value for property 'groupId': : com.example
Define value for property 'artifactId': : helloworld
```

(你可以使用任意的 groupId 或 artifactId)。执行完上面的命令后，helloworld目录会生成一个完帐的Java web 应用。

##配置Maven下载Jetty Runner

pom.xml文件是Maven进行工作的主要配置文件。在这个文件中我们可以配置Maven项目的groupId、artifactId和version等Maven项目必须的元素；可以配置Maven项目需要使用的远程仓库；可以定义Maven项目打包的形式；可以定义Maven项目的资源依赖关系等等。

在这一步我们以依赖插件的形式下载Jetty Runner包，将下面内容添加到您pom.xml的合适位置:

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
                <groupId>org.mortbay.jetty</groupId>
                <artifactId>jetty-runner</artifactId>
                <version>9.3.3.v20150827</version>
                <destFileName>jetty-runner.jar</destFileName>
              </artifactItem>
            </artifactItems>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

##运行程序

先运行如下简单的命令构建应用程序：

```Bash
$ mvn package
```

然后通过java命令运行起来：

```Bash
$ java -jar target/dependency/jetty-runner.jar target/*.war
```

就这么简单，你的应用程序已经运行并监听8080端口

{{site.data.alerts.callout_success}}

如果你需要在启动应用之前展开WAR文件，需要在启动命令的 target/*.war选项之前添加 --expand-war

{{site.data.alerts.end}}