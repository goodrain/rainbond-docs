---
title: RoadMap
description: This document defines the roadmap for Rainbond development.
---

This document defines the road map developed by RainbondThis document defines the roadmap for Rainbond development.The document update may not be timely, the latest planning focus on [Github](https://github.com/goodrain/rainbond/issues)

Current latest version：5.5.0

## V5.3 version planning

> Released

- [x] Added support for component business-level monitoring visualization
  - [x] component custom monitoring endpoint, support Prometheus specification.
  - [x] Components support installing plugins to provide monitoring endpoints, such as Mysql, Redis, JVM, etc.
- [x] components to customize the visual view of business monitoring.
- [ ] The component supports automatic scaling based on custom business metrics.
- [x] application gateway supports the session persistence load balancing algorithm.
- [ ] The application supports switching the service management mode.
  - [x] Built-in ServiceMesh mode
  - [x] Kubernetes native mode
- [x] Support to install Helm app
- [ ] Application model compatible[OAM model](https://github.com/oam-dev/spec)
  - [ ] Application support to publish OAM model to component market
- [ ] Support for extending custom component types based on the OAM specification.
  - [ ] Built-in support for RDS cloud database component types.

## V5.2 version planning

> Released

- [x] Component persistent storage type support is based on the Kubernetes StorageClass extension.
  - [x] supports Ceph-RBD block storage
  - [x] Support GlusterFS independent file system storage
  - [x] Support Alibaba Cloud NAS independent storage and block devices
- [x] Kubernetes default support version upgrade to Kubernetes 1.16
- [x] Data centers support docking with installed Kubernetes clusters
- [x] App console view adjustment, support enterprise view, team view, app view and custom collection view.
- [x] The application gateway supports the upstream dynamic update under the TCP non-reload mechanism.
- [x] Added enterprise middle-end component library and service library management
  - [x] Newly added component library application information compilation and application classification.
  - [x] Added enterprise service management function, visualized business status from enterprise dimension.
  - [x] When the application is released, it supports selecting the target application.
  - [x] application publishing supports publishing as a service.

## V5.1 version planning

> Released

- [x] Added automatic disk cleanup function for management nodes (cache mirror, cache data, etc.)
- [x] Added automatic scaling of component instances (based on memory and CPU)
- [x] Added OAuth2.0 (Github, Gitlab, Code Cloud) user system connection
- [x] Added code repository docking function (Github, Gitlab, Code Cloud)
- [x] Added Mysql database monitoring, Kubernetes monitoring data collection
- [x] Added tenant deletion function, which automatically cleans up data after tenant deletion
- [x] Support batch creation of components from JavaMaven multi-module source code
- [x] Support service is based on the complete upgrade of the application market application
- [x] Support service is based on the complete rollback of the application market after application upgrade
- [x] Support application based on the complete upgrade of the application market application
- [x] Supports complete recording and tracking of service life operations and attribute change operations
- [x] Supports the visual display and detailed query of service running instance information

## application runtime

- [x] Support third-party component management integration
  - [x] Support internal service ServiceMesh architecture integration
  - [x] Support gateway docking integration
  - [x] Supports discovery of third-party components based on Etcd
  - [x] Support health check and status maintenance for third-party components
- [x] ServiceMesh supports the envoy XDS specification
- [x] Control the batch startup sequence of components when supporting component batch operations

## Application Gateway

- [x] Support real-time monitoring data of access conditions of exposed domain names and components
- [x] Supports advanced configuration parameters for access policies (timeouts, upload limits, etc.)
- [x] Support multi-IP management function, TCP protocol supports selection of different IP addresses

## UI console

- [x] Team overview revision to support more monitoring data visualization
- [x] Supports compilation parameter settings for each language
- [x] Support cross-version application upgrade from the application market
- [x] Support re-detection of component build sources

## Source build

- [x] Support NodeJS front-end project source code construction
- [x] Static language type adds support for Nginx
- [x] Support UI settings for compilation parameters of each language

## Install&base environment

- [x] default installed Docker version upgrade to`18.06.3-ce`
- [x] support specifying NFS Server address during installation

Regarding the 5.1 version planning, if you have any suggestions, please give feedback in the Rainbond community[t.goodrain.com](https://t.goodrain.com)<!-- \[5.1 以前版本规划详情\](../roadmap.5.0/) -->

<!-- [5.1 以前版本规划详情](../roadmap.5.0/) -->
