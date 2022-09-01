---
title: '离线安装'
weight: 100
description: '基于图形化界面，从离线开始安装 Rainbond '
---

当前安装方式，会引导用户从一台离线服务器开始安装 Rainbond ，服务器可以是物理机、虚拟机或各种云主机。

安装过程中，会首先通过一条命令启动图形化的控制台，后续基于图形化界面，即可完成整个 Rainbond 集群的安装。

与基于主机安装的区别是，离线安装需要手动上传安装 Rainbond 所需的离线安装包。

- 最低配置

|操作系统|CPU|内存|磁盘|内核版本|OpenSSH版本|
| :----: | :----: | :----: | :----: | :----: | :----: |
|Ubuntu16.04/CentOS 7.*|2|8|50G+|4.0+|7.0+|

- 如果您使用 CentOS 7.* 操作系统，请务必提前 [升级内核版本](https://t.goodrain.com/d/9-centos)；
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问；
- 服务器已经安装 NFS 客户端

### 部署 Rainbond 控制台

Rainbond 控制台支持在 Linux、Windows(Docker Desktop) 或 Mac(Docker Desktop) 中运行。

#### 准备工作

- 安装 Docker

- 下载离线安装包

因为是离线安装，所以需要通过其他途径下载安装包后上传到离线服务器中。

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.X/rainbond-offline-v5.8.0-release.tgz
```

- 解压离线安装包  

当安装包上传完毕，然后配置安装包路径并开始解压，这里默认你存放的路径为 ~/rainbond 。

```bash
export RAINBOND_INSTALL_PATH=~/rainbond
cd ${RAINBOND_INSTALL_PATH}
tar xvf rainbond-offline-v5.8.0-release.tgz
```

- 执行准备环境脚本

```bash
cd ${RAINBOND_INSTALL_PATH}/offline/
source install_docker_offline.sh 
```

#### 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-e IS_OFFLINE=true \
-e DISABLE_DEFAULT_APP_MARKET=true \
-e INSTALL_IMAGE_REPO=goodrain.me \
-e RAINBOND_VERSION=v5.8.0-release  \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
goodrain.me/rainbond:v5.8.0-release-allinone
```
:::caution
该创建方式默认会创建 sqlite 数据库，在生产环境中不可用，如果想使用 MYSQL 需要在上述命令行中加上以下变量。
:::

```bash
-e DB_TYPE=mysql \
-e MYSQL_DB=console \
-e MYSQL_PORT=3306 \
-e MYSQL_HOST=** \
-e MYSQL_USER=** \
-e MYSQL_PASS=** \
```


`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 目录中；
- Rainbond 5.3 及以上版本支持控制台数据迁移，便于后续迁移数据到生产环境，请放心体验。

待容器启动成功后，稍等片刻即可在浏览器中访问服务器 `7070` 端口，打开 Rainbond 控制台`注册页面`。请根据提示完成注册操作。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/installation/install-with-ui/rainbond_enroll.jpg" title="注册界面"/>   

到此，恭喜您已经完成了第一步，你还需要继续完成集群的部署。

### 从主机开始安装

登录控制台后，根据左侧导航栏切换到 `集群` 页面，点击 `添加集群` ，进入图形化安装页面。

<img src="https://static.goodrain.com/docs/5.5/user-operations/deploy/install-with-ui/host-install-with-ui/host-install-with-ui-1.png" title="从主机开始安装"/>   


选择 `从主机开始安装` 进入基于主机的安装流程。

`备注:`

- 当前使用的为阿里云服务器，拥有外网IP，在私有部署时服务器没有外网IP的情况下 IP地址和内网IP地址 **统一填写服务器IP地址** 即可。
- 当前演示集群为3个节点，Kubernetes属性 ETCD、管理、计算属性 复用，在自行部署时**根据自身规划**选择节点属性即可。
- kubernetes 集群的安装过程中可以自定义参数，请参考文档 [RKE集群配置](/docs/ops-guide/cluster-manage/manage-rke-cluster/)。

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/add-host.png" title="节点列表"/>   


节点信息填写完毕后，根据页面提示复制节点初始化命令在集群内所有服务器上执行

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init.jpg" title="节点初始化"/>   



初始化完成后，点击 **下一步**，等待 Kubernetes 集群安装成功即可，待状态为 **运行中** 状态时进行下一步操作

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/installed-successfully.png" title="Kubernetes集群状态"/>   

执行完以上操作后在控制台页面选中当前集群，点击进行下一步

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init-rainbond.jpg" title="初始化Rainbond集群"/>   

**自定义集群初始化参数**

Rainbond 的安装部署过程中可以自定义集群初始化参数，在初始化平台集群界面进行配置，具体参数参考文档 [初始化Rainbond集群参数说明](/docs/ops-guide/cluster-manage/init-region/)。

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/custom-parameters.jpg" title="自定义集群参数"/>  

勾选 **我已阅读并已清楚认识上述注意事项** 后，点击 `开始初始化` ，等待安装完成即可。

### 常见问题

通过图形化界面基于主机安装 Rainbond 的过程中遭遇了任何问题，都可以参考文档 [Web界面安装问题排查指南](../install-troubleshoot/ui-install-troubleshoot/) 进行问题排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。


<!-- > Rainbond 支持 ARM CPU 架构部署吗？

Rainbond 企业版支持在华为鲲鹏、飞腾等国产服务器部署，需求请[申请企业服务 POC](https://www.goodrain.com/poc/)。

> 安装集群时报错 `failed to connect to following etcd hosts`

- 该问题属于控制台无法连接报错的ETCD节点。首先确定在配置规划集群节点时，正确的对所有节点执行了节点初始化，完成了免密登录设置。检查方式时在控制台容器中执行 `ssh docker@节点IP` 能够直接免密登录。

- 如果容器中能正常登录，请检查节点 OpenSSH 的版本，检查方式为 `ssh -V`， OpenSSH 的版本要求为 **OpenSSH 7.0+**。如果低于该版本，请升级 OpenSSH 后重试。

> 初始化 Rainbond 集群时长时间阻塞在 `系统所需非组件化镜像本地处理` 步骤

通过 kubectl 查询 rbd-system 这个 namespace 下 pod 启动状态，参考 [排查文档](../user-operations/cluster-manage/check/)

其他问题参考[排查文档](../user-operations/cluster-manage/check/)排查解决。或添加 Rainbond 社区钉钉群咨询。 -->
