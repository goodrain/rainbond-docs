---
title: 从Docker镜像创建应用
summary: 对于一些复杂类的应用，如MySQL服务，论坛等，是无法通过源代码进行构建的，可以通过基于Docker的镜像来部署。
toc: false
---

<div id="toc"></div>

- 云帮支持从镜像一键构建应用，对于一些相对复杂的应用，如MySQL服务，论坛等，是无法通过源代码进行构建的，这样的应用可以通过基于Docker的镜像来部署。从镜像构建应用包含以下方式：

## 指定镜像

- **指定镜像** 通过官方提供的Docker镜像来构建应用。
测试实例为tomcat服务，如下所示，创建分为三步：

### 创建应用 

- 自定义输入应用名
- 选择应用分组，可新建分组并应用
- 输入一个官方镜像的名字
- 点击 **新建应用**

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-docker-image4.png" style="border:1px solid #eee;max-width:100%" /></center>

### 高级设置

- 高级设置是应用创建前的最后一步，包含如下设置模块：

- 应用类型：应用类型分为 **无状态应用** 、**有状态应用** ，根据应用实际类型选择。

- 内存选择：在内存选择模块请根据**应用实际占用内存**选择。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-6.png" style="border:1px solid #eee;max-width:100%" /></center>

  {{site.data.alerts.callout_danger}}

  请严格按照描述选择应用类型，否则应用将无法使用。

  {{site.data.alerts.end}}

- 端口管理：根据您应用的端口开放情况在此指定，此处需确认端口号、[对外服务](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2c696518044fc4f0)、[外部访问](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2c27c8f988fb443b)、及[访问方式](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-port.html#part-2ba97bbe77ab9feb)。点击已添加的端口信息-端口号可对当前端口信息修改。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-1.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 环境变量：如下，在此指定应用创建时需指定的环境变量，点击已添加的变量信息-名称、变量名、值可对当前变量更改

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-2.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 持久化设置：将您的持久化目录挂载到分布式存储。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-3.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 文件存储：此模块为您应用持久化设计。点击 **挂载目录** 可选择 **为当前应用新设计持久化目录**、**挂载为其他应用的持久化目录**。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-4.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 服务依赖：您可点击 **新增依赖** 进行应用关联。点此了解[服务依赖](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-5.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

###构建应用

- 高级设置完毕后点击 **构建应用**，即可开始应用的构建流程。等待很短的一段时间后，应用就会构建成功，运行状态如下图：

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/done1.png" style="border:1px solid #eee;max-width:60%"/></center>

- 到此为止，您已经通过 **指定镜像** 构建了一个应用。

## DockerRun命令

**DockerRun** 通过一条个性化的命令来定制一个Docker镜像来构建应用。
测试实例为tomcat服务，如下所示，创建分为三步：

### 创建应用

- 自定义输入应用名
- 选择应用分组
- 输入一条DockerRun命令
- 点击 **新建应用**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-dockerrun1.jpg" style="border:1px solid #eee;max-width:100%"/></center>

### 其余构建过程

> **高级设置**：参考**[指定镜像-高级设置](#part-2f1c72d28697de5f)**。
>
> **构建应用**：参考**[指定镜像-构建应用](#part-2cb7b84090d34f7d)**。

## DockerCompose

- 在V3.5版本中上线了__DockerCompose__build功能，通过它，您可以输入一段合法的个性化Compose代码，来编排一系列的容器。这最终会给您提供一个相对复杂的应用，例如MySQL与Wordpress的组合。

###创建应用

- 自定义输入组名
- 输入Compose内容
- 点击 **新建应用**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-compose1.jpg" style="border:1px solid #eee;max-width:100%"/></center>

- 值得注意的是，在 **V3.5** 版本里，支持的 **Compose版本** 上限为 **2.X**

###其余构建过程

> **高级设置**：参考**[指定镜像-高级设置](#part-2f1c72d28697de5f)**。
>
> **构建应用**：参考**[指定镜像-构建应用](#part-2cb7b84090d34f7d)**。