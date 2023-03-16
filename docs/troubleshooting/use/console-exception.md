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

### 组件故障

平台管理首页出现组件故障，例如：`rbd-chaos` 组件出现故障，出现该问题有以下几种可能：

1. 监控数据收集的不及时，导致数据不正确，从而出现组件故障原因。
2. 组件的确出现故障，可以通过查看组件日志排查问题。

  ```bash
  # 查看组件状态是否为 running
  kubectl get pod -n rbd-system

  # 查看组件日志
  kubectl logs -fl name=rbd-chaos -n rbd-system
  ```

3. 组件正常工作，但组件故障的告警一直出现，可以通过以下重启组件解决：

  ```bash
  kubectl delete pod -l name=rbd-chaos -n rbd-system
  ```

### 无法查看组件实时日志

组件内无法查看到实时日志，可能会存在两种情况：

1. Websocket 配置的地址不对，导致无法通信。
2. rbd-eventlog 服务出现故障，导致无法获取日志。

排查方法：

1. 检查 Websocket 地址，**平台管理 -> 集群 -> 编辑集群** 查看 Websocket 地址，本地是否可以与该地址进行通信。
2. 检查 rbd-eventlog 服务是否正常，如果不正常排查该服务的日志或尝试重启该组件。
  ```bash
  # 查看组件状态
  kubectl get pod -l name=rbd-eventlog -n rbd-system

  # 重启组件
  kubectl delete pod -l name=rbd-eventlog -n rbd-system
  ```