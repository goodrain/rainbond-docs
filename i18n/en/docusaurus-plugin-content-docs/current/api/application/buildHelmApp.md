---
title: Create Helm App
---

## Basic Information

This interface is primarily used to check and install Helm Chart Packages app

### Get Request

```shell title="请求路径"
Get /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
LO
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### Request Parameters

| Name                             | Locations | Type                 | Required | Chinese name | Note             |
| -------------------------------- | --------- | -------------------- | -------- | ------------ | ---------------- |
| team_id     | Path      | String               | Yes      |              | Team ID, name    |
| region_name | Path      | String               | Yes      |              | Data Center Name |
| app_id      | Path      | integer              | Yes      |              | App group id     |
| body                             | body      | [请求模型](#RequestBody) | No       |              | none             |

#### Back to results

| Status Code | Status code meanings | Note    | Data Model               |
| ----------- | -------------------- | ------- | ------------------------ |
| 200         | OK                   | Success | [响应模型](#getResponseBody) |

### Postrequest

```shell title="请求路径"
Post /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
LO
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### Request Parameters

| Name                             | Locations | Type                 | Required | Chinese name | Note             |
| -------------------------------- | --------- | -------------------- | -------- | ------------ | ---------------- |
| team_id     | Path      | String               | Yes      |              | Team ID, name    |
| region_name | Path      | String               | Yes      |              | Data Center Name |
| app_id      | Path      | integer              | Yes      |              | App group id     |
| body                             | body      | [请求模型](#RequestBody) | No       |              | none             |

#### Back to results

| Status Code | Status code meanings | Note    | Data Model |
| ----------- | -------------------- | ------- | ---------- |
| 200         | OK                   | Success |            |

## Model

### Request Model<a id="RequestBody"></a>

```json
LO
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

### Properties

| Name                            | Type   | Required | Constraints | Chinese name | Note                 |
| ------------------------------- | ------ | -------- | ----------- | ------------ | -------------------- |
| repo_name  | String | false    | none        | repo name    | helm repository name |
| Chart_name | String | false    | none        | chart name   | helm chart app name  |
| version                         | String | false    | none        | version      | App Version          |

### Response Model<a id="getResponseBody"></a>

```json
LO
  "checkAdopt": "bool",
  "yaml": "string",
}
```

### Properties

| Name          | Type   | Required | Constraints | Chinese name   | Note              |
| ------------- | ------ | -------- | ----------- | -------------- | ----------------- |
| CheckAdoption | String | true     | none        | Check adoption | Check pass status |
| yaml          | String | true     | none        | yaml           | Failed Reason     |
