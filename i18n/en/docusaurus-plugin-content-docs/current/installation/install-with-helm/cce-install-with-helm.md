---
title: 'Installation based on HUAWEI CLOUD CCE cluster'
description: 'Based on HUAWEI CLOUD CCE cluster, use helm to install Rainbond from scratch'
---

## Installation prerequisites

Before starting, please make sure that you have purchased the following HUAWEI CLOUD resources, all resources are required to be in the same region：

### HUAWEI CLOUD CCE Managed Cluster

- CCE Kubernetes version no less than 1.19
- At least 2 nodes in the cluster, and configure `kubectl` command
- Nodes have public network access capabilities
- Configuration requirements 8-core CPU 32G memory
- Disk space： root partition 200G data partition (docker partition) 300G
- Reasonable configuration of security group rules

### ELB load balancing

- Have a **public IP address**
- Incorporate the nodes in the CCE cluster into the backend server group
- Configure the following port mappings：80 443 6060 7070 8443

### SFS storage service

- Provide a mount point in a format like `121.89.94.122：/`
- Select the same VPC as the cloud server

### RDS database service

- Pre-generated two database instances： `console` `region`
- Generate a database account password and grant full permissions to the above database
- Security group rules can access the corresponding port

### Container Image Service

- Create a namespace, username, password

### helm version

- helm3 and above

## Connecting to a CCE cluster

### Install the Kubectl command line tool

- download kubectl

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

- configure config file

Log in to the Cloud Container Engine console, go to Resource Management > Cluster Management, and click the cluster name to enter the cluster details page.Click the kubectl tab > to download the kubectl configuration file.

Copy the contents of the kubectl configuration file to the config file and execute the following command on the terminal command line

```bash
mkdir ~/.kube/
vi ~/.kube/config
```

### install helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### Create the values.yaml file

- In a custom form, select the configuration of the rainbond cluster and whether to connect to the existing HUAWEI CLOUD SFS, RDS, and mirror warehouse.

```yaml
$ vi values.yaml

##Rainbondcluster
Cluster:
## Define whether to enable high availability, true is on, false is off, the default replica set under high availability is 2
  enableHA: false

## Define whether to use external mirror images Warehouse, true is on, false is off, the user needs to provide the domain name, space name, username and password of the existing mirror warehouse
  imageHub:
    enable: false
    domain: fdfef-bejing.huaweiyun.com
    namespace: sefe
    password: grddgar
    username: zfefee

## External ETCD, corresponding to fill in IP, certificate, true is on, false is off, if HUAWEI CLOUD ETCD directly fill in IP
  etcd:
    enable: false
    endpoints: 
    - 192.168 .0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## External storage, true is on, false is off, if you need to connect to HUAWEI CLOUD SFS storage, A storageClass needs to be generated for docking.
  RWX:
    enable: false
    config:
      storageClassName: nfs-client

## External storage, fill in storageClassName directly, true is on, false is off
  RWO:
    enable: false
    storageClassName: nfs-client

## region database , true is on, false is off, HUAWEI CLOUD users must provide an external high-availability RDS Mysql database, the region database needs to be created in advance in this database, and the RDS domain name, user name, and password accessible on the intranet need to be provided.
  regionDatabase:
    enable : false
    host: 121.89.194.124
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## ui database, true is on, false is off, hHUAWEI CLOUD users must provide an external high-availability RDS Mysql Database, the console database needs to be created in advance in this database, and the RDS host, user name, and password accessible to the intranet need to be provided.
  uiDatabase:
    enable: false
    host: 121.89.194.124
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## External gateway, fill in ELB public network IP
  gatewayIngressIPs: 121.89.194.127

## chaos corresponding configuration, in high availability environment, select at least 2 nodes as cluster construction service running nodes, name is backend server The node name of the node
  nodesForChaos:
  - name: 10.22.197.170
  - name: 10.22.197.171

## The corresponding configuration of the gateway node, in a high availability environment, at least 2 nodes are selected as cluster gateway nodes, it is recommended to use all nodes as gateways For node use, it is required that ports 80, 443, 6060, 7070, 8443 and 8443 of the node are not occupied.name Fill in the name of the node node.
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: 10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: 10.22.197.
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
