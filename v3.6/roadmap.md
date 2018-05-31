---
title: 版本功能计划
summary: This document defines the roadmap for Rainbond development.
toc: false
---

# Rainbond Roadmap
This document defines the roadmap for Rainbond development.

## V3.6
*Estimated release time: 2018-06-15*   
The current version focuses on supporting the infrastructure of the microservice architecture, service governance, service backup & recovery & migration.

- [x] Support the ServiceMesh micro service framework out of the box
    - [x] Support Application for grayscale publishing and A/B testing
    - [x] Support Limiting and Circuit breaker
    - [x] Support Intelligent routing
    - [x] Support flow analysis that differentiates sources,This is shown in the topology
- [ ] Support Application group backup and recovery
- [ ] Support Application group migration across datacenters and across tenants
- [ ] Support share plugin to market and install from market
- [x] Support Export applications from the application market
    - [x] Export dockercompse specification
    - [x] Export rainbond-app specification
- [x] Support batch offline import applications to the application market    
- [ ] Management service HA support
    - [x] Region DB support CockroachDB
    - [ ] UI DB support CockroachDB
- [x] Support auto-building based on git webhook  
- [x] Support In-station letter announcement
- [ ] Monitoring module automatically finds monitoring targets and automatically configures them
    - [ ] Compute node monitoring
    - [ ] Management service monitoring
- [ ] 2000 compute node support

## V3.7
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
