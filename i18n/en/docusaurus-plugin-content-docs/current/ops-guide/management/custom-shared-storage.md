---
title: Custom shared storage
description: Support to configure the StorageClass resource used for shared storage.
weight: 1003
---

If no storage is specified during the installation of the Rainbond platform, NFS will be installed to cluster by default, using NFS as a platform storage, simplifying deployment and configuration processes, allowing users to quickly build up and start using the Rainbond platform.However, depending on the default NFS may not be able to meet all scenarios in the face of different storage needs in different scenarios.In order to provide greater flexibility and adaptability, Rainbod introduced the storage function used in custom configurations, which is meant by the following aspects of：

- Different applications and businesses may require different storage requirements for：, some may require high-performance blocks, some may require large object storage, and others may require simple file sharing.By supporting the storage used by custom configurations, users can choose a storage solution that is better suited to their specific needs.

- Providing higher performance and reliability：NFS may not be able to provide sufficient performance or reliability in some cases.By selecting other storage options, such as Ceph, GlusterFS, cloud storage, users can obtain higher performance and better data reliability and thus better support their business.

- Support for cloud and mixed cloud scenarios：in the cloud of origin, where companies often deploy applications in different cloud manufacturers or private cloud settings, and therefore need to support clouds and mixed cloud scenarios.By customizing the storage configuration, users can store the app data in the object storage of multiple cloud servers, achieving high availability and flexibility.

- Future developments and extensions of：may change over time as users grow and business grows.By supporting the storage used for custom configurations, Rainbond is better able to adapt to future developments and extensions.

### Precondition

- Determines that Rainbond version is greater than or equal to v5.14.3.

**Note that：** \* 5.14.3 updates were made to previous versions, if this parameter sharing storage is unavailable, backup data and upgrade.

- Determines the store storageclass name.

### Configuration

Edit rbd-walker for rbdcomponent type resources

```
kubtl edit rbdcomponent rbd-walker-nrbd-system
```

Add a downstream to the specified field

```
spec:
  args:
  - --shared-storageclass=your custom store store name
```
