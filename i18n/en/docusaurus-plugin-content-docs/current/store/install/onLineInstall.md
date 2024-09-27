---
title: Online Installation Guide
description: This chapter describes the value that the Open Source App Store will have.
---

This chapter focuses on how to install applications online from the Rainbond platform. Once installed, the app can function properly on the platform and manage the life cycle of the app, such as：`Enable', `Updates', `Build`, `Disabled`, etc.The operation process consists mainly of the following moves：`Sign in to the Rainbod platform -- >Go to the Marketplace -- >Search for Apps -- >Shop License -- >Installation -- >Admin `.

## Preparatory work

1. Install Rainbod (platform to support app run), reference[快速安装](/docs/quick-start/quick-install).

## Operating processes

### 1. View the Open Source App Store

The Open Source App Store is an officially operated store in which there are various open source applications in which users can install the app by one click only if they are authorized to do so.When installed with Rainbond platform, default will open the source store.If you want to know more about an app, you can also click the app name to jump to the App Store platform for browsing.在 Rainbond 中查看开源应用商店的操作步骤如下：

- **First step**：enters the `Platform Manager` view from the Rainfd platform's head navigation bar. This view can only be managed by an administrator.
- **Step 2**：, when you enter the platform management view, click on the left navigation bar `Marketplace` and select an open source store to browse the open store app.

### Obtaining authorization

The App Store is a separate platform and can be installed only after registration is authorized.License is intended to link the Rainbond platform and the App Store. Authorization is a login process and cannot be installed without authorization, as follows：

- **First step**：When you choose to open the source shop, you want to install the app at this time. By clicking on the `Install` button on the right side of the right you want to give you permission to log in.
- **Step 2**：fill in the phone number that was registered from the App Store. Send SMS with the verification code to authorize login.
- **Step 3**：after signing in, you can install the app in the Open Source Store and you have the `Install` permission to install it at this time.

### 3. Install the app

The installation was designed to turn the application template into an operational application process, since Rainbond was a multi-tenants platform, each tenant, divided by team and resource management particle from team dimension.So we need to install the app under a team.It is common to install multiple apps under a team.

A well-installed application is a team subresource. It is a logical application built by multiple components. Usually, the application can be a business system, a business architecture or a collection of components of some of the same properties.Installing processes below：

- **First Step**：will be able to search for the apps you want to install while browsing in the App Store. Click the `Install` button on the right side of the app to popup the installation info.
- **Step 2**：Fill in the installation information, click `OK` to install it, and jump to the installation location, when the installed app is shown in the top.

Once the installation is completed, you will jump to the app in your selection, when you see that some resources of the current app will be displayed under the app view. For example,：memory, CPU, disk, and number of components, the middle of the application view is the app top, the hexadecimal pattern on the podium is each component, click on the hexagon shape will eject a card, the card will show some of the components (basic information, container information, service information) on the side of the card and can operate the component buttons, the name of the component can be used to manage the component view.

### Management applications

After the app is installed, you can perform the whole life cycle management of the app such as `build`, `update`, `disabled`, `enabled`, etc. If you need access to the app, then enter the component management page.

The function of the component is to enable the developer to define the deployment model of the business module without attention to the underlying infrastructure structure, which describes the functional modules that can be instantiated as part of a large distributed application.For example, every microservice in an application is described as a component.Components also support `updates', `deactivate', `launch', `build', `access`, `terminal`, etc.Specific actions below：

- **First step**：Under the app view, select the component you want to access, click on its hexagon, click on the top of the popup card and can enter the component management page.
- **Step 2**：On the component management page, click on `Port`, add the port corresponding to the container, open the external service and automatically generate a domain name. Click to access it.

There are, of course, other configurations that can be consulted on[应用管理](/docs/use-manual/app-manage) and[组件管理](/docs/use-manual/component-management) if you want to manage more complex business.
