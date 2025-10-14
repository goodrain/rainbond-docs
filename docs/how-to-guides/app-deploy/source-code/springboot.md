---
title: Java SpringBoot 项目部署
description: 在 Rainbond 中部署 SpringBoot 项目的完整指南
keywords:
- Rainbond 部署 SpringBoot 项目
- SpringBoot 项目部署
- Java Gradle 项目部署
- Java Maven 项目部署
- Java 环境配置
---

## 概述

Rainbond 支持构建 SpringBoot 单模块和多模块的项目，支持 Maven 和 Gradle 两种构建工具，并能自动识别项目类型。

## 项目识别策略

### Java Maven 项目

- **单模块项目**：当源代码根目录下存在 `pom.xml` 文件，且不存在 `Dockerfile` 文件时，Rainbond 会将源代码识别为 Java Maven 项目
- **多模块项目**：Rainbond 基于 `pom.xml` 文件内容识别多模块项目，包括构建命令和启动命令两个部分

**多模块识别规则**：

- **模块定位**：根据根 POM 文件中的 `modules` 标签找到子模块的 POM 文件
- **打包类型**：如果 `pom.xml` 中的 `packaging` 标签是 `jar` 或 `war`，就会提取模块名和生成的 Jar 包名。如果没有指定 `packaging` 类型，默认认为是 `jar`
- **模块名**：模块名由父 POM 文件中 `module` 标签的值组成，用斜杠 `/` 分隔，比如 `rbd-worker/rbd-thirdparty`
- **Jar 包名**：默认情况下，生成的 Jar 包名是 `${artifactId}-*.jar`（其中 `*` 表示版本号）。如果在 POM 文件中设置了 `finalName`，则会使用 `finalName` 中的值
- **POM 模块**：如果 POM 中的 `packaging` 是 `pom`，并且该 POM 文件中有多个 `module`，则会递归解析每个子模块

### Java Gradle 项目

平台根据源码根目录是否有 `gradlew` 文件或者 `build.gradle` 来识别为 Java Gradle 项目。

## 部署前准备

### 本地验证

将项目部署到 Rainbond 之前，请按照以下步骤进行本地验证：

1. **源代码托管**：确保源代码托管于 Git 或 SVN 服务器

2. **检查构建环境**：确定 Maven 版本、JDK 版本

```bash
mvn -v
java -version
```

3. **清除本地缓存**：清除本地构建缓存

```bash
mv ${HOME}/.m2/repository ${HOME}/.m2/repository.bak
```

4. **执行构建测试**：使用 Rainbond 默认构建命令测试

```bash
mvn -DskipTests clean dependency:list install
```

### pom.xml 规范

- SpringBoot 项目推荐使用 `jar` 包方式打包
- 非 SpringBoot 项目推荐使用 `war` 包方式打包

## 编译运行环境配置

Rainbond 支持图形化定义编译运行环境，配置位于服务组件的构建源页面。**对这些配置的修改，需要通过构建来生效！**

| 配置项 | 说明 |
|--------|------|
| **禁用缓存** | 开启后下一次构建将移除所有存在文件，包括编译工具和依赖库 |
| **OpenJDK版本** | 选择使用的 OpenJDK 版本，1.8, 1.9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 25 |
| **Maven版本** | 选择 Maven 版本，3.1.1, 3.2.5, 3.3.9, 3.5.4, 3.6.3, 3.8.8, 3.9.1 |
| **Web服务器版本** | 仅适用于打包为War包的项目，jetty7, jetty9, tomcat7, tomcat8, tomcat85, tomcat9 |
| **Maven配置** | Maven 仓库配置，默认阿里云Maven仓库 |
| **Maven构建参数** | Maven 构建时的附加参数，自定义参数，如 `-DskipTests` |
| **Maven构建命令** | Maven 构建执行的目标，自定义命令，如 `clean dependency:list install` |
| **MAVEN构建Java参数配置** | 构建过程中 JVM 内存配置，JVM 参数，如 `-Xmx1024m` |
| **启动命令** | 应用启动命令 |

:::warning 重要提醒
- **MAVEN构建Java参数配置**只影响构建过程，不影响应用运行时的内存分配
- 对任何配置的修改都需要通过**构建**操作来生效
- 务必使用验证准备时验证过的 JDK 和 Maven 版本
:::

## 部署 Java SpringBoot 多模块项目

1. 基于源码部署组件，填写以下信息：

|              | 内容                                         |
| ------------ | -------------------------------------------- |
| 组件名称     | 自定义                                       |
| 组件英文名称 | 自定义                                       |
| 仓库地址     | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| 代码版本     | Master                                       |

2. 进入多模块构建，勾选 **ruoyi-admin** 模块，此模块是可运行的，其他模块都是依赖项。
3. 进入 **组件 -> 端口** 删除掉默认5000端口，添加 **8080 http** 端口。
4. 等待构建完成即可。

## 部署 Java SpringBoot 单模块项目

进入到团队下，新建应用选择**基于源码示例**进行构建，选中 Java Maven Demo 并默认全部下一步即可。

## 部署 Java Gradle 项目

1. 基于源码部署组件，填写以下信息：

|              | 内容                                         |
| ------------ | -------------------------------------------- |
| 组件名称     | 自定义                                       |
| 组件英文名称 | 自定义                                       |
| 仓库地址     | `https://gitee.com/rainbond/java-gradle-demo.git` |
| 代码版本     | Master                                       |

2. 下一步全部默认，等待构建完成。

## 常见问题解决

**Q: 项目比较复杂，使用上述方式无法进行编译**
> A: 这时推荐你自行定义 Dockerfile 文件进行编译和运行环境控制。

**Q: 编译失败怎么处理**
> A: 查看构建日志，从日志中获取编译失败的原因。若你的项目需要从公网去下载依赖包，也有较大可能依赖包下载失败，若网络无限制，重试即可。

**Q: 项目依赖包变化了但编译后发现没有生效**
> A: 若你的依赖包已经正确更新到了私服，考虑是本地缓存依赖包未更新。可以手动禁用缓存后重新构建。

**Q: 项目编译成功，但启动后运行异常**
> A: 可能的原因有：
> - **原因一**：启动命令设置错误，导致容器无法启动。解决方式是正确设置启动命令。
> - **原因二**：代码有问题运行后退出，参考组件运行日志，从日志内容判断原因。
> - **原因三**：内存分配过少，组件无法正常启动。这种因素的日志现象是组件正在启动，然后突然就退出了。这时多考虑为内存设置不足导致 OOM。

**Q: 通过 WEB 终端进入容器环境后，直接执行 `java -version` 版本为 1.8**
> A: 运行服务组件所使用的 java 命令位于 `/app/.jdk/bin/java` 这个路径不在 $PATH 中。
