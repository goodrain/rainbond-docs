---
title: ELK日志对接实践
summary: 介绍ELK、云帮部署ELK、以及如何使用
toc: false
---
<div id="toc"></div>

## 概述

### ELK简介

- **何为ELK** 

即Elasticsearch，Logstash和Kibana.

Elasticsearch是一个基于 Lucene 构建的开源，分布式，RESTful 搜索引擎; <br />
Logstash是一个服务器端数据处理管道，可同时从多个源获取数据，将其转换，然后将其发送到像Elasticsearch这样的"存储"; <br />
Kibana允许用户通过Elasticsearch中的图表和图表可视化数据。<br />


- **为什么使用ELK** 

对于有一定规模的公司来说，通常会很多个应用，并部署在大量的服务器上。运维和开发人员常常需要通过查看日志来定位问题。如果应用是集群化部署，试想如果登录一台台服务器去查看日志，是多么费时费力。
而通过 ELK 这套解决方案，可以同时实现日志收集、日志搜索和日志分析的功能。

### 架构

 <center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/arch.png" style="border:1px solid #eee;max-width:100%"/></center>
 
  - Beats (单一用途的数据传输平台，将多台数据发送到Logstash或者ElasticSearch,可缺省)
  - Logstash (动态数据收集管道)
  - Elasticsearch (核心,集中存储数据)
  - Kibana (用户界面，将收集的数据进行可视化展示，并提供配置管理ELK界面)

## 云帮最佳实践

### 出发点

从文档来看安装部署ELK，步骤比较繁琐, 为此，云帮在云市里提供了[Elasticsearch&Kibana应用](https://www.goodrain.com/app/detail/140)。通过这种方式，可以一键部署EK服务，简化部署操作流程。支持多种日志相关插件,陆续会在云市上线。

### 云市安装

- 进入云帮,创建应用,选择 **从应用市场安装**,在搜索栏里搜索 `elasticsearch_kibana`

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/install-ek.png" style="border:1px solid #eee;max-width:100%"/></center>


- 选择 **应用分组**

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/install-elk-group.png" style="border:1px solid #eee;max-width:100%"/></center>

- 点击 **确定** ，等待1,2分钟后，应用就部署完成了

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/ek-tp.png" style="border:1px solid #eee;max-width:100%"/></center>

### 访问KiBana ui

- 我们可以通过访问 **kibana** 应用，来进入到kibana的UI界面。

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/kibana-ui.png" style="border:1px solid #eee;max-width:100%"/></center>

- 在我们的默认设置中，安装完什么数据都没有，需要配置日志相关插件。

### 插件创建

#### 版本基础信息
插件构建目前支持从`镜像`和`源码Dockerfile`这两种方式。
插件类型默认选择一般插件类型，即通用类型。

示例如下:

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/logstash-create-plugin-001.png" style="border:1px solid #eee;max-width:100%"/></center>

#### 配置组管理

大部分情况下都是不依赖元数据类型。  
注入类型默认选择环境变量。

logstash插件目前版本支持3种配置方式：

1. 远程配置文件, 插件启动时去下载
2. 本地配置文件, 即配置文件放在项目目录下
3. 默认简单自定义配置。

目前插件不支持三种配置方式同时生效。

```
remote_conf_url:  # 远程配置地址
local_conf_url: # 项目本地配置地址

GRLOGTYPE: systemlog #唯一类型
GRLOGPATH: /var/log/messages #日志收集源的文件路径
GRLOGPOSITION: beginning #第一次收集日志从头开始
GRLOGINTERVAL: 10 #日志收集间隔
ELASTICSEARCH_HOST: 127.0.0.1:9200 #指定elasticsearch集群节点地址
GRCODEC: rubydebug #插件默认rubydebug，支持其他plain,json. 后续支持multiline
GREPASS: MagicWord #elasticsearch密码
GREUSER: elastic #elasticsearch用户
```

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/plugin-config.png" style="border:1px solid #eee;max-width:100%"/></center>

- 配置项配置完成, 点击 **构建** 创建 

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/build-plugin.jpeg" style="border:1px solid #eee;max-width:100%"/></center>

- 到此为止, 插件构建完成

## DEMO实例：采集Nginx日志

- 通过`Docker Run`部署nginx应用

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/docker-run-nginx.png" style="border:1px solid #eee;max-width:100%"/></center>

- 持久化Nginx的日志目录

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/nginx-log.png" style="border:1px solid #eee;max-width:100%"/></center>

- 开通logstash插件

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/open-plugin.png" style="border:1px solid #eee;max-width:100%"/></center>

- 配置logstash插件

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/config-plugin.png" style="border:1px solid #eee;max-width:100%"/></center>

建议更新一下内存配置为1G

- 重启应用
- 配置kibana

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/kibana-index.png" style="border:1px solid #eee;max-width:100%"/></center>

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/nginx-next.png" style="border:1px solid #eee;max-width:100%"/></center>

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/configure-setting.png" style="border:1px solid #eee;max-width:100%"/></center>

### 效果展示

<center><img src="https://static.goodrain.com/images/docs/3.5/best-practice/add-on/logstash/show.jpeg" style="border:1px solid #eee;max-width:100%"/></center>

## 相关资料

如果想要进一步了解这款ELK解决方案，请访问以下链接：

- 官方文档：[https://www.elastic.co/guide/index.html](https://www.elastic.co/guide/index.html)
- Github代码托管：[https://github.com/elastic](https://github.com/elastic)