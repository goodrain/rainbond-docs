---
title: rbd-node组件说明
description: "Rainbond Node组件参数说明"
hidden: true
---

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理，运行在每一个节点上


### 常用参数说明

仅列出启动常用参数，其他未列出参数默认即可

```
    - --log-level   日志级别，默认info
    - --etcd        etcd地址,默认 [http://127.0.0.1:2379]
    - --hostIP      当前节点ip,未指定时获取eth0 ip
    - --run-mode    node属性,默认是manage
    - --noderule    节点属性，默认是compute 
    - --nodeid      此节点的唯一ID，只需指定，不要修改
    - --image-repo-host  镜像仓库主机
    - --hostsfile   /etc/hosts映射容器中的路径
```
