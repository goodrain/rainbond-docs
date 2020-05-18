---
title: '最小化部署Rainbond'
weight: 1001
description: '此方式适用于快速安装和试用Rainbond平台。'
---

安装 Rainbond 之前你需要完成 Kubernetes 集群的安装，若你还没有安装 Kubernetes，请参考文档[kubernetes 集群的安装](../kubernetes-install/)首先安装 kubernetes 集群，推荐使用 1.16 及以上版本。

### 先决条件

- `1.13` 及以上版本的 Kubernetes
- 集群至少剩余 `2G` 调度内存
- 主机 DNS 能够正常解析公网地址
- 确保跨主机的容器之间能够通信
- 集群中至少存在一台机器以下端口可被使用: `80`, `443`, `7070`, `6060`, `8443`, `10254`, `18080`, `18081`

### 一.安装 Helm（V3）

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

### 二. 下载并运行 Rainbond-Operator 安装控制器

下载 Rainbond-operator Chart 应用包：

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/rainbond-operator-chart-v5.2.0-release.tgz && tar xvf rainbond-operator-chart-v5.2.0-release.tgz
```

可选配置参考 `./chart/values.yaml`，默认情况下无需修改。

配置完成即可安装：

```bash
#创建所需namespace
kubectl create namespace rbd-system
#通过helm安装operator到指定namespace
helm install rainbond-operator ./chart --namespace=rbd-system
```

> 注意，namespace 目前只支持 `rbd-system`，暂不支持其他的 namespace。

执行完毕后, 由于从公网获取镜像需要一定时间，请运行以下命令，确认所有 Pod 都 Ready（如下所示）后进行后续步骤。

```
$ kubectl get pod -n rbd-system
NAME                  READY   STATUS    RESTARTS   AGE
rainbond-operator-0   2/2     Running   0          110s
```

### 三.访问 UI 界面，进行安装操作

Rainbond 从 5.2 版本开始采用 UI 配置安装方式，通过 UI 配置 Rainbond 安装需要的相关参数。

#### 访问 **主机 IP:30008**，点击开始安装

如果使用的是阿里云的 kubernetes 资源，请通过 SLB 将 rbd-operator 所在节点的 30008 节点转发至可以访问到的地址

![image-20200309170854368](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/install/install.jpg)

#### 进入下一步，按照如下方式选择配置，完成后点击配置就绪，开始安装。

##### 安装模式选择最小化安装

![image-20200309171024608](https://tva1.sinaimg.cn/large/00831rSTly1gcnshqdsx5j31p70u00zw.jpg)

设置网关外网 IP 后会将默认域名解析到该 IP 地址上，如果不设置则会解析到第一个网关安装节点，请确保默认域名解析到的 IP 地址是可以访问的，否则造成应用无法访问的情况

![image-20200309171137591](https://tva1.sinaimg.cn/large/00831rSTly1gcnsj036uij31z00rq43k.jpg)

![image-20200309171247819](https://tva1.sinaimg.cn/large/00831rSTly1gcnsk7njeaj31z20gadj3.jpg)

#### 进入安装等待界面，完成后弹出如下界面，点击访问地址即可访问 rainbond 平台

安装过程取决于你的配置信息，大致分为 6 个阶段，每一个阶段都具有进度信息供你参考。

**安装完成后为了确保集群的安全，请关闭 30008 端口，防止误操作卸载集群**

![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)

### 四. 安装命令行工具

为了方便运维管理集群请参照[文档](/docs/user-operations/tools/grctl/)安装`grctl`命令行工具
