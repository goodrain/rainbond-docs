---
title: Installation based on Kubernetes
descrition: This document introduces the installation of Rainbond using helm based on an existing k8s cluster
keywords:
  - Install Rainbond cluster based on Kubernetes
  - Install Rainbond on K3s cluster
  - Install Rainbond on ACK cluster
  - Install Rainbond on CCE cluster
  - Install Rainbond on TKE cluster
  - Install Rainbond on RKE2 cluster
---

## Overview

This article will guide you to quickly install a set of available Rainbond environment in an existing Kubernetes cluster, supporting self-built clusters, managed clusters, etc.

## Prerequisites

- Install [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- Install [Helm CLI](https://helm.sh/docs/intro/install/)
- Kubernetes 1.24+ cluster with Containerd container runtime
- Ports `80 443 6060 7070 8443` available

<details>
<summary>K3S Installation Instructions</summary>

Configure the use of the default private image repository by creating a [registries.yaml](https://docs.k3s.io/installation/private-registry) file.

```yaml title="vim /etc/rancher/k3s/registries.yaml"
configs:
  "goodrain.me":
    auth:
      username: admin
      password: admin1234
    tls:
      insecure_skip_verify: true
```

When installing [K3S](https://docs.k3s.io/installation), you need to disable the installation of `traefik` and `local-storage`, as follows:

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn \
INSTALL_K3S_EXEC="--disable traefik local-storage" \
sh -s - \
--system-default-registry "registry.cn-hangzhou.aliyuncs.com"
```

</details>

<details>
<summary>Cloud Managed K8s Installation Instructions</summary>

To install Rainbond using Alibaba Cloud's ACK cluster, you need to purchase: `ACK`, `SLB (optional)`, `RDS MySQL (optional)`, `ACR (optional)` resources, and then proceed with the installation steps below.The same applies to managed Kubernetes clusters from other cloud providers, purchase the same resources, the optional parts are provided with built-in services by default.

:::caution
When purchasing a managed cluster, please disable the default Ingress service, which will conflict with the Rainbond gateway and cause access failure.
:::

</details>

## Install Rainbond

:::tip
Before installation, you can check your Kubernetes cluster with this script `curl -sfL https://get.rainbond.com/k8s-health-check.sh | bash`.
:::

1. Add Helm repository.

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
```

2. Edit the [values.yaml](./vaules-config.md) file and fill in the necessary configurations.

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: 172.20.251.93 #Cluster entry IP

  nodesForGateway:
  - externalIP: 172.20.251.93  #k8s node external IP
    internalIP: 172.20.251.93  #k8s node internal IP
    name: k8s-node1            #k8s node name
# - More nodes for gateway
  nodesForChaos:
  - name: k8s-node1            #k8s node name
# - More nodes for chaos
  containerdRuntimePath: /var/run/containerd  #containerd.sock file path
  # if you use RKE2 or K3S, you can use the following parameter
  # containerdRuntimePath: /var/run/k3s/containerd
```

3. Execute the installation command.

```bash
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system -f values.yaml
```

4. After executing the installation command, execute the following command in the cluster to check the installation status.

```bash
watch kubectl get pod -n rbd-system
```

5. When the Pod with the name containing `rbd-app-ui` is in the Running state, the installation is successful.As shown below, when the Pod `rbd-app-ui-5577b8ff88-fpnnv` is in the Running state, it means that Rainbond has been successfully installed.

<details>
<summary>Example of successful installation result</summary>

```bash
NAME                                      READY   STATUS    RESTARTS   AGE
local-path-provisioner-78d88b6df5-wkr84   1/1     Running   0          5m37s
minio-0                                   1/1     Running   0          5m37s
rainbond-operator-59ff8bb988-nlqrt        1/1     Running   0          5m56s
rbd-api-5466bd748f-brqmv                  1/1     Running   0          5m15s
rbd-app-ui-5577b8ff88-fpnnv               1/1     Running   0          4m39s
rbd-chaos-6828h                           1/1     Running   0          5m12s
rbd-db-0                                  1/1     Running   0          5m35s
rbd-gateway-69bfb68f4d-7xd9n              2/2     Running   0          5m34s
rbd-hub-8457697d4c-fqwgn                  1/1     Running   0          5m28s
rbd-monitor-0                             1/1     Running   0          5m27s
rbd-mq-5b6f94b695-gmdnn                   1/1     Running   0          5m25s
rbd-worker-7db9f9cccc-s9wml               1/1     Running   0          5m22s
```

</details>

6. Access Rainbond using the IP address configured in `gatewayIngressIPs`, for example: `http://172.20.251.93:7070`.

7. If you use the default image repository, you need to modify the configuration of Containerd, configure the [goodrain.me private image repository](../../faq/index.md#%E5%90%AF%E5%8A%A8%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96%E9%95%9C%E5%83%8F-x509-certificate-signed-by-unknown-authority).

## Next

Refer to [Quick Start](/docs/quick-start/getting-started/) to deploy your first application.
