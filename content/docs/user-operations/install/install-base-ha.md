---
title: '高可用部署Rainbond'
weight: 1002
description: '快速安装一个高可用的Rainbond集群'
---

Rainbond 高可用安装基于 Kubernetes 集群的高可用，所以在安装 Rainbond 集群前，请确保已经安装符合如下某一条件的 Kubernetes 高可用集群，Kubernetes 集群推荐使用 1.16 及以上版本

- 对于尚未安装高可用 Kubernetes 集群的用户，建议参照[高可用 Kubernetes 集群安装文档](/docs/user-operations/install/kubernetes-install)安装高可用的集群。

- 在阿里云等公有云平台购买 Kubernetes 集群资源（目前还不支持 serverless 模式的 Kubernetes 集群资源，请购买专业模式或托管模式集群）。

- 对于已经安装好 Kubernetes 集群的用户，请对照[高可用 Kubernetes 集群安装文档](/docs/user-operations/install/kubernetes-install)中的节点配置列表，确认是否满足高可用性。

### 先决条件

- `1.13` 及以上版本的 Kubernetes
- 集群至少剩余 `2G` 内存
- 主机 DNS 能够正常解析公网地址
- 确保跨主机的容器之间能够通信
- 集群中至少存在一台机器以下端口可被使用: `80`, `443`, `7070`, `6060`, `8443`, `10254`, `18080`, `18081`

### 安装 Helm（V3）

如果您的环境中还没有安装 Helm ，请安装它。如果已经安装 Helm（3.0+） 请跳过这个步骤。

```bash
#获取helm命令并解压
wget https://get.helm.sh/helm-v3.0.3-linux-amd64.tar.gz && tar xvf helm-v3.0.3-linux-amd64.tar.gz
#拷贝helm命令到指定目录
cp linux-amd64/helm /usr/local/bin/
```

提示：`/usr/local/bin` 在 `$PATH` 环境变量中时可将可执行程序放至此目录下，具体视操作系统决定。

> 注: 下载速度较慢的情况下可从 Rainbond 加速下载，此版本为`3.0.3`

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### 安装 Mysql-operator 控制器

用户可以根据自身需求选择对接外部数据库或通过`Mysql-operator`控制器来实现数据库的高可用，需要安装`Mysql-operator`控制器的用户请执行以下操作

在开始安装前先创建 namespace 资源

```bash
kubectl create namespace rbd-system
```

下载 Mysql-operator Chart 应用包并进行安装

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/mysql-operator-chart.tgz
tar zxvf mysql-operator-chart.tgz
helm install mysql-operator ./mysql-operator -n rbd-system
```

确认 Mysql-operator 所有 pod 均已经就绪

```bash
kubectl get pod -n rbd-system
NAME                                                              READY   STATUS    RESTARTS   AGE
mysql-operator-6c5bcbc7fc-4gjvn                                   1/1     Running   0          5m7s
```

等待 Mysql-operator 均已就绪后，即可开始安装 rainbond-operator

### 下载并运行 Rainbond-Operator 安装控制器

下载 rainbond-operator Chart 应用包：

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/rainbond-operator-chart-v5.2.0-release.tgz && tar xvf rainbond-operator-chart-v5.2.0-release.tgz
```

可选配置参考 `./chart/values.yaml`，默认情况下无需修改。

配置完成即可安装

- 对接外部数据库时 Rainbond-Operator 的安装方式

```bash
#通过helm安装operator到指定namespace
helm install rainbond-operator ./chart -n rbd-system
```

- 使用 Rainbond 官方提供数据库高可用安装时 Rainbond-Operator 的安装方式

```bash
#通过helm安装operator到指定namespace
helm install rainbond-operator ./chart --set enableMySQLOperator=true -n rbd-system
```

执行完毕后, 由于从公网获取镜像需要一定时间，请运行`kubectl get pod -n rbd-system`，确认所有 Pod 都 Ready（如下所示）后进行后续步骤。

