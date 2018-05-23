---
title: 搭建基于API-Gateway（Kong）的微服务架构
summary: 搭建基于API-Gateway（Kong）的微服务架构
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 什么是Kong
当我们决定对应用进行微服务改造时，应用客户端如何与微服务交互的问题也随之而来，毕竟服务数量的增加会直接导致部署授权、负载均衡、通信管理、分析和改变的难度增加。

面对以上问题，API GATEWAY是一个不错的解决方案，其所提供的访问限制、安全、流量控制、分析监控、日志、请求转发、合成和协议转换功能，可以解放开发者去把精力集中在具体逻辑的代码，而不是把时间花费在考虑如何解决应用和其他微服务链接的问题上。

## 为什么使用Kong
在众多API GATEWAY框架中，Mashape开源的高性能高可用API网关和API服务管理层——KONG（基于NGINX）特点尤为突出，它可以通过插件扩展已有功能，这些插件（使用lua编写）在API请求响应循环的生命周期中被执行。于此同时，KONG本身提供包括HTTP基本认证、密钥认证、CORS、TCP、UDP、文件日志、API请求限流、请求转发及NGINX监控等基本功能。目前，Kong在Mashape管理了超过15,000个API，为200,000开发者提供了每月数十亿的请求支持。

## 怎样使用
我们在云帮的应用市场中已经为您准备好了Kong，可以一键试部署，下面介绍怎样在云帮平台中部署和使用Kong。

### 部署
首先登录云帮平台，在我的应用中新建一个组，然后在云市中找到Kong，将它安装在自定义的组中，如下：

![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/install-kong.png)

安装好以后，点击组名查看该组的拓扑图：

![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/installed-kong.png)

组件说明：
* `Kong`：这个就是kong，它具有对客户端请求的转发、认证、限流等功能。
* `Kong-Dashboard`：Kong的WEB客户端，通过它可以在页面上查看和管理Kong。
* `Kong-Database`：一个PostgreSQL数据库，它被Kong依赖，存放Kong运行时产生的数据。
* `newinfo`：一个用于测试的web服务，包含一个rest api：`GET /api/newinfos`。
* `person`：一个用于测试的web服务，包含一个rest api：`GET /api/persons`。
* `mysql5.5`：mysql数据库，被`newinfo`和`person`所依赖。

### 添加API
1. 等待所有组件启动以后，访问`Kong-Dashboard`组件，进入Kong的管理页面，点击`CREATE AN API`。
1. 填写以下选项，其它选项默认：
   * `name`: get-person
   * `uris`: /p
   * `method`: GET
   * `upstream_url`: http://127.0.0.1:8080/api/persons
1. 同样的方式将`newinfo`也添加进入。
1. 点击页面上的`APIs`，如下：
  
    ![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/apis-kong.png)

### 访问
接下来，回到云帮平台管理页面，访问Kong，并在其链接后加上`/p`就可以访问到`person`组件的`GET /api/persons`。

![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/access-api.png)

![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/accessed-api.png)

### 加入自定义API
假设我们现在有一个叫web的应用，它含有一个REST API：`GET /api/applist`，那么将这个API注册到Kong的步骤如下：

1. 将自定义的应用添加到Kong的依赖中，如下：
    
    ![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/add-dps.png)
1. 然后在弹出的框中选择自定义的应用。
1. 重启Kong。
1. 按照前面“添加API”的步骤，将自定义的API添加到Kong即可。

## 参考
1. [关于Kong的更多内容](https://github.com/cloudframeworks-apigateway/user-guide-apigateway)
