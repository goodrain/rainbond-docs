---
title: toB Apply Privatization Delivery Development History and Comparison
description: Because of data privacy and network security concerns, most of the customers in the toB scenario need to be delivered with privatization applications, that is to be delivered to their customers. Such customers include government, finance, military labour, public security, large enterprises, specialised industries, etc. These privatization scenarios have many limitations, and improving the efficiency of privatization applications is a challenge.
slug: toBdelivery
image: https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/16690209369248.jpg
---

Because of data privacy and network security concerns, most of the clients of the toB scenario require privatization application delivery, that is, delivery to their clients, such as government, finance, military labour, public security, large enterprises, niche industries, etc. These privatization scenes are very restrictive, and how to improve the efficiency of privatization application delivery is a challenge. What technologies are available for privatization applications to delivery?What features do they all have?Privatization application development process.

## ToB App Private Delivery Difficulty Point

**Environmental network restrictions, affecting delivery efficiencies**

- Information cannot be easily accessible during delivery;
- In the course of delivery, the person who delivers is required to communicate with the development of the company, network restrictions affect the use of collaborative tools, some client environments are not even mobile and affect the efficiency of problem-solving and the greater the complexity of the environment;
- In an offline environment, installing packages does not have the means to download them directly, and we need to package installation or configuration files into offline packages and import them into the customer environment.Because of the complexity of the operations that can lead to a large number of mirrors, only handlers can be imported with hard drives to their clients, and more time will be spent on the import of offline packages.Even some environments can only be imported into the client environment, but the CD itself does not have too large a package and can only be written on multiple disks;

**Differences in client infrastructure that require adaptation**

- The installation environment varies from client to client in privatization scenarios, some using physical servers, some using virtual machines, and different virtual machine manufacturers.Operating systems also differ, such as the common operating systems of CentOS/Debian/Ubuntu/Redhat and the current multi-country production operating systems.The CPU structure may also be different, with X86, ARM, etc.;
- The resource preparation cycle is long and requires approval processes;
- Delivery of apps requires a heavy matching process, either in the company or on the customer's site;
- Due to the high environmental variations, complete testing and validation of the application is required and significant human and time investment is required;

**Technical threshold for delivery**

- Delivery personnel need to understand bottom hardware and networks;
- Delivery personnel need to understand operating systems and system performance, service governance, high availability, security, performance analysis, backup recovery, development and so on;
- Delivery personnel need a strong technical base to be able to independently identify problems in the delivery of the application;

**Custom delivery iterations are less efficient**

- In a customized delivery scenario, clients will be involved in the development process, clients will need to see post-impact feedback questions and continue iterating until they are satisfied and the products will need to be frequently upgraded during the process;
- If developers are customized to develop, upgrade process is complex, and communication is ineffective;
- If the developer is present at the customer, there is no good development tool and environment, there is inefficiency and high human input;

**Post-maintenance is more difficult**

- When the app is delivered, it will be necessary to guarantee the stability of the application's operation, the offline environment will not be viable, the warning will not be sent and the delivery will be difficult;
- The product has bugs, some expected changes or upgrades require a client field mission and the support costs are higher;

## Traditional app delivery

Traditional app delivery is a binary executable or package： for direct delivery

- **Binary executable：** java Jar,Linux executable, windows' exe, etc.
- **Package：** CentS uses RPM packages, Debian uses DEB packages, Java Web uses WAR packages.

Installation requires the installation of the dependent environment and underlying software, the YUM and DEB have their own management dependencies, but the offline environment cannot be used and if the customer's operating systems are different, additional solutions need to be found and the operation of such services needs to be managed in a systemd or supervisory manner in order to solve problems of startup and automatic restart.If the application of the monolithic architecture still works well, but if it is a complex micro-service structure, it will be difficult for traditional applications to deliver.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/1669019774014.jpg)

Managing these operating environments and operating system differences is a painful point in the delivery of traditional applications, and the emergence of containers has resolved this problem.

## Current cloud technology delivery

Cloud native apps deliver primary containers and kubernetes related technologies.

### Docker Mirror Delivery

Docker packs the business together with the dependent library into a Docker mirror, which contains all environments and applications, so that you can get a pack and use everywhere, and we can run the image on any operating system that supports the Docker.The Docker character did solve many development, delivery, and many other problems, so the Docker Container concept was rapidly popular.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/16690198147760.jpg)

In the microservice architecture scenario, multiple services or applications are required to deliver together, services are dependent, and complex configurations, which Docker-Compose solves.

### Docker-Composer App Delivery

Docker-compose will be managed using YAML for multiple services or apps. Deployment and management can be installed using docker-compose. For an application of a microservice architecture, a docker-compose command can be installed and run one click on any operating system, provided that Docker and docker-compose are installed.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/16690198426949.jpg)

For a single airfield docker-compose, docker-compose is not appropriate when applications require high-availability or nodal distribution deployments, and the emergence of Kubernetes solves the high availability and distribution of containers.

