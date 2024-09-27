---
title: 操作组件端口
---

本篇主要是对组件端口的 openAPI 接口介绍，包含 获取组件端口列表、更新组件端口配置（开启对内、对外端口）、添加端口、删除端口。

## 获取组件端口

### 基本信息

```shell title="请求路径"
 GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports
```

### 请求参数

| 名称                               | 位置   | 类型      | 必选 | 中文名 | 说明   |
| -------------------------------- | ---- | ------- | -- | --- | ---- |
| app_id      | path | integer | 是  |     | 应用id |
| service_id  | path | string  | 是  |     | 应用id |
| team_id     | path | string  | 是  |     | 团队id |
| region_name | path | string  | 是  |     | 集群名称 |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型           |
| --- | ----- | -- | -------------- |
| 200 | OK    | 成功 | [返回模型](#ports) |

#### 返回模型<a id="ports"></a>

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

| 名称                                                         | 类型      | 必选   | 约束   | 中文名              | 说明             |
| ---------------------------------------------------------- | ------- | ---- | ---- | ---------------- | -------------- |
| container_port                        | int     | true | none | ContainerPort    | 端口号            |
| protocol                                                   | string  | true | none | Protocol         | 端口协议           |
| port_alias                            | string  | true | none | Port Alias       | 端口别名           |
| is_inner_service | boolean | true | none | IS Inner Service | 是否开启对内服务       |
| is_outer_service | boolean | true | none | IS Outer Service | 是否开启对外服务       |
| k8s_service_name | string  | true | none | K8S Service Name | 集群中 service 名称 |

## 添加组件端口

### 基本信息

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

### 请求参数

| 名称                               | 位置   | 类型                     | 必选 | 中文名 | 说明   |
| -------------------------------- | ---- | ---------------------- | -- | --- | ---- |
| app_id      | path | integer                | 是  |     | 应用id |
| service_id  | path | string                 | 是  |     | 应用id |
| team_id     | path | string                 | 是  |     | 团队id |
| region_name | path | string                 | 是  |     | 集群名称 |
| body                             | body | [请求模型](#req_post_port) | 否  |     | none |

#### 模型<a id="req_post_port"></a>

```json
 {
    "port": "int",
    "port_alias": "string",
    "protocol": "string",
    "is_inner_service": "bool",
}
```

**属性**

| 名称                                                         | 类型      | 必选    | 约束                      | 中文名              | 说明       |
| ---------------------------------------------------------- | ------- | ----- | ----------------------- | ---------------- | -------- |
| port                                                       | string  | true  | none                    | ContainerPort    | 端口号      |
| protocol                                                   | string  | true  | tcp、http、mysql、grpc、udp | Protocol         | 端口协议     |
| port_alias                            | string  | False | none                    | Port Alias       | 端口别名     |
| is_inner_service | boolean | False | none                    | IS Inner Service | 是否开启对内服务 |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型               |
| --- | ----- | -- | ------------------ |
| 200 | OK    | 成功 | [返回模型](#post_port) |

#### 返回模型<a id="post_port"></a>

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

| 名称                                                         | 类型      | 必选   | 约束   | 中文名              | 说明       |
| ---------------------------------------------------------- | ------- | ---- | ---- | ---------------- | -------- |
| container_port                        | int     | true | none | ContainerPort    | 端口号      |
| protocol                                                   | string  | true | none | Protocol         | 端口协议     |
| port_alias                            | string  | true | none | Port Alias       | 端口别名     |
| is_inner_service | boolean | true | none | IS Inner Service | 是否开启对内服务 |
| is_outer_service | boolean | true | none | IS Outer Service | 是否开启对外服务 |
| k8s_service_name | string  | true | none | K8S Service Name | k8s 内部域名 |

## 更新组件端口

### 基本信息

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

### 请求参数

| 名称                               | 位置   | 类型                    | 必选 | 中文名 | 说明   |
| -------------------------------- | ---- | --------------------- | -- | --- | ---- |
| app_id      | path | integer               | 是  |     | 应用id |
| service_id  | path | string                | 是  |     | 应用id |
| team_id     | path | string                | 是  |     | 团队id |
| region_name | path | string                | 是  |     | 集群名称 |
| port                             | path | string                | 是  |     | 端口号  |
| body                             | body | [请求模型](#req_put_port) | 否  |     | none |

#### 模型<a id="req_put_port"></a>

```json
 {
    "action": "strin",
    "port_alias": "string",
    "protocol": "string",
    "k8s_service_name": "string",
}
```

**属性**

| 名称                                                         | 类型     | 必选    | 约束                                                                                                                                                                                                                                 | 中文名              | 说明       |
| ---------------------------------------------------------- | ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| action                                                     | string | true  | open_outer、close_outer、open_inner、close_inner、change_protocol、change_port_alias | Action           | 操作方式     |
| protocol                                                   | string | False | tcp、http、mysql、grpc、udp                                                                                                                                                                                                            | Protocol         | 端口协议     |
| port_alias                            | string | False | none                                                                                                                                                                                                                               | Port Alias       | 端口别名     |
| k8s_service_name | string | False | none                                                                                                                                                                                                                               | K8S Service Name | k8s 内部域名 |

**action 字段介绍**

- open_outer： 开启端口对外服务
- close_outer：关闭端口对外服务
- open_inner： 开启端口对内服务
- close_inner：关闭端口对内服务
- change_protocol： 更改端口协议
- change_port_alias：更改端口别名以及k8s内部域名

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型              |
| --- | ----- | -- | ----------------- |
| 200 | OK    | 成功 | [返回模型](#put_port) |

#### 返回模型<a id="put_port"></a>

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

| 名称                                                         | 类型      | 必选   | 约束   | 中文名              | 说明             |
| ---------------------------------------------------------- | ------- | ---- | ---- | ---------------- | -------------- |
| container_port                        | int     | true | none | ContainerPort    | 端口号            |
| protocol                                                   | string  | true | none | Protocol         | 端口协议           |
| port_alias                            | string  | true | none | Port Alias       | 端口别名           |
| is_inner_service | boolean | true | none | IS Inner Service | 是否开启对内服务       |
| is_outer_service | boolean | true | none | IS Outer Service | 是否开启对外服务       |
| k8s_service_name | string  | true | none | K8S Service Name | 集群中 service 名称 |

## 删除组件端口

### 基本信息

```shell title="请求路径"
 DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/ports/{port}
```

### 请求参数

| 名称                               | 位置   | 类型      | 必选 | 中文名 | 说明   |
| -------------------------------- | ---- | ------- | -- | --- | ---- |
| app_id      | path | integer | 是  |     | 应用id |
| service_id  | path | string  | 是  |     | 应用id |
| team_id     | path | string  | 是  |     | 团队id |
| region_name | path | string  | 是  |     | 集群名称 |
| port                             | path | string  | 是  |     | 端口号  |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型                 |
| --- | ----- | -- | -------------------- |
| 200 | OK    | 成功 | [返回模型](#delete_port) |

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

| 名称                                                         | 类型      | 必选   | 约束   | 中文名              | 说明             |
| ---------------------------------------------------------- | ------- | ---- | ---- | ---------------- | -------------- |
| container_port                        | int     | true | none | ContainerPort    | 端口号            |
| protocol                                                   | string  | true | none | Protocol         | 端口协议           |
| port_alias                            | string  | true | none | Port Alias       | 端口别名           |
| is_inner_service | boolean | true | none | IS Inner Service | 是否开启对内服务       |
| is_outer_service | boolean | true | none | IS Outer Service | 是否开启对外服务       |
| k8s_service_name | string  | true | none | K8S Service Name | 集群中 service 名称 |
