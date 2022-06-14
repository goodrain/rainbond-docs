---
title: 获取企业管理员列表
---
# 获取企业管理员列表
## 接口信息

**API Path**
/openapi/v1/administrators

**请求协议**
HTTP

**请求方法**
GET

**相关人员**

创建人:User_icreRG
最后编辑人:User_icreRG


**Query参数**：

| 参数名 | 说明 | 必填 | 类型 | 限制 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|eid|企业ID|否|[string]|| |
|page|页码|否|[string]|| |
|page_size|每页数量|否|[string]|| |
**响应内容**：

**返回结果**

> (200)
Json
Object

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 限制 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|users| |是|[array]| || |
|users>>user_id| |是|[int]| || |
|users>>email|邮件地址|否|[string]| || |
|users>>nick_name|用户昵称|否|[string]| || |
|users>>phone|手机号码|否|[string]| || |
|users>>is_active|激活状态|否|[boolean]| || |
|users>>origion|用户来源|否|[string]| || |
|users>>create_time|创建时间|否|[string]| || |
|users>>client_ip|注册ip|否|[string]| || |
|users>>enterprise_id|enterprise_id|否|[string]| || |
|total| |是|[int]| || |

**数据结构**：

UserInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|user_id||是|[int]|||
|email|邮件地址|否|[string]|||
|nick_name|用户昵称|否|[string]|||
|phone|手机号码|否|[string]|||
|is_active|激活状态|否|[boolean]|||
|origion|用户来源|否|[string]|||
|create_time|创建时间|否|[string]|||
|client_ip|注册ip|否|[string]|||
|enterprise_id|enterprise_id|否|[string]|||

ListUsersRespView

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|users||是|[array]|||
|users>>user_id||是|[int]|||
|users>>email|邮件地址|否|[string]|||
|users>>nick_name|用户昵称|否|[string]|||
|users>>phone|手机号码|否|[string]|||
|users>>is_active|激活状态|否|[boolean]|||
|users>>origion|用户来源|否|[string]|||
|users>>create_time|创建时间|否|[string]|||
|users>>client_ip|注册ip|否|[string]|||
|users>>enterprise_id|enterprise_id|否|[string]|||
|total||是|[int]|||

CreateAdminUserReq

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|user_id|用户ID|是|[string]|||
|eid|企业ID|是|[string]|||

Fail

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|msg||是|[string]|||

ChangePassWd

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|password|新密码|是|[string]|||
|password1|再次确认新密码|是|[string]|||

ExportAppBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[string]|||

AutoSSL

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||是|[string]|||

OauthServicesResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|auth_url||否|[string]|||
|name||是|[string]|||
|is_console||否|[boolean]|||
|is_auto_login||否|[boolean]|||
|service_id||否|[int]|||
|oauth_type||是|[string]|||
|eid||是|[string]|||
|home_url||否|[string]|||
|access_token_url||否|[string]|||
|api_url||否|[string]|||
|is_deleted||否|[boolean]|||
|is_git||否|[boolean]|||

OauthServicesBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[array]|||
|value>>enable||否|[boolean]|||
|value>>auth_url||否|[string]|||
|value>>name||是|[string]|||
|value>>is_console||否|[boolean]|||
|value>>is_auto_login||否|[boolean]|||
|value>>service_id||否|[int]|||
|value>>oauth_type||是|[string]|||
|value>>eid||是|[string]|||
|value>>home_url||否|[string]|||
|value>>access_token_url||否|[string]|||
|value>>api_url||否|[string]|||
|value>>is_deleted||否|[boolean]|||
|value>>is_git||否|[boolean]|||

CloudMarketBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[string]|||

ObjectStorageResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|provider||是|[string]|||
|endpoint||是|[string]|||
|access_key||是|[string]|||
|secret_key||是|[string]|||
|bucket_name||是|[string]|||

ObjectStorageBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[object]|||
|value>>provider||是|[string]|||
|value>>endpoint||是|[string]|||
|value>>access_key||是|[string]|||
|value>>secret_key||是|[string]|||
|value>>bucket_name||是|[string]|||

AppStoreImageHubResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|namespace||否|[string]|||
|hub_password||否|[string]|||
|hub_url||否|[string]|||
|hub_user||否|[string]|||

AppStoreImageHubBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[object]|||
|value>>namespace||否|[string]|||
|value>>hub_password||否|[string]|||
|value>>hub_url||否|[string]|||
|value>>hub_user||否|[string]|||

NewBieGuideBaseResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enable||否|[boolean]|||
|value||否|[string]|||

EnterpriseConfigSeralizer

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|export_app||否|[object]|||
|export_app>>enable||否|[boolean]|||
|export_app>>value||否|[string]|||
|auto_ssl||否|[object]|||
|auto_ssl>>enable||否|[boolean]|||
|auto_ssl>>value||是|[string]|||
|oauth_services||否|[object]|||
|oauth_services>>enable||否|[boolean]|||
|oauth_services>>value||否|[array]|||
|oauth_services>>value>>enable||否|[boolean]|||
|oauth_services>>value>>auth_url||否|[string]|||
|oauth_services>>value>>name||是|[string]|||
|oauth_services>>value>>is_console||否|[boolean]|||
|oauth_services>>value>>is_auto_login||否|[boolean]|||
|oauth_services>>value>>service_id||否|[int]|||
|oauth_services>>value>>oauth_type||是|[string]|||
|oauth_services>>value>>eid||是|[string]|||
|oauth_services>>value>>home_url||否|[string]|||
|oauth_services>>value>>access_token_url||否|[string]|||
|oauth_services>>value>>api_url||否|[string]|||
|oauth_services>>value>>is_deleted||否|[boolean]|||
|oauth_services>>value>>is_git||否|[boolean]|||
|cloud_market||否|[object]|||
|cloud_market>>enable||否|[boolean]|||
|cloud_market>>value||否|[string]|||
|object_storage||否|[object]|||
|object_storage>>enable||否|[boolean]|||
|object_storage>>value||否|[object]|||
|object_storage>>value>>provider||是|[string]|||
|object_storage>>value>>endpoint||是|[string]|||
|object_storage>>value>>access_key||是|[string]|||
|object_storage>>value>>secret_key||是|[string]|||
|object_storage>>value>>bucket_name||是|[string]|||
|appstore_image_hub||否|[object]|||
|appstore_image_hub>>enable||否|[boolean]|||
|appstore_image_hub>>value||否|[object]|||
|appstore_image_hub>>value>>namespace||否|[string]|||
|appstore_image_hub>>value>>hub_password||否|[string]|||
|appstore_image_hub>>value>>hub_url||否|[string]|||
|appstore_image_hub>>value>>hub_user||否|[string]|||
|newbie_guide||否|[object]|||
|newbie_guide>>enable||否|[boolean]|||
|newbie_guide>>value||否|[string]|||

EnterpriseHTTPGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|ID||否|[int]|||
|region_name|所属集群ID|是|[string]|||
|team_name|所属团队唯一名称|是|[string]|||
|app_id|所属应用ID|是|[int]|||
|auto_ssl_config|自动签发方式|是|[string]|||
|http_rule_id|http_rule_id|是|[string]|||
|region_id|region id|是|[string]|||
|tenant_id|租户id|是|[string]|||
|service_id|组件id|是|[string]|||
|service_name|组件名|是|[string]|||
|domain_name|域名|是|[string]|||
|container_port|容器端口|否|[int]|||
|protocol|域名类型 http https httptphttps httpandhttps|否|[string]|||
|certificate_id|证书ID|否|[int]|||
|domain_type|组件域名类型|否|[string]|||
|service_alias|组件别名|否|[string]|||
|is_senior|是否有高级路由|否|[boolean]|||
|domain_path|域名path|否|[string]|||
|domain_cookie|域名cookie|否|[string]|||
|domain_heander|域名heander|否|[string]|||
|type|类型（默认：0， 自定义：1）|否|[int]|||
|the_weight|权重|否|[int]|||
|rule_extensions|扩展功能|否|[string]|||
|is_outer_service|是否已开启对外端口|否|[boolean]|||
|auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|path_rewrite|是否开启简单路由重写|否|[boolean]|||
|rewrites|复杂路由重写配置|否|[string]|||

RegionInfoResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_id|region id|否|[string]|||
|region_name|集群名称|是|[string]|||
|region_alias|集群别名|是|[string]|||
|url|集群API url|是|[string]|||
|wsurl|集群Websocket url|否|[string]|||
|httpdomain|集群http应用访问根域名|否|[string]|||
|tcpdomain|集群tcp应用访问根域名|否|[string]|||
|status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|集群描述|是|[string]|||
|scope|数据中心范围 private|public|否|[string]|||
|ssl_ca_cert|api ca file|否|[string]|||
|cert_file|api cert file|否|[string]|||
|key_file|api cert key file|否|[string]|||

RegionInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_id|region id|是|[string]|||
|region_name|数据中心名称,不可修改|是|[string]|||
|region_alias|数据中心别名|是|[string]|||
|url|数据中心API url|是|[string]|||
|token|数据中心token|否|[string]|||
|wsurl|数据中心Websocket url|是|[string]|||
|httpdomain|数据中心http应用访问根域名|是|[string]|||
|tcpdomain|数据中心tcp应用访问根域名|是|[string]|||
|scope|数据中心范围 private|public|否|[string]|||
|ssl_ca_cert|数据中心访问ca证书地址|否|[string]|||
|cert_file|验证文件|否|[string]|||
|key_file|验证的key|否|[string]|||
|status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|数据中心描述|否|[string]|||
|enterprise_id|enterprise id|否|[string]|||

RegionInfoR

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_name|数据中心名|是|[string]|||
|region_alias|数据中心昵称|是|[string]|||
|url||是|[string]|||
|wsurl||是|[string]|||
|httpdomain||是|[string]|||
|tcpdomain||是|[string]|||
|scope||是|[string]|||
|ssl_ca_cert||是|[string]|||
|cert_file||是|[string]|||
|key_file||是|[string]|||
|desc||是|[string]|||
|used_disk|使用的存储|否|[number]|||
|total_disk|全部存储|否|[number]|||
|used_memory|使用内存|否|[number]|||
|total_memory|全部内存|否|[number]|||
|used_cpu|使用cpu|否|[number]|||
|total_cpu|全部cpu|否|[number]|||
|health_status|集群状态|否|[string]|||
|status|状态|否|[string]|||

RoleInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|role_name|角色名称|是|[string]|||
|role_id|角色ID|是|[string]|||

TeamInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|tenant_id|团队ID|是|[string]|||
|tenant_name|团队名称|是|[string]|||
|tenant_alias|团队别名|是|[string]|||
|enterprise_id|企业ID|是|[string]|||
|is_active|是否激活|否|[boolean]|||
|create_time|创建时间|否|[string]|||
|creater|团队拥有者用户|否|[string]|||
|role_infos|用户在团队中拥有的角色|否|[array]|||
|role_infos>>role_name|角色名称|是|[string]|||
|role_infos>>role_id|角色ID|是|[string]|||
|service_num|团队的组件数量|否|[int]|||
|region_num|团队开通的数据中心数量|否|[int]|||

ListTeamResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|total||否|[int]|||
|tenants||是|[array]|||
|tenants>>tenant_id|团队ID|是|[string]|||
|tenants>>tenant_name|团队名称|是|[string]|||
|tenants>>tenant_alias|团队别名|是|[string]|||
|tenants>>enterprise_id|企业ID|是|[string]|||
|tenants>>is_active|是否激活|否|[boolean]|||
|tenants>>create_time|创建时间|否|[string]|||
|tenants>>creater|团队拥有者用户|否|[string]|||
|tenants>>role_infos|用户在团队中拥有的角色|否|[array]|||
|tenants>>role_infos>>role_name|角色名称|是|[string]|||
|tenants>>role_infos>>role_id|角色ID|是|[string]|||
|tenants>>service_num|团队的组件数量|否|[int]|||
|tenants>>region_num|团队开通的数据中心数量|否|[int]|||

CreateTeamReq

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|tenant_name|团队名称|是|[string]|||
|region|默认开通的数据中心，未指定则不开通|否|[string]|||

TeamBaseInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|tenant_id|租户id|是|[string]|||
|tenant_name|租户名称|是|[string]|||
|region|区域中心,弃用|否|[string]|||
|is_active|激活状态|否|[boolean]|||
|create_time|创建时间|是|[string]|||
|creater|租户创建者|否|[int]|||
|limit_memory|内存大小单位（M）|否|[int]|||
|update_time|更新时间|是|[string]|||
|expired_time|过期时间|是|[string]|||
|tenant_alias|团队别名|否|[string]|||
|enterprise_id|企业id|否|[string]|||

TenantRegionList

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|tenant_id|租户id|是|[string]|||
|region_name|数据中心名称|是|[string]|||

