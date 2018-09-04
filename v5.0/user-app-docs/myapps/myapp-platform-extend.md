---
title: 扩展
summary: 为应用扩展插件。
toc: false
---
<div id="toc"></div>

- 云帮默认提供两款功能插件，用来优化您的应用。您可以在 **扩展** 中找到它们。默认情况下，它们是 **未开通** 的。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-extend1.png" style="border:1px solid #eee;max-width:100%" />

## 服务实时性能分析

- 点击 **服务实时性能分析** 右侧的 **开通** 即可安装该插件，该插件属于 **性能分析类插件** 。可以实时分析应用的吞吐率、响应时间、在线人数等指标。它的效果很直观，详情参见[监控](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-monitor.html)。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-extend2.png" style="border:1px solid #eee;max-width:100%" />

- 开通该插件后，您可以在 **已开通** 选项卡中找到该插件，点击 **显示配置** 后，您可以自定义该插件的配置项。
- 该插件监控了当前应用的端口，您可以配置 **OPEN** 选项，来决定是否开启当前端口分析。
- 您也可以通过点击决定是否 **停用** 或者 **卸载** 该插件。
- 该插件可以为任何开放了端口的应用配置。





## 依赖服务治理

- 点击 **依赖服务治理** 右侧的 **开通** 即可安装该插件，该插件属于 **网络治理类** 插件 。支持url前缀转发、域名转发、指定header转发、按权重转发、http请求限制、tcp熔断功能。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-extend3.png" style="border:1px solid #eee;max-width:100%" />

- 该插件的开通、停用、卸载方式与 **服务性能实时分析** 插件的开通方式一致，点击 **显示配置** 后，您可以自定义配置该插件。
- 该插件针对的是应用的 **下游应用** 即 **[依赖](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)** 。
- 您可以配置的选项有：
  - **PREFIX** 即url前缀转发。
  - **LIMITS** 即tcp熔断功能，设置为0时即熔断。
  - **MaxPendingRequets** 即http请求限制，设置为0时自动挂起。
  - **HEADERS** 指定header转发。
  - **DOMAINS** 即域名转发。
  - **WEIGHT** 按权重转发，将多个具有同一个域名的server按权重转发。
- 该插件可以为具有 **依赖** 的应用配置。





