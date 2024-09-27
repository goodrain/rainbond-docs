---
title: OpenVSCode cloud IDE joined the Rainbod Integrated Development System
description: OpenVSCode is an online IDE code editor based on the web interface, only if a browser exists on the PC end
slug: OpenVscode
image: https://static.goodrain.com/wechat/openvscode/vscode.png
---

OpenVSCode is an online IDE code editor based on the web interface. It can be used, lighter, more efficient, simple. Its basic functionality is completely inherited from Microsoft's [VS Code](https://code.visualstudio.com/). It can continue to be enhanced by installing extensions.The OpenVSCode launched by Rainbond Open Source Store pre-installs the gitlab-workflow extension to access the privatization repository Gitlab, and preload the common language operating environment (current version has been integrated in Golang, Node.js, python, jav) to quickly debug business code in the Terminal Terminal.

Rainbond has the capacity to quickly build an integrated development environment that will complete the business from the code to the final online full process by connecting to the repository webhook mechanism.By incorporating the OpenVSCode cloud IDE, the Rainbond integrated development system can be hosted in the cloud, the developer needs only one browser to complete the entire process from editing to online.

![](https://static.goodrain.com/wechat/openvscode/1.png)

In order to achieve the above objective, this paper will follow the sequence of events in：

- Install OpenVSCode and Gitlab

> The fastest way to build an integrated development system is to install OpenVSCode and Gitlab by using Rainbond built-in open source shops.

- OpenVSCode Gitlab

> Use OpenVSCode auto-tape extension to complete interface with Gitlab to get the repository in Gitlab.

- Encoding and Debugging

> With the help of OpenVSCode various advanced operations for encoding and debugging based on your browser.

- Gitlab Curtain Rainbond

> Through the Oauth2.0 protocol, Rainbond and Gitlab, easily deploy projects from Gitlab to Rainbond and automatically configure Webhook.

- Code submission triggers auto-build

> Verify the effect of the entire scene, complete the auto-release of the deployment project from Rainbond when the OpenVSCode is submitted.

---

## Install OpenVScode and Gitlab

Both OpenVSCode and Gitlab cited in the Integrated Development System have joined Rainbond Open Source Store for one-click installation of users.

Search in an open source store. Click install to deploy the Gitlab app. Take note of the `14.8.2` version：

![](https://static.goodrain.com/wechat/openvscode/openvscode-11.png)

在开源应用商店中搜索，点击安装即可一键部署 OpenVSCode 应用，目前提供 `1.64.2` 版本：

![](https://static.goodrain.com/wechat/openvscode/openvscode-12.png)

Total VBVB：

![](https://static.goodrain.com/wechat/openvscode/openvscode-13.png)

---

### OpenVSCode Gitlab

The OpenVSCode provided by Rainbond integrates the Gitlab-workflow extension by default, which provides OpenVSCode with the ability to tap the Gitlab repository so that developers can view the repository hosted in Gitlab directly and clone to workspace.

- OpenVSCode pairs the Gitlab.

  - With access to the repository you can pull faster, submit the code, and debug the code via IDE

  - Fill the Gitlab corresponding URL (Gitlab is http's accessible domain if the platform is deployed) and token's

  ![](https://static.goodrain.com/wechat/openvscode/2.png)

  - After a successful pair, a repository code can be cloned directly to encoding, debugging, push and other features in the terminal.

  ![](https://static.goodrain.com/wechat/openvscode/openvscode-1.png)

- Gitlab Get Token

  - In GitLab, click on the top right corner and select "Preferences" in the left sidebar.Select access token, then select "Add personal access token"
  - Permission：api, read_user

---

### Encoding and Debugging

Once OpenVSCode is paired with Gitlab you can read the items in Gitlab directly for cloning.

![](https://static.goodrain.com/wechat/openvscode/openvscode-2.png)

Depending on the language of development, you can install development language extensions online to improve the ease of editing codes.

![](https://static.goodrain.com/wechat/openvscode/openvscode-3.png)

The experience of editing the code and the local IDE are not identical.

![](https://static.goodrain.com/wechat/openvscode/openvscode-4.png)

After opening Terminal, action can be performed on the command line interface. OpenVSCode has integrated maven building tools by default to facilitate the building of Jar packages for testing.

![](https://static.goodrain.com/wechat/openvscode/openvscode-5.png)

The next step after the build is complete, you can start the project directly in Terminal.

![](https://static.goodrain.com/wechat/openvscode/openvscode-6.png)

After the debugged project is launched, listen to the 5000 port. The developer only needs to open the 5000 port for OpenVSCode and access the debugging service.

![](https://static.goodrain.com/wechat/openvscode/openvscode-7.png)

---

### Gitlab Curtain Rainbond

With the completion of the coding and debugging process, the operations of the developers entered the deployment phase.To make the entire process more automated, the developer can access Gitlab and Rainbond

Gitlab and Rainbond can use the Oauth2 Protocol to open single point login processes to facilitate user deployment by directly selecting the repository in gitlab within the Rainbond interface, and automatically configuring webhook to complete auto-build after code commit.

See previous articles： for configuration and usage

[GitLab和Rainbond整合实现一体化开发环境](https://mp.weixin.qqq.com/s/JtV2gvPLC22jbPTeLQJqyA)

After completing Gitlab interface with Rainbond you can select items from the Gitlab interface for deployment.

![](https://static.goodrain.com/wechat/openvscode/openvscode-8.png)

Turn on whether to turn on the auto-build switch, automatically configure Gitlab Webhook and Gitlab will trigger the auto-build of Rainbond on the current service component once it receives the specified push information.

![](https://static.goodrain.com/wechat/openvscode/openvscode-9.png)

---

### Code submission triggers auto-build

You will automatically trigger the auto-build when you add a keyword @ploy when the project file is submitted.

![](https://static.goodrain.com/wechat/openvscode/openvscode-10.png)

Auto Update Effect Display

![](https://static.goodrain.com/wechat/openvscode/3.png)
