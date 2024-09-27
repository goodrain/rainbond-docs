---
title: App release
description: Explain Rainbond application release function description
---

The application market defines a standard cloud-native application model that supports large-scale distributed digital business systems. It can contain 1-N service components. The model includes resources and configurations of each service component, plug-in resources and configurations, topology relationships, and deployment relationships. Wait.After careful production, you can publish and install with one click.精心制作完成即可一键发布、一键安装。

In Rainbond, a component is the smallest service unit that Rainbond can manage. Users can combine multiple components into a complex business system. This business system can provide external services or be shared with other organizations for independent deployment. You can integrate the entire business system. The system is packaged into a `cloud market application` , and chooses to publish the application to `teams`,`companies`,`Haoyu public cloud market`.The shared application can be installed and deployed by users of the team, company or cloud market with one click; the visibility is also different when it is shared in different scopes. The specific visible scope is as follows：分享后的应用可供团队、公司或云市的用户一键安装部署完整的服务体系；分享到不同的范围，可见性也有所不同，具体可见范围如下：

- Team：is only visible to members under the current team
- Visible to all members under the current company of company：
- Cloud App Store：Visible to all enterprises and users connected to the Haoyu public cloud app store

We package a complete business solution integration within `application` into a `cloud market application` , after the release is successful, other users can choose `ways to install from the application market` when creating applications `One-click installation and deployment` A complete service system to achieve standardized one-click delivery and deployment.

## App release process

**Select the app you want to share, click`to publish`**

> Tip：When publishing an application, the status of all components in the application must be running

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/share-app/Application%20Publishing.png)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/share-app/Local%20release.png)

**Complete application information**

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/share-app/edit.png)

> Fill in the basic application information

- App Template：Template for the app to publish
- The version number：is the release version of the application. When the same application is released multiple times, if the version number is the same, the published version of the application will be overwritten. If the version is different, it will be released as a new version.
- Version alias：Application alias, eg `Premium, Primary`
- Release Notes：The description of the application, which is convenient for users to understand the function of the application.

> Fill in the configuration information for each component

- Environment variable：to edit the default environment variable of the component, check `to modify`, then other users can edit the value of this environment after installing this application, otherwise it cannot be edited.
- Scaling rule：defines the maximum and minimum number of nodes that the component can scale, the node scaling step, and the minimum installed memory limit.
- Connection information：usually contains password-like information in the connection information, and Rainbond provides the function of automatically generating the value of such variables as an option.

> Publish plugin model information

Plugins carried by its components in the application to be published

**Submit a release task**

完善应用信息后，点击 `提交`，发起同步任务。由集群对应用中的每一个服务进行数据同步。如果是发布到 `云应用商店` ，数据中心会将应用所需的镜像或源码包同步到好雨公有仓库，并将应用的模版数据保存到Console数据库并发送到好雨云应用商店保存。如果是发布到 `团队` 或 `公司`，则应用所需的镜像或源码包同步到本集群，并将应用的模版数据保存在Console数据库。

**Confirm release**

After completing the application information, click `to submit`to initiate a synchronization task.Data synchronization is performed by the cluster for each service in the application.If it is published to the `cloud application store` , the data center will synchronize the image or source code package required by the application to the Haoyu public warehouse, and save the application template data to the console database and send it to the Haoyu cloud application store for preservation.If it is published to Team `or Company`, the image or source code package required by the application is synchronized to this cluster, and the template data of the application is saved in the Console database.When all the components and plug-ins in the application are synchronized, click `to confirm the release`, and the application release can be completed.After the release is successful, you can see the application you released under the corresponding scope in the `Create ->Create component` based on the application market in the `team view`.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/share-app/Application%20sync.png)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/share-app/nginx.png)

**Edit app release information**

The application published to the cloud application market will automatically jump to the display page of the application after publishing. You need to log in to the cloud market to edit the basic information of the application; or operate whether to deliver the application to other Rainbond users.
