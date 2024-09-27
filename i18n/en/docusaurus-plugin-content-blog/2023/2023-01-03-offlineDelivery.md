---
title: Practice | Practice of cloud native technologies in offline delivery scenes
description: Software products can be valuable only if they are delivered to the user, and I have several years of experience in the area of software delivery for the ToG scene, for example the Government.With this article today, share these pain points and my solution
slug: offlinedelivery
image: https://static.goodrain.com/wechat/cn-offline/2.jpeg
---

Software products can be valuable only if they are delivered to the user, and I have several years of experience in the area of software delivery for the ToG scene, for example the Government.This article is used to share these pain points and my solutions today.

## Ask a question

The main client group of the company in which I am serving is the provincial government department, and the business system developed is a mobile APP serving on the government intranet.As the head of delivery, I have been troubled by how to deliver to my clients a service business system developed under the Spring Cloud framework.Completion of the delivery of software systems was only the first step in the long mark, and how to deal with later stages of delivery was a problem that had to be faced.The peculiarities of the government scene have added many disadvantages to my work, and these ToG scenes have been painfully delivered and I have listened to them.

**Offline Environment**

Isolated from the public network and isolated from the corporate network, the full offline scenario is the hallmark of government delivery and the greatest pain point for ToG delivery.Believing that offline environmental delivery is a scenario that all delivery engineers do not want to face, which means that all deliveries must be prepared in advance, and that, in the event of any omissions and errors during the delivery, it means that tomorrow must come to the site again.

**The environment for delivery is not unified**

If you have been engaged in delivery for the Government, most of you have experienced a lack of uniformity in the delivery environment.Owing to the different steps in IT construction at all levels of government and the same set of business systems, hardware facilities available to the municipal sector may be a physical server, while several virtual machines provided by the private cloud may be available to the provincial departments.Fortunately, the difference between the physical and the virtual machine is not significant.In recent years, however, government IT construction has been moving in the direction of national ownership, and when provincial authorities demand the use of the impugned aperture for CPU, or the delivery of the national unicorn system, there is already a great difference in the environment of delivery in the municipal sector.I have even had to treat the delivery of the same business system at two levels as entirely different items.This reflects the differences between the different delivery environments, and when I turn to the corporate development environment, the differences between the environment and the delivery environment are beginning to make me hear my own voices on the ground.It is difficult for me to determine whether pre-prepared resources will be delivered in advance and whether there will be dependency conflicts due to differences in operating systems and hardware facilities when deployed in the environment of the AI.This problem is magnified in an offline environment, and I do not even have the capability to connect the public to install software packages to address dependency conflicts.

**Lack of automatic sustainability**

Delivery of the software to the client environment is only the primary goal, and maintaining the stable operation of the software system over the duration of the contract is a higher test of delivery quality.On the basis of personal experience, the deployment workload in a software delivery project is less than half the workload associated with later shipments.We do not want all software issues to be resolved by engineers in person, without guaranteeing time commitments in the SLA service agreement, and secondly with the engineers’ enthusiasm for work.It is particularly important to build an automated operating software environment in an offline environment.The reliance on automated delivery capabilities has led to self-healing of some software failures, which has somehow reduced the difficulty of transportation in government delivery scenarios.But choosing any technology to achieve the goal of automated delivery is costly, which means that I need to assemble a stable and reliable automated delivery platform in my delivery environment before the software system deliveries.

**Overdependence on core personnel**

In the offline government delivery scenario, the following problems are often faced with：where the delivery environment is difficult to uniform, where special features are known only to a few engineers who are involved throughout the life of the project, and where practical experience tells us that these are often the source of anomalies and where the off-line work environment makes it a luxury for engineers to solve problems by searching information and in turn increases the technical requirements for engineers' experience and skills and makes it difficult for “qualified” resident engineers.The above problems have created a situation in which some of the freight forwarding tasks are overdependent on some core technical staff, which will have a significant impact on current business continuity once core technical staff are separated or transferred.All of these personal dependencies were struck by my brains when an engineer in the field who wanted to make another claim to resign to me.

**Continuing delivery difficulties**

Software delivery is not a one-time exercise.From the point of view of project management, it is difficult for users to present specific and achievable needs at the outset, and the scope of specific projects will be determined as the project progresses, a gradual and detailed process.This gradual breakdown in the delivery of software products is reflected in the multiple iterations of the product delivered, each of which is upgraded closer to the final demand of the user.This ongoing delivery process, in an offline environment, is no less difficult than the first delivery, and may even be more complex in some scenarios that need to be rolled back.In the microservice age, a complete business system often contains dozens of separate components, and the number of components adds complexity to ongoing delivery.

**Stand development difficulty**

