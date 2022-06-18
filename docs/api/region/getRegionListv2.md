---
title: 获取全部数据中心列表v2
---


## 基础信息

获取全部数据中心列表

```json title="请求路径"
GET /openapi/v2/manage/regions
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|query|query|string| 否 ||根据数据中心名称搜索|
|current|query|string| 否 ||页码|
|pageSize|query|string| 否 ||每页数量|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ListRegionsResp](#listregionsresp)|

## 模型

### ListRegionsResp

```json
{
  "total": 0,
  "data": [
    {
      "region_id": "string",
      "enterprise_id": "string",
      "enterprise_alias": "string",
      "region_name": "string",
      "region_alias": "string",
      "region_type": [
        "string"
      ],
      "url": "string",
      "wsurl": "string",
      "httpdomain": "string",
      "tcpdomain": "string",
      "status": "st",
      "desc": "string",
      "ssl_ca_cert": "string",
      "cert_file": "string",
      "key_file": "string",
      "total_memory": 0,
      "used_memory": 0,
      "total_cpu": 0,
      "used_cpu": 0,
      "total_disk": 0,
      "used_disk": 0,
      "rbd_version": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|total|integer|true|none|Total|总数|
|data|[[RegionInfoAndStatusResp](#regioninfoandstatusresp)]|true|none||none|

### RegionInfoAndStatusResp
```json
{
  "region_id": "string",
  "enterprise_id": "string",
  "enterprise_alias": "string",
  "region_name": "string",
  "region_alias": "string",
  "region_type": [
    "string"
  ],
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "status": "st",
  "desc": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "total_memory": 0,
  "used_memory": 0,
  "total_cpu": 0,
  "used_cpu": 0,
  "total_disk": 0,
  "used_disk": 0,
  "rbd_version": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|region_id|string|true|none|Region id|region id|
|enterprise_id|string|true|none|Enterprise id|企业ID|
|enterprise_alias|string|true|none|Enterprise alias|企业别名|
|region_name|string|true|none|Region name|集群名称|
|region_alias|string|true|none|Region alias|集群别名|
|region_type|[string]|true|none||集群类型|
|url|string|true|none|Url|集群API url|
|wsurl|string|true|none|Wsurl|集群Websocket url|
|httpdomain|string|true|none|Httpdomain|集群http应用访问根域名|
|tcpdomain|string|true|none|Tcpdomain|集群tcp应用访问根域名|
|status|string|true|none|Status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|
|desc|string|true|none|Desc|集群描述|
|ssl_ca_cert|string|true|none|Ssl ca cert|api ca file|
|cert_file|string|true|none|Cert file|api cert file|
|key_file|string|true|none|Key file|api cert key file|
|total_memory|integer|true|none|Total memory|调度内存总和MB|
|used_memory|integer|true|none|Used memory|调度内存使用量MB|
|total_cpu|integer|true|none|Total cpu|调度CPU总和|
|used_cpu|number|true|none|Used cpu|调度CPU使用量|
|total_disk|integer|true|none|Total disk|全局共享存储总量GB|
|used_disk|integer|true|none|Used disk|全局共享存储使用量GB|
|rbd_version|string|true|none|Rbd version|集群版本|