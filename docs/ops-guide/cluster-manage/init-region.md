---
title: Rainbond 初始化集群配置
description: 该章节文档介绍 Rainbond 集群初始化配置参数 RainbondCluster 配置说明
---

默认情况下集群的初始化参数根据不同的 Kubernetes 集群提供方由驱动程序自动配置，但在一些高级场景中，比如用户有自定义 HA 数据库、自定义 ETCD 配置和自定义镜像仓库等需求时，自定义初始化 Rainbond 集群参数将对您有用。

> Rainbond 追求以最佳实践的参数自动化配置，减小用户门槛。在您未完全掌握初始化参数配置之前，请谨慎配置。

![image-20210220134706244](https://static.goodrain.com/images/5.3/init-region-config.png)

如上图所示，当进入集群初始化确认页面时，可以点击红框处进行集群初始化参数配置。

配置示例如下：

```yaml
metadata:
  creationTimestamp: null
  name: rainbondcluster
spec:
  enableHA: true
  etcdConfig:
    endpoints:
    - 192.168.3.103:2379
    - 192.168.3.102:2379
    - 192.168.3.101:2379
    secretName: rbd-etcd-secret
  gatewayIngressIPs:
  - 192.168.3.104
  nodesForGateway:
  - internalIP: 192.168.3.101
    name: 192.168.3.101
  - internalIP: 192.168.3.102
    name: 192.168.3.102
  - internalIP: 192.168.3.103
    name: 192.168.3.103
  imageHub:
    domain: image.xxxxx.com
    namespace: test
    password: xxxxx!
    username: root
  rainbondVolumeSpecRWO:
    csiPlugin: {}
    imageRepository: ""
    storageClassParameters: {}
  rainbondVolumeSpecRWX:
    storageClassName: glusterfs-simple
    csiPlugin: 
    	aliyunNas: {}
    storageClassParameters: 
    	parameters: 
    	  volumeAs: subpath
    	  server: xxx.nas.server.dddd.com
    	  archiveOnDelete: true
  regionDatabase:
    host: 172.20.251.91
    name: rbdregion
    password: password
    port: 3306
    username: root
  suffixHTTPHost: 5-3-0.goodrain.org
```

> 参数仅需要设置需要自定义的部分即可，无需全量设置。

配置参数说明如下：

| 参数                      | 二级参数                       | 说明                                                         |
| ------------------------- | ------------------------------ | ------------------------------------------------------------ |
| etcdConfig (struct)       | endpoints（array）             | ETCD 的实例列表                                              |
|                           | secretName (string)            | ETCD 的 SSL 证书 secret name，secret如何生成参考下方"生成ETCD证书的secret" |
| enableHA (bool)           |                                | 是否高可用部署，true/false，默认false                        |
| suffixHTTPHost（string）  |                                | 集群 HTTP 默认域名后缀，留空则自动分配                       |
| gatewayIngressIPs (array) |                                | 网关外网 IP 地址，一般是指 SLB 或 VIP                        |
| nodesForGateway (array)   | name(string)                   | 节点名称(以 kubernetes 节点信息为准)                         |
|                           | internalIP(string)             | 节点内网 IP(以 kubernetes 节点信息为准)                      |
|                           | externalIP(string)             | 节点外围 IP(以 kubernetes 节点信息为准)                      |
| nodesForChaos (array)     | 与 nodesForGateway 一致        |                                                              |
| imageHub(struct)          | domain (string)                | 镜像仓库域名，需要可正常访问                                 |
|                           | namespace(string)              | 镜像仓库命名空间                                             |
|                           | username(string)               | 用户名                                                       |
|                           | password(string)               | 密码                                                         |
| regionDatabase(struct)    | host(string)                   | 集群数据库 IP 地址                                           |
|                           | port(int)                      | 集群数据库端口                                               |
|                           | username(string)               | 集群账号                                                     |
|                           | password(string)               | 集群密码                                                     |
|                           | name(string)                   | 集群数据库名称                                               |
| rainbondVolumeSpecRWX     |                                | 共享存储配置，留空则使用默认存储。如[对接外部存储](../cluster-manage/init-region-storage/)请参考文档             |
|                           | storageClassName(string)       | 集群中存在的storageclass名称，非必填                         |
|                           | storageClassParameters(struct) |                                                              |
|                           | csiPlugin(struct)              |                                                              |
|                           | storageRequest(int)            |                                                              |
| rainbondVolumeSpecRWO     | 与rainbondVolumeSpecRWX一致。  | 单读单写存储，一般是指块存储设备。如果提供则有状态服务默认将使用。 |



## 生成Etcd证书的secret

RKE：

- CA证书：/etc/kubernetes/ssl/kube-ca.pem
- 客户端证书：/etc/etcd/ssl/kube-node.pem
- 客户端密钥：/etc/etcd/ssl/kube-node-key.pem

```shell
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```



kubeasz：

- CA证书：/etc/kubernetes/ssl/ca.pem
- 客户端证书：/etc/etcd/ssl/etcd.pem
- 客户端密钥：/etc/etcd/ssl/etcd-key.pem

```shell
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/etcd.pem \
--from-file=key-file=/etc/kubernetes/ssl/etcd-key.pem
```