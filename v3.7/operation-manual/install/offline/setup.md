--- 
title: 离线安装 
summary: 离线安装云帮
toc: true 
---

离线安装对系统环境要求比较严格，准备工作建议参考执行安装前准备和离线准备工作。

## 一、制作离线包

需要在有网的环境下，且已经安装了docker，且有权限读写/opt/rainbond目录。

```bash
# 默认会在/opt/目录下创建rainbond相关目录文件
curl https://raw.githubusercontent.com/goodrain/rainbond-install/v3.7/scripts/offline.sh -o ./offline.sh
chmod +x offline.sh
./offline.sh
```

## 二、准备工作

1. 将离线包同步到离线环境 `tar xf install.offline.v3.7.0.xxxx.tgz -C /`。
2. 请提前安装好如下包,避免安装失败。

```bash
# 通用软件工具包
tar ntpdate wget curl tree lsof htop nload net-tools telnet rsync git dstat iotop lvm2 pwgen
# centos
nfs-utils perl bind-utils iproute bash-completion createrepo
# debian/ubuntu
nfs-kernel-server nfs-common dnsutils python-pip python-apt apt-transport-https uuid-runtime iproute2 systemd
```

## 三、安装Rainbond

```bash
cd /opt/rainbond/install
./grctl init --install-type offline
```

## 四、安装提示报错

1. 如果是安装包失败或者提示什么命令未找到，请停止安装,根据提示自行下载相关安装包

```
mkdir -p /root/pkgs
# centos
yum install <包名> --downloadonly --downloaddir=/root/pkgs
# debian,deb默认放在/var/cache/apt/archives/目录下
apt install <包名> -d -y
```

手动安装缺失的包或工具,然后重新执行安装。

2. 安装docker失败，提示audit包问题

请检查`/opt/rainbond/install/install/pkgs/centos`目录下

```
ls | grep au
audit-2.8.1-3.el7.x86_64.rpm
audit-libs-2.8.1-3.el7.x86_64.rpm
audit-libs-python-2.8.1-3.el7.x86_64.rpm
```
正常情况应该是这样的，需要移除其他包或者新增缺失包，相关包(centos el7)可以在[阿里云镜像站](https://opsx.alibaba.com/mirror)下载

## 五、安装问题建议

当离线安装Rainbond 遇到问题时，请参考本篇相关文档。如果问题未解决，请按文档要求收集相关信息通过 Github [提供给 Rainbond开发者](https://github.com/goodrain/rainbond/issues/new)。

1. 系统版本
2. 机器配置
3. 云帮版本
4. 具体什么报错(最好有必要的图文说明)
5. 是否重新执行安装
6. 是否采用了上述的解决方案

## 五、附录

可以使用好雨科技提供的离线安装包,此离线包仅针对阿里云CentOS 7.4做过优化，并不能保证其适用于其他环境下的CentOS服务器。此离线包仅会同步更新大版本。

```
wget https://pkg.rainbond.com/releases/offline/v3.7.0/install.offline.v3.7.0.2018-08-21.tgz

MD5SUM:
ebdf396603ab78fa2bc4442ce7bce60f
SHA512SUM:
2fe0722e85e7c374d9119bcc4219256c2495e17194e1e492b5435fcdf9dd07e2debf81d39c0e3762326f0caaeb05855ec310698aa7709a10410c8090d6002ab7  

# 建议在有网的环境下,解压 cd /opt/rainbond/install/ 并更新安装脚本git pull 优化安装
# 离线环境
tar xf install.offline.v3.7.0.2018-08-21.tgz -C /
cd /opt/rainbond/install/
./grctl init --type offline --domain <自定义域名，可选>
# 扩容参考管理节点
```

