---
title: 安装前准备
summary: 在安装云帮之前需要了解云帮所需要的系统级配置需求。
toc: true
toc_not_nested: true
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="before-installation.html"><button class="filter-button current"><strong>安装前准备</strong></button></a>
    <a href="online-installation.html"><button class="filter-button">安装</button></a>
</div>

<div id="toc"></div>

## 系统需求
| 系统   | 版本  | 说明           |
| :----- | :---- | :------------- |
| CentOS | 7.3/7.4   | 64位，推荐安装(7.3.1611) |
| Debian | 9.4  | 64位           |
| Ubuntu | 16.04 | 64位           |

> 目前我们在CentOS 7.3 系统下做了严格的测试，并且具备了丰富的生产环境使用经验。因此推荐用户使用CentOS 7.3安装云帮。

## 服务器配置需求

| 环境     | CPU  | 内存   | 磁盘    | 集群规模 |
| :----- | :--- | :--- | :---- | :--- |
| demo环境 | 4核   | 8G  | 100G  | 1台   |
| 测试环境   | 8核   | 32G  | 200G  | 3台   |
| 生产环境   | 16+核 | 64G+ | 500G+ | 5台+  |
{{site.data.alerts.callout_danger}}
CPU、内存和磁盘的需求指的是一台机器的配置，而不是整个集群的总需求。
{{site.data.alerts.end}}

## 磁盘需求

| 节点类型      | 分区目录        | 分区大小                          | 分区说明                                      |
| :------------ | :-------------- | :-------------------------------- | :-------------------------------------------- |
| 管理/计算节点 | /               | 20G                               | 系统的根分区                                  |
| 管理/计算节点 | /var/lib/docker | 50G(测试)</br>100G+(生产) | 储存docker镜像                                |
| 管理/计算节点 | /opt/rainbond   | 50G(测试)</br>100G+(生产) | 云帮安装目录；</br>存储集群管理程序日志和数据 |
| 管理节点      | /grdata         | 50G(测试)</br>500G+(生产) | 集群公共数据，应用公共持久化存储              |
| 管理节点      | /cache          | 20G(测试)</br>100G+(生产) | 源码构建缓存                                  |

{{site.data.alerts.callout_danger}}
- /grdata目录在开源版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持块设备存储.
{{site.data.alerts.end}}

## 安装检查注意事项

1. 要确保系统已经安装了如下命令: `curl`, `git`
2. 要确保系统配置的源是否正常可用,CentOS除镜像源外还需要有epel源
3. 系统未安装docker,k8s服务
4. 系统内网ip段非172.30.0.0/16
5. 检查端口80,443,2379,3306,5000,6060,6443,7070,8443是否被占用
6. 安全组需要放行80,6060,7070
7. DNS建议配置为常用DNS服务如114.114.114.114,1.2.4.8等
8. 确保机器重启，服务器ip不发生改变，推荐[配置静态ip](../operation-manual/install/config/static-ip.html)
9. 确定系统时间与时区(Asia/Shanghai)同步，参考[配置时区与时间同步](../operation-manual/install/config/timezone.html)
10. 确定网络没有限制，如有请加如下域名添加到白名单repo.goodrain.com,www.rainbond.com,domain.grapps.cn
11. 安装前请勿挂载/grdata目录
12. 不支持容器部署,不支持OpenVZ架构部署
13. 推荐[限制容器资源](../operation-manual/install/config/swap.html)
14. 推荐关闭[NetworkManager](../operation-manual/install/config/disable-NetworkManager.html)服务

## 云服务商支持说明

| 云服务商   | 测试区域  | 说明           |
| :----- | :---- | :------------- |
| 阿里云 | 中国  | 推荐 |
| 腾讯云 | 中国  | 测试通过           |
| AWS | 中国 | 测试通过          |
| vultr | 日本 | 测试通过          |
| 滴滴云 | 中国  | 测试通过           |
| 华为云 | 中国  | 测试通过           |


## 自定义配置项说明

- 支持自定义配置域名 & 公网ip - Aug 20, 2018

具体请参考 [Rainbond自定义配置](../operation-manual/install/config/custom-config.html)  

