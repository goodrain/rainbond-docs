---
title: 配置域名访问
description: 本文介绍如何通过域名访问 Rainbond 控制台，并配置 HTTPS 与 WebSocket
keywords:
- Rainbond 域名配置
- Rainbond HTTPS 配置
- Rainbond WebSocket 配置
---

## 概述

Rainbond 安装完成后，默认通过 `http://<网关入口 IP>:7070` 访问控制台。如果希望用户通过固定域名访问控制台，需要同时处理两类访问：

- 控制台页面：浏览器访问 `http://console.example.com` 或 `https://console.example.com`
- WebSocket：Web 终端、实时日志等功能会连接 `ws://console.example.com:6060` 或 `wss://console.example.com:6060`

配置前先确认 Rainbond 控制台本身已经可用：

```bash
curl -I http://<网关入口 IP>:7070
```

如果该地址无法访问，请先排查 Rainbond 网关节点、负载均衡、防火墙或安全组，不要直接开始配置域名。

## 选择配置方式

根据证书由谁提供，选择一种方式即可。

| 场景 | 推荐方式 | 是否需要在 Rainbond 创建第三方组件 | 证书配置位置 |
| --- | --- | --- | --- |
| 已有负载均衡，且负载均衡可以配置 HTTPS 证书 | [方式一：使用外部负载均衡](#方式一使用外部负载均衡推荐) | 不需要 | 负载均衡 |
| 没有外部 HTTPS 负载均衡，希望由 Rainbond 网关托管域名和证书 | [方式二：使用 Rainbond 网关绑定域名](#方式二使用-rainbond-网关绑定域名) | 需要 | Rainbond 网关 |

:::tip
如果你的负载均衡已经能提供 HTTPS 证书，建议使用方式一。此时请求会直接从负载均衡转发到 Rainbond 控制台端口，不需要在 Rainbond 平台里额外创建“第三方组件”来代理控制台。
:::

## 方式一：使用外部负载均衡（推荐）

这种方式适用于云负载均衡、硬件负载均衡、Nginx、HAProxy 等已经负责对外域名和 HTTPS 证书的场景。

访问链路如下：

```text
浏览器
  -> https://console.example.com
  -> 外部负载均衡（证书在这里配置）
  -> Rainbond 网关节点:7070
  -> Rainbond 控制台
```

### 第一步：配置域名解析

将控制台域名解析到负载均衡的公网 IP 或 VIP。

```text
console.example.com -> <负载均衡 IP>
```

### 第二步：配置负载均衡监听

在负载均衡上至少配置控制台访问和 WebSocket 访问。

| 用途 | 负载均衡监听 | 后端服务 | 说明 |
| --- | --- | --- | --- |
| 控制台 HTTPS | `443` | Rainbond 网关节点 `7070` | 证书配置在负载均衡，后端可转发 HTTP |
| 控制台 HTTP（可选） | `80` | Rainbond 网关节点 `7070` | 可直接转发，也可重定向到 HTTPS |
| WebSocket | `6060` | Rainbond 网关节点 `6060` | 需要允许 WebSocket 或长连接 |

如果是高可用部署，后端服务应包含所有 Rainbond 网关节点。负载均衡到后端的健康检查可以使用 TCP 检查，分别检查 `7070` 和 `6060` 端口。

:::warning
如果控制台通过 HTTPS 访问，WebSocket 也必须使用 `wss://`，否则浏览器会因为混合内容拦截连接。也就是说，负载均衡的 `6060` 监听同样需要支持 TLS 证书，或提供等价的 WSS 转发能力。
:::

### 第三步：修改 WebSocket 通信地址

登录 Rainbond 控制台，进入 **平台管理 → 集群 → 编辑集群**，修改 **WebSocket 通信地址**：

```text
wss://console.example.com:6060
```

如果控制台只使用 HTTP，则填写：

```text
ws://console.example.com:6060
```

保存后刷新页面，再测试 Web 终端和实时日志。

## 方式二：使用 Rainbond 网关绑定域名

这种方式适用于希望 Rainbond 网关直接接收 `80/443` 请求，并在 Rainbond 中管理控制台域名和证书的场景。

访问链路如下：

```text
浏览器
  -> https://console.example.com
  -> Rainbond 网关 80/443
  -> 控制台第三方组件
  -> Rainbond 控制台 7070
```

### 第一步：配置域名解析

将控制台域名解析到 Rainbond 网关入口 IP。该 IP 可以是负载均衡 IP、VIP，或单个 Rainbond 网关节点 IP。

```text
console.example.com -> <Rainbond 网关入口 IP>
```

确认客户端可以访问以下端口：

- `80`：HTTP 域名访问
- `443`：HTTPS 域名访问
- `6060`：WebSocket
- `7070`：控制台默认入口，用于第三方组件回源

### 第二步：创建控制台第三方组件

1. 进入目标团队和应用，选择 **添加组件 → 第三方组件**。
2. 选择注册方式：**静态注册**。
3. 填写组件名称，例如 `Rainbond 控制台`。
4. 填写组件地址：

   ```text
   <Rainbond 网关入口 IP>:7070
   ```

   示例：

   ```text
   192.168.1.10:7070
   ```

5. 创建组件。

组件地址必须是 Rainbond 集群可以访问到的地址，不要填写 `127.0.0.1`、`localhost`，也不要填写尚未生效的控制台域名。

### 第三步：配置组件端口

进入该第三方组件的 **端口** 页面，添加端口：

| 配置项 | 值 |
| --- | --- |
| 端口号 | `7070` |
| 端口协议 | `HTTP` |
| 对外访问 | 开启 |

如果页面要求配置健康检测，可以使用 `7070` 端口做 TCP 健康检测。

:::info
WebSocket 的 `6060` 是 Rainbond 网关的独立端口，不需要通过这个第三方组件再配置一次。只要域名解析到 Rainbond 网关入口 IP，并且防火墙或安全组放通 `6060`，浏览器就可以通过 `ws://域名:6060` 或 `wss://域名:6060` 连接。
:::

### 第四步：绑定控制台域名

进入应用视图的 **网关管理 → 路由管理 → HTTP** 页面，为第三方组件添加 HTTP 路由：

| 配置项 | 值 |
| --- | --- |
| 域名 | `console.example.com` |
| 组件 | 上一步创建的控制台第三方组件 |
| 组件端口 | `7070` |
| 路径 | `/` |

提交后，访问：

```text
http://console.example.com
```

如果页面能正常打开，说明 HTTP 域名已经生效。

### 第五步：配置 HTTPS 证书（可选）

如果需要让 Rainbond 网关提供 HTTPS：

1. 进入 **网关管理 → 证书管理**。
2. 添加 `console.example.com` 对应的证书和私钥。
3. 确认证书域名与 HTTP 路由域名一致。
4. 访问：

   ```text
   https://console.example.com
   ```

如果证书已经配置在外部负载均衡上，请使用[方式一](#方式一使用外部负载均衡推荐)，不要再在 Rainbond 中重复创建控制台第三方组件。

### 第六步：修改 WebSocket 通信地址

进入 **平台管理 → 集群 → 编辑集群**，修改 **WebSocket 通信地址**。

HTTP 控制台填写：

```text
ws://console.example.com:6060
```

HTTPS 控制台填写：

```text
wss://console.example.com:6060
```

保存后刷新页面，再测试 Web 终端和实时日志。

## 验证配置

按下面顺序验证，能更快定位问题：

1. 访问控制台默认入口：

   ```bash
   curl -I http://<网关入口 IP>:7070
   ```

2. 访问控制台域名：

   ```bash
   curl -I http://console.example.com
   curl -I https://console.example.com
   ```

3. 检查 WebSocket 端口是否可达：

   ```bash
   nc -vz console.example.com 6060
   ```

4. 在 Rainbond 页面中打开 **Web 终端** 或查看 **实时日志**，确认没有连接失败。

## 常见问题

### 域名无法访问

- 确认域名解析到了正确的负载均衡 IP、VIP 或 Rainbond 网关节点 IP。
- 确认客户端到 `80/443` 端口的防火墙或安全组已放通。
- 如果使用方式二，确认第三方组件地址可以访问 `http://<网关入口 IP>:7070`，并且组件端口 `7070` 的协议为 `HTTP`。

### HTTPS 可以打开，但 Web 终端或实时日志不可用

- 确认 **平台管理 → 集群 → 编辑集群** 中的 WebSocket 通信地址是 `wss://console.example.com:6060`。
- 确认负载均衡、安全组或防火墙放通了 `6060`。
- 如果控制台是 HTTPS，`6060` 也必须支持 TLS/WSS；不能使用 `ws://console.example.com:6060`。

### 第三方组件创建后状态异常

- 组件地址不要填写 `127.0.0.1` 或 `localhost`。
- 组件地址不要填写尚未配置成功的控制台域名，建议先使用网关入口 IP。
- 如果只代理控制台页面，组件地址填写 `<网关入口 IP>:7070`，组件端口只配置 `7070` 即可。

### 什么时候不需要第三方组件

只要外部负载均衡已经能完成域名、证书和转发，就不需要在 Rainbond 中创建控制台第三方组件。此时只需要：

- 域名解析到负载均衡。
- 负载均衡 `443` 转发到 Rainbond 网关节点 `7070`。
- 负载均衡 `6060` 转发到 Rainbond 网关节点 `6060`。
- 在 Rainbond 集群配置中把 WebSocket 通信地址改成 `wss://console.example.com:6060`。
