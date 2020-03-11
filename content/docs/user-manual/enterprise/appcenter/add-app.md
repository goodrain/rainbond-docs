---
title: 共享库应用添加
description: 讲解共享库的应用组件资源的三种添加方式
weight: 2003
---

本文主要介绍Rainbond共享库的应用组件资源的添加方式，并教你如何从Rainbond云端市场同步应用与插件。

### 开发创造

参考文档 [应用管理，分享管理](/docs/user-manual/app-manage/share-app/)

### 云端同步

共享库中的业务系统可以通过离线导出的方式，交付到一个离线的Rainbond平台，也可以通过公有云市场的方式在线交付社区用户或目标企业用户。

私有内部市场内置于Rainbond平台中，公有应用市场目前由好雨科技运营提供。公有云端市场服务于与其对接互联的私有应用市场，提供跨平台，跨云的应用资源同步和升级。

对于有在线环境的用户，可以直接使用好雨公有云端市场进行业务交付，将业务系统发布到好雨公有云端市场，用户可从云端市场同步应用并一键安装整套业务系统。

对于使用者而言，通过共享库即可一键安装部署完整业务系统，并且能够持续进行升级。

企业也可以建立行业公有应用市场，详情参阅 [好雨企业服务](https://www.goodrain.com/industrycloud)

> 以下以数据库为例，演示云端同步的整个过程

在企业视图，共享库点击`云端同步`按钮，可以看到好雨公有云端市场的应用

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Cloud%20sync.png
" width='100%' />

点击`下载`按钮

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/mysqlsync.png" width='100%' />

数据库应用已被一键同步至内部市场，在使用时选择`从共享库创建组件`，即可一键安装该组件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/mysqlsync01.png" width='100%' />

### 应用导出

目前开源版本暂不支持应用导出功能

### 离线导入

考虑到离线环境的应用交付，Rainbond设计实现了应用的离线导入和导出功能。复杂的业务系统可以借助网络或离线应用包快速的在不同的环境中交付，安装速度和易用性远远超出传统的交付。除了标准Rainbond应用模型以外，同时还支持导出docker-compose模型脱离Rainbond平台便捷交付。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Offline%20import.png" width='100%' />

**应用模版导入界面**

点击`上传`按钮即可选择要导入的应用模版，上传完毕后将会在已上传文件列表展示已上传的应用，勾选之后可以根据自己的需要选择导入团队或是企业，点击`确认导入`，即进入应用模版导入流程，在此页面请耐心等待，直到提示导入成功，具体速度根据网络速度决定。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Import%20page.png" width='100%' />

导入成功之后将会自动跳转至导入的应用模版界面，在创建组件时选择`从共享库创建`一键安装该组件即可

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Successful%20import.png" width='100%' />


### 应用版本

共享库中的应用支持多个版本共存，应用的操作粒度支持到版本级别。

### 应用更新

已同步的应用若云端市场存在更新的版本，本地共享库即可从云端市场获取最新的版本应用，当本地共享库的应用有更新的版本，安装的服务可进行[构建升级操作](/docs/user-manual/app-service-manage/basic-operation/#构建操作)。

