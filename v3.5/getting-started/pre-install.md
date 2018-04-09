---
title: 安装前准备
summary: 在安装云帮之前需要了解云帮所需要的系统级配置需求。
toc: false
toc_not_nested: true
asciicast: true
---
<div class="filters filters-big clearfix">
    <a href="pre-install.html"><button class="filter-button current"><strong>安装前准备</strong></button></a>
    <a href="install.html"><button class="filter-button">安装</button></a>
</div>

为了保证您正常使用云帮各项功能，以及云帮系统的稳定运行，在安装云帮之前您需要确认系统满足以下条件：

- 使用系统版本为CentOS 7、Debian 8/9、Ubuntu 16.04的系统进行安装。参考[系统需求](/docs/stable/getting-started/pre-install.html#part-2de6a0626265fe19)；


- 可正常访问至公网；
- 系统CPU、内存需求，若不满足则可能影响云帮系统使用。参考[配置需求](/docs/stable/getting-started/pre-install.html#part-2e4bde086eeb4c50)；
- 网卡配置静态IP，且未配置固定DNS。参考[网络需求](/docs/stable/getting-started/pre-install.html#part-2e161d26075a8cf6)；
- 系统未安装其他服务，如nginx、docker、kubernetes等，如有安装请完全卸载
- 建议关闭相关防火墙服务，如：SElinux，Firewall等
- 建议配置服务器时间同步为Asia/Shanghai。参考[配置时区与时间同步](/docs/stable/other/timezone.html) 

## 系统需求
| 系统   | 版本  | 说明           |
| :----- | :---- | :------------- |
| CentOS | 7.*   | 64位，推荐安装 |
| Debian | 8，9  | 64位           |
| Ubuntu | 16.04 | 64位           |

## 配置需求
### 服务器配置需求

| 环境     | CPU  | 内存   | 磁盘    | 集群规模 |
| :----- | :--- | :--- | :---- | :--- |
| demo环境 | 4核   | 16G  | 100G  | 1台   |
| 测试环境   | 8核   | 32G  | 200G  | 3台   |
| 生产环境   | 16+核 | 64G+ | 500G+ | 5台+  |
{{site.data.alerts.callout_danger}}
CPU、内存和磁盘的需求指的是一台机器的配置，而不是整个集群的总需求。
{{site.data.alerts.end}}

### 磁盘需求

| 节点类型      | 分区目录        | 分区大小                          | 分区说明                                      |
| :------------ | :-------------- | :-------------------------------- | :-------------------------------------------- |
| 管理/计算节点 | /               | 20G                               | 系统的根分区                                  |
| 管理/计算节点 | /var/lib/docker | 50G(测试环境)</br>100G+(生产环境) | 储存docker镜像                                |
| 管理/计算节点 | /opt/rainbond   | 50G(测试环境)</br>100G+(生产环境) | 云帮安装目录；</br>存储集群管理程序日志和数据 |
| 管理节点      | /grdata         | 50G(测试环境)</br>500G+(生产环境) | 集群公共数据，应用公共持久化存储              |

{{site.data.alerts.callout_danger}}

- /grdata目录在开源版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持块设备存储.
- 除第一个管理节点外，其他节点请勿自行挂载/grdata 

{{site.data.alerts.end}}

## 网络需求

{{site.data.alerts.callout_danger}}
dns 配置建议使用 114.114.114.114等国内dns server
一定要配置静态ip，确保重启节点，不会修改节点ip和dns配置，参考文档：<a href="/docs/stable/other/static-ip.html" target="_blank">配置静态IP</a>
{{site.data.alerts.end}}

## 主机名设置

{{site.data.alerts.callout_danger}}
主机名如果是localhost之类的,即包含localhost
执行 hostname -s 检查hostname
{{site.data.alerts.end}}

`hostname`在安装完成后建议不要修改，如果修改需同时修改`/etc/host`和`/etc/hostname`这两个文件保证hostname一致。
要确保每个节点的`hostname`不重复，推荐

```bash
管理节点 manage01 manage02 ...

计算节点 compute01 compute02 ...

存储节点 storage01 storage02 ...

存储节点 storage01 storage02 ...

# 配置示例
hostname manage01
echo manage01 > /etc/hostname
echo "192.168.1.1 manage01" >> /etc/hosts 
```
