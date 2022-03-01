---
title: rainbond-operator组件说明
description: "rainbond-operator组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行 


### 简要说明

rainbond-operator控制着rainbond所有组件的配置与运行状态，持续的监控各个组件的状态，做出不同的动作，比如，rbd-db的pod实例被删除或者参数修改了，operator立即会做出反馈。



