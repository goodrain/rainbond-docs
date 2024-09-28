---
title: Develop Microservice Apps on Rainbond using Nocalhost
description: Nocalhost is an open-source IDE-based cloud app development tool
slug: nocalhost
image: https://static.goodrain.com/wechat/noocalhost/nocalhost.png
---

This paper will describe how to use Nocalhost to rapidly develop micro-service applications on Rainbond and practical operational steps.

Nocalhost can develop applications directly in Kubernetes, Rainbond can rapidly deploy microservices projects without the need to write Yaml, Nocalhost integration of Rainbond to speed up the development of our microservices.

## Introduction

**[Nocalhost](https://notalhost.dev "Nocalhost") is an open-source IDE cloud native app development tool：**

- Construct, test, and debug applications directly in the Kubernetes cluster
- Provides easy-to-use IDE plugins (supports VS Code and JetBrains). Even if developed and debugged in the Kubernetes cluster, Nocalhost maintains the same development experience as local development
- Develop： to sync your code instantly to remote containers using instant file syncing, without recreating mirrors or restarting the container.

**[Rainbond](https://www.rainbond.com/docs "Rainbond") is a cloud native application management platform：**

- Simple use does not require knowledge of containers, Kubernetes and substrate complex technologies, supports the management of multiple Kubernetes clusters and manages enterprises using the entire life cycle.The main functions include the application development environment, the application market, the micro-service architecture, the application delivery, the application workload, and the application of cloud management.

## Local + Rainbond development of microservices

Previously, when we developed microservices in local + Rainbond we were running locally and others were on Rainbond, we corresponded and interlink with local locations through the Rainbond gateway.

![](https://static.goodrain.com/wechat/noocalhost/19.png)

This will have some problems with：

- Multi-people collaborative development difficulties
- Local Divorce
- Cannot call other microservices via registration center (Nacos)
- Remote Debug is difficult
- Restricted to local resources

## Use Nocalhost + Rainbond to develop microservices

Now that we develop microservices through Nocalhost + Rainbond all services are running on Rainbond when they are developed directly into Rainbond components and synchronize them with local code in real time.Multiple-person development interfaces can be made through the built-in Service Mesh of Rainbond when developing a link.

![](https://static.goodrain.com/wechat/noocalhost/18.png)

**Development using Nocalhost to solve problems with local development：**

- More easy for multi-person connection development
- Services are running on Rainbond and are no longer limited to local
- Closer to the production environment
- Remote Debug
- Call other microservices components via registration center (Nacos)

## Practical steps

Nocalhost currently supports two development models：

- Relay DevMode
- Duplicate DevMode

This page will be the main description of Replace DevMode. When you enter Replace DevMode, Nocalhost will perform the following actions on the component:

1. Reduce number of copies by 1

2. Replace the image of the container for the development image

3. Add a residecar container.

4. Forward a local port to the file synchronization server.

5. Launch local file sync client.

6. Open Remote Terminal.

### 4.1 Install Nocalhost Plugin

Nocalhost supports the `VScode` \`\`JetBrains \`, where we mainly introduce the [VScode plugin installation](https://noocalhost.dev/docs/install "VScode plugin installation").

1. Open VScode, click on the `Extension` button on the left![img](https://nopalhost.dev/en-CN/img/icons/vs-code-icon.jpg) icon
2. Type `Nocalhost` in the search box to select the `Nocalhost plugin` and click on the **Install** button.

![](https://static.goodrain.com/wechat/noocalhost/3.png)

### 4.2 Installation of Rainbond

We choose [Hosted Installing Rainbond](https://www.rainbond.com/docs/installation/installation-with-ui/host-install-with-ui "Host-Installing Rainbond")

### 4.3 Nocalhost Tumes Rainbond Cluster

1. Get `kubeconconfig` file, enter Rainbond cluster view -> tap node configuration -> kubeconfig

![](https://static.goodrain.com/wechat/noocalhost/4.png)

2. We copied the `kubeconfig` file locally and saved it as a `yaml` file.

3. Open Vscode,click on button <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />, open Nocalhost plugin, select Connect to Cluster, choose the path to our `kubeconconfig` file, click Add cluster.

4. After adding finished, like the current：

<img src="https://static.goodrain.com/wechat/nocalhost/6.png" width="30%" />

### 4.4 Deployment of Spring Cloud Microservice on Rainbond

1. Here you choose to install the Spring Cloud Pig Microservice component from the Open Source Store and search Pig in the App Store for installation.

2. Once deployed, the effect is as follows:：

![](https://static.goodrain.com/wechat/noocalhost/8.png)

### 4.5 Enter Nocalhost Development Mode

We have already managed the cluster above in our local Vscode and have installed Spring Cloud Pig microservices in Rainbond so we then select one of the components in the local Vscode for development that will be more visible and develop the `pig-ui` component.

[Spring Cloud Pig backend](https://gitee.com/zhangbigqi/pig "Spring Cloud Pig backend")

[Spring Cloud Pig Frontend](https://gitee.com/zhangbigqi/pig-ui "Spring Cloud Pig Frontend")

#### 4.5.1 Clone Pig-ui code to local

```shell
git clone https://gitee.com/zhangbigqi/pig-ui
```

#### 4.5.2 Launch local development

Open Vscode,click button <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />to find our Pig-ui component, because the app is installed from the Open Source App Store and Deemployment is an auto-generated string, we need to search for it in the component.

![](https://static.goodrain.com/wechat/noocalhost/9.png)

<img src="https://static.goodrain.com/wechat/nocalhost/10.png" width="30%" />

We click next to 🔨 go to development mode,

1. Prompt selection of containers, we select the `gred5f1c` container, leaving the container to be the Mosh container of Rainbond for internal communications, not substitutable
2. Prompt to specify a directory of the source code. Select the directory where we have just cloned it.
3. Wait for a moment and open the terminal interface of the remote container by default and the files in the container will be synchronized with the local time as follows:：

![](https://static.goodrain.com/wechat/noocalhost/11.png)

#### 4.5.3 Start of project

1. Install Project Dependencies, Execute

   ```shell
   npm install
   ```

2. Run Project

   ```shell
   npm run dev
   ```

The effect is as follows, the port in the container is 80

![](https://static.goodrain.com/wechat/noocalhost/13.png)

3. Turn on port forward, click on the button <img src="https://nocalhost.dev/zh-CN/img/icons/logo-light.svg" width="3%" />, find our Deployment, right click on Port Forward, add Port Forward, enter `38000:80` to redirect 80 ports of the container to the local 38,000 port.

<img src="https://static.goodrain.com/wechat/nocalhost/14.png" width="30%" />

4. The page can be accessed via `http://localhost:38000` and can be logged in as well.

![](https://static.goodrain.com/wechat/noocalhost/15.png)

#### 4.5.4 Change code to see effects

This has already demonstrated the effect of modifying our code if services in remote containers are reached through local access.

Change `src/page/welcom.vue`, add a new code to save it.It can be found that when we save, the terminal is automatically restarted in line with the local development effect.

Changes to files will be synced in the container in real time.

![](https://static.goodrain.com/wechat/noocalhost/16.png)

Refresh the page `http://localhost:38000` to see the changes taking effect.

![](https://static.goodrain.com/wechat/noocalhost/17.png)

## Write in the last

With these practical steps, we can already develop micro-service applications on Rainbond through Nocalhost to move away from local development and into cloud-origin rapid development to increase our development efficiency.

This paper only describes basic developments and can also configure [Nocalhost开发配置]for projects (https://nocalhost.dev/docs/config/config-overview-en "Nocalhost Development Configuration") etc. Small partners can explore their own.
