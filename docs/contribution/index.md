---
title: '贡献指南'
description: '引导您为Rainbond做出贡献'
---

## 为 Rainbond 做出贡献

Rainbond 是一个云原生应用管理平台，使用简单，不需要懂容器、Kubernetes和底层复杂技术，支持管理多个Kubernetes集群，和管理企业应用全生命周期。主要功能包括应用开发环境、应用市场、微服务架构、应用交付、应用运维、应用级多云管理等。

如果你有兴趣为 Rainbond 做出贡献，希望这份文档能够让你的贡献过程更加简单、快速、有效。

如果你是开源贡献初学者，可以参阅 [Open Source Guides](https://opensource.guide/) 网站，它提供了一些开源贡献指南，为想要学习如何为开源项目做出贡献的人、社区和公司提供了一系列资源。

## CODE_OF_CONDUCT

Rainbond 希望项目参与者遵守行为准则，请阅读 [CODE_OF_CONDUCT](https://github.com/goodrain/rainbond/blob/main/CODE_OF_CONDUCT.md)。

## 参与其中

有许多方法可以为 Rainbond 做出贡献，不仅仅是代码贡献：

* 处理未解决 [issues](https://github.com/goodrain/rainbond/issues)，提出你的解决思路。
* 反馈 Bug。当你发现一个 bug，请使用 [issues](https://github.com/goodrain/rainbond/issues) 来报告和讨论。
* 提出新功能。当你想要提出一个新功能，请使用 [issues](https://github.com/goodrain/rainbond/issues) 来报告和讨论。
* [代码贡献](/docs/contribution/code/)
* [文档贡献](/docs/contribution/document/)

贡献是非常受欢迎的，如果你认为你的贡献需要帮助时，请添加[小助手微信](/community/support)联系我们，由 Rainbond TOC 成员帮助你继续贡献。

以下是为 Rainbond 贡献的主要步骤：

1. 根据项目、文档 Fork 对应的仓库
2. 克隆到本地并安装依赖
3. 创建新分支进行开发或文档修改
4. 本地运行或打包测试
5. 提交符合规范的 Commit 并推送到远程仓库
6. 创建 Pull Request，说明你此次提交解决的问题
7. 等待 CI 检查和维护者审核
8. 审核通过将会合并到主分支，需要修改的则会在 PR 中讨论

## Git Commit 规范

我们参考 [Angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)，尽量提供更明确的历史信息，方便判断提交目的和浏览。每个 commit message 包含一个 header，body 和 footer。header 有一个特殊的格式包含有 type，scope 和 subject：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

header、body、footer 之间都要空一行，header 是必填项，scope 是选填项。commit message 的每一行的文字不能超过 72 个字符。这样子在 github 和 git 工具上更便于阅读。

### Type

type 用于说明 commit 的类别，必须为以下类型的一种：

- feat: 新的功能
- fix: 修复 bug
- docs: 只是文档的更改
- style: 不影响代码含义的更改 (例如空格、格式化、少了分号)
- refactor: 既不是修复 bug 也不是添加新功能的代码更改
- perf: 提高性能的代码更改
- test: 添加或修正测试
- chore: 对构建或者辅助工具的更改，例如生成文档
- ci: 对 CI 配置或脚本的修改，例如 Github Actions
- revert: 回滚某一次提交

### Scope(可选项)

scope 用于说明 commit 影响的范围，当影响的范围有多个时候，可以使用 * 或不填。scope 是可选的，它可以给类型提供附加的上下文信息并包含在括号中，它可以是指定提交更改位置的内容。也可以是修复 Github 某个 issues 的链接。例如：fix(worker)、fix(#123)等。

### Subject

subject 用于对 commit 变化的简洁描述：

- 使用祈使句，一般以动词原形开始，例如使用 change 而不是 changed 或者 changes
- 第一个字母小写
- 结尾不加句号（.）

### 示例

```
feat: add code audit function

fix(api): wrong number of running apps

style: add couple of missing semi colons
```

## 撰写合格 Commit message 的工具

[Commitizen](https://github.com/commitizen/cz-cli) 是一个撰写合格 Commit message 的工具。

### 安装

```
npm install -g commitizen
npm install -g cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### 使用

```
git add .
git cz
```

接下来选择对应的影响范围，输入提交消息即可。

## Pull Request 规范

当我们接受 Pull Request 时，会将所有提交压缩为一个。因此 Pull Request 的标题将会成为提交消息的主题行。所以我们希望 Pull Request 的标题也能提供较准确的信息。请确保 Pull Request 的标题使用与提交消息中的主题行相同的格式。如果不遵循该格式，将无法通过 CI 检查。
