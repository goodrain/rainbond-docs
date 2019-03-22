---
Hidden: true
Title: "Maven项目源码构建实践之私有仓库对接"
Description: "讲解Rainbond源码构建系统对接企业私有Maven仓库的实践"
Weight: 22005
---


### Maven仓库镜像

#### Maven仓库

Maven仓库主要分两种:

- Remote仓库：相当于公共仓库，大部分都是可以通过URL的形式进行访问
- Local仓库: 存放于本地磁盘的文件夹(其路径类似`.m2/repository`)

其中Remote仓库主要有3种：

- 中央仓库: `http://repo1.maven.org/maven2/`
- 私服: 自建的Maven仓库
- 其他公共仓库: 其他公网可以访问的Maven仓库

仓库种主要是存放Maven构建时需要的各种构件(jar包或者Maven插件)，当向仓库请求构件时，会先检查本地仓库是否已经存在，不存在会向远程仓库请求并缓存到本地。

#### Maven镜像仓库

mirror相当于一个拦截器，它会拦截Maven对remote仓库的相关请求，把请求里的remote仓库地址，重定向到mirror里配置的地址。

示例1：mirrorOf的值为central，表示该配置为中央仓库的镜像，任何对于中央仓库的请求都会转发给镜像仓库`http://192.168.1.200:8081`

```
    <mirror>
      <id>maven.goodrain</id>
      <name>goodrain maven</name>
      <url>http://192.168.1.200:8081/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
```

示例2: mirrorOf的值为*,则表示该配置是所有仓库的镜像，任何对远程仓库的请求都会转发到这个镜像

```
<mirror>
      <id>maven.all.goodrain</id>
      <name>goodrain all maven</name>
      <url>http://192.168.1.200:8081</url>
      <mirrorOf>*</mirrorOf>
    </mirror>
```

##### 其他高级操作

```
<mirrorOf>*</mirrorOf> # 表示所有远程仓库
<mirrorOf>external:*</mirrorOf>  # 除本地仓库外到远程仓库
<mirrorOf>repo1,repo2</mirrorOf> # 匹配repo1和repo2
<mirrorOf>*,!repo1</miiroOf> # 匹配除repo1外所有远程仓库
```

通过Rainbond构建Maven项目，如果不禁用Mirror功能，默认情况下，在源码构建时会通过添加全局Maven配置文件来定义mirror,即任何对远程仓库的请求都会重定向至`maven.goodrain.me`,如果没有将自己的私服对接到rbd-repo则可能导致无法正常下载私服中的构件从而导致源码构建失败。默认配置如下

```
  <mirror>  
    <id>goodrain-repo</id>  
    <name>goodrain repo</name>  
    <url>http://maven.goodrain.me</url>  
    <mirrorOf>*</mirrorOf>  
  </mirror>  
```

{{% notice info %}}
由于镜像仓库完全屏蔽了被镜像仓库，当镜像仓库不稳定或者停止服务的时候，Maven仍将无法访问被镜像仓库，因而将无法下载构件。
{{% /notice %}}

#### Rainbond构建源Maven镜像仓库参数说明

```
1. 禁用Maven Mirror: 默认不禁用镜像功能，即在源码构建时会添加Maven全局配置文件，重定向仓库请求至镜像仓库
2. MAVEN MIRROROF配置: 默认仅镜像central(中央仓库)，如果为空会默认镜像全部仓库
3. MAVEN MIRROR_URL: 默认镜像仓库地址为maven.goodrain.me

其中仅当未禁用Maven Mirror时MAVEN MIRROROF和MIRROR_URL才生效
```

{{% notice note %}}
`maven.goodrain.me`默认是由Rainbond内置的rbd-repo提供服务的。
{{% /notice %}}

### Rainbond组件rbd-repo简介

