--- 
title: 离线安装 
summary: 离线安装云帮
toc: true 
---

|离线包| 版本 |说明 | 
|--------|--------|---------|
|镜像离线包|3.7.0rc|20180806更新| 
|软件离线包|7.3/7.4|20180806更新|


## 一、制作离线包

```bash
# 默认会在/opt/目录下创建rainbond相关目录文件
curl https://raw.githubusercontent.com/goodrain/rainbond-install/v3.7/scripts/offline.sh -o ./offline.sh
chmod +x offline.sh
./offline.sh

# 下载好雨提供的离线包,理论上每个版本会提供一个离线包
# https://pkg.rainbond.com/releases/common/v3.7.0rc/all/install.offline.v3.7.0rc.2018-08-09.tgz
```

## 二、准备离线包


将离线包同步到离线环境 `tar xf install.offline.v3.7.0rc.2018-08-09.tgz -C /`


## 三、安装Rainbond

```bash
cd /opt/rainbond/install
./grctl init --install-type offline
```

## 四、安装问题建议

当离线安装Rainbond 遇到问题时，请参考本篇trouble-shooting相关文档。如果问题未解决，请按文档要求收集相关信息通过 Github [提供给 Rainbond开发者](https://github.com/goodrain/rainbond/issues/new)。