---
title: 扩容节点
summary: 扩容管理或计算节点
toc: true
---

## 一、 命令行模式

```
# 添加管理节点
grctl node add --host manage01 --iip <管理节点ip> -p <root密码> --role master 
## 法2默认已经配置ssh信任登陆
grctl node add --host manage01 --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role master

# 添加计算节点
grctl node add --host compute01 --iip <计算节点ip> -p <root密码> --role worker
## 法2默认已经配置ssh信任登陆
grctl node add --host compute01 --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role worker


# 安装节点，节点uid可以通过grctl node list获取
grctl node install <新增节点uid> 
# 确定节点状态为health后上线节点
grctl node up <新增节点uid>
```

## 二、 通过源码的方式

### 2.1 准备工作


```bash
# 在ansible控制节点，修改/opt/rainbond/rainbond-ansible/inventory/hosts文件
如新增多个计算节点, compute01 需要配置相关密码，manage02 需要提前配置ssh信任
[all]
manage01 ansible_host=192.168.56.3 ip=192.168.56.3 ansible_user=root ansible_ssh_pass=12345678 ansible_become=true
compute01 ansible_host=192.168.56.4 ip=192.168.56.4 ansible_user=root ansible_ssh_pass=12345678 ansible_become=true
manage02 ansible_host=192.168.56.5 ip=192.168.56.5

[deploy]
manage01 NTP_ENABLED=no

[etcd]
manage01 NODE_NAME=etcd1

[master]
manage01

[worker]
manage01

[storage]
manage01

[lb]
manage01

[new-master]
manage02

[new-worker]
compute01
```

### 2.2 扩容管理节点

{{site.data.alerts.callout_danger}}

- 管理节点不支持批量扩容操作，只能依次扩容。
- 管理节点数目推荐为奇数1,3,5,7。两个节点无法保证高可用
  
{{site.data.alerts.end}}

```bash
cd /opt/rainbond/rainbond-ansible
ansible-playbook -i inventory/hosts addmaster.yml
```


### 2.3 扩容计算节点


```bash

# 扩容节点
cd /opt/rainbond/rainbond-ansible
ansible-playbook -i inventory/hosts addnode.yml
```

## 三、 管理后台添加

- 添加节点

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node1.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node1.png" width="100%"  /></a>

- 编辑节点属性

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node2.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/add-node2.png" width="100%"  /></a>
