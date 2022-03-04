---
title: 通用数据初始化插件
Description: 借助数据初始化插件对应用进行方便简单的数据初始化
weight: 22004
---

### 概述

项目地址：https://github.com/goodrain/data-initer-plugin

这是一个用于初始化数据的插件，适用于包括 Rainbond 在内的所有基于 Kubernetes 体系的云平台使用。

其基本的原理，是利用 Kubernetes 的 [init容器](https://kubernetes.io/zh/docs/concepts/workloads/pods/init-containers/) 实现的。插件所在的容器会在业务容器启动之前运行直至完成，通过定义好的下载、解压逻辑，将事先准备好的初始化数据压缩包（仅支持 zip 、tgz、 tar.gz 三种格式）解压到目标目录中去，下载过程支持断点续传。当然，我们要事先将目标目录进行持久化的设置。

插件需要的环境变量配置如下：

|ENV|VALUE|Tip|
|:---:|:---:|:---:|
|FILE_URL|url|初始化文件下载地址|
|FILE_PATH|path to dir|单个目录初始化时，指定持久化目录地址；多目录初始化时，指定 `/`|
|EXTRACT_FILE|true/false|默认自动对初始化文件进行解压|
|DOWNLOAD_ARGS| -X ,--xx |适用于 `wget` 的额外命令行参数|
|LOCK_PATH|path to dir|锁文件保存路径，指定任意存在的持久化目录|
|DEBUG|anything true|开启 Debug 日志|




### 在 Rainbond 构建插件

Rainbond 的插件机制中，有对 init 容器的天然支持 —— 初始化类型插件。



#### 1. 新建插件

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-1.jpeg" width="100%" title="新建插件" /> 



#### 2. 填写构建源信息

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-2.jpeg" width="100%" title="构建源信息" />

关键信息包括：

- 源码地址：https://github.com/goodrain/data-initer-plugin.git 当选择Dockerfile安装时，需要提供的代码地址
- 代码版本：main

接下来点击创建插件，等待构建成功即可。



#### 3. 声明插件配置

这一步，我们需要声明这个插件都可以接收什么样的配置。从概述一节中，我们知道这个插件正常工作时需要定义几个环境变量的。

进入配置组管理处，添加一组配置：

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-3.png" width="100%" title="声明插件配置" />

保存配置后，插件就做好了。



### 如何使用插件

#### 1. 前提条件

- 需要被初始化数据的服务组件已经设置好持久化目录。
- 持久化数据已经打包完成（支持格式zip、tgz、tar.gz），并上传到对象存储中。



#### 2. 安装并配置插件

- 为服务组件安装已经制作好的 通用数据初始化插件。
- 查看配置，输入初始化数据包的下载地址(FILE_URL)、目标持久化目录(FILE_PATH)、锁文件保存目录(LOCK_PATH)之后，更新配置。

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/data-initialization/data-initialization-4.png" width="100%" title="配置插件" />

- 更新内存，由于初始化类型插件在运行结束后会自动退出，所以大家不用担心占据资源过大的情况。内存值的设定可以尽量放大，以稍微大于持久化数据包的大小为宜。这会加快下载以及解压的速度。



#### 3. 构建并启动服务组件

观测日志，如果输出如下， 则说明数据初始化过程已经开始：

```bash
7b554df4b7bb:Connecting to rainbond-pkg.oss-cn-shanghai.aliyuncs.com (106.14.228.173:443)

7b554df4b7bb:data.tgz           0% |                                |  367k  2:45:46 ETA
```

等待下载解压完成后，服务组件就会进入正常的启动流程中。



#### 4. 拆除插件

该插件具备读写服务组件持久化数据目录的权限，虽然我们已经加入了防止重复初始化的实现逻辑，但是我们依然 **强烈要求** 在数据初始化成功后，卸载该插件。

### 如何初始化多个目录

上文中的基本使用方法，可以针对某个指定的目录进行数据初始化。然而，实际情况下，有可能会需要同时针对多个目录进行数据初始化，并且多个目录并没有从属于同一个父级目录。比如需要同时向 `/app` 、`/data/a` 、`/root/.b` 3 个目录进行数据初始化的情况。

针对这样的情况，我们可以从数据打包的角度来解决这一问题。通过指定的打包方式，将所有数据打包到同一个压缩包中去，并在下载解压后，直接解压到每一个目录中去。

打包方式如下：

```bash
tar cvzf data.tgz /app /data/a /root/.b
```

将打包出来的文件，上传对象存储后，得到下载 URL， 例如 https://goodrain-delivery.oss-cn-hangzhou.aliyuncs.com/somedir/data.tgz

在 Rainbond 平台中操作时，流程大致如下：

- 将 3 个目标目录全部设置持久化
- 安装通用数据初始化插件
- 填写 FILE_URL ，使用刚才获得的 URL 即可
- 填写 FILE_PATH ，其值为 `/` 这是最关键的一步
- 填写 LOCK_PATH ，其值必须为已存在的持久化存储路径
- 启动组件，即可开始初始化流程

### 关于锁文件

在首次初始化完成后，将会在 LOCK_PATH 下生成一个隐藏文件，即锁文件。后续的重启过程将识别这一锁文件，如存在，则跳过初始化流程。这样做的目的在于避免重复初始化数据。

### 关于对象存储



我们推荐将初始化数据包放在对象存储中，并提供 Rainbond 平台可以访问的下载地址。

常见的自建对象存储有以下两种情况：

- 基于 S3 协议实现的对象存储软件，如 Minio ，可以在 Rainbond 对接开源应用商店后搜索并安装。
- 公有云服务商所提供的对象存储服务，如阿里云OSS。



