---
title: 部署你的第一个应用
description: 零基础快速入门 Rainbond，通过简单步骤完成第一个应用部署
keywords:
- Rainbond 入门教程
- 第一个应用部署
- 2048 游戏部署
---

本教程将演示 Rainbond 的入门级使用体验，通过部署经典的 2048 游戏，帮助你快速了解 Rainbond 的基本功能和操作流程。

```mermaid
flowchart LR
  A[代码仓库] -->|自动拉取| B[源码构建]
  B -->|自动识别语言| C[构建镜像]
  C -->|一键部署| D[运行应用]
  D -->|内置网关| E[访问服务]

  style A fill:#e6f7ff,stroke:#1890ff
  style E fill:#e6f7ff,stroke:#1890ff
```

## 前提条件

- 已完成 [Rainbond 快速安装](/docs/quick-start/quick-install)
- 不需要任何额外的配置，开箱即用

## 部署 2048 游戏

### 🚀 亮点

- **零配置构建**：自动识别语言类型，无需手动编写构建脚本
- **网关集成**：自动生成访问域名，无需额外配置网关

### 🧩 操作流程

1. **创建应用和源码组件**
    1. 登录控制台后**点击新建应用**。
    2. 选择**从源代码构建 → 源码**，填写以下信息：
    ![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-new.png)
        - 仓库地址：`https://gitee.com/rainbond/demo-2048.git`
        - 代码分支：`master`
        - 组件名称：`2048`（可自定义）
    3. 点击 **确认创建**。

2. **源码构建自动识别过程**
    - Rainbond 将自动识别项目类型为 `static`（静态网站）

3. **部署监控**
    1. 进入应用视图，可观察到组件部署状态变化：
        - **构建中**：正在从源码构建容器镜像
        - **启动中**：镜像构建完成，正在启动容器
        - **运行中**：应用已成功部署（显示为绿色）
    2. 点击组件，进入 **操作记录** 查看构建日志。

    

4. **访问应用**
    - 当组件状态变为 **运行中**（绿色）后，就可以访问你的应用了。
    - Rainbond 会为每个应用自动生成一个访问域名，但在某些网络环境下可能无法使用。
    - 步骤：
      1. 在组件页面，点击 **高级设置** 选项卡
      2. 点击 **端口**
      3. 在【访问策略】区域，你会看到自动生成的域名，例如：
        ```
        http://gr0cbb3f-5000-default-172.19.82.21.nip.io
        ```
      4. 点击域名链接，在浏览器中打开

:::warning 域名无法访问排查说明
⚠️ **如果域名无法打开**

原因分析：
- 这类域名通常基于 nip.io 提供的动态 DNS 服务，域名中的 IP（如 172.19.82.21）会被自动解析为该 IP 地址。
- 如果该 IP 是内网地址（如 172.19.x.x），则外网用户无法直接访问，只有在同一内网环境下才能访问。

nip.io 原理简介：
- nip.io 是一个公共的 DNS 服务，可以将形如 x.x.x.x.nip.io 的域名自动解析为 IP 地址 x.x.x.x，无需手动配置 DNS 记录，便于开发测试。
- 但如果 IP 地址不可被公网访问（如内网 IP），则域名解析虽成功，但实际无法访问。

排查建议：
- 检查域名中的 IP 是否为内网地址。
- 若需公网访问，请将服务暴露到公网 IP，或配置公网可访问的域名。
:::

:::tip 使用提示
- 您的应用已经自动部署在 Kubernetes 集群中
- 通过 Rainbond 的网关服务自动暴露，无需手动配置 Ingress
- 所有资源（存储、网络等）都已自动配置好
:::

## 探索更多功能

恭喜！你已成功部署了第一个应用。但这仅仅是 Rainbond 强大功能的开始，接下来可以尝试：

- [快速部署源码和 MySQL](../tutorial/via-rainbond-deploy-sourceandmiddleware)
- [组件新版本构建与回滚](../tutorial/component-version-update-and-rollback)
- [自定义域名并配置 HTTPS](../tutorial/custom-gateway)
- [通过应用模板实现应用一键安装和升级](../tutorial/app-template-manage)
- [离线跨环境交付](../tutorial/app-template-offline)
- [接入已有服务器并创建多租户环境](../tutorial/docking-selfhost)