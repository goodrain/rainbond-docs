---
title: 安装
description: 在 Rainbond 中通过插件化方式简化 KubeBlocks 的部署和使用
keywords:
- Rainbond KubeBlocks 集成
- KubeBlocks 安装
- 数据库集群部署
- Rainbond 插件
---

本文档介绍如何在 Rainbond 中安装和配置 KubeBlocks 集成。如果您还不了解 Rainbond 的数据库管理能力，建议先阅读[数据库管理概述](./intro.md)。

KubeBlocks 是 Rainbond 数据库管理功能的核心组件，安装后您就可以通过 Rainbond 控制台图形化地创建和管理各种类型的数据库集群。

## 前置条件

在开始安装前，请确保：

1. Rainbond 版本: >= 6.4.0
2. Kubernetes 版本: >= 1.24
3. 安装 [Helm CLI](https://helm.sh/docs/intro/install/)


## 安装步骤

:::tip
下述执行的命令都可以在 Rainbond **平台管理 → 集群管理 → 命令行** 中执行
:::

### 步骤1: 安装 Snapshot Controller（可选）

KubeBlocks 依赖 Snapshot Controller 来实现数据库的备份和恢复功能。如果你需要备份恢复功能，请按照以下步骤安装 Snapshot Controller:

1. 运行以下命令安装 Snapshot Controller CRD:

```bash
kubectl create -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v8.2.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
kubectl create -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v8.2.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml
kubectl create -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v8.2.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml
```

2. 安装 Snapshot Controller:

```bash
helm repo add piraeus-charts https://piraeus.io/helm-charts/
helm repo update
helm install snapshot-controller piraeus-charts/snapshot-controller -n kb-system --create-namespace \
  --set controller.image.repository=k8s.m.daocloud.io/sig-storage/snapshot-controller
```

3. 验证 Snapshot Controller 是否安装成功:

```bash
$ kubectl get pods -n kb-system 
NAME                                   READY   STATUS    RESTARTS   AGE
snapshot-controller-5cccb6fb98-6tnhd   1/1     Running   0          37s
```

### 步骤 2: 创建 Minio 备份存储配置（可选）

如果您要使用[备份功能](https://kubeblocks.io/docs/release-1_0_1/user_docs/concepts/backup-and-restore/backup/backup-repo)，需要在安装前配置 Kubeblocks `backuprepo.yaml` 文件，指定备份存储位置。

:::warning
Rainbond 在安装时默认提供了 MinIO 存储服务，您可以直接使用。您需要进入 MinIO 控制台创建一个新的 Bucket，并将 Bucket 名称、Access Key 和 Secret Key 填写到下面的配置中。

1. 登录 Rainbond 控制台
2. 进入**团队空间** → **新建应用** → **选择 Yaml Helm K8s** → **第三方组件:**
    - 组件名称: MinIO
    - 组件英文名称: minio
    - 组件注册方式: Kubernetes
    - Namespace: rbd-system
    - Service: minio-service
3. 创建后，点击进入 MinIO 第三方组件，进入端口映射页面，添加端口 `9001` 的映射，并打开对内对外端口，通过生成的地址访问 MinIO 控制台，默认用户名: `admin`，密码: `admin1234`
4. 在 MinIO 控制台创建一个新的 Bucket，例如 `kubeblocks-backup`
5. 进入 Minio 控制台的 **Access Keys** 页面，创建一个新的 Access Key 和 Secret Key
6. 将下面配置中的 `<BUCKET>`、`<ACCESS KEY>` 和 `<SECRET KEY>` 替换为您创建的 Bucket 名称、Access Key 和 Secret Key
:::

```yaml
cat >> backuprepo.yaml << EOF
backupRepo:
  create: true
  storageProvider: minio
  config:
    bucket: <BUCKET>
    endpoint: http://minio-service.rbd-system.svc.cluster.local:9000
  secrets:
    accessKeyId: <ACCESS KEY>
    secretAccessKey: <SECRET KEY>
EOF
```

### 步骤 3: 安装 KubeBlocks

1. 运行以下命令安装 KubeBlocks:

```bash
# 安装 CRDs
kubectl create -f https://jihulab.com/api/v4/projects/98723/packages/generic/kubeblocks/v1.0.1/kubeblocks_crds.yaml

# 设置 Helm Repository
helm repo add kubeblocks https://jihulab.com/api/v4/projects/85949/packages/helm/stable

helm repo add kubeblocks https://apecloud.github.io/helm-charts
helm repo update

# 设置使用 KubeBlocks 提供的国内阿里云镜像源
helm install kubeblocks kubeblocks/kubeblocks --namespace kb-system --create-namespace --version=v1.0.1 \
--set image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com \
--set dataProtection.image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com \
--set addonChartsImage.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com \
-f backuprepo.yaml
```

2. 安装完成后，验证 KubeBlocks 是否正常运行:

```bash
kubectl get pods -n kb-system
```

预期输出:
```bash
NAME                                        READY   STATUS    RESTARTS   AGE
kubeblocks-777d976794-6wpbc                 1/1     Running   0          27s
kubeblocks-dataprotection-84db8c4c9-7jhfw   1/1     Running   0          27s
snapshot-controller-5cccb6fb98-6tnhd        1/1     Running   0          26m
```

3. 更新 KubeBlocks Addon:

```bash
# 添加 KubeBlocks Addon 仓库
helm repo add kubeblocks-addons https://jihulab.com/api/v4/projects/150246/packages/helm/stable
helm repo update
```

```bash
#更新 MySQL Addon 为国内镜像源
helm upgrade -i kb-addon-mysql kubeblocks-addons/mysql --namespace kb-system --version 1.0.1 \
--set image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com
#更新 Redis Addon 为国内镜像源
helm upgrade -i kb-addon-redis kubeblocks-addons/redis --namespace kb-system --version 1.0.1 \
--set image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com
#更新 PostgreSQL Addon 为国内镜像源
helm upgrade -i kb-addon-postgresql kubeblocks-addons/postgresql --namespace kb-system --version 1.0.1 \
--set image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com
```

4. 添加 RabbitMQ Addon:

```bash
helm upgrade -i kb-addon-rabbitmq kubeblocks-addons/rabbitmq --version 1.0.1 -n kb-system \
--set image.registry=apecloud-registry.cn-zhangjiakou.cr.aliyuncs.com
```

### 步骤 4: 安装 Rainbond 数据库管理插件

KubeBlocks 安装完成后，需要安装 Rainbond 的数据库管理插件，以便在 Rainbond 控制台中图形化管理数据库。

1. 执行以下命令安装 Rainbond 数据库管理插件:

```bash
kubectl apply -f https://raw.githubusercontent.com/goodrain/rainbond/refs/heads/main/plugins/kb-adapter-rbdplugin/deploy/k8s/deploy.yaml
```

2. 验证插件是否安装成功:

```bash
kubectl get pod -n rbd-system | grep kb-adapter

# 预期输出:
kb-adapter-rbdplugin-8569878bbc-qp997    1/1     Running   0              17s
```

3. 创建 Rainbond 数据库插件文件声明:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: rainbond.io/v1alpha1
kind: RBDPlugin
metadata:
  labels:
    plugin.rainbond.io/enable: "true"
    plugin.rainbond.io/name: "rainbond-databases"
  name: rainbond-databases
spec:
  display_name: "数据库"
  description: "提供数据库管理能力，支持多种数据库类型，包括 MySQL、PostgreSQL、Redis、RabbitMQ 等。"
  version: "v1.0"
  icon: "https://plugins.rainbond.com/databases/logo.svg"
  authors:
    - name: "Official"
      email: "support@rainbond.com"
EOF
```

### 步骤 5: 验证集成是否成功

完成上述安装后，验证 Rainbond 与 KubeBlocks 的集成:

- 登录 Rainbond 控制台 → 进入任意团队 → 新建应用可以看到 **数据库** 选项

![](/docs/how-to-guides/databases/databases.png)

## 下一步

- [MySQL 集群部署](./mysql.md)
- [PostgreSQL 集群部署](./postgresql.md)
- [Redis 集群部署](./redis.md)
- [RabbitMQ 集群部署](./rabbitmq.md)