Placement development is a demand that is common in the context of government delivery.Standard software products are often not directly responsive to the needs of the Party, which requires that our developers can customize the specified components directly in the office of the party and quickly update to the online environment for verification by the side.In the actual scenario, most of the microservices functions are fixed and only expert jar kits require frequent replacements.

## Previous experience

I have experienced a complete process of change in the delivery of corporate software products.From the initial jar packet delivery to the introduction of containerized technology delivery mirrors, to the use of Kubernetes packaging techniques, we have always been engaged in the delivery of software products around complex offline environments.Each stage has addressed the above pain points more or less and the costs have varied.Eventually, we embraced cloud-origin technologies and put the business system as a new target in practice a simpler and reliable off-line environment delivery, taking into account previous pains.

### Jar Package Delivery

Super Java development language, we can package code into a binary delivery product that depends only on JDK operating environments.Our software products are also at an early stage and the operational system consists of 10 Jar packages, Mysql databases, Redis caching, and Nginx on the front end.

In a single delivery, first build up the basic operating environment and complete the JDK installation.Mysql, Redis and other middleware rely on very primitive rpm packages for installation, a process that often encounters problems of package dependency problems.Finally run all Jar packs without a series of manual jobs before starting up.

This mode of delivery is more primitive, and we will write some scripts to achieve some degree of automation, but this will only partially improve the efficiency of the deployment, with a minimal capacity of zero.The installation of intermediate components has a high degree of binding on operating systems, which can lead to a conflict of dependency and failure of installation once the server operating systems and a slight bias we know in advance.The configuration process is too heavy for manual dependence, which is particularly pronounced in highly deployable environments where various IP configurations can easily be misplaced.

To sum up, we have achieved offline delivery for simple business systems at this stage, but we have not resolved any other ToG scenario delivery pains.

### Import Containment Technologies

To smooth out the complexity of the delivery environment, we have begun to introduce containment technology, and by institutionalizing all component containers, we simply need to ensure that the client servers are able to run the Docker container, and there is no need to worry about the problem of the bottom operating system.Official docker binary files for static compilation. We no longer have to deal with software dependency.In this phase, our business systems have also begun to expand, and the number of components has risen to dozens of places, which has forced us to introduce docker-compose and docker-swarm technologies at the same time to solve the problem of organizing components under single machines or high-availability scenarios.These technologies also provide a lower degree of self-healing capacity and distance from real production.

Containment technologies address the lack of uniformity in the delivery environment, but there are limited increases in pain in other areas.As business functions expand, a new pain point gradually emerges, we need to deliver with dozens of container mirrors, and the complexity of delivery is held hostage to the number of deliveries.

### Redirect Kubernetes

After delivery teams have acquired containment technology, we have started a transition to Kubernetes in order to address the auto-transport dimension.Kubernetes technology is capable of enabling the delivery and delivery of business systems, through which our business systems have achieved a high degree of automaticity.

Kubernetes technologies have improved their capabilities in the areas of self-healing, elasticity and elasticity, and business systems have truly become productive.But it also brings with it new pain that it itself is too complex and that it must be managed with sufficient knowledge on the part of both developers and on-site delivery providers.In other words, the introduction of such technologies has significantly increased reliance on core technical staff and has even raised the threshold for entry into the technical team.The up-front construction of the delivery environment has increased significantly in the offline delivery scenario, and we have to prepare a reliable Kubernetes cluster in advance in an offline environment, which has greatly hampered the diffusion of Kubernetes technology in delivery teams.

### New pain point

After several previous phases, I believe that there is no problem in continuing to move forward in the direction of container technology and Kubernetes packaging technology in the face of the complex delivery scene of offline lining. Each technical selection has somehow resolved many pain points. We have already done so without fear of an offline environment, a non-uniform delivery environment, a lack of automated delivery capacity, but have also introduced new issues that need to be addressed.

- Business extension will simultaneously increase delivery complexity.In essence, this new pain is due to the fact that we view each component independently, rather than to the entire business system.The result is a direct link between the volume and complexity of deliveries, which would greatly reduce the complexity of delivery if the business system were to be delivered as a whole rather than by individual components.
- New complexity has been introduced in each of the new types of selection, which is particularly pronounced when turning into Kubernetes technology.The capability of the technology to empower the operational system is beyond question, but the technical capabilities of the delivery team members are on a straight rise, regardless of the first deployment in a new environment and the difficulty of delivery in a later period.To make it less difficult for new members of the delivery team, we have started selecting graphical tools that can reduce the difficulty used by Kubernetes, and ease of use is the primary influence of the selection.
- The continuing difficulties in delivery and the development of the site are still not well addressed.Both require that we provide mechanisms to address the continuing change in the delivery environment of the business system, which focuses on iterative upgrading of the corporate framework of the business system and rapid iterations of a particular component.

