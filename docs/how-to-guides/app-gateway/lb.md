---
title: LoadBalancer
description: 本文介绍如何在 Rainbond 中配置和管理 LoadBalancer 类型的服务
keywords:
- LoadBalancer 配置
- 云负载均衡
---

Rainbond LoadBalancer 基于 Kubernetes Service LoadBalancer 类型实现,支持云环境和本地环境的负载均衡需求。

## 功能说明

LoadBalancer 适用于以下场景:
- **公有云环境**: 在阿里云、腾讯云、AWS 等云平台中部署,使用云厂商提供的负载均衡器
- **本地环境**: 通过 MetalLB 等解决方案为裸金属服务器或自建集群提供 LoadBalancer 支持
- 需要获得负载均衡器提供的高可用性和弹性能力
- 需要从外部直接访问集群内的服务

## 前置条件

### 公有云环境

使用云厂商 LoadBalancer 需要满足以下条件:
- 集群部署在支持 LoadBalancer 的云环境中(阿里云、腾讯云、AWS 等)
- 云环境已正确配置 Cloud Controller Manager
- 具有创建云负载均衡器的权限和配额

### 本地环境(MetalLB)

MetalLB 是一个为裸金属 Kubernetes 集群提供网络负载均衡器实现的解决方案,允许在本地环境中使用 LoadBalancer 类型的服务。关于 MetalLB 的详细安装和配置说明,请参考 [MetalLB 官方文档](https://metallb.io/)。

使用 MetalLB 需要满足以下条件:
- 集群中已安装并配置 MetalLB
- 已为 MetalLB 分配可用的 IP 地址池

## 使用步骤

### 1. 创建 LoadBalancer

在网关管理中创建 LoadBalancer:

1. 进入 **网关管理** -> **路由管理** 页面
2. 切换到 **LoadBalancer** 标签页
3. 点击 **创建 LoadBalancer** 按钮
4. 填写以下配置信息:

**基本配置**

- **组件名称**: 选择需要暴露的组件

**端口配置**

- **目标端口**: 组件的服务端口(如 80)
- **对外端口**: LoadBalancer 对外暴露的端口(如 81)
- **协议**: 选择协议类型(TCP/UDP)

可以点击 **添加端口配置** 添加多个端口映射。

**注解配置(可选)**

通过 JSON 格式配置 Service 的 annotations,用于指定云厂商负载均衡器的特定参数。

```json
注解示例:
{
  "service.beta.kubernetes.io/volcengine-loadbalancer-id": "clb-mim02n8g5kw05smt1b******"
}
```

:::info
- [火山云 LoadBalancer 文档](https://www.volcengine.com/docs/6460/100304)  
- [阿里云 LoadBalancer 文档](https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/user-guide/add-annotations-to-the-yaml-file-of-a-service-to-configure-clb-instances)  
- [腾讯云 LoadBalancer 文档](https://cloud.tencent.com/document/product/457/51258)
:::

5. 点击 **创建 LoadBalancer** 按钮完成创建

### 2. 查看 LoadBalancer 状态

创建成功后,在 LoadBalancer 列表中可以看到:

- **组件名称**: 关联的组件
- **端口配置**: 端口映射关系
- **外部 IP**: 云厂商分配的负载均衡器 IP 地址(创建成功后显示)
- **状态**: 显示 LoadBalancer 的当前状态
  - **就绪**: LoadBalancer 创建成功,可以正常访问
  - **创建中**: 正在创建云负载均衡器
  - **失败**: 创建失败,需要检查配置或权限

### 3. 编辑 LoadBalancer

如需修改 LoadBalancer 配置:

1. 在 LoadBalancer 列表中找到对应的服务
2. 点击 **编辑** 按钮
3. 修改端口配置或注解配置
4. 点击 **更新** 按钮保存更改

**注意**: 修改配置可能会触发云负载均衡器的更新或重建。

### 4. 访问服务

LoadBalancer 创建成功后,可以通过外部 IP 访问服务:

```
<外部IP>:<对外端口>
```

### 5. 删除 LoadBalancer

如不再需要 LoadBalancer:

1. 在 LoadBalancer 列表中找到对应的服务
2. 点击 **删除** 按钮
3. 确认删除

**注意**: 删除 LoadBalancer 会同时删除云厂商的负载均衡器资源。

## 注意事项

### 公有云环境

- LoadBalancer 类型服务会在云厂商创建实际的负载均衡器资源,**可能产生费用**
- 确保云账户有足够的配额创建负载均衡器
- 不同云厂商的注解配置不同,请参考对应云厂商的文档
- LoadBalancer 的外部 IP 分配需要一定时间,请耐心等待状态变为"就绪"
- 删除 LoadBalancer 会同时删除云资源,请谨慎操作

### 本地环境(MetalLB)

- 确保 MetalLB 已正确安装和配置
- 确保 IP 地址池中有可用的 IP 地址
- MetalLB 完全免费,无需担心费用问题

## 故障排查

### LoadBalancer 状态一直是创建中

**公有云环境可能原因:**
- 云账户配额不足
- Cloud Controller Manager 配置不正确
- 注解配置有误

**解决方法:**
- 检查云账户配额
- 查看 Cloud Controller Manager 日志
- 验证注解配置是否符合云厂商要求

**本地环境(MetalLB)可能原因:**
- MetalLB 未正确安装或未运行
- IP 地址池未配置或已用尽

**解决方法:**
- 检查 MetalLB 运行状态和配置
- 参考 [MetalLB 官方文档](https://metallb.io/) 进行故障排查

### 无法通过外部 IP 访问

**公有云环境可能原因:**
- 云安全组或防火墙规则限制
- 端口配置错误
- 服务本身未正常运行

**解决方法:**
- 检查云安全组规则,确保允许对应端口的访问
- 验证端口映射配置是否正确
- 检查组件运行状态

**本地环境(MetalLB)可能原因:**
- 网络配置问题
- 本地防火墙阻止访问

**解决方法:**
- 确认外部 IP 地址可以从客户端访问
- 检查防火墙规则
- 参考 [MetalLB 官方文档](https://metallb.io/) 进行故障排查
