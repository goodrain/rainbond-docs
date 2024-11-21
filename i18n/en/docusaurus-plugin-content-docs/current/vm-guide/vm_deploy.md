---
title: Virtual Machine Deployment
description: Rainbond Virtual Machine Deployment
keywords:
  - Rainbond
  - Virtual Machines
  - kuveirt deployment
---

:::caution
**Note:** Rapid installation of Rainbond is not allowed to use the virtual machine.
:::

## General description

This section focuses on the basic setting of the virtual machine and the deployment of the virtual machine plugin, paving the way for the use of virtual machine functionality in Rainbond

## Environmental requirements

- Server kernel must be > 5.x,[Centos内核升级参阅](https://t.goodrain.com/d/9-centos)
- Docker version must be > 24.x
- Server must support virtualization, using the following command to check if virtualization is supported
  ```bash
  egrep -c '(vmx|svm)' /proc/cpuinfo
  # output not 0 to support virtualization
  ```

## Deploy Virtual Machine

Rapid installation cannot be deployed without the installation of Rainbond requiring reference to [安装文档](/docs/installation/).

Platform Manager View -> Marketplace View -> Open Source App Shop -> Setup by clicking on `Rainbond-VM` on the Open Source App Store -> Open Source App Store search.

<img src="https://static.goodrain.com/docs/5.16.0/vm1.jpg" title="下载虚拟机插件"/>

## Configure virtual machine web terminal address

1. Once deployed, we need to configure the web terminal addresses of all VMs to jump. We need to find the Rainbond-VM app deployed from the Marketplace, where the virtvnc component is found, and enter the component view to find the port column to get the access policy address.

<img src="https://static.goodrain.com/docs/5.16.0/vm_vnc.jpg" title="虚拟机web终端"/>

2. The address will be fetched, follow the graph guidance, find the configuration file for the virtual machine plugin, configure and replace the `access_urls` property field when you click Save it.

<img src="https://static.goodrain.com/docs/5.16.0/vm_vnc2.jpg" title="web 终端配置"/>

3. Add virtual machine profile.

Still in the k8s resource view under the VM app, click the Add button, paste below and confirm creation.

```bash
apiVersion: kubeVirt.io/v1
kind: KubeVirt
metatata:
  annotations:
    kubevirt.io/ latest-observed-api-version: v1
    kubeviirt. o/storage-observed-api-version: v1
  finalizers:
  - foreroundDeleteKubeVirt
  name: kuveirt
spec:
  certificateRotate: {}
  configuration:
    developerConfiguration: {}
  customizeCompents: {}
  imagePullPolicy: IfNotPresent
  imagePulls:
  - name: rbd-hub-credits
  workloadUpdateStrategy: {}
```

## Finished deploying

To this point, the Virtual Machine function is deployed on the Rainbond platform.
