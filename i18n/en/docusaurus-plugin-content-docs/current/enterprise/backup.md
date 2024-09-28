---
title: Corporate Backup
description: Introduction to enterprise backups on the platform
---

## Introduction

For data security on the platform, Rainbond Enterprise version provides a full backup of applications mainly for two types of：

- Apply the entire version backup, including code and operating environment, persistent data, components & app configurations, etc.With a backup, the app can be restored to the backup at any time.

- Apply migration to migrate to other teams or other clusters.

## Main features

Rainbond currently provides two backups, local and cloud backups respectively.The backup function is currently designed as a full-volume cold backup mechanism, and in the traditional sense our spare parts for components are mainly for persistent data, such as data from the Mysql database.In the state of the microservice architecture, it is difficult to synchronize the history state when multiple components are included in the application if there is a malfunctioning if only data from a component is backed up.Our quest for app management must have a full backup of the app level.

In the case of packaging, backups of code and operating environments are easy, and we can easily do a hot backup of the operating environment for all components.However, for persistent data, especially for existing state components, there is no guarantee that data can be safely backed up while working.Rainbond is therefore currently required to stop having a status component when backing up the app.In the subsequent version, we will support data hot backups with state components as operator, then go into the application overall backup process.Complete hot and regular backups for apps will be implemented.

### Local Backup

Rainbond Enterprise version supports local backups. Users can backup applications locally and migrate across teams.Local backup apps cannot migrate across data centres and renters.

### Cloud Backup

Rainbond Enterprise Edition supports the S3 Protocol object storage in conjunction with Alinea OSS or Ho Minio etc. Backup apps can migrate across clusters and can be restored wherever there is a Rainbond platform and quick migration of applications.

## Manual

### Local Backup

1. Use the app action list to access the app backup management page, and select a local backup, where a set of apps is backed up locally. Local backup apps cannot migrate across data centres and renters.
2. Simply add a backup, select the backup mode and the backup is an asynchronous process depending on the number of components.Backup action will be denied if the active state component exists in the app.

### Cloud Backup

1. Set up cloud backup connection information in platform manager, Settings-Object storage.Note that upload size limit is 5GB when using Alicloud, so over 5 GB apps will report errors when uploading
2. Go to the app backup management page from the app action list and select cloud backups
3. A cloud backup app can be exported by one click and can be imported directly in other Rainbond clusters.

### Backup recovery

Restore a successful set of apps that have been backed up. Use the recovery to restore the group app.Recovery is usually an unsolved problem in the current app. Restore the following：

1. Do not close the recovery page during the recovery operation, otherwise recovery may fail.To ensure your data security, we will generate a copy of your backup app. You can select to delete the original app in the final step of recovery.
2. Exporting backups from：will export a copy of the backup, which is currently only supported by the cloud backup.
3. After exporting backups：, you can import the exported backups on other Rainbond and then generate the corresponding backups to quickly restore the app to the local location.

### Apply Migration

Since the platform supports the application of a full global backup, we can do the overall migration of the app, the enterprise version supports cross-tenant migration and cluster migration;

1. When backed up, the migration operation can be selected to migrate the application.
2. Click on the Migration button, select the team and data center to migrate to. Click on the Migration to trigger the backup migration
3. Enterprise versions can select different clusters when migrating across Rainbond clusters
4. Once the app has migrated, it will jump to the corresponding data center and tenant to facilitate your view of the migration app.
