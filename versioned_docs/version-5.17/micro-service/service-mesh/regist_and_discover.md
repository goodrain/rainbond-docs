---
title: 服务间通信(服务注册与发现)
description: 本文解读 Rainbond 内组件间通信的原理以及服务注册与发现。
keywords:
- Service 服务通信原理
- 服务注册与发现
- 通信环境变量注入
---

服务注册与服务发现都是微服务治理的概念，微服务之间的通信都需要通过服务注册和服务发现机制相结合进行。这里我们说明 Rainbond 组件之间的通信的第一章就将服务注册与服务发现的原因是，Rainbond 平台内的所有组件都是以微服务的方式进行治理，组件即服务。因此组件间通信就是微服务之间的通信。或许你还不太了解微服务，会觉得服务注册与服务发现是一个非常复杂的概念。在 Rainbond 中我们把复杂的部分通通屏蔽，提供给你最简单的组件间通信模式。

接下来我们以一个任务的方式来讲解 Rainbond 组件之间的通信的秘密。

### 前提条件

1. 基于 Demo Java 源码部署组件 A [参考创建组件文档](../../use-manual/component-create/creation-process)
2. 基于云应用市场部署 Mysql 数据库组件 B

### 操作流程

部署完组件 A 和组件 B，访问 A 组件切换到 Mysql 页面你会发现页面显示连接数据库失败。这个时候或许你就会有疑问，A 组件如何连接数据库 B 组件？只需要两步：

1. 编辑依赖关系：进入 **应用视图 > 应用拓扑** 页面，点击 **切换到编辑模式** 将拓扑图切换到编辑模式，点击 A 组件的焦点连接到 B 组件，此时会弹出提示框提示你更新 A 组件。
2. 更新组件：确认更新，等待其更新完成后重新访问 A 组件的 Mysql 页面。

这时你会看到页面上打印了数据库的连接信息，包括通信地址和账号秘密等（为了进行演示，我们的 Demo 程序将数据库密码进行了展示，实际场景请勿参考），如果数据库中有表信息，也可以正常展示，说明 A 与 B 组件通信成功。

### 了解原理

上述操作流程你是否有一堆疑问？为什么连线就可以通信了？怎么获取到了连接信息？代码怎么实现的？等等。接下来我们将带你来解析整个过程的实现机制。

- **了解现状**

  在传统部署模式中，不管是物理机还是虚拟机，组件直接需要通信的话肯定需要知道通信目标的固定的通信地址，将其写于配置文件或者代码中。比如 Web 服务需要连接数据库，需要知道数据库的主机地址和端口。在以容器为载体部署的环境中，服务本身的通信地址一般是会随着每一次部署改变的，因此我们肯定不能直接像过去一样直接指定组件的通信地址。

- **Kubernetes 解决方案**

  在 Kubernetes 原生环境中，为了解决服务的访问问题定义了一种资源类型 Service，我们访问组件时都是通过 Service 的名称或虚拟 IP 地址去访问。这个访问过程实际是通过 kube-proxy 系统组件在每一台节点上建立了一层代理，这层代理的实现模式包括 iptables 和 ipvs 两种。Service 的名称可以预先确定继而可以直接在代码或配置文件中预先定义。Kubernetes 的解决方式当然需要用户对 Kubernetes 的相关原理比较清楚才能理解这个过程，从而去创建相应的资源。这对于不了解 Kubernetes 的用户显然是比较复杂的。

