---
title: 配置静态IP
summary: rainbond，静态IP
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 1、Centos设置


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

## 2、Ubuntu设置
      
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
