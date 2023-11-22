---
title: 获取应用可升级信息
---

## 基本信息

该接口主要用于获取应用可升级信息

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/upgrade
```

## 请求参数

| 名称        | 位置 | 类型    | 必选 | 中文名 | 说明     |
| ----------- | ---- | ------- | ---- | ------ | -------- |
| app_id      | path | integer | 是   |        | 应用组id |
| team_id     | path | string  | 是   |        | none     |
| region_name | path | string  | 是   |        | none     |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |


## 返回数据结构

```json title="响应示例"
[
  {
    "market_name": "string",
    "app_model_id": "string",
    "app_model_name": "string",
    "current_version": "string",
    "enterprise_id": "string",
    "can_upgrade": true,
    "upgrade_versions": [
      "string"
    ],
    "source": "string"
  }
]
```

| 名称               | 类型                                | 必选  | 约束 | 中文名          | 说明             |
| ------------------ | ----------------------------------- | ----- | ---- | --------------- | ---------------- |
| *anonymous*        | [[ListUpgrade](#schemalistupgrade)] | false | none |                 | none             |
| » market_name      | string                              | true  | none | Market name     | 应用商店名称     |
| » app_model_id     | string                              | true  | none | App model id    | 应用模型id       |
| » app_model_name   | string                              | true  | none | App model name  | 应用模型名称     |
| » current_version  | string                              | true  | none | Current version | 当前版本         |
| » enterprise_id    | string                              | true  | none | Enterprise id   | 企业id           |
| » can_upgrade      | boolean                             | true  | none | Can upgrade     | 可升级           |
| » upgrade_versions | [string]                            | true  | none |                 | 可升级的版本列表 |
| » source           | string                              | true  | none | Source          | 应用模型来源     |

## 模型

### ListUpgrade<a id="schemalistupgrade"></a>

```json
{
  "market_name": "string",
  "app_model_id": "string",
  "app_model_name": "string",
  "current_version": "string",
  "enterprise_id": "string",
  "can_upgrade": true,
  "upgrade_versions": [
    "string"
  ],
  "source": "string"
}
```

### 属性

| 名称             | 类型     | 必选 | 约束 | 中文名          | 说明             |
| ---------------- | -------- | ---- | ---- | --------------- | ---------------- |
| market_name      | string   | true | none | Market name     | 应用商店名称     |
| app_model_id     | string   | true | none | App model id    | 应用模型id       |
| app_model_name   | string   | true | none | App model name  | 应用模型名称     |
| current_version  | string   | true | none | Current version | 当前版本         |
| enterprise_id    | string   | true | none | Enterprise id   | 企业id           |
| can_upgrade      | boolean  | true | none | Can upgrade     | 可升级           |
| upgrade_versions | [string] | true | none |                 | 可升级的版本列表 |
| source           | string   | true | none | Source          | 应用模型来源     |
