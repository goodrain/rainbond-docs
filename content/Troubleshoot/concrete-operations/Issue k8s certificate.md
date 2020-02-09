---
title: 签发Kubernetes及Api证书
weight: 30008
Description: "重新签发Kubernetes及Api证书"
hidden: true
---

#### 重新签发Kubernetes及Api证书

> 默认k8s相关配置文件都生成在管理节点`/opt/rainbond/etc/kubernetes`目录下

```
# 移走之前的证书
mv /opt/rainbond/etc/kubernetes /opt/rainbond/etc/kubernetes.bak
mv /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl  /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl.bak
mkdir  /opt/rainbond/etc/kubernetes

```
重新签发证书

```
docker run --rm -v $PWD/ql/k8ssl:/opt/rainbond/etc/kubernetes/ssl -v $PWD/ql/ssl:/opt/rainbond/etc/rbd-api/region.goodrain.me/ssl -v $PWD/ql/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg -v $PWD/ql/kubernetes:/grdata/kubernetes rainbond/r6dctl:docker-cfg-certs kip  <管理节点IP>
```

注：此处填写的<管理节点IP> 有EIP则选择EIP，否则选择IIP

```
# 更新kube-proxy.kubeconfig
mv ql/kubernetes /grdata/kubernetes
# 拷贝TLS证书和秘钥  
mv ql/k8ssl /opt/rainbond/etc/kubernetes/ssl
# 更新kubecfg文件  
mv ql/kubecfg /opt/rainbond/etc/kubernetes/kubecfg
cp -a /opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig /root/.kube/config
# 更新api证书
mv ql/ssl /opt/rainbond/etc/rbd-api/region.goodrain.me/
```

更新计算节点k8s相关配置文件,同管理节点一样，需要从管理节点同步到计算节点(同样的目录，需要在计算节点把对应目录删了，重新拷贝)

验证管理节点
需要重启服务

```
grclis stop
grclis start
# 如果带有计算属性则重启kubelet服务
systemctl restart kubelet.service
```

### 验证

```
[root@manage ~]# grctl cluster

查看各组件是否正常

```

> 到此完成Kubernetes及Api证书的签发