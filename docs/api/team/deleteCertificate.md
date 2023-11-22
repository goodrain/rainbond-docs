---
title: 删除证书
---

## 基本信息

该接口主要用于删除证书

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/certificates/{certificate_id}
```

## 请求参数

| 名称           | 位置 | 类型   | 必选 | 中文名 | 说明 |
| -------------- | ---- | ------ | ---- | ------ | ---- |
| team_id        | path | string | 是   |        | none |
| certificate_id | path | string | 是   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 204    | OK | 成功 | Inline   |
