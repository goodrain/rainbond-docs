---
title: '快速部署'
weight: 1001
description: '此方式适用于快速安装和试用Rainbond平台, 最少只需要单台机器即可完成all-in-one模式的部署。'
---

### 一、安装前必读

`all-in-one`模式快速安装适用于想要快速安装 Rainbond，试用 Rainbond，仅作为演示环境使用。

#### 安装说明

- 安装时必须使用 root 用户执行安装操作；
- Rainbond 单节点安装,如果想跳过系统配置检查，安装时指定`--enable-check disable`，如果配置过低可能会无法正常安装部署；
- 在线安装确定网络没有限制,如有请将域名添加到白名单。

### 二、安装 Rainbond

#### 2.1 下载 Rainbond 安装包

目前最新安装的版本是: v5.1.11-release

```shell
wget https://pkg.rainbond.com/releases/common/v5.1/grctl && chmod +x ./grctl
```

#### 2.2 初始化数据中心

数据中心 是 Rainbond 资源集合的核心抽象，初始化数据中心操作需要在第一台服务器上执行安装命令。

**开始`all-in-one`模式快速安装**

```bash
# 若当前机器存在多个内网IP地址时需要请务必指定内网IP地址(iip);若当前机器同时具备内网和公网IP地址时，务必指定公网IP地址(eip)，若无则无需指定

./grctl init --iip 内网ip --eip 公网ip

```

上述步骤完成将默认把第一个节点安装成为`all-in-one`模式节点，更多安装参数请使用`./grctl init -h`命令获取

> 安装过程需要下载和处理大约 2G 的文件，需要一定时间，请耐心等待。若遇到无法解决的错误请于[Rainbond 社区](https://t.goodrain.com)留言。
