---
title: 获取应用访问策略列表
---

## 基本信息

获取应用访问策略列表

```json title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/domains
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|app_id|path|integer| 是 ||应用ID|
|team_id|path|string| 是 ||none|
|region_name|path|string| 是 ||none|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[GatewayRule](#gatewayrule)|

## 模型

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
      "tenant_id": "string",
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
      "domain_cookie": "string",
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
      "region_id": "string",
      "tenant_id": "string",
      "service_id": "string",
      "service_name": "string",
      "end_point": "string",
      "protocol": "string",
      "container_port": -2147483648,
      "service_alias": "string",
      "type": -2147483648,
      "rule_extensions": "string",
      "is_outer_service": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|http|[[HTTPGatewayRule](#schemahttpgatewayrule)]|false|none||none|
|tcp|[[TCPGatewayRule](#schematcpgatewayrule)]|false|none||none|
