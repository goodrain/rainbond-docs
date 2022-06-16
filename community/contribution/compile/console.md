---
title: Rainbond控制台源码编译
description: Rainbond控制台源码编译
---

## 前提条件

- 需要有 docker 环境

## 业务层代码编译

### 编译前端代码镜像

(1) 克隆项目

```bash
git clone https://github.com/goodrain/rainbond-ui.git
```

(2) 编译项目

`VERSION` 指定构建完镜像的 tag，前端打包出的镜像将作为后端代码的基础镜像。

```
VERSION=v5.5.0-release ./build.sh
```

### 源码编译后端代码镜像

(1) 克隆项目

```bash
git clone https://github.com/goodrain/rainbond-console.git
```

(2) 编译项目

`VERSION` 指定构建完镜像的 tag，由于前端代码的镜像为基础镜像，因此该处应与前端项目的 tag 保持一致。请使用如下命令将前后端代码编译在一起，形成最终可直接运行的 allinone 镜像。

```
VERSION=v5.5.0-release ./release.sh allinone
```

### 运行业务层镜像

当编译完成 allinone 镜像后，你可以参考如下命令，将最后一行的镜像名替换为你打包的镜像名后，运行该镜像。

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
rainbond/rainbond:v5.5.0-release-allinone
```

镜像运行起来后，访问机器的 7070 端口，即可进入 Rainbond 控制台。
