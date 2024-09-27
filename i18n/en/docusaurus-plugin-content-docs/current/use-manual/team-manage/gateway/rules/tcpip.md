---
title: Access any type of component by IP address
description: This article introduces how Rainbond uses IP plus port to access any type of component
---

> This article is for application developers and operators

How to access the external service components deployed to Rainbond is the focus of this article, such as the deployed database being accessed by the external network, the deployed IoT service being accessed by the external network, and so on.These components use the access policy mode based on IP address and port.These components will be used in the access policy mode based on IP address plus port.

### Preconditions

1. Deploy a Mysql component based on the application market [Refer to the Create Component Document](/docs/use-manual/component-create/creation-process/)
2. Prepare a Mysql client locally to test the connection to the Mysql service

### Operating procedures

Confirm that the prerequisites are ready, a Mysql component already exists in the test application

2.<b>Configure Gateway Policy</b>, Access Gateway Policy Management page, switch to TCP/UDP Policy Mode, click to add policy.TCP strategies like configured HTTP policies still include routing rules and access to target parts.Access to the target section matches the HTTP strategy.The routing rules section has only one configuration item that is a combination of IP and port.IP is an optional list that includes all IP addresses of the node of Rainbond gateways (excludes docker0 cards and web cards of the container network), if the IP address you need to access is not in the option (e.g. the Ariyun EIP will not be mounted into the virtual machine, so the list will not show) please select 0.0.0.0 to match the IP address.Port is automatically recommended based on used port data, although you can change it to any valid port number.Select to save when done.

> Note that if you are prompted that "the component port is not open, whether it is automatically opened" when saving, please select Yes to automatically open the component's port to the external service property and complete the service registration.

3.<b>Whether the test policy takes effect in</b>and will be automatically implemented when the policy is configured.Test whether the policy takes effect After the policy is configured, it will take effect automatically.Click the newly added policy in the access policy list, obtain the connection address and connection variable information (including Mysql account information) in the pop-up window, and use the local Mysql client to test the connection.

### understand the principle

The TCP/UDP protocol is a transfer layer agreement, so supporting the TCP/UDP protocol means that almost all applications communication protocols are currently supported.The proxy will be requested on the network of component containers on the backend of the proxy by listening with the policy-configured IP plus port at the node of the Rainbond gateway.Using TCP/UDP means that the gateway does not parse the request package and has better performance.It also means that as many routing strategies like the HTTP protocol cannot be used through gateways.

The selected IP address is correct.Rainbond gateway services automatically fetch IP addresses bound by all running nodes, and the default exclusion of docker0 and associated network network IP addresses.Also indicate that the IP address option will include LAN IP, public web IP.When a policy selects a clear IP address, the current policy only works for the IP node and listens only to the port that the IP corresponds to.If the selected IP address is a virtual IP, it may be drift in the event of a node's anomaly, Rainbond gateway can see the drift of the IP address in real time and thus reach the drift of the gateway strategy.The choice of IP address is particular.The Rainbond gateway service will automatically obtain the IP addresses bound to all the network cards of the running node, and exclude docker0 and the network card IP addresses related to the container network by default.This means that the IP address options will include LAN IP and public IP.When the policy selects a specific IP address, the current policy will only take effect on the node where the IP is located, and only the port corresponding to the IP is monitored.If the selected IP address is a virtual IP, it may drift when the node is abnormal. The Rainbond gateway can sense the IP address drift in real time to achieve the drift of the gateway policy.If the selected IP address is the wildcard address 0.0.0.0, it means that the policy will take effect on all Rainbond gateway service deployment nodes and directly occupy the configured port.

Through the above mechanism, the Rainbond gateway can be deployed at the edge of the LAN to act as a bridge between multiple LANs.

### common problem

- How to ensure that ports do not conflict

  > Rainbond tries its best to ensure that all policies do not conflict with listening ports, but unfortunately, the host port may be occupied by other software and cause conflicts.Therefore, it is recommended that users ensure the independence of Rainbond gateway nodes as much as possible.It is therefore recommended that users guarantee the independence of Rainbond gateway nodes as far as possible.

- Can the external network IP be used without being bound to the cluster?

  > Use wildcard 0.0.0.0 as an IP address between recommendations and direct access to an external IP address + port.However, provided that the traffic of the Extranet IP has been mapped to a Rainbond gateway node.

- How does the gateway achieve the isolation of internal and external networks

  > enter the gateway policy management page, switch to TCP/UDP policy mode, and click Add policy.Similar to configuring HTTP policies, TCP policies still include routing rules and access targets.The access target section is consistent with the HTTP policy.There is only one configuration item in the routing rules section, which is the combination of IP and port.IP is an optional list, including all IP addresses of the node where the Rainbond gateway service is located (excluding the docker0 network card and the network card of the container network), if the IP address you need to access is not in the options (for example, Alibaba Cloud's EIP will not be mounted to virtual machine, so it will not be displayed in the list) please select 0.0.0.0 as the wildcard IP address.We will automatically recommend the port based on the used port data, of course you can change to any available port number.After selection, save it.The deployment mode of the gateway is flexible. When a gateway node only has an intranet IP, the policy configured with this IP can only be accessed through the intranet.Deploying the Rainbond gateway to different subnets (provided that it can communicate with the subnet where the cluster is located) enables different subnets to access applications in the cluster.

- Can TCP policies access HTTP applications?

  > Of course it can, and in some special cases, the TCP strategy must be used. For example, the application itself has a server certificate configured to establish TLS monitoring. For example, the application hopes to have higher performance.
