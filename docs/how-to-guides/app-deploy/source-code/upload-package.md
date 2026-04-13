---
title: 本地源码包或软件包部署
description: 在 Rainbond 中通过上传源码 ZIP、JAR、WAR 或静态资源 ZIP 部署应用的完整指南
keywords:
- Rainbond 软件包部署
- Rainbond 源码 ZIP 部署
- 上传源码 ZIP
- 上传 JAR 包
- 上传 WAR 包
- 上传 ZIP 包
- 前端构建包部署
---

## 概述

Rainbond 支持通过上传本地文件的方式快速部署应用，无需连接代码仓库。根据上传内容不同，可以分为两类：

- **源码 ZIP**：上传未构建的项目源码压缩包，Rainbond 解压后会继续识别语言、安装依赖、执行构建并生成镜像
- **软件包 / 构建产物**：上传已经准备好的 `JAR`、`WAR` 或前端静态资源 ZIP，平台直接按对应类型部署

如果你希望 Rainbond 接管依赖安装、构建和启动过程，优先使用源码 ZIP；如果你已经有可直接运行或可直接托管的产物，则使用软件包方式更合适。

## 支持的上传类型

Rainbond 支持以下几种本地上传方式：

| 类型 | 适用场景 | 说明 |
|------|----------|------|
| **源码 ZIP** | 本地已有完整项目源码，但暂未托管到 Git | 上传后由 Rainbond 继续识别语言并执行源码构建 |
| **JAR** | Java SpringBoot 应用 | 可直接运行的 SpringBoot Jar 包 |
| **WAR** | Java Web 应用 | 需要在 Servlet 容器中运行的 Web 应用 |
| **静态资源 ZIP** | 前端静态站点 | 前端构建后的静态资源包，由 Nginx 提供服务 |

## 如何选择上传方式

- 选择 **源码 ZIP**：你手里是未构建的项目源码，希望 Rainbond 自动完成依赖安装、构建和启动配置
- 选择 **JAR / WAR**：你已经有可直接运行的 Java 构建产物，希望跳过源码构建
- 选择 **静态资源 ZIP**：你已经完成前端构建，只需要部署 `dist`、`build`、`out` 等静态产物

## 上传内容要求

### JAR 包要求

- 必须是可执行的 SpringBoot Jar 包
- 包含完整的依赖和运行时文件

### WAR 包要求

- 符合 Java Servlet 规范的 Web 应用包
- 将在 Tomcat 或 Jetty 等容器中运行
- 确保 `WEB-INF` 目录结构完整

### 源码 ZIP 包要求

源码 ZIP 用于上传未构建的项目代码，解压后应能直接看到项目根目录和语言识别文件。例如：

```text
source.zip
├── pom.xml / build.gradle / package.json / requirements.txt / go.mod
├── src/
├── app/ 或 cmd/
├── public/ 或 static/
└── ...
```

- ZIP 解压后应直接为项目源码根目录
- 根目录需保留语言识别文件，如 `pom.xml`、`build.gradle`、`package.json`、`requirements.txt`、`go.mod` 等
- 压缩包中应包含构建所需的源码、配置文件和依赖描述文件
- 建议不要上传 `node_modules`、`target`、`build`、`dist` 等本地构建缓存
- 如果上传的是前端构建产物，而不是源码，请使用下文的静态资源 ZIP 方式

:::warning 重要提示
- Rainbond 会按源码继续检测项目语言并执行构建
- 如果 ZIP 根目录缺少语言识别文件，或者上传的只是残缺源码，可能无法正确识别项目类型
- 如果你上传的是已构建的前端静态资源，请不要按源码 ZIP 方式处理
:::

### 静态资源 ZIP 包要求

静态资源 ZIP 是前端项目构建后的静态资源包，**必须满足以下结构要求**：

```text
package.zip
└── dist/           # 必须包含 dist 文件夹
    ├── index.html
    ├── static/
    │   ├── js/     # JavaScript 文件
    │   ├── css/    # CSS 样式文件
    │   └── img/    # 图片资源
    └── ...         # 其他静态资源
```

