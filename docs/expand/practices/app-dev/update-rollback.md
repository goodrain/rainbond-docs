---
title: 基于Rainbond实现一键上线/回滚
description: 本篇最佳实践讲解基于Rainbond实现应用的一键上线/回滚。
---


在实际生产环境中，由于业务升级，代码上线发生意外时需要进行回滚（Rollback），Rainbond  实现了发布版本一键回滚，针对不同业务场景在发生意外时均可以使用回滚功能快速将应用回滚至上一版本，减小业务损失；Rainbond支持对应用内单一组件进行一键式快速回滚，同时也支持对应用内多个组件同时执行回滚操作。


## 对组件进行一键式快速回滚

快速将组件回滚至之前任意构建成功的版本

### 前提条件

部署好的 Nginx 示例服务组件，通过Docker镜像构建，镜像地址为 `nginx:1.11`。

### 操作步骤

1.在组件构建源页面修改 **镜像名称** 为 `nginx:1.12` 并重新构建；

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/source.jpg" width="100%" />

2.通过 **Web终端** 进入容器，查看nginx版本；

```bash
$ nginx -v
nginx version: nginx/1.12.2
```
3.在组件总览页面点击 **查看更多版本**，查看之前构建版本历史；

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/version.jpg" width="100%" />

4.点击 **回滚** 按钮即可进入滚动更新过程回滚到之前任意版本。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/rollback.jpg" width="100%" />

### 效果展示

通过  **Web终端** 进入容器，查看nginx版本，已经回归至之前版本

```bash
$ nginx -v
nginx version: nginx/1.11.13
```


## 基于版本号一键上线/回滚

### 概述

以下内容针对通过共享库进行应用升级上线的场景

具体流程：

1. 在测试环境对应用进行测试，并在测试完毕后发布至共享库，
2. 在生产环境中一键安装该应用，作为生产应用，
3. 模拟测试环境应用进行了升级，并重新发布至共享库，定义新的应用版本，
4. 在生产环境将生产应用进行升级，并且模拟在升级出现问题后执行回滚操作。

### 前提条件

完成 [将应用发布为应用模版](/docs/use-manual/get-start/release-to-market/) ，拥有基于示例应用模版安装的应用

### 操作步骤

1.模拟测试环境代码改动，进行构建后再次将应用发布至共享库，定义 应用版本2.0，

2.发布完成后在生产环境该应用 升级 界面将会提示当前应用可升级，点击升级按钮进行升级，

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/upgrade.jpg" width="100%" />

3.升级界面查看 **云市应用升级记录** ，点击查看组件详情，点击 **回滚** 按钮即可对升级操作一键回滚。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/update_rollback/rollback02.jpg" width="100%" />


