---
title: 云帮支持Scala
summary: 云帮可以将scala程序轻松部署到平台，并提供灵活伸缩的高可用特性。
toc: false
---
&emsp;&emsp;云帮可以将scala程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署基于play框架或spray框架的wab程序。我们致力于在不改变开发习惯情况下将您的应用在云帮快速部署、运行、灵活伸缩！

## 代码识别

若您代码存在如下情况时，平台会自动检测为Scala语言：

- 根目录包存在`<文件名>.sbt`文件
- 根目录下的`/project`目录下存在`<文件名>.scala`文件
- 根目录下的`/.sbt`目录下存在`<文件名>.scala`文件

上述情况符合其中之一云帮识别您的代码使用Scala语言，若根目录下的`/conf`目录下存在`application.conf`，云帮识别您提交的代码为[Play](lang-scala-play.html)框架。