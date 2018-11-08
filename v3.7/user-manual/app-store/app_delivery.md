---
title: 应用交付与导入导出
summary: 应用交付与导入导出
toc: true
---

## 一、使用好雨公有云市在线交付

对于有在线环境的用户，可以直接使用好雨公有云市进行业务交付，将业务系统发布到好雨公有云市，用户可在公有云市直接下载一件安装整套业务系统。
具体的发布应用到公有市场和下载安装应用，请参考文章 <a href="./publish_and_install.html" target="_blank" >应用发布与安装</a>

## 二、使用导入导出离线交付

考虑到离线环境的应用交付，我们RainBond设计实现了应用到离线导入和导出功能。复杂的业务系统可以借助网络或离线应用包快速的在不同的环境中交付，安装速度和易用性远远超出传统的交付。除了标准Rainbond应用模型以外，同时还支持导出docker-compose模型脱离Rainbond平台便捷交付。

### 2.1 应用导出
 

为了让用户能够更好的管理自己的应用，快捷简单交付业务，我们为平台设计了应用导入导出功能，该功能允许用户通过简单的几次点击，就可以将内部市场的应用打包为一个压缩文件，并可以下载到本地。在导出的时候，支持两种格式，一种为`rainbond-app`格式，另一种为`docker-compose`格式。

> 云市同步的应用不支持导出compose文件，只支持导出`rainbond-app`格式。

#### 2.1.1 格式说明

1. `rainbond-app`：为了在多个云帮之间迁移应用而设计，即在A平台导出后，可以导入到B平台，但导出后的文件不能直接运行，导出的文件是一个zip格式的压缩包，其中包含了该应用的描述信息、每个组件的镜像或源码包等。

2. `docker-compose`：为了快速交付而设计，当我们把云帮上的应用交付给用户时，就需要让应用具备脱离平台可运行的能力，这样才能避免为了使用一个应用而不得不先部署平台的问题，`docker-compose`导出格式可以在安装有[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)的环境中运行，假设我们现在导出了一个`docker-compose`文件且名为`web.tar`，那么执行以下命令运行它：

````
    tar -xf web.tar
    ./web/run.sh
````

​      使用这种可运行的格式有以下需要注意的事项：

* 依赖环境：应用的运行需要依赖[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)，如果您的系统中没有安装它们，`run.sh`脚本将会自动为您安装，所以请保证您的系统能够连接互连网，否则请手动安装这两个工具。

* 端口是否可用，假如我们导出了一个WEB应用，如果它在启动时需要监听80端口，则物理机上的80端口必须是空闲状态，否则会因为端口冲突而导致应用启动失败。

 

#### 2.1.2 应用导出

应用导出是由数据中心`rbd-chaos`组件将应用所需的镜像或slug包与定义元数据一起压缩成一个zip或tar文件，将文件放到指定目录下供用户下载。
* 登录Rainbond，并进入`内部市场`页面。
* 找到想要导出的应用，并点击该应用版块上的`导出应用`

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-1.jpg" width='100%' />

* 点击导出后，导出状态会显示为导出中

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-2.jpg" width='100%' />

* 完成导出后，点击`下载`即可将文件下载到本地，导出的文件存放在数据中心下的/grdata/app/rainbond-app或/grdata/app/docker-compose下

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-3.jpg" width='100%' />



#### 2.1.3 批量导出

云帮导出的应用包文件会很大，如果网络不好的情况下，我们建议您直接在对应的数据中心的服务器上进行操作。

每个应用在打包完成后，都会存储在某个数据中心的`/grdata/app`目录中，利用这一点，我们可以批量导出平台中的应用。

1. 登录云帮，并进入“内部市场”页面。

2. 找到想要导出的应用，并依次点击它们的导出按钮，等待平台打包完成即可。

3. 等待平台打包完成后，登录到数据中心对应的服务器，假设我们要把所有导出的应用包复制到`/mnt/sdc1/`目录中，执行以下命令：

   ```
       find /grdata/app -maxdepth 2 -name '*.zip' | xargs -I FF cp FF /mnt/sdc1/
   ```

 

## 2.2、应用导入

应用导入任务发起后，由数据中心的`rbd-chaos`组件将用户上传的RainbondAPP文件解压，保存定义的元数据及镜像或slug包，用于安装构建应用时使用。
对于导出的应用，您也可以通过`离线导入应用`功能将应用导入到内部市场。在Rainbod左侧导航栏进入`内部市场`，点击`离线导入应用`，上传你的RainbondAPP文件开始导入。

应用导入有以下两种方式：

1. 如果你的网络情况不乐观的情况下，我们建议您直接在对应的数据中心的服务器上进行操作。你可以将RainbondAPP文件复制到数据中心管理节点上我们提供的目录下
2. 如果网络情况较好，可以直接通过网络上传文件至数据中心指定目录下

开启`自动识别`，Rainbond自动识别已上传RainbondAPP文件，选中要导入的APP(支持批量导入)，点击`确认导入`向数据中心发送导入请求并开始导入应用。

具体操作如下：

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/import.gif" width='100%' />



应用导入成功后，可在内部市场看到你导入的应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/import-1.jpg" width='100%' />