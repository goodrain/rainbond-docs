---
title: 集群通信异常排查
description: 介绍 Rainbond 集群出现的问题及其排查思路
keywords: 
- Rainbond 集群通信异常排查
---

本文介绍 Rainbond 控制台与集群端通信异常的排查思路。

## 集群通信异常

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/cluster-connect.png)

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

## 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
