---
Hidden: true
Title: 'Maven项目源码构建实践之私有仓库对接'
Description: '讲解Rainbond源码构建系统对接企业私有Maven仓库的实践'
Weight: 22005
---

### Maven 仓库镜像

#### Maven 仓库

Maven 仓库主要分两种:

- Remote 仓库：相当于公共仓库，大部分都是可以通过 URL 的形式进行访问
- Local 仓库: 存放于本地磁盘的文件夹(其路径类似`.m2/repository`)

其中 Remote 仓库主要有 3 种：

- 中央仓库: `http://repo1.maven.org/maven2/`
- 私服: 自建的 Maven 仓库
- 其他公共仓库: 其他公网可以访问的 Maven 仓库

仓库种主要是存放 Maven 构建时需要的各种构件(jar 包或者 Maven 插件)，当向仓库请求构件时，会先检查本地仓库是否已经存在，不存在会向远程仓库请求并缓存到本地。

#### Maven 镜像仓库

mirror 相当于一个拦截器，它会拦截 Maven 对 remote 仓库的相关请求，把请求里的 remote 仓库地址，重定向到 mirror 里配置的地址。

示例 1：mirrorOf 的值为 central，表示该配置为中央仓库的镜像，任何对于中央仓库的请求都会转发给镜像仓库`http://192.168.1.200:8081`

```
    <mirror>
      <id>maven.goodrain</id>
      <name>goodrain maven</name>
      <url>http://192.168.1.200:8081/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
```

示例 2: mirrorOf 的值为\*,则表示该配置是所有仓库的镜像，任何对远程仓库的请求都会转发到这个镜像

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

通过 Rainbond 构建 Maven 项目，如果不禁用 Mirror 功能，默认情况下，在源码构建时会通过添加全局 Maven 配置文件来定义 mirror,即任何对远程仓库的请求都会重定向至`maven.goodrain.me`,如果没有将自己的私服对接到 rbd-repo 则可能导致无法正常下载私服中的构件从而导致源码构建失败。默认配置如下

```
  <mirror>
    <id>goodrain-repo</id>
    <name>goodrain repo</name>
    <url>http://maven.goodrain.me</url>
    <mirrorOf>*</mirrorOf>
  </mirror>
```

> 由于镜像仓库完全屏蔽了被镜像仓库，当镜像仓库不稳定或者停止服务的时候，Maven 仍将无法访问被镜像仓库，因而将无法下载构件。

#### Rainbond 构建源 Maven 镜像仓库参数说明

```
1. 禁用Maven Mirror: 默认不禁用镜像功能，即在源码构建时会添加Maven全局配置文件，重定向仓库请求至镜像仓库
2. MAVEN MIRROROF配置: 默认仅镜像central(中央仓库)，如果为空会默认镜像全部仓库
3. MAVEN MIRROR_URL: 默认镜像仓库地址为maven.goodrain.me

其中仅当未禁用Maven Mirror时MAVEN MIRROROF和MIRROR_URL才生效
```

> 更多[构建源参数](/docs/user-manual/component-op/service-source/)说明参考

> `maven.goodrain.me`默认是由 Rainbond 内置的 rbd-repo 提供服务的。

### Rainbond 组件 rbd-repo 简述

