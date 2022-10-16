---
title: 'Installation based on Alibaba Cloud ACK cluster'
description: 'Based on Alibaba Cloud ACK cluster, use helm to install Rainbond from scratch'
---

## Installation prerequisites

Before starting, please make sure that you have purchased the following Alibaba Cloud resources, all resources are required to be in the same：

### Alibaba Cloud ACK Managed Cluster

- ACK Kubernetes version no lower than 1.16
- At least 2 nodes in the cluster, and configure `kubectl` command
- Nodes have public network access capabilities
- Configuration requirements 8-core CPU 32G memory
- Disk space： root partition 200G data partition (docker partition) 300G

### SLB load balancing

- Have a **public IP address**
- Include the nodes in the ACK cluster into the backend server group
- Configure the following port mappings：80 443 6060 7070 8443

### NAS storage service

- Provide a mount point in a format similar to `123456789-var48.cn-shanghai.nas.aliyuncs.com:/`
- Disable access control (black and white list), or enable access for all ACK nodes

### RDS database service

- Pre-generated two database instances： `console` `region`
- Generate a database account password and grant full permissions to the above database
- Disable access control (black and white list), or enable access for all ACK nodes
- Database version selection 8.0
- Database disk space not less than 5G

### Container Image Service

- Create a namespace, username, password

### helm version

- helm3 and above

## Docking with ACK cluster

### Install the Kubectl command line tool

Install [Kubectl](/docs/ops-guide/tools/#kubectl) Command Line Tools


### Get kubeconfig info

- On the homepage of Alibaba Cloud ACK cluster, click to enter the cluster, click the connection information, and copy the following config file

![](https://pic.imgdb.cn/item/6217362f2ab3f51d91f511aa.png)

As shown in the figure above, copy the kubeconfig file and write it to the `~/.kube/config` file.

```bash
mkdir ~/.kube/
vi ~/.kube/config
```

### install helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### Create the values.yaml file

- In a custom form, choose the configuration of the rainbond cluster and whether to connect to the existing Alibaba Cloud RDS, NAS, mirror warehouse, etc.

```yaml
$ vi values.yaml

##Rainbondcluster
Cluster:
## Define whether to enable high availability, true is on, false is off, the default replica set under high availability is 2
  enableHA: false

## Define whether to use external mirror images Warehouse, true is on, false is off, the user needs to provide the domain name, space name, user name and password of the existing mirror warehouse
  imageHub:
    enable: false
    domain: fdfef-hangzhou.aliyuncs.com
    namespace: sefe
    password: grddgar
    username: zfefee

## External ETCD, corresponding to fill in IP, certificate, true is on, false is off, if you have Alibaba Cloud ETCD, you can directly fill in the IP
  etcd:
    enable: false
    endpoints: 
    - 192.168 .0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## External storage, true is on, false is off, if you need to connect to Alibaba Cloud NAS storage, If you need to modify the mount parameters, you can modify the parameters below mountOptions according to the format, and directly modify the server address for the mount point.
  RWX:
    enable: false
    config:
      csiPlugin:
        aliyunNas:
          accessKeyID: ""
          accessKeySecret: ""
      storageClassParameters:
## mountOptions:
## - "nolock,tcp,noresvport"
## - "vers=4"
        parameters:
          volumeAs: subpath
          archiveOnDelete: "true"
          server: NAS_SERVER_ADDR

## External storage, Fill in storageClassName directly, true is on, false is off
  RWO:
    enable: false
    storageClassName: glusterfs-simple

## region database, true If it is on, false is off. Alibaba Cloud users must provide an external high-availability RDS Mysql 8.0 database. The region database needs to be created in advance in this database, and the RDS domain name, user name, and password that can be accessed by the intranet must be provided.
  regionDatabase:
    enable: false
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com 
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## ui database, true is on, false is off, Aliyun user Be sure to provide an external high-availability RDS Mysql 8.0 database, in which the console database needs to be created in advance, and the RDS domain name, user name, and password accessible to the intranet need to be provided.
  uiDatabase:
    enable: false
    host: 4444f-8vbidfd.mysql. zhangbei.rds.aliyuncs.com
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## External gateway, fill in SLB public IP
  gatewayIngressIPs: 121.89.194.127

## chaos corresponding configuration, high availability environment , select at least 2 nodes as cluster construction service running nodes, name is the node name of the back-end server node
  nodesForChaos:
  - name: cn-zhangjiakou.10.22.197.170
  - name: cn-zhangjiakou.10.22.197.171

# # Configure corresponding gateway nodes. In a high availability environment, at least two nodes are selected as cluster gateway nodes. It is recommended to use all nodes as gateway nodes. It is required that ports 80, 443, 6060, 7070, and 8443 of the nodes are not occupied.name Fill in the name of the node node.
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: cn-zhangjiakou.10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: cn-zhangjiakou.10.22.197.171
```

### Install Rainbond with Helm

- Create the rbd-system namespace

```bash
kubectl create namespace rbd-system
```

- Add chart repository

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- install rainbond

```bash
helm install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

### Verify installation

- View pod status

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- Wait for the `rbd-app-ui` pod to be in the Running state and the installation is successful.
- After successful installation, the rainbond console can be accessed `$gatewayIngressIPs:`.

### Installation Troubleshooting

- If the installation process is not completed for a long time, please refer to the document[helm Installation Troubleshooting Guide](/docs/installation/install-troubleshoot/helm-install-troubleshoot)for troubleshooting.

## Next step

Refer to[Quick Start](/docs/quick-start/getting-started/)to deploy your first application.
