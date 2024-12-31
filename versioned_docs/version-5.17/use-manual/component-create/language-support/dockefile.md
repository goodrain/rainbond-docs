---
title: Dockerfile
description: Dockerfile语言类型Rainbond支持规范介绍
---

#### Dockerfile 类型识别策略

代码主目录下有 `Dockerfile` 文件，Rainbond 会识别代码语言类型为 **Dockerfile** ，此策略优先级最高，当代码同时符合其他语言类型识别策略时，依然以**Dockerfile**为主。

#### 编译原理

识别为 Dockerfile 类型的源码将使用类似于 `docker build -t xxx/xxx .` 的命令进行镜像构建，因此此方式是灵活性最高的源码编译方式，理论上可以应用于所有开发语言的支持（如果 Docker 支持）。

构建过程支持 docker multi-stage(多阶段构建)和 ARG 参数指定。

#### Dockerfile 规范

**Dockerfile** 是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。

Rainbond 在源码检测阶段会读取 Dockerfile 定义的如下参数：

| 参数类型 | 名称       | 说明                           |
| -------- | ---------- | ------------------------------ |
| ENV      | 环境变量   | 识别为服务可设置的环境变量配置 |
| ARG      | 构建参数   | 识别为构建可设置的参数配置     |
| EXPOSE   | 暴露端口   | 识别为服务的端口配置           |
| VOLUME   | 持久化存储 | 识别为服务的共享持久化存储配置 |

Dockerfile 的定义方式详见官方文档： [https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

在此给出 Dockerfile 编译部署 Golang 源码的用例：

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

#### 完整示例代码

- [https://github.com/goodrain/dockerfile-demo.git](https://github.com/goodrain/dockerfile-demo.git)

### 私有仓库如何处理？

如果你的 Dockerfile 使用私有镜像仓库的镜像，那么当你直接使用该 Dockerfile 构建时，会由于权限问题，无法拉取到正确镜像进行构建。此时你可以在团队管理中，选择镜像仓库授权信息，填写该私有镜像仓库的域名、用户名和密码，保存后再次构建，即可构建成功。如下图所示:

![private-repo-dockerfile.png](https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/language-support/private-repo-dockerfile.png)
