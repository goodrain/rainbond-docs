--- 
title: 部署Kubernetes
summary: 部署Kubernetes
toc: true 
---

## 一、创建证书配置文件

### 1.1 生成证书

```docker
docker run --rm -v /opt/rainbond/etc/kubernetes/ssl:/ssl -w /ssl rainbond/cfssl:dev kip 172.17.119.104
```

### 1.2 生成kubeconfig配置文件

```docker
docker run --rm -v /opt/rainbond/etc/kubernetes/ssl:/etc/goodrain/kubernetes/ssl -v /opt/rainbond/etc/kubernetes/kubecfg:/k8s rainbond/kubecfg:dev
```

## 二、配置kube-apiserver服务

### 2.1 配置kube-apiserver systemd

```bash
cat > /etc/systemd/system/kube-apiserver.service <<EOF
[Unit]
Description=Kubernetes Apiserver
After=etcd.service
Requires=network.target

[Service]
User=root
PermissionsStartOnly=true
EnvironmentFile=-/opt/rainbond/envs/kube-apiserver.sh
ExecStartPre=-/usr/bin/docker rm -f kube-apiserver
ExecStart=/opt/rainbond/scripts/start-kube-apiserver.sh
ExecStop=-/usr/bin/docker stop kube-apiserver
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### 2.2 配置kube-apiserver环境变量

```bash
# /opt/rainbond/envs/kube-apiserver.sh
ETCD_ADDRESS=http://172.17.119.104:2379
```

### 2.3 配置kube-apiserver启动脚本

```bash
cat > /opt/rainbond/scripts/start-kube-apiserver.sh <<EOF
#!/bin/sh
KUBE_APISERVER_OPTS="--insecure-bind-address=127.0.0.1 \
--insecure-port=8181 \
--advertise-address=0.0.0.0 --bind-address=0.0.0.0 \
--etcd-servers=\${ETCD_ADDRESS:-http://127.0.0.1:2379} \
--admission-control=ServiceAccount,NamespaceLifecycle,NamespaceExists,LimitRanger,ResourceQuota \
--authorization-mode=RBAC \
--runtime-config=rbac.authorization.k8s.io/v1beta1 \
--experimental-bootstrap-token-auth \
--token-auth-file=/opt/rainbond/etc/kubernetes/kubecfg/token.csv \
--tls-cert-file=/opt/rainbond/etc/kubernetes/ssl/kubernetes.pem \
--tls-private-key-file=/opt/rainbond/etc/kubernetes/ssl/kubernetes-key.pem \
--client-ca-file=/opt/rainbond/etc/kubernetes/ssl/ca.pem \
--service-account-key-file=/opt/rainbond/etc/kubernetes/ssl/ca-key.pem \
--logtostderr=true \
--service-cluster-ip-range=11.1.0.0/16"

exec /usr/bin/docker \
  run \
  --privileged \
  --restart=always \
  --net=host \
  --name kube-apiserver \
  --volume=/opt/rainbond/etc/kubernetes:/opt/rainbond/etc/kubernetes \
  rainbond/kube-apiserver:v1.6.4 \
  \$KUBE_APISERVER_OPTS
EOF

chmod +x /opt/rainbond/scripts/start-kube-apiserver.sh
```

### 2.4 启动kube-apiserver服务

```bash
docker pull rainbond/kube-apiserver:v1.6.4
systemctl daemon-reload
systemctl enable kube-apiserver
systemctl start kube-apiserver
```

## 三、配置kube-controller-manager服务

### 3.1 配置kube-controller-manager systemd

```bash
cat > /etc/systemd/system/kube-controller-manager.service <<EOF
[Unit]
Description=Kubernetes Controller Manager
Requires=network.target

[Service]
User=root
PermissionsStartOnly=true
EnvironmentFile=-/opt/rainbond/envs/kube-controller-manager.sh
ExecStartPre=-/usr/bin/docker rm -f kube-controller-manager
ExecStart=/opt/rainbond/scripts/start-kube-controller-manager.sh
ExecStop=-/usr/bin/docker stop kube-controller-manager
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### 3.2 配置kube-controller-manager启动脚本

```bash
cat > /opt/rainbond/etc/kubernetes/custom.conf <<EOF
minport = 11000
maxport = 20000
etcdv3 = 127.0.0.1:2379
UUID_file = /opt/rainbond/etc/rbd-node/node_host_uuid.conf
EOF

cat > /opt/rainbond/scripts/start-kube-controller-manager.sh <<EOF
#!/bin/sh

KUBE_CONTROLLER_MANAGER_OPTS="--master=127.0.0.1:8181 \
--pod-eviction-timeout=3m0s \
--custom-config=/opt/rainbond/etc/kubernetes/custom.conf \
--leader-elect=true \
--logtostderr=true \
--address=127.0.0.1 \
--v=2 \
--cluster-name=kubernetes \
--cluster-signing-cert-file=/opt/rainbond/etc/kubernetes/ssl/ca.pem \
--cluster-signing-key-file=/opt/rainbond/etc/kubernetes/ssl/ca-key.pem \
--service-account-private-key-file=/opt/rainbond/etc/kubernetes/ssl/ca-key.pem \
--root-ca-file=/opt/rainbond/etc/kubernetes/ssl/ca.pem"

exec /usr/bin/docker \
  run \
  --privileged \
  --restart=always \
  --net=host \
  --name kube-controller-manager \
  --volume=/opt/rainbond/etc/kubernetes:/opt/rainbond/etc/kubernetes \
  rainbond/kube-controller-manager:v1.6.4 \
  \$KUBE_CONTROLLER_MANAGER_OPTS
EOF  
chmod +x /opt/rainbond/scripts/start-kube-controller-manager.sh
```

