---
title: 集群故障诊断
summary: 集群故障诊断
toc: true
---

[应用构建常见问题及解决方式](../../user-manual/trouble-shooting/build-app-issue.html)

## 1. 修改主机名

理论上是不建议修改主机名。

```bash
1. grctl node down <uuid> #管理节点操作
2. systemctl stop node #计算节点
3. grctl node delete <uuid> #管理节点操作
4. systemctl start node #计算节点

```

当试用 Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按文档要求收集相关信息通过 Github [提供给 Rainbond开发者](https://github.com/goodrain/rainbond/issues/new)。
