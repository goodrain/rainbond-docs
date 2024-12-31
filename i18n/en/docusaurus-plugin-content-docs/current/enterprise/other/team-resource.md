---
title: Group Resource Quota
description: Provide information on how to allocate resource limits to teams.
keywords:
  - Group Resource Quota
  - Team Resource Quota
---

In the use of the rainbond platform, in order to better manage and allocate resources, resource quota features have been added at the team level, setting the CPU or memory size that the team can use.

## Purpose

The establishment of resource quotas for each team ensures that the team can only use the resources allocated to it, thereby preventing interaction among the various teams before doing so.

In some cases, you may wish to limit the total amount of resources used in the entire cluster. By setting a resource quota for the team, you can ensure that each team does not exceed the amount of resources it is allowed to use, to control the use of the entire cluster.

If an application or service in a team takes too much resources, it may result in other team apps or services not working properly.By setting team quotas, it is possible to ensure that all components do not take up resources beyond the limit, thus preventing any impact on other team
.

## Main features

Controlling resources using：namespace quotas can help admins control the amount of resources used in specific namespace to avoid excessive use leading to failures or crashes in an application or system.

Allocation of：namespace resource quotas ensures that every app in a namespace has enough resources to run and limits its use when resources are not available.

Limiting resources away from：in multi-tenant settings, naming space resource quotas can limit tenant access to system resources and reduce resource leakages due to application failures or malicious behaviour.

Optimizing the use of：to allow managers and developers to better understand the use of the application resources and to optimize the use of the application resources by allocating appropriate resource quotas.

The following description of how to configure and after the configuration

## Manual

1. `Platform Manager -> Project/Team`, select team that needs resource quota

![description](https://static.goodrain.com/docs/enterprise-app/team-resource/team-resource.png)

2. Set the CPU or its memory. The default value is 0 for no limit.
   ![description](https://static.goodrain.com/docs/enterprise-app/team-resource/quota.png)

3. When creating components, build, launch, install, install, install, install and more, if memory or CPU exceeds the amount of remaining team resources, prompt resources to run out.

## Note

When the team sets the resource quota, the sum of all component resources (CPU and memory) running under the team cannot exceed the quota limit.When a user creates a component, if CPU and memory are not set for a component,
then the platform will set the component default `CPU=128m memory=512Mi` to ensure that a component does not monopolize all resources available in the namespace.
