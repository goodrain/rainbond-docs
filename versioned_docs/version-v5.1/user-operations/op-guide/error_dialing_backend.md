---
title: "web进入容器报错"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 807
hidden: true
description: web进入容器提示Error from server
---

#### 报错信息

```
Error from server: error dialing backend: dial tcp: lookup 4c4c4544-0037-4d10-8057-b2c04f564c32 on 10.10.10.10:53: no such host
```

#### 排查方式

1. 管理节点dns解析发生改变 `/etc/resolv.conf`,应该是nameserver包含管理节点ip
2. 管理节点能否`ping 4c4c4544-0037-4d10-8057-b2c04f564c32`
3. 在确定上述都ok下,重启`kube-apiserver`