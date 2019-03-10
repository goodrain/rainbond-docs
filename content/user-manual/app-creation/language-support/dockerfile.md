---
title: Dockerfile
description: 通过Dockerfile源码创建
weight: 3302
hidden: true
---

## 一、代码识别

您的代码主目录下需要有 `Dockerfile` 文件，云帮会识别代码语言类型为**Dockerfile**

## 二、云帮Dockerfile约定规范

**Dockerfile** 是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。

### 2.1 FROM指令

```dockerfile
# 使用centos 7.4作为父镜像
FROM centos:7.4
```

`FROM` 指定构建镜像的基础源镜像，如果本地没有指定的镜像，则会自动从 Docker 的公共库 pull 镜像下来。

`FROM` 必须是 Dockerfile 中非注释行的第一个指令，即一个 Dockerfile 从 `FROM` 语句开始。

如果 `FROM` 语句没有指定镜像标签，则默认使用latest标签。

### 2.2 MAINTAINER指令

```dockerfile
MAINTAINER <author name>
```

指定创建镜像的作者

### 2.3 RUN指令

```dockerfile
RUN "executable", "param1", "param2"
```

每条 `RUN` 指令将在当前镜像基础上执行shell或者exec的环境下指定命令，并提交为新的镜像，后续的 `RUN` 都在之前 `RUN` 提交后的镜像为基础，镜像是分层的，可以通过一个镜像的任何一个历史提交点来创建，类似源码的版本控制。



### 2.4 EXPOSE指令

```dockerfile
EXPOSE <port> [<port>...]
```

云帮支持多端口，如果没有指定 `EXPOSE`，平台将不会开放任何端口。当需要打开端口时，可以在应用的高级页面中配置即可实现与 `EXPOSE` 相同的功能，如：

```dockerfile
EXPOSE 80
EXPOSE 5000
# 或者
EXPOSE 80 5000
```

{{% notice info %}}避免映射公有端口{{% /notice %}}

### 2.5 ENV指令

```dockerfile
ENV <key> <value>       # 只能设置一个变量
ENV <key>=<value> ...   # 允许一次设置多个变量
```

指定一个环境变量，会被后续 `RUN` 指令使用，可以在容器内被脚本或者程序调用。

### 2.6 ADD指令

```dockerfile
ADD <src>... <destination>
```

`ADD` 是复制文件指令，复制文件、目录到目标容器的文件系统中。destination是容器内的路径。sre可以是URL或者是启动配置上下文中的一个文件。若src是一个URL，该URL的内容将被下载并复制到目标容器中。

### 2.7 COPY指令

```dockerfile
COPY <src>... <dest>
```

`COPY` 复制新文件或者目录到目标容器指定路径中 。
{{% notice note %}}
用法和功能同 `ADD`，区别在于不能用URL，`ADD` 功能更强大些。
{{% /notice %}}

### 2.8 VOLUME指令

```dockerfile
VOLUME ["/data"]
# 或者
VOLUME /data
```

  将本地主机目录挂载到目标容器中，平台还支持多目录挂载，如：

```dockerfile
VOLUME /abc1
VOLUME /abc2
# 或
VOLUME /abc1 /abc2
# 或
VOLUME ["/abc1", "/abc2"]
```

### 2.9 USER指令

```dockerfile
USER <uid>
```
指定运行容器时的用户名或 uid，在这之后的命令如 `RUN`、`CMD`、`ENTRYPOINT`也会使用指定用户。

### 2.10 WORKDIR指令

```dockerfile
WORKDIR /path/to/workdir
```

用于切换 `RUN`、`CMD`、`ENTRYPOINT` 的工作目录，相当于cd。


### 2.11 ENTRYPOINT指令

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2 (shell form)
```

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖，而 `CMD` 是可以被覆盖的。如果需要覆盖，则可以使用`docker run —entrypoint`选项。每个 Dockerfile 中只能有一个 `ENTRYPOINT`，当指定多个时，只有最后一个生效。

{{% notice note %}}
`ENTRYPOINT` 和 `CMD` 可以同时存在。`ENTRYPOINT` 用于不被修改的执行命令。C`MD` 用于可变的命令。{{% /notice %}}

### 2.12 CMD指令

`CMD` 的目的是为了在启动容器时提供一个默认的命令执行选项。`CMD` 指定在 Dockerfile 中只能使用一次，如果有多个则会覆盖之前的，只有最后一个会生效。`CMD` 有如下三种形式：

```dockerfile
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2 (shell form)
```

{{% notice note %}}
`RUN` 和 `CMD` 的区别：

- `CMD` 会在启动容器的时候执行，构建(build) 时不执行。
- `RUN` 只是在构建(build)镜像的时候执行
  {{% /notice %}}

### 2.13 多阶段构建

Rainbond 5.0及以后版本支持多阶段Dockerfile构建，适用于Golang, NodeJS等编译语言。事例代码如下：

```
FROM muninn/glide:alpine AS build-env
ADD . /go/src/app
WORKDIR /go/src/app
RUN glide install
RUN go build -v -o /go/src/app/app-server

FROM alpine
RUN apk add -U tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
COPY --from=build-env /go/src/app/app-server /usr/local/bin/app-server
EXPOSE 80
CMD ["app-server"]
```

## 三、示例代码

- [Dockerfile示例代码](https://github.com/goodrain/dockerfile-demo.git)

## 四、Dockerfile官方文档

- [builder](https://docs.docker.com/reference/builder/)