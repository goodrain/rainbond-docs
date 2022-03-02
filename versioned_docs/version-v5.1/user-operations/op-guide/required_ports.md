---
title: "组件端口"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 803
hidden: true
---

|Protocol|Port Range|Purpose|Used By|
|--------|------------|------------|------------|
|TCP|53,8089|rbd-dns|Self
|TCP|80,443,6443,10254|rbd-gateway|Self
|TCP|2379/23790,2380/23800,4001/40010|etcd server client API|kube-apiserver, etcd,etcd-proxy
|TCP|3228|rbd-chaos|Self
|TCP|3306|rbd-db|Self
|TCP|4999|rbd-ops-ui|Self
|TCP|5000|rbd-hub|Self
|TCP|6060,8443,8888|rbd-api|Self
|TCP|6100-6102,6666|node|Self
|TCP|6300-6301|rbd-mq|Self
|TCP|6362-6366|rbd-eventlog|Self
|TCP|6369|rbd-worker|Self
|TCP|6442,8181|Kubernetes API server|All
|TCP|7070|rbd-app-ui|Self
|TCP|7171|rbd-webcli|Self
|TCP|8081|rbd-repo|Self
|TCP|9999,3329|rbd-monitor|Self
|TCP|10250|Kubelet API|Self, Control plane
|TCP|10251|kube-scheduler|Self
|TCP|10252|kube-controller-manager|Self

