---
title: 命令行工具
description: 命令行工具
keywords: 
- kubectl 命令行工具
- grctl 命令行工具
- helm 命令行工具
---

本文档介绍如何安装 `helm` `kubectl` `grctl` 命令行工具。

## Kubectl CLI

安装 kubectl 命令

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

![](https://static.goodrain.com/images/5.3/kubeconfig.png)

如上图所示，从集群列表中 Copy kubeconfig 文件写到`~/.kube/config`路径下。

```
mkdir ~/.kube/
vi ~/.kube/config
```

安装完成后执行以下命令，成功即代码安装成功：

```
kubectl get node
```

## Helm CLI

可选择通过 [Helm](https://helm.sh/zh/docs/intro/install/) 官方文档安装 Helm CLI 或通过以下命令安装。

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

## grctl CLI


```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```