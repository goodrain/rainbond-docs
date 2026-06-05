---
title: Java 项目部署
description: 在 Rainbond 上通过源码构建部署 Java 和 SpringBoot 项目，支持 Maven 单模块、多模块和 Gradle 项目。
keywords:
- Rainbond Java 源码构建
- Rainbond SpringBoot 部署
- Rainbond Maven 单模块部署
- Rainbond Maven 多模块部署
- Rainbond Gradle 项目部署
---

本篇文档介绍如何在 Rainbond 平台上通过源码构建部署 Java 和 SpringBoot 项目。

Rainbond 默认通过 Git 仓库获取源码，也支持上传源码进行构建。本文只介绍 **Java 源码构建**；如果你已经有打好的 `JAR`、`WAR` 软件包，请参考 [上传本地软件包部署](./upload-package.md)。

## 项目识别

Rainbond 通过以下规则识别 Java 项目：

- **Maven 项目**：源码根目录存在 `pom.xml`
- **Gradle 项目**：源码根目录存在 `build.gradle` 或 `gradlew`

## 支持的项目类型

### Maven 单模块项目

适用于只有一个可直接运行模块的 Spring Boot 项目，通常构建后产物位于 `target/` 目录。

### Maven 多模块项目

适用于父工程管理多个子模块的项目。构建时通常需要确认最终运行模块，并按需指定目标产物。

### Gradle 项目

适用于使用 `build.gradle` 或 `gradlew` 管理的 Java / Spring Boot 项目。多模块 Gradle 项目同样建议确认最终运行模块和目标产物。

## 构建参数

在组件的 **构建源** 页面可以配置以下参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 禁用缓存 | 控制本次构建是否禁用缓存 | 关闭 |
| OpenJDK版本 | Java 主版本 | `17` |
| JVM 类型 | 默认使用 `JRE`，只有运行期依赖 JDK 工具时才选 `JDK` | `JRE` |
| Maven 配置 | Maven `settings.xml` 配置 | 团队默认配置 |
| Maven 构建命令 | Maven 主构建命令 | `clean package` |
| Maven 构建参数 | 追加到 Maven 主命令后的参数 | 空 |
| Maven Java参数 | Maven 进程自身的 JVM 参数 | 空 |
| 构建模块 | 多模块项目时指定最终运行模块 | 空 |
| 目标产物 | 显式指定最终产物路径或匹配模式 | 空 |
| 启动方式 | 默认或自定义 | 默认 |
| 启动命令 | 仅在自定义启动方式时填写，留空则使用默认启动进程 | 空 |

### 多模块项目的构建模块与目标产物

Maven 和 Gradle 多模块项目通常只需要在 `构建模块` 和 `目标产物` 中选择一种方式配置。

如果填写 `构建模块`，平台会在该模块内自动查找构建产物，适合模块内只有一个明确可运行产物的项目。例如：

| 参数 | 示例 |
|------|------|
| 构建模块 | `ruoyi-admin` |
| 目标产物 | 不填写 |

如果填写 `目标产物`，需要填写相对于源码根目录的完整路径，适合模块内会生成多个 JAR，或需要明确指定可运行 JAR 的项目。例如：

| 构建工具 | 目标产物示例 |
|----------|--------------|
| Maven | `ruoyi-admin/target/ruoyi-admin.jar` |
| Gradle | `webs/web-mgt/build/libs/web-mgt.jar` |

### 支持的 Java 版本

`8`、`11`、`17`、`21`、`25`

## 组件运行变量

Java 源码组件运行起来后，如果需要调整 JVM 参数或开启调试能力，可以在 **组件 → 环境配置** 中添加环境变量。

### 通用 JVM 参数

最常用的是 `JAVA_OPTS`，适合直接追加 JVM 参数或 Spring Boot 的 `-D` 参数。

示例：

```bash
JAVA_OPTS=-Dserver.port=8082 -XX:+UseG1GC
```

运行时通常还会自动注入一组默认参数。如下：

```bash
-Djava.security.properties=/layers/paketo-buildpacks_bellsoft-liberica/java-security-properties/java-security.properties
-XX:+ExitOnOutOfMemoryError
-XX:MaxDirectMemorySize=10M
-Xmx458883K
-XX:MaxMetaspaceSize=77692K
-XX:ReservedCodeCacheSize=240M
-Xss1M
-XX:+UnlockDiagnosticVMOptions
-XX:NativeMemoryTracking=summary
-XX:+PrintNMTStatistics
```

