---
title: 获取指定数据中心数据
---

## 基础信息

获取指定数据中心数据

```json title="请求路径"
GET /openapi/v1/regions/{region_id}
```


## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|region_id|path|string| 是 ||none|
|region_id|query|string| 否 ||数据中心名称、id|
|extend_info|query|string| 否 ||是否需要额外数据|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[RegionInfoR](#regioninfor)|

## 模型

### RegionInfoR

```json
{
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "desc": "string",
  "used_disk": 0,
  "total_disk": 0,
  "used_memory": 0,
  "total_memory": 0,
  "used_cpu": 0,
  "total_cpu": 0,
  "health_status": "string",
  "status": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|region_name|string|true|none|Region name|数据中心名|
|region_alias|string|true|none|Region alias|数据中心昵称|
|url|string|true|none|Url|none|
|wsurl|string|true|none|Wsurl|none|
|httpdomain|string|true|none|Httpdomain|none|
|tcpdomain|string|true|none|Tcpdomain|none|
|scope|string|true|none|Scope|none|
|ssl_ca_cert|string|true|none|Ssl ca cert|none|
|cert_file|string|true|none|Cert file|none|
|key_file|string|true|none|Key file|none|
|desc|string|true|none|Desc|none|
|used_disk|number|false|none|Used disk|使用的存储|
|total_disk|number|false|none|Total disk|全部存储|
|used_memory|number|false|none|Used memory|使用内存|
|total_memory|number|false|none|Total memory|全部内存|
|used_cpu|number|false|none|Used cpu|使用cpu|
|total_cpu|number|false|none|Total cpu|全部cpu|
|health_status|string|false|none|Health status|集群状态|
|status|string|false|none|Status|状态|