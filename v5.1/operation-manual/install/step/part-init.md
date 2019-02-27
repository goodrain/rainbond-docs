--- 
title: 初始化环境
summary: 初始化环境
toc: true 
---

## 一、准备工作


### 1.1 安装常用的工具

以下工具仅推荐安装,具体按需安装

```bash
# Centos 7
yum install -y iotop nload telnet htop lsof tree rsync lvm2 tar ntpdate wget net-tools git pwgen perl bind-utils dstat iproute bash-completion 
# Debian/Ubuntu
apt install -y iotop nload telnet htop lsof tree rsync lvm2 tar ntpdate wget net-tools git pwgen uuid-runtime iproute2 systemd dnsutils python-pip apt-transport-https 
```

### 1.2 克隆安装代码

```bash
git clone --depth 1 -b v3.6 https://github.com/goodrain/rainbond-install.git
cd rainbond-install
```

### 1.3 配置salt

```bash
# 检测并初始化配置
./setup.sh check
```

根据需求可以变更`/srv/pillar/rainbond.sls`, 具体如下表

| 可自定义项 | 默认值 | 说明   |
| ------ | -------- | ----- | 
|master-public-ip|默认空|仅建议在专有网络情况下，想公网使用，可以修改为公网ip;|
|domain|默认null|支持修改为自定义域名|
|registry-mirrors|默认中科大|支持自定义加速器|
|dns-master/slave|默认114和CNNIC|支持自定义dns服务|
|mysql||支持自定义port,user,pass(port 还需修改此文件`/srv/salt/db/mysql/files/my.cnf`)|

其他请参考[自定义配置](https://www.rainbond.com/docs/stable/operation-manual/setup/custom-config.html)

## 二、初始化节点说明

```bash
# 初始化节点
salt "*" state.sls init
```

#### 主要操作

1. 配置ssh相关key
2. 创建rain用户
3. 限制swap
4. 修改limits文件等系统级配置文件
5. 禁止部分系统服务如dnsmasq
6. 生成域名(仅manage01)
7. 生成部分组件配置文件

具体配置参见[rainbond-install/install/salt/init/](https://github.com/goodrain/rainbond-install/tree/v3.6/install/salt/init),欢迎pull request来完善初始化部分。
