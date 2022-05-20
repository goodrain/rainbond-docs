---
title: Rainbond使用问题诊断
description: 介绍在使用 Rainbond 过程中的常见问题排查
weight: 2000
---

在 Rainbond 的使用过程中，有可能会遭遇一些意外情形，导致用户部署在 Rainbond 上的业务无法正常工作。当前文档专门用于在这些场景中排查并解决问题。根据使用阶段的不同，我们将这些问题分为以下几类：

- [构建时问题](#构建时问题)：这类问题发生在用户部署服务组件的过程中。这部分涵盖通过镜像、源码构建服务组件的常见问题集合。

- [运行时问题](#运行时问题)：这类问题发生在服务组件构建完成，即将进入启动状态时。这部分会详细阐述根据组件实例生命周期的概念来排查常见问题。

## 构建时问题

用户对于 Rainbond 的使用，都是从部署服务组件开始的，我们将这个过程称为构建。构建的来源包括镜像、源码和应用市场。这几种方式中容易出现问题的是来自镜像或源码的构建方式。

Rainbond 中的 `rbd-chaos` 组件专门用于构建服务组件，这部分内容排查经常需要使用命令查询其日志获得信息。

```bash
kubectl logs -f -l name=rbd-chaos -n rbd-system
```

### 镜像构建常见问题

接下来以常见问题列表的形式列举从镜像构建服务组件时可能出现的问题。

#### 组件构建源检测未通过

:::warning
在输入镜像地址后，点击构建却跳转页面提示 `组件构建源检测未通过` 。
:::

导致这个问题可能的情况包括：

- 镜像地址填写错误，又比如某些镜像不提供 `arm64` 版本，故而在 `arm64` 环境下安装的 Rainbond 无法正常获取对应的镜像。

- 镜像仓库需要填写用户名、密码进行登录操作。

- 上述信息都核对检查无误，则查询 rbd-chaos 组件日志。

:::warning
哪些镜像不可以在 Rainbond 上直接运行。
:::

- 基础操作系统镜像，如 `CentOS` `Ubuntu` `alpine` 等镜像不可以直接在 Rainbond 上运行。

- 基础语言&工具类，比如 golang 编译环境、docker 编译环境、maven 编译环境等镜像不可以直接在 Rainbond 上运行。

### 源码构建常见问题

这一部分会按照不同的语言类型进行分类，列举常见源码构建问题。

#### Node.js 前端项目构建常见问题

有很多的用户在 Rainbond 上构建部署 [NodeJS 前端项目](/docs/use-manual/component-create/language-support/nodejs-static)，例如 Vue、React 等。根据经验，此处遭遇的问题也是最多的。

构建 NodeJS 前端项目的错误信息可能来自于页面中提示，或在构建失败记录右侧的日志中提示出来。

:::warning
源码被识别为 Node.js 而不是 NodeJSStatic
:::

Node.js 语言不仅可以用于构建 Vue 等前端项目，也可以构建服务端项目。这两种使用方法在 Rainbond 源码构建领域中都得到支持，然而将前端项目构建成服务端项目是无法正常运行的。关注服务组件的构建源页面，语言一栏显示为 `NodeJSStatic` 能够证明构建的是 NodeJS 前端项目。

务必注意这一点：Rainbond 会根据源代码根目录是否有 `package.json` 和 `nodestatic.json` 文件来识别为 NodeJS 前端类项目。

如果发现构建成为了错误的类型，添加指定文件并提交代码后，点击构建源页面中的 `重新检测`，并再次构建。

:::warning
页面中提示：
代码目录未发现 yarn.lock 或 package-lock.json 文件，必须生成并提交 yarn.lock 或 package-lock.json 文件
:::

Rainbond 通过识别源码目录中的 `yarn.lock` 或 `package-lock.json` 文件来抉择使用何种构建工具来构建静态文件。所以上述文件必须存在一个（且只能存在一个）。

提交对应文件后，重新构建即可。

:::warning
构建日志中提示：
Two different lockfiles found: package-lock.json and yarn.lock
:::

该信息提示当前源代码根目录下同时存在 `package-lock.json` 和 `yarn.json` 两个锁文件，请根据希望使用的包管理器删除另一个锁文件，提交代码后重新构建。

:::warning
构建日志中提示：
Outdated Yarn lockfile
:::

该信息提示当前构建使用的 yarn.lock 与 package.json 中规定的版本依赖有冲突，根据构建日志后续的提示，可以在本地更新 yarn.lock ，提交代码后重新构建。

:::warning
构建日志中提示：
SyntaxError: Invalid or unexpected token
:::

该信息提示当前 `package.json` 中 `engines` 段落中规定的 npm 版本与构建源中选择的 node 版本有冲突。删除 `package.json` 中 `engines` 段落的所有内容，重新提交后构建即可。

## 运行时问题

当服务组件操作日志中提示构建成功时，就进入了服务组件运行的阶段。我们期待所有的组件实例都呈现绿色的 `运行中` 状态，然而也可能发生很多的异常情形，需要根据指引一步步排查。在这个阶段，了解 [组件生命周期](/docs/use-manual/component-manage/overview/service-properties) 中各个阶段的概念是十分必要的。后续的排查过程，也是基于组件不同的状态入手。

### 根据异常状态排查运行时问题

:::warning
组件实例一直处于 <font color="#ffa940"> 调度中  </font> 状态
:::

处于 <font color="#ffa940"> 调度中  </font> 状态的实例，体现为橙黄色的方块。说明集群中已经没有足够的资源来运行这个实例。具体的资源项短缺详情，可以点击橙黄色的方块，打开实例详情页面后在 `说明` 处了解到。例如：

```css
实例状态：调度中
原因：   Unschedulable
说明：   0/1 nodes are available: 1 node(s) had desk pressure
```

根据 `说明` 可以了解到，当前集群中共有 1 个宿主机节点，但是处于不可用状态，原因是该节点存在磁盘压力。根据原因对节点进行磁盘扩容或空间清理后，该问题会自动解除。常见的资源短缺类型还包括：CPU 不足、内存不足。

:::warning
组件实例一直处于 <font color="#ffa940"> 等待启动  </font> 状态
:::

Rainbond 平台根据组件之间的依赖关系确定启动顺序。如果服务组件长时间处于 <font color="#ffa940"> 等待启动  </font> 状态，则说明其依赖的某些组件未能正常启动。切换至应用拓扑视图梳理组件间依赖关系，确保其依赖的组件都处于正常的运行状态。

:::warning
组件实例一直处于 <font color="red"> 运行异常  </font> 状态
:::

运行异常状态意味着该实例遭遇了无法正常运行的情况。点击红色的方块，可以在实例详情页面找到提示，重点关注实例中的容器的状态，通过状态的不同，来继续排查问题。以下是常见的几种问题状态：

- **`ImagePullBackOff`** : 该状态说明当前容器的镜像无法被拉取，下拉至 `事件` 列表处，可以得到更为详细的信息。确保对应的镜像可以被拉取，如果发现无法拉取的镜像以 `goodrain.me` 开头，则可以尝试构建该组件解决问题。
- **`CrashLoopBackup`** : 该状态说明当前容器本身启动失败，或正在遭遇运行错误。切换至 `日志` 页面查看业务日志输出，对症解决问题即可。
- **`OOMkilled`** : 该状态说明为容器分配的内存太小，或业务本身存在内存泄漏问题。业务容器的内存配置入口位于 `伸缩` 页面。插件容器的内存配置入口位于 `插件` 页面。

:::warning
组件实例一直处于 <font color="blue"> 未知  </font> 状态
:::

该状态意味着控制台和集群端通信异常，根据 [Rainbond 集群问题诊断](/docs/ops-guide/troubleshoot/cluster_troubleshooting) 排查集群问题。

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
