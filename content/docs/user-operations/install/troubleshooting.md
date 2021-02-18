---
title: "故障排除"
weight: 1999
description: "安装过程中常见故障的排除"
---

本文主要是帮助你解决在安装过程中遇到的问题。

在安装的过程中，如果遇到了问题，首要任务是确认底层的 kubernetes 集群是否正常，包括检查 nodes，kubelet，kube-apiserver, kube-controller-manager, kube-schedler，coredns, 网络插件（比如：calico, flannel） 等。
因为 Kubernetes 的部署方式可以很灵活，一些组件有时候会以容器的方式运行，有时候直接以二进制文件的方式运行，所以排查方式也会有所不同。详情请查阅 [Kubernetes 集群故障排除](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-cluster/)。

> 接下来的 kubectl 命令中，都会使用默认命名空间 `rbd-system`，如果使用了自定义域名，请自行替换。

### 无法选择网关节点

网关需要占用 80, 443, 6060, 7070, 10254, 18080, 18081 这些端口，所以安装网关的节点必须要确保这些端口没有被占用。否则无法被识别出来，并供搜索选择。

### 10001 错误

10001 错误说明分配默认域名的服务暂时无法提供服务，这个时候，可以关闭 `自动分配域名`，并输入自定义的域名。

### 处理镜像卡住了

处理镜像卡住了，可能是处理的过程中出错了，也可能是网络原因，或者是 docker 的配置问题，导致拉取不到镜像。
这时候需要观察 operator 的日志来确认问题，命令如下：

```bash
kubectl logs -f rainbond-operator-0 operator -n rbd-system
```

如果有报错，则是是处理的过程中出错了。那么可以执行以下命令，重新开始安装包的处理：

```bash
kubectl get rainbondpackage rainbondpackage -o yaml -n rbd-system > rbd-pkg.yaml
kubectl delete -f rbd-pkg.yaml
kubectl create -f rbd-pkg.yaml
```

如果没有报错，且日志中含有 `docker pull xxx`, `docker push xxx` 的字眼，则是正在处理镜像。但是由于网络，或 docker 配置的原因，
导致拉取镜像比较慢，这时候需要做的是：

- 检查网络
- 检查 docker 配置，必要的时候可以加上阿里云的镜像加速
- 确保可以正常获取镜像后，执行以下命令，重新开始安装包的处理：

    ```bash
    kubectl get rainbondpackage rainbondpackage -o yaml -n rbd-system > rbd-pkg.yaml
    kubectl delete -f rbd-pkg.yaml
    kubectl create -f rbd-pkg.yaml
    ```
