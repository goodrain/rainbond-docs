---
title: 基于 PinPoint 实现微服务无侵入的监控与链路追踪
description: 本篇最佳实践讲解Rainbond微服务通信治理的熔断部分，适用于开发者和应用运维人员。
weight: 20
---

应⽤性能管理（Application Performance Management，APM）是指对企业的关键业务应⽤进⾏监测、优化，提⾼企业应⽤的可靠性和质量，保证⽤户得到良好的服务，降低 IT 总运维成本，为企业带来更多的商业利益。

Pinpoint 是一个 APM（应用程序性能管理）工具，适用于用 Java / PHP 编写的大型分布式系统。在使用上力图简单高效，通过在启动时安装 agent，不需要修改哪怕一行代码，最小化性能损失（3%）。


- 优势：  

   1）分布式事务跟踪，跟踪跨分布式应用的消息；  
   2）自动检测应用拓扑，帮助你搞清楚应用的架构；  
   3）水平扩展以便支持大规模服务器集群；  
   4）提供代码级别的可见性以便轻松定位失败点和瓶颈；  
   5）使用字节码增强技术，添加新功能而无需修改代码。  


- 主要组件

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint.jpeg" width="80%">


|      组件   |   组件功能 |
| :-------------: | :-----------------: | ---- |
| Pinpoint-Collector| 收集各种性能数据 |
| Pinpoint-Agent        | 探针与应用服务器（例如 tomcat) 关联，部署到同一台服务器上        |
| HBase Storage      | 收集到数据存到 HBase 中   |
| Pinpoint-Web      | 将收集到的数据层现在 web 展示  |

本文档适合需要通过 PinPoint 实施微服务监控与链路追踪的企业开发、测试、运维人员阅读。

本文档预设的场景是通过演示用例，学习如何将 PinPoint 部署在 Rainbond 环境中，并监控测试业务，并追踪其链路。



### 前提条件



