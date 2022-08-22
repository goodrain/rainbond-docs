---
title: Automatically issue certificates
description: Rainbond gateway management HTTPs certificate automatic issuance management document
---

Rainbond currently supports server-side certificate management to support configuring HTTPS access policies.

### Preconditions

1. Purchase or self-sign a certificate for a specified domain name. The certificate must be of a type supported by nginx.

## Operating procedures

1. Go to the _Team View/Gateway/Certificate Management_ page, you can check the added certificate, the expiration time of the certificate and the domain name issued on the page.
2. Click Add Certificate, upload the purchased or issued certificate, and confirm the addition.
3. Enter the access policy management. When adding an access policy, select the certificate added in the previous step in the advanced routing parameters to complete the policy addition. It should be noted that the domain name of the policy must match the domain name issued by the certificate.

### HTTPS certificate is automatically issued

**function**：

- Apply for a certificate automatically
- Automatic renewal upon expiration
- DingTalk/Slack notification application status

#### Configure Rainbond Console Profile

* Enterprise View > Setting > Automatically Issuing Certificate > Configuring Certificate

```shell
{
    "aliyun_hongyaa":{
        "provider":"alidns",
        "env":{
            "ALICLOUD_POLLING_INTERVAL":"2",
            "ALICLOUD_SECRET_KEY":"ali sk",
            "ALICLOUD_PROPAGATION_TIMEOUT":"300",
            "ALICLOUD_ACCESS_KEY":"ali ak"
        }
    }
}
#Multiple, split.
```

* where provider and env reference[lego-dns](https://go-acme.github.io/lego/dns/)

* For Alibaba Cloud ak sk, please refer to[Cloud Documentation to obtain AK](https://help.aliyun.com/document_detail/142101.html?spm=5176.11065259.1996646101.searchclickresult.4d8c32ddBdahDa)

  > For other manufacturers, please refer to their official documentation

#### Install Certificate Issuance Controller

* Install the certificate issuance controller from the rainbond community open source store

  Create components based on app marketplaces

  ![Create an issuance controller](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/install-https-cert/install-rainbond-cert-controller.png)

* Installation environment variable description：

  ```shell
  RAINBOND_OPENAPI_URL Rainbond console access address #must be
  RAINBOND_API_KEY rainbond openapi key #must #personal center > access token > add
  ACME_EMAIL let's encrypt email
  ACME_KEY_TYPE optional, default is RSA4096
  ACME_DIR_URL optional, default is https://acme -v02.api.letsencrypt.org/directory
  ACME_SRORAGE_PATH optional, used to store authentication information, default /opt/rainbond-cert-controller/storage
  DINGTALK_AK optional, used for nail notification
  DINGTALK_SK optional, used for nail pin notification
  ```

* Modify the required environment variables when done.

#### Sign the controller with a certificate

* Reference document [Accessing components that provide HTTP services through domain names](/docs/use-manual/team-manage/gateway/rules/domain)

  > Need to modify the https certificate to：to automatically issue a certificate
  > 
  > Authentication Configuration：Select the desired configuration
  > 
  > After waiting for a few seconds, the controller issues the certificate to complete the automatic matching of the certificate.
