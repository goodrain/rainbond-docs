---
title: '在腾讯云 TKE 上安装 Rainbond Cloud'
weight: 1
draft: true
description: '在腾讯云容器服务（Tencent Kubernetes Engine，TKE）上安装 Rainbond，并对接到 Rainbond Cloud。'
---

这篇文章主要是说明如何在[腾讯云容器服务（Tencent Kubernetes Engine，TKE）](https://cloud.tencent.com/document/product/457)上安装 Rainbond，并对接到 Raibnond Cloud。

### 前提条件

开始之前，请检查以下前提条件：

1. 了解 [Rainbond Cloud](../../../quick-start/rainbond-cloud/) ，并进行[注册](https://cloud.goodrain.com/enterprise-server/registered)和[登陆](https://cloud.goodrain.com/enterprise-server/login)。
1. 确保你的腾讯云账户支持按需购买资源，比如账户余额大于 100 元并通过实名认证。

### 准备一个 TKE 集群

在安装 Rainbond 前，需要一个在 TKE 上的标准 kubernetes。我们集群的版本选 `1.18.4`，Worker 节点规格选择 `S3.MEDIUM8`, 节点数量选择 `2`。

1. `S3.MEDIUM8`，2 个节点是最低配置。在生产环境，建议根据实际情况选择更高的配置。
1. Rainbond 对 Kubernetes 版本的最低要求是 1.13。建议选择 TKE 支持的最高版本 `1.18.4`。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/%E8%85%BE%E8%AE%AF%E4%BA%91%20TKE%20%E5%88%9B%E5%BB%BA%E9%9B%86%E7%BE%A4.png" width="100%" >}}

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/%E8%85%BE%E8%AE%AF%E4%BA%91%20TKE%20%E9%80%89%E6%8B%A9%E6%9C%BA%E5%9E%8B.png" width="100%" >}}

### 准备一个弹性负载均衡 ELB

为了保证 Rainbond 集群的高可用，需要在流量进入到 Rainbond 的网关节点前，加一层负载均衡。详情请参考[负载均衡（Cloud Load Balancer，CLB](https://cloud.tencent.com/document/product/214)。

ELB 需要开放 `80`，`443`，`8443`，`6060` 这 4 个端口。

### 准备一个 RDS

准备一个云数据库 MySQL， 版本选择是 `5.7`。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/%E6%89%98%E7%AE%A1%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%20Rainbond%20Cloud/%E8%85%BE%E8%AE%AF%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93%20MySQL.png" width="100%" >}}

另外，需要为 Rainbond 创建一个数据库，数据库名为 `region`。

### 安装 Rainbond Operator

使用 TKE 的应用功能创建 Rainbond Operator。

> 应用功能是指腾讯云容器服务（Tencent Kubernetes Engine，TKE）集成的 Helm 3.0 相关功能，提供创建 helm chart、容器镜像、软件服务等各种产品和服务的能力。详情请参考[这里](https://cloud.tencent.com/document/product/457/32729)。

1. 创建 namespace: `rbd-system`
1. 添加第三方 helm 仓库：`https://storageclass.oss-cn-shanghai.aliyuncs.com/goodrain/rainbond/rainbond-operator-1.1.0-cloud.tgz`。
1. 创建应用。详情请参考[应用管理](https://cloud.tencent.com/document/product/457/32730)。
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

   打开浏览器，输入主机 IP 地址：`http://<SERVER_IP>:30008`. 可以通过以下命令获取 `SERVER_IP`：

```bash
echo $(kubectl get po rainbond-operator-0 -n rbd-system -o jsonpath="{..hostIP}")
```

> 注意，获取到的 `SERVER_IP` 是内网地址，请根据实际情况直接使用或替换为外网地址。

#### 参数配置

1. `安装模式`选择高可用
1. 将准备好的 MySQL 信息填入`数据中心数据库`
1. `网关节点`，`构建服务运行节点` 选择准备好的两个计算节点
1. `网关公网 IP` 填准备好的 CLB
1. 共享存储: 选择 `选择集群已有存储驱动` -> `cfs`
1. 块存储: 选择 `选择集群已有存储驱动` -> `cfs`
1. 完成了上述配置后，单击 配置就绪，开始安装

> cfs 是腾讯云的文件存储，详情请参考[文件存储](https://cloud.tencent.com/document/product/582)。

#### 验证安装

当安装的进度全部走完，会跳转到以下页面：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg" width="100%" >}}

说明已经安装完成。

### 安装命令行工具

为了方便运维管理集群请参照[文档](/docs/user-operations/tools/grctl/)安装 `grctl` 命令行工具。

安装完成后，执行 `grctl config`，获取 `Region Config`。`Region Config` 用在下一步 `对接 Rainbond Cloud` 中。

### 对接 Rainbond Cloud

具体对接方式如下，在已注册的企业中企业视图集群界面添加集群；流程如下：

1. 点击`添加集群`

    {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20button.png" title="选择已有kubernetes" width="100%">}}

1. 选择`导入`：

    {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/registration%20completed.png" title="选择已有kubernetes" width="100%">}}

1. 填写相关信息：

    {{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20cluster.jpg" >}}

    **集群ID：** 自定义，集群添加后不可修改;

    **集群名称：** 当前添加的集群名称, 自定义，添加后可修改；

    **备注：** 当前集群备注信息，自定义即可；

    **Region Config：**  `Region Config`文件定义了当前集群配置信息，包括集群`API地址`，`Web Socket通信地址`，`HTTP应用默认域名后缀`，`TCP应用默认访问IP`等，在添加集群时添加 Region Config 文件后，将会自动读取以上信息。

### 如何使用该集群

在 [创建团队](/docs/enterprise-manager/enterprise/teams/create-team/) 时选择该集群，创建属于该集群的团队，自此在该团队下创建组件时将会使用该集群的资源。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/Create%20team.png" title="选择已有kubernetes" width="100%">}}