---
title: 通信异常
description: 介绍 Rainbond 集群出现的问题及其排查思路
keywords: 
- Rainbond 集群通信异常排查
---

本文介绍 Rainbond 控制台与集群端通信异常的排查思路。

## 集群通信异常或集群端失去响应

Rainbond 分为两层架构，控制台与集群端。控制台与集群端通过 API 进行通信，如果控制台与集群端通信异常，将会导致控制台无法正常使用。

导致异常原因可能有以下几种：

1. 控制台与集群端的网络不通。
2. 集群端的 API 服务不可用。
3. 集群端的 API 服务被防火墙拦截。

## 排查思路

如果出现此类问题，你可以根据以下排查思路进行排查。

### 检查控制台与集群端的网络

首先，检查控制台的日志，进入控制台的 **平台管理 -> 日志 -> 控制台日志**，如果出现 `https://192.168.1.1:8443 time out` 则代表控制台与与集群端的网络不通。

可以进入控制台的终端内部，使用 `ping` 命令检查控制台与集群端的网络是否通畅。

如果网络不通，可以检查控制台与集群端的网络是否在同一网段，如果不在同一网段，可以通过配置路由表的方式进行网络通信。

### 检查集群端 API 服务

如果控制台与集群端的网络通畅，且 `8443` 端口通畅，可以检查集群端的 API 服务是否正常。

通过以下命令查看 API 服务是否正常：

```bash
kubectl get pod -l name=rbd-api -n rbd-system
```

如果 API 不正常，可以通过以下命令查看 API 服务的日志：

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

根据日志的报错信息进行排查。

或者尝试重启 API 服务：

```bash
kubectl delete pod -l name=rbd-api -n rbd-system
```

### 检查控制台与集群端的端口

如果控制台与集群端的网络通畅且 API 服务正常，可以检查控制台与集群端的 `8443` 端口是否通畅。使用 `telnet` 命令检查控制台与集群端的 `8443` 端口是否通畅。

如果不通，可以检查集群端的 `8443` 端口是否被防火墙拦截，如果被防火墙拦截，可以通过配置防火墙规则的方式进行端口通信。

## 常见问题

### remote error: tls: error decrypting message

查看 rbd-api 服务的日志出现以下报错：

```bash
http: TLS handshake error from 10.42.0.1:35590: remote error: tls: error decrypting message
```

出现该错误的原因是集群端的 API 服务与控制台的证书不一致，导致控制台无法与集群端的 API 服务进行通信。

可以通过 [grctl config](../../ops-guide/tools/grctl) 命令查看集群端连接信息。

```bash
$ grctl config
apiAddress: https://47.104.161.96:8443
ca.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxx
  -----END CERTIFICATE-----
client.key.pem: |
  -----BEGIN RSA PRIVATE KEY-----
  xxxxx
  -----END RSA PRIVATE KEY-----
client.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxxx
  -----END CERTIFICATE-----
```

将打印出的内容复制到控制台的 **平台管理 -> 集群 -> 编辑** 中，点击 **保存** 即可。
* apiAddress 对应 **API 地址**
* ca.pem 对应 **API-CA证书**
* client.pem 对应 **API-Client证书**
* client.key.pem 对应 **API-Client证书密钥**

:::caution 注意
证书左右两侧不能有空格，否则会导致证书无法识别。
:::

如果确定控制台的证书与集群端的证书一致，但仍然出现该问题，可以尝试重新生成集群端的证书。

```bash
# 删除集群端的证书
kubectl delete secret rbd-api-client-cert rbd-api-server-cert -n rbd-system

# 重启 operator 重新生成集群端的证书
kubectl delete pod -l release=rainbond-operator -n rbd-system

# 重启 api 服务
kubectl delete pod -l name=rbd-api -n rbd-system
```

operator 重启后，会重新生成集群端的证书，再次通过 `kubectl get cm -n rbd-system region-config` 获取集群信息并复制到集群控制台中即可。