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

## 二. 安装MySQL集群镜像

### 2.1 应用市场安装mysql集群

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/create_mysql_cluster_instance.jpg)

## 三. mysql主从同步配置

### 3.1 查看master节点状态，记录二进制文件名(mysql-bin.000003)和位置(154)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204175039003-207802438.png)

### 3.2 slave节点执行同步SQL语句(需要主服务器主机名，登陆凭据，二进制文件的名称和位置)

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/20181204/1028337-20181204175242854-1718088857.png)