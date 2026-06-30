---
title: HTTP
description: 本文介绍如何在 Rainbond 中配置和管理 HTTP 路由策略
keywords:
- HTTP 路由配置
- 域名绑定
- 网关管理
- 路由策略
---

## 概述

HTTP 路由用于将外部请求转发到应用组件，支持域名绑定、负载均衡、HTTPS、WebSocket 等功能。

## 前提条件

- 已完成 Rainbond 安装并创建应用
- 应用中至少有一个运行中的组件

## 快速开始

### 场景一：使用默认域名

1.  **开启对外端口**：进入组件详情页面，在**端口**选项中，开启需要对外暴露的端口。
2.  **访问验证**：使用默认域名 `xxx.nip.io` 访问您的应用。

:::tip
无需配置域名解析，快速体验应用访问能力。如无法访问，请阅读[应用无法访问故障排查指南](../../troubleshooting/common#4-应用组件-http-对外无法访问)。
:::

### 场景二：自定义域名

最简单的路由配置只需 3 步：

1. **进入网关管理** → 点击"新增路由"
2. **填写域名** → 如 `demo.example.com`（需将域名解析到网关 IP）
3. **选择组件** → 选择要绑定的应用组件和端口

:::tip
- 域名需要先解析到网关 IP 才能访问
- 本文档分为基础配置和高级配置，按需查看
:::

## 新增 HTTP 路由

### 第一步：进入网关管理

1. 进入应用视图
2. 点击左侧菜单 **网关管理**
3. 点击 **新增路由** 按钮

### 第二步：基础配置

#### 1. 域名

填写域名（如 `demo.example.com`），页面会提示需要将域名解析到的 IP 地址。

<details>
<summary>📖 域名配置详细说明</summary>

**支持的域名类型**：
- 自定义域名：`demo.example.com`
- 通配符域名：`*.example.com`
- 系统默认域名（无需配置 DNS）

**域名解析步骤**：
1. 登录域名服务商控制台
2. 添加 A 记录，指向网关 IP（页面会提示具体 IP）
3. 等待 DNS 生效（5-10 分钟）

</details>

#### 2. 路径

配置访问路径，默认 `/*` 表示匹配所有路径。

<details>
<summary>📖 路径配置详细说明</summary>

| 路径格式 | 说明 |
|---------|------|
| `/*` | 匹配所有路径（默认） |
| `/api/*` | 只匹配 /api/ 开头的请求 |
| `/app/user/*` | 匹配多级路径 |

</details>

#### 3. 服务来源

选择要绑定的应用组件和端口。

**基础配置**：
- 应用名称 → 组件名称 → 端口号
- 权重：多组件时按权重分配流量（默认 100）

<details>
<summary>📖 负载均衡配置</summary>

当需要将流量分配到多个组件时：

1. 配置第一个组件，设置权重（如 80）
2. 点击 **+** 添加第二个组件，设置权重（如 20）
3. 流量将按权重比例分配（80:20）

**示例**：实现灰度发布
- web-v1：权重 90（90% 流量）
- web-v2：权重 10（10% 流量）

</details>

#### 4. 高级配置（可选）

点击页面上的 **更多** 按钮可展开以下高级配置选项。

:::tip 何时使用高级配置
- ✅ 需要限制特定 HTTP 方法（如只允许 GET、POST）
- ✅ 需要限制访问 IP（如仅允许办公网访问）
- ✅ 需要基于 Header/Cookie 进行流量路由
- ✅ 需要配置超时时间
- ❌ 简单的域名绑定不需要高级配置
:::

<details>
<summary><b>路径配置（高级）</b></summary>

- 支持添加多个路径规则，点击 **+** 按钮可添加更多
- 点击 **取消** 可折叠高级配置面板
- 每个路径规则独立生效

</details>

<details>
<summary><b>HTTP 方法过滤</b></summary>

选择允许通过的 HTTP 方法，支持多选：

| 方法 | 说明 |
|------|------|
| GET | 获取资源 |
| POST | 提交数据 |
| PUT | 更新资源 |
| DELETE | 删除资源 |
| OPTIONS | 预检请求 |
| HEAD | 获取响应头 |
| PATCH | 部分更新 |
| TRACE | 追踪请求 |

**配置说明**：
- 默认允许所有 HTTP 方法
- 点击方法名称可选中/取消选中
- 已选中的方法会显示 **×** 标记，点击可取消
- 未选中的方法请求会被拒绝（返回 405 Method Not Allowed）

</details>

<details>
<summary><b>来源 IP 白名单</b></summary>

限制只有特定 IP 或 IP 段才能访问该路由。

**配置说明**：
- 输入允许访问的 IP 地址或 CIDR 格式的 IP 段
- 点击 **+** 按钮可添加多个 IP/IP 段
- 留空表示不限制来源 IP

**IP 格式示例**：
- 单个 IP：`192.168.1.100`
- IP 段（CIDR）：`192.168.1.0/24`
- 多个 IP：通过添加多条规则实现

</details>

<details>
<summary><b>高级条件匹配</b></summary>

基于请求特征进行精细化路由控制，支持以下类型：

**匹配类型**：

| 类型 | 说明 | 示例 |
|------|------|------|
| Header | 根据请求头匹配 | `X-Version: v2` |
| Cookie | 根据 Cookie 匹配 | `user_type: vip` |
| Query | 根据 URL 参数匹配 | `debug: true` |

**比较运算符**：

| 运算符 | 说明 | 示例 |
|--------|------|------|
| 等于 | 完全匹配 | name == "admin" |
| 不等于 | 不匹配 | env != "prod" |
| 包含 | 字符串包含 | user-agent 包含 "Mobile" |
| 正则匹配 | 正则表达式 | path 匹配 "^/api/.*" |

**配置步骤**：
1. 选择匹配类型（Header/Cookie/Query）
2. 输入名称（name）
3. 选择比较运算符
4. 输入匹配值（value）
5. 点击 **+** 添加更多条件

**使用场景**：

<details>
<summary>场景 1：灰度发布</summary>

通过 Header 或 Cookie 将特定用户导流到新版本：

```yaml
类型: Header
名称: X-Version
运算符: 等于
值: beta
```

</details>

<details>
<summary>场景 2：移动端/PC 端分流</summary>

根据 User-Agent 区分设备类型：

```yaml
类型: Header
名称: User-Agent
运算符: 包含
值: Mobile
```

将移动端请求路由到移动端优化的组件。

</details>

<details>
<summary>场景 3：A/B 测试</summary>

根据 Cookie 值进行 A/B 测试：

```yaml
类型: Cookie
名称: ab_test
运算符: 等于
值: group_a
```

</details>

</details>

<details>
<summary><b>超时设置</b></summary>

配置与后端服务通信的超时时间，包含三个参数（单位：秒）：

| 参数 | 说明 | 默认值 | 建议值 |
|------|------|--------|--------|
| 连接超时 | 建立连接的最长等待时间 | 60s | 5-60s |
| 读超时 | 读取响应数据的最长等待时间 | 60s | 60-300s |
| 发送超时 | 发送请求数据的最长等待时间 | 60s | 60-180s |

**配置建议**：
- **API 接口**：连接 5s，读 60s，发送 60s
- **文件上传**：连接 10s，读 300s，发送 300s
- **长轮询**：连接 10s，读 600s，发送 60s
- **WebSocket**：使用较长的超时时间

:::warning 注意事项
- 超时时间过短可能导致正常请求被中断
- 超时时间过长可能占用连接资源
- 根据实际业务场景合理设置
:::

</details>

#### 5. WebSocket（可选）

如果应用需要 WebSocket 支持（实时聊天、数据推送等），开启 **websocket** 开关。

### 第三步：提交配置

检查配置无误后，点击 **确定** 按钮完成创建。


## 路由管理操作

### 访问验证

创建路由后，在浏览器访问配置的域名：

```bash
http://demo.example.com/
```

或使用 curl 测试：

```bash
curl http://demo.example.com/
```

### 编辑路由

在网关管理列表中，点击路由的 **编辑** 按钮修改配置。

### 删除路由

点击 **删除** 按钮可删除路由。删除后该域名将无法访问。

## 网关插件配置

网关提供丰富的插件功能，实现流量管理、安全防护和性能优化。

插件使用说明：
- 在创建/编辑路由时，点击 **添加插件** 按钮
- 选择需要的插件并配置参数
- 一个路由可以添加多个插件
- 插件按添加顺序执行

<details>
<summary><b>limit-req</b></summary>

使用漏桶算法限制单个客户端对服务的请求速率。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 请求速率 | `rate` | 是 | 数字 | 指定每秒请求速率。超过 `rate` 但未超过 `rate + burst` 的请求会被延时处理。 | 10 |
| 突发请求数 | `burst` | 是 | 数字 | 请求速率超过 `rate + burst` 后会被直接拒绝。 | 20 |
| 限流 Key 类型 | `key_type` | 否 | 下拉选择 | 限流 Key 的类型。 | `var` |
| 限流 Key | `key` | 否 | 下拉选择 | 用来区分限流对象的依据。 | `remote_addr` |
| 拒绝状态码 | `rejected_code` | 否 | 数字 | 请求超过阈值被拒绝时返回的 HTTP 状态码。 | 503 |
| 拒绝响应内容 | `rejected_msg` | 否 | 字符串 | 请求超过阈值被拒绝时返回的响应体。 | 请求过于频繁 |
| 不延迟处理 | `nodelay` | 否 | 开关 | 开启后，超过 `rate` 但未超过 `rate + burst` 的请求不会被延迟处理。 | 关闭 |
| 允许降级放行 | `allow_degradation` | 否 | 开关 | 限速插件临时不可用时，是否允许请求继续访问。 | 关闭 |

**限流 Key 可选值**

- `remote_addr`：客户端 IP 地址
- `server_addr`：服务端 IP 地址
- `http_x_real_ip`：`X-Real-IP` 请求头
- `http_x_forwarded_for`：`X-Forwarded-For` 请求头
- `consumer_name`：Consumer 的用户名

</details>

<details>
<summary><b>limit-count</b></summary>

基于固定时间窗口的请求计数限流，可以限制指定时间内的请求数量。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 请求次数上限 | `count` | 是 | 数字 | 时间窗口内允许的最大请求数量。 | 100 |
| 时间窗口 | `time_window` | 是 | 数字 | 计数时间窗口，单位为秒。超过该时间后重新开始计数。 | 60 |
| 计数 Key 类型 | `key_type` | 否 | 下拉选择 | 计数 Key 的类型。 | `var` |
| 计数 Key | `key` | 否 | 字符串 | 用来区分计数对象的依据。为空时默认使用 `remote_addr`。 | `remote_addr` |
| 拒绝状态码 | `rejected_code` | 否 | 数字 | 请求超过阈值被拒绝时返回的 HTTP 状态码。 | 503 |
| 拒绝响应内容 | `rejected_msg` | 否 | 字符串 | 请求超过阈值被拒绝时返回的响应体。 | 请求过于频繁 |
| 计数策略 | `policy` | 否 | 下拉选择 | 计数器存储策略。当前表单支持本地计数。 | `local` |
| 显示限额响应头 | `show_limit_quota_header` | 否 | 开关 | 开启后在响应头中显示 `X-RateLimit-Limit` 和 `X-RateLimit-Remaining`。 | 开启 |

**计数 Key 类型可选值**

- `var`：使用 Nginx 变量，如 `remote_addr`、`http_x_forwarded_for`
- `var_combination`：使用变量组合，如 `$remote_addr $consumer_name`
- `constant`：使用常量值，对所有请求统一限流

**计数策略可选值**

- `local`：本地限流，仅在当前网关节点生效

</details>

<details>
<summary><b>limit-conn</b></summary>

限制同一时刻的并发连接数，防止服务器过载。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 最大并发数 | `conn` | 是 | 数字 | 允许的最大并发请求数。超过 `conn` 但低于 `conn + burst` 的请求会被延迟处理。 | 10 |
| 突发并发数 | `burst` | 是 | 数字 | 超过 `conn + burst` 的请求会被直接拒绝。 | 5 |
| 默认延迟时间 | `default_conn_delay` | 是 | 数字 | 默认的连接或请求处理延迟时间，单位为秒。 | 1 |
| 仅使用默认延迟 | `only_use_default_delay` | 否 | 开关 | 开启后严格按照 `default_conn_delay` 进行延迟处理。 | 关闭 |
| 限流 Key 类型 | `key_type` | 否 | 下拉选择 | 限流 Key 的类型。 | `var` |
| 限流 Key | `key` | 否 | 字符串 | 用来区分限流对象的依据。 | `remote_addr` |
| 拒绝状态码 | `rejected_code` | 否 | 数字 | 请求超过阈值被拒绝时返回的 HTTP 状态码。 | 503 |
| 拒绝响应内容 | `rejected_msg` | 否 | 字符串 | 请求超过阈值被拒绝时返回的响应体。 | 连接数过多 |
| 允许降级放行 | `allow_degradation` | 否 | 开关 | 限速插件临时不可用时，是否允许请求继续访问。 | 关闭 |

**限流 Key 类型可选值**

- `var`：使用 Nginx 变量，如 `remote_addr`、`http_x_forwarded_for`
- `var_combination`：使用变量组合

</details>

<details>
<summary><b>proxy-rewrite</b></summary>

在将请求转发到后端服务前，重写请求的 URI、请求方法、请求头等信息。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 目标 URI | `uri` | 否 | 字符串 | 转发到上游的新 URI，支持 NGINX 变量。 | `/new/path` |
| 请求方法 | `method` | 否 | 下拉选择 | 将路由请求代理为指定请求方法。 | `GET` |
| 正则 URI 重写 | `regex_uri` | 否 | 字符串数组 | 使用正则表达式匹配客户端 URI，并替换为上游 URI。 | `["^/api/v1/(.*)", "/$1"]` |
| 目标 Host | `host` | 否 | 字符串 | 转发到上游的新 Host。 | `backend.example.com` |
| 追加请求头 | `headers.add` | 否 | 键值对 | 添加新的请求头；如果请求头已存在，则追加到末尾。 | `{"X-Custom-Header":"value"}` |
| 设置请求头 | `headers.set` | 否 | 键值对 | 设置或覆盖请求头。 | `{"X-Real-IP":"$remote_addr"}` |
| 移除请求头 | `headers.remove` | 否 | 字符串数组 | 删除指定请求头。 | `["X-Forwarded-For"]` |
| 使用原始请求 URI | `use_real_request_uri_unsafe` | 否 | 开关 | 使用 NGINX 原始 `$request_uri`，会绕过 URI 规范化，仅在明确需要时开启。 | 关闭 |

**请求方法可选值**

- GET
- POST
- PUT
- DELETE
- PATCH
- HEAD
- OPTIONS
- TRACE

</details>

<details>
<summary><b>cors</b></summary>

配置 CORS（Cross-Origin Resource Sharing）策略，允许跨域请求访问。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 允许来源 | `allow_origins` | 否 | 字符串 | 允许跨域访问的源，多个源用逗号分隔。 | `*` 或 `https://example.com` |
| 允许方法 | `allow_methods` | 否 | 字符串 | 允许跨域的请求方法，多个方法用逗号分隔。 | `GET,POST,PUT` |
| 允许请求头 | `allow_headers` | 否 | 字符串 | 允许跨域请求中携带的请求头，多个请求头用逗号分隔。 | `Content-Type,Authorization` |
| 暴露响应头 | `expose_headers` | 否 | 字符串 | 允许浏览器读取的响应头，多个响应头用逗号分隔。 | `X-Custom-Header` |
| 预检缓存时间 | `max_age` | 否 | 数字 | 预检请求结果缓存时间，单位为秒。设置为 `-1` 可禁用缓存。 | 5 |
| 允许携带凭据 | `allow_credentials` | 否 | 开关 | 是否允许请求携带 Cookie 等凭据。开启后其他 CORS 字段不能使用 `*` 允许所有值。 | 关闭 |
| 来源正则匹配 | `allow_origins_by_regex` | 否 | 字符串数组 | 使用正则表达式匹配允许跨域访问的源。 | `[".*\\.example\\.com$"]` |
| 来源元数据引用 | `allow_origins_by_metadata` | 否 | 字符串数组 | 从插件元数据中引用允许跨域访问的源。 | `["EXAMPLE"]` |

</details>

<details>
<summary><b>real-ip</b></summary>

从代理服务器的请求头中提取客户端的真实 IP 地址，适用于应用部署在 CDN、负载均衡器或多层代理后的场景。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 真实 IP 来源 | `source` | 是 | 字符串 | 从 APISIX 视角动态设置客户端 IP 地址、端口或主机名。 | `http_x_forwarded_for` |
| 可信地址 | `trusted_addresses` | 否 | 字符串数组 | 受信任的代理服务器地址列表。 | `["10.0.0.0/8", "192.168.0.0/16"]` |
| 递归查找 | `recursive` | 否 | 开关 | 开启后从可信代理链中递归查找最后一个非受信任地址。 | 关闭 |

**真实 IP 来源常用值**

| 值 | 说明 | 使用场景 |
|----|------|----------|
| `arg_realip` | 从 URL 参数中获取 | 测试环境、特殊场景 |
| `http_x_forwarded_for` | 从 X-Forwarded-For 请求头获取 | CDN、负载均衡器（最常用） |
| `http_x_real_ip` | 从 X-Real-IP 请求头获取 | Nginx 代理 |
| `http_cf_connecting_ip` | 从 Cloudflare 特定请求头获取 | Cloudflare CDN |
| `http_true_client_ip` | 从 True-Client-IP 请求头获取 | Akamai CDN |
| 其他自定义请求头 | 从自定义请求头获取 | 自定义代理架构 |


</details>

<details>
<summary><b>client-control</b></summary>

限制客户端请求体的大小，防止超大请求影响服务器性能。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 最大请求体大小 | `max_body_size` | 否 | 数字 | 客户端请求体最大上限，单位为字节。设置为 `0` 时不检查请求体大小。 | 10485760 |

</details>

<details>
<summary><b>redirect</b></summary>

将请求重定向到其他 URL，支持 HTTP 到 HTTPS 的自动重定向、固定 URL 重定向和正则表达式重定向。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| HTTP 转 HTTPS | `http_to_https` | 否 | 开关 | 请求为 HTTP 时，使用 301 状态码重定向到相同 URI 的 HTTPS 地址。 | 关闭 |
| 重定向 URI | `uri` | 否 | 字符串 | 要重定向到的 URI，可包含 NGINX 变量。 | `https://www.example.com` |
| 正则重定向 URI | `regex_uri` | 否 | 字符串数组 | 使用正则表达式匹配客户端 URL 并重定向。 | `["^/old/(.*)", "/new/$1"]` |
| 重定向状态码 | `ret_code` | 否 | 数字 | HTTP 重定向响应状态码。 | 302 |
| 编码 URI | `encode_uri` | 否 | 开关 | 开启后，`Location` 响应头中的 URI 会按照 RFC 3986 编码。 | 关闭 |
| 附加查询参数 | `append_query_string` | 否 | 开关 | 开启后，将原始请求中的查询字符串附加到 `Location` 响应头。 | 关闭 |

**重定向状态码可选值**

| 状态码 | 名称 | 说明 | 使用场景 |
|--------|------|------|----------|
| 301 | Moved Permanently | 永久重定向，会被浏览器和搜索引擎缓存 | 域名迁移、URL 永久变更 |
| 302 | Found | 临时重定向（默认值），不会被缓存 | 临时跳转、测试环境 |
| 307 | Temporary Redirect | 临时重定向，保持请求方法不变 | POST 请求临时跳转 |
| 308 | Permanent Redirect | 永久重定向，保持请求方法不变 | POST 请求永久跳转 |

</details>

<details>
<summary><b>jwt-auth</b></summary>

使用 JSON Web Token（JWT）作为客户端访问上游资源前的认证机制。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 请求头 | `header` | 否 | 字符串 | 从指定请求头读取 JWT。 | `authorization` |
| 查询参数 | `query` | 否 | 字符串 | 从指定 URL 查询参数读取 JWT。 | `jwt` |
| Cookie 名称 | `cookie` | 否 | 字符串 | 从指定 Cookie 读取 JWT。 | `jwt` |
| 隐藏凭据 | `hide_credentials` | 否 | 开关 | 开启后，转发到上游前会移除客户端请求中携带的 JWT 凭据。 | 关闭 |
| 校验 Claims | `claims_to_verify` | 否 | 多选 | 需要校验的 JWT claims，常用为 `exp` 和 `nbf`。 | `["exp", "nbf"]` |
| 匿名消费者 | `anonymous_consumer` | 否 | 字符串 | JWT 缺失或校验失败时使用的匿名 Consumer 名称。留空时认证失败会直接拒绝请求。 | `anonymous` |
| 存入上下文 | `store_in_ctx` | 否 | 开关 | 开启后，APISIX 会将认证结果存入上下文，便于后续插件读取。 | 关闭 |
| 认证域 | `realm` | 否 | 字符串 | 认证失败时 `WWW-Authenticate` 响应头中的 realm 值。 | `jwt` |
| Key Claim | `key_claim_name` | 否 | 字符串 | 用于匹配 Consumer key 的 JWT claim 名称。 | `key` |
| 高级配置 | `extra_config` | 否 | JSON 对象 | 直接合并到插件配置中的高级 JSON 配置，适合填写当前表单未覆盖的 APISIX 插件字段。 | `{"cache_segment":"team-a"}` |

</details>

<details>
<summary><b>openid-connect</b></summary>

接入 OpenID Connect 身份提供商，完成认证、令牌校验和用户信息透传。

**配置参数**

| 字段 | 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|----------|------|------|------|--------|
| 客户端 ID | `client_id` | 是 | 字符串 | 身份提供商分配的 OpenID Connect 客户端 ID。 | `rainbond` |
| 客户端密钥 | `client_secret` | 是 | 密码 | 身份提供商分配的 OpenID Connect 客户端密钥。请勿在公开环境中泄露该值。 | `<client_secret>` |
| 发现地址 | `discovery` | 是 | 字符串 | 身份提供商的 discovery 地址，通常以 `/.well-known/openid-configuration` 结尾。 | `https://idp.example.com/.well-known/openid-configuration` |
| 授权范围 | `scope` | 否 | 字符串 | 请求的 OAuth/OIDC scope，多个 scope 用空格分隔。 | `openid profile email` |
| 仅 Bearer Token | `bearer_only` | 否 | 开关 | 开启后仅校验请求中的 Bearer Token，不会发起浏览器重定向登录流程。 | 关闭 |
| 回调地址 | `redirect_uri` | 否 | 字符串 | 授权码流程的回调地址，需要和身份提供商客户端配置保持一致。 | `https://app.example.com/callback` |
| 认证域 | `realm` | 否 | 字符串 | 认证失败时 `WWW-Authenticate` 响应头中的 realm 值。 | `apisix` |
| 登出路径 | `logout_path` | 否 | 字符串 | 触发登出的路径。 | `/logout` |
| 登出后跳转 | `post_logout_redirect_uri` | 否 | 字符串 | 登出完成后跳转的地址。 | `https://app.example.com` |
| 校验证书 | `ssl_verify` | 否 | 开关 | 是否校验身份提供商 HTTPS 证书，生产环境建议保持开启。 | 开启 |
| 超时时间 | `timeout` | 否 | 数字 | 访问身份提供商接口的超时时间，单位为秒。 | 3 |
| Token 校验端点 | `introspection_endpoint` | 否 | 字符串 | Token introspection 端点，用于向身份提供商校验 access token。 | `https://idp.example.com/oauth2/introspect` |
| 校验端点认证方式 | `introspection_endpoint_auth_method` | 否 | 下拉选择 | 调用 introspection endpoint 时使用的客户端认证方式。 | `client_secret_basic` |
| Token 端点认证方式 | `token_endpoint_auth_method` | 否 | 下拉选择 | 调用 token endpoint 时使用的客户端认证方式。 | `client_secret_basic` |
| 公钥 | `public_key` | 否 | 文本 | 用于校验 JWT 签名的公钥。不使用 JWKS 或 discovery 自动获取密钥时可填写。 | `<public_key>` |
| 使用 JWKS | `use_jwks` | 否 | 开关 | 开启后从 JWKS 端点获取公钥校验 token。 | 关闭 |
| 使用 PKCE | `use_pkce` | 否 | 开关 | 开启授权码流程中的 PKCE 校验，需要身份提供商客户端同步开启。 | 关闭 |
| Token 签名算法 | `token_signing_alg_values_expected` | 否 | 字符串 | 期望的 token 签名算法，留空时使用身份提供商返回的配置。 | `RS256` |
| 透传 Access Token | `set_access_token_header` | 否 | 开关 | 开启后，将 access token 透传到上游请求头。 | 开启 |
| 放入 Authorization | `access_token_in_authorization_header` | 否 | 开关 | 开启后，将 access token 放入 `Authorization` 请求头透传到上游。 | 关闭 |
| 透传 ID Token | `set_id_token_header` | 否 | 开关 | 开启后，将 ID token 透传到上游请求头。 | 开启 |
| 透传用户信息 | `set_userinfo_header` | 否 | 开关 | 开启后，将用户信息透传到上游请求头。 | 开启 |
| 透传 Refresh Token | `set_refresh_token_header` | 否 | 开关 | 开启后，将 refresh token 透传到上游请求头。仅在确有需要时开启。 | 关闭 |
| 会话密钥 | `session.secret` | 否 | 密码 | 用于加密浏览器会话 Cookie 的密钥，授权码流程或 standalone 模式通常需要显式配置。 | `<session_secret>` |
| 未认证处理 | `unauth_action` | 否 | 下拉选择 | 未认证请求的处理方式。 | `auth` |
| 高级配置 | `extra_config` | 否 | JSON 对象 | 直接合并到插件配置中的高级 JSON 配置，适合填写当前表单未覆盖的 APISIX 插件字段。 | `{"cache_segment":"team-a"}` |

**认证方式可选值**

- `client_secret_basic`：Basic 认证
- `client_secret_post`：表单提交密钥
- `private_key_jwt`：私钥 JWT
- `client_secret_jwt`：密钥 JWT

**未认证处理可选值**

- `auth`：发起认证
- `deny`：拒绝请求
- `pass`：放行请求

</details>


## 常见问题

### Q: 配置完路由后无法访问？

**A**: 请检查以下几点：

1. 域名是否正确解析到网关 IP
2. 组件是否正常运行
3. 组件端口是否开启对外服务
4. 防火墙是否允许访问

### Q: 如何查看当前网关 IP？

**A**: 可以通过以下方式查看：

1. 在路由配置页面，系统会提示解析的 IP 地址
2. 在平台管理 → 集群 → 集群信息中查看

### Q: 支持同一个域名配置多个路径吗？

**A**: 支持。您可以为同一个域名配置不同的路径规则，将不同路径的请求转发到不同的组件。

例如：
- `example.com/api/*` → API 服务组件
- `example.com/web/*` → Web 前端组件

### Q: WebSocket 连接超时怎么办？

**A**: WebSocket 超时通常是因为连接空闲时间过长。可以：

1. 在应用中实现心跳机制
2. 配置网关的空闲超时时间（默认 60 秒）

### Q: 如何实现灰度发布？

**A**: 可以通过以下方式实现：

1. **权重方式**：新旧版本组件设置不同权重
2. **Cookie/Header 方式**：基于特定条件路由到新版本
3. **域名方式**：使用不同域名访问不同版本

### Q: 路由配置多久生效？

**A**: 路由配置通常在 5-10 秒内生效。如果超过这个时间仍未生效，请检查配置是否正确。

## 故障排查

请阅读[应用无法访问故障排查指南](../../troubleshooting/common#4-应用组件-http-对外无法访问)。
