---
title: 组件运维
summary: Rainbond组件运维
toc: true
asciicast: true
---

目前Rainbond绝大多数组件都是由node维护，即由node生成服务的配置文件并启动。目前所有关于rainbond服务(除node外)的配置文件目录：`/opt/rainbond/conf`

## 服务配置文件简介

### 节点配置说明

|配置文件|节点类型|具体组件|说明|
|--------|------------|------------|------------|
|base.yaml|管理节点*|rbd-repo,rbd-hub|基础服务组件
|db.yaml|管理节点|rbd-db|数据库组件
|dns.yaml|管理节点*/计算节点*|rbd-dns|dns组件
|etcd.yaml|管理节点*|etcd|etcd组件
|etcd-proxy.yaml|计算节点*|etcd-proxy|etcd-proxy组件
|health.yaml|管理节点*/计算节点*||系统健康检查组件，如存储等
|k8s-master.yaml|管理节点*|kube-controller-manager,kube-scheduler,kube-apiserver|k8s master组件
|k8s-worker.yaml|计算节点*/复用的管理节点(仅第一个管理节点)|kubelet|k8s worker组件
|master.yaml|管理节点*||Rainbond管理节点组件
|network.yaml|管理节点*/计算节点*|calico/flannel|网络组件
|only_health.yaml|管理节点*/计算节点*||docker health检查组件
|ui.yaml|管理节点*|rbd-app-ui|控制台组件


### 调整生效配置文件

如果需要调整组件配置，只需修改组件对应的`/opt/rainbond/conf/`目录下的yaml文件即可。修改完成后只需执行`node service update`动态更新服务配置。