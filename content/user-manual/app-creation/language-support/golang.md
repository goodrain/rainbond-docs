---
title: Golang
description: Golang语言类型Rainbond支持规范介绍
weight: 3310
hidden: true
---

Go，又称golang，是Google开发的一种静态强类型、编译型，并发型，并具有垃圾回收功能的编程语言。通过云帮您可以轻松部署和扩展Go应用。无论你是喜欢`Beego`框架,还是`Martini`等框架，云帮都会让您以喜欢的方式来构建应用。

## 一、代码识别

当buildpack检查您的应用含有如下情况时，您的应用被识别为Go应用：

- 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由[godep](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理。
- 在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由[govendor](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理。
- 在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由[gb](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。

## 二、Go支持版本

主流支持版本 `go1.10.5`,`go1.11.2`，云帮默认版本 `go1.11.2`。

```
#支持版本 
go1.9.7 go1.8.7 go1.11.2 go1.11 go1.11.1 go1.10.5 go1.10.4
```

## 三、Go Tools版本

- Dep
  默认支持版本v0.4.1
- Glide
  默认支持版本v0.12.3
- Govendor
  默认支持版本v1.0.8
- GB
  默认支持版本 0.4.4
- PkgErrors
  默认支持版本 0.8.0
- HG
  默认支持版本3.9
- TQ 
  默认支持版本v0.5
- MattesMigrate
  默认支持版本v3.0.0

## 四、定义启动命令

在项目的根目录定义`Procfile`

```bash
$cat Procfile
web: hello
```

其中 `hello`,就是Go项目编译后的二进制文件。

## 五、构建特性

在源码识别通过后,选择高级设置,配置环境变量来自定义Go的版本。

```bash
BUILD_GOVERSION: go1.8.7
```

## 五、示例代码

- [Go示例代码](https://github.com/goodrain/go-demo.git)