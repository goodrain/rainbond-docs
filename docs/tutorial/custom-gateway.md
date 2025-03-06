---
title: 自定义域名并配置 HTTPS
description: 通过三步实现生产级 HTTPS 配置：域名绑定、证书管理、安全加固
keywords:
- HTTPS 配置指南
- 安全域名管理
- SSL 证书部署
---

本教程将演示 Rainbond 网关管理的核心能力：
- **开箱即用**：不需要任何额外配置，直接使用。
- **域名自动解析**：支持动态绑定自定义域名。
- **多协议支持**：同时支持 HTTP/HTTPS 与 WebSocket 协议

## 前提

- 已完成 [Rainbond 快速安装](/docs/quick-start/quick-install)。

## 一、绑定自定义域名

### 🚀 亮点

- **通配符域名支持**：`*.example.com` 匹配所有子域名。
- **多租户隔离**：不同团队独立域名空间。

### 🧩 操作流程

1. **使用容器镜像部署组件**
    1. 进入目标团队视图，创建新应用。
    2. 选择从镜像构建 ➡️ 容器。
        - 自定义应用名称。
        - 镜像地址：`registry.cn-hangzhou.aliyuncs.com/goodrain/nginx:alpine`

2. **绑定自定义域名**
    1. 进入应用视图 ➡️ 网关管理 ➡️ 新增路由。
        - 域名：`demo.example.rainbond.com`。
        - 选择上面创建的组件。
    2. 解析域名 `demo.example.rainbond.com` 到 Rainbond 网关 IP 上，如：`192.168.1.1`。
    3. 访问自定义域名，预期结果：`Welcome to nginx!`。

![](/docs/tutorial/custom-gateway/gateway.png)

## 二、配置 HTTPS 安全访问

### 🚀 亮点

- **自动匹配证书**：根据域名自动匹配证书，支持通配符域名。
- **通配符域名支持**：`*.example.com` 匹配所有子域名。

### 🧩 操作流程

- 进入应用视图 ➡️ 网关管理 ➡️ 证书管理 ➡️ 添加证书。
    - 域名：`demo.example.rainbond.com`。

<details>
<summary>公钥证书</summary>

```bash
-----BEGIN CERTIFICATE-----
MIIDODCCAiCgAwIBAgIRAOc7NBTTjptMR3YGoG2njyUwDQYJKoZIhvcNAQELBQAw
gYoxEjAQBgNVBAMMCWxkZGdvLm5ldDEMMAoGA1UECwwDZGV2MQ4wDAYDVQQKDAVs
ZGRnbzELMAkGA1UEBhMCQ04xIzAhBgkqhkiG9w0BCQEWFGxlY2hlbmdhZG1pbkAx
MjYuY29tMREwDwYDVQQHDAhzaGFuZ2hhaTERMA8GA1UECAwIc2hhbmdoYWkwHhcN
MjUwMjI3MDg1NzAwWhcNMjcwMjI3MDg1NzAwWjAkMSIwIAYDVQQDDBlkZW1vLmV4
YW1wbGUucmFpbmJvbmQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAjTna6IavHIvzpBxjGRMRspyHU8M4oQ4EWrt8Jz3NBi2FNf8/jaOXaDb3fn5T
2iLV9TzUw+iCg4nlmtnQFbCXMEGVmXNQ46yunUppy6bYyEfh2iw4OwVJszU/PhmT
JEQ4uTudnw3kdaiUW3Tomf7XaXxnJStFn7VV0Ho6NGk5hJPwFnL1f1qcZf1EHzam
B3hkNrebftdWwy5HHoCHrX3YfvL0xA2neswBg1Hip8lKgOeMsj1evMBlBNRS8v7d
qGVN1RQ4E3TunQFRkYHrPzwcGCgpMKbxNaDytBhq3OVOeveHaPwY9aUqAUtUIxzN
2UP87MX3JzCjBaiUugbmuKx2hwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQArpvB/
x5OmZqUzIba+D0yLACYF+wA1Dsr53mBZ1xCOHXxgnSGMrOSMkt8YbmjjJ35s7tQM
9fgZYtum86RJgk99Eve6nsAM3aSZ4lekUZdBR8jY5GvmoQp6hp1nLCktd1hdoBF2
AafXQ92Rl66CXawHbcDuNq+QkvDjANTj9rCPZWROlZsK8ebKZSA+SWlpIBpKDM5g
1u+Nt7rKz3beCf/ScE9WPrAdo4goUvfRScMlE8AUWYzIqLuMrVCQS34fySC4v/iI
FBjC9TyoEizqi/cPyJ0XWZXDtgWie9NLWDLNaR2ltqzAVueZml4QvxrMLDqgp7Rn
U6VLQSN6NTjNzZHu
-----END CERTIFICATE-----
```

