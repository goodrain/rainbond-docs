---
title: RoadMap(历史)
description: This document defines the roadmap for Rainbond development.
weight: 208
hidden: true
---

{{% button href="/quick-start/edition/" %}}功能列表{{% /button %}}
{{% button href="/quick-start/release-cycle/" %}}发布周期{{% /button %}}

### V5.0版本规划（已发布Release）

#### 应用网关

- [x] HTTP、TCP服务访问策略管理
- [x] HTTP策略支持基于域名、访问路径、请求头、Cookie访问路由控制
- [x] 配置HTTPs规则、HTTP转HTTPs规则
- [x] 支持泛域名规则
- [x] 支持SSL证书管理
- [x] 支持A/B测试、灰度发布控制
- [x] TCP策略支持基于IP、端口访问控制
- [x] 自定义负载均衡算法，目前支持支持轮询算法，后续测试版本支持一致性Hash算法，Session粘连算法
- [x] 支持集群部署，高可用与流量均摊，可工作于4层高性能软硬件负载均衡之后。

#### 应用运行时

- [x] 应用运行时完整重构，提供以应用为核心的控制器抽象
- [x] 无状态服务部署类型更改为Kubernetes Deployment资源
- [x] 有状态服务本地存储、共享存储提供更改为动态PV，运行时提供Provider
- [x] 应用状态维护由集中式更改为分布式，去除单点间歇性故障
- [x] 有状态服务、无状态服务皆提供自动化滚动升级策略
- [x] 默认Kubernetes版本升级到1.10版本 Docker版本升级到17.06版本
- [x] 支持社区版本Kubernetes集群对接

#### 应用构建（CI）

- [x] `Java` `PHP` `Python` `NodeJS` `Golang` `.NetCore` 各语言可选Runtime版本全面升级
- [x] 支持UI配置各语言编译参数选项
- [x] Java语言支持`Gradle`源码构建 ，支持War、Jar包部署
- [x] Dockerfile支持多阶段构建
- [x] 支持离线环境下的源码持续构建（离线环境已具有必要的使用语言包仓库）

#### 控制台UI

- [x] 明确定义 应用/服务 两级抽象
- [x] 应用Dashboard页面拓扑图应用状态实时刷新
- [x] 应用Dashboard页面增加快捷创建服务组件的流程
- [x] 应用Dashboard页面增加应用级启动、停止、升级控制
- [x] 增加应用网关完整的控制流程页面
- [x] 服务组件支持（更新升级）操作, 取代原重启操作。
- [x] 服务组件支持源码构建配置
- [x] 服务组件支持CI/CD流程分离
- [x] 拓扑图增加编辑模式，动态编辑服务依赖关系
- [x] 支持服务组件UI添加配置文件或模版

#### Windows 支持

- [x] node 组件支持windows节点部署，管理windows节点和平台服务
- [x] rbd-chao 组件支持windows节点部署，构建windows应用 
- [x] 服务构建调度支持区分windows和linux应用。
- [x] 服务运行调度，存储支持Windows节点。 
- [x] 数据中心镜像仓库升级支持Windows镜像。

#### 安装与运维

- [x] 系统安装策略由SaltStack更换为Ansible
- [x] 新加windowsutil组件支持传统程序或脚本部署为windows服务
- [x] 支持多配置文件配置节点服务
- [x] 支持Windows节点下服务守护和健康检查
- [x] grctl多个命令升级改造
- [x] 内置支持安装flannel host-gateway网络

# History version

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

