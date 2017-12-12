---
title: 对接Maven仓库
summary: 讲解如何对接云帮外部的Maven仓库和使用云帮内部的Maven仓库
toc: false
asciicast: true
---

<div id="toc"></div>

## 概述

云帮平台通过[acp_repo](manage/module/acp-repo.html)组件实现了Maven仓库管理功能，该组件基于 [Artifactory](https://www.jfrog.com/open-source/) 开源版本实现。

如果您已经部署了Maven仓库管理系统，如 [Artifactory](https://www.jfrog.com/open-source/) 或 [Nexus](http://www.sonatype.org/nexus/)，可以通过配置云帮的acp_repo组件与您本地的Maven仓库对接。如果您还没有Maven仓库，可以直接使用云帮内置的Maven仓库进行应用的构建。

本文介绍对接云帮外部Maven仓库，实际上就是配置云帮的Artifactory与外部Artifactory或者Nexus对接，同时还会介绍如何使用云帮内置的Maven仓库来上传jar包，最终通过云帮构建java应用。

{{site.data.alerts.callout_danger}}

云帮的java源码构建模块是通过[Maven](https://maven.apache.org/)进行编译和打包的，云帮会把所有的仓库地址都镜像（mirror）到内部maven仓库地址 `maven.goodrain.me`，云帮Maven的`settings.xml`信息如下：

```xml
<mirror>
  <id>acp-repo</id>
  <mirrorOf>*</mirrorOf>
  <name>acp repo</name>
  <url>http://maven.goodrain.me/</url>
</mirror>
```

如果要自定义maven仓库，请参考 [自定义maven配置文件]()

{{site.data.alerts.end}}

## 对接外部的Maven仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven.png" width="80%" />

如上图所示，只需要在云帮内部Maven仓库管理系统中创建Remote（远程）类型的仓库，指向您现有Maven仓库地址，就可以实现与云帮平台的对接。

{{site.data.alerts.callout_info}}
云帮内置Maven仓库管理系统登录信息：

地址：http://管理节点IP:8081

用户名：`admin`

密码：`password`

**出于安全考虑，建议您第一时间修改Maven仓库的管理员密码。**
{{site.data.alerts.end}}

下面以一个示例来说明一下对接方法：

### 1. 创建Remote类型的仓库

- 访问 `http://管理节点IP:8081` 并用管理员账号登录。
- Admin-Repositories 选择 `Remote`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven02.png" width="50%" />

- 新建Remote（远程）仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven03.png" width="80%" />

- Remote（远程）仓库类型选择Maven

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven04.png" width="80%" />

### 2. 配置Remote（远程）仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven05.png" width="85%" />

{{site.data.alerts.callout_info}}
**Repository Key：**仓库的名称，不能与其他仓库重名，示例的仓库名为： `demo-repo`

**URL ：**远程仓库的地址  如果您外部的Maven仓库是Artifactory搭建，地址类似于 `http://<maven域名>/artifactory/list/<仓库名>/`  ，如果您的外部仓库是Nexus搭建，地址类似于 `http://maven域名/nexus/content/repositories/<仓库名>/`

URL地址填写完成后，可以点击 **Test** 按钮测试连接的有效性，如果连接有效可以点击 “**Save & Finish**” 按钮完成创建。
{{site.data.alerts.end}}

### 3. 将新建仓库添加到`libs-release`虚拟仓库中（重要）

内部仓库默认会创建一个名为 `libs-release`的虚拟仓库，虚拟仓库（virtual）并不是真实的仓库，它是用于组织本地仓库和远程仓库的逻辑单元。由于云帮镜像了所有仓库地址，因此需要将远程仓库加到虚拟仓库中。

Admin——>Repositories——>Virtual  选择 `libs-release`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven06.png" width="85%" />



## 使用云帮内置的Maven仓库

如果您没有Maven仓库管理系统，可以直接使用云帮内置的Maven仓库管理系统。下面介绍操作步骤：

### 1. 创建 **Local** 类型的Maven仓库

 创建一个`Local` 类型的Maven仓库，名称为 `repo-local`

### 2. 上传自己的jar包

- 选择本地仓库 `repo-local`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven07.png" width="85%" />

- 上传jar包

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven08.png" width="80%" />

### 3. 查看依赖声明信息

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven09.png" width="90%" />

### 4. 将repo-local添加到`libs-release` 虚拟仓库中

该操作与上文一致，此处省略。