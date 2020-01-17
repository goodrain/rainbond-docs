---
title: JAVA⽣态的微服务⽆侵⼊链路追踪
Description: "⽆侵⼊链路追踪APM⼯具Pinpoint"
hidden: true
---

<div id="toc"></div>


### 一. ⽆侵⼊链路追踪APM⼯具

应⽤性能管理(Application Performance Management,APM)
是指对企业的关键业务应⽤进⾏监测、优化，提⾼企业应⽤的可靠性和质量，保证⽤户得到良好的服务，降低IT总运维成本，为企业带来更多的商业利益。

#### Pinpoint简介

Pinpoint是一个APM（应用程序性能管理）工具，适用于用Java / PHP编写的大型分布式系统。在使用上力图简单高效，通过在启动时安装agent，不需要修改哪怕一行代码，最小化性能损失(3%)。


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


### 二. 快速在Rainbond部署 pinpoint

>基于Rainbond应用市场⼀键安装。

这种部署方式对于像pinpoint这种多组件的复杂应用来说，最大程度的降低了部署难度与工作量

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpont01.png" width="100%">

- 通过pinpoint-web应用进入到pinpoint的UI界面

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint02.png" width="100%">

- 在默认设置中，pinpoint应用 已经监控了它自身的 collector 、web组件。在进入UI界面后，就可以发现二者已经存在于应用列表中了

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint03.png" width="100%">

### 三. 添加被监控的对象

- 在war启动过程中插⼊agent

 1)事先将pinpoint-agent资源打进镜像;   
 2)插入启动关键代码：
 
```
#pinpoint-agent.sh
#指定pinpoint-agent资源
CATALINA_OPTS="$CATALINA_OPTS -javaagent:$PINPOINT_AGENT_PATH/pinpoint-bootstrap-${PINPOINT_AGETN_VERSION}-SNAPSHOT.jar"  
#指定pinpoint-agent ID
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.agentId=${AGENT_ID}" 
#指定应用名字
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.applicationName=${APP_NAME}" 
```

```
#docker-entrypoint.sh  
#判断是否开启pinpoint-agent
if [ "$ENABLE_APM" == "true" ];then  
#collector地址
 COLLECTOR_TCP_HOST=${COLLECTOR_TCP_HOST:-127.0.0.1} 
#TCP端口 
 COLLECTOR_TCP_PORT=${COLLECTOR_TCP_PORT:-9994}       
 COLLECTOR_UDP_SPAN_LISTEN_HOST=${COLLECTOR_UDP_SPAN_LISTEN_HOST:-127.0.0.1}
 COLLECTOR_UDP_SPAN_LISTEN_PORT=$
#UDP端口
{COLLECTOR_UDP_SPAN_LISTEN_PORT:-9996}        
 COLLECTOR_UDP_STAT_LISTEN_HOST=${COLLECTOR_UDP_STAT_LISTEN_HOST:-127.0.0.1}
 COLLECTOR_UDP_STAT_LISTEN_PORT=$
#UDP端口
 {COLLECTOR_UDP_STAT_LISTEN_PORT:-9995} 
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

- 在jar启动过程中插⼊agent

  1）事先将pinpoint-agent资源放进源码仓库；

  2）启动脚本内容：

```
#!/bin/bash
#通过特定环境变量判断是否启动 pinpoint agent
if [[ $ENABLE_APM == "true" ]];then 
 AGENT_ID=${SERVICE_ID:0:10}
 PINPOINT_AGETN_VERSION=1.7.2
 PINPOINT_AGENT_PATH=/app/pinpoint
#将 pinpoint agent 启动参数加⼊到 $JAVA_OPTS 中 
export JAVA_OPTS="$JAVA_OPTS -javaagent:$ 
{PINPOINT_AGENT_PATH}/pinpoint-bootstrap-${PINPOINT_AGETN_VERSION}-
SNAPSHOT.jar -Dpinpoint.agentId=${AGENT_ID:-${SERVICE_ID:0:10}} -Dpinpoint.applicationName=${APP_NAME:-${SERVICE_NAME:-
$HOSTNAME}}"
fi
PORT=${PORT:-5000}
sleep ${PAUSE:-0}
#最终启动命令
exec java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```


>传统架构下的pinpoint，需要在被监控的对象里附加Agent，并通过修改配置文件使之生效。在云帮平台上，我们将这两个步骤也做了相应的简化。

   云帮平台利用设置 **环境变量** 的方式，代替了配置文件，键值对形式的环境变量非常简单易用。
   
#### 添加Pinpoint监控对象实践
   
**方法一**

下面以todoapi为例，介绍添加被监控对象的方法

- 1. 关联Pinpoint-Collector

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint05.png" style="border:1px solid #eee;max-width:100%"/></center>

- 2. 查看 **连接信息**

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint06.png" style="border:1px solid #eee;max-width:100%"/></center>

- 3. 访问 Pinpoint-Web查看：

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint07.png" style="border:1px solid #eee;max-width:100%"/></center>

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint13.png" style="border:1px solid #eee;max-width:100%"/></center>

- 对于已部署的应用，也可以通过 [**应用管理界面**](/docs/stable/user-app-docs/myapps/myapp-introduce.html) 中的 **依赖** 、**设置** 选项卡，来配置相应的服务依赖和环境变量。

**方法二**

- 1. 开启Pinpoint-Collector对外服务后，平台网关会定义一层端口映射关系

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint08.png" style="border:1px solid #eee;max-width:100%"/></center>

- 2. 查看todoshow变量值，检查端口号是否正确，激活agent的开关

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint09.png" style="border:1px solid #eee;max-width:100%"/></center>

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint10.png" style="border:1px solid #eee;max-width:100%"/></center>

- 3. 访问 Pinpoint-Web查看，todoshow已经出现在界面上

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint11.png" style="border:1px solid #eee;max-width:100%"/></center>


- 在Pinpoint-Web中实时推送使用的是Websocket协议，但我们在访问Pinpoint-Web应用时使用的是http协议；所以不能实时接收推送，需在平台中 **应用网关**-->**访问控制**中找到Pinpoint-Web应用，点击**参数配置** 打开Websocket协议支持。

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/Pinpoint/pinpoint12.png" style="border:1px solid #eee;max-width:100%"/></center>


