---
title: Installation based on Rancher
description: This article is for users who are using Rancher or who know something about Rancher, refer to How to install Rainbond in Rancher
---



### Installation prerequisite：

- Recommended[helm version](https://helm.sh/docs/intro/install/)：3.0+
- Recommended[k8s version](https://kubernetes.io/)：1.19+
- Root partition disk guarantee 50G+
- Make sure that server `80, 443, 6060, 6443, 7070, 8443` ports can be accessed and not occupied
- Server has NFS client installed

:::caution

Note：When installing Rainbond based on Rancher, be sure to close the Nginx Ingress of the currently installed cluster, because the Rainbond gateway node will use its port

:::

<img src="https://pic.imgdb.cn/item/6232cf0a5baa1a80ab9bd96c.png" />

### start install：

#### Install NFS client

No need to repeat the installation if there is an NFS client on the server
```bash
yum -y install nfs-utils # Cenots system
apt-get install nfs-common # ubuntu system
```

#### Add Rainbond to the app store

- First, switch to the cluster example：cluster test where Rainbond is installed
- Click Apps & Marketplace > Repositories > Create
- Edit the name of the current application, fill in the URL `of the store's GIT address https://github.com/goodrain/rainbond-chart.git`, fill in master by default for the branch, and then click Create

<img src="https://pic.imgdb.cn/item/6232cf0a5baa1a80ab9bd964.png" />

- After the addition is complete, click Repositories to return to the home page, and check that the store status is Active, which means success



#### Add Rainbond application to the cluster

- Click Apps & Marketplace > Charts
- Select only the added store name, select the Rainbond application, and click install
- Select the rbd-system namespace (which needs to be created in advance), then click next

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fc8.png" />

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fe0.png" />

- Entering the stage of customizing Values.yaml, the details of the file can be edited by referring to [values.yaml document](../install-with-helm/vaules-config) After modifying the configuration, click install

:::danger

Warning：If there is a public IP, you must modify the gatewayIngressIPs item in the Values.yaml file to ensure that the deployed application can be accessed normally.

:::

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fc2.png" />



​

### Verify installation

- Press the kubectl shell button on the Rancher ui interface to enter the terminal command line to view the status of the pod. The successful status is as follows

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fd3.png" />

- After the installation is successful, you can access the Rainbond console through `$gatewayIngressIPs:7070` If there is no public IP, it will be the intranet IP ：7070.

### Installation Troubleshooting

- If the installation process does not complete for a long time, please refer to document [Helm Installation Troubleshooting Guide](/docs/installation/install-troubleshoot/helm-install-troubleshoot)for troubleshooting.

## Next step

Refer to[Quick Start](/docs/quick-start/getting-started/)to deploy your first application.
