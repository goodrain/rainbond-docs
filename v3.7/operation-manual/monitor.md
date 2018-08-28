---
title: 监控
summary: 主机、服务、容器监控
toc: true
---

### 一：简介

本节主要介绍的是Raibond中对Node机器监控，各服务组件监控及容器监控。主要使用开源监控项目[Prometheus](https://prometheus.io/)收取存储监控数据并提供监控数据查询，在容器监控中使用[Cadvisor](https://github.com/google/cadvisor)组件收集容器监控数据，使用[Granfana](https://grafana.com/)让监控数据可视化。Prometheus提供简单的WEB UI，在浏览器中访问本机的`9999`端口即可。



### 二：Node资源监控

有许多第三方组件提供导出现有的Prometheus指标供Prometheus拉取。Prometheus社区提供的[NodeExporter](https://github.com/prometheus/node_exporter)项目可以对于主机的关键度量指标状态监控，在Rainbond中已经部署了NodeExporter并暴露在端口6100，Prometheus可以通过`http://node_ip:6100/metrics`获取本节点的主机监控指标及数据。

![](https://static.goodrain.com/images/docs/3.7/monitor/node_targets.jpg)

在Rainbond的`monitor`组件中，通过etcd中注册的node信息来发现各节点，将各节点主机监控的Metrics地址配置到Prometheus配置文件，Prometheus按配置的间隔时间定时到所有Node拉取指标数据，存储数据并可用PromQL提供丰富的查询。你可以使用Prometheus的查询语句查询各资源使用情况，或者配置Granfana模版更加直观展示主机的监控信息，在下面会详细介绍如何在Granfana配置Noed监控模版。

![](https://static.goodrain.com/images/docs/3.7/monitor/node-targets2.jpg)



### 三：服务组件监控

我们在Rainbond的各服务组件中自定义了一些Prometheus的指标，通过Prometheus的Exporter将指标数据生成Prometheus可以识别的格式，通过metrics地址供Prometheus刮取。

在Prometheus的`Targets`中你可以看到这些服务组件，并可以查询这些服务组件暴露的指标及数据。

![](https://static.goodrain.com/images/docs/3.7/monitor/service-healthy.jpg)



### 四：容器监控

[Cadvisor](https://github.com/google/cadvisor)是google开源的监控项目，Cadvisor对Node机器上的资源及容器进行实时监控和性能数据采集，包括CPU使用情况、内存使用情况、网络吞吐量及文件系统使用情况。

CAdvisor 启动通过调用 Linux 系统 inotify 监测 cgroup docker 目录的文件变化判断 docker 的创建和删除。找出Container对应的系统文件读取监控数据。

Kubernetes的生态中，cAdvisor是作为容器监控数据采集的Agent，cAdvisor集成在Kubelet中，其部署在每个计算节点上的kubelet启动时会自动启动cAdvisor，一个cAdvisor仅对一台Node机器进行监控，默认端口为`4194`，在URL`http://node_ip:4194/metrics` 提供监控指标及数据供Prometheus刮取。

在Rainbond的`monitor`组件中通过etcd发现计算节点，将该节点CAdvisor提供的metrics地址配置Prometheus的配置文件，通过Prometheus指标丰富的`label`对容器及pod进行分类查找。具体的监控项可在Granfana中配置模版，下面回详细说明如何在Granfana中配置容器监控模版。

![](https://static.goodrain.com/images/docs/3.7/monitor/cadvisor-1.jpg)

![](https://static.goodrain.com/images/docs/3.7/monitor/cadvisor-2.jpg)



### 五：使用Granfana 可视化监控

grafana是用于可视化大型测量数据的开源程序，他提供了强大和优雅的方式去创建、共享、浏览数据。dashboard中显示了你不同metric数据源中的数据。使用它可以快速搭建起主机及容器监控的可视化仪表盘，直观优雅的展示监控数据。通过每个仪表盘定义的Prometheus查询语句获取结果后渲染出可视化图形，还可以根据定义的标签对查询条件灵活的切换。

##### 5.1 登陆Grafana

当你安装完Rainbond后，我们已经安装好Grafana服务，如你想自己安装Grafana，可参阅[文档](http://docs.grafana.org/installation/)。默认情况下，Grafana将监听http:// localhost:3000。默认登录名为“admin”/“admin”。如果密码不正确，你可以在`/opt/rainbond/conf/manager-services.yaml`文件中`rbd-grafana`的启动参数中配置`-e GF_SECURITY_ADMIN_PASSWORD="password"`设置admin用户密码。

![](https://static.goodrain.com/images/docs/3.7/monitor/login.png)

##### 5.2 创建Prometheus数据源

1. 单击Grafana徽标以打开侧边栏菜单。
2. 单击侧栏中的设置图标，点击Data Sources。
3. 单击“Add data source”。
4. 选择“Prometheus”作为类型。
5. 设置适当的Prometheus服务器URL（例如，`http://localhost:9090/`）
6. 根据需要调整其他数据源设置（例如，关闭代理访问）。
7. 单击“添加”以保存新数据源。

![](https://static.goodrain.com/images/docs/3.7/monitor/add-datasource1.jpg)

![](https://static.goodrain.com/images/docs/3.7/monitor/add-datasource2.jpg)

##### 5.3 导入Node主机监控模版

Grafana支持通过json文件快速导入你需要的仪表盘模版。[点击这里](https://static.goodrain.com/images/docs/3.7/monitor/Node_Exporter_Full.json)获取Node Exporter的json文件，点击左侧菜单栏的加号，选择`Import`，将json数据复制粘贴到`Or paste JSON`一栏中，点击load按钮，输入名称，选择刚才添加的Prometheus数据源，点击`Import`即可添加模版。

![](https://static.goodrain.com/images/docs/3.7/monitor/import1.jpg)

![](https://static.goodrain.com/images/docs/3.7/monitor/import2.jpg)

> 效果展示如下，可选择Host标签切换节点

![](https://static.goodrain.com/images/docs/3.7/monitor/node-export.png)

##### 5.4 容器监控

容器监控模版的导入方法与上面Node主机监控的导入方法一致，[点击这里](https://static.goodrain.com/images/docs/3.7/monitor/Docker_and_Container_Stats.json)获取json文件。导入后可根据标签`pod_name`来查看某一个pod中容器的监控情况。`Node`标签可切换节点，`interval`可切换间隔时间。

![](https://static.goodrain.com/images/docs/3.7/monitor/contaner.jpg)

##### 5.5 自定制

你可以点击每个仪表盘的名字，选择`Edit`进入编辑页面，在这里你可以看到该仪表盘对应的Prometheus查询语句，该语句查询的数据结果渲染出该仪表盘。你可以根据自己的需求修改这些参数及设置等。

![](https://static.goodrain.com/images/docs/3.7/monitor/edit1.jpg)

![](https://static.goodrain.com/images/docs/3.7/monitor/edit2.jpg)

你也可以点击上方的设置按钮，来编辑整个模版的信息，添加`Variables`标签等。修改后记得点击`Save`保存更改哦。

![](https://static.goodrain.com/images/docs/3.7/monitor/settings.jpg)