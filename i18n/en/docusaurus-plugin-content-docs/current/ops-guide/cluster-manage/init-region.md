---
title: Rainbond initializes cluster configuration
description: This chapter document describes the Rainbond cluster initialization configuration parameters RainbondCluster configuration instructions
---

By default, the initialization parameters of the cluster are automatically configured by the driver according to different Kubernetes cluster providers, but in some advanced scenarios, such as when the user has a custom HA database, a custom ETCD configuration, and a custom image repository, custom Initializing the Rainbond cluster parameters will work for you.

> Rainbond pursues automatic configuration with best-practice parameters to reduce user thresholds.Before you fully grasp the initialization parameter configuration, please configure it carefully.

![image-20210220134706244](https://static.goodrain.com/images/5.3/init-region-config.png)

As shown in the figure above, when entering the cluster initialization confirmation page, you can click the red box to configure the cluster initialization parameters.

The configuration example is as follows：

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
    secretName: rbd-etcd -secret
  gatewayIngressIPs:
  - 192.168.3.104
  nodesForGateway:
  - internalIP: 192.168.3.101
    name: 192.168.3.101
  - internalIP: 192.168.3.102
    name: 192.168.3.102
  - internalIP: 192.168.3.103
    name: 192.168 .3.103
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

> The parameters only need to be set to the parts that need to be customized, and no full settings are required.

The configuration parameters are described as follows：

| parameter                 | Secondary parameters                   | illustrate                                                                                                                                                                       |
| ------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| etcdConfig (struct)       | endpoints (array)                      | Instance list of ETCD                                                                                                                                                            |
|                           | secretName (string)                    | ETCD's SSL certificate secret name, how to generate secret, please refer to "Generate ETCD certificate secret" below                                                             |
| enableHA (bool)           |                                        | Whether high availability deployment, true/false, default false                                                                                                                  |
| suffixHTTPHost(string)    |                                        | Cluster HTTP default domain name suffix, if left blank, it will be automatically assigned                                                                                        |
| gatewayIngressIPs (array) |                                        | Gateway external network IP address, generally refers to SLB or VIP                                                                                                              |
| nodesForGateway (array)   | name(string)                           | Node name (subject to kubernetes node information)                                                                                                                               |
|                           | internalIP(string)                     | Intranet IP of the node (subject to the kubernetes node information)                                                                                                             |
|                           | externalIP(string)                     | Node peripheral IP (subject to kubernetes node information)                                                                                                                      |
| nodesForChaos (array)     | Consistent with nodesForGateway        |                                                                                                                                                                                  |
| imageHub(struct)          | domain (string)                        | The domain name of the mirror warehouse, which needs to be accessed normally                                                                                                     |
|                           | namespace(string)                      | mirror repository namespace                                                                                                                                                      |
|                           | username(string)                       | username                                                                                                                                                                         |
|                           | password(string)                       | password                                                                                                                                                                         |
| regionDatabase(struct)    | host(string)                           | Cluster database IP address                                                                                                                                                      |
|                           | port(int)                              | Cluster database port                                                                                                                                                            |
|                           | username(string)                       | Cluster account                                                                                                                                                                  |
|                           | password(string)                       | Cluster password                                                                                                                                                                 |
|                           | name(string)                           | Cluster database name                                                                                                                                                            |
| rainbondVolumeSpecRWX     |                                        | Shared storage configuration, leave blank to use default storage.If[is connected to external storage](../cluster-manage/init-region-storage/), please refer to the documentation |
|                           | storageClassName(string)               | The name of the storageclass that exists in the cluster, not required                                                                                                            |
|                           | storageClassParameters(struct)         |                                                                                                                                                                                  |
|                           | csiPlugin(struct)                      |                                                                                                                                                                                  |
|                           | storageRequest(int)                    |                                                                                                                                                                                  |
| rainbondVolumeSpecRWO     | Consistent with rainbondVolumeSpecRWX. | Single-read single-write storage generally refers to block storage devices.Stateful services will be used by default if provided.                                                |



## Generate the secret of the Etcd certificate

RKE：

- CA certificate：/etc/kubernetes/ssl/kube-ca.pem
- Client certificate：/etc/etcd/ssl/kube-node.pem
- client key：/etc/etcd/ssl/kube-node-key.pem

```shell
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file= /etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```



kubeasz：

- CA certificate：/etc/kubernetes/ssl/ca.pem
- client certificate：/etc/etcd/ssl/etcd.pem
- client key：/etc/etcd/ssl/etcd-key.pem

```shell
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/ca.pem \
--from-file=cert-file=/etc /kubernetes/ssl/etcd.pem \
--from-file=key-file=/etc/kubernetes/ssl/etcd-key.pem
```