- 本地共享库中已存在 **Java 性能分析示例** 应用模版，可以通过 [Java 性能分析示例离线包](https://goodrain-delivery.oss-cn-hangzhou.aliyuncs.com/zhongyijicheng/Java%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E7%A4%BA%E4%BE%8B-1.0.zip)导入。



### 操作步骤



通过共享库一键部署的方式，可以将 PinPoint、todo＿view、todo＿api 部署到你的 Rainbond 环境中去，其中 todo＿view、todo＿api 是用于验证的测试业务。



- **安装 Java 性能分析示例**

这种部署方式对于像 pinpoint 这种多组件的复杂应用来说，最大程度的降低了部署难度与工作量

![image-20200510204119884](https://tva1.sinaimg.cn/large/007S8ZIlly1genn0drg6pj320b0u0424.jpg)



- **配置 websocket**

PinPoint 支持实时显示链路追踪数据，这需要 pinpoint-web 的访问地址支持 websocket 协议。

在 **网关** 中找到 pinpoint-web 的域名，点击 **参数设置**，打开 websocket 支持。

![image-20200510204810433](https://tva1.sinaimg.cn/large/007S8ZIlly1genn7lmykij31is0u0whx.jpg)

- **运行效果**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1genn2hhm43j30u00uewfs.jpg" alt="image-20200510204317218" style="zoom:50%;" />

### 效果展示

todo＿view 会通过特定的路径访问 todo＿api，并借此和数据库交互。演示的效果就是监控并追踪这一条访问链路，todo＿view、todo＿api 使用的镜像已经集成 pinpoint-agent，具体集成方式见后文描述。

打开 pinpoint-web 的页面，就可以选择到 todo＿view 的相关链路，打开实时监控。

访问 todo＿view 指定路径 `/api/todos`、`/api/req`即可触发调用链路。最终效果显示如下：

- **调用链路显示**

![image-20200510205831735](https://tva1.sinaimg.cn/large/007S8ZIlly1genni900kfj31e70u0acf.jpg)



- **监控详情**

![image-20200510205948830](https://tva1.sinaimg.cn/large/007S8ZIlly1gennjjycw7j31qh0u0wpp.jpg)



### 集成 pinpoint-agent 的方法

PinPoint 是通过在 java 服务启动时，通过启动参数指定 pinpoint-agent 的路径以及参数来实现监控与链路追踪的。通过并行启动 agent，来实现不修改代码的无侵入链路追踪。按照下文，理解如何集成 agent。

当前 PinPoint 的版本为 v1.7.2，适配的 [pinpoint-agent 下载地址](https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/apps/pinpoint/pinpoint-agent-1.7.2-SNAPSHOT.tar.gz)。



- 在 war 启动过程中插⼊agent

 对于 war 包启动的项目，推荐使用 Dockerfile 或镜像部署。

 1）事先将 pinpoint-agent 资源打进镜像，示例代码中，pinpoint-agent 目录位于 /usr/local 下。

 2）关键代码：

**/usr/local/tomcat/bin/pinpoint-agent.sh**

```bash
#pinpoint-agent.sh
#指定pinpoint-agent资源
CATALINA_OPTS="$CATALINA_OPTS -javaagent:$PINPOINT_AGENT_PATH/pinpoint-bootstrap-${PINPOINT_AGETN_VERSION}-SNAPSHOT.jar"  
#指定pinpoint-agent ID
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.agentId=${AGENT_ID}" 
#指定应用名字
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.applicationName=${APP_NAME}" 
```

**docker-entrypoint.sh**

```bash
#docker-entrypoint.sh  
#判断是否开启pinpoint-agent
if [ "$ENABLE_APM" == "true" ];then  
#collector地址
 COLLECTOR_TCP_HOST=${COLLECTOR_TCP_HOST:-127.0.0.1} 
 COLLECTOR_TCP_PORT=${COLLECTOR_TCP_PORT:-9994}       
 COLLECTOR_UDP_SPAN_LISTEN_HOST=${COLLECTOR_UDP_SPAN_LISTEN_HOST:-127.0.0.1}
 COLLECTOR_UDP_SPAN_LISTEN_PORT=${COLLECTOR_UDP_SPAN_LISTEN_PORT:-9996}       
 COLLECTOR_UDP_STAT_LISTEN_HOST=${COLLECTOR_UDP_STAT_LISTEN_HOST:-127.0.0.1}
 COLLECTOR_UDP_STAT_LISTEN_PORT=${COLLECTOR_UDP_STAT_LISTEN_PORT:-9995}
#启动时加载agent
 sed -i "2 a. /usr/local/tomcat/bin/pinpoint-agent.sh" /usr/local/tomcat/bin/catalina.sh  
#导入到pinpoint-agent配置文件
 sed -i -r -e "s/(profiler.collector.ip)=.*/\1=${COLLECTOR_TCP_HOST}/" \     
 -e "s/(profiler.collector.tcp.port)=.*/\1=${COLLECTOR_TCP_PORT}/" \
 -e "s/(profiler.collector.span.port)=.*/\1=${COLLECTOR_UDP_SPAN_LISTEN_PORT}/" \
 -e "s/(profiler.collector.stat.port)=.*/\1=${COLLECTOR_UDP_STAT_LISTEN_PORT}/" /usr/local/pinpoint-agent/pinpoint.config
#默认值，在平台的每一个应用都会生成
export APP_NAME=${APP_NAME:-${SERVICE_NAME:-${HOSTNAME}}}
#通过APP_NAME，POD_IP区分一个服务下每一个实例的Agent-ID
export AGENT_ID=${APP_NAME}-${POD_IP} 
fi
```

> todo＿view、todo＿api 使用的基础镜像，是我们的技术人员专门制作的 tomcat 镜像，该镜像已经集成了上述功能，并支持 redis 缓存 session 功能，支持一键水平伸缩。
>
> 镜像地址：goodrainapps/tomcat:8.5.20-jre8-alpine
>
> ​                    goodrainapps/tomcat:7.0.82-jre7-alpine 
>
> 使用镜像时，指定环境变量 ENABLE＿APM = true 即可开启 pinpoint-agent。



- 在 jar 启动过程中插⼊agent

  对于 jar 包启动的项目，除了制作镜像与 Dockerfile 部署之外，也可以使用以下关键代码，用源码构建的方式部署。

  1）事先将 pinpoint-agent 资源放进源码仓库，将该目录放置在代码根目录下即可。

![image-20200510212758950](https://tva1.sinaimg.cn/large/007S8ZIlly1genocwlizoj31ah0u0gq1.jpg)

  2）关键代码：

**Procfile**

```bash
web: bash run.sh
```

**run.sh**

```bash
#!/bin/bash
#通过特定环境变量判断是否启动 pinpoint agent
if [[ $ENABLE_APM == "true" ]];then 
 AGENT_ID=${SERVICE_ID:0:10}
 PINPOINT_AGETN_VERSION=1.7.2
 PINPOINT_AGENT_PATH=/app/pinpoint
#将 pinpoint agent 启动参数加⼊到 $JAVA_OPTS 中 
export JAVA_OPTS="$JAVA_OPTS -javaagent:${PINPOINT_AGENT_PATH}/pinpoint-bootstrap-${PINPOINT_AGETN_VERSION}-SNAPSHOT.jar -Dpinpoint.agentId=${AGENT_ID:-${SERVICE_ID:0:10}} -Dpinpoint.applicationName=${APP_NAME:-${SERVICE_NAME:-$HOSTNAME}}"
fi
PORT=${PORT:-5000}
sleep ${PAUSE:-0}
#最终启动命令
exec java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```