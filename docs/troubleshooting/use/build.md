---
title: 构建问题排查
descrition: 介绍 Rainbond 构建过程的问题排查方法
keywords:
- Rainbond 构建过程的问题排查方法
---

本文介绍在通过 Rainbond 构建组件的过程中遇到报错的排查思路。

## 构建过程

![](https://static.goodrain.com/docs/5.12/troubleshooting/installation/build-process.png)

通过 Rainbond 源码构建分为以下几个步骤：

1. 拉取项目源代码
2. 在 `rbd-system` 命名空间下启动 Job 任务
3. 运行 Job 任务，该任务镜像会从私有镜像仓库获取。
4. 打包项目代码，例如 Vue 项目，会执行 npm install、npm run build 打包出来静态文件。
5. 通过 [Kaniko](https://github.com/GoogleContainerTools/kaniko) 制作容器镜像。
6. 推送镜像到私有镜像仓库。
7. 成功运行。

## 常见问题

用户对于 Rainbond 的使用，都是从部署服务组件开始的，我们将这个过程称为构建。构建的来源包括镜像、源码和应用市场。这几种方式中容易出现问题的是来自镜像或源码的构建方式。

Rainbond 中的 `rbd-chaos` 组件专门用于构建服务组件，这部分内容排查经常需要使用命令查询其日志获得信息。

```bash
kubectl logs -f -l name=rbd-chaos -n rbd-system
```

也可以通过控制台查看日志 **平台管理 -> 日志 -> 集群日志 -> 构建日志**。

### 构建无法拉取到镜像，提示 ImagePullBackOff

通常使用 kubectl describe 命令查看详细报错，如果报错为 `x509: certificate signed by unknown authority`，那很大可能是 Rainbond 默认的镜像仓库证书不受信任。如果你的环境是 Containerd，那么需要修改每个节点的 containerd 配置文件，配置 goodrain.me 私有仓库。然后重启 containerd。

1. 修改配置文件 `/etc/containerd/config.toml`

```
[plugins."io.containerd.grpc.v1.cri".registry.configs]
  [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me"]
    [plugins."io.containerd.grpc.v1.cri".registry.configs."goodrain.me".tls]
       insecure_skip_verify = true
```

2. 修改配置文件 `/etc/containerd/certs.d/goodrain.me/hosts.toml`

```
[host."https://goodrain.me"]
  capabilities = ["pull", "resolve","push"]
  skip_verify = true
```

3. 重启每个节点的 containerd 即可

### 组件构建源检测未通过

组件构建源检测未通过，导致这个问题可能的情况包括：

- 镜像地址填写错误，又比如某些镜像不提供 `arm64` 版本，故而在 `arm64` 环境下安装的 Rainbond 无法正常获取对应的镜像。
- 镜像仓库需要填写用户名、密码进行登录操作。
- 上述信息都核对检查无误，则查询 rbd-chaos 组件日志。

#### 哪些镜像不可以在 Rainbond 上直接运行。

- 基础操作系统镜像，如 `CentOS` `Ubuntu` `alpine` 等镜像不可以直接在 Rainbond 上运行。
- 基础语言&工具类，比如 golang 编译环境、docker 编译环境、maven 编译环境等镜像不可以直接在 Rainbond 上运行。

### Node.js 前端项目构建常见问题

有很多的用户在 Rainbond 上构建部署 [NodeJS 前端项目](/docs/use-manual/component-create/language-support/nodejs-static)，例如 Vue、React 等。根据经验，此处遭遇的问题也是最多的。

构建 NodeJS 前端项目的错误信息可能来自于页面中提示，或在构建失败记录右侧的日志中提示出来。

#### 源码被识别为 Node.js 而不是 NodeJSStatic

Node.js 语言不仅可以用于构建 Vue 等前端项目，也可以构建服务端项目。这两种使用方法在 Rainbond 源码构建领域中都得到支持，然而将前端项目构建成服务端项目是无法正常运行的。关注服务组件的构建源页面，语言一栏显示为 `NodeJSStatic` 能够证明构建的是 NodeJS 前端项目。

务必注意这一点：Rainbond 会根据源代码根目录是否有 `package.json` 和 `nodestatic.json` 文件来识别为 NodeJS 前端类项目。

如果发现构建成为了错误的类型，添加指定文件并提交代码后，点击构建源页面中的 `重新检测`，并再次构建。

#### 代码目录未发现 yarn.lock 或 package-lock.json 文件，必须生成并提交 yarn.lock 或 package-lock.json 文件

Rainbond 通过识别源码目录中的 `yarn.lock` 或 `package-lock.json` 文件来抉择使用何种构建工具来构建静态文件。所以上述文件必须存在一个（且只能存在一个）。

提交对应文件后，重新构建即可。

#### Two different lockfiles found: package-lock.json and yarn.lock

该信息提示当前源代码根目录下同时存在 `package-lock.json` 和 `yarn.json` 两个锁文件，请根据希望使用的包管理器删除另一个锁文件，提交代码后重新构建。

#### Outdated Yarn lockfile

该信息提示当前构建使用的 yarn.lock 与 package.json 中规定的版本依赖有冲突，根据构建日志后续的提示，可以在本地更新 yarn.lock ，提交代码后重新构建。

#### SyntaxError: Invalid or unexpected token

该信息提示当前 `package.json` 中 `engines` 段落中规定的 npm 版本与构建源中选择的 node 版本有冲突。删除 `package.json` 中 `engines` 段落的所有内容，重新提交后构建即可。


## 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
