---
title: 版本功能计划
summary: This document defines the roadmap for Rainbond development.
toc: false
---
<div class="filters filters-big clearfix">
    <a href="edition.html"><button class="filter-button"><strong>功能列表</strong></button></a>
    <a href="roadmap.html"><button class="filter-button current">开发计划</button></a>
</div>

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
    - [x] MySQL backup and restore plugin
    - [ ] PostgreSQL backup and restore plugin
    - [ ] MongoDB backup and restore plugin
    - [ ] Log collect plugin  
    - [x] WAF plugin
- [x] Support Export applications from the application market
    - [x] Export dockercompse specification
    - [x] Export rainbond-app specification
- [x] Support batch offline import applications to the application market    
- [x] Management service HA support
    - [x] Region DB support CockroachDB
    - [x] UI DB support TiDB
- [x] Support auto-building based on git webhook  
- [x] Support In-station letter announcement
- [x] Monitoring module automatically finds monitoring targets and automatically configures them
    - [x] Compute node monitoring
    - [x] Management service monitoring
- [x] Accurate user permission control, support custom roles
- [ ] Rainbond Installer upgrade
  - [ ] Support install mulit manage nodes
- [x] Update rbd-dns to support for custom generic domain name resolution and cluster level one domain default resolution

### V3.7
About system stability

- [ ] management service progress guardian by systemd uniformly.
- [ ] support management node offline.
- [ ] support for all node and management service health checks.
- [ ] support for automatic offline of major fault nodes.
- [ ] tenant resource statistics task single node run.

About application manage

- [ ] support .netcore(2.1) source code build application in linux os.
- [ ] support SVN code repository.
- [ ] support application build automatically based on API and imagerepository webhook.
- [ ] support application + plugin share to market

About Security policy upgrade

- [ ] [UI] support user registration for secondary verification by manager.

## V5.0
The current version focuses on upgrade kubernetes and docker,  full support `.net ` application management and operation.

- [ ] upgrade docker version to 17.04.x and kubernetes version to 1.10.3.
- [ ] Support .net application manage
    - [ ] Support Windows system compute nodes
    - [ ] Windows system nodes communicate with Linux system node networks
    - [ ] NFS storage is supported in Windows
    - [ ] Support `.net` source building applications
    - [ ] Support `.net` applications to connect to other applications.
- [ ] upgrade source code buildpack
    - [ ] `java` support java7,java8,java9,java10
    - [ ] `python` support python-3.6.4 and python-2.7.15
    - [ ] `nodejs` support 6.x, 8.x, 9.x, and 10.x
    - [ ] `golang` support dep,govendor,glide,GB,Godep dependence define.
    - [ ] `php` uses Composer for dependency management, supports PHP or HHVM (experimental) as runtimes, and offers a choice of Apache2 or Nginx web servers.
    - [ ] `ruby` support MRI and JRuby
- [ ] Dockerfile source build supports multi-stage builds.  
- [ ] Support auto-building based on docker image hub webhook.
- [ ] Support the definition of alarm rules.
- [ ] Support GroupApplication Life cycle control
    - [ ] Support GroupApplication start control
    - [ ] Support GroupApplication build control
- [ ] Security policy upgrade
    - [ ] region api authorization base on RBAC
    - [ ] access the etcd cluster based on certificates
    
