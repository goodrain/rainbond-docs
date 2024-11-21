---
title: Get enterprise configuration information
---

## Basic Information

Get enterprise configuration information

```json title="请求路径"
GET /openapi/v1/configs
```

## return result

| status code | Status code meaning | illustrate | data model                                              |
| ----------- | ------------------- | ---------- | ------------------------------------------------------- |
| 200         | OK                  | success    | [EnterpriseConfigSeralizer](#enterpriseconconfigalizer) |

## Model

### Enterprise ConfigSerializer

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
        "access_token_url": "string ",
        "api_url": "string",
        "is_deleted": false,
        "is_git": false
      }
    ]
  },
  "cloud_market": {
    "enable": false,
    "value": " string"
  },
  "object_storage": {
    "enable": false,
    "value": {
      "provider": "string",
      "endpoint": "string",
      "access_key": "string" ,
      "secret_key": "string",
      "bucket_name": "string"
    }
  },
  "appstore_image_hub": {
    "enable": false,
    "value": {
      "namespace": "string" ,
      "hub_password": "string",
      "hub_url": "string",
      "hub_user": "string"
    }
  },
  "newbie_guide": {
    "enable": false,
    "value ": "string"
  }
}

```

### Attributes

| name                                                         | type                                                | required | constraint | Chinese name | illustrate |
| ------------------------------------------------------------ | --------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| export_app                              | [Export app](#schemaexport%20app)                   | false    | none       |              | none       |
| auto_ssl                                | [Auto ssl](#schemaauto%20ssl)                       | false    | none       |              | none       |
| oauth_services                          | [Oauth services](#schemaoauth%20services)           | false    | none       |              | none       |
| cloud_market                            | [Cloud market](#schemacloud%20market)               | false    | none       |              | none       |
| object_store                            | [Object storage](#schemaobject%20storage)           | false    | none       |              | none       |
| appstore_image_hub | [Appstore image hub](#schemaappstore%20image%20hub) | false    | none       |              | none       |
| newbie_guide                            | [Newbie guide](#schemanewbie%20guide)               | false    | none       |              | none       |
