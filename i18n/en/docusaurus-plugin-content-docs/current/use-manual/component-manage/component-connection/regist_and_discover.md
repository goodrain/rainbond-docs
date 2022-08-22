---
title: Inter-service communication (service registration and service discovery)
description: This article interprets the role of Rainbond's built-in service registration and service discovery mechanism on communication between components.
---

> This article is for application developers and operators

Both service registration and service discovery are concepts of microservice governance, and communication between microservices needs to be carried out through a combination of service registration and service discovery mechanisms.Here we explain the first chapter of the communication between Rainbond components. The reason for service registration and service discovery is that all components in the Rainbond platform are governed by microservices, and components are services.Therefore, inter-component communication is the communication between microservices.Maybe you don't know much about microservices, and you will think that service registration and service discovery are a very complex concept.In Rainbond we shield the complex parts and provide you with the simplest communication pattern between components.

Next, we explain the secrets of communication between Rainbond components in a task-based way.

### Preconditions

1. Deploy component A [based on Demo Java source code, refer to the document for creating components](/docs/use-manual/component-create/creation-process)
2. Deploy Mysql database component B based on cloud application market

### Operating procedures

After deploying component A and component B, visit component A and switch to the Mysql page. You will find that the page shows that the connection to the database failed.At this time, you may have questions, how does the A component connect to the database B component?Just two steps：

1. <b>Edit dependencies</b>：Enter the _application view/application topology_ page, click "Switch to Edit Mode" to switch the topology map to edit mode, click the focus of component A to connect to component B, and a prompt box will pop up to prompt you to update A component.
2. <b>Update component</b>：Confirm the update, wait for its update to complete and revisit the Mysql page of the A component.

At this time, you will see the connection information of the database printed on the page, including the communication address and account secret, etc. (For demonstration, our Demo program displays the database password, please do not refer to the actual scene). If there is a table in the database The information can also be displayed normally, indicating that the A and B components communicate successfully.

### understand the principle

Do you have a lot of questions about the above operation process?Why is it possible to communicate with the connection?How to get the connection information?How is the code implemented?and many more.Next, we will take you to analyze the implementation mechanism of the whole process.

- understand the status quo

  In the traditional deployment mode, whether it is a physical machine or a virtual machine, if the component needs to communicate directly, it must know the fixed communication address of the communication target and write it in the configuration file or code.For example, if a Web service needs to connect to a database, it needs to know the host address and port of the database.In a container-based deployment environment, the communication address of the service itself generally changes with each deployment, so we certainly cannot directly specify the communication address of the component as in the past.

- Kubernetes solutions

  In the native environment of Kubernetes, a resource type Service is defined in order to solve the access problem of services. When we access components, we access them through the name or virtual IP address of the Service.This access process actually establishes a layer of proxy on each node through the kube-proxy system component. The implementation mode of this layer of proxy includes iptables and ipvs.The name of the Service can be pre-determined and then pre-defined directly in code or configuration files.The solution of Kubernetes, of course, requires users to have a clear understanding of the relevant principles of Kubernetes in order to understand the process and create corresponding resources.This is obviously more complicated for users who don't know Kubernetes.

- Rainbond Solutions

  Rainbond works on top of Kubernetes, so the entire implementation model has a lot to do with Kubernetes-related technologies, but it is very different.We restore the essence of communication between components, nothing more than to inform the initiator of the communication what the target communication address you need to communicate is.Therefore, we propose the concept of _-dependency relationship_ The user uses a dependency method to display the relationship between components that need to be communicated. If A needs to request B, then A needs to depend on B.This process is described in another language, which is _service discovery_ With dependencies, it is to inform platform A that it needs to communicate with B. Component A needs to be given the ability to discover the communication address of component B, and it needs to be notified after obtaining the address. to the A component.These things are an added part of the business, the complexity certainly doesn't bring to the developer.Rainbond began to propose Sidecar proxy four years ago to solve basic network governance modes such as service discovery and load balancing among components.

  ![Inter-component communication structure diagram](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/connection.png)

  Components with upstream dependencies are automatically injected into the default communication management plugin (envoy implementation) at startup, with the default configuration.The plug-in will detect the relevant configuration from the control panel API (standard envoy service discovery API) and perform port monitoring, and provide it to the component business itself to call.The sidecar plug-in and the business component are in the same network space (same Pod), so the communication address is the local loopback address 127.0.0.1, and the communication port is the same as the port configured by the target component of the communication.Therefore, for component A in the above figure, the communication address of the configuration dependent service can be determined, for example (127.0.0.1:8080). This mode is also very useful in development scenarios. Most code development depends on services. The address may be 127.0.0.1, so there is no need to make any changes when deploying.If the dependent upstream service has multiple instances, the Sidecar plugin will perform load balancing or dynamic routing based on configuration.

  In addition, the prerequisite for the service discovery process to take effect is service registration. In Rainbond, services need to be registered explicitly, that is, in the port management of components, the open range of ports is set to support open internal services for inter-component communication. Open external services for accessing components through gateways.

  Therefore, for the user, if the components need to communicate, they only need to establish a dependency relationship with the same communication direction.The platform will complete other things, and the business itself can be understood as the targets that need to communicate exist locally (127.0.0.1)

### common problem

- The component you want to depend on cannot be found when building a dependency

> If the component has been deployed on the platform normally or the third-party component has been created normally, the main reason for not being able to find it should be that the port of the target component is not open _for internal service_ , the port of the component is open for internal service is actually*service registration The process of* , there is first registration and then discovery.

- Depends on whether multiple component ports conflict

> According to the principle described above, if multiple components with the same port are relied on, there will be a port conflict problem in the current component network space.There are two ways to solve this problem：1. Port listening for all components Consider reading the environment variable PORT, so that the component listening port can be changed by the platform, and then set a different listening port for each component on the platform.2. If they are all HTTP services, you can activate the network management plug-in to replace the default plug-in, use the domain name to distinguish different components, and realize port multiplexing.

- Are there any restrictions on the communication protocol between components

> Communication between components currently supports TCP and UDP protocols that match 99.99% of component types. Application layer advanced governance currently supports HTTP protocol, and will support GRPC, MYSQL, MONGODB, REDIS, DUBBO and other protocols in the future.

- Whether dependencies can pass configuration between components

> When the component provides services to the outside world, it can automatically inject its own connection information (such as the user name, password, database name that the database provides services for) and other information into the relying party's environment, so as to realize the automatic injection of the information required by the relying party. .Refer to the next section Document [Communication Variable Injection](./connection_env)

- The ports of the microservice components are the same, what about each other?

  If you need to use Rainbond's microservice communication management mechanism：

  > 1. Modify the basic image of the service to support reading the PORT variable to establish monitoring.
  > 2. A port is set for each service component on the platform, and a port alias is set.Such as USER_SERVER PAY_SERVER.
  > 3. The configuration file of the code supports variable control.Use the variables defined in step 2 to define the inter-service communication address.
  > 4. Sort out the communication relationship between components and establish dependencies.

  If you are a Dubbo, SpringCloud or other microservice architecture model, a third-party service registry is used.Then you can do service registration and service discovery based on the third-party service registry without using Rainbond's dependent communication mode, and you can communicate directly.There is no port conflict problem in this case.

### Reference video

Inter-component communication operation tutorial video: https://www.bilibili.com/video/BV1qZ4y1s7nH/


<!-- ### 进阶内容

[组件之间网络治理之熔断](../advanced-scenarios/devops/service-fuse-current-limitation/) -->
