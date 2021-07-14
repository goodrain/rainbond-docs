---
title: "对接Helm仓库"
hidden: false
description: "在Rainbond中对接Helm仓库"
weight: 3000
aliases:
  - /docs/user-manual/app-creation/helm-support/docking_helm_store/
---

跟随本文档完成Helm仓库的对接，使开发者或运维人员能够基于Helm仓库部署应用

### 前提条件

开始之前，你需要满足以下条件：

1.拥有一个企业管理员账号；    
2.拥有一个可对接使用的Helm仓库。


### 操作流程

使用 **企业管理员账号** 在 **企业视图** 点击 **应用市场**，点击 `+` 号对接新的应用市场，选择Helm商店，输入以下信息，点击创建即可对接，如果是私有商店则选择私有商店输入 **商店用户名** 及 **商店密码**。

商店名称：自定义  
商店地址：Helm仓库地址

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockinghelmstore.jpg" title="对接helm仓库" width="100%">}}

对接完成后将自动展示当前 Helm 仓库中的应用

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockingcomplete.jpg" title="对接完成" width="100%">}}

完成该章节中的步骤即可基于Helm应用商店在Rainbond中部署应用，后续请参考文档 [在Rainbond中部署Helm应用](/docs/component-create/helm-support/creation-process/)。
