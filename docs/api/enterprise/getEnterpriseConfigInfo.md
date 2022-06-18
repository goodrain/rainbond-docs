---
title: 获取企业配置信息
---


## 基本信息

获取企业配置信息

```json title="请求路径"
GET /openapi/v1/configs
```

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[EnterpriseConfigSeralizer](#enterpriseconfigseralizer)|


## 模型

### EnterpriseConfigSeralizer

```json
{
  "export_app": {
    "enable": false,
    "value": "string"
  },
  "auto_ssl": {
    "enable": false,
    "value": "string"
  },
  "oauth_services": {
    "enable": false,
    "value": [
      {
        "enable": true,
        "auth_url": "string",
        "name": "string",
        "is_console": false,
        "is_auto_login": false,
        "service_id": 0,
        "oauth_type": "string",
        "eid": "string",
        "home_url": "string",
        "access_token_url": "string",
        "api_url": "string",
        "is_deleted": false,
        "is_git": false
      }
    ]
  },
  "cloud_market": {
    "enable": false,
    "value": "string"
  },
  "object_storage": {
    "enable": false,
    "value": {
      "provider": "string",
      "endpoint": "string",
      "access_key": "string",
      "secret_key": "string",
      "bucket_name": "string"
    }
  },
  "appstore_image_hub": {
    "enable": false,
    "value": {
      "namespace": "string",
      "hub_password": "string",
      "hub_url": "string",
      "hub_user": "string"
    }
  },
  "newbie_guide": {
    "enable": false,
    "value": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|export_app|[Export app](#schemaexport%20app)|false|none||none|
|auto_ssl|[Auto ssl](#schemaauto%20ssl)|false|none||none|
|oauth_services|[Oauth services](#schemaoauth%20services)|false|none||none|
|cloud_market|[Cloud market](#schemacloud%20market)|false|none||none|
|object_storage|[Object storage](#schemaobject%20storage)|false|none||none|
|appstore_image_hub|[Appstore image hub](#schemaappstore%20image%20hub)|false|none||none|
|newbie_guide|[Newbie guide](#schemanewbie%20guide)|false|none||none|
