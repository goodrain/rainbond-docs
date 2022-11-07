---
title: 'Deploy Helm applications based on Helm commands'
description: 'Install apps via Helm commands'
---

Following this document enables developers or operators to deploy applications in Rainbond based on Helm commands.

### prerequisite

Before you start, you need to meet the following conditions:

1. Have an executable command of helm (this function only supports helm install ...)

2. Have an available team

### Operation process

There are two entry points for Helm command execution:

**No.1** Team View

Click **Add** in the team view --> then click **Kubernetes YAML Helm** --> select **Helm Command** Install --> select **Apply** and enter **Helm Command** to install --> **Confirm the creation** will jump to the Helm application configuration interface.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/tenant_helm_cmd_install.jpg" title="Install based on Helm commands" width="100%"/>

**No.2** application view

In the application view, click **Add Components** --> **Install from App Market**, select the application in the connected Helm application store, and click **Install** to automatically start the installation.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/app_helm_cmd_install.jpg" title="Install based on Helm commands" width="100%"/>

### Installation process

According to the two installation methods given by Helm's official website, the installation process is divided into two types, namely tgz package installation and warehouse address installation.

#### 1.tgz package install

**Prerequisites** Have a Helm tgz package that you can download and use.

Example

```bash
helm install mynginx https://example.com/charts/nginx-1.2.3.tgz
```

For details on how to generate the Helm tgz package, please refer to the [Helm](https://helm.sh/zh/docs/helm/helm_install/) official website.

After the tgz package is created, it will first check whether the command is correct and can be used. After the check is passed, it will be converted into a Rainbond model and jump to the application view, then you will be able to see the applications you have installed.

#### 2.Warehouse address package installation

**Prerequisites** Have a Helm repository address that can be downloaded and used, and the application you are about to install exists in the repository.

Example

```bash
helm install --repo https://example.com/charts/ mynginx nginx
```

Warehouse installation After clicking Confirm, it will check whether the command is correct and can be used, then it will parse the warehouse address and automatically connect to the Helm application store, and then jump to the configuration interface of Helm application installation.

