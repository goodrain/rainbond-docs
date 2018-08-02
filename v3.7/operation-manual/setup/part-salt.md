--- 
title: 安装部署salt
summary: 安装部署salt
toc: true
---

## 一、安装SaltStack

### 1.1 Debian 9

```
# 导入SaltStack repository key
wget -O - https://repo.saltstack.com/apt/debian/9/amd64/2017.7/SALTSTACK-GPG-KEY.pub |  apt-key add -
# 配置源 /etc/apt/sources.list.d/saltstack.list
deb http://repo.saltstack.com/apt/debian/9/amd64/2017.7 stretch main
# 安装salt-master & salt-minion
apt-get update
apt-get install salt-master
apt-get install salt-minion
```

### 1.2 Ubuntu 16.04

```bash
# 导入SaltStack repository key
wget -O - https://repo.saltstack.com/apt/ubuntu/16.04/amd64/2017.7/SALTSTACK-GPG-KEY.pub |  apt-key add -
# 配置源 /etc/apt/sources.list.d/saltstack.list
deb http://repo.saltstack.com/apt/ubuntu/16.04/amd64/2017.7 xenial main
# 安装salt-master & salt-minion
apt-get update
apt-get install salt-master
apt-get install salt-minion
```

### 1.3 Centos 7

```bash
# 导入SaltStack repository和key
yum install https://repo.saltstack.com/yum/redhat/salt-repo-2017.7-1.el7.noarch.rpm 
yum clean expire-cache
# 安装salt-master和salt-minion
yum install salt-master
yum install salt-minion
```

## 二、配置SaltStack

### 2.1 修改主机名

```bash
hostname manage01
echo manage01 > /etc/hostname
```

### 2.2 配置salt-master

```bash
# /etc/salt/master.d/master.conf
interface: <节点ip>
open_mode: True
auto_accept: True
failhard: True
# The level of log record messages to send to the console.
log_level: error
# The level of messages to send to the log file.
log_level_logfile: debug
# gather_job_timeout: 10
timeout: 60
```

### 2.3 配置salt-minion

```bash
# /etc/salt/minion.d/minion.conf
master: <节点ip>
id: <minion所在节点主机名>
# The level of log record messages to send to the console.
log_level: error
# The level of messages to send to the log file.
log_level_logfile: debug
# /etc/salt/minion.d/minion.ex.conf
grains:               
  mip:
    - <minion节点ip>
```

### 2.4 启动salt服务

```bash
# 重启服务
systemctl restart salt-master
systemctl restart salt-minion
salt-key -L
# 测试
salt "*" test.ping
manage01:
    True
```