---
title: kubectl CLI
description: Kubernetes cluster management command line tool
---

### install kubectl command

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

![image-20210219183628565](https://static.goodrain.com/images/5.3/kubeconfig.png)

As shown in the figure above, Copy the kubeconfig file from the cluster list and write it to the path`~/.kube/config`.

```
mkdir ~/.kube/
vi ~/.kube/config
```

After the installation is complete, execute the following command, if the code is installed successfully：

```
kubectl get node
```
