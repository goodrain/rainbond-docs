---
title: 云帮部署java-maven应用
summary: 云帮支持的java-maven应用通过pom.xml文件来进行项目的依赖管理。
toc: false
---
<div id="toc"></div>

云帮通过 maven 对包含 `pom.xml` 文件的 java项目进行构建，最终根据 `pom.xml` 中的打包需求生成 `jar`包 或者 `war`包。

本文以好雨官方 [java-maven-demo](https://github.com/goodrain-apps/java-maven-demo) 为示例进行说明。

## 打包

云帮检测出项目为maven项目后，在构建阶段会将代码打包，在`pom.xml`文件中示例程序将编译后的文件打包为war包。

`pom.xml`
{% include copy-clipboard.html %}

```xml
...
...
    <packaging>war</packaging>
...
...
```

## 自动构建

平台检测为java-maven项目后，会自动通过mvn命令进行构建操作，具体的构建命令为：



{% include copy-clipboard.html %}

```bash
mvn -B -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true clean install
```

{{site.data.alerts.callout_success}}

后续版本会引入自定义maven构建命令的功能。

{{site.data.alerts.end}}

## 应用运行

平台默认通过 webapp-runner.jar 将 打包的 `war` 包运行起来，类似如下命令：

{% include copy-clipboard.html %}

```
java $JAVA_OPTS -jar /opt/webapp-runner.jar   --port $PORT target/*.war
```

{{site.data.alerts.callout_success}}

- JAVA_OPTS ： 平台会根据应用的内存大小，自动设置Xmx和Xms的值
- PORT ： 默认监听端口为 5000

{{site.data.alerts.end}}

## 自定义运行命令

用户可以通过在代码根目录创建 [Procfile](/docs/stable/user-lang-docs/etc/procfile.html) 文件并编辑该文件，可以实现自定义运行命令：

{% include copy-clipboard.html %}

```bash
web: java $JAVA_OPTS -jar  target/*.jar
```

{{site.data.alerts.callout_danger}}
自定义启动命令时需要注意Procfile文件的格式：

- 必须以 `web: ` 开头
- 文件结尾不能包含特殊字符
{{site.data.alerts.end}}


本文示范demo源码：[java-maven-demo](https://github.com/goodrain-apps/java-maven-demo)
