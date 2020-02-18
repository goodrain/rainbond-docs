---
title: grctl命令行工具
description: Rainbond CLI工具集
hidden: true
---

### 安装命令行工具

   命令行工具(grctl)提供一些便于Rainbond运维的工具命令，在`5.2.0`版本该工具不再内置，如有使用，需提前安装安装此命令；用户需进入集群管理节点，在该节点进行以下操作。
   
   该节点必须具备以下条件：

1. 具有kubectl命令，且可用。
2. 存在访问Kubernetes集群的 ~/.kube/conf文件。


安装方式：

```shell
docker run -it --rm -v /:/rootfs registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:V5.2-dev copy
mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl && /usr/local/bin/grctl install
```

若输出`Install success`则安装成功。


### 功能特性

 grctl命令是rainbond自主开发的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <应用别名> -t <团队别名>` 查看应用详情<br>`grctl service list -t <团队别名>` 列出应用信息<br>`grctl tenant list`列出所有团队<br>`grctl tenant get <团队别名>`列出该团队所有应用<br>`grctl tenant res <团队别名>`该团队使用资源 |
|集群节点控制|<br>`grctl cluster` 查看集群情况<br>`grctl node list` 查看集群节点列表<br>`grctl node get <UID>`查看节点状态<br>`grctl  node cordon <UID>`将某个节点设置为不可调度<br>`grctl  node uncordon <UID>`恢复某个节点的调度<br>`grctl node resource`查看集群资源使用情况<br>`grctl node condition`节点condition<br>|


> 更多信息可通过`grctl -h`命令获取

### 集群管理

- 查看集群信息

```bash
grctl  cluster
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-cluster.png" width="70%" />

- 列出集群节点信息

```bash
grctl node list
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-node-list.png" width="70%" />


| 标识  | 注释 |                                                   
| ----| ---- | 
| UID|节点唯一标识 |
|IP | 节点IP|
|HostName |主机名 |
|NodeRole|节点属性|
|Status|节点状态|

- 获取某个节点的详细信息

```bash
grctl node get <UID>
```

- 禁止/允许调度到某个节点

```bash
# 禁止调度到某个节点
grctl node cordon <UID>

# 允许调度到某个节点
grctl node uncordon <UID>
```

### 应用管理

- 在命令行获取命令的详细信息，在应用的`伸缩`界面复制`查询命令`，在服务器上粘贴，即可查看当前应用的详细信息


```bash
grctl service get grf2ebfd -t b40hkf9y
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-server-get.png" width="70%" />


