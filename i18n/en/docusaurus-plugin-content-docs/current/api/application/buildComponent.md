---
title: build components
---

## Basic Information

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
| team_id     | Path     | String                                                              | Yes      |              | Team ID, name        |
| region_name | Path     | String                                                              | Yes      |              | data center name     |
| app_id      | Path     | integer                                                             | Yes      |              | application group id |
| service_id  | Path     | String                                                              | Yes      |              | component ID         |
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
| build_type  | Stringenull | false    | none       | Build Type   | Component build source type                                                                      |
| server_type | Stringenull | false    | none       | Server Type  | Source source type                                                                               |
| Branch                           | Stringenull | false    | none       | Branch       | Code branch, tag information                                                                     |
| repo_url    | Stringenull | false    | none       | Repo url     | Source repository service address, including code repository, mirror repository, and OSS address |
| username                         | Stringenull | false    | none       | Username     | Source warehouse service account                                                                 |
| password                         | Stringenull | false    | none       | Password     | Source warehouse service password                                                                |

#### enumeration value

| Attributes                       | value                             |
| -------------------------------- | --------------------------------- |
| build_type  | source_code  |
| build_type  | docker_image |
| build_type  | market                            |
| server_type | svn                               |
| server_type | git                               |
| server_type | loss                              |

### ComponentEventSerializers<a id="schemacomponenteventserializers"></a>

```json
LO
  "event_id": "string"
}
```

### Attributes

| name                          | type   | required | constraint | Chinese name | illustrate |
| ----------------------------- | ------ | -------- | ---------- | ------------ | ---------- |
| event_id | String | true     | none       | Event id     | Event ID   |
