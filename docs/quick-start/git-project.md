---
title: 从 Git 仓库部署第一个应用
description: 使用 Java Maven 示例仓库，在 Rainbond 中完成源码识别、构建部署和访问验证。
---

用一个公开的 Java Maven 示例仓库，走通“填写 Git 地址 → 自动构建 → 打开应用”的流程。

## 准备

- 已安装 Rainbond，并能登录控制台；还没有环境，先完成 [快速安装](./quick-install.mdx)。
- Rainbond 的构建环境能访问 Gitee 和 Maven 依赖源。

## 1. 填写仓库地址

进入目标团队，点击 **新建应用**，选择 **从源码构建**，填写：

| 配置项 | 填写内容 |
| --- | --- |
| 应用名称 | 自定义，例如 `git-demo` |
| 仓库地址 | `https://gitee.com/rainbond/java-maven-demo.git` |
| 分支 | `master` |
| 源码子目录 | 留空，使用仓库根目录 |

![从源码创建组件](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-new.png)

## 2. 确认识别结果并部署

Rainbond 会识别项目类型。确认识别为 **Java Maven**，首次体验保留默认构建配置，按页面提示完成创建并开始构建部署。

在组件的 **操作记录** 中打开构建日志，等待源码编译和镜像构建完成，再等待组件进入运行中状态。

## 3. 开启访问并打开页面

进入组件的 **高级设置 → 端口**，确认 HTTP 端口开启对外访问，点击 **访问** 打开示例页面。

这次先验证示例首页，不需要额外部署数据库。要继续体验数据库连接，再看 [部署源码和 MySQL](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware)。

## 怎样算成功？

- 构建日志显示成功，组件正常运行。
- 浏览器通过组件访问地址打开示例首页。

构建失败时，先看日志中第一处报错，检查仓库和依赖下载是否正常。运行正常但页面打不开时，检查端口的对外访问开关，以及访问地址是否只能在服务器所在内网打开。

跑通示例后，把仓库地址换成自己的项目，按对应的 [语言部署指南](/docs/how-to-guides/app-deploy/source-code) 核对构建和启动配置即可。
