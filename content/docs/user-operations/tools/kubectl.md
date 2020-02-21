---
title: Kubectl 命令行工具
description: Kubectl工具集
weight: 1006
hidden: true
---

### 功能特性

Kubectl是用于控制Kubernetes集群的命令行工具，通过kubectl能够对集群本身进行管理，Rainbond 5.2版本支持对接Kubernetes，原生支持了kubectl命令行工具。

#### 集群管理

```bash
# 查看集群信息
kubectl cluster-info
# 更详细
kubectl cluster-info dump
# 显示集群中node的资源使用情况
kubectl top node
# 查看组件的cpu，内存资源的使用率
kubectl top pod -A
```

#### 节点管理


```bash
# 查看节点
kubectl get node
# 查看节点详细信息
kubectl describe node <NAME> -n <NAMESPACE>
# 禁止调度节点
kubectl cordon <NAME>
# 恢复调度节点
kubectl uncordon <NAME>
# 该节点不可调度，在其他可用节点重新启动pods(驱逐该节点上的所有pod)
kubectl drain <NAME>
# 删除节点
kubectl delete node <NAME>
```

#### pod管理

pod是最小的管理元素，Pod是最小的，管理，创建，计划的最小单元.

```bash
# 查看所有pod
kubectl get pod -A
# 查看所有pod所属的命名空间并且查看都在哪些节点上运行
kubectl get pods -o wide -A
# 查看pod详细信息
kubectl describe pod <NAME> -n <NAMESPACE>
# 查看pod日志
kubectl logs <NAME>
# 修改配置
kubectl edit pod <NAME> -n <NAMESPACE>
# 删除pod
kubectl delete pod <NAME>
# 删除所有pod
kubectl delete pod --all
# 进入容器执行操作
kubectl exec -it <NAME> bash -n <NAMESPACE>
```

更多kubectl工具使用说明请移步[Rainbond社区](https://t.goodrain.com/t/topic/1349)或参阅[Kubernetes官方文档](https://kubernetes.io/docs/reference/kubectl/overview/)

