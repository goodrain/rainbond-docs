---
title: Enterprise application continuous delivery
description: Delivering enterprise applications well has always been the focus of ToB software vendors.Rainbond Application Model (RAM) is an application model proposed by Rainbond. By abstracting enterprise applications into models, combined with the application market mechanism of the Rainbond platform, one-click installation/upgrade is finally realized.
slug: EnterpriseDeliveryOne
#authors: QiZhang
images: /img/usescene/oneclickinstall.png
---

:::info
The delivery of enterprise applications has always been the focus of ToB software vendors.Rainbond Application Model (RAM) is an application model proposed by Rainbond. By abstracting enterprise applications into models, combined with the application market mechanism of the Rainbond platform, one-click installation/upgrade is finally realized.The highly automated delivery experience improves enterprise application delivery efficiency and reduces delivery costs.
:::

<!--truncate-->


## Automate delivery through application models

Enterprise applications refer to software systems that support various business operations of enterprises, institutions or government agencies.In addition to supporting collaboration within an organization, enterprise applications also support collaboration and coordination between enterprises and their suppliers, business partners, and users.

Each set of enterprise applications varies in complexity, but can often be subdivided into multiple components that work together.Taking a lightweight system as an example, it should be divided into at least two parts: the business system and the database.Large systems may contain dozens of components, and several components can also form modules.Some configurations also need to be defined between these components or modules to realize the association dependencies between each other.Such a complex scenario is indeed difficult for the implementation and delivery personnel of ToB software manufacturers.

The difficulty and cost of implementing, deploying and upgrading enterprise applications in the traditional mode are proportional to the complexity of the enterprise application itself.This is due to the fact that in the traditional mode, the implementation and delivery personnel more manually deploy service components and edit configuration files through manual methods.Processes that cannot be automated are inefficient and error-prone, compounded by the number and complexity of components in an enterprise application.

Enterprise application delivery in the cloud-native era relies on various containerized delivery platforms. By leveraging the advantages of containerization and platformization, problems such as environment consistency, automated operation and maintenance, and fault self-healing are solved.In the scenario of simplifying application delivery and upgrades, the capabilities of the chosen platform are important.

