---
title: VM Usage
description: Rainbond Virtual Machine Use
---

## General description

This section focuses on how to create virtual assemblies in the Rainbond platform and use virtual machine functionality.

## Use process

### Feature Entry

Separate two portals, one for App Installation Guide View, the other for Application Component Installation View.

- App Install Guide View: Team View -> New -> Virtual Machine

<img src="https://static.goodrain.com/docs/5.16.0/insall-vm1.pic.jpg" title="应用安装引导视图"/>

- App View: App View -> Add Component -> Virtual Machine Image

<img src="https://static.goodrain.com/docs/5.16.0/vm_component.jpg" title="组件视图部署虚拟机"/>

### Create New

Creates a virtual machine in four forms：public, linked, upload, local

:::danger
Note that the format of the upload package and the download address is required for .img .qcow2.iso and the .tar,.gz,.xz package compressed in the format above.
:::

#### Public

Four sets of common public virtual machine mirror addresses (CenOS 7.9, Anolis OS 7.9, Deepin 20.9, Ubuntu 23.10) were provided for rapid acquisition, deployment and operation.

Addresses that can be downloaded to the virtual machine mirror. The virtual machine is deployed by configuring the virtual machine image packet download address.

#### Link

When a public image does not meet the need, it can be created by downloading the image and configuring it according to its name and download address.这里提供一个阿里云的虚拟机镜像仓库，在里面查找你想要下载的镜像

#### Upload

If private virtual machine mirrors exist you can create a virtual group by uploading the image.Simply upload mirrors by step and configure the corresponding mirror name to create a virtual machine.

#### Local

When the three modalities are deployed, virtual machine mirror information will be retained on the platform.For redeployment, choose to use local mirrors to avoid duplicating upload or download processes.

### Allocation of resources

Resources can be configured in basic information settings during creation to allocate memory and CPU resources according to our needs. We provide several sets of specifications and support custom configurations.CPU and memory are at least not less than 2 nuclear 2G if they are custom reading.Disk also needs at least 10G to satisfy the basic operation of the virtual machine.

Once created, it is still possible to reconfigure memory and CPU in the scalebar.

### Access Virtual Machine

Virtual Machine Component View -> Web Terminal <img src="https://static.goodrain.com/docs/5.16.0/vm2.pic.jpg" title="虚拟机访问"/>

### Virtual Machine Organization

This is consistent with the programming operations of other packagings of the platform, but only supports the packaging component in relying on virtual assemblies, which achieve quick access by relying on binding virtual machine ports.

### Add Disk

Virtual group storage differs from traditional container component storage. Virtual machines support the creation of three types of storage.

<img src="https://static.goodrain.com/docs/5.16.0/vm_vnc3.jpg" title="虚拟机存储"/>
