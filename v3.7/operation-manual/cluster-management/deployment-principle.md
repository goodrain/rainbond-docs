---
title: 集群部署原理
summary: rainbond集群部署原理
toc: true
---

## 使用Salt配置安装Rainbond

目前是通过SaltStack实现自动化部署Rainbond。
主要流程如下：

1. 通过salt-ssh 安装salt-master,salt-minion。
2. 通过salt-master下发安装任务;salt-minion执行安装任务,最终将任务执行结果返回给salt-master。
3. 相关任务示例如下：


```bash
管理节点任务: init,storage,docker,base_services,etcd,node,network,kubernetes,plugins
计算节点任务: init,storage,docker,etcd-proxy,network,kubernetes,node
```

具体任务可以参见[rainbond-install](https://github.com/goodrain/rainbond-install/tree/v3.6/install/salt)

![](https://static.goodrain.com/images/docs/3.6/operation-manual/setup/salt-install.png)

