---
title: .NetCore
description: .NetCore语言类型Rainbond支持规范介绍
weight: 3310
hidden: true
---



#### .NetCore语言类型识别策略

代码主目录中包含以`.sln`或者`.csproj`结尾的文件并且不包含`Dockerfile`文件时，平台识别项目语言类型为`.NetCore`

{{% notice note %}}
目前仅支持单项目代码维护形式，如果你一个代码仓库维护了多个 Project, 例如一个微服务架构，那么首先建议你将每个 Project 分离到不同仓库或同个仓库不同二级目录下。
{{% /notice %}}

#### 代码规范

源码主目录必须具有[Procfile](../etc/profile) 文件定义服务启动方式，详见[项目运行](#项目运行)部分

#### 编译原理

对于.NetCore语言的支持与Dockerfile一样将构建出镜像而不是slug程序包，因此.NetCore不能使用Procfile文件定义。

{{% notice note %}}
NetCore语言构建过程默认使用`microsoft/dotnet:2.2-sdk-alpine` 编译镜像和`microsoft/dotnet:2.2-aspnetcore-runtime`运行环境镜像，若设置其他版本同理。若你未提前下载镜像在构建过程容易出现拉取镜像失败的错误。强烈建议先在Rainbond管理节点提前手动获取上诉镜像。
{{% /notice %}}

{{% notice note %}}
如果你的源码对系统环境有依赖，需要单独安装系统类库，目前无法直接使用Rainbond提供的默认编译环境编译，你可以采用直接定义[Dockerfile](../dockerfile)的方式支持。
{{% /notice %}}

##### 编译环境选择

当前版本平台默认使用 `microsoft/dotnet:2.2-sdk-alpine` 镜像环境进行源码编译。你可以根据需要设置编译环境版本，可选版本目前还包括包括：

* 3.0-sdk
* 2.1-sdk

设置服务环境变量 `BUILD_DOTNET_SDK_VERSION=3.0-sdk` 即可选择构建环境版本。

##### 编译方式设置

默认编译方式如下：

```
dotnet restore
dotnet publish -c Release
```

若需要在`dotnet restore`之前执行的命令可以通过 `BUILD_DOTNET_RESTORE_PRE`环境变量指定。

若需要改变默认的 `dotnet restore`命令可以通过`BUILD_DOTNET_RESTORE` 环境变量指定。比如设置如下环境变量：

```
BUILD_DOTNET_RESTORE_PRE=dotnet restore --ignore-failed-sources
```

关于环境变量的设置参考 [服务环境变量](/user-manual/app-service-manage/service-other-set/#自定义环境变量)

#### 项目运行

##### 运行环境选择

通常情况下运行环境与编译环境版本一致，当前版本默认提供的运行环境是`microsoft/dotnet:2.2-aspnetcore-runtime`，可选的运行环境版本为：

* 3.0-aspnetcore-runtime

* 2.1-aspnetcore-runtime

通过设置环境变量`BUILD_DOTNET_RUNTIME_VERSION` 设置你需要的版本

编译的结果文件存放于运行环境的`/app`目录下。由于平台咱无法很好的感知项目的入口运行文件，需要在源码主目录中定义[rainbondfile](../etc/rainbondfile/)定义项目的运行启动方式，例如：

```
ports:
   - port: 5000
     procotol: http
cmd: dotnet aspnetapp.dll
```

`ports`定义项目监听的端口（必须监听泛地址 `*`或者`0.0.0.0`）

`cmd`定义项目启动方式，根据项目 publish 后生成的入口运行文件为准。

#### 示例代码

[https://github.com/goodrain/dotnet-demo](https://github.com/goodrain/dotnet-demo)


