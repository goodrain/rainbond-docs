--- 
title: 部署NFS默认存储
summary: 部署默认存储NFS
toc: true 
---

## 一、服务端部署

### 1.1 部署NFS服务端

```bash
# centos 
yum install -y nfs-utils portmap
# debian
apt install -y nfs-kernel-server
```

### 1.2 配置NFS服务端

NFS服务的主配置文件为：`/etc/exports`

其文件内容格式：  
`<输出目录> [客户端1 选项（访问权限,用户映射,其他）] [客户端2 选项（访问权限,用户映射,其他）]`

```bash
mkdir /grdata
cat > /etc/exports <<EOF
/grdata *(rw,sync,no_root_squash,no_subtree_check)
EOF
```

### 1.3 开启NFS服务

```bash
# 设置开机自启
systemctl enable nfs-server
# 启动服务
systemctl start nfs-server
exportfs -ra
# 验证
showmount -e 127.0.0.1
```

## 二、客户端部署

### 2.1 安装客户端工具包

```bash
# centos 
yum install -y nfs-utils
# debian
apt install -y  nfs-common
```

### 2.2 挂载

```
# 创建目录
mkdir /grdata
# 配置挂载文件/etc/fstab
echo '192.168.1.1:/grdata /grdata nfs rw 0 0' >> /etc/fstab
# 挂载
mount -a
# 验证 
df -h
```

## 三、其他存储说明

### 3.1 Aliyun NAS存储

```
<url>:/   /grdata    nfs vers=3,nolock,noatime   0 0
```

### 3.2 GlusterFS

具体可以参见[存储-GlusterFS](../storage/GlusterFS/introduce.html)

## 四、salt部署存储

```bash
salt "*" state.sls storage
```