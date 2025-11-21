---
title: MySQL
description: 在 Rainbond 中通过 KubeBlocks 快速部署和管理 MySQL 数据库集群
keywords:
- Rainbond MySQL 部署
- MySQL 集群
- MySQL 高可用
- KubeBlocks MySQL
---

MySQL 是全球最流行的开源关系型数据库之一。您可以通过 Rainbond 轻松部署和管理 MySQL 数据库集群，目前仅支持半同步复制的主从架构。

## 支持的版本

| 主要版本 | 次要版本            |
| :------- | :------------------ |
| 5.7      | 5.7.44              |
| 8.0      | [8.0.30-8.0.39]     |
| 8.4      | 8.4.0、8.4.1、8.4.2 |

## 创建 MySQL 集群

1. 进入团队空间，点击 **创建应用 → 数据库 → MySQL**

![](/docs/how-to-guides/databases/create-databases.png)

2. 在创建页面，配置基础信息如下:
  - **资源配置:** 通常 MySQL 至少需要 512M 内存和 250m CPU
  - **版本:** 选择合适的 MySQL 版本
  - **实例数:** 1（单副本）或 3（高可用）
  - **存储类:** 选择合适的存储类, 自动获取集群中的 StorageClass 列表
  - **磁盘:** 根据数据量规划，建议 > 10Gi
3. 可选配置备份仓库以启用自动备份功能，你需要在安装时配置好备份仓库
4. 确认创建

## 访问 MySQL

### 获取连接信息

进入 MySQL 组件页面，点击 **依赖** 标签页，即可查看连接信息，包括主机地址、端口、用户名和密码。

### 集群内部访问

如果您的[应用依赖](../app-ops/dependon)的 MySQL 组件，依赖信息会自动注入到应用的环境变量中。

```bash
# 在应用中可以直接使用以下环境变量
MYSQL_HOST=gr40985e
MYSQL_PORT=3306
MYSQL_DEFAULT_USERNAME=root
MYSQL_DEFAULT_PASSWORD=<自动注入的密码>
```


**代码示例**: 

1. 使用环境变量连接 MySQL

```java
spring.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/mydb
spring.datasource.username=${MYSQL_DEFAULT_USERNAME}
spring.datasource.password=${MYSQL_DEFAULT_PASSWORD}
```

2. 使用内部域名连接 MySQL

```java
spring.datasource.url=jdbc:mysql://gr40985e:3306/mydb
spring.datasource.username=${MYSQL_DEFAULT_USERNAME}
spring.datasource.password=${MYSQL_DEFAULT_PASSWORD}
```

### 集群外部访问

如果需要从 Rainbond 集群外部连接 MySQL (如本地开发工具):

1. 进入 MySQL 组件的 **高级设置 → 端口** 标签页，开启 **对外访问** 按钮
2. 使用默认生成的外部 IP 和端口连接 MySQL

## 常见问题

### Q: 如何修改 root 密码

通过 MySQL 命令修改:
```sql
-- 连接到 MySQL
mysql -u root -p

-- 修改密码
ALTER USER 'root'@'%' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

## 相关文档

- [应用依赖组件](../app-ops/dependon)