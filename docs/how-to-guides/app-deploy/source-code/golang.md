---
title: Golang 项目部署
description: 在 Rainbond 上通过源代码部署 Golang 项目
---

## 概述

当源代码根目录下存在 `go.mod` 文件，Rainbond 会将源代码识别为 `Golang` 项目。

### 编译指定模块

环境变量中添加 `BUILD_GO_INSTALL_PACKAGE_SPEC` 变量定义组件编译包入口路径，例如：

```bash
BUILD_GO_INSTALL_PACKAGE_SPEC=goodrain.com/app-store/cmd/manage-server
```

其中 `goodrain.com/app-store` 是项目主名称，与 go.mod 中的 `module` 一致。

`/cmd/manage-server ` 是相对于代码主目录的当前组件 main 入口代码所在包路径。

### Procfile 规范

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

## 部署示例

进入到团队下，新建应用选择基于源码示例进行构建，选中 Golang Demo 并默认全部下一步即可。