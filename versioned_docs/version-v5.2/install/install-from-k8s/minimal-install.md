---
title: '基于 K8s 最小化安装'
weight: 1
description: '在已有的 Kubernetes 集群上安装最小化的 Rainbond。'
aliases: 
  - /docs/user-operations/install/minimal_install/
---

本文会将 Rainbond 以最小化的方式安装 Kubernetes 上，这样可以帮助你节省资源。

## 前提条件

- Kubernetes 的版本需要大于等于 **1.13**
- NFS 客户端。如果没有安装，可以参考：
    ```bash
    # CentOS 系统
    yum install -y nfs-utils
    # Ubuntu/Debian 系统
    apt install -y nfs-common
    ```
- 如果开启了防火墙，确保其满足[端口要求](../install/requirements/#port-requirements)
- 硬件：2 核 CPU，8G 内存，50G 磁盘

## 使用 Helm 3 安装 Rainbond Operator

推荐使用 [Helm](https://helm.sh/) 来安装 Rainbond Opeartor。

### 安装 Helm 3

使用以下命令安装（如果已安装了 Helm 3，可以跳过这一步骤）：

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```


### 安装 Rainbond Operator

1. 创建 Rainbond 使用的 namespace: `rbd-system`:

    ```bash
    kubectl create ns rbd-system
    ```

1. 添加 Rainbond Operator 的 chart 仓库：

    ```bash
    helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
    ```

1. 安装 Rainbond Operator

    ```bash
    helm install rainbond-operator rainbond/rainbond-operator \
    --namespace rbd-system \
    --version 1.1.1
    ```

    了解更多 Rainbond Operator 的参数，请查阅[这里](http://localhost:1313/docs/user-operations/rainbond-operator/configuration/)。

1. 确认 Rainbond Operator 状态

    ```bash
    $ kubectl get pod -n rbd-system
    NAME                  READY   STATUS    RESTARTS   AGE
    rainbond-operator-0   2/2     Running   0          110s
    ```

    稍微等待一会（根据具体的网络环境而定），直到 rainbond-operator-0 的状态变为 `Running`。

## 安装 Rainbond

访问 Rainbond Operator，开始安装 Rainbond。

1. 打开浏览器，输入主机 IP 地址：`http://<SERVER_IP>:30008`. 可以通过以下命令获取 `SERVER_IP`：

    ```bash
    echo $(kubectl get po rainbond-operator-0 -n rbd-system -o jsonpath="{..hostIP}")
    ```

    > 注意，获取到的 `SERVER_IP` 是内网地址，请根据实际情况直接使用或替换为外网地址。

1. 配置**网关安装节点**

    Rainbond Operator 默认会选择 Kubernetes 集群中符合条件的 master 节点去安装**网关**。
    如果你的集群中没有 master 节点，那么你可以`搜索选择`一个 `80`，`443` 等端口没有被占用的 node 节点，作为网关节点。

    > 提示：如果你无法搜索并选择一个网关 IP，请参考[无法选择网关节点](../user-operations/install/troubleshooting/#无法选择网关节点)。

1. 配置**构建服务运行节点**

    Rainbond Operator 默认会选择 Kubernetes 集群中的 master 节点去安装**构建服务**。
    如果你的集群中没有 master 节点，那么你可以`搜索选择`一个 node 节点, 作为**构建服务运行节点**。

1. **共享存储**

    共享存储提供多读多写特性，用于系统组件间数据共享和应用全局共享存储类型。

    默认情况下，Rainbond 会使用 nfs 作为共享存储。如果是阿里云环境，推荐使用 `阿里云 NAS`。
    当然也可以使用集群中已有的 `StorageClass`，主要它支持多读多写(`RWX`)。

1. 可选项：**网关外网 IP**

    Rainbond Operator 默认会选择第一个**网关节点** 的 IP 地址作为 **网关外网 IP**。你也填写合适其他的 **网关节点 IP** 或 **公网 IP**.

1. 完成了上述配置后，单击 **配置就绪，开始安装**。

> 如果安装受阻，可以参考[故障排查](../user-operations/install/troubleshooting/)，或联系相应管理人员。

## 验证安装

当安装的进度全部走完，会跳转到以下页面：

![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)

说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。

## 问题排查

在安装和使用过程中出现问题请参考[安装过程故障排除文档](../user-operations/install/troubleshooting)和[集群问题诊断文档](../user-operations/troubleshoot/cluster_troubleshooting)

## 安装命令行工具

为了方便运维管理集群请参照[文档](../user-operations/tools/grctl/)安装 `grctl` 命令行工具。

## 卸载

卸载程序将删除 RBAC 权限，rbd-system 命名空间和所有相关资源。

### 卸载 Rainbond

访问 Rainbond Operator 的 UI 界面，单击 **卸载** 即可。

### 卸载 Rainbond Operator

```bash
helm delete rainbond-operator -n rbd-system
```
