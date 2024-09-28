---
title: Create a gateway policy
---

## 基本信息

This interface is mainly used to create gateway policies

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/domains
```

```json title="Body 请求体示例"
{
  "protocol": "string",
  "tcp": {
    "container_port": 3,
    "service_id": "string",
    "end_point": "string",
    "rule_extensions": [
      {
        "key": "string",
        "value": "string"
      }
    ],
    "default_port": 3,
    "default_ip": "string"
  },
  "http": {
    "service_id": "string",
    "container_port": 3,
    "certificate_id": 0,
    "domain_name": "string",
    "domain_cookie": "string",
    "domain_header": "string",
    "the_weight": 3,
    "domain_path": "/",
    "rule_extensions": [
      "string"
    ],
    "whether_open": false,
    "auto_ssl": false,
    "auto_ssl_config": "string",
    "configuration ": {
      "proxy_body_size": 0,
      "proxy_buffer_numbers": 4,
      "proxy_buffer_size": 4,
      "proxy_buffering": "off",
      "proxy_connect_timeout": 75,
      "proxy_read_timeout": 60,
      "proxy_send_timeout" ": 60,
      "set_headers": [
        {
          "key": "string",
          "value": "string"
        }
      ]
    }
  }
}
```

## request parameters

| name                             | Location | type                                      | required | Chinese name | illustrate |
| -------------------------------- | -------- | ----------------------------------------- | -------- | ------------ | ---------- |
| team_id     | path     | string                                    | Yes      |              | none       |
| region_name | path     | string                                    | Yes      |              | none       |
| app_id      | path     | string                                    | Yes      |              | none       |
| body                             | body     | [PostGatewayRule](#schemapostgatewayrule) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                        |
| ----------- | ------------------- | ---------- | --------------------------------- |
| 200         | OK                  | success    | [GatewayRule](#schemagatewayrule) |

## return data structure

```json title="响应示例"
{
  "http": [
    {
      "ID": 3,
      "rule_extensions": [
        "string"
      ],
      "http_rule_id": "string",
      "region_id": "string",
      "tenant_id ": "string",
      "service_id": "string",
      "service_name": "string",
      "domain_name": "string",
      "container_port": 3,
      "protocol": "string",
      "certificate_id": 3,
      "domain_type": "string",
      "service_alias": "string",
      "is_senior": true,
      "domain_path": "string",
      "domain_cookie": "string",
      "domain_heander": "string",
      "type": 3,
      "the_weight": 3,
      "is_outer_service": true,
      "auto_ssl": true,
      "auto_ssl_config": "string",
      "path_rewrite": true,
      "rewrites": "string"
    }
  ],
  "tcp": [
    {
      "ID": 3,
      "tcp_rule_id": "string",
      "region_id": "string",
      " tenant_id": "string",
      "service_id": "string",
      "service_name": "string",
      "end_point": "string",
      "protocol": "string",
      "container_port": 3,
      "service_alias": "string",
      "type": 3,
      "rule_extensions": "string",
      "is_outer_service": true
    }
  ]
}
```

## Model

### PostGatewayRule<a id="schemapostgatewayrule"></a>

```json
{
  "protocol": "string",
  "tcp": {
    "container_port": 0,
    "service_id": "string",
    "end_point": "string",
    "rule_extensions": [
      {
        "key": "string",
        "value": "string"
      }
    ],
    "default_port": 0,
    "default_ip": "string"
  },
  "http": {
    "service_id": "string",
    "container_port": 0,
    "certificate_id": 0,
    "domain_name": "string",
    "domain_cookie": "string",
    "domain_header": "string",
    "the_weight": 0,
    "domain_path": "/",
    "rule_extensions": [],
    "whether_open": false,
    "auto_ssl": false,
    "auto_ssl_config": "string",
    "configuration": {
      " proxy_body_size": 0,
      "proxy_buffer_numbers": 4,
      "proxy_buffer_size": 4,
      "proxy_buffering": "off",
      "proxy_connect_timeout": 75,
      "proxy_read_timeout": 60,
      "proxy_send_timeout": 60,
      "set_headers": [
        {
          "key": "string",
          "value": "string"
        }
      ]
    }
  }
}
```

### Attributes

| name     | type                | required | constraint | Chinese name | illustrate |
| -------- | ------------------- | -------- | ---------- | ------------ | ---------- |
| protocol | string              | true     | none       | Protocol     | 协议         |
| tcp      | [tcp](#schematcp)   | false    | none       |              | none       |
| http     | [Http](#schemahttp) | false    | none       |              | none       |

### tcp<a id="schematcp"></a>

```json
{
  "container_port": 0,
  "service_id": "string",
  "end_point": "string",
  "rule_extensions": [
    {
      "key": "string",
      "value": "string "
    }
  ],
  "default_port": 0,
  "default_ip": "string"
}
```

### Attributes

| name                                 | type                                                                                                                      | required | constraint | Chinese name   | illustrate                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | -------------- | -------------------------------- |
| container_port  | integer                                                                                                                   | true     | none       | Container port | component port                   |
| service_id      | string                                                                                                                    | true     | none       | Service id     | component id                     |
| end_point       | string                                                                                                                    | true     | none       | End point      | ip address: port |
| rule_extensions | [[PostTCPGatewayRuleExtensions](#schemaposttcpgatewayruleextensions)] | false    | none       |                | rule extension                   |
| default_port    | integer                                                                                                                   | true     | none       | Default port   | map port                         |
| default_ip      | string                                                                                                                    | true     | none       | Default ip     | map id address                   |

### PostTCPGatewayRuleExtensions<a id="schemaposttcpgatewayruleextensions"></a>

```json
{
  "key": "string",
  "value": "string"
}
```

### Attributes

| name  | type   | required | constraint | Chinese name | illustrate |
| ----- | ------ | -------- | ---------- | ------------ | ---------- |
| key   | string | true     | none       | Key          | none       |
| value | string | true     | none       | Value        | none       |

### Http<a id="schemahttp"></a>

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

| name                                                      | type                                                         | required | constraint | Chinese name    | illustrate                                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| service_id                           | string                                                       | true     | none       | Service id      | application component id                                                                                                              |
| container_port                       | integer                                                      | true     | none       | Container port  | bind port                                                                                                                             |
| certificate_id                       | integer                                                      | false    | none       | Certificate id  | certificate id                                                                                                                        |
| domain_name                          | string                                                       | true     | none       | Domain name     | domain name                                                                                                                           |
| domain_cookie                        | string                                                       | false    | none       | Domain cookies  | domain cookie                                                                                                                         |
| domain_header                        | string                                                       | false    | none       | Domain header   | domain header                                                                                                                         |
| the_weight                           | integer                                                      | false    | none       | The weight      | none                                                                                                                                  |
| domain_path                          | string                                                       | false    | none       | Domain path     | domain name path                                                                                                                      |
| rule_extensions                      | [string] | false    | none       |                 | rule extension                                                                                                                        |
| whether_open                         | boolean                                                      | false    | none       | Whether open    | Is it open                                                                                                                            |
| auto_ssl                             | boolean                                                      | false    | none       | Auto ssl        | Whether to automatically match the certificate and upgrade to https, if enabled, the upgrade will be completed by an external service |
| auto_ssl_config | string                                                       | false    | none       | Auto ssl config | Automatic distribution certificate configuration                                                                                      |
| configuration                                             | [Configuration](#schemaconfiguration)                        | false    | none       |                 | Advanced parameter configuration                                                                                                      |

### Configuration<a id="schemaconfiguration"></a>

```json
{
  "proxy_body_size": 0,
  "proxy_buffer_numbers": 4,
  "proxy_buffer_size": 4,
  "proxy_buffering": "off",
  "proxy_connect_timeout": 75,
  "proxy_read_timeout": 60,
  "proxy_send_timeout": 60,
  "set_headers": [
    {
      "key": "string",
      "value": "string"
    }
  ]
}
```

### Attributes

| name                                                            | type                                                                                  | required | constraint | Chinese name          | illustrate                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------- | ---------- | --------------------- | ----------------------------- |
| proxy_body_size       | integer                                                                               | false    | none       | Proxy body size       | request body size             |
| proxy_buffer_numbers  | integer                                                                               | false    | none       | Proxy buffer numbers  | number of buffers             |
| proxy_buffer_size     | integer                                                                               | false    | none       | Proxy buffer size     | buffer size                   |
| proxy_buffering                            | string                                                                                | false    | none       | Proxy buffering       | Whether to enable ProxyBuffer |
| proxy_connect_timeout | integer                                                                               | false    | none       | Proxy connect timeout | connection timeout            |
| proxy_read_timeout    | integer                                                                               | false    | none       | Proxy read timeout    | read timeout                  |
| proxy_send_timeout    | integer                                                                               | false    | none       | Proxy send timeout    | send timeout                  |
| set_headers                                | [[HTTPHeader](#schemahttpheader)] | true     | none       |                       | none                          |

### HTTPHeader<a id="schemahttpheader"></a>

```json
{
  "key": "string",
  "value": "string"
}
```

### Attributes

| name  | type   | required | constraint | Chinese name | illustrate           |
| ----- | ------ | -------- | ---------- | ------------ | -------------------- |
| key   | string | true     | none       | Key          | Request header Key   |
| value | string | true     | none       | Value        | Request header Value |
