---
title: 配置项
description: Rainbond Operator 的配置项。
keywords: ["Rainbond Operator"]
weight: w
---

我们推荐使用 Helm 安装和维护 Rainbond Operatro, 目前只给出 Helm 相关的配置项，参考下表。

| 参数                                | 描述                                    | 默认值                                                         |
|-------------------------------------|-----------------------------------------|----------------------------------------------------------------|
| `rainbondOperator.name`             | Rainbond Operator 的名称                | `rainbond-operator`                                            |
| `rainbondOperator.image.repository` | rainbond-operator 的镜像                | `registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator` |
| `rainbondOperator.image.tag`        | rainbond-operator 镜像的 tag            | `v1.0.0`                                                       |
| `rainbondOperator.image.pullPolicy` | rainbond-operator 拉取镜像的策略        | `IfNotPresent`                                                 |
| `openapi.name`                      | openapi 的名称                          | `openapi`                                                      |
| `openapi.image.repository`          | openapi 的镜像                          | `registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-op-ui`         |
| `openapi.image.tag`                 | openapi 镜像的 tag                      | `v1.0.0`                                                       |
| `openapi.image.pullPolicy`          | openapi 拉取镜像的策略                  | `IfNotPresent`                                                 |
| `openapi.image.port`                | openapi 的 service 端口                 | `8080`                                                         |
| `openapi.image.nodePort`            | openapi 的 service 的 nodePort          | `30008`                                                        |
| `openapi.image.installMode`         | 安装模式, WithPackage or WithoutPackage | `WithoutPackage`                                               |
| `rainbond.imageRepository`          | Rainbond 组件的镜像仓库地址             | `registry.cn-hangzhou.aliyuncs.com/goodrain`                   |
| `enableMySQLOperator`               | 是否使用 MySQL Operator 安装 rbd-db     | `true`                                                         |
