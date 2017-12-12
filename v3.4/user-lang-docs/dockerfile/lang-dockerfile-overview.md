---
title: 云帮支持Dockerfile
summary: 云帮支持Dockerfile
toc: false
---

<div id="toc"></div>

## 代码识别

您的代码根目录下需要有 `Dockerfile` 文件，云帮会识别代码语言类型为**Dockerfile**

## 云帮Dockerfile约定规范

**Dockerfile** 是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。

#### FROM
```bash
   FROM <image>
```

`FROM` 指定构建镜像的基础源镜像，如果本地没有指定的镜像，则会自动从 Docker 的公共库 pull 镜像下来。

`FROM` 必须是 Dockerfile 中非注释行的第一个指令，即一个 Dockerfile 从 `FROM` 语句开始。

如果 `FROM` 语句没有指定镜像标签，则默认使用latest标签。

`FROM` 可以在一个 Dockerfile 中出现多次，如果有需求在一个 Dockerfile 中创建多个镜像。

#### MAINTAINER
```bash
   MAINTAINER <author name>
```

   指定创建镜像的作者

#### RUN
```bash
   RUN "executable", "param1", "param2"
```

每条 `RUN` 指令将在当前镜像基础上执行shell或者exec的环境下指定命令，并提交为新的镜像，后续的 `RUN` 都在之前 `RUN` 提交后的镜像为基础，镜像是分层的，可以通过一个镜像的任何一个历史提交点来创建，类似源码的版本控制。

#### CMD

`CMD` 的目的是为了在启动容器时提供一个默认的命令执行选项。`CMD` 指定在 Dockerfile 中只能使用一次，如果有多个则会覆盖之前的，只有最后一个会生效。`CMD` 有如下三种形式：

```bash
   CMD ["executable","param1","param2"]
   CMD ["param1","param2"]
   CMD command param1 param2 (shell form)
```

   {{site.data.alerts.callout_success}}
   `RUN` 和 `CMD` 的区别：
   `CMD` 会在启动容器的时候执行，构建(build) 时不执行。
   `RUN` 只是在构建(build)镜像的时候执行
   {{site.data.alerts.end}}

#### EXPOSE
```bash
   EXPOSE <port> [<port>...]
```

云帮支持多端口，如果没有指定 `EXPOSE`，平台将不会开放任何端口。当需要打开端口时，可以在应用的高级页面中配置即可实现与 `EXPOSE` 相同的功能，如：

```bash
   EXPOSE 80
   EXPOSE 5000
   或者
   EXPOSE 80 5000
```

{{site.data.alerts.callout_danger}}避免映射公有端口{{site.data.alerts.end}}

#### ENV
```bash
   ENV <key> <value>       # 只能设置一个变量
   ENV <key>=<value> ...   # 允许一次设置多个变量
```

指定一个环境变量，会被后续 `RUN` 指令使用，可以在容器内被脚本或者程序调用。

#### ADD
```bash
   ADD <src>... <destination>
```

`ADD` 是复制文件指令，复制文件、目录到目标容器的文件系统中。destination是容器内的路径。sre可以是URL或者是启动配置上下文中的一个文件。若src是一个URL，该URL的内容将被下载并复制到目标容器中。

#### COPY
```bash
   COPY <src>... <dest>
```

`COPY` 复制新文件或者目录到目标容器指定路径中 。
{{site.data.alerts.callout_success}}
用法和功能同 `ADD`，区别在于不能用URL，`ADD` 功能更强大些。
{{site.data.alerts.end}}

#### ENTRYPOINT
```bash
   ENTRYPOINT ["executable", "param1", "param2"]
   ENTRYPOINT command param1 param2 (shell form)
```

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖，而 `CMD` 是可以被覆盖的。如果需要覆盖，则可以使用`docker run —entrypoint`选项。每个 Dockerfile 中只能有一个 `ENTRYPOINT`，当指定多个时，只有最后一个生效。

{{site.data.alerts.callout_success}}

`ENTRYPOINT` 和 `CMD` 可以同时存在。`ENTRYPOINT` 用于不被修改的执行命令。C`MD` 用于可变的命令。{{site.data.alerts.end}}

#### VOLUME
```bash
   VOLUME ["/data"]
   或者
   VOLUME /data
```

  将本地主机目录挂载到目标容器中，平台还支持多目录挂载，如：

```bash
   VOLUME /abc1
   VOLUME /abc2
   或
   VOLUME /abc1 /abc2
   或
   VOLUME ["/abc1", "/abc2"]
```

#### USER
```bash
   USER <uid>
```
指定运行容器时的用户名或 uid，在这之后的命令如 `RUN`、`CMD`、`ENTRYPOINT`也会使用指定用户。

#### WORKDIR
```bash
   WORKDIR /path/to/workdir
```
用于切换 `RUN`、`CMD`、`ENTRYPOINT` 的工作目录，相当于cd。
