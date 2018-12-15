---
title: Rainbond FAQs
summary: 常见故障排查指南
toc: true
asciicast: true
---

## 一般问题

1.好雨是做什么的、什么时候成立的

2.rainbond是什么

3.什么是无服务器paas

4.跟iaas区别

5.跟rancher的区别、优势对比

6.底层是否是容器技术、跟docker、k8s有什么关系

7.rainbond是否开源

8.功能是否全部开源

9.使用开源有什么限制

10.我能用rainbond干什么

11.rainbond对使用者有什么要求

12.使用rainbond对我的开发习惯有哪些影响、我要做出哪些改变

13.是否支持二次开发

14.开源和企业有什么不同

15.企业服务报价

## 安装问题

1.rainbond是否可以运行在物理服务器和虚拟机上

<!-- salt启动不起来？
salt安装失败？
salt-master  salt-minion  联系超时，salt-minion无响应 -->

2.私有部署如何配置内网dns

3.访问rainbond应该开放什么端口

4.rainbond安装支持那些操作系统

## 维护问题

1.如何查看rainbond 服务的状态

2.如何上下线节点

3.如何判断节点状态

4.后端创建出多余实例该怎么办

5.如何查看rainbond各组件日志

6.如何去掉管理节点的计算属性

7.泛解析域名

## 开发问题

1.rainbond支持哪些开发语言

2.是否支持.net 语言、是否支持windows应用、是否支持windows服务器部署

3.是否支持helm

4.如何配置maven私服

5.遗留系统是否能运行在rainbond上

6.如何对接已有ci/cd

7.是否支持oracle  jdk 

8.是否支持svn

9.git仓库拉取失败

10.私有rainbond，源码构建不成功？   未定义rainbondfile、未配置私服、...

11.自己制作的docker镜像部署失败：docker push goodrain.me

## 使用问题

1.重启和重新部署的区别

2.是否支持资源限额

3.如何备份平台上的mysql 数据库

4.如何自定义mysql配置

5.健康检查配置错误导致应用无法启动

6.如何查看应用持久化存储挂载的宿主机路径

7.如何查看应用部署在某个宿主机上

8.如何在平台外访问平台上的数据库

9.应用是否支持跨数据中心迁移

10.如何用环境变量动态配置自己的配置文件

## 架构问题

1.是否支持dubbo、是否支持spring cloud

2.微服务  servicemesh 是什么，怎么用

## 插件问题

1.插件是什么、怎么用

2.使用服务性能监控插件有什么限制

3.我该如何制作分享插件