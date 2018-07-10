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
cp -a install/salt /srv/
cp -a install/pillar /srv/
cp rainbond.yaml.default /srv/pillar/rainbond.sls
cp -a scripts/yq /tmp/
# 默认生成配置
wget https://www.rainbond.com/docs/stable/operation-manual/setup/config/init-sls.sh -O /tmp/init-sls.sh
chmod +x /tmp/init-sls.sh
bash -x /tmp/init-sls.sh
```

根据需求可以变更`/srv/pillar/rainbond.sls`, 具体如下表

| 可自定义项 | 默认值 | 说明   |
| ------ | -------- | ----- | 
|master-public-ip|默认空|仅建议在专有网络情况下，想公网使用，可以修改为公网ip;|
|domain|默认null|支持修改为自定义域名|
|registry-mirrors|默认中科大|支持自定义加速器|
|dns-master/slave|默认114和CNNIC|支持自定义dns服务|
|myaql||支持自定义port,user,pass(port 还需修改此文件`/srv/salt/db/mysql/files/my.cnf`)|

## 二、细节说明

### 2.1 管理节点

### 2.2 计算节点
