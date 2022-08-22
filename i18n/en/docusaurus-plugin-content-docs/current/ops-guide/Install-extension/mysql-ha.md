---
title: "MySQL master-slave configuration"
description: "MySQL master-slave configuration"
weight: 1020
---

This document describes the MySQL master-slave configuration process; this solution will not automatically switch to the standby database when the primary database is down, and the standby database only provides backup functions; welcome to participate in the [Rainbond open source community](https://t.goodrain.com/) to provide a high-availability automatic database switching solution.

### Related Information

| database type | Version | Character Encoding |
| ------------- | ------- | ------------------ |
| MySQL         | 8.0     | utf8mb4            |

### master-slave configuration

#### Environmental preparation

- hardware resources

Prepare hardware resources according to software and hardware environment requirements.

- get mirror

Execute the following commands in the master and slave servers to obtain mirror：

```bash
docker pull mysql
```

- configuration file

When the container starts, the configuration files of the master and slave databases need to be mounted separately

master database

```bash
$ vi /var/lib/mysql/my.cnf
[mysqld]
pid-file=/var/run/mysqld/mysqld.pid
socket=/var/run/mysqld/mysqld.sock
datadir=/var/lib/ mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Server default utf8 encoding
character-set-server=utf8mb4
# Default storage engine
default -storage-engine=INNODB

# master-slave configuration
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
#Set client code
default-character-set=utf8mb4
[mysql]
# Set mysql client default code
default -character-set=utf8mb4

# Custom config should go here
!includedir /etc/mysql/conf.d/
# Custom config should go here
!includedir /etc/mysql/conf.d/
```

from the database

```bash
$ vi /var/lib/mysql/my.cnf
[mysqld]
pid-file=/var/run/mysqld/mysqld.pid
socket=/var/run/mysqld/mysqld.sock
datadir=/var/lib/ mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Server default utf8 encoding
character-set-server=utf8mb4
# Default storage engine
default -storage-engine=INNODB

# master-slave configuration
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
#Set the client encoding
default-character-set=utf8mb4
[mysql]
#Set the default encoding of the mysql client
default-character-set=utf8mb4

# Custom config should go here
!includedir /etc/mysql/conf.d/
# Custom config should go here
!includedir /etc/mysql/conf.d/
```

#### master database

start the database

```bash
docker run --name mysql_master --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/ mysql/data:/var/lib/mysql\
-e MYSQL_ROOT_PASSWORD=eed1eu.s0S\
-d mysql
```

View database character encoding (optional), and create user authorization

```mysql
# Enter database
docker exec -it mysql_master bash
# Create user authorization
mysql>  CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY 'slave';
mysql>  GRANT REPLICATION SLAVE ON *.* TO 'slave'@ '%';
mysql>  flush privileges;
```

 Get the current binary log file name and position (position) of the primary node

```mysql
mysql>  SHOW MASTER STATUS;
+---------------+----------+-------------+ ------------------+----------------------------------------- -----------+
| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+---------------+-------- --+--------------+-------------------+------------- -----------------------------+
| binlog.000003 | 868 | | | 1b009ef8-a67f-11ea-8c9a-0242ac110002: 1-8 |
+---------------+----------+-------------+-- ----------------+--------------------------------- ---------+
1 row in set (0.00 sec)
```

#### from the database

start the database

```bash
docker run --name mysql_slave --restart=always \
-p 3306:3306 \
-v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf \
-v /var/lib/ mysql/data:/var/lib/mysql\
-e MYSQL_ROOT_PASSWORD=eed1eu.s0S\
-d mysql
```
Configure master-slave replication

```mysql
# Enter database
docker exec -it mysql_slave bash
# Master-slave configuration
mysql>  CHANGE MASTER TO
mysql>  MASTER_HOST='192.168.0.162',
mysql>  MASTER_USER='slave',
mysql>  MASTER_PASSWORD='slave',
mysql>  MASTER_PORT=3306,
mysql>  MASTER_LOG_FILE='binlog.000003',
mysql>  MASTER_LOG_POS=868;

# Enable master-slave synchronization
mysql>  start slave;
# Check the master-slave synchronization status again
mysql>  show slave status;
```

As long as you see that the two parameters Slave_IO_Running and Slave_SQL_Running are both true and the Error field is empty, the code master-slave is copied normally

#### Build a library

Create the database required for Rainbond deployment on the master server, and check whether the slave server has updated the data synchronously

Create library in main library

```mysql
mysql>  create database console;
mysql>  create database region;
```

View from library

```mysql
mysql>  show databases;
+--------------------+
| Database |
+---------------- ----+
| information_schema |
| console |
| mysql |
| performance_schema |
| region |
| sys |
+------------------- -+
5 rows in set (0.00 sec)
```

If the data synchronization is successful, the master-slave replication deployment is completed

#### Create user and authorize

Create and authorize users in the main repository to prepare for subsequent deployment of Rainbond

```mysql
mysql>  CREATE USER rainbond;
mysql>  ALTER USER 'rainbond'@'%' IDENTIFIED WITH mysql_native_password BY 'Gz1ea3.G';
mysql>  GRANT ALL PRIVILEGES ON *.* TO 'rainbond'@'%';
```

### Slave node configuration backup task

- backup script

```bash
$ mkdir -p /var/lib/mysql/backup
$ vi /var/lib/mysql/backup/mysql-backup.sh
#!/bin/bash
DATE=`date +%Y%m%d%H%M`
DB_USER=rainbond # Database username
DB_PASS="Gz1ea3.G" #Database password
BACKUP=/var/lib/mysql/backup/ #Backup file storage path

#Backup

/usr/bin/mysqldump -u$DB_USER -p$DB_PASS -h 127.0 .0.1 |gzip > ${BACKUP}\/rainbond_${DATE}.sql.gz

#Keep backup files for the last 30 days

find ${BACKUP} -name "rainbond_*.sql.gz" -type f -mtime +30 -exec rm {} \; > /dev/null 2>&1
```

- Configure scheduled tasks

```bash
$ crontab -e
0 3 * * * /var/lib/mysql/backup/mysql-backup.sh
```

- give execute permission

```bash 
chmod +x /var/lib/mysql/backup/mysql-backup.sh
```
   
