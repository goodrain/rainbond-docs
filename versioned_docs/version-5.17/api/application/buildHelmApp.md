---
title: 创建 Helm 应用
---

## 基本信息

该接口主要用于检查并安装 Helm chart包应用

### Get请求

```shell title="请求路径"
Get /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### 请求参数

| 名称        | 位置 | 类型                                                         | 必选 | 中文名 | 说明         |
| ----------- | ---- | ------------------------------------------------------------ | ---- | ------ | ------------ |
| team_id     | path | string                                                       | 是   |        | 团队ID、名称 |
| region_name | path | string                                                       | 是   |        | 数据中心名称 |
| app_id      | path | integer                                                      | 是   |        | 应用组id     |
| body        | body | [请求模型](#RequestBody) | 否   |        | none         |

#### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                     |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| 200    | OK | 成功 | [响应模型](#getResponseBody) |

### Post请求

```shell title="请求路径"
Post /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/helm_chart
```

```json title="Body 请求体示例"
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

#### 请求参数

| 名称        | 位置 | 类型                                                         | 必选 | 中文名 | 说明         |
| ----------- | ---- | ------------------------------------------------------------ | ---- | ------ | ------------ |
| team_id     | path | string                                                       | 是   |        | 团队ID、名称 |
| region_name | path | string                                                       | 是   |        | 数据中心名称 |
| app_id      | path | integer                                                      | 是   |        | 应用组id     |
| body        | body | [请求模型](#RequestBody) | 否   |        | none         |

#### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                     |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| 200    | OK | 成功 |   |



## 模型

### 请求模型<a id="RequestBody"></a>

```json
{
  "repo_name": "string",
  "chart_name": "string",
  "version": "string",
}
```

### 属性

| 名称        | 类型        | 必选  | 约束 | 中文名      | 说明                                              |
| ----------- | ----------- | ----- | ---- | ----------- | ------------------------------------------------- |
| repo_name  | string | false | none | repo name  | helm 仓库名称                           |
| chart_name | string | false | none | chart name | helm chart 应用名称                     |
| version      | string | false | none | version  | 应用版本                                |

### 响应模型<a id="getResponseBody"></a>

```json
{
  "checkAdopt": "bool",
  "yaml": "string",
}
```

### 属性

| 名称     | 类型   | 必选 | 约束 | 中文名   | 说明   |
| -------- | ------ | ---- | ---- | -------- | ------ |
| checkAdopt | string | true | none | check adopt | 检查通过状态 |
| yaml | string | true | none | yaml | 失败原因 |

