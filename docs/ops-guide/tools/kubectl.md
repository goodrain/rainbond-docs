---
title: kubectl CLI
description: Kubernetes 集群管理命令行工具
---

### 安装 kubectl 命令

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

![image-20210219183628565](https://static.goodrain.com/images/5.3/kubeconfig.png)

如上图所示，从集群列表中 Copy kubeconfig 文件写到`~/.kube/config`路径下。

```
mkdir ~/.kube/
vi ~/.kube/config
```

安装完成后执行以下命令，成功即代码安装成功：

```
kubectl get node
```
