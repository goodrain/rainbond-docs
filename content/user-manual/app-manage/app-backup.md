---
title: 应用备份管理
description: Rainbond应用全量备份、迁移和恢复
hidden: true
---

## 应用备份恢复与迁移

应用的备份与恢复用于整个业务的整体备份与恢复，以及跨数据中心的应用迁移。

### 1.1 整个业务状态的快照备份与恢复

`备份` 对于生成环境的业务系统，我们需要对其进行定期的全量备份操作，过去我们针对数据单独进行备份，或对数据库进行单独备份。缺乏一种全局统一备份的机制，特别是对于分布式应用。Rainbond应用备份与恢复完成对业务系统的整体的、全量的备份，以实现整个系统故障时的全局回滚。这里所说的备份主要指冷备份，需要暂停业务服务，如需要不停止服务实习备份例如Mysql类的局部应用的热备份参考并使用mysql数据备份插件。
备份操作如下：

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/backup.gif" width="100%" />

备份操作分为`本地备份`和`云端备份`两种。

> 本地备份：将一组应用备份在本地，本地备份的应用无法进行跨数据中心和租户的迁移操作。
> 云端备份：需要配置sftp服务器和私有hub仓库才能进行云端备份，云端备份可以实现应用的跨数据中心和租户操作，并且还能支持该组备份的导出。目前企业版支持管理后台配置sftp和hub仓库的配置。

在5.0版本中新添加`全部备份`页面，进入后会展示出当前团队数据中心下的所有备份记录，以便清晰查看，同时也解决了之前版本应用有备份记录无法删除的问题。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1545546175984.jpg" width="100%">

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1545546337853.jpg" width="100%">



`恢复` 对于已经备份成功的一组应用，使用恢复可以将该组应用进行恢复操作。
恢复操作如下：
<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/recover.gif" width="100%">

> 恢复操作过程中请勿关闭恢复页面，否则可能会导致恢复失败。为了保证您的数据安全，恢复操作过程我们会生成一份您的备份应用的拷贝，您可以在恢复的最后一步中选择删除原有的应用。

- `导出备份` 导出备份会将会导出一份备份的数据，目前只有云端备份支持备份的导出。

- `导入备份` 在导出备份以后，您可以在别的云帮平台（可以访问网络）将导出的备份进行导入，导入后会生成相应的备份记录，您可继续后续操作。

#### 本地恢复后的注意事项

用户应用备份后在本数据中心恢复时，由于应用本身发生变化会导致非HTTP协议对外端口不再和原有一直。为了用户的应用备份后恢复后和原有端口一直，我们提供了修改非http对外端口的功能

 <img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/update-port.gif" style="border:1px solid #eee;max-width:100%" />

> 修改端口的实质是将该端口与原有的非http对外端口发生调换，所以可选的端口只能是已有的非http端口。


### 1.2 应用的跨租户和跨数据中心迁移

由于我们做到全局的全量备份，借助此我们可以做到应用的整体迁移，包括跨租户迁移和跨数据中心迁移。

在已经备份的情况下，可以选择迁移操作来进行应用的迁移
迁移操作如下：

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/migrate.gif" width="100%">

应用完成迁移以后，会跳转到对应的数据中心和租户以方便您查看迁移后的应用。