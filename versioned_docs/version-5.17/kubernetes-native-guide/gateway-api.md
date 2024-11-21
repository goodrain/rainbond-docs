---
title: Gateway API 使用文档
description: 使用 Gateway API 扩展多种网关实现
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Gateway API 是 Kubernetes 1.19 版本中引入的一种新的资源类型，目标是建立一套表现力强、易扩展、面向角色的服务网络模型。相较于原有的 Ingress API ，Gateway API 具有更灵活、规范、可扩展等特性, 解决了 Ingress API 不规范、移植性差等问题。从优化网关体验、解耦用户业务与平台关系和兼容 K8s 生态出发, 平台 v5.13.0版本的支持了 Kubernetes Gateway API ，在平台中是作为插件的拓展网关能力进行独立部署，将其特性与平台完美结合。用户可根据自己不同的需求和场景选择使用默认网关或拓展网关。

本篇文章将以 envoy 提供的网关实现为例介绍如何在平台中加入并使用拓展网关能力。

## 前提条件

1. 平台版本至少为 v5.13.0
2. 对接开源应用商店。

## 部署流程

结合 k8s Gateway API 面向角色的特性，平台同样对网关资源进行分级管理，部署流程图划分如下：

![gateway-api](https://static.goodrain.com/wechat/gateway-api/gateway-api101.png)

### 平台管理员操作：

##### 安装 k8s Gateway API 基础资源和下游网关实现

 k8s Gateway API 由一组 CRD 和控制器等资源组成，声明了一组网关类型的 API 对象，在安装网关下游实现之前，需要先将  k8s Gateway API 安装到平台中。

平台提供了 `k8s-gateway-base` 应用插件，插件包含了  k8s Gateway API 的所有资源，可通过 `平台管理视图 ---> 应用市场 ---> 开源应用商店 ---> 搜索 k8s-gateway-base` 的方式一键安装到平台，由于 `k8s-gateway-base` 插件的资源对命名空间有限制，所以必须将其安装在英文名为 `gateway-system` 的团队下的任意应用中，最好单独创建一个应用，应用的名称见名知意，便于后期管理。

在安装完  `k8s-gateway-base`  应用插件的基础之上才能安装下游网关实现，这里示例为 envoy Gateway API ，通过 `平台管理视图 ---> 应用市场 ---> 开源应用商店 ---> 搜索 gateway-envoy` ，`gateway-envoy` 插件的资源同样对命名空间有限制，所以必须将其将其安装在英文名为 `envoy-gateway-system` 的团队下的任意应用中，最好单独创建一个应用，应用的名称见名知意，便于后期管理。

##### 查看并检查插件

在平台视图下的扩展-插件中，可以看到本次安装的两组应用所包含的插件信息。当插件的状态显示为运行中后，所有准备工作就做完了，平台用户即可使用拓展网关功能。

### 平台用户操作：

当平台管理员将拓展网关部署完成后，平台用户便可在`应用视图 ---> 网关`看到拓展网关一栏。下面根据几种常见的场景给出了几个示例，帮助平台用户快速学习使用平台的拓展网关能力。

小知识：添加路由策略时选择完网关类型后，下方会出现一组 IP 加端口，其目的是展示你的域名解析地址，其中 NodePort 是从节点上获取的 IP ，默认为 NodeInternalIP，如果存在 NodeExternalIP 则优先使⽤ NodeExternalIP；LoadBalancerIP 是从 Service 资源上的 ExternalIPs 获取IP，如果不存在则不展示。

#### 请求头匹配

通过添加两组不同的路由规则，并为每组规则配置不同的请求头，实现将请求路由到不同的后端服务。

1. 准备两个不同版本的 nginx 部署到平台上并打开对内服务。

   ```
   registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.16
   registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.17
   ```

2. 在应用视图 ---> 网关 ---> 拓展网关 中创建 HTTP 策略，添加两个路由规则，分别填写不同的请求头和后端服务。

![gateway-api102](https://static.goodrain.com/wechat/gateway-api/gateway-api102.png)

3. 创建完成后即可实现通过 Header 匹配选择不同版本的 Nginx。

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" --header "version: 1.16" "http://rainbond.example.com:30196"
----
<h1>Welcome to nginx1.16!</h1>
```

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" --header "version: 1.17" "http://rainbond.example.com:30196"
----
<h1>Welcome to nginx1.17!</h1>
```

#### 流量拆分

通过在一组路由规则中添加两组后端路由，并配置不同的权重，实现更细粒度的请求控制和管理。

1. 准备两个不同版本的 nginx 部署到平台上并打开对内服务。


```
registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.16
registry.cn-hangzhou.aliyuncs.com/zhangqihang/rainbond-nginx:1.17
```

1. 在应用视图 ---> 网关 ---> 拓展网关 中创建 HTTP 策略，添加两个后端路由，内部域名分别选择两个版本的 nginx，在权重一栏分配不同的流量。

![gateway-api103](https://static.goodrain.com/wechat/gateway-api/gateway-api103.png)

3. 创建完成后即可实现流量拆分到两个不同版本的 Nginx。

```
curl --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" "http://rainbond.example.com:30196"
-------
<h1>Welcome to nginx1.16!</h1>
<h1>Welcome to nginx1.17!</h1>
```

#### 请求重定向

通过为路由配置高级规则，选择请求重定向，实现将请求路由到其他地址。

1. 在应用下的拓展网关中创建 HTTP 策略，无需添加后端路由，在高级规则中选择请求重定向。

![gateway-api104](https://static.goodrain.com/wechat/gateway-api/gateway-api104.png)

2. 创建完成后即可实现将请求重定向到百度。

```
curl -L  --resolve rainbond.example.com:30196:172.31.98.243 --header "Host: rainbond.example.com" "http://rainbond.example.com:30196"
-----
....
百度
....
```

#### HTTPS 路由

通过配置路由的监听项选择 HTTPS 类型，实现对数据的加密传输，保护用户的数据不被窃取或篡改。需要确保选择的网关类型已经配置过证书，由对应的监听项才可使用，如果还未配置需要联系平台管理员进行配置。

##### 管理员配置 HTTPS 证书

如果需要配置使用 HTTPS 策略，则需要手动进行配置网关证书，配置步骤如下

1. 生成证书 rainbond.example.com

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/O=example Inc./CN=example.com' -keyout example.com.key -out example.com.crt
openssl req -out rainbond.example.com.csr -newkey rsa:2048 -nodes -keyout rainbond.example.com.key -subj "/CN=rainbond.example.com/O=some organization"
openssl x509 -req -sha256 -days 365 -CA example.com.crt -CAkey example.com.key -set_serial 0 -in rainbond.example.com.csr -out rainbond.example.com.crt
```

2. 创建证书

配置证书的位置在团队视图 ---> 网关 ---> 证书管理，需要注意的是要给哪个网关实现配置证书，则需要在其网关实现对应的团队创建证书，这里我选择的网关实现是 envoy ，所以我需要在 envoy 的团队中配置证书。

- rainbond.example.com.crt 的内容填写到公钥证书

- rainbond.example.com.key 的内容填写到私钥

![gateway-api105](https://static.goodrain.com/wechat/gateway-api/gateway-api105.png)

3. 配置证书

创建证书后会弹出一个包含 yaml 的对话框，将可选择立即配置将会跳转到平台管理视图的扩展里，在能力一栏选择对应实现的 gateway 资源，在对应位置粘贴所复制的 yaml 进行修改。修改完成后，便可在创建 http 策略的时候监听项选择 https 。

注意：如果 443 端口有占用请手动修改端口。

![gateway-api106](https://static.goodrain.com/wechat/gateway-api/gateway-api106.png)

##### 平台用户使用

1. 在应用下的拓展网关中创建访问策略，监听项选择平台管理员配置的证书 https 。

![gateway-api107](https://static.goodrain.com/wechat/gateway-api/gateway-api107.png)

2. 创建完成后即可使用 https 访问。

```
curl -v -k -H Host:rainbond.example.com --resolve "rainbond.example.com:30008:172.31.98.243" https://rainbond.example.com:30008
----------
<h1>Welcome to nginx1.16!</h1>
```

#### 扩展：Gateway HTTP 字段介绍

**网关类型：**选择 k8s 网关的实现，如果平台中安装了多个 k8s 网关的实现，可以在这里进行选择，你的创建的 HTTP 策略也会由你选择的实现去处理。

选择完网关类型后，下方会出现一组NodePort： IP:Port 这便是你的HTTP策略的代理地址，IP默认是你的节点内网 IP 如果节点存在外网 IP 则会展示外网IP。如果你的 service 资源存在外网 IP 则会在 NodePort 下方作为 LoadBalancerIP 展示。

**监听项：**匹配对应的监听项，配置 HTTPS 证书之后，如果当前域名想只供 HTTPS 访问，则这里可以选择 https。

**域名：**你要配置的域名

**路由规则：**可以配置一系列规则的集合。⚠️注意：因为这里存放多组规则，所以就会有优先级，匹配成功便直接代理到对应的后端或者重定向到对应的路由。

![gateway-api108](https://static.goodrain.com/wechat/gateway-api/gateway-api108.png)

- **条件匹配：**包含了基本的匹配规则，这里是或的关系，当存在多个条件匹配的时候只要存在匹配的条件匹配则会向下代理。

  - **Path：**匹配 URL 路径 

    精准：要求完全匹配路径，包括大小写和所有字符

    前缀：要求 URL 路径以要匹配的路径开头，但不要求后续字符完全匹配

    正则：使用正则表达式来匹配 URL 路径。如果 URL 路径与正则表达式匹配，则匹配成功。

  - **Header：**匹配 URL 请求头

    精准：要求 HTTP 头的值完全匹配，包括大小写和所有字符

    正则：使用正则表达式来匹配 HTTP 头的值。如果 HTTP 头的值与正则表达式匹配，则匹配成功。

- **高级规则：**包含了请求头处理以及路由重定向两个实现。

  - **加工请求头：**可以将你的请求头再加工

    覆盖：对原有的请求头进行覆盖处理

    添加：如果没有指定请求头则添加

    删除：删除指定请求头

  - **请求重定向：**重定向到指定路由

    协议：路由重定向所使用的协议

    域名：重定向到的域名

    端口：一般情况 http 为80，https 为 443

    状态码：301或302

- **后端路由：**HTTP 策略的后端路由。

  - **类型：**后端类型

    Service  代理到 Service上

    HTTPRoute 代理到HTTPRoute上

  - **权重：**该后端路由所占比重。 