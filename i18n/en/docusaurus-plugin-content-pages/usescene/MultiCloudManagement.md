---
title: Application-level multi-cloud management
description: At present, cloud computing has various forms of public cloud, private cloud, edge cloud, virtual machine, etc. How to efficiently manage multi-cloud is the current problem. In the cloud-native era, how to use cloud-native technology to achieve multi-cloud management?This article will cover "application-level" multi-cloud management with Rainbond.
keywords:
- multi-cloud
- cloud-native
---

# Application-level multi-cloud management

:::info At present, cloud computing has various forms of public cloud, private cloud, edge cloud, virtual machine, etc. How to efficiently manage multiple clouds is the current problem. In the cloud-native era, how to use cloud-native technology to achieve multi-cloud management ?This article will explain "application-level" multi-cloud management with [Rainbond](https://www.rainbond.com). 
:::

<!--truncate-->

### Cloudy Pain Points

- **monitoring and operation and maintenance management of multi：cloud environments1：**

  The use of multi-cloud by enterprises increases the complexity of unified operation and maintenance management. For single-cloud architecture, management tools provided by cloud service providers can be used, but for multi-cloud architecture, how to use a unified platform for operation and maintenance management, thereby improving IT service delivery efficiency and increasing Resource utilization and reducing operation and maintenance costs have become issues worthy of attention.

- **Application management in a multi-：environment0**

  In a stand-alone environment, application deployment and management are relatively simple. For a multi-cloud distributed environment, application deployment, operation and maintenance, and standardized management have become difficult. At the same time, traditional applications, applications based on microservice architecture, and the recent rapid development of Serverless Applications, different types of applications also increase the difficulty of one-stop application management.

- **Core business migration and deployment in a multi-：environment0**

  After using multi-cloud, cross-cloud migration of data cannot be avoided. When data is migrated between heterogeneous clouds and data centers, how to ensure data consistency and low latency has become a new challenge.

### Rainbond, a multi-cloud application management platform

In addition to resource management, in fact, application management is closer to the needs of enterprises. There are many types of applications, including traditional applications such as Mysql, Tomcat, Nginx, applications based on microservice architecture, and serverless applications. .

Enterprises need a one-stop management platform that can manage various computing resources and various applications— **Rainbond came into**.

[Rainbond](https://www.rainbond.com?channel=aliyun)is an "application-centric" multi-cloud application management platform, providing container multi-cloud and hybrid cloud solutions, providing you with unified management of multi-cluster across clouds, and unified deployment and management of applications in a multi-cloud environment.Any running application developed based on Rainbond can be delivered to any application management platform based on Rainbond for use, that is, based on Rainbond, any application can be deployed to any cloud at any scale. For developers, it is only necessary to build Once, run anywhere.

### Rainbond vs CMP

![image-20211205122115319](https://s2.loli.net/2021/12/05/xRXM3eucaFWTs64.png)

The above picture briefly depicts the comparison between Rainbond and traditional CMP. It can be seen intuitively that Rainbond focuses on the application level, and CMP focuses on the underlying computing resources.

CMP is a multi-cloud management based on "resources", which can realize unified management of all resources under multi-cloud.For example,：can activate a virtual machine of a cloud vendor in CMP, including order management.However, CMP is relatively weak in application management, and cannot perform unified operation, maintenance and management of applications on multiple clouds.

Rainbond is "application-level" multi-cloud management. Through a unified application model, applications can transparently run and migrate across multiple clouds.For example,：applications are developed and tested on physical servers, and can be deployed to various public clouds or customers' private clouds without any changes.

### Four typical scenarios of multi-cloud application management

Achieving multi-cloud in [Rainbond](https://www.rainbond.com?channel=aliyun)There are currently four typical scenarios as follows：

- **：of development and production environments**

  In the CI/CD scenario, some users want the development environment and test environment to be deployed on a local private cloud cluster for security reasons, and the production environment to be deployed on the public cloud.Through Rainbond, the cluster of development environment, test environment and production environment can be managed in a unified manner, and the container development pipeline can be used to complete the streamlined operation of business online and improve the efficiency of enterprise code delivery and deployment.

- **Unified management of：-cloud applications0**

  Connect and manage multiple clouds through Rainbond, manage all applications under multiple clouds in a unified manner, view business status through topology diagrams, manage the full life cycle of applications, and improve the efficiency of application operation and maintenance.

- **Multi-cloud application delivery through the application：**

  In industry cloud or ISV scenarios, applications need to be delivered to various customer scenarios. In Rainbond's application market, applications can be stored in the application market in the form of templates, delivered to the customer environment with one click, and upgraded as needed. .

- **：-cloud application backup and migration0**

  Backup and migrate applications from one cloud to another with Rainbond.

### Implementation

**1. Connect to multiple clouds through Rainbond**

First you need to have [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install?channel=aliyun) available.

After completing the installation of the Rainbond console, enter the Rainbond console **Enterprise view** >> **Cluster** >> **Add cluster**, install [Rainbond cluster terminal](https://www.rainbond.com/docs/user-operations/deploy?channel=aliyun) on the server of the public cloud or private cloud, you can add and connect multiple cluster.

Effect diagram after multi-cluster connection: point_down:

<img src="https://pic.imgdb.cn/item/61a5d0802ab3f51d91d5afc2.png" alt="image-20211118142459214" />

**2. Unified management of multi-cloud applications**

When Rainbond is connected to multiple clusters, multiple teams can be created and managed on Rainbond, and resources are allocated to each team in multiple clusters, and the entire application lifecycle can be managed in the team space.

Multi-cloud application management reference document：

- [team management](https://www.rainbond.com/docs/get-start/team-management-and-multi-tenancy?channel=aliyun)
- [Team management of complex organizational structures](https://mp.weixin.qq.com/s/Dt6FjAyRvJHQhm9p4--ceQ)
- [App build](https://www.rainbond.com/docs/component-create/creation-process?channel=aliyun)
- [Service operation and maintenance](https://www.rainbond.com/docs/user-manual/component-op?channel=aliyun)
- [Application operation and maintenance](https://www.rainbond.com/docs/user-manual/app-manage?channel=aliyun)

**3. Separation of development environment and production environment**

**Testing/development on cloud A and production on cloud B** is the most common environment separation.Typically testing/development is done on the cloud and production is done locally.But sometimes it can be the other way around, as you might need the multi region capabilities the**or advanced features like CDNs to speed**the production environment3.

**for example：**In the private cloud environment, deploy the development environment, and quickly replicate the test and production environments.Fast replication supports cross-team and cross-cluster.

<img src="https://i.loli.net/2021/11/11/aGVgxeTIq1Uyrcu.png" alt="image-20211111174506912" />

For the specific operation process, please refer to document：

- [Multi-cloud application replication](https://www.rainbond.com/docs/user-manual/component-dev/app_copy?channel=aliyun)
- [One-click online and rollback](https://www.rainbond.com/docs/practices/app-dev/update-rollback?channel=aliyun)

**4. Realize multi-cloud application delivery through the application market：**

Users can publish the deployed business to the internal application store with one click through the Rainbond application publishing function, and can use the application template to manage the version of the application and introduce the application details.One-click deployment in multi-cloud environments is also possible by applying templates.
<img src="https://pic.imgdb.cn/item/61a5d0942ab3f51d91d5bf1c.png" alt="image-20211118144714895" />

![image-20211205122143246](https://s2.loli.net/2021/12/05/so8LfOTVtPb5EiD.png)

For the specific operation process, please refer to document：

- [App release](https://www.rainbond.com/docs/user-manual/app-manage/share-app?channel=aliyun)
- [application template](https://www.rainbond.com/docs/enterprise-manager/enterprise/appcenter/application-template?channel=aliyun)
- [Create an application template](https://www.rainbond.com/docs/get-start/release-to-market?channel=aliyun)
- [Multi-cloud delivery based on application market](https://www.rainbond.com/docs/enterprise-manager/enterprise/appcenter/add-app?channel=aliyun)

**5. Multi-cloud application backup and migration**

Rainbond currently provides two[backup](https://www.rainbond.com/docs/user-manual/app-manage/app-backup?channel=aliyun)methods, namely local backup and cloud backup：

- Local backup：After the backup, the application can be migrated across teams, and the application can be completely migrated to other teams

- Cloud backup：supports docking with `Alibaba Cloud OSS` and `standard S3`After backup, applications can be migrated across clusters, and can be restored anywhere with a Rainbond platform, enabling rapid application migration.

Enter **application view** >> **backup** >> **new backup**, backup operations are divided into `local backup` and `cloud backup` , automatic backup will be performed after selection.

After the backup is completed, when the cloud environment is unavailable, the environment can be quickly restored from the backup in another cloud environment.
