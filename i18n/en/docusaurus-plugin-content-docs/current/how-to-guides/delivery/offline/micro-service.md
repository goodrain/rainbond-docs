---
title: Microservices architecture delivered offline
description: Rainbond enables offline delivery of microservice applications in an offline environment
keywords:
  - Offline delivery
  - toB offline delivery
  - toB offline delivery
---

## Offline Pain

In traditional industries such as government, energy, military labour, public security, industry, transport and so forth, in order to prevent data leakage and operational safety, the network generally adopts an internal and external network isolation strategy to guard against unnecessary risks. After all, in terms of safety and security, network physical isolation is the most effective means of cybersecurity defense, while network isolation in software delivery presents a range of delivery challenges and substantial additional cost inputs for external software developers.e.g.：

**Environmental network restrictions, affecting delivery efficiencies**

The lack of easy access to information in the delivery process, network restrictions can affect the use of collaborative tools, some client environments even without mobile phones, the more complex the environment will become; after delivery, applications will need to be sustained and ensure stability and continuity of functionality, and in cases where networks are inaccessible, any problems will require on-site support and even a permanent presence of personnel.

**Differences in client infrastructure that require adaptation**

The installation environment varies from client to client in privatization scenarios, some using physical servers, some using virtual machines, and different virtual machine manufacturers.Operating systems also differ, such as the common operating systems of CentOS/Debian/Ubuntu/Redhat and the current multi-country production operating systems.CPU structures may also be different, with X86, ARM, etc.; therefore delivery of applications requires a heavy matching process, either in the company or on the customer site.Due to the high environmental variations, complete testing and validation of the application is required and significant human and time investment is required;

**Technical threshold for delivery**

Delivery personnel need to understand bottom hardware and networks, operating systems and system performance, governance, high availability, safety, performance analysis, backup recovery, delivery development, etc.

## Advances in delivery technology

