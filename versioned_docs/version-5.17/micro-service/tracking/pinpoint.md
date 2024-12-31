---
title: PinPoint 使用
description: 基于 PinPoint 实现微服务无侵入的监控与链路追踪，适用于开发者和应用运维人员。
keywords:
- PinPoint 实现微服务无侵入的监控与链路追踪
- 链路追踪
- APM
- Tracing
---

应⽤性能管理（Application Performance Management，APM）是指对企业的关键业务应⽤进⾏监测、优化，提⾼企业应⽤的可靠性和质量，保证⽤户得到良好的服务，降低 IT 总运维成本，为企业带来更多的商业利益。

Pinpoint 是一个 APM（应用程序性能管理）工具，适用于用 Java / PHP 编写的大型分布式系统。在使用上力图简单高效，通过在启动时安装 agent，不需要修改哪怕一行代码，最小化性能损失（3%）。


**优势:** 
* 分布式事务跟踪，跟踪跨分布式应用的消息；  
* 自动检测应用拓扑，帮助你搞清楚应用的架构；  
* 水平扩展以便支持大规模服务器集群；  
* 提供代码级别的可见性以便轻松定位失败点和瓶颈；  
* 使用字节码增强技术，添加新功能而无需修改代码。  

<img src="https://static.goodrain.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint.jpeg" title="PinPoint组件" width="80%" />

|      组件   |   组件功能 |
| ------------- | ----------------- |
| Pinpoint-Collector| 收集各种性能数据 |
| Pinpoint-Agent        | 探针与应用服务器（例如 tomcat) 关联，部署到同一台服务器上        |
| HBase Storage      | 收集到数据存到 HBase 中   |
| Pinpoint-Web      | 将收集到的数据层现在 web 展示  |


## 前提条件

* 必须是基于源码构建的 Java 项目，默认都会集成 pinpoint-agent。

## 部署 PinPoint Server


通过开源应用市场一键部署 `PinPoint`，平台管理 > 应用商店 > 搜索 `PinPoint` 一键安装即可。

**配置 websocket**

PinPoint 支持实时显示链路追踪数据，这需要 PinPoint 的访问地址支持 Websocket 协议。

在 **网关** 中找到 **pinpoint-web 8080端口** 的域名，点击 **参数设置**，打开 websocket 支持。

## 使用 PinPoint

**部署示例 Java 应用**

1. 团队 -> 新增 -> 基于源码创建组件 -> 官方 DEMO，选择 Java Maven DEMO，创建组件。
2. 进入 Java 组件中 > 依赖 > 添加依赖组件 **Pinpoint-collector**
3. 进入 Java 组件监控 > 链路追踪 > 开启
4. 更新组件，即可在链路追踪中看到数据。
  

### 效果展示

​访问 **Pinpoint-web**，会看到上一步的应用名称

![](https://static.goodrain.com/images/docs/5.2/get-start/best-practices/work_with_apm/java-pinpoint.png)
  
### 微服务示例图

![](https://static.goodrain.com/images/docs/5.2/get-start/best-practices/work_with_apm/springcloud_pig-pinpoint.png)

### Pinpoint 说明

| Pinpoint版本 | 2.1.0 |
| -- | -- |
| applicationName | 默认取值组件应用名称 （注意不能使用中文名称） |
|  | 如不想改变组件名称，可修改组件环境变量 ES_TRACE_APP_NAME 来更改 applicationName |
| agentId | 取值POD变量HOSTNAME |
