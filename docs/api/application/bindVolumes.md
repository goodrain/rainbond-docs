---
title: 挂载组件储存
---

## 基本信息

该接口主要用于挂载组件储存

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

## 请求参数

| 名称        | 位置 | 类型                    | 必选 | 中文名 | 说明     |
| ----------- | ---- |-----------------------| ---- | ------ | -------- |
| app_id      | path | integer               | 是   |        | 应用组id |
| team_id     | path | string                | 是   |        | none     |
| region_name | path | string                | 是   |        | none     |
| service_id | path | string                | 是   |        | 组件id  |
| body        | body | [VolumeBody](#volume) | 否   |        | none     |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |

## 模型

### VolumeBody<a id="volume"></a>

```json
{
  "volume_name": "name",
  "volume_type": "share-file",
  "volume_path": "/data4",
  "volume_capacity": 1
}
```

### 属性

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明       |
| --------------- |--------| ---- | ---- | ------ |----------|
| volume_name | string | true | none |        | 名称       |
| volume_type | string | true | none |        | 挂载类型     |
| volume_path | string | true | none |        | 挂载路径     |
| volume_capacity | string | true | none |        | 储存大小(GB) |

