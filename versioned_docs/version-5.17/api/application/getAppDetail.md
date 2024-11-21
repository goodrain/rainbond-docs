---
title: 获取应用详情
---

## 基本信息
该接口主要用于获取应用详情

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}
```

## 请求参数

| 名称        | 位置 | 类型    | 必选 | 中文名 | 说明   |
| ----------- | ---- | ------- | ---- | ------ | ------ |
| app_id      | path | integer | 是   |        | 应用id |
| team_id     | path | string  | 是   |        | none   |
| region_name | path | string  | 是   |        | none   |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                  |
| ------ | ------------------------------------------------------- | ---- | ------------------------- |
| 200    | OK | 成功 | [AppInfo](#schemaappinfo) |


## 返回数据结构

```json title="响应示例"
{
  "ID": 0,
  "enterprise_id": "string",
  "service_count": 0,
  "running_service_count": 0,
  "used_momory": 0,
  "used_cpu": 0,
  "app_id": 0,
  "team_name": "string",
  "status": "running",
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14:15:22Z",
  "update_time": "2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

## 模型

### AppInfo<a id="schemaappinfo"></a>

```json
{
  "ID": 0,
  "enterprise_id": "string",
  "service_count": 0,
  "running_service_count": 0,
  "used_momory": 0,
  "used_cpu": 0,
  "app_id": 0,
  "team_name": "string",
  "status": "running",
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14:15:22Z",
  "update_time": "2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

### 属性

| 名称                  | 类型              | 必选  | 约束      | 中文名                | 说明                      |
| --------------------- | ----------------- | ----- | --------- | --------------------- | ------------------------- |
| ID                    | integer           | false | read-only | ID                    | none                      |
| enterprise_id         | string            | true  | none      | Enterprise id         | 企业ID(联合云ID)          |
| service_count         | integer           | true  | none      | Service count         | 组件数量                  |
| running_service_count | integer           | true  | none      | Running service count | 正在运行的组件数量        |
| used_momory           | integer           | true  | none      | Used momory           | 分配的内存                |
| used_cpu              | integer           | true  | none      | Used cpu              | 分配的cpu                 |
| app_id                | integer           | true  | none      | App id                | 应用id                    |
| team_name             | string            | true  | none      | Team name             | 团队名                    |
| status                | string            | true  | none      | Status                | 应用状态                  |
| tenant_id             | string            | true  | none      | Tenant id             | 租户id                    |
| group_name            | string            | true  | none      | Group name            | 组名                      |
| region_name           | string            | true  | none      | Region name           | 区域中心名称              |
| is_default            | boolean           | false | none      | Is default            | 默认组件                  |
| order_index           | integer           | false | none      | Order index           | 应用排序                  |
| note                  | string¦null       | false | none      | Note                  | 备注                      |
| username              | string¦null       | false | none      | Username              | the username of principal |
| governance_mode       | string¦null       | false | none      | Governance mode       | governance mode           |
| create_time           | string(date-time) | true  | none      | Create time           | 创建时间                  |
| update_time           | string(date-time) | true  | none      | Update time           | 更新时间                  |
| app_type              | string            | false | none      | App type              | 应用类型                  |
| app_store_name        | string¦null       | false | none      | App store name        | 应用商店名称              |
| app_store_url         | string¦null       | false | none      | App store url         | 应用商店 URL              |
| app_template_name     | string¦null       | false | none      | App template name     | 应用模板名称              |
| version               | string¦null       | false | none      | Version               | Helm 应用版本             |
| logo                  | string¦null       | false | none      | Logo                  | 应用logo                  |
| k8s_app               | string            | false | none      | K8s app               | 集群内应用名称            |

#### 枚举值

| 属性   | 值           |
| ------ | ------------ |
| status | running      |
| status | part_running |
| status | closed       |