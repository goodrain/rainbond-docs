---
title: Change Image Name
---

## Basic Information

This interface is mainly used to replace components built by docker, replacing their addresses

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/docker-image-change
```

```json title="Body 请求体示例"
{
  "image": "nginx:latest"
}
```

## Request Parameters

| Name                             | Location | Type    | Required | Chinese Name | Description          |
| -------------------------------- | -------- | ------- | -------- | ------------ | -------------------- |
| app_id      | path     | integer | Yes      |              | application group id |
| team_id     | path     | string  | Yes      |              | none                 |
| region_name | path     | string  | Yes      |              | none                 |
| service_id  | path     | string  | Yes      |              | component id         |

\| body        | body | json    | No   |        | none     |

## Return Result

| Status Code | Status Code Meaning | Description | Data Model |
| ----------- | ------------------- | ----------- | ---------- |
| 200         | OK                  | Success     | Inline     |
