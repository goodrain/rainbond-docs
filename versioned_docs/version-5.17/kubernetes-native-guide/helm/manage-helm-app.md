---
title: 'Helm应用管理'
description: '在Rainbond中管理Helm应用'
---

跟随文档了解 Helm 应用在 Rainbond 平台中的管理，使开发者或运维人员能够管理及运维 Helm 应用。

### Helm 应用配置

Helm 应用配置页面提供了图形化界面可对 `values.yaml` 文件内容进行修改，最下方的文本框提供`values.yaml` 文件预览功能，如果需要修改配置则需要在 **Values 配置** 中定义需要修改的 Key 和 Value。

- 示例

假设需要将下图中镜像 repository `bitnami/nginx` 修改为 `library/nginx`，则需要在 **Values 配置** 中定义 key 为 `image.repository`，value 为 `library/nginx`，其中 key 多级情况下用 `.` 区分；定义之后点击下方的安装或更新即会生效。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_values_yaml.jpg" title="配置页面" width="100%"/>

### Helm 应用升级回滚或重新安装

Helm 应用部署完成后在 **升级** 界面可进行版本的升级或回滚，此处执行的操作相当于 ` helm upgrade` 和 `helm rollback ` 命令，需要注意的是升级默认直接升级到最新版本，有时候最新版本检测可能会不通过，遇到这样的情况，建议走重新安装选择比最新版本低一些的版本安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_app_upgrade.jpg" title="Helm应用升级" width="100%"/>

回滚操作在升级界面的升级记录里

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_app_rollback.jpg" title="Helm应用升级" width="100%"/>

