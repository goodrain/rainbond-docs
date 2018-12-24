--- 
title: 源码安装
summary: 源码安装云帮 
toc: true 
--- 


安装前请阅读[源码安装相关说明](https://github.com/goodrain/rainbond-ansible/tree/devel/docs/guide)  

通过执行ansible相关命令来执行安装

## 安装第一个节点

```
mkdir -pv /opt/rainbond
cd /opt/rainbond
git clone --depth 1 -b 5.0 https://github.com/goodrain/rainbond-ansible.git 
cd rainbond-ansible
# 更新默认配置文件 /opt/rainbond/rainbond-ansible/scripts/installer/global.sh，示例如下：

# 必须指定参数，且不可修改
INSTALL_TYPE="online"
DEPLOY_TYPE="onenode"

# IIP参数必须指定自己当前内网ip
POD_NETWORK_CIDR=""
NETWORK_TYPE="calico"
IIP="192.168.56.5"
EIP=""
DOMAIN=""

# 执行安装命令
./setup.sh

```

## 扩容节点

节点扩容, 请参照 [运维手册, 节点扩容](../operation-manual/cluster-management/add-node.html) 
