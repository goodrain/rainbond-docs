---
title: "接入已安装Kubernetes集群"
description: "接入已安装Kubernetes集群"
weight: 1003
---

此方式适合已经安装了 Kubernetes 集群，希望对接Rainbond平台，此过程将初始化安装平台并接入，初始化及接入过程不会影响集群已有的业务形态。

### 前提条件

- 集群端网络与控制台网络保持畅通；
- Kubernetes集群的`80、443、6060、7070、8443`端口未被占用；
- 能够正常获取Kubernetes集群`kubeconfig`文件。


## 安装部署

- 在集群页面选择 `接入Kubernetes集群`

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/user-operations/install/install-from-k8s/install-fromk8s.png" title="组件间通信结构图" width="100%">

- 填写集群名称及KubeConfig文件内容

自定义集群名称即可，KubeConfig文件一般情况下在Kubernetes集群master节点的`~/.kube/config`路径下。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/user-operations/install/install-from-k8s/docking-k8s.png" title="组件间通信结构图" width="100%">

- 

- 完成对接

添加完成后集群处于运行中状态即完成对接，可以进行使用。
 
<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/user-operations/install/install-from-k8s/verify.png" title="组件间通信结构图" width="100%">

## 控制台迁移

使用该方式部署的控制台不具有生产可用性，体验完成后如果您想继续使用建议将控制台迁移到 Rainbond 中管理  [参考文档](/docs/user-operations/ha-deploy/console-recover/)。




