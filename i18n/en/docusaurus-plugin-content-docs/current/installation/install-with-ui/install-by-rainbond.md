---
title: "Access to the installed platform cluster"
description: "Access to the installed platform cluster"
weight: 1001
---

This method is suitable for the deployment of the Rainbond cluster that has been completed, and you want to access the console for application scheduling management.

### Preconditions

- The cluster server`8443`port and the console network remain unblocked;
- [grctl command line tools](/docs/ops-guide/tools/grctl)installed.

## Install and deploy

- On the cluster page, select `to access the installed platform cluster`


<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/from-rainbond.jpg" title="Access to the installed platform cluster" width="100%" />

- Fill in the cluster ID, cluster name and content of the Region Config file

The way to obtain the content of the Region Config file is as follows：

Execute the following command on the node where[grctl command line tool](/docs/ops-guide/tools/grctl)is installed

```bash
grctl-config
```

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/config.jpg" title="Add a cluster" width="100%" />


- complete docking

After the addition is complete, the cluster is in the running state and the connection is completed and can be used.

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-by-rainbond/direct-docking.jpg" title="Docking completed" width="100%" />

## console migration

The console deployed in this way is not available for production. If you want to continue to use it after the experience is complete, it is recommended to migrate the console to Rainbond Management  [Reference Document](./console-recover).




