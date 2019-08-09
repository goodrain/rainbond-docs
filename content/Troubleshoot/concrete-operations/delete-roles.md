---
title: 如何删除节点属性
weight: 30013
Description: "去除节点的gateway或compute属性"
hidden: true
---

### 如何删除gateway属性

> 移除网关节点组件配置文件

```bash
rm -rf /opt/rainbond/conf/lb.yaml 
```

> 关闭服务

```bash
systemctl stop rbd-gateway
rm -rf /etc/systemd/system/rbd-gateway.service
```

> 移除node角色

编辑 `/opt/rainbond/scripts/start-node.sh`
```bash

#!/bin/bash

NODE_OPTS="--log-level=info --auto-scheduler=true --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig --etcd=http://172.16.0.1:2379   --hostIP=172.16.0.1 --run-mode worker --noderule manage,gateway"

exec /usr/local/bin/node $NODE_OPTS
```

将 `--noderule manage,gateway` 中的 gateway 去除： `--noderule manage`

重启node服务

```bash
systemctl restart node
```

### 如何删除compute属性

> 移除计算节点组件配置文件

```bash
rm -rf /opt/rainbond/conf/k8s-worker.yaml 
```

> 关闭服务

```bash
systemctl stop kubelet
rm -rf /etc/systemd/system/kubelet.service
```

> 移除node角色

编辑 `/opt/rainbond/scripts/start-node.sh`
```bash

#!/bin/bash

NODE_OPTS="--log-level=info --auto-scheduler=true --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig --etcd=http://172.16.0.2:2379   --hostIP=172.16.0.2 --run-mode worker --noderule manage,compute"

exec /usr/local/bin/node $NODE_OPTS
```

将 `--noderule manage,compute` 中的 compute 去除： `--noderule manage`

重启node服务

```bash
systemctl restart node
```