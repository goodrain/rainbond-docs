---
title: Non-workload resource management
description: Create k8s resources directly by writing yaml
---

This document describes how to create k8s resources through the yaml file, k8s resources to meet the user's ability to create k8s cluster resources through the writing yaml form. Here all resources in k8s can be created like Secret , PV and others without a corresponding model in the platform.This feature module only supports creation, editing modification, deletion, and cannot convert corresponding resources to Rainbond model layers. If you want to deploy business with yaml files, select add component -> yaml file deployment component

## Prerequisite

1. Well familiar with the yaml file for k8s resources, prepare a yaml file for k8s resources.

2. Check if the current team and app are intended to create a location.

3. Check if resources of the same type and name already exist in the k8s resources of the same app at the same level, reducing the problems encountered in creating the resource.

Below is the example of Linkerd namespace, which describes the treatment of k8s resources on Rainbond

## Add

1. Click to add a button

2. Write yaml file content

3. Click OK after confirmation.

4. See if there is a failed resource. Click for details to see the reasons for the specific failure.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_add.jpg" title="k8s资源添加"/>

:::caution

- Failed creation resource is unavailable for resource type and resource name and does not support modifications. Recreation needs to be deleted.
- Create the written yaml file to support the writing of multiple k8s resources that are separated by `--` before they are created and will be displayed.
  :::

## Modify

1. Click the edit button.

2. Modify the content of the yaml file.

3. Click OK after confirmation.

4. See if there is a failed resource. Click for more details to see the reasons for the failures.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_update.jpg" title="k8s资源修改"/>

:::caution

- Note that the yaml file will have an additional line of：`resourceVersion:xxxxxxx` after creating it. This cannot be deleted during the modification.
- Modifying the content of the yaml file only supports changes to the current resource, adding new resources again in the yaml file. Please go the creation logic if you want to create the resource.
  :::

## Delete

1. Click the delete button when the resource is confirmed.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_delete.jpg" title="k8s资源删除"/>
