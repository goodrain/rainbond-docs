---
title: "接入已安装Kubernetes集群"
description: "接入已安装Kubernetes集群"
---

此方式适合已经安装了 Kubernetes 集群，希望对接Rainbond平台，此过程将初始化安装平台并接入，初始化及接入过程不会影响集群已有的业务形态。

### 前提条件

- 集群端网络与控制台网络保持畅通；
- Kubernetes集群版本在`1.16.0-1.21.0`之间；
- Kubernetes集群的`80、443、6060、6100、6101、6102、7070、8443、9125、10254`端口未被占用；
- 能够正常获取Kubernetes集群`KubeConfig`文件。


## 安装部署

- 在集群页面选择 `接入Kubernetes集群`

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/install-fromk8s.png" title="接入Kubernetes集群" width="100%"/>

- 填写集群名称及KubeConfig文件内容

自定义集群名称即可，KubeConfig文件一般情况下在Kubernetes集群master节点的`~/.kube/config`路径下。

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/docking-k8s.png" title="对接Kubernetes集群" width="100%"/>

- 初始化Rainbond

添加Kubernetes集群以后，健康状态显示运行中，此时根据引导即可完成Rainbond的安装，待平台集群初始化后即完成对接。

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/state.png" title="健康状态" width="100%"/>

- 完成对接

添加完成后集群处于运行中状态即完成对接，可以进行使用。
 
<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/verify.png" title="完成对接" width="100%"/>

## 控制台迁移

使用该方式部署的控制台不具有生产可用性，体验完成后如果您想继续使用建议将控制台迁移到 Rainbond 中管理  [参考文档](./console-recover/)。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
