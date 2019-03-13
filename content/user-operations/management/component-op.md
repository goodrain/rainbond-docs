---
title: 节点组件运维
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1304
description: 节点组件运维
hidden: true
---

目前Rainbond绝大多数组件都是由node维护，即由node生成服务的配置文件并启动。目前所有关于rainbond服务(除node外)的配置文件目录：`/opt/rainbond/conf`

#### 服务配置说明

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
|only_health.yaml|管理节点*/计算节点*||docker/nfs server health检查组件
|ui.yaml|管理节点*|rbd-app-ui|控制台组件

#### 调整服务配置

需要调整组件配置，只需修改组件对应的`/opt/rainbond/conf/`目录下的yaml文件即可。修改完成后只需执行`node service update`动态更新服务配置。

```bash
# 停某服务
node service stop <服务名>
# 更新并启动某服务
node service update <服务名>
# 更新并启动所有服务配置
node service update
```

#### 服务日志查看

默认所有服务组件都可以使用`journalctl`或`systemctl`命令来查看服务日志或者服务状态。  
另外除`node`和`kubelet`服务外，其他服务还可以使用`docker logs`命令来查看服务日志。

{{% notice note %}}
rbd-app-ui的日志默认是写到文件，可以在`/opt/rainbond/logs`目录下看到相关日志信息。
{{% /notice %}}