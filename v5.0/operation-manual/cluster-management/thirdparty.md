---
title: 对接已有k8s集群
summary: 对接已有k8s集群
toc: true
---


## 准备已有配置文件或者重新签发k8s证书

k8s 需要签`kubeapi.goodrain.me`  
k8s kubeconfig 文件copy到 `/opt/rainbond/etc/kubernetes/kubecfg`目录下  


```
# /opt/rainbond/etc/kubernetes/kubecfg
admin.kubeconfig kube-proxy.kubeconfig
```

## docker配置

```
docker 需要配置 --insecure-registry goodrain.me
```

## 安装rainbond相关组件

```
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip <内网ip> --rainbond-version thirdparty 
```