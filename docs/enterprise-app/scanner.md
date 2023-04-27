---
title: Rainbond-Scanner
description: Rainbond 集群巡检
keywords:
- Rainbond 集群巡检
- Rainbond Scanner
---

# 概述

平台巡检是一种监测和评估底层系统运行状况的工具，可帮助您快速发现系统中存在的潜在风险并给出相应修复建议。该工具可用于扫描集群中的各个方面，包括系统性能瓶颈、业务组件运行状态、配置问题和镜像安全漏洞等，以提高系统的性能、稳定性和可用性。

# 巡检主要功能

巡检主要支持 K8s 集群巡检、Rainbond 服务巡检、运行巡检、配置巡检和安全巡检这五类巡检项目。以下篇幅将详细介绍这五类巡检项。

## K8s 集群巡检

当对 K8s 集群进行巡检时，通常会检查以下几个方面的健康状况：
1. 节点健康状态：检查集群中所有节点的健康状态，包括节点的运行状态、节点可用性、节点文件系统状态等。此外，还需要检查节点内核是否有死锁、docker 是否正常等，以确保整个集群的稳定性和可用性。
2. K8s 核心组件状态：K8s 中的核心组件包括 kube-apiserver 、kube-controller-manager 、kube-scheduler 和 etcd 等。对这些核心组件的状态进行检查，可以确保Kubernetes集群的核心功能正常运行。此外，还需要对 K8s 集群证书过期时间进行检查，避免证书过期导致集群问题。
3. 节点资源状态：K8s 是一个高度动态的系统，它需要确保节点资源的可用性以支持应用程序的正常运行。因此，在对集群进行巡检时，需要检查节点的资源使用情况，包括CPU、内存和磁盘等。通过检查资源使用情况，可以确保节点资源的可用性和可扩展性，并及时发现可能会影响应用程序性能的问题。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/cluster-scan-1.png)

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/cluster-scan-2.png)


## Rainbond 服务巡检

当对 Rainbond 底层服务进行巡检时，主要检查以下两方面问题：
1. Rainbond 底层组件的运行状态： 检查 Rainbond 底层的核心组件，如 api 服务、网关服务、构建服务、应用运行时服务等组件的运行状态，以确保 Rainbond 的正常运行。
2. 服务的重启状况：检查 Rainbond 底层组件的重启情况，如重启次数、重启原因等，可以确保及时发现 Rainbond 自身组件的问题并进行修复。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/rbd-pod.png)


## 运行巡检

运行巡检主要针对于平台上运行的业务进行巡检，当进行运行巡检时，主要检查以下两方面问题：
1. Pod 的运行状态： 检查集群内各个 Pod 的运行状态，例如 Pod 是否处于 Running 状态、Pod 是否处于 CrashLoopBackOff 状态、Pod 是否处于 Pending 状态等，以确保及时发现异常 Pod。
2. Pod 的重启状况：检查集群内各个 Pod 的重启情况，如重启次数、重启原因等，以确保及时发现 Pod 的问题并进行修复。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/running-pod.png)


## 配置巡检

配置巡检主要针对于平台上运行的业务资源配置、健康检测配置等进行巡检。主要检查以下几方面问题：
1. 容器镜像标签：检查容器镜像的标签是否合规，包括是否使用了 latest 标签、是否使用了明确的版本号等。
2. 容器运行时参数：检查容器运行时参数是否安全，包括是否禁止使用特权模式、是否开启了安全策略等。
3. 资源限制设置：检查容器资源限制设置是否合理，包括 CPU 和内存限制是否设置合理。
4. 存储卷挂载设置：检查容器存储卷挂载设置是否合理，包括是否禁止了对主机文件系统的挂载、是否使用了 ReadOnlyRootFilesystem 等。
5. 容器健康检测设置：检查容器健康检测设置是否合理，包括是否设置了 liveness 和 readiness 探针、探针的检测间隔是否设置合理等。
通过对这些配置进行扫描和分析，生成的配置巡检报告可以给出针对每个组件的配置建议和优化方案，帮助用户提高系统的安全性和可靠性。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/config-scan.png)


## 安全巡检

安全巡检主要针对于平台上运行的业务镜像进行扫描，并对镜像中的各类安全漏洞，给出详细信息链接，以便用户进行修复。具体来说，安全巡检主要包含以下内容：
1. 扫描镜像安全漏洞：通过对集群内已部署的业务镜像进行扫描，获取镜像存在的安全漏洞信息。
2. 分析漏洞影响：对扫描出的安全漏洞进行分析，评估其对业务的影响程度，并给出相应的风险评级。
3. 提供建议和解决方案：根据扫描出的安全漏洞和评估结果，给出相应的建议和漏洞详细信息，帮助用户修复漏洞，提升业务的安全性。
4. 定期检测和自动化：安全巡检需要定期进行，以保持业务的安全性。目前，安全巡检支持自动化运行，针对每个新部署的业务组件均会自动进行检测，并生成相关报告。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/leak-scan.png)

