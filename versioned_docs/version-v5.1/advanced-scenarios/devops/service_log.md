---
title: Rainbond服务⽇志管理
Description: "Rainbond服务日志管理及使用Filebeat插件对接 Elasticsearch"
---



### 一. RAINBOND⾃身⽇志管理机制



<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log01.png" width="70%" />


- node服务

 node服务会监视Docker进程，观察其创建与销毁容器。获取⽂件系统中容器⽇志的路径，监视来⾃容器标准输出和标准错误输出，并以UDP协议分发到rbd-eventlog组件。
 
- rbd-eventlog组件

 接收来⾃node服务的推送，⽤websocket协议将⽇志内容推送到⽤户所操作的应⽤控制台。
 
>日志没有正常推送的排查思路：

  首先检查node服务的状态，再查看rbd-eventlog服务运行状态,看是否收到node服务推送的日志，如果正常，再查看websocket协议（端口6060）安全组是否开放，推送地址在数据库中console库中region_info表中。
 
####   Rainbond⽇志管理界面

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log02.png" width="100%" />

  **暂停推送**:
服务运行时一直在产生日志，对某一段日志特别关心时可以暂停推送，方便仔细查看这一段日志。

 **历史日志下载**:
根据日期，以天为分割，提供日志下载。

**最近1000条日志**:
从当前日志开始，回滚之前1000条日志，提供静态日志分析。


### 二. 对接 Elasticsearch

>以插件的形式，与应⽤⼀起运⾏Filebeat插件。对⽇志⽬录挂载⽂件存储，即可让Filebeat收集到指定的⽇志⽂件，并上报Elasticsearch。

#### 2.1 构建Filebeat插件

  Filebeat Github项⽬地址 [Filebeat](https://github.com/goodrain-apps/filebeat)

>认识Filebeat配置文件

```
filebeat.config: 
 #相关模块配置路径
   prospectors:    
    path: ${path.config}/prospectors.d/*.yml
    reload.enabled: true
  modules:
    path: ${path.config}/modules.d/*.yml
    reload.enabled: true

# config file input
filebeat.inputs:
- type: log
  enabled: true
  paths:  #Filebeat认知日志文件路径
      - ${INPUT_PATH:/volume/*.log}  

processors:
- add_cloud_metadata:

# elasticsearch output info
output.elasticsearch:    #elasticsearch配置
#通过环境变量配置主机端口
  hosts: ['${ES_HOST:127.0.0.1}:${ES_PORT:9200}']
#通过环境变量配置用户
  username: ${ES_USERNAME:elastic}
#通过环境变量配置密码
  password: ${ES_PASS:changeme}   
# index: "${INDEX_NAME:filebeat}-%{[beat.version]}-%{+yyyy.MM.dd}"
  timeout: 180
  backoff.max: 120

# kibanan setup
setup.kibana:      #kibana配置
#通过环境变量配置主机端口
  host: "${KIBANA_HOST:127.0.0.1}:${KIBANA_PORT:5601}"
#通过环境变量配置用户名
  username: "${ES_USERNAME:elastic}" 
#通过环境变量配置密码
  password: "${ES_PASS:changeme}"   
     
 setup.template.enabled: true

# if you change output.elasticsearch you have to change this two settings
# setup.template.name: "${INDEX_NAME:filebeat}"
# setup.template.pattern: "${INDEX_NAME:filebeat}-*"

# enable dashboards
setup.dashboards.enabled: true
# setup.dashboards.index: "${INDEX_NAME:filebeat}-*"
setup.dashboards.retry.enabled: true
setup.dashboards.retry.interval: 3
setup.dashboards.retry.maximum: 20

# enable modules 
 #Filebeat可用模块
filebeat.modules:     
- module: nginx
- module: mysql
- module: apache2
- module: mongodb
```


**Rainbond构建Filebeat插件实践**

（1）新增插件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log03.png" width="100%" />

>插件类型分类：

- 入口网络：生效在流量流入应用的最前面，对流量劫持进行处理，可以用来限流，设置黑白名单；    
- 出口网络：与入口网络相反，工作在出口，方便对下游网络进行治理；     
-  出口入口共治网络：结合前两者共同特点，既可以工作在入口网络，也可以工作在出口网络；    
-  性能分析：默认带性能分析插件，支持Http协议，MySQL协议；  
-  初始化类型：初始化数据库；  
-  一般类型：只在同一个pod里和主体容器一起启动。  

（2）添加环境变量配置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log04.png" width="100%" />

（3）根据代码，配置环境变量选项

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log05.png" width="100%" />

（4）Filebeat插件构建成功

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log07.png" width="100%" />

（5） 查看已经配置好的配置项

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log06.png" width="100%" />

#### 2.2 Nginx日志对接ES

- 应用市场一键构建Elasticsearch，kibana应用

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log08.png" width="100%" /> 

- 这里以Nginx应用为例

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log09.png" width="100%" /> 

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log10.png" width="100%" /> 

- 开通对外服务并持久化⽬标应⽤的⽇志路径

>Pod里面同时存在两个容器：nginx与filebeat,资源是互相隔离的，此步骤的目的是挂载Nginx的日志，共享给Filebeat，从而使filebeat收集nginx的日志

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log11.png" width="100%" /> 

- 建立Nginx与Elasticsearch，kibana的依赖

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log12.png" width="100%" /> 

- Nginx添加已经制作好的Filebeat插件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log13.png" width="100%" /> 

- 查看配置信息，更改错误的配置，更新配置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log14.png" width="100%" /> 

- 从这里可以查看kibana的登录信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log15.png" width="100%" />

- 访问 kibana的Web页面

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log16.png" width="100%" />

- 可以查看到Nginx的访问日志已经同步到kibana

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log17.png" width="100%" />

