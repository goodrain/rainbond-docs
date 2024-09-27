---
title: Handle Component Ports
---

This article mainly introduces the openAPI interfaces for component ports, including getting the component port list, updating component port configuration (enabling internal and external ports), adding ports, and deleting ports.

## Get Component Ports

### Basic Information

```shell title="请求路径"
 GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports
```

### Request Parameters

| Name                             | Location | Type    | Required | Chinese Name | Description  |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------ |
| app_id      | path     | integer | Yes      |              | app id       |
| service_id  | path     | string  | Yes      |              | app id       |
| team_id     | path     | string  | Yes      |              | team id      |
| region_name | path     | string  | Yes      |              | cluster name |

### Return Result

| Status Code | Status Code Meaning | Description | Data Model             |
| ----------- | ------------------- | ----------- | ---------------------- |
| 200         | OK                  | Success     | [Return Model](#ports) |

#### Return Model<a id="ports"></a>

```json
 {
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Attributes**

| Name                                                       | Type    | Required | Constraint | Chinese Name     | Description             |
| ---------------------------------------------------------- | ------- | -------- | ---------- | ---------------- | ----------------------- |
| container_port                        | int     | true     | none       | ContainerPort    | Port Number             |
| protocol                                                   | string  | true     | none       | Protocol         | Port Protocol           |
| port_alias                            | string  | true     | none       | Port Alias       | Port Alias              |
| is_inner_service | boolean | true     | none       | IS Inner Service | Enable Internal Service |
| is_outer_service | boolean | true     | none       | IS Outer Service | Enable External Service |
| k8s_service_name | string  | true     | none       | K8S Service Name | Cluster Service Name    |

## Add Component Port

### Basic Information

```shell title="请求路径"
 POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports
```

```json title="Body 请求体示例"
{
    "port": "80",
    "port_alias": "NGINX_PORT",
    "protocol": "tcp",
    "is_inner_service": True,
}
```

### Request Parameters

| Name                             | Location | Type                            | Required | Chinese Name | Description  |
| -------------------------------- | -------- | ------------------------------- | -------- | ------------ | ------------ |
| app_id      | path     | integer                         | Yes      |              | app id       |
| service_id  | path     | string                          | Yes      |              | app id       |
| team_id     | path     | string                          | Yes      |              | team id      |
| region_name | path     | string                          | Yes      |              | cluster name |
| body                             | body     | [Request Model](#req_post_port) | No       |              | none         |

#### Model<a id="req_post_port"></a>

```json
 {
    "port": "int",
    "port_alias": "string",
    "protocol": "string",
    "is_inner_service": "bool",
}
```

**Attributes**

| Name                                                       | Type    | Required | Constraint              | Chinese Name     | Description                        |
| ---------------------------------------------------------- | ------- | -------- | ----------------------- | ---------------- | ---------------------------------- |
| port                                                       | string  | true     | none                    | ContainerPort    | Port Number                        |
| protocol                                                   | string  | true     | tcp、http、mysql、grpc、udp | Protocol         | Port Protocol                      |
| port_alias                            | string  | False    | none                    | Port Alias       | Port Alias                         |
| is_inner_service | boolean | False    | none                    | IS Inner Service | Whether to enable internal service |

### Return Result

| Status Code | Status Code Meaning | Description | Data Model                 |
| ----------- | ------------------- | ----------- | -------------------------- |
| 200         | OK                  | Success     | [Return Model](#post_port) |

#### Return Model<a id="post_port"></a>

```json
 {
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Attributes**

| Name                                                       | Type    | Required | Constraint | Chinese Name     | Description                     |
| ---------------------------------------------------------- | ------- | -------- | ---------- | ---------------- | ------------------------------- |
| container_port                        | int     | true     | none       | ContainerPort    | Port Number                     |
| protocol                                                   | string  | true     | none       | Protocol         | Port Protocol                   |
| port_alias                            | string  | true     | none       | Port Alias       | Port Alias                      |
| is_inner_service | boolean | true     | none       | IS Inner Service | Whether to Enable Inner Service |
| is_outer_service | boolean | true     | none       | IS Outer Service | Whether to Enable Outer Service |
| k8s_service_name | string  | true     | none       | K8S Service Name | k8s internal domain name        |

## Update Component Port

### basic information

```shell title="请求路径"
 PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports/{port}
```

```json title="Body 请求体示例"
{
    "action": "change_port_alias",
    "port_alias": "NGINX_PORT",
    "k8s_service_name": "nginx_port",
    "protocol": "tcp",
}
```

### request parameters

| Basic Information                | Location | type                           | required | Chinese name | Description  |
| -------------------------------- | -------- | ------------------------------ | -------- | ------------ | ------------ |
| app_id      | path     | integer                        | Yes      |              | app id       |
| service_id  | path     | string                         | Yes      |              | app id       |
| team_id     | path     | string                         | Yes      |              | team id      |
| region_name | path     | string                         | Yes      |              | cluster name |
| port                             | path     | string                         | Yes      |              | Port Number  |
| body                             | body     | [request model](#req_put_port) | no       |              | none         |

#### model<a id="req_put_port"></a>

```json
 {
    "action": "string",
    "port_alias": "string",
    "protocol": "string",
    "k8s_service_name": "string",
}
```

**Attributes**

| Basic Information                                          | type   | required | constraint                                                                                                                                                                                                                              | Chinese name     | Description              |
| ---------------------------------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------ |
| action                                                     | string | true     | open_outer, close_outer, open_inner, close_inner, change_protocol, change_port_alias | Action           | Operation Method         |
| protocol                                                   | string | False    | tcp, http, mysql, grpc, udp                                                                                                                                                                                                             | Protocol         | Port Protocol            |
| port_alias                            | string | False    | none                                                                                                                                                                                                                                    | Port Alias       | Port Alias               |
| k8s_service_name | string | False    | none                                                                                                                                                                                                                                    | K8S Service Name | k8s internal domain name |

**Description of action field**

- open_outer: Open port for external service
- close_outer: Close port for external service
- open_inner: Open port for internal service
- close_inner: Close port for internal service
- change_protocol: Change port protocol
- change_port_alias: Change port alias and K8S internal domain name

### Return Result

| Status Code | Status Code Meaning | Description | Data Model                |
| ----------- | ------------------- | ----------- | ------------------------- |
| 200         | OK                  | Success     | [Return Model](#put_port) |

#### Return Model<a id="put_port"></a>

```json
 {
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**Attributes**

| Name                                                       | Type    | Required | Constraint | Chinese Name     | Description                        |
| ---------------------------------------------------------- | ------- | -------- | ---------- | ---------------- | ---------------------------------- |
| container_port                        | int     | true     | none       | ContainerPort    | Port Number                        |
| protocol                                                   | string  | true     | none       | Protocol         | Port Protocol                      |
| port_alias                            | string  | true     | none       | Port Alias       | Port Alias                         |
| is_inner_service | boolean | true     | none       | IS Inner Service | Whether to enable internal service |
| is_outer_service | boolean | true     | none       | IS Outer Service | Whether to enable external service |
| k8s_service_name | string  | true     | none       | K8S Service Name | Cluster Service Name               |

## Delete Component Port

### Basic Information

```shell title="请求路径"
 DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports/{port}
```

### request parameters

| Basic Information                | Location | type    | required | Chinese name | Description  |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------ |
| app_id      | path     | integer | Yes      |              | app id       |
| service_id  | path     | string  | Yes      |              | app id       |
| team_id     | path     | string  | Yes      |              | team id      |
| region_name | path     | string  | Yes      |              | cluster name |
| port                             | path     | string  | Yes      |              | 端口号          |

### return result

| status code | Status code meaning | Description | data model           |
| ----------- | ------------------- | ----------- | -------------------- |
| 200         | OK                  | success     | [返回模型](#delete_port) |

#### 返回模型<a id="delete_port"></a>

```json
 {
    "container_port": "int",
    "protocol": "string",
    "port_alias": "string",
    "is_inner_service": "bool",
    "is_outer_service": "bool",
    "k8s_service_name": "string"
}
```

**属性**

| Basic Information                                          | type    | required | constraint | Chinese name     | Description    |
| ---------------------------------------------------------- | ------- | -------- | ---------- | ---------------- | -------------- |
| container_port                        | int     | true     | none       | ContainerPort    | 端口号            |
| protocol                                                   | string  | true     | none       | Protocol         | port protocol  |
| port_alias                            | string  | true     | none       | Port Alias       | 端口别名           |
| is_inner_service | boolean | true     | none       | IS Inner Service | 是否开启对内服务       |
| is_outer_service | boolean | true     | none       | IS Outer Service | 是否开启对外服务       |
| k8s_service_name | string  | true     | none       | K8S Service Name | 集群中 service 名称 |
