---
title: "容器运行时和数据库安装"
description: "本章节介绍安装容器运行时和 MYSQL 数据库"
keywords:
- 搭建 MYSQL 数据库主从集群
- 安装容器运行时，安装Docker，安装Containerd
---


本章节介绍安装容器运行时以及 Mysql 数据库。

## 安装容器运行时

Rainbond 支持 Docker 和 Containerd 两种容器运行时

### 安装 Docker

Rainbond 支持 Docker `19.03.0+` 版本，安装 Docker 请参考 [Docker 官方文档](https://docs.docker.com/install/)。

* 使用 Rainbond 提供的脚本安装 Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

#### 配置 Docker 镜像加速

如果您的环境需要通过镜像加速器访问外网，需要配置 Docker 的镜像加速器，配置方法如下：

```bash
mkdir -p /etc/docker
cat <<EOF > /etc/docker/daemon.json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```
:::tip
如是通过 Rainbond 提供的脚本安装 Docker，那么镜像加速器已经配置好了。
:::

### 安装 Containerd

Rainbond 支持 Containerd 1.2.0+ 版本，安装 Containerd 请参考 [Containerd 官方文档](https://containerd.io/docs/getting-started/)。

#### 配置 Containerd 镜像加速

如果您的环境需要通过镜像加速器访问外网，需要配置 Containerd 的镜像加速器，配置方法如下：

```bash
mkdir -p /etc/containerd
cat <<EOF > /etc/containerd/config.toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
    endpoint = ["https://registry.docker-cn.com"]
EOF
systemctl daemon-reload
systemctl restart containerd
```

## 安装 Mysql 数据库

Rainbond 需要使用MySQL存储控制台及集群端数据，若用户已有高可用数据库则可直接使用，需满足以下条件：

* 数据库版本为MySQL5.7/8.0；
* 提前创建 `console` `region` 库；
* 数据库字符编码为utf8mb4；
* 推荐数据库与 Rainbond 集群网络在同一内网范围内。

### 如还未安装数据库，可参考以下文档进行安装

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```