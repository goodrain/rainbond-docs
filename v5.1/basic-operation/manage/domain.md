---
title: 配置域名
summary: 配置域名
toc: false
---

<div id="toc"></div>

云帮平台为每一个HTTP应用自动生成一个默认的域名。一般情况下这个域名都比较长，几乎无法记忆。但您是可以通过绑定域名的方式，将自己的域名绑定到这个应用。绑定好域名之后，需要在你的DNS域名服务商的那里设置一下CNAME记录。

本文就为您介绍如何绑定应用域名，以及在阿里DNS、CloudXNS、DNSPod等域名服务商那里如何设置CNAME记录。

## 创建一个应用
您可以通过源代码、Dockerfile、Docker Hub、云市等方式来创建一个HTTP协议的应用。详细文档参见：[创建应用](../create/source-demo.html)

## 绑定域名

- 访问应用的 "端口" 页面

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain01.png" width="100%" />

- 点击 “绑定” 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain02.png" width=50% />

{{site.data.alerts.callout_danger}}

- 绑定域名首先需要用户有自己的域名，并且有设置DNS解析的权限。
- 不能绑定好雨公司相关的域名，如: goodrain.net、goodrain.com 等。

{{site.data.alerts.end}}

## 设置CNAME记录

### 阿里DNS服务
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/alidns.png" width=90% />

### CloudXDNS服务

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/cloudxdns.png" width=90% />

### DNSPod服务

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/dnspod.png" width=90% />

## 验证域名是否已经解析

通过dig命令查看解析结果

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain03.png" width=90% />