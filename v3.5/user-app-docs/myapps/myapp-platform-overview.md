---
title: 概览
summary: 该样例为MySQL数据库服务，概览选项可以查看应用当前使用的物理资源、流量、费用等情况。还可以对应用进行重启、重新部署、开启/关闭等操作。
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

&emsp;&emsp;应用控制台模块主要是帮助您在创建了应用之后，对应用仍然需要调试，或者在应用后期需要扩容。为了满足您的各种需求，云帮在应用控制台开启 [监控](myapp-platform-monitor.html)、[日志](myapp-platform-logs.html)、[扩容](myapp-platform-capacity.html)、[依赖](myapp-platform-reliance.html)、[存储](myapp-platform-memory.html)、[端口](myapp-platform-port.html)、[设置](myapp-platform-settings.html)等功能。

以MySQL数据库服务为例，概览选项可以查看应用当前使用的物理资源、流量、费用等情况。还可以对应用进行重启、重新部署、开启/关闭等操作:

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-overview-1.png" style="border:1px solid #eee;max-width:100%" />

{{site.data.alerts.callout_success}}

费用功能仅限于公有云

{{site.data.alerts.end}}

## 管理/访问

根据部署不同应用，显示不同可操作按钮。

### 管理

以MySQL为例，点击 **管理** 您可以添加新的应用与当前MySQL服务建立[依赖](myapp-platform-reliance.html)关系，平台默认新建应用 **phpMyAdmin** 与该MySQL应用建立依赖。

如图：<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-overview-2.png" style="border:1px solid #eee;max-width:100%" />

显示内容为MySQL应用的连接信息，通过其他应用依赖当前MySQL时使用以上变量连接。

### 访问

若您创建的是Web应用，点击 **访问** 云帮会直接访问对应Web页面。

## 重启

关闭应用并使用最新配置重启应用。

##重新部署

基于最新代码或镜像构建云帮应用，并回滚更新实例。功能会触发平台再次进行构建、部署、运行这三个步骤。如果代码有更新，会拉取最后一次提交的代码；如果代码部署成功就会自动运行起来，这时点击 **访问** 按钮就可以打开应用页面。在日志中里也有相关版本信息，支持一键回滚到相应版本。

## 开启/关闭

   - 应用部署后程序可以点击`开启`启动应用，一件部署云帮会自动启动应用。
   - 应用开启后可以点击`关闭`来关闭应用。

## 操作记录

显示启动、关闭、部署等信息。

   - 部署
        - Info日志
        - Debug日志
        - Error日志
   - 回滚到此版本：根据日志中相关版本信息，支持一键回滚到相赢版本。