---
title: Console height available
description: This document describes the high level of the console available for the experience of the migration console to the high available cluster environment.
keywords:
  - Rainbond Console High Installation Available
---

:::tip
If your Rainbond cluster is installed via Helm Chat, the console is high and does not need to operate on this document.
:::

A console that is installed on the host, which is launched by Docker and cannot be deployed in a high usable, will need to be migrated to the Docker startup console into the cluster. This document details how the Docker enabled console will be migrated to the cluster to run as POD.

## Prerequisite

- Rainbond Console is deployed via Alline.
- A high number of available Rainbond clusters has been installed
- Make sure the resource in the cluster is greater than 2GB
- Installed [grctl](/docs/ops-guide/tools/grctl) tools

## Deploy Console in Cluster

### Background

A console that is installed on the host, launched by a docker and unable to achieve high-availability deployments, will need to relocate the dock-enabled console to the cluster. This document details how to move the dock-enabled console to the cluster.

### Achieve Intro

:::tip

1. Spawn a rbd-app-ui template of rbdcomponent resource type.
2. Parse the parameters that command carries and render to the rbdcomponent template of the rbd-app-ui resource type, and create the resource in the cluster.
3. rainbond-operator detects the creation of rbdcomponent type rbd-app-ui to get information from rbdcomponent type rbd-app-ui (env, label, arg ...)
4. Create a service and ingresses resource to implement an external exposure port.If you set the `-p` in the command to select the port to be exposed, it will take effect in the service and address resources created.
5. Start a job type resource, job will be done to initialize the database and create the rbd-app-ui of employment resource type.The rbd-app-ui default uses rbd-db as console database and switch to an external database if external database connection is specified via `-e`.
   :::

### grctl migrate support parameters

| Parameters | Use                   | Default value                                                                                                                                                               |
| ---------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| port/p     | External Access Port  | 7070                                                                                                                                                                        |
| env/e      | Environment Variables |                                                                                                                                                                             |
| arg/a      | Parameters            |                                                                                                                                                                             |
| replicas/r | Number of Instances   | 1                                                                                                                                                                           |
| image/i    | Console Image         | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbon:v5.17.3-release-allinone |

### Use grctl migration commands

```bash
grctl migrate -i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone - p 7071 -r 1

```

:::info
Once the migration is completed, the `rbd-app-ui` POD will be launched in the `rbd-system` namespace, waiting for Running to access the new console via the gateway IP:7071.
:::

### Specify external database

Use `rbd-db` by default if an external database is not specified. To specify an external database for the console, use `-e MYSQL_HOST`...

```bash
grctl migrate -p 7071 -r 1 \
-i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone \
-e MYSQL_HOST=127.0.0.1 \
-e MYSQL_PORT=3306 \
-e MYSQL_USER=root \
-e MYSQL_PASS=123456 \
-e MYSQL_DB=console
```

### grctl migrate parameter description

| Parameters  | Use                   | Default value                                                                                                                                                               |
| ----------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -p,port     | External Access Port  | 7070                                                                                                                                                                        |
| -e,env      | Environment Variables |                                                                                                                                                                             |
| -a,arg      | Parameters            |                                                                                                                                                                             |
| -r,replicas | Number of Instances   | 1                                                                                                                                                                           |
| -i,image    | Console Image         | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbon:v5.17.3-release-allinone |

## Backup console data

### Backup old console data

In the old console.**Platform Admin -> Settings -> Database Backup**, add backups and download.

### Import backups to new console

In the new console.**Platform Admin -> Settings -> Database Backup -> Import Backup -> Import Backup**, click `Reset` after the import is successful.You will need to `exit login` after your recovery and login with your old console.

## Known Issue

After the migration console, the Kubernetes cluster information installed from the host will not be restored when the backup is restored. Manual copy of cluster installation information.

```bash
export APP_UI=`kubectl get pod -n rbd-system |grep rbd-app-ui|grep Running|awk '{print $1}'`
kubectl cp ~/rainbonddata/cloudadaptor/enterprise $APP_UI:/app/data/cloudadaptor -n rbd-system
```

Enter Enterprise View > Cluster > Node Configuration, node information exists successfully
