---
title: One-click online/rollback based on Rainbond
description: This best practice explains the one-click online/rollback of applications based on Rainbond.
---


In the actual production environment, due to business upgrades, the code needs to be rolled back when an accident occurs. Rainbond implements a one-click rollback of the release version. For different business scenarios, the rollback function can be used to quickly roll back the application in the event of an accident. Roll back to the previous version to reduce business losses; Rainbond supports one-click quick rollback of a single component in the application, and also supports simultaneous rollback of multiple components in the application.


## One-click quick rollback of components

Quickly roll back components to any previous builds that succeeded

### Preconditions

The deployed Nginx sample service component is built through a Docker image, and the image address is `nginx:1.11`.

### Steps

1. On the component build source page, modify **image name** to `nginx:1.12` and rebuild it;

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/source.jpg" width="100%" />

2. Enter the container through **Web terminal** and check the nginx version;

```bash
$ nginx -v
nginx version: nginx/1.12.2
```
3. On the component overview page, click **to view more versions**to view the history of previous build versions;

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/version.jpg" width="100%" />

4. Click the **rollback** button to enter the rolling update process and roll back to any previous version.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/rollback.jpg" width="100%" />

### Show results

Enter the container through  **Web terminal** and check the nginx version, which has returned to the previous version

```bash
$ nginx -v
nginx version: nginx/1.11.13
```


## One-click online/rollback based on version number

### Overview

The following content is for the scenario where the application is upgraded and launched through the shared library

Specific process：

1. Test the application in the test environment and publish it to the shared library after the test is complete.
2. One-click installation of the application in the production environment, as a production application,
3. The simulated test environment application is upgraded and republished to the shared library, defining a new application version,
4. Upgrade the production application in the production environment and simulate a rollback operation after the upgrade fails.

### Preconditions

Done [Publish the app as an app template](/docs/use-manual/get-start/release-to-market/) , have an app installed based on the sample app template

### Steps

1. Simulate the code changes in the test environment, publish the application to the shared library again after building, define the application version 2.0,

2. After the release is completed, the application upgrade interface in the production environment will prompt that the current application can be upgraded, click the upgrade button to upgrade,

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/upgrade.jpg" width="100%" />

3. On the upgrade interface, view **Cloud City application upgrade records** , click to view the component details, and click the **Rollback** button to roll back the upgrade operation with one click.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/rollback02.jpg" width="100%" />


