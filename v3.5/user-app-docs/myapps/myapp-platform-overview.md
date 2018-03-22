---
title: 总览
summary: 该样例为MySQL数据库服务，概览选项可以查看应用当前使用的物理资源、流量、费用等情况。还可以对应用进行重启、重新部署、开启/关闭等操作。
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

##功能简介

- 当您在列表视图下点击了应用的名字后，您就会跳转到该应用的控制台的总览界面，该界面显示了应用较为全面的状态信息，并且提供了该应用在启动与停止时的操作日志。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-overview1.png" style="border:1px solid #eee;max-width:100%" />

###控制台指令

- **访问** 点击即可访问该应用，但如果您没有设置[端口](myapp-platform-port.html)的对外服务，那么您将不能访问该应用。
- **关闭** 关闭当前应用。
- **重启** 重启当前应用。
- **管理容器** 在这里可以选择应用后端的节点（即实例），点击后可以登陆该节点的CLI(命令行界面)。您可以由此管理您应用的特定节点。
- **其他操作** 在这里，您可以修改该应用所属的应用组；删除应用的功能也在这里，删除后无法恢复，请慎重。
- **重新部署** 执行该操作，将把该应用按初始化设置重新部署，请慎重。

###总览

- **应用状态** 了解您的应用的运行状态，包括运行中、关闭、运行异常。如遇到运行异常，请及时联系我们。
- **平均响应时间** 平均响应时间是一个扩展的监控选项，默认不开通，详情参见[扩展](myapp-platform-plugin.html)。
- **吞吐率** 吞吐率也是一个扩展的监控选项，默认不开通，详情参见[扩展](myapp-platform-plugin.html)。
- **资源使用** 资源使用记录了应用所耗费的资源，包括内存与磁盘空间。
 
###启停操作日志

提供了应用启动与关闭的操作日志，点击右侧的查看详情，可以得到更多的信息。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-overview2.png" style="border:1px solid #eee;max-width:100%" />

- 启停日志提供了Info、Debug、Error三个级别的日志，如果您的应用在启动的时候遇到了问题，不能正常启动，请将至少Error日志提交给我们，这将是我们为您解决问题的重要依据。

<!--应用控制台模块主要是帮助您在创建了应用之后，对应用仍然需要调试，或者在应用后期需要扩容。为了满足您的各种需求，云帮在应用控制台开启 [监控](myapp-platform-monitor.html)、[日志](myapp-platform-logs.html)、[扩容](myapp-platform-capacity.html)、[依赖](myapp-platform-reliance.html)、[存储](myapp-platform-memory.html)、[端口](myapp-platform-port.html)、[设置](myapp-platform-settings.html)等功能。-->