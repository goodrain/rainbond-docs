---
title: 部署Mysql主从集群应用
Description: "基于Rainbond部署Mysql主从集群应用"
hidden: true
---

<div id="toc"></div>

### Mysql主从同步原理

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204102924349-2125007754.png" width="70%">

1）在Slave 服务器上执行sart slave命令开启主从复制开关，开始进行主从复制。

2）此时，Slave服务器的IO线程会通过在master上已经授权的复制用户权限请求连接master服务器，并请求从执行binlog日志文件的指定位置（日志文件名和位置就是在配置主从复制服务时执行change master命令指定的）之后开始发送binlog日志内容。

3）Master服务器接收到来自Slave服务器的IO线程的请求后，其上负责复制的IO线程会根据Slave服务器的IO线程请求的信息分批读取指定binlog日志文件指定位置之后的binlog日志信息，然后返回给Slave端的IO线程。返回的信息中除了binlog日志内容外，还有在Master服务器端记录的IO线程。返回的信息中除了binlog中的下一个指定更新位置。

4）当Slave服务器的IO线程获取到Master服务器上IO线程发送的日志内容、日志文件及位置点后，会将binlog日志内容依次写到Slave端自身的Relay Log（即中继日志）文件（Mysql-relay-bin.xxx）的最末端，并将新的binlog文件名和位置记录到master-info文件中，以便下一次读取master端新binlog日志时能告诉Master服务器从新binlog日志的指定文件及位置开始读取新的binlog日志内容。

5）Slave服务器端的SQL线程会实时检测本地Relay Log 中IO线程新增的日志内容，然后及时把Relay LOG 文件中的内容解析成sql语句，并在自身Slave服务器上按解析SQL语句的位置顺序执行应用这样sql语句，并在relay-log.info中记录当前应用中继日志的文件名和位置点。

### Mysql主从同步注意事项

- master节点和slave节点的uuid不同
- master节点和slave节点的server_id不同
- slave节点需要自动执行向master节点注册的操作

### 制作Mysql容器镜像

#### 同一镜像创建不同容器的uuid

用同一mysql镜像创建mysql主从集群时，发现每台mysql服务的uuid都是相同的，是因为在数据初始化时将uuid写在了/var/lib/mysql/auto.cnf文件中，造成每个容器的uuid都是相同的。

为了解决不同容器的uuid不同问题，需要在mysql启动生成配置文件后并在启动前 随机生成一个uuid写入到/var/lib/mysql/auto.cnf，这样就可以确保同一镜像生成的容器的uuid都不相同。

为了达成这一目标，我们修改了mysql镜像自带的启动脚本`/usr/local/bin/docker-entrypoint.sh`：

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

#### 同一服务不同实例的server_id处理

用同一MYSQL镜像创建MYSQL主从集群时，如何确保每个MYSQL服务的server_id不同？

k8s在创建容器时，会为每个容器创建创建一个主机名( 如：gr78648d-0)，创建多个容器后面的数字会依次递增，所以可以利用这一特性生成不同的server_id（主机名数字部分 + 指定数字），然后在maser和slave使用不同的数字即可。

#### 从库自动初始化

创建slave数据库时，我们希望salve应用下的每个实例，在扩容后，会自动向主库注册。

这需要salve应用中实例初始化时，自动执行指定的SQL脚本。这要借助于官方MYSQL镜像所提供的特定功能：数据库初始化时，会自动读取`/docker-entrypoint-initdb.d/`中*.sql 文件并执行。

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

{{% notice notice %}}

