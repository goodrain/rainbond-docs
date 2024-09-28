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

## Architecture

![](https://static.goodrain.com/wechat/pg-ha/postcongresql-repmgr-pgpool.png)

When using Postgresql HA cluster, the app simply needs to connect to `pgpool`.

- Separate reading and writing with pgpool. Writing is performed by Master, read by Slave.
- Copied from repmgr stream, Master data is automatically copied to Slave.
- When Master failure is offline, repmgr chooses Slave to Master, and continues writing operations.
- When a node is offline, automatically disconnects the failure node from pgpool and switches to available nodes.

## Deployment of Rainbond

Install Rainbond, quickly install Rainbond, or select [基于主机安装](https://www.rainbond.com/docs/installation/installation/install-with-ui/) and [based on Kubernetes installation] (https://www.rainbond.com/docs/installation/installation/installation-with-helm/).

```bash
curl -o install.sh https://get.rainbond.com && cash ./install.sh
```

## Deploy PostgreSQL cluster via Rainbond Open Source Store

Postgresql HA cluster has been posted to Rainbond Open Source Store with one click to deploy Postgresql HA cluster.

Sign in to the Rainbond Console to search for and install the `postcongresql-ha` in **Platform Manager -> Marketplace -> Open Source Store**.

![](https://static.goodrain.com/wechat/pg-ha/postcongresql-ha-store.png)

The sketch after installation is completed is set out below.

![](https://static.goodrain.com/wechat/pg-ha/pg-store-topology.png)

### Configure Pgpool components

1. Gets the PostgreSQL-repmgr connection address into the PostgreSQL-repmgr component of the web terminal.

```bash
env | grep REPMGR_PARTNER_NODES
```

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-env.png)

2. Copy and modify the above to the following format, then enter the Pgpool component, modify the `PGPOOL_BACKEND_NODES` environment variable, and update the component.

```bash
0:pg-grde8ebc-0.pg-grde8ebc.dev.svc.cluster.local:5432,1:pg-grde8ebc-1.pg-grde8ebc.dev.svc.cluster.local:5432,2:pg-grde8ebc-2.pg-grde8ebc.dev.svc.cluster.local:5332
```

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-env2.png)

3. Verify cluster, enter the Web Terminal of the Pgpool component.

```bash
# 连接 postgresql
PGPASSWORD=$PGPOOL_POSTGRES_PASSWORD psql -U $PGPOOL_POSTGRES_USERNAME -h localhost

# 查询集群节点
show pool_nodes;
```

The status field is UP sufficient.

![](https://static.goodrain.com/wechat/pg-ha/store-pgpool-webcli.png)

## PostgreSQL cluster deployed from zero

It is also very simple to deploy Postgresql HA clusters from scratch in Rainbond along the lines of the following steps：

- Deploy the PostgreSQL -repmgr component based on mirrors, and modify component configuration.
- Deploy a pgpool component based on mirrors, and modify component configuration.
- Create dependencies between components.

The mirrors are based on [postgresql-repmgr](https://github.com/bitnami/containers/tree/main/bitnami/postprogresql-repmgr) and [pgpool](https://github.com/bitnami/containers/tree/bitnami/pgpool), and many configuration files have been drawn from the bitnami mirror, which is easier to configure.

### Deploy PostgreSQL - repmgr component

#### 1. Create Component

Enter the team -> New Component -> Create a component based on a mirror, the app, component, English name, etc. to fill `bitnami/postcongresql-repmgr:14.7.0`.

![](https://static.goodrain.com/wechat/pg-ha/repmgr-cree.png)

#### 2. Modify component type

Go to component -> Other settings to change component deployment type to \`state-service'.

![](https://static.goodrain.com/wechat/pg-ha/repmgr-deemploy-type.png)

#### 3. Add Environment Variables

Enter the component -> Environment Variable, add the following environment variable：

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

Enter the component -> Other settings, add Kubernetes properties, select env, add the following：

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

#### 4. Add Component Storage

Enter -> Storage, add new storage, path `/bitnami/postprogresql`, other customizations.

#### 5. Start Component

Build a component in the component view waiting for it to be built and started.

#### 6. Modify component instance count

Enter the component -> Scale, set the number of component instances to `3`, waiting for all instances to start.

### Deploy pgpool component

#### 1. Create Component

Enter the team -> New Component -> Create a component based on a mirror, you can customize the app, component, English name, etc. Mirror fill `bitnami/pgpool:4.4.2`.

![](https://static.goodrain.com/wechat/pg-ha/pgpool-cree.png)

#### 2. Add Environment Variables

Enter the component -> Environment Variable, add the following environment variable：

```bash
# pgpot admin and password
PGPOOL_ADMIN_USERNAME=admin
PGPOOL_ADMIN_PASSWORD=admin@12

# postgres users and passwords
PGPOOL_POSTGRES_USERNAME=postgres
PGPOOLOL_POSTGRES_PASSRORD=post123

# Users and password
PGPOOL_SER_CHECK_USER=admin
PGPOOOL_CHECK_PASSWORD=admin@123

# postgraduql backend node. The node lists get into the PostgreSQL-repmgr component, Get it with the env | grep REPMGR_PARTNER_NODES command, then modify it to the following format
PGPOOL_BACKEND_NODES=0:postcongresql-ha-repmgr-0. ostgresql-ha-repmgr.dev.svc.cluster.local:5432,1: postcongresql-ha-repmgr-1.postcongresql-ha-repmgr.dev.svc.cluster.local:5432,2:postprogresql-ha-repmgr-2.postgresql-ha-repmgr-1.dev.svc.cluster.local:5332
```

![](https://static.goodrain.com/wechat/pg-ha/pgpool-env.png)

#### 3. Add Dependency

In app view, rely on pgpool components to PostgreSQL-repmgr components.

![](https://static.goodrain.com/wechat/pg-ha/pgpool-topology.png)

#### 4. Launch Component

Build components in pgpool component view waiting for build to be completed and started.

#### 5. Validate cluster

Enter the following command to verify cluster： in the web terminal of the Pgpool component

```bash
# 连接 postgresql
PGPASSWORD=$PGPOOL_POSTGRES_PASSWORD psql -U $PGPOOL_POSTGRES_USERNAME -h localhost

# 查询集群节点
show pool_nodes;
```

The status field is UP sufficient.

![](https://static.goodrain.com/wechat/pg-ha/pgpool-checkcluster.png)

## Last

### External connection

To connect to postprogresql using a local tool, the external service port can be opened in the port of the pgpool component, through which to connect to postprogresql, the default user password is `postgres/postprogres@123`.

### Verify High Available Cluster

To secure high available clusters, the Kubernetes cluster must have at least 3 nodes, and the bottom store uses distributed storage, which will guarantee high available cluster data if there is no distributed storage, while maintaining Postprogresql storage to local storage.High-available cluster validation： can be done by

- After connecting to Pgpo, create a database and write the data, then enter the PostgreSQL -repmgr component in the web terminal to query if data is available for each instance.
- Pause the main node, verify whether the main node is automatically switched and can be connected and written to it normally.
