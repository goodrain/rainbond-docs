---
title: 版本功能计划
summary: This document defines the roadmap for TiDB development.
toc: false
---

# Rainbond Roadmap
This document defines the roadmap for Rainbond development.

## V3.6
*Estimated release time: 2018-06-15*

- [*] Support the ServiceMesh micro service framework out of the box
    - [*] Support Application for grayscale publishing and A/B testing
    - [*] Support Limiting and Circuit breaker
    - [*] Support Intelligent routing
    - [*] Support flow analysis that differentiates sources,This is shown in the topology
- [ ] Support Application group backup and restore
- [ ] Support Application group migration across datacenters and across tenants
- [ ] Support share plugin to market and install from market
- [*] Support Export applications from the application market
    - [*] Export dockercompse specification
    - [*] Export rainbond-app specification
- [*] Support batch offline import applications to the application market    
- [ ] Management service HA support
    - [*] Region DB support CockroachDB
    - [ ] UI DB support CockroachDB
- [*] Support auto-building based on git webhook  
- [*] Support In-station letter announcement
- [ ] Monitoring module automatically finds monitoring targets and automatically configures them
    - [ ] Compute node monitoring
    - [ ] Management service monitoring

## V3.7
- [ ] Support .net application manage
    - [ ] Support Windows system compute nodes
    - [ ] Windows system nodes communicate with Linux system node networks
    - [ ] NFS storage is supported in Windows
    - [ ] Support `.net` source building applications
    - [ ] Support `.net` applications to connect to other applications.

