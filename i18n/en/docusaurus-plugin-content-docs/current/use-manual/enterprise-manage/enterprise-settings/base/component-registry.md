---
title: Local component library mirror warehouse
description: Used to store the application model image published to the component repository, which needs to be accessible by all clusters
---

## Function description

Used to store the application model image published to the component repository, which needs to be accessible by all clusters.

## Applicable scene

Each Rainbond cluster will install the default image repository `rbd-hub`, which can only be accessed inside the k8s cluster. All images of the current cluster will be synchronized to this image repository, including the published application model image of the local component library.

When the console is connected to multiple Rainbond clusters, the application is published in the A cluster to the local component repository. If the synchronized mirror repository address is not configured, it will be synchronized to the default mirror repository, and the B cluster cannot be downloaded from the local component repository. library to install this app.


## Operating procedures

Enter`Enterprise View`-->`Settings`interface, and open the internal component library mirror warehouse button.


|                   | mirror repository information          |
|:----------------- | -------------------------------------- |
| Warehouse Address | Custom, such as：hub.xxx.com (required) |
| Namespaces        | Custom, such as：goodrain               |
| username          | customize                              |
| password          | customize                              |



![Component library](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-1.png)

![information](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-2.png)














