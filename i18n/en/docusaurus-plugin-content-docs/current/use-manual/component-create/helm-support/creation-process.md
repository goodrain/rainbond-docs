---
title: 'Deploy the Helm application based on the application market'
description: 'Complete the deployment of the Helm application in Rainbond according to the document'
---

Follow this document to enable developers or operation and maintenance personnel to deploy applications in Rainbond based on the Helm warehouse.

### prerequisite

Before you begin, you need to meet the following conditions:

1. Connected to [Helm App Store](./docking_helm_store)
2. Have an available team

### Operation process

There are three entrances for application installation:

**No.1** Install directly in the enterprise view application market

click **Helm Store** click **install** button，choice **team**，definition **app name**，click **determine** Start installation automatically.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/appstore_helm_app_install.jpg" title="install Helm store app" width="100%"/>

**No.2** In Team View **Create a group based on the application market** click app install

In Team View click **add** --> **Create a group based on the application market**，choice Helm app，click **install** Start installation automatically.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/tenant_helm_app_install.jpg" title="install Helm store app" width="100%"/>

**No.3** In App View **install by app store** click app install

In App View click **add component** --> **install by app store**，，choice Helm app store app，click **install** Start installation automatically.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/app_helm_app_install.jpg" title="install Helm app store app" width="100%"/>

#### Installation process

The installation process is divided into the following three steps:

- testing

Check whether the application can be deployed normally. If it cannot be deployed normally due to K8s apiVersion problems or other errors, error messages will be displayed here

- configure

Provide application deployment configuration function and graphical modification `values.yaml` File Configuration，You can select the `values.yaml` file，Refer to [Helm Application management](./manage-helm-app)，It should be noted that **Stateful application** When you need to mount storage, you must specify the`storageClass`，The designation method is as follows:

_No.1_

on `values.yaml` Specify in file or graphically，Graphically specify references[Helm Application management](./manage-helm-app)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_values_yaml.jpg" title="configure Helm app" width="100%"/>

_No.2_

Set the `rainbondvolumerwx` automatically created when Rainbond is deployed as the default `storageClass` of the cluster, then the `storageClass` will be used by default when deploying the Helm application. The setting command is as follows

```bash
kubectl patch storageclass rainbondvolumerwx  -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

- install

After the above steps, enter the installation process, and the application can be used after installation.

#### app use

After the application is installed, the platform will automatically convert the components into Rainbond models, and convert Helm resources into platform resources accordingly. The specific usage can be moved to [Component usage](../../component-manage/index.md)