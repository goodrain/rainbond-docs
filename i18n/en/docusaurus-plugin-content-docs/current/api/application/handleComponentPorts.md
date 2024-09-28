---
title: Operational Component Port
---

This is primarily an openAPI interface introduction for component ports, which contains a list of component ports, updates component port configuration (on/in-house, external), adding a port, deleting a port.

## Get Component Port

### Basic Information

```shell title="请求路径"
 GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports
```

### Request Parameters

| Name                             | Locations | Type    | Required | Chinese name | Note         |
| -------------------------------- | --------- | ------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer | Yes      |              | App id       |
| service_id  | Path      | String  | Yes      |              | App id       |
| team_id     | Path      | String  | Yes      |              | Team id      |
| region_name | Path      | String  | Yes      |              | Cluster name |

### Back to results

| Status Code | Status code meanings | Note    | Data Model     |
| ----------- | -------------------- | ------- | -------------- |
| 200         | OK                   | Success | [返回模型](#ports) |

#### Back to Model<a id="ports"></a>

```json
 LO
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Properties**

| Name                                                       | Type     | Required | Constraints | Chinese name     | Note                                     |
| ---------------------------------------------------------- | -------- | -------- | ----------- | ---------------- | ---------------------------------------- |
| container_port                        | Annex II | true     | none        | ContainerPort    | Port number                              |
| protocol                                                   | String   | true     | none        | Protocol         | Port Protocol                            |
| port_alias                            | String   | true     | none        | Port Alias       | Port Alias                               |
| is_inner_service | boolean  | true     | none        | IS Inner Service | Whether to turn on inner service         |
| is_over_service  | boolean  | true     | none        | IS Outer Service | Whether or not to open external services |
| k8s_service_name | String   | true     | none        | K8S Service Name | Service name in cluster                  |

## Add Component Port

### Basic Information

```shell title="请求路径"
 POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports
```

```json title="Body 请求体示例"
LO
    "port": "80",
    "port_alias": "NGINX_PORT",
    "protocol": "tcp",
    "is_inner_service": True,
}
```

### Request Parameters

| Name                             | Locations | Type                   | Required | Chinese name | Note         |
| -------------------------------- | --------- | ---------------------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer                | Yes      |              | App id       |
| service_id  | Path      | String                 | Yes      |              | App id       |
| team_id     | Path      | String                 | Yes      |              | Team id      |
| region_name | Path      | String                 | Yes      |              | Cluster name |
| body                             | body      | [请求模型](#req_post_port) | No       |              | none         |

#### Model<a id="req_post_port"></a>

```json
 LO
    "port": "int",
    "port_alias": "string",
    "protocol": "string",
    "is_inner_service": "bool",
}
```

**Properties**

| Name                                                       | Type    | Required | Constraints                 | Chinese name     | Note                             |
| ---------------------------------------------------------- | ------- | -------- | --------------------------- | ---------------- | -------------------------------- |
| Ports                                                      | String  | true     | none                        | ContainerPort    | Port number                      |
| protocol                                                   | String  | true     | tcp, http, mysql, grpc, udp | Protocol         | Port Protocol                    |
| port_alias                            | String  | False    | none                        | Port Alias       | Port Alias                       |
| is_inner_service | boolean | False    | none                        | IS Inner Service | Whether to turn on inner service |

### Back to results

| Status Code | Status code meanings | Note    | Data Model         |
| ----------- | -------------------- | ------- | ------------------ |
| 200         | OK                   | Success | [返回模型](#post_port) |

#### Back to Model<a id="post_port"></a>

```json
 LO
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Properties**

| Name                                                       | Type     | Required | Constraints | Chinese name     | Note                                     |
| ---------------------------------------------------------- | -------- | -------- | ----------- | ---------------- | ---------------------------------------- |
| container_port                        | Annex II | true     | none        | ContainerPort    | Port number                              |
| protocol                                                   | String   | true     | none        | Protocol         | Port Protocol                            |
| port_alias                            | String   | true     | none        | Port Alias       | Port Alias                               |
| is_inner_service | boolean  | true     | none        | IS Inner Service | Whether to turn on inner service         |
| is_over_service  | boolean  | true     | none        | IS Outer Service | Whether or not to open external services |
| k8s_service_name | String   | true     | none        | K8S Service Name | k8s Internal Domain                      |

## Update Component Port

### Basic Information

```shell title="请求路径"
 PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports/{port}
```

