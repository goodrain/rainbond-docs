---
title: Import existing resources from K8S cluster
description: Import existing resources under Kubernetes namespace into Rainbond for management.
keywords:
  - Import existing Kubernetes resources
---

This document introduces how to import resources under the namespace in the cluster into Rainbond.

:::caution

- The governance mode defaults to the native k8s service mode
- Namespaces created or imported by Rainbond and namespaces starting with 'kube-' will not be recognized.
- Only supports conversion of some types. The detailed supported resource types for conversion are as follows.
- During the import process, if the pod template of the component type resource contains multiple containers, Rainbond will only recognize the first container by default, and other containers will be lost. If you want to start multiple containers, you can learn about Rainbond's [plugin making](../app-ops/app-sidecar.md).
  :::

## Import conversion strategy

The following is a detailed list of supported resources divided by type.

### Component type resources

After importing, this type of resource will be converted into components in Rainbond.

| k8s resources | Rainbond model           |
| ------------- | ------------------------ |
| Deployment    | Stateless component      |
| StatefulSet   | Stateful component       |
| CronJob       | Scheduled task component |
| Job           | Task component           |

### Component attribute resources

Some attribute values carried by the component type resource itself, such as Port, ConfigMap, volume, etc

| Component attributes     | Rainbond model                                     |
| ------------------------ | -------------------------------------------------- |
| nodeSelector             | Component special attributes                       |
| labels                   | Component special attributes                       |
| tolerations              | Component special attributes                       |
| volumes                  | Component special attributes                       |
| serviceAccountName       | Component special attributes                       |
| affinity                 | Component special attributes                       |
| volumeMount              | Component special attributes/configuration file    |
| privileged               | Component special attributes                       |
| port                     | Component port                                     |
| HorizontalPodAutoscalers | Component scaling policy                           |
| env                      | Environment variables/component special attributes |
| HealthyCheckManagement   | Component health check                             |

If the component's volumeMount mounts a ConfigMap type volume, it will be converted into the component's configuration file.\
If env is a reference type, it will not be recognized as Rainbond's environment variable.

### k8s resource types

Resources called by components under the application (currently only supports importing the following types of resources)

| k8s resource types                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Service                                                                                                                                                                                                                            |
| PersistentVolumeClaim                                                                                                                                                                                                              |
| Ingress                                                                                                                                                                                                                            |
| NetworkPolicy                                                                                                                                                                                                                      |
| ConfigMap                                                                                                                                                                                                                          |
| Secret                                                                                                                                                                                                                             |
| ServiceAccount                                                                                                                                                                                                                     |
| RoleBinding                                                                                                                                                                                                                        |
| HorizontalPodAutoscaler                                                                                                                                                                                                            |
| Role                                                                                                                                                                                                                               |
| After importing, this type of resource will be stored in the k8s resources under the corresponding application for use by component special attributes. Special attributes can bind ConfigMap and Secret to volume |

## Start importing

There are two entry points for resource import:

1. Platform management -> Cluster -> Import.
2. Within the team view -> Add -> Kubernetes YAML Helm -> Import existing Kubernetes resources.

### Preconditions

1. Understand the concepts of all modules such as team, application, and component of Rainbond
2. There is a namespace that is not managed by Rainbond and there are k8s resources under the namespace
3. Add a unified label tag to the k8s resources that you want to put under the same application, the format is `app.kubernetes.io/name:xxx` or `app:xxx`
4. Understand the entry point for resource import (click the import button in the operation bar under the cluster view).

The following will take the Linkerd namespace as an example to introduce how to import the Linkerd namespace and its internal resources on Rainbond.

### Select namespace

1. Select the namespace you want to import from the drop-down box.

2. After waiting for the page to recognize, you will see that the page is divided by application/resource type/name level by level. Applications are divided according to the label `app.kubernetes.io/name:xxx` or `app:xxx`. Please check if there are any resources that are missing or misplaced. Resources without the application label will all be placed under the default ungrouped application.

3. During the detection process, if the resource position is wrong and needs to be adjusted, or you do not want to import, you can click the previous step to go into the cluster to adjust, and then re-enter the recognition page after the adjustment is completed. The recognition page can be viewed repeatedly.

4. After reviewing the resource type and name and selecting the namespace, confirm and click Next to proceed to advanced identification.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/resource_name.jpg" title="资源识别页面"/>

### Advanced Resource Identification

1. On this page, you can see how the resources you deployed in the cluster are reflected in the various modules of Rainbond.Deployment, Job, Cronjob, and StatefulSet will be identified as components, while other resources such as Service and HPA will be parsed into the k8s resources under the application view.

2. After confirming everything is correct, click Confirm Import.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/advanced_resources.jpg" title="高级资源识别页面"/>
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/k8s_resources.jpg" title="k8s资源页面"/>

### Resource Import

1. After the first two rounds of checks, click Confirm Import, and Rainbond will start importing and taking over the resources. The process involves a series of operations such as pulling images and data入库, so it may take some time. The waiting time depends on the number of resources under the namespace.

2. After the import is completed, you will be redirected to the team view, where you can see the resources taken over by Rainbond.

3. The unclassified application is the default ungrouped application mentioned above.

After taking over, Rainbond will not immediately restart the resources in the cluster. Only when the user clicks restart or update will a resource completely taken over by Rainbond be produced.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/import.jpg" title="团队页面"/>
