---
title: Wisdom Julu uses Rainbond to implement the practice, a platform to manage all application systems
description: In recent years, I have been in charge of the operation and maintenance of the smart city project "Smart Julu".This project involves the operation and maintenance management of more than 30 sets of smart city applications developed by more than 10 suppliers. Using traditional methods to deploy and manage will definitely cause confusion.At the beginning of the project, we tried to use cloud-native technologies to improve deployment and management efficiency.
---

# Wisdom Julu uses Rainbond to implement the practice, a platform to manage all application systems

:::info
Hello everyone, my name is Li Dong from Beijing Shulitong Technology Co., Ltd.In recent years, I have been in charge of the operation and maintenance of the smart city project "Smart Julu".This project involves the operation and maintenance management of more than 30 sets of smart city applications developed by more than 10 suppliers. Using traditional methods to deploy and manage will definitely cause confusion.At the beginning of the project, we tried to use cloud-native technologies to improve deployment and management efficiency.
:::

## background

Hello everyone, my name is Li Dong from Beijing Shulitong Technology Co., Ltd.In recent years, I have been in charge of the operation and maintenance of the smart city project "Smart Julu".This project involves the operation and maintenance management of more than 30 sets of smart city applications developed by more than 10 suppliers. Using traditional methods to deploy and manage will definitely cause confusion.At the beginning of the project, we tried to use cloud-native technologies to improve deployment and management efficiency.



## Getting to know Rainbond

The eyes of the selection, from the beginning, fell on the two orchestration tools, Kubernetes and Docker Swarm, which are implemented based on containerization technology.At that time, there were few domestic application scenarios of cloud native technology, and the operation and maintenance engineers in the project team were not very good at containerization and other corresponding technologies.In order to learn more about these orchestration tools, I mobilized engineers to conduct surveys separately. When I got the survey results, I was embarrassed to find that it was only the installation method of these orchestration tools, and the plans brought back by each engineer were different.The entry threshold of cloud native is very high, beyond my expectations.

As a second choice, I decided to introduce an application management platform that is convenient for engineers to get started, to replace the operation and maintenance engineers to complete the complex interaction with orchestration tools such as Kubernetes.At this point, Rainbond entered my field of vision for the first time.



## Getting started with Rainbond

I am an old user of Rainbond and have been using it since version 3.X to manage all smart city applications of the Smart Julu project.Currently, there are more than 30 sets of smart city applications running stably in two Rainbond clusters, and we are working on migrating smart city applications from the older 3.X version of the Rainbond cluster to the newer 5.X version of the Rainbond cluster.

Back when I first started using Rainbond, I was impressed with how easy it was to use.Our engineers no longer need to directly face Kubernetes, which has a high learning threshold, and do not even need to pay attention to the operation process of containerizing smart city applications. Rainbond's own source code construction function directly takes over the containerization work.

After more than two years of operation, the stability of Rainbond is also satisfactory. At present, the Smart Julu project team has fully controlled this application management platform.

![WechatIMG17](https://tva1.sinaimg.cn/large/008i3skNly1gxox5ylsdqj31h30rj424.jpg)



## most valuable scene

Using Rainbond for a few years, I think it has brought a lot of value to it：

- Stability Guarantee

What really enables Rainbond to take root in the Smart Julu project is its stability. The product itself has no serious bugs, and the team has overcome some minor problems in the old version.As an application management platform running in a smart city data center, stability is more important than other factors.At this point, Rainbond performs very well. Even if the host server is down, the application can automatically failover and recover quickly.The host in question can also automatically rejoin the cluster after the problem is fixed.



- Convenient graphical management interface

As an application management platform for smart city data centers, it assists us in managing all smart city applications.With the help of a graphical interface, operation and maintenance engineers can easily operate these applications, including starting and stopping, orchestration, and scaling.Since there is no need to write complex Yaml configuration files and no command line interaction, the engineers of the Smart Julu project team can get started quickly.



- Outstanding ease of use

I think ease of use is Rainbond's greatest feature.It uses the application as the core abstraction, and many functions designed around the application are very useful.For example, automatic scaling, health detection, etc. are all very practical functions.The configuration of the gateway policy is also very friendly, the operation difficulty is basically zero, and it is very convenient to bind the domain name matching certificate.

![](https://static.goodrain.com/images/docs/3.6/micro-service/horizen.png)


- Reasonable observability

Rainbond provides a comprehensive monitoring and alarm system, whether it is computing resources or the upper-layer application system, once a problem occurs, it can be quickly exposed.Combined with automatic operation and maintenance capabilities, the problem application system can be self-healing and self-recovery.By observing the access volume and resource consumption of the application system, the resource allocation can be carried out more reasonably.

![image-20211230164119378](https://tva1.sinaimg.cn/large/008i3skNly1gxvy97d56yj31h60k20ue.jpg)

![image-20211230160050171](https://tva1.sinaimg.cn/large/008i3skNly1gxvx34pmmej31qg0u0qaj.jpg)



- Complement supplier management processes

Smart city applications come from many different suppliers. In the past, when deploying and operating in the traditional mode, each supplier's routine was different.This difference is not only reflected in the development language and technical architecture, but also in the different deployment methods and operation and maintenance management methods.This is a pain for our operation and maintenance managers, and the operation and maintenance management methods of each set of smart city applications are different.

This situation is much better after the introduction of Rainbond.The operation and maintenance management team relies on Rainbond to establish an access mechanism for external suppliers, and uses a unified specification to manage all smart city applications, which greatly improves the management efficiency, and also enables the operation and maintenance management team to be independent from suppliers. In this case, smart city applications are well managed.The current management model is to separate the supplier access environment and the final production environment according to the team method. Supplier developers only need to pay attention to the development process of business code. The smart Julu operation and maintenance management team will organize the business according to the code. Go live to production environment.It truly implements the management method of isolation between development and production.

![image-20210923142933743](https://tva1.sinaimg.cn/large/008i3skNly1guqjpwi6k1j61gp0u0q9g02.jpg)





## Summarize

It has been more than two years since I introduced Rainbond in the Smart Julu project. As an application management platform, it really helps the daily operation and maintenance management of smart city applications.Currently in a transitional stage of migrating the old version of Rainbond cluster to the new version, I believe that we will continue to work with Rainbond in the future.


