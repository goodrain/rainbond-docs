---
title: Access any type of component by IP address
description: This article introduces how Rainbond uses IP plus port to access any type of component
---

> This article is for application developers and operators

How to access the external service components deployed to Rainbond is the focus of this article, such as the deployed database being accessed by the external network, the deployed IoT service being accessed by the external network, and so on.These components use the access policy mode based on IP address and port.这些组件都会用到基于 IP 地址加端口的访问策略模式。

### Preconditions

1. Deploy a Mysql component based on the application market [Refer to the Create Component Document](/docs/use-manual/component-create/creation-process/)
2. Prepare a Mysql client locally to test the connection to the Mysql service

### Operating procedures

Confirm that the prerequisites are ready, a Mysql component already exists in the test application

2.<b>配置网关策略</b>，进入网关策略管理页面，切换到 TCP/UDP 策略模式下，点击添加策略。与配置 HTTP 策略类似的是 TCP 策略依然包括路由规则和访问目标两个部分。访问目标部分与 HTTP 策略一致。路由规则部分只有一个配置项那就是 IP 和端口的组合。IP 是一个可选列表，其中包括 Rainbond 网关服务所在节点的所有 IP 地址（排除 docker0 网卡和容器网络的网卡），若你需要访问的 IP 地址不在选项中（比如阿里云的 EIP 不会挂载到虚拟机，所以列表中不会显示）请选择 0.0.0.0 为通配 IP 地址。端口我们会根据已使用的端口数据进行自动推荐，当然你可以更改为任何可用的端口号。选择完成后保存即可。

> Note that if you are prompted that "the component port is not open, whether it is automatically opened" when saving, please select Yes to automatically open the component's port to the external service property and complete the service registration.

3.<b>测试策略是否生效</b>，策略配置后将自动生效。Test whether the policy takes effect After the policy is configured, it will take effect automatically.Click the newly added policy in the access policy list, obtain the connection address and connection variable information (including Mysql account information) in the pop-up window, and use the local Mysql client to test the connection.

### understand the principle

TCP/UDP 协议属于传输层协议，因此支持 TCP/UDP 协议意味着目前几乎全部的应用层通信协议都支持。通过在 Rainbond 网关服务所在节点使用策略配置的 IP 加端口进行监听，将请求代理的后端的组件容器网络上。使用 TCP/UDP 意味着网关不会对请求包进行解析，具有更优秀的性能表现。同时也就意味着不能通过网关做像 HTTP 协议那么多的路由策略。

选择的 IP 地址是有讲究的。Rainbond 网关服务会自动获取运行节点的所有网卡绑定的 IP 地址，并默认排除 docker0 以及容器网络相关的网卡 IP 地址。也就意味着 IP 地址可选项中会包括局域网 IP，公网 IP。当策略选择明确的 IP 地址时，当前策略只会在 IP 所在节点生效，且仅监听 IP 对应的端口。若选择的 IP 地址是虚拟 IP,可能在节点异常情况下进行漂移，Rainbond 网关可以实时感知到 IP 地址的漂移从而达成网关策略的漂移。The choice of IP address is particular.The Rainbond gateway service will automatically obtain the IP addresses bound to all the network cards of the running node, and exclude docker0 and the network card IP addresses related to the container network by default.This means that the IP address options will include LAN IP and public IP.When the policy selects a specific IP address, the current policy will only take effect on the node where the IP is located, and only the port corresponding to the IP is monitored.If the selected IP address is a virtual IP, it may drift when the node is abnormal. The Rainbond gateway can sense the IP address drift in real time to achieve the drift of the gateway policy.If the selected IP address is the wildcard address 0.0.0.0, it means that the policy will take effect on all Rainbond gateway service deployment nodes and directly occupy the configured port.

Through the above mechanism, the Rainbond gateway can be deployed at the edge of the LAN to act as a bridge between multiple LANs.

### common problem

- How to ensure that ports do not conflict

  > Rainbond tries its best to ensure that all policies do not conflict with listening ports, but unfortunately, the host port may be occupied by other software and cause conflicts.Therefore, it is recommended that users ensure the independence of Rainbond gateway nodes as much as possible.因此建议用户尽可能保障 Rainbond 网关节点的独立性。

- Can the external network IP be used without being bound to the cluster?

  > 推荐之间使用通配符 0.0.0.0 作为 IP 地址，然后直接访问外网 IP 地址+端口。但前提是外网 IP 的流量已经映射到某一个 Rainbond 网关节点。

- How does the gateway achieve the isolation of internal and external networks

  > enter the gateway policy management page, switch to TCP/UDP policy mode, and click Add policy.Similar to configuring HTTP policies, TCP policies still include routing rules and access targets.The access target section is consistent with the HTTP policy.There is only one configuration item in the routing rules section, which is the combination of IP and port.IP is an optional list, including all IP addresses of the node where the Rainbond gateway service is located (excluding the docker0 network card and the network card of the container network), if the IP address you need to access is not in the options (for example, Alibaba Cloud's EIP will not be mounted to virtual machine, so it will not be displayed in the list) please select 0.0.0.0 as the wildcard IP address.We will automatically recommend the port based on the used port data, of course you can change to any available port number.After selection, save it.The deployment mode of the gateway is flexible. When a gateway node only has an intranet IP, the policy configured with this IP can only be accessed through the intranet.Deploying the Rainbond gateway to different subnets (provided that it can communicate with the subnet where the cluster is located) enables different subnets to access applications in the cluster.

- Can TCP policies access HTTP applications?

  > Of course it can, and in some special cases, the TCP strategy must be used. For example, the application itself has a server certificate configured to establish TLS monitoring. For example, the application hopes to have higher performance.
