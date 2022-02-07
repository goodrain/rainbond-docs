---
title: '贡献指南'
weight: 207
Description: '引导您为Rainbond做出贡献'
---
首先，感谢你考虑为 Rainbond 做出贡献。正是像你这样的人使 Rainbond 成为一个很棒的平台。
### 关于 Rainbond
Rainbond 是云原生且易用的云原生应用管理平台。云原生应用交付的最佳实践，简单易用。专注于以应用为中心的理念。赋能企业搭建云原生开发云、云原生交付云。

这个文档将会指导你如何为 Rainbond 做出贡献。
### 成为贡献者
你可以通过几种方式为Rainbond做贡献。下面是一些例子:

* 为 [Rainbond 代码库](https://github.com/goodrain/rainbond)做出贡献。
* 为 [Rainbond 文档](https://github.com/goodrain/rainbond-docs)做出贡献。
* 报告 Bug。
* 为用户和贡献者撰写技术文档和博客帖子。
* 通过回答有关Rainbond的问题来帮助他人。

### 报告 Bug
当您发现一个bug，或者对代码、文档和项目有疑问时，请使用 [Issues](https://github.com/goodrain/rainbond/issues) 来报告和讨论。

### 添加新功能
如果你想为 Rainbond 添加一些功能并贡献相关代码。请先在 [Issues](https://github.com/goodrain/rainbond/issues) 上进行讨论，并列出您想要实现的功能的效果，以及相关的设计文档。Issues 中的讨论完成后，您可以进行相关的开发工作并提交 Pull Request。我们将尽快检查您的代码。

检查别人的 Pull Request 是另一种贡献的方式。

### 文档
当你在[Rainbond官方网站](https://www.rainbond.com/)上发现任何拼写错误或重要内容需要补充时，你可以向[Rainbond文档](https://github.com/goodrain/rainbond-docs)提交 Pull Request。
### 编译项目
Rainbond 主要由以下三个项目组成。点击查看[技术架构](https://www.rainbond.com/docs/architecture/architecture/)

- [Rainbond-UI](https://github.com/goodrain/rainbond-ui)
- [Rainbond-Console](https://github.com/goodrain/rainbond-console)

> Rainbond-UI 和 Rainbond-Console 合起来构成了业务层。业务层是前后端分离模式。UI是业务层的前端代码，Console是业务层的后端代码。

- [Rainbond](https://github.com/goodrain/rainbond-console)

> Rainbond 是平台数据中心端的实现，主要与集群进行交互。

### 业务层代码编译
#### 编译前端代码镜像
```
VERSION=v5.5.0-release ./build.sh
```
#### 编译后端代码镜像
```
VERSION=v5.5.0-release ./release.sh
```
如果你想将前后端代码编译在一起，请使用如下命令
```
VERSION=v5.5.0-release ./release.sh allinone
```
### 数据中心端代码编译
#### 单组件编译
单组件编译在实际开发过程中⾮常重要，由于 Rainbond 系统的体系较为庞⼤，平时开发过程中通常是
修改了某个组件后编译该组件，使⽤最新的组件镜像在已安装的开发测试环境中直接替换镜像。

**单组件编译支持以下组件：**

- chaos
- api
- gateway
- monitor
- mq
- webcli
- worker
- eventlog
- init-probe
- mesh-data-panel
- grctl
- node

**编译⽅式如下：**

以 chaos 组件为例，在 rainbond 代码主目录下执行

```./release.sh chaos```

#### 完整安装包打包编译
编译完整安装包适⽤于改动了较多源代码后,重新⽣成安装包。在 rainbond 代码主⽬录下执⾏

```./release.sh all```
