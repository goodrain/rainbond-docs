---
title: OpenVSCode cloud IDE joins Rainbond integrated development system
description: OpenVSCode cloud IDE joins Rainbond integrated development system
slug: OpenVscode
---

:::info OpenVSCode is an online IDE code editor based on a web interface. It only needs a browser on the PC side to use. It is lighter, efficient and concise. Its basic functions completely inherit the [VS Code produced by Microsoft.](https://code.visualstudio.com/) You can continue to strengthen code editing capabilities by installing extensions.The OpenVSCode launched by the Rainbond open source application store is pre-installed with the gitlab-workflow extension to connect to the private code repository Gitlab, and pre-installed with common language runtime environments (the current version integrates Golang , Node.js , python , java ), which can be found in Terminal Quickly debug business code in the terminal.

Rainbond has the ability to quickly build an integrated development environment, and complete the whole process from the start of the code to the final launch of the business through the docking of the code warehouse webhook mechanism.By incorporating the OpenVSCode cloud IDE, the Rainbond integrated development system can be hosted on the cloud, and developers only need a browser to complete the entire process from editing to online. :::

<!--truncate-->


![](https://static.goodrain.com/wechat/openvscode/1.png)

In order to achieve the above goals, this article will explain：in the order of operations.

- One-click installation of OpenVSCode and Gitlab

> With Rainbond's built-in open source application store, one-click installation of OpenVSCode and Gitlab is the fastest way to build an integrated development system.

- OpenVSCode docking with Gitlab

> With the extension mechanism that comes with OpenVSCode, the docking with Gitlab is completed, and the code repository in Gitlab can be obtained.

- Coding and debugging

> With the help of OpenVSCode, complete various advanced operations related to coding and debugging based on the browser.

- Gitlab docking with Rainbond

> Open up Rainbond and Gitlab through the Oauth2.0 protocol, easily deploy the project in Gitlab to Rainbond, and automatically configure the Webhook.

- Code commit triggers automatic build

> Verify the effect of the entire scene, submit the code from OpenVSCode, and complete the automatic release of the deployment project on Rainbond.

---

## One-click installation of OpenVScode and Gitlab

Both OpenVSCode and Gitlab referenced in the integrated development system have been added to the Rainbond open source application store for users to install and deploy with one click.

Search in the open source application store, click Install to deploy the Gitlab application with one click, pay attention to select `14.8.2` version：

![](https://static.goodrain.com/wechat/openvscode/openvscode-11.png)

Search in the open source application store, click install to deploy OpenVSCode applications with one click, currently providing `1.64.2` version：

![](https://static.goodrain.com/wechat/openvscode/openvscode-12.png)

Overall topology：

![](https://static.goodrain.com/wechat/openvscode/openvscode-13.png)

---

### OpenVSCode docking with Gitlab

The OpenVSCode provided by Rainbond integrates the Gitlab-workflow extension by default, which provides OpenVSCode with the ability to connect to the Gitlab code repository. Developers can directly view the code repository hosted in Gitlab and clone it into the workspace with one click.

- OpenVSCode docking with Gitlab repository

  - By docking with the code repository, you can pull and submit code more quickly, and you can debug the code through the IDE

  - Fill in the URL corresponding to Gitlab (if it is Gitlab deployed on the platform, it is the domain name accessed by http) and token.

  ![](https://static.goodrain.com/wechat/openvscode/2.png)

  - After the connection is successful, you can directly clone the warehouse code to perform coding, debugging, and push functions on the terminal.

  ![](https://static.goodrain.com/wechat/openvscode/openvscode-1.png)

- Gitlab Get Token

  - In GitLab, click on the top right corner and select "Preferences" in the left sidebar.Select Access Token, then select "Add Personal Access Token"
  - permission：api , read_user

---

### Coding and debugging

After completing the connection between OpenVSCode and Gitlab, you can directly read the project in Gitlab for cloning operation.

![](https://static.goodrain.com/wechat/openvscode/openvscode-2.png)

Depending on the development language, extensions for various development languages can be installed online to improve the convenience of editing code.

![](https://static.goodrain.com/wechat/openvscode/openvscode-3.png)

The experience of editing code is the same as that of a local IDE.

![](https://static.goodrain.com/wechat/openvscode/openvscode-4.png)

After opening Terminal, you can operate on the command line interface. OpenVSCode integrates the maven build tool by default, which is convenient for building Jar packages for testing.

![](https://static.goodrain.com/wechat/openvscode/openvscode-5.png)

The next step after the build is complete is to start the project directly in Terminal.

![](https://static.goodrain.com/wechat/openvscode/openvscode-6.png)

After the debugged project is started, it listens to port 5000. The developer only needs to open the external service of port 5000 for OpenVSCode to access the service being debugged.

![](https://static.goodrain.com/wechat/openvscode/openvscode-7.png)

---

### Gitlab docking with Rainbond

After coding and debugging, the developer's business enters the deployment phase.To make the whole process more automated, developers can connect Gitlab and Rainbond.

The Oauth2 protocol can be used between Gitlab and Rainbond to open up the single sign-on process, which is convenient for users to directly select the repository in gitlab to deploy the code in the Rainbond interface, and automatically configure the webhook to complete the automatic construction after the code commit.

For configuration and usage, see previous articles：

[GitLab and Rainbond integrate to realize an integrated development environment](https://mp.weixin.qq.com/s/JtV2gvPLC22jbPTeLQJqyA)

After completing the connection between Gitlab and Rainbond, you can select the project in Gitlab to deploy in the Rainbond interface.

![](https://static.goodrain.com/wechat/openvscode/openvscode-8.png)

Turning on the automatic build switch can automatically configure Gitlab's Webhook. Once Gitlab receives the specified push information, it will trigger Rainbond to automatically build the current service component.

![](https://static.goodrain.com/wechat/openvscode/openvscode-9.png)

---

### Code commit triggers automatic build

Add the keyword @deploy to the Commit information when the project file is modified and submitted. After the submission is successful, rainbond will automatically trigger an automatic build.

  ![](https://static.goodrain.com/wechat/openvscode/openvscode-10.png)

Automatic update effect display

  ![](https://static.goodrain.com/wechat/openvscode/3.png)
