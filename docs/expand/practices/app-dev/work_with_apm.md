---
title: 基于 PinPoint 实现微服务无侵入的监控与链路追踪
description: 基于 PinPoint 实现微服务无侵入的监控与链路追踪，适用于开发者和应用运维人员。
---

应⽤性能管理（Application Performance Management，APM）是指对企业的关键业务应⽤进⾏监测、优化，提⾼企业应⽤的可靠性和质量，保证⽤户得到良好的服务，降低 IT 总运维成本，为企业带来更多的商业利益。

Pinpoint 是一个 APM（应用程序性能管理）工具，适用于用 Java / PHP 编写的大型分布式系统。在使用上力图简单高效，通过在启动时安装 agent，不需要修改哪怕一行代码，最小化性能损失（3%）。


- 优势：  

   1）分布式事务跟踪，跟踪跨分布式应用的消息；  
   2）自动检测应用拓扑，帮助你搞清楚应用的架构；  
   3）水平扩展以便支持大规模服务器集群；  
   4）提供代码级别的可见性以便轻松定位失败点和瓶颈；  
   5）使用字节码增强技术，添加新功能而无需修改代码。  


- 本文档适合需要通过 PinPoint 实施微服务监控与链路追踪的企业开发、测试、运维人员阅读。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint.jpeg" title="PinPoint组件" width="80%" />

|      组件   |   组件功能 |
| ------------- | ----------------- |
| Pinpoint-Collector| 收集各种性能数据 |
| Pinpoint-Agent        | 探针与应用服务器（例如 tomcat) 关联，部署到同一台服务器上        |
| HBase Storage      | 收集到数据存到 HBase 中   |
| Pinpoint-Web      | 将收集到的数据层现在 web 展示  |

本文档适合需要通过 PinPoint 实施微服务监控与链路追踪的企业开发、测试、运维人员阅读。

本文档预设的场景是通过演示用例，学习如何将 PinPoint 部署在 Rainbond 环境中，并监控测试业务，并追踪其链路。

### 前提条件

* 必须是基于源码构建的 Java项目，默认都会集成 pinpoint-agent。

### 操作步骤


通过官方应用市场一键部署的方式，可以将 PinPoint部署到你的 Rainbond 环境中去。

- **安装Pinpoint**

  ​	1）进入团队视图 > 新增 > 基于应用市场创建组件 。

  ​	2）在Rainbond社区开源商店中搜索 **pinpoint** > 安装 ，安装最新版本 **2.1.0**。

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/install-pinpoint.jpg" title="安装示例" width="100%" />

- **配置 websocket**

  PinPoint 支持实时显示链路追踪数据，这需要 pinpoint 的访问地址支持 websocket 协议。

  在 **网关** 中找到 **pinpoint-web 8080端口**的域名，点击 **参数设置**，打开 websocket 支持。

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/port-websocket.jpg" title="开启WebSocket" width="100%" />

- **运行效果**

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/pinpoint.jpg" title="运行效果" width="100%" />

- **使用官方DEMO演示 Pinpoint-agent**

  ​	1）参考 [快速入门](/docs/use-manual/get-start/team-management-and-multi-tenancy) 安装基于源码创建的组件

  ​	2）进入第一步创建的组件视图 > 依赖 > 添加依赖组件名称**Pinpoint-collector** 。

  ​	3）进入组件监控 > 链路追踪 > 开启 。

  ​	4）更新组件 。

  **效果展示：**

  ​		访问 **Pinpoint-web**，会看到上一步的应用名称。至此，完成。

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/java-pinpoint.png" title="运行效果" width="100%" />

  **Spring Cloud Pig** 效果展示：

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/springcloud_pig-pinpoint.png" title="Spring Cloud Pig运行效果" width="100%" />

- **Pinpoint说明**

  | Pinpoint版本 | 2.1.0 |
  | -- | -- |
  | applicationName | 默认取值组件应用名称 （注意不能使用中文名称） |
  |  | 如不想改变组件名称，可修改组件环境变量 ES_TRACE_APP_NAME 来更改 applicationName |
  | agentId | 取值POD变量HOSTNAME |

### 常见问题

  - **pinpoint-hbase**组件一直初始化或不健康状态

    >  尝试把 **pinpoint-hbase**  组件的存储改为本地存储。如还是起不来，建议换掉08年的硬盘。

* 依赖添加了，也在监控 > 链路追踪 开启了，为啥Pinpoint web页面 APP_LIST 没有我的应用

  >  请检查是否更新了组件。如更新了组件请查看日志是否有 **pinpoint-agent**启动日志。

* 用了一段时间**pinpoint**突然不能访问了

  >  在**伸缩** > 查看实例内存占用情况，尝试加大内存，默认给的1G。
  >
* 为什么我的源码构建没有默认集成**pinpoint-agent**

  请更新builder镜像：

  ```shell
  #拉取最新builder镜像
  docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder:5.2.0
  #重新打tag，推送到默认镜像仓库
  docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:5.2.0 goodrain.me/builder:latest
  docker push goodrain.me/builder:latest
  #新安装的则不需要更新镜像。
  ```

