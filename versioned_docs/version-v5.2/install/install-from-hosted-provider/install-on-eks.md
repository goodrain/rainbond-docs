---
title: '在 Amazon EKS 上安装 Rainbond Cloud'
weight: 1
draft: true
description: '在 Amazon EKS 上安装 Rainbond，并对接到 Raibnond Cloud'
---

这篇文章主要是说明如何在[Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)上安装 Rainbond，并对接到 Raibnond Cloud。

### 前提条件

开始之前，请检查以下前提条件：

1. 了解 [Rainbond Cloud](../../quick-start/rainbond-cloud/) ，并进行[注册](https://cloud.goodrain.com/enterprise-server/registered)和[登陆](https://cloud.goodrain.com/enterprise-server/login)
1. 可用的 AWS 账号

### 准备一个 EKS 集群

在安装 Rainbond 前，需要一个在 EKS 上的标准 kubernetes，我们用 AWS 的命令行工具 `eksctl` 来创建 EKS 集群，详情请参考[这里](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)。集群的版本选 `1.17`，节点规格选择 `t3.large(2核，8GB)`，计算节点选择 `2`。

1. `t3.large(2核，8GB)`，2 个节点是最低配置。在生产环境，建议根据实际情况选择更高的配置。
1. Rainbond 对 Kubernetes 版本的最低要求是 1.13。建议选择 EKS 支持的最高版本 `1.17`。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/eksctl-create-cluster.png" width="100%" />

### 通过 kubectl 连接 EKS 集群

安装完 EKS 集群，awsctl 已经把与 kube-apiserver 通信的配置文件设置到本地的 `~/.kube/config` 了，我们只需要安装 kubectl 就可以与 EKS 集群通信了。详情请参考[这里](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html#eksctl-gs-install-kubectl)。

### 准备一个弹性负载均衡 ELB

为了保证 Rainbond 网关节点（rbd-gateway）的高可用，需要准备至少两个网关节点，并且在流量进入到 Rainbond 的网关节点前，
加一个 4 层的负载均衡。我们使用 AWS 的 ELB 作为网关节点的 4 层负载均衡器，并将 ELB 的 `80`，`443`，`6060`, `8443`, `30008` 这个 5 个端口映射到网关节点相应的端口上。 创建方式请参考[负载均衡器 ELB](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-getting-started.html)。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/elb-before-rbd-gateway.png" width="100%" />

### 准备一个 RDS

准备一个数据库引擎是 `MySQL`，版本是 `5.7` 的 RDS。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/aws-create-database.png" width="100%" />

另外，需要为 Rainbond 创建一个数据库，数据库名为 `region`。

### 安装 Amazon FSx for Lustre CSI 驱动程序

我们利用 Amazon FSx 为 Rainbond 提供 Kubernetes 原生的文件存储能力，需要为 Amazon FSx 安装一个 CSI 驱动程序，详情请参考[这里](https://docs.aws.amazon.com/zh_cn/eks/latest/userguide/fsx-csi.html)。

### 安装 Helm

Linux 用户使用以下命令安装：

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

MacOs，Windows 用户请参考[Installing Helm](https://helm.sh/docs/intro/install/)。

> 注意：helm 的版本需要是 3.0 及以上，不支持 helm 2.0+。

### 安装 Rainbond Operator

1. 创建 namespace: `rbd-system`:

    ```bash
    kubectl create ns rbd-system
    ```

1. 安装 Rainbond Operator

    ```bash
    # 添加仓库
    helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
    # 安装
    helm install rainbond-operator-cloud rainbond/rainbond-operator \
    --namespace rbd-system \
    --version 1.1.0-cloud
    ```

    了解更多 Rainbond Operator 的参数，请查阅[这里](http://localhost:1313/docs/user-operations/rainbond-operator/configuration/)。

1. 确认 Rainbond Operator 状态

    ```bash
    $ kubectl get pod -n rbd-system
    NAME                  READY   STATUS    RESTARTS   AGE
    rainbond-operator-0   2/2     Running   0          110s
    ```

    稍微等待一会（根据具体的网络环境而定），直到 rainbond-operator-0 的状态变为 `Running`。

### 安装 Rainbond

访问 Rainbond Operator，开始安装 Rainbond。

#### 访问 Rainbond Operator

   打开浏览器，输入主机 IP 地址：`http://<SERVER_ADDRESS>:30008`. `SERVER_ADDRESS` 即上面准备好的 ELB 的地址

#### 参数配置

1. `安装模式`选择高可用
1. 将准备好的 RDS 信息填入`数据中心数据库`
1. `网关节点`，`构建服务运行节点` 选择准备好的两个计算节点
1. `网关公网 IP` 填准备好的 ELB
1. 共享存储: 选择 `选择集群已有存储驱动` -> `fsx-sc`
1. 完成了上述配置后，单击 配置就绪，开始安装

#### 验证安装

当安装的进度全部走完，会跳转到以下页面：

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg" width="100%" />

说明已经安装完成。

### 安装命令行工具

Linux 用户：

```bash
wget https://pkg.rainbond.com/releases/common/v5.2/grctl && chmod +x ./grctl
mv ./grctl /usr/local/bin/grctl && /usr/local/bin/grctl install
```

MacOS 用户：

```bash
wget https://pkg.rainbond.com/releases/common/darwin/v5.2/grctl && chmod +x ./grctl
sudo mv ./grctl /usr/local/bin/grctl && /usr/local/bin/grctl install
```

若输出 Install success 则安装成功。

安装完成后，执行 `grctl config`，获取 `Region Config`。`Region Config` 用在下一步 `对接 Rainbond Cloud` 中。

### 对接 Rainbond Cloud

具体对接方式如下，在已注册的企业中企业视图集群界面添加集群；流程如下：

1. 点击`添加集群`

    <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20button.png" title="选择已有kubernetes" width="100%" />

1. 选择`导入`：

    <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/registration%20completed.png" title="选择已有kubernetes" width="100%" />

1. 填写相关信息：

    <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20cluster.jpg" />

    **集群ID：** 自定义，集群添加后不可修改;

    **集群名称：** 当前添加的集群名称, 自定义，添加后可修改；

    **备注：** 当前集群备注信息，自定义即可；

    **Region Config：**  `Region Config`文件定义了当前集群配置信息，包括集群`API地址`，`Web Socket通信地址`，`HTTP应用默认域名后缀`，`TCP应用默认访问IP`等，在添加集群时添加 Region Config 文件后，将会自动读取以上信息。

### 如何使用该集群

在 [创建团队](../../enterprise-manager/enterprise/teams/create-team/) 时选择该集群，创建属于该集群的团队，自此在该团队下创建组件时将会使用该集群的资源。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/Create%20team.png" title="选择已有kubernetes" width="100%" />