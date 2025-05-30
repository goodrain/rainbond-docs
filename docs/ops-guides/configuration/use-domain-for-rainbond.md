---
title: 配置域名访问
description: 本文介绍如何配置域名访问 Rainbond 控制台
keywords:
- Rainbond 域名配置
- Rainbond HTTPS 配置
- Rainbond WebSocket 配置
---

## 概述

默认情况下，Rainbond 控制台通过 `IP:7070` 访问。为了提供更好的访问体验，您可以配置以下访问方式：

- HTTP 域名访问：`http://控制台域名`
- HTTPS 域名访问：`https://控制台域名`
- WebSocket 域名访问：用于 Web 终端、日志推送等功能

## 配置 HTTP 域名访问

### 第一步：添加第三方组件

1. 进入平台：`应用市场 → 添加组件 → 第三方组件`
2. 选择组件注册方式：**静态注册**
3. 填写组件信息：
   - 组件地址：`http://<当前IP>:7070`
   - 其他选项保持默认

### 第二步：配置端口

1. 进入组件：`端口` 页面
2. 添加端口配置：
   - 端口号：`7070`
   - 开启对内和对外端口

### 第三步：配置健康检测

1. 进入组件：`更多设置` 页面
2. 添加健康检测：
   - 端口：`7070`
   - 其他选项保持默认

### 第四步：绑定域名

1. 进入应用视图 - 网关管理页面
2. 添加域名：
   - 填写您的域名
   - 绑定组件

## 配置 WebSocket 支持

为了支持 Web 终端、实时日志等功能，需要配置 WebSocket：

1. **添加 WebSocket 端口**
   - 按照上述步骤添加 6060 端口
   - 在网关中绑定域名
   - 开启域名的 WebSocket 支持

2. **修改 WebSocket 地址**
   ```bash
   # 进入：平台管理 → 集群 → 编辑集群
   # 修改 WebSocket 地址：
   ws://您配置的域名  # HTTP 域名
   ```

## 配置 HTTPS 访问

如果您需要通过 HTTPS 访问控制台，请按以下步骤操作：

1. **准备证书**
   - 准备好域名对应的证书文件
   - 包含证书文件和私钥文件

2. **配置证书**
   - 进入应用：`网关` 页面
   - 添加证书：
     * 上传证书文件
     * 上传私钥文件
     * 证书会自动绑定到对应域名

3. **更新 WebSocket 地址**
   ```bash
   # 进入：平台管理 → 集群 → 编辑集群
   # 修改 WebSocket 地址：
   wss://您配置的域名  # HTTPS 域名
   ```

## 验证配置

1. **验证 HTTP/HTTPS 访问**
   - 使用配置的域名访问控制台
   - 确认页面能正常加载
   - 检查证书是否生效（HTTPS）

2. **验证 WebSocket 功能**
   - 测试 Web 终端功能
   - 查看实时日志推送
   - 确认这些功能正常工作

## 常见问题

1. **域名无法访问**
   - 检查域名解析是否正确
   - 确认网关配置是否正确
   - 验证端口是否开放

2. **HTTPS 证书问题**
   - 确认证书格式正确
   - 检查证书是否过期
   - 验证证书与域名是否匹配

3. **WebSocket 连接失败**
   - 检查 WebSocket 地址配置
   - 确认网关 WebSocket 功能已开启
   - 验证 6060 端口是否正常

:::tip
建议配置 HTTPS 访问以提升安全性，特别是在生产环境中。
:::
