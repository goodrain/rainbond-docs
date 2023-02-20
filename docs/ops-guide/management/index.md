---
title: Rainbond 组件运维
descrition: 该章节文档适用于运维人员了解Rainbond集群运维等相关知识
keywords:
- Rainbond 组件运维
- Rainbond 运维
---

本章主要讲述Rainbond系统组件的常见运维方式，以帮助用户更快速，高效的运维Rainbond。



## 组件信息

各个组件介绍请参见 [Rainbond组件概述](/docs/ops-guide/component/)

### 查看组件详细信息

这里以 `rbd-api` 组件为例,查看详细信息

```bash
kubectl describe pod -l name=rbd-api   -n rbd-system
```

### 日志查看

#### 集群端日志查看

**对于以pod方式运行的组件，可以使用以下方式查看日志**

- 实时查看日志

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

选项解释:

  -f, --follow  持续输出日志     
  -l, --label  标签
    

- 查看最近20行日志

```bash
kubectl logs --tail=20 -l name=rbd-api  -n rbd-system
```

- 查看过去1个小时的日志

```bash
kubectl logs --since=1h -l name=rbd-api  -n rbd-system
```

要查看其他组件日志，只需将name后的组件名称替换为想要查看日志的组件即可

#### 控制台日志查看

控制台日志在容器内的，`/app/logs/goodrain.log`

```shell
# Allinone 部署的控制台
docker exec -it rainbond-allinone bash
tail -f /app/logs/goodrain.log

# 部署在集群中
# 进入 rainbond-console 的 Web 终端中，执行：
tail -f /app/logs/goodrain.log

# Helm 部署
kubectl exec -it rbd-app-ui-xxx -n rbd-system bash
tail -f /app/logs/goodrain.log
```

## 更多运维指南

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```