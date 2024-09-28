---
title: How to build private cloud native Serverless Platform
description: With the spread of cloud calculations, a growing number of businesses are moving their business applications to clouds.However, the question of how to construct a full set of cloudy Serverless platforms remains to be considered.This paper will describe how to build a private Serverless platform on Rainbond
slug: Serverless
image: https://static.goodrain.com/wechat/serverless/serverless.png
---

With the spread of cloud calculations, a growing number of businesses are moving their business applications to clouds.However, the question of how to construct a full set of cloudy Serverless platforms remains to be considered.

## Serveress Trends

The cloud computing industry has gone through a process of shifting from the bottom to the top, from the IT infrastructure provider to the application developer, from IaaS to PaaS (platform or service) to Serverlessness.

In the IaS era, cloud calculation providers mainly provide infrastructure services, including computing, storage, networks, etc. Users need to build their own shipping applications.This phase is intended primarily for IT drivers and for the internal enterprise development team.

With PaaS emerging, the cloud calculation provider begins to provide a higher level of services, including development frameworks, databases, messaging queues, etc. Users only need to focus on application development without attention to underlying facilities.This phase, which is intended primarily for application developers and startups, can significantly increase development efficiency and reduce costs.

The availability of Serverless has further freed the app developers from handcuffing the server management to the cloud calculator provider, who has to focus only on the implementation of business logic and not on the management and maintenance of the server.The emergence of Serverless has received increasing attention to making application development more flexible and efficient and to reducing development and delivery costs as well.

Overall, the evolution from Iaaa to PaaS to Serverless is a continuous abstract and automated process of cloud computing services, which increases the efficiency of IT infrastructure and application development, reduces costs and drives the process of digitization.As technology and markets evolve, future cloud computing services will continue to evolve towards higher abstraction and automation.

## Self Serverless Meaning and Dilemma

It is important and necessary to build a privatized cloud Serverless platform.First, a privatized cloud Serverless platform would better meet the specific needs of enterprises, safeguard the security and privacy of data and better manage and control the allocation and use of computing resources than public cloud platforms.Second, with the digital transformation and the spread of cloud-origin technologies, there is also a growing demand for Serverless structures by enterprises, and the construction of privatized Serverless platforms can better meet the needs of businesses and increase their operational efficiency and operational effectiveness.

However, there are some difficulties in building a privatized cloud Serverless platform.First, there is a need for enterprises to have a certain technological strength and a pool of talents, including the mastery and application of a variety of technologies, such as cloud computing, packaging, microservices, etc.Second, there is a need for systematic architecture design and resource planning, including the formation of packaging clusters, network configuration, storage planning, etc.In addition, privatized Serveress platforms need to meet the requirements of high availability, high performance and security and require multiple testing and optimization.Finally, the construction of a privatized Serverly platform needs to take into account cost control and efficiency gains, and requires a combination of factors, including hardware equipment, software development and maintenance costs.Thus, building a privatized cloud Serveress platform requires comprehensive business planning and consideration in a wide range of technical, resource, human and economic aspects to ensure its stability and sustainability.

## ServerLess Features

At present, Serverless is not an industry uniform standard norm, as Serverless is not a specific technology or structure, but rather a cloud-based mode of operation and deployment that highlights the fact that developers need not be concerned with infrastructure such as servers.Normally, we think a cloud-born Serverless platform should provide the following：

1. The：platform should support automatic scaling-up in order to cope with changes in load and traffic.
2. The container is an：platform that should support the packaging configuration to facilitate managing the application's life cycle and resource allocation.
3. No server compute：platform should support no server computing mode to increase developer efficiency and reduce costs.
4. The：platform should support automated shipping features, including auto-deployment, extension, auto-recovery, etc.
5. Service discovery and load balance：platforms should support service discovery and load balance to ensure high availability and stability of applications.
6. Log monitoring and warning：platforms should support log monitoring and warning in order to detect and resolve app problems in a timely manner.
7. The security management：platform should support security management, including authentication, access control, audit services, etc. to ensure the security and privacy of the app.
8. Automated CI/CD：platform should support automated CI/CD in order to achieve rapid iterations and deployments.
9. Multicloud support：platform should support cloud environments so that apps can deploy and run across multiple cloud platforms.

So many capacity requirements make it difficult to build a self-contained cloud Server.Can an open source solution be chosen to achieve this objective?

## Based on Rainbond auto

Rainbond is an open-source cloud application management platform that helps users to quickly build and manage cloud apps, many of whose functional features are consistent with Serverless Server-free ideas.Rainbond provides a range of tools and services that can help users achieve rapid iterations and deployment of applications, including those related to the organization of applications, the organization of containers, automatic deployment, warning monitoring, application management, etc.In addition, Rainbond supports the deployment of multilingual, multi-frame, cloud environments where users can choose different modes of deployment according to their own needs.

