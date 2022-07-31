---
title: 基于 Rainbond 实现组件A/B测试
Description: 基于 Rainbond 的组件 A/B测试 方案详解
weight: 40
---

## 一. 概述

AB测试是为应用制作两个（A/B）或多个（A/B/n）版本，在同一时间维度，分别让组成成分相同（相似）的访客群组（目标人群）随机的访问这些版本，收集各群组的用户体验数据和业务数据，最后分析、评估出最好版本，正式采用；在软件开发中，产品需求通过多种技术手段来实现，A/B测试实验提供了一个有价值的方式来评估新功能对客户行为的影响。

落实到技术本身上来，A/B测试讲究为不同的客户端提供不同的服务，这里的两个不同非常关键。

* 不同的客户端

  一般是通过某种方式将客户端进行分类，比如HTTP协议，通常根据用户信息设置Header请求头、Cookie从而区分不同客户端。

* 不同的服务

  一般是指应用的不同版本，在 Rainbond 平台是不同的组件。

**Rainbond目前支持HTTP协议的A/B测试实践，这也是目前应用面最广的协议。**

服务需要进行A/B测试，需要区分其是属于内部服务还是对外服务。内部服务的A/B测试特性由 ServiceMesh 层提供，对外服务由 [应用网关](/docs/use-manual/get-start/concept/gateway/)提供。


## 二. 对外服务的A/B测试

对外服务的A/B测试是最常使用的场景，因为对外服务是直接面对用户的服务；业务程序需要通过一定的业务策略将用户标识信息注入到 Cookie 中或者是通过移动端APP注入到 Header 请求头中；Rainbond应用网关可以识别这些标识并根据用户配置的策略匹配相应的服务提供给用户。


### 前提条件

1. 运行中的两个版本测试组件，模拟为同一个业务程序的两个版本，参考 [源码构建](/docs/use-manual/component-create/language-support/html) 直接构建 [该项目](https://github.com/Aaron-23/teststatic) 即可（在这里使用分支 master,devel 区分不同版本），
2. 拥有一个测试域名，两个组件都绑定此域名。

### 操作步骤

- 方法一：通过Header请求头标识客户端

通过 **网关 -> 访问策略管理** 添加以下两个HTTP访问策略：

| 域名         | 请求头    | 服务      |
| ------------ | --------- | --------- |
| www.test.goodrain.com | 无        | 外部服务1  |
| www.test.goodrain.com | user:test | 外部服务2 |

此方式适用于C/S架构下的服务端，比如移动端APP与API的交互。

- 方法二：通过Cookie标识客户端

通过 **网关 -> 访问策略管理** 添加以下两个HTTP访问策略：

| 域名         | Cookie    | 服务      |
| ------------ | --------- | --------- |
| www.test.goodrain.com | 无        | 外部服务1  |
| www.test.goodrain.com | user=test | 外部服务2 |

此方式适用于Web服务和其他HTTP请求服务。

### 效果展示

模拟请求外部服务,请注意，域名请正确进行DNS解析设置或进行本地HOST文件设置

- 通过Header请求头标识客户端时


```bash
# 模拟请求外部服务1
$ curl www.test.goodrain.com
<h1>hello ~ this is V1</h1>
# 模拟请求外部服务2
$ curl -H user:test www.test.goodrain.com
<h1>hello ~ this is V2</h1>
```


- 通过Cookie标识客户端时

```bash
# 模拟请求外部服务1
$ curl www.test.goodrain.com
<h1>hello ~ this is V1</h1>
# 模拟请求外部服务2
$ curl --cookie "user=test" www.test.goodrain.com
<h1>hello ~ this is V2</h1>
```


## 三. 对内服务的A/B测试

内部服务不直接服务于用户，一般是为其他服务提供 API支持，它的通信路径不会经过应用网关，因此不能通过应用网关来进行A/B控制，运行于 Rainbond 的所有业务都默认按照服务化的方式进行管理，以 ServiceMesh 的治理思想进行服务通信治理，A/B测试就是服务治理的功能之一。

### 前提条件

1. 拥有上面对外服务的A/B测试中使用的两个版本测试组件；
2. 模拟`外部服务` 请求 `内部服务` 的通信地址必须是 主机名(顶级域名)，比如请求用户服务API，请求地址: `http://user/***`，Rainbond环境下会默认解析主机名(顶级域名)，我们通常建议将通信地址和端口读取环境变量的方式，只需要在内部服务上设置 [连接信息](/docs/use-manual/component-manage/component-connection/connection_env) 变量即可。


### 操作步骤

上文我们已经提前创建 `内部服务1` 和 `内部服务2` 组件，在 Rainbond 平台内部服务之间的通信需要建立依赖关系以完成内部服务注册和服务发现，在目前状态下 `内部服务2` 还属于独立状态，在将它加入的 `外部服务1` 的下级依赖之前我们需要知道这样一个问题：

两个内部服务本质上是同一个业务，使用了相同的服务端口，若在默认情况下有端口冲突是不能同时依赖的，这时我们需要先为`外部服务1` 开通工作在7层的网络治理插件（平台默认提供），插件的工作原理将复用80端口，通过不同的域名等HTTP元素实现高级路由来选择使用的下级依赖服务。

1. `外部服务1` 依赖 `内部服务2` ，操作方式参考 [服务通信](/docs/use-manual/component-manage/component-connection/regist_and_discover) ，
2. 为 `外部服务1` 开通 出口网络治理插件，

3. 配置路由策略，与基于应用网关的配置方法类似，不同的是只支持基于Header的处理方式。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/ab_testing/ab.png)

### 效果展示

如上配置完成后内部服务同样具备了A/B测试的能力，通过 Header处理后的接口在调用时将会呈现不同的内容。



## 数据反馈

在A/B测试过程中最关键的环节就是数据反馈，及时调整策略；Rainbond提供的业务级 [性能分析监控](/docs/use-manual/team-manage/plugin-manage/tcm-plugin/) 可以为你提供实时的请求情况分析，以辅助你的决策；在此之外，如果你有自己的监控方式，请根据你的监控结果合理调整策略，上述的所有控制策略都能够修改动态生效。

## 存在的缺陷和改进计划

1. 目前内部服务的A/B测试需要对每个服务进行配置，暂不支持全局性配置，后续的版本将支持 ServiceMesh 的全局配置。
2. 目前未提供针对A/B测试的流程控制，后续的版本中流程化会突出迭代。
3. 监控数据与测试过程自动化协调，实现自动化 A/B 测试

**您可能还需要阅读：**

[基于Rainbond的滚动发布，灰度发布及蓝绿发布实践](./app_publishing)

[基于版本号一键上线/回滚](./update-rollback)

