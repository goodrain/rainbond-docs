--- 
title: 基础服务部署
summary: 基础服务部署
toc: true 
---

## 一、安装docker

### 1.1 配置仓库

```bash
# centos
cat > /etc/yum.repos.d/docker.repo <<EOF
[docker-repo]
gpgcheck=1
gpgkey=http://repo.goodrain.com/gpg/RPM-GPG-KEY-CentOS-goodrain
enabled=1
baseurl=http://repo.goodrain.com/centos/$releasever/3.6/$basearch
name=Goodrain CentOS-$releasever - for x86_64
EOF
yum makecache
# Debian
cat >  /etc/apt/sources.list.d/docker.list <<EOF
deb http://repo.goodrain.com/debian/9 3.6 main
EOF
curl http://repo.goodrain.com/gpg/goodrain-C4CDA0B7 2>/dev/null | apt-key add -
apt update
```

### 1.2 安装docker

```bash
# Centos
yum install -y gr-docker-engine
# Debian
apt install -y gr-docker-engine
```

### 1.3 更新docker.service


Centos `/usr/lib/systemd/system/docker.service`  
Debian `/lib/systemd/system/docker.service`  

```bash
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network.target

[Service]
Type=notify
EnvironmentFile=/opt/rainbond/envs/docker.sh
ExecStart=/usr/bin/dockerd $DOCKER_OPTS
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=1048576
LimitNPROC=1048576
LimitCORE=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

# fix device or resource busy for centos/redhat
MountFlags=slave

[Install]
WantedBy=multi-user.target
```

### 1.4 更新docker envs

更新配置 `/opt/rainbond/envs/docker.sh`

```bash
# centos
DOCKER_OPTS="-H unix:///var/run/docker.sock --bip=172.30.42.1/16 --dns=<管理节点ip> --insecure-registry goodrain.me --storage-driver=devicemapper --storage-opt dm.xfs_nospace_max_retries=0 --userland-proxy=false"

# debian
DOCKER_OPTS="-H unix:///var/run/docker.sock --bip=172.30.42.1/16 --dns=<管理节点ip> --insecure-registry goodrain.me --storage-driver=devicemapper --userland-proxy=false"
```

### 1.5 配置镜像加速

```bash
cat > /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn/"]
}
EOF
```

### 1.6 启动 docker

```
systemctl daemon-reload
systemctl restart docker
```

## 二、安装基础服务组件

## 三、配置相关二进制
