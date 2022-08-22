---
title: 'Offline installation'
weight: 100
description: 'Based on the graphical interface, install Rainbond from offline'
---

The current installation method will guide users to install Rainbond from an offline server. The server can be a physical machine, a virtual machine or various cloud hosts.

During the installation process, the graphical console will be started first through a command, and then based on the graphical interface, the installation of the entire Rainbond cluster can be completed.

The difference from host-based installation is that offline installation requires manually uploading the offline installation package required to install Rainbond.

- Minimum configuration

|    operating system    | CPU | Memory | disk | kernel version | OpenSSH version |
|:----------------------:|:---:|:------:|:----:|:--------------:|:---------------:|
| Ubuntu16.04/CentOS 7.* |  2  |   8    | 50G+ |      4.0+      |      7.0+       |

- If you use CentOS 7.* operating system, please be sure to upgrade kernel version in advance
- Ensure that the server `80, 443, 6060, 6443, 7070, 8443` ports can be accessed;
- Server has NFS client installed

### Deploy the Rainbond Console

The Rainbond console supports running in Linux, Windows (Docker Desktop) or Mac (Docker Desktop).



#### Preparation

- Install Docker

- Download offline installation package

Because it is installed offline, you need to download the installation package through other channels and upload it to the offline server.



```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.X/rainbond-offline-v5.8.0-release.tgz
```


- Unzip the offline installation package

When the installation package is uploaded, configure the installation package path and start decompression. The default path you store here is ~/rainbond.



```bash
export RAINBOND_INSTALL_PATH=~/rainbond
cd ${RAINBOND_INSTALL_PATH}
tar xvf rainbond-offline-v5.8.0-release.tgz
```


- Execute the prepare environment script



```bash
cd ${RAINBOND_INSTALL_PATH}/offline/
source install_docker_offline.sh 
```




#### Start the All-In-One Console



```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-e IS_OFFLINE=true \
-e DISABLE_DEFAULT_APP_MARKET=true \
-e INSTALL_IMAGE_REPO=goodrain.me \
-e RAINBOND_VERSION=v5.8.0-release \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
goodrain.me/rainbond:v5.8.0-release-allinone
```


:::caution
This creation method will create a sqlite database by default, which is not available in the production environment. If you want to use MYSQL, you need to add the following variables to the above command line.
:::



```bash
-e DB_TYPE=mysql \
-e MYSQL_DB=console \
-e MYSQL_PORT=3306 \
-e MYSQL_HOST=** \
-e MYSQL_USER=** \
-e MYSQL_PASS=** \
```


`Remark:`

- The console will generate data that needs to be persisted and stored in the `~/rainbonddata` directory of your deployment node;
- Rainbond 5.3 and above supports console data migration, which is convenient for subsequent data migration to the production environment. Please feel free to experience it.

After the container is successfully started, after a while, you can access the server `7070` port in the browser, and open the Rainbond console`registration page`.Please follow the prompts to complete the registration.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/installation/install-with-ui/rainbond_enroll.jpg" title="Registration interface" />   

At this point, congratulations that you have completed the first step, you still need to continue to complete the deployment of the cluster.



### Install from the host

After logging in to the console, switch to the `cluster` page according to the left navigation bar, click `to add cluster` , and enter the graphical installation page.

<img src="https://static.goodrain.com/docs/5.5/user-operations/deploy/install-with-ui/host-install-with-ui/host-install-with-ui-1.png" title="Install from the host" />   

Select `to start the installation from the host` to enter the host-based installation process.

`Remark:`

- The currently used Alibaba Cloud server has an external network IP. If the server does not have an external network IP during private deployment, the IP address and the internal network IP address **can be uniformly filled in with the server IP address**.
- The current demonstration cluster consists of 3 nodes, and the Kubernetes attributes such as**, management, and computing attributes are reused. When deploying by yourself, you can select the node attributes according to your own planning and**.
- Parameters can be customized during the installation of kubernetes cluster, please refer to document [RKE cluster configuration](/docs/ops-guide/cluster-manage/manage-rke-cluster/).

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/add-host.png" title="Node list" />   

After filling in the node information, follow the prompts on the page to copy the node initialization command and execute it on all servers in the cluster

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init.jpg" title="Node initialization" />   

After the initialization is complete, click **, next step**, wait for the Kubernetes cluster to be installed successfully, and go to the next step when the status is **running**

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/installed-successfully.png" title="Kubernetes cluster status" />   

After performing the above operations, select the current cluster on the console page and click Next.

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init-rainbond.jpg" title="Initialize the Rainbond cluster" />   

**Custom cluster initialization parameters**

During the installation and deployment of Rainbond, you can customize the cluster initialization parameters and configure them in the initialization platform cluster interface. For specific parameters, please refer to document [Initializing Rainbond Cluster Parameter Description](/docs/ops-guide/cluster-manage/init-region/).

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/custom-parameters.jpg" title="Custom cluster parameters" />  

Check **I have read and have a clear understanding of the above precautions** , click `to start initialization` , and wait for the installation to complete.



### common problem

If you encounter any problems in the process of installing Rainbond based on the host through the graphical interface, you can refer to Document [Web Interface Installation Troubleshooting Guide](../install-troubleshoot/ui-install-troubleshoot/) for troubleshooting.



## Next step

Refer to[Quick Start](/docs/quick-start/getting-started/)to deploy your first application.

<!-- > Rainbond 支持 ARM CPU 架构部署吗？

Rainbond 企业版支持在华为鲲鹏、飞腾等国产服务器部署，需求请[申请企业服务 POC](https://www.goodrain.com/poc/)。

> 安装集群时报错 `failed to connect to following etcd hosts`

- 该问题属于控制台无法连接报错的ETCD节点。首先确定在配置规划集群节点时，正确的对所有节点执行了节点初始化，完成了免密登录设置。检查方式时在控制台容器中执行 `ssh docker@节点IP` 能够直接免密登录。

- 如果容器中能正常登录，请检查节点 OpenSSH 的版本，检查方式为 `ssh -V`， OpenSSH 的版本要求为 **OpenSSH 7.0+**。如果低于该版本，请升级 OpenSSH 后重试。

> 初始化 Rainbond 集群时长时间阻塞在 `系统所需非组件化镜像本地处理` 步骤

通过 kubectl 查询 rbd-system 这个 namespace 下 pod 启动状态，参考 [排查文档](../user-operations/cluster-manage/check/)

其他问题参考[排查文档](../user-operations/cluster-manage/check/)排查解决。或添加 Rainbond 社区钉钉群咨询。 -->
