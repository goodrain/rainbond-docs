--- 
title: 部署Rainbond组件
summary: 部署Rainbond组件
toc: true 
---

## 一、部署node组件

### 1.1 配置node.service

```bash
cat > /etc/systemd/system/node.service <<EOF
[Unit]
Description=goodrain rainbond-node
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

### 1.2 配置启动脚本

```bash
cat > /opt/rainbond/scripts/start-node.sh <<EOF
#!/bin/bash

eval \$(ssh-agent) > /dev/null
eval \$(ssh-add) > /dev/null

NODE_OPTS="--log-level=debug --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig --nodeid-file=/opt/rainbond/etc/rbd-node/node_host_uuid.conf --etcd=http://127.0.0.1:2379   --hostIP=<管理节点ip> --run-mode master --noderule manage,compute"

exec /usr/local/bin/node \$NODE_OPTS
EOF

chmod +x /opt/rainbond/scripts/start-node.sh
```

### 1.3 启动

```bash
systemctl daemon-reload
systemctl enable node
systemctl start node
```

## 二、负载均衡组件

```bash
wget https://raw.githubusercontent.com/goodrain/rainbond-install/v3.6/install/salt/plugins/data/proxy.conf -O /opt/rainbond/etc/rbd-lb/dynamics/dynamic_servers/default.http.conf

wget https://raw.githubusercontent.com/goodrain/rainbond-install/v3.6/install/salt/proxy/ssl/goodrain.me/server.crt -O /opt/rainbond/etc/rbd-lb/dynamics/dynamic_certs/goodrain.me/server.crt
wget https://raw.githubusercontent.com/goodrain/rainbond-install/v3.6/install/salt/proxy/ssl/goodrain.me/server.key -O /opt/rainbond/etc/rbd-lb/dynamics/dynamic_certs/goodrain.me/server.key

cat > /opt/rainbond/compose/lb.yaml <<EOF
version: '2.1'
services:
  rbd-lb:
    image: rainbond/rbd-lb:3.6
    container_name: rbd-lb
    environment:
      DEFAULT_PORT: 80
      HTTP_SUFFIX_URL: 042ff9.grapps.cn
    volumes:
    - /opt/rainbond/etc/rbd-lb/dynamics:/usr/local/openresty/nginx/conf/dynamics
    - /opt/rainbond/logs/rbd-lb:/usr/local/openresty/nginx/logs
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF

dc-compose up -d rbd-lb
```

## 三、核心组件

```bash
cat > /opt/rainbond/compose/plugin.yaml <<EOF
version: '2.1'
services:
  rbd-entrance:
    image: rainbond/rbd-entrance:3.6
    container_name: rbd-entrance
    mem_limit: 1024M
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
    environment:
      DEFAULT_HTTP_PORT: 80
      DEFAULT_HTTPS_PORT: 443
    volumes:
    - /opt/rainbond/etc/kubernetes/kubecfg:/etc/goodrain/kubernetes
    command:
    - --plugin-name=openresty
    - --plugin-opts=urls=http://172.17.119.104:10002
    - --kube-conf=/etc/goodrain/kubernetes/admin.kubeconfig
    - --log-level=info
    - --etcd-endpoints=http://172.17.119.104:2379
    - --run-mode=sync
  rbd-api:
    image: rainbond/rbd-api:3.6
    container_name: rbd-api
    mem_limit: 1024M
    environment:
      EX_DOMAIN: 042ff9.grapps.cn
      LicenseSwitch: 'off'
    volumes:
    - /grdata:/grdata
    - /opt/rainbond/etc/rbd-api:/etc/goodrain
    - /opt/rainbond/etc/kubernetes/kubecfg:/etc/goodrain/kubernetes
    - /opt/rainbond/logs/docker_logs:/data/docker_logs
    - /opt/rainbond/logs/rbd-api:/logs
    command: --etcd=http://172.17.119.104:2379 --log-level=debug --mysql="gradmin:Adi1oefo@tcp(172.17.119.104:3306)/region"
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-chaos:
    image: rainbond/rbd-chaos:3.6
    container_name: rbd-chaos
    mem_limit: 1024M
    command: --etcd-endpoints=http://172.17.119.104:2379 --log-level=debug --mysql="gradmin:Adi1oefo@tcp(172.17.119.104:3306)/region"
    environment:
    - SOURCE_DIR=/cache/source
    - CACHE_DIR=/cache
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    volumes:
    - /logs:/logs
    - /grdata:/grdata
    - /cache:/cache
    - /var/run:/var/run
    - /opt/rainbond/etc/rbd-chaos/ssh:/root/.ssh
    network_mode: host
    restart: always
  rbd-mq:
    image: rainbond/rbd-mq:3.6
    container_name: rbd-mq
    mem_limit: 1024M
    command: --log-level=debug --etcd-endpoints=http://172.17.119.104:2379
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-webcli:
    image: rainbond/rbd-webcli:3.6
    container_name: rbd-webcli
    mem_limit: 1024M
    volumes:
    - /usr/local/bin/kubectl:/usr/bin/kubectl
    - /root/.kube:/root/.kube
    command: --hostIP=172.17.119.104 --etcd-endpoints=http://172.17.119.104:2379
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-worker:
    image: rainbond/rbd-worker:3.6
    container_name: rbd-worker
    mem_limit: 1024M
    environment:
      K8S_MASTER: http://127.0.0.1:8181
      CUR_NET: calico
      EX_DOMAIN: 042ff9.grapps.cn
    volumes:
    - /opt/rainbond/etc/kubernetes/kubecfg:/etc/goodrain/kubernetes
    - /grdata:/grdata
    command: --log-level=info --etcd-endpoints=http://172.17.119.104:2379 --kube-config="/etc/goodrain/kubernetes/admin.kubeconfig" --mysql="gradmin:Adi1oefo@tcp(172.17.119.104:3306)/region"
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-monitor:
    image: rainbond/rbd-monitor:3.6
    container_name: rbd-monitor
    volumes:
    - /opt/rainbond/data/prom:/prometheusdata
    command:
    - --etcd-endpoints=http://172.17.119.104:2379
    - --advertise-addr=172.17.119.104:9999
    - --web.listen-address=0.0.0.0:9999
    - --config.file=/etc/prometheus/prometheus.yml
    - --storage.tsdb.path=/prometheusdata
    - --storage.tsdb.no-lockfile
    - --storage.tsdb.retention=7d
    - --log.level=info
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-eventlog:
    image: rainbond/rbd-eventlog:3.6
    container_name: rbd-eventlog
    mem_limit: 1024M
    environment:
      K8S_MASTER: http://127.0.0.1:8181
    volumes:
    - /opt/rainbond/logs/rbd-eventlog:/var/log
    - /opt/rainbond/etc/rbd-node/node_host_uuid.conf:/opt/rainbond/etc/node/node_host_uuid.conf
    - /grdata/downloads/log:/grdata/logs
    command:
    - --cluster.bind.ip=172.17.119.104
    - --db.type=mysql
    - --db.url=gradmin:Adi1oefo@tcp(172.17.119.104:3306)/region
    - --discover.etcd.addr=http://172.17.119.104:2379
    - --eventlog.bind.ip=172.17.119.104
    - --websocket.bind.ip=172.17.119.104
    - --nodeid-file=/opt/rainbond/etc/node/node_host_uuid.conf
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF
```

根据实际情况,修改配置文件里的域名, ip,数据库配置等信息.

```bash
dc-compose up -d
```
