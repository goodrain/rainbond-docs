---
title: 组件配置文件实践
Description: Rainbond 为组件添加配置文件的方法实践
---

本篇文章将会介绍如何在 Rainbond 中为组件挂载配置文件以及多组件之间配置文件共享，适用于有多个组件需要使用同一个配置文件的场景, 可以直接共享, 无需多次编辑设置；共享的配置文件只会解析当前组件的环境变量；以下将会以 MariaDB 为例, 演示配置文件的使用。

## 概述

Rainbond 结合了 Kubernetes 的 ConfigMap 实现的配置文件，是一种特殊的存储类型，此类型允许用户直接定义文件内容，通常是指配置文件；配置文件有两大特性：动态渲染环境变量和配置文件共享。

[MariaDB](https://hub.docker.com/_/mariadb) 的官方镜像，给出了两种自定义配置文件的方法

- 第一种

在宿主机需要有一个配置文件，并将这个配置文件在容器启动时挂载到容器的 `/etc/mysql/conf.d` 目录下，`/etc/mysql/conf.d` 下的配置文件即会覆盖容器内默认配置文件 `/etc/mysql/my.cnf`。

这种方法不够灵活，无法在创建组件时确认 Pod 会被调度在哪个节点上(数据中心通常是集群)，需要组件创建完成后才能挂载配置文件，然后重启组件使其生效。

- 第二种

在容器启动时 docker run 命令中传入相关参数, 比如通过 `character-set-server` 和 `collation-server` 两个参数修改默认的编码和校对规则:

```bash
docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mariadb:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

这种方法同样不够灵活，如果设置的参数非常多，那么这个 docker run 命令将会非常的长。

## Rainbond 的配置方法

Rainbond 结合 k8s 的 ConfigMap 实现的配置文件，这种方法灵活性比较高, 可以 动态渲染环境变量，还可以共享给其它组件使用，以下演示 Rainbond 的配置文件挂载以及共享配置文件方法。

### 前提条件


1. 可以连接外网，拉取 GitHub 代码，使用源码构建 [MariaDB项目](https://github.com/docker-library/mariadb.git)，子目录设置10.5；
2. 拥有一份 MariaDB的配置文件。

配置文件示例

```bash
# MariaDB-specific config file.
# Read by /etc/mysql/my.cnf

[client]
# Default is Latin1, if you need UTF-8 set this (also in server section)
default-character-set = ${DEFAULT_CHARACTER_SET:utf8}

[mysqld]
#
# * Character sets
#
# Default is Latin1, if you need UTF-8 set all this (also in client section)
#
character-set-server  = ${CHARACTER_SET_SERVER:utf8}
collation-server      = ${COLLATION_SERVER:utf8_general_ci}
character_set_server  = ${CHARACTER_SET_SERVER:utf8}
collation_server      = ${COLLATION_SERVER:utf8_general_ci}

default_storage_engine = ${DEFAULT_STORAGE_ENGINE:innodb}

# Import all .cnf files from configuration directory
!includedir /etc/mysql/mariadb.conf.d/
```

> 配置文件解释

在这个配置文件中使用了 **动态渲染配置文件解析环境变量**，设置了 `DEFAULT_CHARACTER_SET`， `CHARACTER_SET_SERVER`，`DEFAULT_STORAGE_ENGINE` 等可以解析环境变量的变量，并给它们设置了默认值，如果组件中存在指定的环境变量，那么 Rainbond 会将该环境变量的值解析到配置文件中；如果组件中不存在该环境变量，那么 Rainbond 会将默认值解析到配置文件中；如果指定的环境变量不存在，且没有设置默认值，那么 Rainbond 不会进行解析。

动态渲染配置文件解析环境变量的语法:

```bash
${环境变量名}
${环境变量名:默认值}
```

### 操作步骤

1. 从源码创建 MariaDB 组件，创建时不要勾选构建并启动

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/config_file/db.jpg" width="100%" />

2.在组件管理页面 **环境配置 --> 配置文件设置** 中点击 **添加配置文件** ，使用上述示例配置文件即可，挂载路径为 `/etc/mysql/mariadb.cnf`；如图所示:
 
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/config_file/config.jpg" width="100%" />


3.添加环境变量

在组件管理页面 **环境配置 --> 自定义环境变量 --> 添加变量** 为组件添加环境变量 `DEFAULT_STORAGE_ENGINE=myisam` 和 `MYSQL_ROOT_PASSWORD=rainbond`


### 效果展示

1. 构建 MariaDB 组件，启动成功后进入容器检查 `/etc/mysql/mariadb.cnf` 的内容

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/ab_testing/my.cnf.jpg" width="100%" />

可以发现，Rainbond 没有找到 `DEFAULT_CHARACTER_SET`，`CHARACTER_SET_SERVER` 等没有对应环境变量的变量，则使用它们对应的默认值进行了解析；找到了 `DEFAULT_STORAGE_ENGINE` 对应的环境变量，则使用环境变量 `DEFAULT_STORAGE_ENGINE` 的值 myisam 进行解析.

2.登录 MySQL，查看配置是否生效:

```bash
# 登录 MySQL
root@gr52b3ee-0:/# mysql -uroot -prainbond

# 检查编码和校对规则
MariaDB [(none)]> show variables like "%character%";
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+

# 查看存储引擎
MariaDB [(none)]> SHOW STORAGE ENGINES;
+--------------------+---------+----------------------------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                                          | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------------------------+--------------+------+------------+
| MRG_MyISAM         | YES     | Collection of identical MyISAM tables                                            | NO           | NO   | NO         |
| CSV                | YES     | Stores tables as CSV files                                                       | NO           | NO   | NO         |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables                        | NO           | NO   | NO         |
| MyISAM             | DEFAULT | Non-transactional engine with good performance and small data footprint          | NO           | NO   | NO         |
| Aria               | YES     | Crash-safe tables with MyISAM heritage                                           | NO           | NO   | NO         |
| InnoDB             | YES     | Supports transactions, row-level locking, foreign keys and encryption for tables | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                                               | NO           | NO   | NO         |
| SEQUENCE           | YES     | Generated tables filled with sequential values                                   | YES          | NO   | YES        |
+--------------------+---------+----------------------------------------------------------------------------------+--------------+------+------------+
```

可以看出，编码，校对规则，存储引擎 的设置都已经生效。

## 配置文件共享

### 前提条件

已通过上述步骤为 MariaDB 挂载配置文件

### 操作步骤

1. 重新创建一个MariaDB组件，
2. 在组件管理界面 **环境配置 --> 共享配置文件 --> 挂载共享配置文件** 找到上面的MariaDB 配置文件并填写挂载路径，更新组件，如图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/ab_testing/share.jpg" width="100%" />

### 效果展示

创建完成后, 进入容器查看配置文件`/etc/mysql/mariadb.cnf`内容如下: 

```bash
# MariaDB-specific config file.
# Read by /etc/mysql/my.cnf

[client]
# Default is Latin1, if you need UTF-8 set this (also in server section)
default-character-set = utf8

[mysqld]
#
# * Character sets
#
# Default is Latin1, if you need UTF-8 set all this (also in client section)
#
character-set-server  = utf8
collation-server      = utf8_general_ci
character_set_server  = utf8
collation_server      = utf8_general_ci

default_storage_engine = innodb

# Import all .cnf files from configuration directory
```

可以看到，由于当前组件没有设置 DEFAULT_STORAGE_ENGINE 变量, 所以 Rainbond 使用它的默认值 innodb 进行解析，其他配置已经生效。

