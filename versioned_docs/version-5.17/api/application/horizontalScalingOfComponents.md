---
title: 组件水平伸缩
---

## 基本信息

该接口主要用于组件水平伸缩

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/telescopic/horizontal
```

```json title="Body 请求体示例"
{
  "new_node": 0
}
```

## 请求参数

| 名称        | 位置 | 类型                                                         | 必选 | 中文名 | 说明   |
| ----------- | ---- | ------------------------------------------------------------ | ---- | ------ | ------ |
| app_id      | path | integer                                                      | 是   |        | 应用id |
| team_id     | path | string                                                       | 是   |        | none   |
| region_name | path | string                                                       | 是   |        | none   |
| service_id  | path | string                                                       | 是   |        | none   |
| body        | body | [AppServiceTelescopicHorizontal](#schemaappservicetelescopichorizontal) | 否   |        | none   |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 201    | Created | 成功 | [AppServiceTelescopicHorizontal](#schemaappservicetelescopichorizontal)   |

## 模型

### AppServiceTelescopicHorizontal<a id="schemaappservicetelescopichorizontal"></a>

```json
{
  "new_node": 0
}
```

### 属性

| 名称     | 类型    | 必选 | 约束 | 中文名   | 说明     |
| -------- | ------- | ---- | ---- | -------- | -------- |
| new_node | integer | true | none | New node | 组件节点 |
