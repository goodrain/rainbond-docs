---
title: 应用控制
summary: 用户针对用户可以做哪些操作
toc: true
asciicast: true
---

本文讲解应用的行为，也就是说用户可以对应用做哪些控制。

## 一、应用基本操作

重新部署、启动、关闭、重启和访问是应用最基本和最常用的操作，根据应用的[不同状态](app-properties.html#part-f217864b95b2f14e)，用户可以执行不同的操作，下面会针对每一个操作介绍功能和操作后所触发的事件。

### 1.1 重新部署

> 适用场景：应用的任何状态

针对不同类型的应用，触发 `重新部署` 操作后，有着不同的含义，下表针对不同类型的应用加以说明：

| 应用类型 | 说明|
|-------------|---------------|
| 各语言源代码|拉取最新源代码，通过[rbd-chaos](../../architecture/architecture.html#chaos-ci)调用[builder](https://github.com/goodrain/builder)进行构建，上线应用|
| Dockerfile源码| 拉取最新源代码，通多docker build 创建Docker镜像，push镜像到内部镜像仓库，上线应用|
| Docker镜像| 重新拉取指定镜像地址的镜像，推送到本地镜像仓库，上线应用 |
| 云市应用| 重新拉取云市应用镜像/应用包，推送到本地镜像仓库，上线应用 |

{{site.data.alerts.callout_info}}

- Dockerfile源码类应用就是将Dockerfile及所需要的文件放到Git仓库，通过源代码创建的应用。
- 重新部署后，如果一切顺利，应用会自动切换为新版本并上线，即使代码没有更新，也会触发应用滚动上线的流程。
- 单节点应用重新部署后服务会有3~10秒的中断（根据应用启动时间），多节点应用服务不受影响。
- 处于关闭状态的应用，触发重新部署操作后，如果构建正常，平台会将应用运行起来。

{{site.data.alerts.end}}

### 1.2 启动

> 使用场景：首次构建成功，并处于关闭状态的应用

启动操作会启动上一次成功构建的镜像，如果运行正常会自动上线。

启动后可以在应用概览页面的 `操作日志` 看到平台调度与处理服务的详细操作日志，当调度完成后，应用就进入启动阶段，这时候可以通过 `日志` 页面查看应用的启动日志。

- 应用概览页的操作日志
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-start-log01.png" width="100%" />


- 应用日志页面
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-start-log02.png" width="100%" />

### 1.3 关闭

> 使用场景：运行中或运行异常的应用

触发关闭操作后，平台会将应用的从负载均衡下线并关闭应用容器，多个节点的应用会滚动下线。

### 1.4 重启

> 使用场景：运行中或运行异常的应用

触发重启操作后，平台会将现有的应用重启，对应后端的操作是，先关闭，再启动。

{{site.data.alerts.callout_danger}}

- 重启应用并不会更新应用代码或镜像，需要和`重新部署`操作区分。
- 重启操作会中断应用的服务。

{{site.data.alerts.end}}

### 1.5 访问

> 使用场景：运行中的应用 && （打开了对外服务 | 对内服务的端口）

针对不同协议的应用，点击访问按钮后所触发的命令也不一样：

| 应用协议| 点击访问按钮后的操作|
|--------|-------------------|
| HTTP| 浏览器新开窗口，打开应用的默认域名，如果绑定多个域名，会显示域名列表供用户选择|
| TCP | 弹出访问信息窗口|

- HTTP协议应用

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-open-http.gif" width="85%" />

- TCP协议应用

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-open-tcp.gif" width="85%" />

## 二、回滚应用到指定版本

应用每次成功部署后，都会生成一个应用版本，每个版本对应一次代码提交（基于源码创建），或者一个镜像（Docker镜像创建）。

通过 `构建版本管理` 功能，可以将应用回滚到指定版本。

- 构建版本管理

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback01.png" width="100%" />


- 回滚到指定版本
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback02.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 回滚操作是关闭现有版本应用，再启动其他版本应用的过程，本质上是一个应用重启的操作，因此针对单节点应用会中断服务。
- 多节点应用回滚操作采用滚动升级方式，因此时不会影响服务，但会有较短的时间同时存在2种版本的情况。

{{site.data.alerts.end}}


## 三、伸缩应用

平台应用有两种伸缩方式：

- 垂直伸缩：增加或减少应用的内存（应用CPU与内存是联动的，按照一定的[比例调整](#3-1-cpu)）
- 水平伸缩：增加或减少应用的实例数

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-scaling01.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 垂直伸缩时平台会自动调整资源后重启应用，单节点应用服务会中断，多节点应用服务不受影响。
- 水平伸缩时平台通过滚动新增或者下线节点的方式进行操作，因此操作不会影响现有服务。

{{site.data.alerts.end}}


### 3.1 垂直伸缩CPU与内存比例关系

| 申请值比例（CPU/内存） | 限制值比例（CPU/内存) |
|-----------------------|---------|
|0.24/1|1.28/1|

{{site.data.alerts.callout_info}}

- Kubernetes 针对CPU和内存分为申请值与限制值，详情参见: [管理容器的计算资源](https://kubernetes.io/cn/docs/concepts/configuration/manage-compute-resources-container/)
- 平台目前调整的CPU与内存占比是经过生产环境验证过，目前平台还没有提供修改占比的方式。

{{site.data.alerts.end}}



## 四、添加应用存储

### 4.1 应用为什么要添加存储

应用是平台的抽象概念，底层是通过容器封装运行起来的，容器默认是没有存储的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。

因此，为了保存程序运行中的文件，需要给容器挂载一个存储，在rainbond中，只要给应用挂载一个存储，即使应用水平扩展几十上百个节点，平台都会自动挂载。

### 4.2 如何为应用添加存储

为应用添加存储有两种方式：

- <b>(1) 新增应用存储</b>

找到 【存储】页面

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage01.png" width="100%" />

点击 【添加持久化】按钮

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage02.png" width="60%" />

存储添加完成

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage03.png" width="100%" />


- <b>(2) 挂载其他应用的存储</b>

在【存储】页面找到 【挂载目录】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage04.png" width="100%" />

点击【挂载目录】按钮后，勾选需要挂载其他应用的名称，并填写挂载到本应用的目录
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage05.png" width="90%" />

完成挂载其他应用存储

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage06.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 新增或挂载其他应用的存储后，需要重启应用。
- 新增或挂载其他应用存储时，本应用的路径不能使用Linux系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等

{{site.data.alerts.end}}

## 五、添加应用依赖服务

### 5.1 应用为什么要依赖其他服务

当一个独立的业务系统不能完成所有功能时，就需要借助其他的服务来实现。如web服务一般都需要数据库存储数据，前端页面展现程序需要调用后端API服务获取数据等等。

建立应用依赖的操作请参考：[添加数据库依赖](../link-db.html)

### 5.2 应用如何连接依赖服务

当应用与依赖的服务建立起关联后，下一步就是连接依赖服务。

在【依赖】页面中的 【依赖应用信息】可以看到已经依赖的服务：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-link01.png" width="100%" />

- <b>(1) 获取连接信息 </b>

选择其中一个依赖服务，点击【连接信息】会弹出连接信息页面:
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-link02.png" width="60%" />

- <b>(2) 应用连接依赖服务</b>

当应用添加了依赖，并且查看了连接信息后，下一步就是修改应用的配置，连接依赖的服务，以Springcloud程序为例介绍通过环境变量的形式连接依赖的服务：

`application.yml` 文件

```yml
...
spring:
  data:
    mysql:
      host: ${MYSQL_HOST}
      username: ${MYSQL_USER}
      password: ${MySQL_PASS}
      database: ${MYSQL_DB}
      port: ${MYSQL_PORT}
...
```
其他各类语言都有获取环境变量的方法，如果不想用环境变量，也可以使用直接变量值。

## 六、应用端口与域名管理

### 6.1 应用端口管理

端口相关的管理包含，端口号，端口协议，端口访问控制、对内服务端口变量设置等操作，下图是不同团队、不同端口的应用开启了不同访问控制后的示意图：

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/port-manage.png" width="100%" />


#### 端口号设置
应用端口与容器内部程序监听的端口是完全对应的关系，也就是说，当程序启动后监听的端口是80，那应用的端口就应该设置为80

#### 端口协议
端口号可以指定不同的协议类型，目前Rainbond支持 `HTTP`、`TCP`、`UDP`和 `MySQL` 协议 针对HTTP协议是按照虚拟主机的形式来为每一个应用分配一个默认域名，如果是TCP协议，平台会为应用分配IP+端口号的方式

## 进入到应用容器命令行

## 查看应用日志

## 应用高级设置

## 删除应用