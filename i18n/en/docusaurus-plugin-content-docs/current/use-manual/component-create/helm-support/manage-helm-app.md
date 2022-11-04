---
title: 'Helm application management'
description: 'Manage Helm applications in Rainbond'
---

Follow the documentation to understand the management of Helm applications in the Rainbond platform, enabling developers or operators to manage and operate Helm applications.

### Helm application configuration

The Helm application configuration page provides a graphical interface to modify the contents of the `values.yaml` file. The bottom text box provides the`values.yaml` file preview function. If you need to modify the configuration, you need to define the needs in **Values configuration** Modified Key and Value.

- Example

Assuming that the mirror repository `bitnami/nginx` in the following figure needs to be changed to `library/nginx`, you need to define the key as `image.repository` in the **Values ​​configuration**, and the value as `library/nginx`, where the key Use `.` to distinguish in multi-level cases; after the definition, click Install or Update below to take effect.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_values_yaml.jpg" title="Configuration Page" width="100%"/>

### Helm Application upgrade rollback or reinstallation

After the Helm application is deployed, the version can be upgraded or rolled back on the **Upgrade** interface. The operation performed here is equivalent to the ` helm upgrade` and `helm rollback` command. It should be noted that the upgrade is directly upgraded to the latest version by default. Sometimes the latest version detection may fail. In such a case, it is recommended to go to reinstall and choose a version lower than the latest version to install.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_app_upgrade.jpg" title="Helm Application upgrade" width="100%"/>

The rollback operation is in the upgrade record of the upgrade interface

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_app_rollback.jpg" title="Helm Application upgrade" width="100%"/>
