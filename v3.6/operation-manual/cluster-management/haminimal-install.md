---
title: 安装最小化高可用集群
summary: 介绍一种符合第二级高可用的云帮架构
toc: false
---
<div id="toc"></div>

##一、设计初衷

我们以用户应用不受影响为标准，将云帮的高可用分为三个等级：

- **第一级**： 随机计算节点宕机，用户的应用不受影响，或只受到一小段时间的影响。
- **第二级**： 管理节点全部宕机，用户的应用不受影响。
- **第三级**： 云帮平台各组件自身实现高可用。

单节点部署rainbond，只具备demo演示功能，并不具备高可用、高性能的生产要求。故而设计了这种 **单管理节点，双计算节点** 的部署方式。这种部署部署方式在使用了最少节点的情况下， 达成 **第二级** 高可用特性。

## 二、架构设计

###2.1设计思想

- **负载均衡**：将rainbond中负责应用负载均衡的组件rbd-lb部署在两个计算节点上，这可以避免管理节点宕机后，应用无法访问的问题。
- **VIP**：通过在两个计算节点上部署VIP，可以实现rbd-lb组件本身的高可用。即使任意计算节点宕机，应用依然可以被访问。
- **存储设计**：通过在计算节点部署双节点GFS存储，解决集群共享存储依赖于单个管理节点的短板。即使管理节点宕机，应用的存储依然可用。

###2.2架构图
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

- 切换存储

为管理节点安装GFS文件系统

```bash
yum install -y centos-release-gluster
yum install -y glusterfs-fuse
```
将管理节点的/grdata目录写入GFS

```bash
mount -t glusterfs compute01:gv0 /mnt
cp -rp /grdata /mnt
umount /mnt
```
编辑所有节点的/etc/fstab,新增一行：

manage01 & compute01:
```bash
compute01:/gv0	/grdata	glusterfs	backupvolfile-server=compute02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```
compute02:
```bash
compute02:/gv0	/grdata	glusterfs	backupvolfile-server=compute01,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

重新挂载

```bash
mount -a
```

### 3.3配置rbd-lb

- 修改 yaml 文件

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

  - 将管理节点的lb.yaml复制到计算节点
  ```bash
  scp /opt/rainbond/compose/lb.yaml compute01:/opt/rainbond/compose
  scp /opt/rainbond/compose/lb.yaml compute02:/opt/rainbond/compose
  mv /opt/rainbond/compose/lb.yaml /opt/rainbond/compose/lb.yaml.bak
  ```
- 修改配置文件
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

- 重新启动rainbond
```bash
dc-compose up -d --remove-orphans
```

###3.4 配置VIP

在两个计算节点配置VIP

- 获取vrrpd

```bash
docker cp rbd-lb:/usr/local/bin/vrrpd /usr/local/bin
```


- 编辑启动脚本，并设置开机运行

```bash
vi /opt/rainbond/scripts/vrrpd.sh
#输入如下内容
/usr/local/bin/vrrpd -i eth0 -v 1 <VIP> -I <VIP> -O <VIP所在网络段的网关>

chmod +x /opt/rainbond/scripts/vrrpd.sh

vi /etc/rc.local
#输入如下内容
./opt/rainbond/scripts/vrrpd.sh
```

- 加载模块，并配置开机加载

```bash
#加载模块
modprobe ip_vs
#开机加载模块
vi /etc/sysconfig/modules/ip_vs.modules
#输入如下内容
/sbin/modprobe ip_vs
```

- 开启vrrpd工具

```bash
/usr/local/bin/vrrpd -i eth0 -v 1 <VIP> -I <VIP> -O <VIP所在网络段的网关>
#另一台节点该命令参数 -v 2
```



- 切换应用域名解析IP到VIP

```bash
#在manage01节点执行
grctl domain --ip <VIP>
```

