---
title: The principle of converting K8S resources to Rainbond application model
description: Analyze the mapping conversion logic between Kubernetes resources and Rainbond application model
keywords:
  - Kubernetes YAML to Rainbond
  - Helm Chart to Rainbond
  - Rainbond application model
---

## Core concepts

Starting from version V5.8, Rainbond supports directly deploying native Kubernetes YAML files or Helm Charts to the platform.This document explains why Rainbond needs to perform application model conversion, as well as the technical principles and significance of the conversion.

## Why model conversion is needed

There are the following key differences in design philosophy between Rainbond and Kubernetes:

1. **Application-centric vs resource-centric**: Rainbond is designed around the core concept of "application", treating multiple related services as a whole; while Kubernetes adopts a resource-centric design, with various resources (Deployment, Service, etc.) being relatively independent.

2. **Different levels of abstraction**: Rainbond provides a higher level of abstraction than Kubernetes, through the extension of the RAM (Rainbond Application Model) model, offering necessary flexibility while maintaining ease of use.

3. **Management mode differences**: Kubernetes focuses on comprehensive, fine-grained resource definition capabilities, while Rainbond optimizes the user experience for common operations, transforming complex resource specifications into intuitive interface operations.

These differences determine that model conversion must be performed when importing Kubernetes resources to ensure compatibility and functional integrity between the two systems.

## Conversion principle and technical implementation

### Resource identification and classification processing

Rainbond divides Kubernetes resources into two categories for processing:

1. **Workload resources**: Including Deployment, StatefulSet, Job, and CronJob, these resources are converted into Rainbond's components (Component).

2. **Non-Workload resources**: Such as Service, ConfigMap, Secret, etc., are stored in the application's `k8s resources` list for unified management.

![](https://static.goodrain.com/wechat/import-exist-resource-to-rainbond/import-exist-resource-to-rainbond-2.png)

### Workload conversion logic

Rainbond adopts the following processing flow when converting Workload:

1. **Extract core definitions**: Extract the specification definition (Spec) of the Workload from YAML or Helm Chart.

2. **Map to RAM model**: Map the extracted definitions to various attributes of the Rainbond application model:
   - Common configurations such as container images, ports, and environment variables are mapped to corresponding Rainbond interface elements
   - Special or extended attributes are stored in `Other Settings > Kubernetes Attributes`

3. **Automatic identification of associations**: Automatically identify dependencies between resources to build connection relationships between components within the application

Rainbond identifies the resource types in YAML files and converts them into component types and corresponding abstraction layers in Rainbond.The following is a detailed list of supported resources divided by type:

#### Component type resources

After importing, this type of resource will be converted into components in Rainbond:

| k8s resources | Rainbond model           |
| ------------- | ------------------------ |
| Deployment    | Stateless component      |
| StatefulSet   | Stateful component       |
| CronJob       | Scheduled task component |
| Job           | Task component           |

#### Component attribute resources

Some attribute values carried by component type resources themselves, such as Port, ConfigMap, volume, etc:

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

**Special note**:

- If the component's volumeMount is mounted with a ConfigMap type volume, it will be converted into the component's configuration file
- If env is a reference type, it will not be recognized in Rainbond's environment variables
- Other resources are all placed in the k8s resources under the application view

### Non-Workload resource processing

For non-Workload resources such as Service, ConfigMap, Secret, etc:

1. Rainbond converts them into internal representations and stores them in the application-level `k8s resources` list
2. Provide a graphical interface for users to view and edit these resources
3. When the application is deployed, these resources will be automatically applied to the Kubernetes cluster

## Bidirectional conversion capability

Rainbond not only supports importing Kubernetes resources and converting them into application models, but also supports the reverse operation:

- **Import Conversion**: YAML/Helm → Rainbond Application Model
- **Export Conversion**: Rainbond Application → Helm Chart

This bidirectional conversion capability ensures that applications can freely migrate between Rainbond and native Kubernetes environments, seamlessly integrating with the existing Kubernetes ecosystem and toolchain of enterprises.

## Practical Application Scenarios

### Importing Kubernetes Resources

For the import of existing Kubernetes resources, Rainbond provides two main methods:

- **YAML File Import**: Suitable for scenarios with single or a small number of resource definitions [Detailed Guide](./yaml-example.md)
- **Helm Chart Import**: Suitable for scenarios with complete application packages [Detailed Guide](./helm-example.md)

### Export as Helm Chart

Rainbond can export applications on the platform as standard Helm Chart packages, facilitating deployment or sharing in other Kubernetes environments:

- [Guide to Exporting Helm Chart Packages](./export-chart.md)
