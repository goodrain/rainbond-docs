---
title: 从 Git 源码自动构建和部署：从提交到访问地址
description: 使用 Rainbond 识别 Git 源码、配置构建与启动命令、绑定域名，并通过 Webhook 自动触发部署。
keywords: [从Git源码自动构建和部署, 代码自动部署, 源码部署]
---

# 从 Git 源码自动构建和部署

**版本基线：** Rainbond 6.7.0 起新源码组件默认使用 CNB + Paketo Buildpacks；旧组件可保留原构建方式。

```bash
git ls-remote https://git.example.com/team/demo.git HEAD
```

命令应返回提交 SHA；私有仓库请先在平台配置 OAuth 或访问凭据，不要把 Token 写进仓库。

## 操作步骤

1. 选择“基于源码创建组件”，填写仓库、分支和源码子目录。
2. 核对识别到的语言、构建命令、启动命令和监听端口。
3. 添加数据库地址、运行参数和持久化目录；通过组件依赖传递内部连接信息。
4. 执行构建，先看构建日志，再看组件事件和运行日志。
5. 打开 HTTP 端口，在网关中绑定域名和证书。
6. 在构建源设置中开启 Git Webhook；生产环境建议让测试通过后再触发发布。

![Rainbond 源码创建组件界面](/img/video/source-ruoyi-deploy-step-2-2.png)

## 故障处理

- **依赖下载超时：** 配置 Maven、npm、PyPI 或 Go Proxy 镜像，并确认构建网络。
- **启动后无端口：** 确认应用监听 `0.0.0.0`，且端口与平台配置一致。
- **Webhook 无响应：** 检查仓库回调记录、Rainbond 地址可达性和密钥是否匹配。
- **需要系统包：** 使用项目 Dockerfile，或按构建文档配置 Buildpack 参数。

语言与框架入口见 [源码部署总览](/docs/how-to-guides/app-deploy/source-code)。
