---
title: .NetCore源码创建
summary: Rainbond 可以识别.NetCore 语言的项目并一键编译部署到平台。
toc: true
---

Rainbond 可以识别.NetCore 语言的项目并一键编译部署到平台。

## 一、代码识别

代码主目录中包含以`.sln`或者`.csproj`结尾的文件并且不包含`Dockerfile`文件时，平台识别项目语言类型为`.NetCore`

## 二、源码编译

#### 编译环境选择

当前版本平台默认使用 microsoft/dotnet:2.2-sdk-alpine 镜像环境进行源码编译。你可以根据需要设置编译环境版本，可选版本目前还包括包括：

* 3.0-sdk
* 2.1-sdk

设置服务环境变量 `BUILD_DOTNET_SDK_VERSION=3.0-sdk` 即可选择构建环境版本。

#### 编译方式设置

默认编译方式如下：

```
dotnet restore
dotnet publish -c Release
```

若需要在`dotnet restore`之前执行的命令可以通过 `BUILD_DOTNET_RESTORE_PRE`环境变量指定。

若需要改变 `dotnet restore`命令可以通过`BUILD_DOTNET_RESTORE` 环境变量指定。

## 三、项目运行

#### 运行环境选择

通常情况下运行环境与编译环境版本一致，当前版本默认提供的运行环境是`microsoft/dotnet:2.2-aspnetcore-runtime`，可选的运行环境版本为：

* 3.0-aspnetcore-runtime

* 2.1-aspnetcore-runtime

通过设置环境变量`BUILD_DOTNET_RUNTIME_VERSION` 设置你需要的版本

编译的结果文件存放于运行环境的`/app`目录下。由于平台咱无法很好的感知项目的入口运行文件，需要在源码主目录中定义[rainbondfile](./etc/rainbondfile.html)定义项目的运行启动方式，例如：

```
ports:
   - port: 5000
     procotol: http
cmd: dotnet aspnetapp.dll
```

`ports`定义项目监听的端口（必须监听泛地址 `*`或者`0.0.0.0`）

`cmd`定义项目启动方式，根据项目 publish 后生成的入口运行文件为准。

## 四、示例代码

[dotnet-demo](https://github.com/goodrain-apps/dotnet-demo)

{{site.data.alerts.callout_success}}

- 目前仅支持单项目代码维护形式，如果你一个代码仓库维护了多个 Project,例如一个微服务架构，那么首先建议你将每个 Project 分离到不同仓库或同个仓库不同二级目录下。

{{site.data.alerts.end}}

