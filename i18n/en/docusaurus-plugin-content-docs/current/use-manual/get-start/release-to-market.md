---
title: 5. Make reusable application templates
description: Publish components, applications, and solutions into reusable application templates
---

### Purpose

Learn how to publish the business system deployed by the user to the **application market** provided by Rainbond through the document to become a reusable **application template**.

The significance of this is that after the user's own business system is released as a solution,：

- Other users within the enterprise can quickly replicate this solution by installing app templates from the App Store.

- **Application template** supports **online delivery** and **offline export/import**, software delivery can be done in these two ways.

### significance

Through practical operation and learning how to make reusable application templates by yourself, the application market finally provides enterprises with the ability to replicate.

### Preconditions

- Done [Deploy a service component from source](/docs/use-manual/get-start/create-app-from-source/) Get **Java demo example**.

- Complete [Deploy an application from the application market](/docs/use-manual/get-start/create-app-from-market/) Obtain **Mysql5.7 (stand-alone version)**.

- Complete [Build Dependencies](/docs/use-manual/get-start/create-dependency/) for a complete solution example.

Next, let's publish the application composed of **Java demo examples** + **Mysql5.7 (stand-alone version)** (the business level can be regarded as a complete solution) as an application template.

### Publish application template

- 在应用拓扑图页面左边栏点击 **发布** 进入 **发布记录管理** 页面。

- Click **to publish to the app market** to enter the **application template and release version settings** page.

- Select or create **application template**, if created, you must define **application template name**,**share scope**(define the visible scope of this application template, only visible to the current team or enterprise).

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-1.png" title="应用模版及发布版本设置" width="100%" />

- Define **version number**, use a number such as 1.0 to define, and then judge whether the version is old or new according to the size of the version number.

- If necessary, fill in **version alias**(such as production version, pre-release version, etc.), **version description**(brief description).

- In **release component model configuration** , define the detailed settings of each component in the template, including **connection information**,**environment variables**,**scaling rules**.

- Click **to submit**to enter the application synchronization page.

### App sync

In this page, Rainbond will automatically synchronize the application, including the packaging and push of the image.The user only needs to wait for the synchronization to complete, and see the following situation, that is, the synchronization is completed.用户只需要静待同步完成，看到下面的情况，即同步完成。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-2.png" title="同步完成" width="100%" />

- Click **to confirm sharing**, and the release of **application template** is completed.

### Application template display

Once the application template is successfully published, it will appear on the page of the application market. According to the different selections of **and** when creating the application template, the visible scope of the application template is also different.

- When the release scope is selected as **and team** , we can only find the application template under the team tab that publishes the application template.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-3.png" title="应用市场团队分页" width="100%" />

- The application template can be found under the enterprise tab only when **enterprise** is selected for the release scope, otherwise it will not be visible.When the sample application template is released, the release scope is selected as **and**, so it cannot be displayed on the enterprise page.In the left column of the application topology map page, click **release** to enter the **release record management page**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-4.png" title="应用市场企业分页" width="100%" />

与可见范围相对应的，当前应用模版，只可以在 **发布时使用的团队** 中安装。Corresponding to the visible range, the current application template can only be installed in team used when \*\*is released.Only when the release scope is **, enterprise** , can the application template be installed and used in all teams under the current enterprise.

### Edit app template

The created application template can be edited.The edited entry is shown in the figure below：编辑的入口如下图所示：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-5.png" title="编辑应用模版" width="100%" />

Editable content includes：

- Name, the name of the application template.

- The release range can be modified to **to specify team** or **to current enterprise**.

- Category tags, adding tags can quickly categorize and filter application templates.

- Description, a brief introduction to the current application template.

- LOGO, you can upload an image as the logo of the application template.

- Whether it is release or not, a special tag indicating the development status of the current application template.

### Install the application template

This step is consistent with [deploying an application](/docs/use-manual/get-start/create-app-from-market/) from the application market, and the purpose is to verify whether the published sample application template can be installed successfully.

For specific operations, you can review the operations in [deploying an application](/docs/use-manual/get-start/create-app-from-market/) from the application market, which will not be repeated here.

The final effect is to replicate a new application based on the application market.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-8.png" title="复制出的应用" width="100%" />

### Next step

Next, we will explore how to upgrade the sample application template, and apply the upgraded content to the new application copied based on the application market.
