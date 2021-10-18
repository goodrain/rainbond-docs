---
title: TDengine
description: 本文介绍开源应用TDengine部署应用
weight: 7002
---



# TDengine数据库可视化在rainbond一键部署以及应用

## 1.简介

TDengine  是涛思数据面对高速增长的物联网大数据市场和技术挑战推出的创新性的大数据处理产品，它不依赖任何第三方软件，也不是优化或包装了一个开源的数据库或流式计算产品，而是在吸取众多传统关系型数据库、NoSQL 数据库、流式计算引擎、消息队列等软件的优点之后自主开发的产品，TDengine 在时序空间大数据处理上，有着自己独到的优势，采用 TDengine，可将典型的物联网、车联网、工业互联网大数据平台的总拥有成本大幅降低。但需要指出的是，因充分利用了物联网时序数据的特点，它无法用来处理网络爬虫、微博、微信、电商、ERP、CRM 等通用型数据。

![](https://i.loli.net/2021/10/15/ThRpPZ3FAISgsQJ.jpg)

​                                                                                图为TDengine技术生态图

## 2.通过rainbond开源应用商店一键安装

**1.开源应用商店直接搜索TDengine，然后点击安装就可以了。**

![](https://pic.imgdb.cn/item/616d07542ab3f51d91900a42.png)



**2.部署完成后的拓扑图：**

![](https://pic.imgdb.cn/item/616d17f42ab3f51d91a0ab5d.png)

（1）：grafana是TDengine数据库可视化工具，默认用户：admin , 默认密码：12345678

（2）：TDengine是数据库，默认用户：root, 默认密码：taosdata

## 3.grafana可视化操作

1.登录进入grafana以后点击左边标签栏，选择我们已经配置好的展示界面即可，如下图：

![](https://pic.imgdb.cn/item/616d1a6b2ab3f51d91a331c2.png)

2.最终呈现展示结果为下图：

![](https://pic.imgdb.cn/item/616d1bfd2ab3f51d91a4c125.png)



