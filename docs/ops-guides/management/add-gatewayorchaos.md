---
title: 网关与构建节点管理
description: 本文介绍如何在 Rainbond 中添加和管理网关节点与构建节点
keywords:
- Rainbond 网关节点
- Rainbond 构建节点
- 节点管理
---

## 概述

在 Rainbond 中，网关节点和构建节点具有不同的职责：

- **网关节点**：负责处理外部访问请求，提供负载均衡功能
- **构建节点**：负责执行源码构建、镜像构建等任务

本文将介绍如何添加和管理这些节点。

## 前提条件

- 节点已经成功加入 Kubernetes 集群
- 拥有集群管理员权限

## 添加网关节点

1. **查看当前网关节点**
```bash
kubectl get rainbondcluster -n rbd-system -o yaml | grep -A 10 nodesForGateway
```

2. **添加新的网关节点**
```bash
# 编辑集群配置
kubectl edit rainbondcluster -n rbd-system
```

添加以下配置：
```yaml
spec:
  nodesForGateway:
  - name: node-1             # 节点名称（必填）
    externalIP: 192.168.1.1  # 外部IP（必填）
    internalIP: 192.168.1.1  # 内部IP（必填）
```

## 添加构建节点

1. **查看当前构建节点**
```bash
kubectl get rainbondcluster -n rbd-system -o yaml | grep -A 5 nodesForChaos
```

2. **添加新的构建节点**
```bash
# 编辑集群配置
kubectl edit rainbondcluster -n rbd-system
```

添加以下配置：
```yaml
spec:
  nodesForChaos:
  - name: node-1  # 节点名称（必填）
```

## 使配置生效

添加完节点配置后，需要重启 operator 使配置生效：

```bash
# 重启 operator
kubectl delete pod -n rbd-system -l name=rainbond-operator
```

## 验证配置

1. **验证网关节点**
```bash
# 检查网关 Pod 是否在新节点上运行
kubectl get pod -n rbd-system -l name=rbd-gateway -o wide
```

2. **验证构建节点**
```bash
# 检查构建服务是否在新节点上运行
kubectl get pod -n rbd-system -l name=rbd-chaos -o wide
```

## 常见问题

1. **节点添加后不生效**
   * 检查节点名称是否正确
   * 确认 operator 是否已重启
   * 查看 operator 日志排查问题

2. **网关访问异常**
   * 检查节点网络连接是否正常
   * 验证 IP 配置是否正确
   * 检查防火墙配置
