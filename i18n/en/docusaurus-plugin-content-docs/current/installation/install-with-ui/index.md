---
title: Host-based installation
description: Start installing Rainbond from Linux based on graphical interface
keywords:
  - Host-based installation Rainbond
  - Host-based installation of highly available Kubernetes cluster
  - Host-based installation of highly available Rainbond cluster
---

This article describes how to install `Kubernetes`([RKE2](https://docs.rke2.io)) cluster and `Rainbond` cluster through graphical interface on Linux system.

:::tip
This installation method supports Linux x86 and Arm64 operating systems, and supports[localization of domestic innovation](/docs/how-to-guides/localization-guide/intro.md).
:::

## Prerequisites

- Ensure your environment meets the [RKE2 installation requirements](https://docs.rke2.io/install/requirements). If NetworkManager is installed and enabled on your host, please[ensure it is configured to ignore CNI managed interfaces](https://docs.rke2.io/known_issues#networkmanager).
- If the host kernel supports [AppArmor](https://apparmor.net/), you must also have AppArmor tools (usually available through the `apparmor-parser` package) before installation.
- The installation must be performed as the `root` user.

:::danger
If you have already performed[quick installation](/docs/quick-start/quick-install), you cannot perform host-based installation on the same host again, as this will cause conflicts.
:::

## Start installing Kubernetes cluster from host

1. Deploy Rainbond according to[quick installation](/docs/quick-start/quick-install).
2. Go to `Platform Management -> Cluster -> Add Cluster -> Start Installation from Host` to enter the graphical installation page.
3. Click `Add Node` and fill in the node information.

|                        | illustrate                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node role              | Select the role of the node, `ETCD Management Node Compute Node`                                                                                                                                        |
| Node public IP         | Fill in the node's public IP address. If there is no public IP, do not fill in                                                                                                          |
| Node internal IP       | Fill in the node's internal IP address. If there are multiple network cards, please manually fill in the internal IP. If it is empty, it will be automatically selected |
| Console access address | The default is the address accessed by the current browser. If your registered host cannot communicate with the console, please fill in the address that can communicate                |

4. Copy the registration command and execute it on the Linux host.

## Install Rainbond cluster

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

After the Kubernetes cluster installation is completed, the next step will enter the Rainbond cluster installation page, which will guide you through the installation of the Rainbond cluster.

:::

1. Fill in the basic configuration and advanced configuration according to the page guide.

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

The following will provide a detailed explanation of the basic configuration of the Rainbond cluster.

| Configuration item                        | illustrate                                                                         |          |
| ----------------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| [Cluster entry IP](./ha.md#load-balancer) | Cluster entry access IP, which can be VIP, load balancer IP or any gateway node IP | Required |
| [Gateway node](./ha.md#gateway-node)      | Specify on which node the Rainbond gateway service is deployed and runs            | Required |
| [Build node](./ha.md#build-node)          | Specify on which node the Rainbond build service is deployed and runs              | Required |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

The following will provide a detailed explanation of the advanced configuration of the Rainbond cluster.

| Configuration item                           | illustrate                                                                                                                                                                                                                    |          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [Image repository](./ha.md#image-repository) | Specify the underlying image repository of Rainbond. All component images on the platform will be pulled and pushed from this repository.The built-in image repository is provided by default | Optional |
| [Database](./ha.md#mysql)                    | Specify the MySQL8.0+ database for the Rainbond cluster.The built-in MySQL8.0+ database is provided by default                                                                | Optional |
| Component image source                       | Specify which image source Rainbond's own components use to obtain images. By default, images are pulled from Alibaba Cloud's image repository                                                                | Optional |

  </TabItem>
</Tabs>

2. After filling in the configuration information, enter the Rainbond cluster installation page. On this page, you can see the installation progress information, and each component can be clicked to view the status and event information.
3. Wait for all components to start, then complete the docking in the next step.

> If you are familiar with [Kubectl](https://docs.rke2.io/reference/cli_tools) commands, you can use the `kubectl get pods -n rbd-system` command to view the cluster status.
>
> ```bash
> export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
> /var/lib/rancher/rke2/bin/kubectl get nodes
> ```

## Next step

- Complete the[quick start](../../quick-start/getting-started.md) tutorial.
- Migrate the[console](./console-recover.md) to the Kubernetes cluster.

