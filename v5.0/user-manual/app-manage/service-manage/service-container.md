---
title: 服务操作
summary: 服务容器命令行
toc: true
asciicast: true
---

## 进入容器命令行

运行起来的服务后端都是由容器提供的，平台提供了通过浏览器的方式登录到服务容器命令行的方式。当服务正常启动后，可以通过【管理容器】按钮，选择某个节点，进入到容器命令行：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/web-console.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 当无法正常打开控制台时，请检查服务状态是否正常。
- Web控制台只用作查看和调试程序，不建议通过控制台部署业务相关的服务。

{{site.data.alerts.end}}