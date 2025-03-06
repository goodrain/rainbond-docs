---
title: PostgreSQL-HA High Available Cluster Deployment Scheme on Rainbond
description: PostgreSQL is an open-source relationship database management system that will describe the deployment and management of high-available clusters using Postgresql-repmgr + Pgpool on Rainbond to achieve Postprogresql implementation.
slug: postcongresql-ha
image: https://static.goodrain.com/wechat/pg-ha/pg-ha-banner.png
---

PostgreSQL is a popular open-source relationship database management system.It provides a standard SQL language interface to operate the database.

repmgr is an open source tool for PostgreSQL database copy management.It provides automated copy management, including：

- Incident detection and automatic failure switching：repmgr can detect primary server failure and automatically switch to backup server.
- Auto-failure recovery：repmgr can detect failures from the server and automatically rejoin the copying top.
- Multiple alternate servers：repmgr support multiple alternate servers that can be automatically switched to the most suitable alternate servers when the main server fails.
- Flexible copy extension of VBVBV：repmgr supports various copying panels, including single master and multi-master servers.
- Manage and monitor：repmgr provides tools and commands to manage and monitor PostgreSQL copies.

It can be said that repmgr is an extension module that simplifies the management and maintenance of PostgreSQL copies, improving the reliability and availability of the system.It is a very useful tool, especially for a production environment that requires high availability.And repmgr was also developed and maintained by the Postgresql community.

Pgpool is a high-performance connection pool and load balancer for PostgreSQL database.Pgpot can be used as an intermediate layer between clients and PostgreSQL servers to manage connection requests and be assigned to different PostgreSQL servers for processing to improve overall system performance and availability.Some of the main features of Pgpool include：

- The connection pool：Pgpool establishes a connection pool between the application and the database, allowing multiple applications to share a set of database connections, avoiding duplicated connections and disconnects.
- Load balance：Pgpool can evenly assign client requests to multiple PostgreSQL servers to achieve load balance and better performance.
- High availability of：Pgpool can detect failures in the PostgreSQL server and automatically re-route client requests to other available servers, thus improving system availability and stability.
- Parallel querying：Pgpool can split large queries into several subqueries, and then send these queries to multiple PostgreSQL servers in parallel to improve query performance.

**This paper will describe the deployment and management of high-available clusters using Postgresql-repmgr + Pgpool to achieve Postgresql on Rainbond**

<!--truncate-->

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

