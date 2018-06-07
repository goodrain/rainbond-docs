---
title: 版本功能计划
summary: This document defines the roadmap for Rainbond development.
toc: false
---

# Rainbond Roadmap
This document defines the roadmap for Rainbond development.

## V3.6
*Estimated release time: 2018-06-15*   
The current version focuses on supporting the infrastructure of the microservice architecture, service governance, service backup & restore & migration.

- [x] Support the ServiceMesh micro service framework out of the box
    - [x] Support Application for grayscale publishing and A/B testing
    - [x] Support Limiting and Circuit breaker
    - [x] Support Intelligent routing
    - [x] Support flow analysis that differentiates sources,This is shown in the topology
- [x] Support Application group backup and restore
- [x] Support Application group migration across datacenters and across tenants
- [x] Support share plugin to market and install from market
    - [ ] MySQL backup and restore plugin
    - [ ] PostgreSQL backup and restore plugin
    - [ ] MongoDB backup and restore plugin
    - [ ] Log collect plugin  
    - [ ] WAF plugin
- [x] Support Export applications from the application market
    - [x] Export dockercompse specification
    - [x] Export rainbond-app specification
- [x] Support batch offline import applications to the application market    
- [ ] Management service HA support
    - [x] Region DB support CockroachDB
    - [ ] UI DB support TiDB
- [x] Support auto-building based on git webhook  
- [x] Support In-station letter announcement
- [x] Monitoring module automatically finds monitoring targets and automatically configures them
    - [x] Compute node monitoring
    - [x] Management service monitoring
- [x] Accurate user permission control, support custom roles
- [ ] Rainbond Installer upgrade
  - [ ] Support install mulit manage nodes
- [x] Update rbd-dns to support for custom generic domain name resolution and cluster level one domain default resolution

## V5.0
The current version focuses on upgrade kubernetes and docker,  full support `.net ` application management and operation.

- [ ] Support .net application manage
    - [ ] Support Windows system compute nodes
    - [ ] Windows system nodes communicate with Linux system node networks
    - [ ] NFS storage is supported in Windows
    - [ ] Support `.net` source building applications
    - [ ] Support `.net` applications to connect to other applications.
- [ ] Dockerfile source build supports multi-stage builds.  
- [ ] Support auto-building based on docker image hub webhook.
- [ ] Support the definition of alarm rules.
