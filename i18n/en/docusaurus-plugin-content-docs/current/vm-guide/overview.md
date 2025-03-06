---
title: General description
description: Overview Rainbond Virtual Machine
keywords:
  - Rainbond
  - Virtual Machines
  - kuveirt
---

With the rapid development of cloud native technology, packaging has become the mainstream mode of deployment and management of modern applications.However, in the real business landscape, there are still a large number of traditional virtual machine applications that are difficult to migrate directly to the container environment because of their own characteristics or the need for legacy systems.

Rainbond as the Yun Application Management Platform addresses the need for uncontainable clouds in the app. As a result, Rainbond supported the deployment of virtual group components, operated virtual machines in containers, offered users a more flexible and open deployment option, and offered an integrated, unified cloud management solution.

## KubeVirt Integration

Rainbond implements the deployment and management of a virtual group by integrating KubeVirt, a KubeVirt extension that allows running virtual machines on Kubernetes.KubeVirt has achieved cloud management of the virtual machine by using the abstract as a custom resource for Kubernetes and combining its life-cycle management with that of Kubernetes.

## Virtual Machine Component

A virtual group is a special component in Rainbond that is a virtual machine created through KubeVirt that creates and manages a virtual group similar to a normal component, but the virtual group operates as a virtual machine.

