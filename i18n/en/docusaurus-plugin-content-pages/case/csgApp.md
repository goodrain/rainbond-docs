---
title: The library app implements cloud native DevOps practice based on Rainbond
description: The library is a cloud-based private library that focuses on users' self-growth. It integrates the functions of reading, recommending, borrowing, purchasing, storing and knowledge management of e-books. It is committed to the cognitive empowerment of users. achieve self-growth.At present, the cumulative number of registered users has reached 1500W, and the platform book resources have exceeded 200W.
---

# The library app implements cloud native DevOps practice based on Rainbond

:::info
We don't need engineers who are proficient in Kubernetes, we need a management tool that can be used by novices. -- Guo Chuanhao
:::

Hello everyone, my name is Guo Chuanhao, the head of operation and maintenance of Xiamen Zhengguan Yizhi Technology Co., Ltd.

The library is a cloud-based private library that focuses on users' self-growth. It integrates the functions of reading, recommending, borrowing, purchasing, storing and knowledge management of e-books. It is committed to the cognitive empowerment of users. achieve self-growth.At present, the cumulative number of registered users has reached 1500W, and the platform book resources have exceeded 200W.

We have been using Rainbond for 2 years and I am sharing our experience with you.

## previous predicament

Libraries in the cloud-native era have a high starting point. From the very beginning, we have selected technical systems that conform to the trend of the times, such as microservice architecture, Kubernetes, and containerization.However, the functions provided by the native kubernetes management platform do not fully meet our expectations, and we cannot afford the huge technical cost of secondary development.

Before learning about Rainbond, in the early days of our business, we were stuck with the trivialities of frequent product iterative changes.The trivia I am talking about includes the version management of 50 services under the microservice architecture, the replacement of build products, the release of the online environment, and all kinds of tedious work around the application from development to launch to operation and maintenance.

We hope that we can get out of these trivial matters, focus on the business itself, and explore a simple path suitable for continuous development and continuous delivery in the kubernetes environment.

In view of this, we began to actively look for an open source and easy-to-use application management platform.

## Getting to know Rainbond

Before Rainbond, we have tried products such as Rancher, but the product features are far from our expectations.

We first learned about Rainbond through Github 2 years ago, and were pleasantly surprised that the functionality was well suited to the needs of the library.Name a few impressive abilities：

1. The overall topology of the application architecture

   From the perspective of God, the running status and dependencies of all service components can be observed at a glance.Obsessive-compulsive disorder forces our engineers to eliminate the red anomaly, and the green that reflects the operational state is really reassuring.

2. Visual resource usage

   Resource occupancy is an important indicator of observability.For start-ups, it is important to understand whether the allocation of resources is reasonable and to prevent waste of resources.Rainbond provides good observability in every dimension from teams to service components.The resource limit capability at the team level is very practical, solving the problem that the operation and maintenance team cannot effectively control resource allocation.

3. auto scaling

   The library is a typical 2C scenario. How to make good use of the elasticity provided by cloud computing and flexibly respond to traffic peaks?The answer is to use autoscaling.The automatic scaling function provided by Rainbond highlights the characteristics of simple and easy configuration.The automatic scaling capability has greatly liberated the work pressure of the operation and maintenance team, and has since been far away from mobilizing and waiting.The key business will automatically expand according to our intentions until it can handle all the traffic.

4. Centralized gateway policy management

   The release of services in the 2C scenario is a hurdle that cannot be bypassed no matter what.Whether it's blue-green release, grayscale release, or A/B testing, the eighteen martial arts related to this service release will be encountered to some extent.The native Kubernetes Ingress can indeed implement these release policies, but we prefer to get a productized centralized management page to deal with these problems, rather than trouble the operation and maintenance engineers to touch those strictly formatted Yaml files.Rainbond Gateway Policy Management perfectly fulfilled our needs.

5. Application Replication Rapid Build Environment

   In the development process of the library, we often need to build various environments to distinguish development, testing, and pre-release scenarios, corresponding to different versions of microservice components, such as Dev, Prod, and the like.But if you have to manually create the service component every time you build the environment, it's really inefficient.The application copy function is very useful in this scenario, it helps me to quickly copy a set of environments.Self-selecting the version of the build source during the copying process, for me, is the Tag of the mirror.The copied new environment retains all service component meta-information and dependencies.

