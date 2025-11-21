---
title: 快速部署源码和 MySQL
description: 逐步指导通过 Rainbond 快速部署 Java Maven 服务和 MySQL 数据库，实现服务间高效通信
keywords:
- Rainbond 部署教程
- Java Maven 部署
- MySQL 数据库安装
---

本教程将演示 Rainbond 的部分核心能力：

- **源码构建**：自动识别 Java Maven 语言，完成从源码到运行的自动化部署。
- **应用市场生态**：一键安装标准化中间件，实现生产级可用性。
- **组件的拼装**：可视化建立服务依赖，自动注入环境变量与连接信息。

## 前提

- 已完成 [Rainbond 快速安装](/docs/quick-start/quick-install)。

## 一、通过源代码部署 Java Maven 服务

### 🚀 亮点

- **零配置构建**：自动识别`pom.xml`文件，完成依赖下载->编译打包->容器化构建全流程  
- **多环境适配**：自动检测ARM/x86架构，匹配对应基础镜像

### 🧩 操作流程

1. **创建应用和组件**  
    1. 进入目标团队视图 → 新建应用。
    2. 选择从源码构建 → 源码。
        - 自定义应用名称。
        - 仓库地址：`https://gitee.com/rainbond/java-maven-demo.git`。
        - 分支：`master`。

2. **智能解析过程**
    - 根据项目文件自动解析对应的语言类型，如项目内存在 `pom.xml` 文件，自动判断为 `Java-Maven`。
    - 自动根据 `pom.xml` 文件解析 Maven 构建命令。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-new.png)

3. **部署监控**
    - 在组件的总览 → 操作记录中查看源码构建实时日志。
    ```bash
    builder: [INFO] BUILD SUCCESS # 源码编译完成
    pushing manifest for goodrain.me/xxx done # 镜像构建完成
    ```
    - 验证运行状态（绿色）
4. **访问验证**
    - 自动生成访问域名规则，`<组件ID>-<端口>-<NS>-<集群根域名>`，如：`gr6f8fd7-5000-default-192.168.1.11.nip.io`。
    - 组件 → 端口视图，使用自动生成的**域名**访问示例页面。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/access.png)

## 二、通过应用市场安装 MySQL 服务

### 🚀 亮点

- **开箱即用**：预配置资源限制、持久化存储、健康检查等生产级参数。
- **国产化适配**：自动选择与当前集群架构匹配的 MySQL 镜像（ARM/x86）。

### 🧩 操作流程

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/store-new.png)

1. **安装中间件** 
    1. 添加组件 ➡️ 选择外部应用市场。
    2. 搜索 MySQL 并安装 8.0 版本。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/install-mysql-new.png)

2. **智能配置说明**
    - 自动创建 PVC 并挂载到 `/var/lib/mysql`。
    - 自动生成 root 密码并存入组件连接信息。
3. **状态检查**  
    - 组件状态为绿色则代表部署成功。
4. **访问管理**
    - 组件 ➡️ 高级设置 ➡️ 端口视图，启用**对外服务**开关。
    - 自动生成访问策略，点击查看 MySQL 连接信息，如地址、账号密码等。

## 三、建立服务间的通信

### 🚀 亮点

- **自动注入环境变量**：动态注入环境变量，实现服务间的动态解析。
- **服务间通信**：自动创建内部服务域名，实现内部服务使用域名访问。

### 🧩 操作流程

1. **添加依赖:** 右键 `java-maven-demo` 组件 → 创建依赖 → 拖拽到 `mysql` 组件。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/dep-mysql-new.png)

2. **依赖生效验证（命令行）**
    - 进入 `Java` 组件的 Web 终端内，执行：
    ```bash
    env | grep MYSQL_HOST
    curl ${MYSQL_HOST}:${MYSQL_PORT}
    ```
3. **依赖生效验证（浏览器）**
    - 访问 Java 服务实例页面，并进入到 MySQL 示例页面。
    - 确认显示 MySQL 连接信息及数据库表等。

:::info
服务间依赖关系建立后，重启依赖方组件以确保环境变量正确注入。
::: 

## Reference

[如何配置服务间的内部访问](/docs/how-to-guides/app-ops/dependon)