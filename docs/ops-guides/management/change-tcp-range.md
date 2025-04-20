---
title: 配置端口范围
description: 本文介绍如何在 Rainbond 中配置和扩展 TCP/NodePort 端口范围
keywords:
- Rainbond 端口配置
- TCP 端口范围
- NodePort 端口范围
---

## 概述

在 Rainbond 中，TCP(NodePort) 的端口范围默认为 `30000-32767`。但在某些场景下，您可能需要：

* 使用更大的端口范围
* 使用特定的端口区间
* 避免与其他服务的端口冲突

本文将介绍如何调整这些端口范围。

## 端口配置说明

### 默认配置
* TCP(NodePort) 端口范围：30000-32767
* 这些端口用于对外提供服务访问

### 使用场景
* 需要暴露更多的服务端口
* 与其他服务的端口范围冲突
* 需要使用特定的端口区间

## 修改端口范围

### 主机安装方式

1. **编辑配置文件**
```bash
# 编辑 RKE2 配置文件
vim /etc/rancher/rke2/config.yaml.d/00-rbd.yaml
```

2. **添加或修改端口配置**
```yaml
# 设置新的端口范围
service-node-port-range: 20000-40000  # 根据需要调整范围
```

3. **重启服务使配置生效**
```bash
# 在管理节点执行
systemctl restart rke2-server

# 在工作节点执行
systemctl restart rke2-agent
```

### 其他安装方式

如果您使用其他方式安装的 Kubernetes：

1. **修改 kube-apiserver 配置**
```bash
# 具体路径可能因安装方式不同而异
vim /etc/kubernetes/manifests/kube-apiserver.yaml
```

2. **添加或修改参数**
```yaml
spec:
  containers:
  - command:
    - kube-apiserver
    - --service-node-port-range=20000-40000  # 添加此行
```

## 常见问题

1. **配置未生效**
   * 检查配置文件格式
   * 确认服务是否正确重启

2. **服务访问异常**
   * 检查防火墙配置
   * 验证端口是否被占用
   * 确认服务配置是否正确

3. **端口冲突**
   * 检查其他服务的端口使用
   * 调整端口范围避免冲突
   * 考虑使用其他端口区间
