--- 
title: 部署网络组件
summary: 部署网络组件
toc: true 
---

## 一、安装部署网络组件calico

### 1.1 配置calico-node systemd

```bash
cat > /etc/systemd/system/calico.service <<EOF
[Unit]
Description=calicoctl node
After=docker.service
Requires=docker.service

[Service]
User=root
EnvironmentFile=/opt/rainbond/envs/calico.sh
PermissionsStartOnly=true
ExecStartPre=-/usr/bin/docker rm -f calico
ExecStart=/opt/rainbond/scripts/start-calico.sh
Restart=always
ExecStop=-/usr/bin/docker stop calico
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### 1.2 配置calico环境变量

配置当前节点信息格式示例如下: 

```bash
DEFAULT_IPV4=172.17.119.104
ETCD_ENDPOINTS=http://172.17.119.104:2379
NODE_IMAGE=rainbond/calico-node:v2.4.1
```

### 1.3 配置启动脚本

```bash
cat > /opt/rainbond/scripts/start-calico.sh <<EOF
#!/bin/bash

exec /usr/bin/docker run --net=host \
--privileged \
--name=calico  \
--restart=always \
-e NO_DEFAULT_POOLS= \
-e CALICO_LIBNETWORK_ENABLED=true \
-e IP=${DEFAULT_IPV4} \
-e CALICO_LIBNETWORK_CREATE_PROFILES=true \
-e CALICO_LIBNETWORK_LABEL_ENDPOINTS=false \
-e CALICO_LIBNETWORK_IFPREFIX=cali \
-e NODENAME=${HOSTNAME} \
-e CALICO_NETWORKING_BACKEND=bird \
-e IP6_AUTODETECTION_METHOD=first-found \
-e ETCD_ENDPOINTS=${ETCD_ENDPOINTS} \
-v /var/log/calico:/var/log/calico \
-v /var/run/calico:/var/run/calico \
-v /lib/modules:/lib/modules \
-v /run/docker/plugins:/run/docker/plugins \
-v /var/run/docker.sock:/var/run/docker.sock \
${NODE_IMAGE}
EOF
chmod +x /opt/rainbond/scripts/start-calico.sh
```

### 1.4 启动网络组件calico

```bash
systemctl daemon-reload
systemctl enable calico
systemctl start calico
# 测试
calicoctl node status
```