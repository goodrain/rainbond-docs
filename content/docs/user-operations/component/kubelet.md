---
title: kubelet组件说明
description: "kubelet组件参数说明"
hidden: true
---


### 运行方式

 通过二进制运行，此组件是运行在每一个集群节点上的代理程序，它确保 Pod 中的容器处于运行状态。


### 常用参数说明

```
--config         Kubelet将从此文件加载其初始配置。路径可以是绝对路径或相对路径；相对路径从Kubelet的当前工作目录开始。省略此标志以使用内置的默认配置值。命令行标志覆盖此文件中的配置。
--cni-bin-dir    CNI插件二进制文件的目录完整路径
--cni-conf-dir   CNI配置文件的目录的完整路径
--hostname-override  如果非空，将使用此字符串作为标识，而不是实际的主机名
--kubeconfig     kubeconfig文件的路径，指定如何连接到API服务器
--network-plugin kubelet/pod生命周期中的各种事件调用的网络插件的名称
--root-dir       kubelet文件的目录路径
--v=2            日志级别详细信息的编号
```

具体参数请执行`kubelet -h`获取或参见[Kubernetes官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)


