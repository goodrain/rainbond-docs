---
title: 复制应用
---

## 基本信息
该接口主要用于复制应用

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
```

```json title="Body 请求体示例"
{
  "services": [
    {
      "service_id": "string"
    }
  ],
  "target_team_name": "string",
  "target_region_name": "string",
  "target_app_id": 3
}
```

此处 `target_team_name` 指定目标团队名称，对应 `tenant_name` 或 `team_name`，值类似于 `o19p6wen`，非用户自定义团队名称

此处 `target_region_name` 指定目标集群名称，对应集群列表接口返回的数据 `region_name`

此处 `target_app_id` 指定目标应用名称

## 请求参数

| 名称        | 位置 | 类型                        | 必选 | 中文名 | 说明 |
| ----------- | ---- | --------------------------- | ---- | ------ | ---- |
| team_id     | path | string                      | 是   |        | none |
| region_name | path | string                      | 是   |        | none |
| app_id      | path | string                      | 是   |        | none |
| body        | body | [AppCopyC](#schemaappcopyc) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                          |
| ------ | ------------------------------------------------------- | ---- | --------------------------------- |
| 200    | OK | 成功 | [AppCopyCRes](#schemaappcopycres) |

## 返回数据结构

```json title="响应示例"
{
  "services": [
    {
      "status": "",
      "access_infos": [
        "string"
      ],
      "service_id": "string",
      "tenant_id": "string",
      "service_key": "string",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string",
      "version": "string",
      "update_version": 3,
      "image": "string",
      "cmd": "string",
      "min_node": 3,
      "min_cpu": 3,
      "container_gpu": 3,
      "min_memory": 3,
      "extend_method": "string",
      "code_from": "string",
      "git_url": "string",
      "git_project_id": 3,
      "code_version": "string",
      "service_type": "string",
      "creater": 3,
      "language": "string",
      "total_memory": 3,
      "is_service": true,
      "service_origin": "string",
      "tenant_service_group_id": 3,
      "open_webhooks": true,
      "service_source": "string",
      "create_status": "string",
      "check_uuid": "string",
      "check_event_id": "string",
      "docker_cmd": "string",
      "server_type": "string",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": 3,
      "k8s_component_name": "string"
    }
  ]
}
```

## 模型

### AppPostInfo<a id="schemaapppostinfo"></a>

```json
{
  "services": [
    {
      "status": "",
      "access_infos": [],
      "service_id": "string",
      "tenant_id": "string",
      "service_key": "string",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string",
      "version": "string",
      "update_version": -2147483648,
      "image": "string",
      "cmd": "string",
      "min_node": -2147483648,
      "min_cpu": -2147483648,
      "container_gpu": -2147483648,
      "min_memory": -2147483648,
      "extend_method": "string",
      "code_from": "string",
      "git_url": "string",
      "git_project_id": -2147483648,
      "code_version": "string",
      "service_type": "string",
      "creater": -2147483648,
      "language": "string",
      "total_memory": -2147483648,
      "is_service": true,
      "service_origin": "string",
      "tenant_service_group_id": -2147483648,
      "open_webhooks": true,
      "service_source": "string",
      "create_status": "string",
      "check_uuid": "string",
      "check_event_id": "string",
      "docker_cmd": "string",
      "server_type": "strin",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": -2147483648,
      "k8s_component_name": "string"
    }
  ]
}
```

### 属性

| 名称     | 类型                                        | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------------------------------------------- | ---- | ---- | ------ | ---- |
| services | [[ServiceBaseInfo](#schemaservicebaseinfo)] | true | none |        | none |

### ServiceBaseInfo<a id="schemaservicebaseinfo"></a>

```json
{
  "status": "",
  "access_infos": [],
  "service_id": "string",
  "tenant_id": "string",
  "service_key": "string",
  "service_alias": "string",
  "service_cname": "string",
  "service_region": "string",
  "desc": "string",
  "category": "string",
  "version": "string",
  "update_version": -2147483648,
  "image": "string",
  "cmd": "string",
  "min_node": -2147483648,
  "min_cpu": -2147483648,
  "container_gpu": -2147483648,
  "min_memory": -2147483648,
  "extend_method": "string",
  "code_from": "string",
  "git_url": "string",
  "git_project_id": -2147483648,
  "code_version": "string",
  "service_type": "string",
  "creater": -2147483648,
  "language": "string",
  "total_memory": -2147483648,
  "is_service": true,
  "service_origin": "string",
  "tenant_service_group_id": -2147483648,
  "open_webhooks": true,
  "service_source": "string",
  "create_status": "string",
  "check_uuid": "string",
  "check_event_id": "string",
  "docker_cmd": "string",
  "server_type": "strin",
  "is_upgrate": true,
  "build_upgrade": true,
  "oauth_service_id": -2147483648,
  "k8s_component_name": "string"
}
```

### 属性

| 名称                    | 类型         | 必选  | 约束 | 中文名                  | 说明                                                      |
| ----------------------- | ------------ | ----- | ---- | ----------------------- | --------------------------------------------------------- |
| status                  | string       | false | none | Status                  | 组件状态                                                  |
| access_infos            | [string]     | false | none |                         | 组件访问地址                                              |
| service_id              | string       | true  | none | Service id              | 组件id                                                    |
| tenant_id               | string       | true  | none | Tenant id               | 租户id                                                    |
| service_key             | string       | true  | none | Service key             | 组件key                                                   |
| service_alias           | string       | true  | none | Service alias           | 组件别名                                                  |
| service_cname           | string       | false | none | Service cname           | 组件名                                                    |
| service_region          | string       | true  | none | Service region          | 组件所属区                                                |
| desc                    | string¦null  | false | none | Desc                    | 描述                                                      |
| category                | string       | true  | none | Category                | 组件分类：application,cache,store                         |
| version                 | string       | true  | none | Version                 | 版本                                                      |
| update_version          | integer      | false | none | Update version          | 内部发布次数                                              |
| image                   | string       | true  | none | Image                   | 镜像                                                      |
| cmd                     | string¦null  | false | none | Cmd                     | 启动参数                                                  |
| min_node                | integer      | false | none | Min node                | 实例数量                                                  |
| min_cpu                 | integer      | false | none | Min cpu                 | cpu分配额 1000=1core                                      |
| container_gpu           | integer      | false | none | Container gpu           | gpu显存数量                                               |
| min_memory              | integer      | false | none | Min memory              | 内存大小单位（M）                                         |
| extend_method           | string       | false | none | Extend method           | 组件部署类型,stateless or state                           |
| code_from               | string¦null  | false | none | Code from               | 代码来源:gitlab,github                                    |
| git_url                 | string¦null  | false | none | Git url                 | code代码仓库                                              |
| git_project_id          | integer      | false | none | Git project id          | gitlab 中项目id                                           |
| code_version            | string¦null  | false | none | Code version            | 代码版本                                                  |
| service_type            | string¦null  | false | none | Service type            | 组件类型:web,mysql,redis,mongodb,phpadmin                 |
| creater                 | integer      | false | none | Creater                 | 组件创建者                                                |
| language                | string¦null  | false | none | Language                | 代码语言                                                  |
| total_memory            | integer      | false | none | Total memory            | 内存使用M                                                 |
| is_service              | boolean      | false | none | Is service              | 是否inner组件                                             |
| service_origin          | string       | false | none | Service origin          | 组件创建类型cloud云市组件,assistant云帮组件               |
| tenant_service_group_id | integer      | false | none | Tenant service group id | 组件归属的组件组id，从应用模版安装的组件该字段需要赋值    |
| open_webhooks           | boolean      | false | none | Open webhooks           | 是否开启自动触发部署功能（兼容老版本组件）                |
| service_source          | string¦null  | false | none | Service source          | 组件来源(source_code, market, docker_run, docker_compose) |
| create_status           | string¦null  | false | none | Create status           | 组件创建状态 creating                                     |
| check_uuid              | string¦null  | false | none | Check uuid              | 组件检测ID                                                |
| check_event_id          | string¦null  | false | none | Check event id          | 组件检测事件ID                                            |
| docker_cmd              | string¦null  | false | none | Docker cmd              | 镜像创建命令                                              |
| server_type             | string       | false | none | Server type             | 源码仓库类型                                              |
| is_upgrate              | boolean      | false | none | Is upgrate              | 是否可以更新                                              |
| build_upgrade           | boolean      | false | none | Build upgrade           | 组件构建后是否升级                                        |
| oauth_service_id        | integer¦null | false | none | Oauth service id        | 拉取源码所用的OAuth服务id                                 |
| k8s_component_name      | string       | true  | none | K8s component name      | 集群组件名称                                              |

### AppCopyC<a id="schemaappcopyc"></a>

```json
{
  "services": [
    {
      "service_id": "string",
      "change": "string"
    }
  ],
  "target_team_name": "string",
  "target_region_name": "string",
  "target_app_id": 0
}
```

### 属性

| 名称               | 类型                                    | 必选 | 约束 | 中文名             | 说明         |
| ------------------ | --------------------------------------- | ---- | ---- | ------------------ | ------------ |
| services           | [[AppCopyModify](#schemaappcopymodify)] | true | none |                    | none         |
| target_team_name   | string                                  | true | none | Target team name   | 团队名称     |
| target_region_name | string                                  | true | none | Target region name | 数据中心名称 |
| target_app_id      | integer                                 | true | none | Target app id      | 应用id       |

### AppCopyCRes<a id="schemaappcopycres"></a>

```json
{
  "services": [
    {
      "status": "",
      "access_infos": [],
      "service_id": "string",
      "tenant_id": "string",
      "service_key": "string",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string",
      "version": "string",
      "update_version": -2147483648,
      "image": "string",
      "cmd": "string",
      "min_node": -2147483648,
      "min_cpu": -2147483648,
      "container_gpu": -2147483648,
      "min_memory": -2147483648,
      "extend_method": "string",
      "code_from": "string",
      "git_url": "string",
      "git_project_id": -2147483648,
      "code_version": "string",
      "service_type": "string",
      "creater": -2147483648,
      "language": "string",
      "total_memory": -2147483648,
      "is_service": true,
      "service_origin": "string",
      "tenant_service_group_id": -2147483648,
      "open_webhooks": true,
      "service_source": "string",
      "create_status": "string",
      "check_uuid": "string",
      "check_event_id": "string",
      "docker_cmd": "string",
      "server_type": "strin",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": -2147483648,
      "k8s_component_name": "string"
    }
  ]
}
```

### 属性

| 名称     | 类型                                        | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------------------------------------------- | ---- | ---- | ------ | ---- |
| services | [[ServiceBaseInfo](#schemaservicebaseinfo)] | true | none |        | none |

### AppCopyModify<a id="schemaappcopymodify"></a>

```json
{
  "service_id": "string",
  "change": "string"
}
```

### 属性

| 名称       | 类型   | 必选  | 约束      | 中文名     | 说明 |
| ---------- | ------ | ----- | --------- | ---------- | ---- |
| service_id | string | true  | none      | Service id | 组件ID   |
| change     | string | false | read-only | Change     | none |
