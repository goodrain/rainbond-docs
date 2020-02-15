---
title: "最小化部署Rainbond"
weight: 1001
description: "此方式适用于快速安装和试用Rainbond平台。"
---

> Rainbond V5.2.0版本处于beta状态，当前仅提供ALL-IN-ONE最小安装模式，在版本Release之前支持完整高可用安装，该安装教程可能修改。

开始Rainbond之前你需要完成Kubernetes集群的安装，若你还没完成，请参考文档[kubernetes集群的安装](../k8s-install/)

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


### 下载并运行Rainbond-Operator安装控制器

下载rainbond-operator Chart应用包：

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/helm/rainbond-operator-charts.tgz && tar xvf rainbond-operator-charts.tgz

```

可选配置参考 `./rainbond-operator-charts/values.yaml`，默认情况下无需修改。

配置完成即可安装：
```bash
#创建所需namespace
kubectl create ns rbd-system
#通过helm安装operator到指定namespace
helm install rainbond-operator ./rainbond-operator-charts --namespace=rbd-system
```

执行完毕后, 由于从公网获取镜像需要一定时间，请运行```kubectl get pod -n rbd-system```，确认所有Pod都Ready（如下所示）后进行后续步骤。

```
NAME                  READY   STATUS    RESTARTS   AGE
rainbond-operator-0   2/2     Running   0          110s
```


### 访问UI界面，进行安装操作
   Rainbond 从5.2版本开始采用UI配置安装方式，通过UI配置Rainbond安装需要的相关参数。

#### 访问 **主机IP:30008**，点击开始安装

![屏幕快照 2020-02-04 14.11.50](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-1.jpg)

#### 进入下一步，按照如下方式选择配置，完成后点击配置就绪，开始安装。


| 配置 | 配置介绍 |
| :----: | :--- |
|*镜像仓库* |Rainbond集群所有应用的版本以镜像的方式存储于镜像仓库中，我们希望在集群内网具备一个可用的镜像仓库，如有请提供，如无Rainbond安装器将自动安装。|
|*数据库* |数据库需求分为数据中心数据库和控制台数据库，你可以提供已经存在的数据库连接信息，比如阿里云RDS。|
|*ETCD* |Rainbond默认不会使用Kubernetes使用的ETCD,若你希望自行安装或使用已有的ETCD集群，请提供访问信息。|
|*网关安装节点*  |网关安装可选节点取自集群中的所有管理节点，安装网关组件会使用宿主机网络并占用 80 443 8443 6060 8888 等端口。若节点这些端口已被占用，则会出现故障。|
|*默认域名* |是指Rainbond默认会分配一个泛域名解析地址（grapps.cn结尾），用于HTTP类应用默认分配访问地址。若你希望使用你自己的地址，请提供，并自行做好泛域名解析。|
|*网关外网IP* |作用于上文讲到的域名解析和数据中心对外提供API的证书签发。若网关节点绑定了外网IP或虚拟IP，请填写。|



![image-20200204141624281](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-2.jpg)

![image-20200204141711541](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-3.jpg)

#### 进入安装等待界面，完成后弹出如下界面，点击访问地址即可访问rainbond平台

安装过程取决于你的配置信息，大致分为6个阶段，每一个阶段都具有进度信息供你参考。

![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)


### 安装命令行工具

   命令行工具(grctl)提供一些便于Rainbond运维的工具命令，安装此命令需要用户操作集群管理节点机器。进入集群管理节点，该节点必须具备以下条件：

1. 具有kubectl命令，且可用。
2. 存在访问Kubernetes集群的 ~/.kube/conf文件。

安装方式：

```
docker run -it --rm -v /:/rootfs registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:V5.2-dev copy
mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl
/usr/local/bin/grctl install
```

若输出`Install success`则安装成功。
具体功能参考 `grctl --help`

