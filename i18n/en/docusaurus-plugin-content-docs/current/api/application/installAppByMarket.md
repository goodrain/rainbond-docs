---
title: Install apps from the app store
---

## Basic Information

This interface is mainly used to install applications from the application store

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/install
```

```json title="Body 请求体示例"
LO
  "market_url": "https://hub.grapps.cn",
  "market_domain": "rainbond",
  "market_type": "rainstance",
  "market_access_key": "123456789012340af5dff63cb740788e",
  "app_model_id": "string",
  "app_model_version": "string"
}
```

`market_type` default value pass `rainstore`

## request parameters

| name                             | Location | type                      | required | Chinese name | illustrate           |
| -------------------------------- | -------- | ------------------------- | -------- | ------------ | -------------------- |
| app_id      | Path     | integer                   | Yes      |              | application group id |
| team_id     | Path     | String                    | Yes      |              | none                 |
| region_name | Path     | String                    | Yes      |              | none                 |
| is_upload   | Query    | String                    | no       |              | whether to build     |
| body                             | body     | [Install](#schemainstall) | no       |              | none                 |

## return result

| status code | Status code meaning | illustrate | data model                             |
| ----------- | ------------------- | ---------- | -------------------------------------- |
| 200         | OK                  | success    | [MarketInstall](#schemamarketingstall) |

## return data structure

```json title="响应示例"
{
  "enterprise_id": "string",
  "team_id": "string",
  "note": "string",
  "ID": 3,
  "region_name": "string",
  "service_list": [
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
      " tenant_service_group_id": 3,
      "open_webhooks": true,
      "service_source": "string",
      "create_status": "string",
      "check_uuid": "string" ,
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

## Model

### Install<a id="schemainstall"></a>

```json
{
  "market_url": "string",
  "market_domain": "string",
  "market_type": "string",
  "market_access_key": "string",
  "app_model_id": "string",
  "app_model_version" : "string"
}
```

### Attributes

| name                                                        | type   | required | constraint | Chinese name      | illustrate        |
| ----------------------------------------------------------- | ------ | -------- | ---------- | ----------------- | ----------------- |
| market_url                             | String | true     | none       | Market url        | App store routing |
| market_domain                          | String | true     | none       | Market domain     | app store domain  |
| market_type                            | String | true     | none       | Market type       | App store type    |
| market_access_key | String | true     | none       | Market access key | app store token   |
| app_model_id      | String | true     | none       | App model id      | app id            |
| app_model_version | String | true     | none       | App model version | App version       |

### Market Installation<a id="schemamarketinstall"></a>

```json
{
  "enterprise_id": "string",
  "team_id": "string",
  "note": "string",
  "ID": 0,
  "region_name": "string",
  "service_list": [
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
      "code_version": "string" ,
      "service_type": "string",
      "creater": -2147483648,
      "language": "string",
      "total_memory": -2147483648,
      "is_service": true,
      "service_origin": "string" ,
      "tenant_service_group_id": -2147483648,
      "open_webhooks": true,
      "service_ source": "string",
      "create_status": "string",
      "check_uuid": "string",
      "check_event_id": "string",
      "docker_cmd": "string",
      "server_type": "strin ",
      "is_upgrate": true,
      "build_upgrade": true,
      "oauth_service_id": -2147483648,
      "k8s_component_name": "string"
    }
  ]
}
```

### Attributes

| name                               | type                                                                                            | required | constraint | Chinese name  | illustrate                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | -------- | ---------- | ------------- | ----------------------------------------------------- |
| Enterprise_id | String                                                                                          | true     | none       | Enterprise id | Enterprise ID (Federated Cloud ID) |
| team_id       | String                                                                                          | true     | none       | team id       | team id                                               |
| Notes                              | String                                                                                          | true     | none       | Note          | Remark                                                |
| ID                                 | integer                                                                                         | true     | none       | Id            | app id                                                |
| region_name   | String                                                                                          | true     | none       | Region name   | data center name                                      |
| service_list  | [[ServiceBaseInfo](#schemaservicebaseinfo)] | true     | none       |               | none                                                  |

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
| Status                                                                                 | String                                                       | false    | none       | Status                  | component status                                                                                                                                                       |
| access_infos                                                      | [string] | false    | none       |                         | component access address                                                                                                                                               |
| service_id                                                        | String                                                       | true     | none       | Service id              | component id                                                                                                                                                           |
| tenant_id                                                         | String                                                       | true     | none       | Tenant id               | tenant id                                                                                                                                                              |
| service_key                                                       | String                                                       | true     | none       | Service key             | component key                                                                                                                                                          |
| service_alias                                                     | String                                                       | true     | none       | Service alias           | component alias                                                                                                                                                        |
| service_name                                                      | String                                                       | false    | none       | Service cname           | component name                                                                                                                                                         |
| service_region                                                    | String                                                       | true     | none       | Service region          | The area to which the component belongs                                                                                                                                |
| desc                                                                                   | Stringenull                                                  | false    | none       | Desc                    | describe                                                                                                                                                               |
| Category                                                                               | String                                                       | true     | none       | Category                | Component classification：application, cache, store                                                                                                                     |
| version                                                                                | String                                                       | true     | none       | Version                 | Basic Information                                                                                                                                                      |
| update_version                                                    | integer                                                      | false    | none       | Update version          | Internal Releases                                                                                                                                                      |
| Image                                                                                  | String                                                       | true     | none       | Image                   | mirror                                                                                                                                                                 |
| cmd                                                                                    | Stringenull                                                  | false    | none       | Cmd                     | startup parameters                                                                                                                                                     |
| min_node                                                          | integer                                                      | false    | none       | Min mode                | number of instances                                                                                                                                                    |
| min_cpu                                                           | integer                                                      | false    | none       | Min cpu                 | CPU allocation 1000=1core                                                                                                                                              |
| container_gpu                                                     | integer                                                      | false    | none       | Container GPUs          | Amount of GPU memory                                                                                                                                                   |
| min_memory                                                        | integer                                                      | false    | none       | Min memory              | Memory size unit (M)                                                                                                                                |
| extend_method                                                     | String                                                       | false    | none       | Extend method           | Component deployment type, stateless or state                                                                                                                          |
| code_from                                                         | Stringenull                                                  | false    | none       | Code from               | Code source: gitlab, github                                                                                                                            |
| git_url                                                           | Stringenull                                                  | false    | none       | Git url                 | code code repository                                                                                                                                                   |
| git_project_id                               | integer                                                      | false    | none       | Git project id          | Project id in gitlab                                                                                                                                                   |
| code_version                                                      | Stringenull                                                  | false    | none       | Code version            | code version                                                                                                                                                           |
| service_type                                                      | Stringenull                                                  | false    | none       | Service type            | Component type: web, mysql, redis, mongodb, phpadmin                                                                                                   |
| creator                                                                                | integer                                                      | false    | none       | Creator                 | component creator                                                                                                                                                      |
| Language                                                                               | Stringenull                                                  | false    | none       | Language                | code language                                                                                                                                                          |
| Total_memory                                                      | integer                                                      | false    | none       | Total memory            | Memory usage M                                                                                                                                                         |
| is_service                                                        | boolean                                                      | false    | none       | Is service              | Whether the inner component                                                                                                                                            |
| service_origin                                                    | String                                                       | false    | none       | Service origin          | Component creation type cloud cloud city component, assistant cloud help component                                                                                     |
| tenant_service_group_id | integer                                                      | false    | none       | Tenant service group id | The component group id to which the component belongs. For components installed from the application template, this field needs to be assigned a value |
| open_webhooks                                                     | boolean                                                      | false    | none       | Open webhooks           | Whether to enable the automatic trigger deployment function (compatible with older version components)                                              |
| service_source                                                    | Stringenull                                                  | false    | none       | Service source          | Component sources (source_code, market, docker_run, docker_compose)                  |
| create_status                                                     | Stringenull                                                  | false    | none       | Create status           | Component creation state creating                                                                                                                                      |
| check_uid                                                         | Stringenull                                                  | false    | none       | Check uuid              | Component detection ID                                                                                                                                                 |
| check_event_id                               | Stringenull                                                  | false    | none       | Check event id          | Component detection event ID                                                                                                                                           |
| docker_cmd                                                        | Stringenull                                                  | false    | none       | Docker-cmd              | Image creation command                                                                                                                                                 |
| server_type                                                       | String                                                       | false    | none       | Server Type             | Source repository type                                                                                                                                                 |
| is_uprate                                                         | boolean                                                      | false    | none       | Is upgrade              | Is it possible to update                                                                                                                                               |
| build_upgrade                                                     | boolean                                                      | false    | none       | Build up                | Whether to upgrade components after building                                                                                                                           |
| oauth_service_id                             | integerexecutive null                                        | false    | none       | Oauth service id        | The OAuth service id used to pull the source code                                                                                                                      |
| k8s_component_name                           | String                                                       | true     | none       | K8s component name      | Cluster component name                                                                                                                                                 |