[Rainbond](https://www.rainbond.com)  is an open source cloud-native multi-cloud application management platform, which has both Kubernetes cluster automation management capabilities and one-click installation and upgrade capabilities for enterprise applications.Rainbond Application Model (RAM) is based on an application model proposed by Rainbond. By abstracting enterprise applications into models, combined with the application market mechanism of the Rainbond platform, one-click installation/upgrade is finally realized.The highly automated delivery experience improves enterprise application delivery efficiency and reduces delivery costs.

The abstraction of the RAM model includes all the service components and the associations between the components contained in the enterprise application.This high-level abstraction has nothing to do with how many service components are included in the enterprise application, and whether the relationship between the components is complex.The application template (the specific implementation of the RAM model in the application market field) can be released to the Rainbond-specific application market, and the released application template can be regarded as the installation package of the enterprise application, no matter how complicated the original architecture is and the number of internal components, it can be Complete one-click installation and upgrade.

The RAM model is working hard to evolve towards the Open Application Model (OAM) in order to accommodate the wider delivery domain.OAM is a newly proposed application model in the industry, which is designed to deliver more robust enterprise applications in complex environments in a simple manner.

---

## One-click installation of enterprise apps with Rainbond

Rainbond's application template is the specific implementation of the application model, and it is the carrier of one-click installation of enterprise applications. How to make an application template can refer to the following tutorial.

[Making an Application Template Tutorial](https://www.rainbond.com/docs/use-manual/get-start/release-to-market)

When the application template is made and published to the application market, it can be installed with one click of the application template. The one-click installation process can perfectly replicate the enterprise application from the development environment to the delivery environment.Component features, images, plugins, dependencies are all kept as they are.

![one-key-deploy-update-8.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-8.png)

As far as the actual operation is concerned, click Install on the right side of the application template, select the necessary information such as the team, cluster, application, version, etc., and confirm to start installing the target enterprise application.

itself can support all kinds of customer environments, whether it is a server or a virtual machine, whether it is online or offline, X86 or domestic CPU can be supported.

---

## Create an application template that can be installed with one click

The enterprise application carried by the application template can be quickly delivered and deployed with the one-click installation capability.However, whether the delivered enterprise application can automatically enter the usable state after the installation is completed has a great relationship with the production process of the application template.Next, let's introduce what kind of "self-cultivation" an application template that can be used with one-click installation should have.

**Environment variables define connection information**

The address that can be accessed is the key to the interrelated calls between components.Typically, accessible addresses are represented as `IP:Port` or domain names.However, IP changes are inevitable in delivery scenarios, which seriously affects the ability to use one-click installation.So don't write the connection address as a fixed value, but design it in a form that can be dynamically picked up and configured by means of environment variables.The Rainbond platform provides a very powerful connection information injection function, which is specially used to handle the access addresses between components.

**Automatic data initialization**

The persistent data of enterprise applications should be separated from program files.All data that needs to be persisted should have separate directories, which can be empty before the container is started.If there are multiple directories that need to be persisted, it is best for them to have the same parent directory.All database middleware and business persistent data need to support automatic initialization.There are many ways to initialize data, and developers can choose：according to the actual situation.

- Business code management data version (recommended)

The developer adds logic inside the enterprise application to complete the initialization of the database table structure.This is a very general method. The enterprise application automatically detects whether the specified table structure exists in the database that can be connected to at startup, and performs an initialization if it does not exist.The reason why this method is more popular is that developers can also use this method to upgrade the database table structure.Refer to [source code construction to achieve free upgrade and rollback of database table structure](https://mp.weixin.qq.com/s/mYUqd-kv61_T5gn-Nmq9Mw) to learn about a database version solution based on Liquibase combined with Rainbond source code construction capabilities.

- Capabilities provided by official mirrors

For various types of database middleware commonly found on the market, its official images have the ability to automatically initialize data.Including but not limited to common databases such as Mysql, Mongo, and Postgresql.

- Make initialization plugins for unstructured data

For more general scenarios, the platform supports the plugin mechanism to initialize data for the specified persistence directory of the service component, which uses external object storage to keep the data that needs to be initialized.For the usage of this plugin, refer to [General Data Initialization Plugin](https://www.rainbond.com/docs/practices/app-dev/data-initialization) for this best practice.

**Reasonable decoupling scheme**

In order to achieve the goal of one-click installation of enterprise applications, it is necessary to divide different modules that can be decoupled, and publish the modules in the form of application templates.The application template corresponding to each module should be able to be installed and run independently.According to the business needs of the end customer, the delivery implementers can deploy multiple application modules with one click on demand, and assemble them under the graphical interface, that is, the overall delivery of enterprise applications is completed.For enterprise application developers, a reasonable decoupling solution can achieve the effect of modular reuse and reduce the repetitive workload of developers.

In-depth understanding of how to reasonably divide modules：[Use Rainbond to package business modules to achieve business building block assembly](https://mp.weixin.qq.com/s/liHYLDmBgcHuhOfODlwJvQ)

---

## Use Rainbond to upgrade enterprise applications with one click

The application templates implemented by RAM have a version control mechanism, which means that you can quickly upgrade and roll back between different versions of the same application template.

For developers, the required changes on the source application side, whether they are built after code changes or newly added other components, will be superimposed on the new version of the application template during the next application template release process.It is important for developers to pay attention to the version number defined at the time of release, which Rainbond uses to determine whether to upgrade.

For delivery personnel, they only need to import application templates of different versions into the delivery environment, and Rainbond will automatically identify different versions of the same application template and perform a one-click upgrade operation.

![one-key-deploy-update-6.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-6.png)

In the application page that has been delivered and is running, Xiao A found the entry for the upgrade.Rainbond recognizes the latest version, and the upgrade operation is also triggered with one click, which is very easy to use.

![one-key-deploy-update-7.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-7.png)

---

## Implementation principle of one-key installation and one-key upgrade

Why can the application template implemented based on the RAM model be able to install complex applications with one click?First, you need to understand the internal structure of the application template.

The application template consists of two parts：the application metadata and the container image compressed package.

**application metadata**

Application metadata is responsible for describing the characteristics of the application and its internal components.In other words, application metadata is a description of the RAM model.These metadata are stored in the Rainbond database, and Rainbond picks up the metadata to know what kind of application needs to be installed.These metadata mainly include the following：

| Attributes                      | level       |
| ------------------------------- | ----------- |
| Application Name                | application |
| App version                     | application |
| Dependencies between components | application |
| Gateway Policy                  | components  |
| component name                  | components  |
| component mirroring             | components  |
| component environment variables | components  |
| Component plugin configuration  | components  |
| component storage               | components  |
| Component Port Configuration    | components  |
| Component deployment method     | components  |
| Component Health Check Policy   | components  |

**container image**

The source of the business container image. Once the application template is imported, the container image will be loaded into the container image repository referenced by Rainbond.When starting each component, Rainbond will pull the corresponding image according to the image address recorded in the metadata.

After parsing and inserting application metadata and importing container images, delivery personnel can install enterprise applications in the customer environment with one click.

![one-key-deploy-update-9.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-9.png)

After the enterprise application is installed with one click, Rainbond can guarantee to make it run.If you want to go a step further and ensure that the business logic inside the enterprise application also works properly, you need to pay attention to more automation improvements in the production process of the application template.

**upgrade**

The principle of one-click upgrade is similar to that of one-click installation. The process of one-click upgrade actually changes the version of the application metadata and container image respectively.

The upgrade of container images is easy to handle, just need to refer to different tags.For all components in an upgradable app, the following app metadata changes will be overwritten during the upgrade.

| Attributes                       | level       | rule                |
| -------------------------------- | ----------- | ------------------- |
| components                       | application | new, updated        |
| plugin                           | application | new                 |
| configuration group              | application | new                 |
| mirror                           | components  | renew               |
| start command                    | components  | renew               |
| environment variable             | components  | new                 |
| Component connection information | components  | new                 |
| port                             | components  | add, update         |
| storage                          | components  | new                 |
| configuration file               | components  | add, update         |
| Health Detection Probe           | components  | add, update, delete |
| monitoring chart                 | components  | new, updated        |
| Monitoring points                | components  | new, updated        |
| plugin                           | components  | new                 |
| component dependencies           | components  | add, delete         |
| store dependencies               | components  | add, delete         |

It is worth noting that the upgrade based on the application template only includes the upgrade of the application.In actual environments, changes to persistent data are often involved.The most common situation is that the table structure of the database used by the enterprise application needs to change with the upgrade of the application.The [source code construction introduced in the previous article realizes the free upgrade and rollback](https://mp.weixin.qq.com/s/mYUqd-kv61_T5gn-Nmq9Mw) scheme of the database table structure, which can handle the version control of this table structure.

---

## Enterprise application management and operation and maintenance

The installation and upgrade of enterprise applications are one-time, while the management and operation and maintenance are long-term.

After the enterprise application is delivered to the customer environment, the operation and maintenance personnel need to control the ability to manage the operating environment.Modern IT infrastructure is very complex, and it is not easy for operation and maintenance personnel to coordinate between different environments such as physical machines and virtual machines. Technical capabilities present challenges.If there is an easy-to-use platform to smooth out the differences between different infrastructures, it will greatly simplify the management of operation and maintenance personnel.

Learn about [cloud-native application management, and manage enterprise applications like](https://mp.weixin.qq.com/s/T6WwbQJKaVgwwWwLLkjH9g) mobile app1 .

## Summarize

This article focuses on the implementation process of enterprise application automation installation and upgrade. This process is very suitable for standardized delivery of enterprise products without functional customization. Connecting to the development environment can achieve continuous delivery for customers and improve delivery efficiency by more than 10 times. However, standardized delivery can only account for a small number of enterprise product delivery processes. How to provide delivery efficiency for personalized delivery scenarios that require functional customization?We will go into details in the next article.