</details>


<details>
<summary>私钥证书</summary>

```bash
-----BEGIN RSA PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNOdrohq8ci/Ok
HGMZExGynIdTwzihDgRau3wnPc0GLYU1/z+No5doNvd+flPaItX1PNTD6IKDieWa
2dAVsJcwQZWZc1DjrK6dSmnLptjIR+HaLDg7BUmzNT8+GZMkRDi5O52fDeR1qJRb
dOiZ/tdpfGclK0WftVXQejo0aTmEk/AWcvV/Wpxl/UQfNqYHeGQ2t5t+11bDLkce
gIetfdh+8vTEDad6zAGDUeKnyUqA54yyPV68wGUE1FLy/t2oZU3VFDgTdO6dAVGR
ges/PBwYKCkwpvE1oPK0GGrc5U5694do/Bj1pSoBS1QjHM3ZQ/zsxfcnMKMFqJS6
Bua4rHaHAgMBAAECggEASaBq/yUQcCqKd/mQtIbbiCnQ55t0j4qWPJNYE8FFfT4I
H/GVuYsbKWrWtuy3XJciwrrXFdfHCzq+KG/76wLon3DhxGF5P2lMk5Yy98hhZnEL
T0oUeri0Bqjw8rg0nQiwJentr/l3LNwZlGCrz3Ur6sO/poIbxzqrpYfDhoWBRhtw
AxkV3kIyk4ai/PEHzNoTpV76TSyOZHb0r7bHcUiXlyrCfQbGVjCrTESTM/pEV+yj
WL/whpquWjqklEt8kkVr3Zgpf8up7wK+qEs99eU49C4uICIZq7kQh37iCkFuX+2Z
+c+Cbh8gX8dpwDKY9gECX+j6YMFE6d4w3Xxt8k+r8QKBgQDE702cL+612OovBxAD
wtGUwIIQubOxKiuVBQ2qXXEd/N3n0rsBOendC1FkbaQR3gWHJAUDKACxSBSUJd7C
SZbKiy7UoDxwmx88O6aXR3BTq1TpiY8LW1IkYavQQi8uzMsEwHGsKyu9zevGYxND
4RGgHxITf1+h/4aE3B7AmpCdvwKBgQC3lTgWkEEp+qjsWkm9GZ9Z/UBTjk80ZEZh
/5aUokfmDKuf54FsTk12g2gY7EOBA3C3Z5vMLvPjcYQH2OF9/1QTOLkIEg4nTD4B
UoQLcD7wHjByaay7h0EVyEPRUHiazcFhu5VTLSuX3F7j8MgVEqNsVC1q0RSzxEHa
6Vad37ppOQKBgC15SIWBN/C7ps+3JMaJjNV5Yk80Yj7NiwS9BvvI2d7fzenC6jWN
RugoveGfw5vwlXwwIAwrh4VoLIBNAlQApBYe73Bfk7U4zIyfBYe3EkPvswq+Hc60
hpIqD39mWPjIhzSQr27fBRmt2/ySUheBeA1uP0FLTyzcERbKsTsuNaiHAoGAGT0o
kuGOM+lEJApdrOPC5qpMl7Au73MBwiNTXmfZHqWLStaXEn7JY4u5WgPRXAFPE8fo
wW+LFC/dCP8mMR5TPrlDpvpke76dn6zqfnAWFwjvfCtPFhEIP6hiunonupCjD36s
jtzc62nemdPWjh8b3J7OB6tq/zPyIdiGkfnaNPECgYBxTsMamlvI1S3mjqsEXo9U
oHDba6b8tGnVZvHYerMUwgXZuvkmzZD3+DsOFNG/pTAQfrERhQmxymE7YnDwL5AH
bW16ypsllRzVWEXB69yzO9M4nw8I5Gt18dCrHR/t2GBbmQgmJCSeix7G3iUTWiD9
AycFKgRmGX9GFTafZcJfYw==
-----END RSA PRIVATE KEY-----
```

</details>


:::tip
当添加证书后，Rainbond 会自动将证书绑定到域名上。
:::

使用 [https://demo.example.rainbond.com](https://demo.example.rainbond.com) 访问。
- 浏览器会提示不安全的证书，点击继续访问。
- 在浏览器中查看证书信息。

> 你可以在你的本地 hosts 中添加对应的解析并使用上述的域名和证书进行测试。

