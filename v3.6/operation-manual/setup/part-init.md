--- 
title: 初始化环境
summary: 初始化环境
toc: true 
---

## 一、基础部分

### 1.1 安装常用的工具

以下工具仅推荐安装,具体按需安装

```bash
# Centos 7
yum install -y iotop nload telnet htop lsof tree rsync lvm2 tar ntpdate wget net-tools git pwgen perl bind-utils dstat iproute bash-completion 
# Debian/Ubuntu
apt install -y iotop nload telnet htop lsof tree rsync lvm2 tar ntpdate wget net-tools git pwgen uuid-runtime iproute2 systemd dnsutils python-pip apt-transport-https 
```

### 1.2 创建用户

```bash
useradd -m -s /bin/bash -u 200 -g 200 rain
echo "rain ALL = (root) NOPASSWD:ALL" > /etc/sudoers.d/rain
chmod 0440 /etc/sudoers.d/rain
```

### 1.3 系统服务参数调整

#### 1.3.1 修改主机名

```bash
hostname manage01
echo manage01 > /etc/hostname
```

#### 1.3.2 调整文件描述符
```bash
# /etc/security/limits.conf 
root soft nofile 102400
root hard nofile 102400
* soft nofile 102400
* hard nofile 102400
* soft memlock unlimited
* hard memlock unlimited
* soft nproc 2048
* hard nproc 4096
# 查看参数
ulimit -a
```

#### 1.3.3 调整sysctl.conf配置

前者启用ipv4转发,后者调整支持elk

```bash
# /etc/sysctl.conf
net.ipv4.ip_forward = 1
vm.max_map_count = 262144
# 生效
sysctl -p /etc/sysctl.conf
```

#### 1.3.4 限制swap

```bash
# /etc/default/grub 新增
GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"

# 更新grub
grub2-mkconfig -o /boot/grub2/grub.cfg # centos
grub-mkconfig -o /boot/grub/grub.cfg # debian
```

#### 1.3.5 卸载禁用服务

需要禁用如下服务

```bash
firewalld nscd dnsmasq
# centos 需要卸载此工具包
container-selinux
```

如果可以确保,机器重启机器ip不发生改变,`dhclient`服务可不禁用.


## 二、管理节点部分

### 2.1 生成 key

源码构建需要

```bash
# 生成 key,如果有,则跳过生成
 ssh-keygen -t rsa -f /root/.ssh/id_rsa -P ""
# 将 key拷贝到指定路径
cp -a /root/.ssh/id_rsa /opt/rainbond/etc/rbd-chaos/ssh/builder_rsa
cp -a /root/.ssh/id_rsa.pub /opt/rainbond/etc/rbd-chaos/ssh/builder_rsa.pub

cat > /opt/rainbond/etc/rbd-chaos/ssh/config <<EOF
Host *
  IdentityFile ~/.ssh/builder_rsa
  StrictHostKeyChecking no
  LogLevel ERROR
EOF
```

### 2.2 域名生成

## 三、计算节点部分