TeamAppsResource

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|total_cpu|cpu总额|否|[int]|||
|total_memory|内存总额|否|[int]|||
|used_cpu|占用cpu|否|[int]|||
|used_memory|占用内存|否|[int]|||
|used_cpu_percentage|占用cpu百分比|否|[number]|||
|used_memory_percentage|占用内存百分比|否|[number]|||
|team_id|团队ID|是|[string]|||
|team_name|团队名称|是|[string]|||
|team_alias|团队昵称|是|[string]|||

UpdateTeamInfoReq

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region|数据中心名称|否|[string]|||
|is_active|是否激活|否|[boolean]|||
|creater|团队拥有者用户ID|否|[int]|||
|tenant_alias|团队别名|否|[string]|||
|enterprise_id|企业ID|否|[string]|||

CertificatesR

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|has_expired|是否过期|是|[boolean]|||
|issued_to|域名列表|是|[array]|||
|alias|证书名称|是|[string]|||
|certificate_type|证书类型|是|[string]|||
|end_data|过期时间|是|[string]|||
|id|id|是|[int]|||
|issued_by|证书来源|是|[string]|||

TeamCertificatesL

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|list||是|[array]|||
|list>>has_expired|是否过期|是|[boolean]|||
|list>>issued_to|域名列表|是|[array]|||
|list>>alias|证书名称|是|[string]|||
|list>>certificate_type|证书类型|是|[string]|||
|list>>end_data|过期时间|是|[string]|||
|list>>id|id|是|[int]|||
|list>>issued_by|证书来源|是|[string]|||
|page||是|[int]|||
|page_size||是|[int]|||
|total||是|[int]|||

TeamCertificatesC

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|alias|证书名称|是|[string]|||
|private_key|证书|是|[string]|||
|certificate|证书key|是|[string]|||
|certificate_type|证书类型|是|[string]|||

TeamCertificatesR

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|alias|证书名称|是|[string]|||
|private_key|证书|是|[string]|||
|certificate|证书key|是|[string]|||
|certificate_type|证书类型|是|[string]|||
|id|id|是|[int]|||

TeamRegionsResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_id|region id|是|[string]|||
|region_name|数据中心名称|是|[string]|||
|region_alias|数据中心别名|是|[string]|||
|tenant_name|租户名称|是|[string]|||
|url|数据中心API url|是|[string]|||
|wsurl|数据中心Websocket url|是|[string]|||
|httpdomain|数据中心http应用访问根域名|是|[string]|||
|tcpdomain|数据中心tcp应用访问根域名|是|[string]|||
|token|数据中心token|否|[string]|||
|status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|数据中心描述|是|[string]|||
|scope|数据中心范围 private|public|否|[string]|||

ListTeamRegionsResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|total||是|[int]|||
|regions||是|[array]|||
|regions>>region_id|region id|是|[string]|||
|regions>>region_name|数据中心名称|是|[string]|||
|regions>>region_alias|数据中心别名|是|[string]|||
|regions>>tenant_name|租户名称|是|[string]|||
|regions>>url|数据中心API url|是|[string]|||
|regions>>wsurl|数据中心Websocket url|是|[string]|||
|regions>>httpdomain|数据中心http应用访问根域名|是|[string]|||
|regions>>tcpdomain|数据中心tcp应用访问根域名|是|[string]|||
|regions>>token|数据中心token|否|[string]|||
|regions>>status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|regions>>desc|数据中心描述|是|[string]|||
|regions>>scope|数据中心范围 private|public|否|[string]|||

TeamRegionReq

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region|数据中心名称|否|[string]|||

AppBaseInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|ID||否|[int]|||
|tenant_id|租户id|是|[string]|||
|group_name|组名|是|[string]|||
|region_name|区域中心名称|是|[string]|||
|is_default|默认组件|否|[boolean]|||
|order_index|应用排序|否|[int]|||
|note|备注|否|[string]|||
|username|the username of principal|否|[string]|||
|governance_mode|governance mode|否|[string]|||
|create_time|创建时间|是|[string]|||
|update_time|更新时间|是|[string]|||
|app_type|应用类型|否|[string]|||
|app_store_name|应用商店名称|否|[string]|||
|app_store_url|应用商店 URL|否|[string]|||
|app_template_name|应用模板名称|否|[string]|||
|version|Helm 应用版本|否|[string]|||
|logo|应用logo|否|[string]|||
|k8s_app|集群内应用名称|否|[string]|||

AppPostInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|app_name|应用名称|是|[string]|||
|app_note|应用备注|否|[string]|||

TeamAppsCloseSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|service_ids||否|[array]|||

AppInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|ID||否|[int]|||
|enterprise_id|企业ID(联合云ID)|是|[string]|||
|service_count|组件数量|是|[int]|||
|running_service_count|正在运行的组件数量|是|[int]|||
|used_momory|分配的内存|是|[int]|||
|used_cpu|分配的cpu|是|[int]|||
|app_id|应用id|是|[int]|||
|team_name|团队名|是|[string]|||
|status|应用状态|是|[string]|running:,part_running:,closed:||
|tenant_id|租户id|是|[string]|||
|group_name|组名|是|[string]|||
|region_name|区域中心名称|是|[string]|||
|is_default|默认组件|否|[boolean]|||
|order_index|应用排序|否|[int]|||
|note|备注|否|[string]|||
|username|the username of principal|否|[string]|||
|governance_mode|governance mode|否|[string]|||
|create_time|创建时间|是|[string]|||
|update_time|更新时间|是|[string]|||
|app_type|应用类型|否|[string]|||
|app_store_name|应用商店名称|否|[string]|||
|app_store_url|应用商店 URL|否|[string]|||
|app_template_name|应用模板名称|否|[string]|||
|version|Helm 应用版本|否|[string]|||
|logo|应用logo|否|[string]|||
|k8s_app|集群内应用名称|否|[string]|||

AppCopyL

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|build_source||否|[string]|||
|update_time|更新日期|是|[string]|||
|deploy_version|构建版本|是|[string]|||
|create_status|创建状态|是|[string]|||
|service_alias|组件昵称|是|[string]|||
|service_cname|组件中文名称|是|[string]|||
|version|版本|是|[string]|||
|service_type|组件类型|是|[string]|||
|service_id|id|是|[string]|||
|app_name|应用名称|是|[string]|||
|min_memory|组件运行内存|是|[string]|||

AppCopyModify

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|service_id|id|是|[string]|||
|change||否|[string]|||

