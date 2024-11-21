---
title: Overviews
description: Overview of the native Kubernetes Guide
keywords:
  - Overview of the Yaml Helm guide
  - Rainbond Yaml Helm
---

Rainbond has been available since version V5.8 for users already using Kubernetes to use Yaml or Helm to deploy applications.The current guide guides users how to deploy Yaml or Helm Chart to Rainbond that can already be deployed in the native Kubernetes process. This process will automatically complete the transformation of the application model and subsequent management can be done through Rainbon.

## Convert Principles

Rainbond extends the original RAM (Rainbond Application Model) model boundary to set more attributes in the form of `Other Settings > Kubernetes Attributes` in addition to the most commonly used shipping properties.Flexibility is maintained with flexibility.Preconditions are provided for automating converting native Kubernetes definitions to RAM models.

Rainbond can get a specified type of Workload definition from Yaml or Helm Chart and convert it into a manageable component in Rainbond interface. Currently supported Workload types include Deemployment, StatefulSet, Job and CronJob.Some non-Workload types of resources, such as Service, Sercet, etc. are treated additionally.

An example is the Wordpress Station System defined by Yaml, which shows how different resources are handled.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/import-exist-resource-to-rainbond/import-exist-resource-to-rainbond-2.png"/>

Rainbond did not fully inherit the design ideas of the original Kubernetes and because of the differences in the designs listed below, Rainbond needed a series of conversions when accepting the Yaml or Helm application for deployment, knowing that the differences were helpful in deploying the Yaml or Helm category.

### Non-Workload resources converted to app

Unlike the way in which the original Kubernetes is used, Rainbond has highlighted the use of this core concept.Applying this concept is not a certain resource in Kubernetes. It is a combination of a related set of Workloads, like a web site class business system, often with a Web site service deployed by Deployment, and a database service deployed by StatefulSet.For Kubernetes these are two workloads that can be managed separately, while in Rainbond world there is a greater focus on managing them as a complete application uniform, in addition to a fine-tunable independent management of each workload.

There are no concepts in the native Kubernetes that correspond to the application concepts in Rainbond but the user can point out that all resource definitions in Yaml are deployed to applications in Rainbon.When a user defines a non-Workload class resource in Yaml (e.g. Service, Sercet, etc.), Rainbond will convert it to the `Application > k8s resource` list and will provide access to edit it for user follow-up management.See [Non-Workload Resource Management](/docs/kubernetes-native-guide/import-manage/non-workload)

### Workload resources are converted separately

The native-born Kubernetes system, which focuses on the fine-tuning of all resources, provides enough freedom to use them and significantly raises the threshold of entry.For the management of a single Workshop, Rainbond focused on improving the ease of use of the product in the design of the product, transforming the most commonly used definition of resource specifications (Spec) into a user-friendly graphical function.For most applications, Rainbond provides sufficient functionality.For additional resources, Rainbond will provide a configuration entry in the component `Other Settings > Kubernetes Attribute`.

Rainbond draws workload definitions from all resources provided by the user as defined in Yaml and converts applications to generate examples of components from which Rainbond can be managed.During the conversion, Rainbond automatically identifies all specifications that can be managed, assigns different properties to the extended RAM model, most of the properties continue to be consistently easy to use, while the other part is managed by the `Other Settings > Kubernetes Properties` page.管理方式参见 [组件 kubernetes 属性管理](../../use-manual/k8s-attribute)

## Usage Method

Deploy via Yaml is the simplest way when the user has a Yaml file that can be used in Kubernetes.Refer to [yaml文件识别创建](/docs/kubernetes-native-guide/yaml/cree).

Deployment of applications via Helm is also a good option when users have made business systems into the Helm Chart package.Please refer to the Helm app [deployed based on Helm command](/docs/kubernetes-native-guide/helm/help-cm-install) or after [对接Helm仓库](/docs/kubernetes-native-guide/helm/docking_helm_store) [deployed Helm app based on the Marketplace](/docs/kubernetes-national-guide/helm/creation-process).

## Export Helm Pack

Rainbond can accept the input of a variety of native Kubernetes and can export deployed apps to the Helm Chart pack acceptable to the Kubernetes system.This usage experience is very similar to Rainbond exporting its own RAM packages.

See [Export Helm Chart Pack](/docs/kubernetes-native-guide/helm/export-chart)

## Demo Example

The following document links provide an example of how a Wordpress building system is deployed in Rainbond via Yaml or Helm Chart

[Deployment of Wordpress and Mysql](/docs/kubernetes-native/yaml/example)

[Use Helm to deploy Wordpress and Mysql](/docs/kubernetes-native-guide/helm/example)
