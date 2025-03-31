---
title: Upgrade
Description: Introduction to the upgraded versions of Rainbond installed via host and via Helm
keywords:
  - Rainbond version upgrade
---

:::info
Version v5 cannot be directly upgraded to version v6. Please install version v6 from scratch and then migrate the applications from version v5 to the new environment.

1. In version v5, publish the application to the local component library via `Application View -> Application Publish -> Publish to Local Component Library`, and then export the application in `Platform Management -> Application Market`.
2. In version v6, import the application into version v6 via `Platform Management -> Application Market -> Import Application`.
3. If a database application is deployed, the database needs to be manually migrated.
  :::

## Overview

Rainbond supports visualized online upgrade, through which the Rainbond version can be quickly upgraded.All installation methods support online upgrade.

## Online upgrade

:::tip
If there are multiple clusters, all will be upgraded.
:::

In **Platform Management -> Enterprise Settings -> Version Upgrade**, you can view the current Rainbond version and the latest version. Click the **Go to Update** button to start the upgrade.

During the upgrade process, Rainbond will perform the following operations:

1. Rolling upgrade of Rainbond component images
2. If there are SQL changes, they will be automatically executed

## Offline upgrade

:::info
Only applicable to offline installation environments.
:::

1. Prepare the new version image of Rainbond in advance in a networked environment, replace `<version>` with the version number to be upgraded.`<version>` can be viewed in [Rainbond Release](https://github.com/goodrain/rainbond/releases).

```bash
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-api:<version>
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-chaos:<version>
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-mq:<version>
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-worker:<version>
```

2. Edit the `rbdcomponent` CRD resource, replace the image address in the `spec.image` field with the offline image address.

```yaml
$ kubectl edit rbdcomponent -n rbd-system rbd-app-ui
spec:
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>
```

3. Components such as `rbd-api`, `rbd-chaos`, `rbd-mq`, `rbd-worker` should also replace the image address, repeat the above steps.
4. Log in to Rainbond to check whether the version number on the homepage has been updated to the new version.

## Version change log

You can view the specific changes of each version in [Historical Version Change Log](https://github.com/goodrain/rainbond/releases).

