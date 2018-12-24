---
title: 创建一个中间件集群
summary: 创建一个中间件集群
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## mysql 主从同步

## 一. mysql主从同步原理
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204102924349-2125007754.png)

```angular2html
1）在Slave 服务器上执行sart slave命令开启主从复制开关，开始进行主从复制。

2）此时，Slave服务器的IO线程会通过在master上已经授权的复制用户权限请求连接master服务器，并请求从执行binlog日志文件的指定位置（日志文件名和位置就是在配置主从复制服务时执行change master命令指定的）之后开始发送binlog日志内容。

3）Master服务器接收到来自Slave服务器的IO线程的请求后，其上负责复制的IO线程会根据Slave服务器的IO线程请求的信息分批读取指定binlog日志文件指定位置之后的binlog日志信息，然后返回给Slave端的IO线程。返回的信息中除了binlog日志内容外，还有在Master服务器端记录的IO线程。返回的信息中除了binlog中的下一个指定更新位置。

4）当Slave服务器的IO线程获取到Master服务器上IO线程发送的日志内容、日志文件及位置点后，会将binlog日志内容依次写到Slave端自身的Relay Log（即中继日志）文件（Mysql-relay-bin.xxx）的最末端，并将新的binlog文件名和位置记录到master-info文件中，以便下一次读取master端新binlog日志时能告诉Master服务器从新binlog日志的指定文件及位置开始读取新的binlog日志内容。

5）Slave服务器端的SQL线程会实时检测本地Relay Log 中IO线程新增的日志内容，然后及时把Relay LOG 文件中的内容解析成sql语句，并在自身Slave服务器上按解析SQL语句的位置顺序执行应用这样sql语句，并在relay-log.info中记录当前应用中继日志的文件名和位置点。
```

## 二. mysql主从同步注意事项

- master节点和slave节点的uuid不同
- master节点和slave节点的server_id不同

## 三. docker镜像创建mysql容器

### 3.1 同一镜像区创建不同容器的uuid

用同一mysql镜像创建mysql主从集群时，发现每台mysql服务的uuid都是相同的，是因为在数据初始化时将uuid写在了/var/lib/mysql/auto.cnf文件中，造成每个容器的uuid都是相同的。

为了解决不同容器的uuid不同问题，需要在mysql启动生成配置文件后并在启动前 随机生成一个uuid写入到/var/lib/mysql/auto.cnf，这样就可以确保同一镜像生成的容器的uuid都不相同。


![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204150516315-2036744547.png)
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204150036757-1490641186.png)

### 3.2 同一镜像不同容器的server_id

用同一mysql镜像创建mysql主从集群时，如何确保每个mysql服务的server_id不同？

k8s在创建容器时，会为每个容器创建创建一个主机名( 如：gr78648d-0)，创建多个容器后面的数字会依次递增，所以可以利用这一特性生成不同的server_id（主机名数字部分 + 环境变量数字），然后在maser和slave使用不同的环境变量数字数字即可。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204163244948-412477359.png)
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204163802551-863760048.png)

### 3.3 创建镜像，并将镜像推到dockerhub上

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204165341591-661130452.png)


## 四. 构建容器，发送到云市场

##### master节点 通过指定镜像创建容器

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204165458195-1943796474.png)

##### master节点 开启内部的3306端口

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204165851398-1060115755.png)

##### master节点 设置依赖所需要连接的配置信息

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204165947936-971328611.png)

####  master节点 设置容器的配置参数

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204170647972-1386843096.png)

####  master节点 设置容器的配置信息（环境变量）

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204170947089-254583499.png)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204174500759-712862357.png)

##### slave节点 通过指定镜像创建容器

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204171716660-1576150647.png)

##### slave节点 开启内部的3306端口

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204171828093-557947870.png)

##### slave节点 将应用类型设置为有状态应用

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204171858308-1286471989.png)

##### slave节点 设置依赖所需要连接的配置信息

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204172224645-978212103.png)

##### 设置slave依赖master

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204172730312-1438566530.png)

##### 创建两台slave

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204172909766-502732935.png)


#### 发布到云市场

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204173256784-2029852489.png)


## 五. 安装MySQL集群镜像

### 5.1 应用市场安装mysql集群

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/create_mysql_cluster_instance.jpg)

## 六. mysql主从同步配置

### 6.1 查看master节点状态，记录二进制文件名(mysql-bin.000003)和位置(154)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204175039003-207802438.png)

### 6.2 slave节点执行同步SQL语句(需要主服务器主机名，登陆凭据，二进制文件的名称和位置)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204175242854-1718088857.png)