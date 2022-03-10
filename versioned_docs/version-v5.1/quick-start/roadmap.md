---
title: RoadMap
description: This document defines the roadmap for Rainbond development.
---

本文档定义了 Rainbond 开发的路线图。该文档更新可能不及时，最新规划关注 [Github](https://github.com/goodrain/rainbond/issues)

当前最新版本：5.5.0

## V5.3 版本规划

> 已发布 Release

- [x] 新增支持组件业务级监控可视化
  - [x] 组件自定义监控端点，支持 Prometheus 规范。
  - [x] 组件支持安装插件提供监控端点，例如 Mysql,Redis,JVM 等。
- [x] 组件自定义业务监控可视化视图。
- [ ] 组件支持基于自定义业务指标自动伸缩。
- [x] 应用网关支持会话保持负载均衡算法。
- [ ] 应用支持切换服务治理模式。
  - [x] 内置 ServiceMesh 模式
  - [x] Kubernetes 原生模式
- [x] 支持安装 Helm 应用
- [ ] 应用模型兼容[OAM 模型](https://github.com/oam-dev/spec)
  - [ ] 应用支持发布 OAM 模型到组件市场
- [ ] 支持基于 OAM 规范扩展自定义组件类型。
  - [ ] 内置支持 RDS 云数据库组件类型。

## V5.2 版本规划

> 已发布 Release

- [x] 组件持久化存储类型支持基于 Kubernetes StorageClass 扩展。
  - [x] 支持 Ceph-RBD 块存储
  - [x] 支持 GlusterFS 独立文件系统存储
  - [x] 支持阿里云 NAS 独立存储和块设备
- [x] Kubernetes 默认支持版本升级到 Kubernetes 1.16
- [x] 数据中心支持对接已安装 Kubernetes 集群
- [x] 应用控制台视图调整，支持企业视图，团队视图，应用视图和自定义收藏视图。
- [x] 应用网关支持 TCP 无 reload 机制下的 upstream 动态更新。
- [x] 新增企业中台组件库、服务库管理
  - [x] 新增组件库应用信息编译、应用分类。
  - [x] 新增企业服务管理功能，企业维度可视化业务状态。
  - [x] 应用发布时支持选择目标应用。
  - [x] 应用发布支持发布为服务。

## V5.1 版本规划

> 已发布 Release

- [x] 管理节点新增磁盘自动清理功能（缓存镜像、缓存数据等）
- [x] 新增组件实例自动伸缩功能（基于内存和 CPU）
- [x] 新增 OAuth2.0（Github、Gitlab、码云）用户系统对接
- [x] 新增代码仓库对接功能（Github、Gitlab、码云）
- [x] 新增 Mysql 数据库监控、Kubernetes 监控数据收集
- [x] 新增租户删除功能，租户删除后自动清理数据
- [x] 支持由 JavaMaven 多模块源代码批量创建组件
- [x] 支持服务基于应用市场应用完整的升级
- [x] 支持服务基于应用市场应用升级后的完整回滚
- [x] 支持应用基于应用市场应用完整的升级
- [x] 支持完整的服务生命操作和属性变更操作的记录和跟踪
- [x] 支持服务运行实例信息可视化展示和详细查询

## 应用运行时

- [x] 支持第三方组件管理集成
  - [x] 支持内部服务 ServiceMesh 架构集成
  - [x] 支持网关对接集成
  - [x] 支持基于 Etcd 发现第三方组件
  - [x] 支持对第三方组件进行健康检查和状态维护
- [x] ServiceMesh 支持 envoy XDS 规范
- [x] 支持组件批量操作时控制组件批量启动顺序

## 应用网关

- [x] 支持暴露域名、组件的访问情况实时监控数据
- [x] 支持访问策略的高级配置参数（超时时间，上传限制等）
- [x] 支持多 IP 管理功能，TCP 协议支持选择不同 IP 地址

## UI 控制台

- [x] 团队总览改版，支持更多监控数据可视化
- [x] 支持各语言编译参数设置
- [x] 支持从应用市场跨版本进行应用升级
- [x] 支持组件构建源的重新检测

## 源码构建

- [x] 支持 NodeJS 前端项目源码构建
- [x] 静态语言类型增加对 Nginx 的支持
- [x] 支持各语言编译参数的 UI 设置

## 安装&基础环境

- [x] 默认安装 Docker 版本升级到`18.06.3-ce`
- [x] 支持安装时指定 NFS Server 地址

关于 5.1 版本规划如果你有建议请于 Rainbond 社区[t.goodrain.com](https://t.goodrain.com)反馈

<!-- [5.1 以前版本规划详情](../roadmap.5.0/) -->
