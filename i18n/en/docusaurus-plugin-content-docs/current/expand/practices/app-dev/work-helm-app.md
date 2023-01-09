---
title: Deploy Wordpress based on Helm application
Description: Deploying Wordpress based on Helm application installation in Rainbond 5.3.1 reference documentation
---

Helm is an open source package management tool in Kubernetes. Rainbond supports the deployment of Helm applications since version 5.3.1.Implement convenient deployment and access control of Helm applications.To enable Rainbond users to use applications defined by the Kubernetes ecosystem, the main scenario is to install and use middleware applications.

This article will introduce the installation and management of applications connected to Helm by the Rainbond platform. Through a specific example, learn how to connect to the Helm warehouse, install and manage applications in the Helm warehouse.

### Preconditions

1. Deployed `v5.3.1-release` and above Rainbond platform.
2. Have a Helm repository that can be used for docking, example https://charts.bitnami.com/bitnami repository.

### Steps

#### Rainbond docking with Helm repository

Use **enterprise administrator account** in **enterprise view** click **application market**, click No. `+` to connect to the new application market, select Helm store, enter the following information, click Create to connect, if it is a private store, select Private Store Enter **store username** and **store password**.

Store Name：Custom  
Store Address：Helm Warehouse Address

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockinghelmstore.jpg" title="Docking helm warehouse" width="100%" />

After the docking is completed, the application in the current Helm warehouse will be automatically obtained and displayed

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockingcomplete.jpg" title="Docking completed" width="100%" />

#### Deploy applications in Rainbond based on the Helm app store

**Take deploying a Wordpress application as an example**

In the enterprise view Helm application market, select Wordpress, click the **install** button behind the application, select the **team to be installed to**, define **the application name**, click **to confirm** to automatically start the installation.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Install_helm_app.jpg" title="Install the app from the helm store" width="100%" />

#### Installation process

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Installationprocess.png" title="Installation process" width="100%" />

The installation process is divided into the following four steps：

- initialization

Automatically create CR resources required for application deployment

- detect

Detect whether the application can be deployed normally. If the application cannot be deployed normally due to K8s apiVersion problems or other errors, an error message will be displayed here

- configure

Provides the application deployment configuration function, provides a graphical way to modify the `values.yaml` file configuration, and can choose the `values.yaml` file used during deployment. For the configuration modification method, see [Helm Application Management](/docs/yaml-helm-guide/helm-support/manage-helm-app/), it should be noted that **Stateful applications** When you need to mount the storage, you must specify the`storageClass`to be used, and the specification method is as follows:

_No.1_

`Specify in the values.yaml` file or specify graphically, and graphically specify reference[Helm application management](/docs/yaml-helm-guide/helm-support/manage-helm-app/)

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

Click on the domain name generated in **access policy** to access the Wordpress web page.
