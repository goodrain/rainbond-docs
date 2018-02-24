---
title: 源码构建
summary: 云帮平台的源码构建时，会根据不同的语言下载该语言的运行时（Runtime）环境，如PHP源码，会根据用户的环境相关的配置，去下载PHP的运行时，扩展组件等等，Java语言也会根据用户选择的jre的版本去下载不同的jre程序包
toc: false
---

<div id="toc"></div>

&emsp;&emsp;云帮平台的源码构建时，会根据不同的语言下载该语言的运行时（Runtime）环境，如PHP源码，会根据用户的环境相关的配置，去下载PHP的运行时，扩展组件等等，Java语言也会根据用户选择的jre的版本去下载不同的jre程序包。从源码构建包含以下方式：

## 官方示例

检测实例为2048小游戏，如下所示，创建分为四步：

### 创建应用
- 自定义输入应用名
- 选择应用分组
- 选择平台内置官方实例
  -    官方示例包括：2048小游戏、静态Web、PHP、Python、Node.js、Golang、Java
- 点击 **免费创建**

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-offical.png" style="border:1px solid #eee;max-width:60%"/></center>

### 代码同步

系统根据创建时提交代码进行同步并检测语言类型；同步完成页面会给予反馈。如图：

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-offical-2.png" style="border:1px solid #eee;max-width:60%"/></center>

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-offical-3.png" style="border:1px solid #eee;max-width:60%" /></center>

### 应用设置

同步代码完毕后可以根据您的实际需求进行如下设置。如图：

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-offical-4-1.png" style="border:1px solid #eee;max-width:60%" /></center>

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-offical-4-2.png" style="border:1px solid #eee;max-width:60%" /></center>

   - 端口管理：指定您的端口号，是否对外服务，是否对外访问，选择访问方式。
   - 应用类型：包括 **无状态应用**、**有状态应用**，根据描述谨慎选择。
   - 内存选择：根据应用内存占用选择。
   - 端口管理：根据您应用的端口开放情况编辑此模块。
   - 服务依赖：此模块可选择关联其他应用，[点此了解更多](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)。
   - 文件存储：您可点击`为当前应用新设持久化目录`或点击`挂在其他应用的持久化目录`选择不同存储位置。
   - 环境变量：输入环境变量名称、变量名、变量值完成环境变量的添加。

### 高级选项

平台会根据代码的语言类型来提示设置应用运行的环境的版本，目前平台所支持的版本请参考*代码版本支持参考*。例如PHP语言可选[BCMath](http://docs.php.net/bcmath)、[Calendar](https://user.goodrain.com/apps/jfteam/gr7c1e25/app-language/http/docs.php.net/calendar)、[Exif](http://docs.php.net/exif)等扩展。

## 公开Git

**公开Git**是平台支持主流的代码托管平台的公开项目。

检测实例为2048小游戏，如下所示，创建分为四步：

### 创建应用

- 自定义输入应用名

- 选择应用分组

- 输入公开的源码Git仓库地址

- 输入该源码Git仓库Branch的版本

- 点击 免费创建

   <center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-opengit.png" style="border:1px solid #eee;max-width:60%" /></center>


### 其余构建过程


> **代码同步**：参考**[官方实例-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方实例-应用设置](#part-2c9f27d6be436681)**。
>
> **高级选项**：参考**[官方实例-高级选项](#part-2f1c72d2858f94ae)**。

## 私有Git

私有Git模块需要您建立个人GitLab，关联ssh-Key，如下：
- 对接到私有的代码托管平台。
- 在创建应用前需要将授权key添加到自建Git授权SSH 密钥里。
- 代码源选择私有平台的公开项目。
- 对接Gitlab/Gogs可参考[对接私有Git仓库](/docs/stable/best-practice/git-etcs/connection-git-server.html)

## GitHub

通过[云帮关联GitHub(点击查看关联步骤)](/docs/stable/rainBond_GitHub.html)后，可将您GitHub上的代码在好雨云平台部署。

检测实例为java程序，如下所示，创建分为四步：

### 创建应用

- 自定义输入应用名

- 选择应用分组
- 选择已关联GitHub中项目
- 点击 免费创建

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-GitHub-1.png" style="border:1px solid #eee;max-width:60%" /></center>

### 其余构建过程

> **代码同步**：参考**[官方实例-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方实例-应用设置](#part-2c9f27d6be436681)**。
>
> **高级选项**：参考**[官方实例-高级选项](#part-2f1c72d2858f94ae)**。

## 好雨Git

创建应用的同时也创建一个代码仓库，该代码仓库是好雨云平台提供的免费Git仓库，通过http://code.goodrain.com 使用。用户名和密码即为好雨 Git 用户名和密码。

检测实例为Java程序，如下所示，创建分为四步：

### 创建应用

- 自定义输入应用名
- 选择应用分组
- 选择好雨Git项目
  - 选择已有库
  - 选择新建库，通过新给定的库地址，Git代码到对应的库中
- 点击 **免费创建**

如图：<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/addapp/addapp-code-goodrain-Git.png" style="border:1px solid #eee;max-width:50%" /></center>

### 其余构建过程

> **代码同步**：参考**[官方实例-代码同步](#part-2bf3829b9f082e28)**。
>
> **应用设置**：参考**[官方实例-应用设置](#part-2c9f27d6be436681)**。
>
> **高级选项**：参考**[官方实例-高级选项](#part-2f1c72d2858f94ae)**。

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
