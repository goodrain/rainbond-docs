---
title: "安装并对接Rainbond Cloud"
weight: 999
description: "快速部署Rainbond并对接至Rainbond Cloud"
---

本文档描述基于用户自有虚拟机，物理服务器，已有Kubernetes集群对接Rainbond Cloud的流程。

### 什么是Rainbond Cloud？

请参考文档[Rainbond Cloud服务介绍](/docs/quick-start/rainbond-cloud/)


### 对接Rainbond Cloud前需要做的事

#### 基于自有的虚拟机或物理服务器

1. 拥有自己的虚拟机或物理服务器，推荐配置`4核8G`以上，或者已安装的Kubernetes集群，请参考[Rainbond安装文档](/docs/user-operations/install/minimal_install/)完成Rainbond的安装；
2. 拥有一个公网IP，对外开放` 6060` `8443` 端口，内网集群需使用公网IP代理此端口；
3. 注册一个[Rainbond Cloud账号](https://cloud.goodrain.com/enterprise-server/registered)。

#### 基于云厂商提供的Kubernetes集群

使用阿里云ACK的方式自动购买托管Kubernetes集群及安装Rainbond集群。

1. 拥有一个具有 [创建容器服务默认角色](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22ReturnUrl%22:%22https://cs.console.aliyun.com/%22,%22Service%22:%22CS%22,%22Requests%22:%7B%22request1%22:%7B%22RoleName%22:%22AliyunCSManagedLogRole%22,%22TemplateId%22:%22AliyunCSManagedLogRole%22%7D,%22request2%22:%7B%22RoleName%22:%22AliyunCSManagedCmsRole%22,%22TemplateId%22:%22AliyunCSManagedCmsRole%22%7D,%22request3%22:%7B%22RoleName%22:%22AliyunCSManagedCsiRole%22,%22TemplateId%22:%22AliyunCSManagedCsiRole%22%7D,%22request4%22:%7B%22RoleName%22:%22AliyunCSManagedVKRole%22,%22TemplateId%22:%22AliyunCSManagedVKRole%22%7D,%22request5%22:%7B%22RoleName%22:%22AliyunCSClusterRole%22,%22TemplateId%22:%22Cluster%22%7D,%22request6%22:%7B%22RoleName%22:%22AliyunCSServerlessKubernetesRole%22,%22TemplateId%22:%22ServerlessKubernetes%22%7D,%22request7%22:%7B%22RoleName%22:%22AliyunCSKubernetesAuditRole%22,%22TemplateId%22:%22KubernetesAudit%22%7D,%22request8%22:%7B%22RoleName%22:%22AliyunCSManagedNetworkRole%22,%22TemplateId%22:%22AliyunCSManagedNetworkRole%22%7D,%22request9%22:%7B%22RoleName%22:%22AliyunCSDefaultRole%22,%22TemplateId%22:%22Default%22%7D,%22request10%22:%7B%22RoleName%22:%22AliyunCSManagedKubernetesRole%22,%22TemplateId%22:%22ManagedKubernetes%22%7D,%22request11%22:%7B%22RoleName%22:%22AliyunCSManagedArmsRole%22,%22TemplateId%22:%22AliyunCSManagedArmsRole%22%7D%7D%7D)，[开通ESS弹性伸缩服务](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22Requests%22:%20%7B%22request1%22:%20%7B%22RoleName%22:%20%22AliyunESSDefaultRole%22,%20%22TemplateId%22:%20%22DefaultRole%22%7D%7D,%20%22ReturnUrl%22:%20%22https:%2F%2Fessnew.console.aliyun.com%2F%22,%20%22Service%22:%20%22ESS%22%7D)，[授权ESS弹性伸缩服务](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22Requests%22:%20%7B%22request1%22:%20%7B%22RoleName%22:%20%22AliyunESSDefaultRole%22,%20%22TemplateId%22:%20%22DefaultRole%22%7D%7D,%20%22ReturnUrl%22:%20%22https:%2F%2Fessnew.console.aliyun.com%2F%22,%20%22Service%22:%20%22ESS%22%7D)，[开通NAS服务](https://common-buy.aliyun.com/?commodityCode=naspost)权限的阿里云AccessKey账号；
2. 注册一个[Rainbond Cloud账号](https://cloud.goodrain.com/enterprise-server/registered)。

相关权限及费用请阅读安装时的操作说明

### 对接Rainbond Cloud

#### 基于自己的虚拟机或物理服务器

已安装好的Rainbond集群，参考[对接文档](/docs/user-manual/enterprise/cluster-management/cluster-management/#对接集群)即可进行快速对接

#### 使用阿里云ACK

* 阿里云ACK安装对接视频演示

{{<video title="Rainbond Cloud对接阿里云ACK集群演示视频" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/rainbond-cloud-init-cluster.mp4">}}


**在安装对接过程中有任何疑惑请联系`18501030060`（曾庆国）获取技术支持**


