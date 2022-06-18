---
title: 获取全部数据中心列表
---

## 基础信息

获取全部数据中心列表

```json title="请求路径"
GET /openapi/v1/regions
```

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|Inline|

## 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[RegionInfoResp](#regioninforesp)|false|none||none|
|» region_id|string|false|none|Region id|region id|
|» region_name|string|true|none|Region name|集群名称|
|» region_alias|string|true|none|Region alias|集群别名|
|» url|string|true|none|Url|集群API url|
|» wsurl|string|false|none|Wsurl|集群Websocket url|
|» httpdomain|string|false|none|Httpdomain|集群http应用访问根域名|
|» tcpdomain|string|false|none|Tcpdomain|集群tcp应用访问根域名|
|» status|string|true|none|Status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|
|» desc|string|true|none|Desc|集群描述|
|» scope|string|false|none|Scope|数据中心范围 private|public|
|» ssl_ca_cert|string¦null|false|none|Ssl ca cert|api ca file|
|» cert_file|string¦null|false|none|Cert file|api cert file|
|» key_file|string¦null|false|none|Key file|api cert key file|


## 模型

### RegionInfoResp

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "status": "st",
  "desc": "string",
  "scope": "private",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|region_id|string|false|none|Region id|region id|
|region_name|string|true|none|Region name|集群名称|
|region_alias|string|true|none|Region alias|集群别名|
|url|string|true|none|Url|集群API url|
|wsurl|string|false|none|Wsurl|集群Websocket url|
|httpdomain|string|false|none|Httpdomain|集群http应用访问根域名|
|tcpdomain|string|false|none|Tcpdomain|集群tcp应用访问根域名|
|status|string|true|none|Status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|
|desc|string|true|none|Desc|集群描述|
|scope|string|false|none|Scope|数据中心范围 private|public|
|ssl_ca_cert|string¦null|false|none|Ssl ca cert|api ca file|
|cert_file|string¦null|false|none|Cert file|api cert file|
|key_file|string¦null|false|none|Key file|api cert key file|