---
title: 网关问题排查
descrition: 介绍 Rainbond 网关的使用问题排查方法
keywords:
- Rainbond 网关使用问题排查
---

本文介绍 Rainbond 网关在使用过程中遇到的问题以及解决方法。

## 工作流程

Rainbond 网关的工作流程如下图所示：

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/gateway-process.png)

1. 在安装了 Rainbond 之后，默认会分配一个二级泛域名，如 `*.7a7b7c.grapps.cn`。
2. 打开组件的对外的 HTTP 访问服务后，默认会给该组件分配一个域名，该域名的分配方式是 **<组件端口>.<组件ID>.<应用ID>.7a7b7c.grapps.cn**，如 `5000.grbc.grcc.7a7b7c.grapps.cn`。
3. 打开组件的对外的 TCP 访问服务后，默认会分配 10000 以上的端口，该端口会在宿主机上进行监听。
4. 当用户访问该 `域名/IP` 时，会通过 Rainbond 网关进行转发，转发到对应的组件端口上。

## 常见问题

### 域名无法访问

在打开组件的对外访问服务之后，用默认生成的域名无法访问到组件，提示无法访问，通常的情况是：

域名的解析不对；如果没有指定网关IP，那么 Rainbond 将会自动选择 IP 解析，通常会解析到内网IP上，导致公网IP无法通过域名访问。

### IP:PORT 无法访问

通常这种情况会出现在单机体验版中，因为单机体验版默认只开放了 10000-10010 十个端口，如果需要其他的端口需要根据脚本中打印的命令重新运行并指定 `-p` 参数，如:

```bash
docker run --name rainbond-allinone ....
....
-p 8888:8888
-p 10020-10030:10020-10030
....
```

### 域名访问显示应用正在准备中

展示这个页面代表 Rainbond 网关没有找到对应的后端组件，是属于 404 页面，通常这个现象有几种情况：

1. 组件未启动
2. 组件的端口不对，比如实际容器的监听端口是 8080，在端口中设置了 8081 然后打开对外服务，此时是找不到对应的端口服务的。

如果配置的没问题，可能是网关本身出了问题，可以查看网关日志排查解决:

```bash
kubectl logs -fl name=rbd-gateway -n rbd-system
```

## 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
