---
title: PostgreSQL-HA 高可用集群在 Rainbond 上的部署方案
description: PostgreSQL 是开源关系型数据库管理系统，本文将介绍在 Rainbond 上使用 Postgresql-repmgr + Pgpool 实现 Postgresql 高可用集群的部署和管理。
slug: postgresql-ha
image: https://static.goodrain.com/wechat/pg-ha/pg-ha-banner.png
---

PostgreSQL 是一种流行的开源关系型数据库管理系统。它提供了标准的SQL语言接口用于操作数据库。

repmgr 是一个用于 PostgreSQL 数据库复制管理的开源工具。它提供了自动化的复制管理，包括：

- 故障检测和自动故障切换：repmgr 可以检测到主服务器故障并自动切换到备用服务器。
- 自动故障恢复：repmgr 可以检测到从服务器故障并自动将其重新加入到复制拓扑中。
- 多个备用服务器：repmgr 支持多个备用服务器，可以在主服务器故障时自动切换到最合适的备用服务器。
- 灵活的复制拓扑：repmgr 支持各种复制拓扑，包括单主服务器和多主服务器。
- 管理和监控：repmgr 提供了用于管理和监控PostgreSQL复制的各种工具和命令。

可以说 repmgr 是一个扩展模块，简化了 PostgreSQL 复制的管理和维护，提高系统的可靠性和可用性。它是一个非常有用的工具，特别是对于需要高可用性的生产环境。同时 repmgr 也是由 Postgresql 社区开发以及维护的。

Pgpool 是一个高性能的连接池和负载均衡器，用于 PostgreSQL 数据库。Pgpool 可以作为中间层，位于客户端和 PostgreSQL 服务器之间，来管理连接请求并分配给不同的 PostgreSQL 服务器进行处理，以提高整体的系统性能和可用性。Pgpool 的一些主要功能包括：

- 连接池：Pgpool在应用程序和数据库之间建立一个连接池，使得多个应用程序可以共享一组数据库连接，避免了重复的连接和断开。
- 负载均衡：Pgpool可以将客户端请求均衡地分配到多个PostgreSQL服务器上，以实现负载均衡和更好的性能。
- 高可用性：Pgpool可以检测到PostgreSQL服务器的故障，并自动将客户端请求重新路由到其他可用服务器，从而提高系统的可用性和稳定性。
- 并行查询：Pgpool可以将大型查询分成几个子查询，然后将这些子查询并行发送到多个PostgreSQL服务器上执行，以提高查询性能。

**本文将介绍在 Rainbond 上使用 Postgresql-repmgr + Pgpool 实现 Postgresql 高可用集群的部署和管理。**

## 架构

