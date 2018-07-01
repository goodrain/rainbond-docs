---
title: 创建Docker存储设备
summary: 创建Docker存储设备
toc: false
toc_not_nested: false
asciicast: true
---

<div id="toc"></div>

##配置Docker的devicemapper(direct-lvm)

###1.安装lvm2

```bash
# ubuntu
apt-get install lvm2
 
# centos
yum install lvm2
```

###2.创建PV

```bash
# 先查看一下预分配的磁盘名
fdisk -l
 
# 在这个示例中是 /dev/vdb 这个设备
Disk /dev/vda: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x0008e3b4
   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048   209713151   104855552   83  Linux
Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
 
 
# 创建pv
pvcreate /dev/vdb
  Physical volume "/dev/vdb" successfully created.
```

###3.创建VG

```bash
vgcreate docker /dev/vdb
 Volume group "docker" successfully created
```

###4.查看VG信息

```bash
vgdisplay docker
  --- Volume group ---
  VG Name               docker
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               100.00 GiB
  PE Size               4.00 MiB
  Total PE              25599
  Alloc PE / Size       0 / 0
  Free  PE / Size       25599 / 100.00 GiB
  VG UUID               4sW1dh-4i2Z-cJM0-es3b-2hbv-0oji-t4ZfRO
```

###5.创建thinpool，数据LV的大小为VG的95%

```bash
lvcreate --wipesignatures y -n thinpool docker -l 95%VG
  Logical volume "thinpool" created.
```

###6.创建pool，元数据的大小为VG的1%

```bash
lvcreate --wipesignatures y -n thinpoolmeta docker -l 1%VG
  Logical volume "thinpoolmeta" created.
```

###7.转换pool为thinpool格式

```bash
lvconvert -y --zero n -c 512K --thinpool docker/thinpool --poolmetadata docker/thinpoolmeta
  WARNING: Converting logical volume docker/thinpool and docker/thinpoolmeta to thin pool's data and metadata volumes with metadata wiping.
  THIS WILL DESTROY CONTENT OF LOGICAL VOLUME (filesystem etc.)
  Converted docker/thinpool to thin pool.
```

###8.调整lvm配置

```bash
vi /etc/lvm/profile/docker-thinpool.profile
activation {
    thin_pool_autoextend_threshold=80
    thin_pool_autoextend_percent=20
}
```

###9.lvchange应用配置

```bash
lvchange --metadataprofile docker-thinpool docker/thinpool
  Logical volume docker/thinpool changed.
```

###10.查看卷信息，验证monitord的状态

```bash
lvs -o+seg_monitor
  LV       VG     Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert Monitor
 thinpool docker twi-a-t--- 95.00g             0.02   0.01                             monitored
```

##修改Docker配置

```bash
vi /etc/goodrain/envs/docker.sh
DOCKER_OPTS="-H 0.0.0.0:2376 \
-H unix:///var/run/docker.sock \
--bip=172.30.42.1/16 \
--insecure-registry goodrain.me \
--storage-driver=devicemapper \
--storage-opt=dm.thinpooldev=/dev/mapper/docker-thinpool \
--storage-opt=dm.use_deferred_removal=true \
--storage-opt=dm.use_deferred_deletion=true \
--userland-proxy=false"
```

##重启Docker

```bash
systemctl restart docker
```

##查看lvmz状态

```bash
# 查看服务状态
journalctl -fu dm-event.service
# 查看对应的设备
lsblk -I '253' |grep -v vdb
```