---
title: 阿里云日志收集插件
description: 讲解如何使用阿里云日志收集插件
weight: 8009
---

### 概述

本文内容主要是讲解如何使用阿里云日志收集插件对接阿里云日志服务，将 Rainbond 平台上的组件运行中产生的日志通过插件的方式收集并发送到阿里云日志服务中。

### 前提条件

* 团队中有默认的`阿里云日志服务收集插件`。
* 日志持久化到日志文件的可运行组件。
* 可用的阿里云账户。

### 安装与构建

![安装阿里云日志服务收集插件](http://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6.png)

在团队视图中的我的插件页面中，选择`阿里云日志服务收集插件`，点击安装。

安装完成之后可以到该插件的管理页面，进行详情的查看与配置。如果需要更换镜像，或者是更新Dockerfile，在确认修改之后，可以点击右上角的`构建`按钮，重新构建。

### 参数配置

在组件管理页面的插件页面，在`未开通`列表中，找到`阿里云日志服务收集插件`，点击右侧的`开通`按钮，开通该插件。

之后该插件会出现在`已开通`列表中。可以点击该插件右侧的`查看配置`按钮，查看该插件的配置参数信息。

参数名称 | 默认值 | 说明
--------|-------|------
ALIYUN_LOGTAIL_USER_ID| 无| 阿里云用户标识，可参考[配置用户标识](https://help.aliyun.com/document_detail/49007.html)进行配置。
ALIYUN_LOGTAIL_USER_DEFINED_ID|无|机器组用户自定义标识，可参考[创建用户自定义标识机器组](https://help.aliyun.com/document_detail/28983.html)进行配置。
ALIYUN_LOGTAIL_CONFIG|/etc/ilogtail/conf/${cn-huhehaote}/ilogtail_config.json|Logtail 收集服务配置参数，根据日志服务Project所在地及网络类型不同而不同。
ALIYUN_LOG_ENV_TAGS|`_pod_name_|_pod_ip_|_namespace_|_node_name_|_node_ip_`| 收集日志时的标签配置，通过环境变量指定具体的值。

`ALIYUN_LOGTAIL_CONFIG`需要根据日志服务Project所在地记忆网络类型进行设置，需要用户知道自己的 Rainbond 平台部署在阿里云的那个区域，使用的是什么类型的网络。
如果为公网，格式为：region-internet，例如：华东 1（杭州）为cn-hangzhou-Internet。如果为阿里云内网，格式为region。例如：华东 1（杭州）为cn-hangzhou。

> 配置完成点击更新配置之后需要更新重启组件时期生效。

### 共享存储

插件收集日志需要共享组件的日志文件目录，需要将组件的日志文件目录共享给插件。可以通过挂载存储进行实现。

在组件管理页面的存储页面，添加`临时存储`类型的存储，挂载路径填写组件会产生日志文件的路径。这里使用`/var/log/nginx`。

> 挂在存储后需要更新重启组件使其生效。

### 阿里云日志服务配置

在阿里云日志服务 [首页](https://sls.console.aliyun.com/lognext/profile)，在接入数据板块选择`单行-日志文本`进入日志服务的配置流程中。

* 选择日志空间

    * `创建Project`或使用已有Project。需要注意项目区域的选择，要与Rainbond 所在的区域保持一致。
    * `创建日志库LogStore`或使用已有日志库LogStore。

* 创建机器组

    这里选择自建机器组。原因在于使用自建机器组的自定义配置标识不同项目的日志收集工作，实现日志收集的隔离。

    * 选择自建机器组后，直接`确认安装完毕`，无需进行任何安装操作。
    * 填写机器组名称，机器组topic信息和用户自定义标识。

    ![选择自定义标识](http://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/%E5%88%9B%E5%BB%BA%E6%9C%BA%E5%99%A8%E7%BB%84.png)

    > 一定要选择`自建机器组`，机器组标识一定要选择`用户自定义标识`。而且，用户自定义标识配置要和插件配置中`ALIYUN_LOGTAIL_USER_DEFINED_ID`参数的值保持一致。

* 机器组配置

    选择上步新建的机器组，将其从源机器组中移动到应用机器组列表中。

    > 这里会出现`当前选中的机器组内没有机器配置，是否强制跳过`的注意提醒，可忽略，直接点击跳过即可。

* Logtail 配置

    该步骤配置要收集的日志路径以及一些高阶的配置。这里仅配置日志的路径以作演示，其他都使用默认值。

    ![logtail配置](http://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/logtail%20%E9%85%8D%E7%BD%AE.png)

    需要注意，这里配置的日志路径需要和组件共享存储挂载的路径保持一致。否则收集不到日志。

* 查询分析配置

    该步骤作为日志收集的一个校验步骤，会提供`预览数据`的模块供用户确定日志收集是否正确。如果配置正确，这里会出现当时出现的日志列表。如果长时间没有日志预览数据，请检查操作是否有误。


![日志收集成功](http://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/plugin/%E6%97%A5%E5%BF%97%E6%94%B6%E9%9B%86%E6%88%90%E5%8A%9F.png)

至此日志收集到阿里云日志服务结束，可以看到日志已经正常收集到阿里云日志服务平台中，可以针对收集到的数据进行更复杂的分析逻辑。
