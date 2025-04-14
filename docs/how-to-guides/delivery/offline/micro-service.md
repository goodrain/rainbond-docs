---
title: Microservice Architecture Offline Delivery
description: Offline delivery of microservice applications in offline environments based on Rainbond
keywords:
  - Offline Delivery
  - toB Offline Delivery
  - toB offline delivery
---

## The Pain Points of Offline Delivery

In traditional industries such as government, energy, military, public security, industry, and transportation, to prevent data leaks and ensure operational safety, networks generally adopt a strategy of isolating internal and external networks to avoid unnecessary risks. After all, in terms of security protection, network physical isolation is the most effective means of network security defense. However, network isolation brings a series of delivery challenges for external software development vendors during the software delivery process, also increasing a significant amount of cost investment.For example:

**Environmental network restrictions, affecting delivery efficiency**

During the delivery process, it's inconvenient to look up information, network restrictions affect the use of collaboration tools, and some customer environments even prohibit bringing mobile phones, which affects the efficiency of problem-solving. The more complex the environment, the greater the impact; after delivery, applications require continuous operation and maintenance to ensure operational stability and functional availability. In cases where the network cannot be connected, any problem requires on-site support, even necessitating long-term on-site personnel.

**Differences in customer infrastructure, requiring an adaptation process**

In privatization scenarios, the installation environments of different customers vary. Some use physical servers, others use virtual machines, and different virtual machine vendors also have differences.Operating systems also vary, such as common ones like CentOS/Debian/Ubuntu/Redhat, and currently, there are many domestic operating systems.CPU architectures may also differ, including X<b>86</b>, ARM, etc.; therefore, the delivered applications require a heavy adaptation process, either adapted within the company or on the customer's site.Due to significant environmental differences, after application delivery, complete testing and verification are needed, requiring a large amount of manpower and time investment;

**High technical threshold for delivery personnel**

Delivery personnel need to understand underlying hardware and networks, operating systems and system operation and maintenance, service governance, high availability, security, performance analysis, backup and recovery, delivery development, etc.

## The Development History of Delivery Technology

Delivery technology roughly has the following three development stages: `Traditional application delivery -> Cloud-native technology application delivery -> Future-oriented cloud-native application model delivery`.From the traditional software package delivery model, gradually transitioning to the cloud-native technology delivery stage represented by Docker and Kubernetes.

In the future, it will definitely be an application-centric delivery model, abstracting and packaging the underlying complex technology at the application level, completely decoupling the application model from the underlying infrastructure, automatically converting and adapting according to the different infrastructures connected and delivered, truly achieving develop once, deploy automatically everywhere.

<details>
<summary>1. Traditional Application Delivery</summary>

- **Binary executable files:** Java's Jar, Linux's executable files, Windows' exe, etc.
- **Software packages:** CentOS uses RPM packages, Debian uses DEB packages, Java Web uses WAR packages.

Installing them requires first installing the dependent environment and basic software. YUM and DEB have their own software sources for managing dependencies, but they cannot be used in offline environments. If the customer's operating system is different, additional solutions are needed. To solve the problem of startup and automatic restart for running such services, they also need to be managed through systemd or supervisor.If delivering a monolithic architecture application, the traditional application delivery method can still cope, but for complex microservice architectures, the traditional application delivery method will be difficult to handle.

In the traditional application delivery process, managing these runtime environments and operating system differences is a pain point, which the emergence of containers has solved.

</details>

<details>
<summary>2. Cloud-Native Technology Application Delivery</summary>

Cloud-native application delivery mainly uses container and Kubernetes related technologies.

### Docker Image Delivery

Docker packages the business and dependent libraries together into a Docker image, which includes all environments and applications, thus achieving build once, run anywhere. We can run this image on any operating system that supports Docker.Docker's features indeed solve many development, delivery, and other issues, so the concept of Docker containers quickly became popular.

In microservice architecture scenarios, multiple services or applications need to be delivered together, with dependencies between services and complex configurations. Docker-Compose solves this problem.

### Docker-Compose Application Delivery

docker-compose manages multiple services or applications using YAML, and can use the docker-compose command for installation, deployment, and management. For a microservice architecture application, the docker-compose command can achieve one-click installation and operation on any operating system, provided that Docker and docker-compose are installed.

docker-compose is suitable for single-machine scenarios. When applications require high availability or multi-node distributed deployment, docker-compose cannot cope. The emergence of Kubernetes solves the high availability and distributed scheduling problems of containers.

### Kubernetes YAML Application Delivery

In Kubernetes, deploying business requires defining Deployment, Statefulset, Service, and other resource types. By adjusting the replicas, Kubernetes automatically schedules to multiple nodes to achieve business high availability. During delivery, we only need to export these YAML resources and Images, deploy them in the customer's Kubernetes environment, and deliver them to the customer.This delivery method requires the customer's environment to have Kubernetes or to install Kubernetes in the customer's environment.

When we deliver Kubernetes YAML to many customers, we need parameter configuration, version management, and simple installation and upgrade. Helm solves the above problems based on Kubernetes YAML.

