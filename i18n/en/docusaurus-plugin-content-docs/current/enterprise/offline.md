---
title: Offline Environment Support
description: Introduction to the offline environmental deployment and use on the platform
---

This document will highlight the functionality support of Rainbond in an offline environment.Particular attention was paid to the deployment of Rainbond in offline environments and the provision of an integrated development environment.These features enable Rainbond to maintain efficient and reliable cloud application management and delivery in an offline environment.

## Main features

In an offline environment, Rainbond Enterprise Edition supports the graphical installation of the Kubernetes cluster and Rainbond platforms, and provides an integrated development environment that helps firms to quickly build, deploy and deliver cloud-origin applications.

### Offline environment deployment

Rainbond Enterprise version provides off-line environmental deployment features that allow users to easily deploy Kubernetes clusters and Rainbond in offline environments.The Enterprise version will provide a full offline installation package that includes all dependencies and mirrors from Rainbond and Kubernetes.

Users only need to download offline installation packages and transfer them to the target environment.After extracting the installation package in the target environment, users can deploy the Kubernetes clusters and platforms directly through the interface between the user interface of Rainbond, including configuration of cluster information and initialization of settings.During deployment, the process log is displayed in real time on the interface and can see the startup status of Rainbond components.

### Integrated development environment

Rainbond provides an integrated development environment in which developers can develop, construct and deploy applications and deliver on the Rainbond platform.The main features include offline source building, offline mirror deployment, offline Helm Chart deployment and offline package delivery.

#### Offline source build

Rainbond Enterprise version addresses users' needs to process language dependencies and build tools for downloading and compiling in offline environments.In Java, Python, Node.js or other programming languages, Rainbond can automatically manage and handle the dependencies and tools it needs.

The user simply provides a Git repository address or a source compression, and Rainbond can automatically identify and execute the build process.This means that users do not need to fear how to acquire and configure building tools in an offline environment, and Rainbond will address these issues automatically.

#### Image deployment offline

In addition to the source build, Rainbond also supports the user directly uploading the Docker image package to deploy the application.This is useful for applications that have built mirrors in other environments and can be exported directly by users as compressors and then uploaded to the Rainbond platform and deployed directly in offline environments.Simultaneous uploaded mirrors are cached by Rainbond which means users can reuse them in offline environments without repeating them.

#### Helm Chart deployment offline

For users using Helm as an application deployment and management tool, Rainbod provided the functionality to upload the Helm Chart package directly.Users can upload prepackaged Helm Chart to the Rainbod platform, where they can deploy and manage one click in an offline environment.For images required in Helm Chart users can upload mirrors directly to the platform.When deployed, the platform automatically identifies all mirror addresses that require components.You can then select the appropriate alternative deployment directly from the uploaded mirror.

## Manual

### Offline environment deployment

1. Preparing for offline installation package：to download the Rainbod offline installation package that contains all necessary dependencies and mirrors for the Rainbod platform and Kubernetes.
2. Processing offline installation package：transmits downloads to the offline environment where they are deployed and unpack the installation on the server in the offline environment to ensure that the extracted file is accessible on the server.
3. Rainbod Console Configuration： Start Rainbord ConsoleEnter the IP address of the cluster node and execute the installation script on the server.
4. Start deployment process：in console.Track log output during deployment until deployment is complete.Once completed, the Kubernetes cluster and Rainbond platforms will be automatically deployed on the server.

### Integrated development environment

#### Offline source build

1. Build：from the source code in the workspace by selecting a new component from the source code to fill the source file or Git repository address into the platform.
2. Initiate build process：platform will automatically extract uploaded files or pull code from offline Git repository.Once the code is replaced, the platform automatically identifies the language of the code. Users can configure the building parameters and start the build process.
3. Build process：platforms are built according to the respective language and build parameters.A build log is also provided to enable users to detect problems in offline construction in a timely manner.

#### Image deployment offline

1. Uploading image：selects a new component from the mirror in the workspace to upload a packaged docker image file to the platform.
2. When deploying the app：is uploaded, all mirrors in the image package will be displayed below.A user can select one of these mirrors as a mirror of the application. Once finished, click the Deploy button to start deploying the app.
3. Configure the running parameter：platform automatically recognizes the environmental variables, port information, etc. that will run the application once you configure the running parameters and environment variables as needed.

#### Offline Helm Chart deployment

1. Upload Helm Chart Pack：from Yaml and Helm to upload the Helm Chart Pack to the Rainbod platform by selecting new components in the workspace.
2. Select and deploy：to upload the Helm Chart pack to start the deployment process.The platform automatically identifies all mirrors in the Helm Chart package, and users can choose to replace local uploaded mirrors as an application mirror.
3. Once the：configuration has been replaced, it can be configured based on the values.yaml file displayed on the platform, and then click the Deploy button, to start deploying the app.
