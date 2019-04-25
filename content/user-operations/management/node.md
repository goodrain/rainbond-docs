---
title: 节点管理(添加,删除,重置)
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1302
description: "节点管理:添加节点,删除节点,重置节点"
hidden: true
---

#### 添加节点

{{% notice note %}}
1. 安装节点时，请勿使用之前wget下载的grctl工具即(./grctl)，直接使用grctl命令。
2. 管理节点不支持批量扩容操作，只能依次扩容。
3. 管理节点数目推荐为奇数1,3,5,7，两个节点无法保证高可用。
4. 支持使用root执行安装操作

{{% /notice %}}

```bash
# 添加管理节点
grctl node add --host <managexx> --iip <管理节点内网ip> -p <root密码> --role manage 
## 法2默认已经配置ssh信任登陆
grctl node add --host <managexx> --iip <管理节点内网ip> --key /root/.ssh/id_rsa.pub --role manage

# 添加计算节点
grctl node add --host <computexx> --iip <计算节点内网ip> -p <root密码> --role compute
## 法2默认已经配置ssh信任登陆
grctl node add --host <computexx> --iip <计算节点内网ip> --key /root/.ssh/id_rsa.pub --role compute

# 安装节点，节点uid可以通过grctl node list获取
grctl node install <新增节点uid> 
# 确定计算节点处于health状态
grctl node up <新增节点uid> 

```

#### 删除计算节点

- 1. 当前支持删除计算节点，仅仅将计算节点从集群中移除,不会停计算节点上运行的服务

```
grctl node down  <被删除计算节点UUID>
grctl node delete <被删除计算节点UUID>
```

- 2. 重置计算节点(需要先从集群中删除)

```
# 慎重操作，默认会删除数据
ssh <被删除计算节点>
grctl reset
```

#### 删除管理节点

多管理节点时，需要注意etcd服务.

1. 先从etcd集群中移除需要删除的`etcdctl member remove <member id>`
2. 停管理节点服务 `grclis stop`
3. 卸载/grdata存储 `umount /grdata`
4. 重置节点 `grctl reset`
5. 如果多管理节点时需要手动清理etcd中已删除管理节点的数据 `ETCDCTL_API=3 etcdctl get /rainbond/endpoint --prefix`,具体可以参考[删除冗余数据](https://t.goodrain.com/t/topic/834/2)

{{% notice info %}}
如果单管理节点，多计算节点时，请勿操作否则会导致计算节点不可用
{{% /notice %}}


#### 重置节点

{{% notice warning %}}
当重置为计算节点时需要注意请勿删除grdata目录下数据
{{% /notice %}}

##### 重置计算节点

```bash
systemctl stop node
systemctl disable node
systemctl stop kubelet
systemctl disable kubelet
dps | grep goodrain.me | grep -v 'k8s' | awk '{print $NF}' | xargs -I {} systemctl disable {}
dps | grep goodrain.me | grep -v 'k8s' | awk '{print $NF}' | xargs -I {} systemctl stop {}
cclear
rm -rf /root/.kube/config
rm -rf /root/.rbd/grctl.yaml
rm -rf /tmp/*
rm -rf /usr/local/bin/grctl
rm -rf /usr/local/bin/node
# 删除镜像
docker images -q | xargs docker rmi -f
```

##### 重置管理节点

```bash
systemctl stop node
systemctl disable node
systemctl stop kubelet
systemctl disable kubelet
grclis stop
dps | grep goodrain.me | grep -v 'k8s' | awk '{print $NF}' | xargs -I {} systemctl disable {}
dps | grep goodrain.me | grep -v 'k8s' | awk '{print $NF}' | xargs -I {} systemctl stop {}
cclear
rm -rf /root/.kube/config
rm -rf /root/.rbd/grctl.yaml
rm -rf /tmp/*
rm -rf /usr/local/bin/grctl
rm -rf /usr/local/bin/node
rm -rf /opt/rainbond
rm -rf /grdata
rm -rf /grlocaldata
```