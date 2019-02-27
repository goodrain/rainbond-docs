---
title: ServiceMesh微服务架构电商案例
summary: 电子商城 ServiceMesh 微服务架构案例
toc: true
toc_not_nested: false
asciicast: true
---



## Beat简介

在ELK中beats是用于数据采集的工具，相较于logstash，beats是更轻量级的工具。
Beats 平台集合了多种单一用途数据采集器。这些采集器安装后可用作轻量型代理，从成百上千或成千上万台机器向 Logstash 或 Elasticsearch 发送数据。

<img src="https://static.goodrain.com/images/article/ELKdemo/beats-platform.png" style="border:1px solid #eee;width:100%">

Beats平台提供了如下的几种具体收集日志的工具

工具名称 | 对应解释
---|---
Filebeat | 日志文件
Metricbeat | 指标
Packetbeat | 网络数据
Winlogbeat | windows事件日志
Auditbeat | 审计数据
Heartbeat | 运行心跳监控

### FileBeat简介

* 概述

Filebeat是一个日志文件托运工具，在你的服务器上安装客户端后，filebeat会监控日志目录或者指定的日志文件，追踪读取这些文件（追踪文件的变化，不停的读），并且转发这些信息到elasticsearch或者logstarsh中存放。

* 工作流程

当你开启filebeat程序的时候，它会启动一个或多个探测器（prospectors）去检测你指定的日志目录或文件，对于探测器找出的每一个日志文件，filebeat启动收割进程（harvester），每一个收割进程读取一个日志文件的新内容，并发送这些新的日志数据到处理程序（spooler），处理程序会集合这些事件，最后filebeat会发送集合的数据到你指定的地点。

如图


<img src="https://static.goodrain.com/images/article/ELKdemo/filebeat.png" style="border:1px solid #eee;width:100%">

更多详情参考[官方文档](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html)

## 云帮应用日志收集实践

### 插件制作

插件是以容器形式运行在云帮上的，所以制作插件就是制作一个可运行的镜像。我们以FileBeat为例 `（本文中的日志收集工具除特殊说明以外均为FileBeat工具）`：

#### dockerfile编写
    

