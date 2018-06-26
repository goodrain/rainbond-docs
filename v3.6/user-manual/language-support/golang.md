---
title: 通过Golang源码创建
summary: 通过Golang源码创建
toc: false
---

<div id="toc"></div>

Go，又称golang，是Google开发的一种静态强类型、编译型，并发型，并具有垃圾回收功能的编程语言。通过云帮您可以轻松部署和扩展Go应用。无论你是喜欢`Beego`框架,还是`Martini`等框架，云帮都会让您以喜欢的方式来构建应用。

## 代码识别

当buildpack检查您的应用含有如下情况时，您的应用被识别为Go应用：

- 在根目录的`/Godeps`目录下有`Godeps.json`文件，标识应用由[godep](https://devcenter.heroku.com/articles/go-dependencies-via-godep)管理。
- 在根目录的`/vendor`目录下有`Govendor.json`文件，标识应用由[govendor](https://devcenter.heroku.com/articles/go-dependencies-via-govendor)管理。
- 在根目录的`/src`目录下包含`<文件名>.go`文件，标识应用由[gb](https://devcenter.heroku.com/articles/go-dependencies-via-gb)管理。

## Go支持版本

主流支持版本 `go1.7.5`,`go1.8`，云帮默认版本 `go1.8`。

| 版本    | 建议版本    | 其他版本                          |
| ----- | ------- | ----------------------------- |
| go1.8 | go1.8   |                               |
| go1.7 | go1.7.5 |                               |
| go1.6 | go1.6.4 | go1.6，go1.6.1，go1.6.2，go1.6.3 |
| go1.5 | go1.5.4 | go1.5，go1.5.1，go1.5.2，go1.5.3 |
| go1.4 | go1.4.3 | go1.4，go1.4.1，go1.4.2         |
| go1.3 | go1.3.3 | go1.3，go1.3.1，go1.3.2         |
| go1.2 | go1.2.2 | go1.2，go1.2.1                 |
| go1.1 | go1.1.2 | go1.1，go1.1.1                 |
| go1   | go1.0.3 | go1，go1.0.1，go1.0.2           |

## Go Tools版本

- Glide
  默认支持版本v0.12.3
- Govendor
  默认支持版本1.0.8
- GB
  默认支持版本 0.4.3
- PkgErrors
  默认支持版本 0.8.0
- HG
  默认支持版本3.9


## 示例代码

- [Go示例代码](http://code.goodrain.com/demo/go-hello/tree/master)