Rainbond 通过 rbd-repo 组件实现了 Maven 仓库管理功能，该组件基于 [Artifactory](https://www.jfrog.com/open-source/) 开源版本实现,其源码托管于[goodrain/rbd-repo](https://github.com/goodrain/rbd-repo.git),如果需要自定义自己的 rbd-repo 可以参考[rbd-repo 指南](/docs/user-operations/op-guide/op-repo/)

rbd-repo 默认内置镜像了如下远程仓库:

- aliyun-central
- central
- jcenter
- spring
- spring-plugin

如果需要镜像如上仓库，可以通过[构建源](/docs/user-manual/component-op/service-source/)配置 MirrorOF 值为`central,jcenter`

默认 rbd-repo 访问地址为：`http://管理节点IP:8081`, 管理员用户名密码：`admin/password`

如果是多管理节点时，对接私有仓库时需要同时配置所有管理节点

另外 rbd-repo 中的仓库主要有三种类型，后面会详细介绍 Local 仓库和 Remote 仓库使用：

- Local: 本地私有仓库，用于内部使用，上传的组件不会与外部进行同步(作为公司内部私服使用);
- Remote: 远程仓库, 用于代理及缓存公共仓库, 不能向此类型的仓库上传私有组件(对接公司已有私服使用);
- Virtual: 虚拟仓库, 不是真实在存储上的仓库，它用于组织本地仓库和远程仓库(maven.goodrain.me)。

### Rainbond 对接私有 Maven 仓库

公司内部有自己的 Maven 私服仓库，可以通过 rbd-repo 组件来实现与 Rainbond 的对接。

> 需要注意: 如果你的私服是 Nexus3 或者是阿里云 Maven 仓库则无法使用 rbd-repo 进行镜像代理缓存。  
> 解决方案:  
> 法 1. 禁用 Rainbond 的 Mirror 配置,项目[构建源](/docs/user-manual/component-op/service-source/)里设置并同时启用开启清除构建缓存配置项, pom.xml 里定义相关仓库信息  
> 法 2. 使用 Nexus2 或者使用 Rainbond 内置的 rbd-repo 服务

#### 示例对接内部私有 Maven 仓库

下面以一个示例来说明一下对接方法：

##### 1. 创建 Remote 类型的仓库

> 访问 `http://管理节点IP:8081` 并用管理员账号(`admin/password`)登录。

Admin Repositories 选择添加`Remote`仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven02.png" width="50%" />

选择新建 Remote（远程）仓库

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven03.png" width="80%" />

Remote（远程）仓库类型选择 Maven

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven04.png" width="80%" />

配置 Remote（远程）仓库,其中需要注意 Maven 的 URL 可以通过浏览器访问能够正常列出相关构件

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven05.png" width="85%" />

**_Repository Key：_**仓库的名称，不能与其他仓库重名，示例的仓库名为： `demo-repo`

**_URL ：_**远程仓库的地址 如果您外部的 Maven 仓库是 Artifactory 搭建，地址类似于 `http://<maven域名>/artifactory/list/<仓库名>/` ，如果您的外部仓库是 Nexus 搭建，地址类似于 `http://maven域名/nexus/content/repositories/<仓库名>/`

URL 地址填写完成后，可以点击 **_Test_** 按钮测试连接的有效性，如果连接有效可以点击 “**_Save & Finish_**” 按钮完成创建。

##### 2. 将新建仓库添加到`libs-release`虚拟仓库中（重要）

内部仓库默认会创建一个名为 `libs-release`的虚拟仓库，虚拟仓库（virtual）并不是真实的仓库，它是用于组织本地仓库和远程仓库的逻辑单元。由于云帮镜像了所有仓库地址，因此需要将远程仓库加到虚拟仓库中。

Admin——>Repositories——>Virtual 选择 `libs-release`

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven06.png" width="85%" />

##### 3. 验证添加是否成功

访问`http://<管理节点>:8081/artifactory/list/libs-release/`或者管理节点访问`maven.goodrain.me`看能否列出你新添加私服的构件。

### 使用 Rainbond 内置的 Maven 仓库

如果您没有 Maven 仓库管理系统，可以直接使用 Rainbond 内置的 Maven 仓库管理系统。下面介绍操作步骤：

1. 创建 **Local** 类型的 Maven 仓库。示例创建一个`Local` 类型的 Maven 仓库，名称为 `repo-local`
2. 向本地仓库`repo-local`上传自己的 jar 包
3. 查看依赖声明信息
4. 将 repo-local 添加到`libs-release` 虚拟仓库中

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven07.png" width="85%" />

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven08.png" width="80%" />

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven09.png" width="90%" />

访问`http://<管理节点>:8081/artifactory/list/libs-release/`或者管理节点访问`maven.goodrain.me`看能否列出你新添加的构件。