```json title="Body 请求体示例"
LO
    "action": "change_port_alias",
    "port_alias": "NGINX_PORT",
    "k8s_service_name": "nginx_port",
    "protocol": "tcp",
}
```

### Request Parameters

| Name                             | Locations | Type                  | Required | Chinese name | Note         |
| -------------------------------- | --------- | --------------------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer               | Yes      |              | App id       |
| service_id  | Path      | String                | Yes      |              | App id       |
| team_id     | Path      | String                | Yes      |              | Team id      |
| region_name | Path      | String                | Yes      |              | Cluster name |
| Ports                            | Path      | String                | Yes      |              | Port number  |
| body                             | body      | [请求模型](#req_put_port) | No       |              | none         |

#### Model<a id="req_put_port"></a>

```json
 LO
    "action": "strin",
    "port_alias": "string",
    "protocol": "string",
    "k8s_service_name": "string",
}
```

**Properties**

| Name                                                       | Type   | Required | Constraints                                                                                                                                                                                                                             | Chinese name     | Note                |
| ---------------------------------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| Action                                                     | String | true     | open_outer, close_outer, open_inner, close_inner, change_protocol, change_port_alias | Action           | Method of operation |
| protocol                                                   | String | False    | tcp, http, mysql, grpc, udp                                                                                                                                                                                                             | Protocol         | Port Protocol       |
| port_alias                            | String | False    | none                                                                                                                                                                                                                                    | Port Alias       | Port Alias          |
| k8s_service_name | String | False    | none                                                                                                                                                                                                                                    | K8S Service Name | k8s Internal Domain |

**action field introductions**

- open_outer： 开启端口对外服务
- close_outer：close port service
- open_inner： open port to internal service
- close_inner：close port to internal service
- change_protocol： Change port protocol
- change_port_alias：Change port alias and k8s internal domains

### Back to results

| Status Code | Status code meanings | Note    | Data Model        |
| ----------- | -------------------- | ------- | ----------------- |
| 200         | OK                   | Success | [返回模型](#put_port) |

#### Back to Model<a id="put_port"></a>

```json
 LO
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Properties**

| Name                                                       | Type     | Required | Constraints | Chinese name     | Note                                     |
| ---------------------------------------------------------- | -------- | -------- | ----------- | ---------------- | ---------------------------------------- |
| container_port                        | Annex II | true     | none        | ContainerPort    | Port number                              |
| protocol                                                   | String   | true     | none        | Protocol         | Port Protocol                            |
| port_alias                            | String   | true     | none        | Port Alias       | Port Alias                               |
| is_inner_service | boolean  | true     | none        | IS Inner Service | Whether to turn on inner service         |
| is_over_service  | boolean  | true     | none        | IS Outer Service | Whether or not to open external services |
| k8s_service_name | String   | true     | none        | K8S Service Name | Service name in cluster                  |

## Remove Component Port

### Basic Information

```shell title="请求路径"
 DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports/{port}
```

### Request Parameters

| Name                             | Locations | Type    | Required | Chinese name | Note         |
| -------------------------------- | --------- | ------- | -------- | ------------ | ------------ |
| app_id      | Path      | integer | Yes      |              | App id       |
| service_id  | Path      | String  | Yes      |              | App id       |
| team_id     | Path      | String  | Yes      |              | Team id      |
| region_name | Path      | String  | Yes      |              | Cluster name |
| Ports                            | Path      | String  | Yes      |              | Port number  |

### Back to results

| Status Code | Status code meanings | Note    | Data Model           |
| ----------- | -------------------- | ------- | -------------------- |
| 200         | OK                   | Success | [返回模型](#delete_port) |

#### Back to Model<a id="delete_port"></a>

```json
 LO
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Properties**

| Name                                                       | Type     | Required | Constraints | Chinese name     | Note                                     |
| ---------------------------------------------------------- | -------- | -------- | ----------- | ---------------- | ---------------------------------------- |
| container_port                        | Annex II | true     | none        | ContainerPort    | Port number                              |
| protocol                                                   | String   | true     | none        | Protocol         | Port Protocol                            |
| port_alias                            | String   | true     | none        | Port Alias       | Port Alias                               |
| is_inner_service | boolean  | true     | none        | IS Inner Service | Whether to turn on inner service         |
| is_over_service  | boolean  | true     | none        | IS Outer Service | Whether or not to open external services |
| k8s_service_name | String   | true     | none        | K8S Service Name | Service name in cluster                  |
