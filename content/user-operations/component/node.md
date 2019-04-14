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