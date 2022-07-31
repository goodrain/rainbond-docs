---
title: 部署Spark Standalone集群
weight: 4007
---

Standalone 是 Spark 自身提供的一种主从集群部署模式。本文讲述一个常规1主多从的集群部署模式，该模式下master服务依靠Rainbond平台监控保障其可用性，支持重新调度重启。 worker服务可以根据需要伸缩多个节点。

部署效果截图如下：

![image-20201118160946574](https://static.goodrain.com/docs/practice/deploy-spark/app-show.png)

<center>Rainbond 部署效果图</center>

![image-20201118161242094](https://static.goodrain.com/docs/practice/deploy-spark/spark-show.png)

<center>Spark master UI 图</center>

### 部署步骤

> 开始前，你需要完成Rainbond平台的安装和搭建，参考[Rainbond 安装与部署](/docs/quick-start/quick-install/) 本参考文档适合已掌握Rainbond 基础操作的同学，因此如果你还刚接触Rainbond平台，请先参考 [Rainbond 快速入门指南](/docs/use-manual/get-start/team-management-and-multi-tenancy)

#### 部署单实例的master服务

1. 部署spark-master，采用Rainbond基于Docker镜像创建组件：

   ```
   bde2020/spark-master:3.0.1-hadoop3.2
   ```

   ![](https://static.goodrain.com/docs/practice/deploy-spark/deploy.png)

   

2. 确认创建检测成功后选择`高级设置`进行三个特殊设置。

   * 在环境变量模块中添加环境变量

     `SPARK_DAEMON_JAVA_OPTS=-Dspark.deploy.recoveryMode=FILESYSTEM -Dspark.deploy.recoveryDirectory=/data`

     > 我们需要设置spark-master为“Recovery with Local File System”模式。可以在master发生重启后从持久化文件中恢复数据，保持master服务的可用性。

   * 在存储设置中添加共享存储 `/data` 持久化master的数据，使其可以重启后恢复。

   * 在端口管理中将 8080端口的对外服务打开，组件启动成功后即可访问master的UI。

   * 在部署属性中选择组件类型为`有状态单实例`

     > 部署为有状态组件后，其可以获得一个稳定的内部访问域名，供worker组件连接。有状态服务控制权可以保障master节点不会重复启动多个实例。

3. 设置完成后选择确认创建即可启动master服务。

组件成功点击访问即可打开master UI。如上图所示，我们可以在UI中获取到master服务的访问地址是：`spark://gr7b570e:7077` ，注意UI上显示的地址是`spark://gr7b570e-0:7077` 我们需要使用的是`spark://gr7b570e:7077` ，复制并记录这个地址。

> 注意，地址实际值请查看你的UI显示，这里只是举例说明。



#### 部署多实例的worker实例

1. 部署spark-worker，采用基于Docker-run命令创建组件，这种创建方式可以直接设置一些必要属性：

   ```
   docker run -it -e SPARK_MASTER=spark://gr7b570e:7077 -e SPARK_WORKER_MEMORY=1g bde2020/spark-worker:3.0.1-hadoop3.2
   ```

   如上创建方式指定了两个环境变量。

   * SPARK_MASTER 指定的是master的地址，由上一步创建的组件获取。
   * SPARK_WORKER_MEMORY 设置worker单个实例的内存量，这个根据每个实例分配的内存进行设置即可。比如每个实例分配1GB, 则设置SPARK_WORKER_MEMORY=1g 。如果不设置此变量，服务会自动读取操作系统的内存量。由于我们是采用的容器部署方式，读取的值会是宿主机的全部内存。将远大于worker实例实际分配的可用内存值。

![](https://static.goodrain.com/docs/practice/deploy-spark/worker-deploy.png)

2. 同样进入高级设置，设置组件部署模式为 `有状态多实例`。
3. 确认创建组件，启动成功后即可在组件的伸缩页面中设置worker的运行实例数。

![image-20201119224718640](https://static.goodrain.com/docs/practice/deploy-spark/scaling.png)

到此，我们的Spark集群已部署完成。

### Spark数据读取

* <b>就近数据处理原则逐步打破</b>

  过去我们更偏爱于把数据处理服务（hadoop、yarn等）部署到离数据最近的地方。主要原因是hadoop计算数据的模式对IO消耗较多，如果数据与计算分类，网络IO带来的消耗将更大，对网络带宽要求较大。

  但Spark机制不同，Spark计算模式是将数据尽可能缓存到内存中，也就意味着Spark消耗的资源主要是内存和CPU。然后存储数据的设备内存和CPU配属不一定充足。因此数据与计算分离将是更好的选择。

* <b>数据与计算分离后的更多选择</b>

  数据与计算分离是指计算服务单独部署，存储服务通过网络为计算服务提供数据。通过网络也就意味着可以有多种协议模式可选，除了传统的HDFS，目前常用的就是对象存储，比如兼容S3的各类服务，也可以是分布式文件系统，可以根据数据类型和实际需要合理选择。计算服务(spark worker) 可以根据任务的需要灵活的在分布式集群中分配计算资源。

  本文讲述的在Rainbond中部署Spark集群即是这种用例。

### Master节点主备高可用

Spark 基于 ZooKeeper可以提供master服务的主备切换。 配置方式也比较简单，参考 [官方文档](https://spark.apache.org/docs/latest/spark-standalone.html#standby-masters-with-zookeeper)。



