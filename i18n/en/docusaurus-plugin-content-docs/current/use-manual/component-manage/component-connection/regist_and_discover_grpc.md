---
title: GRPC protocol for inter-service communication
description: This article explains how to use the GRPC protocol of Rainbond's built-in service registration and service discovery mechanism.
---

> This article is suitable for application developers and operation and maintenance personnel who are familiar with the GRPC protocol


In gRPC, client applications can directly call methods on server applications on different machines as if it were a local object, making it easier for you to create distributed applications and services.Like many RPC systems, gRPC is based on the idea of defining a service, specifying methods that can be called remotely with parameters and return types.On the server side, the server implements this interface and runs a gRPC server to handle client calls.On the client side, the client has a stub (referred to simply as client in some languages) that provides the same methods as the server.

### Preconditions

1. Requires components that support the GRPC protocol.
2. The Rainbond version is v5.3.1, and versions before v5.3.0 do not support the GRPC protocol.



### Operating procedures

* First enter the > plugin > export network governance plugin in the team, modify the configuration item protocol in**outbound network governance configuration**, and modify it to `all protocols`(including GRPC), or modify the protocol as required, as shown in Figure：below

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-connection/GRPC.png)

* If there are A and B components, and A depends on B, then you need to enter > plug-in > in the A component to open `export network management plug-in`, and modify the required configuration options.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-connection/GRPC_PORT.png)

* After the plug-in is activated and the components are updated, the A component can communicate with the B component through the GRPC protocol, and the load is automatically balanced.

  > Load balancing only works on internal dependencies, and external gateway GRPC load balancing is not supported yet.
