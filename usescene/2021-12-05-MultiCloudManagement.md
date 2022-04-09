---
title: 应用级多云管理
description: 当前云计算有多种形态公有云、私有云、边缘云、虚拟机等，如何高效管理多云是当前面临的问题，在云原生时代，又该如何利用云原生技术实现多云管理？本文将讲解通过 Rainbond 实现“应用级”多云管理。
slug: MultiCloudManagement
images: /img/usescene/多云管理.png
# authors: QiZhang
---

:::info
当前云计算有多种形态公有云、私有云、边缘云、虚拟机等，如何高效管理多云是当前面临的问题，在云原生时代，又该如何利用云原生技术实现多云管理？本文将讲解通过 [Rainbond](https://www.rainbond.com)实现“应用级”多云管理。
:::

<!--truncate-->

### 多云痛点

- **多云环境的统一监控和运维管理：**：

  企业使用多云增加了统一运维管理的复杂性，对于单云架构，可使用云服务商提供的管理工具，但对于多云架构，如何使用统一平台进行运维管理，进而提升 IT 服务交付效率、增加资源利用率，降低运维成本，成为值得关注的问题。

- **多云环境下的应用管理：**

  单机环境下，应用的部署、管理相对简单，对于多云的分布式环境，应用的部署、运维、标准化管理成为难点，同时，传统的应用、基于微服务架构的应用、以及近来发展迅猛的 Serverless 应用，不同类型的应用也为一站式应用管理增加了难度。

- **多云环境中核心业务迁移和部署：**

  使用多云后，无法避免数据的跨云迁移，在异构的云、数据中心之间进行数据迁移，如何保证数据的一致性及低时延，又成为了新的挑战。

### 多云应用管理平台 Rainbond

企业除了资源管理之外，其实应用程序管理是更贴近于企业的需求，应用有多种类型，包括传统的应用，像 Mysql、Tomcat、Nginx，还有基于微服务架构的应用、以及 Serverless 应用等。

企业需要一个可以管理各类计算资源和各类应用程序的一站式管理平台 ——— **Rainbond 应运而生**。

[Rainbond](https://www.rainbond.com?channel=aliyun)是“以应用为中心“的多云应用管理平台，提供的容器多云和混合云的解决方案，为您提供跨云的多集群统一管理、应用在多云环境下的统一部署和管理。基于 Rainbond 上开发的任何运行的应用，都能够交付给任何基于 Rainbond 的应用管理平台上去使用，也就是基于 Rainbond 可以将任何应用以任何规模部署到任何云上面，对开发者来说就是 只需构建一次，即可随时随地运行。

### Rainbond 与 CMP 对比

![image-20211205122115319](https://s2.loli.net/2021/12/05/xRXM3eucaFWTs64.png)

上图中简述的绘画了 Rainbond 与传统 CMP 的对比，可以很直观看出 Rainbond 关注的是应用层面，CMP 关注的是底层计算资源。

CMP 是基于“资源”的多云管理，可以实现多云下所有资源的统一管理。例如：在 CMP 中可开通某云厂商的虚拟机，包括订单的管理等。但 CMP 对于应用的管理就相对来说弱一些，无法将多个云上的应用进行统一运维、管理。

Rainbond 是“应用级”的多云管理，通过统一的应用模型，应用可以透明在多云上运行和迁移。例如：应用在物理服务器上开发和测试，不用任何改动就可以部署到各类公有云或客户的私有云上。

### 多云应用管理的四个典型场景

在 [Rainbond](https://www.rainbond.com?channel=aliyun)中实现多云目前有以下四个典型场景：

- **开发和生产环境分离：**

  在 CI/CD 的场景中，一些用户出于安全的考虑，希望开发环境和测试环境部署在本地的私有云集群，生产环境部署在公有云上。通过 Rainbond 可以将开发环境、测试环境和生产环境的集群统一管理，配合容器开发流水线，完成业务上线流水化作业，提高企业代码交付和部署的效率。

- **多云应用统一管理：**

  通过 Rainbond 对接和管理多云，统一管理多云下的所有应用，通过拓扑图查看业务的状态，管理应用的全生命周期，提高应用运维的效率。

- **通过应用市场实现多云应用交付：**

  在行业云或 ISV 场景中，应用需要交付到各种客户场景，Rainbond 的应用市场，可以将应用以模版的形式存放到应用市场，根据需要一键交付到客户环境，根据需要还能按需升级。

- **多云应用备份和迁移：**

  通过 Rainbond 实现应用从一个云备份和迁移到其他云。

### 具体实现

**1、通过 Rainbond 对接多云**

首先需拥有可用的 [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install?channel=aliyun) 。

完成 Rainbond 控制台的安装后，进入 Rainbond 控制台 **企业视图** >> **集群** >> **添加集群**，在公有云或私有云的服务器上安装 [Rainbond 集群端](https://www.rainbond.com/docs/user-operations/deploy?channel=aliyun) ，可添加并对接多个集群。

多集群对接后效果图:point_down:

<img src="https://pic.imgdb.cn/item/61a5d0802ab3f51d91d5afc2.png" alt="image-20211118142459214"  />

**2、多云应用统一管理**

当 Rainbond 对接多集群后，在 Rainbond 上可以创建和管理多团队，并为每个团队在多集群中分配资源，在团队空间中就可以管理应用全生命周期。

多云应用管理参考文档：

- [团队管理](https://www.rainbond.com/docs/get-start/team-management-and-multi-tenancy?channel=aliyun)
- [复杂组织结构的团队管理](https://mp.weixin.qq.com/s/Dt6FjAyRvJHQhm9p4--ceQ)
- [应用构建](https://www.rainbond.com/docs/component-create/creation-process?channel=aliyun)
- [服务运维](https://www.rainbond.com/docs/user-manual/component-op?channel=aliyun)
- [应用运维](https://www.rainbond.com/docs/user-manual/app-manage?channel=aliyun)

**3、开发环境和生产环境分离**

**A 云上做测试/开发，B 云上进行生产** 是最常见的环境分离。一般是在云上做测试/开发，在本地进行生产。但有时候可能颠倒过来，因为你可能需要**云的多区域能力**或者像 CDN 这种高级功能来为**生产环境加速**。

**例如：**在私有云环境中，部署开发环境，快速复制出测试、生产环境。快速复制支持跨团队、跨集群。

<img src="https://i.loli.net/2021/11/11/aGVgxeTIq1Uyrcu.png" alt="image-20211111174506912"  />

具体操作过程可以参考文档：

- [多云应用复制](https://www.rainbond.com/docs/user-manual/component-dev/app_copy?channel=aliyun)
- [一键上线和回滚](https://www.rainbond.com/docs/practices/app-dev/update-rollback?channel=aliyun)

**4、通过应用市场实现多云应用交付：**

用户可将已部署的业务通过 Rainbond 应用发布 功能一键发布到内部应用商店，可通过应用模板对应用进行版本管理以及应用详情介绍。也可通过应用模板可在多云环境中一键部署。
<img src="https://pic.imgdb.cn/item/61a5d0942ab3f51d91d5bf1c.png" alt="image-20211118144714895"  />

![image-20211205122143246](https://s2.loli.net/2021/12/05/so8LfOTVtPb5EiD.png)

具体操作过程可以参考文档：

- [应用发布](https://www.rainbond.com/docs/user-manual/app-manage/share-app?channel=aliyun)
- [应用模板](https://www.rainbond.com/docs/enterprise-manager/enterprise/appcenter/application-template?channel=aliyun)
- [制作应用模版](https://www.rainbond.com/docs/get-start/release-to-market?channel=aliyun)
- [基于应用市场的多云交付](https://www.rainbond.com/docs/enterprise-manager/enterprise/appcenter/add-app?channel=aliyun)

**5、多云应用备份和迁移**

Rainbond 目前提供了两种[备份](https://www.rainbond.com/docs/user-manual/app-manage/app-backup?channel=aliyun)方式，分别是本地备份及云端备份：

- 本地备份：备份后可将应用进行跨团队的迁移，将应用完整迁移到其他团队

- 云端备份：支持对接 `阿里云OSS` 、 `标准S3`，备份后应用可进行跨集群的迁移，在任何具有 Rainbond 平台的地方均可进行恢复，可实现应用的快速迁移。

进入 **应用视图** >> **备份** >> **新增备份**，备份操作分为 `本地备份` 和 `云端备份` 两种，选择后将进行自动备份。

备份完成后，当云环境不可用时，可在另外的云环境中通过备份快速恢复环境。
