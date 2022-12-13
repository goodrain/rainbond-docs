---
title: The practice of Xianyang Big Data Administration using Rainbond as a smart city base
description: Xianyang Big Data Administration is responsible for the organization and leadership of the city's information sharing work, coordinating and solving major problems related to government information sharing, researching, formulating and organizing the implementation of the city's big data strategies, plans and policy measures, and guiding and promoting big data research and application work , establish the city's unified data service center and information sharing mechanism.
---

# The practice of Xianyang Big Data Administration using Rainbond as a smart city base

:::info
After using Rainbond as the base of the smart city, it has brought us double the improvement of operation and maintenance efficiency. —— Xiong Lizhi, Xianyang Big Data Administration
:::

Xianyang Big Data Administration is responsible for the organization and leadership of the city's information sharing work, coordinating and solving major problems related to government information sharing, researching, formulating and organizing the implementation of the city's big data strategies, plans and policy measures, and guiding and promoting big data research and application work , establish the city's unified data service center and information sharing mechanism.Through the new technical architecture of "device-edge-network-cloud-intelligence", the goal of efficient management, convenient service, industrial development, and ecological harmony is achieved, and a new model of new generation information technology and urban modernization is deeply integrated and iteratively evolves. new idea.

In the construction of smart cities, the management of smart city applications is a very basic problem.Traditionally, various application systems serving people's livelihood were deployed and governed by corresponding government departments, which caused some troubles.Various urban departments often operate independently, forming data silos among each other, making it difficult to communicate with each other.Both data and applications are difficult to manage in a unified manner.

In the construction of Xianyang smart city, focus on building a data exchange and sharing platform and an application management platform.The data exchange and sharing platform is responsible for opening up the data islands of various departments in the city. After data cleaning and regulation, the effect of interconnection and intercommunication between IT applications of all city departments is finally achieved.

During the construction of Xianyang Smart City, we encountered many difficult problems in the field of smart city application management.In order to solve these pain points, we have built an application management platform that can provide automated operation and maintenance capabilities with the help of Rainbond.I share the whole process of solving the puzzle from four parts：

**Pain Points**：Review smart city applications, difficulties and pain points in deployment, implementation and post-operation and maintenance.

**Positioning**：How do we position the smart city application management platform, and what kind of problems do we hope to solve through it.

**Landing**：Briefly describe the selection process of the smart city application management platform, as well as the process of deployment and landing.

**Actual combat**：Tell a real case to illustrate the whole process of rapid development and implementation of a smart city application after the introduction of the application management platform.

## Pain points in traditional mode

I summarize the pain points as follows：

- ：of unified management. In the past, the deployment of application systems in various city departments was disorganized.Each unit is building its own IT system, and there is no unified management at all.

- The legacy systems are more than：The application systems of many urban departments have been in use for a long time, and some systems have even lost the support of the manufacturers.Some systems use outdated technologies and cannot be easily migrated to an environment that can be centrally managed, and there is no way to monitor them well to obtain their real-time status.

- Unreasonable resource allocation：Every unit is carrying out the construction of IT system, which will inevitably lead to a lot of repetitive construction work, and the waste of resources will follow.And in the absence of resource monitoring, no one can tell exactly how much resources each application system should use.Regardless of the number of visits, the same resources are allocated, which lacks rationality.

- ：and maintenance difficultiesThese units themselves often lack the corresponding technical personnel to maintain these systems. Once a problem occurs, the maintenance method of each business system is different.

- Lack of observability：In the past, the construction of IT systems often only focused on the application itself, while ignoring the construction of observability.It is impossible to find problems quickly, and the failure of IT systems is often caused by user feedback.

## Positioning of application management platform

The application management platform is responsible for carrying and managing all the application systems under the smart city, including the newly built data exchange and sharing platform.All subsequent newly developed smart city applications will be deployed directly based on the application management platform, and old legacy systems will be continuously migrated to the application management platform with iterative updates.The purpose of this is to gradually integrate the data and applications of various urban departments and manage them in a unified manner.

