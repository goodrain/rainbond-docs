---
title: App backup
description: Rainbond application full backup, migration and recovery
---

## Application backup, restore and migration

Rainbond currently provides an application-level full backup function, which is mainly used in two scenarios：

* The overall version backup of the application, including all attributes such as code and operating environment, persistent data, and component&application configuration.With a backup, the app can be restored to the backup version at any time.
* Application migration, complete migration of applications to other teams or other clusters.

The current design of the Rainbond backup function is a full-scale cold backup mechanism. Traditionally, our backup of components is mainly the backup of persistent data, such as the data of Mysql database.In the state of the microservice architecture, if only the data of a certain component is backed up, it is difficult to synchronously restore to the historical state in the event of a failure when the application contains multiple components.Our pursuit of application management must achieve application-level full backup.In the case of containerization, it is easy to back up the code and the operating environment, and we can easily do a hot backup of the operating environment of all components.But for persistent data, especially persistent data of stateful components, we cannot guarantee that the data can be safely backed up in working state.So Rainbond currently requires stateful components to be stopped when backing up applications.

In subsequent versions, we will support data hot backup of stateful components in the form of an operator, and then integrate it into the overall backup process of the application.Complete hot backup and regular backup of the application can be achieved.

## Backup method

Rainbond currently provides two backup methods, local backup and cloud backup.

**Local backup：** Applicable to the open source version, after the backup, the application can be migrated across teams, and the application can be completely migrated to other teams

**Cloud backup：** Support docking `Alibaba Cloud OSS` or `own Minio` , after backup, applications can be migrated across clusters, and can be restored anywhere with Rainbond platform, enabling rapid application migration.

## App backup

From the operation list of the application, you can enter the application backup management page. There are two types of backup operations: `local backup` and `cloud backup`.

### local backup

> A set of applications is backed up locally, and applications backed up locally cannot be migrated across data centers and tenants.

You only need to add backup and select the backup mode. Backup is an asynchronous process that takes different time depending on the number of components.The backup operation will be rejected if there are running stateful components under the application.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/backup.png)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/localbackup.png)

In versions 5.0 and later, the new`all backup`page is added. After entering, all backup records under the current team data center will be displayed for clear viewing. It also solves the problem that backup records cannot be deleted in the previous version of the application.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/backup02.png)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/allbackup.png)

### Cloud backup

:::tip
Tip：When using Alibaba Cloud OSS, the upload size is limited to 5GB, so an application with more than 5GB will report an error when uploading.
:::

In the enterprise view -> basic settings -> [object storage](/docs/use-manual/enterprise-manage/enterprise-settings/base/oss), configure the relevant information, you can use cloud backup

Cloud-backed applications can be exported with one click, and can be directly imported and installed in other Rainbond clusters.


## Backup recovery

Restore For a group of applications that have been backed up successfully, use restore to restore the group of applications.Recovery is usually an unsolvable problem with the current application. The recovery operation is as follows：

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/recovery.png)

> Do not close the recovery page during the recovery operation, otherwise the recovery may fail.In order to ensure the safety of your data, we will generate a copy of your backup application during the recovery operation. You can choose to delete the original application in the last step of recovery.

- `Export backup` Export backup will export a backup data, currently only cloud backup supports backup export.

- `Import backup` After exporting the backup, you can import the exported backup on other Rainbond platforms (with access to the network), and the corresponding backup record will be generated after importing, and the application can be quickly restored to the local.

**Considerations after local recovery**

After the application is restored, the gateway access policy needs to be manually configured by the user.

### import backup

Import backup is applicable to backup files exported by cloud backup, which is supported in Rainbond Enterprise Edition.

> Before importing, please make sure that the component does not exist in the group that needs to be imported

- Click Import Backup and select the file to be exported during cloud backup

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Import%20backup.png)

- After the import, it will prompt that the import was successful and generate a corresponding backup record.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Successful%20import.png)

At this point, the application can be restored to the current cluster, and operations such as`restoration`,`migration`and other operations can be performed.


## Application Migration

Since we do global full backup, we can do the overall migration of applications, including cross-tenant migration and cross-cluster migration; Cross-tenant and cross-cluster migration is not supported by the Rainbond open source version, but is supported by the enterprise version; supported by the open source version Cross-team migration under the same data center.

In the case of backup, you can select the migration operation to migrate the application.

Click the`Migrate`button, select the team and data center to be migrated to, and click`Migrate`to trigger the backup migration operation

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/transfer.png)

- If it is `cloud backup` , you can use cross-cluster migration application.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-manage/app-backup/Cross%20cluster%20migration.png)

After the application is migrated, it will jump to the corresponding data center and tenant so that you can view the migrated application.





