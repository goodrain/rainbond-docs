---
title: 集群故障
description: 介绍 Rainbond 平台出现的问题及其排查思路
keywords: 
- Rainbond 平台故障排查
---

## 1. 集群通信异常或集群端失去响应

Rainbond 分为两层架构，控制台与集群端。控制台与集群端通过 API 进行通信，如果控制台与集群端通信异常，将会导致控制台无法正常使用。

导致异常原因可能有以下几种：

1. 控制台与集群端的网络不通。
2. 集群端的 API 服务不可用。
3. 集群端的 API 服务被防火墙拦截。

### 排查思路

如果出现此类问题，你可以根据以下排查思路进行排查。

#### 检查控制台与集群端的网络

首先，检查控制台的日志，进入控制台的 **平台管理 -> 日志 -> 控制台日志**，如果出现 `https://192.168.1.1:8443 time out` 则代表控制台与与集群端的网络不通。

可以进入控制台的终端内部，使用 `ping` 命令检查控制台与集群端的网络是否通畅。

如果网络不通，可以检查控制台与集群端的网络是否在同一网段，如果不在同一网段，可以通过配置路由表的方式进行网络通信。

#### 检查集群端 API 服务

如果控制台与集群端的网络通畅，且 `8443` 端口通畅，可以检查集群端的 API 服务是否正常。

通过以下命令查看 API 服务是否正常：

```bash
kubectl get pod -l name=rbd-api -n rbd-system
```

如果 API 不正常，可以通过以下命令查看 API 服务的日志：

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

根据日志的报错信息进行排查。

或者尝试重启 API 服务：

```bash
kubectl delete pod -l name=rbd-api -n rbd-system
```

#### 检查控制台与集群端的端口

如果控制台与集群端的网络通畅且 API 服务正常，可以检查控制台与集群端的 `8443` 端口是否通畅。使用 `telnet` 命令检查控制台与集群端的 `8443` 端口是否通畅。

如果不通，可以检查集群端的 `8443` 端口是否被防火墙拦截，如果被防火墙拦截，可以通过配置防火墙规则的方式进行端口通信。

### 常见问题

#### remote error: tls: error decrypting message

查看 rbd-api 服务的日志出现以下报错：

```bash
http: TLS handshake error from 10.42.0.1:35590: remote error: tls: error decrypting message
```

出现该错误的原因是集群端的 API 服务与控制台的证书不一致，导致控制台无法与集群端的 API 服务进行通信。

```bash
$ kubectl get cm -n rbd-system region-config -o yaml
apiAddress: https://47.104.161.96:8443
ca.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxx
  -----END CERTIFICATE-----
client.key.pem: |
  -----BEGIN RSA PRIVATE KEY-----
  xxxxx
  -----END RSA PRIVATE KEY-----
client.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxxx
  -----END CERTIFICATE-----
```

上述获取的证书是加密格式的，需要将其解密后复制到控制台的集群编辑页面中。

```bash
#解密 ca.pem
kubectl get cm -n rbd-system region-config -o jsonpath='{.binaryData.ca\.pem}' | base64 -d
#解密 client.pem
kubectl get cm -n rbd-system region-config -o jsonpath='{.binaryData.client\.pem}' | base64 -d
#解密 client.key.pem
kubectl get cm -n rbd-system region-config -o jsonpath='{.binaryData.client\.key\.pem}' | base64 -d
```

将打印出的内容复制到控制台的 **平台管理 -> 集群 -> 编辑** 中，点击 **保存** 即可。
* apiAddress 对应 **API 地址**
* ca.pem 对应 **API-CA证书**
* client.pem 对应 **API-Client证书**
* client.key.pem 对应 **API-Client证书密钥**

:::caution 注意
证书左右两侧不能有空格，否则会导致证书无法识别。
:::

如果确定控制台的证书与集群端的证书一致，但仍然出现该问题，可以尝试重新生成集群端的证书。

```bash
# 删除集群端的证书
kubectl delete secret rbd-api-client-cert rbd-api-server-cert -n rbd-system

# 重启 operator 重新生成集群端的证书
kubectl delete pod -l release=rainbond-operator -n rbd-system

# 重启 api 服务
kubectl delete pod -l name=rbd-api -n rbd-system
```

operator 重启后，会重新生成集群端的证书，再次通过 `kubectl get cm -n rbd-system region-config` 获取集群信息并复制到集群控制台中即可。

## 2. 获取节点列表失败

出现该问题说明 Kubernetes 集群的节点 Labels 不匹配，导致控制台无法获取节点列表，默认通过 `node-role.kubernetes.io/worker=true node-role.kubernetes.io/master=true` 标签来区分节点角色，查看节点标签是否正确：
  
```bash
kubectl get nodes --show-labels
```

如果不存在该标签，可以通过以下命令添加：

```bash
kubectl label nodes <node-name> node-role.kubernetes.io/worker=true
```

## 3. 平台组件故障

平台管理首页出现组件故障，例如：`rbd-chaos` 组件出现故障，出现该问题有以下几种可能：

