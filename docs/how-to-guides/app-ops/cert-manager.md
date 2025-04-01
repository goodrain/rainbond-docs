---
title: 证书自动签发
description: 配置 Cert-Manager 实现应用的 HTTPS 证书自动签发
keywords:
- Cert-Manager
- 证书管理
- 自动签发证书
---

[Cert Manager](https://cert-manager.io/) 是 Kubernetes 上的证书管理工具，基于 [ACME](https://tools.ietf.org/html/rfc8555) 协议与 [Let's Encrypt](https://letsencrypt.org/) 签发免费证书并为证书自动续期，实现永久免费使用证书。  

本文档将介绍如何使用 Cert Manager 实现自动签发证书并与 Rainbond 结合使用。

## 前提

- 已完成 [Rainbond 快速安装](../../quick-start/quick-install.mdx)

## Cert Manager 概述

### 工作机制概述

在将 Cert Manager 部署到 Kubernetes 集群后，可以通过创建支持的自定义资源 CRD 来实现证书的签发和自动续期功能。以下是 Cert Manager 的工作机制概览：

![](https://cert-manager.io/images/high-level-overview.svg)

`Issuer` 是 Cert Manager 用于定义证书签发方式的资源类型。它支持以下多种证书颁发机构：

- Let's Encrypt：广泛使用的免费证书颁发机构，支持 ACME 协议。
- HashiCorp Vault：适用于企业级密钥管理和证书签发。
- Venafi：支持企业环境中更复杂的证书管理需求。
- 自签发证书：适合内部使用场景。

`Certificate` 是 Cert Manager 的核心资源之一，用于定义需要签发的域名证书及其相关配置。它包含以下关键信息：

- 域名信息：需要绑定证书的具体域名。
- 配置参数：指定签发证书所需的额外信息，例如有效期、密钥长度等。
- Issuer 的引用：关联到某个具体的 `Issuer` 或 `ClusterIssuer`。

`Secrets` 是 Kubernetes 的资源对象，签发完成的证书最终会存储在 `Secrets` 中，供其他组件引用。

### 证书签发概述

本文使用 Let’s Encrypt 作为证书颁发机构，Let’s Encrypt 利用 ACME 协议校验域名的归属，校验成功后可以自动颁发免费证书。免费证书有效期只有90天，默认情况下 Cert Manager 会在证书到期前30天自动续期，即实现永久使用免费证书。校验域名归属的两种方式分别是 `HTTP-01` 和 `DNS-01`。

**HTTP-01**：通过向域名的 HTTP 服务发送请求验证域名归属，适用于使用 Ingress 暴露流量的服务，但不支持泛域名证书。Cert Manager 会动态创建或修改 Ingress 规则，添加临时路径以响应 Let’s Encrypt 的验证请求。验证通过后颁发证书。

**DNS-01**：通过在 DNS 提供商处添加 TXT 记录验证域名归属，支持泛域名证书且无需 Ingress。Cert Manager 使用 DNS 提供商的 API 自动更新记录。Let’s Encrypt 查询 TXT 记录后完成验证并颁发证书。 

### 校验方式对比

| 特性             | HTTP-01                     | DNS-01                               |
| ---------------- | --------------------------- | ------------------------------------ |
| 是否依赖 Ingress | 是                          | 否                                   |
| 是否支持泛域名   | 否                          | 是                                   |
| 配置难度         | 简单，适用于所有 DNS 提供商 | 配置复杂，依赖 DNS 提供商的 API 支持 |
| 典型适用场景     | 仅服务通过 Ingress 暴露流量 | 需要泛域名证书或无 Ingress 的服务    |

## 安装与配置 Cert Manager

使用 [kubectl apply](https://cert-manager.io/docs/installation/kubectl/) 安装，进入 **平台管理 → 集群管理 → 命令行**，执行以下命令安装 Cert Manager。

```bash
kubectl apply -f https://get.rainbond.com/cert-manager/cert-manager-v1.17.0.yaml
```

安装 cert-manager 后，你可以通过以下命令检查运行 cert-manager 的部署状态：
```bash
$ kubectl get pods -n cert-manager
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m
```

### 创建 ClusterIssuer

[ClusterIssuer](https://cert-manager.io/docs/configuration/acme/http01/) 是 Cert Manager 的核心资源，用于定义证书的签发方式和配置。

Rainbond 默认采用 `ClusterIssuer` 的 **HTTP-01** 校验方式签发证书，执行以下命令创建 `ClusterIssuer`。

```bash
kubectl apply -f https://get.rainbond.com/cert-manager/ClusterIssuer.yaml
```

## 在 Rainbond 中使用自动签发证书

:::tip
在开启自动签发证书前，请确保域名解析已生效且可通过 HTTP 访问，否则会导致证书签发失败。
:::

1. 在安装了 Cert Manager 后，在 Rainbond 的网关管理域名右侧会自动出现 `自动签发证书` 按钮，开启按钮后会自动签发证书。
2. 签发证书的过程可以在 `网关管理 → 证书管理 → 自动签发` 中查看。
3. 证书签发成功后无需手动绑定证书，自动匹配并绑定对应的证书。


## 常见问题

### 证书签发失败

如果证书签发失败，可以在 `网关管理 → 证书管理 → 自动签发` 中查看失败原因。通常的原因有：
- 域名解析未生效，请检查域名解析是否生效。
- 集群网络异常，无法与 Let's Encrypt 服务器通信。`https://acme-v02.api.letsencrypt.org/directory`
- 短时间内请求证书签发次数过多，被 Let's Encrypt 服务器限流。

如熟悉 `kubectl` 命令，也可以在**平台管理 → 集群管理 → 命令行**通过 `kubectl get certificate` 查看证书签发状态。

### 证书续签

证书签发成功后，Cert Manager 会自动续期，无需手动续期。默认情况下，证书有效期为90天，Cert Manager 会在证书到期前30天自动续期。