![](https://static.goodrain.com/wechat/pg-ha/postgresql-repmgr-pgpool.png)

当使用 Postgresql HA 集群时，应用只需连接 `pgpool` 即可。

- 通过 pgpool 实现读写分离，写入操作由 Master 执行，读取操作由 Slave 执行。
- 由 repmgr 实现流复制，Master 数据自动复制到 Slave。
- 当 Master 遇故障下线时，由 repmgr 自定选择 Slave 为 Master，并继续执行写入操作。
- 当某个节点遇故障下线时，由 pgpool 自动断开故障节点的连接，并切换到可用的节点上。

## 部署 Rainbond

安装 Rainbond，可通过一条命令快速安装 Rainbond，或选择 [基于主机安装](https://www.rainbond.com/docs/installation/install-with-ui/) 和 [基于 Kubernetes 安装](https://www.rainbond.com/docs/installation/install-with-helm/) Rainbond。

```bash
curl -o install.sh https://get.rainbond.com && bash ./install.sh
```

## 通过 Rainbond 开源应用商店部署 PostgreSQL 集群

Postgresql HA 集群已发布到 Rainbond 开源应用商店，可一键部署 Postgresql HA 集群。

登陆 Rainbond 控制台，进入 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `postgresql-ha` 并安装。

![](https://static.goodrain.com/wechat/pg-ha/postgresql-ha-store.png)

安装完成后的拓扑图如下。

![](https://static.goodrain.com/wechat/pg-ha/pg-store-topology.png)

### 配置 Pgpool 组件

1. 获取 PostgreSQL-repmgr 连接地址，进入 PostgreSQL-repmgr 组件的 Web 终端内。

```bash
env | grep REPMGR_PARTNER_NODES
```

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-env.png)

2. 将上述的内容复制出并修改成以下格式，然后进入 Pgpool 组件内，修改`PGPOOL_BACKEND_NODES` 环境变量，并更新组件。

```bash
0:pg-grde8ebc-0.pg-grde8ebc.dev.svc.cluster.local:5432,1:pg-grde8ebc-1.pg-grde8ebc.dev.svc.cluster.local:5432,2:pg-grde8ebc-2.pg-grde8ebc.dev.svc.cluster.local:5432
```

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-env2.png)

3. 验证集群，进入 Pgpool 组件的 Web 终端中。

```bash
# 连接 postgresql
PGPASSWORD=$PGPOOL_POSTGRES_PASSWORD psql -U $PGPOOL_POSTGRES_USERNAME -h localhost

# 查询集群节点
show pool_nodes;
```

status 字段均为 UP 即可。

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-webcli.png)

## 从零开始部署 PostgreSQL 集群

从零开始在 Rainbond 上部署 Postgresql HA 集群也是非常简单的，大致分为以下几个步骤：

- 基于镜像部署 PostgreSQL-repmgr 组件，并修改组件配置。
- 基于镜像部署 pgpool 组件，并修改组件配置。
- 建立组件之间的依赖关系。

镜像均采用 bitnami 制作的 [postgresql-repmgr](https://github.com/bitnami/containers/tree/main/bitnami/postgresql-repmgr) 和 [pgpool](https://github.com/bitnami/containers/tree/main/bitnami/pgpool)，因 bitnami 制作的镜像将很多配置文件都抽离成了环境变量，配置比较方便。

### 部署 PostgreSQL-repmgr 组件

#### 1. 创建组件

进入团队内 -> 新建组件 -> 基于镜像创建组件，应用、组件、英文名称等自定义即可，镜像填写 `bitnami/postgresql-repmgr:14.7.0`。

![](https://static.goodrain.com/wechat/pg-ha/repmgr-create.png)

#### 2. 修改组件类型

进入组件内 -> 其他设置，将组件部署类型修改为 `有状态服务`。

![](https://static.goodrain.com/wechat/pg-ha/repmgr-deploy-type.png)

#### 3. 添加环境变量

进入组件内 -> 环境变量，新增以下环境变量：

```bash
# 默认初始化的数据库
POSTGRESQL_DATABASE=initialize

# 创建普通用户和密码
POSTGRESQL_USERNAME=admin
POSTGRESQL_PASSWORD=admin@123

# 管理员 postgres 密码
POSTGRESQL_POSTGRES_PASSWORD=postgres@123

# repmgr 用户密码
REPMGR_PASSWORD=repmgrpass

# 初始化主节点的 HOST。Rainbond 控制台自动渲染 SERVICE_NAME 变量，获取当前 Statefulset 的控制器名称。
REPMGR_PRIMARY_HOST=${SERVICE_NAME}-0.${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local

# 集群中的所有节点，以逗号分隔
REPMGR_PARTNER_NODES=${SERVICE_NAME}-0.${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local,${SERVICE_NAME}-1.${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local,${SERVICE_NAME}-2.${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local
```

![](https://static.goodrain.com/wechat/pg-ha/repmgr-env.png)

进入组件内 -> 其他设置，添加 Kubernetes 属性，选择 env，添加以下内容：

```yaml
# repmgr 节点名称
- name: REPMGR_NODE_NAME
  value: "$(POD_NAME)"
# repmgr 节点网络名称
- name: REPMGR_NODE_NETWORK_NAME
  value: "$(POD_NAME).$(SERVICE_NAME).$(NAMESPACE).svc.cluster.local"
  
### "$(POD_NAME)" 用于定义 env 之间的相互依赖
```

![](https://static.goodrain.com/wechat/pg-ha/repmgr-env2.png)

#### 4. 添加组件存储

进入组件内 -> 存储，添加新的存储，存储路径为 `/bitnami/postgresql`，其他自定义即可。

#### 5. 启动组件

在组件视图内构建组件等待构建完成并启动。

#### 6. 修改组件实例数量

进入组件内 -> 伸缩，将组件实例数量设置为 `3`，等待所有实例启动即可。

### 部署 pgpool 组件

#### 1. 创建组件

进入团队内 -> 新建组件 -> 基于镜像创建组件，应用、组件、英文名称等自定义即可，镜像填写 `bitnami/pgpool:4.4.2`。

![](https://static.goodrain.com/wechat/pg-ha/pgpool-create.png)

#### 2. 添加环境变量

进入组件内 -> 环境变量，新增以下环境变量：

```bash
# pgpool admin 用户与密码
PGPOOL_ADMIN_USERNAME=admin
PGPOOL_ADMIN_PASSWORD=admin@123

# postgres 用户与密码
PGPOOL_POSTGRES_USERNAME=postgres
PGPOOL_POSTGRES_PASSWORD=postgres@123

# 用于执行流检查的用户和密码
PGPOOL_SR_CHECK_USER=admin
PGPOOL_SR_CHECK_PASSWORD=admin@123

# postgresql 后端节点。节点列表获取进入到 PostgreSQL-repmgr 组件的 Web 终端内，使用 env | grep REPMGR_PARTNER_NODES 命令获取，然后修改为以下格式
PGPOOL_BACKEND_NODES=0:postgresql-ha-repmgr-0.postgresql-ha-repmgr.dev.svc.cluster.local:5432,1:postgresql-ha-repmgr-1.postgresql-ha-repmgr.dev.svc.cluster.local:5432,2:postgresql-ha-repmgr-2.postgresql-ha-repmgr.dev.svc.cluster.local:5432
```

![](https://static.goodrain.com/wechat/pg-ha/pgpool-env.png)

#### 3. 添加依赖

在应用视图，将 pgpool 组件依赖至 PostgreSQL-repmgr 组件。

![](https://static.goodrain.com/wechat/pg-ha/pgpool-topology.png)

#### 4. 启动组件

在 pgpool 组件视图内构建组件等待构建完成并启动。

#### 5. 验证集群

进入 Pgpool 组件的 Web 终端中，输入以下命令验证集群：

```bash
# 连接 postgresql
PGPASSWORD=$PGPOOL_POSTGRES_PASSWORD psql -U $PGPOOL_POSTGRES_USERNAME -h localhost

# 查询集群节点
show pool_nodes;
```

status 字段均为 UP 即可。

![](https://static.goodrain.com/wechat/pg-ha/pgpool-checkcluster.png)

## 最后

### 外部连接

如想使用本地工具连接到 postgresql，可在 pgpool 组件的端口内打开对外服务端口，通过该端口连接到 postgresql，默认用户密码为 `postgres/postgres@123`。

### 验证高可用集群

为了保障高可用集群，Kubernetes 集群至少有 3 个节点，且底层存储使用分布式存储，如没有分布式存储，需将 Postgresql 存储切换为本地存储也可保障高可用集群的数据。可通过以下方式进行高可用集群验证：

- 通过 Pgpool 连接后，创建数据库并写入数据，再进入 PostgreSQL-repmgr 组件的 Web 终端内查询每个实例是否都有数据。
- 挂掉主节点，验证是否主节点自动切换并可正常连接并写入。
