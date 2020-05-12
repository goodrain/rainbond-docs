---
title: 日志对接 ELK 体系
description: 本篇最佳实践讲解Rainbond微服务通信治理的熔断部分，适用于开发者和应用运维人员。
weight: 20
---

本文档适合同时使用 Rainbond、ELK 体系企业的 **应用开发运维人员** 阅读。

本文档适合的场景是：将运行于 Rainbond 的服务组件的日志通过安装专门制作的插件，对接 ELK 体系进行日志收集与分析。



### 前提条件

- 部署好的 Nginx 示例服务组件。
- 通过共享库一键安装的 elasticsearch＿kibana 应用。

### 操作步骤

以 Nginx 服务组件日志的收集为例，通过制作插件的方式，将 Nginx 的访问日志、错误日志上报 ElasticSearch，并通过 Kibana 展示。

#### 插件源码

以 Elastic 出品的轻量级日志采集器 [FileBeat](https://www.elastic.co/cn/beats/filebeat) 为基础，可以制作出专门用来收集 Apache、Mongo、NGINX、MySQL 等服务的日志收集插件。

插件源码地址：https://github.com/goodrain-apps/filebeat/tree/nginx

关键代码解读：

**Dockerfile**

```dockerfile
#基础镜像选择filebeat官方镜像
FROM docker.elastic.co/beats/filebeat:6.3.2
#将filebeat全局配置文件拷贝到指定位置
COPY filebeat.yml /usr/share/filebeat/filebeat.yml
#将模块库拷贝到指定位置
COPY modules.d /usr/share/filebeat/modules.d
#指定运行用户
USER root
VOLUME ["/volume"]
#指定权限与属主
RUN chmod 777 /volume && \
chown root:filebeat /usr/share/filebeat/filebeat.yml
```

**filebeat.yml**

```yaml
filebeat.config:
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
  paths:
    #全局设置日志路径
    - ${INPUT_PATH:/volume/*.log}

processors:
- add_cloud_metadata:

# elasticsearch output info
output.elasticsearch:
  # 环境变量的方式指定了ES连接信息
  hosts: ['${ES_HOST:127.0.0.1}:${ES_PORT:9200}']
  username: ${ES_USERNAME:elastic}
  password: ${ES_PASS:changeme}
  timeout: 180
  backoff.max: 120

# kibanan setup
setup.kibana:
  # 环境变量的方式指定了Kibana连接方式
  host: "${KIBANA_HOST:127.0.0.1}:${KIBANA_PORT:5601}"
  username: "${ES_USERNAME:elastic}"
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
filebeat.modules:
# 指定选用的模块，如果为其他服务制作插件，此处应修改，如 mysql
- module: nginx
```

**modules.d/nginx.yml**

```yaml
- module: nginx
  access:
    enabled: true
    # 指定nginx访问日志路径
    var.paths: ["${NGINX_ACCESS_PATH:/var/log/nginx/access.log}"]
  error:
    enabled: true
    # 指定nginx错误日志路径
    var.paths: ["${NGINX_ERROR_PATH:/var/log/nginx/error.log}"]
```



#### 构建插件

- **访问插件页面，点击新建插件**

![image-20200509130437504](https://tva1.sinaimg.cn/large/007S8ZIlly1gem46wsgn3j31lb0u00wl.jpg)

- **输入基础信息**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gem4a2l2pzj30zr0u0766.jpg" alt="image-20200509130743583" style="zoom: 50%;" />

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1gem4a2l2pzj30zr0u0766.jpg" title="" style="zoom: 50%" >}}

> 如果选择安装来源为镜像，则需要输入可获取的镜像地址。

- **生成配置组**

![image-20200509131056597](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4dew7oej31hk0u077m.jpg)

所有环境变量、及其默认值设置见下表：

| 环境变量名称      | 默认值                    | 说明           |
| ----------------- | ------------------------- | -------------- |
| NGINX_ACCESS_PATH | /var/log/nginx/access.log | 访问日志路径   |
| NGINX_ERROR_PATH  | /var/log/nginx/error.log  | 错误日志路径   |
| INPUT_PATH        | /var/log/nginx/*.log      | FB日志收集路径 |
| ES_HOST           | 127.0.0.1                 | ES地址         |
| ES_PORT           | 9200                      | ES端口         |
| ES_USERNAME       | elastic                   | ES用户名       |
| ES_PASS           | changeme                  | ES密码         |
| KIBANA_HOST       | 127.0.0.1                 | KB地址         |
| KIBANA_PORT       | 5601                      | KB端口         |

- **构建插件**

设置完毕后，点击右上角的构建即可。



### 安装使用插件

- **运行于 Rainbond 的 Nginx 服务，需要开启存储中的持久化功能，将 Nginx 日志目录持久化保存**

![image-20200509131843531](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4ljk7msj327m0scwhr.jpg)





- **安装插件**

![image-20200509132140681](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4ol42bbj31j70u0jun.jpg)

- **配置插件**

![image-20200509132329680](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4qhlfmwj31qq0u0n0u.jpg)

> 在插件的配置项中，所有的变量都已经有了默认值。如需要，需要我们加以修改。其中 **ES＿HOST、ES＿PORT、ES＿USERNAME、ES＿PASS** 四个变量定义 Elasticsearch 的连接信息。**KIBANA＿HOST、KIBANA＿PORT** 指定了 Kibana 的连接地址。这里使用默认也可以生效的原因，是 Nginx 已经依赖了部署于 Rainbond 的 Elasticsearch、Kibana。



- **更新 Nginx**

点击右上角的更新，让所有的配置修改生效。



### 效果展示

Rainbond 云应用市场中已经集成了 Elasticsearch + Kibana 的应用模版，只需同步到本地即可一键安装。将 Nginx 依赖于前者之后，可见整体服务拓扑如下：

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gem4x80bwoj30lc0ssaar.jpg" alt="image-20200509132958224" style="zoom:50%;" />

插件安装配置完成后，访问 Nginx 造成流量，以激活访问日志输出。打开 Kibana 的面板，即可展示已收集到的 Nginx 日志：

![image-20200509133152607](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4z77rhuj31j00u0jy6.jpg)

![image-20200509133220062](https://tva1.sinaimg.cn/large/007S8ZIlly1gem4zom84zj31j20u0juk.jpg)



### 了解原理

FileBeat 通过类似于 `tail -f sth.log` 的方式，监控日志输出并上传到指定的 Elasticsearch。运行于 Rainbond 的服务组件，可以通过将日志目录持久化的方式，将日志文件和插件共享。通过这样的机制，基于 FileBeat 制作的插件，就可以监视到 Nginx 的日志。插件中的配置，是为了确定日志路径、以及指定 Elasticsearch、Kibana 的连接地址。