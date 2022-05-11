---
title: 服务间通信GRPC协议
description: 本文解读Rainbond内置的服务注册与服务发现机制的GRPC协议如何使用。
---

> 本文适用于熟悉GRPC协议的应用开发者和运维人员  


在 gRPC 中，客户端应用程序可以直接调用不同机器上的服务器应用程序上的方法，就像它是本地对象一样，使您可以更轻松地创建分布式应用程序和服务。与许多 RPC 系统一样，gRPC 基于定义服务的思想，指定可以通过参数和返回类型远程调用的方法。在服务器端，服务器实现了这个接口并运行一个 gRPC 服务器来处理客户端调用。在客户端，客户端有一个存根（在某些语言中简称为客户端），它提供与服务器相同的方法。

### 前提条件

1. 需拥有支持GRPC协议的组件。
2. Rainbond版本是 v5.3.1，v5.3.0之前的版本不支持GRPC协议。



### 操作流程

* 首先进入团队中 > 插件 > 出口网络治理插件，修改**出站网络治理配置**中的配置项协议，修改为 `所有协议`(包含GRPC)，或根据所需修改协议，如下图：

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-connection/GRPC.png)

* 假如有 A 和 B 组件，A依赖了B，那么需要进入 A 组件中 > 插件 > 开通 `出口网络治理插件`，修改所需配置选项。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-connection/GRPC_PORT.png)

* 开通插件之后，更新组件，A组件可以通过GRPC协议跟B组件通信，并且自动负载均衡。

  > 负载均衡只对内部依赖起作用，对外网关GRPC负载均衡暂不支持。
