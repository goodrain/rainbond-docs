---
title: 删除节点
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1303
description: 删除节点
hidden: true
---

#### 删除计算节点

- 1. 当前支持删除计算节点，仅仅将计算节点从集群中移除,不会停计算节点上运行的服务

```
grctl node down  <被删除计算节点UUID>
grctl node delete <被删除计算节点UUID>
```

- 2. 重置计算节点(需要先从集群中删除)

```
# 慎重操作，默认会删除数据
ssh <被删除计算节点>
grctl reset
```

#### 删除管理节点

多管理节点时，需要注意etcd服务.

1. 先从etcd集群中移除需要删除的`etcdctl member remove <member id>`
2. 停管理节点服务 `grclis stop`
3. 卸载/grdata存储 `umount /grdata`
4. 重置节点 `grctl reset`

{{% notice info %}}
如果单管理节点，多计算节点时，请勿操作否则会导致计算节点不可用
{{% /notice %}}