---
title: Get a list of app access policies
---

## Basic Information

Get a list of app access policies

```json title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/domains
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------- | -------- | ------------ | ---------- |
| app_id      | Path     | integer | Yes      |              | App ID     |
| team_id     | Path     | String  | Yes      |              | none       |
| region_name | Path     | String  | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                  |
| ----------- | ------------------- | ---------- | --------------------------- |
| 200         | OK                  | success    | [GatewayRule](#gatewayrule) |

## Model

### GatewayRule

```json
{
  "http": [
    {
      "ID": 0,
      "rule_extensions": [
        "string"
      ],
      "http_rule_id": "string",
      "region_id": "string",
      "tenant_id ": "string",
      "service_id": "string",
      "service_name": "string",
      "domain_name": "string",
      "container_port": -2147483648,
      "protocol": "string",
      "certificate_id": -2147483648,
      "domain_type": "string",
      "service_alias": "string",
      "is_senior": true,
      "domain_path": "string",
      "domain_cookie": "string" ,
      "domain_heander": "string",
      "type": -2147483648,
      "the_weight": -2147483648,
      "is_outer_service": true,
      "auto_ssl": true,
      "auto_ssl_config": "string",
      "path_rewrite": true,
      "rewrites": "string"
    }
  ],
  "tcp": [
    {
      "ID": 0,
      "tcp_rule_id": "string",
      "region_id": "string ",
      "tenant_id": "string",
      "service_id": "string",
      "service_name": "string",
      "end_point": "string",
      "protocol": "string",
      "container_port ": -2147483648,
      "service_alias": "string",
      "type": -2147483648,
      "rule_ extensions": "string",
      "is_outer_service": true
    }
  ]
}

```

### Attributes

| name                            | type                                                                                          | required | constraint | Chinese name | illustrate |
| ------------------------------- | --------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| country_pc | [[HTTPGatewayRule](#schemahttpgewayrule)] | false    | none       |              | none       |
| tcp                             | [[TCPGatewayRule](#schematcpgatewayrule)] | false    | none       |              | none       |
