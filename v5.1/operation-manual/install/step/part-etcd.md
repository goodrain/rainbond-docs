--- 
title: 部署服务etcd
summary: 部署服务etcd
toc: true 
---

## 一、salt自动化部署单节点etcd

```bash
salt "*" state.sls etcd
```

## 二、手动安装etcd或集群

#### 2.1 配置etcd systemd

```bash
cat > /etc/systemd/system/etcd.service <<EOF
[Unit]
Description=etcd service
After=network.target

[Service]
User=root
EnvironmentFile=/opt/rainbond/envs/etcd.sh
PermissionsStartOnly=true
ExecStartPre=-/usr/bin/docker rm -f etcd
ExecStart=/opt/rainbond/scripts/start-etcd.sh
ExecStop=-/usr/bin/docker stop etcd
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### 2.2 配置etcd环境

配置当前节点信息格式示例如下: 

```bash
# /opt/rainbond/envs/etcd.sh
LOCAL_IP=172.17.119.104
```

#### 2.3 配置启动脚本

```bash
wget https://www.rainbond.com/docs/stable/operation-manual/setup/config/start-etcd.sh -O /opt/rainbond/scripts/start-etcd.sh
chmod +x /opt/rainbond/scripts/start-etcd.sh
# 部分参数说明
LOCAL_NODE：# 当前主机名
NODES: # 当前etcd集群节点信息
示例:
NODES="
manage01:172.17.119.104
manage02:172.17.119.105
manage03:172.17.119.106
"
```

#### 2.4 启动etcd服务

```bash
mkdir -p /opt/rainbond/data/etcd
systemctl daemon-reload
systemctl enable etcd
systemctl start etcd
# 测试
etcdctl member list
etcdctl cluster-health
```

## 三、etcd集群扩容

动态扩容etcd节点

```bash
curl http://172.17.119.104:2379/v2/members -XPOST -H "Content-Type: application/json" -d '{"peerURLs": ["http://172.17.119.114:2380"]}'
```

新节点(172.17.119.114)操作如下：  

1. 配置etcd systemd
2. 配置etcd环境
3. 配置启动脚本，具体变动如下
4. 启动新节点etcd
5. 更新其他etcd启动脚本NODES参数值，与新节点同步。

```bash
# 主要修改参数
LOCAL_NODE：# 当前主机名
NODES: # 当前etcd集群节点信息
示例:
NODES="
manage01:172.17.119.104
manage02:172.17.119.105
manage03:172.17.119.106
manage04:172.17.119.114
"
INITIAL_CLUSTER_STATE 将这个参数值改为existing
```

