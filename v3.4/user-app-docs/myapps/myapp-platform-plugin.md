---
title: 插件
summary: 扩展应用功能与服务治理等
toc: false
---

<div id="toc"></div>

## 新增功能，rainbond插件功能

伴随插件功能上线，rainbond提供了两款插件体验该功能:

* 性能分析
* 服务治理

##安装默认插件: 
1.  打开云帮控制台首页 -> 点击收起“我的应用”
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin1.png" style="border:1px solid #eee;max-width:100%" />

  2.点击“我的插件” -> 点击“安装云帮插件”
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin2.png" style="border:1px solid #eee;max-width:100%" />

  3.页面刷新后会在当前租户当前数据中心自动安装上两个rainbond提供的插件 
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin3.png" style="border:1px solid #eee;max-width:100%" />

##插件的使用
1.  点击“我的应用” ->  选择一个应用，点击进入应用控制界面
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin4.png" style="border:1px solid #eee;max-width:100%" />

  2.点击右上方“插件”，选择一个插件点击“安装” 
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin5.png" style="border:1px solid #eee;max-width:100%" />

  3.点击安装后显示“安装成功”的提示，插件安装成功后，需要`重启应用`来使插件生效；重启应用后，可以点击“查看详情”对当前应用的插件进行配置 
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin6.png" style="border:1px solid #eee;max-width:100%" />

  4.详情展开后，可以看到该插件的版本信息，内存信息等，鼠标滑动至配置选项处，可以看到该配置项的具体说明，会涉及配置值域范围说明，配置注意事项等，在使用插件时需要详细阅读插件的详情说明以及配置项说明。修改完配置后，点击更新配置，可以使配置`实时`起效
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin7.png" style="border:1px solid #eee;max-width:100%" />

##云帮两个默认插件的具体介绍

###依赖服务治理插件

>服务治理提供了url前缀转发、域名转发、指定header转发、按权重转发、http请求限制、tcp熔断功能等功能，每个功能对应在配置中体现，由多种配置或几个下游集群配置组合来实现各种情况的服务治理功能。

    注意：该插件会接管当前应用的出口网络，必须在当前应用依赖了下游应用后才可以安装使用。在未依赖下游应用的情况下会出现如下警告： 
<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin8.png" style="border:1px solid #eee;max-width:100%" />

- 插件配置项说明 
  <img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin9.png" style="border:1px solid #eee;max-width:100%" />


1. **DOMAINS**
>内网请求域名配置，基于配置的域名转发至下游应用

	通过配置后，会影响当前应用对下游依赖应用的访问，例如，将DOMAINS配置为“tomcat”，则当前应用可以直接访问域名tomcat 来访问到下游应用。当下游应用为两个（或两个以上）时，配置DOMAINS则可以使当前应用分别使用自定义的别称域名来访问下游应用。

2. **PREFIX** 
>URL前缀path配置，例如/api

	配置该参数后，会按照所配置的uri请求前缀来进行转发；但是在有DOMAINS配置的情况下会优先匹配到DOMAINS，然后匹配到uri，配置时需要注意。

3. **WEIGHT** 
>转发权重设置，范围1~100

	当所配置两个下游应用`DOMAINS、PREFIX`相同时，会引发WEIGHT参数，会控制向下游应用转发的权重，如下图所示： 
	<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-plugin10.png" style="border:1px solid #eee;max-width:100%" />
	此时，当前应用请求 rainbond.lan时 会因为权重的控制将请求以3:7的比例进行分配。插件会认为所有设置相同`DOMAINS、PREFIX`的下游应用为分配权重的对象，总的权重值为 100，若配置的总权重值不等于100，则会引发错误，影响访问。

4. **HEADERS**  
>HTTP请求头设置

	headers的配置为k:v格式，多个由“;”隔开，例如header1:mm;header2:nn。插件会依据请求头来进行对应的转发，需要注意填写headers的配置格式，否则会引发错误。

5. **LIMITS**  
>TCP限速

	tcp请求生效，配置范围0～2048，于框体内填入数字，若配置0则触熔断

6. **MaxPendingRequests**
>HTTP挂起请求

	http请求生效，配置范围0～2048，于框体内填入数字，配置0则立即挂起请求
### 服务实时性能分析插件

>服务实时性能分析插件目前提供对应用指定端口服务进行实时的吞吐率，响应时间，在线人数，请求Endpoint(HTTP:Path Mysql:Sql)排行分析。rainbond应用监控部分根据是否安装此插件显示分析结果。
* 设计思想：
    性能分析插件抓取指定端口的网络通信包，根据不同的应用层协议，分析出实时的应用吞吐情况，直接反应当前应用的性能指标。这样做的优点是可以快速支持多种协议的分析，形成一组标准的，合理的应用伸缩依据。
* 版本计划
  当前版本支持Mysql和HTTP协议，未来版本支持Redis,Postgresql,Dubbo-RPC等协议。
