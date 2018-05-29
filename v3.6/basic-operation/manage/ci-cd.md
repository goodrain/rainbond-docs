---
title: 持续构建与部署
summary: 持续构建与部署
toc: false

---

<div id="toc"></div>

# 基于源码构建应用的自动部署

## 功能概述

对于您源码构建的应用，每次往代码仓库提交新的代码后您想做的可能是重新部署该应用。这样的操作重复而又浪费时间。为了更方便您重新部署应用，我们云帮平台为您提供了基于webhooks的自动应用部署。您只需要通过简单的设置，就可以帮您完成重新部署的工作。



## 使用说明

如果您想对您的应用使用自动部署，则需要符合以下几点要求。

>1. 您的应用是由源码创建(官方demo除外)，目前支持的代码仓库为`GITHUB`与`GITLAB`
>2. 确定您对该应用已经`开启`了此功能
>3. 需要您为代码仓库中的项目正确`配置webhooks`
>4. 目前仅支持项目的`push`事件
>5. 提交信息中包含触发关键字`@deploy`
>6. 您的应用状态必须是`运行中`或`运行异常`



## 如何配置

* #### 开启功能

  在您的应用中请打开自动部署功能，并复制我们给您的URL粘贴到您的webhooks设置中
 
    <center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/webhooks.jpg" style="border:1px solid #eee;width:100%"/></center>

* #### 配置webhooks
  * 正确填写URL
  * 选择ContentType为`json`格式
  * 选择事件为`push`事件
  * 确定添加webhooks成功
  ---

  如果您的项目存放在`GITHUB`中，请看这里
  <center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg" style="border:1px solid #eee;width:100%"/></center>
  
  
    如果您的项目存放在`GITLAB`中，请看这里
     <center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg" style="border:1px solid     #eee;width:100%"/></center>
  
* #### 提交信息
    当您往代码仓库push您的项目时，请在提交信息的末尾添加触发自动部署的标识字符串：`@deploy`