We have begun to look at the area of cloud-origin technology that has gradually become fired.First, cloud technology is based on packaging and Kubernetes technology, and we already have a technical base.Second, cloud-origin technologies also focus on best practices in the area of software delivery, some of which are very congruous in the past.After a period of internal test selection, we ended with the use of the Rainbond Native Application Management Platform as a delivery tool to achieve a completely new and complex offline delivery mode for the scene.

## Cloud Offline Delivery Practice

In the beginning, a member within the delivery team learned occasionally from open source sources about Rainbond of the product and was recommended for use by development team personnel.Use only as a graphical Kubernetes management tool to lower the threshold for newcomers to learn KubernetesBut with knowledge of the product, we are gradually finding that Rainbond is really being used to solve the problem of the delivery of software products.

### Abstract business system as application

In the past, we have always treated each component of the business system separately, but in the Rainbond system, the managed module can be scaled to the business system level, which is referred to as the application.Application internal component deployment and layout are graphically based and understandable to use.Call relationships between components are based on topography and are clear.Most importantly, based on the application of this abstraction, we have achieved the decoupling of the number and complexity of components, which we always regard as an application regardless of how many components are in the application.The benefits of doing so are very evident in the delivery process.

![](https://static.goodrain.com/wechat/cn-offline/1.jpeg)

### Application template offline export import

Once the app is deployed, it can be published as an application template and exported. The exported product is a separately managed package.The offline template package is completely undependent on external networks when imported. The import can be installed in an offline environment by one click and restored to post as it is.Interdependencies between components, configuration information is saved without reconfiguration at the delivery site.This capability completely changed the logic of delivery from the delivery of dozens of individual containers to the delivery of a package covering the entire business system, in which the difficulty of falling could be imagined.

### Easy to use

Rainbond base provides a full automated delivery capability based on Kubernetes technology for the movement of containers.and convert the common configuration from the Yaml declaratory configuration into a graphical interface that significantly reduces the threshold for entry.After introducing the Rainbond system, new entrants can use Rainbond within one day after a simple training and can independently deliver the business system.

### Native Cloud Management

Rainbond supports cloud management capabilities for Kubernetes.While government delivery scenes are isolated from the public network, there are often promising internal networks within the same system.The cloud management capacity of Rainbond was managed in a unified manner through the delivery scenarios of several urban government departments in the province and the establishment of a unified management control desk in the provincial capitals.This deployment model provides a mechanism for the rapid delivery of operational systems in multiple data centres and significantly reduces the cost of delivery across the operational system across the province.

![](https://static.goodrain.com/wechat/cn-offline/2.jpeg)

### Sustained delivery mechanisms

Rainbond application templates support version management. When the business system has significant changes, it will only need to republish the app as a whole, re-import it into the delivery environment and upgrade or roll back a single key, greatly increasing the efficiency of business system upgrading.In the past, the up-downgrading and configuration of dozens of container mirrors, the cost of the time required was calculated on a daily basis, after introducing the version control mechanism of the Rainbond application template, the time cost of the elevation downgraded was reduced to a minute, and the operating costs were negligible.

![](https://static.goodrain.com/wechat/cn-offline/3.jpeg)

### Split development fast

When Party A requires a component to make some modifications, it is clear that offline import using a template of the whole application level is not lost.At this point, only the field developer is required to pack the Jar package on the personal development notebook, quickly build the specified component by uploading the Jar package building capacity and replace the corresponding component after simple spelling.The developers need only provide Jar packages, even if they do not need to learn packaging techniques to understand the mechanisms used to pack mirrors, and Rainbond will automatically handle the follow-up work.

![](https://static.goodrain.com/wechat/cn-offline/4.jpeg)

## Summary

With the use of cloud-origin technology, my Division delivery team has significantly reduced the cost of delivering complex offline scenarios for Governments.These cost savings are reflected in reduced delivery times, lower technical requirements for personnel, lower operating costs for personnel, fewer deliveries and fewer staffing workloads.Cost-reduction has been accompanied by the successful empowerment of the business system, which has been able to handle many anomalies automatically.Easy site development to respond quickly to the needs of clients on the one hand, and to improve client satisfaction.

However, the evolution of IT engineering is constantly oriented towards new pain points.The current use of cloud-origin technologies is not a solution to all problems, and in the context of government delivery scenarios, where the tougher requirements have been imposed by side A to prohibit the use of container technology for delivery.This requirement prevents the fall of the cloud delivery technology from its roots, but the elegant retreat to the Jar package delivery route is a question of how communities are expected to support the transformation of the application template into a delivery that is available in the nudity environment.
