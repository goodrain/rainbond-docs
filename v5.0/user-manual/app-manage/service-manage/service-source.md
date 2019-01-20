---
title: 服务构建源设置
summary: 服务的构建源信息设置
toc: true
asciicast: true
---

## 构建源

Rainbond创建服务有三种模式：[源码](https://www.rainbond.com/docs/v5.0/user-manual/app-creation/way-of-creation.html#1)、[镜像](https://www.rainbond.com/docs/v5.0/user-manual/app-creation/way-of-creation.html#2-docker)和[应用市场](https://www.rainbond.com/docs/v5.0/user-manual/app-creation/way-of-creation.html#3)，它们分别具有不同的属性提供配置。

* 源码
> 源码的构建源配置参数将是最为丰富的，除了基础的代码仓库信息包括（仓库地址，分支，Tag, 授权信息等)，重点在5.1版本中将提供每个源码类型的CI构建参数设置。

* 镜像
> 镜像的可配置参数主要是镜像地址，仓库信息和镜像启动命令等

* 应用市场
> 从应用市场安装的服务不提供更多的参数配置，主要展示来源于哪个云市应用。

服务创建后的第一个环节就是构建源的健康检测和兼容性检查，只有通过了检查才能正常的创建服务：
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544427683639.jpg" width="100%" />

构建源信息修改后在下一次构建操作中生效。
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544427462576.jpg" width="100%" />

