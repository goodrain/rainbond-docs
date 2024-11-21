---
title: 构建组件
---

## 基本信息

该接口主要用于构建组件，用于CI/CD工作流调用

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/build
```

```json title="Body 请求体示例"
{
  "build_type": "source_code",
  "server_type": "svn",
  "branch": "master",
  "repo_url": "string",
  "username": "string",
  "password": "string"
}
```

## 请求参数

| 名称        | 位置 | 类型                                                         | 必选 | 中文名 | 说明         |
| ----------- | ---- | ------------------------------------------------------------ | ---- | ------ | ------------ |
| team_id     | path | string                                                       | 是   |        | 团队ID、名称 |
| region_name | path | string                                                       | 是   |        | 数据中心名称 |
| app_id      | path | integer                                                      | 是   |        | 应用组id     |
| service_id  | path | string                                                       | 是   |        | 组件ID       |
| body        | body | [ComponentBuildReqSerializers](#schemacomponentbuildreqserializers) | 否   |        | none         |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                     |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| 200    | OK | 成功 | [ComponentEventSerializers](#schemacomponenteventserializers) |

## 模型

### ComponentBuildReqSerializers<a id="schemacomponentbuildreqserializers"></a>

```json
{
  "build_type": "source_code",
  "server_type": "svn",
  "branch": "master",
  "repo_url": "string",
  "username": "string",
  "password": "string"
}
```

### 属性

| 名称        | 类型        | 必选  | 约束 | 中文名      | 说明                                              |
| ----------- | ----------- | ----- | ---- | ----------- | ------------------------------------------------- |
| build_type  | string¦null | false | none | Build type  | 组件构建源类型                                    |
| server_type | string¦null | false | none | Server type | 源码来源类型                                      |
| branch      | string¦null | false | none | Branch      | 代码分支，tag信息                                 |
| repo_url    | string¦null | false | none | Repo url    | 来源仓库服务地址，包括代码仓库、镜像仓库、OSS地址 |
| username    | string¦null | false | none | Username    | 来源仓库服务账号                                  |
| password    | string¦null | false | none | Password    | 来源仓库服务密码                                  |

#### 枚举值

| 属性        | 值           |
| ----------- | ------------ |
| build_type  | source_code  |
| build_type  | docker_image |
| build_type  | market       |
| server_type | svn          |
| server_type | git          |
| server_type | oss          |

### ComponentEventSerializers<a id="schemacomponenteventserializers"></a>

```json
{
  "event_id": "string"
}
```

### 属性

| 名称     | 类型   | 必选 | 约束 | 中文名   | 说明   |
| -------- | ------ | ---- | ---- | -------- | ------ |
| event_id | string | true | none | Event id | 事件ID |
