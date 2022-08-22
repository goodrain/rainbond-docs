---
title: 'Deploy the Helm application'
description: 'Complete the deployment of the Helm application in Rainbond according to the documentation'
---

Following this document enables developers or operators to deploy applications in Rainbond based on the Helm repository.

### Preconditions

Before you start, you need to meet the following：

1. Have docked[Helm app store](./docking_helm_store)  
2. Have a team available

### Operating procedures

The app is installed with two entries：

**No.1** Install directly in the Enterprise View App Market

Click the **install** button behind the application in the **Helm store** , select the **team**that needs to be installed, define **the application name**, click **to confirm** , and the installation will start automatically.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Install_helm_app.jpg" title="Install the app from the helm store" width="100%" />

**No.2** Select the application to install in the team view **based on the application market creation component**

In the team view, click **to add** --> **to create a component based on the application market**, select the application in the docked Helm application store, click **to install** to automatically start the installation.

#### Installation process

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Installationprocess.png" title="Installation process" width="100%" />

The installation process is divided into the following four steps：

- initialization

Automatically create CR resources required for application deployment

- detect

Detect whether the application can be deployed normally. If the application cannot be deployed normally due to K8s apiVersion problems or other errors, an error message will be displayed here

- configure

Provides the application deployment configuration function, provides a graphical way to modify the `values.yaml` file configuration, and can choose the `values.yaml` file used during deployment. For the configuration modification method, see [Helm Application Management](./manage-helm-app), it should be noted that **Stateful applications** When you need to mount the storage, you must specify the`storageClass`to be used, and the specification method is as follows:

_No.1_

`Specify in the values.yaml` file or specify graphically, and graphically specify reference[Helm application management](./manage-helm-app)

_No.2_

Set the `rainbondvolumerwx` automatically created when Rainbond is deployed as the cluster default `storageClass` , then the `storageClass`will be used by default when deploying the Helm application. The setting command is as follows

```bash
kubectl patch storageclass rainbondvolumerwx -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

- Install

After the above steps, enter the installation process, and the application can be used after installation.

#### app usage

After the application is installed, the platform will automatically create the component as a third-party component of type [k8s](/docs/use-manual/component-create/thirdparty-service/thirdparty-create) ; in the application interface **, service instance** will display all components contained in the application, click the corresponding component name, click **Component details** You can enter the component network settings page, open **external services**on the port page, and access the application according to the generated **access policy** If you deploy **middleware classes and** services, open **internal services here.** can be used by other services in the platform.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/component_details.jpg" title="Component Details" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/access.jpg" title="access" width="100%" />
