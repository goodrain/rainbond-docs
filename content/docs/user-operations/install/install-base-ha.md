---
title: "Rainbond高可用部署"
weight: 1002
description: "引导用户安装高可用的Rainbond集群"
---

Rainbond 高可用安装基于k8s集群的高可用，所以在安装rainbond集群前，请确保已经安装符合如下某一条件的k8s高可用集群

- 对于尚未安装高可用k8s集群的用户，建议参照[高可用k8s集群安装文档](/docs/user-operations/install/k8s-install)安装高可用的集群。

- 在阿里云等公有云平台购买k8s集群资源（目前还不支持serverless模式的k8s集群资源，请购买专业模式或托管模式集群）。

- 对于已经安装好k8s集群的用户，请对照[高可用k8s集群安装文档](/docs/user-operations/install/k8s-install)中的节点配置列表，确认是否满足高可用性。

### 安装 Helm（V3）

如果您的环境中还没有安装 Helm ，请安装它。如果已经安装 Helm（3.0+） 请跳过这个步骤。

```bash
#获取helm命令并解压
wget https://get.helm.sh/helm-v3.0.3-linux-amd64.tar.gz && tar xvf helm-v3.0.3-linux-amd64.tar.gz
#copyhelm命令到指定目录
cp linux-amd64/helm /usr/local/bin/
```

> 注: 下载速度较慢的情况下可从Rainbond加速下载，此版本为`3.0.3`

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```



### 集群元数据存储组件高可用

为保证rainbond集群的高可用，需要对于其中的数据存储组件做出特殊处理，数据存储组件为etcd和mysql数据库

- 对于希望自己提供集群元数据存储资源的用户，请参考对接外部元数据存储组件时Rainbond-Operator的安装方式

- 其他用户请执行以下命令来为etcd高可用集群和mysql高可用集群的安装做好准备工作



在开始安装前先创建所需的namespace

```bash
kubectl create namespace rbd-system
```

#### 安装Etcd-operator控制器

添加etcd-operator所在的helm仓库并安装

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm install etcd-operator stable/etcd-operator -n rbd-system
```

确认Etcd-operator所有pod均已经就绪

```bash
kubectl get pod -n rbd-system
NAME                                                              READY   STATUS    RESTARTS   AGE
etcd-operator-etcd-operator-etcd-backup-operator-88d6bc55cd8jqx   1/1     Running   0          7m15s
etcd-operator-etcd-operator-etcd-operator-56c55d965f-5vt9r        1/1     Running   0          2m9s
etcd-operator-etcd-operator-etcd-restore-operator-55f6ccbf5889g   1/1     Running   0          7m15s
```

#### 安装Mysq-operator控制器

下载Mysq-operator Chart应用包并进行安装

    wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/mysql-operator-chart.tgz
    tar zxvf mysql-operator-chart.tgz
    helm install mysql-operator ./mysql-operator -n rbd-system
确认Mysq-operator所有pod均已经就绪

```bash
kubectl get pod -n rbd-system
NAME                                                              READY   STATUS    RESTARTS   AGE
mysql-operator-6c5bcbc7fc-4gjvn                                   1/1     Running   0          5m7s
```



等待Etcd-operator及Mysq-operato均已就绪后，即可开始安装rainbond-operator

### 下载并运行Rainbond-Operator安装控制器

下载rainbond-operator Chart应用包：

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/rainbond-operator-chart-v0.0.1-beta2-V5.2-dev.tgz && tar xvf rainbond-operator-chart-v0.0.1-beta2-V5.2-dev.tgz
```

可选配置参考 `./chart/values.yaml`，默认情况下无需修改。

配置完成即可安装

- 对接外部元数据存储组件时Rainbond-Operator的安装方式

```bash
#通过helm安装operator到指定namespace
helm install rainbond-operator ./chart -n rbd-system
```

- 使用Rainbond官方提供元数据组件高可用安装时Rainbond-Operator的安装方式

```bash
#通过helm安装operator到指定namespace
helm install rainbond-operator ./chart --set enableEtcdOperator=true --set enableMySQLOperator=true -n rbd-system
```

执行完毕后, 由于从公网获取镜像需要一定时间，请运行```kubectl get pod -n rbd-system```，确认所有Pod都Ready（如下所示）后进行后续步骤。

```
NAME                  READY   STATUS    RESTARTS   AGE
rainbond-operator-0   2/2     Running   0          110s
```

### 访问UI界面，进行安装操作
   Rainbond 从5.2版本开始采用UI配置安装方式，通过UI配置Rainbond安装需要的相关参数。

#### 访问 **主机IP:30008**，点击开始安装

![image-20200309110333545](https://tva1.sinaimg.cn/large/00831rSTly1gcnhw2pbuzj31h50u0q6f.jpg)

#### 进入下一步，按照如下方式选择配置，完成后点击配置就绪，开始安装。


|      配置      | 配置介绍                                                     |
| :------------: | :----------------------------------------------------------- |
|   *镜像仓库*   | Rainbond集群所有应用的版本以镜像的方式存储于镜像仓库中，我们希望在集群内网具备一个可用的镜像仓库，如有请提供，如无Rainbond安装器将自动安装。 |
|    *数据库*    | 数据库需求分为数据中心数据库和控制台数据库，你可以提供已经存在的数据库连接信息，比如阿里云RDS。 |
|     *ETCD*     | Rainbond默认不会使用Kubernetes使用的ETCD,若你希望自行安装或使用已有的ETCD集群，请提供访问信息。 |
| *网关安装节点* | 网关安装可选节点取自集群中的所有管理节点，安装网关组件会使用宿主机网络并占用 80 443 8443 6060 8888 等端口。若节点这些端口已被占用，则会出现故障。 |
|   *默认域名*   | 是指Rainbond默认会分配一个泛域名解析地址（grapps.cn结尾），用于HTTP类应用默认分配访问地址。若你希望使用你自己的地址，请提供，并自行做好泛域名解析。 |
|  *网关外网IP*  | 作用于上文讲到的域名解析和数据中心对外提供API的证书签发。若网关节点绑定了外网IP或虚拟IP，请填写。 |

##### 安装模式选择高可用安装

![image-20200307172634890](https://tva1.sinaimg.cn/large/00831rSTgy1gclhq1xvetj31o00u0wll.jpg)

##### 选择网关管理节点及构建服务运行节点

![image-20200307172713077](https://tva1.sinaimg.cn/large/00831rSTgy1gclhqm5kpkj31z20c0771.jpg)

##### 选择外网IP

![image-20200307172907395](https://tva1.sinaimg.cn/large/00831rSTgy1gclhsl7z0vj31z20b6gmm.jpg)

##### 选择高可用存储设备

高可用安装必须选择高可用存储设备来为应用提供存储

- 使用阿里云k8s集群安装时共享存储建议使用阿里云NAS，块设备建议阿里云盘
- 使用自有k8s集群安装时共享存储建议使用GFS集群提供资源，块设备建议使用ceph集群提供资源

![image-20200307172822748](https://tva1.sinaimg.cn/large/00831rSTgy1gclhrtkf3qj31z20smdlb.jpg)

配置完成后点击 配置完成，开始安装

#### 集群状态验证

等待安装完成后即可进入如下界面，确定所有组件的组件副本数和已就绪副本数相等，说明集群安装完成且正常运行，点击访问地址登录即可

![image-20200309180404861](https://tva1.sinaimg.cn/large/00831rSTly1gcnu1kw0z7j31ix0u0n1f.jpg)

![image-20200309180416672](https://tva1.sinaimg.cn/large/00831rSTly1gcnu1s6fp3j31z20s040z.jpg)