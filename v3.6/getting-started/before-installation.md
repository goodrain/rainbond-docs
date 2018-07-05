---
title: 安装前准备
summary: 在安装云帮之前需要了解云帮所需要的系统级配置需求。
toc: false
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
| CentOS | 7.*   | 64位，推荐安装 |
| Debian | 8，9  | 64位           |
| Ubuntu | 16.04 | 64位           |

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
- 除第一个管理节点外，其他节点请勿自行挂载/grdata 

{{site.data.alerts.end}}

## 网络需求

{{site.data.alerts.callout_danger}}
dns 配置建议使用 114.114.114.114等国内dns server
一定要配置静态ip，确保重启节点，不会修改节点ip和dns配置，参考文档：<a href="../other/static-ip.html" target="_blank">配置静态IP</a>

确保网络没有限制，或者将repo.goodrain.com(镜像源),www.rainbond.com,domain.grapps.cn(域名API接口),mirrors.ustc.edu.cn(镜像源)加入到网络白名单里。

如果使用云服务器，请确定安全组规则，建议放行22,80,6060,7070端口
{{site.data.alerts.end}}

## 配置时区与时间同步

确定系统时间与时区(Asia/Shanghai)同步，参考[配置时区与时间同步](../other/timezone.html)

## 主机名设置

首次安装的云帮会自动设置主机名为manage01、后续扩容安装的节点：

- 若扩容管理节点，自动设置主机名为manage02、manage03依次类推；
- 若扩容计算节点，自动设置主机名为compute01、compute02依次类推；

{{site.data.alerts.callout_danger}}

还需注意系统未安装其他服务，如nginx、docker、kubernetes等，如有安装请完全卸载。

{{site.data.alerts.end}}