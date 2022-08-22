---
title: Differences from container platforms
description: This chapter describes the key differences and commonalities between the Rainbond project and other container management platforms.
---

<!-- <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/WechatIMG110.jpeg" title="产品定位图例说明" /> -->

### Positioning differences

Rainbond is packaged and abstracted at the cloud-native application level, and users do not need to learn about containers and k8s, nor do they need to understand the underlying infrastructure such as servers, networks, and storage.Managers can manage containers, k8s and related infrastructure at the resource level.And implement scenario-based application delivery process (software development delivery process, enterprise IT management process, enterprise application market ecology) on top of the application.

Other container platforms are mainly to simplify container management and expand the functions of containers, and conceptually embody containers and k8s. Users need to learn containers and K8s, and implement scenario-based solutions at the container granularity.

### cloud native

Rainbond's idea of cloud native practice is similar to[Heroku](https://www.heroku.com/), but it has expanded its extension in the field of To B delivery.

### scene difference

Rainbond has different management interfaces for different groups of people. It has an application management console for development, testing, and application operation and maintenance, a command-line tool and a resource management background for system operation and maintenance, and an application market for application delivery personnel and end users.

Other container platforms usually manage containers and infrastructure in a unified management interface, mainly for operation and maintenance.

### Difference with k8s

Kubernetes is a technical component at the bottom of Rainbond. You do not need to learn containers and k8s to use Rainbond. Rainbond is compatible with the standards of containers and K8s. Rainbond runs on k8s, and k8s is responsible for the operation and scheduling of all applications.

Reference [Technical Architecture](/docs/quick-start/architecture/)
