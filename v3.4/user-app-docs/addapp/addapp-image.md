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
- 选择应用分组，可新建分组并应用
- 选择一个官方提供的镜像示例
  - 官方提供镜像包括：tomcat、ghost、redmine
- 点击 **免费创建**

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical1.png" style="border:1px solid #eee;max-width:60%" /></center>

### 应用设置

应用设置是应用创建前的最后一步，包含如下设置模块：

- 应用类型：如下，应用类型分为 **无状态应用** 、**有状态应用** ，根据应用实际类型选择。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-3.png" style="border:1px solid #eee;max-width:60%" /></center>

  {{site.data.alerts.callout_danger}}

  请严格按照描述选择应用类型，否则应用将无法使用。

  {{site.data.alerts.end}}

- 内存选择：如下，在内存选择模块请根据应用实际占用内存选择。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-4.png" style="border:1px solid #eee;max-width:30%" /></center>

- 端口管理：如下，根据您应用的端口开放情况在此指定，此处需确认端口号、[对外服务](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2c696518044fc4f0)、[外部访问](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2c27c8f988fb443b)、及[访问方式](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2ba97bbe77ab9feb)。点击已添加的端口信息-端口号可对当前端口信息修改。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-5.png" style="border:1px solid #eee;max-width:60%" /></center>

- 服务依赖：如下，您可点击 **新增依赖** 进行应用关联。点此了解[服务依赖](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-6.png" style="border:1px solid #eee;max-width:60%" /></center>

- 文件存储：如下，此模块为您应用持久化设计。点击 **挂载目录** 可选择 **为当前应用新设计持久化目录**、**挂载为其他应用的持久化目录**。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-7.png" style="border:1px solid #eee;max-width:60%" /></center>

- 环境变量：如下，在此指定应用创建时需指定的环境变量，点击已添加的变量信息-名称、变量名、值可对当前变量更改

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-8.png" style="border:1px solid #eee;max-width:60%" /></center>

- 镜像地址：如下，该模块显示镜像名称，并在构建过程中从Docker Hub拉取对应镜像。点击镜像名称可更改。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-9.png" style="border:1px solid #eee;max-width:60%" /></center>


- 容器运行命令：如下，该模块可通过docker的运行命令创建应用，您可以填写在容器中可执行的命令。如：指定应用的挂载；指定端口的映射；指定环境变量等。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-offical-10.png" style="border:1px solid #eee;max-width:60%" /></center>

## 指定镜像地址

如下所示，创建分为两步：

### 创建应用

- 自定义输入应用名
- 选择应用分组
- 填写镜像名称或者`Docker run`的命令
  - 填写镜像名称，云帮会从Docker Hub拉取对应镜像，并且以默认配置创建一个应用。
  - 填写镜像命令时，云帮会根据您的命令拉取对应镜像并根据您指定的参数创建一个应用。
- 点击 **免费创建**

您可以自定义输入应用名，选择应用分组，填写镜像名称（将会从Docker Hub拉取对应镜像）或docker run命令（直接运行对应镜像），指定单节点内存后点击`免费创建`。如图：

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-image-point-1.png" style="border:1px solid #eee;max-width:60%" /></center>

### 应用设置

参考[官方实例-应用设置](#part-8d7af150cb78c87e)。

## 上传Compose文件

&emsp;&emsp;支持上传compose文件，但目前平台不支持docker-compose的build命令。