---
title: 添加非安全的镜像仓库地址
summary: 仓库地址
toc: true
---

当通过镜像创建应用时，管理节点的`rbd-chaos` 组件会调用系统的docker命令来拉取用户指定的仓库镜像。如果用户创建应用时填写的仓库地址不支持`HTTPS`协议，需要修改管理节点dockerd的配置，来支持非安全的镜像仓库地址。当前版本暂不支持私有镜像权限验证。

## 一、修改docker启动配置

```bash
vi /etc/docker/daemon.json
# 通过添加多个 insecure-registries 值的形式，来支持非安全的仓库
# 示例： "insecure-registries": ["goodrain.me","rainbond.me"]
```

## 二、重启docker服务

```bash
# 建议停docker服务前先停其他组件服务
grclis stop
systemctl restart docker
# 如果管理节点和计算节点在同一个节点上需要重启kubelet服务。
systemctl start node
systemctl restart kubelet
```

{{site.data.alerts.callout_danger}}
当集群中包含多个管理节点时，每个管理节点的都需要执行上述步骤。
{{site.data.alerts.end}}


