---
title: 应用网关
summary: 。
toc: true
---

##  1. 应用网关是什么？
在百度百科中, 网关的定义是这样子的: 网关(Gateway)就是一个网络连接到另一个网络的"关口". 类似的, 在 Rainbond 中, 应用网关(rbd-gateway)是外部流量流入内部应用的"关口". 也可以说是南北向流量中, 北向流量流向南向流量的一个"关口".

## 2. 为什么用应用网关?
应用网关可以轻松地设置对后端服务的访问策略, 并且功能十分地强大. 支持的功能有:

- HTTP 和 HTTPs 访问策略, HTTP 转 HTTPs
- TCP/UDP 访问策略
- 泛域名访问策略
- 高级路由: 根据访问路径, 请求头, Cookie, 权重的访问控制
- A/B测试, 灰度发布
- 负载均衡

## 3. 应用网关的配置

接下来会对应用网关的功能一一地进行配置.

### 3.1 HTTP 访问策略

- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, 应用(组), 服务组件, 端口号
- 点击 确认
- 把 域名 复制到浏览器进行访问

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/HTTP%E7%AD%96%E7%95%A5.gif" width='100%' />

### 3.2 HTTPs, HTTP 转 HTTPs
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, `绑定证书`, 应用(组), 服务组件, 端口号, `HTTP Rewrite HTTPs`, 均衡算法
- 点击 确认
- 把 域名 复制到浏览器进行访问

> 如果没有勾选 HTTP Rewrite HTTPs, 那么将会是单纯的HTTPs

可以看到, 用 http://test.goodrain.com 进行访问, 将被强制转成 https://test.goodrain.com

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/HTTPtoHTTPs.gif" width='100%' />

### 3.3 TCP 访问策略

- 点击 应用网关 -> 访问控制 -> TCP/UDP -> 添加策略
- 填写 IP, 端口, 应用(组), 服务组件, 端口号, 负载均衡
- 点击 确认
- 把 Endpoint 复制到浏览器进行访问
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/TCP%E7%AD%96%E7%95%A5.gif" width='100%' />

### 3.4 泛域名
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 `泛域名`, 应用(组), 服务组件, 端口
- 点击 确认
- 把 域名 复制到浏览器进行访问

可以看到, 添加了域名为 `*.goodrain.com` 的策略后, 可以用test.goodrain.com, test2.goorain.com这两个域名对应用进行访问.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/Cookie.png" width='100%' />

### 3.5 高级路由

在高级路由中, 我们可以对不同的服务绑定同一个域名, 通过设置不同的 请求路径, Cookie, Header, 将流量路由到相应的服务上. 另外, 我们还可以通过设置权重, 将流量按权重分配到不同的服务上. 以上的功能, 可以帮助我们轻松地实现  A/B 测试, 灰度发布.

下面就不再重复设置策略的步骤了, 只介绍需要改变的地方.

#### 3.5.1 Cookie

添加两个Cookie信息, branch=v5.0和version=beta, 如下图所示:
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

添加两个请求头信息, branch=v5.0 和 version=beta, 如下图所示:

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

## 4. 后续更新计划

- 支持更多的负载均衡算法(一致性哈希, 粘性会话)
- IP 池,  可以自定义IP