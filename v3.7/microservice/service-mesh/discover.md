---
title: 服务发现
summary: 基于应用依赖的服务发现
toc: false
toc_not_nested: true
asciicast: true
---

与服务注册对应，当服务进行注册以后需要有对应的机制进行服务的发现。
服务因为自动扩展、失败或者升级发生动态变化，因而服务发现需要规避这部分问题。
常见的服务发现有`客户端发现`和`服务端发现`两种。
关于微服务的服务发现可以参考[这里](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/?utm_source=introduction-to-microservices)

在好雨云平台，服务的发现为服务端发现。并且分为2类。

* 应用依赖，用户订阅式服务发现

    用户打开应用的访问端口以后，其他应用就可通过依赖该应用来实现服务的发现。
    
    <img src="https://static.goodrain.com/images/docs/3.6/micro-service/service_dep.gif" style="border:1px solid #eee;max-width:100%" />
    
    如图所示，通过依赖，该应用即可发现需要访问的应用的信息。您不需要关心应用重启以后配置发生变化，因为被依赖的应用会提供相应的访问变量，您只需要通过变量来调用即可发现该应用。
    
* DNS服务发现

    对于有状态的应用，如果服务有多个节点，每个节点之间的访问可以通过DNS的服务发现来实现。目前好雨通过使用应用别名和节点编号的方式来实现基于dns服务发现。
    

    进入应用的容器使用`hostname -f`命令我们可以查看该容器的主机名。对于无状态应用生成的主机名是随机的数据。如图

    <img src="https://static.goodrain.com/images/docs/3.6/micro-service/stateless-container.png" style="border:1px solid #eee;max-width:100%" />

    而对有状态应用进入以应用[TiDB](https://pingcap.com/index.html)为例。（TiDB是一个有状态的应用，可以在云帮进行水平扩容。）

    <img src="https://static.goodrain.com/images/docs/3.6/micro-service/state-container.png" style="border:1px solid #eee;max-width:100%" />

    我们可以看到主机名是由应用的别名和当前节点信息组成。对应有状态应用，如果扩容到多个节点，那么节点的访问就是`服务别名-节点号.服务别名`
    如上图的 `gr62884e-0.gr62884e` 。**改该信息后面的 .b7584c080ad24fafaa812a7739174b50.svc.cluster.local. 不用关心，平台会自动加入**
    
    对于有状态应用的节点间通信，可以直接使用`服务别名-节点号.服务别名`的方式访问。


