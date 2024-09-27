---
title: Inter-service communication (service registration and discovery)
description: This article explains the principles of communication between components in Rainbond, as well as service registration and discovery.
keywords:
  - Service Service Service Communication Principles
  - Service Registration and Discovery
  - Communication environment variable injection
---

Service registration and service discovery are concepts of microservice governance, and communications between microservices need to be combined with service registration and service discovery mechanisms.Here we note that chapter I of the communication between Rainbond components gives the reason for registering services and finding them because all components within the Rainbond platform are governed in a micro-service manner, that is, services.Correspondence between components is therefore between microservices.You may still have little knowledge of microservices and feel that service registration and discovery are a very complex concept.In Rainbond we block a complex part of the block, offering you the simplest mode of communication between components.

Then we are going to use the secret of communications between Rainbond components in a mission manner.

### Prerequisite

1. Based on Demo Java source deployment component A [参考创建组件文档](/docs/use-manual/component-creation/creation-process)
2. Mysql Database Component B deployed on cloud application

### Operating processes

Component A and Component B are deployed. Visit component A to switch to the Mysql page will find that the page display connection database failed.Maybe you have questions about how component A connects to database component B?Only steps：

1. Edit dependency：in the **Application View > App Topic** page, click **Switch to Edit mode** to switch the topography to Edit Mode, click on the Focus of Component A to connect to Component B, and when you will eject the tips to update Component A.
2. Update Component：confirms the update, waiting for its update to be completed and go back to the Mysql page of Component A.

At this point, you will see the database connection information printed on the page, including contact addresses and account secrets (for demonstrations, our Demo program shows the database password and the actual scenario does not reference). If table information is available in the database, you can also show it properly and indicate that A is successful in communicating with component B.

### Learn about Principles

Do you have a host of questions about the above operations?Why is it connected to communicate?How do I get connection information?How does the code materialize?And so on.Next, we will lead you to resolve the implementation mechanism of the process.

- **Learn about the status quo**

  In traditional deployment patterns, whether physical or virtual, a component directly needs to communicate and certainly need to know the fixed address of the communication target, written in a configuration file or code.For example, the web service needs to connect to the database and needs to know the host address and port of the database.In environments where containers are deployed, the communication address of the service itself is usually changed with each deployment, so we certainly cannot specify the communication address of the component directly as in the past.

- **Kubernetes solutions**

  In the native environment of Kubernetes a resource type service has been defined to solve the service access problem. We visit the component through the service name or virtual IP address.This access process actually creates a layer of proxy on each node through a kube-proxy system component, which implements both iptables and ipvs.The name of the Service can be predetermined and can be predefined directly in the code or configuration file.The solution for Kubernetes will certainly require users to understand this process in order to create the corresponding resource.This is obviously more complex for users who do not understand Kubernetes.

- **Rainbond solutions**

  Rainbond is working on Kubernetes so the implementation model as a whole is very relevant but very different from Kubernetes related technologies.We restore the essence of the communication between components, and nothing more than the need to tell the originator of the communication what the target address you need to communicate.So we have proposed the concept of -dependence-, the relationship between components that describe communication needs to be displayed by the user, A needs to request B, and A needs to rely on B.This process is described in another language to describe the _service discovery_, a dependency is to inform Platform A needs to communicate with B, Component A needs to be given the ability to find the communication address of Component B, and to notify Component A once the address is retrieved.These things are an additional part of the business and the complexity must not be brought to the developers.Rainbond began four years ago to introduce Sidecar agents to address basic network governance models such as service discovery and load equilibrium between components.

  ![组件间通信结构图](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/connection.png)

  Components with upstream dependencies are automatically injected into the default communication governance plugin (envoy implementation) on startup. Use the default configuration.Plugins will find relevant configuration from the dashboard API (standard envoy service discovery API) for port listening and will be made available to the component operations themselves.The Sidecar plugin is in the same network space as the business component (the same Pod), so the communication address is the local circular address 127.0.0.1 and the communication port is the one that is configured according to the target component of the communication.Thus, for component A of the above figure, the location of service dependencies can be identified, such as (127.0.0.0.1:808080), a model that is also very useful in developing scenarios, and most of the service dependencies identified at the time of code development may be at 127.0.0.1, so no changes are required at the time of deployment.If you rely on upstream services with multiple examples, the Sidecar plugin will perform a load equilibrium or route to action based on configuration.

  Also before the service discovery process becomes effective, in Rainbond the service needs to be explicitly registered, i.e. in the port management of components, to set up port openings, to support the opening of internal services for inter-component communications, to open external services for access to components through gateways.

  For users, therefore, communication between components is required and only dependencies are established to bring the parties in a consistent direction.The platform will complete other things and the business itself can be understood to mean that the objectives for which communications are required are local (127.0.0.1)

### FAQ

- Could not find the component you want to rely on when creating dependencies

> If a component is normally deployed on a platform or a third party component is properly created, the main reason cannot be found that the port of the target component is not open - for in-service _, the port of the component opens the internal service is actually a process of _service registration_ and is first registered and discovered.

- Whether or not multiple component ports conflict

> According to the rationale described above, there is a port conflict problem in the current component network space if multiple components with the same port are dependent.There are two：1 ways to solve this problem. Port listen to all components considers reading environment variables PORTs, so that the component listeners can be changed by the platform, and then set different listening ports on the platform for each component.2. If all HTTP services, you can replace the default plugin with a network governance plugin, using domain names to distinguish different components and perform port reuse.

- Whether the communication protocol between components has limits

> Inter-component communications currently support the TCP and UDP protocols matching 99.99% component types, advanced application level governance currently supports HTTP protocols and future GRPC, MYSQL, MONGODB, REDIS, DUBBO and others.

- Whether dependencies can be passed between components

> When a component provides services externally, it can automatically inject its own connection information (such as the database that provides the service username, password, database name) into the relying party's environment and automatically inflow the information that the relying party needs.Refer to the next section document [通信变量注入](./connection_env)

- Microservice component ports are consistent, what do you do with each other?

  If you need to use Rainbond Microservice Communication Management：

  > 1. The basic mirror of the service modifies and supports reading PORT variables to build listening.
  > 2. Set a port for each service component on the platform and set the port alias.Like USER_SERVER PAY_SERVER.
  > 3. The configuration file of the code supports the variable quantification control.Use the variable defined in step 2 to define the interservice communication address.
  > 4. To clean up the communication relationships between components and build dependency.

  If you are Dubbo, SpringCloud or other microservice architecture mode, a third-party service registration center is used.You can then communicate directly without using Rainbrond's dependency mode of communication based on third-party service registration and discovery of services.In this case, there is no port conflict problem.
