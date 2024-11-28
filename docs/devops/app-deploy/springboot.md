---
title: Java SpringBoot 项目部署
description: 在 Rainbond 中部署 SpringBoot 项目
keywords:
- Rainbond 部署 SpringBoot 项目
- SpringBoot 项目部署
- Java Gradle 项目部署
- Java Maven 项目部署
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=5" />

## 概述

Rainbond 支持构建 SpringBoot 单模块和多模块的项目，并自动识别。同时也支持通过 Gradle 构建的项目。

### Java Gradle

平台默认会根据源码根目录是否有 gradlew 文件或者 build.gradle 来识别为 Java Gradle 项目.

### Java Maven 单模块

当源代码根目录下存在 `pom.xml` 文件，Rainbond 会将源代码识别为 Java Maven 单模块项目。

### Java Maven 多模块

Rainbond 对 Maven 项目的识别是基于 `pom.xml` 文件的内容，主要分为两个部分：构建命令和启动命令。

1. **构建命令**：告诉系统需要构建哪些模块。类似于运行 `mvn install -pl 'module name' -am`，其中 `-pl` 是指定要构建的模块，`-am` 表示如果模块有依赖，也一并构建。
2. **启动命令**：构建完成后，指定执行哪个 Jar 包来启动服务。类似于 `web: java $JAVA_OPTS -jar *.jar`，其中 `*.jar` 会被替换为实际的 Jar 包名。

**识别规则**：

- **模块定位**：首先，根据根 POM 文件中的 `modules` 标签找到子模块的 POM 文件。
- **打包类型**：如果 `pom.xml` 中的 `packaging` 标签是 `jar` 或 `war`，就会提取模块名和生成的 Jar 包名。如果没有指定 `packaging` 类型，默认认为是 `jar`。
- **模块名**：模块名是由父 POM 文件中 `module` 标签的值组成，用斜杠 `/` 分隔，比如 `rbd-worker/rbd-thirdparty`。
- **Jar 包名**：默认情况下，生成的 Jar 包名是 `${artifactId}-*.jar`（其中 `*` 表示版本号）。如果在 POM 文件中设置了 `finalName`，则会使用 `finalName` 中的值。如果 `finalName` 中使用了变量（如 `${project.name}` 或 `${project.artifactId}`），就会使用变量的实际值来替换。
- **POM 模块**：如果 POM 中的 `packaging` 是 `pom`，并且该 POM 文件中有多个 `module`，则会按以上规则递归解析每个子模块。

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