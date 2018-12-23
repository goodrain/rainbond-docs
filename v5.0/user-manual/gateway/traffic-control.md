---
title: 访问控制
summary: 。
toc: true
---

这篇文章将会介绍如何在配置[应用网关]("./gateway.md")中的规则, 从而对应用的访问进行控制.

在这篇文章中, 你将会完成:

<li>添加 HTTP 策略</li>
<li>添加 HTTP 强转 HTTPs 策略</li>
<li>添加 TCP 策略</li>
<li>添加 泛域名 策略</li>
<li>添加 A/B 测试策略</li>

## 前期准备

请确保你能够满足以下条件:

- 一个状态健康的 Rainbond.
- 一个或多个运行中的[应用](../app-creation/app-definition.md).
- 一个可用, 并且已经解析到应用网关所在机器上的域名(机器的 IP 可以在添加策略的面板上找到)

### 1. 添加 HTTP 策略

- 准备一个[应用](../app-creation/app-definition.md)(Nginx)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, 应用(组), 服务组件, 端口号等基本信息
- 点击 确认
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B7%BB%E5%8A%A0http.png" width='100%' />

配置完成后, 就可以通过域名(www.test.com)对应用(Nginx)进行访问了.

### 3.2 HTTPs 策略, HTTP 强转 HTTPs 策略

- 准备一个[应用](../app-creation/app-definition.md)(Nginx)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, `绑定证书`, 应用(组), 服务组件, 端口号, `HTTP Rewrite HTTPs` 等信息
- 点击 确认

> 如果没有勾选 HTTP Rewrite HTTPs, 那么将会是单纯的HTTPs

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/httptohttps.png" width='100%' />

配置完成后, 用 http://www.test.com 进行访问, 将被强制转成 https://www.test.com.

### 3.3 TCP 访问策略

- 准备一个[应用](../app-creation/app-definition.md)(Nginx)
- 点击 应用网关 -> 访问控制 -> TCP/UDP -> 添加策略
- 填写 IP, 端口, 应用(组), 服务组件, 端口号, 负载均衡
- 点击 确认

> TCP 策略会有一个系统自动分配的端口, 你也可以指定端口, 但是要注意端口冲突的问题.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B7%BB%E5%8A%A0tcp%E7%AD%96%E7%95%A5.png" width='100%' />

配置完成后, 就可以通过 IP+Port(47.92.168.60:20128)访问应用了.

### 3.4 泛域名

- 准备一个[应用](../app-creation/app-definition.md)(Nginx)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 `泛域名`, 应用(组), 服务组件, 端口
- 点击 确认

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B3%9B%E5%9F%9F%E5%90%8D.png" width='100%' />

配置完成后, 任何一个解析到47.92.168.60的 test.com 的子域名都会访问同一个应用(Nginx).

### 3.5 高级路由(A/B 测试, 灰度发布)

在高级路由中, 我们可以对不同的服务绑定同一个域名, 通过设置不同的 请求路径, Cookie, Header, 将流量路由到相应的服务上. 另外, 我们还可以通过设置权重, 将流量按权重分配到不同的服务上. 以上的功能, 可以帮助我们轻松地实现  A/B 测试, 灰度发布.

#### 3.5.1 Cookie

在 HTTP 策略中添加两个Cookie信息, branch=v5.0和version=beta, 如下图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/Cookie.png" width='100%' />

设置了Cookie后, 单纯的通过域名已经无法访问应用了:

```
172:~ abe$ curl test.goodrain.com
<html>
<head><title>502 Bad Gateway</title></head>
...
```

在访问的时候需要带上Cookie信息才能正常地对应用进行访问:

```
172:~ abe$ curl --cookie "branch=v5.0;version=beta" test.goodrain.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

#### 3.5.2 Header

在 HTTP 策略中添加两个请求头信息, branch=v5.0 和 version=beta, 如下图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/Header%E7%AD%96%E7%95%A5.png" width="100%" />

设置了请求头后, 单纯的通过域名已经无法访问应用了:

```
172:~ abe$ curl test.goodrain.com
<html>
<head><title>502 Bad Gateway</title></head>
...
```

在访问的时候需要带上请求头信息才能正常地对应用进行访问:

```
172:~ abe$ curl -H "branch:v5.0" -H "version:beta" test.goodrain.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

#### 3.5.4权重

首先, 准备两个应用, 2048和Nginx:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E5%87%86%E5%A4%87%E4%B8%A4%E4%B8%AA%E5%BA%94%E7%94%A8.gif" width="100%" />

然后, 给这两个应用, 分别添加一条 `除了权重, 其他信息都一样的策略`. 2048的权重设置为75, Nginx的权重设置为25.

最后, 通过他们的域名`test.goodrain.com`访问; 可以发现, 有75%的概率访问的是2048, 25%的概率访问的是Nginx.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E8%AE%BE%E7%BD%AE%E6%9D%83%E9%87%8D.gif" width="100%" />

通过以上对 Cookie, Header, 权重的配置, 就可以灵活地配置 `A/B 测试` 和 `灰度发布`.