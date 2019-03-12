---
title: "添加节点"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1302
---

{{% notice note %}}
1. 安装节点时，请勿使用之前wget下载的grctl工具即(./grctl)，直接使用grctl命令。
2. 管理节点不支持批量扩容操作，只能依次扩容。
3. 管理节点数目推荐为奇数1,3,5,7，两个节点无法保证高可用。
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
