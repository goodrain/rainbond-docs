---
title: Change Image Name
---

## Basic Information

This interface is mainly used to replace components built by docker and to change their addresses

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/docker-image-change
```

```json title="Body 请求体示例"
LOCK
  "image": "nginx:"
}
```

## Request Parameters

| Name                             | Locations | Type    | Required | Chinese name | Note         |
| -------------------------------- | --------- | ------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer | Yes      |              | App group id |
| team_id     | Path      | String  | Yes      |              | none         |
| region_name | Path      | String  | Yes      |              | none         |
| service_id  | Path      | String  | Yes      |              | Component id |

\| body | body | json | No | none |

## Back to results

| Status Code | Status code meanings | Note    | Data Model |
| ----------- | -------------------- | ------- | ---------- |
| 200         | OK                   | Success | Inline     |