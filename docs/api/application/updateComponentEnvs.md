---
title: 更新组件环境变量
---

## 基本信息

该接口主要用于更新组件环境变量

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/envs
```

```json title="Body 请求体示例"
{
  "envs": [
    {
      "note": "string",
      "name": "string",
      "value": "string",
      "is_change": true,
      "scope": "inner"
    }
  ]
}
```

## 请求参数

| 名称        | 位置 | 类型                                                        | 必选 | 中文名 | 说明     |
| ----------- | ---- | ----------------------------------------------------------- | ---- | ------ | -------- |
| app_id      | path | integer                                                     | 是   |        | 应用id   |
| service_id  | path | string                                                      | 是   |        | 应用id   |
| team_id     | path | string                                                      | 是   |        | 团队id   |
| region_name | path | string                                                      | 是   |        | 集群名称 |
| body        | body | [ComponentEnvsSerializers](#schemacomponentenvsserializers) | 否   |        | none     |

## 返回结果### 

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                    |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------------- |
| 200    | OK | 成功 | [ComponentEnvsSerializers](#schemacomponentenvsserializers) |

## 模型

### ComponentEnvsSerializers<a id="schemacomponentenvsserializers"></a>
```json
{
  "envs": [
    {
      "note": "string",
      "name": "string",
      "value": "string",
      "is_change": true,
      "scope": "inner"
    }
  ]
}
```

### 属性

| 名称 | 类型                                                         | 必选 | 约束 | 中文名 | 说明 |
| ---- | ------------------------------------------------------------ | ---- | ---- | ------ | ---- |
| envs | [[ComponentEnvsBaseSerializers](#schemacomponentenvsbaseserializers)] | true | none |        | none |

### ComponentEnvsBaseSerializers<a id="schemacomponentenvsbaseserializers"></a>

```json
{
  "note": "string",
  "name": "string",
  "value": "string",
  "is_change": true,
  "scope": "inner"
}
```

### 属性

| 名称      | 类型    | 必选  | 约束 | 中文名    | 说明       |
| --------- | ------- | ----- | ---- | --------- | ---------- |
| note      | string  | false | none | Note      | 备注       |
| name      | string  | true  | none | Name      | 环境变量名 |
| value     | string  | true  | none | Value     | 环境变量值 |
| is_change | boolean | false | none | Is change | 是否可改变 |
| scope     | string  | false | none | Scope     | 范围       |
