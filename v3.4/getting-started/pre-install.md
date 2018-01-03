---
title: 前置需求
summary: 在安装云帮之前需要了解云帮所需要的系统级配置需求。
toc: false
toc_not_nested: true
asciicast: true
---

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

## 性能及配置需求
平台建议使用多节点(2+),即管理节点(1,3,5,7...+)&计算节点(1+)。

**1、服务器性能需求**

|环境|CPU|内存|磁盘|集群规模|
|:---|:---|:---|:---|:---|
|demo环境|2核|8G|100G|1台|
|测试环境|4核|8G|200G|2台|
|生产环境|8核|32G|200G|3台|
{{site.data.alerts.callout_danger}}
配置中内存和磁盘指的是一台机器，而不是整个集群的性能需求。
{{site.data.alerts.end}}

**2、磁盘配置需求**

|节点类型|分区目录|分区大小|分区说明|
|:---|:---|:---|:---|
|管理/计算节点|/|20G|系统的根分区|
|管理/计算几点|/var/lib/docker|50G(测试环境),100G+(生产环境)|储存docker镜像|
|管理节点|/data|50G(测试环境)100G+(生产环境)|储存集群管理程序的日志和数据|
|管理节点|/grdata|50G(测试环境)，100G+(生产环境)|储存集群的公共数据以及容器的公共持久化存储目录|
/grdata目录在社区版中默认使用nfs作为共享存储，生产环境便于配置分布式文件系统，企业版支持快设备存储.

**3、 网络配置需求**


{{site.data.alerts.callout_danger}}
一定要配置静态ip，确保重启节点，不会修改节点ip和dns配置
{{site.data.alerts.end}}


##时间同步需求
			
在线一键安装云帮之前要确保所有节点时间与世界标准时间同步，下面会分别说明Ubuntu系统和Centos系统下服务器同步标准时间的方法:		
1、Centos系统同步时间的方法	
- 安装ntp服务

{% include copy-clipboard.html %}	
```bash
sudo yum install ntp
```

- 修改成国内时区并同步

{% include copy-clipboard.html %}
```bash
timedatectl set-timezone Asia/Shanghai
timedatectl set-ntp yes
```
		
- 查看时间确保同步

{% include copy-clipboard.html %}
```bash
timedatectl
```

**2、Ubuntu系统同步时间的方法**

- 安装tzdata

{% include copy-clipboard.html %}
```bash
dpkg-reconfigure tzdata
```

按照提示进行时区选择

- 防止系统重启后时区改变

{% include copy-clipboard.html %}
 ```bash
  sudo cp /usr/share/zoneinfo/Asia/Chongqing /etc/localtime
  ```

- 网上同步时间

{% include copy-clipboard.html %}
  ```bash
  sudo apt-get install ntpdate
  ntpdate cn.ntp.org.cn
  hwclock -w
  ```
  
##网络设置
**1、Centos设置**


{% include copy-clipboard.html %}
 ```bash
##配置文件模板
cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
BOOTPROTO=static
IPADDR=192.168.1.100
NETMASK=255.255.255.0
 ```
 
 {{site.data.alerts.callout_danger}}		
确认网卡配置中"ONBOOT=yes"，以及设定了静态IP

{{site.data.alerts.end}}

**2、Ubuntu设置**
			
{% include copy-clipboard.html %}
```bash
##配置文件模板
sudo nano /etc/network/interfaces
auto eth0
iface eth0 inet static
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
```

##修改软件源


云帮自动化安装脚本在安装过程中会下载一些依赖包，为了加快软件包的下载速度，建议将软件仓库源地址修改为国内镜像加速地址，修改方式参考：[修改软件源为国内加速镜像](https://t.goodrain.com/t/topic/236#theory2)
   
##其他注意事项


`hostname`在安装完成后建议不要修改，如果修改需同时修改`/etc/host`和`/etc/hostname`这两个文件保证hostname一致。
要确保每个节点的`hostname`不重复，推荐
```
管理节点 manage01 manage02 ...
计算节点 compute01 compute02 ...
存储节点 storage01 storage02 ...
```