In the process of building a smart city, a large number of new urban sector application systems will inevitably emerge.The role played by the smart city application management platform in this process is the GPaaS platform, and the data exchange and sharing platform is a part of the VPaaS.The combination of the two can integrate massive city data in the cloud to achieve integrated computing, which not only improves the operation speed of urban intelligence, but also greatly reduces the operation cost.I summarize the positioning of the application management platform and the data exchange and sharing platform as follows：

- The application management platform uniformly manages all computing resources downward.Realize the unified allocation and scheduling of computing resources.These computing resources are provided in the form of virtual machines or physical machines hosted in multiple computer rooms.The application management platform should provide a resource monitoring panel and send alarm information when there is a problem with the underlying computing resources.

- The application management platform upwards carries all smart city application systems including the data exchange and sharing platform.It provides a unified management panel and rich automatic operation and maintenance capabilities to minimize the difficulty of application operation and maintenance management.Smart city applications can be migrated to the application management platform at a very low cost, and the access traffic and resource usage of applications can be counted in real time, and computing resources can be allocated and automatically adjusted for applications on demand.

- The application management platform extends horizontally to various city departments.The data exchange and sharing platform needs to use this capability of the application management platform to connect with the existing IT system of the city department.

- The application management platform can accommodate old legacy systems.For all kinds of old legacy systems that cannot be directly migrated to the application management platform, such as Windows applications, at least logical access should be possible, simple management with a unified style panel, and monitoring capabilities such as health detection.