1. 监控数据收集的不及时，导致数据不正确，从而出现组件故障原因。
2. 组件的确出现故障，可以通过查看组件日志排查问题。
```bash
# 查看组件状态是否为 running
kubectl get pod -n rbd-system

# 查看组件日志
kubectl logs -fl name=rbd-chaos -n rbd-system
```
3. 组件正常工作，但组件故障的告警一直出现，可以通过以下重启组件解决：
```bash
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## 4. 服务器重启后如何判断 Rainbond 是否启动

服务器重启后，不要只通过控制台页面是否能打开来判断 Rainbond 是否已经完全恢复。更可靠的方式是同时检查容器或 Kubernetes、Rainbond 核心组件、控制台访问和集群 API。

### 先确认安装方式

如果你使用的是快速安装，Rainbond 会运行在名为 `rainbond` 的 Docker 容器中：

```bash
docker ps -a --filter "name=rainbond"
```

如果能看到 `rainbond` 容器，说明是快速安装模式，需要进入容器内检查 Kubernetes 和 Rainbond 组件。如果没有该容器，通常是基于 Kubernetes、主机安装或 Helm 安装，直接检查 Kubernetes 集群即可。

### 快速安装模式检查

快速安装模式下，服务器重启后需要确认 Docker 服务、`rainbond` 容器、容器内 Kubernetes 和 Rainbond 组件都已恢复。

```bash
systemctl status docker
docker ps -a --filter "name=rainbond"
```

正常情况下，`rainbond` 容器状态应为 `Up`。如果容器处于 `Exited` 状态，可以先启动容器：

```bash
docker start rainbond
docker logs -f rainbond
```

等待日志中没有持续报错后，再进入容器继续检查。

```bash
docker exec -it rainbond bash
kubectl get nodes
kubectl get pod -n kube-system
kubectl get pod -n rbd-system
```

节点状态应为 `Ready`，`kube-system` 下的核心 Pod 应为 `Running` 或 `Completed`，`rbd-system` 下的 Rainbond 核心组件应为 `Running`。

### 主机安装模式检查

基于 Kubernetes、主机安装或 Helm 安装时，先确认 Kubernetes 集群恢复，再检查 Rainbond 组件。

```bash
kubectl get nodes -o wide
kubectl get pod -n rbd-system -o wide
```

所有承载 Rainbond 组件的节点都应为 `Ready`。正常恢复时，核心组件应为 `Running`，并且 `READY` 列显示所有容器已就绪。例如 `rbd-gateway` 通常需要达到 `2/2 Running`，`rbd-api`、`rbd-app-ui` 通常需要达到 `1/1 Running`。

### 状态异常时怎么继续排查

如果 `rbd-system` 中存在异常 Pod，先查看事件，再看日志：

```bash
kubectl describe pod <pod-name> -n rbd-system
kubectl logs <pod-name> -n rbd-system --all-containers --tail=200
```

也可以按组件标签查看日志：

```bash
kubectl logs -fl name=rbd-api -n rbd-system
kubectl logs -fl name=rbd-gateway -n rbd-system -c apisix
kubectl logs -fl name=rainbond-operator -n rbd-system
```

常见判断方向如下：

| 现象 | 优先排查 |
| :--- | :--- |
| `kubectl` 无法连接集群 | Kubernetes 服务是否启动、`KUBECONFIG` 是否正确 |
| 节点 `NotReady` | 容器运行时、网络插件、磁盘空间、系统负载 |
| Pod 一直 `Pending` | 节点资源、节点是否可调度、存储卷是否可挂载 |
| Pod `CrashLoopBackOff` | 对应组件日志、配置错误、依赖服务是否可用 |
| Pod `ImagePullBackOff` | 镜像仓库、网络、镜像拉取凭据 |
| Pod `Evicted` | 节点磁盘压力或内存压力 |
| 控制台打不开但 Pod 正常 | `rbd-gateway` 状态、7070 端口、防火墙或安全组 |
| 控制台打开但集群通信异常 | `rbd-api` 状态、8443 端口、控制台中的集群 API 地址 |

满足以下条件后，基本可以判断 Rainbond 已经启动并恢复可用：

1. `kubectl get nodes` 显示节点为 `Ready`。
2. `kubectl get pod -n rbd-system` 中核心组件为 `Running`，`READY` 列全部就绪。
3. `http://<服务器IP>:7070` 可以打开控制台。

如果以上检查未通过，可以继续参考本文前面的集群通信、平台组件和节点驱逐相关问题。

## 5. 磁盘空间超80%节点处于驱逐状态

当磁盘根分区空间超过 80% 时，Kubernetes 会自动进入驱逐状态，所有的 Pod 都会被驱逐，届时 Rainbond 将无法正常工作，需要清理磁盘空间。

清理 Docker 不再使用的资源：

```bash
docker system prune
```

清理 Rainbond 镜像仓库存储的镜像，如果你采用的是 Rainbond 默认提供的镜像仓库，可参阅 [清理 rbd-hub 镜像](https://t.goodrain.com/d/21-rbd-hub)。
