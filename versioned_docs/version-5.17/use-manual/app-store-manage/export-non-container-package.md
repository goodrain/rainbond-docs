---
title: 导出非容器包
description: 将源码构建而来的应用导出成为在非容器环境下可用的安装包
---

## 场景

Rainbond 提供的应用模板导出机制，主要用来解决面向最终用户的应用交付问题。然而以往的应用模板的运行，始终无法免除对容器运行环境的要求。应用模板扩展了导出非容器包的能力，专门用于解决最终交付环境中没有容器运行环境的场景中的应用交付问题。

适用的场景包括：
- 交付环境完全离线，导致无法正常安装 Docker 等容器运行时环境。
- 交付环境安全要求极高，不允许使用容器技术。

## 前提要求

- Rainbond 平台版本不低于 v5.8.1-release 。
- 导出的组件基于 [源码构建](../component-create/language-support/) 部署。
- 参考文档，完成 [应用发布](../app-manage/share-app) 流程，将应用发布到内部组件库。

## 导出非容器包

在内部组件库中找到已经发布好的应用模板，在 `导出应用模板` 页面中，点击导出 `导出非容器包` 。导出完成后，即可下载导出的非容器包。

得到的非容器包，命名格式为 `{应用名称}-{应用模板版本号}-slug.tar.gz` 。该包可以在任意 Linux 操作系统中解压，解压后的目录结构如下：

```bash
non-docker-demo-0.1-slug
├── golang
│   ├── golang.env
│   ├── golang.sh
│   └── golang-slug.tgz
├── java-demo
│   ├── java-demo.env
│   ├── java-demo.sh
│   └── java-demo-slug.tgz
└── non-docker-demo.sh
```

- 应用中包含的服务组件，以目录的形式分割，目录命名格式为组件的名字。
- 应用目录下，存在以应用名称命名的全局控制脚本。
- 服务组件目录下，存在单独控制组件的脚本。
- 服务组件目录下，存在以 `{服务组件名}.env` 结尾的环境变量配置文件，其中包含自定义环境变量、配置组环境变量、连接信息环境变量以及定义监听端口的变量 `PORT`。

## 管理非容器包

通过全局控制脚本，可以批量控制应用下所有组件的启动、关闭、状态查询操作。

- 全局启动

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh start
Running app golang with process:  3984 go-demo ...  Done
The environment variable $MEMORY_SIZE was not identified,The Java process will not be optimized....
Running app java-demo with process:  11472 java ...  Done
```

- 组件状态查询

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh status
AppName                        Status                         PID
golang                         Active(Running)                3984
java-demo                      Active(Running)                11472
```

- 全局关闭

```bash
[root@localhost non-docker-demo-0.1-slug]# ./non-docker-demo.sh stop
Stopping app golang which running with pid 3984 ...  Done
Stopping app java-demo which running with pid 11472 ...  Done
```

通过每个服务组件文件夹内的控制脚本，可以管理单个服务组件的启动、关闭、状态查询操作。

- 启动服务组件

```bash
[root@localhost golang]# ./golang.sh start
Handling runtime environment ...  Done
Handling custom environment ...  Done
Running app golang, you can check the logs in file golang.log
We will start your app with ==> go-demo
Running app golang with process: 24033 go-demo ...  Done
```

- 查询服务组件状态

```bash
[root@localhost golang]# ./golang.sh status
AppName                        Status                         PID
golang                         Active(Running)                24033
```

- 关闭服务组件

```bash
[root@localhost golang]# ./golang.sh stop
Stopping app golang which running with pid 24033 ...  Done
```

## 配置管理

服务组件的配置依然通过环境变量来进行管理。

每个服务组件目录中，会包含 `{服务组件名}.env` 类型的环境变量配置文件，服务组件在启动时会加载其中的变量对自身进行配置。

`{服务组件名}.env` 文件会包含以下四种来源的环境变量：

- 服务组件在发布时，组件自定义的环境变量
- 服务组件在发布时，配置组中定义的应用级全局配置的环境变量
- 服务组件之间的连接信息环境变量
- 特别用来声明端口信息的环境变量 $PORT

在非容器包启动之前，用户可以自定义 `{服务组件名}.env` 配置文件来修改服务组件的配置。一种常见的场景是：服务组件在 Rainbond 运行时依赖其他中间件，引用的连接信息环境变量中会包含 `MYSQL_HOST=127.0.0.1` 这样的配置信息，在非容器包中并不包含 Mysql 服务组件，需要用户手动将 `MYSQL_HOST` 环境变量的值，修改为当前交付环境中 Mysql 的真实 IP 地址，再启动服务组件。

## 日志查询

服务组件一旦启动，其日志会输出到服务组件目录下的 `{服务组件名}.log` 日志文件中去。

## 使用须知

相对于在 Rainbond 上运行的应用，非容器包的使用有一些限制，特此在本章节说明。

### 组件构建来源

非容器包，只会导出应用中所有由 [源码构建](../component-create/language-support/) 功能部署而来的服务组件，来自其他构建源，如 Docker 镜像构建、Helm 创建等方式的服务组件，将无法被导出到非容器包中去。

非容器包目前支持的源码类型包括： Java-Maven、Java-Gradle、Java-Jar、Java-War、Golang、NodeJS、NodeJS 前端项目(VUE React)、Html静态语言。

Python 与 PHP 语言，由于其语言特性，需要用户自行处理运行时所依赖的操作系统级的库文件。

### 端口冲突

由于非容器包中的服务组件，在启动时直接占用了服务器的端口，所以要求服务组件的监听端口不可以冲突。这里推荐将服务组件运行时监听的端口以环境变量 `PORT` 来定义，方便在 `{服务组件名}.env` 文件中修改配置。

### 拆分运行

非容器包目录中的每个服务组件目录，都可以单独拆解到其他服务器上运行，如果用户决定这么做，那么请注意配置不同服务之间的访问地址，避免连接不到的情况。

