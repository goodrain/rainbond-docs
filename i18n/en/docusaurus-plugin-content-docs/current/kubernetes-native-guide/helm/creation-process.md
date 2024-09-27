---
title: Deploy Helm applications based on application market
description: Deploy the Helm application in Rainbond according to the documentation
---

Follow this document to enable developers or carriers to deploy applications based on the Helm repository in Rainbond

### Prerequisite

Before you start, you need to meet the following condition：

1. paired [Helm App Store](./docking_helm_store)
2. has a available team

### Operating processes

App installation has three entry：

**No.1** Install directly in the Enterprise View App Marketplace

Click the **Install** button below the **Helm store** app. Select the **team**team\*\* you want to install, define **the app's name**. Click **OK** to start the installation automatically.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/appstore_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

**No.2** Install from team view **Create components based on the Marketplace**

In team view click **New** ---> **Create component based on the Marketplace**. Select apps from the next Helm store. Click **Install** to automatically start the installation.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/tenant_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

**No.3** Install from App View **Install from Marketplace**

Click **Add components** -> **Install from Marketplace**, select apps from the Helm store to connect to. Click **Install** to automatically start the installation.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/app_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

#### Installation process

The installation process is divided into the following three steps：

- Detect

Errors will be displayed here to check if the app can be deployed normally, when the K8s apiVersion problem or other errors cause them to fail to deploy

- Configuration

Provides app deployment configuration features, provides graphical modifications to `values.yaml` files, selects the `values.yaml` file to be deployed. The configuration changes are found in [Helm App Management](./manage-helm-app). Note that **state apps** must be specified for the `storageClass` when the store is mounted. The following methods must be specified:

_No.1_

Specify or graphically specify in `values.yaml` file and refer to [Helm app management](./manage-helm-app)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_values_yaml.jpg" title="配置 Helm 应用" width="100%"/>

_No.2_

Set `rainbondvolumerwx` to the default `storageClass`, when deploying Helm will use this `storageClass` by default, setting the following command

```bash
kubatl patch storageclass rainbondvoluerwx -p '{"metatata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}
```

- Install

After the above steps go into the installation process and the app is ready to use it when installed.

#### App usage

When the app is installed, the platform will automatically convert the component to the Rainbond model and will convert Helm resources to the platform resource.Specific use can be moved to[组件使用](/docs/use-manual/component-manage/)
