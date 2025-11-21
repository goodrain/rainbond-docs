---
title: PostgreSQL
description: 在 Rainbond 中通过 KubeBlocks 快速部署和管理 PostgreSQL 数据库集群
keywords:
- Rainbond PostgreSQL 部署
- PostgreSQL 集群
- PostgreSQL 高可用
- KubeBlocks PostgreSQL
---

PostgreSQL 是一个功能强大的开源对象关系型数据库系统，以其稳定性、可靠性和强大的特性而闻名。您可以通过 Rainbond 轻松部署和管理 PostgreSQL 数据库集群，支持主从流复制架构。

## 支持的版本

| 主要版本      | 支持的次要版本            |
| :------------ | :------------------------ |
| PostgreSQL 12 | 12.14.0、12.14.1、12.15.0 |
| PostgreSQL 14 | 14.7.2、14.8.0            |
| PostgreSQL 15 | 15.7.0                    |
| PostgreSQL 16 | 16.4.0                    |

## 创建 PostgreSQL 集群

1. 进入团队空间，点击 **创建应用 → 数据库 → PostgreSQL**

![](/docs/how-to-guides/databases/create-databases.png)

2. 在创建页面，配置基础信息如下:

  - **资源配置:** 通常 PostgreSQL 至少需要 256M 内存和 100m CPU
  - **版本:** 选择合适的 PostgreSQL 版本
  - **实例数:** 1（单副本）或 3（高可用）
  - **存储类:** 选择合适的存储类, 自动获取集群中的 StorageClass 列表
  - **磁盘:** 根据数据量规划，建议 > 10Gi

3. 可选配置备份仓库以启用自动备份功能，你需要在安装时配置好备份仓库
4. 确认创建

## 访问 PostgreSQL

### 获取连接信息

进入 PostgreSQL 组件页面，点击 **依赖** 标签页，即可查看连接信息，包括主机地址、端口、用户名和密码。

### 集群内部访问

如果您的[应用依赖](../app-ops/dependon)的 PostgreSQL 组件，依赖信息会自动注入到应用的环境变量中。

```bash
# 在应用中可以直接使用以下环境变量
POSTGRESQL_HOST=gr40985e
POSTGRESQL_PORT=5432
POSTGRESQL_DEFAULT_USERNAME=root
POSTGRESQL_DEFAULT_PASSWORD=<自动注入的密码>
```


**代码示例**: 

1. 使用环境变量连接 PostgreSQL

```java
spring.datasource.url=jdbc:postgresql://${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/mydb
spring.datasource.username=${POSTGRESQL_DEFAULT_USERNAME}
spring.datasource.password=${POSTGRESQL_DEFAULT_PASSWORD}
```

2. 使用内部域名连接 PostgreSQL

```java
spring.datasource.url=jdbc:postgresql://gr40985e:3306/mydb
spring.datasource.username=${POSTGRESQL_DEFAULT_USERNAME}
spring.datasource.password=${POSTGRESQL_DEFAULT_PASSWORD}
```

### 集群外部访问

如果需要从 Rainbond 集群外部连接 PostgreSQL (如本地开发工具):

1. 进入 PostgreSQL 组件的 **高级设置 → 端口** 标签页，开启 **对外访问** 按钮
2. 使用默认生成的外部 IP 和端口连接 PostgreSQL

## 相关文档

- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [应用依赖组件](../app-ops/dependon)