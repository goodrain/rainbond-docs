---
title: Helm Application Management
description: Manage Helm applications in Rainbond
---

Follow the documentation on the management of Helm on the Rainbond platform to enable developers or developers to manage and ship VWHelm apps.

### Helm App Configuration

The Helm Application Configuration page provides a graphical interface that can modify the contents of the `values.yaml` file. The bottom text box provides the `values.yaml` file preview feature. If you need to modify the configuration it needs to define the keys and values to be changed in the **Values configuration**.

- Example

Assuming that the image repository `bitnami/nginx` in the following graph should be changed to `library/nginx`, the key is defined as `image.repository`,value as `library/nginx` in the \*_Values configuration_,' where the key is differentiated by `.` where the key is multiple and the installation or update below will take effect.

<img src="https://static.goodrain.com/docs/5.10/helm_values_yaml.jpg" title="配置页面" width="100%"/>

### Helm app upgrade to roll back or reinstall

When the Helm app is deployed and ready to update or roll back versions on the **Upgrade** interface. The actions are equivalent to `helm upgrade` and `helm rollback` commands that need to be updated by default to the latest version, sometimes the latest version detects may not be passed. In this case, it is recommended to re-install versions that choose to install versions that are less than the latest version.

<img src="https://static.goodrain.com/docs/5.10/helm_app_upgrade.jpg" title="Helm应用升级" width="100%"/>

Rollback is in the upgrade history of the upgrade screen

<img src="https://static.goodrain.com/docs/5.10/helm_app_rollback.jpg" title="Helm应用升级" width="100%"/>
