---
title: Rainbond增加 删除节点
description: Rainbond增加 删除节点
weight: 3
---
### 增加Kubernetes节点

```shell
#配置节点免密钥登录
ssh-copy-id $IP
#执行以下操作添加node节点
docker exec -it kubeasz easzctl add-node $NEW_NODE_IP
```

### 删除Kubernetes节点

首先，驱逐节点上的POD，在其他节点创建

```shell
kubectl drain [node-name] --force --ignore-daemonsets --delete-local-data 
```

其次，删除节点

```shell
kubectl delete [node-name]
```

### 添加网关节点

* 添加节点后，修改 rbd-gateway 配置文件调度亲和性段落的描述

```bash
kubectl edit rbdcomponents.rainbond.io -n rbd-system rbd-gateway
```

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - 172.24.206.41 # 这个列表声明 rbd-gateway 会调度到哪些节点上
            - 172.24.206.40 
```

上述调度亲和性的描述中，`values` 指定的是 node 的名字，通过 `kubectl get node` 命令获取

```bash
[root@iZhp38me3xgju205i5udfnZ ~]# kubectl get node
NAME            STATUS   ROLES    AGE   VERSION
172.24.206.41   Ready    master   38d   v1.16.2
```
* 修改流量入口的地址，修改数据库 `console.region_info` 表内容：

```shell
update console.region_info set wsurl='ws://<新网关IP>:6060',tcpdomain='<新网关IP>';
```

### 删除网关节点

* 清理网关节点属性。
  * 根据上述步骤 修改 `values`字段中所需删除的节点。

* 完全删除网关节点。

```shell
#驱逐POD
kubectl drain [node-name] --force --ignore-daemonsets --delete-local-data 
#删除节点
kubectl delete [node-name]
```

###  添加构建节点

* 添加节点后，修改 rbd-chaos 配置文件调度亲和性段落的描述

```bash
kubectl edit rbdcomponents.rainbond.io -n rbd-system rbd-chaos
```

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - 172.24.206.41 # 这个列表声明 rbd-chaos 会调度到哪些节点上
            - 172.24.206.40 
```

上述调度亲和性的描述中，`values` 指定的是 node 的名字，通过 `kubectl get node` 命令获取

```bash
[root@iZhp38me3xgju205i5udfnZ ~]# kubectl get node
NAME            STATUS   ROLES    AGE   VERSION
172.24.206.41   Ready    master   38d   v1.16.2
```

###  删除构建节点

* 清理构建节点属性。
  * 根据上述步骤 修改 `values`字段中所需删除的节点。

* 完全删除构建节点。

```shell
#驱逐POD
kubectl drain [node-name] --force --ignore-daemonsets --delete-local-data 
#删除节点
kubectl delete [node-name]
```

