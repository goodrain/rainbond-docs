---
title: share app
description: Share your app on the open source app store
---

## background：

When we are currently using Rainbond, in order to quickly deploy some applications, we can connect to the open source application store and install it with one click.In this way, for users, it can be installed directly using some open source applications or infrastructure.This is sufficient for users to install directly using some open source applications or infrastructure.

However, due to the different needs of each user, the app store cannot meet the needs of all users.For example, some users have encountered the following problems when using：Some users, for example, have encountered the following problems： when using Rainbond

- The application installed from the application market is very convenient to use, but the version is relatively low, and there is no version you want

- My business uses some common middleware. After running it in the Rainbond development environment, it needs to be deployed again in the production environment.

- After running some open source projects on Rainbond, if you rebuild the Rainbond environment, you need to deal with various dependencies again before deploying

In the case of previous problems, users can only deal with them manually.But now we offer a way for you to share your own application.It can be easily usable, but also made available to others.When these problems were encountered before, users had to deal with them manually.But now we've provided a way for you to share your own apps.It is convenient for your own use and for others to use.To do this, we need to first understand what Rainstore is.

## What is Rainstore?

Rainstore is a platform that can manage the enterprise application delivery process and realize the whole process management of the store.

For most users who have used Rainbond, they should have noticed the application market, which will connect to our own store：open source application store by default.This store is the store we created based on Rainstore.In this store, there will be applications made by us. Users only need to complete the authorization to install the application with one click.This store is our store based on Rainstore created.The package type is free, and the name can be the corresponding version.After saving, go back to the background management page, and click on the shelf in the application list.

Of course, the premise that users can install with one click is that someone has made the application.If no one has made an app, when you encounter the above problem, you can only post to the community for help, but now, you can do it.Since you log in with your mobile phone number and the data is not complete, you can choose to enter the background, move the mouse to the avatar in the upper right corner, and modify the information.

You can share your own apps to the open source app store for everyone to use.

## How to share apps?

When you want to make your own application for yourself or others to use, you will go through the following steps：

- Connect with open source app stores to obtain app publishing permissions

- To make your application, you can refer to the Rainbond application market application production specification, and verify the pass

- Publish your app for everyone to use

### The first step：docking store

If you have not connected to the open source app store before, then you only need to enter your mobile phone number on the following page, log in with the verification code, and we will create a user for you and give you the corresponding permissions.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-authorization.png)

If you have connected to the app store before, you need to perform the following operations to re-acquire publishing authorization.

1. Find the app market in Rainbond, switch to the Tab page of the open source app store, and click Edit

2. Clear acceskey and click Save.Clear the accesskey and click Save.After the save is complete, you will see that you only have read-only permissions.

3. At this point, select an application at random, click Install, and the authentication dialog box will pop up again.

4. Finally, enter the mobile phone number, and the verification code can be connected.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-store-info.png)

After you complete the above steps, you will see that the open source app store has the following permissions：read-only, install, push apps.At this point the preparatory work is completed.Ready to complete in advance of this time.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-perms-show.png)

### The second step：make the application

Then we make your app. Here we use harbor as an example.A lower version of harbor is currently available in the store.When we want a higher version, the app store is not available.We can share as a harbor app of ourselves.

For the applications we made before, we will share the application making tutorials with the community. Take this harbor as an example, we can refer to the deployment of[enterprise-level Docker image warehouse Harbor on Rainbond](https://t.goodrain.com/d/8204-dockerharborrainbond).Here we refer to this article to make a harbor application of version 2.3.As shown belowHere we refer to this article for a 2.3 version of the harbor app.Figure below

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/harbor-topological.png)

### Step 3：Share the app

At this point, select Publish on the left, publish to the cloud application store, and select the open source application store.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-page.png)

Next we need to create a new application template.Fill in the corresponding version number.Choose to publish.After the image push is completed and confirmed, the app is successfully shared.Fill in the corresponding version number.Select to publishApp sharing is successful after image push is completed and confirmed.

:::caution

\*\*Note：\*\*You must create a new application template, you cannot push the version to other people's applications.

:::

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-1.png)

At this point we create a new application template：Harbor application.As shown belowFigure below

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-2.png)

