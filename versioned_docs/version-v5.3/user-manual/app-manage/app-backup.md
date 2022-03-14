---
title: 应用备份恢复与迁移
description: Rainbond应用全量备份、迁移和恢复
Weight: 4004
hidden: true
---

### 应用备份、恢复与迁移

Rainbond 目前提供应用级的全量备份功能，主要用于两类场景：

- 应用整体的版本备份，包含代码和运行环境，持久化数据，组件&应用配置等所有属性。有了备份，应用即可随时恢复到备份版本。
- 应用迁移，将应用完整迁移到其他团队或其他集群。

Rainbond 备份功能目前的设计是全量的冷备份机制，传统意义上我们对组件的备份主要是对持久化数据的备份，比如 Mysql 数据库的数据。在微服务架构的状态下，如果只是备份某一个组件的数据，应用内包含多个组件时很难在出现故障的情况下同步恢复到历史状态。我们对于应用管理的追求必须要做到应用级的完整备份。在容器化的情况下，对于代码和运行环境的备份是容易的，我们可以方便的做到对所有组件的运行环境热备份。但是对于持久化数据，特别是有状态组件的持久化数据，我们不能保证在工作状态下将数据能够安全备份。因此 Rainbond 目前要求备份应用时需要停止有状态组件。

后续的版本中我们将以 operator 的方式支持有状态组件的数据热备份，然后接入应用整体备份流程中。即可实现对应用的完整热备份和定期备份。

### 备份方式

Rainbond 目前提供了两种备份方式，分别是本地备份及云端备份

**本地备份：** 适用于开源版本，备份后可将应用进行跨团队的迁移，将应用完整迁移到其他团队

**云端备份：** 支持对接 `阿里云OSS` 或 `自有Minio` ，备份后应用可进行跨集群的迁移，在任何具有 Rainbond 平台的地方均可进行恢复，可实现应用的快速迁移。

### 应用备份

从应用的操作列表中即可进入应用备份管理页面，备份操作分为 `本地备份` 和 `云端备份` 两种。

#### 本地备份

> 将一组应用备份在本地，本地备份的应用无法进行跨数据中心和租户的迁移操作。

只需要添加备份，选择备份模式即可，备份是一个异步的过程，且根据组件的数量的不同耗时不同。如果应用下存在运行中的有状态组件，将拒绝备份操作。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/backup.png" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/localbackup.png" width="100%" />

在 5.0 以后的版本中新添加`全部备份`页面，进入后会展示出当前团队数据中心下的所有备份记录，以便清晰查看，同时也解决了之前版本应用有备份记录无法删除的问题。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/backup02.png" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/allbackup.png" width="100%" />

#### 云端备份

> Rainbond 企业版本支持，将备份数据存储于云端。

提示：使用阿里云 OSS 时上传大小限制为 5GB，所以超过 5GB 的应用在上传时会报错。

- 在管理后台打开云端备份功能，填写相关信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/opening%20function.png" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Fill%20in%20information.png" width="100%" />

- 在控制台备份应用时即可选择云端备份

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Cloud%20Backup.png" width="100%" />

云端备份的应用可以一键导出，在其他 Rainbond 集群中可直接导入，安装使用。

### 备份恢复

恢复对于已经备份成功的一组应用，使用恢复可以将该组应用进行恢复操作。恢复通常是在当前应用出现不可解决的问题。
恢复操作如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/recovery.png" width="100%" />

> 恢复操作过程中请勿关闭恢复页面，否则可能会导致恢复失败。为了保证您的数据安全，恢复操作过程我们会生成一份您的备份应用的拷贝，您可以在恢复的最后一步中选择删除原有的应用。

- `导出备份` 导出备份会将会导出一份备份的数据，目前只有云端备份支持备份的导出。

- `导入备份` 在导出备份以后，您可以在其他的 Rainbond 平台（可以访问网络）将导出的备份进行导入，导入后会生成相应的备份记录，即可将应用快速恢复至本地。

**本地恢复后的注意事项**

应用恢复后网关访问策略需要用户手工配置。

#### 导入备份

导入备份适用于云端备份所导出的备份文件，云端备份在 Rainbond 企业版本中支持。

> 导入前请确保需要导入的组中不存在组件

- 点击导入备份，选择云端备份时导出的文件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Import%20backup.png" width="100%" />

- 导入后将会提示导入成功，并生成相应的备份记录

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Successful%20import.png" width="100%" />

此时即可将应用恢复至当前集群，并可执行`恢复`，`迁移`等操作。

### 应用迁移

由于我们做到全局的全量备份，借此我们可以做到应用的整体迁移，包括跨租户迁移和跨集群迁移；跨租户和跨集群迁移 Rainbond 开源版暂不支持，企业版提供支持；开源版本支持同数据中心下的跨团队迁移。

在已经备份的情况下，可以选择迁移操作来进行应用的迁移。

点击`迁移`按钮，选择要迁移到的团队及数据中心，点击`迁移`即可触发备份迁移操作

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/transfer.png" width="100%" />

- 企业版在迁移时可选择不同集群，跨 Rainbond 集群迁移

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Cross%20cluster%20migration.png" width="100%" />

应用完成迁移以后，会跳转到对应的数据中心和租户以方便您查看迁移后的应用。
