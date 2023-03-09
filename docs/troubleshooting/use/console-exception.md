---
title: 控制台异常排查
description: 介绍 Rainbond 控制台出现服务端异常问题排查
keywords:
- Rainbond 服务端异常排查
---

本文介绍使用 Rainbond 时，右上角弹出的一些警告排查方法，例如：服务端异常。

## 排查思路

:::tip
在控制台页面中进行操作时，右上角弹出警告，或者其他未预期的展示的情况下，参考以下内容排查问题。
:::

当出现问题时，优先检查其日志，根据日志排查问题。

进入控制台的 **平台管理 -> 日志 -> 控制台日志**，根据日志排查问题。


## 常见问题

### 服务端异常

这一类问题说明控制台自身出了问题，根据 [排查思路](#排查思路) 查询并分析日志文件进而解决问题。

#### database is locked

控制台日志提示 `database is locked` 时，说明控制台数据库被锁定，导致这个原因可能是同时操作了多个数据，可以等待或重启控制台解决，或者切换控制台的数据库为 MySQL 永久解决该问题。

### 获取节点列表失败

出现该问题说明 Kubernetes 集群的节点 Labels 不匹配，导致控制台无法获取节点列表，默认通过 `node-role.kubernetes.io/worker=true node-role.kubernetes.io/master=true` 标签来区分节点角色，查看节点标签是否正确：
  
```bash
kubectl get nodes --show-labels
```

如果不存在该标签，可以通过以下命令添加：

```bash
kubectl label nodes <node-name> node-role.kubernetes.io/worker=true
```

## 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
