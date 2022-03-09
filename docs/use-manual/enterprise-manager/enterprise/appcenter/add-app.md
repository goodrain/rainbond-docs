---
title: 基于应用市场的应用交付
description: 基于应用市场的应用交付体验
---

### 应用交付

使用公有云端市场在线交付

对于在线环境的用户，可以直接使用好雨公有云端市场进行业务交付，将业务系统发布到好雨公有云市，用户可在公有云端市场直接下载一键安装整套业务系统。 

私有内部市场内置于Rainbond平台中，公有应用市场目前由好雨科技运营提供；公有云端市场服务于与其对接互联的私有应用市场，提供跨平台，跨云的应用资源同步和升级。

### 版本管理

应用市场中的应用支持多个版本共存，应用的操作粒度支持到版本级别。

### 应用导出

为了让用户能够更好的管理自己的应用，快捷简单交付业务，我们为平台设计了应用导入导出功能，该功能允许用户通过简单的几次点击，就可以将内部市场的应用打包为一个压缩文件，并可以下载到本地。在导出的时候，支持两种格式，一种为rainbond-app格式，另一种为docker-compose格式。

![应用导出](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Click%20export01.png)

* 选择要导出的应用版本，即可开始导出，导出时长根据网络情况决定。

![应用导出](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Click%20export02.png)


### 应用导入

考虑到离线环境的应用交付，Rainbond设计实现了应用的离线导入和导出功能。复杂的业务系统可以借助网络或离线应用包快速的在不同的环境中交付，安装速度和易用性远远超出传统的交付。除了标准Rainbond应用模型以外，同时还支持导出docker-compose模型脱离Rainbond平台便捷交付。

* 应用导入流程

![应用导入](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Offline%20import.png)

**应用模版导入界面**

点击`上传`按钮即可选择要导入的应用模版，上传完毕后将会在已上传文件列表展示已上传的应用，勾选之后可以根据自己的需要选择导入团队或是企业，点击`确认导入`，即进入应用模版导入流程，在此页面请耐心等待，直到提示导入成功，具体速度根据网络速度决定。

![应用导入](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Import%20page.png)

导入成功之后将会自动跳转至导入的应用模版界面，在创建组件时选择`从应用市场创建`一键安装该组件即可

![应用导入](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/appcenter/add-app/Successful%20import.png)

