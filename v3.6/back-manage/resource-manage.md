---
title: 资源管理介绍
summary: 数据中心资源以及数据中心下的节点的资源
toc: false
---

## 资源管理

资源管理主要分为数据中心管理和节点管理。

### 数据中心管理

初始进入数据中心，您可能无法看到数据中心信息，您可以通过点击`添加` 或`同步`按钮添加数据中心。
`同步` 操作将会直接把您云帮的数据中心信息同步到管理后台。
`添加`操作则需要您手动添加您的数据中心信息。

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/add-region.png" width="100%"/>

* `名称` 您需要显示在云帮的数据中心名称
* `标识` 数据中心的标识，该标识在您的数据中心中必须唯一
* `url` 数据中心访问的地址
* `Token` 访问数据中心的验证Token(如果没有可以不填)
* `websocket` 数据中心websocket地址
* `http应用访问根域名` http协议类应用访问的泛解析域名地址
* `tcp应用访问根域名` tcp协议类应用访问的根域名地址
* `数据中心范围` 数据中心类型，数据中心分为公有数据中心和私有数据中心。
* `描述` 对数据中心的简单说明

完成数据中心的添加以后，您可以看到数据中心的资源信息和对数据中心的相关操作。如图

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/region_info.png" width="100%"/>

**数据中心操作解释**

> 刚添加的数据中心为下线状态。需要手动上线后才能在云帮看到相应的数据中心显示。

`下线` 如果您不在使用当前数据中心，您可以点击下线按钮，则在云帮则无法看到当前使用的数据中心。
`上线` 对于已经下线的数据中心，您可以点击上线按钮，则该数据中心即可在您的云帮显示出来。
`维护` 如果您的数据中心暂时需要维护调整，您可以通过点击维护按钮操作，这样用户在云帮也可见该数据中心，但是无法进行操作。
`取消维护` 如果在维护中的数据中心已确认正常，您可以点击取消维护让数据中心恢复使用。
`删除操作` 删除操作将删除数据中心信息。请谨慎处理

> 对数据中心的操作不会影响到您的真实数据中心的应用。此处只是改变您的数据中心显示的状态。

### 节点管理

您可以通过点击数据中心的名称或左侧节点管理导航按钮进入节点管理界面

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/enter-node-manage.gif" width="100%" >

在节点管理页面如下。

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_manage.png" width="100%" />

`下线` 下线会将部署在该机器的应用全部删除，有可能导致您的应用不可用。
`设为不可调度` 节点设置为不可调度则您创建或者重新部署应用时，应用不会调度到该节点。原有在节点上的应用不受影响。


通过在主机名点击对应的的节点，你可以查看当前节点的详细信息和监控信息

* 节点详情

    节点详情展示了所使用机器的详情，包括节点类型，节点的系统和内核版本等。

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_info_detail.png" width="100%">

* 节点监控信息

节点监控信息组要展示节点资源调度情况，运行实例和物理监控

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_monitor_detail.gif" width="100%">

**调度资源**

资源调度主要是节点内存和cpu信息。如图

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_dispatch.png" width="100%"/>

**运行实例**

运行实例主要展示当前运行在该机器的pod信息。如图

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_running_instance.png" width="100%"/>

**物理监控**

物理监控主要针对当前机器的内存、cpu、磁盘、负载的展示。如图：

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/back-manager/v3.5/node_physical_monitor.png" width="100%"/>



