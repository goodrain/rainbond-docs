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
<summary><b>limit-count</b></summary>

基于固定时间窗口的请求计数限流，可以限制指定时间内的请求数量。

**配置参数**

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| count | 是 | 数字 | 时间窗口内允许的请求数量 | 100 |
| time_window | 是 | 数字 | 时间窗口大小（秒） | 60 |
| key_type | 是 | 下拉选择 | 限流粒度类型 | var（变量） |
| key | 是 | 字符串 | 限流键，根据此值区分不同的限流对象 | remote_addr（客户端IP） |
| rejected_code | 是 | 数字 | 超过限流后返回的 HTTP 状态码 | 503 |
| rejected_msg | 否 | 字符串 | 超过限流后返回的错误消息 | "请求过于频繁，请稍后再试" |
| policy | 是 | 下拉选择 | 限流策略 | local（本地限流） |
| show_limit_quota_header | 否 | 开关 | 是否在响应头中显示限流配额信息 | 开启/关闭 |

**key_type 可选值**

- `var`：使用 Nginx 变量，如 `remote_addr`（客户端IP）、`http_x_forwarded_for`（代理IP）
- `constant`：使用常量值，对所有请求统一限流

**policy 可选值**

- `local`：本地限流，仅在当前网关节点生效
- `redis`：分布式限流，需要配置 Redis（适用于多网关节点场景）

</details>

<details>
<summary><b>limit-conn</b></summary>

限制同一时刻的并发连接数，防止服务器过载。

**配置参数**

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| conn | 是 | 数字 | 允许的最大并发连接数 | 10 |
| burst | 否 | 数字 | 允许的突发连接数（超出 conn 但可以排队的数量） | 5 |
| default_conn_delay | 否 | 数字 | 默认的连接延迟时间（秒） | 1 |
| only_use_default_delay | 否 | 开关 | 是否只使用默认延迟 | 关闭 |
| key_type | 是 | 下拉选择 | 限流粒度类型 | var |
| key | 是 | 字符串 | 限流键 | remote_addr |
| rejected_code | 是 | 数字 | 超过限制后返回的 HTTP 状态码 | 503 |
| rejected_msg | 否 | 字符串 | 超过限制后返回的错误消息 | "连接数过多" |
| allow_degradation | 否 | 开关 | 是否允许降级（当限流失败时放行请求） | 关闭 |

**key_type 可选值**

- `var`：使用 Nginx 变量，如 `remote_addr`（客户端IP）、`http_x_forwarded_for`（代理IP）
- `constant`：使用常量值，对所有连接统一限制

</details>

<details>
<summary><b>proxy-rewrite</b></summary>

在将请求转发到后端服务前，重写请求的 URI、请求方法、请求头等信息。

**配置参数**

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| uri | 否 | 字符串 | 重写后的 URI | /new/path |
| method | 否 | 下拉选择 | 重写后的请求方法 | GET/POST/PUT/DELETE |
| regex_uri | 否 | 字符串数组 | 使用正则表达式重写 URI | ["^/api/v1/(.*)", "/$1"] |
| host | 否 | 字符串 | 重写后的 Host 头 | backend.example.com |
| headers.add | 否 | 键值对 | 添加请求头 | X-Custom-Header: value |
| headers.set | 否 | 键值对 | 设置（覆盖）请求头 | X-Real-IP: $remote_addr |
| headers.remove | 否 | 字符串数组 | 删除请求头 | ["X-Forwarded-For"] |
| use_real_request_uri_unsafe | 否 | 开关 | 使用原始请求 URI（不安全） | 关闭 |

**method 可选值**

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

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| allow_origins | 是 | 字符串 | 允许的源（Origin），`*` 表示允许所有 | * 或 https://example.com |
| allow_methods | 是 | 字符串 | 允许的 HTTP 方法 | * 或 GET,POST,PUT |
| allow_headers | 是 | 字符串 | 允许的请求头 | * 或 Content-Type,Authorization |
| expose_headers | 否 | 字符串 | 暴露给客户端的响应头 | X-Custom-Header |
| max_age | 否 | 数字 | 预检请求的缓存时间（秒） | 5 |
| allow_credentials | 否 | 开关 | 是否允许发送凭证（Cookie） | 关闭 |
| allow_origins_by_regex | 否 | 字符串数组 | 使用正则表达式匹配允许的源 | ["https://.*\\.example\\.com"] |
| allow_origins_by_metadata | 否 | 字符串数组 | 基于元数据匹配允许的源 | - |

</details>

<details>
<summary><b>real-ip</b></summary>

从代理服务器的请求头中提取客户端的真实 IP 地址，适用于应用部署在 CDN、负载均衡器或多层代理后的场景。

**配置参数**

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| source | 是 | 字符串 | IP 来源字段名 | arg_realip 或 http_x_forwarded_for |
| trusted_addresses | 否 | 字符串数组 | 受信任的代理服务器地址列表（CIDR 格式） | ["10.0.0.0/8", "192.168.0.0/16"] |
| recursive | 否 | 开关 | 是否递归查找真实 IP | 关闭 |

**source 可选值**

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

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| max_body_size | 是 | 数字 | 最大请求体大小（MB），0 表示不限制 | 10 |

</details>

<details>
<summary><b>redirect</b></summary>

将请求重定向到其他 URL，支持 HTTP 到 HTTPS 的自动重定向、固定 URL 重定向和正则表达式重定向。

**配置参数**

| 参数名称 | 必填 | 类型 | 说明 | 示例值 |
|---------|------|------|------|--------|
| http_to_https | 否 | 开关 | 是否将 HTTP 请求自动重定向到 HTTPS | 关闭 |
| uri | 否 | 字符串 | 重定向的目标 URI | https://www.example.com |
| regex_uri | 否 | 字符串数组 | 使用正则表达式匹配并重定向 | ["^/old/(.*)", "/new/$1"] |
| ret_code | 否 | 数字 | 重定向的 HTTP 状态码 | 302 |
| encode_uri | 否 | 开关 | 是否对重定向 URI 进行 URL 编码 | 关闭 |
| append_query_string | 否 | 开关 | 是否将原始查询字符串附加到重定向 URI | 关闭 |

**ret_code 可选值**

| 状态码 | 名称 | 说明 | 使用场景 |
|--------|------|------|----------|
| 301 | Moved Permanently | 永久重定向，会被浏览器和搜索引擎缓存 | 域名迁移、URL 永久变更 |
| 302 | Found | 临时重定向（默认值），不会被缓存 | 临时跳转、测试环境 |
| 307 | Temporary Redirect | 临时重定向，保持请求方法不变 | POST 请求临时跳转 |
| 308 | Permanent Redirect | 永久重定向，保持请求方法不变 | POST 请求永久跳转 |

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