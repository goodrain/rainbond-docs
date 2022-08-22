---
title: design thinking
description: The origin and philosophy of Rainbond design
---

#### Enterprise application cloud operating system

<img width="100%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/arch1.png" />

For enterprise IT, enterprise applications are the most important manifestation of enterprise IT value. However, whether developing or using applications currently requires the lowest level of computing resources (IaaS/virtualized/physical servers), resulting in a technology stack. It is very long and needs to do a lot of work that is not directly related to the business, such as：development and operating environment construction; server management; network management; delivery process management; technical architecture support; basic technical service provision; technical tool maintenance and other operation and maintenance and technical work , and these tasks are common to all enterprise applications. If these tasks are packaged and automated, enterprises can focus on their own business, which can greatly improve the efficiency of enterprise IT.

`wraps the above repetitive work in` application-centric way, and supports the development, architecture, delivery, and operation and maintenance of enterprise applications. This abstract granularity can simplify enterprise application management and meet business needs. flexibility.When connecting to the underlying infrastructure, through`software-defined`implementation and connection, it can connect to various infrastructures.Through the above design, the operating system for enterprise applications is naturally formed.

#### non-intrusive architecture

<img width="100%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/arch2.png" />

Rainbond takes extensive support for enterprise applications as its primary goal. Extensive support for enterprise applications means that various enterprise applications can be developed, architected, and maintained on Rainbond. This is also the key point that affects the user experience. In order to achieve this goal, Rainbond adopts`No intrusion`architecture.The `non-intrusive`architecture is simple to use, and existing applications can be supported without modification.

Specifically from three aspects：

- In the development phase, connect to the code repository, automatically identify [development language type](/docs/use-manual/component-create/creation-process), do not change the developer's habits, try not to modify the existing code as much as possible, and directly compile, build and run.

- In the architecture phase, if the existing system does not have a distributed architecture, Rainbond provides a Service Mesh architecture, and business modules can be transformed into a microservice architecture without changing the code.

- In the operation and maintenance stage, it is difficult for the old legacy system to find original developers, and it is difficult to migrate to the new operating environment. Rainbond uses the method of dynamically generating configuration files and network relationships to migrate and run legacy systems.Operation and maintenance and governance functions are provided by Rainbond in the form of "non-intrusive" plug-ins, which can be selected and loaded according to functional needs.

The `non-intrusive`architecture also shows that there is no binding for users, and the developed applications can be developed and run without Rainbond.

#### Application-centric, connecting enterprise applications and enterprise computing resources

<img width="100%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/arch3.png" />

`Application-centric`It is the core design concept of Rainbond, and it is also the abstract idea of Rainbond. It emphasizes the focus on business, exposes business-related technical concepts to the outside world, and unifies the packaging of technical concepts that are not directly related to business.By abstracting in this way, users do not need to think too much about the server, that is, the`Serverless`architecture.

Through`application-centric`abstraction, enterprise applications and enterprise computing resources can be decoupled. The life cycle management of enterprise applications is not directly related to computing resources, which means that the development of enterprise applications can be developed on any type of computing resources. Enterprise applications can be directly installed and run on any type of computing resource, and can be migrated from one resource to another at any time.

Computational resources are completely transparent to users. Computational resources are connected to different usage scenarios. When computing resources are connected to public resources, it is`public cloud`, and when computing resources are connected to private resources, it is`private cloud`When computing resources are connected to both Connecting public resources and private resources is`Hybrid Cloud`.

Rainbond realizes the connection between enterprise applications and enterprise computing resources through decoupling, the accumulation of various enterprise applications that are connected to form the enterprise application market, the accumulation of various enterprise computing resources that are connected to form the enterprise computing resource market, the applications in the application market and the resources in the resource market Can be used in free combination.The process of combined use is represented by two interactive interfaces of SaaS and PaaS.SaaS realizes click-to-use without technology, and PaaS realizes advanced customized development.
