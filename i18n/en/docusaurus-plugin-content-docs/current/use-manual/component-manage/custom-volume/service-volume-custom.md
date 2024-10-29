---
title: Component Custom Storage Settings
description: Rainbond component custom storage management documentation
---

### Why do components need custom storage

The previous document [Component Storage Settings](./index.md) mentioned several storage types that Rainbond supports by default. Different enterprises and different businesses have different storage requirements.For example, the big data business needs high-performance storage, etc.Rainbond implements the requirements of custom storage types. Users can install custom storage types for Rainbond to use, which can well solve the high-performance storage requirements that Rainbond's default storage types cannot meet.

### Implementation principle

Before understanding the implementation principle of Rainbond custom storage type, you need to understand the dynamic provisioning storage function implemented by kubernetes through storageClass.

On the basis of kubernetes' dynamic provision of storage, Rainbond is combined with the existing storage of the Rainbond platform to support user-defined storage types for components on the Rainbond platform.

- Creation of custom storage types

The creation of custom storage types needs to consider the different storage types, and combine the characteristics and configurations of various storage types to implement the definition of resources in a unified manner.Kubernetes abstracts the resource definition of storageClass for this requirement, and Rainbond abstracts the definition of Rainbond's storage type on the basis of kubernetes. Users can customize the storage type through the Rainbond platform. After activation, the corresponding storageClass will be generated for console users. The storage module selection in component management is used.

- creation of storage

The Rainbond platform will detect the storageClass resource existing in the kubernetes cluster, and regard the storageClass resource object as a user-defined storage type for the Rainbond console component to choose and use.

After the user selects a custom storage type of the corresponding storageClass type in the component storage management of the Rainbond console, it is necessary to restart or upgrade the component to make the storage change take effect.At this point, the Rainbond cluster component rbd-worker will find the corresponding storageClass according to the selected storage type, and generate the corresponding pvc according to the user's storage requirements, and mount it on the pod instance corresponding to the component.

After the driver creates the pv according to the pvc, the pvc and the pv will form a one-to-one binding relationship. At this time, the pvc state is the bound state, and the instance that mounts the pvc will continue to the next step of the life cycle.Otherwise, the unbound state of pvc will prevent the normal creation of pod instances, and it is difficult to achieve the normal operation of the Rainbond component.

- storage recycling

Storage reclamation occurs when a component is deleted. The storage created by the specified storageClass will choose whether to reclaim the storage when the pvc is deleted, restore the storage and keep it, or do nothing according to the storage reclamation policy corresponding to the storageClass.

When adding a storage type, users can specify the corresponding storage reclamation policy by themselves.However, Rainbond will only delete the pvc corresponding to the component when the component is deleted. The deletion of the pvc means that the storage bound by the pvc will be selected according to the recycling strategy of the storageClass.

### How to add storage

For connecting ceph block storage to Rainbond platform, please refer to [Rainbond platform connecting ceph-rbd block storage](https://t.goodrain.com/d/8324-rook-ceph-v18)

### Custom Storage Defects

#### limited use

Different storage types have different storage service support. For example, block storage, file storage, and object storage have different read-write modes. The read-write mode of single-read-single-write can only be linked once and cannot share read and write.Currently, the Rainbond platform only opens custom storage for stateful components, and custom storage types cannot be shared with other components.

#### Backup and Migration of Storage

The implementation of custom storage is completely dependent on kubernetes. When the storage is mounted, it will only be mounted to the host corresponding to the instance, not the cluster sharing. The Rainbond platform cannot well obtain the data of the custom storage and perform data backup when performing component backup. , so the Rainbond platform currently skips data backup for components that use custom storage, and only backs up the storage type used by the component.

### Custom storage options

The Rainbond platform will record the storage type used by components during application sharing and backup. When an application using a custom storage type is migrated to other clusters or installed to other clusters by sharing installation, the storage type cannot be found. Case.In response to this abnormal situation, the Rainbond platform has designed a set of optimal storage type selection logic.When the corresponding storage type cannot be found, the Rainbond platform will select the storage type that is most suitable for the component according to the component type and storage expectations, and the Rainbond shared storage is selected by default.

> The selection of the optimal storage type will carry out more detailed optimization iterations in the later stage, and will comprehensively consider the storage read-write characteristics, sharing characteristics, backup and recovery strategies and other related characteristics to jointly determine the correct and fastest storage type.
