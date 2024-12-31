---
title: 存储文件管理
description: 可视化管理组件的共享存储。
keywords:
- 存储文件管理
- file manage
---

在集群中部署的业务需要进行数据持久化，想要对数据进行管理，那么需要操作挂载存储目录，流程比较繁琐，存储文件管理将文件目录进行可视化，可以很轻松对存储里面的文件进行管理，提升效率。

### 主要功能

主要功能包括文件目录展示，支持各种文件的上传，下载等

#### 上传

- 部署在平台中的服务，如果想在容器中添加和服务有关的配置文件或其他文件，去服务器中管理挂载存储就会很麻烦，这里直接可以选择目录，将本地文件直接通过上传功能就能保存到挂载存储中。

#### 下载

- 如果挂载存储中的一些文件想要重复利用，或者想查看具体信息，可以直接通过下载功能保存到本地。

![description](https://static.goodrain.com/docs/enterprise-app/file-manage/file-manage.png)


#### 上传记录展示
- 如果担心上传文件会给挂载存储带来安全隐患，在执行完毕后组件操作记录当中会展示上传信息。

![description](https://static.goodrain.com/docs/enterprise-app/file-manage/upload-event.png)


## 使用手册

### 特殊存储的使用

对于一些特殊存储，目录结构会有所差异，导致系统无法直接找到挂载存储路径，所以需要一些配置才能更好的使用。

#### 阿里云高效云盘

如果存储类型是阿里云高效云盘，那么在rbd-node组件中需要挂载相应的块存储路径，操作如下：

1. 编辑操作 rbd-node 资源

`kubectl edit rbdcomponent rbd-node -n rbd-system`

2. 配置volume 和 volumeMounts

```yaml
volumes:
  - hostPath:
      path: /var/lib/kubelet/pods
      type: DirectoryOrCreate
    name: blockstorage
volumeMounts:
- mountPath: /var/lib/kubelet/pods
  name: blockstorage
```

3. 对于 volumes 字段中的 hostPath，根据不同类型的集群挂载对应的路径（kubelet根路径）

|集群类型|挂载路径|
|----|----|
|普通集群| /var/lib/kubelet/pods|
|阿里云ACK| /var/lib/container/kubelet/pods/|

也可以使用 `kubelet --root-dir=/var/lib/kubelet/pods` 命令去指定 kubelet 的根目录路径