In the step-by-step exploration process, the interaction with the official team in the community has saved us a lot of detours.An open source product can be very reassuring if it is accompanied by a living community.

## Development and test environment deployment

### The first step is to deploy microservices

Getting started with Rainbond starts with deploying a single microservice. This process is very simple and does not require learning Yaml of Kubernetes.The components in the development environment are built based on the image, and you only need to fill in the image address and related information according to the guidance of the interface.

We use the Spring Cloud microservice framework, which can run well under the Rainbond system. I have been affected by a series of documents during the deployment process, and I will share with you here:

- [Advantages of Spring Cloud Microservice Deployment in Rainbond](https://www.rainbond.com/docs/practices/app-dev/spring-cloud-advantage/)

- [Integration of Spring Cloud Microservices and Service Mesh](https://www.rainbond.com/docs/practices/app-dev/spring-cloud-merge/)

- [The case of Spring Cloud microservices deployed in Rainbond](https://www.rainbond.com/docs/practices/app-dev/spring-cloud-case/)

### The second step is to orchestrate services in a visual way

In the process of arranging microservices, the function of graphically editing component dependencies really surprised me.This arrangement is very different from the way other platforms organize based on complex Yaml files.Interested friends can read the descriptions related to[Service Orchestration](https://www.rainbond.com/docs/get-start/create-dependency/), which is indeed a microservice orchestration method that novices can control.

![](https://static.goodrain.com/wechat/jianbo/1.png)

### The third step is to connect to external services

For a startup like us, hosting the database and other services to a cloud service provider and using the RDS service directly is an economical and robust option.In the Rainbond system, I manage the RDS services in the cloud by adding third-party components.This inclusion allows third-party services to be relied upon by other microservice components as if they were deployed in the platform.

So far, my development environment has been deployed.

### The fourth step is to copy the test environment, pre-release environment and production environment

In the past development process, setting up the environment was a very cumbersome thing.For a product in the process of rapid iteration, we need at least a development environment, a test environment, a production environment, and in our own actual scenario, a pre-release environment is also introduced.For the code, I only need to fork multiple branches to distinguish different environments.By defining pipelines, we have also completed different tags for packaging images of different code branches.But when it comes to building the environment, is it only possible to manually create components a little bit according to different image tags?Thinking of the nearly 50 microservice components of the library business, and the dependencies between them, my head is big, and the most unbearable thing for IT practitioners is duplication of work.

In the process of exploring how to use Rainbond, this function quickly caught my eye.The quick copy function can check out the build source information of all components. For a component built from source code, the build source is its code repository address, programming language, and code branch; for a component built from an image, the build source corresponds to the mirror address and tag. .Under such an interface, I can select the component that needs to be copied and modify its tag version.Such replication capabilities can realize the replication of environments under different clusters and different teams.The new environment inherits all the set：dependencies, component names, environment variable configuration, persistence settings, etc. in the original environment except the image tag.

Using this ability, based on the development environment, I copied the test environment, the pre-release environment and the production environment by modifying the tag like a Fork code.

![](https://static.goodrain.com/wechat/jianbo/2.png)

This capability greatly saves the time and cost of deploying various environments when we use Rainbond.At present, we also use this function to build the development environment for newcomers. In the past, it was very laborious and laborious to teach newcomers how to build their own development environment.

## Collusion with Continuous Delivery Processes

Earlier, we have customized a complete pipeline with the help of Jenkins to realize the construction of all microservice components.The final build product will be customized as an image and pushed to the image repository.We are quite satisfied with this part of the work, and we hope that Rainbond can be integrated after the image repository to complete the continuous construction and deployment of microservice components.

Rainbond is very open in this part, providing interfaces to interface with third-party CI tools.We only need to add a simple call to the interface provided by Rainbond after the Jenkins pipeline completes the image push, and the corresponding microservice component will automatically pull the latest image and complete the online operation.So far, the entire technical team has adapted to this usage.

![](https://static.goodrain.com/wechat/jianbo/3.png)

In fact, this is a very common interface calling method, no matter which third-party CI tool is connected to, it can be easily called.

Every microservice component running on Rainbond can have automatic build settings turned on at the build source.There are three implementations of automatic build settings：

1. Based on Git-Webhook, for microservice components built based on source code, you can use the Webhook capability of the code repository to achieve the effect of triggering the automatic construction and launch of the service component as soon as the code is pushed.The supported code repository types are relatively wide, and code repositories such as GItlab, Github, Gitee, and Gitea are supported.
2. Based on the image repository Webhook, for the microservice components built based on the image, the Webhook capability of the image repository can be used to realize the effect that the service component will be automatically built and launched as soon as the image is pushed.Mirror repositories such as Harbor and Dockerhub all support the Webhook function.
3. Custom API, which is the most common interface calling method, users only need to call based on the Http protocol to trigger the automatic construction and launch of the service component.

![](https://static.goodrain.com/wechat/jianbo/4.png)

The easiest way to trigger the automatic build API in the image above is to execute a command：on the command line

```bash
curl -d '{"secret_key":"6GvowlHX"}' -H "Content-type: application/json" -X POST https://<Rainbond控制台地址>/console/custom/deploy/c4e7b60bd800986df940d8103f22d271
```

At present, we have been able to accurately trigger the specified pipeline in a very simple way to complete the update and launch of the corresponding microservice components.

## Other issues solved with Rainbond

With the deepening of our understanding of the Rainbond product, we began to throw away some trivial matters. Some problems that are difficult to avoid in the traditional deployment mode can be well solved with the help of：'s capabilities.

1. Internal dependency configuration cannot be queried

   In the traditional deployment mode, all dependencies between components are a series of configurations written in configuration files.It is difficult for engineers who do not have enough knowledge of the product as a whole to grasp the reference addresses of all dependencies. Mistakes such as writing wrong IPs and leading to inoperable calls often occur.With the display of the application topology map, now every novice engineer will immediately have an intuitive understanding of the overall structure of the product after seeing the topology map.

2. Troubleshooting after multi-instance deployment exceptions

   In the traditional deployment mode, if each microservice component needs to be deployed with multiple instances, engineers need to manually operate the server to upload the jar package for configuration.If you encounter upgrade adjustments, there will be occasional mistakes.Once there is a problem that needs to be checked, how to locate the correct instance is already very troublesome.In the Rainbond environment, the multi-instance version consistency of each microservice component does not need to be concerned, and when troubleshooting, real-time log push and web console are very helpful.

3. Server resources cannot be shared

   In the traditional deployment mode, we avoid wasting computing resources by dividing virtual machines, but this is not enough.We want computing resources to be fully pooled and divided for each microservice component.This can be achieved by all application management platforms based on Kubernetes.And Rainbond's scaling settings are the best and easiest to use in production I've ever seen.After the Rainbond platform went online, server resources were reduced by two-thirds.

4. The same listening port cannot be deployed on the same stage

   Ports are actually an important resource. Under the same operating system, the occupancy of ports cannot conflict.This problem is especially prominent when deploying large-scale microservice components.Rainbond does this very well, each microservice does not directly occupy the server port, and our developers can define component monitoring more freely.

5. Developer Rights Management

   In real business scenarios, the problems of the software system are not all handled by the operation and maintenance personnel. In more cases, the developers themselves need to investigate and deal with them.Permission management requires that developers do not have permission to log in to the production server as much as possible.This leads to a dilemma, quick solution or strict control of permissions?This is a point where developers and operators are prone to conflict.After the introduction of Rainbond, this problem has been solved very well. All operations of developers are carried out in the Rainbond management interface. Even if you need to troubleshoot problems through the command line, you can log in to the container environment through the web console instead of the host server. .At present, we have formed a model for application developers to develop their own microservice components based on Rainbond operation and maintenance.

6. App version rollback

   In traditional mode, how complex the deployment of microservice components is, the more complex it is to roll back to the previous version.Rainbond is a very thoughtful product that provides one-click rollback at the service component level. Managers can freely select the required version from the version list and perform one-click rollback, which is really convenient.

## write at the end

As with any other product, getting deep into Rainbond requires a bit of a break-in process.One situation that impressed me was the Glusterfs distributed file system used by Rainbond, after a long period of use, the storage capacity was used up, causing a series of problems.Our ops lacked understanding of Glusterfs, and even less understanding of how Rainbond interacts with Glusterfs.In desperation, we asked the official for help. Unexpectedly, the official engineer supported us to solve the problem very enthusiastically, and left the operation document intimately.

My biggest impression of Rainbond is its ease of use.Hopefully the Rainbond team can follow through on this and provide more practical features that can solve real problems.We learned that Rainbond's Service Mesh can support istio in the next step, and we plan to try it in the next stage.
