---
title: 签发Kubernetes及Api证书
weight: 30008
Description: "重新签发Kubernetes及Api证书"
hidden: true
---

### 重新签发Kubernetes及Api证书

> 默认k8s相关配置文件都生成在管理节点`/opt/rainbond/etc/kubernetes`目录下

#### 1. 移走之前的证书

```shell
mv /opt/rainbond/etc/kubernetes /opt/rainbond/etc/kubernetes.bak
mv /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl  /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl.bak
mkdir  /opt/rainbond/etc/kubernetes

```
#### 2. 重新签发证书

```shell
docker run --rm -v $PWD/ql/k8ssl:/opt/rainbond/etc/kubernetes/ssl -v $PWD/ql/ssl:/opt/rainbond/etc/rbd-api/region.goodrain.me/ssl -v $PWD/ql/kubecfg:/opt/rainbond/etc/kubernetes/kubecfg -v $PWD/ql/kubernetes:/grdata/kubernetes rainbond/r6dctl:docker-cfg-certs kip  <管理节点IP>
```

注：此处填写的<管理节点IP> 有EIP则选择EIP，否则选择IIP


#### 3. 替换证书

```shell
# 更新kube-proxy.kubeconfig
mv ql/kubernetes /grdata/kubernetes
# 拷贝TLS证书和秘钥  
mv ql/k8ssl /opt/rainbond/etc/kubernetes/ssl
# 更新kubecfg文件  
mv ql/kubecfg /opt/rainbond/etc/kubernetes/
cp -a /opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig /root/.kube/config
# 更新api证书
mv ql/ssl /opt/rainbond/etc/rbd-api/region.goodrain.me/
```

- 更新rbd-app-ui持久化目录中的证书

```shell
cd  /grdata/services/console/uidata/rainbond/ssl
cp /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/ca.pem  .
cp /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/client.key.pem  .
cp /opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/client.pem   .
```

- 更新数据库中的证书

在数据库（rbd-db组件）console库region_info这张表有三张证书，他们的对应关系是：

| 数据               | 对应证书      |
| ----------------------- | --------------------- |
|ssl_ca_cert  |`/opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/ca.pem` |
|cert_file  | `/opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/client.pem`|
|key_file  |`/opt/rainbond/etc/rbd-api/region.goodrain.me/ssl/client.key.pem`|

重新签发证书以后，同步更新数据库中对应的数据

> 更新计算节点k8s相关配置文件,同管理节点一样，需要从管理节点同步到计算节点(同样的目录，需要在计算节点把对应目录删了，重新拷贝)


#### 4. 重启服务,验证是否生效

- 在管理`manage`节点重启以下服务

```shell
grclis stop
grclis start
systemctl restart node
```

- 在计算节点重启以下服务

```shell
grclis stop
grclis start
systemctl restart node
systemctl restart kubelet.service
```

- 验证

查看各组件是否正常,到控制台查看运行是否正常

```shell
[root@manage ~]# grctl cluster

```


#### 到此完成Kubernetes及Api证书的签发