```
NAME                  READY   STATUS    RESTARTS   AGE
rainbond-operator-0   2/2     Running   0          110s
```

### 访问 UI 界面，进行安装操作

Rainbond 从 5.2 版本开始采用 UI 配置安装方式，通过 UI 配置 Rainbond 安装需要的相关参数。

#### 访问 **主机 IP:30008**，点击开始安装

如果使用的是阿里云的 kubernetes 资源，请通过 SLB 将 rbd-operator 所在节点的 30008 节点转发至可以访问到的地址

![image-20200309110333545](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/install/install.jpg)

#### 进入下一步，根据需求选择配置，完成后点击配置就绪，开始安装。

- 安装模式

  - 最小化安装

    最小化安装适用于对 rainbond 产品的了解，安装方式简单，占用资源较少

  - 高可用安装（选择）

    高可用安装适用于生产使用，会尽可能保证 rainbond 各组件的高可用性，但会占用较多资源

- 镜像仓库

  用于应用运行镜像存储和集群公共镜像存储，用户按照自身需求选择即可

  - 新安装镜像仓库

    由 rbd-operator 安装镜像仓库，在高可用安装模式下会安装高可用的镜像仓库

  - 提供已有镜像仓库

    由用户提供镜像仓库的相关信息，方便用户管理，由用户自身保证可用性

- 数据中心数据库

  记录数据中心元数据，用户按照自身需求选择即可

  - 新安装数据库

    由 rbd-operator 安装数据中心数据库，在高可用安装模式下会安装高可用的数据库

  - 提供已有数据库

    由用户提供数据库的相关信息，方便用户管理，由用户自身保证可用性

- 控制台数据库

  记录控制台元数据，用户按照自身需求选择即可

  - 新安装数据库

    由 rbd-operator 安装控制台数据库，在高可用安装模式下会安装高可用的数据库

  - 提供已有数据库

    由用户提供数据库的相关信息，方便用户管理，由用户自身保证可用性

- ETCD

  为 rainbond 各组件提供数据存储

  - 新安装 ETCD

    由 rbd-operator 安装 ETCD 服务，在高可用安装模式下会安装高可用的 ETCD 集群

  - 提供已有 ETCD

    由用户 ETCD 服务的相关信息，方便用户管理，由用户自身保证可用性

##### 选择网关管理节点及构建服务运行节点

![image-20200307172713077](https://tva1.sinaimg.cn/large/00831rSTgy1gclhqm5kpkj31z20c0771.jpg)

##### 选择外网 IP

设置网关外网 IP 后会将默认域名解析到改 IP 地址上，如果不设置则会解析到第一个网关安装节点，请确保默认域名解析到的 IP 地址是可以访问的，否则造成应用无法访问的情况

![image-20200307172907395](https://tva1.sinaimg.cn/large/00831rSTgy1gclhsl7z0vj31z20b6gmm.jpg)

##### 选择高可用存储设备

高可用安装必须选择高可用存储设备来为应用提供存储

- 使用阿里云 Kubernetes 集群安装时共享存储建议使用阿里云 NAS，块设备建议阿里云盘
- 使用自有 Kubernetes 集群安装时共享存储建议使用 GFS 集群提供资源，块设备建议使用 ceph 集群提供资源

![image-20200307172822748](https://tva1.sinaimg.cn/large/00831rSTgy1gclhrtkf3qj31z20smdlb.jpg)

配置完成后点击 配置完成，开始安装

#### 集群状态验证

等待安装完成后即可进入如下界面，确定所有组件的组件副本数和已就绪副本数相等，说明集群安装完成且正常运行，点击访问地址登录即可

**安装完成后为了确保集群的安全，请关闭 30008 端口，防止误操作卸载集群**

![image-20200309180404861](https://tva1.sinaimg.cn/large/00831rSTly1gcnu1kw0z7j31ix0u0n1f.jpg)

![image-20200309180416672](https://tva1.sinaimg.cn/large/00831rSTly1gcnu1s6fp3j31z20s040z.jpg)
