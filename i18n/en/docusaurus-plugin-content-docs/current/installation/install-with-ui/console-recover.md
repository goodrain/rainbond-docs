---
title: "console migration"
description: "This document describes the console migration method, which is suitable for migrating the console from the experience environment to the high-availability cluster environment."
---

We recommend that you migrate the single-machine deployment console to Rainbond for management after you have completed the deployment of Rainbond and clusters through rapid deployment and have basically experienced Rainbond.

### Deploy the console to Rainbond

> Before starting the deployment, please ensure that the remaining memory resources of the cluster are greater than <b>2GB</b>.

First, still access the Rainbond console and create a`system service`team to deploy system applications.Enter the team space and select Add to create a component based on the application market.Search`rainbond` in the open source app store to find`Rainbond - open source`apps.

> Please note that if you have not completed the application store binding, please register and log in the cloud application store account in the enterprise view application store management.

![image-20210220194607418](https://static.goodrain.com/images/5.3/get-rainbond-app.png)

Click Install, select the latest version (5.3.0 is the latest version that supports this deployment mode), and complete the deployment of the Rainbond console.After the console starts successfully, you can access the new console through the default domain name.Complete the registration of the administrator account in the new console to enter the data recovery page.

> Please note that if you need to use a cloud database or a self-built high-availability database, you can add an external database through a third-party component and replace the Mysql database component in the installed application.The connection variable information in the third-party component needs to be consistent with the Mysql component.

> Both Rainbond-UI and Rainbond-console components can be scaled horizontally.

### Back up the data of the old console

Go back to the Enterprise View->Settings page of the old console and switch to the data backup page.as shown below：

![image-20210221110158065](https://static.goodrain.com/images/5.3/data-backup.png)

Click`to add backup`to backup the latest data of the old console.

![image-20210221110748507](https://static.goodrain.com/images/5.3/down-backup-date.png)

After the backup is successful, a backup record will appear as shown in the figure above. Click Download to download the backup data to the local backup.

> If there is no response to the click to download, it may be that your browser (such as Google) has rejected the download action, please change your browser and try again.

### Import data to the new console

Visit the new console deployed in Rainbond, and also go to the data backup page, click Import Backup, and upload the backup data downloaded in the previous step.

> Note that it is important to ensure that the source console version of the backup data is the same as the new console version.

After the upload is successful, click`to restore`to import the data into the new console.After the recovery is successful, you need to log out`and log in with the account information`the old console.You will find that the data has been migrated successfully.

> Please note that if the platform automatically logs out after recovery, please re-visit the new console domain name, do not carry the path path, and log in with the account of the old console.Because historical data has expired.

Now that the console migration has been completed, you can use the platform gateway policy management to bind your own domain name or TCP policy to the console.[Reference Document](/docs/use-manual/team-manage/gateway/rules/domain/)

> Please pay attention to regularly backing up the platform data to facilitate the off-site recovery of console services in an emergency.

> Please remember the`grctl service get` query command on the scaling management page for all components of the console, which is helpful to operate the component on the cluster side in an emergency.

### Known Issues

* After the console is migrated, the installation cluster information will not be restored when restoring the backup. You need to manually copy the cluster installation information.

  * 1. Install [grctl](/docs/ops-guide/tools/grctl) tool.

  * 2. Enter the`cluster to install the driver service` component > Scale and copy`grctl`query command, and execute the query command to find `/app/data` on the server.

  * 3. Copy the data from `to /rainbonddata/cloudadaptor/enterprise` to the storage path of the previous step `, the cluster installation driver service` component.

  * 4. Enter the enterprise view  > cluster > node configuration, if the node information exists, it is successful.

