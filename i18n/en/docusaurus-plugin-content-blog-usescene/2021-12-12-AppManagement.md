---
title: Enterprise-level application unified management
description: When we use a smartphone, the mobile APP is installed from the application market with one click. After installation, click and use. When there is a new version, one-click upgrade. If you don't want to use it, long press the icon to delete. The whole process is very simple, and children can be proficient. master.For enterprise applications, due to the complex structure, high availability requirements, and many configurations, the management of enterprise applications is extremely complicated.There are generally specialized operation and maintenance engineers within the enterprise to be responsible for ensuring the normal operation of enterprise applications.
slug: AppManagement
images: /img/usescene/企业级应用统一管理.jpeg
---

:::info When we are using a smartphone, the mobile APP is installed from the application market with one click. After installation, click and use. When there is a new version, one-click upgrade. If you don't want to use it, long press the icon to delete, the whole process is very simple. , children can master it.For enterprise applications, due to the complex structure, high availability requirements, and many configurations, the management of enterprise applications is extremely complicated.There are generally specialized operation and maintenance engineers within the enterprise to be responsible for ensuring the normal operation of enterprise applications.

[Rainbond](https://www.rainbond.com?channel=cnblog) is a cloud-native enterprise application management platform. This article will use it as an example to explain how to simplify the management of enterprise applications like managing mobile APPs. :::

<!--truncate-->

### Build an enterprise app store and install enterprise apps from the app store with one click

The installation of the mobile APP has been extremely simple, just one-click to install the desired APP in the pre-installed AppStore.This one-click installation experience process, even a child can master it very well.Enterprise application deployment is difficult, with a large number of components, and its installation complexity is much higher than that of mobile APPs.So in the field of enterprise application installation, can you achieve the same one-click experience as installing a mobile APP?

Analogy to the installation process of mobile APPs, the App Store, a platform that gathers a large number of APPs, is an indispensable part. It is the prosperous app stores such as Apple AppStore and Google Play that allow mobile phone consumers to install mobile APPs at will.The Rainbond App Store is an enterprise-grade AppStore.Each user can publish their enterprise applications deployed on Rainbond to the application store for other users to use. Other users only need to install and upgrade from the application store with one click, and the experience is similar to that of the mobile AppStore.

![WechatIMG148](https://s2.loli.net/2021/12/13/dT3bs2R5HoBluP9.jpg)

For the end-user experience, companies that develop mobile APPs need to develop and put on the shelves according to the standards of the application store. The implementation of the enterprise application store is also a similar idea. The suppliers of enterprise applications need to package and put on the shelves according to the standards of the enterprise application store. The App Store has a complete set of application packaging, testing and launch processes, such as packaging from source code, binary file packaging, container packaging, etc. These packaging processes do not require changes to the original code.Packaging and listing according to the specifications of the app store not only simplifies the application installation and upgrade process, but also establishes the acceptance criteria for enterprise applications.

![WechatIMG149](https://s2.loli.net/2021/12/13/8aEJ1U7RTNbCZDr.jpg)

### Enterprise application management is complex, how to simplify management?

For a mobile APP, there are actually very few management operations we can do, only involving installation, upgrade, and deletion.An enterprise application is much more complex, and the management operations required by an enterprise application include at least the following points：

- Life cycle management：is just like how mobile phone users need to install, use, upgrade, and delete apps. Operations related to life cycle management such as installation, upgrade, startup, shutdown, and deletion are the most basic management operations required by enterprise applications.
- Batch management：Only one component of mobile APP needs to be managed, while enterprise applications are often formed by the interdependent combination of multiple service components.So there will be a need for batch operations.
- Resource Allocation：Mobile phone users never have to care about how many resources need to be allocated for an APP, while enterprise application managers must care about allocating reasonable computing resources to each component.Insufficient allocation of computing resources will make enterprise applications run sluggishly or even unable to run, and excessive allocation of computing resources will lead to resource waste.
- Scalable features：The mobile APP does not need to run multiple copies, it only needs to ensure normal operation in the mobile phone to meet the owner's personal use pressure.Enterprise applications, whether in terms of high availability or anti-concurrency, will require horizontal scalability.
- Observability：Mobile users never care whether they can see the running status of mobile APPs, they only care about their functions.However, enterprise application managers will put forward high observability requirements for enterprise applications, including running status, resource occupation, performance, and running stability.
- Failure recovery：Mobile phone users allow the app to occasionally flash back, but it is nothing more than reopening it once.The expectation of enterprise application managers for enterprise applications is that even if there is a problem with the enterprise application, it can quickly recover from the failure state.
- Migration/Backup：The user data of the mobile APP is stored in the cloud, and the data migration and backup operations are simple.Enterprise applications attach great importance to data, and have high requirements for operations such as migration and backup. In some scenarios, cross-cluster migration and backup are even required.

After comparison, it can be found that enterprise applications need to pay attention to the management points, which are much more complicated than mobile APPs.But that doesn't mean that enterprise application managers have to put in extra effort to manage enterprise applications.Choosing the right enterprise application management tool will make enterprise application management work more efficiently with less effort.

Rainbond simplifies the management of enterprise applications in three：

1. Make routine management simple and easy to use, such as：installation, upgrade, startup, shutdown, deletion, scaling, domain name configuration and other management operations can be completed in one step.
2. The complex operation and maintenance process is automated, such as the operation process of：installation/upgrade/startup, health detection, high availability of services, automatic scaling, etc.
3. Real-time monitoring and visualization of the process, since the management process has achieved simple operation and automation, it is necessary to strengthen monitoring and visualization to understand the application operation, so that the process can be controlled and managed.

### Make general management of enterprise applications simple and easy to use

As has been analyzed above, the management operations of mobile phone users on the APP are limited to simple operations such as opening and closing.For enterprise applications, we hope that the management operations initiated by enterprise application managers are also simple enough.Enterprise application managers can complete the life cycle management operations of enterprise applications through a graphical interface.

For enterprise applications as a whole, batch management operations can be performed：

![Overall application management](https://tva1.sinaimg.cn/large/008i3skNly1gx8wf94wskj321m0cyjtd.jpg)

![Apply batch management](https://tva1.sinaimg.cn/large/008i3skNly1gx8wfw8dsmj32220tkjuw.jpg)

Operations involving life cycle management include but are not limited to：

- Start, stop, update, build, and upgrade enterprise applications as a whole
- Batch startup, shutdown, update, build, restart, and deletion of all components within an enterprise application

For scenarios where you want to completely migrate enterprise applications to other clusters or make a backup, the migration/backup function of graphical operations can solve the problem：

![image-20211123172110092](https://i.loli.net/2021/11/23/gHUTIlvZGR3ntSq.png)

For the specified service component, there are more：management operations that can be performed.

![image-20211210181939473](https://tva1.sinaimg.cn/large/008i3skNly1gx8wpd6bidj31rt0u00xb.jpg)

In addition to the more common life cycle management, enterprise application managers can also have more active operations：

- Version management, one-click upgrade or rollback between multiple builds

![image-20211210211647240](https://tva1.sinaimg.cn/large/008i3skNly1gx91tnr75hj326a0emwh0.jpg)

- Scaling management, proactively setting computing resources and number of instances for service components

![image-20211210211718070](https://tva1.sinaimg.cn/large/008i3skNly1gx91u6zc0yj325i0fsaby.jpg)

- Environment configuration, actively set environment variables for service components, and mount configuration files

![image-20211210211742077](https://tva1.sinaimg.cn/large/008i3skNly1gx91ulhyfnj325e0jktau.jpg)

- Storage management, actively adding persistent settings for service components, so that data can be saved persistently

![image-20211210211814601](https://tva1.sinaimg.cn/large/008i3skNly1gx91v63n7tj325s0dmgmw.jpg)

- Port management, actively adding port access policies for service components

![image-20211210211836683](https://tva1.sinaimg.cn/large/008i3skNly1gx91vk30atj325q0de40b.jpg)

- Plug-in management, actively install plug-ins for service components that can expand the operation and maintenance capabilities

![image-20211210211905872](https://tva1.sinaimg.cn/large/008i3skNly1gx91w2ev0uj325e0humz9.jpg)

- Enter the web terminal and directly operate the container shell environment of the current service component

![image-20211210211623350](https://tva1.sinaimg.cn/large/008i3skNly1gx91t8ue5aj327q0a6wgl.jpg)

Conventional enterprise application management operations are basically UI interfaces, and the process does not need to learn the underlying technology. You can get started by exploring the interface.

### Automate complex operation and maintenance processes

Enterprise applications are indeed much more complicated than mobile APPs, but we also hope that the managers of enterprise applications are less concerned about management, so it is necessary to provide automated operation and maintenance capabilities.

Rainbond is designed as a platform with powerful automated operation and maintenance capabilities.These automated operation and maintenance capabilities can liberate the hands of enterprise application managers to the greatest extent and effectively improve productivity.These automated operation and maintenance capabilities are extracted from the long-term operation and maintenance work experience of many engineers. These capabilities are often manifested in the bottom layer of enterprise IT systems. They are not obvious in normal times, but they are related to the quality of enterprise application operation.

1. Automation of routinely managed processes

   The conventional management of enterprise applications is quite complicated. In order to simplify the front-end operation, the back-end implementation process must be automated. like：

   - The installation process is automated. The installation process needs to automate the steps of software package installation, service configuration, port management, and service startup for each service.
   - The upgrade process is automated. The upgrade process needs to automate the steps of comparing version differences, differential installation, and rolling upgrades.
   - The startup process is automated. When an enterprise application has multiple sub-services, it also needs to automatically handle its service startup sequence.

2. Health Check and Failure Recovery

   Enterprise application managers do not want to be on duty in the computer room all the time in order to deal with enterprise application failures that do not know when they will occur.Therefore, Rainbond provides health detection capabilities to replace enterprise application managers and always pay attention to the health status of enterprise applications.And provide optional exception handling methods, which are automatically handled when exceptions occur.

   The Rainbond platform supports two modes of probes to automatically detect the health of all instances in a service component.The TCP mode probe will detect whether the specified port of the service component can be connected at regular intervals. This detection is realized based on the connectivity of the network and the port.The HTTP mode probe, on the other hand, requests the specified URL at regular intervals, and judges the health status of the instance according to the HTTP return code.Relatively speaking, TCP probes are more widely used, while HTTP probes are more precise.Because there may be such a software design flaw, the WEB SERVER is in normal working state and the port can be monitored normally, but the business interface has been unable to provide the correct return, which is also an error that should be detected for the end user.

   For processing after detection failure, the platform provides two strategies, offline and restart.

   Take the problem instance offline from the load balancer, which is a degraded behavior.After the offline is triggered, no new requests will arrive at the problem instance, and the problem instance is relieved from the huge access pressure.Next, if the service component is robust enough, it will recover after processing a large backlog of requests, and go online after re-passing the health check.There is a hidden assumption here, which requires the service component to have multi-instance characteristics, otherwise the offline of the problem instance will cause the service component as a whole to fail to provide services.

   Rebooting is a relatively arbitrary approach.But it is undeniable that restarting the instance is the easiest and most effective recovery method when the service component is not so robust.

   ![008i3skNly1gxb0mqzbd6j30yt0u0q4i](https://tva1.sinaimg.cn/large/008i3skNly1gxb0mqzbd6j30yt0u0q4i.jpg)

3. High availability

   Rainbond provides high availability support for enterprise applications.In a Rainbond cluster, there are often multiple server nodes with different identities, and there are more than one server node with each different identities.This means that Rainbond itself is highly available, and enterprise applications running on it can also freely drift between different host nodes.

   When a server in the Rainbond cluster fails, the Rainbond cluster will not be affected by it, and the enterprise applications affected by the server failure will be rescheduled to other normal servers.Enterprise application managers only need to repair the faulty server afterwards, and the entire Rainbond cluster will complete self-healing, and the impact of enterprise applications in this process is negligible, especially when the enterprise application itself scales the state of multiple instances It can achieve a processing experience that the end user does not feel.

4. Auto-scaling capability

   If the end user of an enterprise application is a human, then its access pressure will have tidal characteristics.For example, an OA system for internal personnel of an enterprise, the traffic during working days is much higher than that on rest days, and the traffic during working hours is much higher than that during off-duty hours.So can this OA system automatically adjust the number of instances according to the size of the traffic.Start a sufficient number of instances when it is busy to resist access pressure, and automatically reduce the number of instances when it is idle, leaving resources for other enterprise applications.The Rainbond platform can give enterprise applications the ability to automatically scale.

   The Rainbond platform knows the current state of every enterprise application it hosts.Of course, it is also necessary to know whether the resource usage of the current enterprise application is close to the allocated upper limit.Through the automatic scaling setting, you can set an upper limit for enterprise applications. When Rainbond finds that the resources used by the enterprise application have exceeded this set value, it will automatically expand the number of instances.This setting value can be memory usage/rate or CPU usage/rate, or a combined setting of the two resources.

   ![image-20211210220826994](https://tva1.sinaimg.cn/large/008i3skNly1gx93bexre6j325w0dqjs8.jpg)

### The management process can be observed and visualized, making it controllable and manageable

Mobile users don't think about observing what's going on inside the app, but enterprise application managers don't.Observability is the premise of all management work. Only by seeing it can it be felt.

The observability provided by Rainbond is everywhere, starting from the cluster dimension, to the application level, and finally to the level of each service component, which reflects rich observability.

For an enterprise application, seeing its internal topology and the operating status of all components is the most basic observability requirement.Rainbond provides an application topology diagram interface, and reflects the running status of each service component according to different colors.Green means running, black means stopped, and red means service components are in an abnormal state.

![topology.drawio](https://tva1.sinaimg.cn/large/008i3skNly1gx93p4xko6j31g90kmwfo.jpg)

For individual service components, the granularity of observability is more granular.The overview page of the service component describes the detailed information of the current service component, and each instance of the service component also reflects its own running status.

![image-20211210222909066](https://tva1.sinaimg.cn/large/008i3skNly1gx93wybyl5j326c0m4myy.jpg)

The operation records below describe in detail everything that has happened to the service component.

![image-20211210223104722](https://tva1.sinaimg.cn/large/008i3skNly1gx93yydzuwj326a0o641h.jpg)

The monitoring page of the service component centrally reflects various visual charts about its running status.

- Real-time analytics curves reflecting business performance

![image-20211210223516990](https://tva1.sinaimg.cn/large/008i3skNly1gx943c5ye9j31t60e0755.jpg)

- Top 5 Minute Requests That Help Optimizer

![image-20211210223622015](https://tva1.sinaimg.cn/large/008i3skNly1gx944ggi4pj31so0fadh1.jpg)

- Resource usage curve for each instance

![image-20211210223953109](https://tva1.sinaimg.cn/large/008i3skNly1gx9484y8m6j31440kc0u6.jpg)

- Support self-drawing of Exporter indicators based on Prometheus system

![image-20211210224351717](https://tva1.sinaimg.cn/large/008i3skNly1gx94ceivmpj31ge0qin0g.jpg)

Rainbond's monitoring large-screen system provides the center of global observability.

![image-20211210224803749](https://tva1.sinaimg.cn/large/008i3skNly1gx94gmtpo4j31jy0u0qbq.jpg)

### write at the end

Rainbond provides a new idea to solve the management problem of enterprise applications. It not only optimizes the management and user experience, but also efficiently manages application suppliers. The application store also allows managers to control applications independently and reduce their dependence on suppliers.
