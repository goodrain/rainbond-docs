---
title: 部署 MySQL 主从集群
description: 本文介绍在 Docker 和 Centos 中部署 Mysql 主从集群
keywords:
- 使用 Docker 部署 Mysql 主从集群
- 使用 Centos 部署 Mysql 主从集群
- MySQL 定时备份
---

此文档描述在 **Docker** 和 **Centos 7** 中搭建 MySQL主从集群的过程；该方案在主数据库出现宕机时并不会自行切换至备数据库，备数据库仅提供备份功能；欢迎参与 [Rainbond开源社区](https://t.goodrain.com/) 提供数据库高可用自动切换方案。

## 相关信息

|数据库类型|版本|字符编码|
| ---- | ---- | ---- |
|MySQL|8.0|utf8mb4|

## 在 Docker 中部署 MySQL 主从集群

:::info
采用 [Bitnami](https://github.com/bitnami/containers/tree/main/bitnami/mysql) 打包的 MySQL 镜像。
:::

在主从服务器中执行以下命令获取镜像：

```bash
docker pull bitnami/mysql:8.0.34
```

创建目录
```bash
mkdir -p /opt/mysql/data
chown 777 /opt/mysql/data
```

### 启动主数据库

在主节点上执行以下 Docker 命令:

* `MYSQL_ROOT_PASSWORD`: 定义 root 用户密码

其余[环境变量](https://github.com/bitnami/containers/blob/main/bitnami/mysql/README.md#setting-up-a-replication-cluster)都保持默认即可。

```bash
docker run --name mysql-master --restart=always \
  -p 3306:3306 \
  -v /opt/mysql/data:/bitnami/mysql/data \
  -e MYSQL_ROOT_PASSWORD=Root123456 \
  -e MYSQL_REPLICATION_MODE=master \
  -e MYSQL_REPLICATION_USER=repl_user \
  -e MYSQL_REPLICATION_PASSWORD=repl_password \
  -e MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password \
  -d bitnami/mysql:8.0.34
```

### 启动从数据库

在从节点上执行以下 Docker 命令:

* `MYSQL_MASTER_HOST`: 指定主节点的地址
* `MYSQL_MASTER_ROOT_PASSWORD`: 指定主节点的 root 密码

其余[环境变量](https://github.com/bitnami/containers/blob/main/bitnami/mysql/README.md#setting-up-a-replication-cluster)都保持默认即可。

```bash
docker run --name mysql-slave --restart=always \
  -p 3306:3306 \
  -v /opt/mysql/data:/bitnami/mysql/data \
  -e MYSQL_MASTER_HOST=<MYSQL_HOST> \
  -e MYSQL_MASTER_ROOT_PASSWORD=Root123456 \
  -e MYSQL_MASTER_PORT_NUMBER=3306 \
  -e MYSQL_REPLICATION_MODE=slave \
  -e MYSQL_REPLICATION_USER=repl_user \
  -e MYSQL_REPLICATION_PASSWORD=repl_password \
  -e MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password \
  -d bitnami/mysql:8.0.34
```
### 建库验证

在主节点数据库创建 Rainbond 部署所需的数据库，查看从服务器是否同步更新了数据

* 在主节点创建数据库

```bash
mysql>  create database console;
mysql>  create database region;
```

* 在从节点数据库中查看

```bash
mysql>  show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| console            |
| mysql              |
| performance_schema |
| region             |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

数据同步成功，则主从复制部署完成

## 在 Centos 7 中部署 MySQL 主从集群

参阅社区文档 [在 Centos7 安装 MySQL 主从集群](https://t.goodrain.com/d/8304-centos-7-mysql)。

## MySQL 定时备份

在从节点上配置 MySQL 定时备份任务。

* 创建目录
```bash
mkdir -p /opt/mysql/backup
```

* 备份脚本
```bash title="vim /opt/mysql/backup/mysql-backup.sh"
#!/bin/bash

DATE=`date +%Y%m%d%H`
DB_USER=root
DB_PASS=Root123456
BACKUP_DIR=/opt/mysql/backup

docker exec mysql-slave mysqldump -u$DB_USER -p$DB_PASS -h 127.0.0.1 console > $BACKUP_DIR/rainbond-console-$DATE.sql
gzip $BACKUP_DIR/rainbond-console-$DATE.sql

docker exec mysql-slave mysqldump -u$DB_USER -p$DB_PASS -h 127.0.0.1 region > $BACKUP_DIR/rainbond-region-$DATE.sql
gzip $BACKUP_DIR/rainbond-region-$DATE.sql

find ${BACKUP_DIR} -name "rainbond-*.sql.gz" -type f -mtime +30 -exec rm {} \; > /dev/null 2>&1
```

* 配置计划任务

```bash
$ crontab -e

0 2 * * * bash /opt/mysql/backup/mysql-backup.sh
```
