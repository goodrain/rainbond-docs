---
title: 应用域名运维
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1305
description: 应用域名运维
hidden: true
---

> Rainbond平台上运行起来的应用，如果需要外部访问，都需要一个域名与之对应。这个域名是应用的标示，同时也是平台负载均衡区分后端服务的方法。Rainbond在线安装未指定自定义域名时，默认会自动注册一个*.<random>.grapps.cn的泛域名并进行dns的解析工作

#### 自定义域名

离线安装环境，如果未指定自定义域名，默认域名为pass.example.com或者pass.grapps.cn

##### 安装完成后修改自定义域名

需要编辑`/opt/rainbond/conf/master.yaml`文件中关于EX_DOMAIN的值,示例

```bash
sed -i "s#<默认域名>#<自定义域名>#g" /opt/rainbond/conf/master.yaml
```

更新完成后需要更新服务

```bash
node service update
```

##### 更新数据库相关值

```bash
docker exec rbd-db mysql -e 'use console;update region_info set httpdomain="自定义域名"'
```

自定义域名需要泛解析到当前管理节点。如自定义域名(www.a.com),管理节点ip(1.1.1.1),需要在域名解析记录里添加如下A记录

```bash
*.www.a.com A 1.1.1.1
```

#### 调整已有域名解析

> 只支持默认分配的grapps.cn域名,示例将默认域名解析记录有内网改为外网

```bash
domain-cli -newip <公网ip>/grctl domain --ip <公网ip> #两者都可以
# 更新成功后，稍等几分钟。如果没生效，请检查dns。
docker exec -it rbd-db mysql -e "update console.region_info set wsurl='ws://<公网ip>:6060',tcpdomain='<公网ip>';"
# 特别说明一下：如果已经修改过域名解析，需要再次修改域名解析请使用domain-cli
domain-cli -newip <newip> -oldip <oldip>
```