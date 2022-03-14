---
title: '部署Mysql主从集群应用'
Description: '基于Rainbond部署Mysql主从集群应用'
hidden: true
---

### Mysql 主从同步原理

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204102924349-2125007754.png" width="70%" />

1）在 Slave 服务器上执行 sart slave 命令开启主从复制开关，开始进行主从复制。

2）此时，Slave 服务器的 IO 线程会通过在 master 上已经授权的复制用户权限请求连接 master 服务器，并请求从执行 binlog 日志文件的指定位置（日志文件名和位置就是在配置主从复制服务时执行 change master 命令指定的）之后开始发送 binlog 日志内容。

3）Master 服务器接收到来自 Slave 服务器的 IO 线程的请求后，其上负责复制的 IO 线程会根据 Slave 服务器的 IO 线程请求的信息分批读取指定 binlog 日志文件指定位置之后的 binlog 日志信息，然后返回给 Slave 端的 IO 线程。返回的信息中除了 binlog 日志内容外，还有在 Master 服务器端记录的 IO 线程。返回的信息中除了 binlog 中的下一个指定更新位置。

4）当 Slave 服务器的 IO 线程获取到 Master 服务器上 IO 线程发送的日志内容、日志文件及位置点后，会将 binlog 日志内容依次写到 Slave 端自身的 Relay Log（即中继日志）文件（Mysql-relay-bin.xxx）的最末端，并将新的 binlog 文件名和位置记录到 master-info 文件中，以便下一次读取 master 端新 binlog 日志时能告诉 Master 服务器从新 binlog 日志的指定文件及位置开始读取新的 binlog 日志内容。

5）Slave 服务器端的 SQL 线程会实时检测本地 Relay Log 中 IO 线程新增的日志内容，然后及时把 Relay LOG 文件中的内容解析成 sql 语句，并在自身 Slave 服务器上按解析 SQL 语句的位置顺序执行应用这样 sql 语句，并在 relay-log.info 中记录当前应用中继日志的文件名和位置点。

### Mysql 主从同步注意事项

- master 节点和 slave 节点的 uuid 不同
- master 节点和 slave 节点的 server_id 不同
- slave 节点需要自动执行向 master 节点注册的操作

### 制作 Mysql 容器镜像

#### 同一镜像创建不同容器的 uuid

用同一 mysql 镜像创建 mysql 主从集群时，发现每台 mysql 服务的 uuid 都是相同的，是因为在数据初始化时将 uuid 写在了/var/lib/mysql/auto.cnf 文件中，造成每个容器的 uuid 都是相同的。

为了解决不同容器的 uuid 不同问题，需要在 mysql 启动生成配置文件后并在启动前 随机生成一个 uuid 写入到/var/lib/mysql/auto.cnf，这样就可以确保同一镜像生成的容器的 uuid 都不相同。

为了达成这一目标，我们修改了 mysql 镜像自带的启动脚本`/usr/local/bin/docker-entrypoint.sh`：

```bash
if [ ! -d "$DATADIR/mysql" ]; then
		file_env 'MYSQL_ROOT_PASSWORD'
		if [ -z "$MYSQL_ROOT_PASSWORD" -a -z "$MYSQL_ALLOW_EMPTY_PASSWORD" -a -z "$MYSQL_RANDOM_ROOT_PASSWORD" ]; then
			echo >&2 'error: database is uninitialized and password option is not specified '
			echo >&2 '  You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD'
			exit 1
		fi

		mkdir -p "$DATADIR"

		echo 'Initializing database'
		"$@" --initialize-insecure
		echo 'Database initialized'
                # 位于mysql启动脚本90行，新增如下语句
                psd="/proc/sys/kernel/random/uuid"
                str=$(cat $psd)
                uuid="server-uuid="${str}
                echo "[auto]" > /var/lib/mysql/auto.cnf
                echo $uuid >> /var/lib/mysql/auto.cnf


```

#### 同一服务不同实例的 server_id 处理

用同一 MYSQL 镜像创建 MYSQL 主从集群时，如何确保每个 MYSQL 服务的 server_id 不同？

k8s 在创建容器时，会为每个容器创建创建一个主机名( 如：gr78648d-0)，创建多个容器后面的数字会依次递增，所以可以利用这一特性生成不同的 server_id（主机名数字部分 + 指定数字），然后在 maser 和 slave 使用不同的数字即可。

