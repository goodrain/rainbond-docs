---
title: 自动签发证书
description: Rainbond网关管理之HTTPs证书自动签发管理文档
---

Rainbond 目前支持服务端证书管理，用于支持配置 HTTPS 访问策略。

### 前提条件

1. 购买或自签发一个指定域名的证书，该证书必须是 nginx 支持的类型。

## 操作流程

1. 进入 _团队视图/网关/证书管理_ 页面，页面中可以查询到已经添加的证书和证书的过期时间和签发域名。
2. 点击添加证书，将购买或签发的证书进行上传，确认添加即可。
3. 进入访问策略管理，添加访问策略时在高级路由参数选择上一步添加的证书  完成策略添加，需要注意的是策略的域名与证书签发的域名必须匹配。

### https证书自动签发

**功能**：

- 自动申请证书
- 到期自动续期
- 钉钉/Slack通知申请状态

#### 配置Rainbond控制台配置文件

* 企业视图 > 设置 > 自动签发证书 > 配置证书

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
#多个以,分割。
```

* 其中provider和env参考[lego-dns](https://go-acme.github.io/lego/dns/)

* 阿里云 ak sk 获取请参考[阿里云文档获取AK](https://help.aliyun.com/document_detail/142101.html?spm=5176.11065259.1996646101.searchclickresult.4d8c32ddBdahDa)

  > 其他厂商请参考各自官方文档

#### 安装证书签发控制器

* 从rainbond社区开源商店安装证书签发控制器

  基于应用市场创建组件

  ![创建签发控制器](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/install-https-cert/install-rainbond-cert-controller.png)

* 安装环境变量说明：

  ```shell
  RAINBOND_OPENAPI_URL Rainbond控制台访问地址 #必须
  RAINBOND_API_KEY rainbond openapi key #必须  #个人中心 > 访问令牌 > 新增
  ACME_EMAIL let's encrypt email
  ACME_KEY_TYPE 可选，默认为RSA4096
  ACME_DIR_URL 可选，默认为https://acme-v02.api.letsencrypt.org/directory
  ACME_SRORAGE_PATH 可选，用于存放认证信息，默认/opt/rainbond-cert-controller/storage
  DINGTALK_AK 可选，用于钉钉通知
  DINGTALK_SK 可选，用于钉钉通知
  ```

* 完成后修改所需环境变量。

#### 使用证书签发控制器

* 参考文档 [通过域名访问提供HTTP服务的组件](/docs/use-manual/team-manage/gateway/rules/domain)

  > 需要修改 https证书为：自动签发证书
  >
  > 认证配置：选择所需配置
  >
  > 等待数秒后，控制器签发证书完成自动匹配证书。
