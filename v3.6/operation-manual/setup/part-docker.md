--- 
title: 基础服务部署
summary: 基础服务部署
toc: true 
---

## 一、salt部署基础服务

通过salt自动化部署基础服务。

```bash
# docker
salt "*" state.sls docker
# 基础服务
salt "*" state.sls misc
salt "*" state.sls grbase
# 数据库服务
salt "*" state.sls db
```

## 二、手动部署基础服务

### 2.1 安装配置docker

#### 2.1.1 配置仓库

```bash
# centos
cat > /etc/yum.repos.d/docker.repo <<EOF
[docker-repo]
gpgcheck=1
gpgkey=http://repo.goodrain.com/gpg/RPM-GPG-KEY-CentOS-goodrain
enabled=1
baseurl=http://repo.goodrain.com/centos/\$releasever/3.6/\$basearch
name=Goodrain CentOS-\$releasever - for x86_64
EOF
yum makecache
# Debian
cat >  /etc/apt/sources.list.d/docker.list <<EOF
deb http://repo.goodrain.com/debian/9 3.6 main
EOF
curl http://repo.goodrain.com/gpg/goodrain-C4CDA0B7 2>/dev/null | apt-key add -
apt update
```

#### 2.1.2 安装docker

```bash
# Centos
yum install -y gr-docker-engine
# Debian
apt install -y gr-docker-engine
```

#### 2.1.3 更新docker.service


Centos `/usr/lib/systemd/system/docker.service`  
Debian `/lib/systemd/system/docker.service`  

具体可以 `systemctl cat docker`

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

#### 2.1.4 更新docker envs

更新配置 `/opt/rainbond/envs/docker.sh`

```bash
mkdir -p /opt/rainbond/envs
# centos
DOCKER_OPTS="-H unix:///var/run/docker.sock --bip=172.30.42.1/16 --dns=<管理节点ip> --insecure-registry goodrain.me --storage-driver=devicemapper --storage-opt dm.xfs_nospace_max_retries=0 --userland-proxy=false"

# debian
DOCKER_OPTS="-H unix:///var/run/docker.sock --bip=172.30.42.1/16 --dns=<管理节点ip> --insecure-registry goodrain.me --storage-driver=devicemapper --userland-proxy=false"
```

#### 2.1.5 配置镜像加速

```bash
mkdir /etc/docker/
cat > /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn/"]
}
EOF
```

#### 2.1.6 启动 docker

```bash
systemctl daemon-reload
systemctl enable docker
systemctl start docker
```

### 2.2 安装基础服务组件

#### 2.2.1 准备工作

```bash
mkdir -p /opt/rainbond/compose /opt/rainbond/bin/
docker run -it --rm -v /tmp/tools:/sysdir rainbond/cni:tools tar zxf /pkg.tgz -C /sysdir
cp -a /tmp/tools/bin/* /usr/bin/
docker run --rm -v /srv/salt/misc/file:/sysdir rainbond/cni:rbd_v3.6 tar zxf /pkg.tgz -C /sysdir
docker run --rm -v /srv/salt/misc/file:/sysdir rainbond/cni:k8s_v3.6 tar zxf /pkg.tgz -C /sysdir
cp -a /srv/salt/misc/file/bin/* /usr/local/bin/
cp -a /srv/salt/misc/file/cni/bin/* /opt/rainbond/bin/
```

#### 2.2.2 安装数据库服务

##### 2.2.2.1 拉取镜像配置docker-compose.yaml文件

```bash
# 拉取镜像
docker pull rainbond/rbd-db:3.6
# 更新配置docker-compose.yaml文件
cat > /opt/rainbond/compose/db.yaml <<EOF
version: '2.1'
services:
  rbd-db:
    image: rainbond/rbd-db:3.6
    container_name: rbd-db
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "true"
    volumes:
    - /opt/rainbond/data/rbd-db:/data
    - /opt/rainbond/etc/rbd-db:/etc/mysql
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF
```

##### 2.2.2.2 配置数据库文件

```bash
mkdir -p /opt/rainbond/data/rbd-db /opt/rainbond/etc/rbd-db/conf.d
wget https://raw.githubusercontent.com/goodrain/rainbond-install/v3.6/install/salt/db/mysql/files/charset.cnf -O /opt/rainbond/etc/rbd-db/conf.d/charset.cnf
wget https://raw.githubusercontent.com/goodrain/rainbond-install/v3.6/install/salt/db/mysql/files/my.cnf -O /opt/rainbond/etc/rbd-db/my.cnf
```

##### 2.2.2.3 启动数据库

```bash
dc-compose up -d rbd-db
```

##### 2.2.2.4 初始化数据库

```bash
docker exec rbd-db mysql -e "show databases"
# DBUSER gradmin DBPASS 可以用pwgen 8 1生成，如Adi1oefo
docker exec rbd-db mysql -e "grant all on *.* to 'gradmin'@'%' identified by 'Adi1oefo' with grant option;flush privileges"
docker exec rbd-db mysql -e "delete from mysql.user where user=''; flush privileges"
# 创建region & console数据库
docker exec rbd-db mysql -e "CREATE DATABASE IF NOT EXISTS region DEFAULT CHARSET utf8 COLLATE utf8_general_ci;"
docker exec rbd-db mysql -e "CREATE DATABASE IF NOT EXISTS console DEFAULT CHARSET utf8 COLLATE utf8_general_ci;"
```

#### 2.2.3 安装基础仓库服务

```bash
cat > /opt/rainbond/compose/base.yaml <<EOF
version: '2.1'
services:
  rbd-hub:
    image: rainbond/rbd-registry:2.3.1
    container_name: rbd-hub
    volumes:
    - /grdata/services/registry:/var/lib/registry
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
  rbd-repo:
    image: rainbond/rbd-repo:3.6
    container_name: rbd-repo
    volumes:
    - /grdata/services/artifactory-manage01:/var/opt/jfrog/artifactory
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
EOF

dc-compose up -d rbd-hub
dc-compose up -d rbd-repo
```

### 2.3 配置构建&默认插件镜像

```bash
docker pull rainbond/runner
docker tag rainbond/runner goodrain.me/runner
docker pull rainbond/builder
docker tag rainbond/builder goodrain.me/builder
docker pull rainbond/adapter:3.6
docker tag rainbond/adapter:3.6 goodrain.me/adapter
docker pull rainbond/pause-amd64:3.0
docker tag rainbond/pause-amd64:3.0 goodrain.me/pause-amd64:3.0
# 插件
docker pull rainbond/plugins:tcm
docker tag rainbond/plugins:tcm goodrain.me/tcm
docker pull rainbond/plugins:mesh
docker tag rainbond/plugins:mesh goodrain.me/mesh_plugin
```
