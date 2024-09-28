---
title: Get the application component information that needs to be copied
---

## Basic Information

This interface is mainly used to obtain the application component information that needs to be copied

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id     | Path     | String | Yes      |              | none       |
| region_name | Path     | String | Yes      |              | none       |
| app_id      | Path     | String | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

Status code **200**

| name                                  | type                                                                              | required | constraint | Chinese name   | illustrate               |
| ------------------------------------- | --------------------------------------------------------------------------------- | -------- | ---------- | -------------- | ------------------------ |
| _anonymous_                           | [[AppCopyL](#schemaappcopyl)] | false    | none       |                | none                     |
| » build_source   | String                                                                            | false    | read-only  | Build source   | none                     |
| » update_time    | String                                                                            | true     | none       | Update time    | Updated                  |
| » employ_version | String                                                                            | true     | none       | Upload version | build version            |
| » create_status  | String                                                                            | true     | none       | Create status  | Create state             |
| » service_alias  | String                                                                            | true     | none       | Service alias  | component nickname       |
| » service_name   | String                                                                            | true     | none       | Service cname  | Component Chinese name   |
| » version                             | String                                                                            | true     | none       | Version        | Version                  |
| » service_type   | String                                                                            | true     | none       | Service type   | component type           |
| » service_id     | String                                                                            | true     | none       | Service id     | Id                       |
| » app_name       | String                                                                            | true     | none       | App name       | Application Name         |
| » min_memory     | String                                                                            | true     | none       | Min memory     | component running memory |

## Model

### AppCopyL<a id="schemaappcopyl"></a>

```json
{
  "build_source": "string",
  "update_time": "string",
  "deploy_version": "string",
  "create_status": "string",
  "service_alias": "string",
  "service_cname" : "string",
  "version": "string",
  "service_type": "string",
  "service_id": "string",
  "app_name": "string",
  "min_memory": "string"
}
```

### Attributes

| name                                | type   | required | constraint | Chinese name   | illustrate               |
| ----------------------------------- | ------ | -------- | ---------- | -------------- | ------------------------ |
| build_source   | String | false    | read-only  | Build source   | none                     |
| update_time    | String | true     | none       | Update time    | Updated                  |
| Deploy_version | String | true     | none       | Upload version | build version            |
| create_status  | String | true     | none       | Create status  | Create state             |
| service_alias  | String | true     | none       | Service alias  | component nickname       |
| service_name   | String | true     | none       | Service cname  | Component Chinese name   |
| version                             | String | true     | none       | Version        | Basic Information        |
| service_type   | String | true     | none       | Service type   | component type           |
| service_id     | String | true     | none       | Service id     | Id                       |
| app_name       | String | true     | none       | App name       | Application Name         |
| min_memory     | String | true     | none       | Min memory     | component running memory |
