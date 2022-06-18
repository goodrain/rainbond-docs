---
title: 删除组件
---

## 基本信息

该接口主要用于删除组件

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}
```

## 请求参数

| 名称        | 位置  | 类型    | 必选 | 中文名 | 说明     |
| ----------- | ----- | ------- | ---- | ------ | -------- |
| app_id      | path  | integer | 是   |        | 应用id   |
| team_id     | path  | string  | 是   |        | none     |
| region_name | path  | string  | 是   |        | none     |
| service_id  | path  | string  | 是   |        | none     |
| force       | query | integer | 否   |        | 强制删除 |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |
