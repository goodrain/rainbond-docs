---
title: 构建流程
summary: 构建流程图
toc: true
---
云帮只需要您提交代码然后稍加配置，后边的事交给云帮。工作流程大致如下图：

<img src="https://static.goodrain.com/images/acp/docs/code-docs/build-process.png" width="100%"/>

1. 云帮获取您的源码
2. 平台自动打包您的代码送至[builder](principle/builder.html)，经过[buildpack](principle/buildpack.html)及其他组件的处理最终生成slug文件。
3. [runner](principle/runner.html)加载运行builder送来的slug文件。
4. 当您的代码"跑"起来，它就是一个真正的应用啦！