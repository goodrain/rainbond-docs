---
title: 三节点高可用部署方案
summary: 介绍三节点的高可用部署方案，达到第二级高可用
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、准备存储

`/grdata`目录是所有Rainbond节点都需要使用的共享目录，为了使Rainbond所有节点能够共享 `/grdata` 目录，需要提前准备共享存储。Rainbond支持 NFS、NAS、glusterfs等兼容nfs协议的共享存储形式，本文将使用glusterfs为例，搭建共享存储。

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

manage01 & compute01:

```bash
compute01:/data	/grdata	glusterfs	backupvolfile-server=compute02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

compute02:

```bash
compute02:/data	/grdata	glusterfs	backupvolfile-server=compute01,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

重新挂载

```bash
mount -a
```


## 二、基本平台部署

部署单管理节点、双计算节点的rainbond平台：

- 安装单节点云帮平台：

```bash
# 公网环境(阿里云，腾讯云等云上环境)可以指定公网ip参数 --eip <公网ip>, 可选
# 云帮版本，目前支持最新版本v5.1
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl
./grctl init --eip <公网ip> --rainbond-version <指定版本号，可选> --role master

# 初始化可选参数
--storage-type other
--storage-args "完成fstab挂载命令"
## 示例
./grctl init --iip <内网ip> --eip <公网ip> --rainbond-version <版本信息> --role master --storage-type other --storage-args "compute01:/data	/grdata	glusterfs	backupvolfile-server=compute02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0"
```

- 扩容计算节点：

```bash
grctl node add --host compute01 --iip <internal ip> -p <root pass> -r worker
grctl node add --host compute02 --iip <internal ip> -p <root pass> -r worker
```

- 手动迁移存储(未指定存储参数，可手动迁移)

```bash
# manage01停服务
grclis start 
cclear
dps
# 摘掉所有计算节点/grdata
umount /grdata
# 将数据迁移备份到GlusterFS
mv /grdata /grdata_old
mkdir /grdata
# manage01 新增 /etc/fstab
mount -a
cp -a /grdata_old/* /grdata/ #(确定grdata和grdata_old目录层级一致)
# 其他节点修复/etc/fstab,将nfs修改GlusterFS
mount -a
# 确定所有节点数据一致
# 启动管理管理节点服务
grclis start 
# 如果一致正常的话,节点都是health的
grctl node list 
```

- 离线部署基本平台

离线安装具体流程请参考[离线部署](../install/offline/setup.html#rainbond)

## 三、配置本地主机解析

- 修改三个节点的/etc/hosts

  ```bash
  vi /etc/hosts
  #修改如下
  <manage01 IP> manage01 <host_UUID> kubeapi.goodrain.me region.goodrain.me console.goodrain.me
  
  <VIP> goodrain.me lang.goodrain.me maven.goodrain.me
  ```

## 四、配置VIP

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
systemctl start keepalived
systemctl enable keepalived
```

- 切换应用域名解析IP到VIP

```bash
#在manage01节点执行,如果你是离线环境或者自定义域名可跳过此步骤，需要手动调整相关域名解析，原先解析管理节点改成vip即可。
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
  
# 五、部署完成后的引导

平台部署完成后，下面的文章可以引导你快速上手Rainbond。

<div class="btn-group btn-group-justified">
<a href="/docs/stable/getting-started/quick-learning.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">快速上手</a>
</div>