关于脚本中通过环境变量生成指定配置，参考项目 [env2file](https://github.com/barnettZQG/env2file)

{{% /notice %}}

#### 制作镜像的Dockerfile解析

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

### 创建并配置mysql-master服务

#### 创建mysql-master组件

代码地址：https://github.com/goodrain-apps/percona-mysql.git?dir=5.7

代码分支：cluster

通过Dockerfile创建组件 参考文档 [基于Dockerfile源码创建组件](/docs/user-manual/app-creation/language-support/dockerfile/)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/mysql-cluster1.png" width="100%">

#### mysql-master服务 相关配置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/mysql-cluster2.png" width="100%">

- 开启3306端口对内服务，并更改使用别名为`MYSQL`

- 配置关键环境变量

| 环境变量            | 值                       | 说明             |
| ------------------- | ------------------------ | ---------------- |
| MYSQL_ROOT_PASSWORD | changeme（默认）自行指定 | root密码         |
| MYSQL_USER          | 自行指定，如admin        | mysql工作用户    |
| MYSQL_PASSWORD      | 自行指定                 | 工作用户密码     |
| MYSQL_DATABASE      | 自行指定                 | 初始化生成数据库 |
| MYSQL_ROLE          | master                   | 指定角色         |

  其中 除`MYSQL_ROLE`外，其他环境变量要在服务创建完成后，转移到连接信息中去。

- 部署属性中，修改应用类型为 `有状态应用`



### 创建Slave服务

#### 创建mysql-slave组件

创建方式同mysql-master组件一致。

#### mysql-slave服务 相关配置

区别于mysql-master组件，mysql-slave组件配置如下：

- 开启3307端口对内服务，并更改使用别名为 `MYSQL_SLAVE`

- 配置环境变量

| 环境变量           | 值   | 说明                    |
| ------------------ | ---- | ----------------------- |
| MYSQLC_MYSQLD_PORT | 3307 | mysql-slave监听3307端口 |

- mysql-slave服务依赖于mysql-master服务

{{% notice notice %}}

mysql-slave组件，可以随意扩容，脚本中写好的逻辑会让其自动向mysql-master注册。

{{% /notice %}}

至此，一个基本的 MYSQL主从集群就已经搭建完成，如需要发布到应用市场供随时下载使用，请参考[应用分享与发布](/docs/user-manual/app-manage/share-app/)

### 读写分离

#### 机制

MYSQL主从集群的一个好处就是，可以配置master库负责写入，slave库负责查询，slave自动从master同步数据的读写分离结构。

如果设置得当，这样的结构可以大幅度提高数据库性能的同时，降低主库的压力。

#### 使用方法

如果用户的业务程序已经支持读写分离，那么只需要设置：

- 数据库写入地址为mysql-master服务地址，如果使用Rainbond服务依赖，则可以用  `${MYSQL_HOST}:​${MYSQL_PORT}`的方式指定连接地址。
- 数据库查询地址为mysql-slave服务地址，如果使用Rainbond服务依赖，则可以用`${MYSQL_SLAVE_HOST}:${MYSQL_SLAVE_PORT}`的方式指定连接地址。

如果用户的业务程序不支持读写分离，那么就要靠支持读写分离的中间件实现。

#### Atlas中间件

Atlas是由奇虎360开源的数据库中间件，基于mysql官方提供的mysql-proxy改良而来。通过将mysql-proxy的LUA脚本，用C语言重新实现，Atlas提供了比mysql-proxy更强大的性能。经由中间件的代理，用户只需要配置数据库连接地址为 Atlas 服务地址，对于数据库的写入和查询，则由 Atlas 来管理。

[详细了解Atlas](https://github.com/Qihoo360/Atlas)

我们提供的docker化的Atlas组件，用户可以直接基于Dockerfile源码构建这个项目：

[Atlas-docker项目地址](https://github.com/goodrain-apps/altas-docker.git)

Rainbond已经发布的 [Mysql主从集群](<https://market.goodrain.com/apps/1c66f46d2bf34070b599fc81d0bbf248>) 应用，已经集成了该中间件。



### 高阶实现

#### 当前架构缺点

目前搭建的 MYSQL主从集群，是一个master节点，对接多个slave节点。这样的架构在小规模集群下没有问题。但是如果集群规模很大、slave节点过多的时候，由master向所有slave节点同步数据这一过程将变成性能的瓶颈。

#### 架构的优化

当用户完全掌握了如何基于Rainbond搭建MYSQL主从集群后，可以自己尝试，专门创建一个slave节点，作为数据同步节点使用。

该节点向上对接 master节点，来同步数据；向下对接slave集群，分发由master节点同步来的数据。

这样做的好处是，master节点只需要对接一个数据同步节点来同步数据，可以更加专注于数据的写入。其他slave节点从数据同步节点来同步数据。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/mysql-cluster/master-new-arch.png" width="80%">

如果有用户实现了这种优化，欢迎将其分享到应用市场中，供更多的人来使用。