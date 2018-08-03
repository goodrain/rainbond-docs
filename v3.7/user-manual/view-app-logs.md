---
title: 查看应用日志
summary: 应用日志，关键日志
toc: true
---

## 一、应用的日志

当应用创建完成后，会有两种日志与该应用有关：

- 操作日志：显示应用的构建及操作信息，应用的回滚也在这里完成。
- 应用标准输出日志：应用运行后输出到<a href="https://baike.baidu.com/item/stdout" target="_blank">标准输出(stdout)</a>和<a href="https://baike.baidu.com/item/stderr" target="_blank">标准错误输出(stderr)</a>的日志。

### 1.1 应用关键日志

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/app-log01.png" width="100%" />


{{site.data.alerts.callout_success}}
- 应用操作人: 显示应用操作者的信息
- 代码提交人: 应用本次部署的代码提交人
- 代码提交信息: 应用本次部署的代码提交信息
- 查看详情: 点击可查看应用的操作详情
- 回滚到此版本: 点击可回滚到本次部署的版本
{{site.data.alerts.end}}


### 1.2 应用输出日志
可以通过应用的【日志】标签页查看应用的标准输出与标准错误输出日志。
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/app-log02.png" width="100%" />


{{site.data.alerts.callout_success}}
- 暂停推送: 暂停或继续日志的输出。
- 历史日志下载: 跳转至日志列表页面，可根据日期选择想要下载的日志。
- 最新1000条日志: 跳转到最新的1000条日志。
{{site.data.alerts.end}}



## 二、应用日志处理
本文后续更新会推出ELK日志收集、处理与展示插件的使用。