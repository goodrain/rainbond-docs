---
title: 添加数据中心v2
---


## 基础信息

添加数据中心

```json title="请求路径"
POST /openapi/v2/manage/regions
```

```json title="Body请求参数"
{
  "cert_file": "string",
  "desc": "string",
  "httpdomain": "string",
  "key_file": "string",
  "region_alias": "string",
  "region_name": "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "status": 0,
  "tcpdomain": "string",
  "url": "string",
  "wsurl": "string"
}
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 | AddRegionRequest|none|
|» cert_file|body|string| 否 ||none|
|» desc|body|string| 否 ||none|
|» httpdomain|body|string| 是 ||none|
|» key_file|body|string| 否 ||none|
|» region_alias|body|string| 是 ||none|
|» region_name|body|string| 是 ||none|
|» scope|body|string| 否 ||none|
|» ssl_ca_cert|body|string| 否 ||none|
|» status|body|integer| 否 ||none|
|» tcpdomain|body|string| 是 ||none|
|» url|body|string| 是 ||none|
|» wsurl|body|string| 是 ||none|

> 返回示例

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|成功|[v2_RegionInfoSerializer](#v2_regioninfoserializer)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|400|[Fail](#schemafail)|

## 模型

### v2_RegionInfoSerializer
 
```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "token": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "status": "st",
  "desc": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|region_id|string|true|none|Region id|region id|
|region_name|string|true|none|Region name|数据中心名称,不可修改|
|region_alias|string|true|none|Region alias|数据中心别名|
|url|string|true|none|Url|数据中心API url|
|token|string¦null|false|none|Token|数据中心token|
|wsurl|string|true|none|Wsurl|数据中心Websocket url|
|httpdomain|string|true|none|Httpdomain|数据中心http应用访问根域名|
|tcpdomain|string|true|none|Tcpdomain|数据中心tcp应用访问根域名|
|scope|string|false|none|Scope|数据中心范围 private|public|
|ssl_ca_cert|string¦null|false|none|Ssl ca cert|数据中心访问ca证书地址|
|cert_file|string¦null|false|none|Cert file|验证文件|
|key_file|string¦null|false|none|Key file|验证的key|
|status|string|true|none|Status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|
|desc|string|false|none|Desc|数据中心描述|
