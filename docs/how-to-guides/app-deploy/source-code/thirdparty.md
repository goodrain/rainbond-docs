---
title: Third-party service deployment
description: Explain the creation methods and processes of third-party services supported by Rainbond
---

## Overview

Services that run outside the Rainbond cluster, whose lifecycle is not managed by Rainbond, and can communicate with the Rainbond cluster over the network are called third-party services.For example, a standalone Oracle service, or a .NET service running on a Windows server.

The original intention of Rainbond supporting third-party service management is to solve two main problems encountered by enterprises in the process of using Rainbond: the coexistence of services inside and outside the cluster during the migration process, and the unified management and communication of unmigrated services with services on Rainbond.

1. Gradual migration strategy: When services are migrated to the Rainbond platform, they often need to communicate and be uniformly managed with legacy services that have not been migrated.Rainbond is centered around applications and services, providing service registration and discovery mechanisms, but in past versions, it could not well support unmigrated external services.To achieve a gradual migration strategy, Rainbond is committed to simplifying configuration management and service communication through environment variables and unified management functions, enabling old and new services to coexist and collaborate efficiently.

2. Sharing external network ports and domain names: Rainbond's application gateway provides powerful external network service capabilities, but in the past, unmigrated services could not directly use these functions, forcing users to add an additional layer of nginx in front of the gateway, increasing configuration complexity.By supporting third-party service management, Rainbond aims to allow legacy services to also share the external network functions of its gateway, reduce configuration complexity, and enjoy out-of-the-box capabilities such as domain name access monitoring.

## Create a third-party service

### Static registration

In **Application View -> Add Component -> Third-party Component**, select the service registration method as static registration,

1. Fill in the service communication address such as `192.168.1.1:8080`
2. Create component

Enter the component details page, configure port, connection information, health check attributes, etc.

### Kubernetes

In **Application View -> Add Component -> Third-party Component**, select the service registration method as Kubernetes,

1. Fill in the Namespace, default is the current team's Namespace
2. Fill in the Service, the Service should belong to the Namespace filled in above
3. Create component

Enter the component details page, configure port, connection information, health check attributes, etc.

## Example

Use a third-party service to proxy the Rainbond console, access the Rainbond console through a domain name.

In **Application View -> Add Component -> Third-party Component**, select the service registration method as static registration,

1. Fill in the service communication address such as `192.168.1.1:7070`
2. Create component

Enter the component details page, configure the port protocol as `HTTP`, port number as `7070`, enable external access, and then you can access the Rainbond console through the domain name.