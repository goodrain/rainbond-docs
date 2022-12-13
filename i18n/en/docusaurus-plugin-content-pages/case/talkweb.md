---
title: Tuowei Information uses Rainbond's cloud native landing practice
description: I'm Ding Peng, a Golang engineer from the PAAS team of Tuowei Information Cornerstone Research Institute. Our team is mainly responsible for the selection, construction and development of cloud native application platforms, so as to shield the underlying infrastructure from the bottom and host our cloud platform from the top. Microservice application, convenient and efficient to help the cloud-native implementation of enterprise services.
---

# Tuowei Information uses Rainbond's cloud native landing practice

:::info 
I am Ding Peng, a Golang engineer from the PAAS team of Topway Information Cornerstone Research Institute, and I am also one of the TOC members of the Rainbond community.

Our team is mainly responsible for the selection, construction and development of cloud-native application platforms, so as to shield the underlying infrastructure from the bottom and host our micro-service applications from the top, so as to help the cloud-native implementation of services within the enterprise conveniently and efficiently. 
:::


## company profile

Topway Information is a leading provider of software and hardware integrated products and solutions in China.

Founded in 1996 and listed in 2008 (002261.SZ), with Hunan as its headquarters, it has branches in Beijing, Shanghai, Shenzhen and other places, with more than 4,000 employees.The business covers government and enterprise digitization, intelligent computing, and HarmonyOS ecology, covering 31 provincial-level administrative regions across the country and 10+ overseas countries, focusing on key areas and industries such as digital government, operators, examinations, transportation, manufacturing, and education, serving more than 1,500 households Enterprise customers, providing them with full-stack domestic digital solutions and one-stop full-life-cycle comprehensive services.

Tuowei Information is determined to become a continuously innovative technology enterprise, from operators to digital government, examination, manufacturing, transportation, education and other industries and fields, and continues to deepen the field of IT software.

## Before PAAS

Before using an easy-to-use PAAS product, the service deployment methods of our various teams were not：

-   Team A applies for a cloud server, builds `jenkins` and deploys the application directly to the server;
-   Team B applies for a cloud server, uses `kubeadm` to build a K8s cluster, development members compile images, and operation and maintenance members write application declaration files for deployment and maintenance;
-   Team C...

It can be seen that there are many problems in the current application operation and：management method.

1.   The confusion of cloud resource management, the trouble of cost statistics, and the low utilization rate of resources：
2.   Team application management is chaotic. There are multiple product libraries and various supporting management software：it is impossible to visualize the application life cycle management, monitoring problems, and log problems;
3.   O&M focus：Resource is the focus of operation and maintenance, which consumes human creativity. The focus should be shifted to the application itself, and more attention should be paid to business innovation;

![](https://static.goodrain.com/wechat/tuowei/1.png)

## PAAS requirements

![](https://static.goodrain.com/wechat/tuowei/2.png)

In order to solve the chaos of immediate resources and application management, we need a PAAS platform.The capabilities we expect from this PAAS platform are：

-   Easy to use：does not require developers, operation and maintenance personnel spend a lot of time and energy learning application management, cloud deployment and other knowledge to achieve rapid application delivery and continuous delivery;
-   Automation：can manage the entire life cycle of the application, from source code to accessible services, to logs, monitoring, etc. can be presented on the platform;
-   Visualization：The entire life cycle of the application can be managed, from basic application deployment, rolling update, stop, etc., to logging, monitoring, scalability and other capabilities, which can be visualized and easily managed on the platform;

## SelectionRainbond

In order to speed up the construction of the PAAS platform, we decided to stand on the shoulders of giants and screen several PAAS products from the community.Compare the pros and cons and choose the one that better suits our team's needs - in the end `Rainbond` stands out.

`Advantages of Rainbond`：

-   The application-centric design concept achieves real ease of use, shields the concept of infrastructure, and allows the development team to focus on the business itself;
-   Relatively complete automation capabilities, complete visual management capabilities, and log monitoring functions that basically meet the needs;
-   Intuitive microservice topology display, using service grid governance to achieve local access, reducing the configuration changes of PAAS on services (this is a surprise~);
-   The app store provides common software to help with one-click deployment.

In addition to this, Rainbond also has the ability to surprise us：

-   The ability to quickly replicate applications across clusters and teams makes it possible to deploy efficiently in multiple environments;
-   Complete cluster-side components, gateways, logs, and even product libraries (replaceable) enable Rainbond itself to fully provide application management capabilities;

-   Customize the initialization container and SideCar container capabilities, and provide additional capabilities for components in a pluggable way;

## Rainbond Practice

We use Rainbond build components to render：

1.   Visual component topology and component dependencies, and the resulting localized access between interdependent components

![](https://static.goodrain.com/wechat/tuowei/3.png)

2.   Full life cycle management of components, easy configuration of basic setting resources required by components

![](https://static.goodrain.com/wechat/tuowei/4.png)

3.   Efficient gateway configuration center, no longer need to log in to the cloud platform console frequently to configure load balancing

![](https://static.goodrain.com/wechat/tuowei/5.png)

Rainbond is easy enough that we don't need to describe how to use it to build and manage components.

Some of our experience in other areas.

### Single domain multi-routing service

When the default component opens the http port, it gets such an access url：

* a component：http://a.apps.example.com

* b component： http://a.apps.example.com

And the following is the url you expect：

* a component：http://apps.example.com/a

* b component：http://apps.example.com/b

Then you can use the PathRewrite function of the Rainbond network management：

![](https://static.goodrain.com/wechat/tuowei/6.png)

### custom plugin

Based on Rainbond's pluggable design, we can customize the plug-in service.

#### file management plugin

You may need to upload files to the component container. Thanks to the function of Rainbond custom development plug-in, you can implement file management plug-ins for components by developing plug-ins. You only need to install plug-ins with file management capabilities for your components. , and then create a shared storage of the target directory for the component, and then open the component port to realize the file management of the component container.Similar to the picture below

**Create a plugin**

![](https://static.goodrain.com/wechat/tuowei/7.png)

**Configure plugin environment variables**

![](https://static.goodrain.com/wechat/tuowei/8.png)

**Activate the plug-in**

![](https://static.goodrain.com/wechat/tuowei/9.png)

**Create shared storage**

![](https://static.goodrain.com/wechat/tuowei/10.png)

**Open http gateway**

![](https://static.goodrain.com/wechat/tuowei/11.png)

**Data middleware management plugin**

If data middleware such as MySQL and Redis are deployed, but there is no ready-made management software, or the tcp port cannot be opened at present, then you can develop a data middleware management plug-in based on the open source software `dbgate`.

I believe that everyone will draw inferences from one case, and no more examples.

## at last

Rainbond has been iterated to the V5 version. As an easy-to-use PAAS cloud-native application platform, its functions are becoming more and more complete. We also expect Rainbond to develop better and better.

Thanks to the community support of Rainbond, we have been using Rainbond relatively smoothly. Rainbond has indeed helped our team to smoothly transition to the cloud-native application management stage, reducing the energy spent on cloud resource management and focusing on the application itself. .

When encountering functional bugs or better practices during use, we also advocate the team to actively submit issues to the community, or troubleshoot and solve them. This is a point of the healthy cycle of open source.

