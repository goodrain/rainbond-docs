---
title: 'Helm application management'
description: 'Manage Helm applications in Rainbond'
---

Follow the documentation to understand the management of Helm applications in the Rainbond platform, enabling developers or operators to manage and operate Helm applications.

### Helm application configuration

The Helm application configuration page provides a graphical interface to modify the contents of the `values.yaml` file. The bottom text box provides the`values.yaml` file preview function. If you need to modify the configuration, you need to define the needs in **Values configuration** Modified Key and Value.

- Example

Assuming that the image Tag `8.0.25-debian-10-r37` in the following figure needs to be modified to `8.0.25-debian-10-r38`, the key needs to be defined in **Values configuration** as `image.tag`, The value is `8.0.25-debian-10-r38`, and `.` is used to distinguish the key in multi-level cases; after the definition, click Install or Update below to take effect.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/manage-helm-app/configuration_page.jpg" title="configuration page" width="100%" />

### Helm app upgrade

After the Helm application is deployed, the version can be upgraded or rolled back on the **configuration** interface. The operation performed here is equivalent to the `helm upgrade`` helm rollback` command. It should be noted that during the upgrade or rollback process, if you need to To operate the data, users need to handle it by themselves during the upgrade or rollback process.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/manage-helm-app/helm_app_upgrade.jpg" title="Helm app upgrade" width="100%" />

Application upgrade or rollback related records will be displayed on the upgrade page on the left side of the page.
