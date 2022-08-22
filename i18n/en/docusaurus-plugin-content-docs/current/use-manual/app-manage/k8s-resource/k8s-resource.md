---
title: k8s resource operation
description: Create k8s resources directly by writing yaml
---

This document describes how to create k8s resources through yaml files. The k8s resources are for users to create k8s cluster resources in the form of handwritten yaml. All resources in k8s can be created here, such as Secret, PV, etc. There is no corresponding model in the platform resources can be created in this way.This function module only supports the functions of creating, editing, modifying, and deleting, and cannot convert the corresponding resources into the model layer of Rainbond. If you need to deploy the business through the yaml file, please select Add component under the application ->yaml file deployment component

## Preconditions

1. I am very familiar with the yaml file of k8s resources, and prepare a yaml file of k8s resources.

2. Check if the current team, application is the desired location.

3. Check whether there are resources of the same type and the same name in the k8s resources of the same level application, so as to reduce the problems encountered in the process of resource creation.

The following will take the Linkerd namespace as an example to introduce the processing of k8s resources on Rainbond.

## Add to

1. Click the Add button

2. Write yaml file content

3. After confirming that it is correct, click OK.

4. Check whether there are any resources that failed to be created, and click View Details to view the specific failure reasons.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_add.jpg" title="k8s resource addition" />

:::caution
* The resource that fails to be created cannot see the resource type and resource name and does not support modification. It needs to be deleted and recreated.
* The created yaml file can support the writing of multiple k8s resources. The resources are divided by`---`before, and they will be disassembled and displayed after creation. :::

## Revise

1. Click the Edit button.

2. Modify the content of the yaml file.

3. After confirming that it is correct, click OK.

4. Check whether there are any resources that failed to be modified, and click View Details to view the specific failure reasons.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_update.jpg" title="k8s resource modification" />

:::caution
* It should be noted that after the yaml file is successfully created, there will be an extra line of content：`resourceVersion:xxxxxx`, which cannot be deleted during the modification process.
* When modifying the content of the yaml file, it only supports modifying the current resource, and does not support adding new resources in the yaml file. If you want to create a resource, please go to the creation logic. :::

## delete

1. After confirming that the resource is not needed, click the Delete button.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_delete.jpg" title="k8s resource deletion" />
