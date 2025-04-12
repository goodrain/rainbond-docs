---
title: Share App
description: Share your app to the open source app store
---

## Background:

Currently, when using Rainbond, to quickly deploy some applications, we can connect to the open source app store and then install with one click.For users, this means they can directly install certain open-source applications or infrastructure.

However, since each user's needs are different, the app store cannot meet all users' needs.For example, some users have encountered the following issues when using Rainbond:

- Applications installed from the app market are convenient to use, but the version is relatively low, and the desired version is not available

- Some general middleware used in their business, after running in the Rainbond development environment, needs to be deployed again in the production environment

- After running some open-source projects on Rainbond, if the Rainbond environment needs to be rebuilt, various dependencies need to be handled again for deployment

When encountering these issues before, users could only handle them manually.But now we provide a way for you to share your own applications.It can be convenient for your own use and also for others to use.To achieve this, we first need to understand what Rainstore is.

## What is Rainstore?

Rainstore is a platform that can manage the enterprise application delivery process and achieve full-process management of the store.

For most users who have used Rainbond, they should have noticed that the app market there defaults to connecting to our own store: the open source app store.This store is the store we created based on Rainstore.In this store, there will be applications we have prepared, and users only need to complete authorization to install the applications with one click.

Of course, the prerequisite for users to install with one click is that someone has made the application.If no one has made the application, then when you encounter the above problems, you can only post in the community for help, but now, you can do it.

You can share your own applications to the open source app store for everyone to use.

## How to share applications?

When you want to create your own applications for your own or others' use, you will go through the following steps:

- Connect to the open source app store to obtain application publishing permissions

- Create your application, refer to the Rainbond app market application creation specifications, and pass the verification

- Publish your application for everyone to use

### Step one: Connect to the store

If you have not connected to the open source app store before, you only need to enter your mobile phone number on the following page, log in with the verification code, and we will create a user for you and give the corresponding permissions.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-authorization.png)

If you have connected to the app store before, then you need to perform the following operations to re-obtain publishing authorization.

1. Find the app market in Rainbond, switch to the open source app store Tab page, and click edit

2. Clear the accesskey and click save.After saving, you will see that you only have read-only permissions.

3. At this time, select any application, click install, and the authentication dialog box will pop up again

4. Finally, enter the mobile phone number, verification code to connect

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-store-info.png)

After you complete the above steps, you will see that the open source app store has the following permissions: read-only, install, push applications.At this point, the preliminary preparation is completed.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-perms-show.png)

### Step two: Create an application

Next, it's time to create your application. Here we take harbor as an example.Currently, the version of harbor in the app store is relatively low.When we want a higher version, but the app store does not provide it.We can make a harbor application ourselves and share it.

Previously, we would share the application creation tutorials to the community for the applications we made. Taking this harbor as an example, we can refer to [Enterprise-level Docker image warehouse Harbor deployment on Rainbond](https://t.goodrain.com/d/8204-dockerharborrainbond)Here, we refer to this article to create a 2.3 version of the harbor application.As shown below

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/harbor-topological.png)

### Step three: Share the application

At this time, select publish on the left, publish to the cloud app store, and select the open source app store.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-page.png)

Next, we need to create a new application template.Fill in the corresponding version number.Select publish.After the image push is completed and confirmed, the application is successfully shared.

:::caution

**Note:** You must create a new application template. You cannot push versions to others' applications.

:::

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-1.png)

At this time, we create a new application template: Harbor application.As shown below

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-2.png)

Next, after selecting the corresponding version and submitting, the component image synchronization will start. After the image synchronization is completed, click confirm to publish, and the sharing is completed.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-3.png)

### Step four: Supplement information

You have completed the sharing, but now the application only has a name, and the others are default values. Others cannot understand what the application is. To let others better understand the application and be willing to use it, we need to supplement relevant information in the app store.

The app store's website is https://hub.grapps.cn/enterprise/login. On this page, select mobile phone verification code login, enter the mobile phone number you used when applying for authorization in Rainbond, log in, select store management, and you can see the application you published.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-1.png)

Click on the application you just published, we can edit the application's introduction, upload the corresponding Logo, etc.

After completing these, we enter the package management, create a package, and put the application on the shelf.The purpose of putting the application on the shelf is to let more people see this application.That is, in the [open source app store](https://hub.grapps.cn/marketplace), you can see the application you published.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-2.png)

Select the free package type, and the name can correspond to the version.After saving, return to the backend management page and click 'publish' in the application list.

At this point, your first application sharing is completed.

## What is being shared?

Rainbond proposes an application model called Rainbond Application Model (RAM), which is the standard Rainbond application specification.In the software delivery process, Rainbond abstracts the business system into an application model. As long as the business system can run normally on Rainbond, it can be published to the application market through the application template.

The abstraction of the RAM model encompasses all service components included in the enterprise application and the relationships between the components.This high-level abstraction is independent of how many service components the enterprise application contains internally, nor does it matter how complex the relationships between the components are.Application templates (the specific implementation of the RAM model in the application market domain) can be published to Rainbond's unique application market. The published application templates can be regarded as installation packages for enterprise applications. No matter how complex the original architecture is or how many internal components there are, one-click installation and upgrade can be completed.

To adapt to a wider range of delivery fields, the RAM model is striving to evolve towards the Open Application Model (OAM).OAM is a newly proposed application model in the industry, designed to deliver more robust enterprise applications in a simple way in complex environments.

## How to manage the applications I share?

### how to use

Now that the sharing is completed, how should you use it? You can search for your application in the open-source application store, select 'install' on the right, and install it under a certain application to deploy with one click.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/search-app.png)
![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-1.png)

The deployment effect is shown in the following figure.Wait for the build to complete, then you can access it

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-2.png)

### Manage applications

If you need to adjust the application or manage application-related information later, you still need to [log in to the application store](https://hub.grapps.cn/enterprise/login) first, log in with your mobile phone number, and complete the relevant operations of the application in the store management.

### Final effect

After completing the above steps, we can go to see the effect.Visit the [open-source application store](https://hub.grapps.cn/marketplace), search for your application, where you can see the number of visits and installations of the application.You can see that we have just completed an installation.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-list-show.png)

After clicking in, you can see your application introduction and related information, as shown in the following figure.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-detail-show.png)

On the right side of this page, your related information is displayed.You can click your name to enter the aggregation page of your personal information. On this page, your own related information and all published applications will be displayed here.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-user-show.png)

Here, because you log in with your mobile phone number, the data is incomplete. You can choose to enter the backend, move the mouse to the avatar in the upper right corner, and modify this information.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-user-info.png)

## Summarize

Through the above steps, we have completed the sharing of an application, solving the problem that the applications in the application store did not meet our own needs, while also allowing others to use the applications you have made.Welcome everyone to actively contribute your own well-made applications.If you have made a good application, welcome to contact us. We can promote it through some channels so that more people can use your application.