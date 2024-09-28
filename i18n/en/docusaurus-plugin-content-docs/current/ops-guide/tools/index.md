---
title: Command line tool
description: Command line tool
keywords:
  - kubtl command line tool
  - grctl command line tool
  - helm command line tool
---

This document describes how to install the `helm` `grctl` command line tool.

## Kubectl CLI

Install kubectl command

```bash
wget https://pkg.goodrain.com/pkg/kubectl/v1.23.10/kubectl -O /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl
```

![](https://static.goodrain.com/images/5.3/kubeconfig.png)

As shown in the above chart, write from the cluster list to `~/.kube/config` in the `~/.kube/config` path.

```
mkdir ~/.kube/
vi ~/.kube/config
```

The following command was executed after the installation was completed, the code was installed successfully：

```
kubectl get node
```

## Helm CLI

You can choose to install Helm CLI via [Helm](https://helm.sh/en/docs/intro/install/) official documentation or install it through the following commands.

```bash
wget https://pkg.goodrain.com/pkg/helm -O /usr/local/bin/helm && chmod +x /usr/local/bin/helm
```

## grctl CLI

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
