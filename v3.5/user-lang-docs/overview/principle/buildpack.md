---
title: Buildpack
summary: 构建组件
toc: false
---
&emsp;&emsp;Buildpack为应用程序提供框架和运行时支持。buildpack目录至少含有一个`/bin`目录，并且`/bin`下需要含有三个文件：`detect`、`compile`和`release`，且文件名固定。

## detect

该文件作用是检测您的源码，识别语言类型。

## compile

这是buildpack的核心文件，一般作用就是去拉取、配置对应的Runtime(如: python2.7/ruby1.9.3)、Framework

(如:Flask/Django)等。

## release

云帮会根据代码情况使用此文件。一般执行该文件时最终会输出一个yaml文件，内容描述如何启动您的应用。