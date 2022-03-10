---
title: node组件说明
description: "Rainbond Node组件参数说明"
hidden: true
---

> node: 集群监控与控制服务,通过二进制运行

### 守护运行方式

> 通过systemd守护运行,可以通过`systemctl cat node`获取node的systemd配置文件

```
# /opt/rainbond/scripts/start-node.sh

NODE_OPTS="--log-level=info  --auto-scheduler=true  --hostIP=172.20.0.101  --run-mode master --noderule manage,compute  --etcd=http://127.0.0.1:2379  --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig "

exec /usr/local/bin/node $NODE_OPTS
```

### 常用参数说明

仅列出启动常用参数，其他未列出参数默认即可

```
--auto-registnode (当集群中未注册此节点时自动注册节点,默认启用)
--auto-scheduler  (当节点不健康时自动将节点设置为不可调度,仅计算节点时生效,默认启用)
--etcd (etcd地址,默认 [http://127.0.0.1:2379])
--hostIP (当前节点ip,未指定时获取eth0 ip)
--kube-conf (k8s admin用户配置文件 "/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig")
--log-level (日志级别，默认info)
--nodeid-file (节点标识文件路径，默认"/opt/rainbond/etc/node/node_host_uuid.conf",内容格式为`host_uuid=959eba4b-6bbe-4ad5-ba0f-ecfad17d378d`,不存在则会默认生成)
--noderule (节点删除属性，默认是compute)
--run-mode (node属性,默认是worker)
```

### 其他扩展命令

```
# 更新服务配置并启动，不指定组件名则默认为全部
node service update <组件名>
# 启动停止服务
node service start/stop <组件名>
```

### 配置 node 垃圾回收

node 的计算节点包含了 kubernetes 的计算节点, k8s 计算节点的 kubelet 有垃圾回收的功能, 包括 `镜像回收` 和 `容器回收`. 但是 k8s 的 kubelet 不运行在 Rainbond 的管理节点,
所以 Rainbond 的管理节点缺乏垃圾回收的能力. 一旦平台运行的时间长了, 镜像就会过多, 导致管理节点压力过大. 为了缓解管理节点磁盘的压力, Rainbond 在 5.1.9 赋予了管理节点与 kubelet
相同的镜像清理能力, 每 5 分钟会清理一遍不再使用的镜像.



Rainbond 的管理节点负责镜像的拉取, 将源码和 Dockerfile 构建成相应的镜像, 并不会运行这些镜像; 所以, 管理节点只需镜像回收, 并不需要容器回收.



镜像回收由磁盘的 `HighThresholdPercent` 和 `LowThresholdPercent` 两个因素影响, 当磁盘的使用率高于 `HighThresholdPercent` 将会触发镜像回收,
镜像回收会删除最近最少使用的镜像, 直到到达 `LowThresholdPercent` 为止.

#### 垃圾回收配置

用户可以使用以下 node 参数调整镜像垃圾回收：

1. `image-gc-high-threshold`, 触发镜像垃圾回收的磁盘使用率. 默认值为 85％.
2. `image-gc-low-threshold`, 镜像垃圾回收尝试释放的磁盘使用率. 默认值为 75%.
3. `minimum-image-ttl-duration`, 镜像的最小存活时间. 默认值为 2 小时.
4. `image-gc-period`, 执行镜像回收的时间间隔. 默认值为 5 分钟.
5. `enable-image-gc`, 镜像回收开关. 默认为 true, 即开启.
