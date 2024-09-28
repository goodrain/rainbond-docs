---
title: build components
---

## 基本信息

This interface is mainly used to build components for CI/CD workflow calls

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
  "password" : "string"
}
```

## request parameters

| name                             | Location | type                                                                | required | Chinese name | illustrate           |
| -------------------------------- | -------- | ------------------------------------------------------------------- | -------- | ------------ | -------------------- |
| team_id     | path     | string                                                              | Yes      |              | Team ID, name        |
| region_name | path     | string                                                              | Yes      |              | data center name     |
| app_id      | path     | integer                                                             | Yes      |              | application group id |
| service_id  | path     | string                                                              | Yes      |              | component ID         |
| body                             | body     | [ComponentBuildReqSerializers](#schemacomponentbuildreqserializers) | no       |              | none                 |

## return result

| status code | Status code meaning | illustrate | data model                                                    |
| ----------- | ------------------- | ---------- | ------------------------------------------------------------- |
| 200         | OK                  | success    | [ComponentEventSerializers](#schemacomponenteventserializers) |

## Model

### ComponentBuildReqSerializers<a id="schemacomponentbuildreqserializers"></a>

```json
{
  "build_type": "source_code",
  "server_type": "svn",
  "branch": "master",
  "repo_url": "string",
  "username": "string",
  "password" : "string"
}
```

### Attributes

| name                             | type        | required | constraint | Chinese name | illustrate                                                                                       |
| -------------------------------- | ----------- | -------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------ |
| build_type  | string¦null | false    | none       | Build type   | Component build source type                                                                      |
| server_type | string¦null | false    | none       | Server type  | Source source type                                                                               |
| branch                           | string¦null | false    | none       | Branch       | Code branch, tag information                                                                     |
| repo_url    | string¦null | false    | none       | Repo url     | Source repository service address, including code repository, mirror repository, and OSS address |
| username                         | string¦null | false    | none       | Username     | Source warehouse service account                                                                 |
| password                         | string¦null | false    | none       | Password     | Source warehouse service password                                                                |

#### enumeration value

| Attributes                       | value                             |
| -------------------------------- | --------------------------------- |
| build_type  | source_code  |
| build_type  | docker_image |
| build_type  | market                            |
| server_type | svn                               |
| server_type | git                               |
| server_type | oss                               |

### ComponentEventSerializers<a id="schemacomponenteventserializers"></a>

```json
{
  "event_id": "string"
}
```

### Attributes

| name                          | type   | required | constraint | Chinese name | illustrate |
| ----------------------------- | ------ | -------- | ---------- | ------------ | ---------- |
| event_id | string | true     | none       | Event id     | Event ID   |
