---
title: 关于 Rainbond 源码构建服务域名变更通知
description: 为了进一步提升源码构建服务的稳定性和用户体验，我们对 Rainbond 源码构建服务的域名进行了调整。现将具体变更内容及相关注意事项通知如下：
slug: buildpack-domain-migration-notice
date: 2025-01-08
tags:
  - 版本发布
  - 公告
  - 源码构建
---

为了进一步提升源码构建服务的稳定性和用户体验，我们对 Rainbond 源码构建服务的域名进行了调整。现将具体变更内容及相关注意事项通知如下：

### 变更内容

- 原服务域名：`buildpack.oss-cn-shanghai.aliyuncs.com`

- 新服务域名：`buildpack.rainbond.com`

新域名用于在线安装模式下源码构建服务的依赖包获取，包括但不限于`JDK、Node.js`等构建包。

### 变更范围

- 使用在线安装的 Rainbond 环境，源码构建过程中所需的 JDK、Node.js 等构建包将通过新域名 `buildpack.rainbond.com`获取。如果在线环境中仍使用旧域名，可能导致构建失败或依赖包无法下载的问题。
- 本次变更**不影响离线安装的源码构建**。在离线模式下，构建所需的依赖包已预置于本地，无需访问上述域名。

## 操作指导

### Rainbond v5 版本

在 v5 版本中，您需要手动替换 `rbd-resource-proxy` 镜像。具体操作如下：

1.使用以下命令编辑组件：

```bash
kubectl edit rbdcomponent -n rbd-system rbd-resource-proxy
```

2.在编辑器中找到 `spec.image`部分，将镜像地址替换为以下内容：
```yaml
spec:
  ...
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-resource-proxy:v5-latest
  ...
```

3.保存并退出编辑器。

4.执行以下命令，检查镜像是否替换成功：

```bash
kubectl get pod -n rbd-system -l name=rbd-resource-proxy -o yaml
```

5.完成镜像替换后，尝试执行源码构建操作以验证服务是否正常工作。

### Rainbond v6 版本

自 `v6.1.0` 版本起，源码构建服务已默认使用新域名 `buildpack.rainbond.com`。如果您使用的是早期版本，请按照以下步骤进行修改。

1.编辑 APISIX Upstream 配置：

```bash
kubectl edit apisixupstream -n rbd-system buildpack-upstream
```

2.将 `externalNodes` 部分的域名替换为：

```yaml
spec:
  externalNodes:
  - name: buildpack.rainbond.com
  ...
```

3.编辑 APISIX Route 配置：

```
kubectl edit apisixroute -n rbd-system lang-proxy
```

4.在`plugins`部分，将`host`替换为：

```
plugins:
  - config:
    host: buildpack.rainbond.com
  ...
```

5.完成配置更新后，尝试执行源码构建任务以确认服务正常。

## 平稳过渡

为保证平稳过渡，旧域名 `buildpack.oss-cn-shanghai.aliyuncs.com` 将在**2025年01月25日**前继续有效。

我们强烈建议您在此日期之前尽早完成相关配置调整，以避免构建服务中断。
