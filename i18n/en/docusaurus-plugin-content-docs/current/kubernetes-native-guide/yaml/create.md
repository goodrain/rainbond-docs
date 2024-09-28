---
title: YAML transformation and creation
description: This document describes YAML identification strategies and how to create components by uploading YAML files.
keywords:
  - Rainbond YAML
  - Rainbond YAML Create Component
---

This document describes Rainbond recognition of YAML strategies and how to create components by uploading YAML files.

## YAML Conversion Policy

Rainbond converts the type of resources in the YAML file to the component type in Rainbond and to the Rainbond abstract layer of the particular resource, below is a detailed list of support resources by type：

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

- If volume of ConfigMap type is mounted in volumeMount, the component will be converted to the component configuration.
- If env is a reference type, it will not be recognized as an environmental variable for Rainbond
- All other resources are placed in k8s resources under app view.

## Create component using YAML

### Prerequisite

1. Well familiar with YAML files for Kubernetes resources, prepare YAML files for one or more Kubernetes resources.
2. Check if the current team and app are intended to create a location.

### Upload YAML file

1. \*\*Upload in team view -> Add -> Kubernetes YAML Helm -> YAML File \*\* or **Application View -> Add Component -> Create Based on YAML**
2. Upload YAML file
3. Click to create after confirmation is correct.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_push.jpg" title="上传yaml"/>

### Kubernetes Resource Name

1. This section identifies the full range of k8s resources, and if part is converted to Rainbond resources, all other resources are stored in the k8s resources under application.
2. Click next to check for error

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_resource_name.jpg" title="yaml资源名称"/>

### Advanced Resource Identification

1. On this page you can see how the resources you deploy to the cluster match after Rainbond modules.The Deployment, Job, Cronjob, StatefulSets will be identified as components, and other services and HPA resources will be parsed into k8s resources under the app view.
2. Tap to deploy after confirmation.
3. Deploying requires data storage, pull mirrors, etc. so long and wait to jump to app view

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/advanced_resources.jpg" title="高级资源识别"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/team.jpg" title="跳转团队视图"/>
