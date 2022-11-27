---
title: 部署 MySQL 主从集群
description: 本文介绍在 Docker 和 Centos 中部署 Mysql 主从集群
keywords:
- 使用 Docker 部署 Mysql 主从集群
- 使用 Centos 部署 Mysql 主从集群
---

此文档描述在 **Docker** 和 **Centos 7** 中搭建 MySQL主从集群的过程；该方案在主数据库出现宕机时并不会自行切换至备数据库，备数据库仅提供备份功能；欢迎参与 [Rainbond开源社区](https://t.goodrain.com/) 提供数据库高可用自动切换方案。

## 相关信息

|数据库类型|版本|字符编码|
| ---- | ---- | ---- |
|MySQL|8.0|utf8mb4|

## 在 Docker 中部署 MySQL 主从集群

在主从服务器中执行以下命令获取镜像：

```bash
docker pull mysql:8.0
```
### 主从数据库配置文件

<details>
  <summary>主数据库配置文件</summary>
  <div>

```bash title="vim /var/lib/mysql/my.cnf"
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
  </div>
</details>

<details>
  <summary>从数据库配置文件</summary>
  <div>

```bash title="vim /var/lib/mysql/my.cnf"
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

  </div>
</details>

### 启动主数据库

```bash
docker run --name mysql_master --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=Root123456 \
-d mysql:8.0
```

* 创建 `slave` 用户并授权

```bash
# 进入数据库
docker exec -it mysql_master bash
# 创建用户授权
mysql>  CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY 'slave';
mysql>  GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%';
mysql>  flush privileges;
```

* 获取主节点当前 `binary log` 文件名和位置 `position`
 
```bash
mysql>  SHOW MASTER STATUS;
+---------------+----------+--------------+------------------+------------------------------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                        |
+---------------+----------+--------------+------------------+------------------------------------------+
| binlog.000003 |      868 |              |                  | 1b009ef8-a67f-11ea-8c9a-0242ac110002:1-8 |
+---------------+----------+--------------+------------------+------------------------------------------+
1 row in set (0.00 sec)
```

### 启动从数据库

```bash
docker run --name mysql_slave --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=Root123456 \
-d mysql:8.0
```
### 配置主从复制

```bash
# 进入数据库
docker exec -it mysql_slave bash
# 主从配置
mysql>  CHANGE MASTER TO
mysql>  MASTER_HOST='192.168.0.10',
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

这里只要看到两个参数 `Slave_IO_Running` 和 `Slave_SQL_Running` 都为 **true** 且 **Error** 字段都为空则主从集群正常工作。

### 建库

在主数据库创建 Rainbond 部署所需的数据库，查看从服务器是否同步更新了数据

* 在主库创建库

```bash
mysql>  create database console;
mysql>  create database region;
```

* 在从库查看

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
### 通过 YUM 安装 MySQL

在主从服务器中均需要执行
#### 下载 rpm 包

```shell
wget http://repo.mysql.com/mysql80-community-release-el7-1.noarch.rpm
rpm -ivh mysql80-community-release-el7-1.noarch.rpm
```
#### 卸载 mariadb

```shell
rpm -qa|grep mariadb
rpm -e mariadb-libs-5.5.65-1.el7.x86_64 --nodeps
```
#### 安装 MySQL

```shell
yum -y install mysql-server
```
:::danger
如果出现 `mysql-community-client-8.0.28-1.el7.x86_64.rpm` 的公钥尚未安装，在安装之前执行 `rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022`
:::

#### 启动 MySQL

```shell
systemctl restart mysqld
systemctl enable mysqld
```

#### 获取 MySQL 密码并修改和配置远程访问

```bash
# 获取密码
grep "A temporary password is generated for root@localhost" /var/log/mysqld.log

# 登录数据库
mysql -u root -p

# 修改密码
alter user 'root'@'localhost' identified by 'Root123456!';

# 开启远程访问
update mysql.user set host = '%' where user = 'root';
alter user 'root'@'%' identified by 'Root123456!' password expire never;
alter user 'root'@'%' identified with mysql_native_password by 'Root123456!';
flush privileges;
```
### 主从数据库配置文件

#### 修改主和从节点配置文件

<details>
  <summary>主数据库配置文件</summary>
  <div>

```bash title="vim /etc/my.cnf"
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
character_set_server=utf8mb4
collation_server=utf8mb4_unicode_ci
# 默认存储引擎
default-storage-engine=INNODB
# # Compatible with versions before 8.0
default_authentication_plugin=mysql_native_password
skip-host-cache
skip-name-resolve
# 主从配置
log-bin=binlog
server-id=1
gtid-mode=on
enforce-gtid-consistency=on
log-slave-updates=on

[client]
#设置客户端编码
default-character-set=utf8mb4
[mysql]
# 设置mysql客户端默认编码
default-character-set=utf8mb4
```

  </div>
</details>


<details>
  <summary>从数据库配置文件</summary>
  <div>

```bash title="vim /etc/my.cnf"
# 修改为utf8编码
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
character_set_server=utf8mb4
collation_server=utf8mb4_unicode_ci
# 默认存储引擎
default-storage-engine=INNODB
# Compatible with versions before 8.0
default_authentication_plugin=mysql_native_password
skip-host-cache
skip-name-resolve
# 主从配置
server-id=2
gtid-mode=on
enforce-gtid-consistency=on
log-slave-updates=on

[client]
#设置客户端编码
default-character-set=utf8mb4
[mysql]
# 设置mysql客户端默认编码
default-character-set=utf8mb4
```

  </div>
</details>

重启主和从数据库

```bash
systemctl restart mysqld
```
### 配置主从复制

#### 在主节点创建slave账号

```bash
CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY 'slave';
GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%';
flush privileges;
```

#### 获取主节点当前 binlog 和 position

```bash
SHOW MASTER STATUS;
+---------------+----------+--------------+------------------+------------------------------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                        |
+---------------+----------+--------------+------------------+------------------------------------------+
| binlog.000003 |      868 |              |                  | 1b009ef8-a67f-11ea-8c9a-0242ac110002:1-8 |
+---------------+----------+--------------+------------------+------------------------------------------+
```
#### 配置从节点连接主节点

```bash
mysql>  CHANGE MASTER TO
mysql>  MASTER_HOST='192.168.0.10',
mysql>  MASTER_USER='slave',
mysql>  MASTER_PASSWORD='slave',
mysql>  MASTER_PORT=3306,
mysql>  MASTER_LOG_FILE='binlog.000003',
mysql>  MASTER_LOG_POS=868;

# 启动从节点
mysql> start slave;

# 再查看主从同步状态
mysql> show slave status;
```
这里只要看到两个参数 `Slave_IO_Running` 和 `Slave_SQL_Running` 都为 **true** 且 **Error** 字段都为空则主从集群正常工作。

### 建库

在主数据库创建 Rainbond 部署所需的数据库，查看从服务器是否同步更新了数据

* 在主库创建库

```bash
mysql>  create database console;
mysql>  create database region;
```

* 在从库查看

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