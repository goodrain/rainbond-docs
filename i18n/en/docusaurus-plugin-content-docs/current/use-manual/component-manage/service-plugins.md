---
title: component plugin
description: Rainbond component plugin management and configuration documentation
---

## Component plugin management

The component activation plug-in is an extension of the component management function. For the definition of the plug-in, please refer to the document [Concept - Plug-in](/docs/use-manual/get-start/concept/plugin)

Only plugins installed under the current team can be activated by components, so the usage process of plugins is：

- Add or install plugins in the team plugin management (installing apps from the app market will automatically add the plugins to the team)
- Self-developed plug-ins need to build and set configuration items
- Go to the Component Management-Plugins page and select the desired plugin to activate
- Set memory allocation for plugins
- Enter the plug-in configuration and make reasonable configurations as needed

Currently Rainbond default provides plugins for Web Governance classes and Performance Analytics classes.Currently, Rainbond provides plug-ins for network governance and performance analysis by default.The two plugin reference documents provided by Rainbond by default：

[1. Performance analysis plugin](/docs/use-manual/team-manage/plugin-manage/tcm-plugin)

[2. Network governance plugin](/docs/use-manual/team-manage/plugin-manage/mesh-plugin)

In general, components cannot install duplicate plugins of the same type.

## Plugin property configuration

The configuration of the plug-in is dynamically rendered according to the configuration item definition of the plug-in. For example, a configuration item depends on the component port, then each port of the component in the configuration panel can define the value of the configuration item.

For detailed instructions, see： [Plug-in configuration item description](/docs/use-manual/get-start/concept/plugin#插件配置项)
