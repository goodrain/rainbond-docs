---
title: 'Installation based on self-built k3s cluster'
description: 'Based on the existing k3s cluster, use helm to install Rainbond from scratch'
---

## Installation prerequisites

- Recommended Helm version >= 3.0 root partition disk guaranteed 50G+

- Make sure that server `80, 443, 6060, 6443, 7070, 8443` ports can be accessed

- Make sure the server has the NFS client installed
  - When docking external storage, no installation is required

- K3s startup needs to specify startup parameters `–-docker –-disable traefik`
  - K3s startup will use Containerd as the running environment of the container by default, and Traefik will be installed as the ingress controller of K3s, and there will be port conflicts.

- Make sure the server has Docker installed

:::caution
Note：Rainbond will use Docker as the container runtime by default, and Rainbond's rbd-gatway gateway will be used as the Ingress controller, so you need to modify the K3s startup parameters, and uninstall the installed Traefik or specify that Traefik is not installed The node is the gateway node of Rainbond.
:::

### Install Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

### Install NFS client

```bash
yum -y install nfs-utils # Cenots system
apt-get install nfs-common # ubuntu system
```

### Uninstall Traefik

```bash
kubectl delete -f /var/lib/rancher/k3s/server/manifests/traefik.yaml
```

### Modify K3s startup parameters

:::danger

Warning：If your K3s originally uses Containerd as the container runtime, modifying it to Docker as the container runtime will result in the loss of Containerd data and will not appear in Docker.

:::

```bash
vi /etc/systemd/system/multi-user.target.wants/k3s.service

# Edit the last line of the k3s.service file
ExecStart=/usr/local/bin/k3s server --docker --disable traefik
# Restart Load configuration file
systemctl daemon-reload
# restart k3s
service k3s restart
```


:::caution Note：K3s default configuration file path, Helm can't recognize it, soft link `/etc/rancher/k3s/k3s.yaml` to `~/.kube/config`for helm use. :::

```bash
mkdir ~/.kube
ln -s /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

## Install Rainbond：

- install helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

- Create the rbd-system namespace

```bash
kubectl create namespace rbd-system
```

- Add chart repository

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- install rainbond
  - Refer to [values.yaml Detail](../install-with-helm/vaules-config)  for more custom configuration items and how to change the configuration for an existing Rainbond cluster.

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

### Verify installation

- View pod status

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- Wait for the `rbd-app-ui` pod to be in the Running state and the installation is successful.
- After a successful installation, the Rainbond console can be accessed `$gatewayIngressIPs:`.

### Installation Troubleshooting

- If the installation process does not complete for a long time, please refer to document [Helm Installation Troubleshooting Guide](https://www.rainbond.com/docs/user-operations/deploy/install-troubleshoot/helm-install-troubleshoot/)for troubleshooting.

## Next step

Refer to[Quick Start](/docs/quick-start/getting-started/)to deploy your first application.