### Kubernetes YAML app delivery

Deploy in Kubernetes we need to define the type of resources such as the Employment Statefulset Service, use Kubernetes to automatically deploy to multiple nodes by adjusting copies. We just export these YAML resources and Images to deploy and deliver them to customers in their Kubernetes environment.This mode of delivery requires Kubernetes or Kubernetes to be installed in the customer environment.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/16690198756043.jpg)

When we delivered Kubernetes YAML to a large number of customers, we needed parameters configuration, version management and simple installation and upgrading. Helm resolved this problem on the basis of Kubernetes YAML.

### Helm App Delivery

Helm is a package manager of Kubernetes resources that defines a set of resources as Helm Chart templates, provides installation and upgrades based on Helm Chart modules, which can configure different parameters when installed.Helm is also a tool chosen by most people in Kubernetes delivery.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/166902090209027203.jpg)

The biggest problem for Helm is the need for developers to learn the container and the entire technological stack for Kubernetes and the need for Kubernetes to have a high threshold for learning and use.The abstract application model is a solution.

## Delivery of cloud native application models for the future

The application model emphasizes an application-centred concept, allowing developers to focus on business per se, application of abstraction and complex techniques at the bottom of the packaging, full decoupling of the underlying infrastructure, automatic conversion and matching based on the infrastructure of interface and delivery, real development and automatic deployment everywhere.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/11/ 16690209369248.jpg)

### OAM-based KubeVela app delivery

OAM(Open Application Model) is a standard norm that describes the application.With this norm, the description of the application can be completely separate from the details of the infrastructure deployment and management applications.By separating the application definition from cluster capacity, the app developers can be more focused on the application itself, rather than on the “details of such dimensions where the application is deployed.KubeVela has implemented cross-cloud-to-environment delivery based on OAM.Application delivery support for offline scenes is currently weak in KubeVela.

### RAM-based Rainbod app delivery

Rainbond is a cloud application multi-cloud management platform, Rainbond follows an application-based nuclear philosophy, unifies encapsulation containers, Kubernetes and other complex technologies, unifies Kubernetes resources into RAM (Rainbond Application Model) application models, allows users to use Kubernetes very simply, reduces the threshold used by users and focuses on application development, application delivery and application viability.

For offline delivery scenario, Rainbod can export three offline delivery packages： based on RAM

- **Rainbod application template package** containing all elements of complex micro-service framework delivery, supporting upgrades and rollbacks, but requiring customer environments to install Kubernetes and Rainbond;
- **Non-container-based packages** are packaged according to the traditional application delivery method, but are more user-friendly and include environmental dependencies and static compilations for most operating systems, using Systemd management;
- **Docker-Compose** supports launch and management on the standard Docker Compose Environment;

## Synthesis comparison

|                      | Threshold | Microservice support | Multi-Node Scheduler | Efficiency of offline iterations | Customer Environment Support |
| -------------------- | --------- | :------------------- | :------------------- | :------------------------------- | :--------------------------- |
| Traditional delivery | High      | Not supported        | Not supported        | Low                              | Server                       |
| Docker Image         | Mid       | Not supported        | Not supported        | High                             | Container/K8s                |
| Docker Compose       | Mid       | Support              | Not supported        | Mid                              | Container                    |
| K8s Yaml             | Mid       | Support              | Support              | Mid                              | K8s                          |
| Helm Chart           | Mid       | Support              | Support              | Mid                              | K8s                          |
| KubeVela             | Mid       | Support              | Support              | Mid                              | K8s                          |
| Rainbond             | Low       | Support              | Support              | High                             | K8s/Containers/Server        |

- **Application of delivery thresholds** with the highest traditional delivery threshold; medium threshold for Docker, Docker-Compose, Kubernetes Yaml, Helm and KubeVela delivery because of the need to learn about the container and the technology associated with Kubernetes; Rainbond is the simplest to use and does not need to learn the container and Kubernetes.
- **Microservice support** supports micro-service organization and package delivery, except for traditional app delivery and Docker images.
- **Multinode movement and automated wire** Kubernetes Yaml, Helm, KubeVela and Rainbord support multi-nodal movement in Kubernetes.
- **Offline iterations efficient** are the most efficient traditional delivery methods; Docker mirrors are available and an offline package can be exported from one command; Docker-Compose, Kubernetes Yaml, Helm and KubeVela require manual imaging offline packages, ineffectiveness of complex structures and ease of manual error; Rainbond supports automatization of an offline package that will import offline environments that can upgrade and roll back online, and iterate them very efficiently.
- **Customer Environment Support** that different customers have different operating environments and that delivery packages need to be based on client environment selection, that traditional application delivery methods are suitable for some of the old infrastructure, that operating systems are older and that no operating containers are installed. The client environment does not exist in Kubernetes or is not allowed to install Kubernetes, and that docker mirrors and Docker-Compose; and that Kubernetes Yaml, Helm, KubeVela and Rainbond support an environment with Kubernetes.
