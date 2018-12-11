---
title: 应用网关
summary: 。
toc: true
---

应用网关是 Rainbond 控制外部流量对应用访问的一个组件, 它支持的功能有:

- ⽀持 HTTP, TCP 两种访问策略
- ⽀持 HTTPs, HTTP 转 HTTPs
- 泛域名策略
- ⽀持证书管理
- HTTP 高级路由: 根据访问路径, 请求头, Cookie, 权重的访问控制.
- 基于 HTTP 高级路由, 可以实现 A/B 测试、灰度发布

以上的功能, 需要在 访问控制 中进行配置. 下面将会对演示如何在访问控制中配置应用网关的各种功能.

### **HTTP 访问策略**

- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, 应用(组), 服务组件, 端口号
- 点击 确认
- 把 域名 复制到浏览器进行访问

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/HTTP%E7%AD%96%E7%95%A5.gif" width='100%' />

### **TCP 访问策略**

- 点击 应用网关 -> 访问控制 -> TCP/UDP -> 添加策略
- 填写 IP, 端口, 应用(组), 服务组件, 端口号, 负载均衡
- 点击 确认
- 把 Endpoint 复制到浏览器进行访问
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/TCP%E7%AD%96%E7%95%A5.gif" width='100%' />

### **HTTPs, HTTP 转 HTTPs**
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 域名, `绑定证书`, 应用(组), 服务组件, 端口号, `HTTP Rewrite HTTPs`, 均衡算法
- 点击 确认
- 把 域名 复制到浏览器进行访问

> 如果没有勾选 HTTP Rewrite HTTPs, 那么将会是单纯的HTTPs

可以看到, 用 http://test.goodrain.com 进行访问, 将被强制转成 https://test.goodrain.com

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/HTTPtoHTTPs.gif" width='100%' />

### **泛域名**
- 点击 应用网关 -> 访问控制 -> 添加策略
- 填写 `泛域名`, 应用(组), 服务组件, 端口
- 点击 确认
- 把 域名 复制到浏览器进行访问

可以看到, 添加了域名为 `*.goodrain.com` 的策略后, 可以用test.goodrain.com, test2.goorain.com这两个域名对应用进行访问.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/Cookie.png" width='100%' />

### **高级路由**

高级路由中, 路径, 请求头, Cookie的优先级是: 路径 > 请求头 > Cookie

#### Cookie
下面就不再重复设置策略的步骤了.
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

#### **请求头**

添加两个请求头信息, branch=v5.0和version=beta, 如下图所示:
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

#### **权重**
首先, 准备两个应用, 2048和Nginx:
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E5%87%86%E5%A4%87%E4%B8%A4%E4%B8%AA%E5%BA%94%E7%94%A8.gif" width="100%" />

然后, 给这两个应用, 分别添加一条 `除了权重, 其他信息都一样的策略`. 2048的权重设置为75, Nginx的权重设置为25.

最后, 通过他们的域名`test.goodrain.com`访问; 可以发现, 有75%的概率访问的是2048, 25%的概率访问的是Nginx.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/traffic-control/%E8%AE%BE%E7%BD%AE%E6%9D%83%E9%87%8D.gif" width="100%" />