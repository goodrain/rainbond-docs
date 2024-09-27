---
title: Duplicate the app
---

## Basic Information

This interface is mainly used for replication applications

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

Here `target_team_name` specifies the target team name, corresponding to `tenant_name` or `team_name`, the value is similar to `o19p6wen`, not user-defined team name

Here `target_region_name` specifies the target cluster name, corresponding to the data returned by the cluster list interface `region_name`

Here `target_app_id` specifies the target app name

## request parameters

| name                             | Location | type                        | required | Chinese name | illustrate |
| -------------------------------- | -------- | --------------------------- | -------- | ------------ | ---------- |
| team_id     | path     | string                      | Yes      |              | none       |
| region_name | path     | string                      | Yes      |              | none       |
| app_id      | path     | string                      | Yes      |              | none       |
| body                             | body     | [AppCopyC](#schemaappcopyc) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                        |
| ----------- | ------------------- | ---------- | --------------------------------- |
| 200         | OK                  | success    | [AppCopyCRes](#schemaappcopycres) |

## return data structure

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
      " service_key": "string",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string ",
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
      " code_version": "string",
      "service_type": "string",
      "creater": 3,
      "language": "string",
      "total_memory": 3,
      "is_service": true,
      "service_origin" : "string",
      "tenant_service_group_id": 3,
      "open_webhooks": true,
      "service_source": "string",
      "create_status": "string",
      "check_uuid": "string",
      "check_event_id" : "string",
      "docker_cmd": "string",
      "server_type": "string",
      "is_upgrate": true,
      "buil d_upgrade": true,
      "oauth_service_id": 3,
      "k8s_component_name": "string"
    }
  ]
}
```

## Model

### AppPostInfo<a id="schemaapppostinfo"></a>

```json
{
  "services": [
    {
      "status": "",
      "access_infos": [],
      "service_id": "string",
      "tenant_id": "string",
      "service_key": "string ",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string",
      "version ": "string",
      "update_version": -2147483648,
      "image": "string",
      "cmd": "string",
      "min_node": -2147483648,
      "min_cpu": -2147483648,
      " container_gpu": -2147483648,
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
      "docker_c md": "string",
      "server_type": "strin",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": -2147483648,
      "k8s_component_name": "string"
    }
  ]
}
```

### Attributes

| name     | type                                                                                            | required | constraint | Chinese name | illustrate |
| -------- | ----------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| services | [[ServiceBaseInfo](#schemaservicebaseinfo)] | true     | none       |              | none       |

### ServiceBaseInfo<a id="schemaservicebaseinfo"></a>

```json
{
  "status": "",
  "access_infos": [],
  "service_id": "string",
  "tenant_id": "string",
  "service_key": "string",
  "service_alias": " string",
  "service_cname": "string",
  "service_region": "string",
  "desc": "string",
  "category": "string",
  "version": "string",
  " update_version": -2147483648,
  "image": "string",
  "cmd": "string",
  "min_node": -2147483648,
  "min_cpu": -2147483648,
  "container_gpu": -2147483648,
  " min_memory": -2147483648,
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
  "check_event_id": "string" ,
  "docker_cmd": "string",
  "ser ver_type": "strin",
  "is_upgrate": true,
  "build_upgrade": true,
  "oauth_service_id": -2147483648,
  "k8s_component_name": "string"
}
```

### Attributes

| name                                                                                   | type                                                         | required | constraint | Chinese name            | illustrate                                                                                                                                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                                                                                 | string                                                       | false    | none       | Status                  | component status                                                                                                                                                       |
| access_infos                                                      | [string] | false    | none       |                         | component access address                                                                                                                                               |
| service_id                                                        | string                                                       | true     | none       | Service id              | component id                                                                                                                                                           |
| tenant_id                                                         | string                                                       | true     | none       | Tenant id               | tenant id                                                                                                                                                              |
| service_key                                                       | string                                                       | true     | none       | Service key             | component key                                                                                                                                                          |
| service_alias                                                     | string                                                       | true     | none       | Service alias           | component alias                                                                                                                                                        |
| service_cname                                                     | string                                                       | false    | none       | Service cname           | component name                                                                                                                                                         |
| service_region                                                    | string                                                       | true     | none       | Service region          | The area to which the component belongs                                                                                                                                |
| desc                                                                                   | string¦null                                                  | false    | none       | Desc                    | describe                                                                                                                                                               |
| category                                                                               | string                                                       | true     | none       | Category                | Component classification：application, cache, store                                                                                                                     |
| version                                                                                | string                                                       | true     | none       | Version                 | Basic Information                                                                                                                                                      |
| update_version                                                    | integer                                                      | false    | none       | Update version          | Internal Releases                                                                                                                                                      |
| image                                                                                  | string                                                       | true     | none       | Image                   | mirror                                                                                                                                                                 |
| cmd                                                                                    | string¦null                                                  | false    | none       | Cmd                     | startup parameters                                                                                                                                                     |
| min_node                                                          | integer                                                      | false    | none       | Min node                | number of instances                                                                                                                                                    |
| min_cpu                                                           | integer                                                      | false    | none       | Min cpu                 | CPU allocation 1000=1core                                                                                                                                              |
| container_gpu                                                     | integer                                                      | false    | none       | Container GPUs          | Amount of GPU memory                                                                                                                                                   |
| min_memory                                                        | integer                                                      | false    | none       | Min memory              | Memory size unit (M)                                                                                                                                |
| extend_method                                                     | string                                                       | false    | none       | Extend method           | Component deployment type, stateless or state                                                                                                                          |
| code_from                                                         | string¦null                                                  | false    | none       | Code from               | Code source: gitlab, github                                                                                                                            |
| git_url                                                           | string¦null                                                  | false    | none       | Git url                 | code code repository                                                                                                                                                   |
| git_project_id                               | integer                                                      | false    | none       | Git project id          | Project id in gitlab                                                                                                                                                   |
| code_version                                                      | string¦null                                                  | false    | none       | Code version            | code version                                                                                                                                                           |
| service_type                                                      | string¦null                                                  | false    | none       | Service type            | Component type: web, mysql, redis, mongodb, phpadmin                                                                                                   |
| creator                                                                                | integer                                                      | false    | none       | Creator                 | component creator                                                                                                                                                      |
| language                                                                               | string¦null                                                  | false    | none       | Language                | code language                                                                                                                                                          |
| total_memory                                                      | integer                                                      | false    | none       | Total memory            | Memory usage M                                                                                                                                                         |
| is_service                                                        | boolean                                                      | false    | none       | Is service              | Whether the inner component                                                                                                                                            |
| service_origin                                                    | string                                                       | false    | none       | Service origin          | Component creation type cloud cloud city component, assistant cloud help component                                                                                     |
| tenant_service_group_id | integer                                                      | false    | none       | Tenant service group id | The component group id to which the component belongs. For components installed from the application template, this field needs to be assigned a value |
| open_webhooks                                                     | boolean                                                      | false    | none       | Open webhooks           | Whether to enable the automatic trigger deployment function (compatible with older version components)                                              |
| service_source                                                    | string¦null                                                  | false    | none       | Service source          | Component sources (source_code, market, docker_run, docker_compose)                  |
| create_status                                                     | string¦null                                                  | false    | none       | Create status           | Component creation state creating                                                                                                                                      |
| check_uuid                                                        | string¦null                                                  | false    | none       | Check uuid              | Component detection ID                                                                                                                                                 |
| check_event_id                               | string¦null                                                  | false    | none       | Check event id          | Component detection event ID                                                                                                                                           |
| docker_cmd                                                        | string¦null                                                  | false    | none       | Docker-cmd              | Image creation command                                                                                                                                                 |
| server_type                                                       | string                                                       | false    | none       | Server type             | Source repository type                                                                                                                                                 |
| is_upgrate                                                        | boolean                                                      | false    | none       | Is upgrade              | Is it possible to update                                                                                                                                               |
| build_upgrade                                                     | boolean                                                      | false    | none       | Build upgrade           | Whether to upgrade components after building                                                                                                                           |
| oauth_service_id                             | integer¦null                                                 | false    | none       | Oauth service id        | The OAuth service id used to pull the source code                                                                                                                      |
| k8s_component_name                           | string                                                       | true     | none       | K8s component name      | Cluster component name                                                                                                                                                 |

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

### Attributes

| name                                                         | type                                                                                        | required | constraint | Chinese name       | illustrate       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | -------- | ---------- | ------------------ | ---------------- |
| services                                                     | [[AppCopyModify](#schemaappcopymodify)] | true     | none       |                    | none             |
| target_team_name   | string                                                                                      | true     | none       | Target team name   | Team Name        |
| target_region_name | string                                                                                      | true     | none       | Target region name | data center name |
| target_app_id      | integer                                                                                     | true     | none       | Target app id      | app id           |

### AppCopyCRes<a id="schemaappcopycres"></a>

```json
{
  "services": [
    {
      "status": "",
      "access_infos": [],
      "service_id": "string",
      "tenant_id": "string",
      "service_key": "string ",
      "service_alias": "string",
      "service_cname": "string",
      "service_region": "string",
      "desc": "string",
      "category": "string",
      "version ": "string",
      "update_version": -2147483648,
      "image": "string",
      "cmd": "string",
      "min_node": -2147483648,
      "min_cpu": -2147483648,
      " container_gpu": -2147483648,
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
      "docker_c md": "string",
      "server_type": "strin",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": -2147483648,
      "k8s_component_name": "string"
    }
  ]
}
```

### Attributes

| name     | type                                                                                            | required | constraint | Chinese name | illustrate |
| -------- | ----------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| services | [[ServiceBaseInfo](#schemaservicebaseinfo)] | true     | none       |              | none       |

### AppCopyModify<a id="schemaappcopymodify"></a>

```json
{
  "service_id": "string",
  "change": "string"
}
```

### Attributes

| name                            | type   | required | constraint | Chinese name | illustrate   |
| ------------------------------- | ------ | -------- | ---------- | ------------ | ------------ |
| service_id | string | true     | none       | Service id   | component ID |
| change                          | string | false    | read-only  | Change       | none         |