其中 `-Xmx`、`-XX:MaxDirectMemorySize`、`-XX:MaxMetaspaceSize`、`-XX:ReservedCodeCacheSize` 等值会根据组件可用内存动态计算，因此不同组件看到的具体数值可能不同。

| 默认参数 | 说明 |
|----------|------|
| `-Djava.security.properties=.../java-security.properties` | 加载额外 Java 安全配置 |
| `-XX:+ExitOnOutOfMemoryError` | 发生 OOM 时直接退出，便于平台拉起重启 |
| `-XX:MaxDirectMemorySize` | 限制 Direct Memory 上限 |
| `-Xmx` | 限制 Java Heap 最大值 |
| `-XX:MaxMetaspaceSize` | 限制 Metaspace 最大值 |
| `-XX:ReservedCodeCacheSize` | 预留 JIT Code Cache 大小 |
| `-Xss` | 设置单线程栈大小 |
| `-XX:+UnlockDiagnosticVMOptions` | 开启诊断类 JVM 选项 |
| `-XX:NativeMemoryTracking=summary` | 开启 Native Memory Tracking 摘要模式 |
| `-XX:+PrintNMTStatistics` | 进程退出时输出 Native Memory 统计 |

### 调试与诊断

如果需要远程调试，可以使用以下变量：

| 环境变量 | 说明 |
|----------|------|
| `BPL_DEBUG_ENABLED` | 开启远程调试 |
| `BPL_DEBUG_PORT` | 远程调试端口，默认 `8000` |
| `BPL_DEBUG_SUSPEND` | 是否在调试器连接前挂起启动 |
| `BPL_HEAP_DUMP_PATH` | OOM 时 Heap Dump 输出路径 |

:::tip
如果开启了远程调试或 JMX，除了添加环境变量，还需要在组件端口配置中放通对应端口。
:::

## Maven 单模块项目部署

### 部署步骤

1. 进入目标团队，点击 **新建应用**
2. 选择 **从源码构建**
3. 按表单填写：
   - 组件名称
   - 组件英文名称
   - 仓库地址
   - 子目录路径
   - 代码版本
4. 点击 **确认创建**
5. Rainbond 自动识别为 Maven 项目
6. 保持默认启动方式，直接构建并部署

示例仓库：

| 配置项 | 内容 |
|--------|------|
| 仓库地址 | `https://gitee.com/rainbond/sourcecode-examples.git` |
| 代码分支 | `master` |
| 子目录 | `java/springboot-maven` |

## Maven 多模块项目部署

### 部署步骤

1. 进入目标团队，点击 **新建应用**
2. 选择 **从源码构建**
3. 按表单填写：
   - 组件名称
   - 组件英文名称
   - 仓库地址
   - 代码版本
4. 点击 **确认创建**
5. Rainbond 自动识别为 Maven 多模块项目
6. 在构建源中选择一种产物定位方式：
   - 填写 `构建模块`，让平台自动在模块内查找产物
   - 或填写 `目标产物`，指定相对于源码根目录的完整 JAR 路径
7. 保持默认启动方式，直接构建并部署

示例仓库：

| 配置项 | 内容 |
|--------|------|
| 仓库地址 | `https://gitee.com/zhangbigqi/RuoYi-Vue.git` |
| 代码分支 | `master` |
| 子目录 | 仓库根目录 |

对于这个多模块示例，通常需要确认最终运行模块，再按需填写 `构建模块` 或 `目标产物`。

## Gradle 项目部署

### 部署步骤

1. 进入目标团队，点击 **新建应用**
2. 选择 **从源码构建**
3. 按表单填写：
   - 组件名称
   - 组件英文名称
   - 仓库地址
   - 子目录路径
   - 代码版本
4. 点击 **确认创建**
5. Rainbond 自动识别为 Gradle 项目
6. 保持默认启动方式，直接构建并部署

### 示例

| 配置项 | 内容 |
|--------|------|
| 仓库地址 | `https://gitee.com/rainbond/sourcecode-examples.git` |
| 代码分支 | `master` |
| 子目录 | `java/springboot-gradle` |

## 常见问题

### 构建成功，但启动的不是我想要的服务

这通常发生在 Maven 或 Gradle 多模块项目中。请优先检查：

- 如果使用 `构建模块`，模块路径是否填写正确
- 如果使用 `目标产物`，是否填写了相对于源码根目录的完整 JAR 路径
- 如果项目生成多个 JAR，是否选择了可执行 JAR，而不是 `*-plain.jar`