AppCopyC

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|services||是|[array]|||
|services>>service_id|id|是|[string]|||
|services>>change||否|[string]|||
|target_team_name|团队名称|是|[string]|||
|target_region_name|数据中心名称|是|[string]|||
|target_app_id|应用id|是|[int]|||

ServiceBaseInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|status|组件状态|否|[string]|||
|access_infos|组件访问地址|否|[array]|||
|service_id|组件id|是|[string]|||
|tenant_id|租户id|是|[string]|||
|service_key|组件key|是|[string]|||
|service_alias|组件别名|是|[string]|||
|service_cname|组件名|否|[string]|||
|service_region|组件所属区|是|[string]|||
|desc|描述|否|[string]|||
|category|组件分类：application,cache,store|是|[string]|||
|version|版本|是|[string]|||
|update_version|内部发布次数|否|[int]|||
|image|镜像|是|[string]|||
|cmd|启动参数|否|[string]|||
|min_node|实例数量|否|[int]|||
|min_cpu|cpu分配额 1000=1core|否|[int]|||
|container_gpu|gpu显存数量|否|[int]|||
|min_memory|内存大小单位（M）|否|[int]|||
|extend_method|组件部署类型,stateless or state|否|[string]|||
|code_from|代码来源:gitlab,github|否|[string]|||
|git_url|code代码仓库|否|[string]|||
|git_project_id|gitlab 中项目id|否|[int]|||
|code_version|代码版本|否|[string]|||
|service_type|组件类型:web,mysql,redis,mongodb,phpadmin|否|[string]|||
|creater|组件创建者|否|[int]|||
|language|代码语言|否|[string]|||
|total_memory|内存使用M|否|[int]|||
|is_service|是否inner组件|否|[boolean]|||
|service_origin|组件创建类型cloud云市组件,assistant云帮组件|否|[string]|||
|tenant_service_group_id|组件归属的组件组id，从应用模版安装的组件该字段需要赋值|否|[int]|||
|open_webhooks|是否开启自动触发部署功能（兼容老版本组件）|否|[boolean]|||
|service_source|组件来源(source_code, market, docker_run, docker_compose)|否|[string]|||
|create_status|组件创建状态 creating|complete|否|[string]|||
|check_uuid|组件检测ID|否|[string]|||
|check_event_id|组件检测事件ID|否|[string]|||
|docker_cmd|镜像创建命令|否|[string]|||
|server_type|源码仓库类型|否|[string]|||
|is_upgrate|是否可以更新|否|[boolean]|||
|build_upgrade|组件构建后是否升级|否|[boolean]|||
|oauth_service_id|拉取源码所用的OAuth服务id|否|[int]|||
|k8s_component_name|集群组件名称|是|[string]|||

AppCopyCRes

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|services||是|[array]|||
|services>>status|组件状态|否|[string]|||
|services>>access_infos|组件访问地址|否|[array]|||
|services>>service_id|组件id|是|[string]|||
|services>>tenant_id|租户id|是|[string]|||
|services>>service_key|组件key|是|[string]|||
|services>>service_alias|组件别名|是|[string]|||
|services>>service_cname|组件名|否|[string]|||
|services>>service_region|组件所属区|是|[string]|||
|services>>desc|描述|否|[string]|||
|services>>category|组件分类：application,cache,store|是|[string]|||
|services>>version|版本|是|[string]|||
|services>>update_version|内部发布次数|否|[int]|||
|services>>image|镜像|是|[string]|||
|services>>cmd|启动参数|否|[string]|||
|services>>min_node|实例数量|否|[int]|||
|services>>min_cpu|cpu分配额 1000=1core|否|[int]|||
|services>>container_gpu|gpu显存数量|否|[int]|||
|services>>min_memory|内存大小单位（M）|否|[int]|||
|services>>extend_method|组件部署类型,stateless or state|否|[string]|||
|services>>code_from|代码来源:gitlab,github|否|[string]|||
|services>>git_url|code代码仓库|否|[string]|||
|services>>git_project_id|gitlab 中项目id|否|[int]|||
|services>>code_version|代码版本|否|[string]|||
|services>>service_type|组件类型:web,mysql,redis,mongodb,phpadmin|否|[string]|||
|services>>creater|组件创建者|否|[int]|||
|services>>language|代码语言|否|[string]|||
|services>>total_memory|内存使用M|否|[int]|||
|services>>is_service|是否inner组件|否|[boolean]|||
|services>>service_origin|组件创建类型cloud云市组件,assistant云帮组件|否|[string]|||
|services>>tenant_service_group_id|组件归属的组件组id，从应用模版安装的组件该字段需要赋值|否|[int]|||
|services>>open_webhooks|是否开启自动触发部署功能（兼容老版本组件）|否|[boolean]|||
|services>>service_source|组件来源(source_code, market, docker_run, docker_compose)|否|[string]|||
|services>>create_status|组件创建状态 creating|complete|否|[string]|||
|services>>check_uuid|组件检测ID|否|[string]|||
|services>>check_event_id|组件检测事件ID|否|[string]|||
|services>>docker_cmd|镜像创建命令|否|[string]|||
|services>>server_type|源码仓库类型|否|[string]|||
|services>>is_upgrate|是否可以更新|否|[boolean]|||
|services>>build_upgrade|组件构建后是否升级|否|[boolean]|||
|services>>oauth_service_id|拉取源码所用的OAuth服务id|否|[int]|||
|services>>k8s_component_name|集群组件名称|是|[string]|||

HTTPGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|ID||否|[int]|||
|rule_extensions||否|[array]|||
|http_rule_id|http_rule_id|是|[string]|||
|region_id|region id|是|[string]|||
|tenant_id|租户id|是|[string]|||
|service_id|组件id|是|[string]|||
|service_name|组件名|是|[string]|||
|domain_name|域名|是|[string]|||
|container_port|容器端口|否|[int]|||
|protocol|域名类型 http https httptphttps httpandhttps|否|[string]|||
|certificate_id|证书ID|否|[int]|||
|domain_type|组件域名类型|否|[string]|||
|service_alias|组件别名|否|[string]|||
|is_senior|是否有高级路由|否|[boolean]|||
|domain_path|域名path|否|[string]|||
|domain_cookie|域名cookie|否|[string]|||
|domain_heander|域名heander|否|[string]|||
|type|类型（默认：0， 自定义：1）|否|[int]|||
|the_weight|权重|否|[int]|||
|is_outer_service|是否已开启对外端口|否|[boolean]|||
|auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|auto_ssl_config|自动分发证书配置|否|[string]|||
|path_rewrite|是否开启简单路由重写|否|[boolean]|||
|rewrites|复杂路由重写配置|否|[string]|||

GatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|http||否|[array]|||
|http>>ID||否|[int]|||
|http>>rule_extensions||否|[array]|||
|http>>http_rule_id|http_rule_id|是|[string]|||
|http>>region_id|region id|是|[string]|||
|http>>tenant_id|租户id|是|[string]|||
|http>>service_id|组件id|是|[string]|||
|http>>service_name|组件名|是|[string]|||
|http>>domain_name|域名|是|[string]|||
|http>>container_port|容器端口|否|[int]|||
|http>>protocol|域名类型 http https httptphttps httpandhttps|否|[string]|||
|http>>certificate_id|证书ID|否|[int]|||
|http>>domain_type|组件域名类型|否|[string]|||
|http>>service_alias|组件别名|否|[string]|||
|http>>is_senior|是否有高级路由|否|[boolean]|||
|http>>domain_path|域名path|否|[string]|||
|http>>domain_cookie|域名cookie|否|[string]|||
|http>>domain_heander|域名heander|否|[string]|||
|http>>type|类型（默认：0， 自定义：1）|否|[int]|||
|http>>the_weight|权重|否|[int]|||
|http>>is_outer_service|是否已开启对外端口|否|[boolean]|||
|http>>auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|http>>auto_ssl_config|自动分发证书配置|否|[string]|||
|http>>path_rewrite|是否开启简单路由重写|否|[boolean]|||
|http>>rewrites|复杂路由重写配置|否|[string]|||
|tcp||否|[array]|||
|tcp>>ID||否|[int]|||
|tcp>>tcp_rule_id|tcp_rule_id|是|[string]|||
|tcp>>region_id|region id|是|[string]|||
|tcp>>tenant_id|租户id|是|[string]|||
|tcp>>service_id|组件id|是|[string]|||
|tcp>>service_name|组件名|是|[string]|||
|tcp>>end_point|ip+port|是|[string]|||
|tcp>>protocol|服务协议：tcp,udp|否|[string]|||
|tcp>>container_port|容器端口|否|[int]|||
|tcp>>service_alias|组件别名|否|[string]|||
|tcp>>type|类型（默认：0， 自定义：1）|否|[int]|||
|tcp>>rule_extensions|扩展功能|否|[string]|||
|tcp>>is_outer_service|是否已开启对外端口|否|[boolean]|||

PostTCPGatewayRuleExtensions

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|key||是|[string]|||
|value||是|[string]|||

PostTCPGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|container_port|组件端口|是|[int]|||
|service_id|组件id|是|[string]|||
|end_point|ip地址:端口|是|[string]|||
|rule_extensions|规则扩展|否|[array]|||
|rule_extensions>>key||是|[string]|||
|rule_extensions>>value||是|[string]|||
|default_port|映射端口|是|[int]|||
|default_ip|映射id地址|是|[string]|||

HTTPHeader

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|key|请求头Key|是|[string]|||
|value|请求头Value|是|[string]|||

HTTPConfiguration

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|proxy_body_size|请求主体大小|否|[int]|||
|proxy_buffer_numbers|缓冲区数量|否|[int]|||
|proxy_buffer_size|缓冲区大小|否|[int]|||
|proxy_buffering|是否开启ProxyBuffer|否|[string]|||
|proxy_connect_timeout|连接超时时间|否|[int]|||
|proxy_read_timeout|读超时时间|否|[int]|||
|proxy_send_timeout|发送超时时间|否|[int]|||
|set_headers||是|[array]|||
|set_headers>>key|请求头Key|是|[string]|||
|set_headers>>value|请求头Value|是|[string]|||

PostHTTPGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|service_id|应用组件id|是|[string]|||
|container_port|绑定端口|是|[int]|||
|certificate_id|证书id|否|[int]|||
|domain_name|域名|是|[string]|||
|domain_cookie|域名cookie|否|[string]|||
|domain_header|域名header|否|[string]|||
|the_weight||否|[int]|||
|domain_path|域名路径|否|[string]|||
|rule_extensions|规则扩展|否|[array]|||
|whether_open|是否开放|否|[boolean]|||
|auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|auto_ssl_config|自动分发证书配置|否|[string]|||
|configuration||否|[object]|||
|configuration>>proxy_body_size|请求主体大小|否|[int]|||
|configuration>>proxy_buffer_numbers|缓冲区数量|否|[int]|||
|configuration>>proxy_buffer_size|缓冲区大小|否|[int]|||
|configuration>>proxy_buffering|是否开启ProxyBuffer|否|[string]|||
|configuration>>proxy_connect_timeout|连接超时时间|否|[int]|||
|configuration>>proxy_read_timeout|读超时时间|否|[int]|||
|configuration>>proxy_send_timeout|发送超时时间|否|[int]|||
|configuration>>set_headers||是|[array]|||
|configuration>>set_headers>>key|请求头Key|是|[string]|||
|configuration>>set_headers>>value|请求头Value|是|[string]|||

PostGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|protocol|协议|是|[string]|||
|tcp||否|[object]|||
|tcp>>container_port|组件端口|是|[int]|||
|tcp>>service_id|组件id|是|[string]|||
|tcp>>end_point|ip地址:端口|是|[string]|||
|tcp>>rule_extensions|规则扩展|否|[array]|||
|tcp>>rule_extensions>>key||是|[string]|||
|tcp>>rule_extensions>>value||是|[string]|||
|tcp>>default_port|映射端口|是|[int]|||
|tcp>>default_ip|映射id地址|是|[string]|||
|http||否|[object]|||
|http>>service_id|应用组件id|是|[string]|||
|http>>container_port|绑定端口|是|[int]|||
|http>>certificate_id|证书id|否|[int]|||
|http>>domain_name|域名|是|[string]|||
|http>>domain_cookie|域名cookie|否|[string]|||
|http>>domain_header|域名header|否|[string]|||
|http>>the_weight||否|[int]|||
|http>>domain_path|域名路径|否|[string]|||
|http>>rule_extensions|规则扩展|否|[array]|||
|http>>whether_open|是否开放|否|[boolean]|||
|http>>auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|http>>auto_ssl_config|自动分发证书配置|否|[string]|||
|http>>configuration||否|[object]|||
|http>>configuration>>proxy_body_size|请求主体大小|否|[int]|||
|http>>configuration>>proxy_buffer_numbers|缓冲区数量|否|[int]|||
|http>>configuration>>proxy_buffer_size|缓冲区大小|否|[int]|||
|http>>configuration>>proxy_buffering|是否开启ProxyBuffer|否|[string]|||
|http>>configuration>>proxy_connect_timeout|连接超时时间|否|[int]|||
|http>>configuration>>proxy_read_timeout|读超时时间|否|[int]|||
|http>>configuration>>proxy_send_timeout|发送超时时间|否|[int]|||
|http>>configuration>>set_headers||是|[array]|||
|http>>configuration>>set_headers>>key|请求头Key|是|[string]|||
|http>>configuration>>set_headers>>value|请求头Value|是|[string]|||

