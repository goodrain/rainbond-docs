---
title: Migration Console
description: This document describes the high availability of the console, applicable to migrating the console from the trial environment to a high-availability cluster environment.
keywords:
  - Rainbond Console High Availability Installation
---

:::tip
If your Rainbond cluster was installed via Helm Chart, then there is no need to migrate the console, and the operations described in this document are unnecessary.
:::

The Rainbond console installed via [Quick Installation](/docs/quick-start/quick-install) is started by Docker and cannot achieve high-availability deployment. This document describes how to migrate the Docker-started console to run as a POD in the K8s cluster.

## Prerequisites

- [Quick Install Rainbond](/docs/quick-start/quick-install) and connect to the cluster installed via [Host Installation](/docs/installation/install-with-ui/).

## Start New Console

:::warning
The Rainbond console installed via quick installation provides a built-in cluster by default. If you have created applications in the built-in cluster, please migrate all applications to the connected cluster.

You can use the `Application View -> Quick Copy` feature to migrate applications from the built-in cluster to the connected cluster.Data generated after application needs to be migrated by yourself, such as databases.
:::

To start a new Rainbond console in the connected K8s cluster, please use the [kubectl](https://docs.rke2.io/reference/cli_tools) command-line tool on the management node to execute the following commands.`<version>` can be viewed in [Rainbond Release](https://github.com/goodrain/rainbond/releases).

```yaml title="kubectl apply -f rbd-app-ui.yaml"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: rbd-app-ui
  name: rbd-app-ui
  namespace: rbd-system
spec:
  env:
  - name: DB_TYPE
    value: mysql
  - name: IS_STANDALONE
    value: "false"
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 1
```

By default, the `rbd-db` database is used. If you need to use an external database, please modify the `rainbondcluster` resource.

```yaml title="kubectl edit rainbondcluster -n rbd-system"
...
spec:
  ...
  uiDatabase:
    host: 172.20.251.90
    name: console
    password: Root123456
    port: 3306
    username: root
```

## Backup and Restore Console Data

### Backup Old Console Data

In the old console's `Platform Management -> Settings -> Database Backup`, add a backup and then download it.

### Import Backup to New Console

In the new console's `Platform Management -> Settings -> Database Backup -> Import Backup`, import the backup successfully and then click `Restore`.After successful restoration, you need to `Logout` and log in using the old console's account information.

At this point, the **built-in cluster** no longer exists in the new console. You need to delete the **built-in cluster** in `Platform Management -> Clusters`.

:::danger
After the console migration, the built-in cluster will no longer be available. Please ensure that there are teams in the console that can be normally accessed after restoring the backup. Otherwise, the corresponding team will not be matched during login, resulting in login failure.
:::