### 3.3 启动kube-controller-manager服务

```bash
docker pull rainbond/kube-controller-manager:v1.6.4
systemctl daemon-reload
systemctl enable kube-controller-manager
systemctl start kube-controller-manager
```

## 四、配置kube-scheduler服务

### 4.1 配置kube-scheduler systemd

```bash
cat > /etc/systemd/system/kube-scheduler.service <<EOF
[Unit]
Description=Kubernetes Scheduler
Requires=network.target

[Service]
User=root
PermissionsStartOnly=true
EnvironmentFile=-/opt/rainbond/envs/kube-scheduler.sh
ExecStartPre=-/usr/bin/docker rm -f kube-scheduler
ExecStart=/opt/rainbond/scripts/start-kube-scheduler.sh
ExecStop=-/usr/bin/docker stop kube-scheduler
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### 4.2 配置kube-scheduler启动脚本

```bash
cat > /opt/rainbond/scripts/start-kube-scheduler.sh <<EOF
#!/bin/sh

KUBE_SCHEDULER_OPTS="--logtostderr=true \
--v=5 \
--master=127.0.0.1:8181 \
--custom-config=/opt/rainbond/etc/kubernetes/custom.conf \
--leader-elect=true \
"

exec /usr/bin/docker \
  run \
  --privileged \
  --restart=always \
  --net=host \
  --name kube-scheduler \
  --volume=/opt/rainbond/etc/kubernetes/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg \
  rainbond/kube-scheduler:v1.6.4 \
  \$KUBE_SCHEDULER_OPTS
EOF
chmod +x /opt/rainbond/scripts/start-kube-scheduler.sh
```

### 4.3 启动kube-scheduler服务

```bash
docker pull rainbond/kube-scheduler:v1.6.4
systemctl daemon-reload
systemctl enable kube-scheduler
systemctl start kube-scheduler
```

### 4.4 验证k8s集群

```bash
mkdir -p /root/.kube
cp /opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig /root/.kube/config
kubectl get cs
```

## 五、配置rbd-dns服务


### 5.1 启动rbd-dns服务

```bash
cat > /opt/rainbond/compose/dns.yaml <<EOF
version: '2.1'
services:
  rbd-dns:
    image: rainbond/rbd-dns:3.6
    container_name: rbd-dns
    mem_limit: 1024M
    environment:
      - VERBOSE=true
    command:
    - --kubecfg-file=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig
    - --v=3
    - --healthz-port=8089
    - --nameservers=114.114.114.114,1.2.4.8
    - --recoders=goodrain.me=<管理点ip>,*.goodrain.me=<管理点ip>
    volumes:
    - /opt/rainbond/etc/kubernetes/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF

dc-compose up -d rbd-dns
```

### 5.2 修改机器配置

```bash
# 修改dns
cat >> /etc/resolv.conf <<EOF
nameserver 114.114.114.114
nameserver <管理点ip>
EOF
```

## 6. 安装 kubelet

### 6.1 配置 kubelet.service

```bash
cat > /etc/systemd/system/kubelet.service <<EOF
[Unit]
Description=Kubernetes Agent
After=docker.service
Requires=docker.service

[Service]
Type=simple
User=root
EnvironmentFile=/opt/rainbond/envs/kubelet.sh
PermissionsStartOnly=true
ExecStart=/opt/rainbond/scripts/start-kubelet.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### 6.2 配置脚本

```bash
cat > /opt/rainbond/envs/kubelet.sh <<EOF
HOST_UUID=<同当前节点 node 的 uuid>
DNS_SERVERS=<dns所在节点 ip>
HOST_IP=<管理节点 ip>
REG="false"
EOF

cat > /opt/rainbond/scripts/start-kubelet.sh <<EOF
#!/bin/sh

KUBELET_OPTS="--address=\$HOST_IP \
--port=10250 \
--hostname_override=\$HOST_UUID \
--kubeconfig=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig \
--require-kubeconfig \
--cert-dir=/opt/rainbond/etc/kubernetes/ssl \
--cluster-domain=cluster.local. --hairpin-mode promiscuous-bridge \
--cluster-dns=\$DNS_SERVERS \
--register-node=\${REG:-true} \
--max-pods=10000 \
--custom-config=/opt/rainbond/etc/kubernetes/custom.conf \
--network-plugin=cni \
--network-plugin-dir=/opt/rainbond/bin \
--cni-conf-dir=/opt/rainbond/etc/cni/ \
--cpu-cfs-quota=false \
--pod-infra-container-image=goodrain.me/pause-amd64:3.0 \
--logtostderr=true \
--log-driver=streamlog \
--maximum-dead-containers-per-container=0 \
--v=2"

exec /usr/local/bin/kubelet \$KUBELET_OPTS
EOF

chmod +x /opt/rainbond/scripts/start-kubelet.sh
```

### 启动 kubelet

```bash
systemctl daemon-reload
systemctl enable kubelet
systemctl start kubelet
```