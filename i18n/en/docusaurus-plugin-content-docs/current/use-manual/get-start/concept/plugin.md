---
title: plugin
description: Introduction to Rainbond plugin concepts and design thinking
---

### Definition of plugin

A plug-in is a model definition relative to a component, and a plug-in is mainly used to describe the implementation of extended operation and maintenance capabilities of business components.Since the implementations of application operation and maintenance features have great commonalities, the plug-in itself only contains description and implementation, so that it can be reused.Must be bound to a component to have runtime state.At present, all plug-ins require a runtime to implement an operation and maintenance capability, such as performance analysis plug-ins and network governance plug-ins.Perhaps in the future we will define more plug-in types including virtual plug-in description models without runtime, such as monitoring visualization plug-ins, to describe the visual UI.Because of the greater commonality in the delivery features of the app, the plugin itself contains only descriptions and implementations, so that it can be reused.A component must be bound to be running when it is not operational.Currently plugins need to be running to achieve a functional capability such as performance analysis plugin, web governance plugin.Perhaps in the future we will define more plugin types that include virtual plugins description models when they are not running, such as monitoring visualizer plugins to describe visualized UI.

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

The function of the configuration item is to describe the configuration information required by the plug-in, similar to the definition form. When the plug-in is instantiated (that is, when it is installed and bound by the component), the configuration form is generated according to the relevant metadata of the component.In addition to the basic environment variable requirements, the configuration of the plug-in generally needs to be combined with the port of the component and the metadata of the dependent component.For example, define the fuse configuration or routing configuration of the egress management plug-in on a dependent communication link.In addition to the underlying environmental variable requirements, plugins typically need to be combined with the portal, dependence, and other metadata of components.For example, define export governance plugins for a smelting or routing configuration on a communication link.

Configuration items can be grouped and each set of configuration can be based on a certain metadata type.Currently supported metadata types include：component ports, downstream component ports.Each set of config items can also define its injections, including：environment variables and active discoveries.The configuration group that relies on component metadata can only be retrieved through active discovery.

### read more

[Plugin Development Instructions](/docs/use-manual/team-manage/plugin-manage/plugin-design-develop/)
