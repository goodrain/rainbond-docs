---
title: 云帮部署java-maven应用
summary: 云帮支持的java-maven应用通过pom.xml文件来进行项目的依赖管理，配置以下内容至您的pom.xml中。
toc: false
---
<div id="toc"></div>

&emsp;&emsp;云帮支持的 Java-maven 应用通过`pom.xml`文件来进行项目的依赖管理，配置以下内容至您的`pom.xml`中：

## 打包

云帮检测出项目为maven项目后，在构建阶段会将代码打包，所以在`pom.xml`文件中需要加入能够打包项目为war包的插件。平台需要将项目打包成war包后执行，所以需要加上`maven-war-plugin`
示例如下：

{% include copy-clipboard.html %}

```bash
<build>
<plugins>
  <plugin>
      <groupId>org.apache.maven.plugins</groupId>  <!-- 插件名称 -->
      <artifactId>maven-war-plugin</artifactId>    <!-- 组件名称 -->
      <version>2.1.1</version>					   <!-- 版本号 -->
      <configuration>
          <warName>java-hello</warName>			   <!-- war包名称 -->
      </configuration>
  </plugin>
</plugins>
</build>
```

## 配置Webapp Runner

Webapp runner可以在任何安装有JRE环境的系统中利用Tomcat将应用程序启动。使用Webapp runner不需要安装Tomcat，它只是一个jar文件可以用`java`命令运行和配置。您可以使用以下Maven配置依赖项下载Webapp runner。所以还应该在`pom.xml`中加入如下配置：

{% include copy-clipboard.html %}

```bash
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <version>2.3</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>copy</goal>
            </goals>
            <configuration>
                <artifactItems>
                    <artifactItem>
                        <groupId>com.github.jsimone</groupId>
                        <artifactId>webapp-runner</artifactId>
                        <version>8.0.33.1</version>
                        <destFileName>webapp-runner.jar</destFileName>
                    </artifactItem>
                </artifactItems>
            </configuration>
        </execution>
    </executions>
</plugin>
```

{{site.data.alerts.callout_danger}}

如果没有加上web-runner插件会在日志中显示如下错误：

```bash
Error: Unable to access jarfile target/dependency/webapp-runner
```

{{site.data.alerts.end}}

## 应用绑定webapp-runner

项目构建完成后将以下依赖项添加到您的pom.xml中，java-maven项目会默认使用webapp-renner运行：

{% include copy-clipboard.html %}

```
< dependency >
  < groupId > com.github.jsimone </ groupId >
  < artifactId > webapp-runner </ artifactId >
  < version > 8.5.11.3 </ version >
  < scope >提供</ scope >
</ dependency >
```

## 添加Profile

用户还可以根据自己的需求创建[Procfile](/docs/stable/user-lang-docs/etc/procfile.html)，并添加如下运行命令：

{% include copy-clipboard.html %}

```bash
web: java $JAVA_OPTS -jar target/dependency/webapp-runner.jar   --port $PORT target/*.war
```

{{site.data.alerts.callout_success}}
在平台上并不是所有的开发语言都需要写 Procfile文件，我们尽量让用户做得最少且不改变已有的开发习惯。但针对特殊情况目前还是需要用户简单设置一下。
部分语言的web应用我们会用默认的命令行启动，但如果用户有需求，可以自己设置运行命令，如php语言默认是apache启动的，如果用户需要用nginx启动，可以在代码根目录创建Procfile文件，并添加启动命令：
`web: vendor/bin/heroku-php-nginx`
{{site.data.alerts.end}}

按照[新建应用-源码构建](docs/stable/user-app-docs/addapp/addapp-code.html)的步骤操作，当代码提交完成后，平台就能够识别出项目所使用的语言来。如下图所示：

<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/lang-java-maven.png" style="border:1px solid #eee;max-width:70%" /></center>
