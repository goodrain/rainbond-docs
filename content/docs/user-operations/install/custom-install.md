---
title: "自定义部署方案"
weight: 1006
description: "此方式适用于熟悉ansible使用的用户"
hidden: true
---

#### 如何自定义安装部署方案

- step 1: fork [rainbond-ansible](https://github.com/goodrain/rainbond-ansible.git)项目
- step 2: 通过修改fork后的rainbond-ansible项目来自定义自己的需求
- step 3: 安装时指定rainbond-version(分支名或tag),rainbond-repo(rainbond-ansible fork项目路径)

#### 简析rainbond-ansible结构

```
|-- addmaster.yml # 添加管理节点ansible-playbook
|-- addnode.yml   # 添加计算节点ansible-playbook
|-- ansible.cfg
|-- callback_plugins
|-- inventory
|   |-- hosts
|-- log
|-- roles
|   |-- bootstrap # 系统配置
|   |-- db # 数据库rbd-db
|   |-- docker # 安装docker
|   |-- etcd # 管理节点配置etcd
|   |-- etcd-proxy # 计算节点配置etcd-proxy
|   |-- health # 服务health检查配置
|   |-- image # 下载离线镜像包 & 解压镜像包 & 加载镜像
|   |-- kube-master # k8s管理节点
|   |-- kube-worker # k8s计算节点
|   |-- lb # 网关服务rbd-gateway
|   |-- master # Rainbond核心组件配置
|   |-- network_plugin # 集群网络插件calico等
|   |-- node # node服务配置
|   |-- nodeinit # 初始化数据中心，仅在第一个节点执行
|   |-- nodeup # 上线节点, 仅在第一个节点执行
|   |-- prepare # 准备工作
|   |-- rainvar # 全局配置(setup.sh会根据global.sh或default.sh来调整rainvar配置)
|   |-- storage # 存储
|   |-- thirdparty # 对接已有k8s集群
|   `-- upgrade # 升级
|-- scripts
|   |-- installer
|   |   |-- default.sh # 全局默认配置参数，仅setup.sh调用,优先级低于global.sh
|   |   |-- functions.sh # 基本函数, 仅setup.sh调用
|   |   |-- global.sh # grctl init时生成,是参数配置，仅setup.sh调用
|   |   `-- global.sh.example # 手动安装时global.sh示例
|   |-- node.sh # 添加节点脚本目录
|   `-- upgrade # 升级脚本目录
|-- setup.sh     # 初始化第一个节点prepare脚本
|-- setup.yml    # 初始化第一个节点ansible-playbook
|-- upgrade.yml  # 升级节点ansible-playbook
`-- version
```