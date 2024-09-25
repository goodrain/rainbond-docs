---
title: Certificate management
description: Introducing Rainbond to manage HTTPS certificates
---

Rainbond supports uploading your own certificate file. After adding the certificate, you can configure the certificate for the component in the HTTP gateway policy and force the use of HTTPS for access.

## Add certificate

If you purchased a certificate on Alibaba Cloud, you need to download the certificate file used by `Nginx`.

Certificates purchased on other platforms need to download the corresponding certificate files according to the needs, and need to have `public key`,`private key`.

add step：

- Enter Team -> Gateway -> Certificate Management -> Add Certificate, and fill in the content of the relevant certificate key.

If the key is incorrect, the addition will not pass, and Rainbond will verify whether your certificate is correct.

After successful addition, the following certificate information will be displayed:：

|                     | introduce                                  |
| ------------------- | ------------------------------------------ |
| certificate name    | custom name                                |
| Certificate address | Domain name issued by the certificate      |
| 过期时间                | when the certificate expires               |
| Certificate type    | Server certificate or client certificate   |
| Certificate source  | Third-party issued or automatically issued |
| operate             | Edit certificate                           |

## use certificate

In Gateway Policy -> Edit Policy -> More Advanced Routing Parameters -> Select HTTPS Certificate, as shown in Figure：below

![](https://static.goodrain.com/docs/5.6/use-manual/team-manage/gateway/certs.png)

## Automatically issue certificates

Reference [Automatically issue certificate configuration](/docs/ops-guide/management/auto-cert)
