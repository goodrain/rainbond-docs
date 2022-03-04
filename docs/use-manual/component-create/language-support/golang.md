---
title: Golang
description: Golang语言类型Rainbond支持规范介绍
---

### Golang 语言识别方式

当源代码根目录下存在 `go.mod` 文件，且不存在 `Dockerfile` 文件时，Rainbond 会将源代码识别为 `Golang` 项目。

### 编译原理

1. 预编译处理完成后,会根据语言类型选择 `Golang` 的 `buildpack` 去编译项目.在编译过程中会安装定义的 `Golang` 版本;
2. 编译完成后会检查是否在平台设置了 `Procfile` 参数,若配置了会重写启动命令配置文件 Procfile。

### Golang 项目源码规范

在此步骤中，你需要提供一个可用的 Go 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的`go build`,`go run` 。

2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上。
<!-- 3. 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由[godep](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理;在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由[govendor](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理;在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由[gb](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。 -->

### 编译指定模块

如果在当前项目中存在多个服务，即可以编译成多个二进制，或者 main 文件不在代码主目录中。golang 中通常使用 cmd 路径下一个包一个服务。这时按照上述方式还不能正确的进行编译和运行。

环境变量中添加 `BUILD_GO_INSTALL_PACKAGE_SPEC` 变量定义组件编译包入口路径，例如：

```bash
BUILD_GO_INSTALL_PACKAGE_SPEC=goodrain.com/app-store/cmd/manage-server
```

其中 `goodrain.com/app-store` 是项目主名称，与 go.mod 中的 `module` 一致。

`/cmd/manage-server ` 是相对于代码主目录的当前组件 main 入口代码所在包路径。

#### Procfile 规范

必须通过代码根目录下上传 `Procfile` 文件，或者声明环境变量 `BUILD_PROCFILE` 的方式定义启动命令，格式如下：

```bash
web: hello
```

1. `web:` 和 `hello` 之间有一个空格
2. 文件结尾不能包含特殊字符
3. `hello` 为编译后的二进制

对于指定模块进行编译的项目而言，应做如下定义：

```bash
web: bin/manage-server
```

其中 `manage-server` 就是默认的 cmd 目录下服务子目录路径。二进制文件统一存放于 bin 目录下。

### 编译运行环境设置

#### 配置 Golang 版本

主流支持版本 `go1.16`,`go1.10.5`,`go1.11`，云帮默认版本 `go1.11`。

```
#支持版本
go1.16 go1.15 go1.14 go1.13 go1.12 go1.10 go1.9 go1.8
```

#### Go Tools 版本

- Dep
  默认支持版本 v0.4.1
- Glide
  默认支持版本 v0.12.3
- Govendor
  默认支持版本 v1.0.8
- GB
  默认支持版本 0.4.4
- PkgErrors
  默认支持版本 0.8.0
- HG
  默认支持版本 3.9
- TQ
  默认支持版本 v0.5
- MattesMigrate
  默认支持版本 v3.0.0

### 示例 demo 程序

示例[https://github.com/goodrain/go-demo](https://github.com/goodrain/go-demo.git)
