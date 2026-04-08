---
title: 使用原生 YAML 创建资源
description: 通过 Kubernetes 原生 YAML 在团队下直接创建和管理资源。
keywords:
- 原生 YAML
- Kubernetes YAML
- K8s 原生创建
---

使用原生 YAML 创建资源，指的是在团队的 `K8s 原生资源管理` 中直接提交 Kubernetes Manifest，让资源以原生对象形式创建到团队对应的 Namespace 中。

## 什么时候使用

以下情况更适合使用原生 YAML：

- 已经有成熟的 Kubernetes Manifest，希望直接复用
- 资源中包含 Rainbond 应用模型不覆盖的原生字段
- 希望保留 Deployment、Service、Ingress、PVC、RoleBinding、CR 等对象的原始结构
- 需要和现有的 kubectl、GitOps、Operator 工作流保持一致

如果只是维护一组标准 Kubernetes Manifest，优先建议使用原生 YAML；如果目标本身是标准 Helm Chart，且需要长期维护版本和 Values，则更适合使用[Helm 部署](./helm-native-deploy.md)。

## 创建前建议确认

- YAML 中的 `kind`、`apiVersion` 与目标集群版本兼容
- 资源所属 Namespace 与当前团队的 Namespace 一致
- 如果 YAML 中引用了 PVC、Secret、ConfigMap、ServiceAccount 等依赖资源，先确认它们已存在或会一起创建
- 如果 YAML 中包含 CR，先确认集群中已安装相应 CRD

## 基本流程

1. 进入目标团队的 `K8s 原生资源管理`
2. 通过页面中的 YAML 创建入口，粘贴或上传 Kubernetes YAML
3. 检查资源类型、Namespace 和依赖关系
4. 提交创建
5. 创建完成后，到对应的资源页签中确认状态

![使用原生 YAML 创建资源](/docs/how-to-guides/k8s-native-resource/create-yaml.png)

## 创建后资源会出现在哪里

不同类型的资源会出现在不同的管理页中：

- Workload 类资源：出现在工作负载页
- Pod：出现在容器组页
- Service、Ingress、NetworkPolicy 等：出现在网络资源页
- ConfigMap、Secret 等：出现在配置资源页
- PVC 等：出现在存储资源页

## 适合用 YAML 管理的典型对象

- Deployment
- StatefulSet
- DaemonSet
- Job
- CronJob
- Service
- Ingress
- ConfigMap
- Secret
- PersistentVolumeClaim
- Role
- RoleBinding
- 自定义资源 CR

## 最佳实践

- 优先按功能拆分 YAML，避免一次提交过多无关资源
- 对需要长期维护的资源，保留统一的命名和标签规范
- 敏感配置使用 Secret 管理，不要将密钥直接写入公开文档或示例
- 涉及存储时，优先确认 PVC 对应的 StorageClass 是否可用

## 常见问题

### 创建成功但资源未运行

优先检查以下内容：

- 镜像是否可拉取
- 引用的 ConfigMap、Secret、PVC 是否存在
- ServiceAccount 或 RBAC 是否满足权限要求
- 资源调度条件是否与集群环境匹配

### YAML 可以直接创建 Helm Release 吗

不建议这样使用。Helm Release 更适合通过 Helm 原生部署流程管理，便于后续升级、回滚和卸载。请参考[使用 Helm 部署](./helm-native-deploy.md)。