UpdatePostHTTPGatewayRule

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|service_id|应用组件id|是|[string]|||
|container_port|绑定端口|否|[int]|||
|certificate_id|证书id|否|[int]|||
|domain_name|域名|否|[string]|||
|domain_cookie|域名cookie|否|[string]|||
|domain_header|域名header|否|[string]|||
|the_weight||否|[int]|||
|domain_path|域名路径|否|[string]|||
|rule_extensions|规则扩展|否|[array]|||
|whether_open|是否开放|否|[boolean]|||
|auto_ssl|是否自动匹配证书，升级为https，如果开启，由外部服务完成升级|否|[boolean]|||
|auto_ssl_config|自动分发证书配置|否|[string]|||

Install

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|market_url|应用商店路由|是|[string]|||
|market_domain|应用商店domain|是|[string]|||
|market_type|应用商店类型|是|[string]|||
|market_access_key|应用商店令牌|是|[string]|||
|app_model_id|应用id|是|[string]|||
|app_model_version|应用版本|是|[string]|||

MarketInstall

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enterprise_id|企业ID(联合云ID)|是|[string]|||
|team_id|团队id|是|[string]|||
|note|备注|是|[string]|||
|ID|应用id|是|[int]|||
|region_name|数据中心名|是|[string]|||
|service_list||是|[array]|||
|service_list>>status|组件状态|否|[string]|||
|service_list>>access_infos|组件访问地址|否|[array]|||
|service_list>>service_id|组件id|是|[string]|||
|service_list>>tenant_id|租户id|是|[string]|||
|service_list>>service_key|组件key|是|[string]|||
|service_list>>service_alias|组件别名|是|[string]|||
|service_list>>service_cname|组件名|否|[string]|||
|service_list>>service_region|组件所属区|是|[string]|||
|service_list>>desc|描述|否|[string]|||
|service_list>>category|组件分类：application,cache,store|是|[string]|||
|service_list>>version|版本|是|[string]|||
|service_list>>update_version|内部发布次数|否|[int]|||
|service_list>>image|镜像|是|[string]|||
|service_list>>cmd|启动参数|否|[string]|||
|service_list>>min_node|实例数量|否|[int]|||
|service_list>>min_cpu|cpu分配额 1000=1core|否|[int]|||
|service_list>>container_gpu|gpu显存数量|否|[int]|||
|service_list>>min_memory|内存大小单位（M）|否|[int]|||
|service_list>>extend_method|组件部署类型,stateless or state|否|[string]|||
|service_list>>code_from|代码来源:gitlab,github|否|[string]|||
|service_list>>git_url|code代码仓库|否|[string]|||
|service_list>>git_project_id|gitlab 中项目id|否|[int]|||
|service_list>>code_version|代码版本|否|[string]|||
|service_list>>service_type|组件类型:web,mysql,redis,mongodb,phpadmin|否|[string]|||
|service_list>>creater|组件创建者|否|[int]|||
|service_list>>language|代码语言|否|[string]|||
|service_list>>total_memory|内存使用M|否|[int]|||
|service_list>>is_service|是否inner组件|否|[boolean]|||
|service_list>>service_origin|组件创建类型cloud云市组件,assistant云帮组件|否|[string]|||
|service_list>>tenant_service_group_id|组件归属的组件组id，从应用模版安装的组件该字段需要赋值|否|[int]|||
|service_list>>open_webhooks|是否开启自动触发部署功能（兼容老版本组件）|否|[boolean]|||
|service_list>>service_source|组件来源(source_code, market, docker_run, docker_compose)|否|[string]|||
|service_list>>create_status|组件创建状态 creating|complete|否|[string]|||
|service_list>>check_uuid|组件检测ID|否|[string]|||
|service_list>>check_event_id|组件检测事件ID|否|[string]|||
|service_list>>docker_cmd|镜像创建命令|否|[string]|||
|service_list>>server_type|源码仓库类型|否|[string]|||
|service_list>>is_upgrate|是否可以更新|否|[boolean]|||
|service_list>>build_upgrade|组件构建后是否升级|否|[boolean]|||
|service_list>>oauth_service_id|拉取源码所用的OAuth服务id|否|[int]|||
|service_list>>k8s_component_name|集群组件名称|是|[string]|||

MonitorDataSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|value||是|[array]|||

ComponentMonitorBaseSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|resultType|返回类型|否|[string]|||
|result||是|[array]|||
|result>>value||是|[array]|||

ComponentMonitorItemsSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|data||否|[object]|||
|data>>resultType|返回类型|否|[string]|||
|data>>result||是|[array]|||
|data>>result>>value||是|[array]|||
|monitor_item|监控项|是|[string]|||
|status|监控状态|否|[string]|||

ComponentMonitorSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|monitors||否|[array]|||
|monitors>>data||否|[object]|||
|monitors>>data>>resultType|返回类型|否|[string]|||
|monitors>>data>>result||是|[array]|||
|monitors>>data>>result>>value||是|[array]|||
|monitors>>monitor_item|监控项|是|[string]|||
|monitors>>status|监控状态|否|[string]|||
|service_id|组件id|是|[string]|||
|service_cname|组件名|是|[string]|||
|service_alias|组件昵称|是|[string]|||

ServiceGroupOperations

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|action|操作类型|是|[string]|stop:,start:,upgrade:,deploy:||
|service_ids|组件ID列表，不传值则操作应用下所有组件|否|[array]|||

Success

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|msg||是|[string]|||

ComponentBuildReqSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|build_type|组件构建源类型|否|[string]|source_code:,docker_image:,market:||
|server_type|源码来源类型|否|[string]|svn:,git:,oss:||
|branch|代码分支，tag信息|否|[string]|||
|repo_url|来源仓库服务地址，包括代码仓库、镜像仓库、OSS地址|否|[string]|||
|username|来源仓库服务账号|否|[string]|||
|password|来源仓库服务密码|否|[string]|||

ComponentEventSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|event_id|事件ID|是|[string]|||

ComponentEnvsBaseSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|note|备注|否|[string]|||
|name|环境变量名|是|[string]|||
|value|环境变量值|是|[string]|||
|is_change|是否可改变|否|[boolean]|||
|scope|范围|否|[string]|||

ComponentEnvsSerializers

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|envs||是|[array]|||
|envs>>note|备注|否|[string]|||
|envs>>name|环境变量名|是|[string]|||
|envs>>value|环境变量值|是|[string]|||
|envs>>is_change|是否可改变|否|[boolean]|||
|envs>>scope|范围|否|[string]|||

AppServiceEvents

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|EventID|事件id|是|[string]|||
|UserName|操作人|是|[string]|||
|EndTime|结束事件|是|[string]|||
|Target|操作目标类型|是|[string]|||
|OptType|事件类型|是|[string]|||
|TargetID|操作目标id|是|[string]|||
|ServiceID|服务id|是|[string]|||
|Status|状态|是|[string]|||
|RequestBody|请求参数|是|[string]|||
|create_time|创建时间|是|[string]|||
|FinalStatus|最终状态|是|[string]|||
|StartTime|开始时间|是|[string]|||
|SynType|同步状态|是|[string]|||
|Message|日志|是|[string]|||
|TenantID|团队id|是|[string]|||
|ID|记录id|是|[string]|||

ListServiceEventsResponse

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|page|当前页数|是|[int]|||
|page_size|每页数量|是|[int]|||
|total|数据总数|是|[int]|||
|events||是|[array]|||
|events>>EventID|事件id|是|[string]|||
|events>>UserName|操作人|是|[string]|||
|events>>EndTime|结束事件|是|[string]|||
|events>>Target|操作目标类型|是|[string]|||
|events>>OptType|事件类型|是|[string]|||
|events>>TargetID|操作目标id|是|[string]|||
|events>>ServiceID|服务id|是|[string]|||
|events>>Status|状态|是|[string]|||
|events>>RequestBody|请求参数|是|[string]|||
|events>>create_time|创建时间|是|[string]|||
|events>>FinalStatus|最终状态|是|[string]|||
|events>>StartTime|开始时间|是|[string]|||
|events>>SynType|同步状态|是|[string]|||
|events>>Message|日志|是|[string]|||
|events>>TenantID|团队id|是|[string]|||
|events>>ID|记录id|是|[string]|||

AppServiceTelescopicHorizontal

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|new_node|组件节点|是|[int]|||

AppServiceTelescopicVertical

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|new_memory|组件内存|是|[int]|||
|new_gpu|组件gpu显存申请|是|[int]|||
|new_cpu|组件cpu额度申请|是|[int]|||

CreateThirdComponent

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|endpoints_type|Endpoint 注册方式|是|[string]|static:,api:||
|endpoints|Endpoint 列表|是|[array]|||
|component_name|组件名称|是|[string]|||

CreateThirdComponentResponse

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|status|组件状态|否|[string]|||
|access_infos|组件访问地址|否|[array]|||
|api_service_key|API 授权Key, 类型为api时有效|是|[string]|||
|url|API地址, 类型为api时有效|是|[string]|||
|service_id|组件id|是|[string]|||
|tenant_id|租户id|是|[string]|||
|service_key|组件key|是|[string]|||
|service_alias|组件别名|是|[string]|||
|service_cname|组件名|否|[string]|||
|service_region|组件所属区|是|[string]|||
|desc|描述|否|[string]|||
|category|组件分类：application,cache,store|是|[string]|||
|version|版本|是|[string]|||
|update_version|内部发布次数|否|[int]|||
|image|镜像|是|[string]|||
|cmd|启动参数|否|[string]|||
|min_node|实例数量|否|[int]|||
|min_cpu|cpu分配额 1000=1core|否|[int]|||
|container_gpu|gpu显存数量|否|[int]|||
|min_memory|内存大小单位（M）|否|[int]|||
|extend_method|组件部署类型,stateless or state|否|[string]|||
|code_from|代码来源:gitlab,github|否|[string]|||
|git_url|code代码仓库|否|[string]|||
|git_project_id|gitlab 中项目id|否|[int]|||
|code_version|代码版本|否|[string]|||
|service_type|组件类型:web,mysql,redis,mongodb,phpadmin|否|[string]|||
|creater|组件创建者|否|[int]|||
|language|代码语言|否|[string]|||
|total_memory|内存使用M|否|[int]|||
|is_service|是否inner组件|否|[boolean]|||
|service_origin|组件创建类型cloud云市组件,assistant云帮组件|否|[string]|||
|tenant_service_group_id|组件归属的组件组id，从应用模版安装的组件该字段需要赋值|否|[int]|||
|open_webhooks|是否开启自动触发部署功能（兼容老版本组件）|否|[boolean]|||
|service_source|组件来源(source_code, market, docker_run, docker_compose)|否|[string]|||
|create_status|组件创建状态 creating|complete|否|[string]|||
|check_uuid|组件检测ID|否|[string]|||
|check_event_id|组件检测事件ID|否|[string]|||
|docker_cmd|镜像创建命令|否|[string]|||
|server_type|源码仓库类型|否|[string]|||
|is_upgrate|是否可以更新|否|[boolean]|||
|build_upgrade|组件构建后是否升级|否|[boolean]|||
|oauth_service_id|拉取源码所用的OAuth服务id|否|[int]|||
|k8s_component_name|集群组件名称|是|[string]|||

ListUpgrade

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|market_name|应用商店名称|是|[string]|||
|app_model_id|应用模型id|是|[string]|||
|app_model_name|应用模型名称|是|[string]|||
|current_version|当前版本|是|[string]|||
|enterprise_id|企业id|是|[string]|||
|can_upgrade|可升级|是|[boolean]|||
|upgrade_versions|可升级的版本列表|是|[array]|||
|source|应用模型来源|是|[string]|||

UpgradeBase

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|market_name|应用商店名称|是|[string]|||
|app_model_id|应用模型id|是|[string]|||
|app_model_version|当前版本|是|[string]|||

Upgrade

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|update_versions||是|[array]|||
|update_versions>>market_name|应用商店名称|是|[string]|||
|update_versions>>app_model_id|应用模型id|是|[string]|||
|update_versions>>app_model_version|当前版本|是|[string]|||

