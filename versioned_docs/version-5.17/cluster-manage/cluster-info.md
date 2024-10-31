---
title: 编辑集群
description: Rainbond 编辑集群配置
keywords:
- Rainbond Edit Cluster Config
- Rainbond 编辑集群配置
---

Rainbond 可以对集群的配置进行修改，包括集群名称、API地址、WebSocket 通信地址、HTTP 默认域名、TCP默认访问域名、集群描述、集群证书等。

## 编辑集群信息

进入 **平台管理 -> 集群**，跳转到集群管理页面，点击 **编辑**，进入集群信息编辑页面。

* **集群名称:** 集群的名称，不可重复。
* **API地址:** 集群的 API 地址，用于 Rainbond 控制台与集群进行通信。
* **WebSocket 通信地址:** 集群的 WebSocket 通信地址，用于 Rainbond 控制台与集群 WebSocket 通信，例如：日志推送、上传文件等。
* **HTTP 默认域名后缀:** 集群的 HTTP 默认域名，用于 Rainbond 打开 HTTP 对外访问服务自动生成域名的后缀。
* **TCP 默认访问IP:** 集群的 TCP 默认访问IP，用于 Rainbond 打开 TCP 对外访问服务自动生成的 IP:PORT。
* **集群证书:** 集群的证书信息，用于 Rainbond 控制台与集群进行通信，可通过 [grctl config](/docs/ops-guide/tools/grctl) 命令行工具生成。