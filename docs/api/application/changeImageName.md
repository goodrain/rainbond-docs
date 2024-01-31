---
title: 更换镜像名称
---

## 基本信息

该接口主要用于更换由docker构建的组件，更换其地址

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/docker-image-change
```

```json title="Body 请求体示例"
{
  "image": "nginx:latest"
}
```

## 请求参数

| 名称        | 位置 | 类型      | 必选 | 中文名 | 说明    |
| ----------- | ---- |---------| ---- | ------ |-------|
| app_id      | path | integer | 是   |        | 应用组id |
| team_id     | path | string  | 是   |        | none  |
| region_name | path | string  | 是   |        | none  |
| service_id | path | string  | 是   |        | 组件id  |

| body        | body | json    | 否   |        | none     |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |