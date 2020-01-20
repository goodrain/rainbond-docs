---
title: Golang
description: Golang语言类型Rainbond支持规范介绍
weight: 3310
hidden: true
---

#### Golang语言识别方式
平台默认会根据源码根目录是否有`go.mod`或`Gopkg.lock`或`glide.yaml`或`src`目录含有go文件来识别为Golang项目.

#### 编译原理

1. 预编译处理完成后,会根据语言类型选择Go的buildpack去编译项目.在编译过程中会安装定义的Golang版本;
2. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

#### Golang项目源码规范

在此步骤中，你需要提供一个可用的Go源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的`go build`,`go run`
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由[godep](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理;在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由[govendor](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理;在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由[gb](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。

##### Procfile规范

必须定义Procfile

```bash
web: hello
```

{{% notice info %}}
1. `web:`和`hello`之间有一个空格
2. 文件结尾不能包含特殊字符
3. `hello`为编译后的二进制


#### 编译运行环境设置

##### 配置Golang版本

主流支持版本 `go1.10.5`,`go1.11.2`，云帮默认版本 `go1.11.2`。

```
#支持版本 
go1.9.7 go1.8.7 go1.11.2 go1.11 go1.11.1 go1.10.5 go1.10.4
```

##### Go Tools版本

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

#### 示例demo程序

示例[https://github.com/goodrain/go-demo](https://github.com/goodrain/go-demo.git)
