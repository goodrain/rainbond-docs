---
title: Create Component
---

## Basic Information

This interface is mainly used to create components through images

```bash title="请求路径"
/openapi/v1/teams/{team_name}/regions/{region_name}/apps/{group_id}/services
```

```json title="Body 请求体示例"
{
  "group_id": 9,
  "docker_cmd": "",
  "image": "nginx:latest",
  "service_cname": "nginx",
  "k8s_component_name": "nginx", 
  "user_name": "",
  "password": "",
  "is_deploy": true 
}
```

## Request Parameters

Interface Parameters

| Name                             | Type    | Required | Description |
| -------------------------------- | ------- | -------- | ----------- |
| team_name   | string  | Yes      | Team ID     |
| region_name | string  | Yes      | Cluster ID  |
| group_id    | integer | Yes      | App ID      |

Body Parameters

| Name                                                         | Type   | Required | Description                                                                                                                           |
| ------------------------------------------------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| group_id                                | string | Yes      | App ID                                                                                                                                |
| docker_cmd                              | string | No       | Container Start Command                                                                                                               |
| image                                                        | string | Yes      | Mirror address: nginx:latest                                                                          |
| service_cname                           | string | Yes      | Component name, only supports lowercase letters, numbers or "-", and must start with a letter and end with a number or letter         |
| k8s_component_name | string | Yes      | Component English name, only supports lowercase letters, numbers or "-", and must start with a letter and end with a number or letter |
| user_name                               | string | No       | Mirror Repository User                                                                                                                |
| password                                                     | string | No       | Mirror Repository Password                                                                                                            |
| is_deploy                               | Bool   | Yes      | Whether to automatically build after creation                                                                                         |

## Return Result

| Status Code | Status Code Meaning | Description |
| ----------- | ------------------- | ----------- |
| 200         | OK                  | Success     |

```json
{
  "code": 200,
  "msg": "success",
  "msg_show": "Component created successfully", 
  "data": {
    "bean": {
      "service_id": "0941ab572e006f49e7855e6213f7915c" 
    },
    "list": [] 
  }
}
```
