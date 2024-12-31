---
title: Importing existing resources
description: Import existing resources in the Kubernetes namespace to Rainbond for management.
keywords:
  - Import Kubernetes Existing Resources
---

This document describes how to import resources under namespaces from clusters.

:::caution

- Governance mode defaults to k8s native service mode
- Rainbond created or imported namespaces and 'kube-' starting namespace will not be identified.
- Only support transitions of partial classifications. Detailed support for conversion resource types is provided below.
- 导入过程中，如果组件类型资源的 pod 模版内有多个容器， Rainbond 默认只会识别第一个容器，其他容器会丢失，如果想启动多个容器，可以了解一下 Rainbond 的[插件制作](../../use-manual/app-sidecar)。
  :::

## Import Conversion Policy

The following is a detailed list of support resources by type.

### Component type resource

This type of resource will be converted to components in Rainbond when it is imported.

| k8s Resources | Rainbod model       |
| ------------- | ------------------- |
| Employment    | Stateless Component |
| StatefulSet   | State Component     |
| CronJob       | Time Task Component |
| Job           | Task Component      |

### Component Properties Resource

Component type resource itself carries some attribute values such as Port, ConfigMap, volume, etc.

| Component Properties     | Rainbod model                                     |
| ------------------------ | ------------------------------------------------- |
| nodeSelector             | Component Special Properties                      |
| labels                   | Component Special Properties                      |
| tolerations              | Component Special Properties                      |
| Volumes                  | Component Special Properties                      |
| ServiceAccountName       | Component Special Properties                      |
| affinity                 | Component Special Properties                      |
| volumeMount              | Component Special Properties/Profile              |
| prived                   | Component Special Properties                      |
| Ports                    | Component Port                                    |
| HorizontalPodAutoscalers | Component Scaling Policy                          |
| env                      | Environment Variable/Component Special Attributes |
| HealthyCheckManagement   | Component Health Detection                        |

If volume of ConfigMap type is mounted in volumeMount, the component will be converted to the component configuration.\
If env is a reference type, it will not be recognized as an environmental variable for Rainbond

### k8s Resource Type

Supplied component calls resources (only the following resources are temporarily supported)

| k8s Resource Type                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Service                                                                                                                                                                             |
| PersistentVolumeClaim                                                                                                                                                               |
| Progress                                                                                                                                                                            |
| NetworkPolicy                                                                                                                                                                       |
| ConfigMap                                                                                                                                                                           |
| Secret                                                                                                                                                                              |
| ServiceAccount                                                                                                                                                                      |
| RoleBinding                                                                                                                                                                         |
| HorizontalPodAutoscaler                                                                                                                                                             |
| Role                                                                                                                                                                                |
| This type of resource will be stored for component special attributes after completion of import into the corresponding k8s resource, in which volume can bind to ConfigMap, Secret |

## Import started

Resource import has two entry with：

1. Platform Manager -> Cluster -> Import
2. In team view -> Add -> Kubernetes YAML Helm -> Import Kubernet already available resources.

### Prerequisite

1. Learn about the concepts of all modules of Rainbond team, applications, components, etc.
2. There is a namespace that is not managed by Rainbond and that has k8s resources under the namespace.
3. Add a uniform label to the k8s resources that want to be placed under the same app, in the form of `app.kubernetes.io/name:xxx` or `app:xxx`.
4. Learn about the import of resources (click on the import button in the action bar under cluster view).

Below will use Linkerd namespace as an example of how to import Linkerd namespace and its internal resources on Rainbond

### Select namespace

1. Select the namespace you want to import from the dropdown.

2. Once the page has been identified, you will see that the page is categorized according to app.kubernetes.io/name:xxx`or`app:xxx` is divided by the app.kubernetes.io/name:xxx` to check if there is a missing or unsorted resource, and if resources that do not divide the application label are placed in the default ungrouped app.

3. If there is a resource that needs to be repositioned or does not want to be imported, you can go to the cluster to adjust by clicking on the previous step and then go back to the identification page once finished. The identification page can be viewed repeatedly.

4. After viewing the resource type and name and selecting the namespace, make sure you click next to enter advanced identification.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/resource_name.jpg" title="资源识别页面"/>

### Advanced Resource Identification

1. On this page you can see how the resources you deploy to the cluster match after Rainbond modules.The Deployment, Job, Cronjob, StatefulSets will be identified as components, and other services and HPA resources will be parsed into k8s resources under the app view.

2. After confirmation, click to confirm import.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/advanced_resources.jpg" title="高级资源识别页面"/>
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/k8s_resources.jpg" title="k8s资源页面"/>

### Resource Import

1. After the first two rounds of inspections, click on confirm that the import will begin and take over the resource, which will require a series of operations to pull mirrors, data entry, etc. so it will take some time to wait depending on the amount of resources under the namespace.

2. Once the import is completed, you will jump to the team view to see the resources of Rainbond after taking over.

3. The unclassified app is the default ungrouped app referred to above.

Rainbond does not reboot the user's resources in the cluster immediately after taking over them. When the user clicks on reboot or update, it will produce a resource that is completely taken over by Rainbon.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/import.jpg" title="团队页面"/>
