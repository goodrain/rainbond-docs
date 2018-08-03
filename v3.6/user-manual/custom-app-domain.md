---
title: 自定义应用域名
summary: 自定义应用域名
toc: true
---

Rainbond为每一个HTTP应用自动生成一个默认的域名，一般情况下这个域名都比较长，不方便记忆。你可以通过下面两种方式修改默认域名：

- 修改默认域名：修改应用默认生成的域名前缀，主域名是安装云帮时生成或指定的。
- 绑定新域名：为应用指定一个新域名，绑定完成后，需要在你的DNS域名服务商的那里设置一下<a href="https://baike.baidu.com/item/CNAME" target="_blank">CNAME</a>记录。


## 一、创建一个应用
您可以通过源代码、Dockerfile、Docker Hub、云市等方式来创建一个HTTP协议的应用。详细文档参见：[创建一个应用](create-an-app.html)


## 二、修改默认域名

- 访问应用的 【端口】 页面
- 点击【修改默认域名】

 <img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/sld-domain.gif" style="border:1px solid #eee;max-width:100%" />

{{site.data.alerts.callout_danger}}
修改默认域名后，需要重启应用。
{{site.data.alerts.end}}


## 三、绑定自定义域名

### 3.1 应用绑定新域名

- 访问应用的 "端口" 页面

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain01.png" width="100%" />

- 点击 “绑定” 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain02.png" width=50% />

{{site.data.alerts.callout_danger}}

- 绑定域名首先需要用户有自己的域名，并且有设置DNS解析的权限。
- 公有云不能绑定好雨公司相关的域名，如: goodrain.net、goodrain.com 等。
- 绑定新域名不需要重启应用。

{{site.data.alerts.end}}

### 3.2 设置CNAME记录

#### 3.2.1 阿里DNS服务
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/alidns.png" width=90% />

#### 3.2.2 CloudXDNS服务

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/cloudxdns.png" width=90% />

#### 3.2.3 DNSPod服务

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/dnspod.png" width=90% />

### 3.3 验证域名是否已经解析

通过dig命令查看解析结果

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/domain03.png" width=90% />