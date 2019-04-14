---
title: 访问控制
description: Rainbond应用网关访问策略管理，这是网关最关键的配置。
hidden: true
---

这篇文章将会介绍如何在配置应用网关中的规则, 从而对应用的访问进行控制.

在这篇文章中, 你将会完成:

<li>添加 HTTP 策略</li>
<li>添加 HTTP 强转 HTTPs 策略</li>
<li>添加 TCP 策略</li>
<li>添加 泛域名 策略</li>
<li>添加 A/B 测试, 灰度发布策略</li>
<li>参数配置</li>

### 前期准备

请确保你能够满足以下条件:

- 一个状态健康的 Rainbond.
- 一个或多个运行中的服务
- 一个可用, 并且已经解析到应用网关所在机器上的域名(机器的 IP 可以在添加策略的面板上找到)

### 添加 HTTP 策略

- 准备一个服务，参考[服务创建文档](/user-manual/app-creation/service_create/)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写路由条件等信息
- 点击 确认
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B7%BB%E5%8A%A0http.png" width='100%' />

配置完成后, 就可以通过域名(www.test.com)对应用(Nginx)进行访问了.

### HTTPs 策略, HTTP 强转 HTTPs 策略

- 准备一个服务，参考[服务创建文档](/user-manual/app-creation/service_create/)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, `绑定证书`, 应用(组), 服务组件, 端口号, `HTTP Rewrite HTTPs` 等信息
- 点击 确认

> 如果没有勾选 HTTP Rewrite HTTPs, 那么将会是单纯的HTTPs

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/httptohttps.png" width='100%' />

配置完成后, 用 http://www.test.com 进行访问, 将被强制转成 https://www.test.com.

### TCP 访问策略

- 准备一个服务，参考[服务创建文档](/user-manual/app-creation/service_create/)
- 点击 应用网关 -> 访问控制 -> TCP/UDP -> 添加策略
- 填写 IP, 端口, 应用(组), 服务组件, 端口号, 负载均衡
- 点击 确认

> TCP 策略会有一个系统自动分配的端口, 你也可以指定端口, 但是要注意端口冲突的问题.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B7%BB%E5%8A%A0tcp%E7%AD%96%E7%95%A5.png" width='100%' />

配置完成后, 就可以通过 IP+Port(47.92.168.60:20128)访问应用了.

### 泛域名

- 准备一个服务，参考[服务创建文档](/user-manual/app-creation/service_create/)
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 `泛域名`, 应用(组), 服务组件, 端口
- 点击 确认

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E6%B3%9B%E5%9F%9F%E5%90%8D.png" width='100%' />

配置完成后, 任何一个解析到47.92.168.60的 test.com 的子域名都会访问同一个应用(Nginx).

### 高级路由(A/B 测试, 灰度发布)

在高级路由中, 我们可以对不同的服务绑定同一个域名, 通过设置不同的 请求路径, Cookie, Header, 将流量路由到相应的服务上. 另外, 我们还可以通过设置权重, 将流量按权重分配到不同的服务上. 以上的功能, 可以帮助我们轻松地实现  A/B 测试, 灰度发布.

#### Cookie

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

#### Header

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

#### 权重

首先, 准备两个应用, 2048和Nginx:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E5%87%86%E5%A4%87%E4%B8%A4%E4%B8%AA%E5%BA%94%E7%94%A8.gif" width="100%" />

然后, 给这两个应用, 分别添加一条 `除了权重, 其他信息都一样的策略`. 2048的权重设置为75, Nginx的权重设置为25.

最后, 通过他们的域名`test.goodrain.com`访问; 可以发现, 有75%的概率访问的是2048, 25%的概率访问的是Nginx.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E8%AE%BE%E7%BD%AE%E6%9D%83%E9%87%8D.gif" width="100%" />

通过以上对 Cookie, Header, 权重的配置, 就可以灵活地配置 `A/B 测试` 和 `灰度发布`.

### 参数配置

网关目前支持的参数有以下几个:

#### 连接超时时间

定义与上游服务器(upstream)建立连接的超时时间. 单位是秒, 默认: 75.

#### 请求超时时间

设置将请求传输到上游服务器(upstream)的超时时间. 单位是秒, 默认: 60. 仅在两次连续写入操作之间设置超时时间, 而不是为整个请求的传输.
如果上游服务器服务器在此时间内未收到任何内容，则关闭连接.

#### 响应超时时间

定义从上游服务器(upstream)读取响应的超时时间. 单位是秒, 默认: 60. 仅在两个连续的读操作之间设置超时, 而不是为整个响应的传输.
如果上游服务器在此时间内未传输任何内容, 则关闭连接.

#### 上传限制

设置上传内容(或请求正文)的最大限制, 将大小设置为0将不作限制. 单位是 Mb, 默认: 1.

#### 自定义请求头

设置了自定义请求头后, 每个发往上游服务器(upstream)的请求都会带上这些请求头.

#### 后端响应缓冲区

对应 Nginx 的 [proxy_buffering](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering) 参数, 默认关闭. 如果关闭了后端响应缓冲区，那么 Nginx 会立即把从后端收到的响应内容传送给客户端;. 如果开启了后端响应缓冲区, 那么 Nignx 会把后端返回的内容先放到缓冲区当中，然后再返回给客户端; 并且这个过程是边收边传，不是全部接收完再传给客户端.

#### Websoket

在网关支持的 WebSocket 与单纯的 WebSocket 不同, 是在 HTTP 的基础上, 使用 HTTP Upgrade 机制将连接从 HTTP 升级到 WebSocket. 这个 HTTP Upgrade 机制是在请求中添加两个自定义请求头, 分别是 'Upgrade $http_upgrade' 和 'Connection "Upgrade"', 当勾选了 Websoket, 网关会自动为当前的策加上这两个请求头. 更多的信息可以参考: [NGINX as a WebSocket Proxy](https://www.nginx.com/blog/websocket-nginx/)