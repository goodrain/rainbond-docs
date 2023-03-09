---
title: '基于阿里云 ACK 集群安装'
description: '基于阿里云 ACK 集群，使用 helm 从零开始安装 Rainbond'
---

## 安装前提

开始之前，请确定已经购买了以下阿里云资源，所有资源要求在同一区域：

* 购买阿里云 [ACK 托管集群](https://www.aliyun.com/product/kubernetes)
  * ACK Kubernetes 版本 1.16+
* 购买 [SLB 负载均衡](https://www.aliyun.com/product/slb) **（可选）**
  * 配置端口映射 `80 443 6060 7070 8443`
* 购买[文件存储 NAS](https://www.aliyun.com/product/nas) **（可选）**
  * 提供挂载点，如`123456789-var48.cn-shanghai.nas.aliyuncs.com:/`
* 购买 [RDS MySQL](https://www.aliyun.com/product/rds/mysql) **（可选）**
  * 创建 `console` `region` 数据库
  * 版本 5.7+
* 购买 [ACR 容器镜像服务](https://www.aliyun.com/product/acr) **（可选）**
* 安装 [Kubectl](/docs/ops-guide/tools/#kubectl)
* 安装 [Helm](/docs/ops-guide/tools/#helm)

## 对接 ACK 集群

1. 自定义 Helm Chart 参数，填写 SLB NAS RDS ACR 相关信息。

```yaml title="vim values.yaml"

Cluster:
## 是否开启高可用安装
  enableHA: true

## 提供镜像仓库连接信息
  imageHub:
    enable: true
    domain: fdfef-hangzhou.aliyuncs.com
    namespace: sefe
    password: grddgar
    username: zfefee

## 提供阿里云 NAS Server 挂载点，注意一定要加 :/ 与 NAS 挂载命令保持一致
  RWX:
    enable: true
    type: aliyun
    config:
      server: 12345678-bxh32.cn-zhangjiakou.nas.aliyuncs.com:/

## 提供 Region Mysql 数据库连接信息
  regionDatabase:
    enable: true
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com 
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## 提供 UI Mysql 数据库连接信息
  uiDatabase:
    enable: true
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## 提供阿里云 SLB 公网 IP
  gatewayIngressIPs: 121.89.194.127

## 选择 Kubernetes 节点作为 Rainbond 的构建服务运行节点
  nodesForChaos:
  - name: cn-zhangjiakou.10.22.197.170
  - name: cn-zhangjiakou.10.22.197.171

## 选择 Kubernetes 节点作为 Rainbond 的网关服务运行节点，要求节点的 80 443 6060 7070 8443 端口未被占用
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: cn-zhangjiakou.10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: cn-zhangjiakou.10.22.197.171
```

2. 创建 rbd-system 命名空间

```bash
kubectl create namespace rbd-system
```

3. 添加chart仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

4. 安装rainbond

```bash
helm install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

5. 验证安装

- 查看pod状态

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 `rbd-app-ui` pod为 Running 状态即安装成功。
- 安装成功以后，可通过 `$gatewayIngressIPs:7070` 访问rainbond控制台。

## 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[Helm 安装问题排查指南](/docs/troubleshooting/installation/helm)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
