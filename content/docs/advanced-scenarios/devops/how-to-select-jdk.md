---
Title: "Rainbond源码构建JAVA项目选取JDK"
Description: "源码构建JAVA项目如何灵活指定JDK"
Hidden: true
Weight: 22009
---

### 默认提供的JDK

Rainbond官方提供了多个版本的OpenJDK供用户使用。这些OpenJDK的安装包托管于好雨科技官方的OSS（对象存储）中。能够接入互联网的Rainbond平台，可以通过rbd-repo组件的代理获取这些资源，而不用人工干预。

用户通过WEB界面配置，或在源码根目录创建`system.properties`，设定`java.runtime.version`来指定OpenJDK版本。

> WEB界面设置的值优先级高于`system.properties`中设定的值。

- WEB界面指定：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk&maven/jdk1.png" style="border:1px solid #eee;width:100%">

- `system.properties`指定方式：

```bash
# system.properties 目前Rainbond能识别的版本值为11,10,1.9,1.8,1.7,1.6
java.runtime.version=1.8
```

在不做出其他任何调整的情况下，在Rainbond执行源码构建时，会获取以下版本的OpenJDK资源：

| OpenJDK版本 | 资源地址                                                     |
| ----------- | ------------------------------------------------------------ |
| 1.8（默认） | http://lang.goodrain.me/jdk/cedar-14/openjdk1.8.0_201.tar.gz |
| 1.6         | http://lang.goodrain.me/jdk/openjdk1.6.0_27.tar.gz           |
| 1.7         | http://lang.goodrain.me/jdk/cedar-14/openjdk1.7.0_201.tar.gz |
| 1.9         | http://lang.goodrain.me/jdk/cedar-14/openjdk9.0.4.tar.gz     |
| 10          | http://lang.goodrain.me/jdk/cedar-14/openjdk10.0.2.tar.gz    |
| 11          | http://lang.goodrain.me/jdk/cedar-14/openjdk11.0.2.tar.gz    |

> 特别提醒：如果maven编译过程中发生错误，请自行下载对应的JDK到自己的环境中，尝试本地构建，来确认是否由于OpenJDK版本问题导致了编译失败。

### 自定义JDK

多数用户希望能够自定义JDK，比如希望使用特定版本的OpenJDK，或者具备Oracle的授权使用OracleJDK。接下来就会讲解如何自定义。

Rainbond平台集成了 Jforg出品的 Artifactory 作为制品库（即rbd-repo组件）。在这里我们可以上传并存储自己的资源，包括jdk包。

- 首先，访问 `http://<管理节点IP>:8081` 登录 Artifactory，默认凭证： admin/password

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk&maven/jdk2.png" style="border:1px solid #eee;width:100%">

- 创建自定义的本地制品仓库，并上传自定义的jdk包。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk&maven/jdk3.gif" style="border:1px solid #eee;width:100%">

  > 需要注意的是，Artifactory 上传文件的默认限制是不能超过 100MB。如果上传的文件超过了这个限制，可以在 Admin > General Configuration 页面中设置 File Upload Max Size 项为一个合适的值。

- 在平台WEB界面指定自定义JDK地址，设置处为应用构建源。

> 像上述方式上传的jdk包，其地址为： http://<管理节点IP>:8081/artifactory/<自定义仓库名>/<文件名>
>
> 类似： http://192.168.1.1:8081/artifactory/jdk2/jdk-8u201-linux-x64.tar.gz

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/jdk&maven/jdk4.png" style="border:1px solid #eee;width:100%">

至此，自定义JDK就完成了。

### 替换默认JDK

自定义JDK自由度更高，能适应更多的使用场景。但是其短板在于JDK获取地址在每一个新建的应用中都要设置一遍。有没有方式，可以替换Rainbond默认提供的JDK包呢？如果可以实现这个功能，那么每次构建都不用做其他设置，使用默认路径，即可安装公司内部指定版本的JDK，岂不是很方便？

默认JDK的地址，实际上指向了Rainbond官方的对象存储，这对于Artifactory而言，属于一种远程仓库（remote repository）。在Artifactory中，是没有办法通过上传文件，来替换远程仓库中的文件的。所以，我们要在本地建立另一个仓库，来替换Rainbond官方提供的远程仓库。

接下来是详细的步骤：

- 用Rainbond官方提供的 rbd-java-buildpack 镜像作为基础，结合自需JDK包制作镜像(以默认的1.8版本为例)

```bash
#构建目录的文件结构如下：
.
├── Dockerfile
└── jdk-8u201-linux-x64.tar.gz #这里使用OracleJDK1.8 为例替换，用户根据自己需求自行更改
```

Dockerfile内容：

```dockerfile
FROM rainbond/buildpack:java-v5.1.5
COPY jdk-8u201-linux-x64.tar.gz /pkg/lang/jdk/cedar-14/openjdk1.8.0_201.tar.gz
```

构建操作：

```bash
docker build -t goodrain.me/buildpack:java-v5.1.5 .
```


- 启动服务

在管理节点编辑指定配置文件：

```bash
#vi /opt/rainbond/conf/base.yaml
#在末尾追加
- name: rbd-java-buildpack
  endpoints:
  - name: BUILDPACK_ENDPOINTS
    protocol:
    port: 2017
  health:
    name: rbd-java-buildpack
    model: http
    address: 127.0.0.1:2017/lang/
    max_errors_num: 3
    time_interval: 30
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-java-buildpack
  start: >-
    docker run --name rbd-java-buildpack
    --network host
    -i goodrain.me/buildpack:java-v5.1.5
  stop: docker stop rbd-java-buildpack
  restart_policy: always
```

启动服务：

```bash
node service update
```

- 修改Artifactory中的远程仓库`pkg_lang` 的远程地址为 `http://<管理节点IP>:2017/lang`：

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/docking-rbd-repo.gif" style="border:1px solid #eee;width:100%">

> 如果已经用Rainbond官方远程仓库获取过JDK包，那么要在 pkg_lang-cache中清除已缓存的记录。

至此，就已经将默认的OpenJDK1.8版本，替换成为指定的 OracleJDK1.8版本了。

### 总结

基于这篇文章，用户已经可以灵活掌握配置使用各种JDK的方式了。

在这篇文章之后，我们会继续发布如何灵活配置Maven环境的文章，敬请期待。