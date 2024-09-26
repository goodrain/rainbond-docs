---
title: plugin
description: Introduction to Rainbond plugin concepts and design thinking
---

### Definition of plugin

A plug-in is a model definition relative to a component, and a plug-in is mainly used to describe the implementation of extended operation and maintenance capabilities of business components.Since the implementations of application operation and maintenance features have great commonalities, the plug-in itself only contains description and implementation, so that it can be reused.Must be bound to a component to have runtime state.At present, all plug-ins require a runtime to implement an operation and maintenance capability, such as performance analysis plug-ins and network governance plug-ins.Perhaps in the future we will define more plug-in types including virtual plug-in description models without runtime, such as monitoring visualization plug-ins, to describe the visual UI.由于应用运维特征的实现都具有较大的共性，因此插件本身仅包含描述和实现，使其可以被复用。必须绑定到组件时才具有运行时状态。目前插件都是需要有运行时的，用以实现一种运维能力，比如性能分析插件、网络治理插件。或许未来我们将定义更多的插件类型包括无运行时的虚拟插件描述模型，比如监控可视化插件，用以描述可视化 UI。

The runtime environment of a plug-in with runtime is consistent with the bound components in the following aspects：

- <b>Cyberspace</b> is a crucial feature. Consistent cyberspace enables plugins to bypass and truncate component network traffic, set component local domain name resolution, and so on.
- <b>Storage Persistence Space</b> This feature enables file exchange between plugins and components through the persistence directory.
- <b>environment variables</b> This feature enables plugins to read the component's environment variables.

### Classification of plugins

| Category Name                            | effect                                                                                                                                    | control                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Performance Analysis Class               | The performance analysis page can be displayed by installing the performance analysis plug-in for the service                             |                                       |
| Ingress network class                    | One of the ServiceMesh plugin types that handles downstream traffic to components                                                         | Dynamic allocation of listening ports |
| export network                           | One of the ServiceMesh plugin types that handles component upstream traffic                                                               | Support service discovery             |
| Ingress and egress co-governance network | One of the types of ServiceMesh plug-ins, while loading the upstream and downstream traffic of the processing components                  | Support service discovery             |
| initialization type                      | The service starts after the plug-in first starts and exits normally, user service data initialization or other initialization operations |                                       |
| general type                             | Such as data backup, log collection                                                                                                       |                                       |

### Plugin configuration items

The function of the configuration item is to describe the configuration information required by the plug-in, similar to the definition form. When the plug-in is instantiated (that is, when it is installed and bound by the component), the configuration form is generated according to the relevant metadata of the component.In addition to the basic environment variable requirements, the configuration of the plug-in generally needs to be combined with the port of the component and the metadata of the dependent component.For example, define the fuse configuration or routing configuration of the egress management plug-in on a dependent communication link.插件的配置除了基础的环境变量需求以外，一般还需要与组件的端口、依赖组件等元数据相结合。比如定义出口治理插件在某一个依赖通信链路上的熔断配置或路由配置等。

配置项可以分组，每一组配置项可以基于某一个元数据类型。目前支持的元数据类型包括：组件端口、下游组件端口。每一组配置项同时可以定义其注入方式，包括：环境变量和主动发现。依赖组件元数据的配置组只能通过主动发现的方式获取。

### read more

[Plugin Development Instructions](/docs/use-manual/team-manage/plugin-manage/plugin-design-develop/)
