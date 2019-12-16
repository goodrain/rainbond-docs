---
title: "离线部署"
weight: 1005
description: "此方式适用于外网网络受到严格限制的用户，此版本目前支持CentOS 7.4.1708系统，Ubuntu 16.04 系统"
hidden: true
---

### 一、安装前必读

目前我们提供了`CentOS 7.4.1708`版本，`Ubuntu 16.04`版本 的离线包，其他版本离线包制作请参考[离线包制作文档](/user-operations/op-guide/offline-package/)

#### 安装说明

- 安装时必须使用root用户执行安装操作;
- Rainbond 单节点安装[最低配置要求](/user-operations/op-guide/recommendation/#六-服务器要求)；如果想跳过系统配置检查，安装时指定`--enable-check disable`，如果配置过低可能会无法正常安装部署；
- 默认情况下网关节点和管理节点复用;需开放[相关组件端口](/user-operations/op-guide/required_ports/)。

> 在安装前请您务必阅读 [软件和硬件环境要求](/user-operations/op-guide/recommendation/)

### 二. 离线安装操作

#### 2.1 同步离线包

目前最新的离线安装版本是: v5.1.9-release

```
# 有网环境下载离线包,并同步到离线环境
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/dev/offline.2019-12-12-5.1.9.tgz 

```

#### 2.2 准备工作
```bash
# 解压离线包
tar xf <离线包>
# 执行准备工作
cd offline && ./offline.sh
```

#### 2.3 初始化数据中心

 
> 离线情况下，默认使用`pass.grapps.cn`域名，需要自行指定离线域名，并需要配置相关解析工作如`*.pass.grapps.cn`解析到数据中心节点  


```bash
# 当前节点具有管理、网关、计算属性
 ./grctl init --install-type offline  --iip <当前机器内网ip>  --domain <自定义域名>
```
 
 提示: 离线部署Rainbond平台，在平台上部署的服务需要通过域名访问时需要配置本地解析，具体步骤请参考[域名解析](https://t.goodrain.com/t/topic/1239)
 
> 安装过程如有报错，请参照[安装问题排查](/troubleshoot/install-problem/)，排查问题；若遇到无法解决的错误请于[Rainbond社区](https://t.goodrain.com)留言。

##### 安装完成后如何访问应用控制台？ 请点击 [Rainbond控制台访问](/user-operations/install/visit/)

若需要扩容您的节点资源，请参考[节点管理](/user-operations/management/node/#添加节点)
 

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}