The delivery technology has three development phases,：\`Traditional Application Delivery - >Cloud Native Technology Application Delivery - >Future-Oriented Cloud Native Application Model Delivery'.The transition from the delivery pattern of traditional software packages to the cloud-origin technology delivery phase, represented by Docker and Kubernetes.

In the future, it must be an application-centred delivery model, with complex techniques in the application abstraction and packaging at the bottom of the bottom that will fully decouple the application model with the underlying infrastructure, automatic conversion and matching depending on the interface and delivery infrastructure, a real development that will be deployed automatically.

<details>
<summary>traditional app delivery</summary>

- **Binary executable：** java Jar,Linux executable, windows' exe, etc.
- **Package：** CentS uses RPM packages, Debian uses DEB packages, Java Web uses WAR packages.

Installation requires the installation of the dependent environment and underlying software, the YUM and DEB have their own management dependencies, but the offline environment cannot be used and if the customer's operating systems are different, additional solutions need to be found and the operation of such services needs to be managed in a systemd or supervisory manner in order to solve problems of startup and automatic restart.If the application of the monolithic architecture still works well, but if it is a complex micro-service structure, it will be difficult for traditional applications to deliver.

Managing these operating environments and operating system differences is a painful point in the delivery of traditional applications, and the emergence of containers has resolved this problem.

</details>

<details>
<summary>2. Cloud native technology app delivery</summary>

Cloud native apps use mainly the container and Kubernetes related technology.

### Docker Mirror Delivery

Docker packs the business together with the dependent library into a Docker mirror, which contains all environments and applications, so that you can get a pack and use everywhere, and we can run the image on any operating system that supports the Docker.The Docker character did solve many development, delivery, and many other problems, so the Docker Container concept was rapidly popular.

In the microservice architecture scenario, multiple services or applications are required to deliver together, services are dependent, and complex configurations, which Docker-Compose solves.

### Docker-Composer App Delivery

Docker-compose will be managed using YAML for multiple services or apps. Deployment and management can be installed using docker-compose. For an application of a microservice architecture, a docker-compose command can be installed and run one click on any operating system, provided that Docker and docker-compose are installed.

For a single airfield docker-compose, docker-compose is not appropriate when applications require high-availability or nodal distribution deployments, and the emergence of Kubernetes solves the high availability and distribution of containers.

### Kubernetes YAML app delivery

Deploy in Kubernetes we need to define the type of resources such as the Employment Statefulset Service, use Kubernetes to automatically deploy to multiple nodes by adjusting copies. We just export these YAML resources and Images to deploy and deliver them to customers in their Kubernetes environment.This mode of delivery requires Kubernetes or Kubernetes to be installed in the customer environment.

When we delivered Kubernetes YAML to a large number of customers, we needed parameters configuration, version management and simple installation and upgrading. Helm resolved this problem on the basis of Kubernetes YAML.

### Helm App Delivery

Helm is a package manager of Kubernetes resources that defines a set of resources as Helm Chart templates, provides installation and upgrades based on Helm Chart modules, which can configure different parameters when installed.Helm is also a tool chosen by most people in Kubernetes delivery.

The biggest problem for Helm is the need for developers to learn the container and the entire technological stack for Kubernetes and the need for Kubernetes to have a high threshold for learning and use.The abstract application model is a solution.

</details>

<details>
<summary>3. Delivery of the cloud native application model for the future</summary>

The application model emphasizes an application-centred concept, allowing developers to focus on business per se, application of abstraction and complex techniques at the bottom of the packaging, full decoupling of the underlying infrastructure, automatic conversion and matching based on the infrastructure of interface and delivery, real development and automatic deployment everywhere.

### OAM-based KubeVela app delivery

OAM(Open Application Model) is a standard norm that describes the application.With this norm, the description of the application can be completely separate from the details of the infrastructure deployment and management applications.By separating the application definition from cluster capacity, the app developers can be more focused on the application itself, rather than on the “details of such dimensions where the application is deployed.KubeVela has implemented cross-cloud-to-environment delivery based on OAM.Application delivery support for offline scenes is currently weak in KubeVela.

### RAM-based Rainbod app delivery

Rainbond is a cloud application multi-cloud management platform, Rainbond follows an application-based nuclear philosophy, unifies encapsulation containers, Kubernetes and other complex technologies, unifies Kubernetes resources into RAM (Rainbond Application Model) application models, allows users to use Kubernetes very simply, reduces the threshold used by users and focuses on application development, application delivery and application viability.

For offline delivery scenario, Rainbod can export three offline delivery packages： based on RAM

- **Rainbod application template package** containing all elements of complex micro-service framework delivery, supporting upgrades and rollbacks, but requiring customer environments to install Kubernetes and Rainbond;
- **Non-container-based packages** are packaged according to the traditional application delivery method, but are more user-friendly and include environmental dependencies and static compilations for most operating systems, using Systemd management;
- **Docker-Compose** supports launch and management on the standard Docker Compose Environment;

</details>

## Use Rainbond to achieve offline delivery of the micro-service architecture

Using Rainbond delivery processes as shown in the graph below, when different micro-service architecture applications are developed in the environment, there is no problem with the full testing test functionality.This means you can apply the template in one click to the local Marketplace for version 1.0.Then you can export the full Rainbond application template package.It contains all the elements of delivery of the complex micro-service architecture.

The app template package will then be imported in the client environment. You can complete delivery by installing one button.Version 1.1 can also be published after the development environment has been modified when there is a problem with the customer environment.Repeating the above processes, users can complete the one click upgrade of the application.Follow up to implement the entire app rollback based on the application template.

![offline-delivery](https://static.goodrain.com/docs/5.11/delivery/offline/offline-delivery.png)

## Action step

### Preparatory work

1. Having a cluster of ammunition Rainbond that simulates the development environment and the delivery environment (developing environment as online and delivering as offline).

2. Development environment installation, reference[快速安装](/docs/quick-start/quick-install), delivery for environmental installation, reference[离线安装](/docs/installation/offline/).

3. There are already functioning apps in the development environment, reference[快速入门](/docs/quick-start/getting-started).

### Make Application Template

1. On the left side of the Apps Popup page, go to the template settings page by selecting `Post->Publish to the component library`.各个参数详细说明参考[附录1: 模版设置页面参数说明](../app-model-parameters.md)

2. Create an app template that selects the release range to the enterprise and sets the release version, click `Sub` and will then synchronize the image of all components to the local mirror repository.Once syncing is finished, click `Confirm Posting`.Then you can see the published app template in \`Platform Manager-> App Marketplace -> Local Component Library'.

:::caution
Note：Only company administrators can see platform management buttons.
:::

### Export Application Template

1. `Platform manage->Marketplace->Local Component Library', selects `Export App Template`. You can select the version to export and the type of package to export.Here we choose `Apply Model Norms`, click `Export\`.This package will contain complete shipping features for continued delivery and upgrading.

2. After the export is completed, download the app template to local and save it to mobile storage devices such as UDs/CD-ROMs and take it to offline delivery environments.

### Delivery app in offline environment

1. In an offline environment where Rainbond has been deployed, we open the `Platform Manager -> App Marketplace`, choose `Offline Import` and upload the just downloaded app template.After uploading, click `confirm import`.

2. Once the import is completed, you will automatically jump back to the \`App Marketplace'.Once you have imported the completed application template, you can deploy the business system by clicking on the installation, which is fully compatible with the development environment and thus completes the software delivery in the offline environment.

