---
title: 域名维护操作
summary: 域名维护操作
toc: true
---

## 一、概述

> 云帮平台上运行起来的应用，如果需要外部访问，都需要一个域名与之对应。这个域名是应用的标示，同时也是平台负载均衡区分后端服务的方法。
> 云帮安装程序默认会自动注册一个`*.<random>.grapps.cn` 的泛域名并进行dns的解析工作

## 二、自定义域名

### 2.1 安装完成后修改自定义域名

#### 2.1.1 更新配置文件

需要编辑如下文件`/opt/rainbond/conf/master.yaml`,示例如下

```bash
sed -i "s#<默认域名>#<自定义域名>#g" /opt/rainbond/conf/master.yaml
systemctl restart rbd-lb
systemctl restart rbd-worker
systemctl restart rbd-api
```

说明一下：需要把自定义域名解析到当前机器ip。

#### 2.2.2 更新数据库字段

```bash
docker exec rbd-db mysql -e 'use console;update region_info set httpdomain="自定义域名"'
```

{{site.data.alerts.callout_danger}}
如用：自定义域名(www.a.com) 需要泛解析到管理节点(10.10.10.1)
示例 `*.www.a.com A	10.10.10.1`
{{site.data.alerts.end}}

## 三、调整已有域名解析

<!--
仅适用于自动化部署安装云帮
-->

经典网络默认解析是公网ip，专有(VPC)网络默认解析是内网ip。

```bash
domain-cli -newip <公网ip>
或者
grctl domain --ip <公网ip>
```
更新成功后，稍等几分钟。如果没生效，请检查dns。 

更新数据库字段:

```bash
docker exec -it rbd-db mysql -e "update console.region_info set wsurl='ws://<公网ip>:6060',tcpdomain='<公网ip>';"
```

特别说明一下：如果已经修改过域名解析，需要再次修改域名解析请使用`domain-cli`

```bash
domain-cli -newip <newip> -oldip <oldip>
```
