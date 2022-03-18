---
title: 日志对接 ELK 体系
description: 本篇最佳实践讲解通过插件机制将日志对接 ELK 体系，适用于开发者和应用运维人员。
---

本文档适合同时使用 Rainbond、ELK 体系企业的 **应用开发运维人员** 阅读。

本文档适合的场景是：将运行于 Rainbond 的服务组件的日志通过`fileBeat日志收集插件`，对接 ELK 体系进行日志收集与分析。


### 前提条件

- 部署好的 Nginx 示例服务组件。
- 通过应用市场一键安装的 elasticsearch＿kibana 应用。
- 团队中有`fileBeat日志收集插件`默认插件。

以 Nginx 服务组件日志的收集为例，通过`fileBeat日志收集插件`，将 Nginx 的访问日志、错误日志上报 ElasticSearch，并通过 Kibana 展示。

### 连接 ELK

需要将 Nginx 组件依赖 Elasticsearch 和 Kibana，使 Nginx组件可以通过`fileBeat日志收集插件`默认配置的方式将日志推送到 ElasticSearch 中。

> 依赖其他组件后，需要更新组件该依赖关系才会生效。

### 插件的安装与开通

在团队视图中的我的插件页面中，选择`fileBeat日志收集插件`，点击安装，安装完成后，组件才可以使用该插件。

安装完成之后在组件管理页面的插件页面，在`未开通`列表中，找到`fileBeat日志收集插件`，点击右侧的`开通`按钮，开通该插件。之后该插件会出现在`已开通`列表中。

### 参数配置

可以点击该插件右侧的`查看配置`按钮，查看该插件的配置参数信息。

| 参数名称      | 默认值                    | 说明           |
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

> 在插件的配置项中，所有的变量都已经有了默认值。如需要，需要我们加以修改。其中 **ES＿HOST、ES＿PORT、ES＿USERNAME、ES＿PASS** 四个变量定义 Elasticsearch 的连接信息。**KIBANA＿HOST、KIBANA＿PORT** 指定了 Kibana 的连接地址。这里使用默认也可以生效的原因，是 Nginx 已经依赖了部署于 Rainbond 的 Elasticsearch、Kibana。

### 共享存储

插件收集日志需要共享组件的日志文件目录，需要将组件的日志文件目录共享给插件。可以通过挂载存储进行实现。

**在组件管理页面的存储页面，添加*`临时存储`*类型的存储，挂载路径填写组件会产生日志文件的路径。如 `/var/log/nginx` 。**

> 挂在存储后需要更新重启组件使其生效。

至此，通过默认插件`fileBeat日志收集插件`对接 ELK 体系进行日志收集与分析已经完成，如果发现 Kibana 中持续收集不到日志，请检查操作是否有误。

### 了解原理

FileBeat 通过类似于 `tail -f sth.log` 的方式，监控日志输出并上传到指定的 Elasticsearch。运行于 Rainbond 的服务组件，可以通过将日志目录持久化的方式，将日志文件和插件共享。通过这样的机制，基于 FileBeat 制作的插件，就可以监视到 Nginx 的日志。插件中的配置，是为了确定日志路径、以及指定 Elasticsearch、Kibana 的连接地址。

### 常见问题

- 组件未依赖 Elasticsearch 和 Kibana 导致收集不到日志

  可以在组件管理页面的依赖页面，选择从应用市场安装的 Elasticsearch 和 Kibana 进行依赖，重启更新后使其生效。

- 插件配置中，ES 密码 不匹配导致收集不到日志

  可以到 Elasticsearch 组件中查看其环境变量，确认 ES 密码，或者在组件的依赖页面查看，确认密码是否匹配。重启更新后使其生效。

- 依赖关系都存在，插件配置都正确收集不到日志

  可以尝试重启组件，确认所有的配置都生效了，再确认日志是否收集成功。