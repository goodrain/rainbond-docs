---
title: Storage file management
description: Shared storage of visualized management components.
keywords:
  - Storage file management
  - file size
---

The operations to be deployed in the cluster require data permanence and to manage the data will require the operation of the mounted storage directory, the cumbersome process, the storage of files will visualize the files directory, which can easily manage the files in the storage and enhance efficiency.

### Main features

Main features include file directory display, support for uploads, downloads, etc.

#### Upload

- Services deployed to the platform. Manage mount storage on the server is troublesome if you want to add profiles or other files related to the service in the container. Here you can directly select a directory where local files can be saved to the mount store by uploading them directly via the upload.

#### Download

- If some files in mount storage want to reuse, or want to view specific information, they can be saved directly to local location via download features.

![description](https://static.goodrain.com/docs/enterprise-app/file-manage/file-manage.png)

#### Upload record display

- If it is feared that uploading the file will cause a security risk to the mount storage, the upload information will be displayed in the component operation record after it is done.

![description](https://static.goodrain.com/docs/enterprise-app/file-manage/upload-event.png)

## Manual

### Use of special storage

For some special storage, the directory structure will differ, so the system will not be able to directly find mount storage paths, so some configuration is needed to better use.

#### Aliyun Efficient Cloud

If the storage type is an Aliyun efficient cloud, the block storage path needs to be mounted in the rbd-node component as follows：

1. Edit action rbd-node resource

`kubtl edit rbdcomponent rbd-node --n rbd-system`

2. Configure volume and volumeMounts

```yaml
volumes:
  - hostPath:
      path: /var/lib/kubelet/stages
      type: DirectoryOrCreate
    name: blockstorage
volumeMounts:
- mountPath: /var/lib/kubelet/stages
  name: blockstore
```

3. For hostPath in volumes field, path to mount according to different types of clusters (kubeletroot path)

| Cluster type     | Mount Path                       |
| ---------------- | -------------------------------- |
| Regular clusters | /var/lib/kubelet/methods         |
| Aliyun ACK       | /var/lib/container/kubelet/pods/ |

Use the `kubelet --root-dir=/var/lib/kubelet/pods` command to specify the root path of kubelet
