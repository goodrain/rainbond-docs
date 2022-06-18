---
title: 获取组件事件信息
---

## 基本信息

该接口主要用于查询组件事件信息

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/events
```

## 请求参数

| 名称        | 位置  | 类型    | 必选 | 中文名 | 说明     |
| ----------- | ----- | ------- | ---- | ------ | -------- |
| app_id      | path  | integer | 是   |        | 应用id   |
| team_id     | path  | string  | 是   |        | none     |
| region_name | path  | string  | 是   |        | none     |
| service_id  | path  | string  | 是   |        | none     |
| page        | query | integer | 否   |        | 页码     |
| page_size   | query | integer | 否   |        | 每页数量 |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [ListServiceEventsResponse](#schemalistserviceeventsresponse)   |

## 模型

### ListServiceEventsResponse<a id="schemalistserviceeventsresponse"></a>

```json
{
  "page": 0,
  "page_size": 0,
  "total": 0,
  "events": [
    {
      "EventID": "string",
      "UserName": "string",
      "EndTime": "string",
      "Target": "string",
      "OptType": "string",
      "TargetID": "string",
      "ServiceID": "string",
      "Status": "string",
      "RequestBody": "string",
      "create_time": "string",
      "FinalStatus": "string",
      "StartTime": "string",
      "SynType": "string",
      "Message": "string",
      "TenantID": "string",
      "ID": "string"
    }
  ]
}
```

### 属性

| 名称      | 类型                                          | 必选 | 约束 | 中文名    | 说明     |
| --------- | --------------------------------------------- | ---- | ---- | --------- | -------- |
| page      | integer                                       | true | none | Page      | 当前页数 |
| page_size | integer                                       | true | none | Page size | 每页数量 |
| total     | integer                                       | true | none | Total     | 数据总数 |
| events    | [[AppServiceEvents](#schemaappserviceevents)] | true | none |           | none     |

### AppServiceEvents<a id="schemaappserviceevents"></a>

```json
{
  "EventID": "string",
  "UserName": "string",
  "EndTime": "string",
  "Target": "string",
  "OptType": "string",
  "TargetID": "string",
  "ServiceID": "string",
  "Status": "string",
  "RequestBody": "string",
  "create_time": "string",
  "FinalStatus": "string",
  "StartTime": "string",
  "SynType": "string",
  "Message": "string",
  "TenantID": "string",
  "ID": "string"
}
```

### 属性

| 名称        | 类型   | 必选 | 约束 | 中文名      | 说明         |
| ----------- | ------ | ---- | ---- | ----------- | ------------ |
| EventID     | string | true | none | Eventid     | 事件id       |
| UserName    | string | true | none | Username    | 操作人       |
| EndTime     | string | true | none | Endtime     | 结束事件     |
| Target      | string | true | none | Target      | 操作目标类型 |
| OptType     | string | true | none | Opttype     | 事件类型     |
| TargetID    | string | true | none | Targetid    | 操作目标id   |
| ServiceID   | string | true | none | Serviceid   | 服务id       |
| Status      | string | true | none | Status      | 状态         |
| RequestBody | string | true | none | Requestbody | 请求参数     |
| create_time | string | true | none | Create time | 创建时间     |
| FinalStatus | string | true | none | Finalstatus | 最终状态     |
| StartTime   | string | true | none | Starttime   | 开始时间     |
| SynType     | string | true | none | Syntype     | 同步状态     |
| Message     | string | true | none | Message     | 日志         |
| TenantID    | string | true | none | Tenantid    | 团队id       |
| ID          | string | true | none | Id          | 记录id       |