EventLogMessage

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|message|日志信息|否|[string]|||
|time|日志时间|否|[string]|||
|utime|时间戳|否|[int]|||

TeamEventLog

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|logs|日志信息|否|[array]|||
|logs>>message|日志信息|否|[string]|||
|logs>>time|日志时间|否|[string]|||
|logs>>utime|时间戳|否|[int]|||

CreateUser

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|nick_name|用户昵称|是|[string]|||
|password|密码|是|[string]|||
|enterprise_id|enterprise_id|是|[string]|||
|email|邮件地址|否|[string]|||
|phone|手机号码|否|[string]|||
|is_active|激活状态|否|[boolean]|||
|origion|用户来源|否|[string]|||

UpdateUser

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|password|密码|否|[string]|||
|enterprise_id|enterprise_id|否|[string]|||
|email|邮件地址|否|[string]|||
|phone|手机号码|否|[string]|||
|is_active|激活状态|否|[boolean]|||

ChangePassWdUser

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|user_id|user_id|是|[int]|||
|password|新密码|是|[string]|||
|password1|再次确认新密码|是|[string]|||

EnterpriseListInfo

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enterprise_id|企业ID(联合云ID)|是|[string]|||
|enterprise_name|企业名称|是|[string]|||
|enterprise_alias|企业别名|是|[string]|||
|create_time|创建时间|是|[string]|||
|region_num|集群数量|是|[int]|||
|user_num|用户数量|是|[int]|||
|team_num|团队数量|是|[int]|||
|is_active|是否启用|是|[boolean]|||

ListEntsResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|total|总数|是|[int]|||
|data||是|[array]|||
|data>>enterprise_id|企业ID(联合云ID)|是|[string]|||
|data>>enterprise_name|企业名称|是|[string]|||
|data>>enterprise_alias|企业别名|是|[string]|||
|data>>create_time|创建时间|是|[string]|||
|data>>region_num|集群数量|是|[int]|||
|data>>user_num|用户数量|是|[int]|||
|data>>team_num|团队数量|是|[int]|||
|data>>is_active|是否启用|是|[boolean]|||

EnterpriseSource

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|enterprise_id|企业ID(联合云ID)|是|[string]|||
|used_cpu|使用的cpu|是|[number]|||
|used_memory|使用的内存|是|[number]|||
|used_disk|使用的存储|是|[number]|||

RegionInfoAndStatusResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_id|region id|是|[string]|||
|enterprise_id|企业ID|是|[string]|||
|enterprise_alias|企业别名|是|[string]|||
|region_name|集群名称|是|[string]|||
|region_alias|集群别名|是|[string]|||
|region_type|集群类型|是|[array]|||
|url|集群API url|是|[string]|||
|wsurl|集群Websocket url|是|[string]|||
|httpdomain|集群http应用访问根域名|是|[string]|||
|tcpdomain|集群tcp应用访问根域名|是|[string]|||
|status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|集群描述|是|[string]|||
|ssl_ca_cert|api ca file|是|[string]|||
|cert_file|api cert file|是|[string]|||
|key_file|api cert key file|是|[string]|||
|total_memory|调度内存总和MB|是|[int]|||
|used_memory|调度内存使用量MB|是|[int]|||
|total_cpu|调度CPU总和|是|[int]|||
|used_cpu|调度CPU使用量|是|[number]|||
|total_disk|全局共享存储总量GB|是|[int]|||
|used_disk|全局共享存储使用量GB|是|[int]|||
|rbd_version|集群版本|是|[string]|||

ListRegionsResp

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|total|总数|是|[int]|||
|data||是|[array]|||
|data>>region_id|region id|是|[string]|||
|data>>enterprise_id|企业ID|是|[string]|||
|data>>enterprise_alias|企业别名|是|[string]|||
|data>>region_name|集群名称|是|[string]|||
|data>>region_alias|集群别名|是|[string]|||
|data>>region_type|集群类型|是|[array]|||
|data>>url|集群API url|是|[string]|||
|data>>wsurl|集群Websocket url|是|[string]|||
|data>>httpdomain|集群http应用访问根域名|是|[string]|||
|data>>tcpdomain|集群tcp应用访问根域名|是|[string]|||
|data>>status|集群状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|data>>desc|集群描述|是|[string]|||
|data>>ssl_ca_cert|api ca file|是|[string]|||
|data>>cert_file|api cert file|是|[string]|||
|data>>key_file|api cert key file|是|[string]|||
|data>>total_memory|调度内存总和MB|是|[int]|||
|data>>used_memory|调度内存使用量MB|是|[int]|||
|data>>total_cpu|调度CPU总和|是|[int]|||
|data>>used_cpu|调度CPU使用量|是|[number]|||
|data>>total_disk|全局共享存储总量GB|是|[int]|||
|data>>used_disk|全局共享存储使用量GB|是|[int]|||
|data>>rbd_version|集群版本|是|[string]|||

v2-RegionConfig

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_id|region id|是|[string]|||
|region_name|数据中心名称,不可修改|是|[string]|||
|region_alias|数据中心别名|是|[string]|||
|url|数据中心API url|是|[string]|||
|token|数据中心token|否|[string]|||
|wsurl|数据中心Websocket url|是|[string]|||
|httpdomain|数据中心http应用访问根域名|是|[string]|||
|tcpdomain|数据中心tcp应用访问根域名|是|[string]|||
|scope|数据中心范围 private|public|否|[string]|||
|ssl_ca_cert|数据中心访问ca证书地址|否|[string]|||
|cert_file|验证文件|否|[string]|||
|key_file|验证的key|否|[string]|||
|status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|数据中心描述|否|[string]|||

UpdateRegionReq

| 参数名  | 说明 | 必填 | 类型 | 值可能性 | 示例 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
|region_alias|数据中心别名|是|[string]|||
|url|数据中心API url|是|[string]|||
|token|数据中心token|否|[string]|||
|wsurl|数据中心Websocket url|是|[string]|||
|httpdomain|数据中心http应用访问根域名|是|[string]|||
|tcpdomain|数据中心tcp应用访问根域名|是|[string]|||
|scope|数据中心范围 private|public|否|[string]|||
|ssl_ca_cert|数据中心访问ca证书地址|否|[string]|||
|cert_file|验证文件|否|[string]|||
|key_file|验证的key|否|[string]|||
|status|数据中心状态 0：编辑中 1:启用 2：停用 3:维护中|是|[string]|||
|desc|数据中心描述|否|[string]|||

**详细说明**：
获取企业管理员列表
```
