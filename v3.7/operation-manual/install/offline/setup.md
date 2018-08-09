--- 
title: 离线安装 
summary: 离线安装云帮
toc: true 
---

当前只提供Centos 7.3/7.4离线包。可以根据[Install](https://github.com/goodrain/rainbond-install/blob/v3.7/scripts/offline.sh)脚本定制自己的离线包。

|离线包| 版本 |说明 | 
|--------|--------|---------|
|镜像离线包|3.7.0rc|20180806更新| 
|软件离线包|7.3/7.4|20180806更新|


## 一、准备离线包

```
# 下载镜像离线包
wget https://pkg.rainbond.com/releases/common/v3.7.0rc/imgs/install.offline.v3.7rc.tgz -O ./install.offline.v3.7rc.imgs.tgz

# 下载软件离线包
wget https://pkg.rainbond.com/releases/common/v3.7.0rc/pkgs/install.offline.v3.7rc.tgz -O ./install.offline.v3.7rc.pkgs.tgz

# 下载安装脚本
wget https://github.com/goodrain/rainbond-install/archive/v3.7.zip

# 下载grctl
wget https://pkg.rainbond.com/releases/common/v3.7.0rc/grctl
chmod +x grctl

# 下载补充包
wget https://pkg.rainbond.com/releases/common/v3.7.0rc/imgs/goodrainme_grafana_5.2.2.gz -O /opt/rainbond/install/install/imgs/goodrainme_grafana_5.2.2.gz
# 同步到离线环境
```

1. 将v3.7.zip解压到`/opt/rainbond/install`
2. 将install.offline.v3.7rc.imgs.tgz解压到/ `tar xf install.offline.v3.7rc.imgs.tgz -C /`
3. 将install.offline.v3.7rc.pkgs.tgz解压到/ `tar xf install.offline.v3.7rc.pkgs.tgz -C /`
4. 将grctl拷贝到`/opt/rainbond/install`目录

## 二、安装Rainbond

```bash
cd /opt/rainbond/install
./grctl init --install-type offline
```
