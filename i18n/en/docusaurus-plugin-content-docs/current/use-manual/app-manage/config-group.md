---
title: Application Configuration Group
description: Batch manage the environment variable configuration of all service components in the application
---

Rainbond 自 V5.3 版本开始，加入了配置组功能。Since the V5.3 version, Rainbond has added the configuration group function.A configuration group is a set of environment variables that can take effect in some service components under the same application at the same time.Configuration groups are ideal when you need to configure uniform environment variables for many service components.配置组非常适合在需要为很多服务组件配置统一的环境变量时使用。

## Add configuration group

The entry to the configuration group, located in Navigation **Configuration** on the left side of the application topology view.

Click **to configure** - **to add configuration group** to enter the configuration group page：

![Add configuration group](https://static.goodrain.com/docs/5.3/user-manual/config-group/config-group-1.png)

The example in the figure demonstrates how to apply a set of environment variables that define Alibaba Cloud RDS service connection information to all service components under the current application at the same time.

The configuration group contains the following elements：

- Configuration group name：is required, defines the name of the configuration group, must be composed of lowercase letters, numbers and -, and must start and end with alphanumerics
- Effective state：This switch is used to determine whether the current configuration group enters the effective state
- Configuration item：The main body of the configuration group is essentially a set of environment variables, you can click + to add a record

> The configuration items will take effect in the component running environment as environment variables, and support dynamic parsing using${KEY}mode in the component's environment variables and configuration files.If the same KEY appears, the environment variable of the component has a higher priority.若出现相同的KEY，组件的环境变量优先级更高。

- Effective component：Select the effective service component of the current configuration group, and automatically read all service components under the current application for the user to choose

> 值得注意的是，无论是新增的配置组还是修改已有的配置组，必须根据提示更新对应的服务组件，才可以使之生效。It is worth noting that, whether it is a new configuration group or an existing configuration group, the corresponding service components must be updated according to the prompts before it can take effect.The impact of the update operation may be service interruption, and the time of configuration group change needs to be decided by the user

## Edit an existing configuration group

After clicking **Configuration** , you can view all configuration groups that the current application has in the list, where you can learn the status of the configuration groups.

![Edit an existing configuration group](https://static.goodrain.com/docs/5.3/user-manual/config-group/config-group-2.png)

- edit operation

Edit the specified configuration group and update the corresponding service components according to the prompts to take effect.

- delete action

Delete the specified configuration group and update the corresponding service components according to the prompts to take effect..。
