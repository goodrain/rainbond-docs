---
title: 组件垂直伸缩
---

## 基本信息

该接口主要用于组件垂直伸缩

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/telescopic/vertical
```

```json title="Body 请求体示例"
{
  "new_memory": 0,
  "new_gpu": 0,
  "new_cpu": 0
}
```

## 请求参数

| 名称        | 位置 | 类型                                                         | 必选 | 中文名 | 说明   |
| ----------- | ---- | ------------------------------------------------------------ | ---- | ------ | ------ |
| app_id      | path | integer                                                      | 是   |        | 应用id |
| team_id     | path | string                                                       | 是   |        | none   |
| region_name | path | string                                                       | 是   |        | none   |
| service_id  | path | string                                                       | 是   |        | none   |
| body        | body | [AppServiceTelescopicVertical](#schemaappservicetelescopicvertical) | 否   |        | none   |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 201    | Created | 成功 | [AppServiceTelescopicVertical](#schemaappservicetelescopicvertical)   |

## 模型

### AppServiceTelescopicVertical<a id="schemaappservicetelescopicvertical"></a>

```json
{
  "new_memory": 0,
  "new_gpu": 0,
  "new_cpu": 0
}

```

### 属性

| 名称       | 类型    | 必选 | 约束 | 中文名     | 说明            |
| ---------- | ------- | ---- | ---- | ---------- | --------------- |
| new_memory | integer | true | none | New memory | 组件内存        |
| new_gpu    | integer | true | none | New gpu    | 组件gpu显存申请 |
| new_cpu    | integer | true | none | New cpu    | 组件cpu额度申请 |
