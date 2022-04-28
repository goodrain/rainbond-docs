---
title: 共享库应用的同步
description: 基于共享库的应用同步
---

本文主要介绍 Rainbond 共享库的应用组件资源的添加方式

### 开发创造

参考文档 [应用管理，分享管理](/docs/use-manual/enterprise-manage/appcenter/share-app-market)

### 云端同步

应用下载同步是在互联网环境下的一种跨平台应用交付方式，通过此方式可以快速获取优秀的、成熟的通用解决方案，例如 Mysql、TiDB 等数据库方案，Gitlab、Jenkins 等 IT 工具。也可以通过此方式交付商业业务系统给你的用户。当前 Rainbond 默认提供了与好雨云端市场的互联用例。

对于使用者而言，通过共享库即可一键安装部署完整业务系统，并且能够持续进行升级。

企业也可以建立行业公有应用市场，详情参阅 [好雨企业服务](https://www.goodrain.com)

> 以下以数据库为例，演示云端同步的整个过程

在企业视图，共享库点击`云端同步`按钮，可以看到好雨公有云端市场的应用

![云端同步](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Cloud%20sync.png)

点击`下载`按钮

![下载](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/mysqlsync.png)

数据库应用已被一键同步至内部市场，在使用时选择 `从共享库创建组件`，即可一键安装该组件

![一键安装](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/mysqlsync01.png)

![一键安装](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/component-add/One%20button%20installation.png)