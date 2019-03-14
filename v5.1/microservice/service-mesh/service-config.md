---
title: 应用动态配置
summary: 应用和插件的相关配置
toc: false
toc_not_nested: true
asciicast: true
---

配置管理的前提是程序与配置要分离，如果是写死代码的话，配置管理也就无从谈起了。还需注意配置应当持久化保存，避免重启容器后配置还原。配置管理分为两个部分：

## 静态配置

在应用启动时，云帮通过应用控制台中的[设置-自定义环境变量](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-settings.html#part-3c7bec83e797ac2a)为应用注入变量。不同的模式传入不同的变量值，在应用启动时通过环境变量完成配置。

例如开发人员进行调试时，可自定义`DEBUG=true/false`来进行代码调试。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc8.png" width="80%" />

## 基于动态发现的运行时配置

云帮集成插件——[依赖服务治理]() 来描述与解决微服务之间各组件之间的依赖关系。并为应用运行时提供信息动态发现能力，实时配置，即刻生效。当前版本支持以下功能：

- PREFIX：URL前缀path配置，例如/api
- DOMAINS：内网请求域名配置，基于配置的域名转发至下游应用。
- WEIGHT：转发权重设置，范围1~100。规定相同的DOMAINS与PREFIX组合情况下，权重总和为100。具体体现可见下文
- HEADERS：HTTP请求头设置
- LIMITS：TCP限速，设0则熔断
- MaxPendingRequests：HTTP挂起请求，设0则挂起

详细描述参考插件——[依赖服务治理]() ，具体操作示范参考以下微服务应用示例。

## 实践示例

本示例演示 `Web端调用服务接口读取数据库，将返回请求结果响应回Web` 的简单示例，可以本示例的配置顺序、步骤描述来部署微服务架构类应用：

### 创建

提供多种创建方式，可从镜像、从源码创建应用。服务型应用也可直接从应用市场、[云市](www.goodrain.com)创建，例如MySQL、Redis、RabbitMQ等。

- 创建服务调用端`microservice-web`，服务提供端`user-api1`、`user-api2`、`user-api3`，数据库`MySQL`
- 根据[创建应用-应用设置](https://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-code.html#part-2c9f27d6be436681)完成服务运行前配置：指定web访问端口、api服务端口、数据库服务端口

### 依赖

描述应用的依赖关系有两种方法：

- 在[创建应用-应用设置](https://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-code.html#part-2c9f27d6be436681)选择应用应用关联。
- 在[应用控制台-依赖](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)选择应用应用关联。

依赖关系配置完成后，关系拓扑图为：

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc13.png" width="25%" />

{{site.data.alerts.callout_success}}

- 在选择应用关联时请确认此应用已正常部署运行，若未正常运行在可选依赖列表中是不会有该应用显示的。
- 在应用控制台-依赖设置完毕依赖关系，需重启应用以适配

{{site.data.alerts.end}}

### 配置

如图，该部分是配置`microservice-web`的依赖服务治理插件的具体配置：

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc9.png" width="100%" />

其配置效果如下：

- 访问主页

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc10.png" width="50%" />


- 访问地址传入内部域名的值为test，并转发页面至前缀为api接口的页面。需要注意的是WEIGHT的值，此处将user-api的权重设为10，user-api2的权重设为90。相当于相同请求的情况下，访问到应用为user-api的概率是非常小的了。

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc11.png" width="60%" />

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc12.png" width="60%" />

  {{site.data.alerts.callout_success}}

  - 前缀为api的演示效果是返回当前接口ID
  - 权重：权重是一个相对的概念，针对某一指标而言。某一指标的权重是指该指标在整体评价中的相对重要程度。权重是要从若干评价指标中分出轻重来，一组评价指标体系相对应的权重组成了权重体系。

  {{site.data.alerts.end}}

- 依赖服务治理中未指明其他内部域名与前缀关系的权重，则访问其他接口不受权重影响

- LIMITS与MaxPendingRequests需根据依赖服务开放端口类型来进行配置。此处user-api*的开放端口类型为HTTP，那么此处可设置MaxPendingRequests来进行HTTP挂起功能。若设MaxPendingRequests为0，则挂起，其效果如图：

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc14.png" width="60%" />

  {{site.data.alerts.callout_success}}

  HTTP类型应用，配置LIMITS不受影响

  {{site.data.alerts.end}}

- HTTP请求头默认为no