Next, after selecting the corresponding version and submitting it, the component image will be synchronized. After the image synchronization is completed, click Confirm to publish, that is, the sharing is complete.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-app-model-3.png)

### Step 4：Supplementary Information

You have finished sharing, but now the application has only one name, and the others are default values. Others cannot understand what the application is. In order for others to better understand the application and be willing to use it, we need to go to the application store. Supplementary relevant information.

The website of the app store is https://hub.grapps.cn/enterprise/login. On this page, select the mobile phone verification code to log in, enter the mobile phone number you used when applying for authorization in Rainbond, and after logging in, select store management, and you can I saw the app you posted.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-1.png)

Click on the app you just released, and we can edit the introduction of the app, upload the corresponding Logo, etc.

Once this is done, we go into package management, create a package and apply it online.The purpose of the listing app is to make it visible to more people.After completing these, we enter the package management, create a package, and put the application on the shelf.The purpose of listing the application is to allow more people to see this application.That is, you can see your published applications in the[open source application store](https://hub.grapps.cn/marketplace).

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/store-app-manage-2.png)

The package type is free and the name can be the corresponding version.When saved, go back to the admin page and click on the list in the app.

At this point, your first app sharing is complete.

## What are you sharing?

Rainbond proposed an application model Rainbond Application Model(RAM), which is the standard Rainbond application norm.Rainbond proposes an application model, the Rainbond Application Model (RAM), which is the standard Rainbond application specification.During the software delivery process, Rainbond abstracts the business system into an application model. As long as the business system can run normally in Rainbond, it can be released to the application market through the application template.

The abstract of the RAM model encompasses all the service components included in the enterprise application and the relationship between the components.This advanced abstract has nothing to do with the number of service components inside an enterprise's application or with the complexity of the relationship between components.The abstraction of the RAM model includes all the service components and the associations between the components contained in the enterprise application.This high-level abstraction has nothing to do with how many service components are included in the enterprise application, and whether the relationship between the components is complex.The application template (the specific implementation of the RAM model in the application market field) can be released to the Rainbond-specific application market, and the released application template can be regarded as the installation package of the enterprise application, no matter how complicated the original architecture is and the number of internal components, it can be Complete one-click installation and upgrade.

The deployment effect is shown in the following figure.Wait for the build to complete, you can accessThe RAM model is working hard to evolve towards the Open Application Model (OAM) in order to accommodate the wider delivery domain.OAM is a newly proposed application model in the industry, which is designed to deliver more robust enterprise applications in complex environments in a simple manner.

## How do I manage my shared apps?

### how to use

Now that the sharing has been completed, how should it be used at this time? You can search for your application in the open source application store, select Install on the right, and install it under an application to deploy with one click.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/search-app.png)
![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-1.png)

The effectiveness of deployment is shown in the graph below.Waiting for build to access

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/install-app-2.png)

### Manage applications

If you make any adjustments to the application in the future and need to manage the application-related information, you still need to log in to the app store, log in with your mobile phone number, and complete the application-related operations in the store management.

### final effect

Once we have completed the above steps, we can look for results.After completing the above steps, we can see the effect.Visit the[open source app store](https://hub.grapps.cn/marketplace) , search for your app, here you can see the number of visits and installs of the app.You can see that we have just completed an installation.We can see that we have just completed one installation.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-list-show.png)

After clicking into it, you can see your application profile and related information, as shown below.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/app-detail-show.png)

Your information is displayed on the right side of this page.On the right side of this page, your relevant information is displayed.You can click on your name to enter the aggregation page of your personal information. On this page, your own related information and all applications published will be displayed here.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/publish-user-show.png)

Here you can choose to enter the background, mouse over the top right avatar and modify this information because you are logged in via phone number.

![image](https://static.goodrain.com/docs/5.6/use-manual/app-store-manage/share-app/edit-user-info.png)

## Summarize

The next step is to make your application, here we take harbor as an example.The current version of harbor in the app store is lower.When we want a higher version, but the app store doesn't provide it.We can make a harbor application and share it by ourselves.Welcome to your own good apps.Through the above steps, we have completed the sharing of an application, which solved the problem that the previous application store application did not meet our needs, and also allowed others to use the application you made.Everyone is welcome to contribute your own applications.If you have made a good application, please contact us, we can make your application available to more people through some channels of publicity.