# 部署巡检插件

平台巡检以插件的形式集成到 Rainbond 企业版中，部署分为两种方式，在线部署和离线部署。以下是部署后的拓扑图，接下来将会分别介绍两种部署方式。

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/rainbond-scanner/benzene-ring.png)

## 在线部署

在线部署操作流程主要为以下几步：`商店授权 —> 搜索 Rainbond-Scanner—> 安装`。
1. 好雨科技企业服务商店获取商店安装授权，用于安装企业商店中的应用
2. 查找 `Rainbond-Scanner` 应用并进行点击安装，将其安装到团队下
3. 安装完成后，等待组件全部启动即可

## 离线部署

离线部署流程主要为以下几步：浏览 `好雨科技企业服务商店 -> 下载 Rainbond-Scanner 离线包—> 导入离线包 —> 安装`
1. 浏览好雨科技企业服务商店，找到 `Rainbond-Scanner` 应用
2. 下载其离线包，并在 Rainbond 平台中进行导入，导入后可以在本地组件库中看到该应用模板
3. 点击安装，将其安装到团队下，等待组件全部启动即可

## 插件配置

在平台巡检插件部署完成后，我们需要找到 `Scanner-Backend` 这个组件，配置以下环境变量，用于获取平台上运行的应用信息，生成可视化的巡检报告以及给出相应修复链接。

|环境变量名称|变量值示例|说明|
|----|---|---|
|CONSOLE_DOMAIN|http://192.168.1.100:7070|控制台访问域名|
|ENTERPRISE_ID|4d606fc2807f43baa66d56c8bb5a847a|总览页路由包含的32位uuid，例如你的控制台总览页地址为http://192.168.1.100:7070/#/enterprise/4d606fc2807f43baa66d56c8bb5a847a/index，那么企业ID就是其32位的ID|
|REGION_NAME|aliyun-shanghai|集群-编辑中的集群ID，由用户安装集群时自定义|
|LargeScreenToken|78901fc2807f43baa66d56c8bb5a986p|`个人中心-访问令牌` 生成的 `token`|


# 平台巡检和修复

部署和配置好平台巡检后，平台上会有以下三个入口：
- `平台管理 -> 总览 -> 集群信息 -> 巡检`
- `平台管理 -> 集群 -> 操作 -> 巡检`
- `平台管理 -> 观测中心 -> 健康指标（需要安装可观测性插件）`

## 集群巡检
在进入平台巡检页面后，点击底部的巡检按钮，平台将开始自动巡检并给出巡检结果。巡检结果分 K8s集群巡检、Rainbond 服务巡检、运行巡检、配置巡检和安全巡检五类展示，每一类都会根据风险程度以错误数、警告数、正常数的形式进行展示。点击右侧查看报告将会列出详细信息。

## 问题修复

### 节点不健康
- 如果节点不健康，查找内核日志或节点 Events 信息进行修复。
- 如果节点上的磁盘空间不足，可以删除不必要的文件或移动文件到其他存储位置来释放磁盘空间。

### K8s 核心组件异常
- 如果 kube-apiserver 、kubelet、 kube-controller-manager 、kube-scheduler 等组件状态异常，可以查看相关日志或尝试重启相应服务进行修复。
- 如果证书即将过期，请及时更新集群证书。

### Rainbond 组件运行异常
- 查看 Rainbond 组件的日志信息、Events 信息等方式，排查组件启动失败、无法访问等问题。

### Rainbond 组件异常重启
- 通过排查上一次组件异常退出日志进行修复。

### 平台上业务组件运行异常
- 在 Rainbond 组件视图，查看业务的日志信息、Events 信息等方式，排查组件启动失败、无法访问等问题。

### 平台上业务组件异常重启
- 通过排查上一次业务组件异常退出日志进行修复。

### 平台上业务配置问题
- 检查容器镜像的标签是否合规，包括是否使用了 latest 标签、是否使用了明确的版本号等，
- 检查容器运行时参数是否安全，包括是否禁止使用特权模式、是否开启了安全策略等。未设置的可以在组件视图-安全进行设置。
- 检查容器资源限制设置是否合理，包括 CPU 和内存限制是否设置合理。
- 检查容器存储卷挂载设置是否合理，包括是否禁止了对主机文件系统的挂载、是否使用了 ReadOnlyRootFilesystem 等。
- 检查容器健康检测设置是否合理，包括是否设置了 liveness 和 readiness 探针、探针的检测间隔是否设置合理等。

### 平台上业务镜像安全漏洞问题
- 通过升级底层基础镜像版本进行解决。