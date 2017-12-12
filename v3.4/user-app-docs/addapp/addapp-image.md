---
title: 镜像构建
summary: 对于一些复杂类的应用，如MySQL服务，论坛等，是无法通过源代码进行构建的，可以通过基于Docker的镜像来部署。
toc: false
---

<div id="toc"></div>

&emsp;&emsp;云帮支持从镜像一键构建应用，对于一些相对复杂的应用，如MySQL服务，论坛等，是无法通过源代码进行构建的，这样的应用可以通过基于Docker的镜像来部署。从镜像构建应用包含以下方式：

##  官方示例

测试实例为MySQL服务，如下所示，创建分为两步：

### 创建应用 

- 自定义输入应用名
- 选择应用分组
- 选择一个官方提供的镜像示例
  - 官方提供镜像包括：tomcat、ghost、redmine
- 指定单节点内存
- 点击 **免费创建**

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical1.jpg" style="border:1px solid #eee;max-width:60%" /></center>

### 应用设置

选择镜像完毕后可以根据您的需求进行如下设置：

- 端口管理：指定您的端口号，是否对外服务，是否对外访问，选择访问方式。
- 服务依赖：根据您应用的实际需求选择您已创建的本平台其它应用来建立依赖关系。
- 环境变量：输入环境变量名称、变量名、变量值完成环境变量的添加。
- 镜像地址：显示镜像名称，将从Docker Hub拉取对应镜像。
- 容器运行命令：通过docker的运行命创建一个新的应用，您可以填写在容器中可执行的命令。如：指定应用的挂载；指定端口的映射；指定环境变量。

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical2.png" style="border:1px solid #eee;max-width:60%" /></center>

## 指定镜像地址

如下所示，创建分为两步：

### 创建应用

- 自定义输入应用名
- 选择应用分组
- 填写镜像名称或者`Docker run`的命令
  - 填写镜像名称，云帮会从Docker Hub拉取对应镜像，并且以默认配置创建一个应用。
  - 填写镜像命令时，云帮会根据您的命令拉取对应镜像并根据您指定的参数创建一个应用。
- 指定单节点内存
- 点击 **免费创建**

您可以自定义输入应用名，选择应用分组，填写镜像名称（将会从Docker Hub拉取对应镜像）或docker run命令（直接运行对应镜像），指定单节点内存后点击`免费创建`。如图：

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-point1.png" style="border:1px solid #eee;max-width:60%" /></center>

### 应用设置

参考[官方实例-应用设置](#part-8d7af150cb78c87e)。

## 上传Compose文件

&emsp;&emsp;支持上传compose文件，但目前平台不支持docker-compose的build命令。