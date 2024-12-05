---
title: Create HTTP Gateway Policy
---

## Basic Information

Create HTTP Gateway Policy

```json title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/httpdomains
```

```json title="Body请求参数"
{
  "service_id": "string",
  "container_port": 0,
  "certificate_id": 0,
  "domain_name": "string",
  "domain_cookie": "string",
  "domain_header": "string" ,
  "the_weight": 0,
  "domain_path": "/",
  "rule_extensions": [],
  "whether_open": false,
  "auto_ssl": false,
  "auto_ssl_config": "string",
  " configuration": {
    "proxy_body_size": 0,
    "proxy_buffer_numbers": 4,
    "proxy_buffer_size": 4,
    "proxy_buffering": "off",
    "proxy_connect_timeout": 75,
    "proxy_read_timeout": 60,
    " proxy_send_timeout": 60,
    "set_headers": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  }
}
```

## request parameters

| name                             | Location | Type          | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------------- | -------- | ------------ | ---------- |
| app_id      | Path     | integer       | Yes      |              | App ID     |
| team_id     | Path     | String        | Yes      |              | none       |
| region_name | Path     | String        | Yes      |              | none       |
| body                             | body     | [Http](#http) | no       | Http         | none       |

> back to example

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 200         | OK                  | success    | [HTTPGatewayRule](#httpgatewayrule) |

## Model

### Http

```json
{
  "service_id": "string",
  "container_port": 0,
  "certificate_id": 0,
  "domain_name": "string",
  "domain_cookie": "string",
  "domain_header": "string" ,
  "the_weight": 0,
  "domain_path": "/",
  "rule_extensions": [],
  "whether_open": false,
  "auto_ssl": false,
  "auto_ssl_config": "string",
  " configuration": {
    "proxy_body_size": 0,
    "proxy_buffer_numbers": 4,
    "proxy_buffer_size": 4,
    "proxy_buffering": "off",
    "proxy_connect_timeout": 75,
    "proxy_read_timeout": 60,
    " proxy_send_timeout": 60,
    "set_headers": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  }
}

```

### Attributes

| name                                                      | Type                                                         | required | constraint | Chinese name    | illustrate                                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| service_id                           | String                                                       | true     | none       | Service id      | application component id                                                                                                              |
| container_port                       | integer                                                      | true     | none       | Container port  | bind port                                                                                                                             |
| certificate_id                       | integer                                                      | false    | none       | Certificate id  | certificate id                                                                                                                        |
| domain_name                          | String                                                       | true     | none       | Domain name     | domain name                                                                                                                           |
| domain_cookies                       | String                                                       | false    | none       | Domain cookies  | domain cookie                                                                                                                         |
| domain_header                        | String                                                       | false    | none       | Domain header   | domain header                                                                                                                         |
| the_weight                           | integer                                                      | false    | none       | The Weight      | none                                                                                                                                  |
| domain_path                          | String                                                       | false    | none       | Domain path     | domain name path                                                                                                                      |
| Rule_extensions                      | [string] | false    | none       |                 | rule extension                                                                                                                        |
| whether_open                         | boolean                                                      | false    | none       | Whether open    | Is it open                                                                                                                            |
| auto_ssl                             | boolean                                                      | false    | none       | Auto ssl        | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| auto_ssl_config | String                                                       | false    | none       | Auto ssl config | Automatic distribution certificate configuration                                                                                      |
| Configuration                                             | [Configuration](#schemaconfiguration)                        | false    | none       |                 | Advanced parameter configuration                                                                                                      |

### HTTP GatewayRule

```json
{
  "ID": 0,
  "rule_extensions": [
    "string"
  ],
  "http_rule_id": "string",
  "region_id": "string",
  "tenant_id": "string",
  " service_id": "string",
  "service_name": "string",
  "domain_name": "string",
  "container_port": -2147483648,
  "protocol": "string",
  "certificate_id": -2147483648,
  "domain_type": "string",
  "service_alias": "string",
  "is_senior": true,
  "domain_path": "string",
  "domain_cookie": "string",
  "domain_heander": "string ",
  "type": -2147483648,
  "the_weight": -2147483648,
  "is_outer_service": true,
  "auto_ssl": true,
  "auto_ssl_config": "string",
  "path_rewrite": true,
  " rewrites": "string"
}

```

### Attributes

| name                                                      | Type                                                         | required | constraint | Chinese name        | illustrate                                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ID                                                        | integer                                                      | false    | read-only  | ID                  | none                                                                                                                                  |
| Rule_extensions                      | [string] | false    | read-only  |                     | none                                                                                                                                  |
| http_rule_id    | String                                                       | true     | none       | Http rule id        | http_rule_id                                                                                |
| region_id                            | String                                                       | true     | none       | Region id           | region id                                                                                                                             |
| tenant_id                            | String                                                       | true     | none       | Tenant id           | tenant id                                                                                                                             |
| service_id                           | String                                                       | true     | none       | Service id          | component id                                                                                                                          |
| service_name                         | String                                                       | true     | none       | Service name        | component name                                                                                                                        |
| domain_name                          | String                                                       | true     | none       | Domain name         | domain name                                                                                                                           |
| container_port                       | integer                                                      | false    | none       | Container port      | container port                                                                                                                        |
| protocol                                                  | String                                                       | false    | none       | Protocol            | Domain type http https httptp https http and https                                                                                    |
| certificate_id                       | integer                                                      | false    | none       | Certificate id      | Certificate ID                                                                                                                        |
| domain_type                          | String                                                       | false    | none       | Domain type         | Component domain name type                                                                                                            |
| service_alias                        | String                                                       | false    | none       | Service alias       | component alias                                                                                                                       |
| is_senate                            | boolean                                                      | false    | none       | Is senior           | Is there an advanced route                                                                                                            |
| domain_path                          | String                                                       | false    | none       | Domain path         | domain name path                                                                                                                      |
| domain_cookies                       | String                                                       | false    | none       | Domain cookies      | domain cookie                                                                                                                         |
| domain_heander                       | String                                                       | false    | none       | Domain heander      | domain name heander                                                                                                                   |
| Type                                                      | integer                                                      | false    | none       | Type                | Type (default：0, custom：1)                                                                                         |
| the_weight                           | integer                                                      | false    | none       | The Weight          | Weights                                                                                                                               |
| is_over_service | boolean                                                      | false    | none       | Is external service | Whether the external port has been opened                                                                                             |
| auto_ssl                             | boolean                                                      | false    | none       | Auto ssl            | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| auto_ssl_config | Stringenull                                                  | false    | none       | Auto ssl config     | Automatic distribution certificate configuration                                                                                      |
| path_rewrite                         | boolean                                                      | false    | none       | Path rewrite        | Whether to enable simple route rewriting                                                                                              |
| Rewrites                                                  | String                                                       | false    | none       | Rewrites            | Complex route rewrite configuration                                                                                                   |
