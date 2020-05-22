---
title: 组件A/B测试实践
Description: 基于Rainbond的组件A/B测试操作方案详解
Hidden: true
---

### 功能说明

对照实验，也叫随机实验和[A /B 测试](https://en.wikipedia.org/wiki/A/B_testing)；在软件开发中，产品需求通过多种技术手段来实现， A/B 测试实验提供了一个有价值的方式来评估新功能对客户行为的影响；运行网站和服务的 A/B 测试实验能力，从而可以用更科学方法来评估规划过程中不同阶段的想法价值；一屋子人拍桌子瞪眼的争辩到底哪个设计好？哪个文案好？哪个执行策略有效，还不如让真实的用户和数据来告诉你答案。

落实到技术本身上来，A/B 测试讲究为不同的客户端提供不同的服务，这里的两个不同非常关键。

- 不同的客户端

  > 一般是通过某种方式将客户端进行分类，比如 HTTP 协议，通常根据用户信息设置 Header 请求头、Cookie 从而区分不同客户端。

- 不同的服务

  > 一般是指不同应用的不同版本，在 Rainbond 平台是不同的组件。

**Rainbond 目前支持 HTTP 协议的 A/B 测试实践，这也是目前应用面最广的协议。**

服务需要进行 A/B 测试，需要区分其是属于内部服务还是对外服务。内部服务的 A/B 测试特性由 ServiceMesh 层提供，对外服务由[应用网关](/docs/user-manual/gateway/gateway/)提供。

我们以下述场景为例，分别对 `外部服务` `外部服务2` `内部服务` `内部服务2` 进行 A/B 测试实践。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/ab/ab-first.png" width="80%">

## 对外服务的 A/B 测试实践

对外服务的 A/B 测试是最常使用的场景，因为对外服务是直接面对用户的服务。业务程序需要通过一定的业务策略将用户标识信息注入到 Cookie 中或者是通过移动端 APP 注入到 Header 请求头中。Rainbond 应用网关可以识别这些标识并根据用户配置的策略匹配相应的服务提供给用户。

如上图例子所示，`外部服务` `外部服务2` 我已经提前创建，模拟为同一个业务程序的两个版本

通过 [应用网关](/docs/user-manual/gateway/gateway/) -> [访问策略](/docs/user-manual/gateway/traffic-control/) 添加以下两个 HTTP 访问策略：

- 用法一：通过 Header 请求头标识客户端

| 域名         | 请求头    | 服务       |
| ------------ | --------- | ---------- |
| www.test.com | 无        | 外部服务   |
| www.test.com | user:test | 外部服务 2 |

测试方式：

```
# 模拟请求外部服务,请注意，域名请按照添加访问策略文档提示正确进行DNS解析设置或本地HOST文件设置
curl www.test.com
# 模拟请求外部服务2
curl -H user:test www.test.com
```

此方式适用于 C/S 架构下的服务端。比如移动端 APP 与 API 的交互。

- 用法二：通过 Cookie 标识客户端

| 域名         | Cookie    | 服务       |
| ------------ | --------- | ---------- |
| www.test.com | 无        | 外部服务   |
| www.test.com | user=test | 外部服务 2 |

测试方式：

```
# 模拟请求外部服务
curl www.test.com
# 模拟请求外部服务2
curl --cookie "user=test" www.test.com
```

此方式适用于 Web 服务和其他 HTTP 请求服务。

## 对内服务的 A/B 测试实践

内部服务不直接服务于用户，一般是为其他服务提供 API 支持，它的通信路径不会经过应用网关，因此不能通过应用网关来进行 A/B 控制，运行于 Rainbond 的所有业务都默认按照服务化的方式进行管理，以 ServiceMesh 的治理思想进行服务通信治理，A/B 测试就是服务治理的功能之一。

上文我们的事例中有 `内部服务` 和 `内部服务2` ,我们已经提前创建。内部服务之间的通信需要建立依赖关系以完成内部服务注册和服务发现，在初始状态下 `内部服务2` 还属于独立状态，在将它加入的 `外部服务` 的下级依赖之间我们需要知道这样一个问题：

两个内部服务本质上是同一个业务，使用了相同的服务端口，若在默认情况下有端口冲突是不能同时依赖它们的，这时我们需要先为`外部服务` 开通工作在 7 层的网络治理插件（平台默认提供），插件的工作原理将复用 80 端口，通过不同的域名等 HTTP 元素实现高级路由来选择使用的下级依赖服务；因此，要使用此插件的前提是：

> `模拟外部服务` 请求 `内部服务`的通信地址必须是 主机名(顶级域名)
>
> 比如请求用户服务 API，请求地址: `http://user/***`
>
> Rainbond 环境下会默认解析主机名(顶级域名)
>
> 我们通常建议将通信地址和端口读取环境变量的方式，只需要在内部服务上设置 [连接信息](/docs/user-manual/component-connection/connection_env/) 变量即可。

- `外部服务` 依赖 `内部服务2` ，操作方式见 [添加服务依赖](/docs/user-manual/component-connection/regist_and_discover/) 或直接 [操作拓扑图添加](/docs/user-manual/app-manage/app-topology/#编辑模式)
- 为 `外部服务` 开通 <b>出口网络治理插件</b>

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/ab-released-app/extended.jpg" style="border:1px solid #eee;width:100%"/></center>

- 配置路由策略，与基于应用网关的配置方法类似，不同的是只支持基于 Header 的处理方式。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/config.jpg" style="border:1px solid #eee;width:100%"/></center>

如上配置完成后内部服务同样具备了 A/B 测试的能力。

## 4. 数据反馈

在 A/B 测试过程中最关键的环节就是关注数据反馈，及时调整策略。Rainbond 提供的业务级性能分析监控可以为你提供实时的请求情况分析，以辅助你的决策。在此之外，如果你有自己的监控方式，请根据你的监控结果合理调整策略，上诉的所有控制策略都能够修改动态生效。

## 5. 存在的缺陷和改进计划

1. 目前内部服务的 A/B 测试需要对每个服务进行配置，暂不支持全局性配置，后续的版本将支持 ServiceMesh 的全局配置。
2. 目前未提供针对 A/B 测试的流程控制，后续的版本中流程化会突出迭代。
3. 监控数据与测试过程自动化协调，实现自动化 A/B 测试