#### 从库自动初始化

创建 slave 数据库时，我们希望 salve 应用下的每个实例，在扩容后，会自动向主库注册。

这需要 salve 应用中实例初始化时，自动执行指定的 SQL 脚本。这要借助于官方 MYSQL 镜像所提供的特定功能：数据库初始化时，会自动读取`/docker-entrypoint-initdb.d/`中\*.sql 文件并执行。

为了实现上述两个目标，我们在镜像的自定义启动脚本 `/run/docker-entrypoint.sh`进行指定：

```bash
# define server_id and anyother cluster configuration
# 通过环境变量来区分当前镜像创建主库或从库
if [ ${MYSQL_ROLE} == "master" ];then
   # 借助有状态应用主机名特点，截取其中的数字
   server_id=${HOSTNAME#*-}
   # 主库ID设置为1
   MYSQLC_MYSQLD_SERVER_ID=`expr $server_id + 1`
   export MYSQLC_MYSQLD_SERVER_ID
   # 指定生成主库特定的配置
   export MYSQLC_MYSQLD_binlog_ignore_db=mysql
   export MYSQLC_MYSQLD_log_bin=mysql-bin
else
   # 借助有状态应用主机名特点，截取其中的数字
   server_id=${HOSTNAME#*-}
   # 从库各实例ID，从2开始排序
   MYSQLC_MYSQLD_SERVER_ID=`expr $server_id + 2`
   export MYSQLC_MYSQLD_SERVER_ID
   # 指定生成从库特定配置
   export MYSQLC_MYSQLD_replicate_ignore_db=mysql
   export MYSQLC_MYSQLD_log_bin=mysql-bin
   # 将从库所需要的初始化脚本模版拷贝到指定目录
   cp -a /tmp/init-slave.sql /docker-entrypoint-initdb.d/
   # 根据实例特定的环境变量，对初始化脚本模版进行更改
   sed -i -r -e "s/MYSQL_ROOT_PASSWORD/${MYSQL_ROOT_PASSWORD}/g" \
             -e "s/MYSQL_USER/${MYSQL_USER}/g" /docker-entrypoint-initdb.d/init-slave.sql
fi
```

