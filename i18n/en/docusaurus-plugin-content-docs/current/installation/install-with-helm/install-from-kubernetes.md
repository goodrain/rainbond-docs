---
title: Based on self-built Kubernetes installation
descrition: This chapter describes how to install Rainbond using helm based on the existing k8s cluster
keywords:
- 基于自建 Kubernetes 安装 Rainbond 集群
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Summarize

This article will guide you through the Helm command to quickly deploy Rainbond based on your existing Kubernetes cluster.

## Precondition

* Kubernetes cluster versions range from 1.19 to 1.25
* For the kubectl command-line tool, see [Kubectl installation](/docs/ops-guide/tools/#kubectl-cli).
* helm command line tool, see [Helm installation](/docs/ops-guide/tools/#helm-cli)

## Install Rainbond

### 1. Install the NFS client mounting tool

During the default installation, Rainbond starts an `NFS-Provisioner`; therefore, an NFS client mounting tool needs to be installed on the node, otherwise the installation will fail due to an inability to mount storage. If you customize the configuration, use external shared storage. Then this step can be ignored.

<Tabs>
  <TabItem value="Centos" label="Centos" default>

  ```bash
  yum -y install nfs-utils
  ```

  </TabItem>
  <TabItem value="Ubuntu" label="Ubuntu">

  ```bash  
  apt-get install nfs-common 
  ```

  </TabItem>
</Tabs>

### 2. Add and update Helm repository

```bash  
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
kubectl create namespace rbd-system
```

### 3. Install Rainbond

Rainbond supports both `Docker` and `Containerd` container runtimes. When a cluster environment has both `Docker` and `Containerd` installed, `Docker` is used by default. You can specify the actual container runtimes through the environment variables.

<Tabs>
  <TabItem value="Docker" label="Docker" default>

```bash  
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

If you have a Cluster of public IP, you need to access from outside, please specify `Cluster. GatewayIngressIPs` parameters, as shown below, will command the gatewayIngressIPs replace your public IP can:

```bash  
helm install --set Cluster.gatewayIngressIPs=47.96.3.163 rainbond rainbond/rainbond-cluster -n rbd-system 
```

  </TabItem>
  <TabItem value="Containerd" label="Containerd">

```bash  
helm install --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbond rainbond/rainbond-cluster -n rbd-system
```

If you have a Cluster of public IP, you need to access from outside, please specify `Cluster. GatewayIngressIPs` parameters, as shown below, will command the gatewayIngressIPs replace your public IP can:

```bash  
helm install --set Cluster.gatewayIngressIPs=47.96.3.163 --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbond rainbond/rainbond-cluster -n rbd-system 
```

  </TabItem>
</Tabs>

### 4. Installation progress query

After the installation command is executed, run the following command in the cluster to check the installation status.

```bash
watch kubectl get po -n rbd-system
```

The installation is successful when the Pod with the name `rdb-app-ui` is in the Running state. If Pod `rdd-app-UI-669BB7C74B-7BMLf` is in the Running state, Rainbond is installed successfully.

<details>
<summary>Installation result</summary>

```bash
NAME                                         READY   STATUS      RESTARTS   AGE
nfs-provisioner-0                            1/1     Running     0          14d
rbd-etcd-0                                   1/1     Running     0          14d
rbd-hub-64777d89d8-l56d8                     1/1     Running     0          14d
rbd-gateway-76djb                            1/1     Running     0          14d
dashboard-metrics-scraper-7db45b8bb4-tcgxd   1/1     Running     0          14d
rbd-mq-6b847d874b-j5jg2                      1/1     Running     0          14d
rbd-webcli-76b54fd7f6-jrcdj                  1/1     Running     0          14d
kubernetes-dashboard-fbd4fb949-2qsn9         1/1     Running     0          14d
rbd-resource-proxy-547874f4d7-dh8bv          1/1     Running     0          14d
rbd-monitor-0                                1/1     Running     0          14d
rbd-db-0                                     2/2     Running     0          14d
rbd-eventlog-0                               1/1     Running     0          14d
rbd-app-ui-669bb7c74b-7bmlf                  1/1     Running     0          7d12h
rbd-app-ui-migrations--1-hp2qg               0/1     Completed   0          14d
rbd-worker-679fd44bc7-n6lvg                  1/1     Running     0          9d
rbd-node-jhfzc                               1/1     Running     0          9d
rainbond-operator-7978d4d695-ws8bz           1/1     Running     0          9d
rbd-chaos-nkxw7                              1/1     Running     0          8d
rbd-api-5d8bb8d57d-djx2s                     1/1     Running     0          47h
```

</details>

### 5. Access platform

Run the following command in the cluster to obtain the platform access address. If there are multiple gateway nodes, the console can be accessed from any one address.

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

### 6. Customize Advanced Settings (Optional)
 
When you have some additional requirements, such as using self-built mirror repositories, databases, ETCD, StorageClass, specifying gateway nodes, specifying build nodes, etc. You can generate the installation command using [Helm Installation Command Generator tool](/helm). 
Parameters in detail can refer to [values. Yaml explanation](/docs/installation/install-with-helm/vaules-config)

## Problem troubleshooting
The installation process if not finished for long time, so please refer to the document [Helm installation problem troubleshooting guide](/docs/troubleshooting/installation/helm), for troubleshooting. Use can reference [Rainbond use screen](/docs/troubleshooting/use/) or join [WeChat group](/community/support#微信群), [nailing group](/community/support#钉钉群) Ask for help.


## Next step

See [quick start](/docs/quick-start/getting-started/) to deploy your first app.
