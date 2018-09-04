---
title: 安装最小化高可用集群
summary: 介绍一种符合第二级高可用的云帮架构
toc: true
---

##一、高可用分级

我们以用户应用不受影响为标准，将云帮的高可用分为三个等级：


- **第一级**： 随机计算节点宕机，用户的应用不受影响，或只受到一小段时间的影响。

- **第二级**： 管理节点全部宕机，用户的应用不受影响。
- **第三级**： 云帮平台各组件自身实现高可用。


## 二、云帮高可用现状

###2.1云帮高可用架构图
<img src="https://static.goodrain.com/images/docs/3.6/platform-maintenance/ha-deploy/Rainbond-Ha-Topology.png" width="100%"/>

- **当前等级**： 我们在经过了一系列测试之后，认识到云帮平台的高可用目前可以达到 **第二级** 即管理节点全部宕机，用户的应用不受影响。
- **限制短板**： 目前，由于rbd-db组件不支持高可用部署，云帮平台自身没有实现高可用。
- **未来发展**： 在下个版本，我们将使用分布式数据库代替传统数据库，解决其高可用问题。届时，将重新测试评估云帮高可用等级。

###2.2设计初衷

- 为了了解云帮平台更精确的高可用特性；以更实际、也更利于理解的方式让用户了解云帮平台的高可用。我们设计了此方案，用最少的节点，部署出符合 **第二级** 高可用等级的云帮平台。

- 然而在实际生产情景下，依然强烈推荐搭建管理节点高可用集群。本文所提出的架构，更多面向的是测试场景。

###2.3技术指标

- 部署环境

| 序号 | rainbond role | IP   | 存储 | 云帮组件 | 其他服务       |
| ---- | ------------- | ---- | ---- | -------- | -------------- |
| 1    | manage01      |      |      |          | k8s.etcd.      |
| 2    | compute01     |      | GFS  | rbd-lb   | kubelet.docker |
| 3    | compute02     |      | GFS  | rbd-lb   | kubelet.docker |

- 高可用组件介绍

  - GFS：是一个可扩展的[分布式文件系统](https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)，用于大型的、分布式的、对大量数据进行访问的应用。它运行于廉价的普通硬件上，并提供容错功能。它可以给大量的用户提供总体性能较高的服务。通过在计算节点挂载GFS分布式存储，实现存储方面的高可用。
  - rbd-lb：是云帮自研发的组件之一，用于实现外部访问应用的负载均衡，通过将它运行在管理节点以外，可以实现管理节点宕机情况下，外部依然可以访问应用。

###2.4 设计架构图

<img src="https://static.goodrain.com/images/docs/3.6/platform-maintenance/ha-deploy/minimal-arch.png" width="100%"/>

##三、部署流程

###3.1平台基本部署

部署单管理节点、双计算节点的rainbond平台：

- 安装单节点云帮平台：

  - 详情参见：[一键部署rainbond]( https://www.rainbond.com/docs/stable/getting-started/online-installation.html)

- 扩容计算节点：

  - 详情参见：[扩容计算节点](https://www.rainbond.com/docs/v3.5/getting-started/install.html#part-2c4b8d54ecfe5f5f)

###3.2部署GFS

在计算节点部署双节点GFS集群：

- 安装GFS：

  - 详情参见：[GlusterFS安装]( https://www.rainbond.com/docs/stable/operation-manual/storage/GlusterFS/install.html)

> 注意：将计算节点作为存储节点，需要将上方文档中的 server1、server2 更换为 compute01、compute02

- 切换存储

为管理节点安装GFS文件系统

```bash
yum install -y centos-release-gluster
yum install -y glusterfs-fuse
```
将管理节点的/grdata目录写入GFS

```bash
mount -t glusterfs compute01:data /mnt
cp -rp /grdata/* /mnt
umount /mnt
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

### 3.3配置rbd-lb、rbd-dns

修改rbd-lb组件的配置，需要修改rbd-entrance组件配置、自身配置文件、以及本地主机解析三个方面。修改rbd-dns配置，则需要修改kubelet的解析。

- 修改管理节点rbd-entrance配置

  ```bash
  vi /opt/rainbond/compose/plugin.yaml
  #修改- --plugin-opts=urls为计算节点的IP
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
      - --plugin-opts=urls=http://<compute01 IP>:10002-http://<compute02 IP>:10002
      - --kube-conf=/etc/goodrain/kubernetes/admin.kubeconfig
      - --log-level=info
      - --etcd-endpoints=http://10.211.55.4:2379
      - --run-mode=sync
      
  ```

- 将管理节点的lb.yaml以及base.yaml复制到计算节点

  ```bash
  scp /opt/rainbond/compose/lb.yaml compute01:/opt/rainbond/compose
  scp /opt/rainbond/compose/lb.yaml compute02:/opt/rainbond/compose
  mv /opt/rainbond/compose/lb.yaml /opt/rainbond/compose/lb.yaml.bak
  scp /opt/rainbond/compose/base.yaml compute01:/opt/rainbond/compose
  scp /opt/rainbond/compose/base.yaml compute02:/opt/rainbond/compose
  ```

- 将管理节点的配置文件目录拷贝到计算节点

  ```bash
  scp -rp /opt/rainbond/etc/rbd-lb/dynamics compute01:/opt/rainbond/etc/rbd-lb/dynamics
  scp -rp /opt/rainbond/etc/rbd-lb/dynamics compute02:/opt/rainbond/etc/rbd-lb/dynamics
  ```

- 在计算节点修改配置文件

  ```bash
  vi /opt/rainbond/etc/rbd-lb/dynamics/dynamic_servers/default.http.conf
  #将原文upstream修改如下
  upstream lang {
      server <manage01 IP>:8081;
  }
  
  upstream maven {
      server <manage01 IP>:8081;
  }
  
  upstream registry {
      server <manage01 IP>:5000;
  }
  ```

- 修改三个节点的/etc/hosts

  ```bash
  vi /etc/hosts
  #修改如下
  <manage01 IP> manage01 <host_UUID> kubeapi.goodrain.me region.goodrain.me console.goodrain.me
  
  <VIP> goodrain.me lang.goodrain.me maven.goodrain.me
  ```

- 修改计算节点base.yaml配置文件

```bash
#compute01&02
vi /opt/rainbond/compose/base.yaml
#仅保留如下段落
rbd-dns:
    image: rainbond/rbd-dns:3.6
    container_name: rbd-dns
    mem_limit: 1024M
   environment:
      - VERBOSE=true
    command:
    - --kubecfg-file=/etc/kubernetes/admin.kubeconfig
    - --v=3
    - --healthz-port=8089
    - --nameservers=8.8.8.8,1.2.4.8
    - --recoders=goodrain.me=10.141.161.106,*.goodrain.me=10.141.161.106
    volumes:
    - /opt/rainbond/etc/kubernetes/kubecfg:/etc/kubernetes
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
```

- 修改计算节点kubelet环境配置文件，更改dns解析参数

```bash
#compute01&02
vi /opt/rainbond/envs/kubelet.sh
#修改如下
HOST_UUID=13dd8356-1dd2-11b2-a30d-000000821800
DNS_SERVERS=10.141.161.107,10.141.161.108 #修改为两计算节点IP
HOST_IP=10.141.161.107
REG="false"
```

- 重新启动rainbond以及kubelet

```bash
#manage01
dc-compose up -d --remove-orphans
#compute01&02
dc-compose up -d 
systemctl restart kubelet
```

###3.4 配置VIP

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

