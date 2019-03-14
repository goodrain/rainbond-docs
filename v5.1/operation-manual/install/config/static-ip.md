---
title: 配置静态IP
summary: rainbond，静态IP
toc: false
toc_not_nested: false
asciicast: false
---

## 1、Centos配置静态IP

配置文件参考如下:

 ```bash
cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
BOOTPROTO=static
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
 ```
 

## 2、Debian系配置静态IP

配置文件参考如下:
     
```bash

sudo nano /etc/network/interfaces
auto eth0
iface eth0 inet static
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
```
