---
title: 组件构建排查
weight: 30007
Description: '集群正常后，创建属于自己的组件时遇到问题的排查'
hidden: false
pre: '<b>6.4 </b>'
---

<div id="toc"></div>

### 镜像构建问题排查

由镜像构建，是 Rainbond 构建组件的一种基本方式，具体操作参见 [DOCKER 镜像支持规范](/docs/user-manual/component-create/image-support/)

在构建的过程中，可能出现如下问题。

#### 服务构建源检测未通过

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-create-problem-1.png" width="100%">

出现此报错截图，说明 Rainbond 未能拉取到指定的镜像。

- 解决方案：
  - 首要检查，在 Rainbond 管理节点尝试 `docker pull <指定镜像>` 是否可以正常拉取到镜像
  - 检查镜像地址是否有写错。包括但不限于中文态的 ":" 等
  - 检查镜像仓库是否需要用户名密码。如需要，确定是否在构建时填写用户名密码
  - Rainbond 服务器到镜像仓库服务器是否有网络限制。检查网络通信，端口是否开放

基于镜像构组件，是一种非常稳健的构建方式。只要能够正常获取镜像，那么构建肯定可以成功。在运行时出现 **运行异常** 请参考[组件运行排查](/docs/Troubleshoot/app-run-problem/)

### 基于 Dockerfile 源码构建问题排查

基于 Dockerfile 源码构建时，具体操作参见 [DOCKERFILE 构建规范](/docs/user-manual/component-create/language-support/dockerfile/)

在构建过程中，可能出现如下问题。

#### 服务构建源检测未通过

出现此报错字样，说明 Rainbond 未能从代码仓库中正确获取代码。

- 解决方案：
  - 确认项目地址填写是否无误，如需拉取的代码在项目根目录下的某个子目录下，则在仓库地址后接`?dir=<子目录名>`。
  - 项目需要安全验证，没有提供正确的用户名密码。
  - 使用了 ssh 协议拉取代码，需要确认 ssh 授权是否正确。
  - Rainbond 服务器到代码仓库是否有网络限制，域名是否可以解析。简单的验证策略是在 Rainbond 管理节点测试 `git clone <仓库地址>`。

#### 构建失败

代码正常获取后，Rainbond 将自动进入构建过程。具体日志将在 **操作日志** 中体现。如果构建操作最终体现 **构建失败**。

- 解决方案：
  - 操作日志中会有构建流程的详细记录，参阅是否有报错。
  - 在 Rainbond 管理节点尝试构建此项目，如构建失败，则优先检查 Dockerfile 代码。搜索诸如 [九个编写 Dockerfile 的常见错误](http://www.dockone.io/article/1414) 之类的文档来学习编写 Dockerfile。
  - 确定 Rainbond 服务器是否可以连通指定资源来执行诸如 `apt-get` `wget` 等操作。

#### 构建超时

构建过程中如果出现 **构建超时**，这**未必一定**指征构建已经失败了！只是说明构建耗时超过了 Rainbond 设定的默认值。是否失败，以及确定构建错误原因，请参见 **操作日志** 具体信息。

### 基于 JAVA 语言源码构建问题排查

基于 JAVA 语言源码构建时，具体操作参见 [JAVA 开发语言支持规范](/docs/user-manual/component-create/language-support/java/)

Java 语言是市面上使用最多的开发语言。Rainbond 除了直接部署 jar、war 包项目，还支持 java-maven 项目直接构建。在构建过程中，可能出现如下问题。

#### 服务构建源检测未通过

出现此报错字样，说明 Rainbond 未能从代码仓库中正确获取代码。

- 解决方案：
  - 确认项目地址填写是否无误，如需拉取的代码在项目根目录下的某个子目录下，则在仓库地址后接`?dir=<子目录名>`。
  - 项目需要安全验证，没有提供正确的用户名密码。
  - 使用了 ssh 协议拉取代码，需要确认 ssh 授权是否正确。
  - Rainbond 服务器到代码仓库是否有网络限制，域名是否可以解析。简单的验证策略是在 Rainbond 管理节点测试 `git clone <仓库地址>`。

#### GZIP STDIN NOT IN GZIP FORMAT

出现此报错字样，确认为下载 jdk 或者 maven 失败。

- 解决方案：
  - 参考 [源码构建提示 GZIP STDIN NOT IN GZIP FORMAT](/docs/user-operations/op-guide/code_build_failure_download_gzip/)

#### 构建失败

在进入 maven 构建阶段后，操作日志将打印以 `[INFO] [WARNING] [ERROR]` 等字样开头的 maven 构建信息。在这个阶段报错，原因非常复杂多变。我们准备了专门的文档来描述这个过程的原理，相关设置以及具体排查文档。请依次详读以下文档：

- [RAINBOND 构建 JAVA MAVEN 项目原理解读](/docs/user-manual/component-create/language-support/java_more/java-maven-de/)
- [JAVA MAVEN 源码构建组件](/docs/user-manual/component-create/language-support/java_more/java-maven/)
- [RAINBOND 源码构建 JAVA 项目选取 JDK](/docs/advanced-scenarios/devops/how-to-select-jdk/)
- [RAINBOND 源码构建 JAVA 项目配置 MAVEN 仓库](/docs/advanced-scenarios/devops/how-to-config-maven/)

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，依然构建失败，你可以：

- 移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

- 前往[社区](https://t.goodrain.com/) 阅读前缀名为【构建问题】【使用问题】的帖子，寻找相似问题的答案
