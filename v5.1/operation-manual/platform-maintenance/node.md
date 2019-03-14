---
title: 节点服务及维护方式
summary: 节点服务，节点维护方式
toc: true
---

## 一、查看组件状态

```
# 查看通过容器方式，不支持docker,kubelet,node
dps

# 查看某个节点
grctl node get <节点Uid>

# 查看集群状态
grctl cluster
```

## 二、查看组件日志

默认组件都支持`systecmtl/journalctl`
除kubelet,docker,node外,还可以使用`docker logs -f <容器名：rbd-mq>`

## 三、默认配置文件

管理节点：`/opt/rainbond/conf/master.yaml`
计算节点：`/opt/rainbond/conf/worker.yaml`

修改配置文件后需要重启node，在重启修改配置的服务

## 四、Calico网络维护

```bash
systemctl start | stop | status | restart calico
#获取集群信息及健康状态
calicoctl get node
calicoctl node status
```

## 五、etcd 维护

```bash
systemctl start | stop | status | restart etcd
- 获取集群信息
etcdctl member list
- 健康检查
etcdctl cluster-health
```

## 六、Kubernetes 维护

```bash
- 集群状态
kubectl get cs
```