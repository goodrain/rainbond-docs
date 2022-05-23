---
title: 证书管理
description: 介绍 Rainbond 管理HTTPS证书
---

Rainbond 支持上传自己的证书文件，添加证书后可在 HTTP 网关策略中为组件配置证书并强制使用 HTTPS 进行访问。

## 添加证书

如是在阿里云上购买的证书，需下载 `Nginx` 所用的证书文件。

其他平台上购买的证书根据所需下载对应的证书文件，需有 `公钥`、`私钥`。

添加步骤：

* 进入 团队 -> 网关 -> 证书管理 -> 添加证书，填写相关证书密钥内容。

如密钥不对，则添加不会通过，Rainbond 会校验你的证书是否正确。

成功添加后会展示如下证书信息：

|          | 介绍                   |
| -------- | ---------------------- |
| 证书名称 | 自定义的名称           |
| 证书地址 | 证书签发的域名         |
| 过期时间 | 证书过期的时间         |
| 证书类型 | 服务端证书或客户端证书 |
| 证书来源 | 第三方签发或自动签发   |
| 操作     | 编辑证书               |

## 使用证书

在网关策略内 -> 编辑策略 -> 更多高级路由参数 -> 选择 HTTPS 证书，如下图：

![](https://static.goodrain.com/docs/5.6/use-manual/team-manage/gateway/certs.png)



## 自动签发证书

参考 [自动签发证书配置](/docs/use-manual/enterprise-manage/enterprise-settings/base/cert-management)
