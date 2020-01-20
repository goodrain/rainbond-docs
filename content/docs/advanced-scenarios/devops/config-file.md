---
title: 组件配置文件实践
Description: Rainbond为组件添加配置文件的方法实践
Hidden: true
---

这篇文章将会介绍 Rainbond 中的配置文件, 并且会以 mariadb 为例, 演示配置文件的使用.

### 配置文件的介绍

Rainbond 结合了 Kubernetes 的 ConfigMap 实现的`配置文件`, 是一种特殊的存储类型, 此类型允许用户直接定义文件内容, 通常是指配置文件.

配置文件有两大特性：`动态渲染环境变量` 和 `配置文件共享`.

##### 动态渲染环境变量

动态渲染配置文件解析环境变量的语法:

```
${环境变量名}
${环境变量名:默认值}
```

如果组件中存在指定的`环境变量`, 那么 Rainbond 会将该环境变量的值解析到配置文件中; 如果组件中不存在该环境变量, 那么 Rainbond 会将`默认值`解析到配置文件中。


> 如果指定的环境变量不存在, 且没有设置默认值, 那么 Rainbond 不会进行解析

#### 配置文件共享

可以通过存储共享的机制来共享配置文件, 如果你有多个组件使用同一个配置文件的场景, 可以直接共享, 无需多次编辑设置.共享的配置文件只会解析当前组件的环境变量.

### 配置文件在 Mariadb 中的组件

[mariadb](https://hub.docker.com/_/mariadb), Docker 的官方镜像, 给出了两种自定义 MySQL 配置文件的方法.

#### Mariadb 官方的配置方法

第一种方法是在宿主机创建一个配置文件, 并将这个配置文件挂载到容器的 `/etc/mysql/conf.d` 目录下. `/etc/mysql/conf.d`下的配置文件就会覆盖默认配置文件 `/etc/mysql/my.cnf`. 这种方法不够灵活, 无法在创建组件时确认 Pod 会被调度在哪个节点上(数据中心通常是集群), 需要组件创建完成后才能挂载配置文件, 然后重启组件使其生效.

第二种方法是在 docker run 命令中传入 mysqld 的参数, 比如, 通过 `character-set-server` 和 `collation-server` 两个参数修改l默认的编码和校对规则:

```
docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mariadb:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

这种方法同样不够灵活, 如果设置的参数非常多, 那么这个 docker run 命令将会非常的长.

#### Rainbond 的配置方法

第三种方法, 是 Rainbond 结合 k8s 的 ConfigMap 实现的配置文件. 这种方法灵活性比较高, 可以 `动态渲染环境变量`, 还可以共享给其它组件使用. 

###### 创建配置文件

创建 mariadb 时 在高级设置中添加一块类型是 `配置文件` 的存储. 如图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/Maven%20%E5%A4%9A%E6%A8%A1%E5%9D%97%E9%A1%B9%E7%9B%AE/mariadb.cnf.png" width="100%" />

配置文件完整的内容如下:

```
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

在这个配置文件中, 我们设置了 DEFAULT_CHARACTER_SET, CHARACTER_SET_SERVER, DEFAULT_STORAGE_ENGINE 等可以解析环境变量的变量, 并给它们设置了默认值.

###### 添加环境变量

为组件添加环境变量 `DEFAULT_STORAGE_ENGINE=myisam` 和 `MYSQL_ROOT_PASSWORD=rainbond`. 等 mariadb 创建成功后, 进入容器, 检查 `/etc/mysql/mariadb` 的内容:

```
root@gr52b3ee-0:/# cat /etc/mysql/mariadb.cnf 
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

default_storage_engine = myisam

# Import all .cnf files from configuration directory
!includedir /etc/mysql/mariadb.conf.d/
```

可以看到, Rainbond 没有找到 DEFAULT_CHARACTER_SET, CHARACTER_SET_SERVER 等没有对应环境变量的变量, 则使用它们对应的默认值进行了解析; 找到了 DEFAULT_STORAGE_ENGINE 对应的环境变量, 则使用环境变量 DEFAULT_STORAGE_ENGINE 的值 myisam 进行解析.

我们再登录 MySQL, 看这些配置有没有生效:

```
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

可以看出, 编码, 校对规则, 存储引擎 的设置都已经生效. 

##### 共享配置文件

接下来, 我们再创建一个 mariadb, 并挂载上面创建的 mariadb 的配置文件. 如图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/Maven%20%E5%A4%9A%E6%A8%A1%E5%9D%97%E9%A1%B9%E7%9B%AE/share-configuration.png" width="100%" />

创建完成后, 可以看到文件`/etc/mysql/mariadb.cnf`的片段如下: 

```
default_storage_engine = innodb
```

可以看到, 由于当前组件没有设置 DEFAULT_STORAGE_ENGINE 变量, 所以 Rainbond 使用它的默认值 innodb 进行解析.

### 总结

这篇文章以 mariadb 为例, 演示了 Rainbond 配置文件的使用, 包括对环境变量的渲染和共享配置文件. 希望大家看完这篇文章后, 可以灵活地对组件进行配置.