---
title: 部署引导
summary: 用户通过此引导，被导航到单节点demo部署、三节点测试部署、5+节点生产部署文档
toc: true
toc_not_nested: true
asciicast: true
---
<div id="toc"></div>

## 1 约定要求

###1.1 系统需求

| 系统   | 版本  | 说明           |
| :----- | :---- | :------------- |
| CentOS | 7.3/7.4   | 64位，推荐安装(7.3.1611) |
| Debian | 9.4  | 64位           |
| Ubuntu | 16.04 | 64位           |

> 目前我们在CentOS 7.3 系统下做了严格的测试，并且具备了丰富的生产环境使用经验。因此推荐用户使用CentOS 7.3安装云帮。

###1.2 服务器配置需求

| 环境     | CPU  | 内存   | 磁盘    | 集群规模 |
| :----- | :--- | :--- | :---- | :--- |
| demo环境 | 4核   | 8G  | 100G  | 1台   |
| 测试环境   | 8核   | 32G  | 200G  | 3台   |
| 生产环境   | 16+核 | 64G+ | 500G+ | 5台+  |
{{site.data.alerts.callout_danger}}
CPU、内存和磁盘的需求指的是一台机器的配置，而不是整个集群的总需求。
{{site.data.alerts.end}}

###1.3 磁盘需求

| 节点类型      | 分区目录        | 分区大小                          | 分区说明                                      |
| :------------ | :-------------- | :-------------------------------- | :-------------------------------------------- |
| 管理/计算节点 | /               | 40G                               | 系统的根分区                                  |
| 管理/计算节点 | /var/lib/docker | 50G(测试)</br>100G+(生产) | 储存docker镜像                                |
| 管理/计算节点 | /opt/rainbond   | 50G(测试)</br>100G+(生产) | 云帮安装目录；</br>存储集群管理程序日志和数据 |
| 管理节点      | /grdata         | 50G(测试)</br>500G+(生产) | 集群公共数据，应用公共持久化存储              |
| 管理节点      | /cache          | 20G(测试)</br>100G+(生产) | 源码构建缓存                                  |

{{site.data.alerts.callout_danger}}
- /grdata目录在开源版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持块设备存储.
{{site.data.alerts.end}}

###1.4 云服务商支持说明

| 云服务商   | 测试区域  | 说明           |
| :----- | :---- | :------------- |
| 阿里云 | 中国  | 推荐 |
| 腾讯云 | 中国  | 测试通过           |
| AWS | 中国 | 测试通过          |
| vultr | 日本 | 测试通过          |
| 滴滴云 | 中国  | 测试通过           |
| 华为云 | 中国  | 测试通过           |

<!--

###1、5 自定义配置项说明

- 支持自定义配置域名 & 公网ip - Aug 20, 2018

具体请参考 [Rainbond自定义配置](../operation-manual/install/config/custom-config.html)

-->

## 2 部署方式选择：

请选择部署方式：

<div class="btn-group btn-group-justified">
  <a href="online-installation.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">单节点DEMO</a>
  <a href="../operation-manual/cluster-management/three-nodes-deployment.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">三节点测试</a>
  <a href="../operation-manual/cluster-management/five-nodes-deployment.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">5+节点生产</a>
</div>