---
title: "在Docker安装MYSQL主从"
description: "在 Docker 中搭建 Mysql 主从"
keywords:
- Mysql 主从部署
---

此文档描述在 Docker 中搭建 MySQL主从集群的过程；该方案在主数据库出现宕机时并不会自行切换至备数据库，备数据库仅提供备份功能；欢迎参与 [Rainbond开源社区](https://t.goodrain.com/) 提供数据库高可用自动切换方案。

## 相关信息

|数据库类型|版本|字符编码|
| ---- | ---- | ---- |
|MySQL|8.0|utf8mb4|

## 环境准备

- 硬件资源

根据 软件和硬件环境要求 准备硬件资源。

- 获取镜像

在主从服务器中执行以下命令获取镜像：

```bash
docker pull mysql:8.0
```

### 配置文件

容器启动时需要分别挂载主从数据库的配置文件

* 主数据库

```bash
$ vi /var/lib/mysql/my.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# 服务端默认utf8编码
character-set-server=utf8mb4
# 默认存储引擎
default-storage-engine=INNODB

# 主从配置
log-bin=binlog
server-id=121
gtid-mode=on
enforce-gtid-consistency=on
log-slave-updates=on
expire_logs_days=14

# Compatible with versions before 8.0
default_authentication_plugin=mysql_native_password
skip-host-cache
skip-name-resolve

[client]
#设置客户端编码
default-character-set=utf8mb4
[mysql]
# 设置mysql客户端默认编码
default-character-set=utf8mb4

# Custom config should go here
!includedir /etc/mysql/conf.d/
# Custom config should go here
!includedir /etc/mysql/conf.d/
```

* 从数据库

```bash
$ vi /var/lib/mysql/my.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# 服务端默认utf8编码
character-set-server=utf8mb4
# 默认存储引擎
default-storage-engine=INNODB

# 主从配置
server-id=122
gtid-mode=on
enforce-gtid-consistency=on
log-slave-updates=on
expire_logs_days=14

# Compatible with versions before 8.0
default_authentication_plugin=mysql_native_password
skip-host-cache
skip-name-resolve

[client]
#设置客户端编码
default-character-set=utf8mb4
[mysql]
# 设置mysql客户端默认编码
default-character-set=utf8mb4

# Custom config should go here
!includedir /etc/mysql/conf.d/
# Custom config should go here
!includedir /etc/mysql/conf.d/
```

## 主数据库

* 启动数据库

```bash
docker run --name mysql_master --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=eed1eu.s0S \
-d mysql:8.0
```

* 查看数据库字符编码（可选）,并创建用户授权

```mysql
# 进入数据库
docker exec -it mysql_master bash
# 创建用户授权
mysql>  CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY 'slave';
mysql>  GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%';
mysql>  flush privileges;
```

* 获取主节点当前binary log文件名和位置（position）
 
```mysql
mysql>  SHOW MASTER STATUS;
+---------------+----------+--------------+------------------+------------------------------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                        |
+---------------+----------+--------------+------------------+------------------------------------------+
| binlog.000003 |      868 |              |                  | 1b009ef8-a67f-11ea-8c9a-0242ac110002:1-8 |
+---------------+----------+--------------+------------------+------------------------------------------+
1 row in set (0.00 sec)
```

## 从数据库

* 启动数据库

```bash
docker run --name mysql_slave --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=eed1eu.s0S \
-d mysql:8.0
```
### 配置主从复制

```mysql
# 进入数据库
docker exec -it mysql_slave bash
# 主从配置
mysql>  CHANGE MASTER TO
mysql>  MASTER_HOST='192.168.0.162',
mysql>  MASTER_USER='slave',
mysql>  MASTER_PASSWORD='slave',
mysql>  MASTER_PORT=3306,
mysql>  MASTER_LOG_FILE='binlog.000003',
mysql>  MASTER_LOG_POS=868;

# 开启主从同步
mysql>  start slave;
# 再查看主从同步状态
mysql>  show slave status;
```

这里只要看到两个参数Slave_IO_Running和Slave_SQL_Running都为true且Error字段都为空则代码主从正常复制

## 建库

在主服务器创建 Rainbond 部署所需的数据库，查看从服务器是否同步更新了数据

在主库创建库

```mysql
mysql>  create database console;
mysql>  create database region;
```

在从库查看

```mysql
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

## 创建用户并授权

在主库创建用户并授权，为Rainbond后续部署做准备

```mysql
mysql>  CREATE USER rainbond;
mysql>  ALTER USER 'rainbond'@'%' IDENTIFIED WITH mysql_native_password BY 'Gz1ea3.G';
mysql>  GRANT ALL PRIVILEGES ON *.* TO 'rainbond'@'%';
```