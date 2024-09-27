---
title: Get the application component information that needs to be copied
---

## Basic information

This interface is mainly used to obtain the application component information that needs to be copied

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id     | path     | string | Yes      |              | none       |
| region_name | path     | string | Yes      |              | none       |
| app_id      | path     | string | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

Status code **200**

| name                                  | type                                                                              | required | constraint | Chinese name   | illustrate               |
| ------------------------------------- | --------------------------------------------------------------------------------- | -------- | ---------- | -------------- | ------------------------ |
| _anonymous_                           | [[AppCopyL](#schemaappcopyl)] | false    | none       |                | none                     |
| » build_source   | string                                                                            | false    | read-only  | Build source   | none                     |
| » update_time    | string                                                                            | true     | none       | Update time    | Updated                  |
| » deploy_version | string                                                                            | true     | none       | Deploy version | build version            |
| » create_status  | string                                                                            | true     | none       | Create status  | Create state             |
| » service_alias  | string                                                                            | true     | none       | Service alias  | component nickname       |
| » service_cname  | string                                                                            | true     | none       | Service cname  | Component Chinese name   |
| » version                             | string                                                                            | true     | none       | Version        | Version                  |
| » service_type   | string                                                                            | true     | none       | Service type   | component type           |
| » service_id     | string                                                                            | true     | none       | Service id     | id                       |
| » app_name       | string                                                                            | true     | none       | App name       | Application Name         |
| » min_memory     | string                                                                            | true     | none       | Min memory     | component running memory |

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
| build_source   | string | false    | read-only  | Build source   | none                     |
| update_time    | string | true     | none       | Update time    | Updated                  |
| deploy_version | string | true     | none       | Deploy version | build version            |
| create_status  | string | true     | none       | Create status  | Create state             |
| service_alias  | string | true     | none       | Service alias  | component nickname       |
| service_cname  | string | true     | none       | Service cname  | Component Chinese name   |
| version                             | string | true     | none       | Version        | Basic Information        |
| service_type   | string | true     | none       | Service type   | component type           |
| service_id     | string | true     | none       | Service id     | id                       |
| app_name       | string | true     | none       | App name       | Application Name         |
| min_memory     | string | true     | none       | Min memory     | component running memory |
