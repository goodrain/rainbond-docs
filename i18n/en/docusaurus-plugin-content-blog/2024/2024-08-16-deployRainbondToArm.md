---
title: Creativity Environments：Super ARM+Licorne for the offline deployment of K8s and Rainbond Creative Platforms
description: In our last paper on the Ninational Platform of Creative Creative Creative Origin of Nationality, we described Rainbond as a potentially first domestic open-source national confidence-building platform to support national production and confidence creation, and also outlined how to deploy Kubernetes and Rainbond online in the context of national productive confidence-creation.
slug: employee RainbondToArm
---

In the previous article [Nippon Foundation for the Creative Origin of Nationality] (https://mp.weixin.qq.com/s/0ywRmYrNBrsDtPYDYDrfw), we described the capabilities of Rainbond as a potentially first domestic open-source national information generation platform to support nationalization and confidence-building, and outlined how to deploy Kubernetes and Rainbond online in the national productive confidence-building environment.

However, the demand for offline deployment is more common for most national credit-producing environments, such as banks and governments.It is noteworthy that the Rainbond official web file currently provides only guidelines for the offline deployment of Rainbond in an existing Kubernetes environment.Why, then, do we not provide documentation for the offline deployment of Kubernetes?Unlike other open source communities, Rainbond has always been responsible for the issues raised by each open-source user and has been active in helping to resolve them.However, this would undoubtedly place an additional burden on community support teams, especially when dealing with issues that would not otherwise fall within the framework of Rainbod.

This article will therefore provide detailed information on how Kubernetes and Rainbond are deployed in the context of national production of trust and will, hopefully, provide practical guidance to users to reduce difficulties in the deployment process.

![](https://static.goodrain.com/wechat/xinchanang/server.png)

## Preparing offline mirrors and installation packages

The following mirrors and packages are prepared in a web Arm environment.

### Docker Offline Pack

Download docker offline installation packages and offline installation scripts.

```bash
wget https://pkg.rainbond.com/offline/docker/docker-arm-20.10.9.tgz
wget https://get.rainbond.com/install_docker_offline.sh
```

### Kubernetes Offline Pack

This deployment is version `v1.23.10`, using Rancher Kubernetes Engine RKE, a Kubernetes installation certified by CNCF.

Get the following offline packages in the Arm environment.

```bash
# Kubectl and Helm Binary File
wget https://pkg.goodrain.com/pkg/kubectl/v1.23.10/kubectl-arm -O kubectl
wget https://pkg.goodrain.com/pkg/helm/v3.10.1/helm-arm64-O helm
# RKE install binary File
wget https://pkg.goodrain.com/pkg/rke/v1.3.15/rke-O rke
```

```bash
#!/bin/bash
# RKE Docker镜像
image_list="registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coreos-etcd:v3.5.3
registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-kube-dns:1.21.1
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-dnsmasq-nanny:1.21.1
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-sidecar:1.21.1
registry.cn-hangzhou.aliyuncs.com/goodrain/cluster-proportional-autoscaler:1.8.1
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coredns-coredns:1.10.1
registry.cn-hangzhou.aliyuncs.com/goodrain/cluster-proportional-autoscaler:1.8.1
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-node-cache:1.21.1
registry.cn-hangzhou.aliyuncs.com/goodrain/hyperkube:v1.23.10-rancher1
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coreos-flannel:v0.15.1
registry.cn-hangzhou.aliyuncs.com/goodrain/flannel-cni:v0.3.0-rancher6
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-pause:3.6
registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-metrics-server:v0.6.1"

for image in ${image_list}; do
    docker pull "${image}"
done

docker save -o rke-images.tar ${image_list}
```

### Rainbond Offline Pack

Prepare the mirrors needed for Rainbond ahead of time in a network environment.

```bash
#!/bin/bash
VERSION=${VERSION:-'v5.17.3-release'}

image_list="registry.cn-hangzhou.aliyuncs.com/goodrain/kubernetes-dashboard:v2.6.1
registry.cn-hangzhou.aliyuncs.com/goodrain/registry:2.6.2
registry.cn-hangzhou.aliyuncs.com/goodrain/metrics-server:v0.4.1
registry.cn-hangzhou.aliyuncs.com/goodrain/etcd:v3.3.18
registry.cn-hangzhou.aliyuncs.com/goodrain/metrics-scraper:v1.0.4
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:${VERSION}-allinone
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-mesh-data-panel:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-webcli:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-eventlog:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-init-probe:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-chaos:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-mq:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-worker:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-node:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-monitor:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-gateway:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-api:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-db:8.0.19
registry.cn-hangzhou.aliyuncs.com/goodrain/mysqld-exporter:latest
registry.cn-hangzhou.aliyuncs.com/goodrain/nfs-provisioner:latest"

for image in ${image_list}; do
    docker pull "${image}"
done

docker save -o rainbond-"${VERSION}".tar ${image_list}
```

Get Rainbond Helm Chart installation package

```bash
git clone --depth=1 https://github.com/goodrain/rainbod-chart
```

## Start deployment of Kubernetes

### Prerequisite requirements

Before installing K8s, please read [RKE Installation Requirements](https://docs.rancher.cn/docs/rke/os/_index), which describes RKE requirements for operating systems, software, ports and SSH configurations, please check if your node meets these requirements.

### Deploy Docker

Import Docker offline packages to all nodes to execute script installation of Docker.

```bash
$ girls
docker-arm-20.10.9.tgz install_docker_offline.sh
$ bash ./install_docker_offline.sh
```

Import K8s related offline packages and Docker mirrors to all nodes.

### Configure Docker User

RKE requires an unencrypted user to be used for the subsequent cluster installation. This user needs to have docker permission.

```bash
# Create user and root group
adduser -g root docker &echo "docker:password" | chpasswd
# Generate ssh keys, Enter full default sufficient for
ssh-keygen
# Configuration free login
ssh-copy-id docker@xxxx
```

Use Docker user login to check if they have Docker execution.

```bash
$ ssh docker@xxxx
$ docker ps
```

### Edit cluster.yml file

The configuration file generated by the RKE is required to install the K8s cluster using RKE. Below is my example and see[RKE配置文件说明](https://docs.rancher.cn/docs/rke/example-yamls/_index).

Only `notes` fields need to be modified. If the imaging repository address does not change anyml and change all mirror addresses under the `system_images` field.

```yaml
nodes:
- address: 192.168.0.138
  port: "22"
  internal_address: 192.168.0.138
  role:
  - etcd
  - controlplane
  - worker
  hostname_override: ""
  user: docker
  docker_socket: ""
  ssh_key: ""
  ssh_key_path: ~/.ssh/id_rsa
  ssh_cert: ""
  ssh_cert_path: ""
  labels: {}
  taints: []
services:
  etcd:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds: []
    extra_env:
    - ETCD_AUTO_COMPACTION_RETENTION=1
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
    external_urls: []
    ca_cert: ""
    cert: ""
    key: ""
    path: ""
    uid: 0
    gid: 0
    snapshot: null
    retention: ""
    creation: ""
    backup_config: null
  kube-api:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds: []
    extra_env: []
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
    service_cluster_ip_range: 10.43.0.0/16
    service_node_port_range: ""
    pod_security_policy: false
    always_pull_images: false
    secrets_encryption_config: null
    audit_log: null
    admission_configuration: null
    event_rate_limit: null
  kube-controller:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds: []
    extra_env: []
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
    cluster_cidr: 10.42.0.0/16
    service_cluster_ip_range: 10.43.0.0/16
  scheduler:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds: []
    extra_env: []
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
  kubelet:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds:
    - /grlocaldata:/grlocaldata:rw,z
    - /cache:/cache:rw,z
    extra_env: []
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
    cluster_domain: cluster.local
    infra_container_image: ""
    cluster_dns_server: 10.43.0.10
    fail_swap_on: false
    generate_serving_certificate: false
  kubeproxy:
    image: ""
    extra_args: {}
    extra_args_array: {}
    extra_binds: []
    extra_env: []
    win_extra_args: {}
    win_extra_args_array: {}
    win_extra_binds: []
    win_extra_env: []
network:
  plugin: flannel # calico
  options: {}
  mtu: 0
  node_selector: {}
  update_strategy: null
  tolerations: []
authentication:
  strategy: x509
  sans: []
  webhook: null
addons: ""
addons_include: []
system_images:
  etcd: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coreos-etcd:v3.5.3
  alpine: registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
  nginx_proxy: registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
  cert_downloader: registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
  kubernetes_services_sidecar: registry.cn-hangzhou.aliyuncs.com/goodrain/rke-tools:v0.1.87
  kubedns: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-kube-dns:1.21.1
  dnsmasq: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-dnsmasq-nanny:1.21.1
  kubedns_sidecar: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-sidecar:1.21.1
  kubedns_autoscaler: registry.cn-hangzhou.aliyuncs.com/goodrain/cluster-proportional-autoscaler:1.8.1
  coredns: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coredns-coredns:1.10.1
  coredns_autoscaler: registry.cn-hangzhou.aliyuncs.com/goodrain/cluster-proportional-autoscaler:1.8.1
  nodelocal: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-k8s-dns-node-cache:1.21.1
  kubernetes: registry.cn-hangzhou.aliyuncs.com/goodrain/hyperkube:v1.23.10-rancher1
  flannel: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-coreos-flannel:v0.15.1
  flannel_cni: registry.cn-hangzhou.aliyuncs.com/goodrain/flannel-cni:v0.3.0-rancher6
  calico_node: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-calico-node:v3.22.0
  calico_cni: registry.cn-hangzhou.aliyuncs.com/goodrain/calico-cni:v3.22.0-rancher1
  calico_controllers: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-calico-kube-controllers:v3.22.0
  calico_ctl: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-calico-ctl:v3.22.0
  calico_flexvol: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-calico-pod2daemon-flexvol:v3.22.0
  canal_node: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-calico-node:v3.22.0
  canal_cni: ""
  canal_controllers: ""
  canal_flannel: ""
  canal_flexvol: ""
  weave_node: ""
  weave_cni: ""
  pod_infra_container: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-pause:3.6
  ingress: ""
  ingress_backend: ""
  ingress_webhook: ""
  metrics_server: registry.cn-hangzhou.aliyuncs.com/goodrain/mirrored-metrics-server:v0.6.1
  windows_pod_infra_container: ""
  aci_cni_deploy_container: ""
  aci_host_container: ""
  aci_opflex_container: ""
  aci_mcast_container: ""
  aci_ovs_container: ""
  aci_controller_container: ""
  aci_gbp_server_container: ""
  aci_opflex_server_container: ""
ssh_key_path: ""
ssh_cert_path: ""
ssh_agent_auth: false
authorization:
  mode: rbac
  options: {}
ignore_docker_version: null
enable_cri_dockerd: null
kubernetes_version: ""
private_registries: []
ingress:
  provider: none
  options: {}
  node_selector: {}
  extra_args: {}
  dns_policy: ""
  extra_envs: []
  extra_volumes: []
  extra_volume_mounts: []
  update_strategy: null
  http_port: 0
  https_port: 0
  network_mode: ""
  tolerations: []
  default_backend: null
  default_http_backend_priority_class_name: ""
  nginx_ingress_controller_priority_class_name: ""
  default_ingress_class: null
cluster_name: ""
cloud_provider:
  name: ""
prefix_path: ""
win_prefix_path: ""
addon_job_timeout: 300
bastion_host:
  address: ""
  port: ""
  user: ""
  ssh_key: ""
  ssh_key_path: ""
  ssh_cert: ""
  ssh_cert_path: ""
  ignore_proxy_env_vars: false
monitoring:
  provider: none
  options: {}
  node_selector: {}
  update_strategy: null
  replicas: null
  tolerations: []
  metrics_server_priority_class_name: ""
restore:
  restore: false
  snapshot_name: ""
rotate_encryption_key: false
dns: null
```

### Execute Installation

Execute the following commands to start installing K8.经验证麒麟V10必须 SSH 配置 `AllowTcpForwarding yes`，不然就会报错，参阅 [RKE SSH配置](https://docs.rancher.cn/docs/rke/os/_index#ssh-server-%E9%85%8D%E7%BD%AE)。

```bash
./rke up
```

If there is an error during the installation process, the cluster can be cleaned using the following script.

```bash
curl -sfL https://get.rainbond.com/clean-rke | bash
```

A kubeconfig file needs to be copied to the default path after the cluster installation has been successful.

```bash
mkdir /root/.kube && cp kube_config_cluster.yml/root/.kube/config
```

Execute the following command to confirm the installation result

```bash
kubectl get node
```

## Start deploying Rainbond

### Prerequisite requirements

Each node needs to install the `nfs-utils` package, which is not detailed here. There are many online tutorials, presumably mounting DVD mirrors, and then using a local mirror source, direct yum installation.

### Import Mirror Pack

```bash
docker load-i rainbond-v5.17.3-release.tar
```

### Install Rainbond

Copy Helm Chart to prepare Git cloning.

Install Rainbond with Helm Chart

1. Create namespace

```bash
kubectl create namespace rbd-system
```

2. Write Helm values.yml, see [Chart Installation Options](https://www.rainbond.com/docs/installation/install-with-helm/vaules-config).

```bash
Operator:
  image:
    name: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    tag: v5.17. -release

Cluster:
  enableEnvCheck: false
  gatewayInressIPs: 192.168.0.
  notesForChaos:
  - name: 192.168.0.138
  nodesForgateway:
  - externalIP: 192. 68.0.138
    internalIP: 192.168.0.138
    name: 192.168.0.138
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  installVersion: v5. 7.3-release
Component:
  rbd_app_ui:
    enable: true
    env:
      DISABLE_DEFAULT_APP_MARKET: true
```

3. Execute Helm Installation Command

```bash
help install rainbond ./rainbond-chart -n rbd-system -f value.yml
```

### Install progress query

After executing the installation command, perform the following commands in the cluster to view the installation status.

```bash
watch kubtl get po -n rbd-system
```

Installation successful when the name `rbd-app-ui` contains the Pod `rbd-app-ui` for Running state.

### Access Platform

Copy the commands below to be executed in the cluster, and get the platform access address.If there are multiple gateway nodes, any address can be accessed to the console.

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

### Offline environment source build (optional)

如果你需要在离线环境下进行源码构建，请参阅[Rainbond离线源码构建文档](https://www.rainbond.com/docs/installation/offline/#%E7%A6%BB%E7%BA%BF%E7%8E%AF%E5%A2%83%E4%B8%8B%E4%BD%BF%E7%94%A8%E6%BA%90%E7%A0%81%E6%9E%84%E5%BB%BA%E5%8F%AF%E9%80%89)进行配置。

## Last

With this guidance, it is hoped that you will be able to complete the offline deployment of Kubernetes and Rainbond in the environments of Super ARM and Licorne V10.The demand for offline deployment is becoming more common in a national-producing confidence-building environment, and we provide detailed steps and examples to help you reduce the uncertainties and challenges in the deployment process.In the future, we will also continue to update relevant curricula and documentation to better serve the needs in the area of national production of credits.
