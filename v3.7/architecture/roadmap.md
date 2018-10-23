---
title: 版本功能计划
summary: This document defines the roadmap for Rainbond development.
toc: true
---
<div class="filters filters-big clearfix">
    <a href="edition.html"><button class="filter-button">功能列表</button></a>
    <a href="roadmap.html"><button class="filter-button current"><strong>开发计划</strong></button></a>
    <a href="release-cycle.html"><button class="filter-button">发布周期</button></a>
</div>

# Rainbond Roadmap
This document defines the roadmap for Rainbond development.


## 5.0 （预计2018年12月12日发布release）
- 服务网关rbd-gateway发布
  - 更好的支持Openresty, 严格保证数据一致性。
  - 更好的支持多节点集群，将集群数据更改模式从Push更改为Pull并就近缓存
  - 进一步简化服务网关模块复杂度
  - 支持IP池管理和分配
  - 支持Http高级路由设置
  - 支持Https和证书自动生成
  - 支持泛域名和域名rewrite
  - 支持ingress资源
- 支持helm部署
  - 应用运行时应用控制部分增加对自定义k8s资源的支持。
  - 应用模块增加基于helm源码构建应用。
  - 应用核心抽象更改-应用市场、应用备份等逻辑跟随修改。
- 升级默认Kubernetes版本到 v1.10及以上 并支持社区版本
  - 应用运行时增加对kubernetes的存储、网络的深入支持
  - 应用部署逻辑、升级逻辑尽使用kubernetes的控制逻辑
- 升级默认Docker版本到 v17.09及以上 并支持社区版本
  - 应用运行时日志处理部分重新实现
- 安装流程优化
  - 支持基于已存在kubernetes集群或docker安装

[关于更多 Rainbond 5.X RoadMap 的讨论和需求收集](https://github.com/goodrain/rainbond/issues/106)

## V3.7 2018-08-15
About system stability

- [x] management service progress guardian by systemd uniformly.
- [x] support management node offline.
- [x] support for all node and management service health checks.
- [x] support for automatic offline of major fault nodes.
- [x] tenant resource statistics task single node run.
- [x] Support to set alarm rules and connect `Prometheus-Altermanager` alarm system

About application manage

- [x] support .netcore(2.1) source code build application in linux os.
- [x] support SVN code repository.
- [x] support application build automatically based on API ,`gitea webhook` and `gogs webhook` 
- [x] support application + plugin share to market

About Security policy upgrade
- [x] Region api support TLS Two-way authentication
- [x] [UI] support user registration for secondary verification by manager.

About install
- [x] Support complete offline installation
- [x] Support install mulit manage nodes
    

# History version

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
- [x] Update rbd-dns to support for custom generic domain name resolution and cluster level one domain default resolution