Rainbond通过rbd-repo组件实现了Maven仓库管理功能，该组件基于 [Artifactory](https://www.jfrog.com/open-source/) 开源版本实现,其源码托管于[goodrain/rbd-repo](https://github.com/goodrain/rbd-repo.git),如果需要自定义自己的rbd-repo可以参考[rbd-repo指南](/user-operations/op-guide/op-repo/)

rbd-repo默认内置镜像了如下远程仓库:

- aliyun-central
- central
- jcenter
- spring
- spring-plugin

<!--

如果您已经部署了Maven仓库管理系统，如 [Artifactory](https://www.jfrog.com/open-source/) 或 [Nexus](http://www.sonatype.org/nexus/)，可以通过配置云帮的rbd-repo组件与您本地的Maven仓库对接。如果您还没有Maven仓库，可以直接使用云帮内置的Maven仓库进行应用的构建。

本文介绍对接云帮外部Maven仓库，实际上就是配置云帮的Artifactory与外部Artifactory或者Nexus对接，同时还会介绍如何使用云帮内置的Maven仓库来上传jar包，最终通过云帮构建java应用。

云帮的Java源码构建模块是通过[Maven](https://maven.apache.org/)进行编译和打包的，云帮会把所有的仓库地址都镜像（mirror）到内部maven仓库地址 `maven.goodrain.me`，云帮Maven的`settings.xml`信息如下：

```
<mirror>
  <id>acp-repo</id>
  <mirrorOf>*</mirrorOf>
  <name>acp repo</name>
  <url>http://maven.goodrain.me/</url>
</mirror>
```

-->

### 对接外部的Maven仓库

<!--
<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven.png" width="80%" />

如上图所示，只需要在云帮内部Maven仓库管理系统中创建Remote（远程）类型的仓库，指向您现有Maven仓库地址，就可以实现与云帮平台的对接。

-->

> 云帮内置Maven仓库管理系统登录信息：

> 地址：http://管理节点IP:8081

>  用户名：`admin`

> 密码：`password`

出于安全考虑，建议您第一时间修改Maven仓库的管理员密码

下面以一个示例来说明一下对接方法：

* 1. 创建Remote类型的仓库

\- 访问 `http://管理节点IP:8081` 并用管理员账号登录。

\- Admin-Repositories 选择 `Remote`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven02.png" width="50%" />

\- 新建Remote（远程）仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven03.png" width="80%" />

\- Remote（远程）仓库类型选择Maven

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven04.png" width="80%" />

* 2. 配置Remote（远程）仓库,其中需要注意Maven的URL可以通过浏览器访问能够正常列出相关构件

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven05.png" width="85%" />

***Repository Key：***仓库的名称，不能与其他仓库重名，示例的仓库名为： `demo-repo`

***URL ：***远程仓库的地址  如果您外部的Maven仓库是Artifactory搭建，地址类似于 `http://<maven域名>/artifactory/list/<仓库名>/`  ，如果您的外部仓库是Nexus搭建，地址类似于 `http://maven域名/nexus/content/repositories/<仓库名>/`

URL地址填写完成后，可以点击 ***\*Test\**** 按钮测试连接的有效性，如果连接有效可以点击 “***\*Save & Finish\****” 按钮完成创建。

3. 将新建仓库添加到`libs-release`虚拟仓库中（重要）**

内部仓库默认会创建一个名为 `libs-release`的虚拟仓库，虚拟仓库（virtual）并不是真实的仓库，它是用于组织本地仓库和远程仓库的逻辑单元。由于云帮镜像了所有仓库地址，因此需要将远程仓库加到虚拟仓库中。

Admin——>Repositories——>Virtual  选择 `libs-release`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven06.png" width="85%" />

{{% notice warning %}}
如果你的私服是Nexus3或者是阿里云Maven仓库则无法使用rbd-repo进行代理镜像。这时需要请禁用Mirror功能，在pom.xml里定义相关仓库信息或者使用Nexus2或者使用Rainbond内置的rbd-repo服务
{{% /notice %}}

### 使用Rainbond内置的Maven仓库

如果您没有Maven仓库管理系统，可以直接使用Rainbond内置的Maven仓库管理系统。下面介绍操作步骤：

- 1. 创建 **Local** 类型的Maven仓库

 创建一个`Local` 类型的Maven仓库，名称为 `repo-local`

- 2. 上传自己的jar包

\- 选择本地仓库 `repo-local`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven07.png" width="85%" />

\- 上传jar包

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven08.png" width="80%" />

- 3. 查看依赖声明信息

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven09.png" width="90%" />

- 4. 将repo-local添加到`libs-release` 虚拟仓库中