云帮插件支持docker镜像和dockerfile两种创建的方式。这里我们以dockerfile为例。
`FileBeat`官方提供了docker镜像，因此我们只需在原来的镜像基础上进行定制化即可。[这里](https://github.com/goodrain-apps/filebeat)提供了云帮目前的日志收集插件的dockerfile。
    
#### 创建插件

在云帮左侧连接中点击我的插件，然后点击新建插件，便可指定创建插件的类型。
    
<img src="https://static.goodrain.com/images/article/ELKdemo/create_plugin.png" style="border:1px solid #eee;width:100%">
    
<img src="https://static.goodrain.com/images/article/ELKdemo/create_plugin_detail.png" style="border:1px solid #eee;width:100%">

对于dockerfile创建的插件，主要填写源代码的地址即可。填写完相关信息以后，点击`创建插件`按钮即可。
在此之后，还需要对插件进行构建，插件的创建和应用不一样，插件不会自动构建，需要手动进行此操作。如图-插件构建
    
<img src="https://static.goodrain.com/images/article/ELKdemo/build_plugin.gif" style="border:1px solid #eee;width:100%">
    
    
#### 配置
    
在上面提供的代码中，我们主要修改的配置有elasticsearch的用户名，密码，连接信息，以及对应的日志配置地址信息。具体修改的配置可参考下文中应用日志收集插件的详情。
在FileBeat插件中主要以环境变量的方式来配置插件运行环境。关于FileBeat插件的配置可以参考[官网文档](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html)
插件构建完成后，我们需要根据在代码中提供的获取参数的方式来进行配置，在FileBeat中，插件的配置是通过环境变量来进行配置的，关于FileBeat使用环境变量配置可以参考[Filebeat对环境变量的引用](https://www.elastic.co/guide/en/beats/filebeat/current/using-environ-vars.html)
    
云帮应用日志收集插件提供的参数中主要如下
    
| 配置项 | 默认值 | 详细说明 |
| --- | --- | --- |
| ES_HOST | 127.0.0.1 | es连接地址 |
| ES_PORT | 9200 | es连接端口 |
| KIBANA_HOST | 127.0.0.1 | kibana连接地址 |
| KIBANA_PORT | 5601 | kibana连接端口 |
| ES_USERNAME | elastic | es用户名 |
| ES_PASS | changeme | es用户名密码 |
| INPUT_PATH | /var/log/nginx/*.log | 日志地址 |
| NGINX_ACCESS_PATH | /var/log/nginx/access.log |nginx访问地址  |
| NGINX_ERROR_PATH | /var/log/nginx/error.log | nginx错误日志地址 |
|  APACHE2_ACCESS_LOG_PATH |/var/log/apache2/access.log  | apache访问日志地址 |
|  APACHE2_ERROR_LOG_PATH |/var/log/apache2/error.log  | apache访问错误日志地址 |
|  MYSQL_ERROR_LOG |/var/log/mysql/error.log  | mysql错误日志地址 |
|  MYSQL_SLOW_LOG |/var/log/mysql/mysql-slow.log  | mysql查询日志地址 |
|  MONGODB_LOG |/var/log/mongodb/*.log  | mongodb日志地址 |
|  INDEX_NAME | filebeat | elastic建立索引名称 |

    
配置完成后应用即可安装此插件进行日志收集。
    
    
### 云帮日志收集插件使用

云帮默认的应用日志收集插件为您提供了基于`nginx`、`mysql`、`apache`、`mongoDB`的日志分析。下面的案例我们主要以nginx为例进行说明

#### 安装ES和KIBANA

在云帮应用市场中搜索 `elasticsearch_kibana` 即可找到elasticsearch和kibana的应用组。如图

<img src="https://static.goodrain.com/images/article/ELKdemo/search_es.png" style="border:1px solid #eee;width:100%">

安装完成后，访问elasticsearch的访问地址会得到类似如下的信息

<img src="https://static.goodrain.com/images/article/ELKdemo/elasticsearch_info.png" style="border:1px solid #eee;width:100%">

访问kibana的访问地址会得到如下信息

<img src="https://static.goodrain.com/images/article/ELKdemo/kibana_info.png" style="border:1px solid #eee;width:100%">

后面会详细讲述有关kibana的使用。

#### 安装日志收集插件

* 安装插件

    在`我的插件`中从`内部市场`安装`应用日志收集插件`。


    <img src="https://static.goodrain.com/images/article/ELKdemo/plugin_install.png" style="border:1px solid #eee;width:100%">

    
* 应用安装插件

    在应用的插件页面，选择应用日志收集插件进行安装

    <img src="https://static.goodrain.com/images/article/ELKdemo/service_plugin_install.png" style="border:1px solid #eee;width:100%">


* 配置

    在应用日志安装完成后，我们需要针对已安装的elasticsearch和kinban的链接信息，以及nginx的配置信息做一些调整，如下。
    
     <img src="https://static.goodrain.com/images/article/ELKdemo/nginx_config.png" style="border:1px solid #eee;width:100%">

    关于配置的详细说明可参考上文中`应用日志收集插件提供的参数`信息。
    
    配置完成后重启应用即可。
    
    
#### kibana查看分析结果

以上操作做完后，就可以在Kibana中查看日志的信息结果了。

* 登录kibana

    打开kibana的界面，需要进行用户登录，登录的密码为elasticsearcha的用户名和密码，您可以在elasticsearch的链接信息中查询看到。
    
    <img src="https://static.goodrain.com/images/article/ELKdemo/login_kibana.png" style="border:1px solid #eee;width:100%">

* 查找对应模板

    熟悉kibana的朋友应该知道,初次使用时，需要[创建索引](https://www.elastic.co/guide/en/kibana/6.4/index-patterns.html) .但是使用应用日志收集插件，此过程会自动完成，创建索引的过程已在插件中默认完成。
    
    
     <img src="https://static.goodrain.com/images/article/ELKdemo/index_pattern.png" style="border:1px solid #eee;width:100%">
     
     如果所示， `filebeat-*` 为系统默认创建名称，如果您想修改，可以在插件的配置项中修改`INDEX_NAME`的值。
     
     
* 分析结果查看 
     
     对于Nginx日志，我们直接可以在kibana的`Discover`中查看分析结果，如图所示
     
      <img src="https://static.goodrain.com/images/article/ELKdemo/kibana_discover.gif" style="border:1px solid #eee;width:100%">
    
    kibana会根据默认的nginx日志模板分析出相应的nginx访问参数。

    也可以在`Dashboard`中查看访问日志的图表展示信息，如图
    
     <img src="https://static.goodrain.com/images/article/ELKdemo/kibana_dashboard.gif" style="border:1px solid #eee;width:100%">
     
     图中展示了nginx的用户访问量和访问错误信息，以及访问使用的客户端，点击相应的详情还能看到更多信息。
     更多关于kibana的使用可以参考[官网文档](https://www.elastic.co/guide/en/kibana/6.4/index.html)
     
     
## 进阶

参考此例和[Filebeat官方文档](https://www.elastic.co/guide/en/beats/filebeat/current/index.html)您可以创建您自己的应用日志收集插件，根据[Kibana官网文档](https://www.elastic.co/guide/en/kibana/6.4/index.html),您也可以根据自己的需求，绘画出属于自己的图表展示结果。
