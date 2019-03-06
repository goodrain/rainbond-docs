---
title: 五节点+高可用部署方案
summary: 介绍五节点+的高可用部署方案，达到第二级高可用
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、准备存储

`/grdata`目录是所有Rainbond节点都需要使用的共享目录，为了使Rainbond所有节点能够共享 `/grdata` 目录，需要提前准备共享存储。Rainbond支持 NFS、NAS、glusterfs等兼容nfs协议的共享存储形式，本文将使用GlusterFS为例，搭建共享存储。

在计算节点部署双节点GlusterFS集群：

- 安装GlusterFS：

  - 详情参见：[GlusterFS安装](../storage/GlusterFS/install.html)

> 注意：将计算节点作为存储节点，需要将上方文档中的 server1、server2 更换为 compute01、compute02

- 切换存储

为管理节点安装GlusterFS文件系统

```bash
yum install -y centos-release-gluster
yum install -y glusterfs-fuse
```

编辑所有节点的/etc/fstab,新增一行：

```bash
compute01:/data	/grdata	glusterfs	backupvolfile-server=compute02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

重新挂载

```bash
#在所有节点执行
mount -a
```

## 二、基本平台部署

- 按正常顺序部署管理节点3个、计算节点2+个(管理节点不支持批量安装，只能依次按照顺便安装)

```bash
# 公网环境(阿里云，腾讯云等云上环境)可以指定公网ip参数 --eip <公网ip>, 可选
# 云帮版本，目前支持最新版本v5.1
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl
./grctl init --eip <公网ip> --rainbond-version <指定版本号，可选> --role master

#add second manage node
grctl node add --hostname manage02 --iip <内网ip> --root-pass <root用户密码> --role master

#add 3st manage node 
grctl node add --hostname manage03 --iip <内网ip> --root-pass <root用户密码> --role master

#add the first compute node
grctl node add --hostname compute01 --iip <内网ip> --root-pass <root用户密码> --role worker

#add the second compute node
grctl node add --hostname compute02 --iip <内网ip> --root-pass <root用户密码> --role worker

```

- 离线部署基本平台

离线安装具体流程请参考[离线部署](../install/offline/setup.html#rainbond)

## 三、配置VIP

在两个计算节点配置VIP，搭建基于keepalived软件的主备机制

- 安装keepalived

```bash
yum install -y keepalived
```

- 修改配置文件

```bash
#备份原有配置文件
cp /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf.bak
#编辑配置文件如下
#compute01
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}

vrrp_instance VI_1 {
    state MASTER   #角色，当前为主节点
    interface ens6f0  #网卡设备名，通过 ifconfig 命令确定
    virtual_router_id 51
    priority 100   #优先级，主节点大于备节点
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>
    }
}

#compute02
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}

vrrp_instance VI_1 {
    state BACKUP   #角色，当前为备节点
    interface ens6f0   #网卡设备名，通过 ifconfig 命令确定
    virtual_router_id 51
    priority 50   #优先级，主节点大于备节点
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>
    }
}


#启动服务，设置开机自启动
systemctl start keeplived
systemctl enable keeplived
```

- 切换应用域名解析IP到VIP

```bash
#在manage01节点执行
grctl domain --ip <VIP>
```

- 修改tcpdomain

```bash
#在manage01节点执行
din rbd-db   #进入rbd-db组件
mysql        #进入数据库
use console; #使用console数据库
UPDATE region_info set tcpdomain="<VIP>"; #更新tcpdomain
```

- 调整rbd-entrance设置

```bash
#修改配置，使平台应用负载均衡规则在计算节点（负载均衡节点）上正确生成
#管理节点执行
vi /opt/rainbond/conf/master.yaml
#修改rbd-entrance配置段落
- name: rbd-entrance
  endpoints:
  - name: ENTRANCE_ENDPOINTS
    protocol: http
    port: 6200
  health:
    name: rbd-entrance
    model: http
    address: 127.0.0.1:6200/health
    time_interval: 5
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-entrance
  start: >-
    docker run --name rbd-entrance
    --network host
    -e DEFAULT_HTTP_PORT=80
    -e DEFAULT_HTTPS_PORT=443
    -v /opt/rainbond/etc/kubernetes/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg
    -i goodrain.me/rbd-entrance:3.7.2
    --plugin-name=openresty
    --plugin-opts=urls=http://compute01IP:10002-http://compute02IP:10002   #手动修改此处
    --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig
    --log-level=debug
    --etcd-endpoints=${ETCD_ENDPOINTS}
    --run-mode=sync
  stop: docker stop rbd-entrance
  restart_policy: always
  restart_sec: 10

