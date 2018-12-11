---
title: 节点类型
summary: 讲解Rainbond所拥有的节点类型
toc: true
---

## 一、节点类型列表

目前Rainbond节点属性主要分为5种类型:

|节点类型|功能说明|备注|
|-------|-------|-----|
|Master节点|Rainbond管理节点，集结平台自身组件，提供应用调度管理等高级功能||
|Worker节点|Rainbond计算节点，提供计算资源||
|Etcd节点|提供kubernetes所需etcd存储|默认部署于管理节点|
|Lb节点|提供通向应用的网关|默认部署于管理节点|
|Storage节点|提供集群共享存储|默认使用NFS存储，可对接其它存储|