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

## 一、系统需求
| 系统   | 版本  | 说明           |
| :----- | :---- | :------------- |
| CentOS | 7.3/7.4   | 64位，推荐安装(7.4.1708) |
| Debian | 9.6  | 64位           |
| Ubuntu | 16.04 | 64位           |

{{site.data.alerts.callout_danger}}
目前我们在CentOS 7.4 系统下做了严格的测试，并且具备了丰富的生产环境使用经验。因此推荐用户使用CentOS 7.4安装云帮。
目前仅支持root用户，支持Systemd守护.
目前不支持Centos 7.5版本
{{site.data.alerts.end}}

## 二、服务器配置需求

服务器最低配置为4核8G.
{{site.data.alerts.callout_danger}}
CPU、内存和磁盘的需求指的是一台机器的配置，而不是整个集群的总需求。
如果配置低于最低搭建配置，安装程序会终止安装。
{{site.data.alerts.end}}

## 三、磁盘需求

推荐分区如下:

| 节点类型      | 分区目录        | 分区(最低阈值)                          | 分区说明                                      |
| :------------ | :-------------- | :-------------------------------- | :-------------------------------------------- |
| 管理/计算节点 | /               | 50G                               | 系统的根分区                                  |
| 管理/计算节点 | /var/lib/docker | 100G | 储存docker镜像                                |
| 管理/计算节点 | /opt/rainbond   | 100G | 云帮安装目录；</br>存储集群管理程序日志和数据 |
| 管理节点      | /grdata         | 200G | 集群公共数据，应用公共持久化存储，使用NFS或其它分布式共享存储共享数据|
| 管理节点      | /cache          | 50G | 源码构建缓存，使用NFS或其它分布式共享存储共享数据 |
| 计算节点      | /grlocaldata    | 50G | 应用本地持久化存储数据，务必使用本地磁盘           |

{{site.data.alerts.callout_danger}}
开源版本默认第一个节点作为nfs服务端,第一个节点磁盘空间占用大于其他节点，建议多分配一些磁盘配置。
/grdata目录在开源版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持块设备存储.
{{site.data.alerts.end}}

## 四、安装检查注意事项

1. DNS建议配置为常用DNS服务如114.114.114.114,1.2.4.8等
2. 确保机器重启，服务器ip不发生改变，推荐[配置静态ip](../operation-manual/install/config/static-ip.html)
3. 确定系统时间与时区(Asia/Shanghai)同步，参考[配置时区与时间同步](../operation-manual/install/config/timezone.html)
4. 确定网络没有限制，如有请加如下域名添加到白名单repo.goodrain.com,www.rainbond.com,domain.grapps.cn
5. 不支持容器部署,不支持OpenVZ架构部署

<!--
## 五、云服务商支持说明
| 云服务商   | 测试区域  | 说明           |
| :----- | :---- | :------------- |
| 阿里云 | 中国  | 推荐 |
| 腾讯云 | 中国  | 测试通过           |
| AWS | 中国 | 测试通过          |
| vultr | 日本 | 测试通过          |
| 滴滴云 | 中国  | 测试通过           |
| 华为云 | 中国  | 测试通过           |
具体请参考 [Rainbond自定义配置](../operation-manual/install/config/custom-config.html)  
-->

<div class="step"><a href="online-installation.html"><button class="btn">我已经准备好，开始安装</button></a></div>

