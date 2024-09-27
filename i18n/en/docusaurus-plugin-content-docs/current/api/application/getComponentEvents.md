---
title: Get component event information
---

## Basic Information

This interface is mainly used to query component event information

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/events
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate        |
| -------------------------------- | -------- | ------- | -------- | ------------ | ----------------- |
| app_id      | path     | integer | Yes      |              | app id            |
| team_id     | path     | string  | Yes      |              | none              |
| region_name | path     | string  | Yes      |              | none              |
| service_id  | path     | string  | Yes      |              | none              |
| page                             | query    | integer | no       |              | page number       |
| page_size   | query    | integer | no       |              | Quantity per page |

## return result

| status code | Status code meaning | illustrate | data model                                                    |
| ----------- | ------------------- | ---------- | ------------------------------------------------------------- |
| 200         | OK                  | success    | [ListServiceEventsResponse](#schemalistserviceeventsresponse) |

## Model

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
      " EndTime": "string",
      "Target": "string",
      "OptType": "string",
      "TargetID": "string",
      "ServiceID": "string",
      "Status": "string ",
      "RequestBody": "string",
      "create_time": "string",
      "FinalStatus": "string",
      "StartTime": "string",
      "SynType": "string",
      "Message ": "string",
      "TenantID": "string",
      "ID": "string"
    }
  ]
}
```

### Attributes

| name                           | type                                                                                              | required | constraint | Chinese name | illustrate          |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ------------------- |
| page                           | integer                                                                                           | true     | none       | Page         | current page number |
| page_size | integer                                                                                           | true     | none       | Page Size    | Quantity per page   |
| total                          | integer                                                                                           | true     | none       | Total        | Total data          |
| events                         | [[AppServiceEvents](#schemaappserviceevents)] | true     | none       |              | none                |

### AppServiceEvents<a id="schemaappserviceevents"></a>

```json
{
  "EventID": "string",
  "UserName": "string",
  "EndTime": "string",
  "Target": "string",
  "OptType": "string",
  "TargetID" : "string",
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

### Attributes

| name                             | type   | required | constraint | Chinese name | illustrate          |
| -------------------------------- | ------ | -------- | ---------- | ------------ | ------------------- |
| EventID                          | string | true     | none       | EventID      | event id            |
| UserName                         | string | true     | none       | UserName     | Operator            |
| EndTime                          | string | true     | none       | EndTime      | end event           |
| Target                           | string | true     | none       | Target       | Action target type  |
| OptType                          | string | true     | none       | OptType      | event type          |
| TargetID                         | string | true     | none       | TargetID     | Operation target id |
| ServiceID                        | string | true     | none       | ServiceID    | service id          |
| Status                           | string | true     | none       | Status       | state               |
| RequestBody                      | string | true     | none       | RequestBody  | request parameters  |
| create_time | string | true     | none       | Create time  | creation time       |
| FinalStatus                      | string | true     | none       | FinalStatus  | final state         |
| StartTime                        | string | true     | none       | StartTime    | Starting time       |
| SynType                          | string | true     | none       | SynType      | sync status         |
| Message                          | string | true     | none       | Message      | log                 |
| TenantID                         | string | true     | none       | TenantID     | team id             |
| ID                               | string | true     | none       | ID           | record id           |
