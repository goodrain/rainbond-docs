---
title: Component creation process description
description: This article introduces the main process of creating components in Rainbond
---

This document describes the basic process of creating components in Rainbond.

## Preconditions

1. The planning and creation of the team has been completed.
2. The cluster resources are sufficient.

There are currently two entries for the creation of components, namely*team view/create component entry* and _application view/add component entry_ , and the creation process is the same.

## Create components from source

The following will take the Java source code to create a component as an example to introduce the process of using the source code to create a component on Rainbond.

1. Provide the component name and the application to which it belongs. The most important thing is to provide the construction source information. The source code construction provides the code warehouse address, authorization and other information.

2. Wait for Rainbond to detect the source code. In this process, Rainbond will obtain the source code according to the code source information and perform language type and language specification detection, and read the component properties from the [Rainbondfile](/docs/use-manual/component-create/language-support/rainbondfile/) file.

3. If the detection result is passed, the component will be created according to the detected component properties. If it is not passed, the user needs to change the relevant information according to the prompts.

4. After the detection is complete, the user can choose to start the build or perform advanced settings to set more component properties.If you choose to build and start Rainbond, it will obtain the source code again and build the source code according to the language type detected by the code.Please note that the source code type will only be read in the source code detection, so if the language type is changed in the subsequent development process, re-code detection needs to be triggered.

5. After the component is built, it can be accessed through the default domain name bound to the port.For the follow-up management and maintenance process, please refer to [Component Development](/docs/use-manual/component-manage/build-source/build_and_version) [Component Operation and Maintenance](/docs/use-manual/component-manage/overview/basic-operation)

Source address: https://github.com/goodrain/java-maven-demo.git

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/Sourcecodeconstruction.png" title="Create component pages from source code" />

<b>detailed reference documents of various languages are as follows</b>：

[Java Language Reference](/docs/use-manual/component-create/language-support/java/java-maven)  
[PHP Language Reference](/docs/use-manual/component-create/language-support/php)  
[Python Language Reference](/docs/use-manual/component-create/language-support/python)  
[NodeJS Language Reference](/docs/use-manual/component-create/language-support/nodejs)  
[.Net Language Reference](/docs/use-manual/component-create/language-support/netcore)  
[Html Language Reference](/docs/use-manual/component-create/language-support/html)  
[Any source code that defines a Dockerfile Reference](./language-support/dockefile)

### Use of Git and Svn

When creating a component, select Git or SVN according to the type of code repository, and correctly fill in the code repository address of the application and the code to be used`branch`or `tag`. The default branch of Git is `master`, the default tag of SVN is `trunk`.

The default parameters for svn checkout code include：

```
--username --password --non-interactive --trust-server-cert
```

When git obtains code, it supports account authentication, key authentication and Oauth2.0 authentication.

- Account password to connect to the code repository

If you need to use the account password to connect to the code warehouse, click Fill in the warehouse account password, and fill in your login user name and password correctly.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/Password%20construction.png" title="Fill in the code repository authorization information and version selection diagram" />

- SSH connection code repository

If you need to use the SSH key to connect to the code repository, click the Configure Authorization Key below, a key will be generated for you, and then add this key to the deployment key of your code repository.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/app-creation/ssh_login.jpg" title="Use SSH KEY as authorization method" />

## Created from a Docker image

The following will take the official image of Nginx as an example to introduce and demonstrate the process of creating components with Docker images on Rainbond. The same as the source code creation process, the difference is that the provided build source information and types are different. The process is as follows：

1. Provide the component name and the application to which it belongs. The most important thing is to provide the build source information. The image construction provides the image name and authorization information.

2. Rainbond will obtain the image based on the provided image information, and Rainbond's ability to obtain the specified image is the basis for successful creation.At present, Rainbond's detection specifications for mirroring are more flexible, so it must be noted that the mirrors that pass the detection may not be able to run normally, such as the above-mentioned mirror types that Rainbond cannot run.When Rainbond obtains an image successfully, it parses the metadata of the image to obtain the attribute information required to create a component.

   > If you want to be able to add environment variables in batches, it is best to define them in the image metadata (ie in the Dockerfile).When Rainbond recognizes it, it will automatically get it from it.

3. After the application detection passes, the component can be created.

4. Components are accessible after the build is complete.For the follow-up management and maintenance process, please refer to the follow-up management and maintenance process, please refer to [Component Development](/docs/use-manual/component-manage/build-source/build_and_version) [Component Operation and Maintenance](/docs/use-manual/component-manage/overview/basic-operation)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerconstruction.png" title="Schematic diagram of creating components based on Docker images" />

The components created from the Docker image are done.If you create a component from an image in a private image repository, you need to pay attention to the following types of problems：

- The private repository Https is well-configured, and mirrors can be pulled directly.
- If the private warehouse uses a self-signed certificate, the node where the Rainbond Chaos component is located needs to configure the private warehouse trust, refer to the operation and maintenance documentation.
- If the image repository is private, please provide the correct account and password information.

### Example deployment image with startup command

- Deploy via docker run command: `docker run -p 8490:8490 goodrain.me/test -s "ws://192.168.1.1:8490"`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/dockerrun.png" title="Schematic diagram of providing more parameters through the DockerRun command" />

- By specifying the mirroring method:
  - Mirror address: `goodrain.me/test` and build
  - Modify the startup command at the application build source to `-s "ws://192.168.1.1:8490"`

`goodrain.me/test`Please replace with your own mirror

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/creation-process/modify.png" title="Schematic diagram of later changes to the mirror startup command" />

## Install from the market

Rainbond proposes an application model, the Rainbond Application Model (RAM), which is the standard Rainbond application specification.Based on this model and Rainbond's application market mechanism, one-click installation/upgrade is finally realized.The highly automated delivery experience improves enterprise application delivery efficiency and reduces delivery costs.

The application marketplaces provided by Rainbond are divided into two categories:

**1. Local component library**

:::info

The local component library is the application market that comes with Rainbond, and all the application templates you publish under this enterprise can be saved here.Other users within the enterprise can quickly replicate the application by installing the application template from the local component repository.Publishing to the local component library can refer to: [Make a reusable application template](/use-manual/get-start/release-to-market.md).

:::

**2. Open source app store**

:::info

The open source application store is an application market officially supported by Haoyu Technology. All Rainbonds can connect to this market and install the above applications with one click.

:::

The main difference between the local component library and the cloud application market is that the applications you publish in the local component library can only be circulated in the deployed Rainbond environment.Applications published to the cloud application market can be installed in multiple Rainbond environments with one click.

### Install apps from open source app stores

When you have deployed Rainbond, click the App Market button on the left, select Open Source App Store, and you will see the following page.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/appstore.jpg" title="Cloud Application Market Authorization Diagram" />

After obtaining authorization, you will be able to click Install on the right side of the app, as shown below:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app.png" title="Cloud Application Market Installation Diagram" />

Select the team and application you want to install, it will jump to the application, you can see the application topology, it will start automatically.Then you can access the app

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app-topological.png" title="Cloud application market installation application topology" />

### Install the app from the local component library

After you deploy Rainbond, you can refer to[to make a reusable application template](/docs/use-manual/get-start/release-to-market)to make your own application.Here, we have made a WordPress application, which is the same as installing it from the cloud application market. Click to install on the right, and the one-click installation is complete.You can now access your own app.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app-local.png" title="Schematic diagram of installation and application of local component library" />

Installation from the local component library will be a key process of application delivery, and the application of the local component library supports one-click installation and continuous upgrade.