### 构建成功，但组件启动失败

常见原因有：

- Java 版本不匹配
- 应用本身启动报错
- 目标产物选错
- 启动命令被错误覆盖

建议先查看组件运行日志，再回到构建源确认 Java 版本、构建模块和目标产物。

### 依赖已经更新，但构建结果没有变化

这通常与缓存有关。可以先尝试开启 **禁用缓存** 重新构建。

### 如何在 Web 终端查看默认注入的启动参数

默认启动方式下，CNB / Paketo 注入的参数通常体现在 `JAVA_TOOL_OPTIONS` 中，可在组件的 Web 终端执行：

```bash
tr '\0' '\n' </proc/1/environ | grep '^JAVA_TOOL_OPTIONS='
```

### 需要启用 TLSv1 或 TLSv1.1 时怎么配置

如果应用需要连接只支持 TLSv1 或 TLSv1.1 的旧系统，直接在 JVM 启动参数中设置 `-Djdk.tls.disabledAlgorithms=...` 通常不会生效。`jdk.tls.disabledAlgorithms` 属于 Java Security 配置项，需要通过 `java.security.properties` 文件覆盖。

建议按以下步骤处理：

1. 首先让程序先正常运行起来。
2. 在组件 **环境配置 → 配置文件** 中新增配置文件，挂载路径填写：

```text
/java-security.properties
```

3. 配置文件内容可以从同版本 Java 安装目录中复制一份 `java.security`，例如 JDK 11 及以上通常位于 `$JAVA_HOME/conf/security/java.security`，JDK 8 通常位于 `$JAVA_HOME/jre/lib/security/java.security`。复制后修改 `jdk.tls.disabledAlgorithms`，将 `TLSv1`、`TLSv1.1` 从禁用算法列表中移除。

示例：

```properties
# 修改前示例
jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA, DH keySize < 1024

# 修改后示例
jdk.tls.disabledAlgorithms=SSLv3, RC4, DES, MD5withRSA, DH keySize < 1024
```

4. 在组件 **环境配置 → 环境变量** 中为 `JAVA_OPTS` 追加自定义配置文件路径：

```bash
JAVA_OPTS=-Djava.security.properties=/java-security.properties
```

如果已有 `JAVA_OPTS`，请在原值后追加该参数，不要覆盖已有启动参数。

5. 回到 **构建源** 页面，勾选 **禁用缓存** 后重新构建。

启动后可以在运行日志或 Web 终端中确认参数是否生效：

```bash
tr '\0' '\n' </proc/1/environ | grep 'JAVA_OPTS'
```

输出中包含以下内容，说明组件已经使用自定义 Java Security 配置文件启动：

```text
-Djava.security.properties=/java-security.properties
```

:::warning
TLSv1 和 TLSv1.1 已经不推荐用于新系统，仅建议在必须兼容旧系统时开启。
:::

### Java 应用需要处理中文文件名或中文内容怎么办

如果应用需要上传或下载中文文件名，或导出包含中文内容的 `xlsx`、`pdf`、图片等文件，建议同时完成以下配置：

1. 在项目根目录添加 `Aptfile`，安装中文字体：

```text
:repo:deb https://mirrors.aliyun.com/ubuntu/ noble main restricted universe multiverse
:repo:deb https://mirrors.aliyun.com/ubuntu/ noble-updates main restricted universe multiverse
:repo:deb https://mirrors.aliyun.com/ubuntu/ noble-security main restricted universe multiverse
:repo:deb https://mirrors.aliyun.com/ubuntu/ noble-backports main restricted universe multiverse

fontconfig
fonts-noto-cjk
fonts-wqy-zenhei
```

2. 在组件环境配置里为 `JAVA_OPTS` 环境变量追加字体目录参数：

```bash
-Dsun.java2d.fontpath=/layers/paketo-buildpacks_apt/apt/usr/share/fonts
```

3. 在组件环境配置里增加系统编码的环境变量：

```bash
LANG=C.UTF-8
LC_ALL=C.UTF-8
```

这样可以同时解决中文字体缺失和字符集不一致导致的乱码问题。修改 `Aptfile` 后需要重新构建组件。

### 需要连接 Maven 私服

请在构建源页面选择对应的 `Maven 配置`，确保构建环境中的 `settings.xml` 与团队依赖仓库设置一致。

### 我只有已经打好的 JAR/WAR 文件

这种情况不属于源码构建，建议直接参考 [上传本地软件包部署](./upload-package.md)。
