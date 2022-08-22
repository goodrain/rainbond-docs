---
title: resource import
description: Identifying namespaced resources imported into Rainbond
---

This document describes how to import the resources under the namespace in the cluster into Rainbond.

:::caution
* The governance mode defaults to k8s native service mode
* Namespaces created or imported by Rainbond and namespaces starting with 'kube-' will not be recognized.
* Only some types of conversions are supported. The detailed supported conversion resource types are as follows.
* During the import process, if there are multiple containers in the pod template of the component type resource, Rainbond will only recognize the first container by default, and other containers will be lost. If you want to start multiple containers, you can learn about Rainbond's[plug-in production](/docs/use-manual/team-manage/plugin-manage/new-plugin).

Below is a detailed list of support resources by type.

* Component type resource：This type of resource will be converted into a component in Rainbond after the import is complete.

| k8s resources | Rainbond model           |
| ------------- | ------------------------ |
| Deployment    | stateless components     |
| StatefulSet   | stateful components      |
| CronJob       | Scheduled task component |
| Job           | task component           |

* Component property resource：Some property values carried by the component type resource itself, such as Port, ConfigMap, volume, etc.

| component properties     | Rainbond model                                     |
| ------------------------ | -------------------------------------------------- |
| nodeSelector             | Component special properties                       |
| labels                   | Component special properties                       |
| tolerations              | Component special properties                       |
| volumes                  | Component special properties                       |
| serviceAccountName       | Component special properties                       |
| affinity                 | Component special properties                       |
| volumeMount              | Component special properties/configuration files   |
| privileged               | Component special properties                       |
| port                     | component port                                     |
| HorizontalPodAutoscalers | Component scaling strategy                         |
| env                      | Environment variables/component special properties |
| HealthyCheckManagement   | Component Health Check                             |

If the volumeMount of the component is mounted with a volume of type ConfigMap, it will be converted into the configuration file of the component.  
If env is a reference type, Rainbond's environment variables will not be recognized.

* k8s resource type：is the resource called by the component under the application (only the following resources are supported for the time being)

| k8s resource type       |
| ----------------------- |
| Service                 |
| PersistentVolumeClaim   |
| Ingress                 |
| NetworkPolicy           |
| ConfigMap               |
| Secret                  |
| ServiceAccount          |
| RoleBinding             |
| HorizontalPodAutoscaler |
| Role                    |
 After the import of this type of resource is completed, it will be stored in the k8s resource under the corresponding application for the use of the special properties of the component. In the special properties, the volume can be bound to ConfigMap and Secret

## Preconditions

1. Understand the concepts of all modules of Rainbond, such as teams, applications, components, etc.
2. There is a namespace not managed by Rainbond and there are k8s resources under the namespace.
3. Add a unified label to the k8s resources you want to put under the same application, in the format of `app.kubernetes.io/name:xxx`or`app:xxx`.
4. Learn about the entry of resource import (click the import button in the operation bar under the cluster view).

The following will take the Linkerd namespace as an example to introduce the import of the Linkerd namespace and its internal resources on Rainbond.

## select namespace

1. Select the namespace you want to import from the drop-down box.

2. After waiting for the page to be recognized, you will see that the page will be`by`type/name. The resources that are omitted or arranged in the wrong position, and the resources that do not contain the label of the divided application will all be placed under the default ungrouped application.
During the detection process, if there are any resources that need to be adjusted in the wrong location, or you do not want to import them, you can click the previous step to enter the cluster to adjust, and then re-enter the identification page after the adjustment is complete. The identification page can be viewed repeatedly.
After checking the resource type and name and selecting the namespace, confirm that it is correct and click Next to enter the advanced identification.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/resource_name.jpg" title="resource identification page" />

## Advanced Resource Identification


On this page, you can see how the resources you deploy in the cluster correspond to each Rainbond module.Among them, Deployment, Job, Cronjob, and StatefulSet will be identified as components, and other resources such as Service and HPA will be correspondingly resolved into k8s resources in the application view.
After confirming that it is correct, click Confirm Import.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/advanced_resources.jpg" title="Advanced Resource Identification Page" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/k8s_resources.jpg" title="k8s resource page" />

## resource import

After the first two rounds of checks, click OK to import, and Rainbond will start to import and take over resources. The process needs to go through a series of operations such as pulling images and data storage, so you need to wait for some time. The length of the waiting time depends on the name space. number of resources.

After the import is complete, it will jump to the team view, and you can see the resources taken over by Rainbond.

Unclassified applications are the default ungrouped applications mentioned above.

Rainbond will not restart the user's resources in the cluster immediately after taking over. When the user clicks restart or update, a resource that is completely taken over by Rainbond will be produced.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/import.jpg" title="team page" />
