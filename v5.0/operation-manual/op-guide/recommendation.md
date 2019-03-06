---
title: 软件和硬件环境要求
summary: 软件和硬件环境要求
toc: true
asciicast: true
---

## 概述

Rainbond 作为一款开源PaaS平台，可以很好的部署和运行在 Intel 架构服务器环境及主流虚拟化环境，并支持绝大多数的主流硬件网络。

## Linux 操作系统版本要求

|Linux发行版本|版本|
|--------|------------|
|Red Hat Enterprise Linux| 7.4|
|CentOS  | 7.4|
|Ubuntu  | 16.04|
|Debian  | 9.x|
|中标麒麟 | 服务器版V7.4 |


{{site.data.alerts.callout_danger}}
- Rainbond在CentOS 7.4的环境下进行过大量的测试，因此，建议使用CentOS 7.4的Linux操作系统来部署Rainbond
- 以上 Linux 操作系统可运行在物理服务器以及 VMware、KVM、XEN 主流虚拟化环境上。
{{site.data.alerts.end}}

## 服务器要求

Rainbond 支持部署和运行在 Intel x86-64 架构的 64 位通用硬件服务器平台。对于开发测试，及生产环境的服务器硬件配置有以下要求和建议：

### 开发测试环境

|服务器角色|CPU|内存|            
|------|-----|-----|
|管理节点| 4核|8G|
|计算节点| 16核|64G|

{{site.data.alerts.callout_danger}}
- 验证测试环境中的计算节点可以和管理节点复用,复用时需要适当调高管理节点配置
{{site.data.alerts.end}}

### 生产环境

|服务器角色|CPU|内存|              
|------|-----|-----|
|管理节点| 16核|32G|
|计算节点| 16核|64G|
|存储节点|4核|8G|
|网关节点|4核|8G|

{{site.data.alerts.callout_danger}}
- 生产环境中，建议管理节点，计算节点，网关节点,存储节点单独部署
- 生产环境强烈推荐使用更高的配置。
{{site.data.alerts.end}}

## 网络要求

管理员可根据实际环境中部署Rainbond的方案，自行开放相关端口

管理节点和计算节点之间网络无限制
对外访问需要放行

管理节点 6060,7070
网关节点 80,443,20000-30000(tcp应用端口)

{{site.data.alerts.callout_danger}}
默认情况下网关节点和管理节点复用
{{site.data.alerts.end}}

## 客户端 Web 浏览器要求

建议用户采用高版本的Google Chrome访问