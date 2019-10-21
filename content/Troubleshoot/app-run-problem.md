---
title: 应用运行排查
weight: 30009
Description: "操作日志显示构建成功后，组件状态却显示运行异常"
hidden: false
pre: "<b>6.5 </b>"
---

<div id="toc"></div>

### 初步排查

{{% notice note %}}
在遇到了实例 **运行异常** 的时候，首先应该按照本节文档，进行初步排查。
{{% /notice %}}

#### 镜像类型

{{% notice warning %}}
注意，[这些镜像](/user-manual/app-creation/image-support/#不能运行的镜像)不可以运行。同时，某些一次性运行后会自动退出的镜像也不可以在平台上运行。
{{% /notice %}}

#### 内存不足

Rainbond会默认为组件分配内存：

- 镜像创建组件默认 512MB 
- 源码构建组件默认 1GB

该值可以在创建组件时定义，也可以在组件伸缩界面随时修改。然而，不是所有组件都可以用默认内存运行。当内存分配的过小时，会导致组件实例内存使用率过高，甚至根本不会继续启动。

具体表现为：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-6.png" width="100%">

#### 组件部署类型选择错误

Rainbond支持 **有状态服务类型** 和 **无状态服务类型** 的部署。

- 无状态服务类型适用于web类、API类组件
- 有状态服务类型适用于DB类、集群类、消息中间件类、数据类

有特定的组件要以指定的类型部署。比如 zookeeper、mysql等组件，一定要使用有状态服务类型。否则也可能会遭遇运行异常。

#### 组件需要特定的初始化条件

例如MySQL组件，在首次启动时，一定会需要以下三个环境变量中的一个：

- MYSQL_ROOT_PASSWORD 指定root用户密码
- MYSQL_ALLOW_EMPTY_PASSWORD 允许有用户空密码
- MYSQL_RANDOM_ROOT_PASSWORD 随机为root用户生成密码

如果没有指定这种特定的初始化条件，组件不会进入初始化流程。

需要确定当前组件到底发生了什么，可以查看日志：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-1.png" width="100%">

#### 健康检查

Rainbond组件默认配置了健康检查机制。组件启动时，会根据健康检查中配置的端口，以特定的方式检查组件是否正常启动。如检测不通过，则会有运行异常状态。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-7.png" width="60%">

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-8.png" width="60%">

{{% notice warning %}}
健康检查的端口，来自于组件开启的端口，默认开启5000端口。所以，务必确认平台上组件开启的端口，和组件运行监听的端口一致。
{{% /notice %}}

#### grctl msg get 命令使用

平台提供全局组件状态查询命令 `grctl msg get`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-5.png" width="100%">

该命令返回:

- TenantName(租户别名)/ServiceName(组件别名) 用于定位组件
- Message(异常信息) 提供了相对具体的异常信息
- Reason(异常原因) 对应异常信息，提供系统可以判断到的异常原因
    - Error 容器本身发生了错误重启，请检查容器日志
    - OOMKilled 组件内存分配不足
- Count(出现次数) 信息计数
- LastTime(最后一次异常时间) 对应信息最后一次发生的时间
- FirstTime(第一次异常时间) 对应信息第一次发生的时间

### 深入排查

{{% notice note %}}
经过 **初步排查** 后，如果并没有发现有异常的原因，请遵循本节，进行针对组件的深入排查。
{{% /notice %}}

#### 获取组件详情

切换到问题组件的伸缩界面，获取查询命令：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-3.png" width="80%">

在管理节点执行该命令，返回组件详情：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-run-problem-4.png" width="100%">

针对组件级别的错误排查，由此命令获取的 **关键信息** 包括：

- [**PodStatus**](#podstatus-异常排查)
    - Initialized 当前pod是否被初始化，可能值为 True/False
    - Ready 当前pod是否正常，当你需要排错的时候，该值一定为 False
    - PodScheduled 当前pod是否可被调度，指征当前集群是否有compute节点可以运行该pod，可能值为 True/False

- **PodIP** 系统分配给pod的IP地址，如果此项为空，检查RainbondSDN（calico/flannel）组件是否正常。

- **PodStratTime** 当前pod启动时间的记录，该记录和 Containers.State.Running 的启动时间对比，可以判断容器是否有过自动重启。如果有重启，参考[容器日志查询](#容器日志查询)

- [**Containers**](#containers-异常排查)
    - ID 宿主机上运行容器的ID 
    - State 对应容器的状态
        - Running(时间) 正常状态，表征当前容器运行中
        - waiting 等待状态
        - Terminating 终止状态

#### PodStatus 异常排查

{{% notice note %}}
根据PodStatus返回值来初步排查问题。
{{% /notice %}}

##### Ready

当前组件处于 **运行异常** 的情况下，该值一定会处于 **False** 。当该组件正常运行后，该值自动变成 **True** 。

##### Initialized

当pod处于 **Initialized** 为 **False** 的状态时，需要借助 [POD状态查询](#pod状态查询) 来排查问题POD事件。该状态大多由init容器找不到镜像引起。查询到POD事件后，推送指定镜像即可。

##### PodScheduled

当pod处于 **PodScheduled** 为 **False** 的状态时，表明所有可调度计算节点剩余资源都不足以承载该pod。检查计算节点是否都处于可调度状态，确认集群资源是否需要扩充。

#### Containers 异常排查

{{% notice note %}}
根据Containes.State返回值来初步排查问题。
{{% /notice %}}

##### waiting

当POD中的某个容器出现这个状态，说明当前容器完成调度，但是无法运行起来。需要借助[POD状态查询](#pod状态查询) 来排查问题POD事件，结合 [容器日志查询](#容器日志查询) 来加以解决。

{{% notice warning %}}
在Rainbond平台使用时，用户有时会为组件安装各类插件。需要注意的是，某些插件是不可以同时使用的，比如 **服务综合网络治理插件** **服务网络治理插件** ，二者同时使用，会导致其中的某一个容器处于 Waiting 状态，并最终导致组件运行异常。这和它们同时工作在POD网络出口有关。
{{% /notice %}}

##### Terminating

当POD中的某个容器出现这个状态，说明该POD正处于终止退出的过程中。需要借助[POD状态查询](#pod状态查询) 来排查问题POD事件，结合 [容器日志查询](#容器日志查询) 来加以解决。

#### POD状态查询

{{% notice note %}}
当你不知道pod发生了什么问题的情况下，可以借助 **kubectl** 命令来排查问题。
{{% /notice %}}

```bash
kubectl describe pods <PodName> -n <Namespace>
```

一般情况下，我们可以直接关注返回结果中的 **Events** 事件记录。这里记录了当前POD启动时的全过程，并对错误直接予以显现。常见错误：

- 镜像拉取失败，需要到管理节点尝试 `docker push <时间信息中拉取失败的镜像名>`
- Restart BackOffContainer ，容器启动失败，这时要参见[容器日志查询](#容器日志查询) 来加以解决。

#### 容器日志查询

{{% notice note %}}
Rainbond在组件控制台界面上提供了组件日志输出，该日志集成当前组件下所有POD中所有容器的日志输出。
{{% /notice %}}

绝大多数情况下，我们可以在Rainbond组件控制台的日志界面获取到当前组件日志，并借此判断运行异常原因。
**一旦Rainbond组件控制台日志没有任何推送，我们需要用下面的手段获取日志** 

- 直接获取当前日志

```bash
kubectl logs <PodName> <Containers.Name> -n <Namespace>
```

- POD中容器已经发生重启，获取重启之前的日志

```bash
kubectl logs --previous <PodName> <Containers.Name> -n <Namespace>
```

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，组件依然无法运行，你可以：

- 移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

- 前往[社区](https://t.goodrain.com/) 阅读前缀名为【使用问题】的帖子，寻找相似问题的答案，或者将你的情况总结发帖。