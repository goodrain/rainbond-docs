---
title: Get the list of enterprise application http access policies
---

## Basic Information

Get the list of enterprise application http access policies

```json title="请求路径"
GET /openapi/v1/httpomains
```

## request parameters

| name                          | Location | Type   | required | Chinese name | illustrate                                                                                    |
| ----------------------------- | -------- | ------ | -------- | ------------ | --------------------------------------------------------------------------------------------- |
| auto_ssl | Query    | String | no       |              | The query condition, whether it is a policy that needs to automatically match the certificate |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

Status code **200**

| name                                                         | Type                                                  | required | constraint | Chinese name        | illustrate                                                                                                                            |
| ------------------------------------------------------------ | ----------------------------------------------------- | -------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                                                  | [EnterpriseHTTPGatewayRule](#enterprisehttpgewayrule) | false    | none       |                     | none                                                                                                                                  |
| » ID                                                         | integer                                               | false    | read-only  | ID                  | none                                                                                                                                  |
| » region_name                           | String                                                | true     | none       | Region name         | ID of the cluster to which it belongs                                                                                                 |
| » team_name                             | String                                                | true     | none       | Team name           | Unique team name                                                                                                                      |
| » app_id                                | integer                                               | true     | none       | App id              | App ID                                                                                                                                |
| » auto_ssl_config  | String                                                | true     | none       | Auto ssl config     | automatic issuance method                                                                                                             |
| » http_rule_id     | String                                                | true     | none       | Http rule id        | http_rule_id                                                                                |
| » region_id                             | String                                                | true     | none       | Region id           | region id                                                                                                                             |
| » tenant_id                             | String                                                | true     | none       | Tenant id           | tenant id                                                                                                                             |
| » service_id                            | String                                                | true     | none       | Service id          | component id                                                                                                                          |
| » service_name                          | String                                                | true     | none       | Service name        | component name                                                                                                                        |
| » domain_name                           | String                                                | true     | none       | Domain name         | domain name                                                                                                                           |
| » Container_port                        | integer                                               | false    | none       | Container port      | container port                                                                                                                        |
| » protocol                                                   | String                                                | false    | none       | Protocol            | Domain type http https httptp https http and https                                                                                    |
| » certificate_id                        | integer                                               | false    | none       | Certificate id      | Certificate ID                                                                                                                        |
| » domain_type                           | String                                                | false    | none       | Domain type         | Component domain name type                                                                                                            |
| » service_alias                         | String                                                | false    | none       | Service alias       | component alias                                                                                                                       |
| » is_senior                             | boolean                                               | false    | none       | Is senior           | Is there an advanced route                                                                                                            |
| » domain_path                           | String                                                | false    | none       | Domain path         | domain name path                                                                                                                      |
| » domain_cookie                         | String                                                | false    | none       | Domain cookies      | domain cookie                                                                                                                         |
| » domain_heander                        | String                                                | false    | none       | Domain heander      | domain name heander                                                                                                                   |
| » Type                                                       | integer                                               | false    | none       | Type                | Type (default：0, custom：1)                                                                                         |
| » the_weight                            | integer                                               | false    | none       | The Weight          | Weights                                                                                                                               |
| » Rule_extensions                       | String                                                | false    | none       | Rule extensions     | extensions                                                                                                                            |
| » is_outer_service | boolean                                               | false    | none       | Is external service | Whether the external port has been opened                                                                                             |
| » auto_ssl                              | boolean                                               | false    | none       | Auto ssl            | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| » path_rewrite                          | boolean                                               | false    | none       | Path rewrite        | Whether to enable simple route rewriting                                                                                              |
| » Rewrites                                                   | String                                                | false    | none       | Rewrites            | Complex route rewrite configuration                                                                                                   |

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

| name                                                      | Type    | required | constraint | Chinese name        | illustrate                                                                                                                            |
| --------------------------------------------------------- | ------- | -------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ID                                                        | integer | false    | read-only  | ID                  | none                                                                                                                                  |
| region_name                          | String  | true     | none       | Region name         | ID of the cluster to which it belongs                                                                                                 |
| team_name                            | String  | true     | none       | Team name           | Unique team name                                                                                                                      |
| app_id                               | integer | true     | none       | App id              | App ID                                                                                                                                |
| auto_ssl_config | String  | true     | none       | Auto ssl config     | automatic issuance method                                                                                                             |
| http_rule_id    | String  | true     | none       | Http rule id        | http_rule_id                                                                                |
| region_id                            | String  | true     | none       | Region id           | region id                                                                                                                             |
| tenant_id                            | String  | true     | none       | Tenant id           | tenant id                                                                                                                             |
| service_id                           | String  | true     | none       | Service id          | component id                                                                                                                          |
| service_name                         | String  | true     | none       | Service name        | component name                                                                                                                        |
| domain_name                          | String  | true     | none       | Domain name         | domain name                                                                                                                           |
| container_port                       | integer | false    | none       | Container port      | container port                                                                                                                        |
| protocol                                                  | String  | false    | none       | Protocol            | Domain type http https httptp https http and https                                                                                    |
| certificate_id                       | integer | false    | none       | Certificate id      | Certificate ID                                                                                                                        |
| domain_type                          | String  | false    | none       | Domain type         | Component domain name type                                                                                                            |
| service_alias                        | String  | false    | none       | Service alias       | component alias                                                                                                                       |
| is_senate                            | boolean | false    | none       | Is senior           | Is there an advanced route                                                                                                            |
| domain_path                          | String  | false    | none       | Domain path         | domain name path                                                                                                                      |
| domain_cookies                       | String  | false    | none       | Domain cookies      | domain cookie                                                                                                                         |
| domain_heander                       | String  | false    | none       | Domain heander      | domain name heander                                                                                                                   |
| Type                                                      | integer | false    | none       | Type                | Type (default：0, custom：1)                                                                                         |
| the_weight                           | integer | false    | none       | The Weight          | Weights                                                                                                                               |
| Rule_extensions                      | String  | false    | none       | Rule extensions     | extensions                                                                                                                            |
| is_over_service | boolean | false    | none       | Is external service | Whether the external port has been opened                                                                                             |
| auto_ssl                             | boolean | false    | none       | Auto ssl            | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| path_rewrite                         | boolean | false    | none       | Path rewrite        | Whether to enable simple route rewriting                                                                                              |
| Rewrites                                                  | String  | false    | none       | Rewrites            | Complex route rewrite configuration                                                                                                   |