:::warning 重要提示
- ZIP 包解压后**必须包含 dist 文件夹**
- `dist` 文件夹下必须包含 `index.html` 或其他 HTML 入口文件
- `dist` 文件夹下包含 `js`、`css`、`img` 等静态资源
- 如果 ZIP 包结构不符合要求，部署将会失败
:::

## 操作步骤

### 1. 上传源码 ZIP 进行源码构建

1. 进入目标团队，点击 **新建应用** → **上传软件包构建** 并上传源码 ZIP 文件
2. Rainbond 解压后自动识别项目类型，并进入对应的源码构建流程
3. 在 **构建源** 页面确认语言版本、构建命令、启动命令等参数
4. 点击 **构建** 完成部署

### 2. 上传 JAR / WAR / 静态资源 ZIP 直接部署

1. 进入目标团队和应用，**新建应用** → **上传软件包构建** 并上传 JAR、WAR 或静态资源 ZIP 文件
2. 根据上传的文件类型，Rainbond 会自动识别为 Java JAR、Java WAR 或前端静态资源，并进入对应的部署流程
3. 在 **构建源** 页面确认 Java 版本、Web 服务器、启动命令等参数
4. 点击 **构建** 完成部署

- [下载示例 Jar 包](https://gitee.com/rainbond/sourcecode-examples/blob/master/java/jar/springboot-maven-0.0.1-SNAPSHOT.jar)
- [下载示例 WAR 包](https://gitee.com/rainbond/sourcecode-examples/blob/master/java/war/ROOT.war)

## 运行环境配置

### 1. 源码 ZIP 配置

源码 ZIP 上传后，会进入对应语言的源码构建流程。具体构建参数请参考对应语言文档：

- [Java 项目部署](./springboot.md)
- [NodeJS 前后端项目部署](./nodejs.md)
- [Python 项目部署](./python.md)
- [Golang 源码项目部署](./golang.md)
- [PHP 项目部署](./php.md)
- [.NET 项目部署](./dotnet.md)

### 2. JAR 包配置

对于 JAR 包，可以在 **高级设置 → 构建源** 页面配置以下参数：

| 配置项 | 说明 |
|--------|------|
| OpenJDK版本 | 与 [Java 项目部署](./springboot.md#支持的-java-版本) 版本一致 |
| JVM 类型 | 默认使用 JRE，只有运行期依赖 JDK 工具时才选 JDK |
|	启动方式 | 默认或自定义 |
| 启动命令 | 仅在自定义启动方式时填写，留空则使用默认启动进程 |

Java 运行时配置参考 [SpringBoot 项目部署](./springboot.md#组件运行变量)。

### 3. WAR 包配置

对于 WAR 包，可以配置：

| 配置项 | 说明 |
|--------|------|
| OpenJDK版本 | 与 [Java 项目部署](./springboot.md#支持的-java-版本) 版本一致 |
| Web Server | 默认 Tomcat |
| JVM 类型 | 默认使用 JRE，只有运行期依赖 JDK 工具时才选 JDK |
|	启动方式 | 默认或自定义 |
| 启动命令 | 仅在自定义启动方式时填写，留空则使用默认启动进程 |


### 4. 静态资源 ZIP 包配置

静态资源 ZIP 部署后会自动识别为静态网站，使用 Nginx 提供服务。
- [自定义 Nginx 配置](./html#自定义-nginx-配置)


## 常见问题

### 上传源码 ZIP 后没有被识别为预期语言

请优先检查以下几点：

- ZIP 解压后根目录是否直接包含 `pom.xml`、`package.json`、`requirements.txt`、`go.mod` 等识别文件
- 上传的是完整源码，还是只有部分目录
- 是否误把前端构建产物 `dist`、`build` 当成源码 ZIP 上传

如果源码 ZIP 结构不完整，建议先整理为完整项目根目录后再压缩上传。

### 上传后想更新本地上传内容怎么办？

1. 进入组件 → 构建源
2. 根据当前类型重新上传源码 ZIP 或软件包
3. 上传新版本的文件
4. 点击 **构建** 部署新版本

:::warning 注意
ZIP 压缩包更新后，需要点击构建源的**重新检测**按钮，否则不会解压新的 ZIP 包内容
:::