#修改完成后重启服务
systemctl restart node
systemctl restart rbd-entrance

```

## 四、配置本地主机解析

- 修改5个节点的/etc/hosts

  ```bash
  vi /etc/hosts
  #修改如下
  <manage01 IP> manage01 <host_UUID> kubeapi.goodrain.me region.goodrain.me console.goodrain.me
  
  <VIP> goodrain.me lang.goodrain.me maven.goodrain.me
  ```

## 五、添加rbd-lb配置

- 修改compute01-02的rbd-lb组件配置

```bash
vi /opt/rainbond/etc/rbd-lb/dynamics/dynamic_servers/default.http.conf
#修改如下

upstream lang {
    server <manage01_IP>:8081;
    server <manage02_IP>:8081;
    server <manage03_IP>:8081;
}

upstream maven {
    server <manage01_IP>:8081;
    server <manage02_IP>:8081;
    server <manage03_IP>:8081;
}

upstream registry {
    ip_hash;
    server <manage01_IP>:5000;
    server <manage02_IP>:5000;
    server <manage03_IP>:5000;
}
upstream rbd-api {
    server <manage01_IP>:6060;
    server <manage02_IP>:6060;
    server <manage03_IP>:6060;
}

server {
    listen 6060;
    proxy_pass rbd-api;
    proxy_connect_timeout 60;
    proxy_read_timeout 600;
    proxy_send_timeout 600;
}

server {
    listen 80;
    server_name lang.goodrain.me;
    rewrite ^/(.*)$ /artifactory/pkg_lang/$1 break;
    location / {
        proxy_pass http://lang;
        proxy_set_header Host $host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 60;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
    }
}

server {
    listen 80;
    server_name maven.goodrain.me;
    location / {
        rewrite ^/(.*)$ /artifactory/libs-release/$1 break;
        proxy_pass http://maven;
        proxy_set_header Host $host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 60;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
    }

    location /monitor {
        return 204;
    }
}

server {
    listen 443;
    server_name goodrain.me;
    ssl on;
    ssl_certificate /usr/local/openresty/nginx/conf/dynamics/dynamic_certs/goodrain.me/server.crt;
    ssl_certificate_key /usr/local/openresty/nginx/conf/dynamics/dynamic_certs/goodrain.me/server.key;
    client_max_body_size 0;
    chunked_transfer_encoding on;
    location /v2/ {
        proxy_pass http://registry;
        proxy_set_header Host $http_host; # required for docker client's sake
        proxy_set_header X-Real-IP $remote_addr; # pass on real client's IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 900;
    }
}
# repo.goodrain.me
server {
    listen 80;
    root /opt/rainbond/install/install/pkgs/centos/;
    server_name repo.goodrain.me;

}

```

## 六、数据库处理

- 当前方案的rbd-db组件依然默认使用了mysql数据库，为了使之拥有高可用特性，推荐使用mysql推荐的高可用方案部署多主分布式集群。

- Rainbond计划在将来使用分布式数据库Cockroachdb代替mysql充当平台数据库。受限于docker化的分布式数据库Cockroachdb并不稳定，这一改动还需要长期的优化与测试。

## 七、部署完成后的引导

平台部署完成后，下面的文章可以引导你快速上手Rainbond。

<div class="btn-group btn-group-justified">
<a href="/docs/stable/getting-started/quick-learning.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">快速上手</a>
</div>