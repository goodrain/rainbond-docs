---
title: "如何构建离线安装包"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 804
hidden: true
description: 如何构建离线安装包
---

### 构建离线软件包

[install-repo](https://github.com/goodrain/install-repo.git)

```
git clone https://github.com/goodrain/install-repo.git
cd install-repo
make build_offline
```

### 构建离线镜像包

参考 [构建离线镜像](https://github.com/goodrain/rainbond-ansible/blob/devel/offline/images/offimage.sh)

### 构建离线安装包

默认rainbond-ansible项目的tgz压缩包
