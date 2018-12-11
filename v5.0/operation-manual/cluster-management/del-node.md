---
title: 删除节点
summary: 删除一个计算节点
toc: true
---

{{site.data.alerts.callout_danger}}

- 当前支持删除计算节点，如需删除管理节点，请联系好雨科技工程师协助。

{{site.data.alerts.end}}

## 一、 命令行方式

```bash
# 在管理节点node01执行如下操作

grctl node down  <被删除计算节点UUID>

grctl node delete <被删除计算节点UUID>
```

## 二、管理后台删除

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/del-node.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/del-node.png" width="100%"  /></a>