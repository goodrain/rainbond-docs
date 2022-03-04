---
title: 在 Rainbond 部署 API-Gateway
description: 本篇最佳实践讲解在 Rainbond 部署 API-Gateway，适用于开发者和应用运维人员。
---

Api-Gateway 是一种微服务架构，通过 Kong（Api-Gateway 的一种成熟实现）将真正的业务服务组件，保护在身后。通过丰富的插件，Kong 可以为后端业务组件提供全面的保护及治理，包括 ACL 访问控制、Basic Auth Oauth2 等认证机制、Rate Limiting 限流机制等等优秀的功能。如何将 Kong 部署在 Rainbond，并简要介绍 Service、Route 的配置，就是当前文档的主题。

本文档适合意图将 Api Gateway（Kong）部署在 Rainbond 并加以使用的开发、运维人员。

本文档适合的场景是：通过演示用例，了解如何将 Kong 部署在 Rainbond，并代理已有的测试业务。

### 前提条件

- 本地共享库中已存在 Kong 应用模版，可以通过下载[ API-Gateway 离线包](https://goodrain-delivery.oss-cn-hangzhou.aliyuncs.com/zhongyijicheng/API-Gateway-1.0.zip)导入

### 参考视频

<bibili-video src="//player.bilibili.com/player.html?aid=200652814&bvid=BV1zz411q7m7&cid=193486378&page=1" href="https://www.bilibili.com/video/BV1zz411q7m7/" title="Rainbond结合Kong实现API-Gateway的沙龙录播" />

### 操作步骤

通过共享库一键安装的方式，可以将 Kong、newinfo、WebsService（Kong 是 Api Gateway 的实现、newinfo、WebsService 是附带的测试业务）一并部署到你的 Rainbond 环境中。

#### 安装部署

- **安装 API-Gateway 演示用例**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gen8ydu5pnj31j20u0mzm.jpg" title="安装示例" width="100%" />

- **运行效果**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gen90hsdkcj30ok0uk755.jpg" title="安装示例" width="80%" />

#### 配置 Konga

这个环节，将配置 Kong 的管理面板，这个面板基于 Konga 实现，可以图形化的管理 Kong。

- **注册**

访问 konga 的对外服务，跟随指引完成管理员的注册

- **连接 Kong**

注册完成后，根据指引配置 kong 的连接地址，输入 Kong 实例的自定义名称，以及连接地址：http://127.0.0.1：8001。

#### 配置 WebService

这个环节，将在 Konga 中为 WebService 测试业务配置 Service、Route，完成配置后，就可以通过 Kong 访问该测试业务。

WebService 测试业务组件，是一个基于 java 语言编写的 web 页面，监听端口为 5000。使用 Kong 代理时，需要为它本身以及它所使用的静态资源配置两个 Service，以及每个 Service 对应的 Route。

- **为 WebService 自身配置**

在 Konga 中，选择 **SERVEICES**，点击 **ADD NEW SERVICE**。

填写内容：

| 选项名   | 填写内容   | 说明                                                         |
| -------- | ---------- | ------------------------------------------------------------ |
| Name     | WebService | 填写自定义的 Service 名称，要方便对应上游业务                |
| Protocol | http       | 上游服务协议                                                 |
| Host     | 127.0.0.1  | 上游服务地址，因为使用 Rainbond 的依赖关系，所以是 127.0.0.1 |
| Port     | 5000       | 上游服务监听地址                                             |
| Path     | /          | 上游服务访问路径                                             |

进入创建好的 **WebService** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容         | 说明                                                                     |
| --------- | ---------------- | ------------------------------------------------------------------------ |
| Name      | WebService_route | 填写自定义的 Route 名称，要方便对应上游业务                              |
| Protocols | 默认留空         | 访问协议，默认同时使用 http、https                                       |
| Hosts     | 默认留空         | 访问地址，留空时使用 Kong 的 8000 端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空         | Http 方法，可根据需要自行填写 GET、POST 等方法，默认无限制               |
| Path      | /web             | 自定义访问路径，该路径被代理到上游服务的 /                               |

需要注意的是，在添加完 Path 之后需要回车才能生效，继续为 Static 资源配置代理，**WebService** 的静态页面部分是需要单独代理的。

- **为 Static 资源配置**

在 Konga 中，选择 **SERVEICES**，点击 **ADD NEW SERVICE**。

填写内容：

| 选项名   | 填写内容  | 说明                                                         |
| -------- | --------- | ------------------------------------------------------------ |
| Name     | WebStatic | 填写自定义的 Service 名称，要方便对应上游业务                |
| Protocol | http      | 上游服务协议                                                 |
| Host     | 127.0.0.1 | 上游服务地址，因为使用 Rainbond 的依赖关系，所以是 127.0.0.1 |
| Port     | 5000      | 上游服务监听地址                                             |
| Path     | /static   | 上游服务静态资源访问路径                                     |

进入创建好的 **WebStatic** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容        | 说明                                                                     |
| --------- | --------------- | ------------------------------------------------------------------------ |
| Name      | WebStatic_route | 填写自定义的 Route 名称，要方便对应上游业务                              |
| Protocols | 默认留空        | 访问协议，默认同时使用 http、https                                       |
| Hosts     | 默认留空        | 访问地址，留空时使用 Kong 的 8000 端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空        | Http 方法，可根据需要自行填写 GET、POST 等方法，默认无限制               |
| Path      | /static         | 固定访问路径，该路径被代理到上游服务的 /static                           |

配置完成后，访问 Kong 服务组件 8000 端口对外服务的 /web 路径，就可以访问到完整的** WebService** 测试业务。

#### 配置 newinfo

这个环节，将在 Konga 中为 newinfo 测试业务配置 Service、Route，完成配置后，就可以通过 Kong 访问该 API 测试业务。

newinfo 测试业务组件，是一个基于 Golang 语言编写的 API，GET 请求时，将会从它依赖的 mysql 中获取数据并返回，监听端口为 8080。

- **为 newinfo 配置**

在 Konga 中，选择 **SERVEICES**，点击 **ADD NEW SERVICE**。

填写内容：

| 选项名   | 填写内容      | 说明                                                         |
| -------- | ------------- | ------------------------------------------------------------ |
| Name     | Newinfo       | 填写自定义的 Service 名称，要方便对应上游业务                |
| Protocol | http          | 上游服务协议                                                 |
| Host     | 127.0.0.1     | 上游服务地址，因为使用 Rainbond 的依赖关系，所以是 127.0.0.1 |
| Port     | 8080          | 上游服务监听地址                                             |
| Path     | /api/newinfos | 上游服务 API 路径                                            |

进入创建好的 **Newinfo** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容      | 说明                                                                     |
| --------- | ------------- | ------------------------------------------------------------------------ |
| Name      | Newinfo_route | 填写自定义的 Route 名称，要方便对应上游业务                              |
| Protocols | 默认留空      | 访问协议，默认同时使用 http、https                                       |
| Hosts     | 默认留空      | 访问地址，留空时使用 Kong 的 8000 端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空      | Http 方法，可根据需要自行填写 GET、POST 等方法，默认无限制               |
| Path      | /info         | 自定义访问路径，该路径被代理到上游服务的 /api/newinfos                   |

配置完成后，访问 Kong 服务组件 8000 端口对外服务的 /info 路径，就可以访问** newinfo** 测试业务并获得返回。

#### 验证配置

所有的配置完成后，可以在 Konga 面板中看到下面的信息：

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1genacfou6cj31l10u0jug.jpg" title="配置 Services" width="100%" />

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1genacr9pkij31kw0u0adk.jpg" title="配置 Routes" width="100%" />

### 效果展示

所有的配置完成后，可以通过访问 Kong 的 8000 端口暴露的对外地址，以及对应的路径，分别访问到测试业务。

- **WebService**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1genafx9ruqj31qr0u0af7.jpg" title="效果展示" width="100%" />

- **newinfo**

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1genagan3ruj327y0eun2k.jpg" title="效果展示" width="100%" />
  
## 插件功能拓展

### 概述

插件之于 Kong ，就像 Spring 中的 aop 功能；在请求到达 Kong 之后，转发给后端应用之前，使用 Kong 自带的插件对请求进行处理，身份认证，熔断限流，黑白名单校验，日志采集等；同时，也可以按照 Kong 的教程文档，定制开发自己的插件。

这里将演示基于 Kong 的插件机制实现 Api-Key验证 以及 ACL策略验证（访问控制）。

### 前提条件

已经通过上述操作将 WebService 或 newinfo 代理出来


### 操作步骤

#### Key Auth插件

- 添加插件

在 Konga 中，选择 **PLUGINS** ，点击 **ADD GLOAL PLUGINS** ，选择 **Key Auth** 插件，点击 **ADD PLUGIN**；

填写内容

| 选项名    | 填写内容      | 说明                                                         |
| --------- | ------------- | ------------------------------------------------------------ |
| consumer     | 默认留空 | 填写自定义用户名称                    |
| key names | api_key    | 填写自定义key名称         |

注：填写 key names 内容后回车才可生效

- 创建用户

点击 **Consumers** ，选择 **CREATE CONSUMER** ，输入 **自定义用户名** ，点击  **SUBIT CONUMER** 提交；

- 填写 api_key

点击 **Credentials** ，选择 **API KEYS** ，点击 **CREATE API KEY** ，填写 **自定义 key** ，填写之后提交。

到这里即完成 基于Key Auth插件 实现 Api-Key验证，具体效果参考下方效果展示。

#### ACL+Basic Auth插件

ACL授权策略分组，必须建立在认证机制上，该策略生效的前提，api至少要开启任意一个auth认证插件，这里我们采用 **ACL插件** 与 **Basic Auth插件** 结合的方式 。

> 在开始之前，需要将之前开通的 api_key插件 禁用或者删除，以免有影响

- 开通授权策略分组插件

在 Konga 中，选择 **PLUGINS** ，点击 **ADD GLOAL PLUGINS** ，选择 **Basic Auth** 插件，点击 **ADD PLUGIN** ，无需填写内容，开通即可；

同样的方式在 **Seeurity** 中找到 **Acl插件** ，点击 **ADD PLUGIN**

填写内容

| 选项名    | 填写内容      | 说明                                                         |
| --------- | ------------- | ------------------------------------------------------------ |
| consumer | 默认留空 | 填写自定义用户名称         |
| whitelist| open   | 自定义白名单 |
| blacklist| 默认留空   | 自定义黑名单 |

需要注意的是，在添加完 黑白名单 之后需要回车才能生效

- 创建用户

点击 **Consumers** ，选择 **CREATE CONSUMER** ，输入 **自定义用户名** ，点击 **SUBIT CONUMER** 提交；同样的操作创建两个用户。

- 为用户分配授权策略组

两个用户都需操作

点击 **Groups** ，**Add a group** ，自定义一个 **组名** ，需要与黑白名单对应

- 添加Basic Auth认证用户及密码

两个用户都需要操作

点击 **Consumers** ，**Credentials** ，找到 **Basic** ，点击 **CREATE CREDENTIALS** ，自定义 **用户名及密码** ，后续浏览器访问时会用到。

### 效果展示

**Key Auth插件**

访问 WebService 或 newinfo 服务，必须添加已定义的 api_key 才能访问。

![image-20200510132621749](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/work_with_kong/key.jpg)

**ACL+Basic Auth插件**

访问 WebService 或 newinfo 服务，访问时须填写用户及密码，填写上面定义的 Basic Auth认证用户及密码即可，使用 black用户 访问时不能访问，使用 open用户 访问时可正常访问，说明只有拥有 api授权策略分组的用户 才可以调用该 api。

- 使用 black 用户访问

![image-20200510132629249](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/work_with_kong/auth.jpg)

- 使用 open 用户可正常访问

![image-20200510132612249](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/work_with_kong/open.jpg)

