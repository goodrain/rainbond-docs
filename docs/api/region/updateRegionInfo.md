---
title: 更新指定数据中心元数据
---


## 基础信息

更新指定数据中心元数据

```json title="请求路径"
PUT /openapi/v2/manage/regions/{region_id}
```

```json title="Body请求参数"
{
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

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|region_id|path|string| 是 ||none|
|body|body|[UpdateRegionReq](#updateregionreq)| 否 ||none|

> 返回示例

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[v2_RegionInfoSerializer](#v2_regioninfoserializer)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|400|[Fail](#schemafail)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|404|[Fail](#schemafail)|


## 模型

### UpdateRegionReq

```json
{
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