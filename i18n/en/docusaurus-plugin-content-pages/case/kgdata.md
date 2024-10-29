---
title: Kergi Data completes cloud-native transformation through Rainbond to achieve offline continuous delivery to customers
description: Nanjing Keji Data Technology Co., Ltd. was established in 2015, providing one-stop full life cycle knowledge graph construction, operation and maintenance, and intelligent application services, and is committed to "linking massive data and mining wisdom from big data".Help enterprises use knowledge graph technology to build the world's leading cognitive work automation intelligent engine.
---

# Kergi Data completes cloud-native transformation through Rainbond to achieve offline continuous delivery to customers

:::info
"Cloud native makes our delivery more automated in the offline environment of our customers" --Liu Zhanfeng from Corgi Data
:::

## About Corgi Data

![](https://static.goodrain.com/wechat/kgdata/1.png)

Nanjing Keji Data Technology Co., Ltd. was established in 2015, providing one-stop full life cycle knowledge graph construction, operation and maintenance, and intelligent application services, and is committed to "linking massive data and mining wisdom from big data".Help enterprises use knowledge graph technology to build the world's leading cognitive work automation intelligent engine.

At present, it has served dozens of major customers in the fields of pharmaceutical companies, medical institutions, military institutes, scientific and technological information and publishing, and has accumulated rich experience in the application and development of industry knowledge maps.Typical customers include National University of Defense Technology, China Aviation, China Electric Power and so on.

## The Cloud Native Road of Corgi Data

Hello everyone, I am Liu Zhanfeng, the solution architect of Nanjing Keji Data. I have benefited a lot from the advantages of cloud native technology in delivery, operation and maintenance.As a project partner, Rainbond continues to help the rapid development, delivery and deployment of Corgi's multiple business systems.Before using Rainbond, due to the short business iteration cycle and many components involved, the platform version update was time-consuming and labor-intensive, and service operation and maintenance were difficult.In many projects, the customer's operation and maintenance capability reserve is insufficient. Based on the traditional delivery and management methods, the customer cannot take over the business operation and maintenance at all. As long as there is trouble, we must send engineers to the scene to solve the problem.In response to the problems in delivery operation and maintenance, various business platforms have begun to transform themselves into cloud natives.

At first, we tried to build the company's internal development and testing environment, and encountered two small pits in the process.

The first pit is that the user experience is not good after the：environment is built. All operations involving disk read and write appear abnormally stuck. The Etcd cluster log in the cluster keeps reporting that it is in the "read_only" state. Is the server load soaring.

![](https://static.goodrain.com/wechat/kgdata/2.png)

We turned to the Rainbond open source community with skepticism. After various investigations, we focused on the IO performance of the disk.After replacing the high-performance disk, we reinstalled the entire development and testing environment, and the improvement in disk performance has indeed solved the problem that the Etcd cluster often does not work.

The second pit is that：uses the shared storage service but is still in a state of extremely slow reading and writing, which really makes all the engineers present start to have a big head again.After confirming the hardware performance, start to focus on the operating system configuration parameters, the operating system kernel is constantly reporting errors related to shared storage：

![](https://static.goodrain.com/wechat/kgdata/3.png)

NFS:\_\_nfs4_reclaim_open_state: Lock reclaim failed! Indicates that there is a synchronization difference between the nfs client and the nfs server, and the alarm will start when the difference is much worse.After continuous exploration, engineers finally locked two system parameters related to nfs performance. The Linux nfs client controls the number of NFS requests initiated at the same time. If the parameter configuration is small, it will lead to poor IO performance.

```bash
echo "options sunrpc tcp_slot_table_entries=128" >> /etc/modprobe.d/sunrpc.confecho "options sunrpc tcp_max_slot_table_entries=128" >>  /etc/modprobe.d/sunrpc.conf
```

After modifying these two parameters, the performance of the shared storage has been significantly improved, and the confusing kernel alarm information has also disappeared.The development and test environment can finally be used smoothly.

The next challenge is how to smoothly migrate our multiple business systems to Rainbond. Fortunately, Rainbond is easy to use and the overall learning gradient is not steep. We can easily deploy business systems on Rainbond in batches.However, the cloud-native application evaluation organized by Rainbond engineers pointed out that there are many points in the business system that do not conform to the characteristics of cloud-native, and put forward some rectification suggestions.During the rectification process, we also gained a deeper understanding of cloud native.

- Stateful components such as Elasticsearch need to adjust the component deployment type to stateful single instance or stateful multi-instance, not stateless

  We didn't know what stateful/stateful components were at first, so we didn't pay attention to distinguish the deployment types of components.Rainbond engineers reminded us that Elasticsearch should be deployed using the stateful component deployment type in the Rainbond platform.

:::tip L1 Cloud Native Application Features - Scalability

Cloud native applications focus on the resource type used by the deployment components. Service components such as database type and message queue type should be deployed using the StatefulSet resource type on the Rainbond platform.By defining a stateful or stateless deployment type for the service component, it is specified to use the StatefulSet or Deployment resource type to deploy instances. :::

- Support horizontal scaling

  Our multiple sets of business systems were traditional monolithic architectures before the cloud-native transformation, and high availability features were basically ignored during deployment.This makes our business system relatively fragile without any fault tolerance. Once the server goes down, the entire business system loses its service capability.In the process of cloud native transformation, we used Rainbond's natural microservice capabilities to easily split our business system into a more reasonable microservice architecture.What surprised us even more is that most of these split microservice components directly have the ability to scale horizontally. With the one-key scaling ability of Rainbond, they can quickly expand into a multi-instance cluster, which greatly improves the availability of the system. .For some components that cannot be scaled with one click, Rainbond engineers also provided reasonable opinions to guide us to modify these special components to make them "stateless".Now, the cloud-native transformation of the business has the tenacious vitality of "Xiaoqiang", and is no longer afraid of server downtime.

:::tip L1 Cloud Native Application Features - Scalability

By means of program data separation and other means, the statelessness of the application is realized, so that the cloud-native application can scale multiple instances horizontally at will.On the one hand, the scaling of the number of instances enables cloud-native applications to have high availability, and also directly affects their anti-concurrency capabilities.Rainbond also provides an automatic scaling function to cut peaks and fill valleys. :::

- All configurations support environment variable configuration, like `${GATEWAY_PORT:8083}`

  In the past, we used to write the configuration items of the service as fixed values, which made us have to re-change a large number of configuration files every time we entered a new deployment environment.Rainbond engineers pointed out that cloud-native applications should save the configuration to the environment and declare it in the form of environment variables plus default values.Most of the configuration items that need to be modified, such as the connection address information between different components, can be injected into each other through the connection information in the Rainbond dependency, saving a lot of configuration work.

:::tip L1 Cloud Native Application Features - Configurability

One of the best practices advocated by cloud-native applications is to keep the configuration in the environment.In different operating environments, it is a very good experience to use environment variables to configure.Rainbond supports setting environment variables for each service component, and can also configure environment variables in batches based on the configuration group function. :::

- The main port of the component is defined by the environment variable `${PORT}`

  Rainbond engineers provided a little trick to configure the component listening port configuration with a fixed environment variable. The value of this variable will be automatically changed with the port number we manually added on the Rainbond console. In this way, we will You can change the port number you want to listen to without changing the code and configuration, which is very convenient.

:::tip L1 Cloud Native Application Features - Configurability

As a supplement to environment variables, Rainbond provides a series of environment variables that can be automatically generated. These specific environment variables are very convenient for users to use. :::

- All components require a unified time zone

  It is very necessary to unify the time zone configuration of all components. Rainbond engineers have provided a trick to make the time zone setting a very simple matter.As long as the image of the running environment contains the `tzdata` package, we can complete the time zone configuration based on the configuration of an environment variable such as `TZ=Asia/shanghai`.

:::tip L1 Cloud-Native Application Characteristics - Basic Observability

Unified time is very important in the field of operation and maintenance. In the field of cloud native, the configuration of time zone can also be configured based on environment variables. :::

- All businesses need to define health check policies

  Rainbond engineers asked us to define a health check policy for all service components, so that when a service component encounters a problem, it can quickly identify the abnormal running state, and complete the offline or restart operation according to the previous configuration.For the http service, we define a detection interface to judge the status of the service through the status code returned by the probe request; for general middleware, it is judged by detecting the listening status of its TCP port.

:::tip L1 cloud native application features - high fault tolerance

To improve fault tolerance, cloud-native applications need to configure reasonable health check policies.This is conducive to quickly discovering abnormal conditions of components, and performing automatic restart and offline operations according to pre-configured policies. :::

- Components should support graceful failure and retry mechanisms

  Rainbond engineers explained to us how our service components should react when they are shut down to maximize the end-user experience.When the process receives SIGTERM, it rejects the new request, closes the port after completing the received request, and exits the process.For the case where the service component suddenly loses the database connection, a reasonable retry mechanism should also be added. If the connection to the database cannot be reconnected after multiple retries, the process should be terminated, and the operation and maintenance should be reminded with an explicit component abnormal state. personnel.

:::tip L1 cloud native application features - high fault tolerance

Cloud-native applications emphasize fault tolerance, which not only includes whether the application itself and the platform provide automatic processing means when certain errors are triggered, but also provides better observability to remind the operation when errors cannot be handled. Guards intervened. :::

- The front-end web component calls the back-end api component address need to be nginx proxy

  For projects where the front and back ends are separated, it is a good experience to use the front-end web server to forward the interface layer reasonably.While helping us complete the source code construction of the front-end VUE project, Rainbond engineers also taught how to forward interface requests to back-end components by adding configuration files in the code root directory.

:::tip L2 cloud native application features - front-end and back-end separation configuration

Rainbond provides a convenient way to configure Nginx running on front-end projects such as VUE. After configuration, you only need to depend on the front-end and back-end components to realize API forwarding.It does not need to be recompiled according to the address change of the backend service every time it is deployed.  
:::

- One-click delivery

  One of the purposes of using Rainbond is to use its capabilities to achieve rapid delivery of business systems.Through the cooperation with the Good Rain Technology delivery team, we only need to provide the offline package of the application template, and the Good Rain Technology delivery team can help us deliver the entire business system in the final production environment with one click.This greatly reduces our delivery costs.

:::tip L2 cloud native application features - one-click installation

With the application publishing capabilities provided by Rainbond, we can publish enterprise applications running on the platform as an application template with one click.Our most ardent expectation for the application template is that this application template can be installed into an application with the simplest operation method and as little manual debugging as possible. :::

- One-click upgrade

  In order to adapt to the needs of end users, we need to constantly iterate our products and continuously upgrade our business systems in production.The version of Rainbond based on the application template implements the one-click upgrade capability. This function is very useful to us. We only need to provide a higher version of the application template offline package, and the Haoyu Technology delivery team can help us in the final production environment with one click Upgrade the entire business system.

:::tip L2 cloud native application features - one-click upgrade

Rainbond's app store mechanism supports the upgrade operation of installed apps based on the version of the app template.The platform's upgrade mechanism solves the problem of version management of most attributes, such as service component versions, configurations, and dependencies.The issue that still needs the attention of application developers is the versioning of data. :::

## final effect

After the application is transformed, you can view the topology and dependencies of our products through Rainbond.

![](https://static.goodrain.com/wechat/kgdata/4.png)

In the actual project, our products have been transferred to three environments：

![](https://static.goodrain.com/wechat/kgdata/5.png)

Development environment：We use the open source version of Rainbond to build a development and testing environment on the company's server within the company. Our development team built the business system through source code and quickly moved the business system to Rainbond.After a period of testing and iteration, we took out the first version of the application template and exported the offline package using the offline export function.

Access test environment：uses media such as CD-ROMs. Only one engineer needs to import the offline package into the private cloud access test environment provided by the end customer. After importing, the product can be installed with one click.Regarding the feedback from customers, we exported a new offline package in the development environment, imported it into the access test environment again, and carried out a one-click upgrade. After many iterations, we finally met the access requirements of customers.

Production environment：The final production environment is completely managed by the customer. We only need to provide the approved offline package of application templates and necessary documents, and the customer can deploy and upgrade our products very quickly.

Compared with the previous delivery methods and processes, accessing the：system has brought us these better delivery experiences0

- **A more convenient delivery method：The deliverables are just offline packages, and do not need to care about the complex operating environment of the customer.**
- **Lower delivery cost：The delivery cost is greatly reduced in terms of time and manpower.**
- **Application operation and maintenance process automation：cloud native technology has effectively improved the capabilities of business systems, availability, fault tolerance, and dynamic scaling capabilities when traffic increases sharply.**

In the end, in just one week, we completed the cloud-native transformation of each business system, and passed the test and passed the cloud-native application standard specification certification L2 level.The problems of difficult delivery and maintenance in the previous project delivery process are our biggest hidden costs. Customers only look at the final delivery effect and will not pay for the delivery process.

After the cloud-native transformation, the project that previously required a delivery team to be dispatched for one week can be completed in one hour.And users can get started quickly through Rainbond's visual interface, 95% of the operation and maintenance problems can be solved by themselves, or remotely guide customers to operate.

![](https://static.goodrain.com/wechat/kgdata/6.png)

# What is Cloud Native Application Standard Specification Certification?

"Cloud Native Application Standard Specification Certification" provides a reliable technical endorsement for the convenience of software vendors in the application delivery process, maintainability after delivery to customers, and portability when necessary.At this stage, "Cloud Native Application Standard Specification Certification" is divided into L1, L2, and L3 levels, which play an important role in application delivery and delivery management.

- L1 focuses on one-click installation and automated O&M after：applications are delivered across environments.Such as high availability, scalability, observability, etc., to improve the maintainability of the end customer and reduce the customer's learning cost.
- On the basis of L1, L2 focuses on one-click upgrade after：applications are delivered across environments.Such as full/incremental upgrade, version rollback, etc., to meet the continuous iterative delivery needs of customers.
- On the basis of L2, L3 focuses on one-click backup and migration after：applications are delivered across environments.Such as package backup including complete data, portability, etc., to help customers realize the migration and disaster recovery of the overall production environment
