---
title: RoadMap
description: This document defines the roadmap for Rainbond development.
weight: 208
---

{{% button href="../edition/" %}}功能列表{{% /button %}}
{{% button href="../release-cycle/" %}}发布周期{{% /button %}}

本文档定义了Rainbond开发的路线图。

#### V5.1版本规划

##### 应用运行时

- [x] 支持第三方服务管理集成
    - [x] 支持内部服务ServiceMesh架构集成
    - [x] 支持网关对接集成
    - [x] 支持基于Etcd发现第三方服务
    - [x] 支持对第三方服务进行健康检查和状态维护
- [x] ServiceMesh支持envoy XDS规范
- [x] 支持服务批量操作时控制服务批量启动顺序

#### 应用网关

- [x] 支持暴露域名、服务的访问情况实时监控数据
- [x] 支持访问策略的高级配置参数（超时时间，上传限制等）

#### UI控制台
- [x] 团队总览改版，支持更多监控数据可视化
- [x] 支持各语言编译参数设置
- [x] 支持从应用市场跨版本进行应用升级
- [x] 支持服务构建源的重新检测

#### 源码构建
- [x] 支持NodeJS前端项目源码构建
- [x] 静态语言类型增加对Nginx的支持
- [x] 支持各语言编译参数的UI设置

#### 安装&基础环境
- [x] 默认安装Docker版本升级到`18.06.3-ce`
- [x] 支持安装时指定NFS Server地址


关于5.1版本规划如果你有建议请于Rainbond社区[t.goodrain.com](t.goodrain.com)反馈

#### V5.2版本规划

##### 应用运行时
- [ ] 支持基于Helm-Chart源码创建服务组件
- [ ] 基于业务级监控指标（吞吐率、响应时间）的从0开始的服务自动伸缩

##### Windows支持（windows支持整体进入Beta版本）

- [ ] 支持Windows服务组件Dockerfile构建
- [ ] 支持Windows插件构建,默认提供性能分析插件和网络治理插件
- [ ] 支持智能Windows服务类型检测
- [ ] 支持Windows节点安装

[5.1以前版本规划详情](../roadmap.5.0/)