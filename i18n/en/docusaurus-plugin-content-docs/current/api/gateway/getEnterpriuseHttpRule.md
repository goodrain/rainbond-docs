---
title: Get the list of enterprise application http access policies
---

## Basic information

Get the list of enterprise application http access policies

```json title="请求路径"
GET /openapi/v1/httpdomains
```

## request parameters

| name                          | Location | Type   | required | Chinese name | illustrate                                                                                    |
| ----------------------------- | -------- | ------ | -------- | ------------ | --------------------------------------------------------------------------------------------- |
| auto_ssl | query    | string | no       |              | The query condition, whether it is a policy that needs to automatically match the certificate |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

Status code **200**

| name                                                         | Type                                                    | required | constraint | Chinese name     | illustrate                                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------- | -------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                                                  | [EnterpriseHTTPGatewayRule](#enterprisehttpgatewayrule) | false    | none       |                  | none                                                                                                                                  |
| » ID                                                         | integer                                                 | false    | read-only  | ID               | none                                                                                                                                  |
| » region_name                           | string                                                  | true     | none       | Region name      | ID of the cluster to which it belongs                                                                                                 |
| » team_name                             | string                                                  | true     | none       | Team name        | Unique team name                                                                                                                      |
| » app_id                                | integer                                                 | true     | none       | App id           | App ID                                                                                                                                |
| » auto_ssl_config  | string                                                  | true     | none       | Auto ssl config  | automatic issuance method                                                                                                             |
| » http_rule_id     | string                                                  | true     | none       | Http rule id     | http_rule_id                                                                                |
| » region_id                             | string                                                  | true     | none       | Region id        | region id                                                                                                                             |
| » tenant_id                             | string                                                  | true     | none       | Tenant id        | tenant id                                                                                                                             |
| » service_id                            | string                                                  | true     | none       | Service id       | component id                                                                                                                          |
| » service_name                          | string                                                  | true     | none       | Service name     | component name                                                                                                                        |
| » domain_name                           | string                                                  | true     | none       | Domain name      | domain name                                                                                                                           |
| » container_port                        | integer                                                 | false    | none       | Container port   | container port                                                                                                                        |
| » protocol                                                   | string                                                  | false    | none       | Protocol         | Domain type http https httptp https http and https                                                                                    |
| » certificate_id                        | integer                                                 | false    | none       | Certificate id   | Certificate ID                                                                                                                        |
| » domain_type                           | string                                                  | false    | none       | Domain type      | Component domain name type                                                                                                            |
| » service_alias                         | string                                                  | false    | none       | Service alias    | component alias                                                                                                                       |
| » is_senior                             | boolean                                                 | false    | none       | Is senior        | Is there an advanced route                                                                                                            |
| » domain_path                           | string                                                  | false    | none       | Domain path      | domain name path                                                                                                                      |
| » domain_cookie                         | string                                                  | false    | none       | Domain cookies   | domain cookie                                                                                                                         |
| » domain_heander                        | string                                                  | false    | none       | Domain header    | domain name heander                                                                                                                   |
| » type                                                       | integer                                                 | false    | none       | Type             | Type (default：0, custom：1)                                                                                         |
| » the_weight                            | integer                                                 | false    | none       | The weight       | Weights                                                                                                                               |
| » rule_extensions                       | string                                                  | false    | none       | Rule extensions  | extensions                                                                                                                            |
| » is_outer_service | boolean                                                 | false    | none       | Is outer service | Whether the external port has been opened                                                                                             |
| » auto_ssl                              | boolean                                                 | false    | none       | Auto ssl         | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| » path_rewrite                          | boolean                                                 | false    | none       | Path rewrite     | Whether to enable simple route rewriting                                                                                              |
| » rewrites                                                   | string                                                  | false    | none       | Rewrites         | Complex route rewrite configuration                                                                                                   |

## Model

### EnterpriseHTTPGatewayRule

```json
{
  "ID": 0,
  "region_name": "string",
  "team_name": "string",
  "app_id": 0,
  "auto_ssl_config": "string",
  "http_rule_id": "string" ,
  "region_id": "string",
  "tenant_id": "string",
  "service_id": "string",
  "service_name": "string",
  "domain_name": "string",
  "container_port" : -2147483648,
  "protocol": "string",
  "certificate_id": -2147483648,
  "domain_type": "string",
  "service_alias": "string",
  "is_senior": true,
  "domain_path" : "string",
  "domain_cookie": "string",
  "domain_heander": "string",
  "type": -2147483648,
  "the_weight": -2147483648,
  "rule_extensions": "string",
  " is_outer_service": true,
  "auto_ssl": true,
  "path_rewrite": true,
  "rewrites": "string"
}

```

### Attributes

| name                                                       | Type    | required | constraint | Chinese name     | illustrate                                                                                                                            |
| ---------------------------------------------------------- | ------- | -------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ID                                                         | integer | false    | read-only  | ID               | none                                                                                                                                  |
| region_name                           | string  | true     | none       | Region name      | ID of the cluster to which it belongs                                                                                                 |
| team_name                             | string  | true     | none       | Team name        | Unique team name                                                                                                                      |
| app_id                                | integer | true     | none       | App id           | App ID                                                                                                                                |
| auto_ssl_config  | string  | true     | none       | Auto ssl config  | automatic issuance method                                                                                                             |
| http_rule_id     | string  | true     | none       | Http rule id     | http_rule_id                                                                                |
| region_id                             | string  | true     | none       | Region id        | region id                                                                                                                             |
| tenant_id                             | string  | true     | none       | Tenant id        | tenant id                                                                                                                             |
| service_id                            | string  | true     | none       | Service id       | component id                                                                                                                          |
| service_name                          | string  | true     | none       | Service name     | component name                                                                                                                        |
| domain_name                           | string  | true     | none       | Domain name      | domain name                                                                                                                           |
| container_port                        | integer | false    | none       | Container port   | container port                                                                                                                        |
| protocol                                                   | string  | false    | none       | Protocol         | Domain type http https httptp https http and https                                                                                    |
| certificate_id                        | integer | false    | none       | Certificate id   | Certificate ID                                                                                                                        |
| domain_type                           | string  | false    | none       | Domain type      | Component domain name type                                                                                                            |
| service_alias                         | string  | false    | none       | Service alias    | component alias                                                                                                                       |
| is_senior                             | boolean | false    | none       | Is senior        | Is there an advanced route                                                                                                            |
| domain_path                           | string  | false    | none       | Domain path      | domain name path                                                                                                                      |
| domain_cookie                         | string  | false    | none       | Domain cookies   | domain cookie                                                                                                                         |
| domain_heander                        | string  | false    | none       | Domain heander   | domain name heander                                                                                                                   |
| type                                                       | integer | false    | none       | Type             | Type (default：0, custom：1)                                                                                         |
| the_weight                            | integer | false    | none       | The weight       | Weights                                                                                                                               |
| rule_extensions                       | string  | false    | none       | Rule extensions  | extensions                                                                                                                            |
| is_outer_service | boolean | false    | none       | Is outer service | Whether the external port has been opened                                                                                             |
| auto_ssl                              | boolean | false    | none       | Auto ssl         | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| path_rewrite                          | boolean | false    | none       | Path rewrite     | Whether to enable simple route rewriting                                                                                              |
| Rewrites                                                   | string  | false    | none       | Rewrites         | Complex route rewrite configuration                                                                                                   |