![server-1](https://static.goodrain.com/wechat/serverless/rainbond-serverless-1.png)

### Native support cloud management

Rainbond can be built on a variety of clouds, and native supports cloud management.This cloud-management capability helps users to defuse differences between different cloud computers, providing a consistent application deployment and application management experience.Whether public, private, or mixed, clouds become transparent layers for users, and user applications can use the capabilities offered by Rainbond to effect a rapid movement across clouds.
![server-2](https://static.goodrain.com/wechat/serverless/rainbond-serverless-2.png)

### Simplify app deployment

Rainbond supports user deployment of applications developed in different development languages. This process does not require users to write Dockerfile, and does not need to know how the container mirrors are packing.Supported language types include：Java, Python, Golang, PHP, NodeJS, .NetCore, and Static Html languages.A user can only provide a code repository address when they operate, or directly upload Jar, War Pack to Rainbond, which automatically identifies the language type and automatically configure the language building environment and the final operating environment.Once the job is completed, the app will run automatically. The process does not require too many users.

During the deployment, users can choose to deploy the app by their own choice with a prime workload type, and Rainbond supports the deployment of Job, CronJob types in addition to supporting the usual Deployment, StatefulSet.

### Flexibility

Flexibility is one of the most important of the Serverless scenarios, and automatic elasticity scalability increases the use of computed resources.Users can use this capability to automate their business peak flow.Rainbond is able to use CPU/MEM resources to automatically scale up from 1-N instances. Users only need to make a very simple setup.In a higher scenario, Rainbond was able to look by the bypass to meet performance indicators, such as the average response time for Http's operations, throughput, etc. and achieve automatic scalability accordingly.

### Microservice capacity

The Serverless architecture, similar to the traditional microservice structure, is based on the idea of a distributed system that divides an application into multiple small, relatively separate service modules for development, deployment and management.Microservice frameworks can help developers to better design and develop these service modules and improve the maintenance, scalability and reliability of the system.Rainbond, with a flexible and efficient service Mesh microservice framework, is able to complete cross-linguistic, cross-protocol, cross-structure micro-service organization and provide comprehensive microservice governance, mismanagement mechanisms, etc.

### Automated Transport

Rainbod provides a well-developed automatization capability capable of freeing the developers.Many applications will be taken over by the platform, including regular data backup, health testing, failure healing, etc.

### Observability Centre

Extensible full range of observable capabilities, providing up to the application component, down to the platform's monitoring view.Global log functionality and link trackability can help developers quickly locate issues.Real-time warning capacity ensures that every exception gets the attention of developers.

### Auto CI/CD

Rainbond can place Git or Svn type code repositories, simplify user creation apps and configure automated Webhook processes.The developer will be able to touch the entire CI/CD chain, automatically completing the updated code online.

### Configure network entry by one click

Users do not need to learn complex load equilibrium configurations, but only one key, will enable the gateway strategy for L4/L7 and will be exposed to the port of application, and the platform will automatically generate access addresses in the form of IP:Port or domain names as required.

### Security management

A two-factor authentication method is used on the platform to ensure security of login and to provide a design based on RBAC to ensure permission control over the application.In addition to this, Rainbond provides the global operations log audit functionality to keep the user's record of each app operation.

Rainbond as an open source endogenous application management platform can help businesses cope with the difficulty of building privatized cloud-origin Serverless platforms.First, Rainbond provided a wealth of components and tools that made it easier for enterprises to construct containers clusters, microservice structures, CI/CD water routes, and so on, significantly reducing the technical thresholds.Second, Rainbond provided sound application management and control mechanisms, including applications deployment, service organization, load balance, and significantly simplified the workload of applications development and delivery, automating and freeing management.In addition, Rainbond has provided gateway components that can provide an outdoor exposure to L4/L7 services by a single key, thus improving the security and accessibility of applications.Rainbond also supports the Job Type or CrontabJob Time-Time Type to enable the enterprise to make scheduled assignments easily.Most importantly, Rainbond provides ServerMesh Microservice Framework and built-in Application Organization models to help businesses easily organize and manage their outreach, and to effect rapid iterations and updates.In addition, Rainbond has been able to use Git type code warehouses, automate the CI/CD process, further improving development efficiency and operational effectiveness.

## Write in the last

By building a privatized cloud Serverless platform, businesses can better cope with technological difficulties and improve its stability and sustainability.At the same time, Rainbond also provided excellent documentation and community support to help enterprises better understand and master relevant technologies and applications.As a result, building a privatized cloud Serverless platform will not only solve technological difficulties, but will also increase the efficiency of business development and reduce the cost of transport and is an ideal option to build a privatized Serverless platform.
