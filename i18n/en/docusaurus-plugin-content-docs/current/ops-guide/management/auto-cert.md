---
title: The HTTPS certificate is automatically issued
description: Automatic HTTPS certificate issuance management document for Rainbond gateway management
keywords:
  - Certificate auto-issue
  - ACME Auto-Issuance
---

Rainbond currently supports server certificate management, which supports configuration of HTTPS access strategy.

Auto-Issuance based on LEGO is supported for Ali-cloud DNS resolution.

**Function**：

- Auto-request certificate
- Expiration automatic renewal
- Studded / Slack Notification Status

## Prerequisite

The domain name was purchased via Aliyun and the domain parse was parsed via the Ali-cloud DNS

## Auto-issue certificate installation and configuration

### Configure auto-issue certificates

Enter **Enterprise View -> Settings -> Auto-Issue Certificate**, fill in the following：

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

- where provider and env refer to[lego-dns](https://go-acme.github.io/lego/dns/)
- Ali clouk for reference to[阿里云文档获取](https://help.aliyun.com/document_detail/142101.html?spm=5176.11065259.1996646101.searchclickresult.4d8c32dBdahda)

### Install auto-issue certificate controller

Search for `rainbond-cert-controller` in \*\*Platform Admin -> Marketplace -> Open Source Store \*\* and install.

After installing into the `rainbond-cert-controller` component, modify the following environment variable：

| Variable Name                                                         | Note                                                                                                                                                          | Default value                                                                                                   | Required |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| RAINBOND_OPEN_URL           | Rainbond Console Visit Address, eg:：http://192.168.11.11:7070 | None                                                                                                            | Yes      |
| PLAYLIST_NOTIFICATION_TITLE | Access token, fetched in **Personal Center -> Access Token**                                                                                                  | None                                                                                                            | Yes      |
| ACME_EMAIL                                       | Email address                                                                                                                                                 | None                                                                                                            | optional |
| ACME_KEY_TYPE               | ACME key type                                                                                                                                                 | RSA 4096                                                                                                        | optional |
| ACME_DIR_URL                | ACME api address                                                                                                                                              | https://acme-v02.api.letssencrypt.org/directory | optional |
| ACME_SRORGE_PLAYLIST        | Used to store authentication information                                                                                                                      | /opt/rainbond-cert-controller                                                                                   | optional |
| NOTIFY_TYPE                                      | Message notification type, `dingtalk/slack`                                                                                                                   | dingtalk                                                                                                        | optional |
| DINGTALK_AK                                      | Studded robot_access_token                                                                                          | None                                                                                                            | optional |
| DINGTALK_SK                                      | Check the security setting to add pegged robots                                                                                                               | None                                                                                                            | optional |
| NOTIFY_URL                                       | Slack URL                                                                                                                                                     | None                                                                                                            | optional |
| NOTIFY_CHANNEL                                   | Slack Channel                                                                                                                                                 | None                                                                                                            | optional |

## Use Auto-Issue Certificates

Go to **Team -> App -> Gateways**,Edit Domain Route Rules：

- HTTP certificate：selects auto-issue certificate
- Auth Configuration：Select Custom Configuration

Wait a few minutes for the Rainbond gateway to automatically add a certificate.
