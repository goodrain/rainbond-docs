---
title: 使用 Helm 部署 Wordpress 和 Mysql
description: 如何通过 Helm 在 Rainbond 上部署一个 Wordpress 示例。
keywords:
- Wordpress Helm
- Rainbond Helm
---

本示例描述了如何通过 Helm 安装命令，在 Rainbond 上安装 WordPress 和 MySQL。 

这两个组件：
- 分别使用 Deployment 和 StatefulSet 两种 Workload 资源部署。
- 使用 PersistentVolumes 和 PersistentVolumeClaims 保存数据。
- 通过 Service 完成彼此间通信。
- 通过 Sercet 实现环境变量的加密获取。

## 教程目标

- 通过 Helm 方式从仓库中拉取 Chart ，将 Workload 类资源部署到 Rainbond 中，包括 WordPress 和 MySQL。
- 在应用中的 `应用 > k8s资源` 处管理非 Workload 类资源，包括 Service 和 Sercet。
- 在组件中的 `其他设置 > Kubernetes属性` 处管理 Workload 的各种属性，包括 labels、volumes、volumeMounts 和取自其他来源的 env。
- 在组件中的 `环境设置` 处管理可以被 Rainbond 直接转化的 Workload 属性，包括自定义环境变量的配置。

## 准备开始

一条可用的 Helm 安装命令：

```bash
$ helm install my-wp wordpress --repo https://charts.bitnami.com/bitnami
```

## 部署操作

1. 从 `工作空间` 进入指定的团队，通过点击 `新建 > Kubernetes YAML Helm > Helm 命令` 即可进入命令输入界面。

2. 选择所属应用，或新建应用。

3. 在命令框中输入 Helm 安装命令。

4. 等待 Rainbond 拉取 Chart 并等待 `应用包检验成功`。

5. 点击 `下一步`，进行配置与安装。

6. Rainbond 将展示从 Chart 包中解析出的配置选项，配置的变更方式包括 `输入键值` 和 `编辑 values.yaml 文件` 两种方式。点击 `安装`：


7. wordpress 与 wordpress-mysql 已经被转化成为 Rainbond 中的组件，并且在完成了构建过程后自动启动。

<details>
  <summary>推荐操作</summary>
  <div>

- **存储转换**: 对于 Yaml 中定义的 PV、PVC 等资源，会在组件的 `其他设置 > Kubernetes属性` 中体现为 `volumeMounts volumes`，此处建议将一般性的数据持久化配置 `volumeMounts volumes` 定义为 Rainbond 组件的存储，删除 `volumeMounts volumes` 中的对应存储记录，并在 `存储 > 存储设置 > 添加存储` 中加入需要被持久化的路径即可。

- **开启对外服务**: Rainbond 提供了4/7层网关，可以方便的为组件提供对外服务入口，用户只需要在 `端口` 中为指定端口指定 `端口协议` 打开 `对外服务` 即可生成可供访问的 `Ip:Port` 或域名类型的访问地址。

</div>
</details>


## 验证

访问 wordpress 组件的对外服务地址，即可进入 wordpress 的配置页面，开始你的建站之旅。

## 管理组件 Kubernetes 属性

参考文档 [kubernetes属性](../../use-manual/k8s-attribute) 了解目前 Rainbond 所支持的多种规格定义的配置方式。

## 管理应用中的k8s资源

参考文档 [k8s资源操作](/docs/kubernetes-native-guide/import-manage/non-workload) 了解如何管理非 Workload 类型的资源。