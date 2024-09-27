---
title: Create Helm App
---

## Basic Information

This interface is mainly used to check and install Helm chart package applications

### Get Request

```shell title="请求路径"
Get /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### Request Parameters

| Name                             | Location | Type                          | Required | Chinese Name | Description          |
| -------------------------------- | -------- | ----------------------------- | -------- | ------------ | -------------------- |
| team_id     | path     | string                        | Yes      |              | Team ID, name        |
| region_name | path     | string                        | Yes      |              | data center name     |
| app_id      | path     | integer                       | Yes      |              | application group id |
| body                             | body     | [Request Model](#RequestBody) | No       |              | none                 |

#### Return Result

| Status Code | Status Code Meaning | Description | Data Model                         |
| ----------- | ------------------- | ----------- | ---------------------------------- |
| 200         | OK                  | Success     | [Response Model](#getResponseBody) |

### Post Request

```shell title="请求路径"
Post /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### Request Parameters

| Name                             | Location | Type                          | Required | Chinese Name | Description          |
| -------------------------------- | -------- | ----------------------------- | -------- | ------------ | -------------------- |
| team_id     | path     | string                        | Yes      |              | Team ID, name        |
| region_name | path     | string                        | Yes      |              | data center name     |
| app_id      | path     | integer                       | Yes      |              | application group id |
| body                             | body     | [Request Model](#RequestBody) | No       |              | none                 |

#### Return Result

| Status Code | Status Code Meaning | Description | Data Model |
| ----------- | ------------------- | ----------- | ---------- |
| 200         | OK                  | Success     |            |

## Model

### Request Model<a id="RequestBody"></a>

```json
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

### Attributes

| Name                            | Type   | Required | constraint | Chinese name | Description                 |
| ------------------------------- | ------ | -------- | ---------- | ------------ | --------------------------- |
| repo_name  | string | false    | none       | repo name    | helm repository name        |
| chart_name | string | false    | none       | chart name   | helm chart application name |
| version                         | string | false    | none       | version      | App version                 |

### Response model<a id="getResponseBody"></a>

```json
{
  "checkAdopt": "bool",
  "yaml": "string",
}
```

### Attributes

| Basic Information | type   | required | constraint | Chinese name | Description           |
| ----------------- | ------ | -------- | ---------- | ------------ | --------------------- |
| checkAdopt        | string | true     | none       | check adopt  | check adoption status |
| yaml              | string | true     | none       | yaml         | failure reason        |
