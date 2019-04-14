---
title: "扩容网关节点"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1312
description: 添加网关节点或者迁移网关节点
hidden: true
---

{{% notice info %}}
目前版本只支持手动扩容网关节点
{{% /notice %}}

### 添加网关节点

#### 1. 准备工作

* 生成node的systemd文件

```yaml
cat > /etc/systemd/system/node.service <<EOF
[Unit]
Description=Goodrain Rainbond node
After=network.target

[Service]
Type=simple
User=root
LimitCORE=infinity
LimitNOFILE=102400
LimitNPROC=102400
EnvironmentFile=-/opt/rainbond/envs/node.sh
PermissionsStartOnly=true
ExecStart=/opt/rainbond/scripts/start-node.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

* 生成node启动脚本

```bash
cat > /opt/rainbond/scripts/start-node.sh <<EOF
#!/bin/bash

NODE_OPTS="--log-level=info --auto-scheduler=true --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig --etcd=http://<etcd地址>  --hostIP=<新增网关节点ip> --run-mode master --noderule manage"

exec /usr/local/bin/node $NODE_OPTS
EOF
```

* 生成node的uuid

```bash
cat > /opt/rainbond/etc/node/node_host_uuid.conf <<EOF
host_uuid=<node_uuid, 可以用uuidgen生成>
EOF
```

* 从管理节点同步文件
    * 从第一个管理节点同步/opt/rainbond/conf目录下的network.yaml,lb.yaml文件到新增网关节点同样目录西下
    * 从第一个管理节点同步/opt/rainbond/etc/kubernetes/kubecfg目录到新增网关节点同样目录下
    * 从第一个管理节点同步/opt/rainbond/health目录到新增网关节点同样目录下
    * 从第一个管理节点同步/opt/rainbond/etc/tools/bin/node到新增网关节点/usr/local/bin/node

* 编辑新增网关节点 /opt/rainbond/conf/network.yaml

```yaml
IP为新增网关节点
NODENAME为新增网关节点node的uuid
```

* 安装docker并启动

```bash
# 安装docker
export VERSION=18.06 && curl -fsSL http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/docker/install-docker.sh | bash -s docker 
cat > /etc/docker/daemon.json <<EOF
{
  "insecure-registries": ["goodrain.me"],
  "bip": "172.30.42.1/16",
  "userland-proxy": false,
  "storage-driver": "overlay2",
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "20m",
    "max-file": "2"
    }
}
EOF

# 启动docker
systemctl daemon-reload
systemctl restart docker
```

* 更新dns或许更新hosts
    * 编辑 `/etc/resolv.conf`,添加管理节点ip,支持goodrain.me等域名解析
    * 编辑 `/etc/hosts`,添加域名解析`<管理节点ip>  kubeapi.goodrain.me goodrain.me repo.goodrain.me lang.goodrain.me maven.goodrain.me region.goodrain.me`

#### 2. 启动node

```
systemctl enable node
systemctl start node
# node启动后根据/opt/rainbond/conf目录下配置文件生成对应服务systemd配置文件并启动
```

### 对接阿里云slb

可以参考 [阿里云slb配置-可选](http://localhost:1313/docs/user-operations/install/install-base-alicloud/#2-5-阿里云slb配置-可选)