---
title: 在Linux安装MYSQL主从
description: 在 Linux 上搭建 Mysql 8.0 主从集群
keywords:
- Mysql主从数据库
- 搭建主从数据库教程
---

此文档描述在 Centos 7.x 中搭建 MySQL主从集群的过程；该方案在主数据库出现宕机时并不会自行切换至备数据库，备数据库仅提供备份功能；欢迎参与 [Rainbond开源社区](https://t.goodrain.com/) 提供数据库高可用自动切换方案。

## 1.centos7 安装Mysql 8.0

* 两个节点都做同样操作

### 1.1 下载rpm包

```shell
wget http://repo.mysql.com/mysql80-community-release-el7-1.noarch.rpm
rpm -ivh mysql80-community-release-el7-1.noarch.rpm
```

### 1.2 卸载mariadb

```shell
rpm -qa|grep mariadb
rpm -e mariadb-libs-5.5.65-1.el7.x86_64 --nodeps
```

### 1.3 安装Mysql

:::danger
如果出现mysql-community-client-8.0.28-1.el7.x86_64.rpm 的公钥尚未安装
在安装之前执行 rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
:::

```shell
yum -y install mysql-server
```

### 1.4 启动Mysql

```shell
systemctl restart mysqld
systemctl enable mysqld
```

### 1.5 获取Mysql密码

```shell
grep "A temporary password is generated for root@localhost" /var/log/mysqld.log
```

### 1.6 修改密码：

```shell
alter user 'root'@'localhost' identified by 'xxx';
```

### 1.6 开启远程访问

```shell
update mysql.user set host = '%' where user = 'root';
alter user 'root'@'%' identified by 'xxx' password expire never;
alter user 'root'@'%' identified with mysql_native_password by 'xxx';
flush privileges;
```

## 2.部署主从复制

### 2.1 修改主节点配置文件

* vim /etc/my.cnf


```shell
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

* 重启数据库

```shell
systemctl restart mysqld
```

### 2.2 修改从节点配置文件

* vim /etc/my.cnf

```shell
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

* 重启数据库

```shell
systemctl restart mysqld
```

### 2.3 在主节点创建slave账号

```shell
CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY 'Slave123465!';
GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%';
flush privileges;
#获取主节点 file Position信息。
SHOW MASTER STATUS;
```

### 2.4 配置从节点连接主节点

* 其中MASTER_LOG_FILE，MASTER_LOG_POS 是上一步获取的信息

```shell
CHANGE MASTER TO MASTER_HOST='192.168.21.172',MASTER_USER='slave',MASTER_PASSWORD='1q2w#e$R',MASTER_PORT=3306,MASTER_LOG_FILE='binlog.000002',MASTER_LOG_POS=820;
```

* 启动从节点

```shell
start slave;
```

* 查看从节点状态，这里只要看到两个参数Slave_IO_Running和Slave_SQL_Running都为yes 则主从正常复制。

```shell
show slave status;
```

### 3. 测试验证

```shell
#在主库中创建
create database test;
create database test-xx;
#在从库中查看
show databases;
#数据同步成功，主从复制部署完成
```



