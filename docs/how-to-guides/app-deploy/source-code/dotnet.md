---
title: .NET 项目部署
description: 在 Rainbond 上通过源代码部署 .NET 项目。支持 ASP.NET Core、多项目 solution、自定义发布参数和 NuGet 配置。
keywords:
- Rainbond .NET 源码构建
- Paketo .NET Buildpacks
- Rainbond ASP.NET Core 部署
---

本篇文档介绍如何在 Rainbond 平台上通过源代码部署 .NET 项目。

## 项目识别

当源码根目录中存在以下任一文件时，Rainbond 会将项目识别为 `.NET` 项目：

- `*.sln`
- `*.csproj`

## 支持的项目类型

Rainbond 当前不会区分 ASP.NET Core MVC、Minimal API、Razor Pages 等具体框架，而是统一按 .NET 项目处理。

| 项目类型 | 说明 |
|---------|------|
| 单项目应用 | 根目录存在一个可直接发布的 `*.csproj`，可直接构建部署 |
| 多项目 solution | 一个仓库中存在多个项目时，可通过项目路径指定实际发布入口 |

## 构建参数

在组件的 **构建源** 页面或构建环境变量中，可以配置以下常用参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| .NET 版本 | 指定 .NET 运行时版本，优先读取项目中的目标框架 | `8.0` |
| 项目路径 | 多项目 solution 场景指定要发布的项目路径，例如 `./src/WebApp` | 空 |
| 发布参数 | 追加或覆盖 `dotnet publish` 参数，例如 `--verbosity=normal --self-contained=true` | 空 |
| NuGet 配置 | 指定平台中已存在的 NuGet 配置名称，用于私有源认证 | 空 |
| 启动方式 | 默认或自定义 | 默认 |

## 支持的 .NET 版本

当前 builder 内置的 CNB .NET 版本如下：

- `8.0`（默认）
- `9.0`
- `10.0`

## 启动命令

大多数 ASP.NET Core 项目可以直接使用默认启动方式。

如果你需要覆盖默认启动方式，也可以通过以下任一方式提供自定义命令：

- 在源码根目录添加 `Procfile`
- 在源码构建参数中选择自定义启动方式并填写启动命令

例如：

```procfile
web: dotnet app.dll
```

## 部署示例

1. 进入目标团队，点击 **新建应用**
2. 选择 **从源码构建** → **更多示例** → **.NET Demo**
3. Rainbond 自动识别为 .NET 项目
4. 点击构建并部署

## 常见问题

### 项目为什么没有被识别为 .NET 项目？

请优先检查源码根目录是否包含以下任一文件：

- `*.sln`
- `*.csproj`

如果这两类文件都不在源码根目录，平台不会按 `.NET` 项目识别。
