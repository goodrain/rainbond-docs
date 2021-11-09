---
title: TDengine(数据库)
description: 本文介绍开源应用TDengine
weight: 7003
---

#### 1.TDengine简介：

​		TDengine  是涛思数据面对高速增长的物联网大数据市场和技术挑战推出的创新性的大数据处理产品，它不依赖任何第三方 软件，也不是优化或包装了一个开源的数据库或流式计算产品，而是在吸取众多传统关系型数据库、NoSQL 数据库、流式计算引擎、消息队列等软件的优点之后自主开发的产品，在时序空间大数据处理上，有着自己独到的优势，可将典型的物联网、车联网、工业互联网大数据平台的总拥有成本大幅降低。{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/TDjiagou.png" title="" width="100%">}}

​		                                          			

#### 2.认识TDengine集群：

​		TDengine 的设计是基于单个硬件、软件系统不可靠，基于任何单台计算机都无法提供足够计算能力和存储能力处理海量数据的假设进行设计的。因此按照分布式高可靠架构进行设计，是支持水平扩展的，这样任何单台或多台服务器发生硬件故障或软件错误都不影响系统的可用性和可靠性，完整的 TDengine 系统是运行在一到多个物理节点上的，逻辑上，它包含数据节点(dnode)，TDengine 应用驱动(taosc)以及应用(app)。系统中存在一到多个数据节点，这些数据节点组成一个集群(cluster)，逻辑单元又划分为**物理节点(pnode)**，**数据节点(dnode)**，**虚拟节点(vnode)**，**管理节点(mnode)**，**虚拟节点组(VGroup)**。

{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/jiagou.png" title="集群与原理架构" width="100%">}}

​		TDengine集群是由mnode (taosd的一个模块，管理节点)  负责管理的，vnode(虚拟节点，保证数据高可用)负责数据的。

​		(1)：mnode是整个系统的大脑，负责整个系统的资源调度，负责meta data的管理与存储。一个运行的系统里，只有一个mnode，但它有多个副本，可以通过numOfMnodes控制，TDengine默认支持通过环境变量的方式进行定义，只要以TAOS_开头都可以识别到并且引用到。例：TAOS__NUMOFMNODES =3 。为保证mnode的高可用，需要配置多个mnode副本 ，有效范围为1-3。为保证元数据的强一致性，mnode副本之间是通过同步的方式进行数据复制的。当其中master节点遇问题以后，剩余节点会自动接替位置保证主节点能够存活并且提供工作，在容器环境里面，pod会根据策略重启，然后自动加入到集群里，无需我们进行手动配置，极大的提高了操作便利性。

​		(2)：保证vnode的高可用，集群的节点数必须大于等于副本数，否则创建表时将返回错误"more dnodes are needed"，当副本数为3，只有三个dnode，那如果仅有一个节点不工作，整个集群还是可以正常工作的，但如果有两个数据节点不工作，那整个集群就无法正常工作了。

​		**注意：**一个TDengine高可用系统，无论是vnode还是mnode, 都必须配置多个副本。



#### 3.性能测试：

|      基础测试环境      |   数据呈现   |
| :--------------------: | :----------: |
|      TDengine版本      |   2.2.1.1    |
|  TDengine集群节点数量  |      3       |
| TDengine集群单节点内存 |      4G      |
|    TDengine集群类型    |  container   |
|  100000000条数据写入   |    94.17s    |
|      每秒写入性能      | 1061965.70条 |
|        测试工具        |   taosdemo   |

​		**注意：**本次测试是基于Rainbond平台进行，数据仅供参考。Rainbond平台默认提供的单节点内存为512M，如需进行测试内存保证最少为4G，实际生产环境根据需求进行设置内存大小。

​								

#### 4.一键安装：

​		`TDengine`数据库集群版已经在开源应用商店上线，直接搜索`TDengine`安装即可。

{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/sousuo.png" title="" width="100%">}}



#### 5.安装成功后的拓扑图：

{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/install.png" title="安装完成" width="100%">}}

​		`TDengine`默认用户：**root**  默认密码：**taosdata**

​		`Grafana`默认用户：**admin**  默认密码：**12345678** 



#### 6.TDengine简单操作：

​		安装成功以后，我们可以在实例里面的web终端进入容器，然后操作数据库，在终端直接输入taos 即可登录，登录后输入，``` show dnodes;``` 即可查看节点信息，出现下图即为成功：

{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/4293197b1fa638359ff8faaa45187df.png" title="启动成功" width="100%">}}  

​		登录成功以后，自己可以根据工作要求进行创建库，表，超级表，等等..

``` 
   创建数据库
模板：CREATE DATABASE [IF NOT EXISTS] db_name [KEEP keep] [DAYS days] [UPDATE 1];
   创建数据表
模板：CREATE TABLE [IF NOT EXISTS] tb_name (timestamp_field_name TIMESTAMP, field1_name data_type1 [, field2_name data_type2 ...])；
```

​		除基础操作以外还有很多强大的功能，大家都可以去探索使用，更多使用方法大家可以参考[TDengine官方文档](https://www.taosdata.com/cn/documentation/)。



#### 7.Grafana配置：

​		Rainbond已经把Grafana与TDengine集成了，使用的时候只需要去进行选择就可以，登录进入界面以后，点击左侧Dashboards选择已经配置完成的展示界面即可。

{{<image src="https://static.goodrain.com/docs/5.4/opensource-app/tdengine/monrtor0.png" title="可视界面" width="100%">}}



#### 8.文章小结：

​		本文讲述了`TDengine`数据库的集群架构原理，性能测试，在`Rainbond`上的快速部署应用，使用`Rainbond`过程中有任何问题，都可以进我们官方的交流群探讨交流或者参考[Rainbond官方文档](https://www.rainbond.com/docs/)。
