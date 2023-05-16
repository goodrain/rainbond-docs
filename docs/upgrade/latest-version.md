---
title: 升级 Rainbond
Description: 介绍通过主机安装和通过 Helm 安装的 Rainbond 升级版本
keywords:
- Rainbond 版本升级
---

本文档介绍通过主机安装和通过 Helm 安装的 Rainbond 升级到最新版本。

:::caution
通过快速安装的 Rainbond 单机版本不支持升级。
:::

## 从最近的版本升级到 v5.14.0

如果您的 Rainbond 版本是 `v5.13.0`，则可以通过以下方式进行升级。

### 控制台升级

通过 Helm 安装的控制台 `rbd-app-ui` 是以 POD 方式运行在 Kubernetes 集群中的，不需要在此步操作。

#### Allinone 控制台

通过 `docker run` 启动的控制台升级方式如下：

1. 更换 Allinone 镜像

```bash
docker stop rainbond-allinone && docker rm rainbond-allinone
#该命令参数需要和之前启动的rainbond-allinone容器一致
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
--name=rainbond-allinone --restart=always \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.14.0-release-allinone
```

### 集群端升级

更新 grctl 命令

```bash
docker run -it --rm -v /:/rootfs  registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:v5.14.0-release copy

mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl && grctl install
```

执行升级命令

```bash
#替换基础 region 镜像版本
grctl cluster upgrade --new-version=v5.14.0-release
#手动替换 operator 镜像版本为 v5.13.0-release
kubectl edit deploy rainbond-operator -n rbd-system
```

### 更新builder和runner镜像
1. 需要拉去最新的builder和runner镜像

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.14.0-release
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.14.0-release
```

2. 修改镜像tag

```bash
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.14.0-release goodrain/builder:latest
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.14.0-release goodrain/runner:latest
```

3.推送镜像

```bash
docker push goodrain/builder:latest
docker push goodrain/runner:latest
```

## 跨版本升级到 v5.14.0

跨版本升级步骤如下:

1. 执行每个版本的升级 SQL 脚本。
2. 更新每个版本所需要的 CRD 资源，目前只有 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90) 需要更新 CRD 资源。
3. 升级控制台镜像版本以及集群端镜像版本，按照 [从最近的版本升级到 v5.13.0](#从最近的版本升级到-v5130) 的步骤进行升级控制台镜像以及集群端镜像。

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
```

2. 更新 CRD 资源 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)。

3. 升级控制台镜像以及集群端镜像版本，按照 [从最近的版本升级到 v5.14.0](#从最近的版本升级到-v5140) 的步骤进行升级。


  </div>
</details>


:::tip
如果您处于更低的版本，请参阅每个版本的[升级文档](https://v5.12-docs.rainbond.com/docs/upgrade/)，按照上述操作执行即可。
:::

### 更新builder和runner镜像
1. 需要拉去最新的builder和runner镜像

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.14.0-release
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.14.0-release
```

2. 修改镜像tag

```bash
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.14.0-release goodrain/builder:latest
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.14.0-release goodrain/runner:latest
```

3.推送镜像

```bash
docker push goodrain/builder:latest
docker push goodrain/runner:latest
```

## 版本变更日志

您可以在 [历史版本变更日志](/community/change/) 中查看每个版本的具体变更内容。