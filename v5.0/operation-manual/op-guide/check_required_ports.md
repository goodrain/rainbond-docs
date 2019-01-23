---
title: 检查所需端口
summary: 平台检查所需端口
toc: true
asciicast: true
---

## 管理节点(manage/master)

|Protocol|Port Range|Purpose|Used By|
|--------|------------|------------|------------|
|TCP|6443,6442,8181|Kubernetes API server|All
|TCP|2379,2380,4001|etcd server client API|kube-apiserver, etcd
|TCP|10250|Kubelet API|Self, Control plane
|TCP|10251|kube-scheduler|Self
|TCP|10252|kube-controller-manager|Self
|TCP|53|rbd-dns|Self
|TCP|80,443,10254|rbd-gateway|Self
|TCP|4999|rbd-ops-ui|Self
|TCP|5000|rbd-hub|Self
|TCP|6060,8443,8888|rbd-api|Self
|TCP|6100|node|Self
|TCP|6300|rbd-eventlog|Self
|TCP|7070|rbd-app-ui|Self
|TCP|7171|rbd-webcli|Self
|TCP|8081|rbd-repo|Self
|TCP|9999|rbd-monitor|Self

## 计算节点(compute/worker)

|Protocol|Port Range|Purpose|Used By|
|--------|------------|------------|------------|
|TCP|53|rbd-dns|Self
|TCP|2379|etcd-proxy|Self
|TCP|10250|Kubelet API|Self, Control plane
