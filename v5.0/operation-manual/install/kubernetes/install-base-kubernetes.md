---
title: 基于已有Kubernetes集群安装
summary: 此方式适用于已安装Kubernetes集群的用户，此安装方式Rainbond将使用用户提供的Kubernetes集群。
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

# Rainbond与Kubernetes集群的关系

Kubernetes是Rainbond调度和运行应用的基础平台，5.0版本开始Rainbond与Kubernetes进行了完全的解耦合以支持更多的Kubernetes版本。

# Kubernetes集群要求

* Kubernetes版本必须 >=1.10
* Kubernetes集群必须正常工作
* Kube-APIServer 开启了RBAC,支持ServiceAccount、NamespaceLifecycle、LimitRanger

# Rainbond将对Kubernetes集群做的修改

* 创建多个Namespace（每个租户创建一个Namespace）
* 创建名为`rainbondsssc` 和 `rainbondslsc` 的StorageClass
* 应用创建后创建在所在租户空间内创建各类资源

{{site.data.alerts.callout_danger}}

由Rainbond创建的资源都携带Creater=Rainbond 标签，由Rainbond自动管理，你在未完全了解Rainbond工作机制的情况下请勿自行操作Kubernetes资源。

{{site.data.alerts.end}}

# 安装Rainbond

### 1. 准备Rainbond需要的Kubernetes的相关文件

   Rainbond需要使用具有全量权限的`admin.kubeconfig` 和用于kube-proxy的`kube-proxy.kubeconfig`配置文件。

   将以上两个文件复制到`/opt/rainbond/etc/kubernetes/kubecfg`

   ```
   # 查看是否复制成功
   ls /opt/rainbond/etc/kubernetes/kubecfg
   admin.kubeconfig kube-proxy.kubeconfig
   ```

### 2. 调整集群所有节点的Docker配置

   * 信任goodrain.me镜像仓库(必要)

   * 配置日志驱动设置（可选）

     Rainbond将实时通过Docker Daemon 获取容器日志，需要Docker配置为`json-file`驱动。若你已采用其他驱动，Rainbond可能无法正常获取服务日志。

   参考daemon.json配置文件

   ```
   # /etc/docker/daemon.json
   {
     "registry-mirrors": ["https://registry.docker-cn.com", "https://bf3asb4c.mirror.aliyuncs.com"],
     "insecure-registries": ["goodrain.me"],
     "max-concurrent-downloads": 10,
     "log-level": "warn",
     "log-driver": "json-file",
     "log-opts": {
       "max-size": "20m",
       "max-file": "2"
     }
   }
   ```

### 3. 初始化Rainbond数据中心

在k8s管理节点执行安装，进行初始化Rainbond数据中心。

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
./grctl init --iip <内网ip> --deploy-type thirdparty 
```









