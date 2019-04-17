---
title: "应用处于启动状态"
date: 2019-04-17T12:50:54+08:00
draft: false
hidden: true
---

#### 确定集群是否正常

```
grctl cluster
```

#### 查看应用状态

```
# 5.1.3版本支持伸缩处获取相关命令
grctl service get <应用别名> -t <团队别名>
```

看PodStatus状态:

```
# 如下是应用已经正常启动了，大部分情况是Ready状态是False
PodStatus:    	Initialized : True  Ready : True  PodScheduled : True
```

#### Pod Read状态False排查

1. Containers是否已经启动，如果已经启动状态还是False，请检查应用健康检查;
2. Containers未启动或者在重启，请查看登录到相关节点查看容器日志

#### 查看k8s Events信息

```
kubectl describe pods/<PodName> -n <Namespace>
```

