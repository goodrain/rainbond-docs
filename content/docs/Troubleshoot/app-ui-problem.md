---
title: 控制台问题排查
weight: 30011
Description: "组件控制台执行操作后返回请求失败弹窗"
hidden: false
pre: "<b>6.6 </b>"
---


在遇到了 **控制台请求错误** 的时候，首先应该查看控制台相关日志，进行初步排查。


#### 查看控制台日志

对通过 **默认方式** 部署的控制台，在服务器执行命令：

```bash
cat /opt/rainbond/logs/rbd-app-ui/goodrain.log
```
查看相关日志

对通过 [组件控制台高可用部署](/docs/user-operations/component/app-ui/) 的控制台服务，可通过 **组件管理** 的 **管理容器** 进入容器

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-ui-problem-2.png" width="100%">

在容器内执行
```bash
cat /app/logs/goodrain.log
```
查看相关日志

#### 解决方案

获取到相关日志后，你可以前往 [社区](https://t.goodrain.com/) 阅读前缀名为【使用问题】的帖子，寻找相似问题的答案，或者将你的情况总结发帖。

如果问题无法解决请移步 [GitHub](https://github.com/goodrain/rainbond-console/issues) 查询是否有相关的 issue ，如没有则提交 issues



