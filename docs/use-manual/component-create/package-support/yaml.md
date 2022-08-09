---
title: yaml文件识别创建
description: 直接通过编写yaml文件上传创建k8s资源
---

本篇文档介绍了如何通过上传yaml文件创建k8s资源，以及对特定的资源转化为 Rainbond 抽象层。  

yaml文件资源识别创建有两个入口分别是在团队视图下新增和应用视图下的添加组件。
- 团队视图
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_team_handle.jpg" title="团队视图yaml上传"/>
- 应用视图
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_app_handle.jpg" title="应用视图应用上传"/>


## 前提条件

1. 对k8s资源的yaml文件非常熟悉，准备一个或多个k8s资源的yaml文件。
2. 检查当前团队和应用是否是期望创建的位置。

应用视图下和团队视图操作一致，这里以团队视图为例进行演示。

## 上传yaml

1. 选择应用。

2. 上传yaml文件

3. 在确认无误后，点击创建。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_push.jpg" title="上传yaml"/>

## k8s资源名称

1. 这一部分可以识别全部的k8s资源，部分资源可转换为 Rainbond 资源的，其他资源全部存放在应用下的k8s资源当中。

2. 检查无误后点击下一步

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_resource_name.jpg" title="yaml资源名称"/>

## 高级资源识别

1. 在这个页面你能看到你部署在集群中的资源对应到 Rainbond 各个模块后的体现。其中Deployment、Job、Cronjob、StatefulSet会识别为组件，其他Service、HPA等资源会对应解析为应用视图下的k8s资源中。

2. 在确认无误后，点击部署。

3. 部署需要数据存储、拉取镜像等操作所以时间会比较长，稍加等待后便会跳到应用视图下

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/advanced_resources.jpg" title="高级资源识别"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/team.jpg" title="跳转团队视图"/>