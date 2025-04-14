---
title: Custom domain name and configure HTTPS
description: "Achieve production-level HTTPS configuration in three steps: domain name binding, certificate management, and security hardening"
keywords:
  - HTTPS Configuration Guide
  - Secure Domain Management
  - SSL Certificate Deployment
---

This tutorial will demonstrate the core capabilities of Rainbond gateway management:

- **Out of the box**: No additional configuration required, use directly.
- **Automatic domain name resolution**: Supports dynamic binding of custom domain names.
- **Multi-protocol support**: Simultaneously supports HTTP/HTTPS and WebSocket protocols

## Prerequisites

- Completed [Rainbond Quick Installation](/docs/quick-start/quick-install).

## Bind a custom domain name

### 🚀 Highlights

- **Wildcard domain name support**: `*.example.com` matches all subdomains.
- **Multi-tenant isolation**: Different teams have independent domain name spaces.

### 🧩 Operation process

1. **Deploy components using container images**
    1. Enter the target team view and create a new application.
    2. Select Build from Image ➡️ Container.
        - Customize the application name.
        - Image address：`registry.cn-hangzhou.aliyuncs.com/goodrain/nginx:alpine`

2. **Bind a custom domain name**
    1. Enter the application view ➡️ Gateway management ➡️ Add route.
        - Domain name：`demo.example.rainbond.com`.
        - Select the component created above.
    2. Resolve the domain name `demo.example.rainbond.com` to the Rainbond gateway IP, such as: `192.168.1.1`.
    3. Access the custom domain name, expected result: `Welcome to nginx!`.

![](/docs/tutorial/custom-gateway/gateway-en.png)

## Configure HTTPS secure access

### 🚀 Highlights

- **Automatic certificate matching**: Automatically matches certificates based on domain names, supports wildcard domain names.
- **Wildcard domain name support**: `*.example.com` matches all subdomains.

### 🧩 Operation process

- Enter the application view ➡️ Gateway management ➡️ Certificate management ➡️ Add certificate.
    - Domain name：`demo.example.rainbond.com`.

<details>

<summary>Public key certificate</summary>

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
<summary>Private key certificate</summary>

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
After adding the certificate, Rainbond will automatically bind the certificate to the domain name.
:::

Access using [https://demo.example.rainbond.com](https://demo.example.rainbond.com).

- The browser will prompt an unsafe certificate, click to continue accessing.
- View certificate information in the browser.

> You can add the corresponding resolution in your local hosts and use the above domain name and certificate for testing.

