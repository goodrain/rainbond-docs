---
title: "组件端口"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 803
hidden: true
---

|Protocol|Port Range|Purpose|Used By|
|--------|------------|------------|------------|
|TCP|53/8089|dns|Self
|TCP|80/443/6443/10254|rbd-gateway|Self
|TCP|2379/23790/2380/23800,4001/40010|etcd server client API|kube-apiserver, etcd
|TCP|3306|rbd-db|Self
|TCP|6060/8443|rbd-api|Self
|TCP|6100-6102,9125|node|Self
|TCP|6362-6366|rbd-eventlog|Self
|TCP|6443/8080|kube-apiserver|Self
|TCP|7070|rbd-app-ui|Self
|TCP|9999|rbd-monitor|Self
|TCP|10248/10250/10255/42645|kubelet|Self 
|TCP|10251|kube-scheduler|Self
|TCP|10252/10257|kube-controller-manager|Self
|TCP|10254/18080/18081|rbd-gateway|Self
|TCP|10249/10256/30008|kube-proxy服务||kube-proxy|
|TCP|10259|kube-scheduler服务||kube-scheduler|
|TCP|30008|rainbond-operator|Self