> 关于脚本中通过环境变量生成指定配置，参考项目 [env2file](https://github.com/barnettZQG/env2file)

#### 制作镜像的 Dockerfile 解析

```Dockerfile
FROM percona:5.7.23-stretch
LABEL creater="barnett"
ENV MYSQL_VERSION=5.7.23
ENV TZ=Asia/Shanghai

RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list; \
    rm -rf /etc/apt/sources.list.d/percona.list && apt-get update; \
    apt-get install -y --no-install-recommends wget net-tools vim; \
    rm -rf /var/lib/apt/lists/*; \
    wget -O /usr/local/bin/env2file -q https://github.com/barnettZQG/env2file/releases/download/0.1.1/env2file-linux; \
    chmod +x /usr/local/bin/env2file;
# 自定义启动脚本
ADD docker-entrypoint.sh /run/docker-entrypoint.sh
# mysql官方启动脚本
ADD ./run/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD ./run/mysqld.cnf /etc/mysql/percona-server.conf.d/mysqld.cnf
# 拷贝slave初始化脚本模版到镜像中，以备调用
ADD ./sql /tmp/
EXPOSE 3306
VOLUME ["/var/lib/mysql", "/var/log/mysql"]
ENV MYSQL_ROOT_PASSWORD=changeme
ENTRYPOINT [ "/run/docker-entrypoint.sh" ]
CMD [ "mysqld" ]

```

### 创建并配置 mysql-master 服务

#### 创建 mysql-master 组件

代码地址：https://github.com/goodrain-apps/percona-mysql.git?dir=5.7

代码分支：cluster

通过 Dockerfile 创建组件 参考文档 [基于 Dockerfile 源码创建组件](../../component-create/language_support/Dockfile/)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/mysql-cluster1.png" width="100%" />

#### mysql-master 服务 相关配置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/mysql-cluster2.png" width="100%" />

- 开启 3306 端口对内服务，并更改使用别名为`MYSQL`

- 配置关键环境变量

| 环境变量            | 值                       | 说明             |
| ------------------- | ------------------------ | ---------------- |
| MYSQL_ROOT_PASSWORD | changeme（默认）自行指定 | root 密码        |
| MYSQL_USER          | 自行指定，如 admin       | mysql 工作用户   |
| MYSQL_PASSWORD      | 自行指定                 | 工作用户密码     |
| MYSQL_DATABASE      | 自行指定                 | 初始化生成数据库 |
| MYSQL_ROLE          | master                   | 指定角色         |

其中 除`MYSQL_ROLE`外，其他环境变量要在服务创建完成后，转移到连接信息中去。

- 部署属性中，修改应用类型为 `有状态应用`

### 创建 Slave 服务

#### 创建 mysql-slave 组件

创建方式同 mysql-master 组件一致。

#### mysql-slave 服务 相关配置

区别于 mysql-master 组件，mysql-slave 组件配置如下：

- 开启 3307 端口对内服务，并更改使用别名为 `MYSQL_SLAVE`

- 配置环境变量

| 环境变量           | 值   | 说明                       |
| ------------------ | ---- | -------------------------- |
| MYSQLC_MYSQLD_PORT | 3307 | mysql-slave 监听 3307 端口 |

- mysql-slave 服务依赖于 mysql-master 服务

> mysql-slave 组件，可以随意扩容，脚本中写好的逻辑会让其自动向 mysql-master 注册。

至此，一个基本的 MYSQL 主从集群就已经搭建完成，如需要发布到应用市场供随时下载使用，请参考[应用分享与发布](../../user-manual/app-manage/share-app/)

### 读写分离

#### 机制

MYSQL 主从集群的一个好处就是，可以配置 master 库负责写入，slave 库负责查询，slave 自动从 master 同步数据的读写分离结构。

如果设置得当，这样的结构可以大幅度提高数据库性能的同时，降低主库的压力。

#### 使用方法

如果用户的业务程序已经支持读写分离，那么只需要设置：

- 数据库写入地址为 mysql-master 服务地址，如果使用 Rainbond 服务依赖，则可以用 `${MYSQL_HOST}:​${MYSQL_PORT}`的方式指定连接地址。
- 数据库查询地址为 mysql-slave 服务地址，如果使用 Rainbond 服务依赖，则可以用`${MYSQL_SLAVE_HOST}:${MYSQL_SLAVE_PORT}`的方式指定连接地址。

如果用户的业务程序不支持读写分离，那么就要靠支持读写分离的中间件实现。

#### Atlas 中间件

Atlas 是由奇虎 360 开源的数据库中间件，基于 mysql 官方提供的 mysql-proxy 改良而来。通过将 mysql-proxy 的 LUA 脚本，用 C 语言重新实现，Atlas 提供了比 mysql-proxy 更强大的性能。经由中间件的代理，用户只需要配置数据库连接地址为 Atlas 服务地址，对于数据库的写入和查询，则由 Atlas 来管理。

[详细了解 Atlas](https://github.com/Qihoo360/Atlas)

我们提供的 docker 化的 Atlas 组件，用户可以直接基于 Dockerfile 源码构建这个项目：

[Atlas-docker 项目地址](https://github.com/goodrain-apps/altas-docker.git)

Rainbond 已经发布的 [Mysql 主从集群](https://market.goodrain.com/apps/1c66f46d2bf34070b599fc81d0bbf248) 应用，已经集成了该中间件。

### 高阶实现

#### 当前架构缺点

目前搭建的 MYSQL 主从集群，是一个 master 节点，对接多个 slave 节点。这样的架构在小规模集群下没有问题。但是如果集群规模很大、slave 节点过多的时候，由 master 向所有 slave 节点同步数据这一过程将变成性能的瓶颈。

#### 架构的优化

当用户完全掌握了如何基于 Rainbond 搭建 MYSQL 主从集群后，可以自己尝试，专门创建一个 slave 节点，作为数据同步节点使用。

该节点向上对接 master 节点，来同步数据；向下对接 slave 集群，分发由 master 节点同步来的数据。

这样做的好处是，master 节点只需要对接一个数据同步节点来同步数据，可以更加专注于数据的写入。其他 slave 节点从数据同步节点来同步数据。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/master-new-arch.png" width="80%" />

如果有用户实现了这种优化，欢迎将其分享到应用市场中，供更多的人来使用。
