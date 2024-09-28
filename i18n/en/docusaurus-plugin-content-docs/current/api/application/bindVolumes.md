---
title: Mount Component Storage
---

## Basic Information

This interface is primarily used to mount component storage.

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/volumes
```

```json title="Body 请求体示例"
LO
  "volume_name": "name",
  "volume_type": "share-file",
  "volume_path": "/data4",
  "volume_capacity": 1
}
```

## Request Parameters

| Name                             | Locations | Type                  | Required | Chinese name | Note         |
| -------------------------------- | --------- | --------------------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer               | Yes      |              | App group id |
| team_id     | Path      | String                | Yes      |              | none         |
| region_name | Path      | String                | Yes      |              | none         |
| service_id  | Path      | String                | Yes      |              | Component id |
| body                             | body      | [VolumeBody](#volume) | No       |              | none         |

## Back to results

| Status Code | Status code meanings | Note    | Data Model |
| ----------- | -------------------- | ------- | ---------- |
| 200         | OK                   | Success | Inline     |

## Model

### VolumeBody<a id="volume"></a>

```json
LO
  "volume_name": "name",
  "volume_type": "share-file",
  "volume_path": "/data4",
  "volume_capacity": 1
}
```

### Properties

| Name                                 | Type   | Required | Constraints | Chinese name | Note                                 |
| ------------------------------------ | ------ | -------- | ----------- | ------------ | ------------------------------------ |
| volume_name     | String | true     | none        |              | Name                                 |
| volume_type     | String | true     | none        |              | Mount type                           |
| volume_path     | String | true     | none        |              | Mount Path                           |
| volume_capacity | String | true     | none        |              | Storage size (GB) |
