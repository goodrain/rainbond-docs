---
title: 设置
summary: 设置模块可以满足您对当前应用的 基础信息、自定义环境变量、应用健康监测、权限、是否删除的管理。
toc: false
---

<div id="toc"></div>

&emsp;&emsp;设置模块可以满足您对当前应用的 基础信息、自定义环境变量、应用健康监测、权限、是否删除的管理：

## 基础信息

设置当前应用的基础信息：

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-settings-1.png" style="border:1px solid #eee;max-width:100%" />

你可以通过点击基础信息栏右上角绿色画笔图标，可以修改当前应用名称，所属组，GIt仓库地址等。

{{site.data.alerts.callout_success}}

如果您的应用通过源码构建，则在设置-基础信息会显示 **Git仓库**，该模块显示您的源码地址。您可以在右侧修改源码分支，如若修改，请**重新部署**。

{{site.data.alerts.end}}

## 自定义环境变量

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-settings-2.png" alt="CockroachDB Admin UI" style="border:1px solid #eee;max-width:100%" />

根据实际情况，可添加或删除环境变量。

## 应用健康监测

对当前应用进行 启动时检测 与 运行时检测。根据您设置的检测规则，对检测出现相应问题的应用重新启动。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-settings3.png" style="border:1px solid #eee;max-width:100%" />

### 启动时检测

该功能是对刚启动的程序按照设定的规则检测启动过程。通过编辑设置检测端口、探针使用协议、初始化等候时间、检测间隔时间、检测超时时间、连续成功次数等检测项来检测应用。若应用满足检测条件情况下，该应用则会正常启动。

### 运行时检测

对于经过启动时检测开启的应用，会按照设置的检测端口、探针使用协议、初始化等候时间、检测间隔时间、检测超时时间、连续错误次数等检测项对应用进行定时检测，如果检测不合格超过指定次数，会对应用进行重启。

| 检测项     | 含义                                   |
| ------- | ------------------------------------ |
| 状态      | 与状态栏结果同步，分为：未设置、启用、禁用                |
| 检测端口    | 会自动识别出当前应用开启的端口， 并以下拉列表的形式提供选择       |
| 探针使用协议  | HTTP协议、TCP协议                         |
| 初始化等候时间 | 开启后多久开始检测                            |
| 检测间隔时间  | 每次检测间隔的时间                            |
| 检测超时时间  | 检测应用时，多久未响应视为超时，重启应用                 |
| 连续成功次数  | **启动时检测**特有，根据设定连续成功次数，检测若达标视为成功。    |
| 连续错误次数  | **运行时检测**特有，根据设定连续错误次数，检测若符合条件则提示错误。 |

## 权限管理

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-settings4.png" style="border:1px solid #eee;max-width:100%" />

本模块通过输入云帮平台其他用户的邮箱地址，指定其角色。将被指定用户添加至当前应用并共享当前应用。但该用户对当前应用的操作范围通过您开放的权限：

- 管理员：拥有当前应用的所有权限。
- 开发者：拥有当前应用提交代码，部署服务的权限。
- 观察者：拥有当前应用的只读权限。

## 删除

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-settings5.png" style="border:1px solid #eee;max-width:100%" />

在程序未启动情况下，点击删除可将您在平台部署的应用程序相关数据永久删除。