- **Rainbond 解决方案**

  Rainbond 是工作在 Kubernetes 之上的，因此整个实现模式与 Kubernetes 相关技术有很大的关系，但又有很大不同。我们还原组件间通信的本质，无非就是需要告知通信的发起方你需要通信的目标通信地址是什么。因此我们提出了 _依赖关系_ 的概念，用户用依赖的方式来显示的描述需要通信的组件间关系，A 需要请求 B, 则 A 需要依赖 B。这个过程用另外一种语言来描述这就是 _服务发现_ ，有了依赖关系就是告知平台 A 需要与 B 通信，A 组件需要被赋予发现 B 组件的通信地址的能力，需要在获取到地址以后通知到 A 组件。这些事物对于业务来说属于额外增加的部分，复杂性肯定不能带给开发者。Rainbond 从 4 年以前开始提出 Sidecar 代理来解决组件间服务发现、负载均衡等基础网络治理模式。

  ![组件间通信结构图](https://static.goodrain.com/docs/5.2/connection.png)

  具有上游依赖的组件在启动时会被自动注入默认的通信治理插件(envoy 实现)，采用默认的配置。插件将从控制面板 API（标准的 envoy 服务发现 API）发现相关的配置进行端口监听，提供给组件业务本身调用。Sidecar 插件与业务组件在同一个网络空间内（同一个 Pod）,因此通信地址是本地回环地址 127.0.0.1，通信端口根据通信的目标组件配置的端口一致。因此对于上图的组件 A 来说，可以确定的配置依赖服务的通信地址，例如（127.0.0.1:8080),这种模式对于在开发场景中也非常有用，大多数代码开发时定的依赖服务的地址可能都是 127.0.0.1，所以部署时无需做任何修改。如果依赖的上游服务具有多个实例，Sidecar 插件会进行负载均衡或者根据配置进行动态的路由。

  另外在服务发现过程生效的前提是服务注册，在 Rainbond 中，服务需要显性进行注册，即组件的端口管理中，将端口的开放范围进行设置，支持开放对内服务，用于组件间通信，开放对外服务，用于通过网关访问到组件。

  因此对于用户来说，组件间需要通信，只需要将双方建立通信方向一致的依赖关系。平台将完成其他的事项，业务本身可以理解为需要通信的目标都存在于本地（127.0.0.1）

### 常见问题

- 建立依赖关系时找不到想要依赖的组件

> 如果组件已经正常的在平台部署或是第三方组件已经正常创建，不能发现它的主要原因应该是目标组件的端口未打开 _对内服务_ ，组件的端口打开对内服务实际上是*服务注册* 的过程，先有注册再有发现。

- 依赖多个组件端口是否冲突

> 根据上文描述的原理，如果依赖多个具有相同端口的组件，在当前组件网络空间下会存在端口冲突问题。解决这个问题的方式有两个：1. 所有组件的端口监听考虑读取环境变量 PORT，使组件监听端口可以被平台改变，然后在平台上为每个组件设置不同的监听端口。2. 如果都是 HTTP 服务，可以开通网络治理插件替换默认的插件，使用域名的方式来区分不同的组件，实现端口复用。

- 组件间的通信协议是否有限制

> 组件间通信目前支持 TCP、UDP 协议匹配 99.99%的组件类型，应用层高级治理目前支持 HTTP 协议，未来支持 GRPC,MYSQL,MONGODB,REDIS,DUBBO 等协议。

- 组件间依赖是否可以传递配置

> 组件对外提供服务时，可以自动将其自身的连接信息（比如数据库将其提供服务的用户名、密码、数据库名）等信息自动的注入到依赖方环境中，实现依赖方需要的信息的自动注入。参考下一节文档 [通信变量注入](./connection_env)

- 微服务组件端口都一致, 相互之间怎么办？

  如果你需要使用 Rainbond 的微服务通信管理机制：

  > 1. 服务的基础镜像修改一下，支持读取 PORT 变量来建立监听。
  > 2. 平台上为每个服务组件设置一个端口，并设置端口别名。比如 USER_SERVER PAY_SERVER。
  > 3. 代码的配置文件支持变量化控制。使用步骤 2 中定义的变量来定义服务间通信地址。
  > 4. 梳理清楚组件间的通信关系，建立依赖即可。

  如果你是 Dubbo、SpringCloud 或其他微服务架构模式，采用了第三方的服务注册中心。那么你可以不使用 Rainbond 的依赖通信模式，基于第三方的服务注册中心进行服务注册和服务发现，直接通信即可。这种情况下不存在端口冲突问题。

