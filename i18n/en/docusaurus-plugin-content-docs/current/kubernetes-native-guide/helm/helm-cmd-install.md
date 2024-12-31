---
title: Deploy Helm applications based on the Helm command
description: Install the application with the Helm command
---

Follow this document to enable developers or carriers to deploy applications based on Helm commands to Rainbond

### Prerequisite

Before you start, you need to meet the following condition：

1. has a helm executable command (help install only ...)

2. has a available team

### Operating processes

Helm command has two entrances with：

**No.1** Team View

Click **New** --> in team view and **Kubernetes YAML Helm** -> Select **Helm Command** to Install -> Select \*\*Apply \*\*Enter **Helm Command** to Install -> **Make sure to create** will jump to the Helm app configuration interface.

<img src="https://static.goodrain.com/docs/5.10/tenant_helm_cmd_install.jpg" title="基于 Helm 命令安装" width="100%"/>

**No.2** App View

Click **Add components** -> **Install from Marketplace**, select apps from the Helm store to connect to. Click **Install** to automatically start the installation.

<img src="https://static.goodrain.com/docs/5.10/app_helm_cmd_install.jpg" title="基于 Helm 命令安装" width="100%"/>

### Installation process

The setup process is divided according to the Helm network between two installations, tgz package setup and warehouse address, respectively.

#### 1.tgz package installation

**Preconditions** has a Helm tgz pack that can be downloaded and used.

Example

```bash
help install mynginx https://example.com/charts/nginx-1.2.3.tgz
```

Refer to [Helm](https://helm.sh/en/docs/helm/helm_install/) for how to produce the Helm tgz package.

The tgz package will check if the command is correct and usable when it is created, then check that it will be converted to Rainbond model and jump to the app view. You will then see the app you installed.

#### 2.Warehouse Package Installation

**Prerequisites** has an Helm repository address that can be downloaded and used and contains apps you are about to install.

Example

```bash
help install --repo https://example.com/charts/mynginx nginx
```

The repository installation click on confirmation will check if the command is correct and is available, then the repository address will be resolved and automatically directed to the Helm App Store and then jump to the configuration interface where the Helm app is installed.
