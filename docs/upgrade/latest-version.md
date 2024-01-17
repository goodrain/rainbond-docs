---
title: 升级 Rainbond
Description: 介绍通过主机安装和通过 Helm 安装的 Rainbond 升级版本
keywords:
- Rainbond 版本升级
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="upgrade">

  <TabItem value="quick" label="快速安装" default>

本栏介绍通过快速安装的 Rainbond 升级到最新版本。

:::caution
从 v5.14.0 版本开始，支持快速安装的 Rainbond 单机版本升级。
:::

1. 删除旧版本运行中的镜像。

```bash
docker rm -f rainbond-allinone 
```

2. 按照升级的版本执行 SQL

<details>
  <summary> 5.14.0 开始升级所需 SQL 汇总</summary>
  <div>

```bash
docker exec -ti rainbond-allinone bash
```

根据自己所跨版本执行升级 sql。

- v5.14.1 --> v5.14.2
```bash
curl https://get.rainbond.com/upgrade-5.14.2.sh | bash
```

- v5.15.3 --> v5.16.0
```bash
curl https://get.rainbond.com/upgrade-5.16.0.sh | bash
```

  </div>
</details>

3. 拉取新版本镜像运行  

- 升级到最新版本

```bash
curl -o install.sh https://get.rainbond.com && bash ./install.sh
```
- 升级到指定版本
```bash
curl -o install.sh https://get.rainbond.com && VERSION=<指定的版本> bash ./install.sh
```
版本格式为：`v5.14.1`、`v5.14.2`、`v5.15.0`

  </TabItem>
  
  <TabItem value="" label="主机或 Helm">

本栏介绍通过主机安装和通过 Helm 安装的 Rainbond 升级到最新版本。  

## 从最近的版本升级到 v5.16.0

如果您的 Rainbond 版本是 `v5.15.3`，则可以通过以下方式进行升级。

### 控制台升级

#### 高可用控制台

通过 helm 安装或者高可用迁移出来的控制台升级方式如下：

1. 升级表语句

```bash
kubectl exec -ti `kubectl get pod -nrbd-system|grep rbd-app-ui|grep Running|awk '{print $1}'` -nrbd-system bash

curl https://get.rainbond.com/upgrade-5.16.0.sh | bash
```

2. 更换镜像

集群终端升级的时候一并操作，这里无需单独操作。

#### Allinone 控制台

通过 `docker run` 启动的控制台升级方式如下：

1. 升级表语句

```bash
docker exec -ti rainbond-allinone bash

curl https://get.rainbond.com/upgrade-5.16.0.sh | bash
```

2. 更换 Allinone 镜像

```bash
docker stop rainbond-allinone && docker rm rainbond-allinone
#该命令参数需要和之前启动的rainbond-allinone容器一致
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
--name=rainbond-allinone --restart=always \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.0-release-allinone
```

### 集群端升级

更新 grctl 命令

```bash
docker run -it --rm -v /:/rootfs  registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:v5.17.0-release copy

mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl && grctl install
```

执行升级命令

```bash
# 替换基础 region 镜像版本
grctl cluster upgrade --new-version=v5.17.0-release

# 手动替换 operator 镜像版本为 v5.17.0-release
kubectl edit deploy rainbond-operator -n rbd-system
```

#### 升级 builder 和 runner 镜像

获取最新镜像，并修改 Tag

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.17.0-release
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.17.0-release

docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.17.0-release goodrain.me/builder:latest-{架构:arm64/amd64}
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.17.0-release goodrain.me/runner:latest-{架构:arm64/amd64}
```

推送镜像到私有仓库，参阅[推送镜像到私有仓库](/docs/ops-guide/component/rbd-hub#向集群私有镜像仓库推送镜像)

```bash
如果是双架构则需要 amd64和arm64 都推
---------------------------------
docker push goodrain.me/builder:latest-{架构:arm64/amd64}
docker push goodrain.me/runner:latest-{架构:arm64/amd64}
```

## 跨版本升级到 v5.16.0

跨版本升级步骤如下:

1. 执行每个版本的升级 SQL 脚本。
2. 更新每个版本所需要的 CRD 资源，目前只有 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90) 需要更新 CRD 资源。
3. 升级控制台镜像版本以及集群端镜像版本，按照 [从最近的版本升级到 v5.16.0](#从最近的版本升级到-v5160) 的步骤进行升级控制台镜像以及集群端镜像。
4. 升级 builder 和 runner 镜像，按照上述的 [升级 builder runner 镜像](#升级-builder-和-runner-镜像) 的步骤进行升级 builder 和 runner 镜像。

<details>
  <summary>例如：您现在的版本处于 v5.10.0</summary>
  <div>

1. 先执行每个版本所需要的 SQL 升级脚本。

```bash
# 进入控制台容器内
docker exec -it rainbond-allinone bash

# 在控制台容器内执行 5.10.1 版本升级SQL
curl https://get.rainbond.com/upgrade-5.10.1.sh | bash

# 在控制台容器内执行 5.11.0 版本升级SQL
curl https://get.rainbond.com/upgrade-5.11.0.sh | bash

## 5.12.0 无 SQL 升级

## 5.13.0 无 SQL 升级

## 5.14.0 无 SQL 升级

## 5.14.1 无 SQL 升级

# 在控制台容器内执行 5.14.2 版本升级SQL
curl https://get.rainbond.com/upgrade-5.14.2.sh | bash

# v5.15.0 无 SQL 升级

# v5.15.1 无 SQL 升级

# v5.15.2 无 SQL 升级

# v5.15.3 无 SQL 升级

# 在控制台容器内执行 5.16.0 版本升级SQL
curl https://get.rainbond.com/upgrade-5.16.0.sh | bash


```

2. 更新 CRD 资源 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)。

3. 升级控制台镜像以及集群端镜像版本，按照 [从最近的版本升级到 v5.16.0](#从最近的版本升级到-v5160) 的步骤进行升级。


  </div>
</details>


:::tip
如果您处于更低的版本，请参阅每个版本的[升级文档](/docs/versions)，按照上述操作执行即可。
:::

  </TabItem>
</Tabs>

## 版本变更日志

您可以在 [历史版本变更日志](/community/change/) 中查看每个版本的具体变更内容。

