---
title: Example Change the cluster gateway IP address
descrition: This document is intended for operation and maintenance personnel. How do I change the IP address of the cluster gateway
keywords:
  - Rainbond 修改集群网关 IP
---

在之前用户扩展或减少 Kubernetes 节点时，往往会遇到这样一个问题，当网关节点变更时，会直接影响到控制台与集群端的通信，在控制台上就会体现出集群端异常。这通常是由于更换网关节点时未更新证书所导致的。此时，用户需要手动编辑一些 CRD 文件，重启 rbd-api 等操作。这对用户的要求较高。因此，为了方便用户操作。现在支持使用 grctl 命令一键更换集群 API 地址。

## 前提

- 安装 [grctl](/docs/ops-guide/tools/grctl) 命令行工具

## 操作步骤

1. 在**控制台右上角 -> 个人中心 -> 访问令牌 -> 新增访问令牌**，复制其生成的 `token`。
2. 执行 grctl 命令，更换集群网关 IP。

```bash
grctl replace ip \
--ip=192.168.1.2 \
--domain=http://192.168.1.2:7070 \
--token=<token值> \
--name=<集群id> \
--suffix=false
```

参数说明：

| 参数     | 说明                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------------- |
| ip     | 需要更改的网关节点IP                                                                                                         |
| domain | 控制台完整访问地址，如 http://192.168.1.2:7070 |
| token  | 第一步在控制台生成的 token                                                                                                    |
| name   | 集群唯一标识，在集群页面 -> 编辑 -> 集群ID                                                                                          |
| suffix | 域名后缀是否变更，默认false，指定该值为true时，会自动使用给出的IP生成新的域名后缀并替换                                                                   |
