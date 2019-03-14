---
title: 基于已有Kubernetes集群安装
summary: 此方式适用于已安装Kubernetes集群的用户，此安装方式Rainbond将使用用户提供的Kubernetes集群。
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## Rainbond与Kubernetes集群的关系

Kubernetes是Rainbond调度和运行应用的基础平台，5.0版本开始Rainbond与Kubernetes进行了完全的解耦合以支持更多的Kubernetes版本。

### Kubernetes集群要求

* Kubernetes版本必须 >=1.10
* Kubernetes集群必须正常工作
* Kube-APIServer 开启了RBAC,支持ServiceAccount、NamespaceLifecycle、LimitRanger

### Rainbond将对Kubernetes集群做的修改

* 创建多个Namespace（每个租户创建一个Namespace）
* 创建名为`rainbondsssc` 和 `rainbondslsc` 的StorageClass
* 应用创建后创建在所在租户空间内创建各类资源

{{site.data.alerts.callout_danger}}

由Rainbond创建的资源都携带Creater=Rainbond 标签，由Rainbond自动管理，你在未完全了解Rainbond工作机制的情况下请勿自行操作Kubernetes资源。

{{site.data.alerts.end}}

## 安装Rainbond

### 1. 准备Rainbond需要的Kubernetes的相关文件

> admin.kubeconfig,Kube-Apiserver admin用户权限的配置文件  
> kube-proxy.kubeconfig,用于Slave节点Kube-Proxy的配置文件,一般用户名为`kube-proxy`  

需要将这个文件拷贝到`/opt/rainbond/etc/kubernetes/kubecfg`目录下  

```
# 查看是否复制成功
ls /opt/rainbond/etc/kubernetes/kubecfg
admin.kubeconfig kube-proxy.kubeconfig
```

  * 通过kubeadm安装的k8s集群相关文件获取方式  
  
admin.kubeconfig文件，在master节点获取`/etc/kubernetes/admin.conf`或者`$HOME/.kube/config`  
kube-proxy.kubeconfig文件，示例如下  

```
 # kube-proxy.kubeconfig
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority: <base64 ca.crt证书内容>
    server: <kube api https地址>
  name: default
contexts:
- context:
    cluster: default
    namespace: default
    user: default
  name: default
current-context: default
users:
- name: default
  user:
    token: <token>

# ca.crt 文件：/etc/kubernetes/pki/ca.crt
# token 获取方式
kubectl -n kube-system get secret | grep kube-proxy | awk '{print "secret/"$1}' | xargs kubectl describe -n kube-system | grep token: | awk -F: '{print $2}' | xargs echo
```

 * 其他途径安装部署的k8s集群配置文件获取
 
 根据具体情况，自行生成相关文件，具体可以参考 [创建 kubeconfig 文件](https://jimmysong.io/kubernetes-handbook/practice/create-kubeconfig.html)一文。  

### 2. 调整集群节点的Docker配置(可选) 

   * 信任goodrain.me镜像仓库，推荐配置Insecure Registries，确定配置是否生效`docker info`查看Insecure Registries是否包含goodrain.me

   * 配置日志驱动设置

     Rainbond将实时通过Docker Daemon 获取容器日志，需要Docker配置为`json-file`驱动。若你已采用其他驱动，Rainbond可能无法正常获取服务日志。

   参考daemon.json配置文件

   ```
   # /etc/docker/daemon.json
   {
     "insecure-registries": ["goodrain.me"],
     "max-concurrent-downloads": 10,
     "log-level": "warn",
     "log-driver": "json-file",
     "log-opts": {
       "max-size": "20m",
       "max-file": "2"
     }
   }
   ```

### 3. 初始化Rainbond数据中心

在k8s管理节点执行安装，进行初始化Rainbond数据中心,安装Rainbond管理节点服务,如果有外网ip，则需要指定外网ip

```bash
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl
./grctl init --iip <必须指定内网ip> --eip <可选外网ip> --deploy-type thirdparty 
```

### 4. 将已有k8s节点纳入rainbond管理

下述安装操作前请务必执行信任goodrain.me镜像仓库步骤，否则会影响安装

```
# worker节点NAME，通过如下命令获取
kubectl get node -o wide 

# 添加已有k8s worker计算节点
grctl node add --host <worker节点hostname> --iip <worker内网ip> --key /root/.ssh/id_rsa.pub --role compute --id <worker节点NAME>
grctl node install <worker节点NAME>

# 添加已有k8s master管理节点
grctl node add --host <master节点hostname> --iip <worker内网ip> --key /root/.ssh/id_rsa.pub --role manage --id <master节点NAME>
grctl node install <master节点NAME>
```

示例

```
root@iZj6caqbup3uo1me2vt0qqZ:~# kubectl get node -o wide
NAME                      STATUS   ROLES    AGE    VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE                       KERNEL-VERSION   CONTAINER-RUNTIME
izj6caqbup3uo1me2vt0qrz   Ready    <none>   117m   v1.13.1   10.10.10.230   <none>        Debian GNU/Linux 9 (stretch)   4.9.0-8-amd64    docker://17.3.3

grctl node add --host izj6caqbup3uo1me2vt0qrz --iip 10.10.10.230 --key /root/.ssh/id_rsa.pub --role compute --id izj6caqbup3uo1me2vt0qrz
grctl node install izj6caqbup3uo1me2vt0qrz
```

### 5. 其他说明

默认情况下，rainbond默认会将节点纳入到管理中，可手动关闭当前节点自动禁止调度功能。

```
# 修改 /opt/rainbond/scripts/start-node.sh 调整auto-scheduler为false即可禁用
systemctl restart node
```

