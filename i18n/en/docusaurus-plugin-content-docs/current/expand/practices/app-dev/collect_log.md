---
title: Log collection is connected to Alibaba Cloud Log Service
description: This article explains how to collect application access logs deployed by Rainbond to Alibaba Cloud Log Service in the Alibaba Cloud environment
---

This article mainly explains how to use the Alibaba Cloud log collection plug-in to connect with the Alibaba Cloud log service, and collect and send the logs generated by the components on the Rainbond platform to the Alibaba Cloud log service through the plug-in.

### Reference video

<bibili-video src="//player.bilibili.com/player.html?aid=883344773&bvid=BV1yK4y1t7cY&cid=195923930&page=1" href="https://www.bilibili.com/video/BV1yK4y1t7cY/" title="Rainbond Online Salon - Component logs are connected to Alibaba Cloud Log Service" />

### Preconditions

- There is a default`Alibaba Cloud log service collection plugin`in the team.
- A runnable component that persists logs to log files.
- An available Alibaba Cloud account.

### Plug-in installation and activation

On the My Plugins page in the team view, select`Cloud Log Service Collection Plugin`, and click Install. After the installation is complete, the component can use the plugin.

After the installation is complete, on the plug-in page of the component management page, in the list of`not activated`, find`Alibaba Cloud Log Service Collection Plug-in`, click the button`to activate`on the right to activate the plug-in.After that, the plugin will appear in the list of`opened and`.

### parameter configuration

You can click the`View Configuration`button on the right side of the plug-in to view the configuration parameter information of the plug-in.

| parameter name                     | Defaults                                                | illustrate                                                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ALIYUN_LOGTAIL_USER_ID           | none                                                    | Alibaba Cloud user ID, you can refer to[to configure user ID](https://help.aliyun.com/document_detail/49007.html)for configuration.                                        |
| ALIYUN_LOGTAIL_USER_DEFINED_ID | none                                                    | The user-defined ID of the machine group can be configured by referring to[to create a user-defined ID machine group](https://help.aliyun.com/document_detail/28983.html). |
| ALIYUN_LOGTAIL_CONFIG            | ${cn-huhehaote}                                         | The configuration parameters of the Logtail collection service vary according to the location of the log service project and the network type.                             |
| ALIYUN_LOG_ENV_TAGS              | `_pod_name_|_pod_ip_|_namespace_|_node_name_|_node_ip_` | Label configuration when collecting logs, specify specific values through environment variables.                                                                           |

`ALIYUN_LOGTAIL_CONFIG` It needs to be set according to the memory network type where the log service project is located. Users need to know the area where their Rainbond platform is deployed in Alibaba Cloud and what type of network is used. If it is a public network, the format is：region-internet, for example,：East China 1 (Hangzhou) is cn-hangzhou-Internet.If it is the Alibaba Cloud intranet, the format is region.For example,：East China 1 (Hangzhou) is cn-hangzhou.

> After the configuration is complete, click Update Configuration, you need to update and restart the component to make it take effect.

### shared storage

The plugin needs to share the log file directory of the component to collect logs, and the log file directory of the component needs to be shared with the plugin.This can be achieved by mounting storage.

**On the storage page of the component management page, add*`temporary storage`*types of storage, and fill in the mount path to the path where the component will generate the log file.Such as `/var/log/nginx`.**

> After hanging on the storage, you need to update and restart the component to make it take effect.

### Alibaba Cloud Log Service Configuration

On Alibaba Cloud Log Service [Homepage](https://sls.console.aliyun.com/lognext/profile), in the Access Data section, select`Single Line - Log Text`to enter the configuration process of the Log Service.

- Select log space

  - Create a Project or use an existing Project.It is necessary to pay attention to the selection of the project area, which should be consistent with the area where Rainbond is located.
  - Create a log store LogStore or use an existing log store LogStore.

- Create a machine group

  Here select the self-built machine group.The reason is that the custom configuration of the self-built machine group is used to identify the log collection work of different projects, so as to realize the isolation of log collection.

  - After selecting the self any installation operation.
  - Fill in the machine group name, machine group topic information and user-defined identifier.


Select for self-built machine group`, and the machine group ID must select `User-defined ID` Moreover, the user-defined ID configuration should be consistent with the value of the _`ALIYUN_LOGTAIL_USER_DEFINED_ID`_ parameter in the plugin configuration.

- Machine group configuration

  Select the machine group created in the previous step and move it from the source machine group to the application machine group list.

  > There will be a reminder of`that there is no machine configuration in the currently selected machine group, whether to force skip`, which can be ignored, just click skip.

- Logtail configuration

  This step configures the log paths to collect and some advanced configuration.

  **It should be noted that the log path configured here needs to be consistent with the path of the component shared storage mount.Otherwise, no logs can be collected.**

- Query Analysis Configuration

  As a verification step of log collection, this step will provide a module with`preview data and`for users to determine whether the log collection is correct.If configured correctly, there will be a list of logs that were present at that time.If there is no log preview data for a long time, please check whether the operation is correct.

At this point, the log collection has ended in the Alibaba Cloud Log Service. You can see that the logs have been collected into the Alibaba Cloud Log Service platform normally, and you can perform more complex analysis logic on the collected data.

### common problem

- Plug-in parameter configuration error prevents log collection

  You can check the plug-in parameter configuration to confirm whether _`ALIYUN_LOGTAIL_USER_DEFINED_ID`_ is consistent with the ID set by the Alibaba Cloud machine group, and confirm whether the _`ALIYUN_LOGTAIL_CONFIG`_ parameters are consistent with the Alibaba Cloud region where the Rainbond platform runs.

- Failed to collect logs due to unconfigured shared storage

  You can add*`temporary storage`*types of storage on the storage page of the component management page, and make it effective after re-updating.

- The configuration is correct, and it is hung in the storage, but no logs can be collected

  You can try restarting the component to confirm that all configurations have taken effect, and then confirm whether the logs are collected successfully.
