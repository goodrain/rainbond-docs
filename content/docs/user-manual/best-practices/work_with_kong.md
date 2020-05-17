---
title: 在 Rainbond 部署 API-Gateway
description: 本篇最佳实践讲解在 Rainbond 部署 API-Gateway，适用于开发者和应用运维人员。
weight: 20
---

Api-Gateway 是一种微服务架构，通过 Kong（Api-Gateway 的一种成熟实现）将真正的业务服务组件，保护在身后。通过丰富的插件，Kong 可以为后端业务组件提供全面的保护及治理，包括 ACL 访问控制、Basic Auth Oauth2 等认证机制、Rate Limiting 限流机制等等优秀的功能。如何将 Kong 部署在 Rainbond，并简要介绍 Service、Route 的配置，就是当前文档的主题。

本文档适合意图将 Api Gateway（Kong）部署在 Rainbond 并加以使用的开发、运维人员。

本文档适合的场景是：通过演示用例，了解如何将 Kong 部署在 Rainbond，并代理已有的测试业务。

### 前提条件

- 本地共享库中已存在 Kong 应用模版，可以通过下载[ API-Gateway 离线包](https://goodrain-delivery.oss-cn-hangzhou.aliyuncs.com/zhongyijicheng/API-Gateway-1.0.zip)导入



### 操作步骤

通过共享库一键安装的方式，可以将 Kong、newinfo、WebsService（Kong 是 Api Gateway 的实现、newinfo、WebsService 是附带的测试业务）一并部署到你的 Rainbond 环境中。

#### 安装部署

- **安装 API-Gateway 演示用例**

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1gen8ydu5pnj31j20u0mzm.jpg" title="安装示例" width="100%">}}

- **运行效果**

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1gen90hsdkcj30ok0uk755.jpg" title="安装示例" width="80%">}}

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

| 选项名   | 填写内容   | 说明                                                      |
| -------- | ---------- | --------------------------------------------------------- |
| Name     | WebService | 填写自定义的Service名称，要方便对应上游业务               |
| Protocol | http       | 上游服务协议                                              |
| Host     | 127.0.0.1  | 上游服务地址，因为使用Rainbond的依赖关系，所以是127.0.0.1 |
| Port     | 5000       | 上游服务监听地址                                          |
| Path     | /          | 上游服务访问路径                                          |

进入创建好的 **WebService** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容         | 说明                                                         |
| --------- | ---------------- | ------------------------------------------------------------ |
| Name      | WebService_route | 填写自定义的Route名称，要方便对应上游业务                    |
| Protocols | 默认留空         | 访问协议，默认同时使用 http、https                           |
| Hosts     | 默认留空         | 访问地址，留空时使用Kong的8000端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空         | Http方法，可根据需要自行填写 GET、POST等方法，默认无限制     |
| Path      | /web             | 自定义访问路径，该路径被代理到上游服务的 /                   |

继续为 Static 资源配置代理，**WebService** 的静态页面部分是需要单独代理的。



- **为 Static 资源配置**

在 Konga 中，选择 **SERVEICES**，点击 **ADD NEW SERVICE**。

填写内容：

| 选项名   | 填写内容  | 说明                                                      |
| -------- | --------- | --------------------------------------------------------- |
| Name     | WebStatic | 填写自定义的Service名称，要方便对应上游业务               |
| Protocol | http      | 上游服务协议                                              |
| Host     | 127.0.0.1 | 上游服务地址，因为使用Rainbond的依赖关系，所以是127.0.0.1 |
| Port     | 5000      | 上游服务监听地址                                          |
| Path     | /static   | 上游服务静态资源访问路径                                  |

进入创建好的 **WebStatic** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容        | 说明                                                         |
| --------- | --------------- | ------------------------------------------------------------ |
| Name      | WebStatic_route | 填写自定义的Route名称，要方便对应上游业务                    |
| Protocols | 默认留空        | 访问协议，默认同时使用 http、https                           |
| Hosts     | 默认留空        | 访问地址，留空时使用Kong的8000端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空        | Http方法，可根据需要自行填写 GET、POST等方法，默认无限制     |
| Path      | /static         | 固定访问路径，该路径被代理到上游服务的 /static               |

配置完成后，访问 Kong 服务组件 8000 端口对外服务的 /web 路径，就可以访问到完整的** WebService** 测试业务。



#### 配置 newinfo

这个环节，将在 Konga 中为 newinfo 测试业务配置 Service、Route，完成配置后，就可以通过 Kong 访问该 API 测试业务。

newinfo 测试业务组件，是一个基于 Golang 语言编写的 API，GET 请求时，将会从它依赖的 mysql 中获取数据并返回，监听端口为 8080。

- **为 newinfo 配置**

在 Konga 中，选择 **SERVEICES**，点击 **ADD NEW SERVICE**。

填写内容：

| 选项名   | 填写内容      | 说明                                                      |
| -------- | ------------- | --------------------------------------------------------- |
| Name     | Newinfo       | 填写自定义的Service名称，要方便对应上游业务               |
| Protocol | http          | 上游服务协议                                              |
| Host     | 127.0.0.1     | 上游服务地址，因为使用Rainbond的依赖关系，所以是127.0.0.1 |
| Port     | 8080          | 上游服务监听地址                                          |
| Path     | /api/newinfos | 上游服务API路径                                           |

进入创建好的 **Newinfo** 页面，选择 **Routes**，点击 **ADD ROUTE**。

填写内容：

| 选项名    | 填写内容      | 说明                                                         |
| --------- | ------------- | ------------------------------------------------------------ |
| Name      | Newinfo_route | 填写自定义的Route名称，要方便对应上游业务                    |
| Protocols | 默认留空      | 访问协议，默认同时使用 http、https                           |
| Hosts     | 默认留空      | 访问地址，留空时使用Kong的8000端口对外服务地址，可自行绑定域名并填写 |
| Methods   | 默认留空      | Http方法，可根据需要自行填写 GET、POST等方法，默认无限制     |
| Path      | /info         | 自定义访问路径，该路径被代理到上游服务的 /api/newinfos       |

配置完成后，访问 Kong 服务组件 8000 端口对外服务的 /info 路径，就可以访问** newinfo** 测试业务并获得返回。



#### 验证配置

所有的配置完成后，可以在 Konga 面板中看到下面的信息：

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1genacfou6cj31l10u0jug.jpg" title="配置 Services" width="100%">}}

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1genacr9pkij31kw0u0adk.jpg" title="配置 Routes" width="100%">}}



### 效果展示

所有的配置完成后，可以通过访问 Kong 的 8000 端口暴露的对外地址，以及对应的路径，分别访问到测试业务。

- **WebService**

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1genafx9ruqj31qr0u0af7.jpg" title="效果展示" width="100%">}}



- **newinfo**

{{<image src="https://tva1.sinaimg.cn/large/007S8ZIlly1genagan3ruj327y0eun2k.jpg" title="效果展示" width="100%">}}
