---
title: 'Helm应用管理'
description: '在Rainbond中管理Helm应用'
---

跟随文档了解 Helm 应用在 Rainbond 平台中的管理，使开发者或运维人员能够管理及运维 Helm 应用。

### Helm 应用配置

Helm 应用配置页面提供了图形化界面可对 `values.yaml` 文件内容进行修改，最下方的文本框提供`values.yaml` 文件预览功能，如果需要修改配置则需要在 **Values 配置** 中定义需要修改的 Key 和 Value。

- 示例

假设需要将下图中镜像 Tag `8.0.25-debian-10-r37` 修改为 `8.0.25-debian-10-r38`，则需要在 **Values 配置** 中定义 key 为 `image.tag`，value 为 `8.0.25-debian-10-r38`，其中 key 多级情况下用 `.` 区分；定义之后点击下方的安装或更新即会生效。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/manage-helm-app/configuration_page.jpg" title="配置页面" width="100%"/>

### Helm 应用升级

Helm 应用部署完成后在 **配置** 界面可进行版本的升级或回滚，此处执行的操作相当于 ` helm upgrade`` helm rollback  ` 命令，需要注意的是在升级或回滚过程中如果需要对数据进行操作，则需用户在升级或回滚过程中自行处理。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/manage-helm-app/helm_app_upgrade.jpg" title="Helm应用升级" width="100%"/>

应用升级或回滚相关记录会在页面左侧的升级页面进行展示。
