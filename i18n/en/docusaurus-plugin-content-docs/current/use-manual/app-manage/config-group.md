---
title: Application Configuration Group
description: Batch manage the environment variable configuration of all service components in the application
---

Rainbond started with version V5.3 and added configuration group functionality.Since the V5.3 version, Rainbond has added the configuration group function.A configuration group is a set of environment variables that can take effect in some service components under the same application at the same time.Configuration groups are ideal when you need to configure uniform environment variables for many service components.The configuration group is well suited for use when you need to configure a uniform environment variable for many service components.

## Add configuration group

The entry to the configuration group, located in Navigation **Configuration** on the left side of the application topology view.

Click **to configure** - **to add configuration group** to enter the configuration group page：

![Add configuration group](https://static.goodrain.com/docs/5.3/user-manual/config-group/config-group-1.png)

The example in the figure demonstrates how to apply a set of environment variables that define Alibaba Cloud RDS service connection information to all service components under the current application at the same time.

The configuration group contains the following elements：

- Configuration group name：is required, defines the name of the configuration group, must be composed of lowercase letters, numbers and -, and must start and end with alphanumerics
- Effective state：This switch is used to determine whether the current configuration group enters the effective state
- Configuration item：The main body of the configuration group is essentially a set of environment variables, you can click + to add a record

> The configuration items will take effect in the component running environment as environment variables, and support dynamic parsing using$\{KEY}mode in the component's environment variables and configuration files.If the same KEY appears, the environment variable of the component has a higher priority.When the same KEY appears, components have higher environmental variables.

- Effective component：Select the effective service component of the current configuration group, and automatically read all service components under the current application for the user to choose

> It is interesting to note that for both the additional configuration groups and the existing configuration groups to be modified, the corresponding service component must be updated in response to the reminders to be effective.It is worth noting that, whether it is a new configuration group or an existing configuration group, the corresponding service components must be updated according to the prompts before it can take effect.The impact of the update operation may be service interruption, and the time of configuration group change needs to be decided by the user

## Edit an existing configuration group

After clicking **Configuration** , you can view all configuration groups that the current application has in the list, where you can learn the status of the configuration groups.

![Edit an existing configuration group](https://static.goodrain.com/docs/5.3/user-manual/config-group/config-group-2.png)

- edit operation

Edit the specified configuration group and update the corresponding service components according to the prompts to take effect.

- delete action

Delete the specified configuration group and update the corresponding service components according to the prompts to take effect..。
