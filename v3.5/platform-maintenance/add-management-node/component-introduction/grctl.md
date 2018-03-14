---
title: grctl
summary: grctl组件介绍
toc: false
asciicast: true
---

<div id="toc"></div>

## 简介

> Goodrain datacenter controller util - A new cli application.

通过此命令可以管理集群、获取应用运行详细信息、计算节点信息、租户应用信息以及操作容器等。

## init

初始化集群, 默认会将第一个节点身份认证为管理节点&计算节点，安装管理节点服务。

## node

节点相关操作.

- list

列出所有节点.

- get <节点uid/节点ip>

获取节点详细信息

- up/down <节点uid>

上/下线节点

- unscheduable/rescheduable <节点uid>

不可调度/恢复调度

- delete <节点uid>

删除节点

- add 

新增节点

```
grctl node add -i <内网ip> -e <内网ip> --Role <节点身份>

# -e 如果有公网ip，则标识公网ip，否则为内网ip
# --Role 节点身份 manage/compute
```

## install

安装服务

```
# 安装计算节点
grctl install compute --nodes <uid>
# 安装管理节点
grctl install manage_base  --nodes <uid>
grctl install manage  --nodes <uid>
```

## tenant/tenantres

获取租户应用（包括未运行）信息/获取租户占用资源问题

```
grctl tenant/tenantres <租户名>
```

## get/start/stop <租户/应用别名>

获取应该详细信息/启动应用/停止应用

```
grctl get/start/stop <goodrain/gra564a1>
```
