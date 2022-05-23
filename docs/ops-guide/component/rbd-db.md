---
title: rbd-db
description: "rbd-db组件参数说明"
---

## rbd-db组件说明

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

基于[percona分支](https://hub.docker.com/_/percona) `5.7.26`版本制作的rbd-db镜像

rbd-db 数据库持久化目录`/opt/rainbond/data`

Rainbond `rbd-db`[源码地址](https://github.com/goodrain/rbd-db)