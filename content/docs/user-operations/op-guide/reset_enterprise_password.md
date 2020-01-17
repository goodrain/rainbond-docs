---
title: "重置企业管理员密码"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 804
hidden: true
description: 命令行快速重置企业管理员密码
---

开源版本目前可通过如下命令修改企业管理员(默认是第一个注册用户)密码，后续会集成到grctl相关工具里.

#### 管理节点操作

> 数据库用户名和数据库密码(`cat /opt/rainbond/rainbond-ansible/roles/rainvar/defaults/main.yml | grep "^db_"`)

```
docker run -it --rm  --network host -e MYSQL_HOST=<数据库地址> -e MYSQL_PORT=3306 -e MYSQL_USER=<数据库用户名> -e MYSQL_PASS=<数据库密码> -e MYSQL_DB=console -e PASSWORD=<新密码> rainbond/tools:reset_password
```