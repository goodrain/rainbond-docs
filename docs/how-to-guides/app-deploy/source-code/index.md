---
title: 使用源代码部署
description: 了解 Rainbond 源码部署的适用场景、默认构建体系与各语言文档入口。
keywords:
- Rainbond 使用源代码部署
- Rainbond 源码构建
- Rainbond CNB Buildpacks
- Rainbond Paketo Buildpacks
---

Rainbond 支持直接基于 Git 仓库源码创建组件，平台会自动识别项目类型，完成构建、打包与启动配置。对于希望保留源码仓库工作流、在平台内统一完成构建发布的场景，优先建议使用源码部署。

:::tip 版本说明
自 `v6.7.0` 起，新建的源码组件默认使用新的 **CNB + Paketo Buildpacks** 构建体系。由旧版本升级而来的已有组件会继续保留原有构建方式，可继续使用；如无兼容性约束，建议优先使用新的 CNB 构建方式。
:::

## 适用场景

- 代码已经托管在 Git 仓库，希望直接从源码完成构建与部署
- 希望平台自动识别语言、依赖管理方式和默认启动命令
- 团队希望统一管理源码构建、镜像生成和后续发布流程

## 选择哪种源码部署方式

### 按语言或框架选择

- [Java / SpringBoot 项目部署](./springboot.md)：适用于 Maven 单模块、多模块和 Gradle 项目
- [.NET 项目部署](./dotnet.md)：适用于基于源码构建的 .NET 项目
- [NodeJS 前后端项目部署](./nodejs.md)：适用于 Vue、React、Next.js、Nuxt、Express、NestJS 等项目
- [Python 项目部署](./python.md)：适用于 Django、Flask、FastAPI 等 Python Web 项目
- [Golang 源码项目部署](./golang.md)：适用于 Go Modules、多入口 `main` 包和私有模块场景
- [PHP 项目部署](./php.md)：适用于常见 PHP Web 项目
- [纯静态网站部署](./html.md)：适用于只有 HTML/CSS/JS 静态资源的站点
- [使用 Dockerfile 构建组件](./dockefile.md)：适用于需要完全自定义构建流程、基础镜像或系统依赖的场景

## 推荐使用方式

1. 如果代码已经在 Git 仓库中，优先按项目语言选择对应文档，直接使用默认的 CNB 构建流程
2. 如果你的组件是从旧版本升级保留下来的历史组件，可以继续沿用原有构建方式
3. 如果没有兼容性约束，建议新项目或重建组件时优先采用新的 CNB 构建方式
4. 如果源码构建无法满足特殊依赖或系统级定制，再考虑切换到 Dockerfile 构建
