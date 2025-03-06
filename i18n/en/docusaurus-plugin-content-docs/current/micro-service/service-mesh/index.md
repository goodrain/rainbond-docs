---
title: Service Mesh Usage Guide
description: This chapter describes the Service Mesh function of Rainbond, including the concept, functions, and usage of Service Mesh.
keywords:
  - Service Mesh
  - Service Grid
  - Istio
  - Envoy
---

Service Mesh is a service grid that serves as an infrastructure layer for inter-service communication.Lightweight high-performance network agents provide secure, fast and reliable inter-service communications, deployed with actual applications but transparent for applications.The application as the initiator of the service only requires that the request be sent to the local service grid agent in the simplest way and that the grid agent will follow up with the service discovery and load equilibrium and eventually forward the request to the target service.

## Service Mesh Support

Rainbond Supported Service Mesh Program：

1. Built-in Service Mesh：Rainbond has a service Mesh, based on Istio and Envoy and using it directly without additional installation.
2. Native Service：Rainbond supports the use of Kubernetes Native Service as Service Mesh, without additional installation and direct use.
3. Istio：Rainbond supports the use of Istio as a service Mesh, version of Istio 1.11.4 and above.

## Service Mesh Service Interservice Communication and Governance Model

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```