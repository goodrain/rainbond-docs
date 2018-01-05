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

<div id="toc"></div>

在安装云帮之前需要了解云帮所需要的系统级配置需求，以下是云帮目前所支持的系统具体信息:

## 系统需求
|系统	 |版本	 |	内核版本	|说明|
|:---|:---|:------|:---|
|Centos| 7.3	  |	3.10	|64位		|


{{site.data.alerts.callout_danger}}
请确保系统未安装其他服务，如nginx、docker、kubernetes等，如有安装请完全卸载;另外建议关闭相关防火墙服务如selinux。

<!--后面也会陆续支持Debian9/Ubuntu16.04系统。 -->
{{site.data.alerts.end}}

## 配置需求
平台建议使用多节点(2+),即管理节点(1,3,5,7...+)&计算节点(1+)。

### **1、服务器配置需求**

|环境|CPU|内存|磁盘|集群规模|
|:---|:---|:---|:---|:---|
|demo环境|2核|8G|100G|1台|
|测试环境|4核|8G|200G|2台|
|生产环境|8核|32G|200G|3台|
{{site.data.alerts.callout_danger}}
配置中内存和磁盘指的是一台机器，而不是整个集群的性能需求。
{{site.data.alerts.end}}

### **2、磁盘需求**

|节点类型|分区目录|分区大小|分区说明|
|:---|:---|:---|:---|
|管理/计算节点|/|20G|系统的根分区|
|管理/计算几点|/var/lib/docker|50G(测试环境)</br>100G+(生产环境)|储存docker镜像|
|管理节点|/data|50G(测试环境)</br>100G+(生产环境)|集群管理程序日志和数据|
|管理节点|/grdata|50G(测试环境)</br>100G+(生产环境)|集群公共数据，应用公共持久化存储|
/grdata目录在社区版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持快设备存储.

### **3、 网络需求**

{{site.data.alerts.callout_danger}}
一定要配置静态ip，确保重启节点，不会修改节点ip和dns配置，参考文档：<a href="/docs/stable/other/static-ip.html" target="_blank">配置静态IP</a>
{{site.data.alerts.end}}

## 保持服务器时间同步
参考文档: <a href="/docs/stable/other/timezone.html" target="_blank">配置时区与时间同步</a>

## 主机名设置

`hostname`在安装完成后建议不要修改，如果修改需同时修改`/etc/host`和`/etc/hostname`这两个文件保证hostname一致。
要确保每个节点的`hostname`不重复，推荐

```bash
管理节点 manage01 manage02 ...

计算节点 compute01 compute02 ...

存储节点 storage01 storage02 ...
```