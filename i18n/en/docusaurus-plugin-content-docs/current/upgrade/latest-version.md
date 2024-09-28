---
title: Upgrade Rainbond
Description: Describes the Rainbond upgrade via host installation and Helm installation
keywords:
  - Rainbond version upgrade
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="upgrade">

  <TabItem value="quick" label="快速安装" default>

This column provides an update to the latest version through quick installation of Rainbond

:::caution
Upgrades are supported for quick installation of Rainbond single-machine versions starting with v5.14.0 versions.
:::

1. Delete the active mirror of the old version.

```bash
docker rm -f rainbond-allinone 
```

2. Execute SQL by upgrade version

<details>
  <summary> 5.14.0 start upgrading required SQL summary</summary>
  <div>

```bash
docker exec -ti rainbond-allinone bash
```

Upgrade sql based on your own cross-version.

- v5.14.1 -> v5.14.2

```bash
curl https://get.rainbond.com/upgrade-5.14.2.sh | bash
```

- v5.15.3 -> v5.16.0

```bash
curl https://get.rainbond.com/upgrade-5.16.0.sh | bash
```

  </div>
</details>

3. Pull new version of mirrors to run

- Upgrade to the latest version

```bash
curl -o install.sh https://get.rainbond.com && cash ./install.sh
```

- Upgrade to specified version

```bash
curl -o install.sh https://get.rainbond.com && VERSION=<Designated Version > brah./install.sh
```

版本格式为：`v5.15.0`、`v5.16.0`、`v5.17.0`、`v5.17.1`、 `v5.17.2`

  </TabItem>

  <TabItem value="" label="主机或 Helm">

This column shows the latest version of Rainbond, installed via host and via Helm.

## Upgrade to v5.17.3 from the latest version

If your Rainbond version is `v5.17.0`, you can upgrade by the following means.

### Console Upgrade

The `rbd-app-ui` installed via Helm is running as POD in the Kubernetes cluster and does not need to do this step.

#### Alline Console

Console upgrades enabled by `docker run` are as follows：

1. Change Alline Image

```bash
Docker op rainbond-allinone && docker rm rainbond-allinone
#This command parameter needs to match the previously launched rainbond-allinone container
docker run -d -p 70:70-v ~/.ssh:/root/. sh -v ~/rainbonddata:/app/data \
--name=rainbond-allinone --restore=always \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone
```

### Cluster Upgrades

Install [grctl](/docs/ops-guide/tools/grctl) commands and perform the following upgrades

```bash
# Replace base region mirror version
grctl cluster upgrade --new-version=v5.17.3-release

# Manually replace operator version v5.17.3-release
kubectl edit ploy rainbond-operator-n rbd-system
```

#### Upgrading build and runner mirrors

Get the latest mirror, and modify the Tag

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder: v5.17.3-release
docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/runner: v5.17.3-release

docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder: v5.17.3-release goodrain.me/builder: -latest{structure: arm64/amd64}
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.17.3-release godrain.me/runner:-{structure: arm64/amd64}
```

Push mirrors to private warehouses, see[推送镜像到私有仓库](/docs/ops-guide/component/rbd-hub#Push mirrors to cluster private mirrors warehouse)

```bash
If both structures are needed, amd64 and arm64 both tweeting
----------------------
docker push goodrain.me/builder: latest-{structures:arm64/amd64}
docker push goodrain.me/runner:-{Structure: arm64/amd64}
```

## Upgrade to v5.17.3

The cross-version upgrade steps are as follows:

1. Performs an upgrade SQL script for each version.
2. 更新每个版本所需要的 CRD 资源，目前只有 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90) 需要更新 CRD 资源。
3. Upgrade the console mirror version and the cluster mirror version to upgrade the console mirror and the cluster mirror by [upgrading from the latest version to v5.17.3](#upgrade from the latest version to -v5173).
4. Upgrades builder and runner mirrors, update builder and runner mirrors according to the steps described above (#Upgrade - builder-and -runner-mirror).

<details>
  <summary>eg:：Your current version is v5.10.0</summary>
  <div>

1. Execute the SQL upgrade script required for each version.

```bash
# Enter the Container of
docker exec -it rainbond-allinone bash

# Upgrade SQL
curl https://get.rainbond.com/upgrade-5.10.1.sh | bash

# Execute 5.11 in the Container Container. Version upgrade SQL
curl https://get.rainbond.com/upgrade-5.11.0.sh | bash

## 5.12.0 No SQL Upgrade

## 5. 3.0 No SQL Upgrade

## 5.14.0 No SQL Upgrade

## 5.14.1 No SQL Upgrade

# Executes 5.14 in the Container Container. Version upgrade SQL
curl https://get.rainbond.com/upgrade-5.14.2.sh | bash

# v5.15.0 No SQL Upgrade

# v5. 5.1 No SQL Upgrade

# v5.15.2 No SQL Upgrade

# v5.15.3 No SQL Upgrade

# Executes 5 in the Console Container. 6.0 Upgrade SQL
curl https://get.rainbond.com/upgrade-5.16.0.sh | bash

# v5.17. No SQL Upgrade

# v5.17.1 No SQL Upgrade

# v5.17.2 No SQL Upgrade

# v5.17.3 No SQL Upgrade
```

2. 更新 CRD 资源 [v5.11.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.11.0-upgrade#%E6%B7%BB%E5%8A%A0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)、[v5.12.0](https://v5.12-docs.rainbond.com/docs/upgrade/5.12.0-upgrade#%E6%9B%B4%E6%96%B0%E6%8F%92%E4%BB%B6%E6%89%80%E9%9C%80%E8%B5%84%E6%BA%90)。

3. 升级控制台镜像以及集群端镜像版本，按照 [从最近的版本升级到 v5.17.3](#从最近的版本升级到-v5173) 的步骤进行升级。

  </div>
</details>

:::tip
If you are in a lower version, see each version of[升级文档](/docs/versions), do it as above.
:::

  </TabItem>
</Tabs>

## Version Change Log

You can view the specific changes in each version in [历史版本变更日志](/changelog).
