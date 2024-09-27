---
title: Update access policy
---

## Basic Information

Update access policy

```json title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/domains/{rule_id}
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
  "domain_path": "string",
  "rule_extensions": [
    "string"
  ],
  "whether_open": true,
  "auto_ssl": true,
  "auto_ssl_config": " string"
}

```

## request parameters

| name                             | Location | Type                                                    | required | illustrate |
| -------------------------------- | -------- | ------------------------------------------------------- | -------- | ---------- |
| app_id      | path     | integer                                                 | Yes      | App ID     |
| team_id     | path     | string                                                  | Yes      | none       |
| region_name | path     | string                                                  | Yes      | none       |
| rule_id     | path     | string                                                  | Yes      | none       |
| body                             | body     | [UpdatePostHTTPGatewayRule](#updateposthttpgatewayrule) | no       | none       |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 200         | OK                  | success    | [HTTPGatewayRule](#httpgatewayrule) |

## Model

### HTTPGatewayRule

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

| name                                                       | Type                                                         | required | constraint | Chinese name     | illustrate                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ID                                                         | integer                                                      | false    | read-only  | ID               | none                                                                                                                                  |
| rule_extensions                       | [string] | false    | read-only  |                  | none                                                                                                                                  |
| http_rule_id     | string                                                       | true     | none       | Http rule id     | http_rule_id                                                                                |
| region_id                             | string                                                       | true     | none       | Region id        | region id                                                                                                                             |
| tenant_id                             | string                                                       | true     | none       | Tenant id        | tenant id                                                                                                                             |
| service_id                            | string                                                       | true     | none       | Service id       | component id                                                                                                                          |
| service_name                          | string                                                       | true     | none       | Service name     | component name                                                                                                                        |
| domain_name                           | string                                                       | true     | none       | Domain name      | domain name                                                                                                                           |
| container_port                        | integer                                                      | false    | none       | Container port   | container port                                                                                                                        |
| protocol                                                   | string                                                       | false    | none       | Protocol         | Domain type http https httptp https http and https                                                                                    |
| certificate_id                        | integer                                                      | false    | none       | Certificate id   | Certificate ID                                                                                                                        |
| domain_type                           | string                                                       | false    | none       | Domain type      | Component domain name type                                                                                                            |
| service_alias                         | string                                                       | false    | none       | Service alias    | component alias                                                                                                                       |
| is_senior                             | boolean                                                      | false    | none       | Is senior        | Is there an advanced route                                                                                                            |
| domain_path                           | string                                                       | false    | none       | Domain path      | domain name path                                                                                                                      |
| domain_cookie                         | string                                                       | false    | none       | Domain cookies   | domain cookie                                                                                                                         |
| domain_heander                        | string                                                       | false    | none       | Domain header    | domain name heander                                                                                                                   |
| type                                                       | integer                                                      | false    | none       | Type             | Type (default：0, custom：1)                                                                                         |
| the_weight                            | integer                                                      | false    | none       | The weight       | Weights                                                                                                                               |
| is_outer_service | boolean                                                      | false    | none       | Is outer service | Whether the external port has been opened                                                                                             |
| auto_ssl                              | boolean                                                      | false    | none       | Auto ssl         | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| auto_ssl_config  | string¦null                                                  | false    | none       | Auto ssl config  | Automatic distribution certificate configuration                                                                                      |
| path_rewrite                          | boolean                                                      | false    | none       | Path rewrite     | Whether to enable simple route rewriting                                                                                              |
| rewrites                                                   | string                                                       | false    | none       | Rewrites         | Complex route rewrite configuration                                                                                                   |

### UpdatePostHTTPGatewayRule

```json
{
  "service_id": "string",
  "container_port": 0,
  "certificate_id": 0,
  "domain_name": "string",
  "domain_cookie": "string",
  "domain_header": "string" ,
  "the_weight": 0,
  "domain_path": "string",
  "rule_extensions": [
    "string"
  ],
  "whether_open": true,
  "auto_ssl": true,
  "auto_ssl_config": " string"
}
```

### Attributes

| name                                                      | Type                                                         | required | constraint | Chinese name    | illustrate                                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| service_id                           | string                                                       | true     | none       | Service id      | application component id                                                                                                              |
| container_port                       | integer                                                      | false    | none       | Container port  | bind port                                                                                                                             |
| certificate_id                       | integer                                                      | false    | none       | Certificate id  | certificate id                                                                                                                        |
| domain_name                          | string                                                       | false    | none       | Domain name     | domain name                                                                                                                           |
| domain_cookie                        | string                                                       | false    | none       | Domain cookies  | domain cookie                                                                                                                         |
| domain_header                        | string                                                       | false    | none       | Domain header   | domain header                                                                                                                         |
| the_weight                           | integer                                                      | false    | none       | The weight      | none                                                                                                                                  |
| domain_path                          | string                                                       | false    | none       | Domain path     | domain name path                                                                                                                      |
| rule_extensions                      | [string] | false    | none       |                 | rule extension                                                                                                                        |
| whether_open                         | boolean                                                      | false    | none       | Whether open    | Is it open                                                                                                                            |
| auto_ssl                             | boolean                                                      | false    | none       | Auto ssl        | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| auto_ssl_config | string                                                       | false    | none       | Auto ssl config | Automatic distribution certificate configuration                                                                                      |
