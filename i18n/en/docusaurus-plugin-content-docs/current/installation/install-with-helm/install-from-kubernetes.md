---
title: Install based on auto Kubernetes
descrition: This section document describes the existing k8s cluster, installing Rainbond with helm
keywords:
  - Install Rainbond Cluster based on self-suggestions Kubernetes
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## General description

This will guide you to rapidly deploy Rainbond, based on the existing Kubernetes cluster, using Helm command.

## Prerequisite

- Kubernetes cluster version between 1.19-1.27
- Kubtl command line tools, see [Kubtl Install](/docs/ops-guide/tools/#kubectl-cli)
- Helm command line tools, see [Helm Install](/docs/ops-guide/tools/#helm-cli)

## Install Rainbond

### 1. Install NFS client mount tool

When installed by default, Rainbond will start a `nfs-provisioner`. Therefore, NFS client mount tool needs to be installed on the node, otherwise installation will fail because storage cannot be mounted.If you customize your configuration, use external shared storage.So this step is negligible.

<Tabs>
  <TabItem value="Centos" label="Centos" default>

```bash
yum - y install nfs-utils
```

  </TabItem>
  <TabItem value="Ubuntu" label="Ubuntu">

```bash
apt-get install nfs-common 
```

  </TabItem>
</Tabs>

### Adding and updating the Helm repository

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
help repo update
kubectl create name rbd-system
```

### 3. Install Rainbond

Rainbond supports both `Docker` and `Containerd` containers running by default when the cluster environment is equipped with both `Docker` and `Containerd`. You can specify the actual container to run by environmental variables.

<Tabs>
  <TabItem value="Docker" label="Docker" default>

Use below command line for quick installation. Default parameters are used for all parameters.

```bash
help install rainbond rainbond/rainbond-cluster-n rbd-system
```

If your cluster has a public network IP that needs to be accessed externally, please specify the `Cluster.gatewayIngressIPs` parameter and replace gatewayInressIPs from the command with your public IP with： as shown below.

New sample[values.yaml](/docs/installation/install-with-helm/vaules-config) file：

```yaml
Cluster:  
  nodesForGateway: 
  - externalIP: 10.22.197. #Extranet IP
    internalIP: 10.22.197.170 #Intranet IP
    name: 10. 2.197.170
    
  - externalIP: 10.22.197. 71
    internalIP: 10.22.197.71
    name: 10.22.197.171
```

Use the command line below to specify `values.yaml` file

```bash
help install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

  </TabItem>

  <TabItem value="Containerd" label="Containerd">
Use the command line below to quickly install it. Default parameters are used for all parameters.

```bash
help install --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbod rainbond/rainbond-cluster -n rbd-system
```

If your cluster has a public network IP that needs to be accessed externally, please specify the `Cluster.gatewayIngressIPs` parameter and replace gatewayInressIPs from the command with your public IP with： as shown below.

New sample[values.yaml](/docs/installation/install-with-helm/vaules-config) file：

```yaml
Cluster: 
  nodesForGateway:
  - externalIP: 10.22.197. #Extranet IP
    internalIP: 10.22.197.170 #Intranet IP
    name: 10. 2.197.170
    
  - externalIP: 10.22.197. 71
    internalIP: 10.22.197.71
    name: 10.22.197.171
```

```bash
help install --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbod rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

  </TabItem>
</Tabs>

### Installation progress query

After executing the installation command, perform the following commands in the cluster to view the installation status.

```bash
watch kubtl get po -n rbd-system
```

Installation successful when the name `rbd-app-ui` contains the Pod `rbd-app-ui` for Running state.As shown below, the Pod `rbd-app-ui-669bb7c74b-7bmlf` states that Rainbond was installed successfully.

<details>
<summary>Installation Results</summary>

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

### 5. Visit the platform

Copy the commands below to be executed in the cluster, and get the platform access address.If there are multiple gateway nodes, any address can be accessed to the console.

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

### High available clusters (optional)

For [the deployment of Rainbond high available clusters] (/docs/installation/installation-with-ui/ha), only the service dependent (mirror repositories, databases, storage, etc.) is required to use external high-availability services and then be installed by the configuration parameters in the [Chart Installation](/docs/installation/installation-with-helm/vaules-config).

## Issues Ranking

If the installation process is not completed for a long period of time, please refer to the document [Helm Installation troubleshooting/installation/helm) for troubleshooting.Use questions to refer to [Rainbond use troubleshooting/use/) or join [微信群](/community/support#micromessages),[钉钉群](/community/support#peg).

## Next step

Use[快速入门](/docs/quick-start/getting-started/) to deploy your first application.
