---
title: Bind Component Storage
---

## Basic Information

This interface is mainly used to bind component storage

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/volumes
```

```json title="Body 请求体示例"
{
  "volume_name": "name",
  "volume_type": "share-file",
  "volume_path": "/data4",
  "volume_capacity": 1
}
```

## Request Parameters

| Basic Information                | Location | Type                  | Required | Chinese Name | Description          |
| -------------------------------- | -------- | --------------------- | -------- | ------------ | -------------------- |
| app_id      | path     | integer               | Yes      |              | application group id |
| team_id     | path     | string                | Yes      |              | none                 |
| region_name | path     | string                | Yes      |              | none                 |
| service_id  | path     | string                | Yes      |              | component id         |
| body                             | body     | [VolumeBody](#volume) | No       |              | none                 |

## Return Result

| Status Code | Status Code Meaning | Description | Data Model |
| ----------- | ------------------- | ----------- | ---------- |
| 200         | OK                  | Success     | Inline     |

## Model

### VolumeBody<a id="volume"></a>

```json
{
  "volume_name": "name",
  "volume_type": "share-file",
  "volume_path": "/data4",
  "volume_capacity": 1
}
```

### Attributes

| Basic Information                    | Type   | Required | Constraint | Chinese Name | Description                         |
| ------------------------------------ | ------ | -------- | ---------- | ------------ | ----------------------------------- |
| volume_name     | string | true     | none       |              | Basic Information                   |
| volume_type     | string | true     | none       |              | Mount Type                          |
| volume_path     | string | true     | none       |              | Mount Path                          |
| volume_capacity | string | true     | none       |              | Storage Size(GB) |
