---
title: 获取企业应用http访问策略列表
---

## 基本信息

获取企业应用http访问策略列表

```json title="请求路径"
GET /openapi/v1/httpdomains
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|auto_ssl|query|string| 否 ||查询条件，是否为需要自动匹配证书的策略|



## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|Inline|

## 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[EnterpriseHTTPGatewayRule](#enterprisehttpgatewayrule)|false|none||none|
|» ID|integer|false|read-only|ID|none|
|» region_name|string|true|none|Region name|所属集群ID|
|» team_name|string|true|none|Team name|所属团队唯一名称|
|» app_id|integer|true|none|App id|所属应用ID|
|» auto_ssl_config|string|true|none|Auto ssl config|自动签发方式|
|» http_rule_id|string|true|none|Http rule id|http_rule_id|
|» region_id|string|true|none|Region id|region id|
|» tenant_id|string|true|none|Tenant id|租户id|
|» service_id|string|true|none|Service id|组件id|
|» service_name|string|true|none|Service name|组件名|
|» domain_name|string|true|none|Domain name|域名|
|» container_port|integer|false|none|Container port|容器端口|
|» protocol|string|false|none|Protocol|域名类型 http https httptphttps httpandhttps|
|» certificate_id|integer|false|none|Certificate id|证书ID|
|» domain_type|string|false|none|Domain type|组件域名类型|
|» service_alias|string|false|none|Service alias|组件别名|
|» is_senior|boolean|false|none|Is senior|是否有高级路由|
|» domain_path|string|false|none|Domain path|域名path|
|» domain_cookie|string|false|none|Domain cookie|域名cookie|
|» domain_heander|string|false|none|Domain heander|域名heander|
|» type|integer|false|none|Type|类型（默认：0， 自定义：1）|
|» the_weight|integer|false|none|The weight|权重|
|» rule_extensions|string|false|none|Rule extensions|扩展功能|
|» is_outer_service|boolean|false|none|Is outer service|是否已开启对外端口|
|» auto_ssl|boolean|false|none|Auto ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|
|» path_rewrite|boolean|false|none|Path rewrite|是否开启简单路由重写|
|» rewrites|string|false|none|Rewrites|复杂路由重写配置|


## 模型

### EnterpriseHTTPGatewayRule

```json
{
  "ID": 0,
  "region_name": "string",
  "team_name": "string",
  "app_id": 0,
  "auto_ssl_config": "string",
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
  "rule_extensions": "string",
  "is_outer_service": true,
  "auto_ssl": true,
  "path_rewrite": true,
  "rewrites": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|ID|integer|false|read-only|ID|none|
|region_name|string|true|none|Region name|所属集群ID|
|team_name|string|true|none|Team name|所属团队唯一名称|
|app_id|integer|true|none|App id|所属应用ID|
|auto_ssl_config|string|true|none|Auto ssl config|自动签发方式|
|http_rule_id|string|true|none|Http rule id|http_rule_id|
|region_id|string|true|none|Region id|region id|
|tenant_id|string|true|none|Tenant id|租户id|
|service_id|string|true|none|Service id|组件id|
|service_name|string|true|none|Service name|组件名|
|domain_name|string|true|none|Domain name|域名|
|container_port|integer|false|none|Container port|容器端口|
|protocol|string|false|none|Protocol|域名类型 http https httptphttps httpandhttps|
|certificate_id|integer|false|none|Certificate id|证书ID|
|domain_type|string|false|none|Domain type|组件域名类型|
|service_alias|string|false|none|Service alias|组件别名|
|is_senior|boolean|false|none|Is senior|是否有高级路由|
|domain_path|string|false|none|Domain path|域名path|
|domain_cookie|string|false|none|Domain cookie|域名cookie|
|domain_heander|string|false|none|Domain heander|域名heander|
|type|integer|false|none|Type|类型（默认：0， 自定义：1）|
|the_weight|integer|false|none|The weight|权重|
|rule_extensions|string|false|none|Rule extensions|扩展功能|
|is_outer_service|boolean|false|none|Is outer service|是否已开启对外端口|
|auto_ssl|boolean|false|none|Auto ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|
|path_rewrite|boolean|false|none|Path rewrite|是否开启简单路由重写|
|rewrites|string|false|none|Rewrites|复杂路由重写配置|