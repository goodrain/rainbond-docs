---
title: Pipeline 安装
description: Pipeline 应用插件安装
keywords:
- Pipeline 应用插件安装
- Pipeline Plugin install
---

本文介绍 Pipeline 应用插件的安装，包含 GitLab 应用和 GitLab Runner 应用的安装。

## 部署 GitLab 和 Runner

Pipeline 应用插件依赖于 GitLab 和 GitLab Runner，需要先部署 GitLab 和 GitLab Runner。

如果您已经部署了 GitLab 和 GitLab Runner，可以跳过此步骤。

### 部署 GitLab

通过 Rainbond 开源应用商店部署 GitLab，进入到 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `GitLab`，选择对应的版本进行部署。

### 部署 Runner

通过 Rainbond 开源应用商店部署 GitLab Runner，进入到 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `GitLab Runner`，选择对应的版本进行部署。

* 部署完成后，进入**组件内 -> Web 终端**，执行以下命令进行注册；

  * 修改 `<URL> <TOKEN> <TAG>`中的内容为自己的 GitLab 地址和 Token以及 Runner Tag。

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "<URL>" \
  --registration-token "<TOKEN>" \
  --description "docker-runner" \
  --tag-list "<TAG>" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

<details>
  <summary>示例配置</summary>
  <div>

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://80.gr6f750c.o67iknar.b5037d.grapps.cn" \
  --registration-token "yN7nsCp2U_Ry_S_NAUxs" \
  --description "docker-runner" \
  --tag-list "shanghai-runner" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

  </div>
</details>

## 部署 Pipeline 应用插件

通过 Rainbond 开源应用商店部署 Pipeline 应用插件，进入到 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `Pipeline`，选择对应的版本进行部署。

### 配置 Pipeline 应用插件

进入到 **Pipeline 应用内 -> Pipeline-Backend组件内**，修改以下环境变量:

* **RAINBOND_URL:** Rainbond 控制台访问地址，例如：`http://192.168.3.33:7070`。
* **RAINBOND_TOKEN:** Rainbond 控制台的 Token，可以在 **右上角用户 -> 个人中心 -> 访问令牌** 中获取。

修改完成后，更新或重启组件生效。

:::caution
`BACKEND_URL` 是后端服务的对外访问地址，用于外部的 GitLab 的 Webhook 回调，默认使用 Rainbond 提供的默认域名，如果您使用的是自定义域名，需要修改此环境变量。
:::

进入到 **Pipeline 应用内 -> k8s 资源 -> 编辑 rainbond-pipeline**，修改 `pipeline` 资源中的 `access_urls` 配置，修改为 `Pipeline-UI` 组件的对外访问地址，如下:

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RBDPlugin
metadata:
  labels:
    plugin.rainbond.io/name: pipeline
  name: pipeline
spec:
  access_urls:
  - https://custom.com
  alias: Pipeline
  author: Talkweb
  description: 该应用插件是基于 GitLab CI/CD 实现，扩展 Rainbond 已有的构建体系。
  icon: https://static.goodrain.com/icon/pipeline.png
  version: 1.0.0
```

修改完成后，就可以在每个团队视图中看到 `流水线` 按钮选项了。

:::caution
如果您的 Rainbond 控制台访问域名是 HTTPS 的，那么 `rainbond-pipeline` 应用插件的访问地址也需要是 HTTPS 的，按照上述步骤修改 `rainbond-pipeline` 资源中的 `access_urls` 配置。
:::