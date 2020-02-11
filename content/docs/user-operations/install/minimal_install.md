---
title: "最小化部署Rainbond"
weight: 1001
description: "此方式适用于快速安装和试用Rainbond平台。"
---

请根据下述步骤完成Rainbond的安装。

### 安装 Helm

如果您的环境中还没有安装 Helm ，请安装它。如果已经安装 Helm（3.0+） 请跳过这个步骤。

```bash
   #获取helm命令并解压
   wget https://get.helm.sh/helm-v3.0.3-linux-amd64.tar.gz && tar xvf helm-v3.0.3-linux-amd64.tar.gz
   #copyhelm命令到指定目录
   cp linux-amd64/helm /usr/local/bin/
```

### 安装 Rainbond

#### 下载并运行operator

```bash
   #获取rainbond-operator并进入指定目录
   git clone --depth 1 https://github.com/goodrain/rainbond-operator.git && cd rainbond-operator
   #创建所需namespace
   kubectl create ns rbd-system
   #通过helm安装operator到指定namespace
   helm install my-release ./mychart --namespace=rbd-system
```

> **执行完毕后,由于获取镜像需要一定时间，请运行```kubectl get pod -n rbd-system```，确认所有Pod都Ready后进行后续步骤**
```
NAME                  READY   STATUS    RESTARTS   AGE
rainbond-operator-0   2/2     Running   0          110s
```


#### 访问UI界面，进行安装操作
   Rainbond 从5.2版本开始采用UI配置安装方式，通过UI配置Rainbond安装需要的相关参数。

   1. 访问 **主机IP:30008**，点击开始安装

      ![屏幕快照 2020-02-04 14.11.50](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-1.jpg)

   2. 进入下一步，按照如下方式选择配置，完成后点击配置就绪，开始安装

      ![image-20200204141624281](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-2.jpg)

      ![image-20200204141711541](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-3.jpg)

   3. 进入安装等待界面，完成后弹出如下界面，点击访问地址即可访问rainbond平台了

      ![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)