### Helm Application Delivery

Helm is the package manager for Kubernetes resources. It can define a set of resources as Helm Chart templates, providing installation and upgrade based on Helm Chart modules, and allowing configuration of different parameters during installation.Helm is also the tool chosen by most people in Kubernetes delivery.

The biggest problem with Helm is that developers need to learn the entire technology stack of containers and Kubernetes, and the customer's environment must have Kubernetes, making the learning and usage threshold too high.An abstract application model is a solution.

</details>

<details>
<summary>3. Future-Oriented Cloud-Native Application Model Delivery</summary>

The application model emphasizes the concept of application-centric, allowing developers to focus on the business itself, abstracting and packaging the underlying complex technology at the application level, completely decoupling the application model from the underlying infrastructure, automatically converting and adapting according to the different infrastructures connected and delivered, truly achieving develop once, deploy automatically everywhere.

### KubeVela Application Delivery Based on OAM

OAM (Open Application Model) is a standard specification for describing applications.With this specification, application descriptions can be completely separated from the details of infrastructure deployment and management.By separating application definitions from the operational capabilities of the cluster, application developers can focus more on the application itself, rather than operational details such as "where the application is deployed."KubeVela implements cross-cloud, cross-environment continuous delivery of applications based on OAM.Currently, KubeVela has weak support for application delivery in offline scenarios.

### Rainbond Application Delivery Based on RAM

Rainbond is a cloud-native application multi-cloud management platform. Rainbond adheres to the core concept of application-centric, uniformly encapsulating complex technologies such as containers and Kubernetes, abstracting Kubernetes resources into RAM (Rainbond Application Model), enabling users to use Kubernetes very simply, lowering the threshold for user usage, allowing users to focus on application development, application delivery, and application operation and maintenance.

For offline delivery scenarios, Rainbond can export three types of offline delivery packages based on RAM:

- **Rainbond Application Template Package**, which contains all elements for complex microservice architecture delivery, supports upgrade and rollback, but requires the customer environment to install Kubernetes and Rainbond;
- **Non-container software package**, non-container packages are packaged according to traditional application delivery methods, but with better usability. The package includes environmental dependencies and uses static compilation, suitable for most operating systems, managed by Systemd;
- **Docker-Compose offline package**, supports one-click startup and management in a standard Docker Compose environment;

</details>

## Using Rainbond to achieve offline delivery of microservice architecture

The delivery process using Rainbond is as shown in the figure below. After developing different microservice architecture applications in the development environment and completing full testing to verify that the functions are correct.You can then publish it to the local application market in the form of an application template with one click, forming version 1.0.Next, you can export the complete Rainbond application template package.It contains all elements for the delivery of complex microservice architectures.

Next, import this application template package in the customer environment with one click, and complete the delivery with one-click installation.When problems occur in the customer environment, you can also modify them in the development environment and release version 1.1.By repeating the above process, users can complete the one-click upgrade of the application.Subsequently, the entire application can also be rolled back based on this application template.

![offline-delivery](https://static.goodrain.com/docs/5.11/delivery/offline/offline-delivery.png)

## Operation steps

### Preparation work

1. Have two sets of Rainbond clusters to simulate the development environment and the delivery environment (the development environment is online, and the delivery environment is offline).

2. For development environment installation, refer to [Quick Installation](/docs/quick-start/quick-install), for delivery environment installation, refer to [Offline Installation](/docs/installation/offline/).

3. There are already normally running applications in the development environment, refer to [Getting Started](/docs/quick-start/getting-started).

### Create an application template

1. On the left side of the application topology page, select `Publish->Publish to Component Library` to enter the template settings page.For detailed descriptions of each parameter, refer to [Appendix 1: Template Settings Page Parameter Description](../app-model-parameters.md)

2. Create a new application template, you can choose to publish the scope as the enterprise, set the version to be published, click `Submit`, and then all component images will be synchronized and pushed to the local image repository.After synchronization is completed, click `Confirm Publish`, and the publishing is completed.Next, in `Platform Management->Application Market->Local Component Library`, you can see the published application template.

:::caution
Note: Only enterprise administrators can see the platform management button.
:::

### Export application template

1. In `Platform Management->Application Market->Local Component Library`, on the far right of the just published application template, select `Export Application Template`, you can choose the version to be exported and the type of package to export.Here we select `Application Model Specification`, click `Export`.This package will include the complete operational characteristics of the application for continuous delivery and upgrade.

2. After the export is completed, download the application template to the local, save it to mobile storage devices such as USB drives/CDs, and bring it to the offline delivery environment.

### Deliver applications in an offline environment

1. In the offline environment where Rainbond has been deployed, we first open `Platform Management->Application Market`, select `Offline Import`, and upload the just downloaded application template.After the upload is completed, click `Confirm Import`.

2. After the import is completed, it will automatically jump back to `Application Market`.After the imported application template is completed, click Install to deploy the business system with one click. The business running environment in this environment is completely consistent with the development environment, completing the software delivery in the offline environment.