![](https://static.goodrain.com/wechat/xybigdata/1.png)

## Landing process and value embodiment

We selected and compared a variety of PaaS platform products, and finally chose Rainbond.Looking back at the selection process at that time and the experience of using the system until now, I summarize its advantages as follows：

- Easy to use：Rainbond is the best product in terms of ease of use among many selection products.The one-stop productized experience allows us to greatly reduce the cost of learning in the development and deployment of smart city applications, and even in the later operation and maintenance work.The core application of the data exchange and sharing platform completed the migration to the cloud in less than a week.

- Powerful automatic operation and maintenance capabilities：In terms of operation and maintenance management, its automatic operation and maintenance capabilities are very good, which saves a lot of operation and maintenance costs and doubles the operation and maintenance efficiency.

- Observability：Rainbond provides a comprehensive monitoring and alarm system, whether it is computing resources or the upper-layer application system, once a problem occurs, it can be quickly exposed.Combined with automatic operation and maintenance capabilities, the problem application system can be self-healing and self-recovery.By observing the access volume and resource consumption of the application system, the resource allocation can be carried out more reasonably.

- Open source ecology：Rainbond itself is an open source product, and it also embraces the open source community ecology.Its internal application store system provides a large number of third-party middleware we need. These middleware can be deployed to the application management platform with one click, which saves a lot of time and energy.Otherwise, building these middleware systems from scratch based on servers is very time-consuming and labor-intensive.

The application management platform based on Rainbond was put into use in November 2019.The bottom layer of this application management platform is connected to 3 different clusters, namely the development and testing environment, the ordinary production environment and the secret production environment.Up to now, there are more than 100 sets of various urban applications deployed on it, and the number of components exceeds 500.

![](https://static.goodrain.com/wechat/xybigdata/2.png)

It was first migrated to the data exchange and sharing platform on the application management platform.The process of migrating to the development and testing environment is relatively easy. We invested two developers and two operation and maintenance personnel. With the cooperation of Haoyu Technology's delivery engineers, all components were deployed to the application management platform based on the source code.All of the learning and transfer work took only about a week to complete.The next thing to consider is deploying the application in a production environment.Here, we use the capabilities provided by Rainbond's internal component library to publish the data exchange and sharing platform in the development and test environment to the internal component library, which can be deployed in the production environment with one click.Subsequent upgrade operations are also completed by the version management function of the application template, which greatly saves deployment and upgrade costs.

The data exchange and sharing platform needs to extend to each city department to connect its existing IT system with the help of the platform capability.At first, Rainbond did not support this special requirement, and finally customized a special gateway, so that the data exchange and sharing platform can interact with the existing IT system of the city department through the gateway.

![](https://static.goodrain.com/wechat/xybigdata/3.png)

Data exchange and sharing platform deployment form：

![](https://static.goodrain.com/wechat/xybigdata/4.png)

In terms of application operation and maintenance management, what we find most useful is the unified gateway configuration function provided by Rainbond.Through very simple configuration, the application system deployed on the platform can expose the service address to the outside world.And after customization, the Rainbond gateway we use supports the national secret certificate, so that our requirements in Encore have also been met.

![](https://static.goodrain.com/wechat/xybigdata/5.png)

After a long-term test, the stability of the application management platform based on Rainbond has been affirmed.Especially when the new crown epidemic broke out in 2020, the foreign population statistics system developed and deployed in a short period of time, with the support of the application management platform, withstood the test of large concurrency and completed the statistical task.

## Actual combat response to the test of the epidemic

In February 2020, due to the arrival of the peak of resumption of work and return to work, large-scale population movements were restarted. In order to curb the spread of the epidemic and do a good job in the prevention and control and service of foreign returnees, Xianyang City needs to complete the work in the shortest time. The population registration system was developed and launched, and the information reporting and management services for 1.3 million people in Xianyang City were completed within 3 days.

The registration business of migrants in Xianyang City is a business system with separate front and back ends.It mainly includes five service components: front-end page, back-end service, cache, database, and SMS business.

At this point, the application management platform has been in place for half a year, and we have been able to develop and deploy based on Rainbond very proficiently, so the development and launch of the business did not encounter obstacles, and we quickly completed the launch of the business.

![](https://static.goodrain.com/wechat/xybigdata/6.png)

Rainbond provides the scaling function of service components. With just one click, multiple instances of the current service components can be quickly scaled and automatically provided with load balancing.In order to automatically expand the number of instances when the business traffic is too large, we also set up an automatic scaling function that is triggered based on memory usage.More automation at the operational level.This will greatly reduce the pressure on a single instance to process business.

Among all the components of Xianyang's foreign population registration business, we have scaled up to 5 instances for the two service components of the front-end page and the back-end service. These two service components are also components that are frequently updated in real time. Based on multiple instances, Rainbond provides a rolling update function, so that business upgrades will not affect online business operations.

In order to better monitor the pressure of each service component of "Xianyang Migrant Population Registration Business", we installed Rainbond's own service real-time performance analysis plug-in for front-end pages, back-end services, and databases.During the operation of the business, this plug-in brings us a lot of useful information, and helps developers discover the shortcomings of the business system many times, so that developers can correct the code and go online before the business avalanche goes down.

For components that provide services based on Http protocol such as front-end pages and back-end services, the plug-in will provide three real-time data such as average response time, throughput rate, and number of people online, as well as persistent data such as URL rankings and historical data in the last 5 minutes.

![](https://static.goodrain.com/wechat/xybigdata/9.png)

![](https://static.goodrain.com/wechat/xybigdata/7.png)

![](https://static.goodrain.com/wechat/xybigdata/8.png)

During the entire reporting period, the average number of online users of the four business systems remained above 4,000, with a peak of 5,000+, and the total traffic load through the unified gateway exceeded 20,000.

## Summary and expectations

Rainbond has met the expectations of the Xianyang Big Data Administration for the application management platform, and has been running very stably so far.However, after managing hundreds of sets of application systems, we put forward higher requirements for the overall monitoring of applications, and we need to understand the operation of all application systems from a higher dimension. I learned that they have large-screen products with higher dimensions. During the construction period, this problem can be solved.
