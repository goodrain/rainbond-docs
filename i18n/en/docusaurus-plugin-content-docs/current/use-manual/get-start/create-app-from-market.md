---
title: 3. Deploy a Mysql service
description: Build and deploy an application based on the application market with one click
---

### Purpose

Learn how to deploy applications with one click through Rainbond's unique application marketplace mechanism.

### significance

This is a very fast deployment method. Compared with deploying a single service component, this deployment method can quickly deploy a complete business system containing multiple service components.Various advanced scenarios based on Rainbond are based on the application market.Many advanced scenes based on Rainbond realisation are based on the application market.

### Preconditions

- Complete [team management and multi-tenancy](/docs/use-manual/get-start/team-management-and-multi-tenancy/).Finish creating the first team.Complete first team creation.

- The Rainbond cluster has been installed, or the Rainbond Cloud public cloud service has been connected.

- Complete the certification of **application market** - **cloud synchronization**.

### Create components based on app marketplaces

- Under the specified team page, click **to add**,**to create a component**based on the application market.

- Select the application template you want to install. In the example of the document, take **MYSQL-Percona branch stand-alone version v5.7.23** as an example.

- Click **to install**, select **version** and **apply**.

- **Confirm installation**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-1.png" title="从应用市场安装" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-2.png" title="从应用市场安装" width="100%" />

### The installation is complete

After a short period of waiting, the Mysql5.7 (stand-alone version) was installed.

At this point,**I already have two service components in my first application**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-3.png" title="从应用市场安装" width="100%" />

### Next step

Next, we will explore how to connect **Java demo examples**, **Mysql5.7 (stand-alone version)** to form a **application**, in Rainbond, we call it composed of one or more service components, which have The interconnected relationship of the entire business system is a **application**.
