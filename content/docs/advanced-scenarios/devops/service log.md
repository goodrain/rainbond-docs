---
title: Rainbond服务⽇志管理
Description: 'Rainbond服务日志管理及使用Filebeat插件对接 Elasticsearch'
hidden: true
---

<div id="toc"></div>

### 一. RAINBOND ⾃身⽇志管理机制

<center><img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log01.png" style="border:1px solid #eee;width:80%"/></center>

- node 服务

node 服务会监视 Docker 进程，观察其创建与销毁容器。获取⽂件系统中容器⽇志的路径，监视来⾃容器标准输出和标准错误输出，并以 UDP 协议分发到 rbd-eventlog 组件。

- rbd-eventlog 组件

接收来⾃ node 服务的推送，⽤ websocket 协议将⽇志内容推送到⽤户所操作的应⽤控制台。

> 日志没有正常推送的排查思路：

首先检查 node 服务的状态，再查看 rbd-eventlog 服务运行状态,看是否收到 node 服务推送的日志，如果正常，再查看 websocket 端口（端口 6060）安全组是否开放，推送地址在数据库中 console 库中 region_info 表中。

#### Rainbond ⽇志管理界面

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog02.png" width="100%">

**暂停推送**:
服务运行时一直在产生日志，对某一段日志特别关心时可以暂停推送，方便仔细查看这一段日志。

**历史日志下载**:
根据日期，以天为分割，提供日志下载。

**最近 1000 条日志**:
从当前日志开始，回滚之前 1000 条日志，提供静态日志分析。

### 二. 对接 Elasticsearch

> 以插件的形式，与应⽤⼀起运⾏ Filebeat 插件。对⽇志⽬录挂载⽂件存储，即可让 Filebeat 收集到指定的⽇志⽂件，并上报 Elasticsearch。

#### 2.1 构建 Filebeat 插件

Filebeat Github 项⽬地址 [Filebeat](https://github.com/goodrain-apps/filebeat)

> 认识 Filebeat 配置文件

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

**Rainbond 构建 Filebeat 插件实践**

（1）新增插件

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log03.png" width="100%">

> 插件类型分类：

- **入口网络**：生效在流量流入应用的最前面，对流量劫持进行处理，可以用来限流，设置黑白名单；
- **出口网络**：与入口网络相反，工作在出口，方便对下游网络进行治理；
- **出口入口共治网络**：结合前两者共同特点，既可以工作在入口网络，也可以工作在出口网络；
- **性能分析**：默认带性能分析插件，支持 Http 协议，MySQL 协议；
- **初始化类型**：初始化数据库；
- **一般类型**：只在同一个 pod 里和主体容器一起启动。

（2）添加环境变量配置

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log04.png" width="100%">

（3）根据代码，配置环境变量选项

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log05.png" width="100%">

（4）Filebeat 插件构建成功

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log07.png" width="100%">

（5） 查看已经配置好的配置项

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log06.png" width="100%">

#### 2.2 Nginx 日志对接 ES

- 应用市场一键构建 Elasticsearch，kibana 应用

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log08.png" width="100%">

#### 这里以 Nginx 应用为例

创建 nginx 应用，从 docker 镜像创建，镜像地址为`nginx:1.11`

在检测成功创建前点击`高级设置`-->`开通对外服务`-->并`持久化⽬标应⽤的⽇志路径`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog10.png" width="100%">

> Pod 里面同时存在两个容器：nginx 与 filebeat,资源是互相隔离的，此步骤的目的是挂载 Nginx 的日志，共享给 Filebeat，从而使 filebeat 收集 nginx 的日志

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/RainbondServiceLog/Service%20Log11.png" width="100%">

- 建立 Nginx 与 Elasticsearch，kibana 的依赖，参见[组件依赖](/docs/user-manual/component-connection/regist_and_discover/)

- 最终拓补图如下

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog12.png" width="100%">

- Nginx 添加已经制作好的 Filebeat 插件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog13.png" width="100%">

- 查看配置信息，更改错误的配置，更新配置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog14.png" width="100%">

- 从这里可以查看 kibana 的登录信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog15.png" width="100%">

- 访问 kibana 的 Web 页面，可以查看到 Nginx 的访问日志已经同步到 kibana

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/service-log/ServiceLog16.png" width="100%">
