---
title: "Rainbond源码构建JAVA项目配置Maven仓库"
Description: "源码构建JAVA项目如何灵活配置Maven环境"
---

### 概述

根据大量的用户反馈，我们发现在Rainbond源码构建java-maven项目的过程中，最容易出现问题的一环就是获取构件失败。

比如：

```
[ERROR] Failed to execute goal on project bq-insurance-third-party: Could not resolve dependencies for project···
```

这样的报错。

本文档将详细说明，如何作出正确的配置去获取项目需要的构件。还有，针对“我在本地可以构建，为何在Rainbond无法构建？”这样的疑问作出解答。

阅读本文档，需要读者对[Rainbond构建Java Maven项目原理](<https://my.oschina.net/u/3945523/blog/3078980>)有一定的理解。

### 下载与安装Maven

Rainbond默认提供多种maven版本供用户选择，对应版本及相应的资源地址获取见下表：

| Maven版本 | 获取地址                                             |
| --------- | ---------------------------------------------------- |
| 3.3.1     | http://lang.goodrain.me/jvm/maven/maven-3.3.1.tar.gz |
| 3.0.5     | http://lang.goodrain.me/jvm/maven/maven-3.0.5.tar.gz |
| 3.1.1     | http://lang.goodrain.me/jvm/maven/maven-3.1.1.tar.gz |
| 3.2.5     | http://lang.goodrain.me/jvm/maven/maven-3.2.5.tar.gz |
| 3.3.9     | http://lang.goodrain.me/jvm/maven/maven-3.3.9.tar.gz |

> 如果遇到Maven构建失败，请优先确认当前maven版本有关。如果不能确定，可以下载上述资源，尝试在本地构建。

### 清除构建缓存

Rainbond为每一个服务的构建环境提供缓存，Maven项目会对maven的安装目录，配置目录，和本地仓库目录提供了缓存，用户通过以下设置清理缓存。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk%26maven/maven1.png" width="100%" />

> 用户应该在首次构建成功前一直开启清除构建缓存直至构建成功。这样可以防止缓存到了不完整或者错误的包，导致构建一直失败。切记，构建会优先去缓存中获取构件。

### 默认Maven构建运行环境设置解析

Rainbond源码构建java-maven项目时，提供了默认的构建运行环境设置。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk&maven/maven2.png" width="100%" />

- 开启清除构建缓存： 
  点击即可在每次构建之前清除构建缓存。默认不开启。
- Maven版本：
  选择Maven版本，默认3.3.1。
- 禁用Maven Mirror： 
  点击后禁用Maven Mirror设置，即获取构件时不再通过rbd-repo（Artifactory）服务，直接前往中央仓库或者`pom.xml`中指定的仓库获取构件。后续的 `MAVEN MIRROR OF` `MAVEN MIRROR URL` 设置失效。默认不会禁用。
- MAVEN MIRROR OF： 
  在开启mirror功能后，由该参数来指定对哪些仓库进行镜像缓存。默认为中央仓库（central），当指定为 * 的时候，会将所有仓库进行镜像缓存。
- MAVEN MIRROR URL： 
  指定镜像仓库地址，默认为Rainbond自带的 maven.goodrain.me （即rbd-repo服务地址）。如果用户具有公司内部使用的私服，推荐直接指定为其地址，指定格式类似：`http://IP:8081/nexus/content/groups/public/`
- Maven构件参数：
  默认设置为忽略单元测试。用户根据项目情况自行设置。
- Maven构件全局参数：
   默认值为 `clean dependency:list install` 。需要注意的是，`dependency:list` 需要下载特定的maven plugin，故而，当用户处于一个离线环境，并且使用的私服中没有对应的构件时，必然会发生构建失败的情况。请更改为 `clean install`。
- MAVEN构建Java参数配置： 
  默认配置为 `-Xmx1024m`。该选项指定了maven构建时使用的内存，根据用户环境自行设置。

> 需要指出的是，指定`MAVEN MIRROR OF` 参数的时候，需要考虑所指定的仓库是否可以被识别。仓库名是在 maven所使用的 `settings.xml` 文件中指定的，而Rainbond默认使用的 `settings.xml` 中只会添加上述的各项配置！！！所以用户日常构建所使用的自定义的仓库名不会被识别。这种情况下，可以指定为 * 即可缓存所有的构件；或者，使用用户自己的 `settings.xml` 文件来替换Rainbond默认文件。

### 自定义Settings.xml

用户可以配置特殊的环境变量，来指定自己在本地构建项目时所使用的 `settings.xml`，指定后，默认构建环境配置中的选项都将失效。

这样的配置将会是一个终极解决方案，用户在本地可以构建，那么在Rainbond就也可以构建。因为使用指定的setting.xml文件后，Rainbond构建环境的一切，都和本地不再有区别。

- 用户可以将自己以往使用的`settings.xml` 放在项目源码目录中，当该文件处于源码根目录下的时候，请这么做：
  设置环境变量 `BUILD_MAVEN_SETTINGS_PATH=/app/settings.xml`，即可使用到该文件。

  >  Rainbond源码构建时，默认会将源码目录全部文件存放在 /app 目录下，故而该文件的路径变为了 /app/settings.xml

- 如果`setting.xml`中存在敏感信息，不宜出现在源码目录中。那么可以将其上传到诸如对象存储等处，提供下载地址。然后：
  设置环境变量 `MAVEN_SETTINGS_URL=http://somewhere/settings.xml`来使用该文件。

### 部署本地私服仓库

有的用户公司内部并没有仓库私服，同时又希望可以在离线的环境下使用Rainbond源码构建maven项目。那就需要利用rbd-repo（Artifactory）服务搭建自己的仓库私服，并把依赖包上传上去。

- 访问 `http://管理节点IP:8081` 并用管理员账号(`admin/password`)登录。

- 创建 **Local** 类型的Maven仓库。示例创建一个`Local` 类型的Maven仓库，名称为 `repo-local`

- 向本地仓库`repo-local`上传自己的jar包

- 查看依赖声明信息

- 将repo-local添加到`libs-release` 虚拟仓库中

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven07.png" width="85%" />

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven08.png" width="80%" />

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/maven/connect-external-maven09.png" width="90%" />

访问`http://<管理节点>:8081/artifactory/list/libs-release/`或者管理节点访问`maven.goodrain.me`看能否列出你新添加的构件。

- 如果用户已经拥有完整可用的repository文件夹，也可以使用 import 功能将整个仓库完整上传到repo-local本地仓库中去。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk%26maven/maven3.png" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk%26maven/maven4.png" width="100%" />

完整上传提供了两种方式：从目录挂载导入，或者上传zip。其中第一种方式需要注意的是，上传的路径是要在rbd-repo容器中的路径上传，所以需要事先执行路径挂载。第二种方式，则需要注意文件上传大小限制，该值可以在admin —— Configuration——General Configuration 中设置。

### 我在本地可以构建，为何在Rainbond无法构建？

通读本篇文档，我们可以发现执行maven构建需要注意的细节很多，这些微小的细节都可能导致构建失败。

但是可以肯定的一点就是，在本地可以构建，那么在网络条件相同的Rainbond环境中就可以构建。因为Rainbond执行源码构建时，使用的原理和普通的maven构建并无不同。需要注意的，就是构建环境上微小的差别。

以下是遇到这样的疑惑时，排查的思路：

- 版本差异：
    这个差异包括了maven版本的差异，也包括JDK的版本差异（即使是同个大版本下不同的小版本）。遇到无法确定原因的报错，这将是首要需要检查的方面。有关JDK版本如何选择，以及出现版本差异影响如何处理，请参见文档： [RAINBOND源码构建JAVA项目选取JDK](<./how-to-select-jdk/>)

- GZIP STDIN NOT IN GZIP FORMAT：
    构建日志如这种报错，基本可以确定为获取JDK或Maven安装包失败，结合文档 [源码构建提示GZIP STDIN NOT IN GZIP FORMAT](<../../user-operations/op-guide/code_build_failure_download_gzip/>) 加以解决。

- 构建缓存： 
    再次强调，用户应该在首次构建成功前一直开启清除构建缓存直至构建成功。这样可以防止缓存到了不完整或者错误的包，导致构建一直失败。切记，构建会优先去缓存中获取构件。

- 获取构件失败：
  这个问题的答案并不惟一，可能出现的情况非常多。

  - 首先，结合构建日志中构件下载地址，来判断获取构件失败时，是否使用仓库私服，使用的是默认私服（maven.goodrain.me）抑或是用户自定义私服（用户自行指定的artifactory或nexus）。

  - 如果禁用Mirror功能，则默认使用中央仓库。这时需要判断网络是否可以访问到中央仓库，当前构件是否在中央仓库中存在。

  - 如果未禁用Mirror功能，并且使用了Rainbond默认仓库私服（maven.goodrain.me），则默认代理中央仓库。这时需要判断网络是否可以访问到中央仓库，当前构件是否在中央仓库中存在。

  - 如果未禁用Mirror功能，并且使用了用户自定义私服。则需要判断网络是否可以访问到指定的仓库私服，当前构件是否在指定仓库私服中存在。

- 401认证失败：
    如果构建报错：

    ```bash
    [ERROR] Failed to execute goal org.apache.maven.plugins:maven-deploy-plugin:2.7:deploy (default-deploy) on project dx-id: Failed to deploy artifacts: Could not transfer artifact com.dx.application:dx-id:pom:0.0.1-20190727.012351-2 from/to snapshots (http://******:8081/artifactory/libs-release): Failed to transfer file: http://*******:8081/artifactory/libs-release/com/dx/application/dx-id/0.0.1-SNAPSHOT/dx-id-0.0.1-20190727.012351-2.pom. Return code is: 401, ReasonPhrase: Unauthorized. -> [Help 1]
    ```

    说明访问用户指定的仓库私服是需要认证信息的，而认证信息一般储存在用户日常使用的 `settings.xml` 文件中。故而，解决这个问题最好的方式，是使用上文中提到的 **自定义Settings.xml** 的方式。再次强调， **自定义Settings.xml** 是作为终极解决方案存在的，同样适用于其他由于用户仓库私服特殊设置所导致的构件获取失败。

- 我的仓库足够我的项目构建所需，却依然报错有构件找不到： 
  Rainbond默认的 `Maven构件全局参数`为 `clean dependency:list install` 。需要注意的是，`dependency:list` 需要下载特定的maven plugin，故而，当用户处于一个离线环境，并且使用的私服中没有对应的构件时，必然会发生构建失败的情况。请更改为 `clean install`。

- 使用rbd-repo代理了其他仓库私服：
  用户是可以使用rbd-repo组件来代理其他的远程仓库私服的。但是不同的仓库私服之间传输构件有可能会出现奇奇怪怪的问题。故而，我们推荐用户使用 `MAVEN MIRROR URL`直接指定远程仓库地址，而不是使用rbd-repo代理。

### 总结

我在本地可以构建，为何在Rainbond环境下无法构建？这个疑问是用户在使用源码构建功能出现问题时最常向我们提出的一个疑惑。甚至也有过用户因此放弃Rainbond的例子，我们对此感到难过。不可否认，源码构建这个功能涉及的知识点相对于其他功能而言，更加的广泛深奥、晦涩难明。

但是需要指出的是，Rainbond Java-Maven所使用的构建原理，与普通的Maven构建原理是一致的。所以从本质上讲，在本地可以构建，在Rainbond环境下就一定可以构建，但是构建环境的设置，构件如何获取等等细节的差别，对于构建结果的影响是非常大的。所以使用Rainbond源码构建Java-Maven项目，最重要的一点，就是找到这些细微的差别，抹平本地环境与Rainbond构建环境的不同。

本文档详细介绍了Rainbond源码构建Java-Maven项目时的各种详细设置与操作。其中很多细节都已经罗列出来， 可以算作是源码构建失败时排查问题的详细思路总结。希望Rainbond的用户在通读整篇文档后，对于Rainbond源码构建功能有更深刻的了解。