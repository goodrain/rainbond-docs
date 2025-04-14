---
title: Differences with other technologies
description: This chapter describes the key differences and commonalities between Rainbond and other products/technologies.
---

## Rainbond vs. Helm

### 1. Positioning differences

Helm is positioned as a package management tool on Kubernetes, mainly as a template for Kubernetes Yaml files.There is no reasonable control mechanism for the state of the entire application.Rainbond is positioned as an application management platform, without the need to understand Kubernetes and various resources.It can achieve application-level lifecycle management (build, start, stop, delete, and application status display).

### 2. Usage differences

1. After Helm installs the application, there is no clear status feedback mechanism.Users cannot directly understand the deployment status of the entire application and the running status of the application.Rainbond visually displays the dependency relationships and running status of all components under the application through a topology diagram.At the same time, it can visually manage the lifecycle of each component under the application.

2. Helm's version management of applications is directly and completely covered, without a reasonable grayscale strategy.Rainbond can selectively perform grayscale releases through application models and plugin capabilities.If necessary, it can quickly roll back.When creating Helm application templates, users need to understand the writing of Helm Chart in detail.Rainbond achieves the accumulation and reuse of application capabilities through one-click publishing on the interface.

## Rainbond vs. KubeSphere

### 1. Positioning differences

KubeSphere is mainly positioned as a container hybrid cloud for cloud-native applications, focusing on plug-and-play plugin-style ecological expansion capabilities.Rainbond is positioned as an easy-to-use cloud-native multi-cloud application management platform.It focuses on the full lifecycle management of applications and the application delivery issues in the <b>2B</b> industry.

### 2. Usage differences

1. When deploying business components based on the graphical interface, KubeSphere requires filling in fields that are usually "translations" of yaml declarative configuration files. For users not familiar enough with Kubernetes, there is still a certain threshold to use smoothly.Rainbond does not directly use yaml files. All types of resources of the application are defined from the developer's perspective. When deploying business, there is no need to understand Kubernetes-related knowledge. Users only need to fill in the source code address and focus on the business.It is very friendly to users who are not familiar with Kubernetes.

2. Both have proposed the concept of application templates. Application templates mainly package and abstract the entire application, including all operational definitions required for the application to run, isolating it from underlying technologies and concepts.Ultimately, it achieves the experience of users deploying applications with one click.KubeSphere's application templates are mainly based on standard Helm application templates, with good support for Helm templates. Developers can upload their own Helm Charts as application templates.Rainbond's application templates are based on RAM (Rainbond Application Model).Developers can directly publish running applications to the application store with one click, what you see is what you get, and the installed application is consistent with the original application.There is no need to understand the specific implementation of RAM, nor to learn the writing of Helm Chart.You can create your own application templates and achieve offline delivery, multi-cloud delivery, private delivery, etc.

3. In terms of microservice architecture, KubeSphere has productized Istio, greatly reducing the user experience of Istio, but this does not mean that users can completely discard the concept of Istio. The topology inside the application is reflected by prior configuration.Rainbond's self-developed microservice framework is more user-friendly, achieving a drag-and-drop microservice assembly mode.However, in the case where Istio, Linkerd, and other Service Mesh microservice frameworks dominate the world, standardization is still lacking.Currently, Rainbond also provides integration methods to accept Istio governance models, but it has not yet been verified by a large number of users.

## Rainbond vs. Rancher

### 1. Positioning differences

Rancher is a full-stack Kubernetes container management platform that can help operation and maintenance personnel quickly deploy and run clusters and manage the containers on them.Rainbond, on the other hand, is packaged and abstracted at the cloud-native application level, providing an application management console for development, testing, and application operation and maintenance, for the full lifecycle management and operation and maintenance of applications.And on top of the application, it implements scenario-based application delivery processes (software development delivery processes, enterprise IT management processes, enterprise application market ecosystems).For system operation and maintenance, it provides the command-line tool grctl.

### 2. Usage differences

1. Rancher's biggest advantage is its complete compatibility with the K<b>8</b>s system, paying more attention to the integration with k<b>8</b>s infrastructure, providing a more native application deployment method, and at the same time, the cloud-native domain toolset that can be integrated at various levels is already very rich. Although the learning cost is high, it provides a one-stop solution, which is more friendly to operation and maintenance.Rainbond, on the other hand, provides higher usability for developers.It allows developers to quickly experience cloud-native without learning Kubernetes and container-related technologies and concepts.In addition, the integrated development environment, module orchestration, application market and other functions provided by Rainbond can greatly improve the efficiency of custom development and application delivery.It can reduce delivery costs and difficulties through the delivery of application templates.

2. Rancher focuses on helping DevOps teams face the challenges of operation and maintenance and security in multi-cluster situations, excelling in multi-cluster deployment, cluster monitoring, container security, etc.Rainbond, in use, does not provide the function of directly operating clusters and nodes.It is mainly based on "application" multi-cloud management, supporting the rapid deployment of applications in multiple clusters.Therefore, Rancher and Rainbond do not conflict. Downward, connecting to infrastructure, managing the security and compliance of clusters is what Rancher is best at. Upward, providing developers with an easy-to-use cloud-native platform experience is left to Rainbond.
