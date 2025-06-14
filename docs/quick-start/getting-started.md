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
    1. 进入目标**团队视图 → 新建应用**。
    2. 选择**从源代码构建 → 源码**，填写以下信息：
    ![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source.png)
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
    1. 进入**组件 ➡️ 高级设置 ➡️ 端口**页签，可在【访问策略】中看到自动生成的访问地址。
    2. 点击域名链接，在浏览器中打开并体验 2048 游戏！


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