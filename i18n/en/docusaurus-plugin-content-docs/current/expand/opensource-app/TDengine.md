---
title: TDengine (database)
description: This article introduces the open source application TDengine
weight: 7003
---

#### 1.Introduction to：

​ TDengine is an innovative big data processing product launched by Taosi Data in the face of the rapidly growing IoT big data market and technical challenges. It does not rely on any third-party software, nor does it optimize or package an open source database or streaming It is a computing product, but a self-developed product after absorbing the advantages of many traditional relational databases, NoSQL databases, streaming computing engines, message queues and other software. The total cost of ownership of the Internet of Things, Internet of Vehicles, and Industrial Internet big data platforms has been greatly reduced.

![](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/TDjiagou.png)

​

#### 2. Get to know the TDengine cluster：

The design of TDengine is based on the assumption that a single hardware and software system is unreliable, and that any single computer cannot provide enough computing power and storage capacity to process massive data.Therefore, it is designed according to the distributed high-reliability architecture, which supports horizontal expansion, so that any hardware failure or software error of any single or multiple servers will not affect the availability and reliability of the system. The complete TDengine system runs on one or more servers. On a physical node, logically, it includes data nodes (dnode), TDengine application drivers (taosc) and applications (app).There are one or more data nodes in the system, these data nodes form a cluster, and the logical unit is divided into**physical nodes (pnode)**,**data nodes (dnode)**,**virtual nodes (vnode)**,**Management node (mnode)**,**virtual node group (VGroup)**.

![Cluster and Principle Architecture](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/jiagou.png)

​ TDengine cluster is managed by mnode (a module of taosd, management node), and vnode (virtual node, ensuring high data availability) is responsible for data.

​ (1)：mnode is the brain of the entire system, responsible for resource scheduling of the entire system, and responsible for the management and storage of meta data.In a running system, there is only one mnode, but it has multiple copies, which can be controlled by numOfMnodes. TDengine supports definition by environment variables by default, as long as it starts with TAOS_, it can be recognized and referenced.Example：TAOS__NUMOFMNODES =3 .To ensure the high availability of mnodes, multiple mnode replicas need to be configured, and the valid range is 1-3.To ensure strong metadata consistency, data replication is performed between mnode replicas through synchronization.When the master node encounters a problem, the remaining nodes will automatically take over the position to ensure that the master node can survive and provide work. In the container environment, the pod will restart according to the policy, and then automatically join the cluster without manual configuration. Operational convenience is improved.

​ (2)：ensures the high availability of vnodes. The number of nodes in the cluster must be greater than or equal to the number of replicas. Otherwise, the error "more dnodes are needed" will be returned when the table is created. When the number of replicas is 3, there are only three dnodes. If one node does not work, the entire cluster can still work normally, but if two data nodes do not work, the entire cluster cannot work normally.

**：**TDengine high-availability system, whether it is a vnode or an mnode, must be configured with multiple copies.



#### 3. Performance test：

|       Basic test environment        |  data presentation  |
|:-----------------------------------:|:-------------------:|
|          TDengine version           |       2.2.1.1       |
|  Number of TDengine cluster nodes   |          3          |
| TDengine cluster single node memory |         4G          |
|        TDengine cluster type        |      container      |
|  100000000 pieces of data written   |       94.17s        |
|    Write performance per second     | 1061965.70 Articles |
|             test tools              |      taosdemo       |

**Note：**This test is based on the Rainbond platform, and the data is for reference only.The default single-node memory provided by the Rainbond platform is 512M. For testing, the memory must be at least 4G. The actual production environment can set the memory size according to the requirements.

​

#### 4. One-click installation：

`TDengine`database cluster version has been launched in the open source application store, just search`TDengine`and install it.

![](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/sousuo.png)



#### 5. Topology map after successful installation：

![The installation is complete](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/install.png)

`TDengine`Default user：**root**  Default password：**taosdata**

`Grafana`Default User：**admin**  Default Password：**12345678**



#### 6. TDengine simple operation：

​ After the installation is successful, we can enter the container in the web terminal in the instance, and then operate the database. Enter taos directly in the terminal to log in. After logging in, enter`show dnodes;` to view the node information, and the following figure is successful.：

![](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/4293197b1fa638359ff8faaa45187df.png) ​ After logging in successfully, you can create libraries, tables, super tables, etc. according to your work requirements..

``` 
   Create Database
Template：CREATE DATABASE [IF NOT EXISTS] db_name [KEEP keep] [DAYS days] [UPDATE 1];
   Create Data Table
Template：CREATE TABLE [IF NOT EXISTS] tb_name (timestamp_field_name TIMESTAMP, field1_name data_type1 [, field2_name data_type2...]);
```

​ In addition to basic operations, there are many powerful functions that everyone can explore and use. For more usage methods, you can refer to[TDengine official documentation](https://www.taosdata.com/cn/documentation/).



#### 7. Grafana configuration：

​ Rainbond has integrated Grafana with TDengine. When using it, you only need to make a selection. After logging in to the interface, click Dashboards on the left to select the configured display interface.

![Visual interface](https://static.goodrain.com/docs/5.4/opensource-app/tdengine/monrtor0.png)



#### 8. Article summary：

​ This article describes the cluster architecture principle of`TDengine`database, performance testing, and rapid deployment of applications on`Rainbond`If you have any problems in the process of using`Rainbond`, you can enter our official communication group to discuss and exchange or refer to[Rainbond Official Documentation](https://www.rainbond.com/docs/).
