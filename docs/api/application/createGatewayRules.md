---
title: 创建网关策略
---

## 基本信息
该接口主要用于创建网关策略

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
    "configuration": {
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
  }
}
```

## 请求参数

| 名称        | 位置 | 类型                                      | 必选 | 中文名 | 说明 |
| ----------- | ---- | ----------------------------------------- | ---- | ------ | ---- |
| team_id     | path | string                                    | 是   |        | none |
| region_name | path | string                                    | 是   |        | none |
| app_id      | path | string                                    | 是   |        | none |
| body        | body | [PostGatewayRule](#schemapostgatewayrule) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                          |
| ------ | ------------------------------------------------------- | ---- | --------------------------------- |
| 200    | OK | 成功 | [GatewayRule](#schemagatewayrule) |

## 返回数据结构

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
      "tenant_id": "string",
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
      "tenant_id": "string",
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

## 模型

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
  }
}
```

### 属性

| 名称     | 类型                | 必选  | 约束 | 中文名   | 说明 |
| -------- | ------------------- | ----- | ---- | -------- | ---- |
| protocol | string              | true  | none | Protocol | 协议 |
| tcp      | [Tcp](#schematcp)   | false | none |          | none |
| http     | [Http](#schemahttp) | false | none |          | none |

### Tcp<a id="schematcp"></a>

```json
{
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
}
```

### 属性

| 名称            | 类型                                                         | 必选  | 约束 | 中文名         | 说明        |
| --------------- | ------------------------------------------------------------ | ----- | ---- | -------------- | ----------- |
| container_port  | integer                                                      | true  | none | Container port | 组件端口    |
| service_id      | string                                                       | true  | none | Service id     | 组件id      |
| end_point       | string                                                       | true  | none | End point      | ip地址:端口 |
| rule_extensions | [[PostTCPGatewayRuleExtensions](#schemaposttcpgatewayruleextensions)] | false | none |                | 规则扩展    |
| default_port    | integer                                                      | true  | none | Default port   | 映射端口    |
| default_ip      | string                                                       | true  | none | Default ip     | 映射id地址  |

### PostTCPGatewayRuleExtensions<a id="schemaposttcpgatewayruleextensions"></a>

```json
{
  "key": "string",
  "value": "string"
}
```

### 属性

| 名称  | 类型   | 必选 | 约束 | 中文名 | 说明 |
| ----- | ------ | ---- | ---- | ------ | ---- |
| key   | string | true | none | Key    | none |
| value | string | true | none | Value  | none |

### Http<a id="schemahttp"></a>

```json
{
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
}
```

### 属性

| 名称            | 类型                                  | 必选  | 约束 | 中文名          | 说明                                                        |
| --------------- | ------------------------------------- | ----- | ---- | --------------- | ----------------------------------------------------------- |
| service_id      | string                                | true  | none | Service id      | 应用组件id                                                  |
| container_port  | integer                               | true  | none | Container port  | 绑定端口                                                    |
| certificate_id  | integer                               | false | none | Certificate id  | 证书id                                                      |
| domain_name     | string                                | true  | none | Domain name     | 域名                                                        |
| domain_cookie   | string                                | false | none | Domain cookie   | 域名cookie                                                  |
| domain_header   | string                                | false | none | Domain header   | 域名header                                                  |
| the_weight      | integer                               | false | none | The weight      | none                                                        |
| domain_path     | string                                | false | none | Domain path     | 域名路径                                                    |
| rule_extensions | [string]                              | false | none |                 | 规则扩展                                                    |
| whether_open    | boolean                               | false | none | Whether open    | 是否开放                                                    |
| auto_ssl        | boolean                               | false | none | Auto ssl        | 是否自动匹配证书，升级为https，如果开启，由外部服务完成升级 |
| auto_ssl_config | string                                | false | none | Auto ssl config | 自动分发证书配置                                            |
| configuration   | [Configuration](#schemaconfiguration) | false | none |                 | 高级参数配置                                                |

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

### 属性

| 名称                  | 类型                              | 必选  | 约束 | 中文名                | 说明                |
| --------------------- | --------------------------------- | ----- | ---- | --------------------- | ------------------- |
| proxy_body_size       | integer                           | false | none | Proxy body size       | 请求主体大小        |
| proxy_buffer_numbers  | integer                           | false | none | Proxy buffer numbers  | 缓冲区数量          |
| proxy_buffer_size     | integer                           | false | none | Proxy buffer size     | 缓冲区大小          |
| proxy_buffering       | string                            | false | none | Proxy buffering       | 是否开启ProxyBuffer |
| proxy_connect_timeout | integer                           | false | none | Proxy connect timeout | 连接超时时间        |
| proxy_read_timeout    | integer                           | false | none | Proxy read timeout    | 读超时时间          |
| proxy_send_timeout    | integer                           | false | none | Proxy send timeout    | 发送超时时间        |
| set_headers           | [[HTTPHeader](#schemahttpheader)] | true  | none |                       | none                |

### HTTPHeader<a id="schemahttpheader"></a>

```json
{
  "key": "string",
  "value": "string"
}
```

### 属性

| 名称  | 类型   | 必选 | 约束 | 中文名 | 说明        |
| ----- | ------ | ---- | ---- | ------ | ----------- |
| key   | string | true | none | Key    | 请求头Key   |
| value | string | true | none | Value  | 请求头Value |
