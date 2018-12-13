---
title: 对接已有k8s集群
summary: 对接已有k8s集群
toc: true
---


## 准备已有配置文件或者重新签发k8s证书

k8s 需要签`kubeapi.goodrain.me`  
k8s ssl文件copy到  `/opt/rainbond/etc/kubernetes/ssl`目录下  
k8s kubeconfig 文件copy到 `/opt/rainbond/etc/kubernetes/kubecfg`目录下  


```
# /opt/rainbond/etc/kubernetes/ssl
admin.csr admin-key.pem admin.pem ca.csr ca-key.pem ca.pem kube-proxy.csr kube-proxy-key.pem kube-proxy.pem kubernetes.csr kubernetes-key.pem kubernetes.pem
# /opt/rainbond/etc/kubernetes/kubecfg
admin.kubeconfig  bootstrap.kubeconfig  kube-proxy.kubeconfig  token.csv
```

## 安装rainbond相关组件

```
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip <内网ip> --rainbond-version thirdparty 
```