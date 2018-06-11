---
title: 部署Java-war & Java-jar
summary: 云昂支持Java 其他部署方式
toc: false
---

云帮为了让您更方便的部署项目，特推出识可别 **War包** 、**Jar包** 的构建模式，云帮分别称为Java-war与Java-jar。您可以在[Java-概述](lang-java-overview.html)查看 **War包** 与 **Jar包** 的代码识别方式及构建环境。

## Java-war

&emsp;&emsp;WAR文件是JAR文件的一种，其中包含JSP、Java Servlet、Java类、XML文件、标签库、静态网页（HTML和相关文件），以及构成Web应用程序的其他资源。云帮平台支持WAR文件运行。

## Java-jar

JAR文件通常是集合 类文件、数据文件或资源的文件，它的扩展名为`.jar`。云帮平台支持JAR文件运行。

### **检测**

平台通过检测 `/app`目录下`LANGUAGE`文件存在且文件内容为`java-jar`识别应用为[Java-jar](user-lang-docs/java/lang-java-overview.html#jar)应用。所以在您应用根目录下需创建`LANGUAGE`文件，并且写入`java-jar`内容。您可以通过以下命令写入：

{% include copy-clipboard.html %}

```
echo java-jar > LANGUAGE
```

