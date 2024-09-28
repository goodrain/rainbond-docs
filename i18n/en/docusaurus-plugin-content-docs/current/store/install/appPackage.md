---
title: Installation package usage guide
description: This chapter describes the value that the Open Source App Store will have.
---

This chapter mainly describes how to use the App Installation Pack, where final installation works on the platform and can manage the entire life cycle of the app, e.g.：`Enable', `Construction', `Access', `Disabled`, etc.
The operating process consists mainly of the following three steps: `Import Package — >Install App — >Manage Apps\`.

## Preparatory work

1. Install Rainbod (platform to support app run), reference[快速安装](/docs/quick-start/quick-install).
2. Available app setup packages (e.g.：for example `Gitlab', downloaded packages are：`Gitlab-14.8.2-ram.tar.gz\`).

## Operating processes

### 1. Import installation package

Since the app installation package needs to be on the Rainbond platform to be running, the first step is to upload the package to its own building Rainbond as to upload the package to the phone.e.g.：upload `Gitlab-14.8.2-ram.tar.gz` to Rainbond platform.The package will be rendered in the form of an application template after the import is completed, which can modify the description of the respective template and can contain multiple versions of the application. You can mark that a version is stable to publish depending on the actual need.

The local component library in Rainbond is a market for all in-company applications installing packages, while the Open Source Store provides open source apps for your one-click installation.The following import processes are specified as：

- **First step**：enters the `Platform Manager` view from the Rainfd platform's head navigation bar. This view can only be managed by an administrator.
- **Step 2**：enters the platform management view by clicking on the `Marketplace` on the left side of the navigation bar and selecting `local component library`.
- **Step 3**：click on the `offline import` button on the right side to upload `Gitlab-14.8.2-ram.tar.gz` downloaded from the App Store. Once the upload is completed, the file list and import range are shown below.
- \*\*Step 4 \*\*：selects the file and selects the release range, uploads to the company (the upload app is visible to the entire Rainbod platform), uploads to the team (which team needs to be selected, only the selected team is allowed to see it), click on the bottom right corner to confirm import.

Once the import is completed, you can see a `Gitlab` app template in the component library. Click the name to go to the admin app templates. The app template is yourself and can change the app's name, version, logo, details, etc. If you are interested in other apps, you can import multiple apps according to this process and manage multiple apps on this page.

### 2. Install the app

The installation was designed to turn the application template into an operational application process, since Rainbond was a multi-tenants platform, each tenant, divided by team and resource management particle from team dimension.So we need to install the app under a team.It is common to install multiple apps under a team.

A well-installed application is a team subresource. It is a logical application built by multiple components. Usually, the application can be a business system, a business architecture or a collection of components of some of the same properties.Installing processes below：

- **First step**：finds the application template in the local component library based on the release range (firm/team) you imported. Click the install button on the right side to eject the installation information box.
- **Step 2**：Fill in installation information, click `OK` to install it.

When the installation is completed, you will jump to the app of your choice. When the installation succeeds in a `Gitlab` app, you will display some resources from the current app under the app view, such as：memory, CPU, disk, number of components, etc. The middle of the application view is the application top, the hexagon pattern is each component, click on the hexagon shape will eject a card and the card will show some components (basic information, container information, service information) on the side of the card and can operate the component buttons to manage the component view.

### Management applications

After the app is installed, you can perform the whole life cycle management of the app such as `build`, `update`, `disabled`, `enabled`, etc. If you need access to the app, then enter the component management page.

The function of the component is to enable the developer to define the deployment model of the business module without attention to the underlying infrastructure structure, which describes the functional modules that can be instantiated as part of a large distributed application.For example, every microservice in an application is described as a component.Components also support `updates', `deactivate', `launch', `build', `access`, `terminal`, etc.Specific actions below：

- **First step**：Under the app view, select the component you want to access, click on its hexagon, click on the top of the popup card and can enter the component management page.
- **Step 2**：On the component management page, click on `Port`, add the port corresponding to the container, open the external service and automatically generate a domain name. Click to access it.

There are, of course, other configurations that can be consulted on[应用管理](/docs/use-manual/app-manage) and[组件管理](/docs/use-manual/component-management) if you want to manage more complex business.
