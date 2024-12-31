---
title: GPU shared support
description: GPU share
keywords:
  - GPU Sharing
  - GPU share
---

GPU shared support means that multiple users can share the same GPU resource, not that each user needs separate GPU resources.This sharing support is usually implemented by GPU virtualization technology that divides a physical GPU into multiple virtual GPU, each of which can be assigned to a different user.

## Main features

### Cost savings

- Multiple users can share the same GPU, thereby saving hardware costs while reducing energy consumption and maintenance costs.

### Improved utilization of resources

- If a GPU is used by only one user, the GPU will be idle for most of the time.But if multiple users share the same GPU, its utilization will increase and better meet the needs of more than one user.

### Improve Performance

- Since GPU virtualization technology allows a physical GPU to be split into multiple virtual GPU, each virtual GPU can be assigned to a different user.This means that different tasks that operate on the same GPU can be carried out in parallel, thus enhancing overall performance.

### Easy to manage

- The GPU virtualization technology provides more flexible resource management, and administrators can assign different virtual GPUs to different users and can increase or reduce the number of virtual GPUs at any time depending on the user's needs.Better monitoring and management tools could also be provided to facilitate the management and maintenance of GPU resources by administrators.

## Manual

To use GPU in a cluster, some additional configuration actions are required, first to install GPU drives and GPU support components at each node when Docker or other containers are running, and then to add GPU resources to the resource pool in the Kubernetes cluster.Next, you need to specify GPU requests and restrictions in the Pod definition file of the container, so that Kubernetes can manage and control the use of the container's GPU resources.
Using the Rainbond platform allows resource management directly via the visualization community of the GPU, supports the components setting up the required GPU for their intelligent allocation.
