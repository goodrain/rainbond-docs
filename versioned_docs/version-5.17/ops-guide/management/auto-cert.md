---
title: HTTPS 证书自动签发
description: Rainbond 网关管理之 HTTPS 证书自动签发管理文档
keywords:
- 证书自动签发
- ACME 自动签发
---

Rainbond 目前支持服务端证书管理，用于支持配置 HTTPS 访问策略。

基于 LEGO 实现了证书的自动签发，目前支持阿里云 DNS 解析。

**功能**：

- 自动申请证书
- 到期自动续期
- 钉钉/Slack通知申请状态

## 前提条件

域名是通过阿里云购买的，且域名解析是通过阿里云 DNS 解析的。

## 自动签发证书的安装与配置

### 配置自动签发证书

进入 **企业视图 -> 设置 -> 自动签发证书**，填写以下内容：

```json
{
    "aliyun_test":{
        "provider":"alidns",
        "env":{
            "ALICLOUD_POLLING_INTERVAL":"2",
            "ALICLOUD_SECRET_KEY":"ali sk",
            "ALICLOUD_PROPAGATION_TIMEOUT":"300",
            "ALICLOUD_ACCESS_KEY":"ali ak"
        }
    }
}
```

* 其中 provider 和 env 参考[lego-dns](https://go-acme.github.io/lego/dns/)
* 阿里云 ak sk 获取请参考[阿里云文档获取](https://help.aliyun.com/document_detail/142101.html?spm=5176.11065259.1996646101.searchclickresult.4d8c32ddBdahDa)

### 安装自动签发证书控制器

在 **平台管理 -> 应用市场 -> 开源应用商店** 中搜索 `rainbond-cert-controller` 并安装。

安装后进入到 `rainbond-cert-controller` 组件内，修改以下环境变量：

| 变量名               | 说明                                                    | 默认值                                         | 必须 |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------- | ---- |
| RAINBOND_OPENAPI_URL | Rainbond 控制台访问地址，例如：http://192.168.1.11:7070 | 无                                             | 是   |
| RAINBOND_API_KEY     | 访问令牌，在**个人中心 -> 访问令牌 ** 中获取            | 无                                             | 是   |
| ACME_EMAIL           | 邮箱地址                                                | 无                                             | 可选 |
| ACME_KEY_TYPE        | ACME key 类型                                           | RSA4096                                        | 可选 |
| ACME_DIR_URL         | ACME api 地址                                           | https://acme-v02.api.letsencrypt.org/directory | 可选 |
| ACME_SRORAGE_PATH    | 用于存放认证信息                                        | /opt/rainbond-cert-controller/storage          | 可选 |
| NOTIFY_TYPE          | 消息通知类型，`dingtalk/slack`                          | dingtalk                                       | 可选 |
| DINGTALK_AK          | 钉钉机器人的 access_token                               | 无                                             | 可选 |
| DINGTALK_SK          | 添加钉钉机器人时，勾选安全设置的`加签`                  | 无                                             | 可选 |
| NOTIFY_URL           | Slack URL 地址                                          | 无                                             | 可选 |
| NOTIFY_CHANNEL       | Slack 通道                                              | 无                                             | 可选 |


## 使用自动签发证书

进入到 **团队 -> 应用内 -> 网关**，编辑域名路由规则：

* HTTPs证书：选择自动签发证书
* 认证配置：选择自定义的配置

等待几分钟后，Rainbond 网关会自动添加上证书。