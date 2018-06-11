---
title: 从源码构建
summary: 云帮平台的源码构建时，会根据不同的语言下载该语言的运行时（Runtime）环境，如PHP源码，会根据用户的环境相关的配置，去下载PHP的运行时，扩展组件等等，Java语言也会根据用户选择的jre的版本去下载不同的jre程序包
toc: false
---

<div id="toc"></div>

- 云帮平台的源码构建时，会根据不同的语言下载该语言的运行时（Runtime）环境，如PHP源码，会根据用户的环境相关的配置，去下载PHP的运行时，扩展组件等等，Java语言也会根据用户选择的jre的版本去下载不同的jre程序包。从源码构建包含以下方式：

## 官方demo

- **官方demo**提供由官方的镜像构建应用的方案。检测实例为2048小游戏，如下所示，创建分为四步：

### 创建应用
- 自定义输入应用名
- 选择应用分组
- 选择平台内置官方实例
  -    官方示例包括：2048小游戏、静态Web、PHP、Python、Node.js、Golang、Java
- 点击 **免费创建**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-offical-demo1.png" style="border:1px solid #eee;max-width:100%"/></center>

### 代码同步

- 系统根据创建时提交代码进行同步并检测语言类型；同步完成页面会给予反馈。如图：

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-offical-demo2.png" style="border:1px solid #eee;max-width:100%"/></center>

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-offical-demo3.png" style="border:1px solid #eee;max-width:100%" /></center>

### 高级设置

- 应用类型：应用类型分为 **无状态应用** 、**有状态应用** ，根据应用实际类型选择。

- 内存选择：在内存选择模块请根据**应用实际占用内存**选择。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-6.png" style="border:1px solid #eee;max-width:100%" /></center>

  {{site.data.alerts.callout_danger}}

  请严格按照描述选择应用类型，否则应用将无法使用。

  {{site.data.alerts.end}}

- 端口管理：根据您应用的端口开放情况在此指定，此处需确认端口号、协议类型、[对内服务](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-port.html#part-2c6963e937fac9c1)、[对外服务](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-port.html#part-2c696518044fc4f0)。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-1.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 环境变量：如下，在此指定应用创建时需指定的环境变量，点击已添加的变量信息-名称、变量名、值可对当前变量更改

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-2.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 持久化设置：将您的持久化目录挂载到分布式存储。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-3.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 文件存储：此模块为您应用持久化设计。点击 **挂载目录** 可选择 **为当前应用新设计持久化目录**、**挂载为其他应用的持久化目录**。

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-4.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

- 服务依赖：您可点击 **新增依赖** 进行应用关联。点此了解[依赖](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-reliance.html)

  <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-config-5.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

###构建应用

- 高级设置完毕后点击 **构建应用**，即可开始应用的构建流程。等待很短的一段时间后，应用就会构建成功，运行状态如下图：

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/done1.png" style="border:1px solid #eee;max-width:60%"/></center>

- 到此为止，您已经通过 **官方demo** 构建了一个应用。
  
### 高级选项

- 平台会根据代码的语言类型来提示设置应用运行的环境的版本，目前平台所支持的版本请参考*代码版本支持参考*。例如PHP语言可选[BCMath](http://docs.php.net/bcmath)、[Calendar](https://user.goodrain.com/apps/jfteam/gr7c1e25/app-language/http/docs.php.net/calendar)、[Exif](http://docs.php.net/exif)等扩展。

## 自定义源码

- **自定义源码** 提供由GitHub链接来构建应用的方案。检测实例为tomcat，构建共分三步：

### 创建应用

- 自定义输入应用名

- 选择应用分组

- 输入公开的源码Git仓库地址

- 输入您的Git信息

- 点击 **免费创建**

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-selfdefine1.jpg" style="border:1px solid #eee;max-width:100%" /></center>


### 其余构建过程


> **代码同步**：参考**[官方demo-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方demo-高级设置](#part-2f1c72d28697de5f)**。
>
> **构建应用**：参考**[官方demo-构建应用](#part-2cb7b84090d34f7d)**。
>
> **高级选项**：参考**[官方demo-高级选项](#part-2f1c72d2858f94ae)**。

## GitHub项目

- **GitHub项目** 通过云帮关联GitHub后，可将您GitHub上的代码在好雨云平台部署。

检测实例为2048小游戏，如下所示，创建分为四步：

### 创建应用

- 自定义输入应用名

- 选择应用分组
- 选择已关联GitHub中项目
- 点击 **免费创建**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-github2.jpg" style="border:1px solid #eee;max-width:100%" /></center>

### 其余构建过程

> **代码同步**：参考**[官方demo-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方demo-高级设置](#part-2f1c72d28697de5f)**。
>
> **构建应用**：参考**[官方demo-构建应用](#part-2cb7b84090d34f7d)**。
>
> **高级选项**：参考**[官方demo-高级选项](#part-2f1c72d2858f94ae)**。

## 好雨代码仓库

- **好雨代码仓库**在创建应用的同时也创建一个代码仓库，该代码仓库是好雨云平台提供的免费Git仓库，通过http://code.goodrain.com 使用。用户名和密码即为好雨 Git 用户名和密码。

检测实例为Java程序，如下所示，创建分为四步：

###创建好雨Git账号

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-goodrain0.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

### 创建应用

- 自定义输入应用名
- 选择应用分组
- 选择好雨Git项目
  - 选择已有项目
  - 选择新建项目，通过新给定的库地址，复制Git代码到对应的库中
- 点击 **免费创建**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/V3.5/addapp-goodrain1.jpeg" style="border:1px solid #eee;max-width:100%" /></center>

### 其余构建过程

> **代码同步**：参考**[官方demo-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方demo-高级设置](#part-2f1c72d28697de5f)**。
>
> **构建应用**：参考**[官方demo-构建应用](#part-2cb7b84090d34f7d)**。
>
> **高级选项**：参考**[官方demo-高级选项](#part-2f1c72d2858f94ae)**。

## 代码支持版本参考

- **Java**
  默认支持openjdk，版本支持1.8(默认)，1.7，1.6 。
- **PHP**
  版本支持7.0.3，5.6.11(默认)，5.5.27，5.4.40，5.3.29；支持PHP扩展 。
- **Static**
  支持Nginx(默认)，Apache。
- **Python**
  默认支持 2.7.10。
  可通过在根目录添加`runtime.txt`文件指定Python版本(2.4.4 - 3.4.3)，推荐Python-2.7.10 或 Python-3.4.3。
- **Node.JS**
  默认支持到v6.5.0版本，可在`package.json`指定版本。
- **Golang**
  默认支持版本1.5.1。
- **Ruby**
  默认版本Ruby 2.0.0，可指定所需版本。
