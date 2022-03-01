---
title: RoadMap(历史)
description: This document defines the roadmap for Rainbond development.
weight: 208
draft: true
hidden: true
---

<button href="../edition/">功能列表</button>
<button href="../release-cycle/">发布周期</button>

### V5.0 版本规划（已发布 Release）

#### 应用网关

- [x] HTTP、TCP 服务访问策略管理
- [x] HTTP 策略支持基于域名、访问路径、请求头、Cookie 访问路由控制
- [x] 配置 HTTPs 规则、HTTP 转 HTTPs 规则
- [x] 支持泛域名规则
- [x] 支持 SSL 证书管理
- [x] 支持 A/B 测试、灰度发布控制
- [x] TCP 策略支持基于 IP、端口访问控制
- [x] 自定义负载均衡算法，目前支持支持轮询算法，后续测试版本支持一致性 Hash 算法，Session 粘连算法
- [x] 支持集群部署，高可用与流量均摊，可工作于 4 层高性能软硬件负载均衡之后。

#### 应用运行时

- [x] 应用运行时完整重构，提供以应用为核心的控制器抽象
- [x] 无状态组件部署类型更改为 Kubernetes Deployment 资源
- [x] 有状态组件本地存储、共享存储提供更改为动态 PV，运行时提供 Provider
- [x] 应用状态维护由集中式更改为分布式，去除单点间歇性故障
- [x] 有状态组件、无状态组件皆提供自动化滚动升级策略
- [x] 默认 Kubernetes 版本升级到 1.10 版本 Docker 版本升级到 17.06 版本
- [x] 支持社区版本 Kubernetes 集群对接

#### 组件构建（CI）

- [x] `Java` `PHP` `Python` `NodeJS` `Golang` `.NetCore` 各语言可选 Runtime 版本全面升级
- [x] 支持 UI 配置各语言编译参数选项
- [x] Java 语言支持`Gradle`源码构建 ，支持 War、Jar 包部署
- [x] Dockerfile 支持多阶段构建
- [x] 支持离线环境下的源码持续构建（离线环境已具有必要的使用语言包仓库）

#### 控制台 UI

- [x] 明确定义 应用/组件 两级抽象
- [x] 应用 Dashboard 页面拓扑图应用状态实时刷新
- [x] 应用 Dashboard 页面增加快捷创建组件的流程
- [x] 应用 Dashboard 页面增加应用级启动、停止、升级控制
- [x] 增加应用网关完整的控制流程页面
- [x] 组件支持（更新升级）操作, 取代原重启操作。
- [x] 组件支持源码构建配置
- [x] 组件支持 CI/CD 流程分离
- [x] 拓扑图增加编辑模式，动态编辑组件依赖关系
- [x] 支持组件 UI 添加配置文件或模版

#### Windows 支持

- [x] node 组件支持 windows 节点部署，管理 windows 节点和平台服务
- [x] rbd-chao 组件支持 windows 节点部署，构建 windows 组件
- [x] 服务构建调度支持区分 windows 和 linux 组件。
- [x] 服务运行调度，存储支持 Windows 节点。
- [x] 数据中心镜像仓库升级支持 Windows 镜像。

#### 安装与运维

- [x] 系统安装策略由 SaltStack 更换为 Ansible
- [x] 新加 windowsutil 组件支持传统程序或脚本部署为 windows 服务
- [x] 支持多配置文件配置节点服务
- [x] 支持 Windows 节点下服务守护和健康检查
- [x] grctl 多个命令升级改造
- [x] 内置支持安装 flannel host-gateway 网络

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

_Estimated release time: 2018-06-15_  
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
