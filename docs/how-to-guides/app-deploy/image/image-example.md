---
title: 容器镜像支持规范
description: 详细介绍Rainbond基于Docker镜像创建组件的支持规范和最佳实践
keywords:
- Docker镜像部署
- Rainbond镜像规范
- 容器化应用
---

本文档详细介绍了 Rainbond 基于 Docker 镜像创建组件的支持规范，帮助您了解哪些类型的镜像适合在 Rainbond 平台上运行，以及如何正确配置镜像以获得最佳体验。

## 镜像类型支持说明

Rainbond 支持大多数符合标准的 Docker 镜像，但有一些特定类型的镜像不适合直接在平台上运行。理解这些差异对于成功部署应用至关重要。

### 不支持直接运行的镜像类型

以下类型的镜像不能直接在 Rainbond 上运行：

1. **基础系统镜像**：如：`alpine`、`centos`、`debian` 等基础系统镜像，这些镜像的启动进程默认是非前台运行的，容器启动后会立即退出。它们通常只用于本地运行时打开 stdin 进行 TTL 交互式操作，不适合作为长期运行的服务。

2. **基础语言环境和工具类镜像**：如：golang 编译环境、docker 编译环境、maven 编译环境等，这些镜像主要用于构建和编译过程，而非运行实际服务。它们通常在完成特定任务后退出，不适合作为持续运行的应用。

:::caution 注意
请勿直接使用基础系统镜像创建组件，应在此基础上构建包含实际应用服务的镜像。
:::

### 推荐使用的镜像类型

以下类型的镜像非常适合在 Rainbond 平台上运行：

**中间件类**
- 数据库：MySQL、MongoDB、Redis
- Web服务器：Tomcat、Nginx、Apache
- 消息队列：RabbitMQ、Kafka

**Web工具类**
- phpMyAdmin、Adminer、Grafana 等

**基础组件类**
- SFTP 组件、MinIO 对象存储等

**其他提供 TCP/UDP 服务的组件**
- 所有设计为长期运行并提供网络服务的容器化应用。

## 镜像检测与配置规范

### 镜像可访问性要求

- 镜像必须能被 Rainbond 集群服务器正常获取
- 镜像名称必须准确，且存在于对应的镜像仓库中
- 私有仓库镜像需提供正确的账号密码
- 自建仓库应配置 HTTPS 或为 Rainbond 集群节点配置 Docker 信任设置

### Rainbond 自动获取的镜像属性

Rainbond 会自动从镜像中提取以下信息：

1. **端口信息**：从 Dockerfile 中的 `EXPOSE` 指令获取
2. **环境变量**：作为云原生应用推荐的配置方式
3. **存储挂载**：从 Dockerfile 中的 `VOLUME` 指令获取

:::info
使用 Docker Compose 创建的组件只从 compose 配置中获取相关信息，而 docker run 命令创建的组件则同时从创建命令和镜像中获取信息。
:::

### 组件配置默认设置

#### 内存分配

- 默认分配：512MB 内存
- 特例：通过 docker run 或 docker compose 创建时，如明确设置了内存参数，将采用设定值

#### 部署类型设置

- 默认设置：无状态部署类型
- 特例：以下镜像名称将自动设置为有状态部署类型

  - mysql
  - mariadb
  - mongo
  - redis
  - tidb
  - zookeeper
  - kafka
  - mysqldb
  - mongodb
  - memcached
  - cockroachdb
  - cockroach
  - etcd
  - postgres
  - postgresql
  - elasticsearch
  - consul
  - percona
  - mysql-server
  - mysql-cluster

  例如以下镜像将部署为有状态类型：

  - mysql:latest
  - hub.example.com/xxx/mysql:5.5
  - xxx/mysql:5.7
