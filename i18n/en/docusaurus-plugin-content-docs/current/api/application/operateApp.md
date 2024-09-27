---
title: operating application
---

## Basic Information

This interface is mainly used for components under batch operation applications, and supports start, stop, update, and build

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/operations
```

```json title="Body 请求体示例"
{
  "action": "stop",
  "service_ids": [
    "string"
  ]
}
```

## request parameters

| name                             | Location | type                                                    | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------------------------------------------------------- | -------- | ------------ | ---------- |
| app_id      | path     | integer                                                 | Yes      |              | app id     |
| team_id     | path     | string                                                  | Yes      |              | none       |
| region_name | path     | string                                                  | Yes      |              | none       |
| body                             | body     | [ServiceGroupOperations](#schemaservicegroupoperations) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Success    |

## return data structure

```json title="响应示例"
```

## Model

### ServiceGroupOperations<a id="schemaservicegroupoperations"></a>

```json
{
  "action": "stop",
  "service_ids": [
    "string"
  ]
}
```

### Attributes

| name                             | type                                                         | required | constraint | Chinese name | illustrate                                                                                          |
| -------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ------------ | --------------------------------------------------------------------------------------------------- |
| action                           | string                                                       | true     | none       | Action       | Operation type                                                                                      |
| service_ids | [string] | false    | none       |              | List of component IDs, if no value is passed, all components under the application will be operated |

#### enumeration value

| Attributes | value   |
| ---------- | ------- |
| action     | stop    |
| action     | start   |
| action     | upgrade |
| action     | deploy  |
