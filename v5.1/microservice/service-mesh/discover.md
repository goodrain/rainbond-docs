---
title: 服务发现与通信
summary: Rainbond提供两种服务之间或实例之间的通信方式：指定式Mesh网络发现和DNS发现
toc: true
toc_not_nested: true
asciicast: true
---
<div id="toc"></div>

服务发现与服务注册对应，当服务进行注册以后需要有对应的机制进行服务的发现。服务发现可以通俗的理解为找到需要通信的对方地址的过程。常见的服务发现有`客户端发现`和`服务端发现`两种。关于微服务的服务发现可以参考[这里](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/?utm_source=introduction-to-microservices)

在Rainbond平台,服务发现方式有以下两类，适用于不同场景：

## 应用依赖，用户订阅式服务发现
   此方式适用于ServiceMesh架构以及普通架构的通信场景，通过Mesh层对后端服务进行服务发现并进行负载均衡，应用本身只需要请求一个本地的固定地址（通过环境变量获取）。
   用户打开应用的访问端口以后，其他应用就可通过依赖该应用来实现服务的发现。
    
   <img src="https://static.goodrain.com/images/docs/3.6/micro-service/service_dep.gif" style="border:1px solid #eee;max-width:100%" />
    
   如图所示，通过依赖，该应用即可发现需要访问的应用的信息。您不需要关心应用重启以后配置发生变化，因为被依赖的应用会提供相应的访问变量，您只需要通过变量来调用即可发现该应用。

## 基于DNS服务发现
    
   此方式适用于组件分布式集群时使用，比如Mysql主从集群，Redis主从复制集群，Zookeeper集群，Etcd集群等等。使用`有状态服务`的方式部署应用即可具备基于DNS发现的能力。

   如果服务有多个节点，每个节点之间的访问可以通过DNS的服务发现来实现。目前好雨通过使用应用别名和节点编号的方式来实现基于dns服务发现。

   进入应用的容器使用`hostname -f`命令我们可以查看该容器的主机名。对于无状态应用生成的主机名是随机的数据。如图

   <img src="https://static.goodrain.com/images/docs/3.6/micro-service/stateless-container.png" style="border:1px solid #eee;max-width:100%" />

   而对有状态应用进入以应用[TiDB](https://pingcap.com/index.html)为例。（TiDB是一个有状态的应用，可以在云帮进行水平扩容。）

    <img src="https://static.goodrain.com/images/docs/3.6/micro-service/state-container.png" style="border:1px solid #eee;max-width:100%" />

   我们可以看到主机名是由应用的别名和当前节点信息组成。对应有状态应用，如果扩容到多个节点，那么节点的访问就是`服务别名-节点号.服务别名`
   如上图的 `gr62884e-0.gr62884e` 。**改该信息后面的 .b7584c080ad24fafaa812a7739174b50.svc.cluster.local. 不用关心，平台会自动加入**
    
   对于有状态应用的节点间通信，可以直接使用`服务别名-节点号.服务别名`的方式访问。


